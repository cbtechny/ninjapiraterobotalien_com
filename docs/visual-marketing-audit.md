# Sackjack Island Visual Marketing Audit

## 1. Quick Diagnosis
- The homepage opens with a strong hero image, but the main value proposition is hidden inside a slide-out drawer, so the first screen reads more like a splash image than a storefront landing page.
- The site uses a good tropical palette, but multiple sections share the same flat panel treatment, which reduces hierarchy and makes major conversion areas feel visually equal.
- Buttons, cards, nav items, and content panels use related colors but inconsistent depth, radius, border, and shadow behavior, which lowers perceived polish.
- The header brand is distinctive, but the nav does not visually carry the same playful “game UI” energy as the hero and feature sections.
- Several sections feel structurally complete but visually underdeveloped because they rely on plain rectangles with minimal layering, separators, or decorative framing.
- The About page still exposes placeholder framing and placeholder link language, which lowers trust and makes the overall product feel less launch-ready.
- The Devlog page mixes strong content blocks with generic “Latest Buzz” text cards that feel more like filler than believable live updates.
- The roster section is appealing, but character cards stop at image + label, so they miss an opportunity to feel collectible or game-like.
- The CTA strip is clear but visually too simple for an end-of-page conversion moment; it should feel like a payoff banner, not a standard section.
- Motion exists in the hero and feature area, but there is no matching micro-interaction system across the rest of the site, so the site feels selectively animated instead of intentionally alive.

---

## 2. High-Impact, No-Asset Wins (Top Priority)

### Task 1: Make the hero message visible without requiring drawer interaction
- **Priority:** High
- **Target Files/Areas:** `index.html`, `style.css`, hero billboard
- **Problem:** The core pitch, game name, and primary CTA are hidden inside the info drawer. Users who do not click the trigger can miss the actual offer.
- **Solution:** Keep the drawer, but add a permanently visible hero caption block anchored over the hero image with the game name, one-sentence pitch, and primary CTA.
- **Implementation Steps:**
  1. In `index.html`, add a new `div` inside `.hero-overlay` before the trigger button.
  2. Include `p.kicker`, `h1`, one short pitch paragraph, and a two-button CTA row.
  3. Keep the current drawer as secondary detail for expanded information.
  4. In `style.css`, create a `.hero-caption` block with max width, translucent dark background, border, and shadow.
  5. On mobile, stack the caption above the trigger button and reduce width to full.
  6. Ensure the drawer still opens independently.
- **Example Snippet (if applicable):**
```html
<div class="hero-caption panel">
  <p class="kicker">Flagship title</p>
  <h1>Sackjack Island</h1>
  <p>Rapid blackjack duels, weird potato rivals, and high-risk card battles on a bright tropical island.</p>
  <div class="btn-group">
    <a class="btn btn-primary" href="/about/index.html#support">Wishlist &amp; Support</a>
    <a class="btn btn-secondary" href="/devlog/index.html">Track Development</a>
  </div>
</div>
```

### Task 2: Turn the header into a stronger game-style navigation bar
- **Priority:** High
- **Target Files/Areas:** `partials/header.html`, `style.css`
- **Problem:** The current header is functional but visually plain compared with the rest of the homepage.
- **Solution:** Add a layered nav bar treatment with stronger spacing, inset highlight, bottom glow line, and button-like nav tabs.
- **Implementation Steps:**
  1. Add a decorative wrapper style to `.site-header` using a gradient background instead of a flat fill.
  2. Add a subtle inner border or inset shadow to create UI-panel depth.
  3. Increase nav link vertical padding slightly.
  4. Add a small transform + glow on hover and a more distinct active state.
  5. Add a thin accent line under the whole header using `::after`.
  6. Match the mobile dropdown border/shadow to the desktop header treatment.
- **Example Snippet (if applicable):**
```css
.site-header {
  background: linear-gradient(180deg, #0b1324 0%, #060b15 100%);
  box-shadow: inset 0 1px 0 rgba(255,255,255,.08), 0 8px 24px rgba(0,0,0,.25);
}
.site-header::after {
  content: "";
  display: block;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
}
```

### Task 3: Give every section a clear visual entry and exit
- **Priority:** High
- **Target Files/Areas:** `style.css`, homepage, About page, Devlog page section wrappers
- **Problem:** Sections currently flow one into another with similar spacing and limited contrast shifts, making the page feel flatter than it should.
- **Solution:** Add alternating section backgrounds, top separators, and section-specific spacing rules to create rhythm.
- **Implementation Steps:**
  1. Add utility styles such as `.section-alt`, `.section-dark`, `.section-tight`.
  2. Apply alternating background treatments to major homepage sections.
  3. Add subtle top gradients or border separators on section boundaries.
  4. Tighten vertical padding on teaser sections and expand spacing on major content sections.
  5. Apply the same pattern to About and Devlog for site-wide consistency.
- **Example Snippet (if applicable):**
```css
.section-alt {
  background: linear-gradient(180deg, rgba(255,255,255,.03), rgba(0,0,0,.08));
  border-top: 1px solid rgba(224,168,78,.25);
  border-bottom: 1px solid rgba(224,168,78,.18);
}
```

### Task 4: Upgrade cards from flat content boxes to collectible-style panels
- **Priority:** High
- **Target Files/Areas:** `style.css`, homepage cards, About cards, Devlog cards
- **Problem:** Most cards use the same basic panel appearance, so the site lacks premium-feeling hierarchy.
- **Solution:** Introduce a standard card treatment with soft radius, layered shadow, corner accents, and consistent internal spacing.
- **Implementation Steps:**
  1. Add `border-radius` to `.panel`, `.btn`, `.action-icon`, and `.media-frame`.
  2. Add a standard shadow token for low, medium, and high elevation states.
  3. Add panel corner accents using `::before` / `::after` on featured cards only.
  4. Normalize card padding to one base spacing unit.
  5. Add a hover lift only on clickable or promo cards, not all panels.
- **Example Snippet (if applicable):**
```css
.panel {
  border-radius: 18px;
  box-shadow: 0 10px 30px rgba(0,0,0,.18), inset 0 1px 0 rgba(255,255,255,.18);
}
```

### Task 5: Make roster cards feel like character selects instead of image blocks
- **Priority:** High
- **Target Files/Areas:** `index.html`, `style.css`, roster section
- **Problem:** The roster cards show good art, but they do not feel like interactive game characters.
- **Solution:** Add stat chips, rarity-style framing, and a consistent bottom info band inside each roster card.
- **Implementation Steps:**
  1. Wrap each roster card title/stat in a bottom content block.
  2. Add a small role badge above each character name.
  3. Add a decorative frame overlay around roster images using `::after` on `.media-frame`.
  4. Add slight image scale on card hover.
  5. Align all roster copy to the same height and spacing.
- **Example Snippet (if applicable):**
```html
<article class="panel card roster-card">
  <div class="media-frame"></div>
  <div class="roster-card-body">
    <p class="stat-chip">Aggro</p>
    <h3>Ace</h3>
    <p class="stat">All-in specialist</p>
  </div>
</article>
```

### Task 6: Rebuild the CTA strip into a premium endcap
- **Priority:** High
- **Target Files/Areas:** `index.html`, `style.css`, CTA strip
- **Problem:** The final CTA is important but visually reads like a basic banner.
- **Solution:** Add layered gradient, badge-style kicker, stronger copy grouping, and a framed CTA button cluster.
- **Implementation Steps:**
  1. Add a kicker above the CTA heading.
  2. Add a short support rationale sentence below the heading.
  3. Wrap CTA content in a centered max-width layout.
  4. Add decorative background glow using pseudo-elements.
  5. Add a secondary text link for users not ready to support.
- **Example Snippet (if applicable):**
```css
.cta-strip {
  position: relative;
  background: linear-gradient(135deg, var(--accent-primary), var(--cta));
  overflow: hidden;
}
.cta-strip::before {
  content: "";
  position: absolute;
  inset: -20% auto auto -10%;
  width: 240px;
  height: 240px;
  background: radial-gradient(circle, rgba(255,255,255,.18), transparent 70%);
}
```

### Task 7: Replace placeholder-feeling language with launch-ready microcopy styling
- **Priority:** High
- **Target Files/Areas:** `about/index.html`, `style.css`
- **Problem:** Placeholder notes and placeholder CTA labels reduce trust even when the page structure is good.
- **Solution:** Remove visible placeholder framing language from the UI and style temporary areas as neutral “studio profile” content instead.
- **Implementation Steps:**
  1. Replace “Temporary studio banner placeholder” with a neutral caption or remove it entirely.
  2. Replace “Wishlist (Placeholder)” and placeholder social labels with neutral link text or hidden-until-ready links.
  3. Add a standard muted helper text style for “coming soon” states.
  4. If a link is not live, convert it to non-button text instead of a fake CTA.
- **Example Snippet (if applicable):**
```html
<p class="helper-note">Storefront links will be added here when public pages go live.</p>
```

### Task 8: Make the Devlog page feel like an active live game feed
- **Priority:** Medium
- **Target Files/Areas:** `devlog/index.html`, `style.css`
- **Problem:** The “Latest Buzz” row feels generic and weakens the perceived authenticity of the update cadence.
- **Solution:** Restyle the update blocks as ticker cards with labels, timestamps, and compact visual tags.
- **Implementation Steps:**
  1. Wrap each update in a `.buzz-card` class.
  2. Add a top label such as `Balance`, `UI`, `Playtest`.
  3. Move emoji into a controlled badge element.
  4. Add a left accent border unique to each update type.
  5. Reduce copy width and increase timestamp contrast.
- **Example Snippet (if applicable):**
```html
<article class="panel buzz-card buzz-card--ui">
  <p class="buzz-label">UI Pass</p>
  <p>HUD readability pass live in current prototype branch.</p>
  <p class="meta">Yesterday</p>
</article>
```

### Task 9: Standardize hover and focus behavior across all interactive elements
- **Priority:** Medium
- **Target Files/Areas:** `style.css`, header, buttons, cards, links
- **Problem:** Some elements animate, some do not, and some hover states are color-only, which makes the interaction language inconsistent.
- **Solution:** Establish one hover system and one focus system for links, cards, buttons, and nav tabs.
- **Implementation Steps:**
  1. Define shared transition duration and easing custom properties.
  2. Apply transform + shadow hover to clickable cards only.
  3. Apply glow ring focus state using one consistent outline color.
  4. Make text links use a stronger underline reveal or color-shift consistently.
  5. Respect `prefers-reduced-motion` for all new transitions.
- **Example Snippet (if applicable):**
```css
:root {
  --ease-ui: .18s ease;
}
.btn,
.main-nav a,
.panel.is-interactive {
  transition: transform var(--ease-ui), box-shadow var(--ease-ui), border-color var(--ease-ui), color var(--ease-ui);
}
```

---

## 3. Thematic Ornamentation (No Assets)

### 1. Task Name: Sunburst section halos
- **Where It Applies:** Hero, CTA strip, feature section backgrounds
- **Visual Goal:** Add warm tropical energy and cinematic focus behind important content.
- **Implementation Steps:**
  1. Add `position: relative` and `overflow: hidden` to target sections.
  2. Use `::before` with a large radial gradient in orange/coral.
  3. Reduce opacity so it reads as atmosphere, not content.
- **Example CSS (if applicable):**
```css
.section-halo::before {
  content: "";
  position: absolute;
  inset: -10% auto auto -5%;
  width: 320px;
  height: 320px;
  background: radial-gradient(circle, rgba(255,122,60,.22), transparent 68%);
  pointer-events: none;
}
```

### 2. Task Name: Gold corner brackets
- **Where It Applies:** Featured cards, CTA container, devlog milestone panel
- **Visual Goal:** Make key panels feel like premium game UI containers.
- **Implementation Steps:**
  1. Add `position: relative` to target card.
  2. Use `::before` and `::after` for L-shaped corner marks.
  3. Place one pair top-left and one pair bottom-right.
- **Example CSS (if applicable):**
```css
.frame-corners::before,
.frame-corners::after {
  content: "";
  position: absolute;
  width: 28px;
  height: 28px;
  border-color: var(--border-gold);
  border-style: solid;
}
```

### 3. Task Name: Tidal divider lines
- **Where It Applies:** Between homepage sections and on page headers
- **Visual Goal:** Break up long pages with a more thematic separator than a plain border.
- **Implementation Steps:**
  1. Add a pseudo-element to the bottom of section headings or section wrappers.
  2. Use a repeating linear gradient or wavy stepped line effect.
  3. Keep height between 2px and 6px.
- **Example CSS (if applicable):**
```css
.section-divider::after {
  content: "";
  display: block;
  margin-top: 1rem;
  height: 4px;
  background: repeating-linear-gradient(90deg, var(--accent-primary) 0 16px, transparent 16px 24px);
}
```

### 4. Task Name: Sand-texture overlays
- **Where It Applies:** Panel backgrounds and large section surfaces
- **Visual Goal:** Reduce flatness while keeping current palette and no new assets.
- **Implementation Steps:**
  1. Add a pseudo-element with low-opacity layered gradients.
  2. Combine diagonal and radial gradients for subtle texture.
  3. Keep opacity below 0.08.
- **Example CSS (if applicable):**
```css
.panel::before {
  content: "";
  position: absolute;
  inset: 0;
  background:
    radial-gradient(circle at 20% 20%, rgba(255,255,255,.18), transparent 24%),
    linear-gradient(135deg, rgba(255,255,255,.04), rgba(0,0,0,.05));
  opacity: .35;
  pointer-events: none;
}
```

### 5. Task Name: Card-edge shine sweep
- **Where It Applies:** Hero caption, CTA buttons, feature cards
- **Visual Goal:** Add a polished arcade-like sheen to high-value UI elements.
- **Implementation Steps:**
  1. Add `overflow: hidden` to target block.
  2. Use `::after` with a diagonal translucent white gradient.
  3. Move it slightly on hover only.
- **Example CSS (if applicable):**
```css
.shine-on-hover::after {
  content: "";
  position: absolute;
  inset: -20% 120% auto auto;
  width: 40%;
  height: 180%;
  transform: rotate(18deg);
  background: linear-gradient(180deg, transparent, rgba(255,255,255,.18), transparent);
}
```

### 6. Task Name: Embossed title plates
- **Where It Applies:** Section headings, roster heading, Devlog heading
- **Visual Goal:** Make headings feel like stamped game mode banners.
- **Implementation Steps:**
  1. Wrap select `h2` elements in a `.title-plate` container.
  2. Add background fill, border, and bottom shadow.
  3. Constrain width to content and center where needed.
- **Example CSS (if applicable):**
```css
.title-plate {
  display: inline-block;
  padding: .35rem .9rem;
  border: 2px solid var(--border-gold);
  border-radius: 999px;
  background: rgba(6,11,21,.55);
}
```

### 7. Task Name: Floating chip badges
- **Where It Applies:** Roster cards, feature cards, devlog cards
- **Visual Goal:** Add small “game token” accents that improve hierarchy.
- **Implementation Steps:**
  1. Add small inline badge elements above or beside card titles.
  2. Style with rounded pill shape, border, and box shadow.
  3. Use color variants by content type.
- **Example CSS (if applicable):**
```css
.chip-badge {
  display: inline-flex;
  padding: .2rem .55rem;
  border-radius: 999px;
  border: 1px solid var(--border-gold);
  background: rgba(15,61,62,.9);
}
```

### 8. Task Name: Island horizon gradients
- **Where It Applies:** Hero, footer, alternate sections
- **Visual Goal:** Introduce depth that suggests sky-to-sea transitions.
- **Implementation Steps:**
  1. Add multi-stop vertical gradients to dark sections.
  2. Keep the lower half deeper teal and upper half warmer.
  3. Avoid strong opacity over text.
- **Example CSS (if applicable):**
```css
.section-horizon {
  background: linear-gradient(180deg, #174f66 0%, #0f3d3e 42%, #0a2830 100%);
}
```

### 9. Task Name: Heat-glow underlines for active headings
- **Where It Applies:** Section headings and active nav links
- **Visual Goal:** Tie existing orange/coral energy into typography.
- **Implementation Steps:**
  1. Add a pseudo-element underline.
  2. Use a short centered gradient bar.
  3. Increase width for major sections only.
- **Example CSS (if applicable):**
```css
.heading-glow::after {
  content: "";
  display: block;
  width: 72px;
  height: 3px;
  margin-top: .4rem;
  background: linear-gradient(90deg, var(--accent-primary), var(--cta));
  box-shadow: 0 0 12px rgba(255,122,60,.45);
}
```

### 10. Task Name: Faux depth shadows under media frames
- **Where It Applies:** Hero media, roster portraits, devlog image blocks
- **Visual Goal:** Make media feel mounted above the page instead of embedded in it.
- **Implementation Steps:**
  1. Add `filter: drop-shadow()` or a pseudo shadow under frames.
  2. Use a subtle downward offset only.
  3. Increase shadow slightly on hover for interactive cards.

### 11. Task Name: Ribbon labels for featured content
- **Where It Applies:** Featured devlog post, hero caption, CTA strip
- **Visual Goal:** Emphasize priority content with a stylized banner label.
- **Implementation Steps:**
  1. Add a small absolutely positioned label element.
  2. Use angled pseudo-elements to create ribbon tails.
  3. Keep copy short: `Featured`, `Flagship`, `New`.
- **Example CSS (if applicable):**
```css
.ribbon-label {
  position: absolute;
  top: 1rem;
  left: -6px;
  padding: .35rem .8rem;
  background: var(--cta);
  color: var(--bg-primary);
}
```

### 12. Task Name: Soft vignette on large images
- **Where It Applies:** Hero image, devlog feature image, About banner image
- **Visual Goal:** Improve legibility and cinematic framing.
- **Implementation Steps:**
  1. Add `::after` overlay to media wrappers.
  2. Use inset shadow or radial gradient darkening at edges.
  3. Keep center area clear for subject visibility.

### 13. Task Name: Decorative score-tick borders
- **Where It Applies:** Stats, meta rows, update cards
- **Visual Goal:** Make metadata feel like game HUD readouts.
- **Implementation Steps:**
  1. Add a short left border segment and a dotted inline separator.
  2. Use monospace or letter-spaced style for metadata only.
  3. Apply consistently to dates and labels.

### 14. Task Name: Bottom wave fade in footer
- **Where It Applies:** Footer and final CTA boundary
- **Visual Goal:** Make page ending feel designed instead of abruptly terminated.
- **Implementation Steps:**
  1. Add a top pseudo-element to the footer.
  2. Use repeated radial gradients or stepped curves for a wave-like crest.
  3. Keep contrast subtle so text remains dominant.

### 15. Task Name: Ambient spark particles using gradients only
- **Where It Applies:** Hero and CTA strip
- **Visual Goal:** Add playful energy without illustrations or JS.
- **Implementation Steps:**
  1. Add a pseudo-element with multiple radial gradients.
  2. Scatter small warm dots with very low opacity.
  3. Optionally animate background position slowly unless reduced motion is enabled.

---

## 4. Visual Cohesion System

### Colors
- Use `--bg-primary` / `--bg-secondary` only for page backgrounds and dark surfaces.
- Use `--surface` only for content panels and cards.
- Use `--accent-primary` for emphasis, decorative lines, and secondary emphasis buttons.
- Use `--cta` only for primary conversion actions and high-urgency highlights.
- Use `--border-gold` only for frames, separators, and premium accents.

### Spacing
- Base spacing unit: `8px`.
- Standard control padding: `12px 18px`.
- Standard card padding: `20px`.
- Standard section gap: `24px` between title and first content row.
- Standard section vertical padding: `48px` mobile / `72px` desktop.

### Borders
- Interactive controls: `2px solid` border.
- Standard cards/media: `1px` or `2px` depending on emphasis level.
- Radius system: `12px` small, `18px` medium, `999px` pill only.
- Gold frame treatment reserved for premium/feature surfaces.

### Typography
- `Bangers` only for hero headline, section titles, nav labels, and short UI labels.
- `Inter` for all body copy, meta text, and support text.
- Body copy max width: `60ch` in cards, `70ch` in full-width sections.
- Meta text should be smaller and more letter-spaced than body text.

### Rules (enforceable)
- Every major page section must use one of three section modes: default, alternate, or highlighted.
- Every clickable CTA must use either `.btn-primary` or `.btn-secondary`; no ad hoc button variants.
- Every interactive card must use the same hover transition and shadow behavior.
- Every media frame must share the same radius and border treatment unless it is explicitly featured.
- Every page heading block must include a kicker, heading, and optional support sentence in the same order.
- Placeholder UI text must not appear in visible production-facing sections.
- Primary CTA color (`--cta`) must not be used for non-conversion decorative filler.
- At least one unique accent treatment per page is allowed; more than two decorative accent styles per page is not allowed.

### Refactor Tasks
- Create spacing variables in `:root` for 8/12/20/32/48/72 values.
- Create shadow variables for low, medium, and glow elevation states.
- Add shared radius variables and apply them to `.panel`, `.btn`, `.media-frame`, and nav links.
- Create section modifier classes and apply them across Home, About, and Devlog.
- Add a shared heading-group pattern for page and section intros.
- Replace any inline style spacing with utility classes or scoped section modifiers.
- Normalize meta text and kicker text styles across all pages.

---

## 5. “Feels Like a Game” Enhancements (Lightweight Only)

### 1. Task Name: Character card hover reveal
- **Goal:** Make roster cards feel like a game character-select menu.
- **Implementation Steps:**
  1. Add a `.roster-card` class to each roster item.
  2. On hover, scale the image to `1.04` and raise the card slightly.
  3. Add a bottom glow or border-color swap unique to the card type.
  4. On focus-visible, apply the same state.
- **Optional Code Snippet:**
```css
.roster-card:hover img,
.roster-card:focus-within img { transform: scale(1.04); }
```

### 2. Task Name: Button press feedback
- **Goal:** Make CTA buttons feel tactile like game UI controls.
- **Implementation Steps:**
  1. Add a small downward transform on `:active`.
  2. Reduce box-shadow temporarily when pressed.
  3. Add stronger shadow in resting state so the press effect is noticeable.

### 3. Task Name: HUD-style meta rows
- **Goal:** Make dates, labels, and support metadata feel like in-game interface text.
- **Implementation Steps:**
  1. Create a `.hud-meta` class.
  2. Use uppercase, slight letter spacing, and a muted contrasting color.
  3. Add a left rule or icon-like square before the text.

### 4. Task Name: Win-streak style section counters
- **Goal:** Add game-like progression cues to long pages.
- **Implementation Steps:**
  1. Add small counter badges to major homepage sections: `01`, `02`, `03`.
  2. Position them near headings or section edges.
  3. Style them like scoreboard chips using existing palette.

### 5. Task Name: Spotlight reveal on featured cards
- **Goal:** Make feature cards feel like highlighted game modes.
- **Implementation Steps:**
  1. Add a soft radial gradient centered near the top of each featured card.
  2. Increase contrast of titles and accent borders.
  3. Limit effect to only 2–3 most important cards.

### 6. Task Name: Animated “live build” pulse on devlog feature
- **Goal:** Make the devlog hub feel actively updated without external services.
- **Implementation Steps:**
  1. Add a small circular indicator before the featured milestone kicker.
  2. Animate opacity/scale slowly.
  3. Disable animation under `prefers-reduced-motion`.
- **Optional Code Snippet:**
```css
.live-dot {
  width: .6rem;
  height: .6rem;
  border-radius: 50%;
  background: var(--cta);
  box-shadow: 0 0 0 0 rgba(255,79,90,.5);
}
```

### 7. Task Name: Card rarity color variants
- **Goal:** Add small visual differences that make sections feel more like collectible game content.
- **Implementation Steps:**
  1. Create variant classes such as `.is-attack`, `.is-defense`, `.is-support`.
  2. Change accent border and badge tone per class.
  3. Use variants on roster and feature cards only.

### 8. Task Name: Drawer trigger as mission prompt
- **Goal:** Make the hero info button feel like a game action instead of a generic toggle.
- **Implementation Steps:**
  1. Rename text from `Sackjack Info` to something action-oriented such as `Open Mission Brief`.
  2. Add a small icon-like square or arrow via pseudo-element.
  3. Add a subtle pulse border until first interaction.

---

## 6. Master Task List (CRITICAL)

| ID | Title | Priority | Estimated Effort | Dependencies | Target Files | One-line Implementation Summary |
|---|---|---|---|---|---|---|
| UI-001 | Add persistent hero caption block | High | S | None | `index.html`, `style.css` | Expose game name, pitch, and CTA directly in the hero without requiring drawer interaction. |
| UI-002 | Restyle header as premium game nav | High | S | None | `partials/header.html`, `style.css` | Add layered background, stronger nav tabs, and a themed accent line to the header. |
| UI-003 | Introduce section background variants | High | S | None | `index.html`, `about/index.html`, `devlog/index.html`, `style.css` | Alternate section treatments to improve page rhythm and hierarchy. |
| UI-004 | Standardize panel depth and radius system | High | S | None | `style.css` | Apply consistent border radius, shadows, and panel hierarchy across the whole site. |
| UI-005 | Upgrade roster cards into character-select cards | High | S | UI-004 | `index.html`, `style.css` | Add badges, framed info blocks, and hover polish to roster entries. |
| UI-006 | Rebuild final CTA strip as premium conversion banner | High | S | UI-003, UI-004 | `index.html`, `style.css` | Add layered CTA structure, stronger copy grouping, and decorative glow. |
| UI-007 | Remove visible placeholder-feeling UI copy | High | S | None | `about/index.html`, `style.css` | Replace placeholder text/buttons with neutral launch-ready copy or helper text. |
| UI-008 | Restyle Devlog “Latest Buzz” cards | Medium | S | UI-004 | `devlog/index.html`, `style.css` | Convert generic update boxes into labeled live-feed cards. |
| UI-009 | Normalize hover and focus behavior | Medium | S | UI-004 | `style.css` | Create one interaction system for links, buttons, nav tabs, and interactive cards. |
| ORN-001 | Add sunburst halo utility | Medium | S | UI-003 | `style.css` | Add warm radial background halos behind high-importance sections. |
| ORN-002 | Add gold corner bracket utility | Medium | S | UI-004 | `style.css` | Create premium framed-corner accents for featured panels. |
| ORN-003 | Add thematic divider utility | Medium | S | UI-003 | `style.css` | Replace plain section borders with branded divider lines. |
| ORN-004 | Add subtle sand-texture overlay | Low | S | UI-004 | `style.css` | Introduce low-opacity layered gradients to reduce flat panel surfaces. |
| ORN-005 | Add optional shine sweep effect | Low | S | UI-004, UI-009 | `style.css` | Add a hover-only sheen effect for hero caption, buttons, and feature cards. |
| ORN-006 | Add title plate heading style | Medium | S | UI-003 | `style.css`, page templates | Turn important section headings into framed title plates. |
| ORN-007 | Add chip badge component | Medium | S | UI-004 | `style.css`, page templates | Create reusable badge labels for roles, update types, and content emphasis. |
| ORN-008 | Add horizon gradient section style | Low | S | UI-003 | `style.css` | Introduce sky-to-sea depth gradients on dark sections. |
| ORN-009 | Add glow underline heading utility | Low | S | UI-003 | `style.css` | Give major headings a consistent warm accent underline. |
| ORN-010 | Add media frame drop-depth | Low | S | UI-004 | `style.css` | Make images and videos feel lifted from the page using consistent shadow treatment. |
| ORN-011 | Add ribbon label component | Low | S | UI-004 | `style.css`, page templates | Highlight flagship and featured content with a reusable ribbon label. |
| ORN-012 | Add soft image vignette overlay | Low | S | UI-004 | `style.css` | Improve readability and cinematic framing on large media. |
| ORN-013 | Add HUD metadata style | Medium | S | UI-004 | `style.css`, `devlog/index.html`, `about/index.html` | Style metadata rows to feel like game UI readouts. |
| ORN-014 | Add footer wave fade transition | Low | S | UI-003 | `style.css` | Smooth the transition into the footer with a subtle decorative crest. |
| ORN-015 | Add ambient spark particle background | Low | M | UI-003 | `style.css` | Use gradient-based particles for light atmospheric motion in hero and CTA areas. |
| GAME-001 | Add roster hover reveal interaction | Medium | S | UI-005, UI-009 | `style.css` | Make character cards feel interactive with scale and glow feedback. |
| GAME-002 | Add tactile button press states | Medium | S | UI-009 | `style.css` | Add active-state feedback so buttons behave like game controls. |
| GAME-003 | Add HUD-style meta component | Medium | S | ORN-013 | `style.css`, page templates | Create a reusable metadata row style for dates, labels, and status text. |
| GAME-004 | Add section progress counters | Low | S | UI-003 | `index.html`, `style.css` | Add small numbered badges to major sections for a progression feel. |
| GAME-005 | Add spotlight treatment to featured cards | Low | S | UI-004 | `style.css` | Highlight 2–3 key promo cards using radial glow and stronger contrast. |
| GAME-006 | Add animated live-build indicator | Low | S | UI-008 | `devlog/index.html`, `style.css` | Add a small pulsing “live” dot to the featured Devlog area. |
| GAME-007 | Add card rarity/accent variants | Low | S | UI-005 | `style.css`, homepage cards | Use color-coded accent variants for roster and feature card categories. |
| GAME-008 | Reframe hero drawer trigger as mission prompt | Medium | S | UI-001, UI-009 | `index.html`, `style.css` | Rename and restyle the hero drawer button as a more game-like action prompt. |

---

## 7. Execution Order

### 1. Immediate wins
1. UI-001 Add persistent hero caption block.
2. UI-002 Restyle header as premium game nav.
3. UI-004 Standardize panel depth and radius system.
4. UI-006 Rebuild final CTA strip as premium conversion banner.
5. UI-007 Remove visible placeholder-feeling UI copy.
6. UI-009 Normalize hover and focus behavior.

### 2. Structural improvements
7. UI-003 Introduce section background variants.
8. UI-005 Upgrade roster cards into character-select cards.
9. UI-008 Restyle Devlog “Latest Buzz” cards.
10. ORN-006 Add title plate heading style.
11. ORN-007 Add chip badge component.
12. ORN-013 Add HUD metadata style.
13. GAME-008 Reframe hero drawer trigger as mission prompt.

### 3. Polish layer
14. ORN-001 Add sunburst halo utility.
15. ORN-002 Add gold corner bracket utility.
16. ORN-003 Add thematic divider utility.
17. ORN-010 Add media frame drop-depth.
18. ORN-012 Add soft image vignette overlay.
19. GAME-001 Add roster hover reveal interaction.
20. GAME-002 Add tactile button press states.
21. GAME-005 Add spotlight treatment to featured cards.
22. GAME-006 Add animated live-build indicator.
23. ORN-004 Add subtle sand-texture overlay.
24. ORN-005 Add optional shine sweep effect.
25. ORN-008 Add horizon gradient section style.
26. ORN-009 Add glow underline heading utility.
27. ORN-011 Add ribbon label component.
28. ORN-014 Add footer wave fade transition.
29. ORN-015 Add ambient spark particle background.
30. GAME-003 Add HUD-style meta component.
31. GAME-004 Add section progress counters.
32. GAME-007 Add card rarity/accent variants.
