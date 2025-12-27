import { MetadataRoute } from 'next'
import { source } from '@/lib/source'

const baseUrl = 'https://rareui.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const currentDate = new Date()

    // Static pages - only include fully functional pages
    // Removed /templates and /pricing as they are "Coming Soon" placeholder pages
    // This prevents Google from indexing incomplete pages
    const staticPages: MetadataRoute.Sitemap = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 1.0,
        },
        {
            url: `${baseUrl}/docs`,
            lastModified: currentDate,
            changeFrequency: 'daily',
            priority: 0.95,
        },
    ]

    // Dynamic Docs Pages from Source
    const dynamicDocsRoutes: MetadataRoute.Sitemap = source.getPages().map((page) => {
        // Determine priority based on path
        let priority = 0.8
        if (page.url.includes('/components')) priority = 0.9
        if (page.url.includes('/installation')) priority = 0.85

        return {
            url: `${baseUrl}${page.url}`,
            lastModified: currentDate, // In a real app, you might want to track file modification times
            changeFrequency: 'weekly',
            priority,
        }
    })

    return [...staticPages, ...dynamicDocsRoutes]
}
