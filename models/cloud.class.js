class Cloud extends MoveableObject {
  y = 20;
  x = 0;
  width = 500;
  height = 250;

  constructor(path, x) {
    super().loadImage(path);
    this.x += x;
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.moveLeft();
    }, 1000 / 60);
  }
}
