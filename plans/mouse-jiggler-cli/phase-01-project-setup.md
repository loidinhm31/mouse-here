# Phase 1: Project Setup

- **Status**: `pending`
- **Priority**: High
- **Date**: 2026-03-20

## Overview
Initialize the Node.js/TypeScript project with minimal dependencies.

## Implementation Steps

- [ ] Initialize `package.json` with name, version, scripts
- [ ] Install dev deps: `typescript`, `tsx`
- [ ] Install deps: `commander`
- [ ] Create `tsconfig.json` (ESM, strict, NodeNext module resolution)
- [ ] Add npm scripts: `start`, `dev`
- [ ] Create `src/` directory structure

## Scripts
```json
{
  "start": "npx tsx src/index.ts",
  "dev": "npx tsx --watch src/index.ts"
}
```

## Success Criteria
- `npm start` runs without errors
- TypeScript strict mode enabled
- Zero native dependencies
