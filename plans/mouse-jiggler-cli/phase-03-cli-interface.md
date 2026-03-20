# Phase 3: CLI Interface

- **Status**: `pending`
- **Priority**: Medium
- **Date**: 2026-03-20

## Overview
Simple CLI with commander for argument parsing and user feedback.

## CLI Design
```
Usage: mouse-here [options]

Options:
  -i, --interval <seconds>  Jiggle interval in seconds (default: 30)
  -v, --verbose             Show each jiggle event
  -h, --help                Display help
  -V, --version             Display version
```

## Implementation Steps

- [ ] Set up `commander` in `src/index.ts`
- [ ] Parse interval and verbose flags
- [ ] Display startup banner (interval, platform, Ctrl+C to stop)
- [ ] Wire CLI options to Jiggler instance
- [ ] Add elapsed time counter in output

## Output Example
```
🖱 mouse-here v1.0.0
  Platform: win32
  Interval: 30s
  Press Ctrl+C to stop

[12:30:00] Jiggling... (running for 5m 30s)
```

## Success Criteria
- `npx tsx src/index.ts --help` shows usage
- Custom interval works: `npx tsx src/index.ts -i 15`
- Verbose mode shows each jiggle event
