class Character extends MovableObject {
  height = 300;
  width = 120;
  y = 170;
  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
  }

  jump() {
    console.log("jump");
  }
}
