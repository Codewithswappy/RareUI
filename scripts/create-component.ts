// scripts/create-component.ts
import fs from 'fs';
import path from 'path';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const question = (query: string): Promise<string> =>
  new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('🎨 Add a new RareUI Component');

  const name = await question('Component Name (e.g., neon-button): ');
  if (!name) {
    console.log('❌ Component name is required.');
    process.exit(1);
  }

  const category = await question('Category (e.g., buttons, cards, text-animation): ');
  if (!category) {
    console.log('❌ Category is required.');
    process.exit(1);
  }

  const title = name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ');
  const componentPascalName = name
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('');

  // Define paths
  const compDir = path.join(process.cwd(), 'components/rareui', category);
  let docsDir = path.join(process.cwd(), 'content/docs/components', category);

  const compFile = path.join(compDir, `${name}.tsx`);
  let docsFile = path.join(docsDir, `${name}.mdx`);

  // Handle special docs directories
  const specialDocsDirs = ['text-animation', '3d-elements', 'interactive-background'];
  if (specialDocsDirs.includes(category)) {
    docsDir = path.join(process.cwd(), 'content/docs', category);
    docsFile = path.join(docsDir, `${name}.mdx`);
  }

  if (!fs.existsSync(compDir)) fs.mkdirSync(compDir, { recursive: true });
  if (!fs.existsSync(docsDir)) fs.mkdirSync(docsDir, { recursive: true });

  // Component Template
  const compTemplate = `'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

export interface ${componentPascalName}Props {
  className?: string;
  children?: React.ReactNode;
}

export default function ${componentPascalName}({ className, children }: ${componentPascalName}Props) {
  return (
    <div className={cn('relative', className)}>
      {children}
    </div>
  );
}
`;

  // Docs Template
  const docsTemplate = `---
title: ${title}
description: A new component for RareUI
badge: New
---

<ComponentPreview name="${name}" />

## Installation

\`\`\`bash
npx rareui add ${name}
\`\`\`

## Usage

\`\`\`tsx
import ${componentPascalName} from '@/components/rareui/${category}/${name}';

export default function Example() {
  return (
    <${componentPascalName}>
      Example content
    </${componentPascalName}>
  );
}
\`\`\`
`;

  if (fs.existsSync(compFile)) {
    console.log(`⚠️ Component already exists at ${compFile}`);
  } else {
    fs.writeFileSync(compFile, compTemplate);
    console.log(`✅ Created ${compFile}`);
  }

  if (fs.existsSync(docsFile)) {
    console.log(`⚠️ Docs already exist at ${docsFile}`);
  } else {
    fs.writeFileSync(docsFile, docsTemplate);
    console.log(`✅ Created ${docsFile}`);
  }

  console.log('\n🚀 Run \`npm run build:all\` to generate registry and sidebar!');
  rl.close();
}

main().catch(console.error);
