# Narrow Pages manifest. Source artwork and temporary recordings stay in Git.
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / '_site'
FILES = ['index.html', 'script.js', 'effects.js', 'style.css', 'favicon.ico', 'sitemap.xml', 'robots.txt', 'assets/images/about/npra-studio-workshop.webp', 'assets/images/batata-spud-royale-logo.webp', 'assets/images/devlog/building-the-island.webp', 'assets/images/devlog/horizontal_2_junglevines.webp', 'assets/images/gallery/potatoes-characters.png', 'assets/images/gallery/sackjack-island-title.png', 'assets/images/home/ace-roster-v2.webp', 'assets/images/home/batata-hero-v2.webp', 'assets/images/home/horizontal_3_party.webp', 'assets/images/home/ninja_panel.webp', 'assets/images/home/pampa-roster-v2.webp', 'assets/images/placeholders/devlog-feature-placeholder.png', 'assets/images/shared/potato-island-construction.webp', 'assets/images/social/facebook.webp', 'assets/images/social/instagram.webp', 'assets/images/social/threads.webp', 'assets/videos/luckys/ace-lucky.mp4', 'assets/videos/luckys/ace-preview.webp', 'assets/videos/luckys/pampa-lucky.mp4', 'assets/videos/luckys/pampa-preview.webp']
DIRS = ['partials', 'studio', 'sackjack-island', 'devlogs', 'about', 'devlog']

def stage():
    # No recursive deletion: each verification run must use a fresh output directory.
    if DEST.exists():
        raise SystemExit('_site already exists; move it aside before staging again.')
    DEST.mkdir()
    for name in FILES:
        target = DEST / name
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(ROOT / name, target)
    for name in DIRS:
        source = ROOT / name
        for item in source.rglob('*'):
            # Public pages/partials and the existing generated bundle only.
            if item.is_file() and (item.suffix == '.html' or name == 'play/sackjack/build'):
                target = DEST / item.relative_to(ROOT)
                target.parent.mkdir(parents=True, exist_ok=True)
                shutil.copy2(item, target)
    print(f'Staged {sum(p.is_file() for p in DEST.rglob("*"))} files')

if __name__ == '__main__':
    stage()
