import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider/next";
import { ThemeProvider } from "next-themes";
import GoogleAnalytics from "@/components/analytics/GoogleAnalytics";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://rareui.in'),
  title: {
    default: "RareUI - Premium React UI Components Library | Free & Open Source | Tailwind CSS",
    template: "%s | RareUI - Free React UI Component Library"
  },
  description: "Discover 100+ premium, free, and open-source React UI components. Built with Tailwind CSS, Next.js, and Framer Motion. Copy-paste ready components for building modern web applications. Download buttons, cards, forms, modals, navbars, and more. No installation required - just copy and use.",
  keywords: [
    // Primary Keywords (High Competition)
    "ui components",
    "react components",
    "component library",
    "ui library",
    "react ui library",
    "free ui components",
    "open source components",
    
    // Technology-Specific Keywords
    "tailwind css components",
    "tailwind ui components",
    "tailwind components library",
    "next.js components",
    "nextjs ui components",
    "framer motion components",
    "react typescript components",
    "shadcn components",
    "shadcn ui alternative",
    
    // Component Type Keywords
    "react button components",
    "react card components",
    "react modal components",
    "react form components",
    "react navbar components",
    "react slider components",
    "react animation components",
    "animated buttons react",
    "animated cards react",
    "glassmorphism components",
    "neumorphism components",
    "liquid button react",
    
    // Action-Based Keywords
    "copy paste react components",
    "download react components",
    "free react templates",
    "react component examples",
    "react ui kit free",
    "ready to use react components",
    
    // Library-Related Keywords
    "react component library free",
    "best react ui library",
    "modern react components",
    "premium react components",
    "professional ui components",
    "production ready components",
    
    // Feature-Based Keywords
    "dark mode components",
    "responsive react components",
    "accessible react components",
    "animated ui components",
    "interactive components react",
    "modern ui components",
    "beautiful ui components",
    
    // Framework & Stack Keywords
    "react tailwind components",
    "next.js tailwind components",
    "typescript react components",
    "react hooks components",
    "react server components",
    
    // Use Case Keywords
    "landing page components",
    "dashboard components react",
    "website components react",
    "web app components",
    "saas ui components",
    "admin dashboard components",
    
    // Comparison Keywords
    "material ui alternative",
    "ant design alternative",
    "chakra ui alternative",
    "better than shadcn",
    "free shadcn alternative",
    
    // Developer-Focused Keywords
    "react developer tools",
    "frontend components",
    "web development components",
    "ui design system",
    "component design system",
    "react design system",
    
    // Quality & Type Keywords
    "high quality react components",
    "enterprise ui components",
    "startup ui components",
    "minimalist ui components",
    
    // Specific Component Names
    "particle card react",
    "liquid button component",
    "glass shimmer button",
    "premium profile card",
    "animated background components",
    
    // Long-Tail Keywords
    "free open source react components",
    "no installation react components",
    "copy paste ui components tailwind",
    "modern web app components",
    "beautiful animated components",
    "professional landing page components"
  ],
  authors: [{ name: "Swappy", url: "https://x.com/heyyswap" }],
  creator: "Swappy",
  publisher: "RareUI",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rareui.in",
    siteName: "RareUI - Free React UI Components Library",
    title: "RareUI - 100+ Free Premium React UI Components | Tailwind CSS & Framer Motion",
    description: "Build stunning web applications with our collection of 100+ free, open-source React components. Featuring modern designs, smooth animations, and copy-paste simplicity. Perfect for landing pages, dashboards, and web apps. No installation required.",
    images: [
      {
        url: "/og-imageblack.png?v=1",
        width: 1200,
        height: 630,
        alt: "RareUI - Free Premium React UI Components Library with Tailwind CSS",
        type: "image/png",
      },
      {
        url: "/og-imagewhite.png?v=1",
        width: 1200,
        height: 630,
        alt: "RareUI - Open Source React Components for Modern Web Apps",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@heyyswap",
    creator: "@heyyswap",
    title: "RareUI - 100+ Free Premium React UI Components",
    description: "Build beautiful web apps with free, open-source React components. Tailwind CSS + Framer Motion. Copy-paste ready. No installation.",
    images: ["/og-imageblack.png?v=1", "/og-imagewhite.png?v=1"],
  },
  alternates: {
    canonical: "https://rareui.in",
    types: {
      'application/rss+xml': 'https://rareui.in/rss.xml',
    },
  },
  category: "technology",
  classification: "Web Development Tools",
  other: {
    'google-site-verification': process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/favicon.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: '/favicon.png',
  },
  manifest: '/site.webmanifest',
};



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning data-scroll-behavior="smooth">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href="https://rareui.in" />
        <meta name="theme-color" content="#000000" />
        {/* Google Site Verification - Replace with your actual verification code */}
        <meta name="google-site-verification" content={process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || ""} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "WebSite",
                  "@id": "https://rareui.in/#website",
                  "url": "https://rareui.in",
                  "name": "RareUI",
                  "description": "Premium free React UI component library with 100+ components",
                  "publisher": {
                    "@id": "https://rareui.in/#organization"
                  },
                  "potentialAction": [{
                    "@type": "SearchAction",
                    "target": {
                      "@type": "EntryPoint",
                      "urlTemplate": "https://rareui.in/docs?search={search_term_string}"
                    },
                    "query-input": "required name=search_term_string"
                  }]
                },
                {
                  "@type": "Organization",
                  "@id": "https://rareui.in/#organization",
                  "name": "RareUI",
                  "url": "https://rareui.in",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://rareui.in/favicon.png",
                    "width": 512,
                    "height": 512
                  },
                  "sameAs": [
                    "https://x.com/heyyswap",
                    "https://github.com/Codewithswappy/RareUI"
                  ]
                },
                {
                  "@type": "SoftwareApplication",
                  "@id": "https://rareui.in/#software",
                  "name": "RareUI - React UI Components Library",
                  "applicationCategory": "DeveloperApplication",
                  "applicationSubCategory": "Web Development",
        "operatingSystem": "Web, Windows, macOS, Linux",
                  "offers": {
                    "@type": "Offer",
                    "price": "0",
                    "priceCurrency": "USD",
                    "availability": "https://schema.org/InStock"
                  },
                  "aggregateRating": {
                    "@type": "AggregateRating",
                    "ratingValue": "4.9",
                    "ratingCount": "150",
                    "bestRating": "5"
                  },
                  "description": "Free open-source React UI component library featuring 100+ premium components built with Tailwind CSS, Next.js, and Framer Motion. Copy-paste ready with zero installation required.",
                  "screenshot": "https://rareui.in/og-imageblack.png",
                  "author": {
                    "@type": "Person",
                    "name": "Swappy",
                    "url": "https://x.com/heyyswap"
                  },
                  "publisher": {
                    "@id": "https://rareui.in/#organization"
                  },
                  "featureList": [
                    "100+ Free Premium React Components",
                    "Tailwind CSS Styling System",
                    "Framer Motion Smooth Animations",
                    "Copy-Paste Ready Components",
                    "Dark Mode Support Built-in",
                    "Full TypeScript Support",
                    "Next.js 15 Compatible",
                    "Zero Installation Required",
                    "Production Ready Code",
                    "Responsive Design",
                    "Accessible Components (WCAG 2.1)",
                    "Open Source MIT License"
                  ],
                  "softwareVersion": "1.0.0",
                  "softwareRequirements": "React 18+, Next.js 14+, Tailwind CSS 3+",
                  "releaseNotes": "Initial release with 8 premium component categories",
                  "url": "https://rareui.in"
                },
                {
                  "@type": "ItemList",
                  "name": "UI Component Categories",
                  "description": "Categories of React UI components available in RareUI",
                  "itemListElement": [
                    {
                      "@type": "ListItem",
                      "position": 1,
                      "name": "Button Components",
                      "url": "https://rareui.in/docs/components/buttons",
                      "description": "Premium animated buttons including Liquid Button, Glass Shimmer, Soft Button, and more"
                    },
                    {
                      "@type": "ListItem",
                      "position": 2,
                      "name": "Card Components",
                      "url": "https://rareui.in/docs/components/cards",
                      "description": "Interactive cards with particle effects, profile cards, and premium designs"
                    },
                    {
                      "@type": "ListItem",
                      "position": 3,
                      "name": "Animation Components",
                      "url": "https://rareui.in/docs/components",
                      "description": "Smooth animations powered by Framer Motion for modern web experiences"
                    }
                  ]
                },
                {
                  "@type": "FAQPage",
                  "mainEntity": [
                    {
                      "@type": "Question",
                      "name": "Is RareUI completely free to use?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "Yes, RareUI is 100% free and open-source under the MIT license. You can use it in personal and commercial projects without any restrictions."
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "Do I need to install RareUI?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "No installation required! Simply copy the component code and paste it into your project. You can also use our CLI tool: npx rareui add [component-name]"
                      }
                    },
                    {
                      "@type": "Question",
                      "name": "What frameworks does RareUI support?",
                      "acceptedAnswer": {
                        "@type": "Answer",
                        "text": "RareUI components are built with React and work seamlessly with Next.js, Remix, Vite, and any React-based framework. They use Tailwind CSS for styling and Framer Motion for animations."
                      }
                    }
                  ]
                }
              ]
            })
          }}
        />
        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID && (
          <GoogleAnalytics GA_MEASUREMENT_ID={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID} />
        )}
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >

        <RootProvider>
        <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
            storageKey="theme"
          >
          <div className="flex flex-col min-h-screen">
            <div className="flex-1">{children}</div>
          </div>
          </ThemeProvider>
        </RootProvider>
      </body>
    </html>
  );
}