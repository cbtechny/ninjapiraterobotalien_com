# Website delivery assets

Source artwork is retained here for authoring and historical reference. Pages publishes only the images explicitly listed in `scripts/stage-site.py`; it does not recursively publish this directory or this documentation.

The title and potato gallery PNGs are referenced public delivery assets. Unreferenced `hmpganim` and `placeholders` files remain source-only. Temporary originals must never be added to the publication manifest.

`images/social/*.webp` are 64×64 derivatives of the approved Facebook, Threads and Instagram WebPs in currdev at `9b72b9f`. They preserve proportions, alpha and brand artwork, contain no added metadata, and display at 24px with text labels on Contact. The black Threads mark has a white backing in CSS. Sources total 279,496 bytes; derivatives total 9,230 bytes. No original source was changed or deleted.

When adding assets, verify HTML, CSS and JavaScript references against the staged output and inspect the browser appearance. Keep source-only exports outside the manifest.
