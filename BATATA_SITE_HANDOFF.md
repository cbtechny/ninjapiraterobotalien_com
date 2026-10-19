# Current repair state — October 18, 2026

This repair targets currdev at 9b72b9f, preserving its homepage, artwork, mechanics text and two deferred gameplay videos. The primary hero action is now Follow on Threads; gameplay is secondary. Static update links remain authored HTML; redundant runtime article fetching is removed. Partial failures retain complete navigation/footer, and delayed success preserves engaged components. Maintained pages have skip/main semantics, current-navigation state, no-referrer and same-origin script CSP. The existing early effects script is externalized without changing its behavior.

Pages stages only referenced delivery assets, including CSS and JS references. Temporary recordings, source-only artwork and asset documentation remain in Git but are not published. The three 64px approved icon derivatives total 9,230 bytes versus 279,496 bytes for their sources.

Production remains https://ninjapiraterobotalien.com/ at the previously verified main deployment 165fa44; neither this branch nor the older main-based repair is deployed. The main-based repair is retained locally and is not merged here. No historical game export is imported into currdev.

Google Fonts remain external: exact files, redistribution notices and cross-browser visual parity have not been packaged/verified. Meta CSP does not supply frame-ancestors or other header-only protections. No analytics, signup, Kit, artwork or gameplay export was added. Future repository commits use the verified GitHub noreply identity; historical personal email/path exposure remains, with no rewrite or rotation.

Owner checklist: review account private-email/push settings; approve Kit account/public form, consent/privacy/retention and sender details before collection, then verify double opt-in, bot protection, generic redirects and unsubscribe. Physical-device, screen-reader and audible playback checks remain unperformed. Merge/deploy require owner approval.

The remainder is a historical implementation record. Its hero, video-count, branch and CTA descriptions are superseded by the current state above.

---

# Batata website first pass

Revision: October 18, 2026. Branch: `codex/batata-site-luckys`, based on `currdev` at `ad3c27fe72540614a426316357cd8bbc977cfeac`.

## Delivered

The homepage introduces the blackjack card battler, explains automatic Luckys, shows Ace and Pampa, separates Hit/Stand from optional Coin actions, refreshes the three existing roster cards, and ends with development updates and social links. Primary CTA: **See Luckys in action**. Secondary CTA: **Follow development**. Google Play and Amazon Fire tablets are described as planned platforms. The existing itch.io project is explicitly identified as earlier builds/project history, separate from the forthcoming mobile release.

The existing hero image is unchanged. A permanent opaque HTML title panel covers its bottom 46%, including all old lettering, with image-relative positioning that does not depend on screen height. There is no dismiss control or handler. Page/navigation branding and social copy now use Batata; the homepage and kickoff social images use existing Ace artwork without old lettering. Existing URL paths, canonical destinations, and redirect targets remain intact. Historical gallery artwork remains available.

Each of the three gameplay players initially contains a still, explanation, and accessible Play button. JavaScript creates a native video element and assigns its source only on Play. Controls, inline playback, fullscreen and replay remain native. Media failure restores the still and retry button; descriptions remain visible. Without JavaScript, navigation, stills, explanations, and an enable-JavaScript note remain available. Video dimensions are reserved before loading.

## Current game source audit

Read directly from the local Batata game repository on October 18, 2026; no game files or exports changed.

| Published contract | Source evidence |
| --- | --- |
| Ace: Ace → gain 1 Coin | `characters/definitions/ace.tres`: rank 0, effect 1, value 1, enabled |
| Pampa: 6 → restore up to 1 HP | `characters/definitions/pampa.tres`: rank 5, effect 3, value 1, enabled |
| Ninja: 7 → deal 1 damage; Shield first | `characters/definitions/ninja.tres`: rank 6, effect 2, value 1, enabled; `lucky_effect_resolver.gd` calls `take_damage` |
| Ranks are independent of suits | `characters/character_definition.gd` and `gameplay/scripts/batata_deck.gd`; `_detect_lucky_card` in `batata.gd` compares rank only |
| Opening cards and later draws; both contestants | Opening and subsequent cards call `_deal_to` in `batata.gd`; it detects/resolves Luckys for player/opponent hands |
| Attack 2 Coins / 3 damage; Defend 2 / up to 2 Shield; Heal 2 / up to 3 HP | `gameplay/scripts/batata_rules.gd`: `POWER_UP_COST=2`, `ATTACK_DAMAGE=3`, `DEFEND_AMOUNT=2`, `HEAL_AMOUNT=3`; action handlers in `batata.gd` |
| Optional actions after the hand; bout-local Coins | Phase flow and action guards in `batata.gd`; `combatant_state.gd` preserves resources between rounds and resets Coins for a bout |
| Healing cap and Shield-first absorption | `combatant_state.gd`: `heal`, `add_shield`, `take_damage` |

Pampa's recording shows **HP full**, not restored health. The surrounding explanation says exactly that. Replace its MP4 and preview later without changing the section structure.

## Obsolete copy and replacements

| Location / obsolete wording | Replacement |
| --- | --- |
| Homepage: “Buy single-use powerups before each bout”; store/prep/climb feature pitch | Automatic Luckys, then Hit/Stand and optional actions after hand resolution |
| Roster: “Aggro / All-in specialist”, “Tank / Defense and stall”, “Combo / Combo engine” | Verified Lucky ranks and effects for Ace, Pampa, Ninja |
| “Granpa P” | Pampa (existing asset filename retained) |
| Homepage: autoplaying duel, fixed “22 HP” stamp, “Bluff” pitch | Explicit Play, existing gameplay preview and health explanation |
| Homepage: “Join The Next Playtest Wave” / support CTA | Follow development, social links and published devlogs |
| About: placeholder wishlist and community buttons | Working development destination and devlog link |
| Devlog 001: “collect jokers and special cards”, “matches with powerups”, unlockable-character claim | Hit/Stand, rank-triggered Luckys, distinct character effects and current Coin-action values |
| Devlog 002: buy powerups in the tournament/store, “one-use powerups”, retry with different powerups | Tournament flow, automatic Luckys, optional bout-Coin actions after the hand |
| Devlog hub: powerup summaries and unverified relative-time “Latest Buzz” announcements | Corrected summaries; unsupported announcements removed |

Both articles retain their January 2026 publication dates and show an October 18, 2026 mechanics revision note. Their summaries and relevant descriptions were revised too; inaccurate reading-time estimates were removed.

## Media derivatives

No trimming, cropping, reframing, or audio retained. FFmpeg 7.1: `scale=720:900:flags=lanczos`, H.264, CRF 23, slow preset, maxrate 2400k, bufsize 4800k, yuv420p, faststart, metadata removed. Both are well below the 3 MB target and 5 MB ceiling; increasing bitrate was unnecessary for these mostly static scenes. Format reference: [web.dev video guidance](https://web.dev/articles/replace-gifs-with-videos). User-triggered loading is deliberately stricter than its autoplay examples.

| File | Dimensions / duration | Bytes |
| --- | --- | ---: |
| `assets/videos/luckys/ace-lucky.mp4` | 720×900 / 8.97 seconds / no audio stream | 603,232 |
| `assets/videos/luckys/pampa-lucky.mp4` | 720×900 / 9.80 seconds / no audio stream | 562,524 |
| `assets/videos/luckys/ace-preview.webp` | 720×900, frame at 4 seconds | 55,868 |
| `assets/videos/luckys/pampa-preview.webp` | 720×900, frame at 6.2 seconds (HP full) | 54,486 |

Originals remain unchanged and untracked in `assets/tmp/`; they are not part of this commit:

- `acelucky.mp4` SHA256: `FA438B36014D6BD6FA0870FD762E00129A4E35F070034988073B4AA0FB959FB0`
- `pampalucky.mp4` SHA256: `85520F3C1EFB8D13D873C645FD34E9332480740BFBC5B85ADE64B724CB1FAEB0`

## Verification and previews

Local Chrome checks at 1440, 1024, 768, 390, 360 and 320 px: no horizontal overflow; opaque image-relative hero cover; zero video elements and **zero MP4/WebM requests before Play**, including after scrolling through the demonstrations and to development links. Verified Enter/Space activation, all three videos playing with native controls, fullscreen, replay, failed media restoration, JavaScript-disabled fallback, reduced motion (zero animations), and mobile menu navigation. No page JavaScript errors or HTTP error responses in the homepage run. Static local URL/asset scan found no missing files; existing redirect destinations were exercised. `node --check` and `git diff --check` pass.

Re-run `scripts/verify-batata-site.cjs` with Playwright available through Node module resolution and Chrome installed. Start a static server at the repo root; default `SITE_URL` is `http://127.0.0.1:8766`. Set `CHROME_PATH` if necessary. The script writes ignored JSON evidence and screenshots to `.test-server/` and asserts the main acceptance checks. In this environment, Playwright is supplied by the bundled runtime via `NODE_PATH`; no project dependencies were added.

Visual evidence (local, ignored): `.test-server/hero-1440.png`, `hero-768.png`, `hero-390.png`, `hero-320.png`, `pampa-390.png`, full-page `home-{width}.png`, `luckys-desktop.png`, `luckys-mobile.png`, and `nojs-320.png`. Final screenshots were inspected for hero coverage, text and gameplay readability. Close-up labels remain readable on mobile; small peripheral gameplay HUD labels are naturally smaller, with the written explanation and fullscreen available.

This is desktop Chrome responsive simulation, not physical tablet/phone or Safari/Fire-device certification. Fullscreen was exercised in headless Chrome. No release compatibility claim is implied. External account destinations were preserved, not audited for account ownership or third-party availability.

No deployment, merge, remote push, Kit integration, email collection, signup form, purchase claim, or game export change was performed.

## Next conversion phase

When Kit integration is requested, change the primary CTA to **Email me when Batata launches**, with confirmed opt-in and a clear email promise. Keep optional playtesting interest separate from launch notifications. Only introduce store purchase links once listings are live and device audiences are confirmed.


## Survival-loop pass — October 18, 2026

Branch: `codex/batata-survival-loop`, based on local `currdev` at `7ac66b0`. Starting worktree was clean: the earlier stylesheet changes and source reels had already reached currdev. No source media were modified or removed.

### Delivered

The homepage now leads with “Play the hand. Outlast the potato.” and a CTA to the four-step gameplay loop, before Lucky demonstrations. It explains dealer resolution, saving/spending Coins, opponent turns, health attrition, character incentives, and eight-entrant/two-loss tournament stakes. Native expandable details provide exact rewards, damage, costs and resource limits. A worked example connects a non-bust hand reward to the 2-Coin action decision.

Character purchases are explicitly planned progression: persistent Gold is distinct from bout Coins, and the complete earning loop is not advertised as available. Rechecked `batata_rules.gd`, `combatant_state.gd`, character definitions/resolver, `game_session.gd`, `player_profile.gd`, and tournament state against agent notes. Profile Gold starts at zero and purchase code spends it; no production gameplay award path was found in the source audit. This is a source finding, not a fresh gameplay test.

The old `hp_damage.webm` player and poster are no longer referenced by the homepage; historical files remain. A CSS-only island construction illustration and text fill its place. About now uses a studio-name text panel rather than the banner placeholder; its social metadata uses the tracked Ace illustration instead of the placeholder. New untracked artwork appeared during this pass and was preserved without adding dependencies on it. No images or logos generated. The hero mask is smaller but remains opaque and image-relative; mobile roster cards are horizontal. About contact text wraps at 320px, and its secondary button has a dark background for legibility.

### Verification

- Static: JavaScript syntax checks, `git diff --check`, local HTML URL/asset scan (no missing targets), homepage section order and retired-media references checked.
- Browser: Chrome responsive simulation at 1440, 1024, 768, 390, 360 and 320px; no homepage overflow, page errors or HTTP errors; zero video elements and zero MP4/WebM requests before Play, including after scrolling. Both Lucky clips played; native controls, fullscreen, replay, keyboard activation, error fallback, no-JavaScript navigation/previews, and reduced-motion behavior passed. Rules opened/closed with keyboard input at every tested width.
- About: rendered at 1440, 390 and 320px; no overflow after fixing long contact text; images loaded and old placeholder absent.
- Visual: desktop/mobile homepage, expanded mobile rules and About previews inspected. Contrast/readability received visual review, not a complete automated accessibility audit. No physical-device certification.
- Updated `scripts/verify-batata-site.cjs` for two players, keyboard rules and About checks. Evidence: `.test-server/qa-results.json`; previews: `home-1440.png`, `home-390.png`, `about-1440.png`, `about-320.png`, `rules-390.png` in `.test-server/`.

### Assets still needed

1. Current bout footage and poster: hand resolution → Coin reward → action choice → consequence, with clean current UI.
2. Approved studio logo for About; the text treatment is intentional interim presentation.
3. Approved Batata title/logo and hero artwork to retire the old-name cover treatment.
4. Optional tournament/hearts and character-selection footage; label unlock previews as development footage until Gold earning is implemented.
5. Optional Pampa footage below full HP showing healing; existing “HP full” clip remains accurately explained.

No game code, game exports, Kit, signup forms, store purchase links, deployment, merge or remote push changed.


## Marketing and artwork pass — October 18, 2026

Continues `codex/batata-survival-loop`. The current page now calls Batata a single-player blackjack battler, anchors the pitch in outlasting a rival, and uses shorter decision-led copy. The 2-Coin worked example is expandable beside the existing exact-rule details. Main content order, platform caveats, Pampa full-health explanation and planned Gold progression are retained.

### Artwork integration

Used the supplied reference-based hero, studio workshop, and island construction artwork as optimized WebP derivatives. No image generation or master edits were performed. The generated title treatment remains a separate unintegrated concept; the accessible game title stays HTML text. Supplied PNG masters and their original handoff are retained unchanged alongside the optimized derivatives for provenance. The title concept is preserved as a source asset but is not referenced by the website.

- Hero: `assets/images/home/batata-hero.webp`, 1280×720, 147,290 bytes.
- Studio: `assets/images/about/npra-studio-workshop.webp`, 960×600, 161,580 bytes.
- Construction: `assets/images/shared/potato-island-construction.webp`, 800×500, 97,624 bytes.

The old lettered hero and opaque mask are no longer used on the homepage. Desktop uses a title/copy-and-art split; mobile preserves the entire hero. Studio art is labeled through its alt text as illustration, not a logo or workplace photo. Construction artwork is an interim preview slot; it is not presented as gameplay. Homepage and About social images now use the corresponding WebP art.

### Checks

Static local links/assets and `git diff --check` passed. Browser script passed at 1440, 1024, 768, 390, 360 and 320px: hero loaded without overflow, both expandable sections worked by keyboard, no video elements/downloads before Play, both clips played/replayed, fullscreen/error/no-JavaScript/reduced-motion checks passed. About loaded without overflow at 1440, 390 and 320px. No recorded homepage JavaScript/HTTP errors. Desktop/mobile homepage and About screenshots visually inspected; this is responsive Chrome QA, not physical-device testing or a complete accessibility audit.

### Next content priority

Capture a real current close-finish decision, not another decorative illustration. See `docs/BATATA_CAPTURE_BRIEF.md`. Kit and store CTAs remain deferred. No merge, deployment, remote push, or game project change.


## Character likeness correction — October 18, 2026

Authoritative references supplied by Chris: `characters/ace/Ace_Final.png` and `characters/pampa/pampa_final.webp` in the local Sackjack-MOBILE source checkout. Imagegen edits correct Ace to a backward blue/teal cap, green tuft, warm brown body and pale spots; Pampa now has teal-green hair, eyebrows and moustache. Hero composition, Ninja, scenery and card table retained. Updated hero and both roster portraits use versioned v2 WebP files, with PNG masters preserved. Kickoff-post social metadata now uses the corrected Ace portrait. Older promotional assets remain as historical files, not current homepage references.

Existing Lucky recordings have not been altered or presented as new captures. A visible earlier-build note explains that character artwork/HUD may differ, while the published Lucky rules remain source-verified. No game source changes, merge, deployment or PR publication performed.

Character-pass QA: six-width Chrome verification passed, including zero media downloads before Play and playback/error/no-JavaScript checks. Focused portrait checks at 1440, 390 and 320px decoded all roster images successfully with no overflow; desktop/mobile hero and roster screenshots inspected. Roster media now uses square framing to retain cap/hair silhouettes. Evidence: `.test-server/characters-hero-1440.png`, `characters-roster-1440.png`, `characters-roster-390.png`, `characters-page-320.png`. Old artwork and game source sheets remain untouched.
