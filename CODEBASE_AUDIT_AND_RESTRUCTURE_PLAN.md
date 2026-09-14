# A-Picks Solutions: Codebase Audit and Restructure Plan

## 1. Purpose

This document is the technical handover for the current A-Picks Solutions website. It explains how the repository works today, identifies the main risks, and defines a maintainable target structure for the redesign and future features.

The current production behavior should be preserved during restructuring unless a change is explicitly approved. Business claims, pricing, contact details, testimonials, tracking, and form destinations must be confirmed by the client before launch.

## 2. Current Codebase

### Technology and hosting

- The site is plain HTML, CSS, and browser JavaScript. There is no package manager, build system, framework, automated test suite, linting, or CI configuration.
- `CNAME` points GitHub Pages to `apicks-solutions.com`.
- Google Fonts, Unsplash images, Formspree, WhatsApp, and Chart.js are loaded from third parties.
- `PUBLISH.md` describes several hosting choices, but the repository state and `CNAME` indicate GitHub Pages is the current deployment assumption.

### Repository map

| Path | Responsibility | Notes |
| --- | --- | --- |
| `index.html` | Main landing page | Contains most sections and a second contact form. |
| `about-us.html` | About page | Repeats the global header, CTA, footer, and floating WhatsApp link. |
| `services.html` | Services page | Repeats shared markup and contains a conflicting WhatsApp number in the footer. |
| `pricing.html` | Pricing page | Contains about 110 lines of page-local CSS plus extensive inline styles. |
| `contact-us.html` | Contact page | Submits directly to Formspree. |
| `fqa.html` | FAQ page | Route and filename are misspelled; public links and the sitemap repeat the typo. |
| `style.css` | All marketing-site styles | One 776-line global file containing foundations, components, page sections, and responsive rules. |
| `script.js` | Shared browser behavior | Mobile menu, slideshow, scroll reveal, counters, and sticky-header shadow. |
| `dashboard/` | Static dashboard prototype | Uses public JSON fixtures, Chart.js, and a password exposed in client-side code. It is not production authentication. |
| `sitemap.xml` | Search-engine URL list | Uses clean URLs while the home page uses `.html` links. |
| `40032...jpg` | Logo image and favicon | Non-descriptive filename; a square JPEG is reused for several purposes. |

### Runtime flow

1. Each page independently loads Google Fonts, `style.css`, and `script.js`.
2. Navigation and footer markup are copied into every page.
3. `script.js` looks for optional elements on the current page and enables the relevant effects.
4. Contact forms post visitor data directly to the configured Formspree endpoint.
5. The dashboard compares the entered password with the literal string `admin`, then fetches public local JSON and renders charts and HTML in the browser.

There is no application state, API, database, server-side authentication, or connection between Formspree submissions and the dashboard.

## 3. Findings and Priorities

### Critical before production work

- **Dashboard security:** `/dashboard` is public, its password is visible in `dashboard.js`, and all displayed data is downloadable without signing in. It must remain a clearly labelled demo, be excluded from deployment, or be replaced by real server-side authentication and authorized APIs.
- **Business information:** `services.html` contains WhatsApp number `+1 614-714-4733` in one footer while the rest of the site uses `+1 401-422-5616`. All phone numbers, address, hours, prices, discounts, statistics, testimonials, and performance claims need one client-approved source of truth.
- **User-provided content:** the dashboard writes message fields with `innerHTML`. That becomes an XSS vulnerability if real submissions replace the fixtures. Dynamic values must be rendered as text or sanitized.

### High priority during restructuring

- Shared header, navigation, footer, CTA, forms, and WhatsApp elements are duplicated across pages, so fixes can easily become inconsistent.
- Internal links mix root-relative clean URLs (`/services`) with file-relative URLs (`services.html`). This behaves differently on a custom domain, GitHub project pages, and local file previews.
- `fqa.html` should become `faq`; the old URL needs a compatibility redirect so bookmarks and indexed links do not break.
- The home-page Open Graph URL and image still reference the old GitHub Pages domain rather than `https://apicks-solutions.com`.
- Pricing styles are split between a `<style>` block, inline declarations, and the global stylesheet. This prevents reuse and makes responsive changes fragile.
- Content and presentation are coupled: navigation, contact data, packages, services, FAQs, testimonials, and metrics are hard-coded repeatedly in templates.

### Quality and maintenance concerns

- Pages lack a shared metadata/canonical-URL strategy, consistent active navigation, and structured data.
- Most pages do not use a `<main>` landmark. Forms rely on placeholders instead of visible labels, the menu does not expose `aria-expanded`, and animations do not respect reduced-motion preferences.
- New-tab links do not declare `rel="noopener noreferrer"`.
- Remote hero images create an external availability/privacy dependency and can shift page performance. Local optimized assets should be preferred.
- JavaScript has no error-state UI, slideshow pause controls, focus/menu-close behavior, or fallback when browser APIs are unavailable.
- There are no automated checks for broken links, HTML/accessibility problems, responsive regressions, submissions, or builds.

## 4. Target Architecture

### Architecture decision

Use **Astro with TypeScript and static output** for the marketing site. Astro fits a mostly static multi-page website, generates deployable HTML for GitHub Pages, supports reusable components and layouts, and allows interactive JavaScript only where needed. Do not introduce a client-side SPA or global state library for the landing site.

Treat a future authenticated dashboard as a separate application boundary. If the upcoming feature requires accounts, private customer data, payments, or server-side workflows, choose its backend and hosting from that feature's requirements; GitHub Pages alone cannot provide those capabilities.

### Proposed structure

```text
.
├── public/
│   ├── assets/
│   │   ├── icons/
│   │   └── images/
│   ├── CNAME
│   ├── robots.txt
│   └── legacy/                 # compatibility pages only when required
├── src/
│   ├── components/
│   │   ├── layout/             # Header, Footer, Navigation
│   │   ├── sections/           # Hero, Services, Pricing, FAQ, CTA
│   │   └── ui/                 # Button, Card, FormField, Container
│   ├── content/                # approved services, pricing, FAQs, claims
│   ├── layouts/                # shared document shell and SEO metadata
│   ├── pages/                  # route-level composition only
│   ├── scripts/                # small isolated browser behaviors
│   ├── styles/                 # tokens, reset, global, utilities
│   └── types/                  # shared content and feature contracts
├── tests/
│   └── e2e/                    # navigation, forms, accessibility smoke tests
├── astro.config.mjs
├── package.json
├── tsconfig.json
└── README.md
```

### Code boundaries and conventions

- Route files compose sections and supply page metadata; they must not duplicate the global shell or contain page-local `<style>` blocks.
- `BaseLayout` owns the document structure, canonical URL, Open Graph metadata, font loading, header, footer, and common scripts.
- Repeated content lives in typed modules. At minimum define `SiteConfig`, `NavItem`, `Service`, `PricingPlan`, `FaqItem`, `Testimonial`, and `ContactDetails`.
- `SiteConfig` is the single source for canonical domain, email, phone/WhatsApp, address, business hours, social links, default SEO image, and navigation.
- Design tokens define colors, type scale, spacing, radii, shadows, container widths, and breakpoints. Components use semantic variants instead of one-off inline styles.
- Browser scripts are feature-scoped and progressively enhanced. Navigation works without JavaScript; animations cannot hide content when scripting fails.
- Use descriptive lowercase kebab-case asset names, optimized WebP/AVIF variants where useful, explicit image dimensions, and meaningful alt text.
- Use `/faq` as the canonical route. Preserve incoming `/fqa`, `/fqa.html`, and existing `.html` URLs during the migration using host-supported redirects or generated compatibility pages, then update the sitemap and internal links.

### Data and security boundaries

- Public marketing content may be stored in version-controlled typed data files.
- Secrets, authentication decisions, real leads, contact messages, and customer metrics must never be stored in public JSON or client-side source.
- Keep Formspree for the first migration only after ownership, spam protection, consent copy, success/error behavior, and data destination are verified. Wrap its URL in environment configuration rather than duplicating it.
- Render external/user data with safe text APIs. Any future HTML content must be sanitized at a trusted boundary.
- Add a privacy policy and cookie/tracking consent only when applicable to the integrations actually selected; do not add pretend compliance text.

## 5. Migration Plan

### Phase 0 — Baseline and client confirmation

- Record screenshots at desktop, tablet, and mobile widths and inventory all current routes and outbound links.
- Obtain approval for brand spelling, logo files, domain, contact details, address/hours, Formspree ownership, prices, promotion dates, claims, and testimonials.
- Decide whether the dashboard is removed from the deployment, retained as a demo with fake data, or specified as a separate production product. Default: exclude it from the public marketing build.
- Define the next feature before choosing any backend or application framework for that feature.

### Phase 1 — Foundation

- Initialize Astro, TypeScript strict mode, formatting/linting, a reproducible package lock, and static GitHub Pages output.
- Add the shared layout, metadata helper, site configuration, design tokens, base styles, asset directories, and reusable UI primitives.
- Add CI checks for install, type checking, build, tests, and broken internal links.

### Phase 2 — Page migration

- Migrate one representative page first and compare it visually with the baseline.
- Extract the header, footer, CTA, WhatsApp link, cards, forms, and repeated sections; migrate remaining pages without changing approved content.
- Move services, plans, FAQs, testimonials, metrics, and contact information to typed content modules.
- Replace inline/page-local styles, normalize URLs, correct metadata, add semantic landmarks and form labels, and preserve legacy routes.

### Phase 3 — Behavior and quality

- Rebuild the mobile menu with keyboard support, focus handling, `aria-expanded`, outside/Escape close, and scroll-safe behavior.
- Make counters, reveal effects, and slideshows optional enhancements with reduced-motion support and no hidden-content failure mode.
- Add explicit contact-form pending, success, validation, spam, network-error, and retry experiences.
- Optimize/localize images, remove unused CSS and scripts, and verify third-party loading and privacy impact.

### Phase 4 — Release

- Preview the generated site on a staging URL and complete content, browser, mobile, accessibility, SEO, and form-submission review.
- Deploy with a rollback point, verify the custom domain/HTTPS, sitemap, robots rules, canonical tags, legacy URLs, and Search Console ownership.
- Monitor broken routes, form delivery, browser errors, and performance after launch.

## 6. Future Feature Intake

Before implementing the upcoming feature, add a short specification answering:

1. What user problem does it solve, and who is allowed to use it?
2. What is the complete happy-path journey and measurable success condition?
3. Does it require private data, accounts, roles, payments, uploads, notifications, or an admin workflow?
4. What data enters the system, where is it stored, who owns it, and when is it deleted?
5. Which external services are required, and what happens when each one is unavailable?
6. Which pages/components change, and which existing URLs or behaviors must remain compatible?
7. What loading, empty, validation, error, unauthorized, and retry states are required?
8. What analytics events are necessary, and what consent/privacy obligations do they create?
9. What acceptance tests prove the feature is ready, and how can it be rolled back?

The resulting feature contract should identify its UI entry point, typed inputs/outputs, API boundaries, authorization rules, state transitions, error behavior, analytics, and test cases before implementation begins.

## 7. Definition of Done

The restructure is complete when:

- Every public page is generated from shared layouts/components and contains no duplicated global shell or inline styling.
- Approved business and contact content comes from one typed source of truth.
- Existing valuable URLs continue to work, `/faq` is canonical, and internal links plus sitemap URLs are consistent.
- No prototype password, private message, secret, or customer data is shipped to the browser or public repository.
- Keyboard navigation, visible focus, semantic landmarks, labels, contrast, responsive layouts, and reduced motion are verified.
- Automated checks cover production build, types/linting, internal links, primary navigation, mobile menu, contact-form states, and critical accessibility rules.
- The built site is reviewed at 320 px, 768 px, 1024 px, and a wide desktop viewport in current Chrome, Safari, and Firefox.
- Deployment and local-development instructions in `README.md` match the real workflow, and a clean checkout can be built with documented commands.

## 8. Working Rules for New Changes

- Make small, reviewable migrations; do not combine content rewrites, visual redesign, platform migration, and a major new feature in one untestable change.
- Preserve behavior first, then improve it with separately reviewable decisions.
- Do not hard-code shared contact or commercial information in components.
- Do not add dependencies without a clear owner, purpose, maintenance status, and bundle/privacy review.
- Do not use the public dashboard prototype as the foundation for real authentication or customer data.
- Document material architecture decisions in the repository and update this plan when the upcoming feature changes its assumptions.
