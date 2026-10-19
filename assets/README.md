# Website assets

Source artwork, original recordings and documentation stay in Git. Pages publishes only the referenced delivery files explicitly listed in `scripts/stage-site.py`, not this directory recursively. Update that manifest when changing HTML, CSS or JavaScript asset references, then check the actual staged output.

`images/social/*.webp` are 64px, proportion-preserving derivatives of the approved brand icons already in this branch. They display at 20–24px. Source sizes total 279,496 bytes; derivatives total 9,230 bytes (96.7% smaller). Existing originals are unchanged. Temporary recordings under assets/tmp and other unreferenced source art are excluded from Pages.
