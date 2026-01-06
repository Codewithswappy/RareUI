"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  materialDark,
  vs,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import { useTheme } from "next-themes";

const cleanTheme = (theme: any) => {
  const newTheme = { ...theme };

  Object.keys(newTheme).forEach((key) => {
    if (newTheme[key].background) delete newTheme[key].background;
    if (newTheme[key].backgroundColor) delete newTheme[key].backgroundColor;
  });

  return newTheme;
};

const vsClean = cleanTheme(vs);
const materialDarkClean = cleanTheme(materialDark);
import {
  ChevronDown,
  ChevronUp,
  Monitor,
  Smartphone,
  Tablet,
  RotateCcw,
  Check,
  Copy,
  Terminal,
  Sparkles,
  Code2,
  Eye,
} from "lucide-react";
import { InternalAnimatedTabs } from "@/components/internal/internal-animated-tabs";
import { motion, AnimatePresence } from "motion/react";

// --- Icons ---
const ICONS = {
  npm: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 128 128" fill="currentColor">
      <path
        fill="#cb3837"
        d="M2 38.5h124v43.71H64v7.29H36.44v-7.29H2zm6.89 36.43h13.78V53.07h6.89v21.86h6.89V45.79H8.89zm34.44-29.14v36.42h13.78v-7.28h13.78V45.79zm13.78 7.29H64v14.56h-6.89zm20.67-7.29v29.14h13.78V53.07h6.89v21.86h6.89V53.07h6.89v21.86h6.89V45.79z"
      />
    </svg>
  ),
  pnpm: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 128 128" fill="currentColor">
      <path
        fill="#f9ad00"
        d="M32.287 14.902v30.685h29.908V14.902Zm32.899 0v30.685h29.909V14.902Zm32.905 0v30.685H128V14.902Zm0 33.754v30.688H128V48.656z"
      />
      <path
        fill="#4e4e4e"
        d="M65.186 48.656v30.688h29.909V48.656zm-60.023 9.37c-.88 0-1.676.093-2.386.278-.71.186-1.304.432-1.782.74a2.994 2.994 0 0 0-.74.72c-.17.262-.255.6-.255 1.017v11.114c0 .386.045.693.138.925.092.247.232.44.417.58.185.138.41.23.672.277.278.046.585.07.925.07.355 0 .703-.03 1.042-.093a5.19 5.19 0 0 0 .742-.14v-3.841a5.54 5.54 0 0 0 1.852.3c.88 0 1.674-.123 2.384-.37a4.884 4.884 0 0 0 1.852-1.112c.51-.51.904-1.134 1.182-1.874.278-.741.415-1.606.415-2.594 0-1.035-.16-1.921-.485-2.662a5.083 5.083 0 0 0-1.344-1.877c-.571-.493-1.257-.856-2.06-1.087a8.531 8.531 0 0 0-2.569-.37Zm14.006 0c-.972 0-1.861.117-2.664.348-.787.232-1.442.532-1.967.903a2.988 2.988 0 0 0-.74.717c-.17.262-.255.603-.255 1.02v6.945c0 .386.045.702.138.95.108.23.255.415.44.554.185.14.41.232.672.278.278.046.587.07.927.07a7.18 7.18 0 0 0 1.017-.07c.34-.046.588-.092.742-.138v-8.035c.217-.154.47-.27.763-.347a3.83 3.83 0 0 1 .927-.115c.463 0 .825.116 1.087.347.278.216.418.564.418 1.042v5.464c0 .386.047.702.14.95.107.23.254.415.44.554.184.14.407.232.67.278.277.046.587.07.926.07a7.18 7.18 0 0 0 1.018-.07c.34-.046.587-.092.742-.138v-7.247c0-1.359-.47-2.415-1.412-3.172-.942-.771-2.285-1.157-4.029-1.157zm13.036 0c-.88 0-1.677.093-2.387.278-.71.186-1.303.432-1.782.74a2.995 2.995 0 0 0-.74.72c-.17.262-.255.6-.255 1.017v11.114c0 .386.045.693.138.925.093.247.232.44.417.58.185.138.41.23.672.277.278.046.586.07.925.07.355 0 .703-.03 1.042-.093a5.19 5.19 0 0 0 .742-.14v-3.841a5.54 5.54 0 0 0 1.852.3c.88 0 1.675-.123 2.385-.37a4.884 4.884 0 0 0 1.852-1.112 5.197 5.197 0 0 0 1.18-1.874c.277-.741.417-1.606.417-2.594 0-1.035-.161-1.921-.485-2.662-.325-.757-.774-1.383-1.345-1.877-.57-.493-1.257-.856-2.06-1.087a8.531 8.531 0 0 0-2.568-.37zm13.773 0c-.849 0-1.667.117-2.454.348-.772.232-1.42.532-1.945.903a3.204 3.204 0 0 0-.74.694c-.17.248-.254.578-.254.995v6.993c0 .386.045.702.137.95.108.23.255.415.44.554.185.14.41.232.672.278.278.046.588.07.927.07.355 0 .694-.024 1.018-.07.34-.046.587-.092.742-.138v-8.127c.139-.077.307-.156.507-.232.2-.093.442-.138.72-.138.401 0 .74.109 1.017.325.293.2.44.531.44.995v5.533c0 .386.047.702.14.95.108.23.254.415.44.554.185.14.41.232.672.278.278.046.585.07.925.07.34 0 .67-.024.995-.07a6.53 6.53 0 0 0 .764-.138v-7.85a.765.765 0 0 0-.022-.185c.123-.108.308-.207.555-.3.246-.108.478-.162.694-.162.448 0 .803.109 1.065.325.262.2.395.531.395.995v5.533c0 .386.045.702.137.95.108.23.255.415.44.554.185.14.41.232.672.278.278.046.588.07.927.07.355 0 .694-.024 1.018-.07.34-.046.587-.092.742-.138V62.31c0-.787-.132-1.451-.395-1.991-.262-.556-.617-.996-1.065-1.32a4.164 4.164 0 0 0-1.504-.742 6.364 6.364 0 0 0-1.714-.23c-.818 0-1.52.099-2.107.3a6.933 6.933 0 0 0-1.55.765 4.434 4.434 0 0 0-1.6-.788 6.261 6.261 0 0 0-1.851-.277zm-40.677 3.08c.74 0 1.304.238 1.69.717.4.48.602 1.211.602 2.2 0 1.898-.795 2.848-2.385 2.848-.246 0-.478-.03-.694-.092a3.515 3.515 0 0 1-.603-.232v-5.094c.17-.092.371-.17.603-.232.231-.077.494-.115.787-.115zm27.041 0c.741 0 1.304.238 1.69.717.401.48.602 1.211.602 2.2 0 1.898-.794 2.848-2.384 2.848a2.51 2.51 0 0 1-.695-.092 3.516 3.516 0 0 1-.602-.232v-5.094c.17-.092.37-.17.602-.232.232-.077.494-.115.787-.115zm-.055 21.307v30.685h29.908V82.413Zm32.899 0v30.685h29.909V82.413Zm32.905 0v30.685H128V82.413Z"
      />
    </svg>
  ),
  yarn: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 512 512" fill="currentColor">
      <path
        d="M256 0c141.344 0 256 114.656 256 256S397.344 512 256 512 0 397.344 0 256 114.656 0 256 0z"
        fill="#2c8ebb"
        fillRule="nonzero"
      />
      <path
        d="M430.16 333.59c-1.78-14.035-13.641-23.721-28.863-23.524-22.733.297-41.81 12.06-54.461 19.868-4.943 3.064-9.193 5.337-12.85 7.017.79-11.465.099-26.49-5.832-42.996-7.215-19.768-16.901-31.926-23.82-38.943 8.006-11.664 18.977-28.665 24.117-54.956 4.448-22.437 3.064-57.329-7.117-76.9-2.075-3.953-5.535-6.82-9.884-8.005-1.779-.495-5.14-1.483-11.762.395-9.983-20.658-13.442-22.832-16.111-24.612-5.535-3.558-12.059-4.349-18.187-2.075-8.204 2.965-15.222 10.872-21.844 24.908-.988 2.075-1.878 4.052-2.669 6.03-12.553.889-32.321 5.435-49.025 23.523-2.076 2.274-6.128 3.954-10.379 5.536h.1c-8.699 3.064-12.653 10.18-17.496 23.03-6.721 17.989.198 35.682 7.018 47.147-9.291 8.303-21.646 21.548-28.17 37.066-8.105 19.175-8.994 37.955-8.698 48.136-6.919 7.314-17.594 21.053-18.78 36.472-1.581 21.548 6.227 36.176 9.687 41.514.988 1.581 2.075 2.866 3.261 4.151-.395 2.669-.494 5.535.1 8.5 1.284 6.92 5.633 12.553 12.256 16.112 13.047 6.919 31.234 9.884 45.27 2.866 5.04 5.338 14.232 10.477 30.937 10.477h.988c4.25 0 58.218-2.866 73.934-6.72 7.017-1.681 11.86-4.646 15.023-7.315 10.082-3.163 37.956-12.652 64.248-29.653 18.582-12.058 25.007-14.628 38.844-17.989 13.443-3.262 21.844-15.518 20.164-29.06zm-23.525 14.53c-15.815 3.756-23.821 7.216-43.392 19.966-30.542 19.769-63.95 28.961-63.95 28.961s-2.768 4.151-10.774 6.03c-13.838 3.36-65.927 6.226-70.672 6.325-12.75.1-20.559-3.261-22.733-8.5-6.623-15.815 9.488-22.734 9.488-22.734s-3.558-2.174-5.634-4.151c-1.878-1.878-3.854-5.634-4.448-4.25-2.47 6.03-3.756 20.757-10.378 27.379-9.093 9.192-26.292 6.128-36.473.79-11.169-5.93.791-19.866.791-19.866s-6.03 3.558-10.872-3.756c-4.35-6.722-8.402-18.187-7.315-32.322 1.186-16.11 19.176-31.728 19.176-31.728s-3.163-23.82 7.215-48.235c9.39-22.239 34.694-40.13 34.694-40.13s-21.251-23.524-13.344-44.676c5.14-13.838 7.215-13.739 8.896-14.332 5.93-2.273 11.663-4.744 15.913-9.39 21.251-22.931 48.334-18.582 48.334-18.582s12.85-39.043 24.71-31.432c3.657 2.372 16.803 31.63 16.803 31.63s14.036-8.204 15.617-5.14c8.5 16.506 9.49 48.037 5.733 67.212-6.326 31.63-22.14 48.63-28.466 59.305-1.483 2.471 17 10.28 28.664 42.601 10.774 29.554 1.186 54.363 2.866 57.13.297.495.396.692.396.692s12.355.989 37.164-14.332c13.245-8.204 28.96-17.396 46.851-17.593 17.297-.297 18.187 19.966 5.14 23.128z"
        fill="#fff"
        fillRule="nonzero"
      />
    </svg>
  ),
  bun: (
    <svg className="w-3.5 h-3.5" viewBox="0 0 128 128" fill="currentColor">
      <path d="M113.744 41.999a18.558 18.558 0 0 0-.8-.772c-.272-.246-.528-.524-.8-.771s-.528-.525-.8-.771c-.272-.247-.528-.525-.8-.772s-.528-.524-.8-.771-.528-.525-.8-.772-.528-.524-.8-.771c7.936 7.52 12.483 17.752 12.656 28.481 0 25.565-26.912 46.363-60 46.363-18.528 0-35.104-6.526-46.128-16.756l.8.772.8.771.8.772.8.771.8.772.8.771.8.771c11.008 10.662 27.952 17.527 46.928 17.527 33.088 0 60-20.797 60-46.285 0-10.893-4.864-21.215-13.456-29.33z" />
      <path
        fill="#fbf0df"
        d="M116.8 65.08c0 23.467-25.072 42.49-56 42.49s-56-19.023-56-42.49c0-14.55 9.6-27.401 24.352-35.023C43.904 22.435 53.088 14.628 60.8 14.628S75.104 21 92.448 30.058C107.2 37.677 116.8 50.53 116.8 65.08Z"
      />
      <path
        fill="#f6dece"
        d="M116.8 65.08a32.314 32.314 0 0 0-1.28-8.918c-4.368 51.377-69.36 53.846-94.912 38.48 11.486 8.584 25.66 13.144 40.192 12.928 30.88 0 56-19.054 56-42.49z"
      />
      <path
        fill="#fffefc"
        d="M39.248 27.234c7.152-4.135 16.656-11.896 26-11.911a15.372 15.372 0 0 0-4.448-.695c-3.872 0-8 1.93-13.2 4.83-1.808 1.018-3.68 2.144-5.664 3.317-3.728 2.222-8 4.736-12.8 7.251C13.904 37.972 4.8 51.071 4.8 65.08v1.836c9.696-33.033 27.312-35.547 34.448-39.682z"
      />
      <path
        fill="#ccbea7"
        d="M56.192 18.532A24.553 24.553 0 0 1 53.867 29.1a25.407 25.407 0 0 1-6.683 8.671c-.448.386-.096 1.127.48.91 5.392-2.02 12.672-8.068 9.6-20.272-.128-.695-1.072-.51-1.072.123zm3.632 0a24.474 24.474 0 0 1 3.646 10.12c.445 3.587.08 7.224-1.07 10.662-.192.54.496 1.003.88.556 3.504-4.32 6.56-12.899-2.592-22.156-.464-.4-1.184.216-.864.756zm4.416-.262a25.702 25.702 0 0 1 7.521 7.925A24.71 24.71 0 0 1 75.2 36.414c-.016.13.02.26.101.365a.543.543 0 0 0 .718.117.509.509 0 0 0 .221-.313c1.472-5.384.64-14.564-11.472-19.332-.64-.246-1.056.587-.528.957zM34.704 34.315a27.418 27.418 0 0 0 9.91-5.222 26.262 26.262 0 0 0 6.842-8.663c.288-.556 1.2-.34 1.056.277-2.768 12.343-12.032 14.92-17.792 14.58-.608.016-.592-.802-.016-.972z"
      />
      <path d="M60.8 111.443c-33.088 0-60-20.798-60-46.363 0-15.429 9.888-29.823 26.448-38.448 4.8-2.469 8.912-4.953 12.576-7.128 2.016-1.203 3.92-2.33 5.76-3.379C51.2 12.916 56 10.771 60.8 10.771c4.8 0 8.992 1.852 14.24 4.845 1.6.88 3.2 1.836 4.912 2.885 3.984 2.376 8.48 5.06 14.4 8.131 16.56 8.625 26.448 23.004 26.448 38.448 0 25.565-26.912 46.363-60 46.363zm0-96.814c-3.872 0-8 1.928-13.2 4.829-1.808 1.018-3.68 2.144-5.664 3.317-3.728 2.222-8 4.736-12.8 7.251C13.904 37.972 4.8 51.071 4.8 65.08c0 23.436 25.12 42.506 56 42.506s56-19.07 56-42.506c0-14.01-9.104-27.108-24.352-35.023-6.048-3.086-10.768-5.986-14.592-8.27-1.744-1.033-3.344-1.99-4.8-2.838-4.848-2.778-8.384-4.32-12.256-4.32z" />
      <path
        fill="#b71422"
        d="M72.08 76.343c-.719 2.839-2.355 5.383-4.672 7.267a11.07 11.07 0 0 1-6.4 2.9 11.13 11.13 0 0 1-6.608-2.9c-2.293-1.892-3.906-4.436-4.608-7.267a1.073 1.073 0 0 1 .05-.5 1.11 1.11 0 0 1 .272-.428 1.19 1.19 0 0 1 .958-.322h19.744a1.185 1.185 0 0 1 .947.33 1.073 1.073 0 0 1 .317.92z"
      />
      <path
        fill="#ff6164"
        d="M54.4 83.733a11.24 11.24 0 0 0 6.592 2.932 11.239 11.239 0 0 0 6.576-2.932 16.652 16.652 0 0 0 1.6-1.65 10.904 10.904 0 0 0-3.538-2.564 11.26 11.26 0 0 0-4.302-1 10.121 10.121 0 0 0-4.549 1.192 9.71 9.71 0 0 0-3.451 3.097c.368.323.688.632 1.072.925z"
      />
      <path d="M54.656 82.514a8.518 8.518 0 0 1 2.97-2.347 8.836 8.836 0 0 1 3.734-.862 9.78 9.78 0 0 1 6.4 2.608c.368-.386.72-.787 1.056-1.188-2.035-1.87-4.726-2.933-7.536-2.978a10.487 10.487 0 0 0-4.335.975 10.125 10.125 0 0 0-3.489 2.666c.378.396.779.772 1.2 1.126z" />
    </svg>
  ),
  ts: (
    <svg className="w-4 h-4" viewBox="0 0 48 48">
      <rect width="36" height="36" x="6" y="6" fill="#1976d2"></rect>
      <polygon
        fill="#fff"
        points="27.49,22 14.227,22 14.227,25.264 18.984,25.264 18.984,40 22.753,40 22.753,25.264 27.49,25.264"
      ></polygon>
      <path
        fill="#fff"
        d="M39.194,26.084c0,0-1.787-1.192-3.807-1.192s-2.747,0.96-2.747,1.986 c0,2.648,7.381,2.383,7.381,7.712c0,8.209-11.254,4.568-11.254,4.568V35.22c0,0,2.152,1.622,4.733,1.622s2.483-1.688,2.483-1.92 c0-2.449-7.315-2.449-7.315-7.878c0-7.381,10.658-4.469,10.658-4.469L39.194,26.084z"
      ></path>
    </svg>
  ),
  js: (
    <svg className="w-4 h-4" viewBox="0 0 48 48">
      <path fill="#ffd600" d="M6,42V6h36v36H6z"></path>
      <path
        fill="#000001"
        d="M29.538 32.947c.692 1.124 1.444 2.201 3.037 2.201 1.338 0 2.04-.665 2.04-1.585 0-1.101-.726-1.492-2.198-2.133l-.807-.344c-2.329-.988-3.878-2.226-3.878-4.841 0-2.41 1.845-4.244 4.728-4.244 2.053 0 3.528.711 4.592 2.573l-2.514 1.607c-.553-.988-1.151-1.377-2.078-1.377-.946 0-1.545.597-1.545 1.377 0 .964.6 1.354 1.985 1.951l.807.344C36.452 29.645 38 30.839 38 33.523 38 36.415 35.716 38 32.65 38c-2.999 0-4.702-1.505-5.65-3.368L29.538 32.947zM17.952 33.029c.506.906 1.275 1.603 2.381 1.603 1.058 0 1.667-.418 1.667-2.043V22h3.333v11.101c0 3.367-1.953 4.899-4.805 4.899-2.577 0-4.437-1.746-5.195-3.368L17.952 33.029z"
      ></path>
    </svg>
  ),
};

interface PreviewProps {
  children: React.ReactNode;
  className?: string;
  code?: string;
  cliCommand?: string;
  hideCodeTab?: boolean;
  previewClassName?: string;
}

export function Preview({
  children,
  className,
  code,
  cliCommand,
  hideCodeTab = false,
  previewClassName,
}: PreviewProps) {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = React.useState<"preview" | "code">(
    "preview"
  );
  const [installTab, setInstallTab] = React.useState<"cli" | "manual">("cli");
  const [copied, setCopied] = React.useState(false);
  const [copiedCli, setCopiedCli] = React.useState(false);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);
  const [language, setLanguage] = React.useState<"tsx" | "jsx">("tsx");
  const [expanded, setExpanded] = React.useState(false);
  const [expandedManual, setExpandedManual] = React.useState(false);
  const [showPromptDropdown, setShowPromptDropdown] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);
  const [showToast, setShowToast] = React.useState(false);
  const [toastPlatform, setToastPlatform] = React.useState("");
  const [packageManager, setPackageManager] = React.useState<
    "npm" | "pnpm" | "yarn" | "bun"
  >("npm");
  const [previewWidth, setPreviewWidth] = React.useState<string | number>(
    "100%"
  );
  const [renderKey, setRenderKey] = React.useState(0);

  const getPackageManagerCommand = () => {
    if (!cliCommand) return "";
    const commands = {
      npm: cliCommand,
      pnpm: cliCommand.replace("npx", "pnpm dlx"),
      yarn: cliCommand.replace("npx", "yarn dlx"),
      bun: cliCommand.replace("npx", "bunx"),
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

  const handleReload = () => {
    setRenderKey((prev) => prev + 1);
    setIsLoading(true);
    setTimeout(() => setIsLoading(false), 800);
  };

  const copyToClipboard = async () => {
    if (displayCode) {
      if (navigator.clipboard) await navigator.clipboard.writeText(displayCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const copyCli = async () => {
    const cmd = getPackageManagerCommand();
    if (cmd) {
      if (navigator.clipboard) await navigator.clipboard.writeText(cmd);
      setCopiedCli(true);
      setTimeout(() => setCopiedCli(false), 2000);
    }
  };

  const copyPrompt = async (platform: string) => {
    if (displayCode) {
      setIsLoading(true);
      setShowPromptDropdown(false);
      let prompt = `Create this component for ${platform}:\n\n${displayCode}`;
      if (navigator.clipboard) await navigator.clipboard.writeText(prompt);
      setTimeout(() => {
        setIsLoading(false);
        setToastPlatform(platform);
        setShowToast(true);
        setTimeout(() => setShowToast(false), 5000);
      }, 500);
    }
  };

  return (
    <div className={cn("flex flex-col gap-4 my-8 w-full", className)}>
      {/* Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "spring", duration: 0.3 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-100 flex items-center gap-3 px-4 py-2.5 bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950 rounded-lg shadow-2xl border border-zinc-800 dark:border-zinc-200"
          >
            <Check className="w-4 h-4 text-emerald-500" />
            <span className="text-xs font-medium">
              Prompt copied to clipboard
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex  items-center justify-between gap-4">
        {/* Tabs */}
        {!hideCodeTab ? (
          <div className="relative inline-flex p-[4px] gap-1 rounded-lg bg-zinc-100/50 dark:bg-zinc-800/50 border border-zinc-200/50 dark:border-zinc-700/50 shadow-xs">
            {["preview", "code"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "preview" | "code")}
                className={cn(
                  "relative flex items-center justify-center min-w-[80px] px-4 py-1.5 text-xs font-bold rounded-md transition-all duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] z-10 capitalize cursor-pointer",
                  activeTab === tab
                    ? "text-zinc-900 dark:text-zinc-100"
                    : "text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100"
                )}
              >
                <span className="relative z-10">{tab}</span>
                {activeTab === tab && (
                  <motion.div
                    layoutId="previewActiveTab"
                    className="absolute inset-0 bg-white dark:bg-zinc-700/80 rounded-md -z-10 shadow-sm"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </button>
            ))}
          </div>
        ) : (
          <div />
        )}

        {/* Toolbar */}
        <div className="flex items-center gap-2">
          {/* Device Toggles */}
          <div className="hidden sm:flex items-center p-1 bg-zinc-100/50 dark:bg-zinc-800/50 rounded-lg border border-zinc-200/50 dark:border-zinc-700/50">
            <button
              onClick={() => setPreviewWidth("100%")}
              className={cn(
                "p-1.5 rounded transition-colors",
                previewWidth === "100%"
                  ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
              title="Desktop"
            >
              <Monitor className="w-4 h-4" />
            </button>
            <button
              onClick={() => setPreviewWidth("375px")}
              className={cn(
                "p-1.5 rounded transition-colors",
                previewWidth === "375px"
                  ? "bg-white dark:bg-zinc-700 shadow-sm text-zinc-900 dark:text-zinc-100"
                  : "text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200"
              )}
              title="Mobile"
            >
              <Smartphone className="w-4 h-4" />
            </button>
          </div>

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

          {/* Reload */}
          <button
            onClick={handleReload}
            className={cn(
              "p-2 text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-200 bg-zinc-100/50 dark:bg-zinc-800/50 hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-lg transition-colors",
              isLoading && "animate-spin"
            )}
            title="Reload Component"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="w-px h-4 bg-zinc-200 dark:bg-zinc-800 mx-1" />

          {/* AI Prompt */}
          {/* <div className="relative">
            <button
              onClick={() => setShowPromptDropdown(!showPromptDropdown)}
              className="flex items-center gap-2 px-3 py-1.5 bg-zinc-900 dark:bg-zinc-100 text-zinc-100 dark:text-zinc-900 rounded-lg text-xs font-medium hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">AI Prompt</span>
              <ChevronDown className="w-3 h-3" />
            </button>
            {showPromptDropdown && (
              <div className="absolute right-0 top-full mt-2 w-32 bg-popover border border-border rounded-lg shadow-xl z-50 overflow-hidden py-1">
                {["Claude", "v0", "Lovable", "Bolt"].map((platform) => (
                  <button
                    key={platform}
                    onClick={() => copyPrompt(platform)}
                    className="w-full px-4 py-2 text-left text-xs hover:bg-accent hover:text-accent-foreground transition-colors"
                  >
                    {platform}
                  </button>
                ))}
              </div>
            )}
          </div> */}
        </div>
      </div>

      <div
        className={cn(
          "relative min-h-[450px] flex bg-zinc-50/50 dark:bg-zinc-900/20 overflow-hidden rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all",
          activeTab === "preview" ? "p-0 items-center justify-center" : "p-0"
        )}
      >
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808008_1px,transparent_1px),linear-gradient(to_bottom,#80808006_1px,transparent_1px)] bg-size-[20px_20px]"></div>

        <AnimatePresence mode="wait">
          {activeTab === "preview" ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, width: previewWidth }}
              exit={{ opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className={cn(
                "relative z-10 overflow-hidden m-auto bg-transparent",
                previewWidth === "100%"
                  ? "w-full h-full"
                  : "border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-xl bg-background my-8"
              )}
            >
              <div
                key={renderKey}
                className={cn(
                  "min-h-[450px] w-full h-full flex items-center justify-center",
                  previewClassName
                )}
              >
                {children}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="code"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 z-10 w-full h-full"
            >
              <div className="w-full h-full bg-white dark:bg-zinc-950/50 flex flex-col">
                <div className="flex items-center justify-between px-4 h-10 border-b border-zinc-200 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900/50 shrink-0">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-zinc-400" />
                    <span className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest">
                      Example
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() =>
                        setLanguage(language === "tsx" ? "jsx" : "tsx")
                      }
                      className="text-[10px] font-medium text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 uppercase"
                    >
                      {language}
                    </button>
                    <div className="w-px h-3 bg-zinc-200 dark:bg-zinc-800" />
                    <button
                      onClick={copyToClipboard}
                      className="p-1.5 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 transition-colors"
                    >
                      {copied ? (
                        <Check className="w-3.5 h-3.5 text-emerald-500" />
                      ) : (
                        <Copy className="w-3.5 h-3.5" />
                      )}
                    </button>
                  </div>
                </div>
                <div className="flex-1 overflow-auto">
                  {mounted ? (
                    <SyntaxHighlighter
                      language={language}
                      style={theme === "light" ? vsClean : materialDarkClean}
                      customStyle={{
                        margin: 0,
                        padding: "1.5rem",
                        background: "transparent",
                        fontSize: "0.875rem",
                      }}
                    >
                      {displayCode || ""}
                    </SyntaxHighlighter>
                  ) : (
                    <pre className="p-6 text-sm opacity-0">{displayCode}</pre>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Installation Section */}
      {cliCommand && code && (
        <>
          <div className="mt-8 mb-3 flex items-center gap-2 text-sm font-medium text-muted-foreground">
            <Terminal className="w-4 h-4" />
            <span>Installation</span>
          </div>
          <div className="rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#09090b] overflow-hidden shadow-sm">
            {/* Header with Tabs and Copy */}
            <div className="flex items-center justify-between px-3 border-b border-zinc-200 dark:border-white/5 bg-white/50 dark:bg-white/5">
              {/* Tabs */}
              <div className="flex items-center gap-4">
                {(["npm", "pnpm", "bun", "yarn"] as const).map((pm) => (
                  <button
                    key={pm}
                    onClick={() => setPackageManager(pm)}
                    className={cn(
                      "flex items-center gap-2 py-2.5 text-xs font-medium transition-colors relative",
                      packageManager === pm
                        ? "text-zinc-900 dark:text-white"
                        : "text-zinc-500 dark:text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300"
                    )}
                  >
                    <div className="relative w-3.5 h-3.5">{ICONS[pm]}</div>
                    {pm}
                    {packageManager === pm && (
                      <motion.div
                        layoutId="install-indicator"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-900 dark:bg-white"
                      />
                    )}
                  </button>
                ))}
              </div>

              {/* Header Copy Button */}
              <button
                onClick={copyCli}
                className="p-1.5 hover:bg-zinc-100 dark:hover:bg-white/10 rounded-md text-zinc-400 hover:text-zinc-600 dark:text-zinc-500 dark:hover:text-zinc-300 transition-colors"
                title="Copy command"
              >
                {copiedCli ? (
                  <Check className="w-3.5 h-3.5 text-emerald-500" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>
            </div>

            {/* Command Output */}
            <div className="flex items-center bg-transparent">
              {mounted ? (
                <SyntaxHighlighter
                  language="bash"
                  style={
                    theme === "light"
                      ? {
                          'code[class*="language-"]': {
                            color: "#1e293b",
                          },
                          'pre[class*="language-"]': {
                            color: "#1e293b",
                          },
                          function: {
                            color: "#7c3aed",
                          },
                          keyword: {
                            color: "#0891b2",
                          },
                          string: {
                            color: "#059669",
                          },
                          operator: {
                            color: "#dc2626",
                          },
                          punctuation: {
                            color: "#64748b",
                          },
                        }
                      : materialDarkClean
                  }
                  customStyle={{
                    margin: 0,
                    padding: "1rem",
                    background: "transparent",
                    fontSize: "0.9rem",
                    lineHeight: "1.5",
                    fontFamily: "var(--font-geist-mono)",
                    width: "100%",
                    color: theme === "light" ? "#1e293b" : undefined,
                  }}
                >
                  {getPackageManagerCommand()}
                </SyntaxHighlighter>
              ) : (
                <pre className="p-4 text-sm opacity-0">
                  {getPackageManagerCommand()}
                </pre>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
