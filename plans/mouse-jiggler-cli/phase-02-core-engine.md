# Phase 2: Core Jiggler Engine

- **Status**: `pending`
- **Priority**: High
- **Date**: 2026-03-20

## Overview
Implement platform-specific mouse movement and sleep prevention with a unified interface.

## Architecture

### Mouse Adapter Interface
```typescript
interface MouseAdapter {
  getPosition(): Promise<{ x: number; y: number }>;
  moveTo(x: number, y: number): Promise<void>;
}
```

### Platform Implementations

**Windows (`mouse/windows.ts`)**:
- Uses PowerShell to call .NET `System.Windows.Forms.Cursor::Position`
- Get position: `[System.Windows.Forms.Cursor]::Position`
- Set position: `[System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(x, y)`
- No admin rights required

**Linux (`mouse/linux.ts`)**:
- Uses `xdotool` for mouse control
- Get position: `xdotool getmouselocation`
- Move: `xdotool mousemove x y`

### Sleep Prevention

**Windows (`sleep-prevent/windows.ts`)**:
- Mouse movement already resets idle timer
- Backup: PowerShell `SendKeys('{F15}')` — invisible key that resets idle

**Linux (`sleep-prevent/linux.ts`)**:
- `xdg-screensaver reset` every interval

### Jiggler Logic (`jiggler.ts`)
- Move mouse +1px, then back to original position (imperceptible)
- Default interval: 30 seconds (well under Teams' 5-min timeout)
- Configurable interval via CLI flag
- Graceful shutdown on SIGINT (Ctrl+C)
- Log each jiggle with timestamp

## Implementation Steps

- [ ] Create `MouseAdapter` interface
- [ ] Implement `WindowsMouseAdapter` using PowerShell
- [ ] Implement `LinuxMouseAdapter` using xdotool
- [ ] Create platform detection in `mouse/index.ts`
- [ ] Implement `SleepPreventer` for both platforms
- [ ] Implement `Jiggler` class with start/stop, interval timer
- [ ] Add graceful shutdown handling

## Gotchas
- Moving 0px does NOT reset idle on some systems — must move ≥1px
- Teams timeout is ~5 minutes — 30s interval is safe
- If machine is locked (Win+L), synthetic mouse moves are blocked
- PowerShell `Add-Type` has a small cold-start delay (~500ms first call)

## Success Criteria
- Mouse visibly moves (1px) and returns on both platforms
- Teams status stays "Available" during jiggling
- Clean stop on Ctrl+C
