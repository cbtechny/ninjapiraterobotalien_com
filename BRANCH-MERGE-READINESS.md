# Branch Merge Readiness Audit: BATATA: Spud Royale Name Reveal

This report provides a comprehensive, report-only audit comparing `origin/main` and `origin/currdev` for `cbtechny/ninjapiraterobotalien_com` in preparation for the planned **BATATA: Spud Royale** name reveal.

---

## 1. Branch Identification and Merge Base

| Branch Ref | Commit SHA | Description |
| :--- | :--- | :--- |
| `origin/main` | `a9e4fa26006a58f7bcd7db259d8de68f0f274571` | Production / deployed branch (contains Godot WASM export and security audit docs) |
| `origin/currdev` | `ad3c27fe72540614a426316357cd8bbc977cfeac` | Primary redesign development branch (contains updated UI, IA, and styles) |
| **Merge Base** | `f0253a4b5c9750fe7aca89e5a89cc4cdc3b80651` | Common ancestor (`Merge pull request #19`) |

### Divergence Verification
- **`origin/currdev` ahead of Merge Base:** 65 commits (`git rev-list --count f0253a4b5c9750fe7aca89e5a89cc4cdc3b80651..origin/currdev`)
- **`origin/main` ahead of Merge Base:** 11 commits (`git rev-list --count f0253a4b5c9750fe7aca89e5a89cc4cdc3b80651..origin/main`)

*Note: The actual merge base commit is `f0253a4b5c9750fe7aca89e5a89cc4cdc3b80651`. The earlier estimate of `65 commits ahead and 11 behind` is accurate relative to this common ancestor.*

---

## 2. Summary of Unique Changes by Branch

### A. Unique to `origin/main` (11 commits)

1. **Godot Web Export & WASM Playable Build:**
   - Adds playable Godot 4.7 WebAssembly release build under `play/sackjack/build/` (`index.html`, `index.js`, `index.wasm`, `index.pck`, `index.apple-touch-icon.png`, `index.icon.png`, `index.png`, `index.audio.worklet.js`, `index.audio.position.worklet.js`).
   - Adds build automation script `Tools/import_sackjack_web_build.ps1` (PowerShell script for importing Godot HTML5 exports).
2. **Beta Testing Endpoint:**
   - Adds `/beta/index.html` acting as a responsive container / launcher for the Sackjack Web export.
3. **Security Audit & Privacy Containment Documentation:**
   - Adds privacy exposure audit logs in `dev/security/privacy_exposure_audit.md` and history cleanup plan in `dev/security/git_history_path_cleanup_plan.md`.
   - Modifies `.gitignore` to exclude local editor files, logs, and build artifacts.
4. **Repository Monolith Artifact:**
   - Adds `monolith.md` (2,676 lines), a text snapshot of repository source files.

### B. Unique to `origin/currdev` (65 commits)

1. **Information Architecture (IA) Reorganization:**
   - Consolidated legacy routes (`/studio/*`, `/sackjack-island/*`, `/devlogs/*`) into clean redesign routes:
     - Root Homepage: `index.html`
     - Studio & Game About: `about/index.html`
     - Devlog Hub & Posts: `devlog/index.html`
2. **Component Architecture & Dynamic Loading:**
   - Refactored global layout to fetch partials dynamically (`partials/header.html`, `partials/footer.html`) via `script.js`.
   - Replaced legacy dark/pink theme with centralized Tropical Beach theme variables in `style.css` (`--bg-primary: #0F3D3E`, `--accent-primary: #FF7A3C`, `#E0A84E`).
3. **SEO & Discovery Assets:**
   - Adds root `sitemap.xml` and `robots.txt`.
   - Added canonical tags and 0-second meta-refresh redirects across legacy HTML pages in `/studio/` and `/sackjack-island/`.
4. **Visual Assets & Marketing Documentation:**
   - Adds high-resolution WebP banner assets under `assets/images/home/`, `assets/images/devlog/`, `assets/images/about/`.
   - Adds visual marketing audit report in `docs/visual-marketing-audit.md`.

---

## 3. Simulated Merge & Conflict Diagnosis

### Merge Command Simulated
Simulated in a disposable worktree (`git worktree add /tmp/sim-merge origin/currdev`):
```bash
git merge origin/main --no-commit --no-ff
```

### Result
- **Status:** **Automatic merge failed** due to 1 content conflict.
- **Clean Merges:** 16 files merged automatically without conflict (e.g., `README.md`, `Tools/import_sackjack_web_build.ps1`, `beta/index.html`, `play/sackjack/build/*`, `dev/security/*`, `monolith.md`).

### Direct Conflict Detail

#### Conflicted File: `.github/workflows/deploy.yml` (Lines 33–47)

```diff
<<<<<<< HEAD
      - name: Stage public website
        run: |
          mkdir _site
          cp -R index.html script.js style.css favicon.ico sitemap.xml robots.txt partials assets studio sackjack-island devlogs about devlog _site/
=======
      - name: Stage public website
        run: |
          mkdir _site
          cp -R index.html script.js style.css favicon.ico partials assets studio sackjack-island devlogs play beta _site/
>>>>>>> origin/main
```

```diff
<<<<<<< HEAD
          # Publish only the redesign website, not repository docs, tooling, or development metadata.
=======
          # Publish only the website, not repository docs, tooling, or development metadata.
>>>>>>> origin/main
```

### Recommended Conflict Resolution

Combine the staging lists so that both redesign paths (`about`, `devlog`, `sitemap.xml`, `robots.txt`) and interactive build endpoints (`play`, `beta`) are included in `_site/`:

```yaml
      - name: Stage public website
        run: |
          mkdir _site
          cp -R index.html script.js style.css favicon.ico sitemap.xml robots.txt partials assets studio sackjack-island devlogs about devlog play beta _site/

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          # Publish only the redesign website, not repository docs, tooling, or development metadata.
          path: '_site'
```

---

## 4. Semantic Conflict and Integration Risk Analysis

While Git merges 16 files cleanly, several critical **semantic conflicts** occur where clean merges break functionality or visual design:

### 1. Navigation Orphan Risk (Missing Play/Beta Links)
- **Issue:** `partials/header.html` on `origin/currdev` defines navigation links for `Home`, `Devlog`, and `About`:
  ```html
  <li><a href="/index.html" data-nav="home">Home</a></li>
  <li><a href="/devlog/index.html" data-nav="devlog">Devlog</a></li>
  <li><a href="/about/index.html" data-nav="about">About</a></li>
  ```
- **Risk:** Incoming WASM build files under `/play/sackjack/build/` and `/beta/` will be cleanly merged into the filesystem, but **no user-facing navigation link** will point to them.
- **Resolution:** Add a primary CTA button or navigation item in `partials/header.html` or `index.html` pointing to `/play/sackjack/build/index.html` or `/beta/index.html`.

### 2. Missing Public Staging Output
- **Issue:** If `.github/workflows/deploy.yml` is merged using `origin/currdev`'s version without incorporating `main`'s staging directories, `play/` and `beta/` will **not** be copied to `_site/`.
- **Risk:** `/play/sackjack/build/` will return HTTP 404 on the published GitHub Pages site despite existing in the Git repository.

### 3. Styling Isolation & Theme Mismatches
- **Issue:** `/play/sackjack/build/index.html` and `/beta/index.html` use legacy or default Godot canvas embedding styles without site-wide header/footer wrappers or `style.css` variables.
- **Risk:** Navigating directly to `/beta/` or `/play/sackjack/build/` breaks visual continuity with the dark blue / tropical beach redesign theme.

### 4. Repository Snapshot Bloat (`monolith.md`)
- **Issue:** `origin/main` contains `monolith.md` (2,676 lines), a generated snapshot of text source files.
- **Risk:** Bloats pull requests and repository size. Per project memory, `monolith.md` is a temporary snapshot artifact that should be excluded from production deployments and commits.

### 5. Brand Identity Alignment for "BATATA: Spud Royale" Name Reveal
- **Current State across both branches:**
  - `index.html` (currdev line 7): `<title>Sackjack Island: Casual Card Battler | Ninja Pirate Robot Alien</title>`
  - `devlogs/posts/002.html` (main line 28): references "blackjack tournament in the spud world"
  - `docs/redesign/*`: uses "Sackjack Island" as the flagship title.
- **Transition Strategy:**
  - Retain "Sackjack Island" as the setting/lore location or secondary subtitle during transition, while updating primary `<h1>`, `<title>`, and `<meta property="og:title">` to **BATATA: Spud Royale** (or **BATATA: Spud Royale (formerly Sackjack Island)**).
  - Add 301/meta-refresh redirects or canonical references if URL endpoints are renamed from `sackjack` to `batata`.

---

## 5. GitHub Pages and Deployment Pipeline Inspection

### Workflow Configuration (`.github/workflows/deploy.yml`)
- **Triggers (Lines 3–9):**
  ```yaml
  on:
    push:
      branches: ["main"]
    workflow_dispatch:
  ```
- **Publishing Branch:** Deployments trigger **only** on pushes to `main` or via manual `workflow_dispatch`.
- **Public Exposure Risk on `currdev`:** **Zero.** Pushing commits to `origin/currdev` will **NOT** trigger a GitHub Pages build or publish any content publicly.

### CNAME & Custom Domain Configuration
- **CNAME File Inspection:** Neither `origin/main` nor `origin/currdev` contains a `CNAME` file.
- **Domain Endpoint:** The site is deployed via default GitHub Pages configuration at `https://ninjapiraterobotalien.com/` (or `https://cbtechny.github.io/ninjapiraterobotalien_com/`).

---

## 6. Recommended Safe Integration Sequence

To preserve all relevant work from both branches and ensure a seamless name reveal for **BATATA: Spud Royale**, follow this sequence:

```
Step 1: Create Integration Branch (`feature/batata-spud-royale-merge`) from `origin/currdev`
Step 2: Merge `origin/main` into Integration Branch
Step 3: Resolve `.github/workflows/deploy.yml` Conflict (Include `play` and `beta` in `cp -R`)
Step 4: Update Navigation Partial (`partials/header.html`) & Home CTA for Game Access
Step 5: Execute "BATATA: Spud Royale" Copy & Metadata Updates
Step 6: Verify via Local Server & Playwright End-to-End Tests
Step 7: Merge Integration Branch into `main` to Deploy
```

### Detailed Execution Steps

1. **Checkout Isolated Branch:**
   ```bash
   git checkout -b feature/batata-spud-royale-merge origin/currdev
   ```
2. **Merge `origin/main`:**
   ```bash
   git merge origin/main --no-ff
   ```
3. **Resolve `deploy.yml` Conflict:**
   Ensure `cp -R` copies `index.html script.js style.css favicon.ico sitemap.xml robots.txt partials assets studio sackjack-island devlogs about devlog play beta _site/`.
4. **Update Branding & Metadata for BATATA Name Reveal:**
   - Update `index.html` title & OpenGraph tags:
     - Title: `BATATA: Spud Royale | Casual Card Battler | Ninja Pirate Robot Alien`
     - Meta description: `Battle quirky potatoes in BATATA: Spud Royale, a casual card battler and blackjack strategy game...`
   - Update `partials/header.html` brand title if appropriate.
   - Update `sitemap.xml` to include `/play/sackjack/build/index.html` and `/beta/index.html`.
5. **Clean Up Snapshot Artifacts:**
   Remove `monolith.md` before final promotion if unwanted in production tracking.

---

## 7. Release Blockers, Verification Checklist, and Rollback Procedure

### Release Blockers
1. **Unresolved `.github/workflows/deploy.yml` Conflict:** A failed or improper merge will break deployment or omit `/play/` / `/beta/` WASM builds from public hosting.
2. **Orphaned WASM Game Build:** Merging without adding user-facing links to `/play/sackjack/build/index.html` renders the game inaccessible to site visitors.
3. **MIME Type Handling for WASM:** Ensure GitHub Pages serves `.wasm` with `application/wasm` header (handled automatically by GitHub Pages for standard builds).

### Pre-Merge Verification Checklist
- [ ] Run local HTTP server (`python3 -m http.server 8080`) and verify GET requests return 200 for:
  - `/` (Redesign Homepage)
  - `/about/index.html`
  - `/devlog/index.html`
  - `/play/sackjack/build/index.html` (Godot WASM runner)
  - `/beta/index.html`
  - `/sitemap.xml` and `/robots.txt`
- [ ] Verify `partials/header.html` and `partials/footer.html` load asynchronously on all pages.
- [ ] Verify WCAG AA color contrast compliance (`#0F3D3E` dark teal background with `#FF7A3C` sunset orange / `#E0A84E` warm gold accents).
- [ ] Verify 0-second meta-refresh redirects on legacy paths (`/studio/about.html`, `/sackjack-island/index.html`).

### Rollback Procedure

If the deployment of the merged `main` branch introduces breaking defects in production, execute the following rollback:

1. **Locate Target Known-Good Commit SHA:**
   - Previous verified `main` commit: `a9e4fa26006a58f7bcd7db259d8de68f0f274571`.
2. **Execute Revert or Reset:**
   - **Option A (Clean Revert Commit - Recommended for shared repositories):**
     ```bash
     git checkout main
     git revert -m 1 <MERGE_COMMIT_SHA>
     git push origin main
     ```
   - **Option B (Hard Reset - Requires force-push permission):**
     ```bash
     git checkout main
     git reset --hard a9e4fa26006a58f7bcd7db259d8de68f0f274571
     git push origin main --force-with-lease
     ```
3. **Re-trigger GitHub Pages Deployment:**
   - Go to GitHub Repository -> Actions -> Deploy to GitHub Pages -> Run workflow on `main`.

---

## 8. Unverified Items & External Scope Disclaimers

1. **Live GitHub Repository Settings / Secrets:** Could not inspect GitHub repository secret settings or environment-level protection rules (requires GitHub API token with admin/repo scope).
2. **Audible Audio Playback in Godot WASM Build:** WebAudio context initialization requires user interaction in modern browsers; audio playback was not tested in automated headless browser environments.
3. **Third-Party Domain DNS / SSL State:** CNAME is not present in the repository; custom domain routing relies on external GitHub Pages DNS settings which cannot be checked via Git history.
