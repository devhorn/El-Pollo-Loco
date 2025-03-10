class Bottle extends CollectableObject {
  x = 200;
  y = 340;
  width = 80;
  height = 80;

  offset = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  };

  constructor(x) {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.x += x;
  }
}
