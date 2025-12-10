import { MetadataRoute } from 'next'
import fs from 'fs'
import path from 'path'

const baseUrl = 'https://rareui.in'

function getDocsRoutes(dir: string, baseRoute: string): MetadataRoute.Sitemap {
    if (!fs.existsSync(dir)) return []

    let routes: MetadataRoute.Sitemap = []
    const items = fs.readdirSync(dir, { withFileTypes: true })

    for (const item of items) {
        if (item.isDirectory()) {
            routes = [
                ...routes,
                ...getDocsRoutes(path.join(dir, item.name), `${baseRoute}/${item.name}`)
            ]
        } else if (item.name.endsWith('.mdx')) {
            const slug = item.name.replace('.mdx', '')
            // Check if it's index or metadata
            if (item.name === 'meta.json') continue

            let url = ''
            if (slug === 'index') {
                url = `${baseUrl}${baseRoute}`
            } else {
                url = `${baseUrl}${baseRoute}/${slug}`
            }

            // Determine priority
            let priority = 0.8
            if (baseRoute.includes('/components')) priority = 0.9
            if (baseRoute.includes('/installation')) priority = 0.85

            routes.push({
                url,
                lastModified: new Date(),
                changeFrequency: 'weekly',
                priority,
            })
        }
    }
    return routes
}

export default function sitemap(): MetadataRoute.Sitemap {
    const currentDate = new Date()

    // Static pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/templates`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.7,
        },
    ]

    // Dynamic Docs Pages
    const docsDir = path.join(process.cwd(), 'content/docs')
    const dynamicDocsPaths = getDocsRoutes(docsDir, '/docs')

    // Remove duplicates (e.g. if /docs was added statically and dynamically)
    const allRoutes = [...staticPages, ...dynamicDocsPaths]
    const uniqueRoutesMap = new Map()

    allRoutes.forEach(route => {
        uniqueRoutesMap.set(route.url, route)
    })

    return Array.from(uniqueRoutesMap.values())
}
