class Endboss extends MoveableObject {
  imagesAlert = [
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];

  imagesWalking = [
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
  ];

  imagesHurt = [
    "../img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];

  imagesDead = [
    "../img/4_enemie_boss_chicken/5_dead/G24.png",
    "../img/4_enemie_boss_chicken/5_dead/G25.png",
    "../img/4_enemie_boss_chicken/5_dead/G26.png",
  ];

  x = 2600;
  y = 50;
  width = 300;
  height = 400;

  triggerActivated = false;
  movingLeft = true;
  startingX = 2600;
  minX = 1600;

  constructor() {
    super().loadImage(this.imagesAlert[0]);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesWalking);
    this.speed = 1;
    this.animateAlert();
  }

  animateAlert() {
    setInterval(() => {
      if (!this.triggerActivated) {
        this.playAnimation(this.imagesAlert);
      }
    }, 300);
  }

  update(characterX) {
    if (!this.triggerActivated && characterX >= 2100) {
      this.triggerActivated = true;
      this.startMovement();
    }
  }

  startMovement() {
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.imagesWalking);
    }, 150);
    this.movementInterval = setInterval(() => {
      if (this.x > this.minX) {
        this.moveLeft();
      } else {
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
      }
    }, 1000 / 60);
  }
}
