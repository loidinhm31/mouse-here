import { exec } from "node:child_process";

export function preventSleepLinux(): void {
  exec("xdg-screensaver reset 2>/dev/null");
}
