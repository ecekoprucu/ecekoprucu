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

class Starfield {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private stars: Star[] = [];
  private readonly numStars: number;
  private mouse: MousePosition = { x: 0, y: 0 };
  private isDarkMode: boolean;
  private lastTime: number = 0;

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
    window.addEventListener("resize", this.resizeCanvas.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMouseMove.bind(this));

    this.initStars();
  }

  private resizeCanvas(): void {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
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
    this.stars.forEach((s) => {
      s.x += s.vx * dt;
      s.y += s.vy * dt;

      if (s.x < 0 || s.x > this.canvas.width) s.vx = -s.vx;
      if (s.y < 0 || s.y > this.canvas.height) s.vy = -s.vy;
    });
  }

  public start(): void {
    const tick = (time: number) => {
      const dt = (time - this.lastTime) / 1000;
      this.lastTime = time;
      this.draw();
      this.update(dt);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame((time) => {
      this.lastTime = time;
      requestAnimationFrame(tick);
    });
  }
}

export default function initStarfield(
  canvasId: string,
  numStars = 100,
  isDarkMode = true,
) {
  const starfield = new Starfield(canvasId, numStars, isDarkMode);
  starfield.start();
}
