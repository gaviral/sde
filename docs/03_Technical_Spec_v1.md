# Technical Specification (Version 1)

This document outlines the low-level technical details for the LeetCode-style coding practice site. It explains the architecture, key modules and how data flows through the application.

## Overview

The site is a **client-only React application** written in TypeScript.
All data lives in the browser's `localStorage`, so no backend services are
required. The architecture is composed of a few high-level modules that manage
questions, code editing and validation, as well as optional voice commands.

## Components

- **Question Selector** – loads the bundled question list and tracks the active
  slot.
- **Question Details Panel** – shows the current problem statement and
  constraints.
- **Code Editor** – a Monaco instance locked to Python 3.
- **Issue Panel** – displays validator results after running the **Check**
  action.
- **Settings Sidebar** – toggles *Learning/Mock* modes and supports backup or
  restore of progress.
- **Voice Command Module** – wraps the Web Speech API so users can navigate or
  run **Check** hands-free.
- **Validator** – performs strict code comparison entirely in the browser.

## Data Flow

1. On load the application reads the question list and any stored progress from
   `localStorage`.
2. Selecting a question populates the editor and details panel with bundled
   content.
3. Pressing **Check** runs the validator against the user's code and collects a
   list of issues.
4. Issues appear in the Issue Panel and progress is written back to
   `localStorage`.
5. Voice commands dispatch the same actions as clicking UI buttons so the data
   flow remains consistent whether the user interacts via mouse, keyboard or
   speech.
