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

  constructor() {
    super().loadImage("../img/2_character_pepe/2_walk/W-21.png");
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesJumping);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesHurt);
    this.applyGravity();
    this.walkingSound = new Sound("../audio/walking.wav");
    this.collectBottleSound = new Sound("../audio/collect_bottle.wav");
    this.collectCoinSound = new Sound("../audio/collect_coin.wav");
    this.hitSound = new Sound("../audio/hit_character.wav");
    this.jumpSound = new Sound("../audio/jump.wav");

    this.animate();
  }

  animate() {
    this.movementInterval = setInterval(() => {
      if (this.world.keyboard.RIGHT && this.x < this.world.level.level_end_x) {
        this.moveRight();
        this.otherDirection = false;
      }

      if (this.world.keyboard.LEFT && this.x > 0) {
        this.moveLeft();
        this.otherDirection = true;
      }

      if (this.world.keyboard.SPACE && !this.isAboveGround()) {
        this.jump();
        this.jumpSound.play();
      }

      if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
        if (!this.isAboveGround()) {
          this.walkingSound.play(true);
        }
      } else {
        this.walkingSound.stop();
      }

      this.world.cameraX = -this.x + 100;
    }, 1000 / 60);

    this.animationInterval = setInterval(() => {
      if (this.isDead()) {
        this.playAnimation(this.imagesDead);
        clearInterval(this.movementInterval);
        clearInterval(this.animationInterval);
        this.showGameOverScreen();
      } else if (this.isHurt()) {
        this.playAnimation(this.imagesHurt);
      } else if (this.isAboveGround()) {
        this.playJumpAnimation(this.imagesJumping);
      } else {
        if (this.world.keyboard.RIGHT || this.world.keyboard.LEFT) {
          this.playAnimation(this.imagesWalking);
        }
      }
    }, 105);
  }

  showGameOverScreen() {
    const overlay = document.getElementById("gameOverOverlay");
    if (overlay) {
      overlay.classList.remove("dNone");
    }
  }

  stopAnimation() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
  }

  collectBottle() {
    this.bottles += 20;
    this.collectBottleSound.play();
    if (this.bottles > 100) {
      this.bottles = 100;
    }
  }

  collectCoin() {
    this.coins += 20;
    this.collectCoinSound.play();
    if (this.coins > 100) {
      this.coins = 100;
    }
  }

  jump() {
    this.speedY = 33;
  }

  hit() {
    this.energy -= 20;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // Milli sekunden seit dem 01.01.1970
    }
  }
}
