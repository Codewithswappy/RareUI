import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

interface ComponentInfo {
    name: string;
    href: string;
    dateAdded: string;
    modifiedTime: number;
    hasNewBadge: boolean;
}

async function generateLatestComponent() {
    const docsDir = path.join(process.cwd(), 'content/docs');
    const outputPath = path.join(process.cwd(), 'lib/latest-component-data.json');

    // Define directories to scan (excluding non-component sections)
    const componentDirs = [
        'components',
        'text-animation',
        '3d-elements',
        'interactive-background'
    ];

    const components: ComponentInfo[] = [];

    // Scan each directory
    for (const dir of componentDirs) {
        const dirPath = path.join(docsDir, dir);

        // Skip if directory doesn't exist
        if (!fs.existsSync(dirPath)) continue;

        // Read all .mdx files in the directory
        const files = fs.readdirSync(dirPath).filter(file => file.endsWith('.mdx'));

        for (const file of files) {
            const filePath = path.join(dirPath, file);
            const stats = fs.statSync(filePath);
            const fileContent = fs.readFileSync(filePath, 'utf-8');

            // Parse frontmatter to get the title and badge
            const { data } = matter(fileContent);
            const title = data.title || file.replace('.mdx', '');
            const hasNewBadge = data.badge === 'New';

            // Create the component info with the correct href
            const componentSlug = file.replace('.mdx', '');
            components.push({
                name: title,
                href: `/docs/${dir}/${componentSlug}`,
                dateAdded: stats.mtime.toISOString().split('T')[0],
                modifiedTime: stats.mtimeMs,
                hasNewBadge
            });
        }
    }

    // Sort by badge first (New badge components first), then by modification time (newest first)
    components.sort((a, b) => {
        // Prioritize components with "New" badge
        if (a.hasNewBadge && !b.hasNewBadge) return -1;
        if (!a.hasNewBadge && b.hasNewBadge) return 1;
        // If both have or don't have "New" badge, sort by modification time
        return b.modifiedTime - a.modifiedTime;
    });

    // Get the latest component
    const latestComponent = components[0];

    if (latestComponent) {
        // Remove modifiedTime and hasNewBadge before saving (not needed in the output)
        const { modifiedTime, hasNewBadge, ...output } = latestComponent;

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
