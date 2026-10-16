# Design Review: Website Evaluation for BATATA: Spud Royale Name Reveal

**Target Commit SHA:** `ad3c27fe72540614a426316357cd8bbc977cfeac`
**Review Scope:** Public-facing pages (`/`, `/about/`, `/devlog/`, `/sackjack-island/gallery.html`, and legacy routes) at 390px (mobile) and 1440px (desktop). Supporting screenshots are archived in `screenshots/`.

---

### 1. First Screen & Above-the-Fold Communication
- **Game Name & Premise:** The homepage header and hero section currently display the title **Sackjack Island** rather than the new name **BATATA: Spud Royale**. The hero tagline ("Rapid blackjack duels, weird potato rivals, and high-risk card battles on a bright tropical island") clearly explains the blackjack combat premise.
- **Primary CTA & Next Action:** The primary conversion trigger ("Playtest Ready? Join the closed alpha on itch.io") sits further down the page. Above the fold on both mobile (390px) and desktop (1440px), users only see secondary buttons ("Sackjack Island on itch.io" and "Track Development"), requiring a scroll to reach the main alpha sign-up.

### 2. Hero Banner & Logo Visual Competition
- **Logo Duplication:** `hero_banner.webp` contains baked-in typography ("SACKJACK ISLAND") baked into the top-center of the image file. Concurrently, the HTML `.hero-caption` block renders `<h1>Sackjack Island</h1>` over or beside the graphic.
- **Visual Competition:** On desktop (1440px), the HTML text overlaps the graphic, causing visual noise and double branding. On mobile (390px), the image crops tightly so the baked-in logo appears small and compressed, while the HTML caption sits below the artwork, creating redundant stacked titles.

### 3. Mobile vs. Desktop UX & Visual Consistency
- **Mobile Responsiveness:** At 390px width, card containers (`#0F3D3E`) maintain strong contrast and body text legibility. Layout grids (`grid-2`, `grid-3`) stack cleanly into single-column cards, and the hamburger menu operates smoothly.
- **Site-Wide Route Audit:**
  - **About (`/about/`):** Contains placeholder art (`about-banner-placeholder.png`) and placeholder links ("Wishlist (Placeholder)").
  - **Devlog Hub (`/devlog/`):** Well-structured with "Latest Buzz" updates and devlog post links.
  - **Gallery (`/sackjack-island/gallery.html`):** Uses legacy header graphics (`sackjack-island-title.png`) and colored gradient placeholder blocks.
  - **Legacy Routes:** `/studio/` and `/sackjack-island/` handle redirects properly via 0-second HTML meta-refresh tags.

### 4. Content Currency & Gameplay Claim Verification
- **Character Roster:** Profiles for Sir Spud, Spudnik, General Tater, Frylock, and Couch Potato match the tropical potato art direction.
- **Uncertain Gameplay Claims (Flagged for Verification against `cbtechny/batata`):**
  - **"Expanded Joker Pool":** Referenced in Devlog #002; needs code verification in `cbtechny/batata` to confirm whether jokers or modifier cards exist in the current build.
  - **"21 Combat / Powerups":** Specific card values and single-use powerup items mentioned in hero copy should be verified against active game logic.

---

### 5. Recommended Reveal-Day Treatment
Implement a focused reveal treatment preserving Ninja Pirate Robot Alien studio identity:
1. **Title Alignment:** Update HTML `<h1>` tags and metadata to **BATATA: Spud Royale** (noting *"formerly Sackjack Island"* in devlogs).
2. **Clean Hero Artwork:** Swap `hero_banner.webp` for a version without baked-in title text, letting the HTML heading stand alone.
3. **Hero CTA Alignment:** Promote the closed alpha playtest link directly into the primary hero card.

---

### 6. Ranked High-Value Recommendations

#### Must-Fix Reveal Issues
1. **Update Name & Branding Across HTML & Metadata**
   *Impact: Critical | Effort: Low*
   Replace "Sackjack Island" references with "BATATA: Spud Royale" across `index.html`, header partials, and OpenGraph meta tags.
2. **Eliminate Hero Banner Logo Duplication**
   *Impact: High | Effort: Low*
   Remove baked-in text from `hero_banner.webp` or clean up HTML heading layering to resolve logo overlap on mobile and desktop.
3. **Move Primary Closed Alpha CTA Above the Fold**
   *Impact: High | Effort: Low*
   Place the Playtest / Closed Alpha CTA inside the hero card above the fold for immediate conversion.

#### Later Polish
4. **Replace Placeholders on About & Gallery Pages**
   *Impact: Medium | Effort: Medium*
   Swap out `about-banner-placeholder.png` and gallery placeholder tiles with production artwork.
5. **Standardize Gallery Route Styling**
   *Impact: Low | Effort: Low*
   Refactor `gallery.html` inline legacy styles to utilize shared `style.css` CSS design variables.
