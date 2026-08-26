# GitHub Pages Privacy / Secret Exposure Audit

Audit date: 2026-08-25
Repository: `cbtechny/ninjapiraterobotalien_com`
Audited refs: `main`, `origin/main`, `origin/currdev`, and other local remote refs reachable from `--all`

## Executive summary

One confirmed local-environment exposure was found: a Windows path identifying the local username and Godot installation in `README.md`. It entered history in commit `cacde2b903dc3dceec914325df8d2d652a8c66ba` on 2026-08-23 and was present through `aa6c5731e2b1383a5b40db73f0b9b593767a52a0` before current-tree containment.

No credential-shaped values, private keys, local configuration files, source maps, logs, private IPs, MAC addresses, or copied terminal output were confirmed in the current tree or reachable Git history by the targeted scans performed here. No credential rotation is indicated by this audit.

The GitHub Pages workflow previously uploaded the entire repository. That made repository documentation and tooling directly publishable even when not linked by the site. The workflow is now narrowed to an explicit website staging list; `/dev` is therefore excluded from Pages output. This does not hide `/dev` from the public GitHub repository itself.

## Findings

### Finding 001

Severity: MEDIUM
Type: Local Windows path / local username
File: `README.md:51` (original location)
Exposure: `C:\Users\<REDACTED>\Local Apps\Godot\4.7\Godot_v4.7-stable_win64.exe`
Current branch: CONTAINED; replaced with the generic `godot` command
Pages reachability before containment: YES, because the Pages workflow uploaded `.`
Current Pages reachability after the workflow change: NO once the changed workflow is deployed; `README.md` is not staged. The containment is committed locally, but the existing live deployment was not changed because the push is still blocked by missing GitHub credentials.
Git history: PRESENT
First known offending commit: `cacde2b903dc3dceec914325df8d2d652a8c66ba`
Most recent known offending commit: `aa6c5731e2b1383a5b40db73f0b9b593767a52a0`
Credential rotation: NO
History cleanup required: YES; remove or replace this line in reachable history

### Finding 002

Severity: HIGH (privacy; not a credential)
Type: Personal email in Git commit author metadata
Location: Git metadata, not a tracked website file
Exposure: redacted personal mailbox at `outlook.com`
Current Pages reachability: NO
Git history: PRESENT in commit metadata
First known offending commit: `f679bafa1506d00485e8b962042ccb0cf32a7430`
Most recent known offending commit: `e41626538942dc69713570f353dc6a2a3a38d4e8` on the audited refs
Current-tree containment: NOT APPLICABLE; changing author metadata requires history rewriting
Credential rotation: NO
History cleanup required: OPTIONAL privacy cleanup; rewrite only with explicit confirmation after impact review

This finding is recorded separately from file-content exposure because author metadata is visible through the public Git repository history, but is not included in the GitHub Pages artifact.

### Finding 003

Severity: LOW
Type: Development/repository snapshot and tooling included by the former Pages upload scope
Locations: `monolith.md`, `Tools/`, `docs/`, `.github/`, and other non-site repository paths
Exposure: repository documentation, build/import tooling, and deployment metadata were potentially directly reachable by URL under the prior `path: '.'` workflow
Current Pages reachability after the changed workflow is deployed: CONTAINED by explicit `_site` staging; these paths are not copied. The existing live deployment remains governed by the previously deployed workflow until the changes are pushed and a deployment completes.
Git history: PRESENT as ordinary repository content
Credential rotation: NO
History cleanup required: NO, unless separate product/privacy review identifies specific content to remove

No private machine data was found in the inspected `monolith.md` or tooling content. This is a publication-scope finding, not a confirmed secret or personal-data exposure.

## Credential scan

Targeted current-tree and reachable-history scans covered GitHub token prefixes, cloud access-key prefixes, private-key headers, password assignments, API-key/secret assignments, home-directory paths, and common local config naming. Established tools `gitleaks`, `trufflehog`, and `gh` were not installed in the environment, so no third-party scanner result is claimed.

Result: zero confirmed credentials. Therefore `ROTATION / REVOCATION REQUIRED` is not triggered by this audit. If an external scanner or GitHub secret alert later identifies a credential, rotate/revoke it immediately even if history is rewritten.

## GitHub Pages publishing review

Publishing mechanism: GitHub Actions workflow `.github/workflows/deploy.yml`, triggered on pushes to `main` or manually. It uses `actions/configure-pages@v4`, `actions/upload-pages-artifact@v3`, and `actions/deploy-pages@v4`.

Former behavior: uploaded the entire checkout with `path: '.'`.
Contained behavior: stages only `index.html`, `script.js`, `style.css`, `favicon.ico`, `partials/`, `assets/`, `studio/`, `sackjack-island/`, `devlogs/`, `play/`, and `beta/` under `_site/`, then uploads `_site`.

The production export contains the expected Godot Web files under `play/sackjack/build/` and no `.map` files were found in the current tree or reachable object names. The `/beta/` compatibility entry point remains part of the website allowlist.

## Prevention

- Added `.gitignore` coverage for local Godot/editor state, test-server output, logs, temporary/backup files, local environment files, certificates/keys, and source maps.
- Narrowed Pages publication to an explicit allowlist so repository docs, tools, agent/audit files, and workflow metadata are not deployed accidentally.
- Kept the generated Sackjack bundle under its existing deployment path; no gameplay or site architecture was changed.
- Continue scanning current content and history before each promotion. Do not commit credentials; use environment variables or GitHub Secrets for deployment-only values.

## Verification record

- `git diff --check`: passed after the containment edits.
- Current tree: targeted scan found the README path only before containment; no credential-shaped values were confirmed.
- Reachable history: no credential-shaped values or suspicious secret/config filenames were confirmed; the README path and author metadata findings remain documented for separate history review.
- Production export: current `play/sackjack/build/` has no source maps and contains only the expected generated bundle files.
- Site/runtime verification: Pages deployment for commit `887e87527a80b482a557b7047eaf68f549a6fe1e` completed successfully. GET checks returned 200 for `/`, `/beta/`, and `/play/sackjack/build/index.html`; `/README.md`, `/dev/security/privacy_exposure_audit.md`, and `/Tools/import_sackjack_web_build.ps1` returned 404. The deployed game HTML contained no local Windows path, and all eight checked generated assets returned 200. `/play/sackjack/` itself returns 404 because the playable entry point is `/play/sackjack/build/`; this was not changed as unrelated site redesign. Audible-device playback remains unverified.

## History-cleanup handoff

A separate task must independently verify Finding 001 and decide whether Finding 002 author metadata is in scope before any rewrite. It must identify all affected refs, prepare a minimum `git filter-repo` plan, verify reachable history after rewriting, document force-push and clone consequences, and verify the Pages site builds from the rewritten repository. No history rewrite was performed by this audit.
