# Saif Shorfa — Separate Portfolio Preview

An independent experimental copy of the portfolio redesign, built with React 19, Vite, React Three Fiber / Three.js and GSAP. English and Arabic pages are prerendered to semantic HTML.

Preview: https://d4202541-byte.github.io/saif-portfolio-preview/

This repository has its own Git history and GitHub Pages workflow. It does not change `d4202541-byte/saif-portfolio`, the existing Netlify site, or its production branch.

## Run locally

```sh
npm ci
npm run dev
```

Vite prints the local URL, normally http://127.0.0.1:5173. Arabic is at /ar/.

```sh
npm run lint
npm run build
npm run preview
npm test
```

Browser tests use the installed Microsoft Edge through Playwright. Change `channel` in `playwright.config.js` if a different installed browser is needed. Build output is `dist/`; the SSR intermediate directory `.ssr/` is ignored.

## Editing

- `src/components/`: navigation, hero, services, work/evidence, process, insights, about, contact and footer.
- `src/copy.js`: new interface text, in English and Arabic.
- `src/content.json`: original bilingual portfolio content.
- `src/person.json`: original Person structured data.
- `src/styles.css`: color/spacing tokens, section styles, responsive and RTL rules.
- `public/assets/`: preserved original evidence, portrait and logo files.
- `scripts/prerender.mjs`: generates English and Arabic static pages and locale metadata.
- `legacy/`: archived original source and hosting instructions for reference.
- `docs/AUDIT.md`: audit, decisions, content provenance and remaining assets.

`Copy` only renders trusted, repository-owned translation HTML. Do not pass user-submitted content to it.

## Motion and performance

The optional desktop scene loads after initial rendering, only with a fine pointer, at least 900px width, WebGL2, no reduced-motion preference and no data-saving preference. The CSS orbit remains available without WebGL, JavaScript or after context loss. Animation pauses offscreen and when the tab is hidden, and a visible pause control is provided.

GSAP handles entrance and section reveals. Reduced-motion visitors skip the animation downloads at initial load. React/HTML content remains available independently of optional animation code.

The Three.js renderer is about 234 KB gzipped in a deferred chunk and produces Vite's large-chunk advisory. It is excluded from initial page preloads and from mobile/reduced-motion scene requests.

## Integrations and hosting

The enquiry form retains the original phone number and opens an encoded WhatsApp message for the visitor to review and send. It also supplies a direct continuation link when popup opening is unavailable. No submission backend is implied.

Microsoft Clarity retains the original project ID, configurable via `VITE_CLARITY_ID` (see `.env.example`). Tracking is disabled in development, on loopback hosts, and in the published preview.

GitHub Actions runs lint and builds this preview on pushes to this repository's `main` branch, then publishes `dist` to GitHub Pages. The workflow sets `VITE_BASE_PATH=/saif-portfolio-preview/`, `VITE_PREVIEW_MODE=true`, and `VITE_PREVIEW_URL` to the preview URL. Preview pages use `noindex, nofollow`, disallow crawling, and do not include a sitemap. The original Netlify configuration is retained for reference; no existing Netlify site is connected or deployed by this workflow.

For a local Pages build in PowerShell:

```powershell
$env:VITE_BASE_PATH='/saif-portfolio-preview/'
$env:VITE_PREVIEW_MODE='true'
$env:VITE_PREVIEW_URL='https://d4202541-byte.github.io/saif-portfolio-preview/'
npm run build
npm run preview -- --port 4174
```

Open `http://127.0.0.1:4174/saif-portfolio-preview/`. Run `node scripts/check-preview.mjs` in another terminal to check the project path, both languages, images, navigation, responsive layouts, and browser errors. The original browser suite covers root-hosted builds; it expects port 4173 and a default `/` build.

## Assets still needed

1. The visual reference mentioned in the brief was not available in the conversation or selected checkout. This implementation follows the written art direction; exact reference matching remains a review step.
2. An approved portrait. Existing portrait files are retained but the new layout uses an explicit placeholder as requested.
3. Approved client logos. Existing files are retained; the new logo strip shows explicit placeholders.
4. Individual approved insight article URLs if article cards are preferred over the existing author-profile links.

A typography-based social sharing PNG is included. Use `node scripts/social.mjs` to regenerate it from `public/social.svg`.
