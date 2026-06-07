export default class SmokeParticle {
  constructor(x, y) {
    this.x = x;
    this.y = y;

    this.vx =
      (Math.random() - 0.5) * 1.5;

    this.vy =
      -(Math.random() * 2.5 + 1);

    this.life = 1;

    this.radius =
      Math.random() * 6 + 3;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;

    this.life -= 0.015;

    this.radius += 0.03;
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

    ctx.fillStyle =
      "rgb(120,120,120)";

    ctx.fill();

    ctx.restore();
  }
}