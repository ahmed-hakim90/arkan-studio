# ARKAN — Creative + Product + UX Execution Bible

> **Document type:** Creative Execution Brief (not a scattered specification list)  
> **Working concept:** **ARKAN / Systems, Exposed.**  
> **Arabic positioning:** **أركان — نبني أنظمة تشغّل شغلك.**  
> **English positioning:** **ARKAN — Systems that run the business.**  
> **Goal:** 9/10 Creative Execution — the reader should *see* the site before it is built.  
> **Replaces:** `ARKAN_Master_Design_System_Brief.md` (115-item spec style)

---

## Part 0 — How to use this Bible

### Who this is for

1. **AI designer** — generate frames, Figma systems, motion boards from scene prompts.
2. **AI developer** — implement composition, tokens, interaction, and bilingual layout without inventing structure.
3. **Human creative lead** — approve or reject by Acceptance Criteria only.

### Reading rule

Execute **one scene at a time**. Do not skip Acceptance Criteria. Do not “summarize” a scene into a generic section. If a scene fails brand, composition, motion, or mobile criteria, it is unfinished.

### Why the previous brief failed as creative direction

The master brief scored high as product/IA specification and low as creative direction: it named what pages contain, but rarely locked **viewport composition, hierarchy beats, motion timing, mobile reflow, exact type sizes, Do/Don’t per scene, or fail-hard acceptance**. This Bible exists to close that gap.

### Scene contract (mandatory)

Every major screen in this document follows the same contract:

1. Viewport frame  
2. What you see first / second / third  
3. Exact content (AR + EN)  
4. Motion beat  
5. Interaction  
6. Mobile version  
7. Do / Don’t  
8. AI prompt block  
9. Acceptance criteria  

---

## Part 1 — North Star + Hard Creative Rules

### 1.1 North Star

Arkan must not feel like a normal software agency, a portfolio template, a SaaS landing page, or a creative studio pretending to be technical.

The website itself is **proof of capability**.

Desired reaction:

> “Who built this? If Arkan built its own experience at this level, what could they build for my company?”

Not:

> “This is a nice website.”

The site is four products in one:

1. **Marketing Website** — positions and sells Arkan.  
2. **Systems Portfolio** — proves depth and complexity.  
3. **Interactive Technical Experience** — systems thinking in the interface.  
4. **Project Builder** — converts visitors into qualified briefs via a live blueprint.

### 1.2 What Arkan is

Arkan is a **Digital Systems Company**.

> **Arkan architects, designs, builds, integrates, and evolves digital systems that businesses operate on.**

Arabic:

> **أركان تصمم وتبني وتربط الأنظمة الرقمية التي يعتمد عليها العمل فعليًا.**

Promise:

| | Arabic | English |
|---|---|---|
| Primary | نبني أنظمة تشغّل شغلك. | Systems that run the business. |
| Support | من الفكرة إلى التشغيل — منتج، تصميم، هندسة، تكاملات ونمو تحت مسؤولية فريق واحد. | From idea to operation — product, design, engineering, integrations and growth under one accountable team. |

### 1.3 Brand personality

| Dimension | Direction |
|---|---|
| Tone | Architectural, precise, confident, calm |
| Intelligence | Technical without showing off |
| Personality | Enterprise calm + engineering ambition |
| Visual metaphor | Structural grid / signal / operating layers |
| Experience | A digital system, not a brochure |
| Arabic | First-class experience, not translated LTR |
| Motion | Purposeful and restrained |
| Content | Specific, factual, operational |
| Portfolio | Systems, not screenshots |
| Conversion | Consultative, not “Contact us” |

Keywords: **Structured · Signal · Atlas · Architecture · Precision · Operational · Systemic · Arabic-first · Enterprise · Control · Scale · Intelligence**

### 1.4 Core creative concept

# ARKAN / SYSTEMS, EXPOSED.

Reveal visible and invisible layers:

1. Interface  
2. Workflow  
3. Modules  
4. Users  
5. Data  
6. Integrations  
7. Automation  
8. Operational architecture  

Key line:

> **The interface is only the visible layer.** / **الواجهة هي فقط الجزء الذي تراه.**  
> **We build what runs underneath it.** / **ونحن نبني ما يجعلها تعمل.**

Visual language name: **Architectural Editorial Interface**  
= Large typography + structural grid + product visuals + system diagrams + restrained technical labels + red signal behavior.

It must **not** become a literal control-room dashboard.

### 1.5 Global Do / Don’t (visual, non-negotiable)

**DO**

- Make the brand wordmark a hero-level signal on branded first viewports.  
- One composition per first viewport — not a dashboard of widgets.  
- Use Signal Red only for action, activity, selection, flow, attention.  
- Prefer rows, panels, full-width bands, diagrams over cards.  
- Design Arabic as primary; English as equal, not an afterthought.  
- Show real system structure (roles, modules, workflows, integrations).  
- Keep motion purposeful: reveal structure, never decorate emptiness.

**DON’T**

- Generic agency hero with laptop mockup  
- “We create digital experiences” fluff  
- Endless rounded cards / bento wallpaper  
- Purple AI gradients, glassmorphism stacks, glow blobs  
- Default dark mode as brand identity  
- Fake metrics, fake logos, stock photography as proof  
- Technology logo walls  
- Case studies that are only screenshots  
- “Our Services” as six identical cards  
- “Contact Us” as primary conversion  
- Long splash screens  
- Fake dashboards in the hero  
- Treating every concept as a deployed client project  
- Overlay badges / floating promo chips on hero media  

### 1.6 Brand test (must pass every scene)

If you remove the ARKAN wordmark and another agency’s logo still fits, **fail**.  
If the first viewport could belong to another brand after removing nav, **fail**.  
If a section looks like a template after squinting, **fail**.

---

## Part 2 — Execution System (locked tokens)

Soft language (“suggested”, “explore”, “possible”) is forbidden here. These are build decisions.

### 2.1 Color

```css
:root {
  --background: #F3F5F8;
  --foreground: #12141A;
  --muted: #5A6475;
  --surface: #FFFFFF;
  --surface-2: #E5EBF3;
  --navy: #0B1F3A;
  --navy-soft: #163456;
  --signal: #D7042A;
  --signal-hot: #FF2748;
  --signal-soft: #FFD6DE;
  --ok: #0F7B5A;
  --danger: #C62828;
  --line: rgba(18, 20, 26, 0.10);
  --line-strong: rgba(18, 20, 26, 0.18);
  --focus-ring: 0 0 0 3px rgba(215, 4, 42, 0.22);
}
```

**Balance:** 60–70% light blue-gray/white · 15–25% navy · 10–15% dark type · 3–5% signal red.

**Signal rule:** Red = something is happening. Never decorative red fills.

### 2.2 Typography (final pairing)

| Role | Latin | Arabic |
|---|---|---|
| Display / UI | Geist Sans | IBM Plex Sans Arabic |
| Body | Geist Sans | IBM Plex Sans Arabic |
| Mono / meta | Geist Mono | IBM Plex Mono (or Geist Mono for shared codes) |

#### Type scale — Desktop (≥1280)

| Token | Size | Weight | Line-height | Tracking | Max width |
|---|---|---|---|---|---|
| Display | 88px / 5.5rem | 500 | 0.95 | -0.03em | 14ch (EN) / 10ch (AR) |
| H1 | 56px / 3.5rem | 500 | 1.05 | -0.025em | 22ch |
| H2 | 40px / 2.5rem | 500 | 1.1 | -0.02em | 28ch |
| H3 | 28px / 1.75rem | 500 | 1.2 | -0.015em | 36ch |
| Body L | 20px / 1.25rem | 400 | 1.55 | 0 | 62ch |
| Body | 16px / 1rem | 400 | 1.55 | 0 | 68ch |
| Small | 14px / 0.875rem | 400 | 1.45 | 0.01em | — |
| Meta | 12px / 0.75rem | 500 | 1.35 | 0.06em | — |
| Mono Meta | 12px / 0.75rem | 400 | 1.4 | 0.04em | — |

#### Type scale — Mobile (≤639)

| Token | Size | Weight | Line-height |
|---|---|---|---|
| Display | 48px / 3rem | 500 | 0.98 |
| H1 | 36px / 2.25rem | 500 | 1.05 |
| H2 | 28px / 1.75rem | 500 | 1.12 |
| H3 | 22px / 1.375rem | 500 | 1.2 |
| Body L | 18px / 1.125rem | 400 | 1.5 |
| Body | 16px / 1rem | 400 | 1.55 |
| Small | 13px / 0.8125rem | 400 | 1.45 |
| Meta | 11px / 0.6875rem | 500 | 1.35 |

Meta labels always uppercase Latin for system IDs (`SYSTEM / MVS-01`); Arabic UI labels stay sentence case where natural.

### 2.3 Grid, spacing, breakpoints

**Columns:** Desktop 12 · Tablet 6 · Mobile 4  

**Gutters:** Desktop 24px · Tablet 20px · Mobile 16px  

**Page margins:** Desktop 48–64px · Tablet 32px · Mobile 20px  

**Content max:** 1440px canvas; readable text measure 62–68ch.

**Spacing scale (4px base):** 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96, 128, 160

**Breakpoints:**

```text
Mobile        < 640
Large mobile  ≥ 640
Tablet        ≥ 768
Laptop        ≥ 1024
Desktop       ≥ 1280
Wide          ≥ 1536
```

Test widths: 320, 375, 390, 430, 768, 1024, 1280, 1440, 1920.

Visible grid may appear behind selected sections as architectural reference — never noisy graph paper.

### 2.4 Shape language

```css
--radius-xs: 4px;
--radius-sm: 8px;
--radius-md: 12px;
--radius-lg: 20px; /* rare, interaction surfaces only */
--radius-pill: 999px; /* filters, status, toggles only */
```

Cards are **not** the default container. Use rows, panels, fields, bands, split layouts, diagrams, structural columns, expanding surfaces.

### 2.5 Motion choreography language

| Name | Meaning | Default timing |
|---|---|---|
| Structural Reveal | Grid, type, surfaces appear in deliberate order | 480–720ms, ease-out, stagger 60–90ms |
| Signal Flow | Red path moves along structure to show activity | loop 2.4–3.2s linear/ease-in-out, opacity 0.85 |
| Layer Reveal | Peel from UI → modules → data → integrations | 600ms ease-[cubic-bezier(0.22,1,0.36,1)] per layer |
| System Expand | Node/panel opens into architecture | 520ms same easing; children stagger 40ms |

**Tokens:**

```text
--ease-out-system: cubic-bezier(0.22, 1, 0.36, 1)
--duration-fast: 160ms
--duration-ui: 240ms
--duration-scene: 520ms
--duration-hero: 720ms
--stagger-tight: 40ms
--stagger-scene: 80ms
```

`prefers-reduced-motion`: replace continuous Signal Flow with static signal mark; keep opacity fades ≤200ms; no parallax.

### 2.6 Component behavior sheet

#### Buttons

| Variant | Default | Hover | Active | Focus | Disabled | Loading |
|---|---|---|---|---|---|---|
| Primary Signal | bg `--signal`, text white, radius-sm, h 44–48px, px 20 | bg `--signal-hot`, translateY(-1px) | translateY(0), darker 4% | `--focus-ring` | bg `#C9CED6`, text `#7A8494` | spinner 16px, label muted, no double-submit |
| Secondary | border `--line-strong`, bg transparent | bg `--surface-2` | bg `--surface-2` | `--focus-ring` | 40% opacity | same |
| Ghost | text `--foreground` | underline offset 4px / bg 4% | — | `--focus-ring` | 40% | — |

Primary label pattern: `START A PROJECT →` / `ابدأ مشروعك ←` (arrow flips with direction).

#### Navigation

- Top of page: spacious, light, height 72–80px, wordmark left (LTR) / right (RTL).  
- After 120px scroll: compress to 56px **command strip**; optional context `ARKAN / MASAR / ARCHITECTURE / 03 OF 09`.  
- Mobile: wordmark + menu; full-screen sheet with large type links; CTA pinned bottom.

#### Filters (Atlas)

Horizontal or vertical rail; pill only for active filter chips; inactive = text + hairline. Active chip: signal soft bg + signal text.

#### Sticky chapter rail (Project)

Desktop left (LTR) / right (RTL) 200–240px; mono index + chapter name; active chapter signal bar 2px.

#### Blueprint panel (Builder)

Desktop sticky right 42–46% width; hairline left border; live nodes update with 240ms morph. Mobile: bottom sheet peek 88px → expand 70vh.

#### Focus

Never remove outlines without replacement. Use `--focus-ring` on all interactive controls.

---

## Part 3 — Information Architecture (map, not scenes)

```text
/
├── Home                         (12 narrative screens)
├── /work                        Systems Atlas
├── /work/[slug]                 System Control Room
├── /capabilities                Capability anatomy
├── /approach                    How a system becomes operational
├── /studio                      Six Arkan + team network
├── /start                       Project Builder
├── /privacy · /terms · /cookies
└── States: splash, loading, skeleton, empty, error, 404, cookies
```

Global nav (desktop):

```text
EN: ARKAN · Work · Capabilities · Approach · Studio · AR/EN · [ BUILD WITH US ↗ ]
AR: أركان · الأنظمة · قدراتنا · منهجنا · الاستوديو · AR/EN · [ ابدأ مشروعك ↗ ]
```

---


## Part 4 — HOME — Twelve Screens (full execution)

The homepage is a vertical film of ~10–12 full narrative moments. Not four generic agency blocks. Scroll is the edit suite.

---

### HOME / 01 — Hero

**URL moment:** `/` first viewport  
**Job:** Establish Arkan as the hero — brand first, not a mockup.

#### Viewport frame (Desktop ≥1280)

- Full viewport `100vh`, navy structural plane (`--navy`) as dominant field OR controlled navy left 58% + light right 42% — pick **one composition**: prefer **full-bleed navy field** with light type.
- Brand wordmark **ARKAN / أركان** sits in the optical center-left (LTR) / center-right (RTL), Display 88px, ~18% from top on wide, vertically balanced so it owns the frame.
- One horizontal Signal line at ~62% viewport height, 1–2px, running from margin into a vanishing node.
- Fine structural grid at 4–6% opacity in navy field — felt, not counted.
- CTAs sit below support line, 32px gap, not floating as pills over imagery.
- No stats, badges, project cards, testimonials, logo walls, or inset media cards.

#### What you see first / second / third

1. Wordmark  
2. Promise line  
3. Signal begins to move; then CTAs

#### Exact content

**AR**

```text
أركان

نبني أنظمة تشغّل شغلك.

من الفكرة إلى التشغيل — نبني المنتج والتجربة والهندسة والتكاملات التي يعتمد عليها عملك.

[ استكشف الأنظمة ]
[ ابدأ مشروعك ]
```

**EN**

```text
ARKAN

Systems that run the business.

From idea to operation — we build the product, experience, engineering and integrations your business runs on.

[ Explore Systems ]
[ Start a Project ]
```

#### Motion beat

- 0–200ms: grid fades in (opacity 0→0.06)  
- 200–720ms: wordmark Structural Reveal (y+16→0, opacity)  
- 720–1000ms: promise + support  
- 1000ms+: Signal Flow starts once; loops calmly  
- CTAs at 1100ms, stagger 80ms  
- No bounce, no blur storms

#### Interaction

- Primary CTA → `/work`  
- Secondary CTA → `/start`  
- Locale switch does not reload hero composition — only copy + direction

#### Mobile

- Display 48px wordmark, stacked, top padding 96px under nav  
- Signal line shorter, full width minus margins  
- CTAs full-width stack, primary first  
- No side plane split

#### Do / Don’t

- DO let the wordmark be larger than the headline support.  
- DON’T place a laptop mockup, dashboard, or “AI orb” behind type.  
- DON’T overlay chips (“Trusted by…”, “AI-powered”).  

#### AI prompt — Designer

> Design a full-bleed first viewport for ARKAN. Navy #0B1F3A field, light type, architectural editorial interface. Dominant bilingual wordmark (Geist Sans / IBM Plex Sans Arabic). One thin signal-red line as the only motion accent. Two text CTAs, no cards, no stats, no badges. Brand must survive logo-removal test.

#### AI prompt — Developer

> Implement HomeHero as 100vh navy composition. Tokens: Display 88/48, signal line CSS/Framer path animation after brand reveal. Respect RTL. No decorative canvas blobs. CTAs to /work and /start. prefers-reduced-motion: static signal.

#### Acceptance criteria

- [ ] Wordmark is the largest type object in the viewport  
- [ ] Zero cards, stats, badges, logo walls  
- [ ] Signal red ≤5% of pixels  
- [ ] Arabic and English both feel primary  
- [ ] Removing wordmark breaks brand recognition (good) — composition still structural, not generic SaaS  

---

### HOME / 02 — Category Reframe

**Job:** Break “website agency” expectation with a typographic scroll sequence.

#### Viewport frame

- Full-screen light background `--background`  
- Single centered (optical) word cluster per sticky beat; max width 16ch EN / 12ch AR  
- Three sticky steps then a landing statement at H1

#### What you see

1. Short provocative word  
2. Escalation words on scroll  
3. Full reframe statement

#### Exact content

**AR sequence**

```text
موقع؟
→ منصة.
→ نظام تشغيل.

المشروع الحقيقي أكبر من الشاشة التي تراها.
```

**EN sequence**

```text
A website?
→ A platform.
→ An operating system.

The real system is bigger than the screen you see.
```

#### Motion beat

- Sticky pin per word 80–100vh scroll budget  
- Crossfade 320ms between words; final statement Structural Reveal  
- Subtle baseline rule expands under final line (Signal, 40% width)

#### Interaction

- Scroll-driven only; no click required  
- Skip affordance not needed if sequence ≤3 beats

#### Mobile

- Same sequence; larger vertical padding; reduce sticky friction (shorter pin distance 60vh)

#### Do / Don’t

- DO keep type huge and lonely.  
- DON’T illustrate with icons of laptop/phone.  
- DON’T add explanatory paragraphs during the three beats.

#### AI prompts

> Designer: Typographic scroll story, three words then one H1, Architectural Editorial, no icons.  
> Developer: Scroll-scrubbed sticky section with reduced-motion fallback showing final statement immediately.

#### Acceptance criteria

- [ ] No supporting paragraph until final statement  
- [ ] Final line readable in one breath  
- [ ] Feels like a system thesis, not a slogan carousel  

---

### HOME / 03 — What We Build

**Job:** Show the categories of systems without six equal service cards.

#### Viewport frame

- Desktop: 12-col; left 4 cols sticky section title; right 8 cols vertical **capability rows** (full-bleed hairline dividers)  
- Each row: mono index `01` · title · one-line definition · signal tick on hover  
- Height per row ~88–104px desktop

#### What you see

1. Title “What we build” / “ماذا نبني”  
2. Row list as structure  
3. Hover reveals a thin architecture hint (optional secondary label)

#### Exact content

**EN titles + lines**

1. **Business Systems** — Internal tools, approvals, finance, management systems.  
2. **Operations** — Field teams, locations, assets, tickets, dispatch.  
3. **Platforms & SaaS** — Multi-role products, portals, tenant models.  
4. **Commerce** — Catalogs, checkout, payments, inventory, merchants.  
5. **AI & Automation** — Extraction, assistants, workflow automation.  
6. **Digital Experiences** — Product sites, portals, interactive interfaces.

**AR**

1. **أنظمة الأعمال** — أدوات داخلية، موافقات، مالية، إدارة.  
2. **التشغيل** — فرق ميدانية، مواقع، أصول، تذاكر، توجيه.  
3. **منصات وSaaS** — أدوار متعددة، بوابات، نماذج مستأجر.  
4. **التجارة** — كتالوج، طلب، دفع، مخزون، تجّار.  
5. **الذكاء والأتمتة** — استخراج، مساعدون، أتمتة مسارات.  
6. **التجارب الرقمية** — مواقع منتج، بوابات، واجهات تفاعلية.

Section eyebrow mono: `CAPABILITIES / SPECTRUM` · `القدرات / الطيف`

#### Motion / Interaction

- Rows reveal on scroll stagger 60ms  
- Hover: left signal bar 2px + muted secondary label  
- Click row → `/capabilities#…` anchor

#### Mobile

- Title stacks above; rows become 72px min height; no sticky left column

#### Do / Don’t

- DO use rows.  
- DON’T use six identical rounded cards in a 3×2 grid.  
- DON’T put icons in colored circles.

#### Acceptance criteria

- [ ] Zero card grid  
- [ ] Hover/focus state communicates “system row”, not “marketing tile”  
- [ ] Each row has one job and one line  

---

### HOME / 04 — Featured System

**Job:** Drop the visitor into one real system (Masar) as proof.

#### Viewport frame

- Full-width band: light surface with navy header strip  
- Layout: left meta + title (5 cols); right product frame / system diagram (7 cols) — **edge-to-edge media plane inside the band**, not a floating card  
- Meta mono stack:

```text
SYSTEM / MVS-01
STATUS / OPERATING
SECTOR / MOBILITY
```

#### Content

**EN**

```text
MASAR
Vehicle Operations Infrastructure

Valet operations: public tickets, QR/NFC, payments, field teams, accounting.

[ Enter system ]
```

**AR**

```text
مسار
بنية تشغيل المركبات

تشغيل صف السيارات: تذاكر عامة، QR/NFC، دفع، فرق ميدانية، ومحاسبة.

[ ادخل النظام ]
```

#### Motion

- Media plane Layer Reveal; signal path traces ticket → dispatch → payment once  
- CTA appears after diagram settle

#### Interaction

- Enter → `/work/masar-valet`  
- Optional secondary: View in Atlas

#### Mobile

- Meta → title → media full bleed → CTA  
- Diagram simplified to 4 nodes max

#### Do / Don’t

- DO use a real project with truthful status.  
- DON’T fake “+240% efficiency” metrics.  
- DON’T put the project in a rounded shadow card floating on purple glow.

#### Acceptance criteria

- [ ] Status truthful (`OPERATING`)  
- [ ] Composition reads as system entry, not case-study thumbnail  
- [ ] CTA language is “enter system”, not “read more”  

---

### HOME / 05 — Invisible Layer

**Job:** Teach the brand thesis with Layer Reveal.

#### Viewport frame

- Centered thesis, then interactive layer stack taking 55–60% width  
- Layers listed vertically with hairlines; active layer signal edge

#### Content

**EN**

```text
The interface is only the visible layer.
We build what runs underneath it.
```

**AR**

```text
الواجهة هي فقط الجزء الذي تراه.
ونبني ما يجعلها تعمل.
```

Layer labels (EN/AR): Interface/الواجهة · Workflow/المسار · Modules/الوحدات · Users/المستخدمون · Data/البيانات · Integrations/التكاملات · Automation/الأتمتة · Architecture/المعمارية

#### Motion / Interaction

- Autoplay Layer Reveal once; then scrub on scroll or click  
- Active layer expands 12px and shows one-line explanation

#### Mobile

- Stack layers full width; tap to expand accordion (one open)

#### Do / Don’t

- DO make layers structural.  
- DON’T animate random particles.  
- DON’T bury the thesis under a paragraph wall.

#### Acceptance criteria

- [ ] Visitor can name at least 3 layers after the scene  
- [ ] Red appears only on active layer indicator  

---

### HOME / 06 — Selected Systems

**Job:** Horizontal/structural index of featured systems — not a pretty portfolio grid of equal cards.

#### Viewport frame

- Horizontal scroll board OR vertical dense index (prefer **structural index rows** on desktop; horizontal snap on mobile)  
- Each item: fingerprint mark · ID · name · sector · status · mass dots  
- Row height 96px; hairline separators

#### Content pattern per row

```text
MVS-01  MASAR     MOBILITY     OPERATING   ●●●●○
NXR-01  NEXORA    OPERATIONS   OPERATING   ●●●●●
… (featured only, truthful)
```

CTA: `Open Atlas →` / `افتح الأطلس ←`

#### Motion / Interaction

- Hover row: signal bar + fingerprint intensifies  
- Click → project page; Atlas CTA → `/work`

#### Mobile

- Horizontal snap cards **as interactive containers** (exception allowed): 85vw, hairline border, no shadow theater

#### Do / Don’t

- DON’T show 12 equal screenshot cards.  
- DO show status + sector + ID.  
- DON’T invent System Mass.

#### Acceptance criteria

- [ ] Every node maps to real `projects.ts` data  
- [ ] Atlas CTA visible  
- [ ] No fake logos  

---

### HOME / 07 — One Accountable Team

**Job:** Collapse vendor sprawl anxiety into one promise.

#### Viewport frame

- Split: left H1; right diagram of fragmented vendors → single Arkan spine  
- Background `--surface`; diagram uses navy nodes + one signal spine

#### Content

**EN**

```text
One accountable team.
You don’t need six vendors. You need one system partner.
```

**AR**

```text
مسؤولية واحدة. فريق واحد.
لا تحتاج ستة مورّدين. تحتاج شريك أنظمة واحد.
```

#### Motion

- Vendor nodes desaturate; signal spine draws connecting Product→UX→Eng→Ops→Growth

#### Mobile

- Statement first; diagram second, simplified vertical flow

#### Do / Don’t

- DON’T use stock “team fist bump” photo as the proof.  
- DO keep diagram abstract and structural.

#### Acceptance criteria

- [ ] Message clear in under 3 seconds  
- [ ] Diagram is not a fake org chart of named employees  

---

### HOME / 08 — Six Arkan

**Job:** Name the six disciplines as pillars of one system.

#### Viewport frame

- Eyebrow: `Six disciplines. One system.` / `ستّة تخصّصات. نظام واحد.`  
- Desktop: 6 structural columns (2 rows × 3 on laptop; 6 on wide) with top mono index, title, one sentence — **no cards**; columns separated by hairlines

#### Content (EN)

```text
01 PRODUCT — Turns business problems into product structure.
02 EXPERIENCE — Turns complexity into understandable workflows.
03 FRONTEND — Builds the interaction layer.
04 BACKEND — Builds logic, services, and data foundations.
05 OPERATIONS — Connects software to real business execution.
06 GROWTH — Ensures the system can support adoption and scale.
```

**AR** (native, not mechanical)

```text
01 المنتج — يحوّل مشكلة العمل إلى بنية منتج.
02 التجربة — يحوّل التعقيد إلى مسارات مفهومة.
03 الواجهة — يبني طبقة التفاعل.
04 الخلفية — يبني المنطق والخدمات وأساس البيانات.
05 التشغيل — يربط البرمجيات بتنفيذ العمل الحقيقي.
06 النمو — يضمن أن النظام يتحمّل التبنّي والتوسّع.
```

#### Interaction

- Hover column: signal underline 2px; others dim to 55%  
- Click → `/studio#six`

#### Mobile

- Vertical accordion list 01–06

#### Acceptance criteria

- [ ] Not six icon cards  
- [ ] Arabic reads native  
- [ ] One sentence each  

---

### HOME / 09 — How We Build

**Job:** Tease approach as a 10-stage operational pipeline.

#### Viewport frame

- Horizontal process rail (desktop) with stages as mono ticks; active stage expands detail panel below  
- Stages: Discover → Map → Architect → Prototype → Design → Build → Integrate → Validate → Launch → Evolve

#### Content

Title EN: `How we build` · AR: `كيف نبني`  
Each stage shows Input / Activity / Output in Small type when active.

#### Motion / Interaction

- Scroll or drag rail; signal dot moves along rail  
- Click stage filters detail  
- Link: `Full approach →` `/approach`

#### Mobile

- Vertical stepper; tap stage

#### Do / Don’t

- DON’T use cheesy chevron infographic clipart.  
- DO keep it looking like a delivery control strip.

#### Acceptance criteria

- [ ] All 10 stages present  
- [ ] Active stage shows Input/Activity/Output  
- [ ] Links to Approach page  

---

### HOME / 10 — Capability Spectrum

**Job:** Show range from zero → operating as a spectrum, not badges.

#### Viewport frame

- Full-width navy band  
- Large H1 + spectrum bar with labeled poles  
- Poles: `FROM ZERO` → `TO OPERATING` / `من الصفر` → `إلى التشغيل`

#### Content

**EN support:** You don’t need six vendors. You need one accountable system partner.  
**AR support:** لا تحتاج ستة مورّدين. تحتاج شريك أنظمة واحدًا يتحمّل المسؤولية.

Spectrum ticks (examples): Idea · MVP · Platform · Operations · Scale — labels in Small/Meta.

#### Motion

- Signal fill animates across spectrum once on enter (1.2s)

#### Mobile

- H1 stacks; spectrum vertical

#### Acceptance criteria

- [ ] No fake percentage metrics  
- [ ] Navy band contrasts previous light section  
- [ ] CTA optional: Start a Project  

---

### HOME / 11 — Project Builder Teaser

**Job:** Preview the conversion product without dumping a form.

#### Viewport frame

- Split: left question preview; right mini live blueprint ghost  
- Background `--surface-2`

#### Content

**EN**

```text
What are you trying to build?
Configure a preliminary system blueprint in a few minutes.

[ Build your project blueprint → ]
```

**AR**

```text
ماذا تحاول أن تبني؟
كوّن مخطّط نظام أوّليًا في دقائق.

[ ابنِ مخطّط مشروعك ← ]
```

Show 3 sample option chips (non-functional preview): Operations · Commerce · Platform

#### Motion

- Blueprint nodes idle-breathe 2% scale; chips suggest interactivity

#### Interaction

- Whole section CTA → `/start`  
- Chips may deep-link `/start?type=operations` if implemented safely

#### Mobile

- Blueprint peek 120px; CTA sticky within section end

#### Do / Don’t

- DON’T embed the full 10-step form on Home.  
- DO make the blueprint look alive.

#### Acceptance criteria

- [ ] Feels like a product teaser, not a contact form  
- [ ] One primary CTA only  

---

### HOME / 12 — Final CTA

**Job:** Close the narrative with operational invitation.

#### Viewport frame

- Full viewport light or navy (prefer light with huge type)  
- H1 + support + two CTAs aligned start (dir-aware)  
- Optional mono line: `BRIEF → BLUEPRINT → BUILD`

#### Content

**AR**

```text
عندك عملية معقدة؟
خلّينا نحوّلها إلى نظام.

[ ابدأ مشروعك ]
[ استكشف الأنظمة ]
```

**EN**

```text
Have a complex operation?
Let's turn it into a system.

[ Start a Project ]
[ Explore Systems ]
```

#### Motion

- Type reveal; signal underscore draws under first line

#### Mobile

- Full-width CTAs stacked

#### Acceptance criteria

- [ ] No newsletter fake urgency  
- [ ] Primary CTA is Start/Builder  
- [ ] Copy matches bilingual intent, not literal calque  

---


## Part 5 — WORK / Systems Atlas (full interaction)

**URL:** `/work`  
**Job:** A navigable map of systems — not a portfolio grid.

### ATLAS / 01 — Entry composition

#### Viewport frame

- Top command strip under global nav: title + filter rail  
- Main stage: free-form topology on desktop (nodes positioned from data `atlas.x/y`), light canvas `--background` with faint grid  
- Title block top-left (dir-aware):

```text
EN: SYSTEMS ATLAS
    Explore operating structures by sector, status, and mass.

AR: أطلس الأنظمة
    استكشف البنى التشغيلية حسب القطاع والحالة والكتلة.
```

#### What you see

1. Atlas title  
2. Filter rail  
3. Nodes in spatial relationships (not a neat 3×3 card grid)

#### Filters

| Dimension | Values |
|---|---|
| Sector | Mobility, Healthcare, Commerce, Operations, Services, Internal Ventures, Other |
| System Type | ERP, Operations, Platform, Commerce, AI, Experience |
| Status | Operating, Deployed, Evolving, Building, Venture, Concept |
| Capability | Product, UX, Frontend, Backend, Data, AI, Integrations, Operations |

Active filters use signal-soft chips; count of visible nodes updates in mono: `SHOWING 06 / 12`.

#### Node anatomy

```text
[Fingerprint]
SYSTEM ID
NAME
SECTOR · STATUS
SYSTEM MASS (modules/roles/integrations glyphs)
```

Node size scales **only** from defined System Mass formula — never arbitrarily.

#### Motion

- Entry: nodes Structural Reveal from center, stagger by mass  
- Connections draw at 40% opacity navy  
- Hover node: elevate label, signal ring 1px, connected edges intensify  
- Filter: non-matching nodes fade to 12% in 240ms; no hard unmount jump

#### Interaction

- Click node → `/work/[slug]` with shared-element-ish transition (name + ID persist into project header)  
- Keyboard: arrow focus between nodes; Enter opens  
- Empty filter state: mono message `NO SYSTEMS MATCH` + clear filters control

#### Mobile

- Hybrid: top filter sheet; body is **structured list + mini map** (not free-form drag)  
- List rows 72px; mini map 40vh optional toggle `MAP / LIST`

#### Do / Don’t

- DO show relationships and scale.  
- DON’T present a Dribbble card portfolio.  
- DON’T size nodes for “visual balance” against data.

#### AI prompts

> Designer: Systems atlas on light architectural grid; nodes with IDs and status; filter rail; no project screenshot cards.  
> Developer: Canvas/SVG or positioned DOM nodes from project atlas coordinates; filter state in URL query; accessible list fallback.

#### Acceptance criteria

- [ ] Not a uniform card grid as primary view  
- [ ] Filters affect visibility with truthful counts  
- [ ] Mobile has list fallback  
- [ ] Only real projects appear  

### ATLAS / 02 — System Fingerprint + System Mass

**Fingerprint:** generated mark from verified characteristics (sector, type, capabilities, mass). Used as project identifier in Atlas, headers, and transitions.

**System Mass panel** (on node focus / detail peek):

```text
MODULES
ROLES
WORKFLOWS
INTERFACES
INTEGRATIONS
AUTOMATIONS
LOCATIONS
```

Masar example mass: modules 8 · roles 7 · workflows 3 · interfaces 4 · integrations 4 · automations 2 · locations 1+

#### Acceptance criteria

- [ ] Mass numbers match CMS/data  
- [ ] Fingerprint consistent across Atlas and Project page  

### ATLAS / 03 — Transition into Control Room

- Selected node expands; others blur/fade  
- Route change carries `SYSTEM / ID` into project header  
- Duration 520ms System Expand  

---

## Part 6 — PROJECT PAGE — Control Room (worked example: MASAR / MVS-01)

**URL:** `/work/masar-valet`  
**Feeling:** Entering the system — not opening a blog case study.

### PROJECT / 00 — Page chrome

- Sticky chapter rail (desktop) with chapters below  
- Command strip may show: `ARKAN / MASAR / {CHAPTER} / {N} OF {TOTAL}`  
- Primary header actions: `VIEW EXPERIENCE` · `VIEW SYSTEM` (toggles X-Ray modes)

### PROJECT / 01 — Header

#### Viewport frame

- Full-width navy or split navy/light  
- Mono meta stack + Display/H1 name + descriptor  
- Fingerprint mark top corner

#### Content (locked for Masar)

```text
SYSTEM / MVS-01

EN: MASAR
    Vehicle Operations Infrastructure
    STATUS / OPERATING
    SECTOR / MOBILITY
    REGION / EGYPT · SAUDI ARABIA

AR: مسار
    بنية تشغيل المركبات
    الحالة / قيد التشغيل
    القطاع / التنقّل
    المنطقة / مصر · السعودية
```

Summary EN: Valet operations infrastructure: public tickets, QR/NFC, payments, field teams, and accounting.  
Summary AR: بنية تشغيل صف السيارات: تذاكر عامة، QR/NFC، دفع، فرق ميدانية، ومحاسبة.

#### Motion / Mobile / AC

- Meta → name → descriptor reveal  
- Mobile stacks meta above title; actions become segmented control  
- [ ] No fake awards  
- [ ] Regions only if publishable (true here)

---

### PROJECT / 02 — Overview

#### Viewport frame

- Light band; H2 “Overview / نظرة عامة”; body measure 62ch; impact line in H3 after 24px gap  
- Optional mono eyebrow `SYSTEM BRIEF`

#### Content

EN body: An operating system connecting guest, staff, site, payment, and accounting via digital tickets, QR/NFC assets, and a team PWA.  
AR body: نظام تشغيلي يربط العميل والفريق والموقع والدفع والمحاسبة عبر تذاكر رقمية وأصول QR/NFC وPWA للفرق.

Impact EN: From fragmented paper process to connected, traceable multi-site operations.  
Impact AR: من ورق متفرق إلى تشغيل متصل قابل للتتبع عبر المواقع.

#### AC

- [ ] Overview ≤ 2 short paragraphs + impact  
- [ ] No vanity adjectives without operational meaning  

---

### PROJECT / 03 — Business Context

#### Viewport frame

- Editorial two-column: question labels (muted) + answers (body)  
- No stock hospitality collage

#### Content

EN context: Hospitality and mall operations need vehicle handling across sites with field teams and time-sensitive guests.  
AR: عمليات الضيافة والمولات تحتاج تشغيل مركبات عبر مواقع متعددة بفرق ميدانية وعملاء يتحركون بسرعة.

Must answer: business type · operation supported · users · what existed before · friction · why custom · constraints.

#### Acceptance criteria

- [ ] Reads as operations briefing, not agency poetry  

---

### PROJECT / 04 — Challenge Visualization

#### Viewport frame

- Vertical flow diagram, before-state, hairline connectors, muted nodes

```text
ARRIVAL → PAPER TICKET → MANUAL PARKING → PHONE REQUEST → VEHICLE SEARCH → UNTRACKED PAYMENT → SLOW HANDOVER
```

AR labels: وصول → تذكرة ورقية → ركن يدوي → طلب هاتفي → بحث عن مركبة → دفع غير متتبع → تسليم بطيء

Challenge statement EN: Paper flow slows handover and breaks accounting visibility.  
AR: التدفق الورقي يبطئ التسليم ويفقد الرؤية المحاسبية.

#### Do / Don’t

- DO show the broken path.  
- DON’T only say “challenges included inefficiencies.”

---

### PROJECT / 05 — System Architecture

#### Viewport frame

- Layered architecture band: Experience · Application · Data · Integrations · Intelligence · Deployment  
- Masar stack labels from data:

```text
interface: TanStack Start · PWA · RTL UI
application: Supabase · RLS · Signed URLs
data: PostgreSQL · Private storage
intelligence: Vehicle photo extraction
deployment: Cloudflare Workers
```

#### Motion

- Layer Reveal top→bottom; signal highlights active layer on hover

#### Acceptance criteria

- [ ] Real stack only  
- [ ] Not a logo soup without layers  

---

### PROJECT / 06 — Experience + System X-Ray (signature)

#### Viewport frame

- Dual mode stage, full-bleed product/experience plane  
- Mode toggle top-right (dir-aware):

```text
EXPERIENCE MODE | SYSTEM MODE
```

**EXPERIENCE MODE:** UI surfaces (guest ticket, valet PWA, ops).  
**SYSTEM MODE:** same frame with overlays — modules, data paths, integrations, role highlights.

#### Motion

- Toggle: 600ms Layer Reveal morph; red paths for active workflow  
- Desktop hover on UI region → system annotation  
- Mobile: tap toggle; tap regions for annotations (no hover dependency)

#### Interaction

- `VIEW EXPERIENCE` / `VIEW SYSTEM` sync with toggle  
- Annotations include module ids: `ticket`, `dispatch`, `payment`…

#### Do / Don’t

- DO keep both modes spatially aligned.  
- DON’T open System Mode as a separate unrelated diagram page.

#### AI prompts

> Designer: Two-mode X-Ray for Masar valet — experience UI vs system overlay with signal paths.  
> Developer: Absolute overlay layers; reduced-motion crossfade; AR/EN annotation copy.

#### Acceptance criteria

- [ ] Modes share composition anchors  
- [ ] Mobile usable without hover  
- [ ] Annotations are specific to Masar  

---

### PROJECT / 07 — Modules

Not a card grid. Use a **module index + detail**:

| ID | AR | EN | Description EN |
|---|---|---|---|
| intake | الاستقبال | Intake | Captures vehicle, customer, initial state |
| ticket | التذكرة العامة | Public ticket | Guest status, payment, tracking |
| parking | المواقف | Parking | Map and space management |
| dispatch | التوجيه | Dispatch | Routes requests to field staff |
| payment | الدفع | Payment | Transactions bound to ticket |
| ops | منصة التشغيل | Ops platform | Sites, teams, states |
| accounting | المحاسبة | Accounting | Financial records, ERP linkage |
| ai-intake | استخراج ذكي | AI intake | Structured intake from images |

Desktop: left list, right detail + mini schema. Mobile: accordion.

#### Acceptance criteria

- [ ] Eight modules, no generic “Module A” placeholders  

---

### PROJECT / 08 — User Roles

Roles as network, not avatars:

Customer · Valet · Supervisor · Branch manager · Operations · Finance · Admin  

Selecting a role highlights related modules/workflows with Signal paths.

#### Acceptance criteria

- [ ] Seven roles from data  
- [ ] Selection changes the diagram  

---

### PROJECT / 09 — Workflows

Three workflows as horizontal steppers:

1. **Arrival** — Arrival → Intake → Validation → Ticket → Park  
2. **Vehicle request** — Request → Dispatch → Payment → Handover  
3. **Accounting** — Transaction → Reconciliation → ERP record  

Active step pulses signal once.

---

### PROJECT / 10 — Integrations

Rows (not logo wall):

| System | Role | Notes |
|---|---|---|
| Odoo | Accounting | Invoice, reconciliation |
| Payment gateway | Payments | Online transaction flow |
| WhatsApp / SMS | Messaging | Operational notifications |
| Vision / extraction | AI | Structured intake from images |

Copy must not imply every integration is plug-and-play for every client.

---

### PROJECT / 11 — Technology

#### Viewport frame

- Same layer band as Architecture, but each layer expands with a one-line “why”  
- Mono labels only — no logo wallpaper

#### Content cues (Masar)

- Interface: PWA + RTL because field staff and guests need fast mobile paths  
- Application: Supabase/RLS for multi-role tenancy and signed access patterns  
- Data: PostgreSQL + private storage for tickets, media, financial linkage  
- Intelligence: vehicle photo extraction where it removes intake friction  
- Deployment: edge/workers profile for operational latency targets  

#### Do / Don’t

- DO explain operational reason.  
- DON’T list technologies as bragging trophies.

#### AC

- [ ] Every layer has a why  
- [ ] Matches Architecture stack labels  

---

### PROJECT / 12 — System Mass

Large typographic mass board:

```text
08 MODULES · 07 ROLES · 03 WORKFLOWS · 04 INTERFACES · 04 INTEGRATIONS · 02 AUTOMATIONS
```

Visual weight matches Atlas node.

---

### PROJECT / 13 — Outcomes

Before → After pairs (truthful):

- Manual → Partially automated  
- Fragmented → Connected  
- Paper → Digital  
- Untracked → Traceable  

No invented percentages.

---

### PROJECT / 14 — What Arkan Did

Scope chips/rows from data: Product strategy · System architecture · UX · Frontend · Backend · Database · Integrations · AI · Deployment · Operations  

Frame as ownership, not “we also do marketing.”

---

### PROJECT / 15 — Next System

Transition band to related project (e.g. Rentara or Nexora):

```text
NEXT SYSTEM → RENTARA / NXR…
```

System Expand into next route.

#### Project-wide AC

- [ ] Feels like Control Room, not Medium post  
- [ ] X-Ray is memorable and explainable  
- [ ] All numbers/status truthful  
- [ ] Arabic chapter titles native  

---

## Part 7 — START — Project Builder (every step as UI)

**URL:** `/start`  
**Product name EN:** BUILD WITH ARKAN  
**AR:** ابنِ مشروعك مع أركان  
**Duration target:** 2–4 minutes  
**Principle:** Every answer visibly mutates a live **System Blueprint**.

### BUILDER / 00 — Shell

#### Viewport frame (Desktop)

- Left 54–58%: step question UI  
- Right 42–46%: sticky live blueprint panel (hairline separator)  
- Top: progress `STEP 03 / 10` + mono label of current concern  
- Bottom: Back (ghost) · Continue (primary signal)

#### Mobile

- Question first (100% width)  
- Blueprint peek bar 88px (`BLUEPRINT · tap to expand`)  
- Expand to 70vh sheet; continue CTA above OS home indicator

#### Blueprint visual language

Nodes: Users · Modules/Workflows · Integrations · Intelligence · Scale tags  
Edges redraw in 240ms on each change; signal highlights last mutation.

#### Global Builder Do / Don’t

- DO feel like configuring a system.  
- DON’T feel like a Typeform skin.  
- DON’T ask for email before value (step 10).  
- DO validate server-side later; client UX is instant feedback.

---

### BUILDER / 01 — What are we building?

**AR:** ماذا سنبني معًا؟  
**EN:** What are we building together?

Options (selectable tiles/rows, not playful illustrations):

- Business System  
- Operations System  
- Platform / SaaS  
- E-commerce  
- Mobile Product  
- AI / Automation  
- Website / Digital Experience  
- I'm not sure yet  

**Blueprint effect:** Sets root system type node + color of spine.  
**AC:** Single select; “Not sure” still creates a neutral root.

---

### BUILDER / 02 — Current situation

**EN:** Where are you now?  
**AR:** أين أنتم الآن؟

Options: Idea · New business · Existing business · Existing system · Replacing old software · Scaling an operation  

**Blueprint effect:** Adds “context” badge under root (e.g. REPLACE / SCALE).

---

### BUILDER / 03 — Users & Roles

**EN:** Who will use it?  
**AR:** من سيستخدمه؟

Multi-select: Customers · Employees · Managers · Admins · Vendors · Partners · Drivers / field staff · Finance · Custom role  

**Blueprint effect:** Each role = node. Custom role opens inline text field (max 40 chars).  
**UI:** Multi-select rows with check signal edge.

---

### BUILDER / 04 — Core Workflows

**EN:** What needs to happen?  
**AR:** ما الذي يجب أن يحدث؟

Multi-select: Orders · Payments · Bookings · Inventory · Approvals · Field operations · Tracking · Notifications · Reporting · CRM · Accounting · Documents · Customer support · Scheduling · Custom workflow  

**Blueprint effect:** Workflow chips become edges between role nodes and module nodes; map grows denser.

---

### BUILDER / 05 — Integrations

**EN:** What should it connect to?  
**AR:** بمَ يجب أن يتصل؟

Options: Existing ERP · Odoo · SAP · Payment gateway · POS · WhatsApp · Google services · Existing APIs · Government services · Logistics provider · Other · Not sure  

**Blueprint effect:** External integration nodes on the right rail of blueprint.  
**Copy caveat (Small):** “We’ll confirm fit during discovery — this is a preliminary map.”

---

### BUILDER / 06 — Intelligence

**EN:** Where could intelligence help?  
**AR:** أين يمكن أن يساعد الذكاء؟  

Do **not** ask “Do you want AI?”

Options: Automate repetitive work · Understand documents · Understand images · Customer support · Forecasting · Recommendations · Decision assistance · Search/knowledge · Not sure  

**Blueprint effect:** Intelligence layer node; connects to selected workflows.

---

### BUILDER / 07 — Scale

Collect ranges (segmented controls):

- Expected users  
- Locations  
- Countries  
- Languages  
- Transaction volume  
- Internal vs external users  
- Existing data volume  

**Blueprint effect:** Mass indicators thicken; location count label updates.

---

### BUILDER / 08 — Priorities

**EN:** What matters most?  
**AR:** ما الأكثر أهمية؟

Multi-select: Speed to launch · Scalability · Automation · Operational control · Customer experience · Cost reduction · Integration · Reliability · Growth  

**Blueprint effect:** Priorities pin as ranked tags on blueprint header (max 3 shown as primary emphasis).

---

### BUILDER / 09 — Delivery reality

Fields / selects: Target launch · Budget range (optional) · Existing team · Existing vendor/system · Decision stage · Procurement requirements  

**Blueprint effect:** Timeline marker on blueprint footer.  
**AC:** Budget optional; never block continue if empty.

---

### BUILDER / 10 — Contact (after value)

Fields: Name · Company · Work email · Phone/WhatsApp · Country · Preferred contact method  
Optional upload: brief / screenshots / process doc  

**Security UX (visible):** consent checkbox; no deceptive patterns.  
**Security implementation notes** live in Appendix A (honeypot, rate limit, MIME allowlist, size limits, SSRF-safe webhooks).

**Blueprint effect:** Locks blueprint; subtle stamp `BRIEF READY`.

---

### BUILDER / 11 — Blueprint generation

State screen:

```text
EN: ARCHITECTING YOUR BRIEF…
AR: جارٍ بناء المخطّط…
```

Show skeleton → populated blueprint summary (type, roles count, workflows, integrations, priorities). Duration 1.2–2.0s perceived; never fake 20s spinner.

Output sections:

1. System type  
2. Suggested modules  
3. Role map  
4. Workflow map  
5. Integration list  
6. Intelligence opportunities  
7. Delivery notes  
8. Matched portfolio systems (smart match — Masar if ops/mobility, etc.)  

CTA: `Send brief to Arkan` / `أرسل الملخص إلى أركان`  
Secondary: `Edit answers` · `Download PDF` (if available)

#### Builder acceptance criteria

- [ ] Desktop split + live blueprint mandatory  
- [ ] Mobile peek/expand blueprint mandatory  
- [ ] Email only at step 10  
- [ ] Every step mutates blueprint visibly  
- [ ] No “AI purple” aesthetic  
- [ ] Copy bilingual and native  
- [ ] Generation state < 2s feel with real summary  

---


## Part 8 — Capabilities / Studio / Approach (full scene depth)

### CAPABILITIES / 01 — Entry

**URL:** `/capabilities`  
**Job:** Explain what Arkan can build without becoming a service-card mall.

#### Viewport frame

- H1 left (5 cols), mono index of six capability areas right (7 cols) as jump links  
- Background `--background`; hairline under header

#### Content

**EN H1:** What we put into operation.  
**AR H1:** ما نُدخله حيّز التشغيل.

Support EN: Not a menu of services — a map of system families.  
AR: ليست قائمة خدمات — خريطة لعائلات أنظمة.

#### Motion / Mobile / Do Don’t

- Index reveals stagger 60ms  
- Mobile: H1 then vertical jump list  
- DON’T use 6 icon cards with “Learn more”

#### Acceptance criteria

- [ ] Immediate differentiation from agency services page  
- [ ] Jump links work to anatomies below  

---

### CAPABILITIES / 02–07 — Capability Anatomy (template applied six times)

Each capability uses identical anatomy layout:

```text
WHAT IT SOLVES
WHAT WE BUILD
WHO USES IT
COMMON MODULES
COMMON INTEGRATIONS
RELATED SYSTEMS (Atlas links)
```

#### Shared viewport frame

- Sticky subnav of six areas on desktop  
- Active area: H2 + two-column anatomy  
- Related systems as structural rows (ID · name · status), not thumbnails

#### 02 Business Systems

- Solves: fragmented internal process, approvals, finance visibility  
- Builds: ERP extensions, internal tools, dashboards, management systems  
- Users: managers, finance, admins, operators  
- Modules: approvals, records, roles, reporting  
- Integrations: ERP, identity, accounting  
- Related: Nexora, etc. (truthful links only)

#### 03 Operations

- Solves: field execution, multi-site control, ticket/dispatch chaos  
- Builds: ops platforms, dispatch, assets, location control  
- Users: field staff, supervisors, ops  
- Modules: tickets, dispatch, status, maps  
- Integrations: messaging, payments, ERP  
- Related: Masar

#### 04 Platforms & SaaS

- Solves: multi-role product needs, tenancy, portals  
- Builds: SaaS foundations, admin, subscriptions, portals  
- Users: end customers + operators + admins  
- Modules: auth, tenancy, billing hooks, admin  
- Integrations: payments, email, analytics  
- Related: truthful platform projects only

#### 05 Commerce

- Solves: catalog-to-cash friction  
- Builds: catalogs, checkout, inventory, merchant tools  
- Users: shoppers, merchants, ops, finance  
- Modules: catalog, cart, payment, inventory  
- Integrations: gateways, logistics, ERP  
- Related: Souqna / Sokany when accurate

#### 06 AI & Automation

- Solves: repetitive work, document/image understanding, decision support  
- Builds: extraction, assistants, workflow automation  
- Users: operators, support, analysts  
- Modules: pipelines, human review, evaluation  
- Integrations: model providers via secure backend, storage  
- Note in UI: intelligence is a layer, not a costume

#### 07 Digital Experiences

- Solves: weak product narrative / operator-facing clarity  
- Builds: flagship sites, product experiences, portals  
- Users: customers, prospects, internal teams  
- Modules: content systems, interactive modules, localization  
- Related: this flagship itself may be referenced carefully as self-proof without vanity

#### Capability scene AC

- [ ] Anatomy blocks complete for all six  
- [ ] No generic “We are experts in…” filler  
- [ ] Related systems only when real  

---

### STUDIO / 01 — Entry

**URL:** `/studio`  
**H1 EN:** The system behind the systems.  
**H1 AR:** النظام الذي يبني الأنظمة.

#### Viewport frame

- Full-bleed light editorial; H1 Display; support one sentence  
- No hero team photo wall

Support EN: A coordinated multidisciplinary unit that owns outcomes.  
AR: وحدة متعددة التخصّصات تعمل تحت مسؤولية واحدة وتملك النتيجة.

#### Do / Don’t

- DON’T lead with long founder biography  
- DON’T “We are passionate innovators”

#### AC

- [ ] Brand-level statement first  
- [ ] Zero stock culture collage  

---

### STUDIO / 02 — Six Arkan (deep)

Reuse HOME/08 content but with expanded one-paragraph each + link to how they collaborate.

Viewport: six structural columns → on scroll, each expands to a detail band with Input/Output examples.

Mobile: accordion 01–06.

---

### STUDIO / 03 — Team Network

#### Viewport frame

- Network diagram center stage (not employee cards first):

```text
CLIENT
  ↓
PRODUCT
 ↙  ↓  ↘
UX  ENGINEERING  OPERATIONS
 ↘  ↓  ↙
DELIVERY
```

- Optional profiles below as dense rows (name · discipline · focus) — hairline list, no rounded photo cards required

#### Motion

- Signal animates Client → Delivery once  
- Hover discipline dims others

#### AC

- [ ] Network is primary; portraits secondary  
- [ ] Reads as operating model  

---

### APPROACH / 01 — Entry

**URL:** `/approach`  
**H1 EN:** How a system becomes operational.  
**H1 AR:** كيف يصبح النظام تشغيليًا.

#### Viewport frame

- Vertical spine of 10 stages; desktop detail panel sticky  
- Each stage must show **Input · Activity · Output · Decision gate**

#### Shared stage UI

Labels (EN / AR): **Input / المدخلات** · **Activity / النشاط** · **Output / المخرجات** · **Gate / بوابة القرار**

Desktop: spine left 3 cols + sticky detail 9 cols. Active stage gets 2px signal bar.  
Mobile: vertical accordion; one stage open.

#### Stages (locked, full fields)

**01 Discover / الاكتشاف**  
INPUT: business goal, constraints, stakeholders, current tools  
ACTIVITY: interviews, process observation, success criteria  
OUTPUT: problem framing + opportunity brief  
GATE: agree on the real problem before mapping tools  

**02 Map / التخطيط التشغيلي**  
INPUT: discover brief  
ACTIVITY: map roles, workflows, systems, pain points  
OUTPUT: operational map (as-is)  
GATE: confirm as-is accuracy with operators  

**03 Architect / المعمارية**  
INPUT: constraints, roles, workflows, systems map  
ACTIVITY: define modules, data, interfaces, integration edges  
OUTPUT: system architecture + delivery slices  
GATE: approve architecture before UI polish expands  

**04 Prototype / النموذج**  
INPUT: critical workflow slice  
ACTIVITY: interactive prototype of highest-risk path  
OUTPUT: validated flow + open questions  
GATE: go/no-go on UX direction  

**05 Design / التصميم**  
INPUT: approved flows + brand/system UI  
ACTIVITY: design system application, states, RTL  
OUTPUT: production-ready screens + component specs  
GATE: design QA against this Bible’s tokens  

**06 Build / البناء**  
INPUT: sliced architecture + designs  
ACTIVITY: implement modules, authz, data model  
OUTPUT: working increments in staging  
GATE: each slice demonstrably usable  

**07 Integrate / التكامل**  
INPUT: external systems list + contracts  
ACTIVITY: integrate payments/ERP/messaging/etc. safely  
OUTPUT: integration runbook + monitored links  
GATE: failure modes documented; no silent sync loss  

**08 Validate / التحقق**  
INPUT: staging system + real scenarios  
ACTIVITY: UAT, security checks, accessibility, performance  
OUTPUT: issue log + launch checklist  
GATE: blockers zero for launch path  

**09 Launch / الإطلاق**  
INPUT: checklist + rollback plan  
ACTIVITY: production deploy, monitoring, training handoff  
OUTPUT: live operating system  
GATE: ops owner named; support path live  

**10 Evolve / التطوير المستمر**  
INPUT: usage signals + backlog  
ACTIVITY: iterate modules, automate, expand sites/roles  
OUTPUT: versioned evolution plan  
GATE: prioritize by operational value, not novelty  

#### Closing band

CTA: `Start with a blueprint →` / `ابدأ بمخطّط النظام ←` → `/start`

#### Motion / Mobile / Do Don’t / AC

- Scroll-spy + signal node; reduced motion = instant panel swap  
- DON’T reduce to “Agile Design Sprint!” fluff; DO sound like delivery control  
- [ ] All 10 stages include four fields EN+AR labels  
- [ ] CTA to Builder present  
- [ ] Feels like a control strip, not a timeline infographic  

---

## Part 9 — Global chrome + system states

### NAV / Desktop + Mobile

Already tokenized in Part 2. Additional rules:

- Locale switch preserves path and scroll where possible  
- Active route: mono underline 1px signal  
- Mobile sheet: large type, CTA pinned, focus trap, ESC/close  

**AC:** Keyboard reachable; contrast AA; no hover-only nav.

### FOOTER

Structural columns, not card soup:

```text
ARKAN
Work · Capabilities · Approach · Studio · Start
Privacy · Terms · Cookies
Locale
Short promise line
```

Hairline top; meta type; no fake social proof counters.

### SPLASH (optional, rare)

Max 900ms; wordmark + micro signal; skippable; never blocks content on repeat visits (session memory).

**DON’T:** 3s cinematic logo slam.

### LOADING & SKELETONS

- Skeletons follow structural rows/panels (not gray card grids)  
- Pulse opacity 0.55–1.0, 1.2s  
- Prefer route-level suspense boundaries

### EMPTY STATES

Mono title + one sentence + one action.

Example Atlas empty filter: `NO SYSTEMS MATCH` · Clear filters.

### 404

```text
EN: SYSTEM NODE NOT FOUND
    Return home or open the Atlas.
AR: العقدة غير موجودة
    عد للرئيسية أو افتح الأطلس.
```

Composition: large meta code `404` + structural grid; primary CTA Home; secondary Atlas.

### COOKIES

Legally clear; branded language OK but not cute obfuscation. Categories toggle; save CTA signal; reject non-essential path available.

### PAGE TRANSITIONS

- 240–400ms shared dim + structural wipe (hairline sweep)  
- Keep wordmark stable when possible  
- Reduced motion: instant swap

### ARABIC-FIRST / RTL

- Default locale Arabic  
- Mirroring for rails, sticky chapters, blueprint side  
- Digits/system IDs may stay Latin  
- Line breaks authored separately per language  
- Never stretch Arabic to mimic English line lengths

---

## Part 10 — Creative QA + Prompt Library + Success

### 10.1 Final Creative Test (fail-hard)

Before approving any scene:

| # | Question | Fail action |
|---|---|---|
| 1 | Does this look like a template? | Redesign |
| 2 | Is the interaction communicating something? | Remove |
| 3 | Does this card need to be a card? | Usually flatten |
| 4 | Is this metric real? | Remove |
| 5 | Is project status truthful? | Correct |
| 6 | Does Arabic look equally intentional? | Unfinished |
| 7 | Could another agency swap the logo? | Identity fail |
| 8 | Does the visitor understand the system beneath the UI? | Case incomplete |
| 9 | Does conversion demonstrate capability? | Builder too generic |
| 10 | Does first viewport pass brand-first hero rules? | Rebuild hero |

### 10.2 Definition of Success

- **Brand:** Serious systems company, not freelance portfolio  
- **Visual:** Recognizable without logo  
- **Portfolio:** Complexity understood  
- **Technical:** Engineering quality demonstrated  
- **Conversion:** Visitor configures a meaningful brief  
- **Arabic:** Designed first  
- **Business:** Prospects see end-to-end ownership  

### 10.3 Prompt Library (ready to paste)

#### Master system prompt (designer or developer)

```text
You are executing the ARKAN Creative Execution Bible.
Concept: SYSTEMS, EXPOSED. Visual language: Architectural Editorial Interface.
Colors: bg #F3F5F8, navy #0B1F3A, signal #D7042A, foreground #12141A.
Type: Geist Sans + IBM Plex Sans Arabic; mono for system meta.
Rules: brand-first heroes; no card grids as default; no purple AI aesthetics;
no fake metrics; Arabic-first RTL; Signal red only for activity;
motion = Structural Reveal / Signal Flow / Layer Reveal / System Expand.
Output must include desktop + mobile, Do/Don’t, and acceptance checklist.
```

#### Home hero prompt

```text
Design/implement ARKAN HomeHero 100vh. Navy field, dominant wordmark,
promise line, two CTAs (Explore Systems / Start a Project), one signal line
animation after brand reveal. No mockups, badges, stats, or cards.
Provide AR + EN copy placement and reduced-motion fallback.
```

#### Atlas prompt

```text
Build Systems Atlas: filterable node topology from real project data,
fingerprint + system mass, list fallback on mobile, URL-sync filters,
transition into project Control Room. Not a screenshot portfolio grid.
```

#### Project X-Ray prompt

```text
Masar MVS-01 Control Room chapter: EXPERIENCE MODE vs SYSTEM MODE toggle,
spatially aligned overlays for modules/workflows/integrations, mobile tap
annotations, truthful OPERATING status, bilingual labels.
```

#### Builder prompt

```text
Build /start Project Builder: 10 steps, desktop split question|live blueprint,
mobile peek blueprint sheet, every answer mutates blueprint in ≤240ms,
contact only at step 10, blueprint summary generation, bilingual AR/EN,
no Typeform look, signal CTAs, accessible focus rings.
```

#### Tokens prompt

```text
Implement design tokens from ARKAN Bible Part 2: color, type scale desktop/mobile,
spacing 4px grid, radii, motion durations/easings, button/nav/focus behaviors.
Reject decorative glow and oversized pills.
```

### 10.4 Visitor journey (north-sequence)

```text
1 SEE THE BRAND
2 UNDERSTAND THE POSITION
3 DISCOVER WHAT ARKAN BUILDS
4 ENTER A REAL SYSTEM
5 SEE THE INTERFACE
6 REVEAL THE SYSTEM BENEATH IT
7 UNDERSTAND SCALE + ROLES + WORKFLOWS
8 UNDERSTAND FULL CAPABILITY
9 CONFIGURE THEIR OWN PROJECT
10 RECEIVE A SYSTEM BLUEPRINT
11 SEND A QUALIFIED BRIEF
```

That journey **is** the product.

### 10.5 Final design statement

> **Arkan's website must be an interactive proof of Arkan's ability to architect, design, build, integrate and operate complex digital systems. It must behave like a system, explain work like an engineering document, communicate like a premium enterprise brand, and convert like a product — not like an agency landing page.**

---

## Appendix A — Implementation Notes (compressed)

Keep engineering out of the creative body; use this when building.

### Stack direction

Next.js App Router · React · TypeScript · Tailwind · next-intl (AR default) · Framer Motion · Zod-validated APIs · Supabase for leads/admin as applicable.

### Performance targets (directional)

- LCP hero ≤ 2.5s on mid mobile  
- Avoid heavy 3D for brand moments  
- Prefer CSS/SVG for signal paths  
- Localize bundles; don’t ship unused locale strings blindly  

### Accessibility

- Focus rings always  
- Contrast AA+  
- Reduced motion  
- Keyboard Atlas/Builder  
- Announce step changes in Builder  

### Security (Builder / forms)

- Authz on admin only  
- Honeypot + rate limit  
- Server-side Zod validation  
- Upload allowlist + size caps + random storage names  
- Webhook SSRF allowlist  
- No secrets in client  
- Generic error messages  

### Analytics (minimum)

- `hero_cta_click`  
- `atlas_filter` · `atlas_node_open`  
- `project_xray_toggle`  
- `builder_step_view` · `builder_complete` · `brief_submit`  

### CMS / content rules

- Project status taxonomy enforced  
- No publish of unverified metrics  
- Fingerprint/mass derived from fields  
- Related projects must exist  

### Build phases (creative-aligned)

1 Strategy truth audit → 2 Identity tokens → 3 UX frames → 4 Visual scenes → 5 Prototype signature interactions → 6 Develop → 7 QA (RTL/a11y/perf) → 8 Launch → 9 Evolve portfolio/builder  

---

## Appendix B — Copy direction quick sheet

### Arabic homepage spines

- أركان / نبني أنظمة تشغّل شغلك.  
- المشروع الحقيقي أكبر من الشاشة التي تراها.  
- الواجهة هي فقط الجزء الذي تراه. / ونبني ما يجعلها تعمل.  
- ستّة تخصّصات. نظام واحد.  
- من الصفر إلى التشغيل.  
- عندك عملية معقدة؟ خلّينا نحوّلها إلى نظام.

### English homepage spines

- ARKAN / Systems that run the business.  
- The real system is bigger than the screen you see.  
- The interface is only the visible layer. / We build what runs underneath it.  
- Six disciplines. One system.  
- From zero to operating.  
- Have a complex operation? Let's turn it into a system.

### Arabic vs English rule

Same information, intent, hierarchy — different phrasing, line breaks, and type scale. No sentence-by-sentence calque.

---

## END OF CREATIVE EXECUTION BIBLE

**Project:** ARKAN  
**Concept:** SYSTEMS, EXPOSED.  
**Primary tagline:** نبني أنظمة تشغّل شغلك. / Systems that run the business.  
**Document role:** Single-source Creative + Product + UX Execution Brief for designers and developers (human or AI).  

If a deliverable cannot be checked against a scene’s Acceptance Criteria, it is not done.

