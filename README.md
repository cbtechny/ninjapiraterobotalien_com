# Batata website

Static HTML, CSS and vanilla JavaScript for Ninja Pirate Robot Alien and **Batata: Spud Royale**, a single-player blackjack battler in development. Google Play and Amazon Fire tablets are planned platforms; release timing and device support remain unconfirmed.

Production: [ninjapiraterobotalien.com](https://ninjapiraterobotalien.com/). The GitHub Pages project URL redirects here. This was verified October 18, 2026, against the successful Pages deployment of `165fa44`. Origin-root navigation is intentional.

The homepage retains the name-reveal design and approved artwork, with a direct Threads follow action, a short gameplay explanation and static devlog links. Earlier Sackjack Island pages and browser builds are historical; they do not describe the forthcoming mobile release. No purchases, subscriptions, analytics or Kit integration are provided.

- `partials/`: shared header/footer; complete static copies remain usable if JavaScript or fetch fails.
- `devlogs/`: current devlog hub and historical articles.
- `sackjack-island/`: clearly labeled legacy pages, gallery and historical build entry.
- `play/sackjack/build/`: existing generated Godot export; never hand-edit for website polish.
- `scripts/stage-site.py`: explicit Pages publication manifest; excludes source-only assets and docs.
- `scripts/check-site.py`: checks the actual staging output and generated bundle hashes.
- `scripts/verify-site.cjs`: browser checks; requires Playwright and Microsoft Edge (or adjust launch locally).

Local verification (Python 3, Node.js and Playwright):

```sh
python scripts/stage-site.py
python scripts/check-site.py _site
python -m http.server 8895 --directory _site
# In another terminal:
node --check script.js
node scripts/verify-site.cjs
```

Use `SITE_URL` to point the browser checker at a different local port. Move an existing `_site` aside before restaging. Screenshots and browser JSON go under ignored `.test-server/qa/`. These are desktop browser checks, not physical-device or audible-audio certification.

Pages runs on pushes to `main`; the build has read permission, and only the deployment job has Pages/OIDC write permission. Reviewed changes go through a PR; do not merge or deploy without owner authorization. See [handoff](BATATA_SITE_HANDOFF.md) and [verification](docs/repair-verification.md).

Public studio contact: [contact page](https://ninjapiraterobotalien.com/studio/contact.html), info@ninjapiraterobotalien.com.

Copyright © Ninja Pirate Robot Alien. All rights reserved.
