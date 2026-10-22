# Grappling Federation of Pakistan — website

Vite + React (JavaScript, not TypeScript). `npm run dev` / `npm run build` / `npm run lint` (oxlint).

## Stack

Mandatory: React, Vite, Tailwind CSS v4 (`@tailwindcss/vite`), custom CSS, Motion (`motion/react`), Lucide React, Radix UI, shadcn/ui.

- shadcn is configured on the **Radix** base (`components.json` style `radix-nova`). Primitives come from the unified `radix-ui` package — do not install individual `@radix-ui/react-*` packages or `@base-ui/react`.
- `cn()` lives in `src/lib/utils.js` (clsx + tailwind-merge). shadcn's CLI may generate `import { cn } from "cn"` — always rewrite it to `import { cn } from "@/lib/utils"`.
- Add shadcn components with `npx shadcn@latest add <name>`; they are editable source in `src/components/ui/`.
- `@/` resolves to `src/` (vite.config.js + jsconfig.json).
- Lenis smooth scrolling is wrapped globally in `src/components/smooth-scroll.jsx` (disabled under reduced motion). Mount shadcn's `TooltipProvider` in `src/main.jsx` if the tooltip component is ever used.
- Routing: `react-router` (data router) in `src/App.jsx`; every page except Home is `lazy()`-loaded. Pages live in `src/pages/`.

## Source of truth

The brief is the GFP Website Strategy PDF (Sept 2026): sitemap §4, copy §4.3–4.4, palette/type §5.

- All federation facts live in `src/content/` (`site.js` NAP/leadership/nav, `events.js`, `sport.js`, `faq.js`, `policies.js`). Pages read from there — never hard-code facts in JSX.
- Never invent facts (event dates, fees, results, office-bearers, founding year). Unknown fields stay `null` and render as "To be confirmed"; pending items use the `<Notice>` block.
- Leadership and contact details (Lahore HQ, grappling.pk@gmail.com, +92 300 4318826) were confirmed by the federation on 29 Sept 2026 from its Boltmore profile (`leadership` / `org` in `site.js`). UWW's directory still shows an older record (`org.uwwRecord`); the Leadership page notes this until UWW updates it.
- Every page renders `<Seo>` (usually via `PageHero`'s `seo` prop) with the strategy's meta title/description and schema.org JSON-LD.

## Brand system

- Colours are Tailwind tokens in `src/index.css` `@theme`: `fed` (green), `fed-dark`, `fed-light`, `ink`, `surface`, `gold`, `gold-dark`, `tint`, `offwhite`, `steel`, `signal` (red). Gold = action/achievement, green = structure, red = errors/"live" only. Never gold text on white.
- Type: `.t-hero .t-h1 .t-h2 .t-h3` (Barlow Condensed), `.t-card .t-lead .t-caption .t-eyebrow .t-stat` (Inter). Use these, not ad-hoc sizes.
- Shadows: `shadow-control` (inputs/buttons) → `shadow-card` / `shadow-card-hover` → `shadow-float` (menus/popovers). No other shadow values.
- Brand components: `components/brand/` (`Button`, `ArrowLink`, `Card`, `IconTile`, `Badge`, `MatGraphic`, `Logo`), page scaffolding in `components/layout/` and `components/blocks.jsx`.

## Motion system

- Tokens in `src/lib/motion.js` (`ease`, `spring`, `reveal` variants, `inView`, `sequence`). Tweens for reveals, springs for anything the user touches.
- Primitives in `components/motion/`: `TextReveal` (masked headings), `Reveal type=text|card|pop|slide|rule|fade`, `Stagger` + `Stagger.Item`, `MaskReveal` (images/panels), `CountUp`, `Parallax`, `ScrollHighlight`, `ScrollTimeline`, `CursorHalo`.
- Pick the reveal type by content (paragraph → text, cards → card, chips/CTAs → pop, data tables → fade); don't default everything to one.
- `MotionConfig reducedMotion="user"` is set in `App.jsx`; the cursor halo only mounts for fine pointers without reduced motion.

Approved component sources: shadcn/ui, Aceternity UI, Magic UI — copy individual components in, never whole kits.

Optional, install only when a design actually needs it: GSAP, three, @react-three/fiber, @react-three/drei.

## Design and motion rules

- Search the approved component sources before building a complex UI component from scratch.
- Motion is the default animation engine. Use GSAP only for exceptional cinematic sequences Motion can't handle.
- Components from shadcn, Aceternity or Magic UI must be adapted to this project's typography, spacing, colours and visual language — never ship their demo appearance.
- Use Aceternity/Magic UI effects selectively; the site must not read as a component showcase.
- Use custom CSS where Tailwind is insufficient.
- Avoid repetitive fade-up animations. Prefer purposeful scroll-linked motion, spring interactions, shared-layout transitions, masking, staggered typography, parallax, micro-interactions and `AnimatePresence` where appropriate.
- Never sacrifice accessibility, Core Web Vitals or mobile performance for visual effects. Respect `prefers-reduced-motion`.
