# NinjaPirate Studio Assets

This directory contains all static assets for the NinjaPirate Studio website.

## Structure

- **images/** - Screenshots, concept art, thumbnails, and general imagery
- **logos/** - Studio logo variations and branding assets
- **ui/** - UI elements, icons, and interface components
- **css/** - Additional stylesheets (if needed beyond main style.css)
- **js/** - Additional JavaScript modules (if needed beyond main script.js)

## Image Guidelines

### Thumbnails
- Use 16:9 aspect ratio for project cards
- Recommended size: 800x450px
- Optimize for web (keep under 200KB)

### Screenshots
- Full resolution: 1920x1080px or higher
- Gallery images: 1200x675px
- Always include alt text

### Logos
- Provide SVG when possible for scalability
- Include PNG fallbacks at multiple sizes (256px, 512px, 1024px)
- Transparent backgrounds for overlay use

## Naming Convention

Use descriptive, lowercase names with hyphens:
- `sackjack-island-thumbnail.png`
- `beach-landing-screenshot-01.png`
- `studio-logo-full-color.svg`

## Asset Placeholder

Currently, assets are using CSS-based placeholders with emoji/gradient backgrounds. 
Replace these with actual assets as they become available during development.

## Performance Notes

- Compress all images before uploading
- Use modern formats (WebP with PNG fallback)
- Implement lazy loading for gallery images
- Consider using a CDN for production deployment
