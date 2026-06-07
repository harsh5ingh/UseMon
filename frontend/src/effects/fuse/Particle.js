export default class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx = (Math.random() - 0.5) * 3;
    this.vy = (Math.random() - 0.5) * 3;

    this.life = 1;
    this.radius = Math.random() * 3 + 1;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.life -= 0.02;
  }

  draw(ctx) {
    ctx.save();

    ctx.globalAlpha = this.life;

    ctx.beginPath();
    ctx.arc(
      this.x,
      this.y,
      this.radius,
      0,
      Math.PI * 2
    );

    ctx.fillStyle = "#ffd43b";
    ctx.fill();

    ctx.restore();
  }
}