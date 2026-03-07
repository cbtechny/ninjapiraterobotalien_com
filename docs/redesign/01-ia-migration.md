# 01: Information Architecture Migration

This document provides a framework for mapping the current site structure to the new 3-page layout.

## Migration Goal
The redesign is focused on streamlining and consolidating content into three primary pages:
1. **HOME**
2. **DEVLOG**
3. **ABOUT**

## Page Consolidation Framework

### Content Mapping Matrix

| Current Content | New Primary Page | Disposition |
| --- | --- | --- |
| `index.html` (Studio Home) | HOME | Replaced by Sackjack-focused experience. |
| `devlogs/index.html` | DEVLOG | Modernized and redesigned. |
| `devlogs/posts/` | DEVLOG | Individual posts remain, but with the new design. |
| `studio/about.html` | ABOUT | Consolidated into the new About page. |
| `studio/contact.html` | ABOUT | Integrated as a section in the About page. |
| `studio/store.html` | N/A | **Deprecated/Removed.** |
| `sackjack-island/about.html`| ABOUT | Combined with the studio About content. |
| `sackjack-island/index.html`| HOME | Core content migrated to the new HOME page. |
| `sackjack-island/gallery.html`| HOME | Key screenshots integrated into the home page. |
| `sackjack-island/demo.html` | N/A | **Deprecated/Removed.** |

## Deprecation List
The following content or features will be removed to maintain a lean, performance-focused experience:
- **Store**: External commerce integration is out of scope.
- **Demo**: Direct game demos are being removed for this phase.
- **Dedicated Gallery Page**: Screenshots will be featured directly on the HOME page.

## URL Structure Strategy
- **Primary Pages**:
  - `/index.html` (HOME)
  - `/devlog/` (DEVLOG)
  - `/about/` (ABOUT)
- **Legacy Redirects**: Plans for handling incoming traffic to deprecated or moved URLs should be considered.
