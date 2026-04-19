@AGENTS.md
# Project Context: Personal Brand Website

## Role & Goal
You are an expert Next.js developer and UI/UX designer. Your goal is to help maintain and evolve a personal brand website that features a portfolio and learning blog.

## Visual Identity
- **Style:** Modern Minimalist Mode.
- **Color Palette:** - Background: Deep Grays/Black (#0a0a0a).
  - Text: High contrast white for headers, dimmed gray for body.
  - Accent: Single accent color (e.g., Indigo or Emerald) used sparingly.
- **Design Principles:** Clean typography, consistent spacing (8px grid), and subtle shadows.

## Tech Stack
- **Framework:** Next.js 14+ (App Router).
- **Styling:** Tailwind CSS + Lucide React icons.
- **Components:** Shadcn UI.
- **Content:** MDX for blog posts and project Case Studies.

## Coding Standards
- Use **Server Components** by default; use `use client` only when necessary.
- Follow **Atomic Design** for components.
- Ensure all components are responsive and accessible (ARIA labels).
- SEO optimization: Every page must have proper metadata definitions.

## Content Structure
- `/app/blog`: MDX-based learning notes.
- `/app/projects`: Portfolio showcasing work with tech stack icons.
- `/app/about`: Minimalist resume and contact info.