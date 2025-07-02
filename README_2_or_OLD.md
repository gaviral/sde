# LeetCode Practice App

This repository contains a LeetCode-style practice application for coding interview preparation. The app is built with React and TypeScript, and runs entirely in the browser with no backend requirements.

## Overview

This application provides:
- A collection of coding problems to solve
- A Python code editor with syntax highlighting
- Progress tracking with persistent storage
- Voice command support for hands-free navigation

## Key Features

- **50 Problems**: 11 real problems and placeholder slots for future additions
- **Client-Side Only**: All state lives in the browser's localStorage
- **Advanced UI**: Hover-activated sidebars, keyboard shortcuts, and voice commands
- **Progress Tracking**: See which problems you've completed with visual indicators
- **Import/Export**: Backup and restore your progress via JSON files

## Repository Structure

```
./
├── README.md                # This file
├── frontend/                # React frontend application
│   ├── README.md            # Frontend-specific documentation
│   ├── src/                 # Application source code
│   │   ├── components/      # React components
│   │   ├── context/         # React context providers
│   │   ├── data/            # Data models and storage
│   │   ├── hooks/           # Custom React hooks
│   │   ├── types/           # TypeScript type definitions
│   │   └── utils/           # Utility functions
│   └── ...                  # Configuration files
├── docs/                    # Documentation files
│   ├── 01_PRD_v1.md         # Product Requirements Document
│   ├── 02_Design_v1.md      # Design Document
│   ├── 03_Technical_Spec_v1.md # Technical Specification
│   ├── 04_Implementation_v1.md # Implementation Plan
│   ├── 05_Test_Plan_v1.md   # Test Plan
│   └── 06_Deployment_v1.md  # Deployment Plan
└── scripts/                 # Utility scripts
```

## Getting Started

See the [frontend README](frontend/README.md) for detailed instructions on installation and usage.

Quick start:

```bash
cd frontend
npm install
npm run dev
```

## Deployment

The application is automatically built and deployed to GitHub Pages whenever changes are pushed to the `main` branch. The workflow configuration is in `.github/workflows/deploy.yml`.

## License

This project is licensed under the MIT License. 