# Final Implementation Brief For Codex

This document serves as the primary technical contract and "Source of Truth" for the Sackjack Island redesign. It synthesizes all planning documents into a build-ready roadmap for Codex.

## Project Goal
Redesign the current Ninja Pirate Robot Alien studio website into a high-performance, 3-page "Digital Press Kit" that establishes **Sackjack Island** as the definitive centerpiece. The site must be vibrant, static-site friendly, and prioritize visual impact over text-heavy layouts.

## Restructuring Summary
The existing fragmented architecture (Studio vs. Game silos) is consolidated into a lean 3-page model at the root:
- **Retired**: The studio-first landing page (`index.html`) and redundant silos (`/sackjack-island/`, `/studio/`).
- **Consolidated**: All "About" and "Contact" content from four separate pages merges into a single `/about/` destination.
- **Relocated**: The Sackjack Island promotional content moves to the root `index.html`.
- **Modernized**: The `/devlog/` remains but adopts the new high-contrast "Comic Book" aesthetic.

## Page Responsibilities

### 1. HOME (`index.html`)
- **Role**: The "Sackjack Showcase" and primary conversion engine.
- **Key Sections**: "Spud-Down" Hero (Identity), Gameplay Loop Trio (15-second hook), Screenshot Gallery (Visual Proof), Island Zones (World Building), and "Latest Intel" (Devlog Teaser).
- **Latest Intel Logic**: Implement a lightweight JS fetcher in `script.js` to parse `devlogs/posts/` and display the 2-3 most recent headlines/dates. If JS fails, show a static "Read the Latest" link.

### 2. DEVLOG (`/devlog/index.html`)
- **Role**: The "Momentum Hub" showing active development.
- **Key Sections**: Featured Milestone Card, "Latest Buzz" (Micro-blog container for short HTML snippets), and the full chronological Post Grid.
- **Vibe**: Iterative and community-focused.

### 3. ABOUT (`/about/index.html`)
- **Role**: The "Fact Sheet" and professional point of contact.
- **Key Sections**: Game Fact Sheet (Platforms/Features), Studio Identity (Mission), "The Humans Behind the Spuds" (Team), Contact Hub (Email/Socials), and the Digital Press Kit (Asset Downloads).
- **Vibe**: Authoritative and professional.

## Design System Priorities
- **Colors**: Background `#1a1a1a`, Primary Accent `#ff0066` (Hot Pink), Secondary Accent `#ffcc00` (Bright Yellow).
- **Typography**: `Bangers` (Headings, All-Caps) and `Inter` (Body, clean sans-serif).
- **Aesthetic**: Sharp corners (`0px` radius), `1px-2px` bright borders, high contrast, and no "sluggish" gradients.
- **Interactive**: Hover states should lift panels (`translateY(-4px)`) and swap border colors to Hot Pink or Yellow.

## Component Build Priorities
1. **The `.panel` Utility**: A reusable container class with the signature Hot Pink border and sharp corners.
2. **Hero Billboard**: A full-width, high-impact header component for HOME.
3. **Responsive Grid**: A flex/grid system that transitions from 3-columns (Desktop) to 1-column (Mobile < 768px).
4. **Latest Buzz Component**: A simple CSS-styled container for the micro-blog snippets.

## Placeholder Asset Requirements
Placeholders should be organized in `assets/images/placeholders/` using the following naming convention: `[component]-[name]-[dimensions].png`.
- **Required Placeholders**:
  - `hero-bg-1920x1080.png`
  - `feature-blackjack-800x600.png`
  - `character-spud-600x800.png`
  - `gallery-screen-1280x720.png` (x4)
  - `press-kit-zip-icon.png`

## Navigation Requirements
- **Simplified Menu**: `[ HOME ]` | `[ DEVLOG ]` | `[ ABOUT ]`.
- **Branding**: The header must feature "Sackjack Island" as the primary brand, with "Ninja Pirate Robot Alien" as the secondary studio credit.
- **Sticky Header**: The `#header-placeholder` must be `position: sticky` with a `min-height` of `80px` (Desktop) / `62px` (Mobile) to prevent CLS.

## Responsive Expectations
- **Mobile Breakpoint**: 768px.
- **Hero Treatment**: Elements stack vertically; headlines use `clamp()` for fluid scaling.
- **CTAs**: Full-width on mobile (min-height 48px).
- **Image Handling**: All images must have explicit `width` and `height` attributes.

## Coding Constraints
- **Static-Only**: No frameworks or heavy JS libraries.
- **Partials System**: Maintain the `fetch()`-based injection for header/footer.
- **Pathing**: Use root-relative paths (e.g., `/style.css`) in partials to ensure they work at any directory depth.
- **Performance**: Block external font requests during testing; use `preconnect` for production.

## Phased Implementation Plan
1. **Phase 1: Foundation**: Update global `style.css` with the design system variables and `.panel` utilities. Update `header.html` and `footer.html`.
2. **Phase 2: The Showcase**: Build the new `index.html` (HOME) using the Page Blueprint.
3. **Phase 3: The Hubs**: Modernize `devlog/index.html` and consolidate the new `about/index.html`.
4. **Phase 4: Logic & Assets**: Implement the "Latest Intel" JS fetcher and populate the `/assets/images/placeholders/` directory.
5. **Phase 5: Audit**: Verify all links, responsive behavior, and CLS performance.

## Definition Of Done
- [ ] 3-page structure is live at root, `/devlog/`, and `/about/`.
- [ ] Design system (Hot Pink/Yellow, Sharp Corners, Bangers) is applied site-wide.
- [ ] All content from legacy `/studio/` and `/sackjack-island/` paths is migrated or deprecated.
- [ ] "Latest Intel" on HOME correctly displays recent devlog titles.
- [ ] Mobile navigation and layout pass the 768px responsiveness test.
- [ ] No "Coming Soon" or "Placeholder" pages remain (placeholder *assets* are acceptable).
