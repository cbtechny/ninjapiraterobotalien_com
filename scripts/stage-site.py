# Narrow Pages manifest. Source artwork and temporary recordings stay in Git.
from pathlib import Path
import shutil

ROOT = Path(__file__).resolve().parents[1]
DEST = ROOT / '_site'
FILES = ['index.html', 'script.js', 'style.css', 'favicon.ico', 'sitemap.xml', 'robots.txt',
         'assets/images/Potatoes_1-18-26.png', 'assets/images/SackjackIsland_Title_1-18-26.png',
         'assets/images/social/facebook.webp', 'assets/images/social/threads.webp', 'assets/images/social/instagram.webp']
DIRS = ['partials', 'studio', 'sackjack-island', 'devlogs', 'play/sackjack/build', 'beta']

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
