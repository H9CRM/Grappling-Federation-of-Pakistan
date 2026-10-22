# Grappling Federation of Pakistan

Vite + React + Tailwind CSS + Motion. The production build prerenders public routes into readable HTML with headings, metadata, canonical URLs, JSON-LD, images and links. GitHub Pages hosts the generated `dist/` directory; no production Node server is needed.

## Publish the client demo on GitHub Pages

Use **Deploy website to GitHub Pages**, included in `.github/workflows/deploy-pages.yml`.

1. Commit and push this project's changes to the repository's `main` branch.
2. Open [Settings → Pages](https://github.com/H9CRM/Grappling-Federation-of-Pakistan/settings/pages).
3. Under **Build and deployment → Source**, select **GitHub Actions**.
4. Open [Actions](https://github.com/H9CRM/Grappling-Federation-of-Pakistan/actions), select **Deploy website to GitHub Pages**, then **Run workflow → main → Run workflow**. Future pushes to `main` deploy automatically.
5. Wait for both `build` and `deploy` to succeed. The deployment displays the published URL.

Expected demo URL (when no custom domain is configured):

**https://h9crm.github.io/Grappling-Federation-of-Pakistan/**

The included workflow handles Vite. You do not need the Publish Node.js Package, Webpack, Jekyll or Static HTML starter templates, or a `gh-pages` branch. Publish the built `dist/` directory.

The workflow uses Node 24, `npm ci`, linting, static generation, build verification and official GitHub Pages actions. Token permissions are configured in the workflow; no personal access token or repository secret is required.

### Configure GitHub Pages returns 404 / Not Found

Enable Pages once before running the workflow: open **Settings → Pages → Build and deployment → Source → GitHub Actions**. Skip the suggested starter templates because this repository already includes its workflow. Then open **Actions → Deploy website to GitHub Pages → Run workflow**. If you only changed the Pages setting, you can also re-run the failed job.

If the setting is unavailable, a repository admin or maintainer must enable it. Private repositories require a GitHub plan that supports Pages, and organization policies can restrict access. The default workflow token cannot automatically enable a new Pages site; setting `enablement: true` alone will not fix this.

The workflow uses `actions/configure-pages@v6` (Node 24) and pins both jobs to Ubuntu 24.04 to avoid the Node 20 deprecation warning and the `ubuntu-latest` migration notice. These notices were separate from the Pages configuration failure.

## Local development and verification

Use Node.js 24 and npm:

```sh
npm ci
npm run dev
npm run lint
npm run build
npm run verify:build
npm run preview
```

The build generates JavaScript/CSS, static HTML, sitemaps, robots.txt, llms.txt, humans.txt and the manifest. Generated deployment files stay in `dist/`; builds do not overwrite tracked public SEO files. `verify:build` rejects missing page content, incorrect canonicals, invalid JSON-LD, missing alt attributes and broken local links/assets.

## Deployment URL and repository subpaths

`VITE_SITE_URL` controls the deployment origin and base path together. The workflow reads it automatically from `actions/configure-pages`, including the repository path or configured custom domain.

To reproduce the Pages build locally in PowerShell:

```powershell
$env:VITE_SITE_URL = 'https://h9crm.github.io/Grappling-Federation-of-Pakistan'
npm run build
npm run verify:build
npm run preview
```

Visit `http://localhost:4173/Grappling-Federation-of-Pakistan/`. Keep the same environment setting for build, verification and preview. Remove the override with `Remove-Item Env:VITE_SITE_URL` to return to a root-domain build.

Without an override, the configured production URL is `https://www.gfp.org.pk`. Confirm ownership and DNS before using it for the official launch. For another host, set `VITE_SITE_URL` to its full URL (including any path) when building, or use an untracked `.env.production.local`. Rebuild after changing domains so canonicals, schema, sitemaps and media URLs match.

## Static hosting behavior

Public routes have their own `route/index.html`, so opening or refreshing About, event and policy pages works on Pages. `/rankings` and `/policies` have static redirects. `404.html` is a real, noindex error page. `.nojekyll` disables unnecessary Jekyll processing. The browser router and media use the same base path as the static renderer.

Pages provides static hosting; registration/contact actions use the destinations implemented in the app. On a project site, `robots.txt` lives inside the repository path; crawlers consult the host's root `/robots.txt`. A dedicated custom domain gives control of the root robots file.

References: [Vite deployment guide](https://vite.dev/guide/static-deploy.html#github-pages), [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages).
