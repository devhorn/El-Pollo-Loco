class Chicken extends MovableObject {
  x = 200 + Math.random() * 500;
  y = 340;
  height = 80;
  width = 70;
  imagesWalking = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  speed = 0.15 + Math.random() * 0.3;

  constructor() {
    super().loadImage("../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      this.playAnimation(this.imagesWalking);
    }, 120);
    this.moveLeft();
  }
}
