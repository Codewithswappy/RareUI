'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { IconChevronDown } from '@tabler/icons-react';

const FAQ_DATA = [
  {
    question: 'Is RareUI completely free to use?',
    answer:
      'Yes, RareUI is 100% free and open-source under the MIT license. You can use it in personal and commercial projects without any restrictions.',
  },
  {
    question: 'Do I need to install RareUI?',
    answer:
      'No installation required! Simply copy the component code and paste it into your project. You can also use our CLI tool: npx rareui add [component-name]',
  },
  {
    question: 'What frameworks does RareUI support?',
    answer:
      'RareUI components are built with React and work seamlessly with Next.js, Remix, Vite, and any React-based framework. They use Tailwind CSS for styling and Framer Motion for animations.',
  },
  {
    question: 'Can I customize the components?',
    answer:
      'Absolutely. Every component is built with clean, readable code using Tailwind CSS classes. You own the code — tweak colors, sizing, animations, and behavior to match your brand perfectly.',
  },
  {
    question: 'Do components support dark mode?',
    answer:
      "Yes! All RareUI components ship with built-in dark mode support using Tailwind's dark: variant. They automatically adapt when your app toggles between light and dark themes.",
  },
  {
    question: 'How do I contribute or request a component?',
    answer:
      'Head to our GitHub repository and open an issue or pull request. We welcome contributions and actively take component requests from the community. New components are shipped every week.',
  },
];

function AccordionItem({
  item,
  isOpen,
  onToggle,
  index,
}: {
  item: (typeof FAQ_DATA)[0];
  isOpen: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        delay: index * 0.06,
        duration: 0.5,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      <button
        onClick={onToggle}
        className="group flex w-full cursor-pointer items-center justify-between py-6 text-left"
        aria-expanded={isOpen}
      >
        <span className="pr-8 text-[15px] font-medium tracking-tight text-neutral-700 transition-colors duration-300 group-hover:text-neutral-900 md:text-[16px] dark:text-neutral-200 dark:group-hover:text-white">
          {item.question}
        </span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 25,
          }}
          className="flex h-6 w-6 shrink-0 items-center justify-center"
        >
          <IconChevronDown
            className="h-4 w-4 text-neutral-400 transition-colors duration-300 group-hover:text-neutral-600 dark:text-neutral-500 dark:group-hover:text-neutral-300"
            stroke={2}
          />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{
              height: 'auto',
              opacity: 1,
              transition: {
                height: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 40,
                },
                opacity: { duration: 0.25, delay: 0.05 },
              },
            }}
            exit={{
              height: 0,
              opacity: 0,
              transition: {
                height: {
                  type: 'spring',
                  stiffness: 400,
                  damping: 40,
                },
                opacity: { duration: 0.2 },
              },
            }}
            className="overflow-hidden"
          >
            <div className="pr-12 pb-6">
              <p className="text-[14px] leading-[1.7] text-neutral-500 md:text-[15px] dark:text-neutral-400">
                {item.answer}
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Separator */}
      <div className="bg-neutral-150 h-px dark:bg-neutral-800/60" />
    </motion.div>
  );
}

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-neutral-50 py-10 transition-colors duration-500 md:py-28 dark:bg-neutral-950">
      <div className="mx-auto w-[98%] max-w-[1600px] px-4">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-[1fr_1.2fr] lg:gap-24">
          {/* Left: Heading */}
          <div className="lg:sticky lg:top-32 lg:self-start">
            <motion.h2
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="mb-5 text-3xl font-medium tracking-tighter text-neutral-900 md:text-5xl dark:text-white"
            >
              Frequently asked <br /> questions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 16, filter: 'blur(8px)' }}
              whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="max-w-sm text-[15px] leading-relaxed text-neutral-500 dark:text-neutral-400"
            >
              Everything you need to know about RareUI. Can&apos;t find what you&apos;re looking
              for?{' '}
              <a
                href="https://github.com/Codewithswappy/RareUI/discussions"
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-700 underline decoration-neutral-300 underline-offset-[3px] transition-colors duration-300 hover:decoration-neutral-500 dark:text-neutral-300 dark:decoration-neutral-700 dark:hover:decoration-neutral-400"
              >
                Ask on GitHub
              </a>
            </motion.p>
          </div>

          {/* Right: Accordion */}
          <div>
            {/* Top separator */}
            <div className="mb-0 h-px bg-neutral-200/80 dark:bg-neutral-800/60" />
            {FAQ_DATA.map((item, i) => (
              <AccordionItem
                key={i}
                item={item}
                index={i}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
