"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { InternalAnimatedTabs } from "@/components/internal/internal-animated-tabs";
import { motion } from "framer-motion";

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
  code?: string;
  cliCommand?: string;
  hideCodeTab?: boolean; // Hide the Code tab at the top but keep Manual tab in Installation
  previewClassName?: string; // Custom className for the preview container
}

export function Preview({ children, className, code, cliCommand, hideCodeTab = false, previewClassName }: PreviewProps) {
  console.log('Preview props:', { hasCode: !!code, hasCliCommand: !!cliCommand, cliCommand });
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">("preview");
  const [installTab, setInstallTab] = React.useState<"cli" | "manual">("cli");
  const [copied, setCopied] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [language, setLanguage] = React.useState<"tsx" | "jsx">("tsx");
  const [expanded, setExpanded] = React.useState(false);
  const [expandedManual, setExpandedManual] = React.useState(false);
  const [showPromptDropdown, setShowPromptDropdown] = React.useState(false);
  const [copiedPrompt, setCopiedPrompt] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastPlatform, setToastPlatform] = React.useState("");
  const [packageManager, setPackageManager] = React.useState<'npm' | 'pnpm' | 'yarn' | 'bun'>('npm');

  const getPackageManagerCommand = () => {
    if (!cliCommand) return '';
    
    const commands = {
      npm: cliCommand,
      pnpm: cliCommand.replace('npx', 'pnpm dlx'),
      yarn: cliCommand.replace('npx', 'yarn dlx'),
      bun: cliCommand.replace('npx', 'bunx')
    };
    
    return commands[packageManager];
  };

  const convertToJSX = (tsxCode: string) => {
    return tsxCode
      .replace(/: React\.ReactNode/g, "")
      .replace(/: ReactNode/g, "")
      .replace(/: string/g, "")
      .replace(/: number/g, "")
      .replace(/: boolean/g, "")
      .replace(/: any/g, "")
      .replace(/interface\s+\w+\s*{[^}]*}/g, "")
      .replace(/type\s+\w+\s*=\s*[^;]+;/g, "")
      .replace(/<[^>]+>\s*\(/g, "(")
      .replace(/\)\s*:\s*\w+(\[\])?(\s*=>)/g, ")$2")
      .replace(/const\s+(\w+):\s*\w+(\[\])?(\s*=)/g, "const $1$3")
      .replace(/let\s+(\w+):\s*\w+(\[\])?(\s*=)/g, "let $1$3")
      .replace(/\s+as\s+\w+/g, "")
      .replace(/\.tsx/g, ".jsx")
      .replace(/\.ts/g, ".js");
  };

  const displayCode = language === "jsx" && code ? convertToJSX(code) : code;

  const copyToClipboard = async () => {
    if (displayCode) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(displayCode);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = displayCode;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const copyCli = async () => {
    const commandToCopy = getPackageManagerCommand();
    if (commandToCopy) {
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(commandToCopy);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = commandToCopy;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        setCopiedCli(true);
        setTimeout(() => setCopiedCli(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  const copyPrompt = async (platform: string) => {
    if (displayCode) {
      setIsLoading(true);
      setShowPromptDropdown(false);
      
      let prompt = "";
      
      switch (platform) {
        case "Claude":
          prompt = `I need you to create a React component with the following specifications:

Component Code:
\`\`\`tsx
${displayCode}
\`\`\`

Please recreate this exact component with:
- Same styling and layout
- Same functionality and interactions
- Using React, TypeScript, and Tailwind CSS
- Ensure it's production-ready and follows best practices`;
          break;
          
        case "v0":
          prompt = `Create a React component that matches this implementation:

\`\`\`tsx
${displayCode}
\`\`\`

Requirements:
- Use shadcn/ui components where applicable
- Match the exact styling and behavior
- TypeScript with proper types
- Tailwind CSS for styling`;
          break;
          
        case "Lovable":
          prompt = `Build this React component:

\`\`\`tsx
${displayCode}
\`\`\`

Make it pixel-perfect with the same design, animations, and functionality. Use modern React patterns and Tailwind CSS.`;
          break;
          
        case "Bolt":
          prompt = `Create this React component with TypeScript and Tailwind CSS:

\`\`\`tsx
${displayCode}
\`\`\`

Ensure it's fully functional, responsive, and matches the original design exactly.`;
          break;
          
        default:
          prompt = `Create this component:\n\n${displayCode}`;
      }
      
      try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
          await navigator.clipboard.writeText(prompt);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = prompt;
          textArea.style.position = 'fixed';
          textArea.style.left = '-999999px';
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
        
        setTimeout(() => {
          setIsLoading(false);
          setToastPlatform(platform);
          setShowToast(true);
          
          setTimeout(() => {
            setShowToast(false);
          }, 5000);
        }, 500);
      } catch (err) {
        setIsLoading(false);
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className={cn("my-6 w-full", className)}>
      {/* Premium Toast Notification */}
      {showToast && (
        <div className="fixed bottom-6 right-6 z-50 animate-in slide-in-from-bottom-4 duration-500">
          <div className="group relative bg-gradient-to-br from-background/95 via-background/90 to-background/95 border border-border/50 rounded-2xl shadow-2xl backdrop-blur-xl p-5 max-w-sm overflow-hidden">
            {/* Gradient Border Effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-500/20 via-neutral-300/10 to-neutral-100/20 rounded-2xl opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
            
            {/* Shimmer Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500" />
            
            {/* Content */}
            <div className="relative flex items-start gap-4">
              {/* Animated Success Icon */}
              <div className="relative flex-shrink-0">
                {/* Pulsing Background */}
                <div className="absolute inset-0 bg-neutral-500/20 rounded-full animate-ping" />
                <div className="absolute inset-0 bg-gradient-to-br from-neutral-400 to-neutral-600 rounded-full opacity-20 blur-md" />
                
                {/* Icon Container */}
                <div className="relative bg-gradient-to-br from-neutral-50 to-neutral-100 rounded-full p-2 shadow-lg shadow-white/30">
                  <svg className="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
              
              {/* Text Content */}
              <div className="flex-1 pt-0.5">
                <p className="text-sm font-semibold text-foreground bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">
                  Prompt copied for {toastPlatform}!
                </p>
                <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">
                  Paste this in <span className="font-medium text-foreground/70">{toastPlatform}</span> to get the same output
                </p>
              </div>
              
              {/* Close Button */}
              <button
                onClick={() => setShowToast(false)}
                className="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors rounded-lg p-1 hover:bg-accent/50"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Progress Bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-neutral-200/20 via-nutral-200/20 to-neutral-100/20 rounded-b-2xl overflow-hidden">
              <div className="h-full bg-gradient-to-r from-neutral-500 via-neutral-500 to-neutral-500 animate-[shrink_2s_linear_forwards] origin-left" />
            </div>
          </div>
        </div>
      )}

      {/* Tabs & Copy Prompt - Outside Container */}
      {code && !hideCodeTab && (
        <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
          <div className="flex">
            <InternalAnimatedTabs
              tabs={[
                { id: "preview", label: "Preview" },
                { id: "code", label: "Code" }
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
              layoutId="preview-code-tabs"
            />
          </div>

          {/* Copy Prompt Dropdown */}
          <div className="relative">
            <button
              onClick={() => setShowPromptDropdown(!showPromptDropdown)}
              disabled={isLoading}
              className={cn(
                "px-3 py-1.5 text-xs font-medium rounded-lg transition-colors flex items-center gap-2",
                isLoading 
                  ? "text-muted-foreground bg-muted cursor-not-allowed"
                  : "text-primary-foreground bg-primary hover:bg-primary/90"
              )}
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin h-3 w-3" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Copying...
                </>
              ) : (
                <>
                  Copy Prompt
                  <ChevronDown className={cn("w-3 h-3 transition-transform", showPromptDropdown && "rotate-180")} />
                </>
              )}
            </button>
            
            {showPromptDropdown && !isLoading && (
              <div className="absolute top-full right-0 mt-2 w-32 bg-popover border border-border rounded-lg shadow-lg overflow-hidden p-2 z-50">
                {["Claude", "Lovable", "v0", "Bolt"].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => copyPrompt(platform)}
                    className="w-full px-3 py-2 text-xs text-left text-muted-foreground hover:text-foreground hover:bg-accent hover:rounded-lg transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Content Container */}
      <div className="rounded-xl border border-border backdrop-blur-sm w-full bg-white dark:bg-card not-prose">
        {(hideCodeTab || activeTab === "preview") ? (
          <div className={`relative flex w-full items-center justify-center p-4 sm:p-8 md:p-10 min-h-[350px] bg-neutral-100 dark:bg-black rounded-xl overflow-visible not-prose ${previewClassName || ''}`}>
            {children}
          </div>
        ) : (
          <div className="relative">
            {/* Language Selector & Copy Button */}
            <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
              <div className="flex bg-muted rounded-lg p-0.5">
                <button
                  onClick={() => setLanguage("tsx")}
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium transition-colors rounded-md",
                    language === "tsx"
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  .tsx
                </button>
                <button
                  onClick={() => setLanguage("jsx")}
                  className={cn(
                    "px-2.5 py-1 text-xs font-medium transition-colors rounded-md",
                    language === "jsx"
                      ? "text-foreground bg-accent"
                      : "text-muted-foreground hover:text-foreground"
                  )}
                >
                  .jsx
                </button>
              </div>
              <button
                onClick={copyToClipboard}
                className="px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-accent rounded-lg transition-colors flex items-center gap-2"
              >
                {copied ? (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    Copied!
                  </>
                ) : (
                  <>
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy
                  </>
                )}
              </button>
            </div>
            
            <div className="relative">
              <div className={cn("overflow-x-auto w-full", !expanded && "max-h-[400px] overflow-hidden")}>
                <SyntaxHighlighter
                  language={language}
                  style={theme === "light" ? materialLight : materialDark}
                  customStyle={{
                    margin: 0,
                    padding: "1.5rem",
                    paddingTop: "3.5rem",
                    paddingBottom: expanded ? "1.5rem" : "4rem",
                    background: "tranparent", 
                    fontSize: "0.875rem",
                    border: "none",
                    boxShadow: "none",
                    outline: "none",
                  }}
                  codeTagProps={{
                    style: {
                      background: "none",
                      textShadow: "none",
                      border: "none",
                    },
                  }}
                  lineProps={{
                    style: {
                      border: "none",
                      borderTop: "none",
                      borderBottom: "none",
                      boxShadow: "none",
                      backgroundImage: "none",
                      background: "transparent",
                    },
                  }}
                >
                  {displayCode || ""}
                </SyntaxHighlighter>
              </div>
              
              {!expanded && (
                <>
                  <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
                  <button
                    onClick={() => setExpanded(true)}
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 flex items-center gap-2 text-sm text-foreground hover:text-foreground bg-background/80 backdrop-blur-xs rounded-md transition-colors border border-border"
                  >
                    <ChevronDown className="w-4 h-4" />
                    Expand Code
                  </button>
                </>
              )}
              
              {expanded && (
                <button
                  onClick={() => setExpanded(false)}
                  className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 flex items-center gap-2 text-sm text-foreground hover:text-foreground bg-background/80 backdrop-blur-xs rounded-md transition-colors border border-border"
                >
                  <ChevronUp className="w-4 h-4" />
                  Collapse Code
                </button>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Installation Section */}
      {cliCommand && code && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold text-foreground mb-3">Installation</h3>
          
          {/* Installation Tabs */}
          <div className="flex mb-3">
            <InternalAnimatedTabs
              tabs={[
                { id: "cli", label: "CLI" },
                { id: "manual", label: "Manual" }
              ]}
              activeTab={installTab}
              onChange={setInstallTab}
              layoutId="install-tabs"
            />
          </div>

          {/* Installation Content */}
          <div className="rounded-xl border border-border bg-card backdrop-blur-sm overflow-hidden w-full">
            {installTab === "cli" ? (
              <div className="w-full">
                <div className="relative rounded-xl border border-border bg-zinc-50 dark:bg-zinc-950 overflow-hidden">
                  <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-zinc-100/50 dark:bg-zinc-900/50">
                    <div className="flex items-center gap-6">
                      {[
                        { 
                          id: 'npm', 
                          label: 'npm', 
                          icon: (
                            <svg className="w-3 h-3" viewBox="0 0 128 128" fill="currentColor">
                              <path fill="#cb3837" d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"/>
                            </svg>
                          ) 
                        },
                        { 
                          id: 'pnpm', 
                          label: 'pnpm', 
                          icon: (
                            <svg className="w-3 h-3" viewBox="0 0 128 128" fill="currentColor">
                              <path fill="#f9ad00" d="M32.287 14.902v30.685h29.908V14.902Zm32.899 0v30.685h29.909V14.902Zm32.905 0v30.685H128V14.902Zm0 33.754v30.688H128V48.656z"/><path fill="#4e4e4e" d="M65.186 48.656v30.688h29.909V48.656zm-60.023 9.37c-.88 0-1.676.093-2.386.278-.71.186-1.304.432-1.782.74a2.994 2.994 0 0 0-.74.72c-.17.262-.255.6-.255 1.017v11.114c0 .386.045.693.138.925.092.247.232.44.417.58.185.138.41.23.672.277.278.046.585.07.925.07.355 0 .703-.03 1.042-.093a5.19 5.19 0 0 0 .742-.14v-3.841a5.54 5.54 0 0 0 1.852.3c.88 0 1.674-.123 2.384-.37a4.884 4.884 0 0 0 1.852-1.112c.51-.51.904-1.134 1.182-1.874.278-.741.415-1.606.415-2.594 0-1.035-.16-1.921-.485-2.662a5.083 5.083 0 0 0-1.344-1.877c-.571-.493-1.257-.856-2.06-1.087a8.531 8.531 0 0 0-2.569-.37Zm14.006 0c-.972 0-1.861.117-2.664.348-.787.232-1.442.532-1.967.903a2.988 2.988 0 0 0-.74.717c-.17.262-.255.603-.255 1.02v6.945c0 .386.045.702.138.95.108.23.255.415.44.554.185.14.41.232.672.278.278.046.587.07.927.07a7.18 7.18 0 0 0 1.017-.07c.34-.046.588-.092.742-.138v-8.035c.217-.154.47-.27.763-.347a3.83 3.83 0 0 1 .927-.115c.463 0 .825.116 1.087.347.278.216.418.564.418 1.042v5.464c0 .386.047.702.14.95.107.23.254.415.44.554.184.14.407.232.67.278.277.046.587.07.926.07a7.18 7.18 0 0 0 1.018-.07c.34-.046.587-.092.742-.138v-7.247c0-1.359-.47-2.415-1.412-3.172-.942-.771-2.285-1.157-4.029-1.157zm13.036 0c-.88 0-1.677.093-2.387.278-.71.186-1.303.432-1.782.74a2.995 2.995 0 0 0-.74.72c-.17.262-.255.6-.255 1.017v11.114c0 .386.045.693.138.925.093.247.232.44.417.58.185.138.41.23.672.277.278.046.586.07.925.07.355 0 .703-.03 1.042-.093a5.19 5.19 0 0 0 .742-.14v-3.841a5.54 5.54 0 0 0 1.852.3c.88 0 1.675-.123 2.385-.37a4.884 4.884 0 0 0 1.852-1.112 5.197 5.197 0 0 0 1.18-1.874c.277-.741.417-1.606.417-2.594 0-1.035-.161-1.921-.485-2.662-.325-.757-.774-1.383-1.345-1.877-.57-.493-1.257-.856-2.06-1.087a8.531 8.531 0 0 0-2.568-.37zm13.773 0c-.849 0-1.667.117-2.454.348-.772.232-1.42.532-1.945.903a3.204 3.204 0 0 0-.74.694c-.17.248-.254.578-.254.995v6.993c0 .386.045.702.137.95.108.23.255.415.44.554.185.14.41.232.672.278.278.046.588.07.927.07.355 0 .694-.024 1.018-.07.34-.046.587-.092.742-.138v-8.127c.139-.077.307-.156.507-.232.2-.093.442-.138.72-.138.401 0 .74.109 1.017.325.293.2.44.531.44.995v5.533c0 .386.047.702.14.95.108.23.254.415.44.554.185.14.41.232.672.278.278.046.585.07.925.07.34 0 .67-.024.995-.07a6.53 6.53 0 0 0 .764-.138v-7.85a.765.765 0 0 0-.022-.185c.123-.108.308-.207.555-.3.246-.108.478-.162.694-.162.448 0 .803.109 1.065.325.262.2.395.531.395.995v5.533c0 .386.045.702.137.95.108.23.255.415.44.554.185.14.41.232.672.278.278.046.588.07.927.07.355 0 .694-.024 1.018-.07.34-.046.587-.092.742-.138V62.31c0-.787-.132-1.451-.395-1.991-.262-.556-.617-.996-1.065-1.32a4.164 4.164 0 0 0-1.504-.742 6.364 6.364 0 0 0-1.714-.23c-.818 0-1.52.099-2.107.3a6.933 6.933 0 0 0-1.55.765 4.434 4.434 0 0 0-1.6-.788 6.261 6.261 0 0 0-1.851-.277zm-40.677 3.08c.74 0 1.304.238 1.69.717.4.48.602 1.211.602 2.2 0 1.898-.795 2.848-2.385 2.848-.246 0-.478-.03-.694-.092a3.515 3.515 0 0 1-.603-.232v-5.094c.17-.092.371-.17.603-.232.231-.077.494-.115.787-.115zm27.041 0c.741 0 1.304.238 1.69.717.401.48.602 1.211.602 2.2 0 1.898-.794 2.848-2.384 2.848a2.51 2.51 0 0 1-.695-.092 3.516 3.516 0 0 1-.602-.232v-5.094c.17-.092.37-.17.602-.232.232-.077.494-.115.787-.115zm-.055 21.307v30.685h29.908V82.413Zm32.899 0v30.685h29.909V82.413Zm32.905 0v30.685H128V82.413Z"/>
                            </svg>
                          ) 
                        },
                        { 
                          id: 'bun', 
                          label: 'bun', 
                          icon: (
                            <svg className="w-3 h-3" viewBox="0 0 128 128" fill="currentColor">
                              <path d="M113.744 41.999a18.558 18.558 0 0 0-.8-.772c-.272-.246-.528-.524-.8-.771s-.528-.525-.8-.771c-.272-.247-.528-.525-.8-.772s-.528-.524-.8-.771-.528-.525-.8-.772-.528-.524-.8-.771c7.936 7.52 12.483 17.752 12.656 28.481 0 25.565-26.912 46.363-60 46.363-18.528 0-35.104-6.526-46.128-16.756l.8.772.8.771.8.772.8.771.8.772.8.771.8.771c11.008 10.662 27.952 17.527 46.928 17.527 33.088 0 60-20.797 60-46.285 0-10.893-4.864-21.215-13.456-29.33z"/><path fill="#fbf0df" d="M116.8 65.08c0 23.467-25.072 42.49-56 42.49s-56-19.023-56-42.49c0-14.55 9.6-27.401 24.352-35.023C43.904 22.435 53.088 14.628 60.8 14.628S75.104 21 92.448 30.058C107.2 37.677 116.8 50.53 116.8 65.08Z"/><path fill="#f6dece" d="M116.8 65.08a32.314 32.314 0 0 0-1.28-8.918c-4.368 51.377-69.36 53.846-94.912 38.48 11.486 8.584 25.66 13.144 40.192 12.928 30.88 0 56-19.054 56-42.49z"/><path fill="#fffefc" d="M39.248 27.234c7.152-4.135 16.656-11.896 26-11.911a15.372 15.372 0 0 0-4.448-.695c-3.872 0-8 1.93-13.2 4.83-1.808 1.018-3.68 2.144-5.664 3.317-3.728 2.222-8 4.736-12.8 7.251C13.904 37.972 4.8 51.071 4.8 65.08v1.836c9.696-33.033 27.312-35.547 34.448-39.682z"/><path fill="#ccbea7" d="M56.192 18.532A24.553 24.553 0 0 1 53.867 29.1a25.407 25.407 0 0 1-6.683 8.671c-.448.386-.096 1.127.48.91 5.392-2.02 12.672-8.068 9.6-20.272-.128-.695-1.072-.51-1.072.123zm3.632 0a24.474 24.474 0 0 1 3.646 10.12c.445 3.587.08 7.224-1.07 10.662-.192.54.496 1.003.88.556 3.504-4.32 6.56-12.899-2.592-22.156-.464-.4-1.184.216-.864.756zm4.416-.262a25.702 25.702 0 0 1 7.521 7.925A24.71 24.71 0 0 1 75.2 36.414c-.016.13.02.26.101.365a.543.543 0 0 0 .718.117.509.509 0 0 0 .221-.313c1.472-5.384.64-14.564-11.472-19.332-.64-.246-1.056.587-.528.957zM34.704 34.315a27.418 27.418 0 0 0 9.91-5.222 26.262 26.262 0 0 0 6.842-8.663c.288-.556 1.2-.34 1.056.277-2.768 12.343-12.032 14.92-17.792 14.58-.608.016-.592-.802-.016-.972z"/><path d="M60.8 111.443c-33.088 0-60-20.798-60-46.363 0-15.429 9.888-29.823 26.448-38.448 4.8-2.469 8.912-4.953 12.576-7.128 2.016-1.203 3.92-2.33 5.76-3.379C51.2 12.916 56 10.771 60.8 10.771c4.8 0 8.992 1.852 14.24 4.845 1.6.88 3.2 1.836 4.912 2.885 3.984 2.376 8.48 5.06 14.4 8.131 16.56 8.625 26.448 23.004 26.448 38.448 0 25.565-26.912 46.363-60 46.363zm0-96.814c-3.872 0-8 1.928-13.2 4.829-1.808 1.018-3.68 2.144-5.664 3.317-3.728 2.222-8 4.736-12.8 7.251C13.904 37.972 4.8 51.071 4.8 65.08c0 23.436 25.12 42.506 56 42.506s56-19.07 56-42.506c0-14.01-9.104-27.108-24.352-35.023-6.048-3.086-10.768-5.986-14.592-8.27-1.744-1.033-3.344-1.99-4.8-2.838-4.848-2.778-8.384-4.32-12.256-4.32z"/><path fill="#b71422" d="M72.08 76.343c-.719 2.839-2.355 5.383-4.672 7.267a11.07 11.07 0 0 1-6.4 2.9 11.13 11.13 0 0 1-6.608-2.9c-2.293-1.892-3.906-4.436-4.608-7.267a1.073 1.073 0 0 1 .05-.5 1.11 1.11 0 0 1 .272-.428 1.19 1.19 0 0 1 .958-.322h19.744a1.185 1.185 0 0 1 .947.33 1.073 1.073 0 0 1 .317.92z"/><path fill="#ff6164" d="M54.4 83.733a11.24 11.24 0 0 0 6.592 2.932 11.239 11.239 0 0 0 6.576-2.932 16.652 16.652 0 0 0 1.6-1.65 10.904 10.904 0 0 0-3.538-2.564 11.26 11.26 0 0 0-4.302-1 10.121 10.121 0 0 0-4.549 1.192 9.71 9.71 0 0 0-3.451 3.097c.368.323.688.632 1.072.925z"/><path d="M54.656 82.514a8.518 8.518 0 0 1 2.97-2.347 8.836 8.836 0 0 1 3.734-.862 9.78 9.78 0 0 1 6.4 2.608c.368-.386.72-.787 1.056-1.188-2.035-1.87-4.726-2.933-7.536-2.978a10.487 10.487 0 0 0-4.335.975 10.125 10.125 0 0 0-3.489 2.666c.378.396.779.772 1.2 1.126z"/><path d="M60.944 87.436a12.078 12.078 0 0 1-7.12-3.086c-2.477-2.02-4.22-4.75-4.976-7.791-.054-.27-.045-.55.027-.817a1.83 1.83 0 0 1 .389-.726 2.25 2.25 0 0 1 .81-.595 2.32 2.32 0 0 1 .998-.192h19.744c.343-.007.683.06.996.196a2.3 2.3 0 0 1 .812.591c.182.212.313.46.382.728.07.267.076.545.018.815-.756 3.042-2.5 5.771-4.976 7.791a12.078 12.078 0 0 1-7.104 3.086zm-9.872-11.417c-.256 0-.32.108-.336.139.676 2.638 2.206 4.999 4.368 6.742a10.122 10.122 0 0 0 5.84 2.7 10.207 10.207 0 0 0 5.84-2.67c2.155-1.745 3.679-4.106 4.352-6.741a.333.333 0 0 0-.14-.113.348.348 0 0 0-.18-.026z"/><path fill="#febbd0" d="M85.152 77.3c5.17 0 9.36-2.377 9.36-5.308s-4.19-5.307-9.36-5.307c-5.17 0-9.36 2.376-9.36 5.307 0 2.931 4.19 5.307 9.36 5.307zm-48.432 0c5.17 0 9.36-2.377 9.36-5.308s-4.19-5.307-9.36-5.307c-5.17 0-9.36 2.376-9.36 5.307 0 2.931 4.19 5.307 9.36 5.307z"/><path d="M41.12 69.863a9.052 9.052 0 0 0 4.902-1.425 8.578 8.578 0 0 0 3.254-3.812 8.22 8.22 0 0 0 .508-4.913 8.41 8.41 0 0 0-2.408-4.357 8.92 8.92 0 0 0-4.514-2.33 9.12 9.12 0 0 0-5.096.48 8.755 8.755 0 0 0-3.96 3.131 8.287 8.287 0 0 0-1.486 4.725c0 2.252.927 4.412 2.577 6.005 1.65 1.594 3.888 2.492 6.223 2.496zm39.632 0a9.054 9.054 0 0 0 4.915-1.403 8.582 8.582 0 0 0 3.275-3.802 8.22 8.22 0 0 0 .528-4.917 8.408 8.408 0 0 0-2.398-4.368 8.92 8.92 0 0 0-4.512-2.344 9.12 9.12 0 0 0-5.103.473 8.756 8.756 0 0 0-3.967 3.13 8.287 8.287 0 0 0-1.49 4.73c-.004 2.245.914 4.4 2.555 5.994 1.64 1.593 3.869 2.495 6.197 2.507z"/><path fill="#fff" d="M38.4 61.902a3.4 3.4 0 0 0 1.844-.531c.547-.35.974-.847 1.227-1.43a3.088 3.088 0 0 0 .195-1.847 3.16 3.16 0 0 0-.902-1.639 3.351 3.351 0 0 0-1.696-.878 3.426 3.426 0 0 0-1.916.179 3.29 3.29 0 0 0-1.489 1.176 3.113 3.113 0 0 0-.559 1.776c0 .844.347 1.654.964 2.253a3.374 3.374 0 0 0 2.332.94zm39.632 0a3.4 3.4 0 0 0 1.844-.531c.547-.35.974-.847 1.227-1.43a3.088 3.088 0 0 0 .195-1.847 3.16 3.16 0 0 0-.902-1.639 3.351 3.351 0 0 0-1.696-.878 3.426 3.426 0 0 0-1.916.179 3.29 3.29 0 0 0-1.489 1.176 3.113 3.113 0 0 0-.559 1.776c0 .84.342 1.644.953 2.242.61.598 1.44.94 2.311.952z"/>
                            </svg>
                          ) 
                        },
                        { 
                          id: 'yarn', 
                          label: 'yarn', 
                          icon: (
                            <svg className="w-3 h-3" viewBox="0 0 512 512" fill="currentColor">
                              <path d="M256 0c141.344 0 256 114.656 256 256S397.344 512 256 512 0 397.344 0 256 114.656 0 256 0z" fill="#2c8ebb" fillRule="nonzero"/><path d="M430.16 333.59c-1.78-14.035-13.641-23.721-28.863-23.524-22.733.297-41.81 12.06-54.461 19.868-4.943 3.064-9.193 5.337-12.85 7.017.79-11.465.099-26.49-5.832-42.996-7.215-19.768-16.901-31.926-23.82-38.943 8.006-11.664 18.977-28.665 24.117-54.956 4.448-22.437 3.064-57.329-7.117-76.9-2.075-3.953-5.535-6.82-9.884-8.005-1.779-.495-5.14-1.483-11.762.395-9.983-20.658-13.442-22.832-16.111-24.612-5.535-3.558-12.059-4.349-18.187-2.075-8.204 2.965-15.222 10.872-21.844 24.908-.988 2.075-1.878 4.052-2.669 6.03-12.553.889-32.321 5.435-49.025 23.523-2.076 2.274-6.128 3.954-10.379 5.536h.1c-8.699 3.064-12.653 10.18-17.496 23.03-6.721 17.989.198 35.682 7.018 47.147-9.291 8.303-21.646 21.548-28.17 37.066-8.105 19.175-8.994 37.955-8.698 48.136-6.919 7.314-17.594 21.053-18.78 36.472-1.581 21.548 6.227 36.176 9.687 41.514.988 1.581 2.075 2.866 3.261 4.151-.395 2.669-.494 5.535.1 8.5 1.284 6.92 5.633 12.553 12.256 16.112 13.047 6.919 31.234 9.884 45.27 2.866 5.04 5.338 14.232 10.477 30.937 10.477h.988c4.25 0 58.218-2.866 73.934-6.72 7.017-1.681 11.86-4.646 15.023-7.315 10.082-3.163 37.956-12.652 64.248-29.653 18.582-12.058 25.007-14.628 38.844-17.989 13.443-3.262 21.844-15.518 20.164-29.06zm-23.525 14.53c-15.815 3.756-23.821 7.216-43.392 19.966-30.542 19.769-63.95 28.961-63.95 28.961s-2.768 4.151-10.774 6.03c-13.838 3.36-65.927 6.226-70.672 6.325-12.75.1-20.559-3.261-22.733-8.5-6.623-15.815 9.488-22.734 9.488-22.734s-3.558-2.174-5.634-4.151c-1.878-1.878-3.854-5.634-4.448-4.25-2.47 6.03-3.756 20.757-10.378 27.379-9.093 9.192-26.292 6.128-36.473.79-11.169-5.93.791-19.866.791-19.866s-6.03 3.558-10.872-3.756c-4.35-6.722-8.402-18.187-7.315-32.322 1.186-16.11 19.176-31.728 19.176-31.728s-3.163-23.82 7.215-48.235c9.39-22.239 34.694-40.13 34.694-40.13s-21.251-23.524-13.344-44.676c5.14-13.838 7.215-13.739 8.896-14.332 5.93-2.273 11.663-4.744 15.913-9.39 21.251-22.931 48.334-18.582 48.334-18.582s12.85-39.043 24.71-31.432c3.657 2.372 16.803 31.63 16.803 31.63s14.036-8.204 15.617-5.14c8.5 16.506 9.49 48.037 5.733 67.212-6.326 31.63-22.14 48.63-28.466 59.305-1.483 2.471 17 10.28 28.664 42.601 10.774 29.554 1.186 54.363 2.866 57.13.297.495.396.692.396.692s12.355.989 37.164-14.332c13.245-8.204 28.96-17.396 46.851-17.593 17.297-.297 18.187 19.966 5.14 23.128z" fill="#fff" fillRule="nonzero"/>
                            </svg>
                          ) 
                        },
                      ].map((pm) => (
                         <button
                           key={pm.id}
                           onClick={() => setPackageManager(pm.id as any)}
                           className={cn(
                             "flex items-center gap-2 text-sm font-medium transition-colors relative py-1",
                             packageManager === pm.id 
                              ? "text-foreground" 
                              : "text-muted-foreground hover:text-foreground"
                           )}
                         >
                           {pm.icon}
                           {pm.label}
                           {packageManager === pm.id && (
                             <motion.div
                               layoutId="install-pm-active"
                               className="absolute -bottom-[13px] left-0 right-0 h-[1.5px] bg-primary shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                             />
                           )}
                         </button>
                      ))}
                    </div>
                    
                    {/* Copy Button */}
                    <button
                        onClick={copyCli}
                        className="text-muted-foreground hover:text-foreground transition-colors p-1"
                        title="Copy Command"
                    >
                         {copiedCli ? (
                            <svg className="w-4 h-4 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                         ) : (
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>
                         )}
                    </button>
                  </div>
                  
                  {/* Command */}
                  <div className="font-mono text-sm bg-zinc-50 dark:bg-black/50 overflow-x-auto transition-colors duration-200">
                     <SyntaxHighlighter
                        language="bash"
                        style={theme === "light" ? materialLight : materialDark}
                        customStyle={{
                          margin: 0,
                          padding: "1rem",
                          background: "transparent",
                          fontSize: "0.875rem",
                          border: "none",
                          boxShadow: "none",
                          outline: "none",
                        }}
                        codeTagProps={{
                          style: {
                            background: "none",
                            textShadow: "none",
                            border: "none",
                          },
                        }}
                        lineProps={{
                          style: {
                            border: "none",
                            borderTop: "none",
                            borderBottom: "none",
                            boxShadow: "none",
                            backgroundImage: "none",
                            background: "transparent",
                          },
                        }}
                     >
                        {getPackageManagerCommand()}
                     </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3 break-words">Copy and paste the following code into your project:</p>
                  <div className="relative">
                    <button
                      onClick={copyToClipboard}
                      className="absolute top-3 right-3 z-10 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-accent rounded-lg transition-colors flex items-center gap-2"
                    >
                      {copied ? (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          Copied!
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                          </svg>
                          Copy
                        </>
                      )}
                    </button>
                    <div className="relative">
                      <div className={cn("overflow-x-auto", !expandedManual && "max-h-[400px] overflow-hidden")}>
                        <SyntaxHighlighter
                          language="tsx"
                          style={materialDark}
                          customStyle={{
                            margin: 0,
                            padding: "1rem",
                            paddingTop: "3rem",
                            paddingBottom: expandedManual ? "1rem" : "4rem",
                            background: "transparent",
                            fontSize: "0.875rem",
                            border: "none",
                            boxShadow: "none",
                            outline: "none",
                          }}
                          codeTagProps={{
                            style: {
                              background: "none",
                              textShadow: "none",
                              border: "none",
                            },
                          }}
                          lineProps={{
                            style: {
                              border: "none",
                              borderTop: "none",
                              borderBottom: "none",
                              boxShadow: "none",
                              backgroundImage: "none",
                              background: "transparent",
                            },
                          }}
                        >
                          {code}
                        </SyntaxHighlighter>
                      </div>
                      
                      {!expandedManual && (
                        <>
                          <div className="absolute bottom-0 left-0 right-0 h-60 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none" />
                          <button
                            onClick={() => setExpandedManual(true)}
                            className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 flex items-center gap-2 text-sm text-foreground hover:text-foreground bg-background/80 backdrop-blur-xs rounded-md transition-colors border border-border"
                          >
                            <ChevronDown className="w-4 h-4" />
                            Expand Code
                          </button>
                        </>
                      )}
                      
                      {expandedManual && (
                        <button
                          onClick={() => setExpandedManual(false)}
                          className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 px-4 py-2 flex items-center gap-2 text-sm text-foreground hover:text-foreground bg-background/80 backdrop-blur-xs rounded-md transition-colors border border-border"
                        >
                          <ChevronUp className="w-4 h-4" />
                          Collapse Code
                        </button>
                      )}
                    </div>
                  </div>
                </div>
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground break-words">Save this as <code className="px-1.5 py-0.5 bg-muted rounded text-xs text-foreground break-all">components/rareui/buttons/loader.tsx</code></p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
