# 05 - Implementation Brief: Sackjack Island Redesign

**Primary Source of Truth for Codex**

This document serves as the definitive technical guide for implementing the redesign of the Ninja Pirate Robot Alien Games website. It consolidates the strategy from all other planning documents into an actionable execution plan.

## Technical Requirements

-   **Platform**: Static HTML/CSS/JS.
-   **Architecture**: Continue using the current component-based approach (partials for header/footer).
-   **Performance**: Optimize images (WebP where possible) and minimize external dependencies.
-   **Responsiveness**: Mobile-first design with a primary breakpoint at 768px.
-   **Accessibility**: Ensure semantic HTML, proper ARIA labels, and high color contrast.

## Target File Structure

```text
/
├── index.html              (New HOME)
├── devlog/
│   ├── index.html          (New DEVLOG)
│   └── [posts].html        (Migrated posts)
├── about/
│   └── index.html          (New ABOUT)
├── partials/
│   ├── header.html
│   └── footer.html
├── assets/
│   ├── images/
│   └── css/
│       └── style.css       (New Design System)
└── script.js               (Consolidated JS)
```

## Step-by-Step Implementation Guide

1.  **Phase 1: Foundation (Setup & Style)**
    -   Update `style.css` with the new design system (CSS variables, typography, utility classes).
    -   Refactor `partials/header.html` and `partials/footer.html` to match the new visual standards.
2.  **Phase 2: The Hero (HOME Page)**
    -   Build the new `index.html` according to the [02-homepage-blueprint.md](02-homepage-blueprint.md).
    -   Implement the Sackjack Island hero section and showcase.
3.  **Phase 3: Supporting Content (DEVLOG & ABOUT)**
    -   Create the `about/index.html` page.
    -   Migrate and restyle the `devlog/` directory content.
4.  **Phase 4: Optimization & Verification**
    -   Ensure all internal links are updated to the new structure.
    -   Perform frontend verification (Playwright) for responsiveness and layout.
    -   Final review against the [00-overview.md](00-overview.md) goals.

## Implementation Notes for Codex

-   **Sackjack Island focus**: Every page should reinforce the Sackjack Island aesthetic.
-   **No Overengineering**: Use vanilla JS and CSS. Avoid adding unnecessary libraries.
-   **Placeholder handling**: If an asset is missing, use a branded placeholder rather than a generic one if possible.
