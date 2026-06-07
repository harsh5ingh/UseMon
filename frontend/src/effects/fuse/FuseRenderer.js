import Particle from "./Particle";
import SmokeParticle from "./SmokeParticle";
import FlameParticle from "./FlameParticle";

export default class FuseRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext("2d");

    this.particles = [];
    this.smokeParticles = [];
    this.flameParticles = [];

    this.progress = 1;

    this.cx = canvas.width/2;
    this.cy = canvas.height/2;
    this.radius = Math.min(
      canvas.width,
      canvas.height
    )/2-40;
  }

  draw(progress) {
    this.progress = progress;

    const ctx = this.ctx;

    ctx.clearRect(
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );

    // Current flame position

    const angle =
      (-Math.PI / 2) +
      (Math.PI * 2 * progress);

    const x =
      this.cx +
      this.radius * Math.cos(angle);

    const y =
      this.cy +
      this.radius * Math.sin(angle);

    // Generate particles

    this.particles.push(
      new Particle(x, y)
    );

    this.smokeParticles.push(
      new SmokeParticle(x, y)
    );

    this.flameParticles.push(
      new FlameParticle(x, y)
    );

    // Burnt rope

    ctx.beginPath();

    ctx.arc(
      this.cx,
      this.cy,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.strokeStyle = "#1a1a1a";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.stroke();

    // Remaining fuse

    ctx.beginPath();

    ctx.arc(
      this.cx,
      this.cy,
      this.radius,
      -Math.PI / 2,
      (-Math.PI / 2) +
      (Math.PI * 2 * progress)
    );

    ctx.strokeStyle = "#d97706";
    ctx.lineWidth = 12;
    ctx.lineCap = "round";
    ctx.stroke();

    // Remove dead particles

    this.particles =
      this.particles.filter(
        p => p.life > 0
      );

    this.smokeParticles =
      this.smokeParticles.filter(
        p => p.life > 0
      );

    this.flameParticles =
      this.flameParticles.filter(
        p => p.life > 0
      );

    // Draw smoke

    this.smokeParticles.forEach(p => {
      p.update();
      p.draw(ctx);
    });

    // Draw flame particles

    this.flameParticles.forEach(p => {
      p.update();
      p.draw(ctx);
    });

    // Draw spark particles

    this.particles.forEach(p => {
      p.update();
      p.draw(ctx);
    });

    // Core flame

    ctx.shadowBlur = 30;
    ctx.shadowColor = "orange";

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      8,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#ff9500";
    ctx.fill();

    ctx.beginPath();

    ctx.arc(
      x,
      y,
      4,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#fff7a8";
    ctx.fill();

    ctx.shadowBlur = 0;
  }
}