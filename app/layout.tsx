import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { RootProvider } from "fumadocs-ui/provider";
import { ThemeProvider } from "next-themes";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});


const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RareUI - Premium React Components",
  description: "A collection of premium, motion-rich components designed to make your next project stand out.",
  metadataBase: new URL('https://rareui.in'),
  openGraph: {
    title: "RareUI - Premium React Components",
    description: "A collection of premium, motion-rich components designed to make your next project stand out.",
    url: "https://rareui.in",
    siteName: "RareUI",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "RareUI - Premium React Components",
    description: "A collection of premium, motion-rich components designed to make your next project stand out.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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