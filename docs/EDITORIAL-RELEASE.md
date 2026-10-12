# Meet Saif — editorial preview

The new direction uses the supplied handoff as a visual reference: warm paper, black editorial typography, an integrated S wordmark and the supplied portrait. React/Vite and static rendering are retained. No WebGL or animation library is loaded by the new entry point.

## Source

- `src/editorial/Portfolio.jsx`: shared, responsive components and interactions.
- `src/editorial/copy.js`: edited bilingual copy and service descriptions.
- `src/editorial/portfolio.*.json`: supplied source content, including qualified results.
- `src/editorial/style.css`: layout, tokens, RTL and reduced-motion behavior.
- `public-editorial/`: the only assets copied into the release. Original proof screenshots and handoff mockups are not served.
- `docs/handoff-assets/`: original supplied assets retained for reference.
- `scripts/editorial-prerender.mjs`: eight static pages plus 404, unique metadata and structured data.

English homepage: `/`. Arabic: `/ar/`. Service pages: `/services/meta-ads/`, `/services/google-ads/`, with matching Arabic routes. `/services/` lists the two services. Older service routes show a recovery page; the previous implementation remains in Git history.

## Run

`npm run dev` starts local development. `npm run build`, `npm run lint`, `npm run format:check` and `npm test` validate the release. Tests cover six widths in both languages, axe accessibility, service routing, dialog focus, navigation, WhatsApp encoding and server-rendered content without JavaScript.

GitHub preview builds use `VITE_BASE_PATH`, `VITE_PREVIEW_MODE=true` and `VITE_PREVIEW_URL`. Preview pages are noindex. Production origin defaults to `https://saif-growth.com/`; no DNS or domain connection is made by building.

## Content and privacy

The three results are project-specific. Recorded conversions are not confirmed bookings, installs are not retained users, and ROAS is not profit. No Meta results, client logos, certifications or testimonials are fabricated. Evidence images containing client data are withheld from this preview. The ecommerce proof remains pending. The supplied portrait is AI-processed; confirm likeness before production launch.

WhatsApp messages are prepared locally and open only after a visitor submits. The visitor must send the message in WhatsApp. The form is disabled without JavaScript, with a direct contact fallback. No contact values are included in analytics events.

`portfolio:event` CustomEvents expose `view_case_study`, `click_whatsapp_cta`, `contact_form_submit`, `click_email` and `language_switch`. These are integration hooks, not an active external analytics connection. Configure consent and the approved analytics destination before production.

## Before production

Approve portrait likeness and final copy; reconfirm WhatsApp contact details; supply approved evidence for ecommerce and any future Meta case; configure consent/analytics and connect the custom domain only after approval. Original production remains untouched.

## Finishing pass, October 12, 2026

Reviewed the live original at https://saif-shorfa.netlify.app/ and transferred its three case narratives: a multi-specialty clinic, a legal app serving women in Saudi Arabia, and a travel-bag store. Each case now includes the challenge and execution in both languages. The healthcare period (July 1 to 25, 2026) and SAR 5,906.11 spend are from the published original. Results remain reported project figures, with their original SAR currency and existing qualifications. No Meta case was present in the original, so none was added. Client evidence screenshots remain withheld.

Removed decorative section/project numbering, hand-drawn platform icons, and prose em dashes. Contact budget choices use USD; these are visitor input ranges, not currency conversions of previous campaign results. Europe is described as the next focus for collaboration, without claiming past European projects.

Portraits disable native dragging and their context menus; CSS also suppresses the standard touch callout where supported. These are basic interaction deterrents, not protection against screenshots, network access or inspection of public frontend code. No copy, keyboard or developer-tool restrictions are imposed.

The closed social account still needs identification before its links are removed. Domain connection, articles, a dashboard and publication to the original production site are outside this preview release.
