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

  /**
   * Plays the rotation animation for the throwable object.
   * Continuously loops through rotation images every 100ms until a splash event occurs.
   * The animation stops if the splash has been played.
   */
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

  /**
   * Throws the object from the given coordinates.
   * Sets the object's position, initializes vertical speed, applies gravity,
   * plays the throwing sound, starts the rotation animation, and moves the object horizontally.
   * @param {number} x - The x coordinate from which the object is thrown.
   * @param {number} y - The y coordinate from which the object is thrown.
   */
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

  /**
   * Plays the splash animation for the throwable object.
   * Cycles through the splash images every 100ms until the end of the sequence is reached.
   */
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
