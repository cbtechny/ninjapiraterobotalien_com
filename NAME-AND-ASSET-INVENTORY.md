# NAME AND ASSET INVENTORY REPORT
## Migration Audit: Sackjack / Sackjack Island to BATATA: Spud Royale
**Target Repository & Branch:** `cbtechny/ninjapiraterobotalien_com` (`currdev` branch)
**Audit Type:** Report-Only Migration Audit
**Date:** October 16, 2026
**Auditor:** Jules (Senior Software Engineer)

---

## 1. Executive Summary & Audit Scope

This audit evaluates the codebase and asset library of the `currdev` branch for complete rebranding and migration from **Sackjack / Sackjack Island** to **BATATA: Spud Royale**.

### Audit Objectives
1. Exhaustively identify all case-insensitive occurrences of former branding (`SackJack`, `Sackjack`, `Sackjack Island`, `sackjack-island`, `sackjack_island`, `sackjackmobile`, `sack jack`) across all source code, markup, stylesheets, configurations, documentation, and media.
2. Differentiate strictly between:
   - **Filename contains old name** (e.g., `assets/images/gallery/sackjack-island-title.png`, `sackjack-island/about.html`).
   - **Visible pixels contain old name** (e.g., `assets/images/home/hero_banner.webp` contains rendered "Sackjack Island" text on the banner art; `assets/images/gallery/sackjack-island-title.png` contains rendered title text).
3. Evaluate page metadata, routes, 0-second meta-refresh redirects, sitemap, deployment scripts, external links, and playable game exports.
4. Deliver actionable recommendations that preserve SEO equity, external backward compatibility, and historical accuracy while migrating primary branding to **BATATA: Spud Royale**.

### Exclusions & Limitations
- **Excluded Directories:** `.git/` object storage and `node_modules/` (dependency directories).
- **Tooling Footprint:** Temporary python audit scripts placed in `/home/jules/self_created_tools/` for execution during audit.
- **Coverage Limitations:** Visual inspection was conducted via Pillow pixel inspection, Playwright Chromium headless webm video frame extraction (5 sampled frames across 0.84s duration), and structural raster analysis. No WebGL/WASM binary assets were found in this repository. Playable demo builds are hosted externally on itch.io.

---

## 2. Playable Game Export & Embed Findings

| Property | Value / Observation |
| :--- | :--- |
| **Playable Build Hosted in Repo?** | **NO.** There are no HTML5, WebGL, or WASM game exports stored inside this repository. |
| **Demo Pages in Repo** | `sackjack-island/demo.html` is a 0-second meta-refresh redirect page pointing to `/index.html`. |
| **External Playable Link** | `https://ninjapiraterobotalien.itch.io/sackjack` (Linked on `index.html` line 72). |
| **Origin & Maintenance Requirement** | The actual playable game is maintained in a separate game development repository (Unity/Godot/Custom Engine). |
| **Migration Recommendation** | 1. Updating the playable game build itself requires building and publishing a new release from the game repository.<br>2. On itch.io, update the project title to **BATATA: Spud Royale**.<br>3. Keep the itch.io URL slug `https://ninjapiraterobotalien.itch.io/sackjack` active or configure an itch.io redirect if creating a new URL slug (`itch.io/batata-spud-royale`), ensuring existing external links do not break.<br>4. Update the website button copy on `index.html` line 72 from `Sackjack Island on itch.io` to `Play BATATA on itch.io`. |

---

## 3. Mandatory Visual Contact Sheet & Replacement Queue

All 34 media assets in the repository (including raster images, WebM video, ICO favicon, and 0-byte placeholders) have been enumerated, inspected, and categorized below.

### Visual Contact Sheet Summary

| Asset ID | File Path | Format & Dimensions | File Size | Pixels Contain Old Name? | Filename Contains Old Name? | Usage / Selectors | Status | Recommended Action | Priority | Confidence | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **IMG-01** | `assets/images/home/hero_banner.webp` | WEBP (1536x1024) | 70,188 B | **YES (Confirmed)** | NO | `index.html` (`.hero-panel` hero background) | Active | Replace Asset (Generate new hero banner artwork with 'BATATA: Spud Royale' title lettering) | High | High | Manual Visual Inspection & Pixel Analysis |
| **IMG-02** | `assets/images/gallery/sackjack-island-title.png` | PNG (797x323) | 88,512 B | **YES (Confirmed)** | **YES** | `sackjack-island/gallery.html` (Item 1), `devlogs/posts/001.html` (`og:image`, `twitter:image`) | Active | Replace Asset & Update References (Create `batata-spud-royale-title.png` with new logo artwork, update HTML references) | High | High | Manual Visual Inspection & Pixel Analysis |
| **IMG-03** | `assets/images/home/battle_banner1.png` | PNG (725x145) | 149,954 B | NO | NO | `index.html` (Battle section ribbon banner) | Active | Retain with Context / Replace if branded (Displays 'BATTLE START' text; no 'Sackjack' lettering) | Low | High | Manual Visual Inspection |
| **IMG-04** | `assets/images/home/dev_banner.webp` | WEBP (1536x1024) | 87,654 B | NO | NO | `index.html` (`.dev-banner` background) | Active | Retain with Context (Tropical spud artwork background; no old title text in pixels) | Low | High | Manual Visual Inspection |
| **IMG-05** | `assets/images/home/dev_banner_fallback.jpg` | JPEG (1536x1024) | 108,188 B | NO | NO | `index.html` (`.dev-banner` fallback image) | Active | Retain with Context (Fallback JPG for dev_banner.webp; no old title text) | Low | High | Manual Visual Inspection |
| **IMG-06** | `assets/images/devlog/devlogimg1.jpg` | JPEG (1408x768) | 123,181 B | NO | NO | `devlog/index.html` (Featured article hero image) | Active | Retain with Context / Update when new gameplay screenshots available (Card table art; no explicit 'Sackjack' text) | Medium | High | Manual Visual Inspection |
| **IMG-07** | `assets/images/gallery/potatoes-characters.png` | PNG (4000x2000) | 3,588,663 B | NO | NO | `sackjack-island/gallery.html` (Character lineup item) | Active | Retain with Context (Character lineup featuring Ace, Ninja Spud, Grandpa Spud; no 'Sackjack' title lettering) | Low | High | Manual Visual Inspection |
| **IMG-08** | `assets/images/home/ace.png` | PNG (200x255) | 37,110 B | NO | NO | `index.html` (Roster card artwork) | Active | Retain with Context (Ace character card graphic) | Low | High | Manual Visual Inspection |
| **IMG-09** | `assets/images/home/ace_home_panel.webp` | WEBP (1280x1280) | 91,572 B | NO | NO | `index.html` (Roster panel background) | Active | Retain with Context (Ace character background panel) | Low | High | Manual Visual Inspection |
| **IMG-10** | `assets/images/home/granpa_panel.webp` | WEBP (1280x1280) | 153,924 B | NO | NO | `index.html` (Roster panel background) | Active | Retain with Context (Grandpa Spud panel background) | Low | High | Manual Visual Inspection |
| **IMG-11** | `assets/images/home/ninja_panel.webp` | WEBP (1280x1280) | 92,352 B | NO | NO | `index.html` (Roster panel background) | Active | Retain with Context (Ninja Spud panel background) | Low | High | Manual Visual Inspection |
| **IMG-12** | `assets/images/home/horizontal_3_party.webp` | WEBP (1277x168) | 59,220 B | NO | NO | `index.html` (Section divider banner) | Active | Retain with Context (Beach party spud banner) | Low | High | Manual Visual Inspection |
| **IMG-13** | `assets/images/devlog/horizontal_1_shells.webp` | WEBP (1277x172) | 60,142 B | NO | NO | `devlog/index.html` (Section divider banner) | Active | Retain with Context (Sea shells divider banner) | Low | High | Manual Visual Inspection |
| **IMG-14** | `assets/images/devlog/horizontal_2_junglevines.webp` | WEBP (1309x181) | 59,268 B | NO | NO | `devlog/index.html` (Section divider banner) | Active | Retain with Context (Jungle vines divider banner) | Low | High | Manual Visual Inspection |
| **IMG-15** | `assets/images/home/hp_damage_fallback.jpg` | JPEG (1142x710) | 77,949 B | NO | NO | `index.html` (Video fallback JPG) | Active | Retain with Context (Card battle animation frame showing -15 HP damage; no title text) | Low | High | Manual Visual Inspection |
| **IMG-16** | `assets/videos/home/hp_damage.webm` | WEBM (1142x710, 0.84s) | 81,221 B | NO | NO | `index.html` (Feature section video loop) | Active | Retain with Context (0.84s WebM loop showing card dealing & HP damage effect. Sampled 5 frames at 0.0s, 0.21s, 0.42s, 0.64s, 0.80s; no title overlays) | Low | High | Playwright Video Frame Extraction & Sampling |
| **IMG-17** | `favicon.ico` | ICO (48x48) | 15,406 B | NO | NO | All HTML pages (`<link rel="icon">`) | Active | Retain or Update Icon (48x48 potato icon; update if logo glyph changes) | Low | High | Manual Visual Inspection |
| **IMG-18** | `assets/images/about/brand_icons/Facebook_Logo_Primary.webp` | WEBP (2084x2084) | 40,558 B | NO | NO | `about/index.html` | Active | Retain (External brand logo) | Low | High | Manual Visual Inspection |
| **IMG-19** | `assets/images/about/brand_icons/Instagram_Glyph_Gradient.webp` | WEBP (5000x5000) | 217,204 B | NO | NO | `about/index.html` | Active | Retain (External brand logo) | Low | High | Manual Visual Inspection |
| **IMG-20** | `assets/images/about/brand_icons/threads-logo-black-01.webp` | WEBP (1317x1439) | 21,734 B | NO | NO | `about/index.html` | Active | Retain (External brand logo) | Low | High | Manual Visual Inspection |
| **IMG-21** to **IMG-34** | `assets/images/placeholders/*.png` (14 files) | PNG (0x0, 0 bytes) | 0 B | NO | NO | Unused / Placeholder assets | Unused | Retain or Populate (0-byte placeholder files) | Low | High | System Directory Audit |

---

## 4. Text Inventory & Finding Records

Every textual occurrence of former branding in markup, copy, headers, metadata, routes, documentation, and configuration is recorded below.

### 4.1 Visible Copy, Navigation, Buttons, Headings & Accessibility

| ID | File Path | Line | Category | Exact Text / Context | Usage / Selector | Status | Recommended Action | Priority | Confidence | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TXT-007** | `index.html` | 62 | Accessibility & Alt Text | `alt="Sackjack Island: A casual card battler and funny potato game showing characters in a dramatic blackjack battle"` | `img.hero-banner-image` alt attribute | Active | Update Copy (Change to 'BATATA: Spud Royale hero banner...') | High | High | Text Audit |
| **TXT-008** | `index.html` | 69 | Heading | `<h1>Sackjack Island</h1>` | `.hero-caption h1` | Active | Update Copy (Change to 'BATATA: Spud Royale') | High | High | Text Audit |
| **TXT-009** | `index.html` | 72 | Button & External URL | `<a class="btn btn-primary" href="https://ninjapiraterobotalien.itch.io/sackjack" target="_blank" rel="noopener noreferrer">Sackjack Island on itch.io</a>` | `.hero-caption .btn-group a` | Active | Update Copy & Investigate URL (Change text to 'Play BATATA on itch.io') | High | High | Text Audit |
| **TXT-010** | `index.html` | 131 | Heading | `<h3>Play Sackjack. Outsmart a potato.</h3>` | `.feature-grid h3` | Active | Update Copy (Change to 'Play BATATA. Outsmart a spud.') | High | High | Text Audit |
| **TXT-011** | `index.html` | 137 | Visible Copy | `<p>Face eccentric island rivals, earn rewards, and push toward the summit seat of Sackjack Island.</p>` | `.feature-card p` | Active | Update Copy (Change to '...summit seat of BATATA: Spud Royale.') | High | High | Text Audit |
| **TXT-012** | `index.html` | 260 | Button | `<a class="btn btn-primary" href="/about/index.html#support">Support Sackjack Island</a>` | `.cta-strip .btn` | Active | Update Copy (Change to 'Support BATATA: Spud Royale') | High | High | Text Audit |
| **TXT-013** | `partials/header.html` | 4 | Accessibility | `<a href="/index.html" class="brand" aria-label="Sackjack Island home">` | `a.brand[aria-label]` | Active | Update Copy (Change aria-label to 'BATATA: Spud Royale home') | High | High | Text Audit |
| **TXT-014** | `partials/header.html` | 5 | Navigation & Brand Title | `<span class="brand-title">Sackjack Island</span>` | `.brand-title` | Active | Update Copy (Change brand title to 'BATATA: Spud Royale') | High | High | Text Audit |
| **TXT-021** | `devlog/index.html` | 35 | Visible Copy | `<p>Build updates, balance notes, and production snapshots from Sackjack Island.</p>` | `.devlog-header p` | Active | Update Copy (Change to '...from BATATA: Spud Royale.') | High | High | Text Audit |
| **TXT-022** | `devlog/index.html` | 45 | Visible Copy | `<p>A focused tournament flow in one display area: buy powerups, pick opponents, and play quick Sackjack bouts.</p>` | `.devlog-card p` | Active | Update Copy (Change to '...play quick BATATA bouts.') | High | High | Text Audit |
| **TXT-023** | `devlog/index.html` | 82 | Visible Copy | `<p>Studio intro, roadmap, and why Sackjack Island leads the slate.</p>` | `.devlog-card p` | Active | Update Copy (Change to '...why BATATA: Spud Royale leads the slate.') | High | High | Text Audit |
| **TXT-027** | `about/index.html` | 105 | Heading | `<h3>Support Sackjack Island</h3>` | `#support h3` | Active | Update Copy (Change heading to 'Support BATATA: Spud Royale') | High | High | Text Audit |
| **TXT-037** | `devlogs/posts/001.html` | 47 | Visible Copy | `development philosophy, and introduces our flagship project: <strong>Sackjack Island</strong>.` | `article p` | Active / Historical | Update Copy (Update to 'BATATA: Spud Royale') | Medium | High | Text Audit |
| **TXT-038** | `devlogs/posts/001.html` | 74 | Heading | `<h2>Introducing Sackjack Island</h2>` | `article h2` | Active / Historical | Update Copy (Change to 'Introducing BATATA: Spud Royale') | Medium | High | Text Audit |
| **TXT-039** | `devlogs/posts/001.html` | 76 | Visible Copy | `Sackjack Island is our flagship project—a vibrant blackjack-style tournament game where` | `article p` | Active / Historical | Update Copy (Update to 'BATATA: Spud Royale is our flagship project...') | Medium | High | Text Audit |
| **TXT-040** | `devlogs/posts/001.html` | 105 | Visible Copy | `and the modular systems powering Sackjack Island.` | `article p` | Active / Historical | Update Copy (Update to '...powering BATATA: Spud Royale.') | Medium | High | Text Audit |
| **TXT-044** | `devlogs/posts/002.html` | 45 | Visible Copy | `Sackjack now takes place on a single, lively tournament display area.` | `article p` | Active | Update Copy (Change to 'BATATA now takes place...') | Medium | High | Text Audit |
| **TXT-045** | `devlogs/posts/002.html` | 46 | Visible Copy | `...and play quick Sackjack bouts. No island wandering, just a focused...` | `article p` | Active | Update Copy (Change to '...quick BATATA bouts.') | Medium | High | Text Audit |
| **TXT-046** | `devlogs/posts/002.html` | 61 | Visible Copy | `<li>Play a Sackjack bout. It's like blackjack but faster...</li>` | `article li` | Active | Update Copy (Change to 'Play a BATATA bout.') | Medium | High | Text Audit |
| **TXT-055** | `sackjack-island/gallery.html` | 23 | Heading | `<h1>Sackjack Island Gallery</h1>` | `h1` | Active / Legacy Route | Update Copy (Change to 'BATATA: Spud Royale Gallery') | Medium | High | Text Audit |
| **TXT-056** | `sackjack-island/gallery.html` | 33 | Visible Copy | `Visual development and in-game screenshots showcasing Sackjack Island's vibrant world.` | `header p` | Active / Legacy Route | Update Copy (Change to '...BATATA: Spud Royale's vibrant world.') | Medium | High | Text Audit |
| **TXT-057** | `sackjack-island/gallery.html` | 39 | Alt Text & Asset Path | `<img src="../assets/images/gallery/sackjack-island-title.png" alt="Sackjack Island Title Screen - Indie Blackjack Card Battler"...>` | `.gallery-item img` | Active / Legacy Route | Replace Asset & Update Copy (Update image reference & alt text) | High | High | Text Audit |
| **TXT-058** | `sackjack-island/gallery.html` | 42 | Alt Text | `<img src="../assets/images/gallery/potatoes-characters.png" alt="Collection of Potato Character designs for Sackjack Island"...>` | `.gallery-item img` | Active / Legacy Route | Update Copy (Change alt text to reference BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-059** | `sackjack-island/gallery.html` | 117 | Navigation / Link | `<a href="index.html" class="back-link">Back to Sackjack Island</a>` | `.back-link` | Active / Legacy Route | Update Copy (Change text to 'Back to BATATA: Spud Royale') | Medium | High | Text Audit |

---

### 4.2 Page Titles, Descriptions, Open Graph & Twitter Metadata

| ID | File Path | Line | Category | Exact Text / Context | Selector / Usage | Status | Recommended Action | Priority | Confidence | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TXT-001** | `index.html` | 6 | Page Title | `<title>Sackjack Island: Casual Card Battler \| Ninja Pirate Robot Alien</title>` | `head title` | Active | Update Copy (Change to 'BATATA: Spud Royale: Casual Card Battler \| Ninja Pirate Robot Alien') | High | High | Text Audit |
| **TXT-002** | `index.html` | 7 | Meta Description | `content="Battle quirky potatoes in Sackjack Island, a casual card battler..."` | `meta[name='description']` | Active | Update Copy (Replace 'Sackjack Island' with 'BATATA: Spud Royale') | High | High | Text Audit |
| **TXT-003** | `index.html` | 12 | OpenGraph Meta | `content="Sackjack Island: Casual Card Battler \| Ninja Pirate Robot Alien"` | `meta[property='og:title']` | Active | Update Copy (Replace with BATATA title) | High | High | Text Audit |
| **TXT-004** | `index.html` | 13 | OpenGraph Meta | `content="Battle quirky potatoes in Sackjack Island, a casual card battler..."` | `meta[property='og:description']` | Active | Update Copy (Replace with BATATA description) | High | High | Text Audit |
| **TXT-005** | `index.html` | 19 | Twitter Meta | `content="Sackjack Island: Casual Card Battler \| Ninja Pirate Robot Alien"` | `meta[property='twitter:title']` | Active | Update Copy (Replace with BATATA title) | High | High | Text Audit |
| **TXT-006** | `index.html` | 20 | Twitter Meta | `content="Battle quirky potatoes in Sackjack Island, a casual card battler..."` | `meta[property='twitter:description']` | Active | Update Copy (Replace with BATATA description) | High | High | Text Audit |
| **TXT-015** | `devlog/index.html` | 6 | Page Title | `<title>Sackjack Island Devlog: Building a Funny Potato Game \| NPRA</title>` | `head title` | Active | Update Copy (Change to 'BATATA: Spud Royale Devlog...') | High | High | Text Audit |
| **TXT-016** | `devlog/index.html` | 7 | Meta Description | `content="Follow the development of Sackjack Island, a casual card battler..."` | `meta[name='description']` | Active | Update Copy (Replace with BATATA: Spud Royale) | High | High | Text Audit |
| **TXT-017** | `devlog/index.html` | 12 | OpenGraph Meta | `content="Sackjack Island Devlog: Building a Funny Potato Game \| NPRA"` | `meta[property='og:title']` | Active | Update Copy (Replace with BATATA title) | High | High | Text Audit |
| **TXT-018** | `devlog/index.html` | 13 | OpenGraph Meta | `content="Follow the development of Sackjack Island, a casual card battler..."` | `meta[property='og:description']` | Active | Update Copy (Replace with BATATA description) | High | High | Text Audit |
| **TXT-019** | `devlog/index.html` | 19 | Twitter Meta | `content="Sackjack Island Devlog: Building a Funny Potato Game \| NPRA"` | `meta[property='twitter:title']` | Active | Update Copy (Replace with BATATA title) | High | High | Text Audit |
| **TXT-020** | `devlog/index.html` | 20 | Twitter Meta | `content="Follow the development of Sackjack Island, a casual card battler..."` | `meta[property='twitter:description']` | Active | Update Copy (Replace with BATATA description) | High | High | Text Audit |
| **TXT-024** | `about/index.html` | 7 | Meta Description | `content="Learn about Ninja Pirate Robot Alien, a fun indie game studio creating quirky games like Sackjack Island..."` | `meta[name='description']` | Active | Update Copy (Replace with BATATA: Spud Royale) | High | High | Text Audit |
| **TXT-025** | `about/index.html` | 13 | OpenGraph Meta | `content="Learn about Ninja Pirate Robot Alien... games like Sackjack Island..."` | `meta[property='og:description']` | Active | Update Copy (Replace with BATATA: Spud Royale) | High | High | Text Audit |
| **TXT-026** | `about/index.html` | 20 | Twitter Meta | `content="Learn about Ninja Pirate Robot Alien... games like Sackjack Island..."` | `meta[property='twitter:description']` | Active | Update Copy (Replace with BATATA: Spud Royale) | High | High | Text Audit |
| **TXT-028** | `devlogs/index.html` | 6 | Page Title | `<title>Devlog \| Sackjack Island \| NPRA Games</title>` | `head title` | Historical / Redirect | Update Copy (Change title to BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-029** | `devlogs/index.html` | 7 | Meta Description | `content="Stay updated with the latest Sackjack Island development milestones. Redirecting..."` | `meta[name='description']` | Historical / Redirect | Update Copy (Change to BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-030** | `devlogs/posts/001.html` | 6 | Page Title | `<title>Project Kickoff: Sackjack Island Card Battler \| NPRA Games</title>` | `head title` | Active | Update Copy (Change to BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-031** | `devlogs/posts/001.html` | 7 | Meta Description | `content="Introducing Sackjack Island, a funny potato card battler..."` | `meta[name='description']` | Active | Update Copy (Change to BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-032** | `devlogs/posts/001.html` | 12 | OpenGraph Meta | `content="Project Kickoff: Sackjack Island Card Battler \| NPRA Games"` | `meta[property='og:title']` | Active | Update Copy (Change to BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-033** | `devlogs/posts/001.html` | 13 | OpenGraph Meta | `content="Introducing Sackjack Island, a funny potato card battler..."` | `meta[property='og:description']` | Active | Update Copy (Change to BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-034** | `devlogs/posts/001.html` | 14 | OpenGraph Image | `content="https://ninjapiraterobotalien.com/assets/images/gallery/sackjack-island-title.png"` | `meta[property='og:image']` | Active | Replace Asset & Update URL (Point to new title graphic) | High | High | Text Audit |
| **TXT-035** | `devlogs/posts/001.html` | 19 | Twitter Meta | `content="Project Kickoff: Sackjack Island Card Battler \| NPRA Games"` | `meta[property='twitter:title']` | Active | Update Copy (Change to BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-036** | `devlogs/posts/001.html` | 20 | Twitter Image | `content="https://ninjapiraterobotalien.com/assets/images/gallery/sackjack-island-title.png"` | `meta[property='twitter:image']` | Active | Replace Asset & Update URL (Point to new title graphic) | High | High | Text Audit |
| **TXT-041** | `devlogs/posts/002.html` | 7 | Meta Description | `content="Sackjack now happens in one lively tournament display area..."` | `meta[name='description']` | Active | Update Copy (Change to BATATA) | Medium | High | Text Audit |
| **TXT-042** | `devlogs/posts/002.html` | 13 | OpenGraph Meta | `content="Sackjack now happens in one lively tournament display area..."` | `meta[property='og:description']` | Active | Update Copy (Change to BATATA) | Medium | High | Text Audit |
| **TXT-043** | `devlogs/posts/002.html` | 20 | Twitter Meta | `content="Sackjack now happens in one lively tournament display area..."` | `meta[property='twitter:description']` | Active | Update Copy (Change to BATATA) | Medium | High | Text Audit |
| **TXT-047** | `sackjack-island/about.html` | 6 | Page Title | `<title>About Sackjack Island \| NPRA Games</title>` | `head title` | Historical / Redirect | Update Copy (Change title to BATATA: Spud Royale) | Low | High | Text Audit |
| **TXT-048** | `sackjack-island/about.html` | 7 | Meta Description | `content="Learn about Sackjack Island, its gameplay mechanics... Redirecting..."` | `meta[name='description']` | Historical / Redirect | Update Copy (Change description) | Low | High | Text Audit |
| **TXT-049** | `sackjack-island/demo.html` | 6 | Page Title | `<title>Play Demo \| Sackjack Island \| NPRA Games</title>` | `head title` | Historical / Redirect | Update Copy (Change title to BATATA: Spud Royale) | Low | High | Text Audit |
| **TXT-050** | `sackjack-island/demo.html` | 7 | Meta Description | `content="Play Sackjack Island demo directly in your browser. Redirecting..."` | `meta[name='description']` | Historical / Redirect | Update Copy (Change description) | Low | High | Text Audit |
| **TXT-051** | `sackjack-island/index.html` | 6 | Page Title | `<title>Sackjack Island \| NPRA Games</title>` | `head title` | Historical / Redirect | Update Copy (Change title to BATATA: Spud Royale) | Low | High | Text Audit |
| **TXT-052** | `sackjack-island/index.html` | 7 | Meta Description | `content="Sackjack Island is a fast-paced, potato-powered blackjack battler. Redirecting..."` | `meta[name='description']` | Historical / Redirect | Update Copy (Change description) | Low | High | Text Audit |
| **TXT-053** | `sackjack-island/gallery.html` | 6 | Page Title | `<title>Gallery - Sackjack Island - NinjaPirate Studio</title>` | `head title` | Active / Legacy Route | Update Copy (Change title to BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-054** | `sackjack-island/gallery.html` | 7 | Meta Description | `content="View screenshots, concept art, and visual development for Sackjack Island."` | `meta[name='description']` | Active / Legacy Route | Update Copy (Change description) | Medium | High | Text Audit |
| **TXT-060** | `studio/about.html` | 6 | Page Title | `<title>About \| Sackjack Island \| NPRA Games</title>` | `head title` | Historical / Redirect | Update Copy (Change title to BATATA: Spud Royale) | Low | High | Text Audit |
| **TXT-061** | `studio/about.html` | 7 | Meta Description | `content="Meet Ninja Pirate Robot Alien, the indie studio behind Sackjack Island. Redirecting..."` | `meta[name='description']` | Historical / Redirect | Update Copy (Change description) | Low | High | Text Audit |

---

### 4.3 Routes, Directives, Deployment & Documentation

| ID | File Path | Line | Category | Exact Text / Context | Usage / Selector | Status | Recommended Action | Priority | Confidence | Verification Method |
| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |
| **TXT-062** | `sitemap.xml` | 16 | Sitemap Route | `<loc>https://ninjapiraterobotalien.com/sackjack-island/gallery.html</loc>` | `sitemap.xml url loc` | Active / Legacy Route | Preserve Compatibility (Maintain URL while gallery route is served, or update if gallery route is relocated) | Medium | High | Text Audit |
| **TXT-063** | `README.md` | 11 | Documentation | `- **Sackjack Island** - A vibrant adventure game featuring dynamic gameplay...` | `README.md` project list | Active Documentation | Update Copy (Change to BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-064** | `README.md` | 36 | Documentation & Directory Tree | `├── sackjack-island/       # Sackjack Island project pages` | `README.md` folder tree | Active Documentation | Update Copy (Add note that directory serves legacy redirects for BATATA: Spud Royale) | Medium | High | Text Audit |
| **TXT-065** | `docs/visual-marketing-audit.md` | 1 | Documentation Title | `# Sackjack Island Visual Marketing Audit` | Heading 1 | Historical Documentation | Retain with Context (Historical audit doc) | Low | High | Text Audit |
| **TXT-066** | `docs/visual-marketing-audit.md` | 35 | Documentation | `<h1>Sackjack Island</h1>` | Code block | Historical Documentation | Retain with Context (Code snippet in historical doc) | Low | High | Text Audit |
| **TXT-067** | `docs/visual-marketing-audit.md` | 571 | Documentation | `1. Rename text from Sackjack Info to something action-oriented...` | List item | Historical Documentation | Retain with Context (Historical audit item) | Low | High | Text Audit |
| **TXT-068** | `assets/README.md` | 33 | Asset Spec Documentation | `- sackjack-island-thumbnail.png` | Spec example | Active Documentation | Update Copy (Change example to `batata-spud-royale-thumbnail.png`) | Low | High | Text Audit |
| **TXT-069** | `.github/workflows/deploy.yml` | 37 | Build & Deploy Config | `cp -R ... sackjack-island ... _site/` | Deployment script | Active Build Config | Preserve Compatibility (Do NOT remove `sackjack-island` directory copy from deploy script so 301/0-sec redirects continue functioning) | High | High | Text Audit |

---

## 5. Strategic Migration Guidelines

1. **Preserve SEO Equity & Redirect Stability:**
   - Do NOT delete the `sackjack-island/` directory or its redirect pages (`about.html`, `demo.html`, `index.html`). They provide 0-second meta-refresh redirects to the modern canonical pages (`/about/index.html`, `/index.html`).
   - Keep `.github/workflows/deploy.yml` copying `sackjack-island` to `_site/`.
2. **Branding Standardization:**
   - Primary Title Format: `BATATA: Spud Royale | Ninja Pirate Robot Alien`
   - Secondary Short Form: `BATATA`
   - Hero Caption H1: `BATATA: Spud Royale`
   - Brand Header: `BATATA: Spud Royale`
3. **Asset Replacement Order:**
   - Priority 1: `assets/images/home/hero_banner.webp` (Primary homepage billboard artwork).
   - Priority 2: `assets/images/gallery/sackjack-island-title.png` -> Create `assets/images/gallery/batata-spud-royale-title.png` and update OpenGraph / Twitter meta tags.
   - Priority 3: External store page branding on itch.io (`https://ninjapiraterobotalien.itch.io/sackjack`).
