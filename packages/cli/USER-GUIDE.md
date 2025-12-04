# 🎯 RareUI CLI - User Guide

Welcome to RareUI! This guide will help you understand how to use the CLI to add beautiful, motion-rich components to your project.

## 📦 Installation

No installation needed! Use `npx` to run commands directly:

```bash
npx rareui@latest <command>
```

Or install globally:

```bash
npm install -g rareui
rareui <command>
```

---

## 🚀 Quick Start

### 1. Initialize Your Project

```bash
npx rareui@latest init
```

**What this does:**
- Creates a `components.json` configuration file
- Sets up the RareUI component registry
- Configures paths and aliases for your components

---

### 2. Add Your First Component

```bash
npx rareui@latest add liquid-button
```

**What happens:**
- Component is downloaded from the registry
- Installed to `components/rareui/buttons/LiquidButton.tsx`
- Dependencies are automatically installed
- Ready to use immediately!

---

### 3. Use the Component

```tsx
import LiquidButton from '@/components/rareui/buttons/LiquidButton'

export default function Page() {
  return (
    <LiquidButton text="Click me!" />
  )
}
```

---

## 📚 All Commands

### `init` - Initialize Configuration

```bash
npx rareui init
```

Creates the configuration file needed for RareUI components.

**Options:**
- None required - just run it!

**Example:**
```bash
cd my-nextjs-app
npx rareui init
```

---

### `add` - Install Components

```bash
npx rareui add [components...]
```

Add one or more components to your project.

**Component Naming:**
You can use either format:
- **Kebab-case:** `liquid-button`, `particle-card`
- **PascalCase:** `LiquidButton`, `ParticleCard`

**Examples:**

```bash
# Add a single component
npx rareui add liquid-button

# Add multiple components
npx rareui add particle-card soft-button loader

# Install ALL components
npx rareui add .

# List available components
npx rareui add
```

**Options:**
- `-y, --yes` - Skip confirmation prompts
- `-o, --overwrite` - Overwrite existing files
- `-c, --cwd <path>` - Specify working directory
- `-p, --path <path>` - Custom installation path

**Advanced Examples:**

```bash
# Skip confirmations
npx rareui add liquid-button -y

# Overwrite existing files
npx rareui add particle-card --overwrite

# Install to custom directory
npx rareui add loader --cwd ./my-project
```

---

### `diff` - Check for Updates

```bash
npx rareui diff [component]
```

Check if your installed components have updates available.

**Examples:**

```bash
# Check all components
npx rareui diff

# Check specific component
npx rareui diff liquid-button

# Update without confirmation
npx rareui diff -y
```

**What you'll see:**
- List of components with updates
- Detailed changes: `+additions`, `-deletions`, `~modifications`
- Option to update components

**Options:**
- `-y, --yes` - Update without confirmation
- `-c, --cwd <path>` - Specify working directory

---

## 🎨 Available Components

### Buttons
- `liquid-button` - Animated liquid effect button
- `soft-button` - Neumorphic soft button
- `glass-shimmer-button` - Glass morphism with shimmer
- `neumorphism-3d-button` - 3D neumorphic button

### Cards
- `particle-card` - Card with animated particles

### Loaders
- `loader` - Animated loading spinner

### Overlays
- `modal` - Command palette modal

### Utilities
- `search-context` - Search context provider

---

## 💡 Tips & Tricks

### 1. **Case-Insensitive Naming**
All these work the same:
```bash
npx rareui add liquid-button
npx rareui add LiquidButton
npx rareui add LIQUIDBUTTON
```

### 2. **Batch Installation**
Install multiple components at once:
```bash
npx rareui add liquid-button particle-card soft-button
```

### 3. **Install Everything**
Get all components with one command:
```bash
npx rareui add .
```

### 4. **Stay Updated**
Regularly check for updates:
```bash
npx rareui diff
```

### 5. **Skip Prompts**
Use `-y` flag for automation:
```bash
npx rareui add liquid-button -y
npx rareui diff -y
```

---

## 🔧 Troubleshooting

### "components.json not found"
**Solution:** Run `npx rareui init` first

### "Component not found"
**Solution:** Check available components with `npx rareui add`

### "Permission denied"
**Solution:** Run with appropriate permissions or use `sudo` (Linux/Mac)

### Dependencies not installing
**Solution:** Run `npm install` manually after adding components

---

## 📖 Getting Help

### Command Help
Get help for any command:
```bash
npx rareui --help
npx rareui add --help
npx rareui diff --help
```

### Documentation
Visit: https://rare-ui.vercel.app/docs

### Issues
Report bugs: https://github.com/yourusername/rareui/issues

---

## 🎯 Common Workflows

### Starting a New Project

```bash
# 1. Create Next.js app
npx create-next-app@latest my-app

# 2. Navigate to project
cd my-app

# 3. Initialize RareUI
npx rareui init

# 4. Add components you need
npx rareui add liquid-button particle-card

# 5. Start coding!
```

### Adding to Existing Project

```bash
# 1. Navigate to your project
cd my-existing-project

# 2. Initialize RareUI
npx rareui init

# 3. Add components
npx rareui add liquid-button

# 4. Import and use
```

### Keeping Components Updated

```bash
# 1. Check for updates
npx rareui diff

# 2. Review changes

# 3. Update if desired
# (follow prompts or use -y flag)
```

---

## 🌟 Best Practices

1. **Always run `init` first** before adding components
2. **Use kebab-case** for consistency (e.g., `liquid-button`)
3. **Check for updates regularly** with `diff` command
4. **Review changes** before updating components
5. **Commit components to git** to track changes

---

## 📊 Version Information

- **Current Version:** 0.1.1
- **Registry:** https://rare-ui.vercel.app/r
- **Package:** https://www.npmjs.com/package/rareui

---

## 🎉 You're Ready!

Start building beautiful interfaces with RareUI components!

```bash
npx rareui init
npx rareui add liquid-button
```

Happy coding! 🚀
