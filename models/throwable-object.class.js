class Throwableobject extends MoveableObject {
  // Hier definieren wir die Splash-Bilder (wie in bottle.class.js)
  imagesSplash = [
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/1_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/2_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/3_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/4_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/5_bottle_splash.png",
    "../img/6_salsa_bottle/bottle_rotation/bottle_splash/6_bottle_splash.png",
  ];

  constructor(x, y) {
    super().loadImage("../img/6_salsa_bottle/salsa_bottle.png");
    // Lade zusätzlich die Splash-Bilder in den Cache
    this.loadImages(this.imagesSplash);
    this.x = x;
    this.y = y;
    this.height = 80;
    this.width = 80;
    this.throwSound = new Sound("../audio/throw_bottle.wav");
    // Flag, um zu verhindern, dass die Splash-Animation mehrfach getriggert wird
    this.splashPlayed = false;
  }

  throw(x, y) {
    this.x = x;
    this.y = y;
    this.speedY = 30;
    this.applyGravity();
    this.throwSound.play();
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
