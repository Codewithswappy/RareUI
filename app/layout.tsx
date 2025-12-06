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
    default: "RareUI - Free Open Source React UI Components Library | Tailwind CSS",
    template: "%s | RareUI - Free React Components"
  },
  description: "RareUI offers 100+ free, open-source, beautifully designed React UI components and templates. Built with Tailwind CSS, Next.js, and Framer Motion. Copy-paste ready components for modern web applications.",
  keywords: [
    "react components",
    "free ui components",
    "open source ui library",
    "tailwind css components",
    "next.js components",
    "react component library",
    "free react components",
    "ui component library",
    "tailwind ui components",
    "framer motion components",
    "copy paste components",
    "premium ui components",
    "free tailwind components",
    "nextjs ui library",
    "shadcn alternative",
    "react ui kit",
    "component library",
    "design system",
    "ui templates",
    "free ui kit"
  ],
  authors: [{ name: "Swappy", url: "https://x.com/heyyswap" }],
  creator: "Swappy",
  publisher: "RareUI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://rareui.in",
    siteName: "RareUI",
    title: "RareUI - Free Open Source React UI Components Library",
    description: "100+ free, beautifully designed React components. Built with Tailwind CSS & Framer Motion. Open source, copy-paste ready, and production-ready.",
    images: [
      {
        url: "/og-imagebalck.png",
        width: 1200,
        height: 630,
        alt: "RareUI - Free React UI Components Library",
        type: "image/png",
      },
      {
        url: "/og-imagewhite.png",
        width: 1200,
        height: 630,
        alt: "RareUI - Free React UI Components Library (Light)",
        type: "image/png",
      }
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@heyyswap",
    creator: "@heyyswap",
    title: "RareUI - Free Open Source React UI Components",
    description: "100+ free, beautiful React components built with Tailwind CSS. Open source and copy-paste ready.",
    images: ["/og-imagebalck.png", "/og-imagewhite.png"],
  },
  alternates: {
    canonical: "https://rareui.in",
  },
  category: "technology",
  classification: "UI Component Library",
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
              "@type": "SoftwareApplication",
              "name": "RareUI",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Web",
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              },
              "description": "Free open-source React UI component library with 100+ components built with Tailwind CSS and Framer Motion",
              "author": {
                "@type": "Person",
                "name": "Swappy",
                "url": "https://x.com/heyyswap"
              },
              "publisher": {
                "@type": "Organization",
                "name": "RareUI",
                "url": "https://rareui.in"
              },
              "featureList": [
                "100+ Free React Components",
                "Tailwind CSS Styling",
                "Framer Motion Animations",
                "Copy-Paste Ready",
                "Dark Mode Support",
                "TypeScript Support",
                "Next.js Compatible"
              ],
              "softwareVersion": "1.0.0",
              "url": "https://rareui.in",
              "sameAs": [
                "https://x.com/heyyswap",
                "https://github.com/Codewithswappy"
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