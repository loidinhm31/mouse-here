# Phase 4: Testing & Polish

- **Status**: `pending`
- **Priority**: Medium
- **Date**: 2026-03-20

## Overview
Manual testing checklist and final polish.

## Testing Checklist

- [ ] Run on Linux X11: verify mouse moves and returns
- [ ] Run on Windows: verify mouse moves and returns
- [ ] Verify Teams stays "Available" after 10+ minutes
- [ ] Test custom interval flag
- [ ] Test verbose mode
- [ ] Test Ctrl+C graceful shutdown
- [ ] Test with screen lock (should fail gracefully, not crash)
- [ ] Verify no admin prompts or permission errors on Windows

## Polish

- [ ] Add README.md with setup instructions
- [ ] Ensure clean error messages for missing deps (xdotool on Linux)
- [ ] Add platform detection error for unsupported OS

## Success Criteria
- Works end-to-end on both target platforms
- Clear error messages when prerequisites are missing
- Clean, readable code
