class Throwableobject extends MoveableObject {
  imagesSplash = [
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  imagesRotation = [
    "../img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png",
    "../img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png",
  ];

  constructor(x, y) {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    this.loadImages(this.imagesSplash);
    this.loadImages(this.imagesRotation);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 80;
    this.throwSound = new Sound("../audio/throw_bottle.wav");
    this.splashPlayed = false;
  }

  rotationAnimation() {
    let i = 0;
    let rotationInterval = setInterval(() => {
      if (!this.splashPlayed) {
        this.img = this.imageCache[this.imagesRotation[i % this.imagesRotation.length]];
        i++;
      } else {
        clearInterval(rotationInterval);
      }
    }, 100);
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    this.throwSound.play();
    this.rotationAnimation();
    setInterval(() => {
      this.x += 10;
    }, 25);
  }

  splashAnimation() {
    let i = 0;
    let splashInterval = setInterval(() => {
      if (i < this.imagesSplash.length) {
        this.img = this.imageCache[this.imagesSplash[i]];
        i++;
      } else {
        clearInterval(splashInterval);
      }
    }, 100);
  }
}
