"use client";

import React from "react";
import { motion } from "framer-motion";
import { IconBrandX } from "@tabler/icons-react";

interface Testimonial {
  id: number;
  name: string;
  handle: string;
  avatar: string;
  content: string;
  verified?: boolean;
}

const FEEDBACK_WALL: Testimonial[] = [
  {
    id: 1,
    name: "Pritam",
    handle: "@iPritamX",
    avatar: "https://unavatar.io/twitter/iPritamX",
    content: "Looks sharp!",
    verified: true,
  },
  {
    id: 2,
    name: "Leo Do",
    handle: "@leododev",
    avatar: "https://unavatar.io/twitter/leododev",
    content: "Nice animations",
    verified: true,
  },
  {
    id: 3,
    name: "subhan",
    handle: "@subhanmalik911",
    avatar: "https://unavatar.io/twitter/subhanmalik911",
    content: "Respect How long you been grinding on this? Looks solid already.",
    verified: false,
  },
  {
    id: 4,
    name: "Terence",
    handle: "@terencebuilds",
    avatar: "https://unavatar.io/twitter/terencebuilds",
    content: "This is so cool and will distract me soooo much 😂",
    verified: true,
  },
  {
    id: 5,
    name: "Terence",
    handle: "@terencebuilds",
    avatar: "https://unavatar.io/twitter/terencebuilds",
    content: "This looks really amazing.",
    verified: true,
  },
  {
    id: 6,
    name: "Ilia Stepin",
    handle: "@martbln_dev",
    avatar: "https://unavatar.io/twitter/martbln_dev",
    content: "Love it! 😍",
    verified: true,
  },
  {
    id: 7,
    name: "subhan",
    handle: "@subhanmalik911",
    avatar: "https://unavatar.io/twitter/subhanmalik911",
    content: "This looks clean it's solid work man!",
    verified: false,
  },
  {
    id: 8,
    name: "Ziwen Xu",
    handle: "@ziwenxu_",
    avatar: "https://unavatar.io/twitter/ziwenxu_",
    content: "Love the craft and the detail in this library! Truly amazing work.",
    verified: true,
  },
  {
    id: 9,
    name: "Steven Tey",
    handle: "@steventey",
    avatar: "https://unavatar.io/twitter/steventey",
    content: "The level of polish here is insane. RareUI is a game changer for anyone building high-performance landing pages.",
    verified: true,
  },
];

const PremiumTweetCard = ({ item }: { item: Testimonial }) => (
 <div className="bg-neutral-200/50 dark:bg-neutral-800/30 rounded-xl p-0.5 shadow-sm shadow-black/10 dark:shadow-black/20 ring-1 ring-black/10 dark:ring-white/10">
   <div className="relative p-4 bg-white dark:bg-neutral-900 rounded-lg shadow-sm shadow-black/10 dark:shadow-black/20 border border-neutral-100 dark:border-neutral-800/60 ring-1 ring-black/10 dark:ring-white/5 flex flex-col gap-2 group transition-all duration-300 min-h-[150px] justify-between h-[180px]">
   
    {/* Inner Highlight Layer */}
    <div className="flex items-start justify-between">
      <div className="flex gap-3">
        <div className="w-10 h-10 rounded-full bg-neutral-100 dark:bg-neutral-700 border border-neutral-200 dark:border-neutral-600 overflow-hidden shadow-inner">
           <img src={item.avatar} alt={item.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-sm font-bold text-neutral-900 dark:text-white leading-tight">{item.name}</span>
            {item.verified && (
              <svg viewBox="0 0 24 24" className="w-[14px] h-[14px] text-[#1D9BF0] fill-current">
                <path d="M22.25 12c0-1.43-.88-2.67-2.19-3.34.46-1.39.2-2.97-.81-4.08s-2.47-1.49-3.89-1.29c-.78-1.57-2.34-2.54-4.11-2.54s-3.33.97-4.11 2.54c-1.42-.2-2.88.18-3.89 1.29s-1.27 2.69-.81 4.08c-1.31.67-2.19 1.91-2.19 3.34s.88 2.67 2.19 3.34c-.46 1.39-.2 2.97.81 4.08s2.47 1.49 3.89 1.29c.78 1.57 2.34 2.54 4.11 2.54s-3.33-.97 4.11-2.54c1.42.2 2.88-.18 3.89-1.29s1.27-2.69.81-4.08c1.31-.67 2.19-1.91 2.19-3.34zm-11.71 4.2l-3.5-3.5 1.4-1.4 2.1 2.1 5.3-5.3 1.4 1.4-6.7 6.7z" />
              </svg>
            )}
          </div>
          <span className="text-[12.5px] text-neutral-400 dark:text-neutral-500 font-medium">
            {item.handle}
          </span>
        </div>
      </div>
      <IconBrandX className="w-[18px] h-[18px] text-neutral-200 dark:text-neutral-600" stroke={2} />
    </div>

    <p className="text-[14.5px] leading-relaxed text-neutral-700 dark:text-neutral-300 tracking-tight">
      {item.content}
    </p>
  </div>
 </div>
);

export default function Testimonials() {
  const [items, setItems] = React.useState(FEEDBACK_WALL);

  React.useEffect(() => {
    const shuffleInterval = setInterval(() => {
      setItems((prev) => {
        const next = [...prev];
        // Perform a proper Fisher-Yates shuffle for the entire wall
        for (let i = next.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [next[i], next[j]] = [next[j], next[i]];
        }
        return next;
      });
    }, 5000);

    return () => clearInterval(shuffleInterval);
  }, []);

  return (
    <section className="py-10 bg-neutral-50 dark:bg-neutral-950 relative overflow-hidden transition-colors duration-500">
      <div className="w-[98%] max-w-[1600px] mx-auto px-4 relative z-10">
        <div className="mb-16">
          <h2 className="text-3xl md:text-5xl font-medium tracking-tighter text-neutral-900 dark:text-white mb-4">
            Hear it from <br /> the community
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 max-w-xl text-lg tracking-tight">
            Loved by builders and designers alike. 
            A living wall of proof that is always evolving.
          </p>
        </div>

        {/* Living Shuffle Grid with Edge Masking */}
        <motion.div 
          layout
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-1 py-4 items-start mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
        >
          {items.map((item, i) => (
            <motion.div
              layout="position"
              key={item.id}
              initial={{ 
                opacity: 0, 
                y: 50, 
                scale: 0.9,
                filter: "blur(10px)" 
              }}
              whileInView={{ 
                opacity: 1, 
                y: 0, 
                scale: 1,
                filter: "blur(0px)" 
              }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ 
                layout: {
                  type: "spring",
                  stiffness: 100,
                  damping: 30,
                },
                opacity: { duration: 0.8 },
                y: { duration: 0.8 },
              }}
              className="w-full relative h-fit"
            >
              <PremiumTweetCard item={item} />
            </motion.div>
          ))}
        </motion.div>
      </div>

     
    </section>
  );
}
