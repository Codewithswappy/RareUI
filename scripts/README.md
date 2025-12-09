# Build Scripts

This directory contains automated scripts for generating various data files used by the RareUI project.

## Scripts

### `generate-sidebar.ts`
Generates the sidebar navigation structure from MDX frontmatter.
- **Output**: `lib/sidebar-data.ts`
- **Run**: `npm run build:sidebar`

### `generate-registry.ts`
Creates component registry JSON files for CLI installation.
- **Output**: `public/r/*.json`
- **Run**: `npm run build:registry`

### `generate-latest-component.ts`
**Automatically detects the newest component** based on file modification time.
- **Output**: `lib/latest-component-data.json`
- **Run**: `npm run build:latest`
- **How it works**:
  1. Scans all `.mdx` files in `content/docs/components/`
  2. Checks file modification timestamps
  3. Identifies the most recently modified component
  4. Extracts the title from frontmatter
  5. Generates a JSON file with the latest component info

This script runs automatically during the build process, so the "NEW" badge on the homepage always shows your most recently added component!

## Running All Scripts

To run all build scripts at once:
```bash
npm run build:all
```

This command runs:
1. `build:sidebar`
2. `build:registry`
3. `build:latest`

## Notes

- All generated files are automatically created during the build process
- `latest-component-data.json` is git-ignored as it's auto-generated
- The scripts use file modification times, so whenever you add or update a component MDX file, it will be detected as the "latest" component
