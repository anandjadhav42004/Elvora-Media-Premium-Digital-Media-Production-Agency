# ✦ Elvora Media | Premium Digital Media & Production Agency

[![Next.js](https://img.shields.io/badge/Next.js-16.2.10-000000?style=for-the-badge&logo=nextdotjs&logoColor=white)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4.0-38B2AC?style=for-the-badge&logo=tailwindcss&logoColor=white)](https://tailwindcss.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![License](https://img.shields.io/badge/License-MIT-gold?style=for-the-badge)](LICENSE)

A high-performance, modern digital media and creative production agency platform built for **Elvora Media**. Crafted with dynamic micro-animations, glassmorphism visual aesthetics, accessibility compliance, and conversion-optimized agency mechanics.

---

## ✨ Key Features

- **🎬 Smart Video Showreel Lightbox**: Universal embed parser (`lib/showreel.ts`) automatically converting YouTube, Vimeo, and Instagram Reel links into embeddable players with keyboard focus traps (`ESC` to close).
- **💼 Live Case Studies & Reels Showcase**: Filterable portfolio grid highlighting real commercial production reels by Director **Suyash Mali**, complete with metrics badges (`+280% Revenue`, `3.4M+ Views`).
- **⚡ Client Logo Marquee**: Infinite auto-scrolling partner bar featuring pause-on-hover interaction and smooth gradient edge masks.
- **📊 3-Step Interactive Scope Estimator**: Multi-step wizard calculating service scopes and generating pre-filled WhatsApp project inquiries.
- **👥 Leadership & Team Accordion**: Accessible flex accordion showcasing Directors and Team Leads with spring modal transitions (`stiffness: 300, damping: 30`).
- **💬 Touch-Enabled Review Carousel**: Swipeable testimonial slider with star ratings and growth metrics.
- **📱 Responsive Mobile Drawer**: Animated hamburger navigation drawer with backdrop blur and outside-click detection.
- **🛡️ Enterprise Security & SEO**: Dynamic `/sitemap.xml`, `/robots.txt`, and Netlify Content-Security-Policy (CSP) headers pre-configured.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router + Turbopack)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 + Vanilla CSS Tokens
- **Animation**: Framer Motion + GSAP ScrollTrigger
- **Icons**: Lucide React / Custom Inline SVGs
- **Deployment**: Netlify / Vercel

---

## 🚀 Getting Started

### 1. Prerequisites
Ensure you have Node.js 18.x or higher installed:
```bash
node -v
```

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/your-username/elvora-media.git
cd elvora-media
npm install
```

### 3. Environment Setup
Create a `.env.local` file based on `.env.example`:
```bash
cp .env.example .env.local
```

Configure your environment variables:
```env
NEXT_PUBLIC_WHATSAPP_NUMBER=917559429753
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 📁 Directory Structure

```text
elvora-media/
├── app/
│   ├── layout.tsx         # Main HTML shell, Fonts (Inter, Anton, Playfair), SEO Meta
│   ├── page.tsx           # Homepage composition
│   ├── sitemap.ts        # Dynamic sitemap generation (/sitemap.xml)
│   ├── robots.ts         # Search engine crawler permissions (/robots.txt)
│   ├── global-error.tsx   # Production-safe error fallback
│   └── globals.css        # Tailwind v4 styles & luxury color tokens
├── components/
│   ├── Header.tsx         # Auto-hiding navbar + mobile menu drawer
│   ├── Hero.tsx           # Hero section & Showreel video modal
│   ├── ClientMarquee.tsx  # Infinite auto-scrolling brand logo ticker
│   ├── ServicesShowcase.tsx # GSAP ScrollTrigger floating image cards
│   ├── CaseStudies.tsx    # Filterable portfolio & Instagram Reel cards
│   ├── Testimonials.tsx   # Touch-enabled review carousel
│   ├── ScopeEstimator.tsx # 3-step project calculator & WhatsApp generator
│   ├── TeamAccordion.tsx  # Directors & Team Leads flex accordion
│   └── Footer.tsx         # Footer links & designer credits
├── lib/
│   ├── motion.ts          # Central Framer Motion variants
│   ├── showreel.ts        # Showreel URL config & smart embed parser
│   └── whatsapp.ts        # WhatsApp API dynamic link builder
├── netlify.toml           # Netlify build configuration & CSP security headers
└── public/                # Static assets & photography
```

---

## 🌐 Deployment

### Deploying to Netlify
1. Connect your repository to Netlify.
2. In **Site Configuration → Environment Variables**, add:
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` = `917559429753`
3. Deploy! Netlify automatically reads `netlify.toml` for build settings and security headers.

---

## 🛠️ Verification & Quality Checks

Run local linting, type-checking, and production build checks:
```bash
# TypeScript type check
npx tsc --noEmit

# ESLint code audit
npm run lint

# Production build check
npm run build
```

---

## ✒️ Author & Credits

Designed & Developed by **Anand Jadhav**
- 🌐 Portfolio: [portfolio-three-swart-hx117dkm48.vercel.app](https://portfolio-three-swart-hx117dkm48.vercel.app)
- 📸 Instagram: [@anannnnnd22](https://www.instagram.com/anannnnnd22?igsh=MXkwZ3JqOXBlandqaQ%3D%3D&utm_source=qr)

© 2026 Elvora Media. All rights reserved.
