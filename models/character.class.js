class Character extends MovableObject {
  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.height = 300;
    this.width = 120;
    this.y = 170;
  }

  jump() {
    console.log("jump");
  }
}
