class Cloud extends MoveableObject {
  y = 20;
  x = Math.random() * 500;
  width = 500;
  height = 250;

  constructor() {
    super().loadImage("../img/5_background/layers/4_clouds/2.png");
    this.animate();
  }

  animate() {
    this.moveLeft();
  }
}
