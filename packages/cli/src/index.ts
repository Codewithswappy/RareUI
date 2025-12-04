#!/usr/bin/env node
import { Command } from 'commander'
import { init } from './commands/init.js'
import { add } from './commands/add.js'
import { diff } from './commands/diff.js'
import chalk from 'chalk'

const program = new Command()

program
    .name('rareui')
    .description(chalk.bold('CLI for adding RareUI components to your project'))
    .version('0.1.1')
    .addHelpText('after', `
${chalk.bold('Examples:')}
  ${chalk.dim('Initialize RareUI in your project')}
  ${chalk.cyan('$ npx rareui init')}

  ${chalk.dim('Add a component')}
  ${chalk.cyan('$ npx rareui add liquid-button')}

  ${chalk.dim('Add multiple components')}
  ${chalk.cyan('$ npx rareui add particle-card soft-button loader')}

  ${chalk.dim('Install all components')}
  ${chalk.cyan('$ npx rareui add .')}

  ${chalk.dim('Check for component updates')}
  ${chalk.cyan('$ npx rareui diff')}

${chalk.bold('Documentation:')}
  ${chalk.dim('Visit')} ${chalk.cyan('https://rare-ui.vercel.app/docs')} ${chalk.dim('for more information')}
`)

program
    .command('init')
    .description('Initialize RareUI configuration in your project')
    .addHelpText('after', `
${chalk.bold('What this does:')}
  • Creates a ${chalk.cyan('components.json')} file
  • Configures the RareUI registry
  • Sets up component paths and aliases

${chalk.bold('Example:')}
  ${chalk.cyan('$ npx rareui init')}
`)
    .action(init)

program
    .command('add')
    .description('Add components to your project')
    .argument('[components...]', 'component names to add (supports kebab-case or PascalCase)')
    .option('-y, --yes', 'skip confirmation prompts')
    .option('-o, --overwrite', 'overwrite existing files without asking')
    .option('-c, --cwd <cwd>', 'the working directory (default: current directory)')
    .option('-p, --path <path>', 'custom path to install components')
    .addHelpText('after', `
${chalk.bold('Component Naming:')}
  You can use either format:
  • ${chalk.cyan('liquid-button')} ${chalk.dim('(kebab-case)')}
  • ${chalk.cyan('LiquidButton')} ${chalk.dim('(PascalCase)')}

${chalk.bold('Examples:')}
  ${chalk.dim('Add a single component')}
  ${chalk.cyan('$ npx rareui add liquid-button')}

  ${chalk.dim('Add multiple components')}
  ${chalk.cyan('$ npx rareui add particle-card soft-button loader')}

  ${chalk.dim('Install all available components')}
  ${chalk.cyan('$ npx rareui add .')}

  ${chalk.dim('List all available components')}
  ${chalk.cyan('$ npx rareui add')}

  ${chalk.dim('Skip confirmation prompts')}
  ${chalk.cyan('$ npx rareui add liquid-button -y')}

${chalk.bold('What this does:')}
  • Downloads component code from the registry
  • Installs to ${chalk.cyan('components/rareui/')} directory
  • Automatically installs required dependencies
  • Checks for file conflicts before overwriting
`)
    .action(add)

program
    .command('diff')
    .description('Check for updates to installed components')
    .argument('[component]', 'specific component to check (optional)')
    .option('-y, --yes', 'update without confirmation')
    .option('-c, --cwd <cwd>', 'the working directory (default: current directory)')
    .addHelpText('after', `
${chalk.bold('Examples:')}
  ${chalk.dim('Check all installed components for updates')}
  ${chalk.cyan('$ npx rareui diff')}

  ${chalk.dim('Check a specific component')}
  ${chalk.cyan('$ npx rareui diff liquid-button')}

  ${chalk.dim('Update all components without confirmation')}
  ${chalk.cyan('$ npx rareui diff -y')}

${chalk.bold('What this does:')}
  • Scans your ${chalk.cyan('components/rareui/')} directory
  • Compares with latest versions in the registry
  • Shows detailed changes (additions, deletions, modifications)
  • Allows you to update components to latest versions
  • Updates dependencies if needed
`)
    .action(diff)

program.parse()
