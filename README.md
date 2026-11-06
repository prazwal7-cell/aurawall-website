# AuraWall Website

A responsive React + TypeScript + Vite landing website for AuraWall, designed to become a product page inside the future Cygnus Tech website.

## Requirements

- Node.js 20.19+ or 22.12+
- npm

## Run locally

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually http://localhost:5173).

## Production build

```bash
npm run build
npm run preview
```

The production website is generated in `dist/`.

## Important project notes

- This is a separate website project. It does not modify the AuraWall desktop application.
- The existing AuraWall Windows installer link is configured in `src/App.tsx`.
- The visual logo is currently a CSS mark. Replace it with the official AuraWall logo asset when adding the real logo file.
- Wallpaper preview images currently load from Unsplash URLs and require an internet connection.
- The `base: './'` setting in `vite.config.ts` supports deployment at the domain root now and a nested product path such as `/products/aurawall/` later.
- The Cygnus Tech relationship is presented as “A product by Cygnus Tech”; no unregistered domain or contact address is assumed.

## Before public launch

1. Confirm the installer URL still points to the latest approved release.
2. Add the final AuraWall logo and approved product screenshots.
3. Add a dedicated privacy policy page using the final app data practices.
4. Add a real support/contact address.
5. Configure the chosen domain and Cloudflare Pages deployment.
