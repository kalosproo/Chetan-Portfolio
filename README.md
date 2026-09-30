# Chetan Portfolio

A React portfolio site for Chetan Musturi, built with Vite and deployed through GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Publish it

The included GitHub Actions workflow deploys the site whenever changes are pushed to `main` or `master`.

1. Push this repository to GitHub.
2. In **Settings → Pages**, select **GitHub Actions** as the deployment source.
3. Push or merge this branch into `main` (or run **Actions → Deploy portfolio to GitHub Pages → Run workflow**).
4. Open the URL displayed by the completed deployment job.

The Vite configuration automatically uses the repository name as the GitHub Pages base path, so static assets work at `https://<owner>.github.io/<repository>/`.

## Build check

```bash
npm run build
```
