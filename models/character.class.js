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

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.animate();
  }

  animate() {
    setInterval(() => {
      let indexImg = this.currentImage % this.imagesWalking.length;
      let path = this.imagesWalking[indexImg];
      this.img = this.imageCache[path];
      this.currentImage++;
    }, 120);
  }

  jump() {
    console.log("jump");
  }
}
