import Link from 'next/link'
import Image from 'next/image'

export default function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="relative w-8 h-8">
                <Image 
                  src="/RareUI_Logo.svg" 
                  alt="RareUI" 
                  fill
                  className="object-contain dark:invert-0 invert"
                />
              </div>
              <span className="text-xl font-bold">RareUI</span>
            </Link>
            <p className="text-muted-foreground max-w-sm">
              A collection of premium, motion-rich components designed to make your next project stand out.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Resources</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link href="/docs" className="hover:text-foreground transition-colors">Documentation</Link></li>
              <li><Link href="/docs/components" className="hover:text-foreground transition-colors">Components</Link></li>
              <li><Link href="/templates" className="hover:text-foreground transition-colors">Templates</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Social</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">GitHub</a></li>
              <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Twitter</a></li>
              <li><a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-foreground transition-colors">Discord</a></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} RareUI. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
