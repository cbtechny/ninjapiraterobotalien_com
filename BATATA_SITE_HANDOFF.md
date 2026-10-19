# Batata website handoff

Current main-based repair, October 18, 2026. This replaces older descriptions of the website for this branch only; `currdev` has a separate redesign and its own historical handoff.

The source base is `origin/main` at `165fa44`. No `currdev` or `carddev` changes were merged. Three small icon derivatives were made from approved `currdev` social assets; no redesign or gameplay media was imported.

The current homepage is the name-reveal layout plus a direct Threads CTA, secondary gameplay anchor, development/platform qualification and static update links. There are no homepage videos on main. The deferred Lucky videos, pale panels, roster, effects preference and `renderLatestIntel` fetcher belong to currdev, not this branch.

Every maintained content page has a complete static header/footer, skip link and main landmark. Shared partial fetches check HTTP status; failure retains the static content. Navigation initializes before fetch and after successful header replacement. Keep fallback markup synchronized with the partials. The menu uses an associated button, native hidden/inert state, Escape and focus restoration; without JavaScript, navigation is expanded and the toggle is hidden.

The live authoritative URL is https://ninjapiraterobotalien.com/. The October 18 check confirmed both HTTP and the GitHub Pages project URL redirect there. Deployment run 38956180040 succeeded for `165fa44` on October 16. This PR is not deployed. The generated Godot build stays under its existing path, with identical bundle bytes.

Publication uses an explicit asset manifest and selected website directories. Source-only PNGs, temporary recordings, asset documentation, repository docs and tooling are not staged. Gallery images and social derivatives are public delivery assets. Future asset changes must update the manifest and pass staging/reference checks, including CSS/JS references. No original assets were deleted.

Maintained HTML uses no-referrer and a meta CSP: same-origin scripts, no inline script permission, same-origin images/media/fetch, Google Fonts stylesheet/font hosts, no objects, no base URL and no form submissions. Inline styles remain allowed because existing pages author them extensively. Meta CSP does not provide `frame-ancestors` or other header-only protections. The generated game is exempt from this website CSP/referrer pass: it has inline bootstrap code, workers and WebAssembly, and must be assessed at the Godot export boundary rather than hand-edited.

Google Fonts are retained: exact Bangers/Inter browser subset files, corresponding redistribution notices and cross-browser visual equivalence have not been packaged and verified. Self-hosting is deferred; Google continues to receive font requests. Do not substitute an approximate font or invent license coverage.

Repository-local future commit email now uses the GitHub noreply identity verified against account ID 81199503, login cbtechny and existing commits. Global settings were not changed. Prior personal author email and local paths remain historical exposure; no history rewriting or credential rotation was performed. Public studio contact information remains intentional.

Owner checklist:

- Review GitHub private-email and push-protection preferences; repository configuration does not change account-wide settings or historical copies.
- Before any Kit work, approve the public form destination/account, purpose and email expectations, privacy/retention/deletion language and sender contact details. Verify double opt-in, bot protection, unsubscribe and sender-domain authentication. Disable subscriber data in redirect URLs, use a generic thank-you page and keep credentials/subscriber exports outside this public repository. No forms were submitted and no emails were sent.
- Approve merge/deployment separately. Physical mobile/device and audible game checks remain owner QA.
