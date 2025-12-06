import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
    const baseUrl = 'https://rareui.in'

    // Main pages with high priority
    const mainPages = [
        {
            url: baseUrl,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 1,
        },
        {
            url: `${baseUrl}/docs`,
            lastModified: new Date(),
            changeFrequency: 'daily' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/docs/installation/cli`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/templates`,
            lastModified: new Date(),
            changeFrequency: 'weekly' as const,
            priority: 0.8,
        },
        {
            url: `${baseUrl}/pricing`,
            lastModified: new Date(),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
        },
    ]

    // All component pages for better indexing
    const componentPages = [
        '/docs/components/buttons/glass-shimmer-button',
        '/docs/components/buttons/liquid-button',

        '/docs/components/buttons/neumorphism3DButton',
        '/docs/components/buttons/soft-button',
        '/docs/components/buttons/upgrade-button',
        '/docs/components/cards/particle-card',
        '/docs/components/cards/premium-profile-card',
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
    }))

    return [...mainPages, ...componentPages]
}
