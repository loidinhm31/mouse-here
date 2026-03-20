# Tech Stack - Mouse Jiggler CLI

## Runtime & Language
- **Node.js 20+** (LTS, already installed on target machines)
- **TypeScript 5.x** via `tsx` (run .ts files directly, no build step)

## Mouse Control (zero native deps)
- **Windows**: PowerShell → .NET `System.Windows.Forms.Cursor` (no admin required)
- **Linux X11**: `xdotool` (standard X11 tool, no admin required)

## Sleep Prevention
- **Windows**: Mouse movement resets idle timer; PowerShell `SendKeys('{F15}')` as backup
- **Linux**: `xdg-screensaver reset` as safety net alongside mouse movement

## Dependencies
| Package | Purpose | Native? |
|---|---|---|
| `typescript` | Type checking | No |
| `tsx` | Run TypeScript directly | No |
| `commander` | CLI argument parsing | No |

## Constraints
- No admin rights on Windows (company machine)
- Cannot run unsigned .exe from user folders
- Cannot install C++ build tools (no native npm packages)
- All deps must be pure JavaScript
