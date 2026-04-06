import fs from 'fs';
import path from 'path';

const componentsDir = path.join(process.cwd(), 'components/rareui');
const registryDir = path.join(process.cwd(), 'public/r');

interface RegistryComponent {
  name: string;
  type: string;
  dependencies?: string[];
  registryDependencies?: string[];
  files: Array<{
    path: string;
    content: string;
    type: string;
    target: string;
  }>;
}

// Map of packages that need @types/* packages
const TYPE_PACKAGES_MAP: Record<string, string> = {
  react: '@types/react',
  'react-dom': '@types/react-dom',
  node: '@types/node',
};

function extractDeps(content: string): { deps: string[]; registryDeps: string[] } {
  const deps = new Set<string>();
  const registryDeps = new Set<string>();
  const regex = /from\s+['"]([^'"]+)['"]/g;
  let match;

  while ((match = regex.exec(content)) !== null) {
    const importPath = match[1];

    if (importPath.startsWith('@/components/rareui/')) {
      const compName = importPath.split('/').pop();
      if (compName) registryDeps.add(compName);
    } else if (!importPath.startsWith('.') && !importPath.startsWith('@/')) {
      let packageName = importPath;
      if (packageName.startsWith('@')) {
        const parts = packageName.split('/');
        packageName = parts.length > 1 ? `${parts[0]}/${parts[1]}` : parts[0];
      } else {
        packageName = importPath.split('/')[0];
      }
      deps.add(packageName);
    }
  }
  return { deps: Array.from(deps), registryDeps: Array.from(registryDeps) };
}

// Add TypeScript type packages for dependencies that need them
function addTypePackages(dependencies: string[], isTypeScriptFile: boolean): string[] {
  const allDeps = [...dependencies];

  dependencies.forEach((dep) => {
    if (TYPE_PACKAGES_MAP[dep] && !allDeps.includes(TYPE_PACKAGES_MAP[dep])) {
      allDeps.push(TYPE_PACKAGES_MAP[dep]);
    }
  });

  // Always add TypeScript for .tsx/.ts files
  if (isTypeScriptFile && !allDeps.includes('typescript')) {
    allDeps.push('typescript');
  }

  return allDeps;
}

const EXCLUDED_FOLDERS = [
  'modal',
  'search-context',
  '3D elements',
  'interactive-background',
  'Sections',
  'Text Animation',
];
const EXCLUDED_FILES = [
  'index.ts',
  'AnimatedTab.tsx',
  'AnimatedTabsDemo.tsx',
  'AvatarGroup.tsx',
  'FeatureBadge.tsx',
  'FloatingNavigation.tsx',
  'GlassSearchBar.tsx',
  'LiquidButton.tsx',
  'LiquidMetal.tsx',
  'LiquidMetalLazy.tsx',
  'LiquidTooltip.tsx',
  'LoadingSpinner.tsx',
  'ParticleCard.tsx',
  'SoftButton.tsx',
  'ToastTabs.tsx',
  'glass-shimmer-button.tsx',
  'neumorphism3DButton.tsx',
  'premium-button.tsx',
  'premiumProfileCard.tsx',
  'retro-pixel-button.tsx',
];

function generate() {
  if (!fs.existsSync(registryDir)) {
    fs.mkdirSync(registryDir, { recursive: true });
  }

  const components: RegistryComponent[] = [];
  const entries = fs.readdirSync(componentsDir, { withFileTypes: true });

  for (const entry of entries) {
    if (entry.isDirectory()) {
      if (EXCLUDED_FOLDERS.includes(entry.name)) continue;

      const folderPath = path.join(componentsDir, entry.name);
      const files = fs.readdirSync(folderPath);
      const componentFiles: any[] = [];
      const allDeps = new Set<string>();
      const allRegistryDeps = new Set<string>();

      for (const file of files) {
        if (file.endsWith('.test.tsx') || file.endsWith('.test.ts')) continue;
        if (file.toLowerCase().includes('demo')) continue;
        if (!file.endsWith('.tsx') && !file.endsWith('.ts')) continue;

        const filePath = path.join(folderPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        const relativePath = path.relative(process.cwd(), filePath).replace(/\\/g, '/');

        const { deps, registryDeps } = extractDeps(content);
        deps.forEach((d) => allDeps.add(d));
        registryDeps.forEach((rd) => allRegistryDeps.add(rd));

        componentFiles.push({
          path: file,
          content,
          type: 'registry:ui',
          target: relativePath,
        });
      }

      if (componentFiles.length > 0) {
        components.push({
          name: entry.name,
          type: 'registry:ui',
          dependencies: addTypePackages(Array.from(allDeps), true),
          registryDependencies: Array.from(allRegistryDeps),
          files: componentFiles,
        });
      }
    } else if (entry.isFile()) {
      // Handle potential standalone components or bridges (currently excluding bridges)
      if (EXCLUDED_FILES.includes(entry.name) || !entry.name.endsWith('.tsx')) continue;
      // Standalone files are handled as individual components if they aren't bridges
      const content = fs.readFileSync(path.join(componentsDir, entry.name), 'utf-8');
      const name = entry.name.replace(/\.tsx$/, '');
      const relativePath = `components/rareui/${entry.name}`;

      const { deps, registryDeps } = extractDeps(content);

      components.push({
        name,
        type: 'registry:ui',
        dependencies: addTypePackages(deps, true),
        registryDependencies: registryDeps,
        files: [
          {
            path: entry.name,
            content,
            type: 'registry:ui',
            target: relativePath,
          },
        ],
      });
    }
  }

  // Write individual component files
  components.forEach((comp) => {
    fs.writeFileSync(path.join(registryDir, `${comp.name}.json`), JSON.stringify(comp, null, 2));
  });

  // Write index
  fs.writeFileSync(
    path.join(registryDir, 'index.json'),
    JSON.stringify(
      {
        name: '@rareui',
        components: components.map((c) => c.name),
      },
      null,
      2
    )
  );

  console.log(`✅ Generated registry for ${components.length} components`);
}

generate();
