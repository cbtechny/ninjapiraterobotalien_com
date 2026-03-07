# Artwork Inventory & Asset Audit

## Summary
This document provides a comprehensive audit of all visual assets required for the Sackjack Island site redesign. It identifies missing, placeholder, and substandard assets, providing a roadmap for production to achieve the high-contrast "Digital Press Kit" aesthetic.

## Audit Methodology
- **Code Inspection**: Automated and manual scans of all HTML and CSS files for `<img>` tags, background image properties, and asset-related utility classes.
- **Repository Audit**: Direct inspection of the `assets/` directory to evaluate existing image quality, dimensions, and relevance to the new design system.
- **Blueprint Cross-reference**: Verification against `docs/redesign/02-homepage-blueprint.md` and `03-secondary-pages.md` to ensure all planned components have associated asset requirements.
- **Heuristic Analysis**: Identifying areas where emoji-based UI, fallback gradients, or text-heavy sections would benefit from bespoke artwork to meet "Comic Book" style goals.

## Recommended Asset System
To maintain organization and scalability, the following taxonomy is proposed:
- **brand**: Logos, favicons, and identity marks.
- **hero**: Large-scale, full-width billboard backgrounds.
- **banners**: Mid-sized section headers and decorative strips.
- **cards**: Assets specifically cropped for modular panel components (Roster, Features).
- **gallery**: High-resolution screenshots for the showcase grid.
- **screenshots**: In-game captures used for devlogs or documentation.
- **character-art**: Transparent PNGs of potato characters for layout layering.
- **environment-art**: Concept pieces or biome-focused visuals.
- **ui-icons**: Bespoke functional icons (e.g., "Card", "Potato", "Battle").
- **social-preview**: Platform-specific OG images and banners.

## Artwork Inventory

| ID | Priority | Status | Page / Path | Section / Component | Current State | Asset Needed | Purpose | Suggested Specs | Art Direction Notes |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| B01 | P0 | Existing but should be replaced | Global | Site Identity | `favicon.ico` (standard) | Redesign Favicon | Consistent branding in browser tabs | 32x32, 48x48 (ICO/PNG) | Simplified "Sackjack" potato icon or "SJ" initials in Hot Pink. |
| B02 | P0 | Existing but should be replaced | Global | Branding | `SackjackIsland_Title_1-18-26.png` | Redesign Logo Treatment | Primary brand logo for header/hero | ~1200px width (PNG) | Sharp, comic-book style "Sackjack Island" with thick black outlines and Hot Pink highlights. |
| H01 | P0 | Placeholder | `index.html` | Hero Billboard | `hero-home-placeholder.png` | Beach Landing Hero Art | High-impact homepage hook | 1920x1080 (JPG/WebP) | Stylized "Beach Landing" environment. Atmospheric but clean enough for text overlay. |
| H02 | P1 | Missing | `index.html` | Hero Billboard | Text-only | Hero Character Overlay | Depth and personality for hero | 800x1000 (PNG) | A "Sackjack Champion" potato character with transparent background. |
| G01 | P1 | Placeholder | `index.html` | Gameplay Loop | Text-only cards | Feature Icons (x3) | Visual aids for mechanics | 200x200 (PNG) | Comic-style icons for "Draft", "Battle", and "Climb" (e.g., a card, a sword, a ladder). |
| R01 | P0 | Placeholder | `index.html` | Contender Roster | 4x `panel-roster-placeholder-XX.png` | Character Portraits (x4) | Showcase game characters | 600x800 (PNG) | Individual portraits for Crinkle, Yukon, Unit-9, and The Dealer. 3:4 aspect ratio. |
| F01 | P1 | Placeholder | `index.html` | Feature Highlights | 2x `panel-feature-placeholder-XX.png` | Feature Screenshots | Evidence of gameplay | 800x600 (JPG/WebP) | High-action screenshots showing "Power Card Chaos" and the "Island Tournament Map". |
| D01 | P0 | Placeholder | `/devlog/` | Featured Milestone | `devlog-feature-placeholder.png` | Milestone Banner | Visual anchor for latest updates | 1280x720 (JPG/WebP) | Composition of current dev work; e.g., a map view or new UI mockups. |
| A01 | P1 | Placeholder | `/about/` | Studio Story | `about-banner-placeholder.png` | Studio Profile Visual | Visualizing NPRA mission | 1280x720 (JPG/WebP) | "Behind the scenes" or stylized studio logo mashup (Ninja Pirate Robot Alien). |
| A02 | P1 | Placeholder | `/about/` | Press Kit | `press-kit-zip-icon.png` | Press Kit Download Icon | Call to action for media | 256x256 (PNG) | A chunky, vibrant ZIP or folder icon in the "Comic Book" style. |
| S01 | P0 | Missing | Meta | Social / SEO | Default / None | OpenGraph (OG) Image | Link previews on X/Discord/FB | 1200x630 (JPG) | High-contrast branding with the game logo and a hero character. |
| S02 | P2 | Missing | Meta | Social / SEO | Default / None | Platform Banners | Profile headers for X/YouTube | 1500x500 (JPG) | Panoramic view of the Island zones. |
| Z01 | P2 | Missing | `/about/` | Island Zones | Text descriptions | Zone Concept Art (x3) | World building and lore | 1200x400 (JPG) | Wide banners for "Beach Landing", "Jungle Canopy", and "Summit Sanctuary". |
| G02 | P0 | Missing | `index.html` | Screenshot Gallery | Placeholder images (4-6) | High-Res Screenshots (x6) | Visual proof of gameplay | 1280x720 (JPG/WebP) | Diverse selection of gameplay: UI-heavy battle, exploration, and character interactions. |

## Quick Wins
- **Favicon Update**: Replacing the generic favicon with a high-contrast SJ icon instantly polishes the tab bar.
- **OG Image Creation**: Generating one high-quality 1200x630 image significantly improves the "professional" feel of shared links.
- **Logo "Comic" Pass**: Adding a thick black stroke and subtle Hot Pink shadow to the existing title logo.
- **Emoji Replacement**: Swapping the "⚡", "🎨", and "🧪" in the Devlog Buzz section with small 48x48 pixel art or comic icons.

## Launch-Critical Asset Checklist
- [ ] **B02**: Finalized Sackjack Island Logo Treatment.
- [ ] **H01**: Beach Landing Hero Background.
- [ ] **R01**: Four distinct character portraits for the Roster section.
- [ ] **S01**: OpenGraph preview image for social sharing.
- [ ] **D01**: A real screenshot or mockup for the Featured Devlog Milestone.

## Suggested Future File Paths
To keep the `assets/` directory clean during the redesign, migrate assets to these locations:
- `assets/brand/` (Logos, favicons, app icons)
- `assets/images/heroes/` (Full-width billboard backgrounds)
- `assets/images/banners/` (Section headers and about page visuals)
- `assets/images/cards/` (Character portraits and feature card images)
- `assets/images/gallery/` (High-res screenshots for the showcase)
- `assets/images/environments/` (Zone concept art and biome visuals)
- `assets/ui/icons/` (Bespoke UI elements and feature icons)
- `assets/social/` (OG images and platform-specific banners)
