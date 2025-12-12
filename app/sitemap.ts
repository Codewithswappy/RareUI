import { MetadataRoute } from 'next'
import { source } from '@/lib/source'

const baseUrl = 'https://rareui.in'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
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
