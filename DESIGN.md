---
name: Nirmal Maharjan Portfolio
description: A dark workbench lit by warm amber light, built to put shipped frontend work in front of hiring readers.
colors:
  lamplight-amber: "#fbbf24"
  lamplight-ink: "#fcd34d"
  ember-rose: "#fb7185"
  graphite-night: "#08090a"
  night-surface: "#0f1012"
  night-raised: "#17191c"
  night-fg: "#f7f8f8"
  night-muted: "#8f949d"
  night-faint: "#7d828c"
  night-line: "rgba(255, 255, 255, 0.08)"
  night-line-strong: "rgba(255, 255, 255, 0.14)"
  signal-live: "#4ade9b"
  signal-soon: "#7dd3fc"
  paper-canvas: "#f6f5f3"
  paper-surface: "#ffffff"
  paper-raised: "#eeece9"
  paper-fg: "#141210"
  paper-muted: "#57534e"
  paper-faint: "#6e6963"
  paper-line: "rgba(20, 18, 16, 0.09)"
  paper-line-strong: "rgba(20, 18, 16, 0.16)"
  paper-amber: "#f59e0b"
  paper-ink: "#b45309"
  paper-rose: "#be123c"
  paper-live: "#0f8250"
  paper-soon: "#0369a1"
typography:
  display:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(3rem, 8vw, 5.6rem)"
    fontWeight: 700
    lineHeight: 0.95
    letterSpacing: "-0.05em"
  headline:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2.5rem, 6vw, 4.25rem)"
    fontWeight: 700
    lineHeight: 1.02
    letterSpacing: "-0.045em"
  title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(2rem, 4.5vw, 3rem)"
    fontWeight: 700
    lineHeight: 1.05
    letterSpacing: "-0.04em"
  lead:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.25rem, 2.6vw, 1.6rem)"
    fontWeight: 500
    lineHeight: 1.375
    letterSpacing: "-0.02em"
  figure:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "clamp(1.4rem, 3vw, 1.9rem)"
    fontWeight: 600
    lineHeight: 1.1
    letterSpacing: "-0.03em"
    fontFeature: "tnum"
  body:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.7
  button:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "15px"
    fontWeight: 500
    lineHeight: 1
  label:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.1em"
  mono:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "0.75rem"
    fontWeight: 500
    lineHeight: 1
  caption:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.5
  card-title:
    fontFamily: "Geist, ui-sans-serif, system-ui, sans-serif"
    fontSize: "19px"
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: "-0.02em"
  micro:
    fontFamily: "Geist Mono, ui-monospace, SFMono-Regular, Menlo, monospace"
    fontSize: "11px"
    fontWeight: 500
    lineHeight: 1
    letterSpacing: "0.06em"
  accent-serif:
    fontFamily: "Instrument Serif, ui-serif, Georgia, serif"
    fontWeight: 400
    letterSpacing: "-0.01em"
rounded:
  sm: "6px"
  browser: "12px"
  chip: "14px"
  card: "16px"
  menu: "18px"
  frame-inner: "22px"
  frame: "28px"
  pill: "9999px"
spacing:
  gutter-phone: "24px"
  gutter-tablet: "40px"
  gutter-desktop: "64px"
  section-phone: "76px"
  section-desktop: "104px"
  card-phone: "20px"
  card-desktop: "24px"
components:
  button-primary:
    backgroundColor: "{colors.night-fg}"
    textColor: "{colors.graphite-night}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-ghost:
    backgroundColor: "{colors.night-surface}"
    textColor: "{colors.night-fg}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "46px"
  button-ghost-hover:
    backgroundColor: "{colors.night-raised}"
  button-icon:
    textColor: "{colors.night-fg}"
    rounded: "{rounded.pill}"
    size: "38px"
  button-icon-hover:
    backgroundColor: "{colors.night-raised}"
  pill:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.night-muted}"
    typography: "{typography.mono}"
    rounded: "{rounded.pill}"
    padding: "0 10px"
    height: "26px"
  pill-hot:
    textColor: "{colors.lamplight-ink}"
    typography: "{typography.mono}"
    rounded: "{rounded.pill}"
  status-live:
    textColor: "{colors.signal-live}"
    rounded: "{rounded.pill}"
    padding: "6px 9px"
  status-soon:
    textColor: "{colors.signal-soon}"
    rounded: "{rounded.pill}"
    padding: "6px 9px"
  status-done:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.night-muted}"
    rounded: "{rounded.pill}"
    padding: "6px 9px"
  card:
    backgroundColor: "{colors.night-surface}"
    rounded: "{rounded.card}"
    padding: "{spacing.card-desktop}"
  nav-bar:
    backgroundColor: "{colors.graphite-night}"
    rounded: "{rounded.pill}"
    padding: "7px 7px 7px 18px"
  nav-tab-active:
    backgroundColor: "{colors.night-raised}"
    textColor: "{colors.night-fg}"
    rounded: "{rounded.pill}"
    padding: "6px 12px"
---

# Design System: Nirmal Maharjan Portfolio

## Overview

**Creative North Star: "The Lit Workbench"**

A dark room with warm amber light falling on real, shipped work. The room is near-black graphite. The light comes from a lamp: soft amber-to-rose glows drift behind the hero and page headers, a spotlight follows the cursor across cards, and the primary button glows when you reach for it. The light is there to show the work. It never decorates empty space.

The bench is tidy and the tools sit on it. Mono labels name things, browser frames hold real screenshots, a small editor window holds a typed profile object, and a timeline shows the path to the current role. Density is moderate: sections get generous vertical room (76px on phones, 104px on desktop) and each one is separated by a hairline rule, so a skimming reader always knows where one topic ends. Shapes are soft and confident: pill controls, generously rounded cards, nothing sharp or brutal.

Dark is the default theme, and dark is where the look is at its strongest. The light theme is a full equal, not an afterthought. It moves to warm paper tones, swaps glow for soft ambient shadows, and darkens the accent so it stays readable.

This look deliberately rejects four directions that were tried and turned down: an editorial serif layout, Swiss-brutalist, warm content-first, and monochrome with a preloader.

**Key Characteristics:**
- Near-black graphite canvas with a warm amber→rose accent that behaves like light.
- Geist for everything you read, Geist Mono for everything that labels, and one Instrument Serif italic word as a signature.
- Pill-shaped controls and chips, 16px cards, 28px glowing frames around the hero visual.
- Real screenshots in browser frames that scroll on hover. Before/after sliders for redesigns.
- Depth comes from glow in dark mode and from soft shadow in light mode.
- Every color goes through theme variables, so both themes share one set of class names.

## Colors

A graphite-and-lamplight palette: neutrals carry nearly every surface, and one warm gradient (amber into rose) carries attention.

All colors are defined in `src/styles/globals.css` as `R G B` channel variables (`--canvas`, `--fg`, `--a1`…) under `:root` (light) and `.dark` (dark), and exposed to Tailwind in `tailwind.config.ts`. The frontmatter lists the resolved hex values for each theme. The variables are the source of truth.

### Primary
- **Lamplight Amber** (`--a1`; dark `lamplight-amber`, light `paper-amber`): the light source. It fills glows (orbs, the halo behind the hero frame), the primary button's hover halo, the spotlight inside cards, the current-role timeline node, highlighted code lines, the 10% tint behind accented tech pills, and the text selection.
- **Lamplight Ink** (`--ink`; dark `lamplight-ink`, light `paper-ink`): amber tuned for text. It colors eyebrows, inline links ("View all projects →"), the "." in the NM logo, dash bullets, accented pills and the focus ring. In light mode it drops to `#b45309` so it passes contrast on paper.

### Secondary
- **Ember Rose** (`--a2`, `--g2`; dark `ember-rose`, light `paper-rose` for gradient text): the far end of the gradient. It is never used on its own as a fill; it appears as the second stop of amber→rose (gradient text, the "After" tag on sliders, the hero frame border) and as the rim light that traces a card's border under the cursor.

### Neutral
- **Graphite Night** (`graphite-night`): the dark canvas, also the browser `theme-color`.
- **Night Surface** (`night-surface`): cards, the editor window and code blocks. Shown at 85% opacity so the glow behind them shows through.
- **Night Raised** (`night-raised`): browser bars, the active nav tab, pills, hover fills, and screenshot placeholders.
- **Night Text** (`night-fg`), **Night Muted** (`night-muted`) and **Night Faint** (`night-faint`): headings and key facts, body copy, and the quietest metadata (punctuation in the editor card, secondary mono lines).
- **Night Hairlines** (`night-line`, `night-line-strong`): every border. The default is the 8% white hairline; the 14% version is for frames, chips that float, and the theme switch.
- **Paper** neutrals (`paper-canvas`, `paper-surface`, `paper-raised`, `paper-fg`, `paper-muted`, `paper-faint`, `paper-line*`): the light theme's warm counterparts to each role above.

### Signal
- **Live Green** (`signal-live`, light `paper-live`): only for "Live", "Live demo" and "Current role" status, and the pulsing availability dot.
- **Soon Sky** (`signal-soon`, light `paper-soon`): only for "Launching soon" and "In progress", and the type names in the editor card.

### Named Rules
**The Lamplight Rule.** Amber→rose behaves like light: glows, halos, rim light, a 10% tint, or gradient text on a word or two. It never becomes a large flat fill, a solid section background, or a body-text color.

**The Two-Theme Rule.** Components use theme tokens (`bg-surface`, `text-muted`, `rgb(var(--a1) / 0.15)`) and never a raw hex. The only fixed colors are things that look the same in both themes on purpose: the browser traffic lights, the dark overlay chips on screenshots, and the white before/after knob.

**The Status Color Rule.** Green means live, sky means not live yet, gray means shipped but not online anymore. Status colors never appear as decoration.

## Typography

**Display Font:** Geist (with ui-sans-serif, system-ui)
**Body Font:** Geist
**Label/Mono Font:** Geist Mono (with ui-monospace, SFMono-Regular, Menlo)
**Accent Font:** Instrument Serif, italic only

**Character:** Geist sets tight, heavy headings that feel engineered, and calm, open body text. Geist Mono adds the workbench voice for labels and metadata. One word of Instrument Serif italic, filled with the amber→rose gradient, is the single human, handwritten note on the bench.

### Hierarchy
- **Display** (700, `clamp(3rem, 8vw, 5.6rem)`, 0.95): the name in the homepage hero only. It fades slightly toward the bottom (a vertical text gradient from full to 60% foreground).
- **Headline** (700, `clamp(2.5rem, 6vw, 4.25rem)`, 1.02): the H1 on inner pages (About, Projects, Contact…), max 22ch.
- **Title** (700, `clamp(2rem, 4.5vw, 3rem)`, 1.05): section H2s, always under an eyebrow.
- **Lead** (500, `clamp(1.25rem, 2.6vw, 1.6rem)`, ~1.375): the hero's role line, where "Next.js" and "TypeScript" take the gradient.
- **Figure** (600, `clamp(1.4rem, 3vw, 1.9rem)`, 1.1, tabular numbers): the four facts under the hero.
- **Body** (400, 17px, 1.7): paragraphs, max 54–60ch. Blog prose runs at 17px, line-height 1.75.
- **Label** (Geist Mono 500, 12px, 0.1em, uppercase): eyebrows, led by a 16px rule in Lamplight Ink. Status chips use the same voice at 11px, 0.06em.
- **Card title** (600, 19px, 1.2): project and experience card headings.
- **Caption** (400, 13px): fact labels, badges, chip captions, secondary lines.
- **Micro** (Geist Mono 500, 11px, 0.06em, uppercase): status chips, "My part", Before/After tags, browser URLs. 11px is the floor for readable text; the only smaller text is the decorative "TS" file badge in the editor card.
- **Mono** (Geist Mono 500, 11–13px): tech pills, browser URLs, dates, the "Looking for" tag, "My part" chips, the hero stack line and the editor card.

### Named Rules
**The One Italic Rule.** Instrument Serif appears only as a single gradient-filled italic word inside a heading (currently on the homepage, About and Contact). It is never used for a full heading, a paragraph or a label.

**The Mono Is Metadata Rule.** Geist Mono labels, tags and annotates. It never sets a sentence the reader is meant to read as prose.

**The Tight Heading Rule.** Headings tighten their tracking as they grow (-0.02em at lead size to -0.05em at display size) and always use `text-wrap: balance`.

## Layout

A single centered column with a maximum width of 80rem (`max-w-site`). Side padding steps 24px → 40px → 64px at phone, tablet (`sm`, 640px) and desktop (`lg`, 1024px).

The homepage is a stack of full-width bands. Each `Section` has a 1px top hairline and 76px of vertical padding (104px from `sm`). Inner pages open with a `PageHeader` that sits on the glow backdrop, with 132px of top padding (168px from `sm`) so the floating nav never covers the eyebrow.

The hero is a two-column grid on desktop (`1.35fr / 1fr`): text on the left, the framed editor card on the right with floating chips. Below `lg` it stacks. The four facts sit under a hairline in a 2×2 grid that becomes 1×4 on desktop, with hairline dividers between cells.

Projects use a responsive card grid. The featured card spans the full row (two columns at `sm`, three at `lg`) and mirrors its layout for the second feature. The projects summary card switches to a row layout through a container query at 720px. The editor card scales its type with its own width (`cqi`), so its lines never wrap.

Anchor jumps leave 6rem of scroll padding for the floating nav.

## Elevation & Depth

Glow, not shadow. In dark mode, resting cards carry no drop shadow, only a 1px inset highlight along the top edge (`inset 0 1px 0 rgba(255,255,255,0.03)`) over a translucent surface. Depth comes from light instead. Two blurred orbs (90px blur, amber and rose) drift slowly behind a masked 56px grid at the top of each page. Hovering a card turns on a cursor spotlight (an amber radial wash inside, a rose rim light on the border) and lifts the card 3px. The primary button gains an amber halo on hover. A fixed film-grain noise layer (5% in dark mode, 2.5% in light mode) sits over everything to keep the darks from banding.

In light mode the same cards get a soft two-layer ambient shadow, because glow doesn't read on paper. The glow opacity also drops (`--glow` 0.22 vs 0.45).

### Shadow Vocabulary
- **Card, light** (`0 1px 2px rgba(20,18,16,0.04), 0 8px 28px rgba(20,18,16,0.06)`): resting cards in light mode only.
- **Card, dark** (`inset 0 1px 0 rgba(255,255,255,0.03)`): resting cards in dark mode.
- **Floating chip** (`0 10px 30px rgba(0,0,0,0.22)`): the clock and stack chips that bob around the hero frame.
- **Featured screenshot** (`0 24px 60px rgba(0,0,0,0.28)`): the large browser frame inside featured project cards.
- **Primary hover halo** (`0 8px 30px rgb(var(--a1) / 0.35)`): the primary button on hover.
- **Knob** (`0 6px 22px rgba(0,0,0,0.35)`; theme switch `0 2px 8px rgba(0,0,0,0.25)`): the before/after handle and the theme toggle knob.
- **Current node glow** (`0 0 12px rgb(var(--a1))`): the current-role dot on the timeline.

### Named Rules
**The Glow, Not Shadow Rule.** In dark mode, depth comes from accent light. Real drop shadows are reserved for things that float above the page (chips, knobs, menus, the featured screenshot). A resting card never gets one.

**The Respect-the-Still Rule.** Every drift, bob, rise, ping and shimmer collapses to nearly zero under `prefers-reduced-motion`.

## Shapes

Soft and confident. Interactive controls are full pills (9999px): buttons, icon buttons, the nav bar and its sliding active tab, tech pills, status chips and the theme switch. Containers are generously rounded: cards 16px, the mobile menu 18px, floating chips and contact rows 14px, browser frames 12px on top and 10px on the bottom, code blocks 14px. Small inner details (URL bars, overlay tags, the focus ring) use 6px.

The hero visual is the one place where shapes nest. A 28px frame with a 1.5px amber→hairline→rose gradient border holds a 22px editor window, with a blurred 32px gradient halo offset behind it. The same frame is reused for the portrait on /about.

Borders are always hairlines in the theme's line color. "Before code" cards are the one exception: a dashed strong border marks them as the earlier career.

## Components

### Buttons
Soft, rounded and confident.
- **Shape:** full pill (9999px), 46px tall, 20px horizontal padding, 15px medium Geist, 16px icon with an 8px gap.
- **Primary:** an inverted solid, foreground on canvas (near-white on graphite in dark mode, near-black on paper in light mode). On hover it lifts 1px and picks up the amber halo. It marks the page's main action ("Email me" in the hero) and, in compact form, the nav's Résumé button.
- **Ghost:** a strong hairline border over the surface color at 60%. Hover fills it with the raised tone. Used for "Download résumé" and other secondary actions.
- **Icon:** a 38px round button with a hairline border and hover fill. Used for GitHub, LinkedIn and the mobile menu.
- **Compact:** in the nav, the primary style drops to 38px tall with 16px padding and 14px text ("Résumé").
- **Focus:** a 2px Lamplight Ink outline with a 3px offset, site-wide.

### Chips
- **Tech pill:** 26px tall, mono 12px, muted text on raised at 60% with a hairline. The **hot** variant marks the primary stack: Lamplight Ink text, 10% amber fill, 40% amber border.
- **Status chip:** mono 11px uppercase with a 6px leading dot in the current text color, over a 13–14% tint of the signal color. Variants are live (green), soon (sky) and done (gray on raised).
- **Availability badge:** a pill with a pinging green dot, "Open to new opportunities" in foreground and the location in muted text.

### Cards / Containers
- **Corner Style:** 16px.
- **Background:** the surface color at 85%, so the glow behind it shows through.
- **Shadow Strategy:** see Elevation & Depth. Inset highlight in dark mode, ambient shadow in light mode, and a cursor spotlight plus 3px lift on hover (project cards).
- **Border:** 1px hairline.
- **Internal Padding:** 20px on phones, 24–26px from `sm`.

### Navigation
A floating pill bar, centered 14px below the top edge (respecting the safe area), up to 1184px wide. The background is the canvas at 75% with a 24px backdrop blur and boosted saturation. The left side holds the "NM." wordmark (extra-bold, with the dot in Lamplight Ink). The center holds the section tabs (14px; muted, turning foreground on hover) with a raised pill that slides under the active tab as you scroll. The right side holds the theme switch and the compact Résumé button, which opens the résumé in a dialog. Below `md`, the tabs collapse into an icon button that opens an 18px-rounded menu panel with the same items.

### Theme Switch
A 68×38 pill track with sun and moon icons and a 28px foreground knob that slides 30px on a springy curve (`0.35s cubic-bezier(0.3, 0.7, 0.3, 1)`). The icon under the knob takes the canvas color. It is deliberately visible, not hidden in a menu.

### Browser Frame
The signature container for real work: a raised frame with a strong hairline, a 32px bar with traffic lights and a mono URL field, over a 16:10 screenshot. On hover-capable devices, full-page screenshots scroll top to bottom over 7s (`cubic-bezier(0.45, 0, 0.3, 1)`) while the card is hovered or focused, and a small "scroll" hint fades out. Project cards set the frame inside an amber radial wash.

### Before/After Slider
Two archived full-page screenshots clipped by an animatable `--pos` custom property, with a 2px white divider and a 40px white knob. A dark "Before" tag and an amber→rose "After" tag sit at the top corners, above the divider. The slider rests mostly on the redesign (20% by default); each project can set its own `start` so the divider falls in a gap and never cuts a headline mid-word (Plexler rests at 6%). It plays a single hint sweep on load, relative to that resting point, is driven by an invisible range input (keyboard focus rings the knob), and both images scroll together on hover.

### Experience Timeline
A 1px vertical rail that fades from amber at the current role down to hairline. Each 17px node is a hollow ring with a faint dot; the current role's ring and dot turn amber with a glow. Entries are cards. The "small steps first" path on /projects reverses the gradient so the line brightens toward the latest step.

### Editor Card (hero)
A typed `nirmal.ts` object in a 22px-rounded editor window with traffic lights and a file tab, syntax-tinted from the theme tokens (keywords in ink, strings in rose, types in sky). It is hidden from screen readers because it repeats the hero text. Two chips bob around it: the live Kathmandu clock and the current stack. It is the hero's chosen visual (confirmed by Nirmal over a live-project screenshot), so keep it.

## Do's and Don'ts

### Do:
- **Do** route every color through the theme variables (`--canvas`, `--surface`, `--raised`, `--fg`, `--muted`, `--faint`, `--line*`, `--a1`, `--a2`, `--g1`, `--g2`, `--ink`, `--ok`, `--info`) and check both themes.
- **Do** treat amber→rose as light: glows, rim light, 10% tints, and gradient text on one or two words at most.
- **Do** put real screenshots of shipped work in browser frames. Use before/after sliders for redesigns.
- **Do** lead section headings with a mono eyebrow, and separate homepage sections with a full-width hairline band.
- **Do** keep controls as pills and containers at 14–18px radius (28px only for the hero frame).
- **Do** use mono for labels, dates, URLs, chips and status, and Geist for everything read as prose.
- **Do** honor `prefers-reduced-motion`, and keep the 2px Lamplight Ink focus ring.

### Don't:
- **Don't** drift toward an editorial serif layout, Swiss-brutalist, warm content-first, or monochrome-with-preloader looks. All four were tried and rejected.
- **Don't** fill large areas or section backgrounds with flat amber or rose, or set body text in the accent.
- **Don't** give resting cards drop shadows in dark mode. Depth there comes from glow.
- **Don't** use Instrument Serif for more than one italic word in a heading, or anywhere outside headings.
- **Don't** use green or sky for anything other than project and role status.
- **Don't** hardcode hex values in components, except the intentional fixed colors (traffic lights, screenshot overlay chips, the before/after knob).
- **Don't** add sharp corners, heavy borders or near-black-on-black panels without a hairline. Every surface needs its edge.
