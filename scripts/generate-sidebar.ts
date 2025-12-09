import fs from "fs";
import path from "path";
import chalk from "chalk";

const ROOT = path.resolve(process.cwd(), "content/docs/components");
const OUTPUT = path.resolve(process.cwd(), "lib/sidebar-data.ts");
const PUBLIC_OUTPUT = path.resolve(process.cwd(), "public/sidebar.json");

// Custom ordered static sections
const STATIC_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { title: "Introduction", href: "/docs/introduction" },
    ],
  },
  {
    title: "Installation",
    items: [
      { title: "Install Next.js", href: "/docs/installation/install-nextjs" },
      { title: "Install Tailwind CSS", href: "/docs/installation/install-tailwind" },
      { title: "Add utilities", href: "/docs/installation/add-utilities" },
      { title: "CLI", href: "/docs/installation/cli" },
    ],
  },
];

const CATEGORY_LABELS: Record<string, string> = {
  "background-circles": "Backgrounds & Effects",
  "background-paths": "Backgrounds & Effects",
  "beams-background": "Backgrounds & Effects",
  "particles-background": "Backgrounds & Effects",
  card: "Card Components",
  button: "Buttons",
  btn: "Buttons",
  tabs: "Tabs",
  input: "Inputs & Forms",
  "ai-input": "Inputs & Forms",
  text: "Text Components",
  alert: "Overlays & Popovers",
  modal: "Overlays & Popovers",
  faq: "Sections & Blocks",
  list: "Layout & Grid",
  pricing: "Sections & Blocks",
  profile: "Sections & Blocks",
  toolbar: "Navigation",
  "tweet-card": "Sections & Blocks",
  "vercel-v0-chat": "3D",
  "matrix-text": "Text Components",
  "particle-button": "Buttons",
  "hand-written-title": "Text Components",
  "hero-geometric": "Sections & Blocks",
  "bento-grid": "Layout & Grid",
  "checkout-interaction": "Inputs & Forms",
  "currency-transfer": "Inputs & Forms",
  "avatar-picker": "Inputs & Forms",
  "action-search-bar": "Navigation",
};

async function buildSidebar() {
  if (!fs.existsSync(ROOT)) {
    console.log(chalk.yellow(`⚠️  Directory not found: ${ROOT}`));
    return;
  }


  const files = getAllMdxFiles(ROOT);
  const grouped: Record<string, { title: string; items: any[] }> = {};

  for (const file of files) {
    const name = path.basename(file, ".mdx");
    const category = getCategoryFromPath(file, name);

    if (!grouped[category]) grouped[category] = { title: category, items: [] };

    const prettyTitle = formatComponentTitle(name);
    const relativePath = path.relative(ROOT, file);
    const urlPath = relativePath.replace(/\.mdx$/, '').replace(/\\/g, '/');

    grouped[category].items.push({
      title: prettyTitle,
      href: `/docs/components/${urlPath}`,
    });
  }

  // Create a single "Components" section with all component categories as subsections
  const componentItems = Object.values(grouped).flatMap(group => group.items);

  const componentsSection = {
    title: "Components",
    items: componentItems
  };

  const sidebar = [...STATIC_SECTIONS, componentsSection];

  try {
    // Ensure lib directory exists
    const libDir = path.dirname(OUTPUT);
    if (!fs.existsSync(libDir)) {
      fs.mkdirSync(libDir, { recursive: true });
    }

    // Write to lib/sidebar-data.ts (primary output)
    const tsContent = `export const sidebarData = ${JSON.stringify(sidebar, null, 2)};\n`;
    fs.writeFileSync(OUTPUT, tsContent);
    console.log(chalk.green(`✅ Sidebar generated successfully → ${OUTPUT}`));

    // Also write to public/sidebar.json for Command Palette
    const publicDir = path.dirname(PUBLIC_OUTPUT);
    if (!fs.existsSync(publicDir)) {
      fs.mkdirSync(publicDir, { recursive: true });
    }
    fs.writeFileSync(PUBLIC_OUTPUT, JSON.stringify(sidebar, null, 2));
    console.log(chalk.gray(`📄 Copy created for Command Palette → ${PUBLIC_OUTPUT}`));

  } catch (error) {
    console.error(chalk.red(`❌ Failed to write sidebar files:`), error);
  }
}

function getAllMdxFiles(dir: string): string[] {
  const files: string[] = [];

  function traverse(currentDir: string) {
    const items = fs.readdirSync(currentDir);

    for (const item of items) {
      const fullPath = path.join(currentDir, item);
      const stat = fs.statSync(fullPath);

      if (stat.isDirectory()) {
        traverse(fullPath);
      } else if (item.endsWith(".mdx")) {
        files.push(fullPath);
      }
    }
  }

  traverse(dir);
  return files;
}

function getCategoryFromPath(filePath: string, fileName: string): string {
  const relativePath = path.relative(ROOT, filePath);
  const pathParts = relativePath.split(path.sep);

  // Check if it's in a folder (like button/btn-01.mdx)
  if (pathParts.length > 1) {
    const folderName = pathParts[0];
    return CATEGORY_LABELS[folderName] || formatTitle(folderName);
  }

  // Check direct file mapping
  return CATEGORY_LABELS[fileName] || "Miscellaneous";
}

function formatTitle(folderName: string): string {
  return folderName
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

function formatComponentTitle(fileName: string): string {
  return fileName
    .replace(/-/g, ' ')
    .replace(/\b\w/g, l => l.toUpperCase());
}

buildSidebar();