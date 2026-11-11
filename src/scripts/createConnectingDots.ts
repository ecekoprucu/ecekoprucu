interface Star {
  x: number;
  y: number;
  radius: number;
  vx: number;
  vy: number;
}

interface MousePosition {
  x: number;
  y: number;
}

const MAX_DT = 1 / 30;

class Starfield {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private readonly numStars: number;
  private mouse: MousePosition = { x: 0, y: 0 };
  private isDarkMode: boolean;
  private lastTime: number = 0;
  private frameId: number | null = null;
  private onResize = () => this.resizeCanvas();
  private onMouseMove = (event: MouseEvent) => this.handleMouseMove(event);
  private onVisibilityChange = () => {
    if (!document.hidden) this.lastTime = performance.now();
  };

  constructor(canvasId: string, numStars: number = 100, isDarkMode = true) {
    const canvas = document.getElementById(
      canvasId,
    ) as HTMLCanvasElement | null;
    if (!canvas) {
      throw new Error(`Canvas not found`);
    }
    this.canvas = canvas;
    const context = this.canvas.getContext("2d");
    if (!context) {
      throw new Error("2D rendering is not supported");
    }
    this.ctx = context;
    this.numStars = numStars;

    this.isDarkMode = isDarkMode;

    this.resizeCanvas();
    window.addEventListener("resize", this.onResize);
    this.canvas.addEventListener("mousemove", this.onMouseMove);
    document.addEventListener("visibilitychange", this.onVisibilityChange);

    this.initStars();
  }

  private resizeCanvas(): void {
    const prevWidth = this.canvas.width;
    const prevHeight = this.canvas.height;
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.canvas.width = width;
    this.canvas.height = height;

    // Keep stars inside the new viewport instead of stranding them off-screen.
    if (prevWidth > 0 && prevHeight > 0) {
      const scaleX = width / prevWidth;
      const scaleY = height / prevHeight;
      this.stars.forEach((s) => {
        s.x = Math.min(Math.max(s.x * scaleX, 0), width);
        s.y = Math.min(Math.max(s.y * scaleY, 0), height);
      });
    }
  }

  private initStars(): void {
    for (let i = 0; i < this.numStars; i++) {
      this.stars.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        radius: Math.random() * 1 + 1,
        vx: Math.random() * 50 - 25,
        vy: Math.random() * 50 - 25,
      });
    }
  }

  private handleMouseMove(event: MouseEvent): void {
    this.mouse.x = event.clientX;
    this.mouse.y = event.clientY;
  }

  private distance(p1: MousePosition | Star, p2: Star): number {
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    return Math.sqrt(dx * dx + dy * dy);
  }

  private draw(): void {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const starColor = this.isDarkMode ? "#fff" : "#333";

    this.ctx.fillStyle = starColor;
    this.stars.forEach((s) => {
      this.ctx.beginPath();
      this.ctx.arc(s.x, s.y, s.radius, 0, 2 * Math.PI);
      this.ctx.fill();
    });

    const maxDist = 150;
    this.ctx.lineWidth = 0.5;
    for (let i = 0; i < this.stars.length; i++) {
      const starI = this.stars[i];
      const mouseDist = this.distance(this.mouse, starI);
      if (mouseDist < maxDist) {
        const opacity = 1 - mouseDist / maxDist;
        this.ctx.strokeStyle = this.isDarkMode
          ? `rgba(255,255,255,${opacity})`
          : `rgba(51,51,51,${opacity})`;
        this.ctx.beginPath();
        this.ctx.moveTo(starI.x, starI.y);
        this.ctx.lineTo(this.mouse.x, this.mouse.y);
        this.ctx.stroke();
      }
      for (let j = i + 1; j < this.stars.length; j++) {
        const starII = this.stars[j];
        const dist = this.distance(starI, starII);
        if (dist < maxDist) {
          const opacity = 1 - dist / maxDist;
          this.ctx.strokeStyle = this.isDarkMode
            ? `rgba(255,255,255,${opacity})`
            : `rgba(51,51,51,${opacity})`;
          this.ctx.beginPath();
          this.ctx.moveTo(starI.x, starI.y);
          this.ctx.lineTo(starII.x, starII.y);
          this.ctx.stroke();
        }
      }
    }
  }

  private update(dt: number): void {
    const width = this.canvas.width;
    const height = this.canvas.height;

    this.stars.forEach((s) => {
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      // Bounce at the edge and clamp, so a star can never end up off-canvas.
      if (s.x < 0) {
        s.x = 0;
        s.vx = -s.vx;
      } else if (s.x > width) {
        s.x = width;
        s.vx = -s.vx;
      }
      if (s.y < 0) {
        s.y = 0;
        s.vy = -s.vy;
      } else if (s.y > height) {
        s.y = height;
        s.vy = -s.vy;
      }
    });
  }

  public start(): void {
    const tick = (time: number) => {
      const dt = Math.min((time - this.lastTime) / 1000, MAX_DT);
      this.lastTime = time;
      this.draw();
      this.update(dt);
      this.frameId = requestAnimationFrame(tick);
    };
    this.frameId = requestAnimationFrame((time: number) => {
      this.lastTime = time;
      this.frameId = requestAnimationFrame(tick);
    });
  }

  public destroy(): void {
    if (this.frameId !== null) {
      cancelAnimationFrame(this.frameId);
      this.frameId = null;
    }
    window.removeEventListener("resize", this.onResize);
    this.canvas.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default function initStarfield(
  canvasId: string,
  numStars = 100,
  isDarkMode = true,
): () => void {
  const starfield = new Starfield(canvasId, numStars, isDarkMode);
  starfield.start();
  return () => starfield.destroy();
}
