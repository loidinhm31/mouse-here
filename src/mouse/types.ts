export interface MousePosition {
  x: number;
  y: number;
}

export interface MouseAdapter {
  getPosition(): Promise<MousePosition>;
  moveTo(x: number, y: number): Promise<void>;
}
