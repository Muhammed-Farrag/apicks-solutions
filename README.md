# A-Picks Solutions

This is a local React, TypeScript, and Vite website. The pages are Home, About, Services, Pricing, FAQ, Contact, Lead Room, and Account Access.

## Run locally

Install Node.js and npm, then run these commands from this project folder:

```sh
npm ci
npm run dev
```

Open <http://localhost:5173/>. The server updates the site when you edit a source file. Press `Ctrl+C` in its terminal to stop it. Other pages use URLs such as <http://localhost:5173/?page=about>.

## Check a local build

```sh
npm run typecheck
npm run build
npm run preview
```

Open <http://127.0.0.1:4173/> for the local preview. `npm run build` creates the optimized files in `dist/` on your computer; it does not publish or deploy the site. Run `npm run audit` to check installed dependencies for known advisories.

## Optional service configuration

Copy `.env.example` to `.env.local` to configure public sign-up and contact endpoints. Values beginning with `VITE_` are visible in browser code, so do not put secrets in them. The lead cards and bid amounts are illustrative previews; reviewing an amount does not submit a bid.

## Update timestamps

Times below are local Cairo time (EEST, UTC+3). They record the latest edits to the relevant project files, rather than deployment events.

- **2026-09-16 05:13** — Added a property-image fallback when the 3D renderer fails.
- **2026-09-16 05:22** — Reused Home's full scene panel across the other pages and matched its width at desktop, tablet, and mobile sizes.
- **2026-09-16 05:28** — Replaced this README with local run instructions and these timestamps.
