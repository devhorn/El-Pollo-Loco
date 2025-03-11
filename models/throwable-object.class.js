class Throwableobject extends MoveableObject {
  constructor(x, y) {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 80;
    this.throw(x, y);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }
}
