import { program } from "commander";
import { createMouseAdapter } from "./mouse/index.js";
import { createSleepPreventer } from "./sleep-prevent/index.js";
import { Jiggler } from "./jiggler.js";

program
  .name("mouse-here")
  .description("Mouse jiggler to keep your status active")
  .version("1.0.0")
  .argument("[seconds]", "jiggle interval in seconds")
  .option("-i, --interval <seconds>", "jiggle interval in seconds", "30")
  .option("--verbose", "show each jiggle event", false)
  .action(async (seconds, opts) => {
    const intervalSec = parseInt(seconds ?? opts.interval, 10);
    if (isNaN(intervalSec) || intervalSec < 1) {
      console.error("Error: interval must be a positive number");
      process.exit(1);
    }

    console.log(`
  mouse-here v1.0.0
  Platform:  ${process.platform}
  Interval:  ${intervalSec}s
  Verbose:   ${opts.verbose ? "on" : "off"}
  Press Ctrl+C to stop
`);

    try {
      const mouse = await createMouseAdapter();
      const preventSleep = await createSleepPreventer();

      const jiggler = new Jiggler({
        intervalMs: intervalSec * 1000,
        verbose: opts.verbose,
        mouse,
        preventSleep,
      });

      // Graceful shutdown
      const shutdown = () => {
        console.log("\nStopping jiggler...");
        jiggler.stop();
        process.exit(0);
      };

      process.on("SIGINT", shutdown);
      process.on("SIGTERM", shutdown);

      jiggler.start();
      console.log("Jiggler started. Your status will stay active.");
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Failed to start: ${msg}`);
      process.exit(1);
    }
  });

program.parse();
