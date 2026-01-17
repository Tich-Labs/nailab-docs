# Nailab Docs (static site)
This repository folder contains a small static documentation site for the Nailab Mentorhsip Platform project
: screenshots, feature boards, documentation PDFs and a feedback page. It's intentionally simple so it can be hosted on GitHub Pages.

## Quick overview
- Site root: `index.html`
- Screenshots gallery: `screenshots/index.html`
- Screenshots manifest: `screenshots_index.json` (paths are relative to the `screenshots/` page)
- Shared header: `shared.js`

## Local preview
Requires Python 3 (for the built-in static server).

From the repository folder (this folder):

```bash
# start a static server on port 5500
python3 -m http.server 5500 --directory $(pwd)

# open in browser:
#  http://localhost:5500
#  http://localhost:5500/screenshots/index.html
```

Notes:
- The site expects files under this folder (no build step). If you change HTML/JS files, reload the browser to see updates.
- If the server is started from a different working directory, use `--directory` to point to this folder.

## Screenshots gallery
- Images live under `screenshots/` in categorized folders (e.g. `screenshots/onboarding/mentor/...`).
- `screenshots_index.json` lists gallery entries. Entries should be paths relative to the `screenshots/` page (e.g. `onboarding/mentor/step-1.png` or `admin/homepage/hero.png`).
- The gallery script normalizes paths and extracts categories from the path segments (top-level and second-level). Use consistent folders for correct filtering.

To add a new screenshot:

1. Copy the image to `screenshots/<category>/...`.
2. Add the relative path to `screenshots_index.json`.

## Behavior and customization
- Filtering: the gallery buttons (`.ss-filter`) toggle categories. Active filter is styled with `bg-emerald-50` and `text-emerald-800`.
- Thumbnails are non-clickable by default. Modal/zoom code is present in `screenshots/index.html` and can be re-enabled (or a small "View" button can be added per-card).
- Header link: the `Nailab` header anchor is defined in `shared.js` and points to `/`.

## Deploying to GitHub Pages
1. Push files to the `main` branch (or the branch you use for Pages).
2. In repo Settings → Pages choose the branch and folder (`/ (root)`).

Tips:
- Avoid leading `/` in asset or link paths if you plan to host under `https://<user>.github.io/<repo>/` (use relative paths instead). This repo already uses relative paths for the gallery and shared assets.
- Add a `.nojekyll` file if you want GitHub Pages to serve files that Jekyll would ignore.

## Troubleshooting
- 404 for `screenshots/index.html`: verify the file exists at `screenshots/index.html` and server is started with the repository root as the served directory.
- Images not showing: check paths in `screenshots_index.json` and ensure the files exist in `screenshots/` subfolders.
- CORS/console errors: this is a static site; open the browser console for resource load failures and check paths.

## Contributing
- Edit HTML/JS/CSS directly and preview locally. Small patches are appropriate for this repo.

---
If you'd like, I can commit and push this README for you, add a `.nojekyll`, or open a small PR with the changes — tell me which you'd prefer.
