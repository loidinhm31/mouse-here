import type { MouseAdapter } from "./types.js";

export type { MouseAdapter, MousePosition } from "./types.js";

export async function createMouseAdapter(): Promise<MouseAdapter> {
  switch (process.platform) {
    case "win32": {
      const { WindowsMouseAdapter } = await import("./windows.js");
      return new WindowsMouseAdapter();
    }
    case "linux": {
      const { LinuxMouseAdapter } = await import("./linux.js");
      return new LinuxMouseAdapter();
    }
    default:
      throw new Error(`Unsupported platform: ${process.platform}`);
  }
}
