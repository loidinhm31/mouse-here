# Mouse Jiggler CLI - Implementation Plan

## Overview
A lightweight CLI tool that moves the mouse cursor periodically to prevent screen sleep and keep Microsoft Teams status as "Available". Designed to work on restricted company Windows machines (no admin) and Linux X11.

## Phases

| # | Phase | Status | File |
|---|---|---|---|
| 1 | Project Setup | `done` | [phase-01-project-setup.md](./phase-01-project-setup.md) |
| 2 | Core Jiggler Engine | `done` | [phase-02-core-engine.md](./phase-02-core-engine.md) |
| 3 | CLI Interface | `done` | [phase-03-cli-interface.md](./phase-03-cli-interface.md) |
| 4 | Testing & Polish | `partial` | [phase-04-testing-polish.md](./phase-04-testing-polish.md) |

## Architecture
```
src/
  index.ts          # CLI entry point
  jiggler.ts        # Core jiggler logic (interval, start/stop)
  mouse/
    index.ts        # Platform detection & adapter export
    windows.ts      # PowerShell-based mouse control
    linux.ts        # xdotool-based mouse control
  sleep-prevent/
    index.ts        # Platform detection & adapter export
    windows.ts      # PowerShell SendKeys / mouse resets idle
    linux.ts        # xdg-screensaver reset
```

## Key Decisions
- Shell-out approach (no native deps) for restricted Windows environments
- Platform-specific adapters behind a common interface
- `tsx` for zero-build-step TypeScript execution
- Minimal deps: only `commander` for CLI parsing
