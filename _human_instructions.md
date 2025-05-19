# Human Instructions

Run the following commands with network access before development:

```bash
cd frontend
npm install
npm run dev
```

The web app stores progress in your browser's `localStorage`. Use the Settings
sidebar to download or upload a backup if needed.

Ensure **Node.js 22** is installed locally before running development or build commands.

To enable automatic deployments, configure **GitHub Pages** in the repository settings and choose *GitHub Actions* as the source.
The site will be hosted directly from GitHub Pages, with GitHub Actions running the build and deployment pipeline whenever changes land on `main`.
