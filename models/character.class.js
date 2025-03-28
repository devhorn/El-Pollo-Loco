class Character extends MoveableObject {
  height = 300;
  width = 120;
  y = 120;
  imagesWalking = [
    "../img/2_character_pepe/2_walk/W-21.png",
    "../img/2_character_pepe/2_walk/W-22.png",
    "../img/2_character_pepe/2_walk/W-23.png",
    "../img/2_character_pepe/2_walk/W-24.png",
    "../img/2_character_pepe/2_walk/W-25.png",
    "../img/2_character_pepe/2_walk/W-26.png",
  ];

  imagesJumping = [
    "../img/2_character_pepe/3_jump/J-31.png",
    "../img/2_character_pepe/3_jump/J-32.png",
    "../img/2_character_pepe/3_jump/J-33.png",
    "../img/2_character_pepe/3_jump/J-34.png",
    "../img/2_character_pepe/3_jump/J-35.png",
    "../img/2_character_pepe/3_jump/J-36.png",
    "../img/2_character_pepe/3_jump/J-37.png",
    "../img/2_character_pepe/3_jump/J-38.png",
    "../img/2_character_pepe/3_jump/J-39.png",
  ];

  imagesDead = [
    "../img/2_character_pepe/5_dead/D-51.png",
    "../img/2_character_pepe/5_dead/D-52.png",
    "../img/2_character_pepe/5_dead/D-53.png",
    "../img/2_character_pepe/5_dead/D-54.png",
    "../img/2_character_pepe/5_dead/D-55.png",
    "../img/2_character_pepe/5_dead/D-56.png",
    "../img/2_character_pepe/5_dead/D-57.png",
  ];

  imagesHurt = [
    "../img/2_character_pepe/4_hurt/H-41.png",
    "../img/2_character_pepe/4_hurt/H-42.png",
    "../img/2_character_pepe/4_hurt/H-43.png",
  ];

  imagesIdle = [
    "../img/2_character_pepe/1_idle/idle/I-1.png",
    "../img/2_character_pepe/1_idle/idle/I-2.png",
    "../img/2_character_pepe/1_idle/idle/I-3.png",
    "../img/2_character_pepe/1_idle/idle/I-4.png",
    "../img/2_character_pepe/1_idle/idle/I-5.png",
    "../img/2_character_pepe/1_idle/idle/I-6.png",
    "../img/2_character_pepe/1_idle/idle/I-7.png",
    "../img/2_character_pepe/1_idle/idle/I-8.png",
    "../img/2_character_pepe/1_idle/idle/I-9.png",
    "../img/2_character_pepe/1_idle/idle/I-10.png",
  ];

  imagesSleep = [
    "../img/2_character_pepe/1_idle/long_idle/I-11.png",
    "../img/2_character_pepe/1_idle/long_idle/I-12.png",
    "../img/2_character_pepe/1_idle/long_idle/I-13.png",
    "../img/2_character_pepe/1_idle/long_idle/I-14.png",
    "../img/2_character_pepe/1_idle/long_idle/I-15.png",
    "../img/2_character_pepe/1_idle/long_idle/I-16.png",
    "../img/2_character_pepe/1_idle/long_idle/I-17.png",
    "../img/2_character_pepe/1_idle/long_idle/I-18.png",
    "../img/2_character_pepe/1_idle/long_idle/I-19.png",
    "../img/2_character_pepe/1_idle/long_idle/I-20.png",
  ];

  world;
  speed = 10;
  offset = {
    top: 120,
    left: 30,
    right: 40,
    bottom: 30,
  };
  coins = 0;
  bottles = 0;
  lastMoveTime = Date.now();
  lastBottleThrow = 0;
  gameEnded = false;

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesIdle);
    this.loadImages(this.imagesSleep);
    this.applyGravity();
    this.walkingSound = new Sound("../audio/walking.wav");
    this.collectBottleSound = new Sound("../audio/collect_bottle.wav");
    this.collectCoinSound = new Sound("../audio/collect_coin.wav");
    this.hitSound = new Sound("../audio/hit_character.wav");
    this.jumpSound = new Sound("../audio/jump.wav");
    this.snoreSound = new Sound("../audio/snore.wav");
    this.animate();
  }

  /**
   * Initiates the overall animation sequence for the character.
   * This includes both movement and state-based animations.
   */
  animate() {
    this.movementsOfCharacter();
    this.animationsOfCharacter();
  }

  /**
   * Displays the game over screen by removing the 'dNone' class from the overlay element.
   */
  showGameOverScreen() {
    const overlay = document.getElementById("gameOverOverlay");
    if (overlay) {
      overlay.classList.remove("dNone");
    }
  }

  /**
   * Stops all animation intervals associated with the character.
   */
  stopAnimation() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    this.walkingSound.stop();
    this.snoreSound.stop();
  }

  /**
   * Increases the bottle count and plays the collection sound.
   * Caps the bottle count at 100.
   */
  collectBottle() {
    this.bottles += 20;
    this.collectBottleSound.play();
    if (this.bottles > 100) {
      this.bottles = 100;
    }
  }

  /**
   * Increases the coin count and plays the collection sound.
   * Caps the coin count at 100.
   */
  collectCoin() {
    this.coins += 20;
    this.collectCoinSound.play();
    if (this.coins > 100) {
      this.coins = 100;
    }
  }

  /**
   * Initiates the jump action by setting the vertical speed.
   */
  jump() {
    this.speedY = 25;
  }

  /**
   * Reduces the character's energy by the specified damage.
   * Updates the last hit timestamp if energy remains.
   * @param {number} [damage=20] - The amount of damage to inflict.
   */
  hit(damage = 20) {
    this.energy -= damage;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime();
    }
  }

  /**
   * Handles the movement of the character by processing keyboard inputs
   * and updating movement-related states, sounds, and camera position.
   */
  movementsOfCharacter() {
    this.movementInterval = setInterval(() => {
      this.handleHorizontalMovement();
      this.handleJump();
      this.handleWalkingSound();
      this.updateCamera();
    }, 1000 / 60);
  }

  /**
   * Processes horizontal movement based on keyboard inputs for left and right.
   * Updates movement state and stops the snore sound.
   */
  handleHorizontalMovement() {
    if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
      this.moveRight();
      this.otherDirection = false;
      this.registerMovement();
    }
    if (this.world.keyboard.LEFT && this.x > 0) {
      this.moveLeft();
      this.otherDirection = true;
      this.registerMovement();
    }
  }

  /**
   * Processes the jump action when the jump key is pressed.
   * Initiates the jump, plays the jump sound, and updates the movement state.
   */
  handleJump() {
    if (this.world.keyboard.SPACE && !this.isAboveGround()) {
      this.jump();
      this.jumpSound.play();
      this.registerMovement();
    }
  }

  /**
   * Registers a movement event by updating the last move timestamp
   * and stopping the snore sound.
   */
  registerMovement() {
    this.lastMoveTime = Date.now();
    this.snoreSound.stop();
  }

  /**
   * Plays the walking sound when horizontal movement keys are pressed,
   * and stops it otherwise.
   */
  handleWalkingSound() {
    if (this.gameEnded) return; // Wenn Spiel beendet, nichts tun
    if ((this.world.keyboard.RIGHT || this.world.keyboard.LEFT) && !this.isAboveGround()) {
      this.walkingSound.play(true);
    } else {
      this.walkingSound.stop();
    }
  }

  /**
   * Updates the camera position based on the character's current x position.
   */
  updateCamera() {
    this.world.cameraX = -this.x + 100;
  }

  /**
   * Handles the character's animation state based on its current conditions.
   * Checks for death, hurt, jumping, and idle/movement animations.
   */
  animationsOfCharacter() {
    this.animationInterval = setInterval(() => {
      if (this.handleDeathAnimation()) return;
      if (this.handleHurtAnimation()) return;
      if (this.handleJumpAnimation()) return;
      this.handleIdleOrMovementAnimation();
    }, 100);
  }

  /**
   * Checks if the character is dead. If so, plays the death animation,
   * clears all intervals, shows the game over screen, and plays the game over sound.
   * @returns {boolean} True if the death animation was handled; otherwise, false.
   */
  handleDeathAnimation() {
    if (this.isDead()) {
      this.playAnimation(this.imagesDead);
      this.showGameOverScreen();
      playGameOverSound();
      clearAllIntervals();
      return true;
    }
    return false;
  }

  /**
   * Checks if the character is hurt. If so, plays the hurt animation.
   * @returns {boolean} True if the hurt animation was handled; otherwise, false.
   */
  handleHurtAnimation() {
    if (this.isHurt()) {
      this.playAnimation(this.imagesHurt);
      return true;
    }
    return false;
  }

  /**
   * Checks if the character is in the air (jumping).
   * If so, plays the jumping animation.
   * @returns {boolean} True if the jump animation was handled; otherwise, false.
   */
  handleJumpAnimation() {
    if (this.isAboveGround()) {
      this.playJumpAnimation(this.imagesJumping);
      return true;
    }
    return false;
  }

  /**
   * Handles idle or movement animations based on the character's inactivity.
   * If the character has been inactive for 7 seconds, plays the sleep animation and snore sound.
   * Otherwise, plays walking or idle animations based on keyboard input.
   */
  handleIdleOrMovementAnimation() {
    if (this.gameEnded) {
      this.walkingSound.stop();
      this.snoreSound.stop();
      return;
    }
    if (Date.now() - this.lastMoveTime >= 7000) {
      this.playAnimation(this.imagesSleep);
      this.snoreSound.play(true);
    } else if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
      this.playAnimation(this.imagesWalking);
    } else {
      this.playAnimation(this.imagesIdle);
    }
  }
}
