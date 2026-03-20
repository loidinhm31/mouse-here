import { execSync } from "node:child_process";
import type { MouseAdapter, MousePosition } from "./types.js";

const PS_INIT = `Add-Type -AssemblyName System.Windows.Forms`;

export class WindowsMouseAdapter implements MouseAdapter {
  async getPosition(): Promise<MousePosition> {
    const output = execSync(
      `powershell -Command "${PS_INIT}; $p = [System.Windows.Forms.Cursor]::Position; Write-Output \\"$($p.X),$($p.Y)\\""`,
      { encoding: "utf-8" },
    ).trim();

    const [x, y] = output.split(",").map(Number);
    return { x, y };
  }

  async moveTo(x: number, y: number): Promise<void> {
    execSync(
      `powershell -Command "${PS_INIT}; [System.Windows.Forms.Cursor]::Position = New-Object System.Drawing.Point(${x}, ${y})"`,
      { encoding: "utf-8" },
    );
  }
}
