# Homepage Strategy

The redesigned homepage pivots from a general studio landing page to a dedicated **Sackjack Island Campaign Page**. It functions as a "Digital Press Kit" (DPK)—prioritizing high-impact visuals, modular information blocks, and a clear conversion path.

### Core Objectives:
- **Immediate Context**: Within 3 seconds, a visitor must know this is a potato-themed blackjack adventure.
- **Visual Dominance**: Lead with game art, not text. Use the "Comic Book" aesthetic mentioned in existing docs.
- **Conversion**: Funnel users toward the Devlog (for community) and the About page (for press/studio info).

---

# Homepage Section Blueprint

### 1. The "Spud-Down" Hero
- **Purpose**: High-impact introduction and immediate brand recognition.
- **Content**:
    - Full-width background: Stylized "Beach Landing" art.
    - Foreground: Large "Sackjack Island" logo and a featured Potato Character.
    - Tagline: "Where potatoes settle their differences with blackjack instead of seasoning."
- **CTA**: "Join the Tournament" (Smooth scroll to Features) or "Read the Devlog" (Primary link).
- **Media**: `hero-bg.jpg`, `character-spud-champion.png`.

### 2. Gameplay Loop (Modular Trio)
- **Purpose**: Explain the mechanics quickly using the "Angry Birds" modular style.
- **Content**: Three high-contrast cards/tiles:
    - **Card 1: Blackjack Battle**: "Fast-paced card combat with a twist."
    - **Card 2: Unlockable Spuds**: "Collect quirky potato fighters with unique abilities."
    - **Card 3: Quick Rounds**: "Perfect for fast sessions. Jump in, play, win."
- **Media**: Iconography or small "action" GIFs for each card.

### 3. The Gallery (Press Kit Grid)
- **Purpose**: Showcase visual quality and the "Comic Aesthetic."
- **Content**: A 4-6 image grid of high-resolution screenshots.
    - Minimal borders, heavy drop shadows on hover.
    - "Click to expand" lightbox functionality.
- **Media**: Actual screenshots from `sackjack-island/gallery.html`.

### 4. The Island (World Building)
- **Purpose**: Establish scope and setting.
- **Content**: Horizontal or alternating layout featuring the three zones:
    - **Beach Landing**: The entry point.
    - **Jungle Canopy**: Vertical exploration.
    - **Summit Sanctuary**: The final showdown.
- **Media**: Concept art or biome-specific screenshots.

### 5. Latest Intel (Devlog Teaser)
- **Purpose**: Show active development and community engagement.
- **Content**:
    - "The Latest from the Island" heading.
    - 2-3 most recent devlog post cards (Title, Date, Short Snip).
- **CTA**: "See All Updates" (Link to `/devlog/`).

### 6. Final Call: The Studio
- **Purpose**: Catch-all for professional/media inquiries.
- **Content**: Small, high-contrast section: "Built by Ninja Pirate Robot Alien in Godot."
- **CTA**: "Learn About the Studio" (Link to `/about/`).

---

# Messaging Hierarchy

### 1. The 5-Second Hook (Hero)
- **What is it?**: A game called Sackjack Island.
- **The Vibe**: Funny, vibrant, potato-themed blackjack.
- **Action**: Look at the cool art.

### 2. The 15-Second Deep Dive (Features & Gallery)
- **How does it play?**: It's a card game with character progression.
- **Is it high quality?**: The gallery confirms the "Comic Aesthetic" is polished and professional.
- **Action**: Scroll to see the world.

### 3. The Bottom-of-Page Commitment
- **Is it active?**: The Devlog shows the game is being built right now.
- **Who made it?**: Ninja Pirate Robot Alien (reliable studio).
- **Action**: Click to the Devlog or About page.

---

# Mobile Homepage Behavior

### 1. Hero Behavior
- **Vertical Stack**: The Potato Character moves below the logo/tagline on mobile to ensure the text remains legible.
- **Fixed CTA**: Consider a small, sticky "Latest Update" pill at the bottom of the screen during the initial hero view.

### 2. Above-the-Fold Focus
- Hide complex background details in favor of a solid brand color or simple gradient to keep the "Sackjack Island" logo as the primary focal point.

### 3. Early Scroll Experience
- The "Gameplay Loop" trio should transition from a 3-column row to a vertical stack or a horizontal "swipeable" carousel to save vertical space.

### 4. CTA Behavior
- Buttons must be full-width on mobile (min-height 48px) for thumb-friendly interaction.

---

# Homepage Handoff For Codex

### Technical Implementation Notes:
- **Asset Usage**: Use the `Bangers` font for all section headings to match the comic aesthetic.
- **Performance**: All Gallery images MUST have `width` and `height` attributes to prevent CLS. Use the `file` command to verify dimensions before coding.
- **Partial Integration**:
    - The `#header-placeholder` should be sticky (handled via `position: sticky` on the placeholder itself).
    - Use the existing `script.js` for mobile menu toggling.
- **Style Classes**:
    - Use `.bg-gradient-game` for the hero.
    - Use `.card-grid` for the features and devlog sections.
    - Apply `.text-shadow-strong` to all text over hero images.
- **Content Source**: Pull the "Story" and "Zones" descriptions directly from `sackjack-island/about.html` to maintain consistency.
