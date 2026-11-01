---
target: homepage
total_score: 27
max_score: 40
na_heuristics: 
p0_count: 0
p1_count: 2
target_identity: "file:/Users/nirmalmaharjan/Javascript/portfolio/src/app/page.tsx"
target_fingerprint: "sha256:7f1b4d2b65db22bdaafcac21231749abcf55c1242fbcb2e60e2c1756441fbdca"
target_path: /Users/nirmalmaharjan/Javascript/portfolio/src/app/page.tsx
timestamp: 2026-10-30T06-26-41Z
slug: src-app-page-tsx
---
Method: dual-agent (A: design review sub-agent · B: detector + browser sub-agent)

## Design Health Score
| # | Heuristic | Score | Key Issue |
|---|---|---|---|
| 1 | Visibility of System Status | 3 | Active nav tab, status chips, "Copied"; no feedback on résumé download or a failed mailto |
| 2 | Match System / Real World | 3 | "My part" is recruiter language; "View v2 preview" and the TS hero object are insider talk |
| 3 | User Control and Freedom | 3 | Esc closes menu/dialog; copy-email fallback only at page bottom |
| 4 | Consistency and Standards | 2 | Primary button style on 4 different actions; Contact leaves the page while other tabs scroll; whole card hovers like a link but only a 20px link is clickable |
| 5 | Error Prevention | 3 | 4 of 5 home project links go to preview/WIP URLs |
| 6 | Recognition Rather Than Recall | 3 | Persistent nav, labelled sections, status chips |
| 7 | Flexibility and Efficiency | 3 | Skip link, nav Résumé, copy email, keyboard slider; no fast path to live work |
| 8 | Aesthetic and Minimalist Design | 2 | "Next.js + TypeScript" 4× in first screen; business background 6×; watermarks on every heading |
| 9 | Error Recovery | 2 | copy-button.tsx swallows clipboard failures; no mailto fallback near hero |
| 10 | Help and Documentation | 3 | Contextual hover hints, hidden on touch |
| **Total** | | **27/40** | **Acceptable (edge of Good)** |

## Design Specificity Verdict
LLM: Well built but only partly authored. Above Experience the structure is the stock dark developer portfolio ("Hi, I'm", gradient name, editor card + floating chips, facts strip, watermark words, icon-tile Strengths grid). Authored moments (My part chips, contribution meters, Before-code ledger, Kathmandu clock, before/after sliders) are the best of the page but sit inside a template shell.
Detector: CLI 26 advisory findings, all design-system-font-size (13/11/19/10/9px not on DESIGN.md ramp) across 12 components. Browser: 34 on /, 33 on /projects, 14 on /about. Agreements: icon-tile-stack ×4 (Strengths), gradient-text on the name. Detector-only: undersized-ui-text ×9 (10px Before/After/My part), straggler ×3, nested-cards ×2 (My contribution box), overused-font (Geist Mono 54% of homepage text). False positives (documented in DESIGN.md): accent gradient words, italic-serif-display, kicker-above-heading ×6, dark-glow, radial-halo, codex-grid-background, tiny-text on browser-frame URLs. Headless run; no user-visible overlay.

## Priority Issues
- [P1] Hero's prime slot is a code card that repeats the copy (Hero.tsx:98-138); no shipped work visible on load (desktop), projects ~2 screens down on mobile. Fix: browser frame with one live project (Galli Maps), or hide card below lg; remove duplicate stack line (Hero.tsx:35-40). Command: layout
- [P1] HOME_WORK_PROJECTS shows 4 non-live of 5 (Plex Bit, Paradise Hills, Luxe, Plexler; only Sierra live); Galli Maps and meromenu only on /projects. Fix: keep featured+3 format, choose live work first; consider leading with Paradise Hills. Command: clarify
- [P2] Before/after slider START_POSITION = 50 (BeforeAfter.tsx:15) splits headlines mid-word ("AI-Powered L|exler"). Fix: start ~15–20% (mostly After), keep hint sweep. Command: polish
- [P2] Nav: Blog hard-coded in MAIN_NAV (routes.ts:63) though all posts are drafts (contradicts PRODUCT.md); getNav() ignores hasPublishedPosts(); Contact leaves the page instead of /#contact. Command: harden
- [P2] Template shell and repeated claims: watermarks + eyebrows on 20 headings, Strengths icon grid duplicates facts, business background 6×, mono 54% of text. Fix: drop watermarks, fold strengths into proving projects or cut, state background twice, spend space on one authored moment. Command: distill

## Persona Red Flags
- Skimming recruiter: good first 5s; first scroll hits a "Launching soon" project with split slider; strongest facts buried in Experience; unexplained Jun 2025–Feb 2026 gap.
- Casey (mobile): 12,669px page; code card fills a screen; 20px tap targets; theme switch has prime header slot, Email/Résumé in menu; DCL ~4.3s throttled.
- Jordan: "v2 preview" unclear if real; TS object meaningless; slider doesn't say which side is Nirmal's.
- Riley: silent clipboard failure; /blog tag counts vs zero posts; 4 of 5 links to vanishing URLs.

## Minor Observations
- 10px mono labels below 11px floor; DESIGN.md type ramp missing 9–19px small sizes (26 advisories).
- Two serif-italic accents styled differently ("layouts" normal/-0.01em vs "Let's talk" semibold/+0.04em, ContactCard.tsx:75).
- Stragglers in descriptions; add text-wrap: pretty.
- Luxe description (projects.ts:89) passive résumé-speak.
- AllProjectsCta count commented out (ProjectShowcase.tsx:251).
- "~50%" Plex Bit meter (previously approved) sits awkwardly with "every claim is checkable".
- NM. logo link 36×28 target.

## Questions to Consider
- What would the hero lose if the editor card became a live Galli Maps screenshot?
- Why not attach each Strength to the work that proves it and delete the section?
- Which single appearance of the business background would you keep?
- Why does the theme switch hold the prime mobile header slot instead of Email me?
