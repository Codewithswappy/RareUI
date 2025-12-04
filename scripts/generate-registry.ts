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
  'react': '@types/react',
  'react-dom': '@types/react-dom',
  'node': '@types/node',
};

function extractDeps(content: string): string[] {
  const deps = new Set<string>();
  const regex = /from\s+['"]([^'"@][^'"]*)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (!match[1].startsWith('.')) {
      // Extract only the package name (before the first slash)
      // e.g., 'motion/react' -> 'motion', 'package/subpath' -> 'package'
      const packageName = match[1].split('/')[0];
      deps.add(packageName);
    }
  }
  return Array.from(deps);
}

// Add TypeScript type packages for dependencies that need them
function addTypePackages(dependencies: string[], isTypeScriptFile: boolean): string[] {
  const allDeps = [...dependencies];

  dependencies.forEach(dep => {
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

// Components to exclude from registry (internal use only)
const EXCLUDED_COMPONENTS = [
  'modal',           // Command palette - internal use only
  'search-context'   // Search context - internal use only
];

function scanDir(dir: string, category = ''): RegistryComponent[] {
  const results: RegistryComponent[] = [];
  const items = fs.readdirSync(dir);

  for (const item of items) {
    const fullPath = path.join(dir, item);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      results.push(...scanDir(fullPath, item));
    } else if (item.endsWith('.tsx') || item.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf-8');
      const name = item.replace(/\.(tsx|ts)$/, '');
      const relativePath = path.relative(path.join(process.cwd(), 'components'), fullPath).replace(/\\/g, '/');

      const baseDeps = extractDeps(content);
      const allDeps = addTypePackages(baseDeps, true); // true because it's a .tsx/.ts file


      results.push({
        name: name,
        type: 'registry:ui',
        dependencies: allDeps,
        registryDependencies: [],
        files: [{
          path: `components/${relativePath}`,
          content,
          type: 'registry:ui',
          target: `components/${relativePath}`
        }]
      });
    }
  }

  return results;
}

function generate() {
  if (!fs.existsSync(registryDir)) {
    fs.mkdirSync(registryDir, { recursive: true });
  }

  const allComponents = scanDir(componentsDir);

  // Filter out excluded components
  const components = allComponents.filter(comp => !EXCLUDED_COMPONENTS.includes(comp.name));
  const excludedCount = allComponents.length - components.length;

  // Write individual component files
  components.forEach(comp => {
    fs.writeFileSync(
      path.join(registryDir, `${comp.name}.json`),
      JSON.stringify(comp, null, 2)
    );
  });

  // Write index
  fs.writeFileSync(
    path.join(registryDir, 'index.json'),
    JSON.stringify({
      name: '@rareui',
      components: components.map(c => c.name)
    }, null, 2)
  );

  console.log(`✅ Generated registry for ${components.length} components`);
  components.forEach(c => console.log(`   - @rareui/${c.name}`));

  if (excludedCount > 0) {
    console.log(`\n⚠️  Excluded ${excludedCount} internal component(s):`);
    EXCLUDED_COMPONENTS.forEach(name => console.log(`   - ${name} (internal use only)`));
  }
}

generate();
