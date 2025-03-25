class ChickenSmall extends Chicken {
  y = 365;
  height = 50;
  width = 50;
  imagesWalking = [
    "../img/3_enemies_chicken/chicken_small/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_small/1_walk/3_w.png",
  ];
  imageDeath = "../img/3_enemies_chicken/chicken_small/2_dead/dead.png";
  isDead = false;

  constructor() {
    super().loadImage(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.animate();
    this.x = Math.floor(Math.random() * (2000 - 700 + 1)) + 800;
    this.speed = Math.random() * (0.4 - 0.15) + 0.15;
  }
}
