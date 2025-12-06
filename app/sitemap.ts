import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://rareui.in'
    const currentDate = new Date()

    // Main pages with high priority
    const mainPages = [
        {
            url: baseUrl,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 1.0,
        },
        {
            url: `${baseUrl}/docs`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/docs/installation/cli`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/templates`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: currentDate,
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ]

    // Component categories
    const componentCategories = [
        {
            url: `${baseUrl}/docs/components`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.85,
        },
        {
            url: `${baseUrl}/docs/components/buttons`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/docs/components/cards`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
    ]

    // All component pages for better indexing
    const componentPages = [
        // Buttons
        '/docs/components/buttons/glass-shimmer-button',
        '/docs/components/buttons/liquid-button',
        '/docs/components/buttons/neumorphism3DButton',
        '/docs/components/buttons/soft-button',
        '/docs/components/buttons/upgrade-button',
        // Cards
        '/docs/components/cards/particle-card',
        '/docs/components/cards/premium-profile-card',
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    // Documentation pages
    const docPages = [
        '/docs/installation',
        '/docs/introduction',
        '/docs/getting-started',
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }))

    return [...mainPages, ...componentCategories, ...componentPages, ...docPages]
}
