import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: "Pricing | RareUI",
  description: "Simple, transparent pricing for lifetime access to RareUI components."
}

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background text-foreground p-6">
      <div className="max-w-md text-center space-y-6">
        <div className="inline-block px-3 py-1 rounded-full bg-muted text-xs font-medium text-muted-foreground">
          Coming Soon
        </div>

        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">
          Pricing
        </h1>
        
        <p className="text-muted-foreground leading-relaxed">
          Simple, transparent pricing is on the way. 
          We believe in one-time payments for lifetime access.
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
