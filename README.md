# Manafield Reference

Reference implementation for a Manafield Module.

This repository is intentionally experimental. It is used to validate the Manafield Module Protocol with an implementation that is independent from the Rust-based Manafield Core.

## Reference vs Template

This repository is a **reference implementation, not a generic Module template**.

Reference-specific behavior such as the Registry Observer UI, `/api/core/modules`, and local copies of Manafield Registry types should not be copied into every Module.

The initial shared requirements extracted from this implementation are documented in the Core repository under:

```text
docs/kr/module-template-requirements.md
docs/en/module-template-requirements.md
```

A dedicated TS/React template should be extracted only after another real Module validates which parts are actually common.

## Stack

- React
- TypeScript
- Vite
- Node.js
- Express

## Current Goal

The first reference module acts as a small observer for Manafield Core.

```text
Browser
   ↓
React UI
   ↓
Reference Module Server
   ├─ /manafield/health
   └─ /api/core/modules
                ↓
          Manafield Core
```

The module exposes a Manafield health Operation and provides a Web UI that reads the Core Module Registry.

## Development

Requirements:

- Node.js 22+
- npm

Install dependencies:

```bash
npm install
```

Run the React UI and Module server together:

```bash
npm run dev
```

Defaults:

- React/Vite: http://localhost:5173
- Reference Module server: http://localhost:8081
- Manafield Core: http://localhost:8080

The Core URL can be changed with `MANAFIELD_CORE_URL`.
The Module server port can be changed with `PORT`.

## Build

```bash
npm run check
npm run build
npm start
```

## Status

Pre-alpha / Reference implementation.
