import { execSync } from "node:child_process";
import type { MouseAdapter, MousePosition } from "./types.js";

export class LinuxMouseAdapter implements MouseAdapter {
  constructor() {
    try {
      execSync("which xdotool", { stdio: "ignore" });
    } catch {
      throw new Error(
        "xdotool is required on Linux. Install it with:\n" +
          "  sudo pacman -S xdotool      # Arch/Manjaro\n" +
          "  sudo apt install xdotool    # Debian/Ubuntu\n" +
          "  sudo dnf install xdotool    # Fedora",
      );
    }
  }

  async getPosition(): Promise<MousePosition> {
    const output = execSync("xdotool getmouselocation --shell", {
      encoding: "utf-8",
    });

    const x = Number(output.match(/X=(\d+)/)?.[1] ?? 0);
    const y = Number(output.match(/Y=(\d+)/)?.[1] ?? 0);
    return { x, y };
  }

  async moveTo(x: number, y: number): Promise<void> {
    execSync(`xdotool mousemove ${x} ${y}`);
  }
}
