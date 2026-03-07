# 01: Information Architecture Migration

This document provides a framework for mapping the current site structure to the new 3-page layout focused on Sackjack Island.

# Current IA Diagnosis

The existing Ninja Pirate Robot Alien website suffers from a split identity and structural redundancy that dilutes its promotional impact:

1.  **Fragmented Focus**: The site is divided into "Studio" (`/`, `/studio/`) and "Game" (`/sackjack-island/`) silos. This forces users to navigate between two different hierarchies to get a complete picture.
2.  **Redundant Content**: There are overlapping "About" pages for both the studio and the game. Technical details and mission statements are scattered across multiple files.
3.  **Cluttered Navigation**: The current 6-link header (Home, Sackjack Island, Devlogs, Store, About, Contact) creates too many decision points for a promotional site.
4.  **Placeholder Fatigue**: Key sections like the Store and Demo are "Coming Soon" placeholders, which can frustrate users looking for immediate engagement.
5.  **Sub-optimal Entry Point**: The current root `index.html` is a studio landing page that requires an extra click to reach the primary product, Sackjack Island.

# New IA Model

The redesigned architecture consolidates the experience into a high-performance 3-page "Digital Press Kit":

1.  **HOME (Sackjack Showcase)**: The root of the domain. It serves as the definitive landing page for Sackjack Island, featuring a hero section, game features, key screenshots (formerly the Gallery), and immediate calls to action.
2.  **DEVLOG (Development Hub)**: A streamlined version of the current devlog system. It maintains the chronological history of the project while adopting the new visual language.
3.  **ABOUT (The Studio & The Spuds)**: A single, consolidated destination for all non-news content. This combines studio philosophy, game backstory ("The Story"), technical stack, and contact information into a cohesive narrative.

# Content Migration Map

| Current Content | New Primary Page | Disposition |
| :--- | :--- | :--- |
| `index.html` (Studio Home) | **HOME** | **Replaced.** The studio landing page is retired in favor of the Sackjack-focused experience. |
| `sackjack-island/index.html` | **HOME** | **Migrated.** Core promotional content becomes the foundation of the new HOME. |
| `sackjack-island/gallery.html`| **HOME** | **Consolidated.** Best-of screenshots move to a high-impact gallery section on HOME. |
| `sackjack-island/demo.html` | N/A | **Deprecated.** Direct browser demo is removed for this phase. |
| `devlogs/index.html` | **DEVLOG** | **Kept.** Modernized to match the new design system. |
| `devlogs/posts/*` | **DEVLOG** | **Kept.** Individual posts remain accessible but updated with the new partials. |
| `studio/about.html` | **ABOUT** | **Merged.** Studio philosophy and tech stack moved to ABOUT. |
| `studio/contact.html` | **ABOUT** | **Integrated.** Contact info and FAQs moved to the bottom of ABOUT. |
| `sackjack-island/about.html`| **ABOUT** | **Merged.** "The Story" and "The Island's Zones" moved to ABOUT. |
| `studio/store.html` | N/A | **Removed.** Store integration is out of scope for the redesign. |

# Navigation Recommendation

The site navigation will be simplified to a three-item primary menu to ensure maximum focus on the core pages:

*   **Primary Nav**: `[ HOME ]` | `[ DEVLOG ]` | `[ ABOUT ]`
*   **Sticky Header**: The header should remain sticky (using `position: sticky` on the placeholder) to provide easy navigation regardless of scroll depth.
*   **Footer**: Should include quick contact links and a "Back to Top" function for long-form pages like ABOUT.

# Migration Risks

*   **Internal Link Breaks**: Moving `index.html` from `/sackjack-island/` to `/` will break many relative links. Implementation must audit every relative path.
*   **Content Overload on ABOUT**: Merging four pages (`studio/about`, `studio/contact`, `sackjack-island/about`, and FAQs) into one risks creating an intimidatingly long page. Careful use of sections and visual anchors is required.
*   **SEO/Deep-link Decay**: Traffic currently pointing to `/sackjack-island/` will hit a 404 if directory-level redirects or a landing page isn't maintained at that location.
*   **Loss of Detail**: In the move to a "Digital Press Kit" aesthetic, technical details about the tech stack (Godot, Inkscape, etc.) must not be buried so deep they become invisible to fellow developers.

# IA Handoff For Codex

Codex should prioritize the following when implementing this IA:

1.  **Sackjack First**: The root `index.html` must be the Sackjack Island showcase. The studio is the *creator* of the game, not the primary focus of the site.
2.  **Consolidation over Deletion**: When merging into ABOUT, ensure the "vibe" of the studio and the "lore" of the island are preserved, even if the text is tightened.
3.  **Pathing Discipline**: Use absolute-style paths (e.g., `/style.css` instead of `../style.css`) where possible within the partials system to simplify the migration of pages between directory depths.
4.  **Section Identification**: Use clear IDs for sections (e.g., `#contact`, `#tech-stack`) on the ABOUT page to allow direct linking from the footer or external sites.
