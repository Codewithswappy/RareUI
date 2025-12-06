# Contributing to RareUI 🎨

Thank you for your interest in contributing to RareUI! We're excited to have you join our community of developers building beautiful, accessible UI components.

## 📋 Table of Contents

- [Code of Conduct](#code-of-conduct)
- [How Can I Contribute?](#how-can-i-contribute)
- [Development Setup](#development-setup)
- [Project Structure](#project-structure)
- [Component Guidelines](#component-guidelines)
- [Pull Request Process](#pull-request-process)
- [Style Guide](#style-guide)

---

## 📜 Code of Conduct

This project adheres to a Code of Conduct that all contributors are expected to follow. Please:

- **Be respectful** and inclusive
- **Be collaborative** and constructive
- **Be patient** with newcomers
- **Be professional** in all interactions

---

## 🤝 How Can I Contribute?

### 🐛 Reporting Bugs

Before creating a bug report:
1. Check the [existing issues](https://github.com/Codewithswappy/RareUI/issues)
2. Ensure you're using the latest version

When reporting bugs, include:
- Clear, descriptive title
- Steps to reproduce
- Expected vs actual behavior
- Screenshots/videos if applicable
- Environment details (OS, browser, React version)

**Example:**
```markdown
**Bug Description**
The Glass Shimmer Button doesn't animate on hover in Safari.

**Steps to Reproduce**
1. Open https://rareui.in/docs/components/buttons/glass-shimmer-button
2. Hover over the button
3. No shimmer effect appears

**Expected Behavior**
Shimmer animation should play on hover

**Environment**
- OS: macOS 14.0
- Browser: Safari 17.0
- React: 19.0.0
```

### 💡 Suggesting Features

We love new ideas! When suggesting features:
- Check if it already exists or has been requested
- Explain the use case
- Provide visual examples if possible
- Consider implementation complexity

### 🎨 Adding Components

Want to add a new component? Great! Follow these steps:

1. **Check if it's unique** - Ensure similar components don't exist
2. **Design first** - Sketch or prototype your component
3. **Follow guidelines** - See [Component Guidelines](#component-guidelines)
4. **Test thoroughly** - All devices, browsers, themes
5. **Document well** - Include usage examples and props

---

## 🛠️ Development Setup

### Prerequisites

- Node.js 18+ and npm
- Git
- Code editor (VS Code recommended)

### Setup Instructions

```bash
# 1. Fork the repository on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/RareUI.git
cd RareUI

# 3. Add upstream remote
git remote add upstream https://github.com/Codewithswappy/RareUI.git

# 4. Install dependencies
npm install

# 5. Start development server
npm run dev

# 6. Open http://localhost:3000
```

### Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript checks
npm run build:registry # Generate component registry
```

---

## 📁 Project Structure

```
rareui/
├── app/                    # Next.js app directory
│   ├── page.tsx           # Homepage
│   ├── layout.tsx         # Root layout
│   └── docs/              # Documentation pages
├── components/
│   ├── rareui/            # RareUI components ⭐
│   │   ├── buttons/       # Button components
│   │   ├── cards/         # Card components
│   │   └── ...            # Other categories
│   ├── landing/           # Landing page components
│   └── ui/                # Base UI components
├── public/                # Static assets
├── scripts/               # Build scripts
└── ...
```

**Key Directories:**
- `components/rareui/` - All public components live here
- `components/landing/` - Website-specific components
- `app/docs/` - Documentation pages

---

## 🎨 Component Guidelines

### Creating a New Component

#### 1. File Structure

```
components/rareui/buttons/MyButton.tsx
```

#### 2. Component Template

```tsx
'use client';

import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

interface MyButtonProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  variant?: 'default' | 'outline';
}

export default function MyButton({
  children,
  className,
  onClick,
  variant = 'default'
}: MyButtonProps) {
  return (
    <motion.button
      className={cn(
        // Base styles
        'px-6 py-3 rounded-lg font-medium',
        // Variants
        variant === 'default' && 'bg-primary text-primary-foreground',
        variant === 'outline' && 'border border-border',
        // Custom classes
        className
      )}
      onClick={onClick}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
```

### Component Checklist

Before submitting, ensure your component:

- [ ] **TypeScript** - Fully typed with proper interfaces
- [ ] **Accessibility** - ARIA labels, keyboard navigation
- [ ] **Responsive** - Works on all screen sizes
- [ ] **Dark Mode** - Supports both themes
- [ ] **Performance** - No unnecessary re-renders
- [ ] **Documentation** - Props documented with JSDoc
- [ ] **Examples** - At least 2 usage examples
- [ ] **Clean Code** - No console logs, commented code

### Design Principles

1. **Simplicity** - Easy to understand and use
2. **Flexibility** - Customizable via props and classes
3. **Consistency** - Follows existing patterns
4. **Accessibility** - WCAG 2.1 AA compliant
5. **Performance** - Optimized animations and rendering

---

## 🔄 Pull Request Process

### Before You Submit

1. **Fork the repository**
   - Click "Fork" button on GitHub
   - Clone your fork locally
   ```bash
   git clone https://github.com/YOUR_USERNAME/RareUI.git
   cd RareUI
   ```

2. **Create a branch**
   ```bash
   git checkout -b feature/my-new-component
   ```

3. **Make your changes**
   - Write clean, documented code
   - Follow existing patterns
   - Test thoroughly

4. **Test everything**
   ```bash
   npm run lint        # Check for linting errors
   npm run type-check  # Check for type errors
   npm run build       # Ensure it builds
   ```

5. **Commit with clear messages**
   ```bash
   git add .
   git commit -m "feat: add glassmorphic card component"
   ```

### Commit Message Convention

Use this format for clear, professional commits:

```
type(scope): description

[optional body]
[optional footer]
```

**Types:**
- `feat`: New feature or component
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code formatting (no logic change)
- `refactor`: Code restructuring
- `perf`: Performance improvements
- `test`: Adding tests
- `chore`: Maintenance tasks

**Examples:**
```
feat(buttons): add neon glow button component
fix(cards): resolve particle animation in Safari
docs(readme): update installation instructions
style: format code with prettier
```

### Submitting Pull Request

1. **Push your branch to your fork**
   ```bash
   git push origin feature/my-new-component
   ```

2. **Open Pull Request on GitHub**
   - Go to the original RareUI repository
   - Click "New Pull Request"
   - Click "compare across forks"
   - Select your fork and branch
   - Fill out the PR template (see below)
   - Click "Create Pull Request"

3. **PR Template:**
   ```markdown
   ## Description
   Brief description of what this PR does

   ## Type of Change
   - [ ] New component
   - [ ] Bug fix  
   - [ ] Documentation update
   - [ ] Performance improvement
   - [ ] Other (please specify)

   ## Checklist
   - [ ] Code follows project style
   - [ ] Self-reviewed my code
   - [ ] Documentation updated
   - [ ] No console errors or warnings
   - [ ] Tested in Chrome, Firefox, Safari
   - [ ] Dark mode works correctly
   - [ ] Mobile responsive

   ## Screenshots
   (Add screenshots if applicable)
   ```

4. **Respond to feedback**
   - Be open to suggestions
   - Make requested changes promptly
   - Update PR description if scope changes
   - Be respectful and professional

### What Happens Next?

1. **Review** - Maintainer reviews your code
2. **Feedback** - You may be asked to make changes
3. **Approval** - Once approved, PR will be merged
4. **Recognition** - You'll be credited as a contributor!

---

## 🎯 Style Guide

### TypeScript

```tsx
// ✅ Good
interface ButtonProps {
  variant: 'default' | 'outline';
  size?: 'sm' | 'md' | 'lg';
}

// ❌ Bad
interface ButtonProps {
  variant: string;  // Too broad
  size: any;        // Never use 'any'
}
```

### CSS/Tailwind

```tsx
// ✅ Good - Use Tailwind utilities
<div className="flex items-center gap-4 p-6 rounded-lg">

// ❌ Bad - Avoid inline styles
<div style={{ display: 'flex', padding: '24px' }}>
```

### Animations

```tsx
// ✅ Good - Smooth, purposeful animations
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.3 }}
>

// ❌ Bad - Too fast or jerky
<motion.div
  animate={{ opacity: 1 }}
  transition={{ duration: 0.05 }}  // Too fast!
>
```

### File Naming

- Components: `PascalCase.tsx` (e.g., `GlassCard.tsx`)
- Utilities: `camelCase.ts` (e.g., `formatDate.ts`)
- Constants: `UPPER_CASE.ts` (e.g., `API_ROUTES.ts`)

---

## 🏆 Recognition

Contributors will be:
- Listed in our Contributors section
- Mentioned in release notes
- Credited in component documentation

---

## ❓ Questions?

- 💬 Open a [GitHub Discussion](https://github.com/Codewithswappy/RareUI/discussions)
- 🐦 Tweet [@heyyswap](https://x.com/heyyswap)
- 📧 Email for private queries

---

## 📚 Resources

- [React Docs](https://react.dev/)
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Framer Motion Docs](https://www.framer.com/motion/)
- [Accessibility Guidelines](https://www.w3.org/WAI/WCAG21/quickref/)

---

<div align="center">

**Thank you for contributing to RareUI! 🎉**

Together, we're building something amazing.

[⬆ Back to Top](#contributing-to-rareui-)

</div>
