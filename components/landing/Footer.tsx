'use client';
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'

export default function Footer() {
  return (
    <footer className="w-full bg-background pt-12 px-4 md:px-8 relative overflow-hidden">
      
      {/* Footer Card */}
      <div className="max-w-[1400px] mx-auto bg-secondary/20 border border-border/50 border-b-0 rounded-t-[2.5rem] overflow-hidden relative backdrop-blur-sm group/footer">
        
        {/* Main Content */}
        <div className="p-8 md:p-12 lg:p-16 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-16">
            {/* Left: Brand & Socials */}
            <div className="flex flex-col gap-6">
              <Link href="/" className="flex items-center gap-3 group/brand w-fit">
                <div className="relative w-9 h-9 overflow-hidden">
                  <Image 
                    src="/RareUI_Logo.svg" 
                    alt="RareUI" 
                    fill
                    className="object-contain transition-transform duration-500 group-hover/brand:scale-110 group-hover/brand:rotate-12 brightness-0 dark:invert"
                  />
                </div>
                <span className="text-xl font-bold tracking-tight group-hover/brand:text-foreground/80 transition-colors">RareUI</span>
              </Link>
              <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
                RareUI empowers developers to build premium, motion-rich interfaces with ease. Transform your raw ideas into compelling visuals.
              </p>
              
              {/* Social Icons */}
              <div className="flex items-center gap-4 mt-2">
                 {[
                   { name: 'X', icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
                   { name: 'Instagram', icon: "M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.069-4.85.069-3.204 0-3.584-.012-4.849-.069-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" },
                   { name: 'LinkedIn', icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" },
                   { name: 'GitHub', icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" }
                 ].map(({ name, icon }) => (
                   <motion.div
                      key={name}
                      whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "var(--foreground)", color: "var(--background)" }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full"
                   >
                     <a 
                        href="#"
                        className="w-10 h-10 flex items-center justify-center rounded-full bg-background border border-border text-muted-foreground transition-all duration-300 shadow-sm hover:border-foreground"
                        aria-label={name}
                     >
                       <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                         <path d={icon} />
                       </svg>
                     </a>
                   </motion.div>
                 ))}
              </div>
            </div>
            
            {/* Right: Links Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              {[
                { title: 'Product', links: ['Features', 'Components', 'Pricing', 'Changelog'] },
                { title: 'Resources', links: ['Documentation', 'Templates', 'Blog', 'Support'] },
                { title: 'Company', links: ['About', 'Careers', 'Contact', 'Partners'] }
              ].map((column) => (
                <div key={column.title} className="flex flex-col gap-4">
                  <h4 className="font-semibold text-foreground">{column.title}</h4>
                  <ul className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link}>
                        <Link 
                          href="#" 
                          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 group/link transition-colors"
                        >
                          <span className="relative">
                            {link}
                            <span className="absolute bottom-0 left-0 w-0 h-px bg-foreground transition-all duration-300 group-hover/link:w-full" />
                          </span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
          
          {/* Divider */}
          {/* <div className="w-full h-px bg-gradient-to-r from-transparent via-border to-transparent mb-8 opacity-50" /> */}
          
          {/* Bottom Bar */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
             <p>© {new Date().getFullYear()} RareUI. All rights reserved.</p>
             <div className="flex items-center gap-6">
                <Link href="#" className="hover:text-foreground transition-colors hover:underline underline-offset-4">Privacy Policy</Link>
                <Link href="#" className="hover:text-foreground transition-colors hover:underline underline-offset-4">Terms of Service</Link>
                <Link href="#" className="hover:text-foreground transition-colors hover:underline underline-offset-4">Cookies Settings</Link>
             </div>
          </div>
        </div>

        {/* Big Faded Text - Animated */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden leading-none z-0">
          <motion.h1 
            className="text-[18vw] font-bold tracking-tighter text-foreground scale-125 translate-y-[20%] opacity-10 blur-[2px] dark:opacity-20"
            style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}
            animate={{ 
              opacity: [0.1, 0.15, 0.1],
              scale: [1.25, 1.28, 1.25],
              filter: ['blur(2px)', 'blur(4px)', 'blur(2px)']
            }}
            transition={{ 
              duration: 8, 
              repeat: Infinity, 
              ease: "easeInOut" 
            }}
          >
             RareUI
          </motion.h1>
        </div>

      </div>
    </footer>
  )
}
