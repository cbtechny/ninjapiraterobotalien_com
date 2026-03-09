# Merge Playbook: `fix` (SEO) into `currdev` (preserve hero-banner fixes)

Use this command sequence to merge SEO work from `fix` into `currdev`, while ensuring any conflicts keep `currdev`'s existing implementation (especially hero banner HTML/CSS).

## 1) Fetch and prepare branches

```bash
git fetch --all --prune
git checkout currdev
git pull --ff-only origin currdev
```

## 2) Start merge

```bash
git merge --no-ff fix
```

If there are no conflicts, run tests/checks and commit the merge.

## 3) Conflict strategy (always prioritize `currdev` in conflicts)

For conflicted files where the `currdev` side must win:

```bash
# Keep currdev version for these files when conflicts happen
git checkout --ours index.html style.css

# If desired, keep ours for every conflict first
git checkout --ours .
```

Then manually re-add only the SEO additions from `fix` where needed (for example: meta tags in `<head>`, missing image alt text, `sitemap.xml`, `robots.txt`).

Stage and continue:

```bash
git add index.html style.css sitemap.xml robots.txt
git commit
```

## 4) What to do in `index.html` if it conflicts

Keep the hero banner block exactly as it exists in `currdev` (classes/structure/CSS hooks untouched), and incorporate SEO head tags from `fix`.

### Desired merged shape (illustrative)

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <!-- from fix (SEO) -->
  <title>Sackjack Island: Casual Card Battler | Ninja Pirate Robot Alien</title>
  <meta name="description" content="Battle quirky potatoes in Sackjack Island, a casual card battler and blackjack strategy game from Ninja Pirate Robot Alien, the studio for fun indie games.">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://ninjapiraterobotalien.com/">
  <meta property="og:title" content="Sackjack Island: Casual Card Battler | Ninja Pirate Robot Alien">
  <meta property="og:description" content="Battle quirky potatoes in Sackjack Island, a casual card battler and blackjack strategy game from Ninja Pirate Robot Alien, the studio for fun indie games.">
  <meta property="og:image" content="https://ninjapiraterobotalien.com/assets/ui/hero_banner.webp">
  <meta property="twitter:card" content="summary_large_image">
  <meta property="twitter:url" content="https://ninjapiraterobotalien.com/">
  <meta property="twitter:title" content="Sackjack Island: Casual Card Battler | Ninja Pirate Robot Alien">
  <meta property="twitter:description" content="Battle quirky potatoes in Sackjack Island, a casual card battler and blackjack strategy game from Ninja Pirate Robot Alien, the studio for fun indie games.">
  <meta property="twitter:image" content="https://ninjapiraterobotalien.com/assets/ui/hero_banner.webp">

  <!-- existing currdev links/scripts -->
  <link rel="stylesheet" href="/style.css">
</head>
<body>
  <!-- keep currdev hero banner structure and classes exactly -->
  <header class="hero-billboard">
    <div class="hero-media">
      <img src="/assets/ui/hero_banner.webp" alt="Sackjack Island: A casual card battler and funny potato game showing characters in a dramatic blackjack battle" width="1920" height="1080" style="z-index: 1;">
      <div class="hero-heat-layer" aria-hidden="true">
        <span class="hero-ember"></span>
        <span class="hero-ember hero-ember-b"></span>
      </div>
      <!-- ...rest of currdev hero drawer markup... -->
    </div>
  </header>
</body>
```

## 5) Validate and push

```bash
git status
git log --oneline --graph -n 10
git push origin currdev
```

## 6) Quick checklist after merge

- Hero banner still uses `hero_banner.webp` and current visual/CSS behavior.
- New SEO tags are present in `<head>`.
- Image `alt` text updates (if any) are retained.
- `sitemap.xml` and `robots.txt` exist and are up to date.
