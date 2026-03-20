export async function createSleepPreventer(): Promise<() => void> {
  switch (process.platform) {
    case "win32": {
      const { preventSleepWindows } = await import("./windows.js");
      return preventSleepWindows;
    }
    case "linux": {
      const { preventSleepLinux } = await import("./linux.js");
      return preventSleepLinux;
    }
    default:
      return () => {};
  }
}
