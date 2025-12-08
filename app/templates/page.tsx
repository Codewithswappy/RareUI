'use client'

import Link from 'next/link'
import { ArrowLeft, LayoutTemplate } from 'lucide-react'

export default function TemplatesPage() {
  return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-md text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
          Coming Soon
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Premium Templates
        </h1>
        
        <p className="text-muted-foreground leading-relaxed">
          Production-ready dashboards, landing pages, and complete SaaS kits are in the works.
          Save 100+ hours of development time.
        </p>

        <div className="pt-4">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  )
}
