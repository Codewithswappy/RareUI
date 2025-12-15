<div align="center">
  <br />
  <img src="public/RareUI_Logo.svg" alt="RareUI Logo" width="120" height="120">
  <br /> <br />

  <h1 align="center">RareUI</h1>

  <div align="center">
    <b>The Most Unique React Component Library</b>
  </div>

  <br />

  <div align="center">
    
![License](https://img.shields.io/badge/license-MIT-000000?style=flat-square)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&style=flat-square&logoColor=000)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?logo=typescript&style=flat-square&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4.0-38B2AC?logo=tailwindcss&style=flat-square&logoColor=white)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-000000?logo=framer&style=flat-square&logoColor=white)](https://www.framer.com/motion/)

  </div>

  <br />
  <br />

  <a href="https://rareui.in"><strong>🌐 Website</strong></a> · 
  <a href="https://rareui.in/docs"><strong>📚 Documentation</strong></a> · 
  <a href="https://github.com/Codewithswappy/RareUI/issues"><strong>🐛 Report Bug</strong></a> · 
  <a href="https://x.com/heyyswap"><strong>🐦 Twitter</strong></a>

  <br />
  <br />
</div>

<div align="center">
  <br />
  <p align="center">
    <b>RareUI</b> is a collection of <b>premium, high-quality, and animated</b> React components built for modern web applications.
    <br />
    Designed to be copied and pasted into your apps. Open Source. Customizable. Beautiful.
  </p>
  <br />
</div>

---

## ✨ Features

- **🎨 Premium Design**: Meticulously crafted components with a focus on aesthetics and user experience.
- **⚡ Super Lightweight**: Built with performance in mind. No bloat, just the code you need.
- **🌙 Dark Mode Support**: First-class support for light and dark modes out of the box.
- **🔧 Fully Customizable**: Built on top of Tailwind CSS for easy styling and theming.
- **♿ Accessible**: Follows WAI-ARIA patterns for maximum accessibility.
- **🚀 Production Ready**: Typed with TypeScript and rigorously tested.

## 🚀 Quick Start

The fastest way to start using RareUI is via our CLI.

### Installation

```bash
# Add a component to your project
npx rareui add [component-name]

# Example
npx rareui add liquid-metal
```

OR

1. Browse components at [rareui.in](https://rareui.in)
2. Copy the code.
3. Paste it into your project.

## 📦 Components

Explore our growing collection of unique components:

| Category | Components |
|:---|:---|
| **Backgrounds** | Liquid Metal, Particle Waves, Grid Beams |
| **Buttons** | Glass Shimmer, Liquid, Neumorphic, Retro Pixel |
| **Cards** | Premium Profile, Particle Effect, glowing Border |
| **Text Animations** | Word Magnet, Typewriter, Gradient Reveal |
| **Interactives** | Magnetic Cursor, Tilt Effects, Parallax |

## 💻 Usage Example

Here's how easy it is to use a RareUI component:

```tsx
import { LiquidMetal } from "@/components/rareui/liquid-metal";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      <LiquidMetal 
        color="#61DAFB" 
        mouseInfluence={0.5} 
      />
      
      <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
        <h1 className="text-6xl font-bold text-white mix-blend-difference">
          RareUI
        </h1>
      </div>
    </div>
  );
}
```

## �️ Tech Stack

RareUI is built on the shoulders of giants:

- **Framework**: [Next.js 16](https://nextjs.org/)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
- **Animation**: [Framer Motion 12](https://www.framer.com/motion/) & [Motion](https://motion.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 🌟 Support

Give a ⭐️ if this project helped you!

<a href="https://github.com/Codewithswappy/RareUI">
  <img src="https://img.shields.io/github/stars/Codewithswappy/RareUI?style=social" alt="GitHub stars">
</a>
<a href="https://twitter.com/heyyswap">
  <img src="https://img.shields.io/twitter/follow/heyyswap?style=social" alt="Twitter Follow">
</a>

## � License

Distributed under the MIT License. See `LICENSE` for more information.

<br />

<div align="center">
  <sub>Built with ❤️ by <a href="https://x.com/heyyswap">Swappy</a>. Made in India 🇮🇳</sub>
</div>
