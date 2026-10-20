# Sitewide verification — October 19, 2026

Checked the encoding-fix branch against the live site. No additional functional
defects were found within the checks below. PR #46 was merged during the audit;
a subsequent live homepage request exactly matched the repaired preview.

- All 15 live HTML files (13 page routes plus two shared partials) returned 200
  with UTF-8 headers. The 14 files other than the homepage exactly matched the
  checked preview and contained no detected encoding corruption. This initial
  comparison preceded the PR #46 deployment; the homepage matched on recheck.
- All 25 other published files returned 200, including scripts, styles, images,
  and both gameplay videos.
- Threads, Instagram, Facebook, and itch.io returned 200. Threads redirects to
  the expected `@ninjapiraterobotalien` profile. HTTP responses establish reachability,
  not account ownership or the experience of a logged-in social-app user.
- Staged validation passed 180 references across 15 HTML files: assets, internal
  links, fragment destinations, and publication exclusions.
- Every page route passed browser checks at 320, 390, 768, and 1440 pixels: 52
  route/width combinations. Checks include legacy redirect destinations, UTF-8,
  rendered text corruption, horizontal overflow, loaded images and alt attributes,
  document title/description, heading/main structure, link names, mobile menus,
  font loading, local request failures, and JavaScript exceptions.
- Inspected mobile and desktop screenshot overviews of all six content pages.
- The existing media suite passed six homepage widths (320–1440), both videos'
  playback, fullscreen, replay, keyboard disclosures, video failure/retry,
  JavaScript-disabled fallbacks, and reduced motion. No page errors or failed
  resource responses were reported.

## Repeat the checks

Stage a fresh preview with `scripts/stage-site.py`, following its existing-output
instructions. Run `python scripts/check-site.py _site`, serve `_site` locally,
and set `SITE_URL` to that server. With Playwright and Edge available, run:

```
node scripts/verify-sitewide.cjs
node scripts/verify-batata-site.cjs
```

`SITE_ROOT` optionally selects a staging directory other than `_site` for the
sitewide check. Results and screenshots are written under ignored `.test-server/`.
The sitewide checker discovers page routes from staged HTML rather than a fixed list.

These are Edge browser and HTTP checks, not a full accessibility certification,
audible playback assessment, or physical-device Safari/Threads test. A Threads
in-app check of the repaired homepage is still needed. This agent did not merge
or deploy; PR #46 was merged concurrently while verification was running.
