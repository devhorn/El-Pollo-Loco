class Chicken extends MoveableObject {
  y = 340;
  height = 80;
  width = 70;
  imagesWalking = [
    "../img/3_enemies_chicken/chicken_normal/1_walk/1_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/2_w.png",
    "../img/3_enemies_chicken/chicken_normal/1_walk/3_w.png",
  ];
  imageDeath = "../img/3_enemies_chicken/chicken_normal/2_dead/dead.png";
  isDead = false;

  constructor(x) {
    super().loadImage(this.imagesWalking[0]);
    this.loadImages(this.imagesWalking);
    this.animate();
    this.x = 400 + x;
  }

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

  die() {
    if (this.isDead) return; // Sicherstellen, dass die Methode nur einmal ausgeführt wird
    this.isDead = true;
    clearInterval(this.walkInterval);
    clearInterval(this.moveInterval);

    this.loadImage(this.imageDeath); // Bild des toten Huhns laden
    setTimeout(() => {
      this.x = -9999; // Entferne das Huhn aus dem sichtbaren Bereich
    }, 500); // Nach 500 ms
  }
}
