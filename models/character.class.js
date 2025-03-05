class Character extends MovableObject {
  height = 300;
  width = 120;
  y = 130;
  imagesWalking = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];
  world;
  speed = 10;
  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      if (this.world.keyboard.RIGHT) {
        this.x += this.speed;
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT) {
        this.x -= this.speed;
        this.otherDirection = true;
      }
    }, 1000 / 60);

    setInterval(() => {
      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        let indexImg = this.currentImage % this.imagesWalking.length;
        let path = this.imagesWalking[indexImg];
        this.img = this.imageCache[path];
        this.currentImage++;
      }
    }, 40);
  }

  jump() {
    console.log("jump");
  }
}
