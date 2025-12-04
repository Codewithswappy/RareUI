import fs from 'fs-extra'
import path from 'path'
import * as p from '@clack/prompts'
import chalk from 'chalk'
import { execa } from 'execa'

const REGISTRY_URL = 'https://rare-ui.vercel.app/r'

interface AddOptions {
    yes?: boolean
    overwrite?: boolean
    cwd?: string
    path?: string
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
    // Try exact match first
    if (availableComponents.includes(input)) {
        return input
    }

    // Try kebab-case to PascalCase conversion
    const pascalCase = kebabToPascal(input)
    if (availableComponents.includes(pascalCase)) {
        return pascalCase
    }

    // Try case-insensitive match
    const lowerInput = input.toLowerCase()
    const match = availableComponents.find(c => c.toLowerCase() === lowerInput)
    if (match) {
        return match
    }

    return null
}

export async function add(components: string[], options: AddOptions) {
    const cwd = options.cwd || process.cwd()

    console.log()
    p.intro(chalk.bold('Adding RareUI components'))

    // Check if components.json exists
    const componentsJsonPath = path.join(cwd, 'components.json')
    if (!(await fs.pathExists(componentsJsonPath))) {
        p.log.error('components.json not found. Please run ' + chalk.cyan('npx rareui init') + ' first.')
        process.exit(1)
    }

    // Fetch available components
    const s = p.spinner()
    s.start('Fetching available components')

    let availableComponents: string[]
    try {
        const response = await fetch(`${REGISTRY_URL}/index.json`)
        const data = await response.json() as RegistryIndex
        availableComponents = data.components
        s.stop()
    } catch (error) {
        s.stop('Failed to fetch components')
        p.log.error('Could not fetch component list')
        process.exit(1)
    }

    // If no components specified, show available components
    if (components.length === 0) {
        console.log()
        console.log(chalk.bold('Available components:'))
        console.log()
        availableComponents.forEach((comp) => {
            console.log(chalk.dim('  • ') + chalk.cyan(comp))
        })
        console.log()
        console.log(chalk.dim('Usage:'))
        console.log(chalk.dim('  • ') + chalk.cyan('npx rareui add [component]') + chalk.dim(' - Add a specific component'))
        console.log(chalk.dim('  • ') + chalk.cyan('npx rareui add .') + chalk.dim(' - Add all components'))
        console.log()
        process.exit(0)
    }

    // Check if user wants to install all components
    if (components.includes('.')) {
        const shouldInstallAll = options.yes || await p.confirm({
            message: `Install all ${availableComponents.length} components?`,
            initialValue: false,
        })

        if (p.isCancel(shouldInstallAll) || !shouldInstallAll) {
            p.cancel('Operation cancelled.')
            process.exit(0)
        }

        components = availableComponents
    }

    // Fetch and install each component
    for (const inputName of components) {
        // Find the actual component name
        const componentName = findComponentName(inputName, availableComponents)

        if (!componentName) {
            p.log.error(`Component "${inputName}" does not exist`)
            console.log(chalk.dim('Available components: ') + availableComponents.join(', '))
            continue
        }

        const s = p.spinner()
        s.start(`Fetching ${componentName}`)

        try {
            const response = await fetch(`${REGISTRY_URL}/${componentName}.json`)

            if (!response.ok) {
                s.stop(`Component ${componentName} not found`)
                p.log.error(`Component "${componentName}" does not exist`)
                continue
            }

            const component = await response.json() as ComponentRegistry
            s.stop(`Fetched ${componentName}`)

            // Check if files already exist
            const existingFiles: string[] = []
            for (const file of component.files) {
                const filePath = path.join(cwd, file.target)
                if (await fs.pathExists(filePath)) {
                    existingFiles.push(file.target)
                }
            }

            if (existingFiles.length > 0 && !options.overwrite && !options.yes) {
                const shouldOverwrite = await p.confirm({
                    message: `The following files already exist:\n${existingFiles.map(f => `  • ${f}`).join('\n')}\n\nDo you want to overwrite them?`,
                    initialValue: false,
                })

                if (p.isCancel(shouldOverwrite) || !shouldOverwrite) {
                    p.log.warn(`Skipped ${componentName}`)
                    continue
                }
            }

            // Write component files
            for (const file of component.files) {
                const filePath = path.join(cwd, file.target)
                await fs.ensureDir(path.dirname(filePath))
                await fs.writeFile(filePath, file.content, 'utf-8')
            }

            p.log.success(`Added ${chalk.cyan(componentName)} → ${chalk.dim(component.files[0].target)}`)

            // Install dependencies
            if (component.dependencies && component.dependencies.length > 0) {
                const s2 = p.spinner()
                s2.start('Installing dependencies')

                try {
                    await execa('npm', ['install', ...component.dependencies], { cwd })
                    s2.stop('Dependencies installed')
                } catch (error) {
                    s2.stop('Failed to install dependencies')
                    p.log.warn('Please install dependencies manually: ' + component.dependencies.join(', '))
                }
            }
        } catch (error) {
            s.stop(`Failed to add ${componentName}`)
            p.log.error(`Error adding component: ${error instanceof Error ? error.message : 'Unknown error'}`)
        }
    }

    console.log()
    p.outro(chalk.green('✓ Done!'))
    console.log()
}
