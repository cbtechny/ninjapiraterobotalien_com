# 03: Secondary Pages

This document details the architecture for the DEVLOG and consolidated ABOUT pages, ensuring they support the Sackjack Island-centric "Digital Press Kit" strategy.

# Devlog Page Blueprint

The DEVLOG serves as the heartbeat of the project, demonstrating active momentum and transparency to fans and potential partners.

## Content Hierarchy
1.  **Hero Title**: High-energy "DEVLOG" heading with a brief mission statement (e.g., "Behind the scenes of Sackjack Island").
2.  **Featured Update**: A single, full-width high-impact card showcasing the most significant recent milestone.
3.  **Latest Buzz**: A "micro-blog" section for quick snippets, technical wins, or social-style updates that don't require full articles.
4.  **Update Archive**: A clean, filterable grid of historical posts.

## Section Structure & Behavior
-   **Featured Card**: Uses a large background image from the post, bold headline, and a "Read Milestone" button.
-   **Latest Buzz (Manual Feed)**:
    -   **Concept**: A dedicated area for short-form updates (max 280 chars).
    -   **Implementation**: For now, this is a manually updated HTML block in the page source. It provides a "Live" feel without complex backend requirements.
-   **Post Grid**:
    -   **Visuals**: Cards use a 16:9 thumbnail, date, and a 2-line excerpt.
    -   **Grid**: 1 column on mobile, 3 columns on desktop (768px+).
    -   **Logic**: Ordered by date descending.

## Featured Update Logic
The most recent post (or a post manually flagged in the HTML) is extracted from the grid and placed into the Hero/Featured slot to ensure the page feels fresh upon every visit.

## CTA Opportunities
-   **Post-End CTA**: Every devlog post should end with a "Return to Sackjack Island" button leading to the HOME page.
-   **Page-Bottom CTA**: A "Stay in the Loop" section encouraging newsletter signups or social follows.

# About Page Blueprint

The ABOUT page is the "Fact Sheet" of the studio. It consolidates studio identity, game specifics, and contact info into a professional, press-ready summary.

## Content Hierarchy
1.  **Sackjack Island Fact Sheet**: "The Game" – Core pitch, platform info, and key features.
2.  **Studio Identity**: "The Team" – Mission statement and philosophy (condensed from current `studio/about.html`).
3.  **Contact & Socials**: "Get In Touch" – Clear, direct links and the consolidated FAQ.
4.  **Press Assets**: "Digital Press Kit" – A prominent link to a downloadable asset pack.

## Organization of Info
-   **Studio vs. Creator**: Focus on the *Studio* brand (Ninja Pirate Robot Alien) as the primary entity, with a brief "The Humans Behind the Spuds" section for personal identity.
-   **Practical over Personal**: Keep the "Personal Story" restricted to a single section. The rest of the page should be highly scan-able and informational.
-   **Promotional vs. Informational**:
    -   **Promotional**: The Game Fact Sheet and Studio Philosophy use vibrant visuals and "hook" copy.
    -   **Informational**: FAQ, Contact links, and Technical Stack use clean, high-contrast layouts for readability.

## Contact & Socials Integration
-   Consolidate all links from `studio/contact.html` into a single, high-visibility "Communication Hub" section at the bottom of the page.
-   Include the current FAQ items here to reduce friction for common inquiries.

# Role Separation

| Feature | DEVLOG | ABOUT |
| :--- | :--- | :--- |
| **Primary Audience** | Returning fans, Discord community, technical peers. | Press, potential partners, first-time curious players. |
| **Content Tone** | Iterative, "Work-in-Progress," conversational. | Authoritative, "Fact-Sheet," professional. |
| **Update Frequency** | High (Weekly/Bi-weekly). | Low (Milestone-based). |
| **Core Goal** | Build trust and show momentum. | Provide clarity and facilitate contact. |

# Secondary Pages Handoff For Codex

## Implementation Checklist
-   [ ] **Consolidation**: Merge content from `studio/about.html`, `studio/contact.html`, and `sackjack-island/about.html` into the new `/about/index.html`.
-   [ ] **Latest Buzz Component**: Create a reusable CSS class for "Buzz" items that can be easily updated in the HTML.
-   [ ] **Devlog Grid**: Refactor the current `devlogs/index.html` to support the "Featured + Grid" layout.
-   [ ] **Asset Links**: Ensure the "Digital Press Kit" link is prominent and points to a valid destination.
-   [ ] **FAQ Migration**: Move FAQ content from `studio/contact.html` to the bottom of the new ABOUT page.

## Technical Notes
-   Keep all styles within the global `style.css` using utility classes.
-   Use the existing `#header-placeholder` and `#footer-placeholder` for consistency.
-   Avoid adding new JS dependencies for the Devlog grid; stick to CSS Grid/Flexbox.
