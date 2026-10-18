# Batata website first pass

Revision: October 18, 2026. Branch: `codex/batata-site-luckys`, based on `currdev` at `ad3c27fe72540614a426316357cd8bbc977cfeac`.

## Delivered

The homepage introduces the blackjack card battler, explains automatic Luckys, shows Ace and Pampa, separates Hit/Stand from optional Coin actions, refreshes the three existing roster cards, and ends with development updates and social links. Primary CTA: **See Luckys in action**. Secondary CTA: **Follow development**. Google Play and Amazon Fire tablets are described as planned platforms. The existing itch.io project is explicitly identified as earlier builds/project history, separate from the forthcoming mobile release.

The existing hero image is unchanged. A permanent opaque HTML title panel covers its bottom 46%, including all old lettering, with image-relative positioning that does not depend on screen height. There is no dismiss control or handler. Page/navigation branding and social copy now use Batata; the homepage and kickoff social images use existing Ace artwork without old lettering. Existing URL paths, canonical destinations, and redirect targets remain intact. Historical gallery artwork remains available.

Each of the three gameplay players initially contains a still, explanation, and accessible Play button. JavaScript creates a native video element and assigns its source only on Play. Controls, inline playback, fullscreen and replay remain native. Media failure restores the still and retry button; descriptions remain visible. Without JavaScript, navigation, stills, explanations, and an enable-JavaScript note remain available. Video dimensions are reserved before loading.

## Current game source audit

Read directly from `C:/Users/chris/Projects/batata` on October 18, 2026; no game files or exports changed.

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
