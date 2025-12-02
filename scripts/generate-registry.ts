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

function extractDeps(content: string): string[] {
  const deps = new Set<string>();
  const regex = /from\s+['"]([^'"@][^'"]*)['"]/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
    if (!match[1].startsWith('.')) deps.add(match[1]);
  }
  return Array.from(deps);
}

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

      results.push({
        name: name,
        type: 'registry:ui',
        dependencies: extractDeps(content),
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

  const components = scanDir(componentsDir);

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
}

generate();
