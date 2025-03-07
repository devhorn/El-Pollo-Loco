class Coin extends MovableObject {
  x = 200;
  y = 300 - Math.random() * 200;
  width = 150;
  height = 150;

  offset = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  };

  constructor(x) {
    super().loadImage("../img/8_coin/coin_2.png");
    this.x += x;
  }
}
