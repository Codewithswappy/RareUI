'use client'

import { motion } from 'motion/react'
import LiquidButton  from '@/components/rareui/buttons/LiquidButton'
import Link from "next/link"
import Image from "next/image"
import { useSearchContext } from '@/components/rareui/search-context'
import { useState, useEffect } from 'react'

export default function Home() {
  const { setOpenSearch } = useSearchContext();
  const [isDark, setIsDark] = useState(false);

  // Toggle theme
  const toggleTheme = () => {
    setIsDark(!isDark);
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDark 
        ? 'bg-neutral-900 text-neutral-100 selection:bg-cyan-700' 
        : 'bg-white text-neutral-900 selection:bg-cyan-50'
    }`}>
      
      {/* --- Navbar --- */}
      <nav className="max-w-7xl mx-auto px-6 py-6 h-16  flex items-center justify-between">
        <div className="flex items-center">
           {/* Logo - Dynamic based on theme */}
           <div className="relative w-[72px] h-[72px] rounded-full overflow-hidden flex justify-center">
             <Image 
               src="/RareUI_Logo.svg"
               alt="RareUI Logo" 
               width={72} 
               height={72}
               className={`object-contain transition-all duration-300 ${
                 isDark 
                   ? 'opacity-90' 
                   : 'invert opacity-95'
               }`}
             />
           </div>
           {/* <span className="text-sm font-semibold tracking-tight">RareUI</span> */}
        </div>

        <div className={`hidden md:flex items-center gap-8 text-sm font-medium transition-colors ${
          isDark ? 'text-neutral-400' : 'text-neutral-500'
        }`}>
          <Link href="#" className={`transition-all duration-200 hover:scale-105 ${
            isDark ? 'hover:text-neutral-100' : 'hover:text-neutral-900'
          }`}>Docs</Link>
          <Link href="/docs" className={`transition-all duration-200 hover:scale-105 ${
            isDark ? 'hover:text-neutral-100' : 'hover:text-neutral-900'
          }`}>Components</Link>
          <Link href="#" className={`transition-all duration-200 hover:scale-105 ${
            isDark ? 'hover:text-neutral-100' : 'hover:text-neutral-900'
          }`}>Templates</Link>
          <Link href="#" className={`transition-all duration-200 hover:scale-105 ${
            isDark ? 'hover:text-neutral-100' : 'hover:text-neutral-900'
          }`}>Pricing</Link>
        </div>

        <div className="flex items-center gap-4">
           {/* Search Bar */}
           <div 
             className="relative group hidden sm:block cursor-pointer"
             onClick={() => setOpenSearch(true)}
           >
             <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
               <svg className={`w-4 h-4 transition-colors ${
                 isDark 
                   ? 'text-neutral-500 group-hover:text-neutral-300' 
                   : 'text-neutral-400 group-hover:text-neutral-600'
               }`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
               </svg>
             </div>
             <input 
               type="text" 
               placeholder="Search components..." 
               className={`pl-10 pr-12 py-2 text-sm border-transparent rounded-lg w-64 transition-all outline-none cursor-pointer ${
                 isDark
                   ? 'bg-neutral-800 hover:bg-neutral-700 hover:border-neutral-600 placeholder:text-neutral-500 text-neutral-100'
                   : 'bg-neutral-100 hover:bg-white hover:border-neutral-200 placeholder:text-neutral-400'
               }`}
               readOnly
             />
             <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <span className={`text-[10px] font-medium border rounded px-1.5 py-0.5 ${
                  isDark
                    ? 'text-neutral-400 border-neutral-600 bg-neutral-800'
                    : 'text-neutral-400 border-neutral-200 bg-white'
                }`}>⌘K</span>
             </div>
           </div>

           {/* Theme Toggle Button */}
           <button
             onClick={toggleTheme}
             className={`p-2 rounded-lg transition-all duration-300 ${
               isDark
                 ? 'bg-neutral-800 hover:bg-neutral-700 text-yellow-400'
                 : 'bg-neutral-100 hover:bg-neutral-200 text-neutral-700'
             }`}
             aria-label="Toggle theme"
           >
             {isDark ? (
               // Sun icon for light mode
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
               </svg>
             ) : (
               // Moon icon for dark mode
               <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
               </svg>
             )}
           </button>
        </div>
      </nav>

      {/* --- Main Hero Container --- */}
      <main className="max-w-[1400px] mx-auto px-4 md:px-6 pb-12">
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 40 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className={`rounded-[2.5rem] overflow-hidden min-h-[500px] lg:min-h-[650px] relative transition-colors duration-300 ${
          isDark ? 'bg-neutral-800' : 'bg-[#E5E5E5]'
        }`}>
          
          <div className="h-full flex flex-col items-center justify-center text-center">
            
            {/* --- Main Content --- */}
            <div className="p-4 md:p-10 lg:p-16 flex flex-col items-center relative z-10 max-w-4xl mx-auto">
              
              {/* New Component Badge */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="flex items-center gap-2 mb-8"
              >
                {/* Blinking Dot */}
                <div className="relative flex items-center justify-center">
                  <div className={`absolute w-3 h-3 rounded-full animate-ping opacity-75 transition-colors ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`}></div>
                  <div className={`relative w-2 h-2 rounded-full transition-colors ${
                    isDark ? 'bg-white' : 'bg-black'
                  }`}></div>
                </div>
                <p className={`text-sm font-medium transition-colors ${
                  isDark ? 'text-neutral-300' : 'text-neutral-700'
                }`}>New Component</p>
              </motion.div>

              {/* Headline */}
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="text-5xl md:text-7xl lg:text-8xl leading-[0.9] font-serif mb-8 tracking-tight text-center"
              >
                Build Interfaces<br />
                That Feel <span className={`italic font-serif transition-colors ${
                  isDark ? 'text-neutral-500' : 'text-neutral-400'
                }`}>Rare</span>
              </motion.h1>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className={`text-lg md:text-xl mb-8 max-w-2xl leading-relaxed transition-colors ${
                  isDark ? 'text-neutral-300' : 'text-neutral-600'
                }`}
              >
                A collection of premium, motion-rich components designed to make your next project stand out. Copy, paste, and ship.
              </motion.p>

              {/* Tech Stack */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
                className={`flex flex-wrap items-center justify-center gap-3 mb-10 pt-6 border-t max-w-2xl transition-colors ${
                  isDark ? 'border-neutral-600/50' : 'border-neutral-300/50'
                }`}
              >
                <p className={`text-xs font-medium transition-colors mr-1 ${
                  isDark ? 'text-neutral-400' : 'text-neutral-500'
                }`}>Built with:</p>
                
                {/* React Icon */}
                <div 
                  className={`p-2 rounded-lg transition-all hover:scale-110 cursor-pointer group relative ${
                    isDark ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                  title="React"
                >
                  <svg className="w-5 h-5 text-[#61DAFB]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 10.11c1.03 0 1.87.84 1.87 1.89 0 1-.84 1.85-1.87 1.85S10.13 13 10.13 12c0-1.05.84-1.89 1.87-1.89M7.37 20c.63.38 2.01-.2 3.6-1.7-.52-.59-1.03-1.23-1.51-1.9a22.7 22.7 0 0 1-2.4-.36c-.51 2.14-.32 3.61.31 3.96m.71-5.74l-.29-.51c-.11.29-.22.58-.29.86.27.06.57.11.88.16l-.3-.51m6.54-.76l.81-1.5-.81-1.5c-.3-.53-.62-1-.91-1.47C13.17 9 12.6 9 12 9c-.6 0-1.17 0-1.71.03-.29.47-.61.94-.91 1.47L8.57 12l.81 1.5c.3.53.62 1 .91 1.47.54.03 1.11.03 1.71.03.6 0 1.17 0 1.71-.03.29-.47.61-.94.91-1.47M12 6.78c-.19.22-.39.45-.59.72h1.18c-.2-.27-.4-.5-.59-.72m0 10.44c.19-.22.39-.45.59-.72h-1.18c.2.27.4.5.59.72M16.62 4c-.62-.38-2 .2-3.59 1.7.52.59 1.03 1.23 1.51 1.9.82.08 1.63.2 2.4.36.51-2.14.32-3.61-.32-3.96m-.7 5.74l.29.51c.11-.29.22-.58.29-.86-.27-.06-.57-.11-.88-.16l.3.51m1.45-7.05c1.47.84 1.63 3.05 1.01 5.63 2.54.75 4.37 1.99 4.37 3.68s-1.83 2.93-4.37 3.68c.62 2.58.46 4.79-1.01 5.63-1.46.84-3.45-.12-5.37-1.95-1.92 1.83-3.91 2.79-5.38 1.95-1.46-.84-1.62-3.05-1-5.63-2.54-.75-4.37-1.99-4.37-3.68s1.83-2.93 4.37-3.68c-.62-2.58-.46-4.79 1-5.63 1.47-.84 3.46.12 5.38 1.95 1.92-1.83 3.91-2.79 5.37-1.95M17.08 12c.34.75.64 1.5.89 2.26 2.1-.63 3.28-1.53 3.28-2.26 0-.73-1.18-1.63-3.28-2.26-.25.76-.55 1.51-.89 2.26M6.92 12c-.34-.75-.64-1.5-.89-2.26-2.1.63-3.28 1.53-3.28 2.26 0 .73 1.18 1.63 3.28 2.26.25-.76.55-1.51.89-2.26m9 2.26l-.3.51c.31-.05.61-.1.88-.16-.07-.28-.18-.57-.29-.86l-.29.51m-2.89 4.04c1.59 1.5 2.97 2.08 3.59 1.7.64-.35.83-1.82.32-3.96-.77.16-1.58.28-2.4.36-.48.67-.99 1.31-1.51 1.9M8.08 9.74l.3-.51c-.31.05-.61.1-.88.16.07.28.18.57.29.86l.29-.51m2.89-4.04C9.38 4.2 8 3.62 7.37 4c-.63.35-.82 1.82-.31 3.96a22.7 22.7 0 0 1 2.4-.36c.48-.67.99-1.31 1.51-1.9z"/>
                  </svg>
                  {/* Tooltip */}
                  <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                    isDark ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-800 text-white'
                  }`}>React</span>
                </div>

                {/* Next.js Icon */}
                <div 
                  className={`p-2 rounded-lg transition-all hover:scale-110 cursor-pointer group relative ${
                    isDark ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                  title="Next.js"
                >
                  <svg className={`w-5 h-5 ${
                    isDark ? 'text-white' : 'text-black'
                  }`} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M11.572 0c-.176 0-.31.001-.358.007a19.76 19.76 0 0 1-.364.033C7.443.346 4.25 2.185 2.228 5.012a11.875 11.875 0 0 0-2.119 5.243c-.096.659-.108.854-.108 1.747s.012 1.089.108 1.748c.652 4.506 3.86 8.292 8.209 9.695.779.25 1.6.422 2.534.525.363.04 1.935.04 2.299 0 1.611-.178 2.977-.577 4.323-1.264.207-.106.247-.134.219-.158-.02-.013-.9-1.193-1.955-2.62l-1.919-2.592-2.404-3.558a338.739 338.739 0 0 0-2.422-3.556c-.009-.002-.018 1.579-.023 3.51-.007 3.38-.01 3.515-.052 3.595a.426.426 0 0 1-.206.214c-.075.037-.14.044-.495.044H7.81l-.108-.068a.438.438 0 0 1-.157-.171l-.05-.106.006-4.703.007-4.705.072-.092a.645.645 0 0 1 .174-.143c.096-.047.134-.051.54-.051.478 0 .558.018.682.154.035.038 1.337 1.999 2.895 4.361a10760.433 10760.433 0 0 0 4.735 7.17l1.9 2.879.096-.063a12.317 12.317 0 0 0 2.466-2.163 11.944 11.944 0 0 0 2.824-6.134c.096-.66.108-.854.108-1.748 0-.893-.012-1.088-.108-1.747-.652-4.506-3.859-8.292-8.208-9.695a12.597 12.597 0 0 0-2.499-.523A33.119 33.119 0 0 0 11.573 0zm4.069 7.217c.347 0 .408.005.486.047a.473.473 0 0 1 .237.277c.018.06.023 1.365.018 4.304l-.006 4.218-.744-1.14-.746-1.14v-3.066c0-1.982.01-3.097.023-3.15a.478.478 0 0 1 .233-.296c.096-.05.13-.054.5-.054z"/>
                  </svg>
                  {/* Tooltip */}
                  <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                    isDark ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-800 text-white'
                  }`}>Next.js</span>
                </div>

                {/* Tailwind CSS Icon */}
                <div 
                  className={`p-2 rounded-lg transition-all hover:scale-110 cursor-pointer group relative ${
                    isDark ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                  title="Tailwind CSS"
                >
                  <svg className="w-5 h-5 text-[#06B6D4]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12.001 4.8c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624C13.666 10.618 15.027 12 18.001 12c3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C16.337 6.182 14.976 4.8 12.001 4.8zm-6 7.2c-3.2 0-5.2 1.6-6 4.8 1.2-1.6 2.6-2.2 4.2-1.8.913.228 1.565.89 2.288 1.624 1.177 1.194 2.538 2.576 5.512 2.576 3.2 0 5.2-1.6 6-4.8-1.2 1.6-2.6 2.2-4.2 1.8-.913-.228-1.565-.89-2.288-1.624C10.337 13.382 8.976 12 6.001 12z"/>
                  </svg>
                  {/* Tooltip */}
                  <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                    isDark ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-800 text-white'
                  }`}>Tailwind CSS</span>
                </div>

                {/* Motion Icon */}
                <div 
                  className={`p-2 rounded-lg transition-all hover:scale-110 cursor-pointer group relative ${
                    isDark ? 'bg-neutral-700 hover:bg-neutral-600' : 'bg-neutral-100 hover:bg-neutral-200'
                  }`}
                  title="Motion"
                >
                  <svg className="w-5 h-5 text-[#FF0080]" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M4 4l7.07 16 2.51-7.39L21 10.07z"/>
                  </svg>
                  {/* Tooltip */}
                  <span className={`absolute -top-8 left-1/2 -translate-x-1/2 px-2 py-1 text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none ${
                    isDark ? 'bg-neutral-800 text-neutral-200' : 'bg-neutral-800 text-white'
                  }`}>Motion</span>
                </div>
              </motion.div>

              {/* CTA Buttons */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="flex items-center gap-6"
              >
                <LiquidButton 
                  text="Browse Components" 
                  backgroundColor={isDark ? "bg-white" : "bg-black"}
                  textColor={isDark ? "text-black" : "text-white"}
                  className="!p-0" // Override padding wrapper
                />
              </motion.div>

            </div>

          </div>
        </motion.div>

        {/* --- Logo Strip --- */}
        {/* <div className="mt-16 flex flex-wrap justify-center md:justify-between items-center gap-8 opacity-60 grayscale hover:grayscale-0 transition-all duration-500 px-4">
           <span className="text-xl font-bold font-serif">Rakuten</span>
           <span className="text-xl font-bold font-mono">NCR</span>
           <span className="text-xl font-bold font-sans tracking-tighter">monday.com</span>
           <span className="text-xl font-bold font-serif italic">Disney</span>
           <span className="text-xl font-bold font-sans flex items-center gap-1">
             <div className="w-4 h-4 bg-current" /> Dropbox
           </span>
        </div> */}

      </main>
    </div>
  );
}
