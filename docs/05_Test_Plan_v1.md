# Test Plan (Version 1)

This document outlines how the application will be verified. It summarizes the testing strategy, tools and sample cases to ensure the site meets the requirements.

## Overview

Testing focuses on two layers: unit tests for React components and end-to-end
browser tests. All critical flows are exercised with automated tools so
regressions are caught before deployment.

## Test Cases

- **Question Selection** – selecting a slot loads the correct description and
  starter code.
- **Code Validation** – the *Check* button reports issues when the solution does
  not match expected output and passes when it does.
- **Progress Persistence** – editing code and refreshing the page retains the
  last state via `localStorage`.
- **Mode Toggle** – switching between *Learning* and *Mock* updates the UI and
  persists the preference.
- **Voice Commands** – issuing commands such as "go to question three" triggers
  the matching UI actions.

## Automation

Unit tests use **React Testing Library** together with **Vitest** to validate
component behaviour. End-to-end tests run with **Playwright**, simulating user
interaction in a headless browser. The `npm run lint` command is also part of
the CI workflow to enforce code quality.
