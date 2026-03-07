# Visual System

The Ninja Pirate Robot Alien redesign uses a high-contrast, "Digital Press Kit" aesthetic. It is bold, punchy, and panel-driven, capturing the modular communication style of modern mobile hits without sacrificing static-site performance.

## Colors
- **Background**: Dark Charcoal (`#1a1a1a`) - Primary surface color for all pages.
- **Text**: White (`#ffffff`) - High readability on dark backgrounds.
- **Primary Accent**: Hot Pink (`#ff0066`) - Used for primary CTAs, active states, and "Hero" borders.
- **Secondary Accent**: Bright Yellow (`#ffcc00`) - Used for sub-headers, "New" tags, and hover-state highlights.
- **Muted Text**: Light Gray (`#a0a0a0`) - Used for dates, metadata, and secondary descriptions.

## Typography Usage
- **Primary Heading**: `Bangers`, cursive.
  - Used for: Hero titles, Section headers, and large Panel titles.
  - Treatment: All-caps, `letter-spacing: 0.05em`.
- **Body Text**: `Inter`, sans-serif.
  - Used for: Descriptions, devlog content, and UI labels.
  - Sizes: `16px` base, `18px` for lead paragraphs.
- **Micro-Copy**: `Inter`, sans-serif.
  - Used for: Captions, dates, and tag labels.
  - Size: `14px`, `font-weight: 600`.

## Spacing Rhythm
- **Modular Scale**: Based on an `8px` grid.
- **Section Padding**: `clamp(4rem, 10vw, 8rem)` vertical spacing between major sections.
- **Panel Gap**: `2rem` standard gap between cards/panels.
- **Text Margin**: `1rem` bottom margin for paragraphs and sub-headers.

## Border & Panel Treatment
- **Corners**: Sharp (`0px` border-radius). No rounding permitted.
- **Borders**: `1px` or `2px` solid lines.
  - Default: `#333333` (Subtle).
  - Highlight: Hot Pink (`#ff0066`).
- **Panels**: Rectangular containers with high-contrast borders.
  - No heavy gradients or complex shadows.
  - Hover State: Border changes to Hot Pink or Yellow with a slight lift (`transform: translateY(-4px)`).

## Button Styles
- **Primary CTA**:
  - Background: Hot Pink (`#ff0066`).
  - Text: White, Bold, `Bangers`.
  - Border: `2px` solid White.
  - Hover: Background shifts to Yellow, Text shifts to Dark Charcoal.
- **Secondary Button**:
  - Background: Transparent.
  - Text: White, `Inter` (Bold).
  - Border: `2px` solid White.
  - Hover: Border and Text shift to Hot Pink.

## Link Styles
- **Inline Links**: Hot Pink with a thin underline.
- **Nav Links**: White, `Bangers`, uppercase. Hover color: Yellow.

## Divider Behavior
- **Primary Divider**: A thin (`1px`) Hot Pink line spanning the full container width.
- **Content Divider**: A short, centered Hot Pink line (`40px` wide, `4px` thick) used under section headings.

# Component Inventory

## Hero Billboard
- **Structure**: Full-width container with a focused background image.
- **Content**: Left-aligned or centered `Bangers` title, brief tagline, and one Primary CTA.
- **Style**: Thin Hot Pink bottom border.

## Promo Panel
- **Structure**: Large rectangular box (50/50 split or full width).
- **Content**: High-quality screenshot on one side, text + CTA on the other.
- **Style**: `2px` Hot Pink border.

## Feature Strip
- **Structure**: 3-column grid of modular icons/images.
- **Content**: Small image, `Bangers` title, 2-line description.
- **Style**: Sharp-cornered boxes with subtle gray borders.

## Roster Card
- **Structure**: Vertical card for potato characters.
- **Content**: Character portrait, name (`Bangers`), and "Stat" snippet.
- **Style**: Heavy focus on the character silhouette.

## Devlog Card
- **Structure**: Horizontal or vertical card for blog updates.
- **Content**: 16:9 Thumbnail, Date, Title, Excerpt.
- **Style**: Hovering the card highlights the border in Yellow.

## CTA Band
- **Structure**: Full-width, low-height strip (e.g., "Join the Discord").
- **Content**: One line of text + one Button.
- **Style**: Background: Yellow (`#ffcc00`), Text: Dark Charcoal.

## Social Buzz Card
- **Structure**: Small, square or rectangular "Micro-blog" snippet.
- **Content**: Short text (max 280 chars), timestamp, optional icon.
- **Style**: Subtle background (`#252525`), Hot Pink top border.

## Support Panel
- **Structure**: Two-column layout for FAQ/Contact.
- **Content**: Question/Answer pairs or Contact Link list.
- **Style**: Clean, high-contrast text on Dark Charcoal.

# Placeholder Media Conventions

To maintain layout integrity when final assets are unavailable:

## Placement & Dimensions
- **Hero Background**: `1920x1080` (16:9) - `assets/images/placeholders/hero-placeholder.jpg`
- **Character Portrait**: `600x800` (3:4) - `assets/images/placeholders/char-placeholder.png`
- **Screenshot Gallery**: `1280x720` (16:9) - `assets/images/placeholders/screen-placeholder.jpg`
- **Feature Icons**: `200x200` (1:1) - `assets/images/placeholders/icon-placeholder.png`

## Naming Conventions
- `[section]-[asset-name]-[dimensions].ext`
- Example: `hero-sackjack-1920x1080.jpg`

## Fallback Behavior
- **CSS Background Color**: If an image fails to load, containers must default to `#252525`.
- **Alt Text**: Every image must have descriptive alt text to ensure accessibility and SEO.
- **Broken Image Icon**: Use `object-fit: cover` and a `min-height` on containers to prevent layout collapse.

# Responsive Rules

## Mobile Hero Treatment
- **Layout**: Stack elements vertically.
- **Typography**: Reduce `Bangers` headline size using `clamp(2rem, 8vw, 3.5rem)`.
- **Imagery**: Crop hero backgrounds to center-focus or swap for a mobile-optimized portrait version.

## Stacking Rules
- **Grid to Stack**: All 2 and 3-column grids must transition to 1-column at `768px`.
- **Order**: In 50/50 splits, images should stack *above* their associated text on mobile.

## Panel Spacing Adjustments
- **Margins**: Reduce section padding to `3rem` vertical on mobile.
- **Touch Targets**: All buttons and links must maintain a minimum hit area of `44x44px`.

## CTA Behavior on Smaller Screens
- **Full Width**: CTAs and Buttons should expand to fill the container width on mobile (max-width `400px`).
- **Sticky CTA**: For long pages, the Primary CTA may be pinned to the bottom of the viewport as a "floating" button.

# Design System Handoff For Codex

## Implementation Priorities
1. **Global Variables**: Define the `#1a1a1a`, `#ff0066`, and `#ffcc00` colors in `:root`.
2. **Sharp Corners**: Ensure `border-radius: 0 !important` is applied globally.
3. **Bangers Integration**: Ensure `Bangers` is loaded via `preconnect` and applied to all `H1-H3` and `.cta` classes.
4. **The "Panel" Class**: Create a reusable `.panel` utility with the Hot Pink border and sharp corners.
5. **Image Safety**: Ensure all `img` tags have explicit `width` and `height` to prevent CLS.

## Consistency Check
Before finalizing any page, verify that:
- No gradients are muddying the Hot Pink/Charcoal contrast.
- All "Hover" states use either Hot Pink or Yellow.
- Text remains readable (White on Charcoal) at all times.
