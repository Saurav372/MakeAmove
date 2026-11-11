# Make A Move (`makeamove.fit`) — Client Reference & Content Hub

This directory contains all client research, audits, scraped DOM data, full-site copy extractions, legal disclaimers, drafted blog posts, brand assets, and reference components for [makeamove.fit](https://makeamove.fit/).

---

## Directory Contents

```text
website_reference/
├── README.md                            # Directory index & reference guide (this file)
├── makeamove_fit_detailed_analysis.md   # Complete 38KB audit, page breakdowns & verbatim site copy
├── site_analysis_raw.json               # Structured JSON: metadata, heading tags (H1-H4), forms, links
├── full_site_content.json               # Cleaned raw text dictionary for all 8 indexed site pages
├── HEALTH_DISCLAIMER.md                 # Legal fitness & medical liability disclaimer template
├── PRIVACY_POLICY.md                    # Privacy policy covering health data, forms, and WhatsApp
├── assets/                              # Saved client branding & visual media:
│   ├── makeamove-logo.png               # Original Make A Move logo
│   └── coach-kunal.jpg                  # Studio portrait of Coach Kunal
├── components/                          # Reference UI components:
│   └── ThreeHero.astro                  # Native Vanilla Three.js interactive 3D hero component
└── blog/                                # Full production-ready markdown guides for the 5 placeholder cards:
    ├── beginner-squat-form-cues.md      # Guide: Depth, knee tracking, and foot stability for squats
    ├── desk-mobility-reset.md           # Guide: 10-minute neck, thoracic, and hip mobility sequence
    ├── habit-stacking-workouts.md       # Guide: Behavioral habit architecture for busy pros
    ├── postpartum-core-rebuild.md       # Guide: Diaphragmatic breathing and pelvic floor rehab
    └── protein-strategies-busy-pros.md  # Guide: High-protein strategies for corporate travel & busy days
```

---

## File Summary & Usage

### 1. Raw Data & Site Copy
- **[`site_analysis_raw.json`](file:///e:/Saurav/Make-a-move/website_reference/site_analysis_raw.json):** Semantic DOM structure, heading hierarchy (`H1`–`H4`), forms, image counts, and link arrays for all 8 pages.
- **[`full_site_content.json`](file:///e:/Saurav/Make-a-move/website_reference/full_site_content.json):** Verbatim unclipped text of every page as a key-value dictionary.

### 2. Full Audit & Strategy
- **[`makeamove_fit_detailed_analysis.md`](file:///e:/Saurav/Make-a-move/website_reference/makeamove_fit_detailed_analysis.md):** 38KB report including executive summary, tech audit (Astro/Tailwind/S3), CRO recommendations, and verbatim content for all 8 pages.

### 3. Legal & Compliance
- **[`HEALTH_DISCLAIMER.md`](file:///e:/Saurav/Make-a-move/website_reference/HEALTH_DISCLAIMER.md):** Medical disclaimer and fitness risk waiver.
- **[`PRIVACY_POLICY.md`](file:///e:/Saurav/Make-a-move/website_reference/PRIVACY_POLICY.md):** Privacy policy addressing intake questionnaires, WhatsApp messaging, and progress tracking data.

### 4. Blog Guides (`blog/`)
- **[`blog/beginner-squat-form-cues.md`](file:///e:/Saurav/Make-a-move/website_reference/blog/beginner-squat-form-cues.md)**
- **[`blog/desk-mobility-reset.md`](file:///e:/Saurav/Make-a-move/website_reference/blog/desk-mobility-reset.md)**
- **[`blog/protein-strategies-busy-pros.md`](file:///e:/Saurav/Make-a-move/website_reference/blog/protein-strategies-busy-pros.md)**
- **[`blog/habit-stacking-workouts.md`](file:///e:/Saurav/Make-a-move/website_reference/blog/habit-stacking-workouts.md)**
- **[`blog/postpartum-core-rebuild.md`](file:///e:/Saurav/Make-a-move/website_reference/blog/postpartum-core-rebuild.md)**

### 5. Media Assets & Reference Components
- **[`assets/`](file:///e:/Saurav/Make-a-move/website_reference/assets/):** Original logo (`makeamove-logo.png`) and studio photo of Coach Kunal (`coach-kunal.jpg`).
- **[`components/ThreeHero.astro`](file:///e:/Saurav/Make-a-move/website_reference/components/ThreeHero.astro):** Standalone Vanilla Three.js hero section template with kinetic particles, wireframe torus, and Astro View Transitions cleanup logic.
