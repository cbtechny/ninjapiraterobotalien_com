# Link hub assets

`/links/` is a standalone, script-free page published by `scripts/stage-site.py` and the existing GitHub Pages workflow.

Local assets in `assets/images/links/`:

- `avatar.png`: public GitHub avatar downloaded from https://github.com/cbtechny.png.
- `instagram.webp`, `threads.webp`, `facebook.webp`: existing official brand emblems from `assets/images/about/brand_icons/`.
- `github.svg`, `itchdotio.svg`, `tiktok.svg`: Simple Icons SVGs from https://github.com/simple-icons/simple-icons/tree/develop/icons (CC0).
- `ace.webp`, `pampa.webp`: transparent cutouts made with the built-in ImageGen tool from the existing `ace-roster-v2.png` and `pampa-roster-v2.png` portraits; split and resized to 600px-wide WebP files. The original portraits remain unchanged.

ImageGen prompt:

> Use case: background-extraction. Extract the two existing potato characters from these reference images into one transparent PNG asset sheet: Ace on the left half, Pampa on the right half, with a clear transparent gap between. Remove all background burst artwork and the flying playing card. Preserve each character's exact illustrated design, colors, black outlines, expression, hat, hair, eyes, moustache, proportions and face. No redesign or new pose. Complete clean cutout silhouettes, sharp edges, no text or added objects. Both faces fully visible. Transparent background.

Validation: staged reference checker; Edge screenshots at 320, 390, 768 and 1440px; loaded images, no horizontal overflow, art/link separation, skip-link keyboard navigation. All eleven supplied HTTPS destinations returned HTTP 200 on November 8, 2026; social services can still gate content by login or region.

## Card redesign — November 8, 2026

The heading now reads “Ninja Pirate Robot Alien” with “Links” beneath it. Removed the small Batata logo, Batata website link, Instagram section, and separate jam link. The Clocks in Orange card links directly to the game and retains the Lilith/Packy credit. Threads is presented as the personal devlog. TikTok uses the user-confirmed `@ninjapiraterobotalien` handle; its automated destination check returned HTTP 403, so account content was not verified.

All destinations, including email, are now cards. Existing cutouts peek through clipped page edges; no new generated artwork was needed. Edge checks passed at 320, 390, 768, 980, 1024, 1100, 1440 and 1920px: images loaded, no horizontal overflow, visible art stayed clear of cards, and all ten cards were keyboard reachable with visible focus. The staged reference checker passed.

## Featured and follow revision — November 8, 2026

The first four cards now share one Featured section and consistent card styling; Clocks in Orange retains the gold highlight. Instagram is restored and featured alongside TikTok, with Threads third. The social introduction asks visitors to follow and share to support better games and the goal of making games full time. All eleven cards passed keyboard focus checks and all eight responsive widths above passed image, overflow, and art separation checks. The staged reference checker passed.

## Light visual and follow polish — November 8, 2026

Added an introductory shortcut to the follow section, tightened its support message, and gave Instagram/TikTok visible Follow pills and narrow accent borders. Card shadows are slightly stronger. Each social card remains one anchor; the pills are visual cues within that link. No scripts, services, or artwork were added. Staging, 320/390/768/1440px layouts, image loading, art separation, pill containment, all eleven keyboard-accessible cards, and the follow shortcut passed checks. This is a design refinement; no conversion measurement is claimed.
