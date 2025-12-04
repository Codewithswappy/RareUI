# RareUI CLI - Complete Feature Set

## ✅ All Commands

### 1. **init** - Initialize Project
```bash
npx rareui init
```
Creates `components.json` with RareUI registry configuration.

### 2. **add** - Install Components
```bash
# Single component (kebab-case or PascalCase)
npx rareui add liquid-button
npx rareui add LiquidButton

# Multiple components
npx rareui add particle-card soft-button loader

# All components
npx rareui add .

# List available components
npx rareui add
```

**Features:**
- ✅ Kebab-case to PascalCase conversion
- ✅ Case-insensitive matching
- ✅ Batch installation
- ✅ Install all with `.`
- ✅ Auto dependency installation
- ✅ Conflict detection
- ✅ Installs to `components/rareui/`

### 3. **diff** - Check & Update Components
```bash
# Check all installed components
npx rareui diff

# Check specific component
npx rareui diff liquid-button

# Update without confirmation
npx rareui diff -y
```

**Features:**
- ✅ Scans `components/rareui/` for installed components
- ✅ Compares with registry versions
- ✅ Shows detailed diff (additions, deletions, changes)
- ✅ Updates components to latest version
- ✅ Updates dependencies automatically
- ✅ Works exactly like `shadcn diff`

## 🎯 How It Works

### Component Discovery
The CLI automatically:
1. Scans your `components/rareui/` directory
2. Finds all `.tsx` and `.ts` files
3. Matches them against the registry
4. Checks for updates

### Update Detection
For each component:
1. Fetches latest version from registry
2. Compares line-by-line with local file
3. Shows summary: `+additions`, `-deletions`, `~changes`
4. Allows selective or batch updates

### Smart Naming
Input → Registry matching:
- `liquid-button` → `LiquidButton` ✅
- `liquidbutton` → `LiquidButton` ✅
- `LiquidButton` → `LiquidButton` ✅
- `LIQUIDBUTTON` → `LiquidButton` ✅

## 📦 Publishing

```bash
cd packages/cli
npm login
npm run build
npm publish
```

If `rareui` is taken, use scoped package:
```json
{
  "name": "@yourusername/rareui"
}
```

Then users install with:
```bash
npx @yourusername/rareui init
npx @yourusername/rareui add liquid-button
npx @yourusername/rareui diff
```

## 🧪 Testing

```bash
cd packages/cli
npm link

# In test project
npx rareui init
npx rareui add liquid-button
npx rareui diff
```

## 📊 Comparison with shadcn

| Feature | shadcn | RareUI CLI | Status |
|---------|--------|------------|--------|
| `init` command | ✅ | ✅ | ✅ |
| `add` command | ✅ | ✅ | ✅ |
| `diff` command | ✅ | ✅ | ✅ |
| Kebab-case support | ✅ | ✅ | ✅ |
| Install all components | ❌ | ✅ | ✅ Better |
| Auto dependencies | ✅ | ✅ | ✅ |
| Custom registry | ✅ | ✅ | ✅ |
| Component updates | ✅ | ✅ | ✅ |

## 🎉 Production Ready!

All features are implemented and tested:
- ✅ `init` - Initialize configuration
- ✅ `add` - Install components (with all variants)
- ✅ `diff` - Check and update components
- ✅ Flexible naming (kebab-case, PascalCase, case-insensitive)
- ✅ Batch operations
- ✅ Auto dependency management
- ✅ Update detection and installation
- ✅ Beautiful CLI interface with spinners and colors

**The CLI works exactly like shadcn but with RareUI components!** 🚀
