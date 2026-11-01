# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

The main reader is a recruiter or hiring manager filling a full-time frontend role, either remote or in Kathmandu. They are scanning several candidates quickly. They need to answer three questions: can this person ship production frontend work, what did they personally build, and how do I contact them. Freelance clients and other developers can read the site, but no design decision is made for them.

## Product Purpose

This is the personal portfolio of Nirmal Maharjan, a Frontend Developer in Kathmandu, Nepal (UTC+5:45), at nirmal-maharjan.com.np. Its job is to get Nirmal hired. Success means a hiring reader reaches out by email, downloads the résumé, or goes on to read the project work. The homepage's main action is "Email me" (`SOCIAL_LINKS.hireEmail`), and the page states what Nirmal is looking for (`SITE_CONFIG.lookingFor`).

## Positioning

The site makes two claims that it can back up, in this order:

1. **Real shipped work.** Nirmal has built production client websites and landing pages, and three admin dashboards end to end: Paradise Hills Resort (solo), the Plex Bit company CMS, and Galli Maps.
2. **A business head.** Before code, Nirmal spent about 8 years in accounting, finance and pharmaceutical sales, working with clients every day. That background shapes how Nirmal approaches a build: understanding what the client needs before writing code.

Nirmal switched careers into frontend in 2023 and climbed quickly (in the first year, taking over a live product's Vue 2 → Vue 3 rebuild and doing most of it alone; a senior developer set up the new project and two colleagues built the first pages). The switch is part of the story, but the work leads.

## Operating Context

- Readers arrive from job applications, LinkedIn, GitHub or a shared link, often on a phone, and decide within seconds whether to read further.
- The résumé is part of the evaluation. The `/resume` page and the generated `/resume.pdf` render from one model (`RESUME_DOC` in `src/features/resume/utils/resume-document.ts`), and the PDF must stay one A4 page.
- Contact happens by email, through LinkedIn and GitHub, and on the `/contact` page.

## Capabilities and Constraints

- Stack: Next.js 15 (App Router), React 19, TypeScript, Tailwind CSS 3, next-themes (light/dark), MDX blog, @react-pdf/renderer for the résumé PDF. Linting is Ultracite (Biome). Hosted on Vercel; the live site updates only after a push.
- Routes: `/` (projects, experience, about and skills highlights), `/projects` (full showcase), `/about`, `/contact`, `/resume` (also opens as a dialog from the nav), `/resume.pdf`, `/uses`, `/blog`, plus the RSS feed, sitemap and robots.
- Content is data-driven: `src/configs/site.ts` and `src/features/*/constants/`.
- The blog stays out of the nav and sitemap until Nirmal publishes a real post; the current sample posts are drafts.
- Undecided: the testimonials section is built but stays hidden until at least one real quote exists.

## Evidence on Hand

- Experience: Plex Bit Infosystems (Frontend Developer, current), Galli Maps (Frontend Developer, Dec 2024–Jun 2025), Miracle Yard (Frontend Developer and Intern, Nov 2023–Sep 2024). Before code: Max International, Omnica Laboratories, Shree Om Brothers (Pfizer India). Source: `src/features/profile/constants/profile.ts`.
- Client projects, each with a "My part" line and a status (`live`, `launching-soon`, `in-progress`): Plex Bit, Paradise Hills Resort, Luxe, Plexler, Sierra Adventurer, Prabhu Adventure, Galli Maps, meromenu.com. Learning builds and early apps are on demo subdomains. Source: `src/features/projects/constants/projects.ts`; screenshots are in `src/assets/images/projects/`.
- Hero figures (`FACTS`): 1.5+ years building production frontends, 8+ client projects, 3 dashboards built end to end, 8 years of client-facing work before code.
- Education: MBS, BBS, CA Foundation. Training: a UI/UX crash course, plus self-study through freeCodeCamp and The Net Ninja.
- Photo: `me.jpg` is a passport-style shot, used only on `/about` and in the JSON-LD. There is no professional photo, and an AI-generated person must not be used.
- **Absent:** testimonials, client logos used with permission, metrics beyond the figures above. Don't invent any of these.

## Product Principles

1. **Every claim is checkable.** No invented proof: no fabricated testimonials, metrics, clients or outcomes. Each hero figure and strength must point to a role or project on the site.
2. **Work first, story second.** Lead with shipped work and what Nirmal personally built. The career switch and business background explain why that work is good; they don't stand in for it.
3. **Respect the scanning recruiter.** Make the key facts (role, availability, contact) reachable within seconds on any device. Depth lives on `/projects`, `/about` and `/resume`.
4. **Private stays private.** The phone number appears only in the generated résumé PDF. It never appears on web pages or in client JavaScript (`src/configs/site.ts` or any `"use client"` import chain).

## Accessibility & Inclusion

The current baseline is Lighthouse 100 for accessibility, best practices and SEO on every page, with 0 axe violations. Keep both light and dark themes working and the theme switch visible.
