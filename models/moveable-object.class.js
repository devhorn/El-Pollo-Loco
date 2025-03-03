class MovableObject {
  x;
  y;
  img;

  moveRight() {
    console.log("moving right");
  }

  moveLeft() {
    console.log("moving left");
  }

  constructor(x, y, img) {
    this.x = x;
    this.y = y;
    this.img = img;
  }
}
