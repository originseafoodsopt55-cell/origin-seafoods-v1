# Origin Seafoods Website V1

Modern corporate website for Origin Seafoods Co., Ltd., built for Vercel with Next.js 15, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide Icons.

## Features

- Sticky bilingual-style navigation with CTA
- Full-width seafood import/export hero using supplied brand artwork
- About, product categories, imported brands, global supply network, gallery, contact form, and footer
- Responsive desktop, tablet, and mobile layout
- Open Graph metadata, `robots.txt`, and `sitemap.xml`
- Static, Vercel-ready App Router build

## Local Development

```bash
npm install
npm run dev
```

## Verification

```bash
npm run lint
npm run typecheck
npm run build
```

## Deployment

Deploy the project folder to Vercel. The app builds with:

```bash
npm run build
```

Update `metadataBase` in `src/app/layout.tsx` if the final production domain differs from `https://originseafoods.co.th`.
