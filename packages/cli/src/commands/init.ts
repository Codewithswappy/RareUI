import fs from 'fs-extra'
import path from 'path'
import * as p from '@clack/prompts'
import chalk from 'chalk'

const REGISTRY_URL = 'https://rare-ui.vercel.app/r'

export async function init() {
    console.log()
    p.intro(chalk.bold('Welcome to RareUI!'))

    const cwd = process.cwd()
    const componentsJsonPath = path.join(cwd, 'components.json')

    // Check if components.json already exists
    if (await fs.pathExists(componentsJsonPath)) {
        const shouldContinue = await p.confirm({
            message: 'components.json already exists. Do you want to overwrite it?',
            initialValue: false,
        })

        if (p.isCancel(shouldContinue) || !shouldContinue) {
            p.cancel('Operation cancelled.')
            process.exit(0)
        }
    }

    // Create components.json
    const config = {
        $schema: 'https://ui.shadcn.com/schema.json',
        style: 'new-york',
        rsc: true,
        tsx: true,
        tailwind: {
            config: '',
            css: 'app/globals.css',
            baseColor: 'neutral',
            cssVariables: true,
            prefix: '',
        },
        iconLibrary: 'lucide',
        aliases: {
            components: '@/components',
            utils: '@/lib/utils',
            ui: '@/components/ui',
            lib: '@/lib',
            hooks: '@/hooks',
        },
        registries: {
            '@rareui': `${REGISTRY_URL}/{name}.json`,
        },
    }

    await fs.writeJSON(componentsJsonPath, config, { spaces: 2 })

    p.outro(chalk.green('✓ Configuration created successfully!'))
    console.log()
    console.log('Next steps:')
    console.log(chalk.dim('  1. Run ') + chalk.cyan('npx rareui add [component]') + chalk.dim(' to add components'))
    console.log(chalk.dim('  2. Visit ') + chalk.cyan('https://rare-ui.vercel.app/docs') + chalk.dim(' to browse components'))
    console.log()
}
