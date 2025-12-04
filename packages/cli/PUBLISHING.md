# Publishing the RareUI CLI to npm

## Prerequisites

1. Create an npm account at https://www.npmjs.com/signup
2. Login to npm in your terminal:
   ```bash
   npm login
   ```

## Publishing Steps

### 1. Navigate to the CLI package
```bash
cd packages/cli
```

### 2. Build the package
```bash
npm run build
```

### 3. Test locally (optional but recommended)
```bash
# Link the package globally
npm link

# Test in another directory
cd /path/to/test-project
npx rareui --version
npx rareui init
```

### 4. Publish to npm
```bash
npm publish
```

**Note:** The package name "rareui" might already be taken on npm. If so, you'll need to either:
- Use a scoped package: `@yourusername/rareui`
- Choose a different name: `rareui-cli`, `rare-ui`, etc.

To use a scoped package, update `package.json`:
```json
{
  "name": "@yourusername/rareui",
  ...
}
```

Then users would install with:
```bash
npx @yourusername/rareui init
npx @yourusername/rareui add liquid-button
```

## Updating the Package

When you make changes:

1. Update the version in `package.json` (follow [semver](https://semver.org/)):
   - Patch: `0.1.0` → `0.1.1` (bug fixes)
   - Minor: `0.1.0` → `0.2.0` (new features)
   - Major: `0.1.0` → `1.0.0` (breaking changes)

2. Build and publish:
   ```bash
   npm run build
   npm publish
   ```

## Verifying the Package

After publishing, verify it works:

```bash
# In a new directory
npx rareui@latest init
npx rareui@latest add liquid-button
```

## Important Files

- `src/index.ts` - Main CLI entry point
- `src/commands/init.ts` - Init command implementation
- `src/commands/add.ts` - Add command implementation
- `package.json` - Package configuration
- `tsup.config.ts` - Build configuration

## Troubleshooting

### Package name already taken
Choose a different name or use a scoped package (@username/package-name)

### Permission errors
Make sure you're logged in: `npm login`

### Build errors
Check TypeScript errors: `npm run build`

### Testing locally
Use `npm link` to test before publishing
