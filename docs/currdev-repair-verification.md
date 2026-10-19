# Currdev repair verification — October 18, 2026

Delivery target was changed by the owner from main to **currdev**. This branch starts from refreshed `origin/currdev` at `9b72b9f`; it does not merge the separate main-based repair or import main's legacy Godot export. The original checkout is untouched. The existing design, approved art, game explanations, two gameplay clips, platform qualifications and historical itch.io wording are preserved.

## Report finding checklist

| Finding | Status | Result |
| --- | --- | --- |
| R 1: shared HTTP status/fallback navigation | Fixed | Check response.ok before insertion; initialize before fetch; complete static header/footer survive abort, 404, 500. Late successful responses preserve focused/open components. |
| R 1: redundant article requests | Fixed | Removed renderLatestIntel; authored homepage update links remain unchanged. |
| R 1: visitor action | Fixed | Existing Threads destination is primary hero CTA; gameplay explanation remains secondary. No date/purchase/gameplay promise added. |
| R 1: labels/focus on pale/gradient surfaces | Fixed | Dark teal pale-panel labels/headings/links, light links retained on dark update cards, white/dark focus rings. Larger small labels and interface text. |
| R 1: skip/main/current navigation/mobile menu | Fixed | Skip link and focusable main on six maintained content pages; associated toggle, synchronized state, hidden/inert closed nav, Enter/Space/Escape, first-link focus and close restoration. All three primary destinations identify exact page or parent section with aria-current. Archive gallery correctly marks none active. |
| R 1: article line length/return links | Fixed | 72ch container and 65ch paragraphs; return links directly to /devlog/index.html. |
| R 1: historical gallery/lightbox/sitemap | Fixed | Noindex/historical description, ordinary full-size image anchors, no image-click overlay; removed from sitemap. |
| R 1: undersized social delivery assets | Fixed | 64px approved derivatives, 9, 230 bytes total instead of 279, 496 bytes. Originals retained; dimensions/proportions/colors/alpha visually inspected. |
| R 1/R 2/R 3: publication boundary | Fixed | Explicit 19-asset delivery manifest; 40 staged files. Excludes assets/tmp, source-only art, asset docs and repository docs/tools. CSS background and JS/media references included. |
| R 1: authoritative production URL | Fixed | README uses verified HTTPS custom domain. Root paths retained. GitHub Pages project URL and HTTP redirect there. |
| R 1/R 3: stale docs/local paths | Fixed | Current handoff preface supersedes historical hero/CTA/video-count text; local game-repo absolute path removed. README describes this branch, not live parity. |
| R 1: old CSS cleanup | Deferred | No broad refactor without proving obsolete selectors unused across maintained pages. |
| R 2: Kit/subscriber flow/analytics | Already absent | None added. No credential or subscriber leak confirmed by reports. Owner prerequisites below. |
| R 2/R 3: future commit identity | Fixed locally | Verified GitHub noreply identity set for this repository only. Intentional studio contact preserved. |
| R 3: personal email/paths in history | Historical exposure | No rewrite, force push, deletion of source originals or credential rotation performed. |
| R 2: Actions/publish permissions | Fixed | Existing four action versions pinned to verified upstream commit objects. Build contents/pages read; only deploy gets Pages/OIDC write. |
| R 2: no-referrer/CSP | Fixed | All maintained HTML, including redirect stubs, gets no-referrer and meta CSP. Early effects code externalized unchanged; script-src self, no unsafe-inline/eval permission. Existing authored inline styles allowed. No claim of meta frame-ancestors or other header-only protection. |
| R 1/R 2: Google Fonts self-hosting | Deferred | Current exact faces retained. Required font subsets, redistribution notices and cross-browser visual parity not packaged/verified; Google requests remain. |
| R 3: original image tool metadata | Deferred/informational | No personal GPS/name/path reported in that metadata. No original art modified/deleted; new icon derivatives omit source metadata. |

## Verification

- Source/artifact: JS syntax for script.js/effects.js and both browser scripts, git diff --check, actual staging check.40 files, 180 references across 15 HTML files; HTML links/fragments/refresh/social metadata, CSS url and JS literal asset paths checked. No legacy game bundle was imported. Deployment uses these same staging/check scripts.
- Existing currdev browser suite: six homepage widths including 320/390/768/1440; zero horizontal overflow and zero media downloads/elements before Play. Both Ace and Pampa actually played with native controls, inline playback, fullscreen and replay. Aborted MP4 restores still and retry button. No-JS has two previews, zero video requests and visible navigation. Reduced-motion has zero animations. About images/layout passed 1440/390/320. Zero JS errors or bad responses.
- Additional repair browser suite: six content pages at 320/390/768/1440, plus each with JS disabled at 320. Skip focus, active navigation, mobile Enter/Space/Escape/tab, full-size gallery Enter navigation, network/404/500 fallbacks, delayed-success focus preservation, actual CSP enforcement and no-Referer cross-origin navigation. Google Fonts loaded without failed external requests. Archive gallery correctly has no active primary-nav destination.
- Responsive inspection found an existing decorative devlog vine at 112vw causing overflow. Constraining only that decorative image to 100vw retains the full artwork and fixes overflow without hiding page content.
- Separate read-only review against currdev found a port regression in dark update-card link colors. Explicit light colors fixed it; final review found no further confirmed implementation defect. Gallery test was corrected to expect no active nav item rather than inventing a destination.
- Screenshots are local desktop Edge viewport emulation, not physical phone/tablet, screen-reader or audible audio certification. No signup forms submitted and no emails sent. No LCP/CLS/INP or real-user performance claim.

## Live versus local

The latest successful Pages run verified earlier in this repair is [38956180040](https://github.com/cbtechny/ninjapiraterobotalien_com/actions/runs/38956180040), main at 165fa44, October 16. Successful deployment metadata identifies https://ninjapiraterobotalien.com/; HTTPS 200 homepage bytes matched main exactly. HTTP and the GitHub Pages project URL redirected there. Threads redirected to its canonical @handle URL with 200; Instagram, Facebook and historical itch.io returned 200. The public Pages-settings API returned 404, so the account setting itself was not read; actual HTTPS redirects were checked. These live checks do not describe this unmerged currdev repair.

## Owner checklist

- Review/merge this PR into currdev when ready. Main promotion and deployment remain separate; neither is performed here.
- Review account-wide private-email/push settings. Repository noreply does not erase historical copies or alter account settings.
- Before Kit: approve account/public form destination, purpose/email expectations, privacy/retention/deletion and sender details; verify double opt-in, bot protection, subscriber-free generic redirects, unsubscribe and sender-domain authentication. Keep credentials/subscriber exports outside this public repository.
- Font self-hosting requires exact files/licenses and visual checks. Physical-device, screen-reader and audible playback QA remain owner checks.

## Screenshots and machine results

- [Desktop hero](qa-currdev/home-desktop.webp) · [Mobile hero](qa-currdev/home-mobile.webp)
- [Repair checks](qa-currdev/repair-results.json) · [Video checks](qa-currdev/video-results.json)

Screenshots show the first 1200 pixels of the inspected full-page captures; complete screenshots remain in ignored local QA output. The gallery gradient text was also checked at all four widths after its final contrast correction.
