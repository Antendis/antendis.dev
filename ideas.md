# Vercel Ship London — Site Breakdown

Reference: https://vercel.com/ship/london

---

## Overview

**Vercel Ship 26** is a 1-day AI conference touring 5 cities globally: London, New York City, Berlin, Sydney, and San Francisco. The London edition takes place on **June 17, 2026** at **Prospero House**. The tagline is: *"Ship what's next."*

The event targets engineers, product teams, and founders who build, deploy, and scale apps and AI agents. The format mixes hands-on workshops with a main conference stream, keynotes, and networking.

---

## Site Sections

### 1. Navigation / Sticky Header

- Minimal, sticky header that persists on scroll
- Uses `mix-blend-mode` CSS property so the logo and nav links visually invert/adapt as they pass over light and dark page sections — no hard-coded color switch
- Contains the Vercel wordmark/logo on the left
- CTA button ("Get your ticket" or "Register") on the right
- City navigation tabs to switch between event cities (London, SF, NYC, Berlin, Sydney)

---

### 2. Hero Section

- Full-viewport opening panel
- Event name: **Ship 26 London**
- Date: **June 17**
- Venue: **Prospero House, London**
- Primary CTA: **"Get your ticket"** → links to `/ship/london/register`
- Secondary copy: *"A 1-day AI conference built for you to ship what's next"*
- Large typographic treatment — Geist typeface, bold weight
- Background: dark/black with subtle atmospheric lighting, generated imagery (15,000+ images and videos were produced using Flux, Veo 2, Runway, and Ideogram before selecting hero visuals)
- Possible animated or cinematic background element

---

### 3. "What You Can Expect" Section

- Scroll-driven, sticky full-screen section
- Built using `useTransform` from **Motion for React** (formerly Framer Motion)
- Features a **custom zoom effect** — as the user scrolls, content zooms into view with calculated mathematical easing
- Sticky containers anchor each content block as the next scrolls over it
- Highlights the four core event pillars:
  - Hands-on workshop sessions
  - Conference talks & technical sessions
  - Keynotes on the future of agentic infrastructure
  - Networking with peers

---

### 4. Speakers Section

Featured speakers confirmed for London:

| Speaker | Role | Company |
|---|---|---|
| Guillermo Rauch | Founder & CEO | Vercel |
| Mike Taylor-Cai | Product Manager | Google DeepMind |
| Alex Holt | Engineering | ElevenLabs |
| Aydrian Howard | Developer Advocate | Auth0 |
| Michał Pierzchała | Principal Engineer | Callstack |

- Speaker cards: photo, name, title, company
- Links to a dedicated `/ship/speakers` page with the full roster
- Community call for speakers (CFP): technical talks on production apps and agents, open to apply for any of the 5 cities

---

### 5. Sessions / Schedule

Featured session topics visible on the London page:

- **Voice AI Agents** — How ElevenLabs and Vercel's AI SDK enable real-time voice agents that listen, reason, and respond
- **AI-Generated Docs** — Using Mintlify + Vercel Sandbox: an agent harness that analyzes a codebase, generates a full docs site in parallel, verifies it by actually building the Next.js site
- **Opening Keynote** by Guillermo Rauch on the AI Cloud and agentic infrastructure
- **Customer Panels** — Real production stories from the world's fastest-moving teams

Schedule format:
- Morning: Workshops (hands-on, smaller groups)
- Afternoon: Main conference stream (talks, panels, keynotes)
- Evening: Networking / pre-event party at **Outernet** (immersive experience space in central London)

Full schedule linked at `/ship/london/schedule`

---

### 6. Registration Flow

- Dedicated page at `/ship/london/register`
- Designed and prototyped in **v0** (Vercel's AI UI generation tool), aligned to the Geist design system
- Form fields: name, email, company, role
- Ticket types: In-person (limited) / Online stream
- Backend: Next.js app + **Postgres** database + **Payload CMS**

---

### 7. Gallery / Media Section

- Visual gallery of past Ship events
- Interactions prototyped in v0
- Mix of photography, AI-generated imagery, and video clips
- Tools used for visual generation: **Flux**, **Veo 2**, **Runway**, **Ideogram**

---

### 8. Sponsors / Partners

- UNRVLD confirmed as a Vercel partner attending the London event
- Partner logos section in a horizontal strip
- Likely tiered (headline sponsor, supporting sponsors)

---

### 9. Footer

- Links to other Ship city pages
- Links to past Ship events (2024, 2025)
- Vercel standard footer: Products, Resources, Company, Social links
- "Watch on demand" link for past sessions

---

## Design System & Tech Stack

### Visual Design

- **Dark-first aesthetic**: deep black/near-black backgrounds, white typography
- **Typeface**: Geist (Vercel's own typeface) — clean, geometric sans-serif
- **Color palette**: Minimal — black, white, with subtle warm/cool atmospheric lighting accents
- **Motion**: Purposeful scroll-driven animations, not decorative — zoom, sticky parallax, blend-mode header
- **Layout**: Full-bleed sections, high contrast, lots of whitespace

### Technology

| Layer | Tool |
|---|---|
| Framework | Next.js (App Router) |
| Database | Postgres |
| CMS | Payload |
| Component library | shadcn/ui |
| Design system | Geist |
| Variant management | cva (class-variance-authority) |
| Animations | Motion for React (useTransform, sticky scroll) |
| Prototyping | v0 (Vercel's AI UI tool) |
| Design | Figma (core structure), v0 (iteration) |
| AI image generation | Flux, Veo 2, Runway, Ideogram |

### Build Process

1. Brand, Engineering, and Marketing collaborated in a single fast loop
2. Core structure and layout mapped in **Figma**
3. Key sections (registration, schedule, gallery) prototyped directly in **v0** via text prompts
4. Live prototypes shipped on day one for feedback
5. 15,000+ image/video assets generated by AI tools before finalising hero visuals
6. Reusable, themeable component library built with shadcn + Geist + cva to support all 5 city sites from one codebase

---

## Key Design Decisions to Note

- **`mix-blend-mode` sticky header**: elegant solution for a header that works across both light and dark sections without JavaScript color toggling
- **Scroll-zoom "What you can expect"**: `useTransform` + sticky containers create a cinematic, magazine-like scroll experience
- **v0 for rapid prototyping**: entire registration and schedule UIs were generated via AI prompts then refined — not built from scratch
- **Multi-city theming**: one component library, per-city theme via cva — each city page can be styled distinctly without duplicating components
- **AI-generated visuals at scale**: 15k+ assets generated to find the right visual language for the event, rather than relying on stock photography or manual design

---

## Pre-Event Activities

- **Outernet London**: immersive experience venue in central London hosting the pre-event party the evening before the conference
- **Fringe events**: a week of community meetups and side events surrounding the main conference day

---

## Multi-City Context

Ship 26 runs across 5 cities in 2026:

| City | Date |
|---|---|
| London | June 17 |
| New York City | TBC |
| Berlin | TBC |
| Sydney | TBC |
| San Francisco | TBC |

Each city has its own `/ship/<city>` page, built from the same themeable component system.
