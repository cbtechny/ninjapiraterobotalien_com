# Git History Cleanup Plan: Confirmed Local Path

Status: prepared, not executed
Scope: Finding 001 only
Date: 2026-08-26

## Confirmed scope

Replace the machine-specific Godot command in `README.md` with the generic command already present in the containment commit.

Confirmed affected reachable refs:

- `refs/heads/main`
- `refs/remotes/origin/main`
- `refs/remotes/origin/HEAD`

No tags or other remote branches reach the offending commit. The personal author-email metadata finding is explicitly excluded from this cleanup.

## Rewrite procedure

Perform in a fresh disposable mirror clone, never in the current dirty checkout:

1. Clone the repository with `--mirror`.
2. Create a backup of the mirror and record the pre-rewrite refs.
3. Use `git filter-repo` to change only the offending `README.md` blob content; do not alter unrelated files, commits, branches, or tags.
4. Verify the local-path pattern returns zero matches across all rewritten reachable refs without printing matching content.
5. Verify the replacement command is present in the rewritten `README.md` history.
6. Expire reflogs and prune unreachable objects only in the disposable mirror, then run `git fsck --full --no-reflogs`.
7. Produce the exact ref update list and a force-push command using `--force-with-lease`.

Do not force-push until the rewritten mirror and ref list have been reviewed and explicitly approved. Existing clones, forks, cached objects, pull requests, and old Pages artifacts may retain the original commit and require separate handling.

## Secret-safe verification

Verify by commit IDs and counts only. Do not print the old path or any private value in command output, reports, commit messages, or pull requests. Confirm:

- zero reachable-history matches for the original local-path pattern;
- no unintended branch/tag changes;
- current-tree scans still find zero credentials and no production source maps;
- the Pages workflow stages only the public website allowlist after the rewrite.

## Deployment consequence

After an approved rewrite and force-push, redeploy GitHub Pages and recheck `/`, `/beta/`, `/play/sackjack/`, and the Sackjack Web export. This plan does not authorize the rewrite, force-push, or deployment.
