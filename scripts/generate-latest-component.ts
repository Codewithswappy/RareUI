import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ComponentInfo {
    name: string;
    href: string;
    dateAdded: string;
    modifiedTime: number;
}

async function generateLatestComponent() {
    const componentsDir = path.join(process.cwd(), 'content/docs/components');
    const outputPath = path.join(process.cwd(), 'lib/latest-component-data.json');

    // Read all .mdx files in the components directory
    const files = fs.readdirSync(componentsDir).filter(file => file.endsWith('.mdx'));

    const components: ComponentInfo[] = [];

    for (const file of files) {
        const filePath = path.join(componentsDir, file);
        const stats = fs.statSync(filePath);
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        // Parse frontmatter to get the title
        const { data } = matter(fileContent);
        const title = data.title || file.replace('.mdx', '');

        // Create the component info
        const componentSlug = file.replace('.mdx', '');
        components.push({
            name: title,
            href: `/docs/components/${componentSlug}`,
            dateAdded: stats.mtime.toISOString().split('T')[0],
            modifiedTime: stats.mtimeMs
        });
    }

    // Sort by modification time (newest first)
    components.sort((a, b) => b.modifiedTime - a.modifiedTime);

    // Get the latest component
    const latestComponent = components[0];

    if (latestComponent) {
        // Remove modifiedTime before saving (not needed in the output)
        const { modifiedTime, ...output } = latestComponent;

        // Write to JSON file
        fs.writeFileSync(
            outputPath,
            JSON.stringify(output, null, 2),
            'utf-8'
        );

        console.log('✅ Latest component generated:', output.name);
    } else {
        console.log('⚠️  No components found');
    }
}

generateLatestComponent().catch((error) => {
    console.error('Error generating latest component:', error);
    process.exit(1);
});
