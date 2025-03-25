class Chicken extends MoveableObject {
  y = 335;
  height = 80;
  width = 70;
  imagesWalking = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  imageDeath = "../img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  isDead = false;
  chickenCackle = new Sound("../audio/chicken_cackle.wav");

  constructor() {
    super().loadImage(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.animate();
    this.x = Math.floor(Math.random() * (2000 - 800 + 1)) + 800;
    this.speed = 0.25;
  }

  /**
   * Starts the chicken's walking and movement animations.
   * Sets up intervals to cycle through the walking images and move the chicken left.
   */
  animate() {
    this.walkInterval = setInterval(() => {
      if (!this.isDead) {
        this.playAnimation(this.imagesWalking);
      }
    }, 120);
    this.moveInterval = setInterval(() => {
      if (!this.isDead) {
        this.moveLeft();
      }
    }, 1000 / 60);
  }

  /**
   * Kills the chicken by playing the death sound, stopping animations,
   * switching to the death image, and moving the chicken off-screen after a delay.
   */
  die() {
    if (this.isDead) return;
    this.chickenCackle.play();
    this.isDead = true;
    clearInterval(this.walkInterval);
    clearInterval(this.moveInterval);
    this.loadImage(this.imageDeath);
    setTimeout(() => {
      this.x = -9999;
    }, 500);
  }
}
