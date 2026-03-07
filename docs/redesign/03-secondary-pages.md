# 03: Secondary Pages

This document details the architecture for the DEVLOG and consolidated ABOUT pages, including plans for potential future extensibility.

## Secondary Page Overview
The DEVLOG and ABOUT pages are the supporting experiences that provide deeper context for the studio and the game.

## DEVLOG Page Architecture
- **Blog Feed**: A modernized list of posts with improved readability and visual impact.
- **Categorization**: Simple tags for filtering (e.g., "Development," "Art," "Technical").
- **Pagination**: Minimal, performance-friendly navigation for browsing past updates.
- **Goal**: Maintain the transparency of development while matching the new design system.

### Post Layout
- **Clear Typography**: Focus on long-form content readability.
- **Image Integration**: Easy addition of screenshots and concept art within posts.
- **Social Sharing**: Minimal social share buttons.

## ABOUT Page Architecture (Consolidated)
- **Studio Story**: Brief overview of Ninja Pirate Robot Alien Games.
- **About Sackjack**: A "game fact sheet" section providing background on the project.
- **Contact Info**: Integrated section with contact details and potentially a simple form.
- **Digital Press Kit (DPK) Links**: Downloadable assets or a direct link to a press kit folder (e.g., Google Drive/Dropbox).

### Contact Integration
- **Direct Email**: Simple `mailto:` link or a lightweight contact form.
- **Social Links**: Icons or text links to key platforms (e.g., Twitter, Discord).

## Future Extensibility
While the target structure is 3 pages, this blueprint allows for the addition of subpages should the project scale:
- **Individual Case Studies**: Potential future pages for specific features.
- **Careers/Join Us**: Dedicated page for future studio growth.
- **Detailed Press Kit**: Expansion of the DPK into its own page if needed.

## Layout Considerations
- **Consistent Headers/Footers**: Use the same partials system as the HOME page.
- **Performance**: Ensure fast loading for image-heavy devlog posts.
- **Responsive Design**: Consistent mobile-first approach.
