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
    "../img/4_enemie_boss_chicken/3_attack/G17.png",
    "../img/4_enemie_boss_chicken/3_attack/G18.png",
    "../img/4_enemie_boss_chicken/3_attack/G19.png",
    "../img/4_enemie_boss_chicken/3_attack/G20.png",
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
  y = 45;
  width = 300;
  height = 400;
  triggerActivated = false;
  movingLeft = true;
  startingX = 2600;
  minX = 1600;
  hits = 0;

  constructor() {
    super().loadImage(this.imagesAlert[0]);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.speed = 1;
    this.endbossHitSound = new Sound("../audio/hit_endboss.wav");
    this.endbossDieSound = new Sound("../audio/die_endboss.wav", 0.2);
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
        this.clearEndbossAnimations();
      }
    }, 1000 / 60);
  }

  hitByBottle() {
    if (this.isDefeated) return;
    if (this.hits < 3) {
      this.endbossHitSound.play();
      this.hits++;
      this.clearEndbossAnimations();
      let hurtInterval = setInterval(() => {
        this.playAnimation(this.imagesHurt);
      }, 150);
      setTimeout(() => {
        clearInterval(hurtInterval);
        if (!this.isDefeated) {
          this.startMovement();
        }
      }, 1000);
    } else {
      this.dieBoss();
    }
  }

  dieBoss() {
    this.endbossDieSound.play();
    this.clearEndbossAnimations();
    this.isDefeated = true;
    let deadInterval = setInterval(() => {
      this.playAnimation(this.imagesDead);
    }, 150);
    setTimeout(() => {
      clearInterval(deadInterval);
      document.getElementById("gameWonOverlay").classList.remove("dNone");
    }, 1000);
    setTimeout(() => {
      this.gameEndTasks();
    }, 1000);
  }

  clearEndbossAnimations() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }

  gameEndTasks() {
    mainMelodie.stop();
    youWinSound.play();
    clearAllIntervals();
  }
}
