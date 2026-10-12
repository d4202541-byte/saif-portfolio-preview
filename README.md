# Saif Shorfa — Meet Saif

A bilingual editorial portfolio for an independent Meta Ads and Google Ads specialist. Built with React, Vite and static HTML rendering.

## Preview

English: https://d4202541-byte.github.io/saif-portfolio-preview/

Arabic: https://d4202541-byte.github.io/saif-portfolio-preview/ar/

This is a separate preview repository. The original portfolio and custom domain are not modified.

## Development

- `npm ci`
- `npm run dev`
- `npm run build`
- `npm run lint`
- `npm run format:check`
- `npm test`

## Structure

New components, copy and styling live in `src/editorial/`. Only `public-editorial/` is published. Eight routes are rendered to static HTML, including English and Arabic homepages, service directories and dedicated Meta Ads / Google Ads pages.

See [release notes](docs/EDITORIAL-RELEASE.md) for content integrity, interactions, deployment settings and remaining production requirements. The supplied [handoff](docs/MEET-SAIF-HANDOFF.md) and original assets are preserved in `docs/`. Earlier designs and service components remain available in Git history and legacy source.

GitHub Pages builds use the repository subpath and noindex metadata. Production domain connection and external analytics activation require separate setup and approval.
