export default class FlameParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx =
      (Math.random() - 0.5) * 1.5;

    this.vy =
      -(Math.random() * 1.5);

    this.life = 1;

    this.radius =
      Math.random() * 4 + 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.life -= 0.04;

    this.radius *= 0.98;
  }

  draw(ctx) {
    ctx.save();

    ctx.globalAlpha = this.life;

    const gradient =
      ctx.createRadialGradient(
        this.x,
        this.y,
        0,
        this.x,
        this.y,
        this.radius
      );

    gradient.addColorStop(
      0,
      "#fff7a8"
    );

    gradient.addColorStop(
      0.4,
      "#ffb000"
    );

    gradient.addColorStop(
      1,
      "#ff5e00"
    );

    ctx.fillStyle = gradient;

    ctx.beginPath();

    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.fill();

    ctx.restore();
  }
}