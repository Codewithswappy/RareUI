# RareUI CLI

The official CLI for adding RareUI components to your project.

## Installation

```bash
npx rareui init
```

## Usage

### Initialize

```bash
npx rareui init
```

### Add Components

Add components using either PascalCase or kebab-case:

```bash
# Single component
npx rareui add liquid-button
npx rareui add LiquidButton

# Multiple components
npx rareui add particle-card soft-button

# Install all components
npx rareui add .
```

### List Available Components

```bash
npx rareui add
```

### Check for Updates

Check if your installed components have updates available:

```bash
# Check all components
npx rareui diff

# Check specific component
npx rareui diff liquid-button

# Update without confirmation
npx rareui diff -y
```

## Features

- ✅ **Flexible naming**: Use either `liquid-button` or `LiquidButton`
- ✅ **Batch install**: Add multiple components at once
- ✅ **Install all**: Use `.` to install all available components
- ✅ **Auto dependencies**: Automatically installs required npm packages
- ✅ **Conflict detection**: Warns before overwriting existing files
- ✅ **Smart paths**: Installs to `components/rareui/` directory
- ✅ **Update checking**: Check for component updates with `diff` command
- ✅ **Auto-update**: Update all or specific components to latest versions

## Publishing

To publish this package to npm:

1. Update the version in `package.json`
2. Build the package: `npm run build`
3. Publish: `npm publish`

## Development

```bash
npm install
npm run dev
```
