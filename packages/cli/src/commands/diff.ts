import fs from 'fs-extra'
import path from 'path'
import * as p from '@clack/prompts'
import chalk from 'chalk'
import { execa } from 'execa'

const REGISTRY_URL = 'https://rareui.in/r'

interface DiffOptions {
    yes?: boolean
    cwd?: string
}

interface ComponentRegistry {
    name: string
    type: string
    dependencies?: string[]
    registryDependencies?: string[]
    files: Array<{
        path: string
        content: string
        type: string
        target: string
    }>
}

interface RegistryIndex {
    name: string
    components: string[]
}

// Convert kebab-case to PascalCase
function kebabToPascal(str: string): string {
    return str
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join('')
}

// Try to find component with case-insensitive matching
function findComponentName(input: string, availableComponents: string[]): string | null {
    if (availableComponents.includes(input)) {
        return input
    }

    const pascalCase = kebabToPascal(input)
    if (availableComponents.includes(pascalCase)) {
        return pascalCase
    }

    const lowerInput = input.toLowerCase()
    const match = availableComponents.find(c => c.toLowerCase() === lowerInput)
    if (match) {
        return match
    }

    return null
}

// Find installed components
async function findInstalledComponents(cwd: string): Promise<string[]> {
    const componentsDir = path.join(cwd, 'components/rareui')

    if (!(await fs.pathExists(componentsDir))) {
        return []
    }

    const installed: string[] = []

    async function scanDir(dir: string) {
        const items = await fs.readdir(dir)

        for (const item of items) {
            const fullPath = path.join(dir, item)
            const stat = await fs.stat(fullPath)

            if (stat.isDirectory()) {
                await scanDir(fullPath)
            } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
                const componentName = item.replace(/\.(tsx|ts)$/, '')
                if (!installed.includes(componentName)) {
                    installed.push(componentName)
                }
            }
        }
    }

    await scanDir(componentsDir)
    return installed
}

// Simple diff function
function createDiff(oldContent: string, newContent: string): { hasChanges: boolean; summary: string } {
    if (oldContent === newContent) {
        return { hasChanges: false, summary: 'No changes' }
    }

    const oldLines = oldContent.split('\n')
    const newLines = newContent.split('\n')

    let additions = 0
    let deletions = 0
    let changes = 0

    const maxLen = Math.max(oldLines.length, newLines.length)

    for (let i = 0; i < maxLen; i++) {
        const oldLine = oldLines[i]
        const newLine = newLines[i]

        if (oldLine === undefined) {
            additions++
        } else if (newLine === undefined) {
            deletions++
        } else if (oldLine !== newLine) {
            changes++
        }
    }

    const summary = []
    if (additions > 0) summary.push(chalk.green(`+${additions} additions`))
    if (deletions > 0) summary.push(chalk.red(`-${deletions} deletions`))
    if (changes > 0) summary.push(chalk.yellow(`~${changes} changes`))

    return {
        hasChanges: true,
        summary: summary.join(', ')
    }
}

export async function diff(component: string | undefined, options: DiffOptions) {
    const cwd = options.cwd || process.cwd()

    // Increase max listeners to prevent warnings when updating multiple components
    // Each execa call adds event listeners, and we may update many components
    process.setMaxListeners(0) // 0 = unlimited

    console.log()
    p.intro(chalk.bold('Checking for component updates'))

    // Check if components.json exists
    const componentsJsonPath = path.join(cwd, 'components.json')
    if (!(await fs.pathExists(componentsJsonPath))) {
        p.log.error('components.json not found. Please run ' + chalk.cyan('npx rareui init') + ' first.')
        process.exit(1)
    }

    // Fetch available components
    const s = p.spinner()
    s.start('Fetching registry')

    let availableComponents: string[]
    try {
        const response = await fetch(`${REGISTRY_URL}/index.json`)
        const data = await response.json() as RegistryIndex
        availableComponents = data.components
        s.stop()
    } catch (error) {
        s.stop('Failed to fetch registry')
        p.log.error('Could not fetch component list')
        process.exit(1)
    }

    // Find installed components
    const installedComponents = await findInstalledComponents(cwd)

    if (installedComponents.length === 0) {
        p.log.warn('No components installed')
        process.exit(0)
    }

    // If specific component provided, check only that one
    let componentsToCheck: string[]
    if (component) {
        const componentName = findComponentName(component, availableComponents)
        if (!componentName) {
            p.log.error(`Component "${component}" not found in registry`)
            process.exit(1)
        }
        if (!installedComponents.includes(componentName)) {
            p.log.error(`Component "${componentName}" is not installed`)
            process.exit(1)
        }
        componentsToCheck = [componentName]
    } else {
        // Check all installed components that exist in registry
        componentsToCheck = installedComponents.filter(c => availableComponents.includes(c))
    }

    console.log()
    console.log(chalk.dim(`Checking ${componentsToCheck.length} component(s)...`))
    console.log()

    const updatesAvailable: Array<{
        name: string
        files: Array<{ target: string; diff: string }>
    }> = []

    // Check each component
    for (const componentName of componentsToCheck) {
        try {
            const response = await fetch(`${REGISTRY_URL}/${componentName}.json`)

            if (!response.ok) {
                continue
            }

            const registryComponent = await response.json() as ComponentRegistry
            const componentUpdates: Array<{ target: string; diff: string }> = []

            // Check each file
            for (const file of registryComponent.files) {
                const localPath = path.join(cwd, file.target)

                if (await fs.pathExists(localPath)) {
                    const localContent = await fs.readFile(localPath, 'utf-8')
                    const diff = createDiff(localContent, file.content)

                    if (diff.hasChanges) {
                        componentUpdates.push({
                            target: file.target,
                            diff: diff.summary
                        })
                    }
                }
            }

            if (componentUpdates.length > 0) {
                updatesAvailable.push({
                    name: componentName,
                    files: componentUpdates
                })
            }
        } catch (error) {
            // Skip components that fail
            continue
        }
    }

    // Show results
    if (updatesAvailable.length === 0) {
        p.log.success('All components are up to date!')
        console.log()
        process.exit(0)
    }

    console.log(chalk.bold(`Found updates for ${updatesAvailable.length} component(s):`))
    console.log()

    for (const update of updatesAvailable) {
        console.log(chalk.cyan(`  ${update.name}`))
        for (const file of update.files) {
            console.log(chalk.dim(`    ${file.target}`))
            console.log(chalk.dim(`      ${file.diff}`))
        }
        console.log()
    }

    // Ask if user wants to update
    const shouldUpdate = options.yes || await p.confirm({
        message: 'Do you want to update these components?',
        initialValue: false,
    })

    if (p.isCancel(shouldUpdate) || !shouldUpdate) {
        p.cancel('Update cancelled')
        process.exit(0)
    }

    // Update components
    console.log()
    for (const update of updatesAvailable) {
        const s = p.spinner()
        s.start(`Updating ${update.name}`)

        try {
            const response = await fetch(`${REGISTRY_URL}/${update.name}.json`)
            const component = await response.json() as ComponentRegistry

            // Write updated files
            for (const file of component.files) {
                const filePath = path.join(cwd, file.target)
                await fs.ensureDir(path.dirname(filePath))
                await fs.writeFile(filePath, file.content, 'utf-8')
            }

            s.stop(`Updated ${update.name}`)
            p.log.success(`${chalk.cyan(update.name)} updated successfully`)

            // Update dependencies if needed
            if (component.dependencies && component.dependencies.length > 0) {
                const s2 = p.spinner()
                s2.start('Updating dependencies')

                try {
                    await execa('npm', ['install', ...component.dependencies], { cwd })
                    s2.stop('Dependencies updated')
                } catch (error) {
                    s2.stop('Failed to update dependencies')
                    p.log.warn('Please install dependencies manually: ' + component.dependencies.join(', '))
                }
            }
        } catch (error) {
            s.stop(`Failed to update ${update.name}`)
            p.log.error(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    console.log()
    p.outro(chalk.green('✓ Components updated!'))
    console.log()
}
