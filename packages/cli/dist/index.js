#!/usr/bin/env node

// src/index.ts
import { Command } from "commander";

// src/commands/init.ts
import fs from "fs-extra";
import path from "path";
import * as p from "@clack/prompts";
import chalk from "chalk";
var REGISTRY_URL = "https://rareui.in/r";
async function init() {
  console.log();
  p.intro(chalk.bold("Welcome to RareUI!"));
  const cwd = process.cwd();
  const componentsJsonPath = path.join(cwd, "components.json");
  if (await fs.pathExists(componentsJsonPath)) {
    const shouldContinue = await p.confirm({
      message: "components.json already exists. Do you want to overwrite it?",
      initialValue: false
    });
    if (p.isCancel(shouldContinue) || !shouldContinue) {
      p.cancel("Operation cancelled.");
      process.exit(0);
    }
  }
  const config = {
    style: "new-york",
    rsc: true,
    tsx: true,
    tailwind: {
      config: "",
      css: "app/globals.css",
      baseColor: "neutral",
      cssVariables: true,
      prefix: ""
    },
    iconLibrary: "lucide",
    aliases: {
      components: "@/components",
      utils: "@/lib/utils",
      ui: "@/components/ui",
      lib: "@/lib",
      hooks: "@/hooks"
    },
    registries: {
      "@rareui": `${REGISTRY_URL}/{name}.json`
    }
  };
  await fs.writeJSON(componentsJsonPath, config, { spaces: 2 });
  p.outro(chalk.green("\u2713 Configuration created successfully!"));
  console.log();
  console.log("Next steps:");
  console.log(chalk.dim("  1. Run ") + chalk.cyan("npx rareui add [component]") + chalk.dim(" to add components"));
  console.log(chalk.dim("  2. Visit ") + chalk.cyan("https://rareui.in/docs") + chalk.dim(" to browse components"));
  console.log();
}

// src/commands/add.ts
import fs2 from "fs-extra";
import path2 from "path";
import * as p2 from "@clack/prompts";
import chalk2 from "chalk";
import { execa } from "execa";
var REGISTRY_URL2 = "https://rareui.in/r";
function kebabToPascal(str) {
  return str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}
function findComponentName(input, availableComponents) {
  if (availableComponents.includes(input)) {
    return input;
  }
  const pascalCase = kebabToPascal(input);
  if (availableComponents.includes(pascalCase)) {
    return pascalCase;
  }
  const lowerInput = input.toLowerCase();
  const match = availableComponents.find((c) => c.toLowerCase() === lowerInput);
  if (match) {
    return match;
  }
  return null;
}
async function add(components, options) {
  const cwd = options.cwd || process.cwd();
  console.log();
  p2.intro(chalk2.bold("Adding RareUI components"));
  const componentsJsonPath = path2.join(cwd, "components.json");
  if (!await fs2.pathExists(componentsJsonPath)) {
    p2.log.error("components.json not found. Please run " + chalk2.cyan("npx rareui init") + " first.");
    process.exit(1);
  }
  const s = p2.spinner();
  s.start("Fetching available components");
  let availableComponents;
  try {
    const response = await fetch(`${REGISTRY_URL2}/index.json`);
    const data = await response.json();
    availableComponents = data.components;
    s.stop();
  } catch (error) {
    s.stop("Failed to fetch components");
    p2.log.error("Could not fetch component list");
    process.exit(1);
  }
  if (components.length === 0) {
    console.log();
    console.log(chalk2.bold("Available components:"));
    console.log();
    availableComponents.forEach((comp) => {
      console.log(chalk2.dim("  \u2022 ") + chalk2.cyan(comp));
    });
    console.log();
    console.log(chalk2.dim("Usage:"));
    console.log(chalk2.dim("  \u2022 ") + chalk2.cyan("npx rareui add [component]") + chalk2.dim(" - Add a specific component"));
    console.log(chalk2.dim("  \u2022 ") + chalk2.cyan("npx rareui add .") + chalk2.dim(" - Add all components"));
    console.log();
    process.exit(0);
  }
  if (components.includes(".")) {
    const shouldInstallAll = options.yes || await p2.confirm({
      message: `Install all ${availableComponents.length} components?`,
      initialValue: false
    });
    if (p2.isCancel(shouldInstallAll) || !shouldInstallAll) {
      p2.cancel("Operation cancelled.");
      process.exit(0);
    }
    components = availableComponents;
  }
  for (const inputName of components) {
    const componentName = findComponentName(inputName, availableComponents);
    if (!componentName) {
      p2.log.error(`Component "${inputName}" does not exist`);
      console.log(chalk2.dim("Available components: ") + availableComponents.join(", "));
      continue;
    }
    const s2 = p2.spinner();
    s2.start(`Fetching ${componentName}`);
    try {
      const response = await fetch(`${REGISTRY_URL2}/${componentName}.json`);
      if (!response.ok) {
        s2.stop(`Component ${componentName} not found`);
        p2.log.error(`Component "${componentName}" does not exist`);
        continue;
      }
      const component = await response.json();
      s2.stop(`Fetched ${componentName}`);
      const existingFiles = [];
      for (const file of component.files) {
        const filePath = path2.join(cwd, file.target);
        if (await fs2.pathExists(filePath)) {
          existingFiles.push(file.target);
        }
      }
      if (existingFiles.length > 0 && !options.overwrite && !options.yes) {
        const shouldOverwrite = await p2.confirm({
          message: `The following files already exist:
${existingFiles.map((f) => `  \u2022 ${f}`).join("\n")}

Do you want to overwrite them?`,
          initialValue: false
        });
        if (p2.isCancel(shouldOverwrite) || !shouldOverwrite) {
          p2.log.warn(`Skipped ${componentName}`);
          continue;
        }
      }
      for (const file of component.files) {
        const filePath = path2.join(cwd, file.target);
        await fs2.ensureDir(path2.dirname(filePath));
        await fs2.writeFile(filePath, file.content, "utf-8");
      }
      p2.log.success(`Added ${chalk2.cyan(componentName)} \u2192 ${chalk2.dim(component.files[0].target)}`);
      if (component.dependencies && component.dependencies.length > 0) {
        const s22 = p2.spinner();
        s22.start("Installing dependencies");
        try {
          const runtimeDeps = component.dependencies.filter((dep) => !dep.startsWith("@types/"));
          const typeDeps = component.dependencies.filter((dep) => dep.startsWith("@types/"));
          if (runtimeDeps.length > 0) {
            await execa("npm", ["install", ...runtimeDeps], { cwd });
          }
          if (typeDeps.length > 0) {
            await execa("npm", ["install", "--save-dev", ...typeDeps], { cwd });
          }
          s22.stop("Dependencies installed");
        } catch (error) {
          s22.stop("Failed to install dependencies");
          p2.log.warn("Please install dependencies manually: " + component.dependencies.join(", "));
        }
      }
    } catch (error) {
      s2.stop(`Failed to add ${componentName}`);
      p2.log.error(`Error adding component: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  console.log();
  p2.outro(chalk2.green("\u2713 Done!"));
  console.log();
}

// src/commands/diff.ts
import fs3 from "fs-extra";
import path3 from "path";
import * as p3 from "@clack/prompts";
import chalk3 from "chalk";
import { execa as execa2 } from "execa";
var REGISTRY_URL3 = "https://rareui.in/r";
function kebabToPascal2(str) {
  return str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join("");
}
function findComponentName2(input, availableComponents) {
  if (availableComponents.includes(input)) {
    return input;
  }
  const pascalCase = kebabToPascal2(input);
  if (availableComponents.includes(pascalCase)) {
    return pascalCase;
  }
  const lowerInput = input.toLowerCase();
  const match = availableComponents.find((c) => c.toLowerCase() === lowerInput);
  if (match) {
    return match;
  }
  return null;
}
async function findInstalledComponents(cwd) {
  const componentsDir = path3.join(cwd, "components/rareui");
  if (!await fs3.pathExists(componentsDir)) {
    return [];
  }
  const installed = [];
  async function scanDir(dir) {
    const items = await fs3.readdir(dir);
    for (const item of items) {
      const fullPath = path3.join(dir, item);
      const stat = await fs3.stat(fullPath);
      if (stat.isDirectory()) {
        await scanDir(fullPath);
      } else if (item.endsWith(".tsx") || item.endsWith(".ts")) {
        const componentName = item.replace(/\.(tsx|ts)$/, "");
        if (!installed.includes(componentName)) {
          installed.push(componentName);
        }
      }
    }
  }
  await scanDir(componentsDir);
  return installed;
}
function createDiff(oldContent, newContent) {
  if (oldContent === newContent) {
    return { hasChanges: false, summary: "No changes" };
  }
  const oldLines = oldContent.split("\n");
  const newLines = newContent.split("\n");
  let additions = 0;
  let deletions = 0;
  let changes = 0;
  const maxLen = Math.max(oldLines.length, newLines.length);
  for (let i = 0; i < maxLen; i++) {
    const oldLine = oldLines[i];
    const newLine = newLines[i];
    if (oldLine === void 0) {
      additions++;
    } else if (newLine === void 0) {
      deletions++;
    } else if (oldLine !== newLine) {
      changes++;
    }
  }
  const summary = [];
  if (additions > 0) summary.push(chalk3.green(`+${additions} additions`));
  if (deletions > 0) summary.push(chalk3.red(`-${deletions} deletions`));
  if (changes > 0) summary.push(chalk3.yellow(`~${changes} changes`));
  return {
    hasChanges: true,
    summary: summary.join(", ")
  };
}
async function diff(component, options) {
  const cwd = options.cwd || process.cwd();
  console.log();
  p3.intro(chalk3.bold("Checking for component updates"));
  const componentsJsonPath = path3.join(cwd, "components.json");
  if (!await fs3.pathExists(componentsJsonPath)) {
    p3.log.error("components.json not found. Please run " + chalk3.cyan("npx rareui init") + " first.");
    process.exit(1);
  }
  const s = p3.spinner();
  s.start("Fetching registry");
  let availableComponents;
  try {
    const response = await fetch(`${REGISTRY_URL3}/index.json`);
    const data = await response.json();
    availableComponents = data.components;
    s.stop();
  } catch (error) {
    s.stop("Failed to fetch registry");
    p3.log.error("Could not fetch component list");
    process.exit(1);
  }
  const installedComponents = await findInstalledComponents(cwd);
  if (installedComponents.length === 0) {
    p3.log.warn("No components installed");
    process.exit(0);
  }
  let componentsToCheck;
  if (component) {
    const componentName = findComponentName2(component, availableComponents);
    if (!componentName) {
      p3.log.error(`Component "${component}" not found in registry`);
      process.exit(1);
    }
    if (!installedComponents.includes(componentName)) {
      p3.log.error(`Component "${componentName}" is not installed`);
      process.exit(1);
    }
    componentsToCheck = [componentName];
  } else {
    componentsToCheck = installedComponents.filter((c) => availableComponents.includes(c));
  }
  console.log();
  console.log(chalk3.dim(`Checking ${componentsToCheck.length} component(s)...`));
  console.log();
  const updatesAvailable = [];
  for (const componentName of componentsToCheck) {
    try {
      const response = await fetch(`${REGISTRY_URL3}/${componentName}.json`);
      if (!response.ok) {
        continue;
      }
      const registryComponent = await response.json();
      const componentUpdates = [];
      for (const file of registryComponent.files) {
        const localPath = path3.join(cwd, file.target);
        if (await fs3.pathExists(localPath)) {
          const localContent = await fs3.readFile(localPath, "utf-8");
          const diff2 = createDiff(localContent, file.content);
          if (diff2.hasChanges) {
            componentUpdates.push({
              target: file.target,
              diff: diff2.summary
            });
          }
        }
      }
      if (componentUpdates.length > 0) {
        updatesAvailable.push({
          name: componentName,
          files: componentUpdates
        });
      }
    } catch (error) {
      continue;
    }
  }
  if (updatesAvailable.length === 0) {
    p3.log.success("All components are up to date!");
    console.log();
    process.exit(0);
  }
  console.log(chalk3.bold(`Found updates for ${updatesAvailable.length} component(s):`));
  console.log();
  for (const update of updatesAvailable) {
    console.log(chalk3.cyan(`  ${update.name}`));
    for (const file of update.files) {
      console.log(chalk3.dim(`    ${file.target}`));
      console.log(chalk3.dim(`      ${file.diff}`));
    }
    console.log();
  }
  const shouldUpdate = options.yes || await p3.confirm({
    message: "Do you want to update these components?",
    initialValue: false
  });
  if (p3.isCancel(shouldUpdate) || !shouldUpdate) {
    p3.cancel("Update cancelled");
    process.exit(0);
  }
  console.log();
  for (const update of updatesAvailable) {
    const s2 = p3.spinner();
    s2.start(`Updating ${update.name}`);
    try {
      const response = await fetch(`${REGISTRY_URL3}/${update.name}.json`);
      const component2 = await response.json();
      for (const file of component2.files) {
        const filePath = path3.join(cwd, file.target);
        await fs3.ensureDir(path3.dirname(filePath));
        await fs3.writeFile(filePath, file.content, "utf-8");
      }
      s2.stop(`Updated ${update.name}`);
      p3.log.success(`${chalk3.cyan(update.name)} updated successfully`);
      if (component2.dependencies && component2.dependencies.length > 0) {
        const s22 = p3.spinner();
        s22.start("Updating dependencies");
        try {
          await execa2("npm", ["install", ...component2.dependencies], { cwd });
          s22.stop("Dependencies updated");
        } catch (error) {
          s22.stop("Failed to update dependencies");
          p3.log.warn("Please install dependencies manually: " + component2.dependencies.join(", "));
        }
      }
    } catch (error) {
      s2.stop(`Failed to update ${update.name}`);
      p3.log.error(`Error: ${error instanceof Error ? error.message : "Unknown error"}`);
    }
  }
  console.log();
  p3.outro(chalk3.green("\u2713 Components updated!"));
  console.log();
}

// src/index.ts
import chalk4 from "chalk";
var program = new Command();
program.name("rareui").description(chalk4.bold("CLI for adding RareUI components to your project")).version("0.1.5").addHelpText("after", `
${chalk4.bold("Examples:")}
  ${chalk4.dim("Initialize RareUI in your project")}
  ${chalk4.cyan("$ npx rareui init")}

  ${chalk4.dim("Add a component")}
  ${chalk4.cyan("$ npx rareui add liquid-button")}

  ${chalk4.dim("Add multiple components")}
  ${chalk4.cyan("$ npx rareui add particle-card soft-button")}

  ${chalk4.dim("Install all components")}
  ${chalk4.cyan("$ npx rareui add .")}

  ${chalk4.dim("Check for component updates")}
  ${chalk4.cyan("$ npx rareui diff")}

${chalk4.bold("Documentation:")}
  ${chalk4.dim("Visit")} ${chalk4.cyan("https://rareui.in/docs")} ${chalk4.dim("for more information")}
`);
program.command("init").description("Initialize RareUI configuration in your project").addHelpText("after", `
${chalk4.bold("What this does:")}
  \u2022 Creates a ${chalk4.cyan("components.json")} file
  \u2022 Configures the RareUI registry
  \u2022 Sets up component paths and aliases

${chalk4.bold("Example:")}
  ${chalk4.cyan("$ npx rareui init")}
`).action(init);
program.command("add").description("Add components to your project").argument("[components...]", "component names to add (supports kebab-case or PascalCase)").option("-y, --yes", "skip confirmation prompts").option("-o, --overwrite", "overwrite existing files without asking").option("-c, --cwd <cwd>", "the working directory (default: current directory)").option("-p, --path <path>", "custom path to install components").addHelpText("after", `
${chalk4.bold("Component Naming:")}
  You can use either format:
  \u2022 ${chalk4.cyan("liquid-button")} ${chalk4.dim("(kebab-case)")}
  \u2022 ${chalk4.cyan("LiquidButton")} ${chalk4.dim("(PascalCase)")}

${chalk4.bold("Examples:")}
  ${chalk4.dim("Add a single component")}
  ${chalk4.cyan("$ npx rareui add liquid-button")}

  ${chalk4.dim("Add multiple components")}
  ${chalk4.cyan("$ npx rareui add particle-card soft-button")}

  ${chalk4.dim("Install all available components")}
  ${chalk4.cyan("$ npx rareui add .")}

  ${chalk4.dim("List all available components")}
  ${chalk4.cyan("$ npx rareui add")}

  ${chalk4.dim("Skip confirmation prompts")}
  ${chalk4.cyan("$ npx rareui add liquid-button -y")}

${chalk4.bold("What this does:")}
  \u2022 Downloads component code from the registry
  \u2022 Installs to ${chalk4.cyan("components/rareui/")} directory
  \u2022 Automatically installs required dependencies
  \u2022 Checks for file conflicts before overwriting
`).action(add);
program.command("diff").description("Check for updates to installed components").argument("[component]", "specific component to check (optional)").option("-y, --yes", "update without confirmation").option("-c, --cwd <cwd>", "the working directory (default: current directory)").addHelpText("after", `
${chalk4.bold("Examples:")}
  ${chalk4.dim("Check all installed components for updates")}
  ${chalk4.cyan("$ npx rareui diff")}

  ${chalk4.dim("Check a specific component")}
  ${chalk4.cyan("$ npx rareui diff liquid-button")}

  ${chalk4.dim("Update all components without confirmation")}
  ${chalk4.cyan("$ npx rareui diff -y")}

${chalk4.bold("What this does:")}
  \u2022 Scans your ${chalk4.cyan("components/rareui/")} directory
  \u2022 Compares with latest versions in the registry
  \u2022 Shows detailed changes (additions, deletions, modifications)
  \u2022 Allows you to update components to latest versions
  \u2022 Updates dependencies if needed
`).action(diff);
program.parse();
//# sourceMappingURL=index.js.map