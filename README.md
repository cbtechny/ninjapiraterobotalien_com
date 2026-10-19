# Batata website

Static HTML/CSS/vanilla JavaScript for Batata! Spud Royale, a single-player blackjack battler in development. Google Play and Amazon Fire tablets are planned; timing/device support remain unconfirmed. Earlier itch.io builds are historical, not the forthcoming mobile release.

Production: https://ninjapiraterobotalien.com/. HTTP and the GitHub Pages project URL were verified redirecting here on October 18, 2026; root-relative paths are intentional. The live revision is main at 165fa44, distinct from this currdev repair.

The existing currdev design, art, gameplay wording and two click-to-load video demos are preserved. Threads is the direct hero action. No JS is required for navigation, explanations, previews or static updates. Shared partials enhance complete fallbacks; HTTP/network failures leave navigation usable.

`python scripts/stage-site.py` creates `_site`; `python scripts/check-site.py _site` checks publication completeness, including CSS/JS asset references. Move an existing output aside before restaging. Serve with `python -m http.server 8897 --directory _site`. Set `SITE_URL=http://127.0.0.1:8897` before running either browser script. Playwright/Microsoft Edge checks live in `scripts/verify-batata-site.cjs` and `scripts/verify-repair.cjs`. JS syntax and `git diff --check` are also required.

Pages deploys only on main pushes/manual workflow, with write permissions limited to deploy. This PR targets currdev and does not deploy. See [handoff](BATATA_SITE_HANDOFF.md) and [repair evidence](docs/currdev-repair-verification.md). Intentional public contact: info@ninjapiraterobotalien.com. No Kit, analytics or email collection is integrated.
