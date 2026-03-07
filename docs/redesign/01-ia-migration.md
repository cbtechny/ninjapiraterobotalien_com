# 01 - IA & Migration Plan

This document details the mapping of current content from the original Ninja Pirate Robot Alien Games website to the new, three-page structure.

## Information Architecture (IA)

The objective is to consolidate the current information into the following three categories:

1.  **HOME** (Sackjack-focused Landing)
2.  **DEVLOG** (Blog/Updates)
3.  **ABOUT** (Studio Info & Contact)

## Current Content Mapping

| Current Page | New Destination | Content Status |
| :--- | :--- | :--- |
| `index.html` (Original) | **HOME** | Migration/Revision needed (focus on Sackjack) |
| `sackjack-island/` (all) | **HOME** | Integrate key info into new homepage sections |
| `devlogs/` (all) | **DEVLOG** | Migrate existing posts as-is |
| `studio/about.html` | **ABOUT** | Move and update for new structure |
| `studio/contact.html` | **ABOUT** | Integrate into "About" as a contact section |
| `studio/store.html` | *Archive/Drop* | Not currently in scope for this phase |

## Migration Steps

1.  **Inventory Current Assets**: Identify key images and text to carry over.
2.  **Redirect Plan**: Establish internal links for new page URLs.
3.  **Content Pruning**: Remove redundant or outdated information (e.g., store links).
4.  **Integration**: Merge "Sackjack Island" specific content directly into the new HOME blueprint.

## Archive Strategy

The original site files will be archived in a separate directory (e.g., `archive/v1/`) during the migration process to ensure no legacy content is permanently lost.
