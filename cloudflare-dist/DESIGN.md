# Civic Guardian Landing Collection Design System

## 0. Research Log

- Embedded references: shortlisted Coinbase, Mastercard, and Intercom; picked the soft execution lane plus Intercom because Civic Guardian's differentiator is empathetic conversation, while the infrastructure story can remain precise and institutional.
- Lazyweb: 3 desktop queries, 3 screens viewed. Microsoft Government supplied a clear public-service hierarchy, Vectra Threat Briefings supplied the editorial signal pattern, and Continu supplied the split conversational-product framing. We keep their layout grammar only and avoid copied branding, assets, and card-grid density.
- UI/UX database: the civic/public-service result reinforced high contrast, large type, visible focus, trust blue, responsive imagery, and reduced motion. Its suggested marketplace structure and remote font pairing were rejected as irrelevant or unsuitable for a dependency-free multilingual static site.
- Imagen drafts: `shared-assets/public-trust-1600.webp`, `shared-assets/threat-network-1600.webp`, `shared-assets/human-shield-1600.webp`, `shared-assets/local-relay-hero-1586.webp`, and `shared-assets/local-relay-community-1448.webp`. Human Shield and Safety Net intentionally share the human-centered image; the other drafts remain the reference contract for their matching page.
- Source brief: the supplied CGaaS pitch, including the empathy layer, multichannel adapters, bring-your-own-data integration, teachable moments, citizen/family/administrator personas, and global threat heatmap.

## 1. Atmosphere & Identity

Civic Guardian feels competent, calm, and protective without portraying older adults as helpless. Its signature is a visible translation from threat to confidence: a strong human or planetary image sits beside plain language, while thin signal paths and grouped stages explain the open protocol. Five page directions express one product from different buyer perspectives:

- **Public Trust**: an accountable civic infrastructure service. Light, precise, cobalt, sharp.
- **Threat Network**: a global intelligence layer. Dark, editorial, signal orange, vigilant.
- **Human Shield**: inclusive digital confidence. Mist white, emerald, soft, humane.
- **Local Relay**: regional implementation. Mineral grey, muted berry, sharp, documentary.
- **Safety Net**: Human Shield’s empathetic voice joined to Public Trust’s open architecture. Mist white, emerald, soft, legible.

Design dials:

| Page | Design Variance | Motion Intensity | Visual Density |
|---|---:|---:|---:|
| Public Trust | 6 | 4 | 5 |
| Threat Network | 9 | 7 | 4 |
| Human Shield | 4 | 3 | 5 |
| Local Relay | 4 | 3 | 5 |
| Safety Net | 4 | 3 | 5 |

## 2. Color

Each page locks to one theme and one interactive accent. Status colors appear only when a genuine status is communicated.

### Public Trust

| Role | Token | Value | Usage |
|---|---|---|---|
| Surface primary | `--surface` | `#F7F9FC` | Page canvas |
| Surface elevated | `--surface-raised` | `#FFFFFF` | Media and grouped content |
| Text primary | `--ink` | `#0A1733` | Headlines and body |
| Text secondary | `--muted` | `#4A5872` | Supporting copy |
| Border | `--line` | `#CBD5E5` | Structural dividers |
| Accent | `--accent` | `#1646C6` | Links, focus, primary CTA |
| Accent hover | `--accent-hover` | `#10379F` | Hover and active |

### Threat Network

| Role | Token | Value | Usage |
|---|---|---|---|
| Surface primary | `--surface` | `#090C11` | Page canvas |
| Surface raised | `--surface-raised` | `#111722` | Panels |
| Text primary | `--ink` | `#F3F6FA` | Headlines and body |
| Text secondary | `--muted` | `#A8B0BD` | Supporting copy |
| Border | `--line` | `#2A3341` | Structural dividers |
| Accent | `--accent` | `#FF6242` | Links, focus, primary CTA |
| Accent hover | `--accent-hover` | `#FF8067` | Hover and active |

### Human Shield

| Role | Token | Value | Usage |
|---|---|---|---|
| Surface primary | `--surface` | `#F1F7F4` | Page canvas |
| Surface raised | `--surface-raised` | `#FFFFFF` | Media and grouped content |
| Text primary | `--ink` | `#102621` | Headlines and body |
| Text secondary | `--muted` | `#4D635D` | Supporting copy |
| Border | `--line` | `#CADBD5` | Structural dividers |
| Accent | `--accent` | `#0B725F` | Links, focus, primary CTA |
| Accent hover | `--accent-hover` | `#075A4B` | Hover and active |

### Local Relay

| Role | Token | Value | Usage |
|---|---|---|---|
| Surface primary | `--surface` | `#EEF1EE` | Light page canvas |
| Surface elevated | `--surface-raised` | `#F8FAF7` | Editorial sections |
| Text primary | `--ink` | `#16201C` | Headlines and body |
| Text secondary | `--muted` | `#4F5F57` | Supporting copy |
| Border | `--line` | `#B9C4BD` | Structural dividers |
| Accent | `--accent` | `#8B3447` | Links, focus, primary CTA |
| Accent hover | `--accent-hover` | `#6F2738` | Hover and active |

### Shared State Colors

| Role | Token | Value |
|---|---|---|
| Error | `--error` | `#B42318` |
| Warning | `--warning` | `#8A4B08` |
| Success | `--success` | `#146C43` |

## 3. Typography

### Font Stack

- Primary: `ui-sans-serif, -apple-system, BlinkMacSystemFont, "Segoe UI", "Noto Sans", "Noto Sans JP", "PingFang TC", "Hiragino Sans", sans-serif`.
- Mono: `ui-monospace, "SFMono-Regular", Consolas, monospace`, limited to protocol payloads or compact technical metadata.
- Local Relay display: `ui-serif, Georgia, "Times New Roman", "Noto Serif", "Noto Serif JP", "Songti TC", serif`, with CJK headlines returning to the primary sans stack.
- No remote fonts. The stack preserves offline delivery and native CJK coverage.

### Scale

| Level | Size | Weight | Line Height | Tracking | Usage |
|---|---|---:|---:|---:|---|
| Display | `clamp(2.75rem, 6vw, 5.5rem)` | 650 | 0.98 | `-0.045em` | Hero |
| H1 | `clamp(2.25rem, 4vw, 4rem)` | 650 | 1.02 | `-0.035em` | Major section |
| H2 | `clamp(1.75rem, 3vw, 2.75rem)` | 620 | 1.08 | `-0.025em` | Section heading |
| H3 | `clamp(1.25rem, 2vw, 1.625rem)` | 620 | 1.18 | `-0.015em` | Group title |
| Body large | `1.125rem` | 400 | 1.65 | 0 | Lead copy |
| Body | `1rem` | 400 | 1.65 | 0 | Default copy |
| Small | `0.875rem` | 500 | 1.45 | 0 | Metadata |

Headlines may wrap to two lines on desktop and reflow naturally in Japanese and Traditional Chinese. Body text never falls below 16px.

## 4. Spacing & Layout

Base unit: 4px.

| Token | Value |
|---|---:|
| `--space-1` | 4px |
| `--space-2` | 8px |
| `--space-3` | 12px |
| `--space-4` | 16px |
| `--space-5` | 20px |
| `--space-6` | 24px |
| `--space-8` | 32px |
| `--space-10` | 40px |
| `--space-12` | 48px |
| `--space-16` | 64px |
| `--space-20` | 80px |
| `--space-24` | 96px |

- Max content width: 1280px.
- Grid: 12 columns above 1024px, 6 columns from 768px, one readable column below 768px.
- Gutters: 20px mobile, 32px tablet, 48px desktop.
- Hero: `min-height: 100dvh`, visual and copy composed together, CTA visible in the initial viewport.
- Text measure: 65 characters for body copy. Japanese and Traditional Chinese use a narrower visual measure.
- No primary-content horizontal scrolling at 375px or 200 percent zoom.

## 5. Components

### Skip Link

- **Structure**: anchor to `#main` before navigation.
- **States**: visually hidden, visible on keyboard focus.
- **Accessibility**: high-contrast focus treatment, no motion dependency.

### Brand Lockup

- **Structure**: simple geometric guardian mark plus text label.
- **Variants**: light and dark foreground.
- **Accessibility**: wordmark remains text; decorative mark is hidden from assistive technology.

### Language Control

- **Structure**: native labelled `select` with `EN`, `FR`, `日本語`, `繁體中文`, `DE`, `ES`, `IT`.
- **States**: default, hover, focus, disabled, invalid.
- **Accessibility**: 44px minimum target, visible label or accessible name, announces the selected language, updates `html[lang]` and persists selection locally.
- **Motion**: none. Copy changes use a short opacity transition only when reduced motion is not requested.

### Primary CTA

- **Structure**: anchor with concise action label.
- **Variants**: filled primary and underlined secondary.
- **States**: default, hover, active, focus, disabled/loading showcase.
- **Accessibility**: 44px minimum height, no wrapped desktop label, 4.5:1 contrast, visible 3px focus ring.
- **Motion**: active press uses a 1px transform; hover never changes layout bounds.

### Hero Media

- **Structure**: `picture` with 960px and 1600px WebP sources, explicit dimensions, localized `alt`.
- **Variants**: documentary photo, planetary data art, soft 3D inclusion scene, local implementation documentary, and the Safety Net architecture hybrid.
- **Accessibility**: meaningful localized alt text; image cannot contain required information.
- **Layout**: one column on mobile, asymmetric split on desktop.

### Information Rail

- **Structure**: ordered group of named stages with short descriptions.
- **Variants**: architecture, stakeholder, or intervention sequence.
- **States**: static content; hover only if the item is a link.
- **Accessibility**: order is semantic, color is never the only distinction.

### Evidence Panel

- **Structure**: headline, brief explanation, one image or structured list, optional single CTA.
- **Variants**: light bordered, dark tonal, soft raised.
- **Accessibility**: no fake metrics; heading hierarchy preserved.

### Footer

- **Structure**: product summary, language control or locale reminder, page-switch links, source-note link.
- **Accessibility**: one-line desktop navigation, readable reflow on mobile, no tiny legal text.

## 6. Motion & Interaction

| Type | Duration | Easing | Usage |
|---|---:|---|---|
| Micro | 140ms | `cubic-bezier(.2,.8,.2,1)` | Press and focus feedback |
| Standard | 260ms | `cubic-bezier(.16,1,.3,1)` | Language copy transition, menu state |
| Emphasis | 520ms | `cubic-bezier(.16,1,.3,1)` | Threat Network hero entry only |

- Animate only transform and opacity.
- Intersection Observer may reveal key sections once. No scroll listener.
- `prefers-reduced-motion: reduce` disables reveal and copy transitions.
- Motion communicates hierarchy or input feedback. Decorative loops are prohibited.

## 7. Depth & Surface

- Public Trust: borders and tonal shift, no decorative shadows.
- Threat Network: tonal shift plus a single inset highlight on the hero media shell.
- Human Shield: soft tinted shadow on raised media only; content sections use spacing instead of cards.
- Local Relay: structural borders and tonal shifts, no shadows.
- Safety Net: Human Shield’s soft raised media with border-led architecture disclosures.
- Radius lock: Public Trust 6px, Threat Network 4px, Human Shield 20px, Local Relay 0px. Buttons follow the page radius rule.

## 8. Accessibility Constraints & Accepted Debt

### Constraints

- Target WCAG 2.2 AA, with AAA contrast for long body copy where practical.
- Every interactive element is keyboard reachable and has a visible focus state.
- Minimum pointer target is 44 by 44px.
- Respect reduced motion and browser zoom. Layout must survive 200 percent zoom.
- Language switch updates the document language and all meaningful visible copy.
- EN, FR, JA, ZH-TW, DE, ES, and IT content receives native punctuation and line breaking.
- Images use localized alt text; decorative layers are ignored by assistive technology.
- Plain-language copy avoids shame, fear amplification, and infantilizing descriptions of older adults.

### Accepted Debt

None.

## 9. Final Verification

- Real Chrome matrix: root chooser plus all five pages at 375px, 768px, and 1280px; all seven locales; interactions, menu focus return, disclosures, light and dark modes, reduced motion, and 200 percent text. The updated chooser and Safety Net page were rechecked after the fifth concept was added. Result: zero failures.
- Lighthouse: three-run median for mobile and desktop. Performance, accessibility, best practices, and SEO each scored 100 for the updated chooser and Safety Net page; the four unchanged concepts retain their previous 100 scores.
- Static integrity: JavaScript syntax, duplicate IDs, image alt attributes, and all local references pass.
- Review: the original three pages retain their cross-review pass. Local Relay, Safety Net, and the expanded chooser received separate manual visual review at all final breakpoints with no actionable blockers.
