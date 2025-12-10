"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { materialLight } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";
import { ChevronDown, ChevronUp } from "lucide-react";
import { InternalAnimatedTabs } from "@/components/internal/internal-animated-tabs";

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
          <div className={`relative flex w-full items-center justify-center p-4 sm:p-8 md:p-10 min-h-[350px] bg-neutral-100 dark:bg-neutral-900 rounded-xl overflow-visible not-prose ${previewClassName || ''}`}>
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
              <div className="p-4 sm:p-6 space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-3 break-words">Run the following command to install the component:</p>
                  
                  {/* Package Manager Tabs */}
                  <div className="mb-3">
                    <InternalAnimatedTabs
                      tabs={[
                        { id: "npm", label: "npm" },
                        { id: "pnpm", label: "pnpm" },
                        { id: "yarn", label: "yarn" },
                        { id: "bun", label: "bun" }
                      ]}
                      activeTab={packageManager}
                      onChange={setPackageManager}
                      layoutId="pm-tabs"
                      className="w-fit"
                    />
                  </div>

                  <div className="relative">
                    <button
                      onClick={copyCli}
                      className="absolute top-3 right-3 z-10 px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-foreground bg-muted hover:bg-accent rounded-lg transition-colors flex items-center gap-2"
                    >
                      {copiedCli ? (
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
                    <SyntaxHighlighter
                      language="bash"
                      style={materialDark}
                      customStyle={{
                        margin: 0,
                        padding: "1rem",
                        paddingTop: "3rem",
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
                <div className="pt-2 border-t border-border">
                  <p className="text-sm text-muted-foreground break-words">This will install the component to <code className="px-1.5 py-0.5 bg-muted rounded text-xs text-foreground break-all">components/rareui/</code> directory.</p>
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
