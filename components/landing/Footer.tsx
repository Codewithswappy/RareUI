'use client';
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'motion/react'
import SkewOnScroll from "@/components/ui/SkewOnScroll";

export default function Footer() {
  return (
    <footer className="w-full bg-background pt-12 px-4 md:px-8 relative overflow-hidden">
      
      {/* --- Background Grid & Lines --- */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
          <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
              <pattern id="footer-grid-pattern" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="currentColor" strokeWidth="0.5" className="text-neutral-300 dark:text-neutral-500"/>
              </pattern>
          </defs>
          {/* Desktop Grid */}
          <rect x="10%" y="0" width="80%" height="100%" fill="url(#footer-grid-pattern)" className="hidden md:block" />
          <line x1="10%" y1="0" x2="10%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 hidden md:block" strokeDasharray="4 4"/>
          <line x1="90%" y1="0" x2="90%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 hidden md:block" strokeDasharray="4 4"/>

          {/* Mobile Grid */}
          <rect x="2.5%" y="0" width="95%" height="100%" fill="url(#footer-grid-pattern)" className="block md:hidden" />
          <line x1="2.5%" y1="0" x2="2.5%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 block md:hidden" strokeDasharray="4 4"/>
          <line x1="97.5%" y1="0" x2="97.5%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400 block md:hidden" strokeDasharray="4 4"/>
           {/* Horizontal Lines */}
          <line x1="0" y1="0" x2="100%" y2="0" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400" strokeDasharray="4 4"/>
          <line x1="0" y1="100%" x2="100%" y2="100%" stroke="currentColor" strokeWidth="1" className="text-neutral-400 dark:text-neutral-400" strokeDasharray="4 4"/>
          </svg>
      </div>

      {/* Footer Card */}
      <div className="max-w-fd-container w-[95%] md:w-[80%] mx-auto bg-secondary/20 border border-border/50 border-b-0 overflow-hidden relative backdrop-blur-sm group/footer">
        
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
                <SkewOnScroll>
                    <motion.span 
                        initial={{ opacity: 0, filter: "blur(5px)" }}
                        whileInView={{ opacity: 1, filter: "blur(0px)" }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="text-xl font-bold tracking-tight group-hover/brand:text-foreground/80 transition-colors"
                    >
                        RareUI
                    </motion.span>
                </SkewOnScroll>
              </Link>
              <p className="text-muted-foreground max-w-sm text-base leading-relaxed">
                RareUI empowers developers to build premium, motion-rich interfaces with ease. Transform your raw ideas into compelling visuals.
              </p>
              
               {/* Social Icons */}
              <div className="flex items-center gap-4 mt-2">
                 {[
                   { name: 'X', icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z", href: "https://x.com/heyyswap" },
                   { name: 'LinkedIn', icon: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z", href: "https://www.linkedin.com/in/swapnilkalambe4/" },
                   { name: 'GitHub', icon: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z", href: "https://github.com/Codewithswappy" }
                 ].map(({ name, icon, href }) => (
                   <motion.div
                      key={name}
                      whileHover={{ scale: 1.1, rotate: 5, backgroundColor: "var(--foreground)", color: "var(--background)" }}
                      whileTap={{ scale: 0.95 }}
                      className="rounded-full"
                   >
                     <a 
                        href={href}
                        target={href !== "#" ? "_blank" : "_self"}
                        rel={href !== "#" ? "noopener noreferrer" : ""}
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
            <div className="grid grid-cols-2 gap-8">
              {[
                { 
                  title: 'Product', 
                  links: [
                    // { name: 'Features', href: '/#features' },
                    { name: 'Components', href: '/docs' },
                    { name: 'Templates', href: '/templates' },
                    // { name: 'Pricing', href: '/pricing' }
                  ] 
                },
                { 
                  title: 'Resources', 
                  links: [
                    { name: 'Documentation', href: '/docs/installation/cli' },               
                    { name: 'Blog', href: '/blog' },
                    { name: 'Support', href: 'https://github.com/Codewithswappy/RareUI/discussions' }
                  ] 
                }
              ].map((column) => (
                <div key={column.title} className="flex flex-col gap-4">
                  <h4 className="font-semibold text-foreground">{column.title}</h4>
                  <ul className="flex flex-col gap-3">
                    {column.links.map((link) => (
                      <li key={link.name}>
                        <Link 
                          href={link.href} 
                          className="text-sm text-muted-foreground hover:text-foreground inline-flex items-center gap-1 group/link transition-colors"
                        >
                          <span className="relative">
                            {link.name}
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
          <div className="flex justify-center items-center gap-4 text-sm text-muted-foreground">
             <p>© {new Date().getFullYear()} RareUI. All rights reserved.</p>
          </div>
        </div>

        {/* Big Faded Text - Animated */}
      </div>

      {/* Big Faded Text - Animated */}
      <div className="absolute bottom-[-10%] left-1/2 -translate-x-1/2 w-full text-center pointer-events-none select-none overflow-hidden leading-none z-0">
        <SkewOnScroll skewAmount={5}>
          <motion.h1 
              className="text-[25vw] md:text-[20vw] font-bold tracking-tighter text-foreground scale-125 blur-[2px]"
              style={{ maskImage: 'linear-gradient(to bottom, black 30%, transparent 100%)' }}
              animate={{ 
              opacity: [0.1, 0.3, 0.1],
              scale: [1, 1.05, 1],
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
        </SkewOnScroll>
      </div>
    </footer>
  )
}
