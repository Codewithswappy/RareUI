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
            priority: 0.95,
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

    // Installation & Getting Started (High Priority for New Users)
    const gettingStarted = [
        '/docs/installation',
        '/docs/installation/install-nextjs',
        '/docs/installation/install-tailwind',
        '/docs/installation/add-utilities',
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.9,
    }))

    // Component categories (SEO: Important for "react components" searches)
    const componentCategories = [
        {
            url: `${baseUrl}/docs/components`,
            lastModified: currentDate,
            changeFrequency: 'daily' as const,
            priority: 0.95,
        },
        {
            url: `${baseUrl}/docs/components/buttons`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
        {
            url: `${baseUrl}/docs/components/cards`,
            lastModified: currentDate,
            changeFrequency: 'weekly' as const,
            priority: 0.9,
        },
    ]

    // All component pages (SEO: Target specific component searches)
    const componentPages = [
        // Buttons - High traffic keywords
        '/docs/components/buttons/glass-shimmer-button',
        '/docs/components/buttons/liquid-button',
        '/docs/components/buttons/neumorphism3DButton',
        '/docs/components/buttons/soft-button',
        '/docs/components/buttons/upgrade-button',
        // Cards - High conversion keywords
        '/docs/components/cards/particle-card',
        '/docs/components/cards/premium-profile-card',
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: currentDate,
        changeFrequency: 'weekly' as const,
        priority: 0.85, // Higher priority for individual components
    }))

    // Blog/Updates (if you add blog in future)
    const contentPages = [
        // Add blog posts here when created
    ].map((path) => ({
        url: `${baseUrl}${path}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority: 0.6,
    }))

    return [
        ...mainPages,
        ...gettingStarted,
        ...componentCategories,
        ...componentPages,
        ...contentPages,
    ]
}
