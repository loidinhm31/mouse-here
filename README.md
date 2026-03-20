# mouse-here

Mouse jiggler CLI to keep your Microsoft Teams status "Available" and prevent screen sleep.

Works on **Windows** (no admin required) and **Linux X11**.

## How it works

Moves the mouse cursor 1 pixel right and back every 30 seconds. This resets the OS idle timer, which keeps Teams from going "Away" and prevents the screensaver/sleep.

## Setup

### Prerequisites

- **Node.js 20+** installed
- **Linux only**: `xdotool` — install with:
  ```bash
  sudo pacman -S xdotool      # Arch/Manjaro
  sudo apt install xdotool    # Debian/Ubuntu
  sudo dnf install xdotool    # Fedora
  ```

### Install

```bash
git clone <repo-url>
cd mouse-here
npm install
```

## Usage

```bash
# Start with defaults (30s interval)
npm start

# Custom interval (every 15 seconds)
npm start -- 15
npm start -- --interval 15

# Verbose mode (logs each jiggle)
npm start -- --verbose

# Both
npm start -- --verbose 15
npm start -- --verbose --interval 15
```

### Options

| Flag | Description | Default |
|---|---|---|
| `[seconds]` | Jiggle interval (positional) | `30` |
| `--interval <seconds>` | Jiggle interval | `30` |
| `--verbose` | Log each jiggle event | `off` |

> **Windows note:** Use `--interval` and `--verbose` (long-form). Short flags like `-i` and `-v` may be intercepted by PowerShell or npm before reaching the script.

## Notes

- The jiggler **will not work** if the machine is locked (Win+L) — Windows blocks synthetic input on the secure desktop
- Teams checks idle time roughly every 5 minutes, so any interval under 5 minutes works
- Zero native dependencies — no C++ compiler or admin rights needed on Windows
