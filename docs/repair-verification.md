# Focused repair verification — October 18, 2026

This work starts from refreshed `origin/main` (`165fa44eacadbd9b8b1eae47624775f18b29e0a7`) on isolated `codex/batata-focused-repair`. The original clean checkout stays on `currdev` (`9b72b9f`). No open PRs were returned at the initial inspection. No applicable repository/ancestor AGENTS instructions were found. No branch merge, history rewrite, force push, deployment or direct main push was performed.

The three supplied reports are evidence from currdev, not implementation instructions. Each applicable main issue was checked independently. Main retains its name-reveal design, static architecture, approved art and historical export. Only the three explicitly requested icon derivatives use approved assets from currdev; its redesign, fonts, gameplay videos and game claims were not copied wholesale.

## Finding checklist

| Report finding | Disposition | Evidence / result |
| --- | --- | --- |
| R1: HTTP status before component injection | Already resolved on main; strengthened | Main already checked `response.ok`. Complete static header/footer now survive network errors and 404/500. Initialization runs before loading. |
| R1: late successful component / navigation reliability | Fixed | Engaged components are not replaced. Held successful response regression preserves open menu and keyboard focus. |
| R1: buried homepage follow action | Fixed | Direct existing Threads destination is primary; gameplay anchor is secondary. Main name-reveal composition retained. |
| R1: redundant runtime article fetching | Currdev-only; absent on main | No `renderLatestIntel` on main. Authored static links are retained; new homepage update links are static too. |
| R1: pale gameplay labels / yellow-only focus | Currdev-only labels; main focus fixed | Pale gameplay panels do not exist on main. Global two-color focus rings remain visible on dark, pale and gradient surfaces. Hero taglines have a pale backing with dark text. |
| R1: undersized labels / prose width | Fixed on main | Name-reveal small label raised from .75rem to .9rem; paragraphs bounded, article container 72ch and prose 65ch. Main has no .65rem studio sublabel. |
| R1: skip links / main landmarks | Fixed | All 11 maintained content pages have one main, a focusable skip destination, complete fallback navigation/footer. |
| R1: active navigation | Fixed | Exact targets have `aria-current=page`; parent sections use `aria-current=location`, with visible underline. Home no longer highlights every index page. |
| R1: mobile menu relationship / Escape / focus | Fixed | Valid controls ID, synchronized expanded state, hidden/inert closed state, first-link focus, Escape restoration, resize and focus-out closure; no-JS menu remains expanded. |
| R1: unfinished gallery / inaccessible overlay | Fixed | Historical and noindex label, omitted from sitemap; real full-size image anchors replace click-only lightbox. Placeholder tiles identified honestly. |
| R1: indirect article return links | Already direct on main; explicit | Articles now explicitly use `/devlogs/index.html`, main's existing hub. Currdev's `/devlog/` route was not introduced. |
| R1: large social icons | Currdev-only origin; derivatives delivered | Contact uses proportion-preserving 64px derivatives at 24px with text labels. 9,230 bytes total versus 279,496 source bytes (96.7% smaller). Visual side-by-side inspected. |
| R1/R2/R3: all-assets publication | Fixed | Explicit manifest excludes source-only artwork, tmp recordings, asset docs and repository docs/tools; source originals retained. Referenced gallery/title/social images and complete historical build remain staged. |
| R1: conflicting hosting URL | Fixed | README documents verified custom-domain authority; root paths retained. Both HTTP and Pages project URL redirect to HTTPS custom domain. |
| R1: obsolete CSS | Deferred | No broad cleanup: unused status across legacy pages and currdev is not established. Only narrow accessibility/layout rules added. |
| R1: stale README/handoff / release wording | Fixed on main; currdev-only handoff listed | New main-specific handoff explains current behavior and branch differences. Historical pages/posts/builds labeled; inaccurate demo and store promises removed. Current planned platforms qualified. Currdev's old handoff is not modified by this main PR. |
| R2: Kit / subscriber leak | Already absent | No signup form, analytics, credentials or subscriber flow added. Owner prerequisites below. |
| R2/R3: future commit identity | Fixed for repository | GitHub noreply identity established from connected account ID/login and matching existing commits; repo-local setting only. Previous effective config was the intentional studio address; personal mailbox also exists historically. |
| R3: username-bearing documentation paths | Fixed / already contained | Main README was already sanitized. Redacted absolute example removed from historical audit; current maintained docs have no personal absolute paths. Currdev's handoff path remains currdev-only. |
| R3: personal email / old paths in history | Historical exposure | Retained and documented. No credential finding, rotation or history rewrite justified by these reports. Public studio contacts preserved. |
| R2: tag-based Actions / write scope | Fixed | All four existing Actions pinned to upstream-verified commit objects. Build has contents/pages read only; Pages/OIDC write only in deploy. |
| R2: no-referrer / CSP | Fixed for maintained website | Browser checks: no unexpected CSP violations, inline script blocked, cross-origin navigation has no Referer. Script policy never allows inline/eval. Inline styles retained for authored layout. Meta CSP does not supply frame-ancestors. |
| R2: generated game policy | Deferred at export boundary | Existing generated HTML has inline Godot bootstrap, workers and WebAssembly resource requirements. It remains byte-identical; a restrictive export policy and consistent game-document referrer control need an export-level assessment. Website policy does not propagate into this standalone game document. |
| R1/R2: Google Fonts self-hosting | Deferred | Bangers and Inter retained and loaded under the tested CSP. Exact browser subset files, redistribution notices and cross-browser visual equivalence have not been packaged/verified. No approximation or license assumption made. Google font requests remain. |
| R3: image tool metadata | Deferred / informational | Original PNG metadata is retained. Reports found no personal name/GPS/path in it. New icon derivatives contain no source metadata. |

## Verification evidence and limits

**Source and artifact checks:** `node --check script.js`, `node --check scripts/verify-site.cjs`, `git diff --check`, and `scripts/check-site.py _site`. The fresh artifact has 33 files; 266 local references across 15 HTML documents checked, including fragments, refresh destinations, shared partials, social metadata assets, CSS URL references and literal JS asset paths. Generated filenames are additionally covered by a byte-for-byte check of every original build file (including PCK, WASM, workers and icons). Docs/screenshots/tools and unreferenced source artwork are not staged. The same stage/check scripts run in the Pages build; no existing main verification script was present before this work.

**Local browser:** headless Microsoft Edge on Windows, actual `_site` over local HTTP, no fabricated external resources. Eleven maintained pages at 320, 390, 768 and 1440px: no horizontal overflow, all images loaded, one main outside header, correct active section, working skip focus. All eleven also retain essential navigation/content/footer without JS at 320px. Abort/404/500 partials retain usable menus and footer; delayed successful header preserves active menu/focus. Keyboard Enter/Space, tab navigation and Escape exercised; full-size gallery links followed with Enter. Screenshots inspected individually for homepage/focus/icon comparison and in contact sheets for all page/width combinations. This does not constitute screen-reader or physical touch-device testing.

**Policy/fonts:** all ordinary page loads completed without unexpected CSP violations, JS exceptions or failed external requests. Loaded Bangers/Inter faces were observed alongside unused Unicode-subset faces, which may correctly remain unloaded. Deliberately inserted inline script was blocked; the deliberate cross-origin navigation request omitted Referer. Font files were not changed. Referrer/CSP do not apply to the unchanged generated game document.

**Video:** main has no video elements, video assets or deferred player. Lucky videos and their Play/download/retry contract are currdev-only; playback and failure recovery for those videos were not repeated or claimed here. Nothing was imported or altered. The generated game's beta redirect target was checked; gameplay, audio, actual device rendering and full Godot runtime functionality were not certified by this website pass.

**Independent review:** a separate read-only reviewer read all three ODT reports and the complete main-based diff. It found the delayed successful header/focus regression; this was fixed and a behavioral regression added. The reviewer then reported no remaining confirmed defects. A focused rerun passed after the fix; final full results are retained in `docs/qa/browser-results.json` with screenshots.

**Live checks:** [Pages run 38956180040](https://github.com/cbtechny/ninjapiraterobotalien_com/actions/runs/38956180040) succeeded October 16 for `165fa44`. Its successful deployment status records `https://ninjapiraterobotalien.com/`. Live HTTPS returned 200, and the homepage SHA-256 matched `origin/main` exactly (`625c4abff2c7eb7a3c4e642560e6486a8705f1d7cdac9b53ca95ef542ce3c49e`). HTTP and `https://cbtechny.github.io/ninjapiraterobotalien_com/` both redirected to that HTTPS custom domain. Threads returned 200 at its canonical @handle URL; Instagram, Facebook and the existing itch.io project returned 200. These are retrieval/redirect checks, not proof of authenticated social functionality. Pages settings API was unavailable to the public request (404); HTTPS redirect behavior was verified, but the account setting itself was not read. Live is the older deployed revision, not this unmerged PR.

Action tag pins were resolved through the official `actions/*` GitHub repositories' tag-ref API and verified as commit objects. No major action upgrade was mixed into the repair.

## Screenshots

- [Desktop homepage](qa/home-desktop.png)
- [Mobile homepage](qa/home-mobile.png)
- [320px without JavaScript](qa/home-nojs.png)
- [Approved icon / derivative comparison](qa/icon-comparison.png)

## Owner checklist

- Review the PR; merge/deployment require separate approval. Physical phone/tablet readability, touch, screen-reader and audible gameplay QA remain unperformed.
- Review GitHub account private-email/push settings. Repo-local noreply applies to future commits here only; existing historical copies remain public. No account-wide settings changed.
- Kit requires an approved account/public form destination, signup purpose, realistic email expectations, privacy/retention/deletion text and sender details. Verify double opt-in, bot protection, generic redirects without subscriber data, unsubscribe and sender-domain authentication before collection. Keep all private keys and subscriber exports outside this repository. No forms submitted or emails sent.
- Self-hosted fonts and generated-game policies need the specific licensing/export checks above. No release date, purchase availability or unsupported gameplay promise is implied.
