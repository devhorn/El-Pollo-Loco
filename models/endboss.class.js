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
  minX = 200;
  hits = 0;
  life = 100;

  constructor() {
    super().loadImage(this.imagesAlert[0]);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.speed = 4;
    this.endbossHitSound = new Sound("../audio/hit_endboss.wav");
    this.endbossDieSound = new Sound("../audio/die_endboss.wav", 0.2);
    this.animateAlert();
  }

  /**
   * Starts the alert animation.
   * Continuously plays the alert animation if the trigger is not activated.
   */
  animateAlert() {
    setInterval(() => {
      if (!this.triggerActivated) {
        this.playAnimation(this.imagesAlert);
      }
    }, 300);
  }

  /**
   * Updates the endboss state based on the character's x position.
   * If the character reaches a certain position, the trigger is activated and movement starts.
   *
   * @param {number} characterX - The current x position of the character.
   */
  update(characterX) {
    if (!this.triggerActivated && characterX >= 2100) {
      this.triggerActivated = true;
      this.startMovement();
    }
  }

  /**
   * Starts the endboss movement.
   * Initiates both the animation and movement intervals for the walking state.
   * The boss moves left until it reaches the minimum x position.
   */
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

  /**
   * Handles the endboss being hit by a bottle.
   * Applies damage, plays hit effects, and triggers the hurt animation.
   * If the endboss's life drops to 0 or below, the endboss dies.
   */
  hitByBottle() {
    if (this.isDefeated) return;
    this.applyDamage(20);
    if (this.life <= 0) {
      this.dieBoss();
      return;
    }
    this.playHitEffects();
    let hurtInterval = setInterval(() => {
      this.playAnimation(this.imagesHurt);
    }, 150);
    setTimeout(() => {
      clearInterval(hurtInterval);
      if (this.life > 0 && !this.isDefeated) {
        this.startMovement();
      }
    }, 1000);
  }

  /**
   * Reduces the endboss's life by the given damage value.
   * @param {number} damage - The damage amount to subtract from life.
   */
  applyDamage(damage) {
    this.life -= damage;
  }

  /**
   * Plays the hit sound and clears the endboss's animations.
   */
  playHitEffects() {
    this.endbossHitSound.play();
    this.clearEndbossAnimations();
  }

  /**
   * Handles the death sequence of the endboss.
   * Plays the death sound, clears animations, marks the boss as defeated,
   * plays the death animation, displays the "game won" overlay, and executes final game end tasks.
   */
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

  /**
   * Clears all endboss-related animation and movement intervals.
   */
  clearEndbossAnimations() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }

  /**
   * Executes tasks to end the game.
   * Stops the main melody, plays the victory sound, and clears all intervals.
   */
  gameEndTasks() {
    clearAllIntervals();
    mainMelodie.stop();
    stopAllSoundsExcept([youWinSound]);
    youWinSound.play();
  }
}
