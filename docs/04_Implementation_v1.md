# Implementation Plan (Version 1)

This document describes how to build and integrate the first release of the project. It serves as a roadmap for developers when putting all pieces together.

## Overview

Version 1 delivers a single-page React application that stores all data in the
browser. Development focuses on a small set of reusable components and a simple
build pipeline so new questions or features can be added easily. Styling relies
on Tailwind CSS and all code is written in TypeScript.

## Setup

1. Install **Node.js 22** and **Python 3** on your machine.
2. From the repository root run:
   ```bash
   cd frontend
   npm install
   cd ..
   pip install -r requirements.txt
   ```
3. Start the development server with:
   ```bash
   cd frontend && npm run dev
   ```
   The site is available at <http://localhost:5173> by default.

## Build Process

Running `npm run build` inside `frontend/` compiles TypeScript and bundles the
application using Vite. The resulting static files live in `frontend/dist/`.

GitHub Actions executes this same build command and publishes the output to
**GitHub Pages** whenever commits land on `main`. You can preview the production
build locally with:

```bash
cd frontend
npm run build
npm run preview
```
