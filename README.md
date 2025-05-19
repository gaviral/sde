# SDE

This repository contains a React frontend located in the `frontend/` directory.
Version 1 implements the LeetCode‑style practice interface described in
`docs/01_PRD_v1.md`. It includes a question selector, code editor with strict
validation, settings sidebar, issue panel and an optional voice command button.
Progress is saved in `localStorage` and can be exported or imported from the
settings sidebar.

## Local Development

Run the app locally with the following commands:

```bash
cd frontend
npm install
npm run dev
```

## Deployment

The site is automatically built and deployed to **GitHub Pages** whenever changes are pushed to the `main` branch. The workflow configuration lives in `.github/workflows/deploy.yml`. GitHub Pages hosts the production website, while GitHub Actions provides the continuous integration and deployment pipeline.

The project uses **Node.js 22**. Ensure this version is installed locally so commands like `npm run build` behave consistently with the CI workflow.

## License

This project is licensed under the [MIT License](LICENSE).
