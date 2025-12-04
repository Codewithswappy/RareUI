import fs from 'fs';
import path from 'path';

// Components to KEEP (used in your project)
const KEEP_UI_COMPONENTS = [
    'button.tsx'  // Used in preview-content.tsx
];

// RareUI components (these are your actual components)
const RAREUI_COMPONENTS = [
    'glass-shimmer-button',
    'LiquidButton',
    'loader',
    'neumorphism3DButton',
    'SoftButton',
    'ParticleCard',
    'modal',
    'search-context'
];

function cleanupShadcnComponents() {
    const uiDir = path.join(process.cwd(), 'components/ui');
    const registryDir = path.join(process.cwd(), 'public/r');

    let deletedUI = 0;
    let deletedJSON = 0;

    // 1. Clean up unused shadcn UI components
    console.log('🧹 Cleaning up unused shadcn UI components...\n');

    if (fs.existsSync(uiDir)) {
        const files = fs.readdirSync(uiDir);

        files.forEach(file => {
            if (!KEEP_UI_COMPONENTS.includes(file)) {
                const filePath = path.join(uiDir, file);
                fs.unlinkSync(filePath);
                console.log(`   ❌ Deleted: components/ui/${file}`);
                deletedUI++;
            } else {
                console.log(`   ✅ Kept: components/ui/${file}`);
            }
        });
    }

    // 2. Clean up shadcn JSON files from registry
    console.log('\n🧹 Cleaning up shadcn JSON files from registry...\n');

    if (fs.existsSync(registryDir)) {
        const files = fs.readdirSync(registryDir);

        files.forEach(file => {
            if (file.endsWith('.json') && file !== 'index.json') {
                const componentName = file.replace('.json', '');

                // Keep only RareUI components
                if (!RAREUI_COMPONENTS.includes(componentName)) {
                    const filePath = path.join(registryDir, file);
                    fs.unlinkSync(filePath);
                    console.log(`   ❌ Deleted: public/r/${file}`);
                    deletedJSON++;
                } else {
                    console.log(`   ✅ Kept: public/r/${file}`);
                }
            }
        });
    }

    console.log(`\n✅ Cleanup complete!`);
    console.log(`   - Deleted ${deletedUI} unused UI components`);
    console.log(`   - Deleted ${deletedJSON} shadcn JSON files`);
    console.log(`\n📦 Your project now only has:`);
    console.log(`   - 1 shadcn component (button.tsx)`);
    console.log(`   - ${RAREUI_COMPONENTS.length} RareUI components`);
}

cleanupShadcnComponents();
