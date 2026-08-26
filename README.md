# Ninja Pirate Robot Alien Games

Welcome to the official website repository for **Ninja Pirate Robot Alien** - a game development studio creating vibrant, explosive games with modular design and comic-book aesthetics.

## 🎮 About

N.P.R.A. Games is dedicated to creating games with explosive energy and modular design. We believe in transparent development, sharing our process through devlogs and interactive demos.

### Current Projects

- **Sackjack Island** - A vibrant adventure game featuring dynamic gameplay and blackjack and potatoes...

## 🚀 Site Features

- Modern, responsive design with vibrant gradients and bold typography
- Comic-book inspired aesthetic
- Interactive project showcases and demos
- Development blog (devlogs)
- Studio information and contact pages

## 🛠️ Technology Stack

- **HTML5** - Semantic markup with modular partials
- **CSS3** - Custom styles with CSS variables and gradients
- **Vanilla JavaScript** - Dynamic content loading and interactivity
  
## 📂 Site Project Structure

```
.
├── index.html              # Main landing page
├── style.css              # Global styles with comic-book aesthetic
├── script.js              # Main JavaScript functionality
├── partials/              # Reusable HTML components (header, footer)
├── assets/                # Static assets (images, logos, UI elements)
├── play/sackjack/build/   # Canonical generated Sackjack Web export
├── beta/                  # Compatibility redirect to the canonical build
├── sackjack-island/       # Sackjack Island project pages
├── devlogs/               # Development blog posts
└── studio/                # Studio information pages
```

## Sackjack Web releases

The Sackjack source repository is the source of truth. Its `Web` preset exports a complete generated bundle to `build/web/`; this repository only stores the promoted deployment copy under `play/sackjack/build/`.

From the Sackjack repository, create a release export with Godot 4.7:

```powershell
New-Item -ItemType Directory -Force build/web | Out-Null
godot --headless --path . --export-release Web build/web/index.html
```

Then, from this repository, validate and import it:

```powershell
.\Tools\import_sackjack_web_build.ps1
git status --short
git diff --name-only -- play/sackjack/build
```

The importer defaults to `..\Sackjack-MOBILE\sackjack-mobile-main\build\web`. Pass `-SourcePath` when the source checkout is elsewhere. It validates the generated configuration and runtime files, stages and hashes the complete bundle, and replaces only `play/sackjack/build/`. Do not hand-edit or rename files inside that directory.

The existing `/beta/` URL is retained as a relative redirect to `/play/sackjack/build/`. Normal future releases do not modify `beta/`.

**Live Site:** https://cbtechny.github.io/ninjapiraterobotalien_com/

## 📝 License

Copyright © 2024 NinjaPirate Studio. All rights reserved.

## 🤝 Contact

- **Website:** [ninjapiraterobotalien.com](https://ninjapiraterobotalien.com)
- **Studio Pages:** [About](studio/about.html) | [Contact](studio/contact.html)

---

Made with 💥 by NinjaPirate Studio
