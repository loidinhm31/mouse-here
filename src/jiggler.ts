import type { MouseAdapter } from "./mouse/index.js";

export interface JigglerOptions {
  intervalMs: number;
  verbose: boolean;
  mouse: MouseAdapter;
  preventSleep: () => void;
}

export class Jiggler {
  private timer: ReturnType<typeof setInterval> | null = null;
  private startTime = 0;
  private jiggles = 0;

  constructor(private opts: JigglerOptions) {}

  start(): void {
    this.startTime = Date.now();
    this.jiggles = 0;

    this.timer = setInterval(() => {
      this.jiggle();
    }, this.opts.intervalMs);

    // First jiggle immediately
    this.jiggle();
  }

  stop(): void {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  private async jiggle(): Promise<void> {
    try {
      const pos = await this.opts.mouse.getPosition();

      // Move +1px right, then back
      await this.opts.mouse.moveTo(pos.x + 1, pos.y);
      await this.opts.mouse.moveTo(pos.x, pos.y);

      // Prevent sleep
      this.opts.preventSleep();

      this.jiggles++;

      if (this.opts.verbose) {
        const elapsed = this.formatElapsed();
        const time = new Date().toLocaleTimeString();
        console.log(`[${time}] Jiggled #${this.jiggles} (running for ${elapsed})`);
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`Jiggle failed: ${msg}`);
    }
  }

  private formatElapsed(): string {
    const totalSec = Math.floor((Date.now() - this.startTime) / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    if (h > 0) return `${h}h ${m}m ${s}s`;
    if (m > 0) return `${m}m ${s}s`;
    return `${s}s`;
  }
}
