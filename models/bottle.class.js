class Bottle extends CollectableObject {
  x = 200;
  y = 340;
  width = 80;
  height = 80;

  offset = {
    top: 30,
    left: 30,
    right: 30,
    bottom: 30,
  };

  imagesSplash = [
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x) {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.imagesSplash);
    this.x += x;
  }
}
