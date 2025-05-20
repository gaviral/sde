# Frontend

This directory contains the React application built with Vite and TypeScript.

## Development

```bash
npm install
npm run dev
```

## Project Structure

The source code under `src/` is organized for clarity and reuse:

- **hooks/** – Custom React hooks such as `usePersistentProgress` for saving
  progress to `localStorage` and `useSpeechRecognition` for voice commands.
- **utils/** – General utilities including `validateSolution` for checking code
  and `saveAs` for downloading JSON files.
