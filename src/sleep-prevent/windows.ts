import { exec } from "node:child_process";

export function preventSleepWindows(): void {
  // F15 is a "ghost key" — resets idle timer without visible effect
  exec(
    'powershell -Command "Add-Type -AssemblyName System.Windows.Forms; [System.Windows.Forms.SendKeys]::SendWait(\'{F15}\')"',
  );
}
