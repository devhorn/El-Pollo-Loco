class World {
  character = new Character();
  level = level1;
  ctx;
  canvas;
  keyboard;
  world;
  cameraX = 0;
  statusbarHealth = new Statusbar(statusbarImagesHealth, 20, 0, 100);
  statusbarCoin = new Statusbar(statusbarImagesCoins, 20, 50, 0);
  statusbarBottle = new Statusbar(statusbarImagesBottles, 20, 100, 0);
  bottleSplashSound = new Sound("../audio/glass_splash.flac");
  throwableObjects = [];
  groundY = 340;

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisionEnemie();
    this.checkThrowObject();
    this.checkCollisionThrowableWithEnemy();
    this.checkCollisionBottleWithGround();
    this.activateEndboss();
  }

  /**
   * This function ensures that the properties and methods from the world class are available in the character
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * This function checks a collosion with a coin or a bottle
   */
  checkCollisionsCollectableObjects() {
    setInterval(() => {
      this.checkCollisionCoin();
      this.checkCollisionBottle();
    }, 1000);
  }

  /**
   * This function checks the collision with a coin and update the statusbar if a the character is colliding with a coin
   */
  checkCollisionCoin() {
    this.level.coins = this.level.coins.filter(coin => {
      if (this.character.isColliding(coin)) {
        this.character.collectCoin();
        this.statusbarCoin.setPercentage(this.character.coins);
        return false;
      }
      return true;
    });
  }

  /**
   * This function checks the collision with a bottle and update the statusbar if a the character is colliding with a bottle
   */
  checkCollisionBottle() {
    this.level.bottles = this.level.bottles.filter(bottle => {
      if (this.character.isColliding(bottle) && this.character.bottles < 100) {
        this.character.collectBottle();
        this.statusbarBottle.setPercentage(this.character.bottles);
        return false;
      }
      return true;
    });
  }

  /**
   * This function checks if a bottle is thrown by pressing the D key. Throwing is only possible if bottles are collectet before.
   * After throwing the statusbar will be updated
   */
  checkThrowObject() {
    setInterval(() => {
      if (this.keyboard.D && this.character.bottles > 0) {
        let bottle = new Throwableobject();
        this.throwableObjects.push(bottle);
        bottle.throw(this.character.x + 50, this.character.y + 50);
        this.character.bottles -= 20;
        this.statusbarBottle.setPercentage(this.character.bottles);
      }
    }, 120);
  }

  /**
   * This function checks if a the character is colliding with an enemy.
   * Depending on which enemy the character collides with, different damage is applied to the character
   */
  checkCollisionEnemie() {
    setInterval(() => {
      this.level.enemies.forEach(enemy => {
        if (this.character.isColliding(enemy)) {
          if (enemy instanceof Endboss) {
            this.character.hit(40);
          } else {
            this.character.hit();
          }
          this.character.hitSound.play();
          this.statusbarHealth.setPercentage(this.character.energy);
        }
      });
    }, 1000);
  }

  /**
   * The function checks if the character collides with an enemy from above
   */
  checkCollisionsTop() {
    this.level.enemies.forEach(enemy => {
      if (this.character.isCollidingOnTop(enemy) && this.character.speedY < 0) {
        this.character.jump();
        this.defeatEnemy(enemy);
      }
    });
  }

  /**
   * This function checks all 50 ms if a thorwableObject (bottle) collide with an enemy
   * When a chicken is hit, it dies. If the end boss is hit, it takes damage
   */
  checkCollisionThrowableWithEnemy() {
    setInterval(() => {
      this.throwableObjects.forEach((bottle, bottleIndex) => {
        this.level.enemies.forEach(enemy => {
          if (bottle.isColliding(enemy)) {
            if (!bottle.splashPlayed) {
              this.bottleSplashSound.play();
              bottle.splashPlayed = true;
              bottle.splashAnimation();
              if (enemy instanceof Endboss) {
                enemy.hitByBottle();
              } else {
                enemy.die();
              }
              setTimeout(() => {
                this.throwableObjects.splice(bottleIndex, 1);
              }, 600);
            }
          }
        });
      });
    }, 50);
  }

  /**
   * This function checks all 50 ms if a thorwableObject (bottle) collide the ground
   */
  checkCollisionBottleWithGround() {
    setInterval(() => {
      this.throwableObjects.forEach((bottle, bottleIndex) => {
        if (bottle.y + bottle.height >= this.groundY) {
          if (!bottle.splashPlayed) {
            this.bottleSplashSound.play();
            bottle.splashPlayed = true;
            bottle.splashAnimation();
            setTimeout(() => {
              this.throwableObjects.splice(bottleIndex, 1);
            }, 600);
          }
        }
      });
    }, 50);
  }

  /**
   * the function ensures that an enemy first goes through its death process and is then (after 500 ms)
   * completely removed from the level's enemy list.
   * @param {object} enemy instance of enemy class
   */
  defeatEnemy(enemy) {
    enemy.die();
    setTimeout(() => {
      this.level.enemies = this.level.enemies.filter(e => e !== enemy);
    }, 500);
  }

  /**
   * This function adds the images to the canvas
   */
  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.translate(this.cameraX, 0);
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.level.bottles);
    this.addObjectstoMap(this.level.coins);
    this.addObjectstoMap(this.level.clouds);
    this.addObjectstoMap(this.level.enemies);
    this.addObjectstoMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.cameraX, 0);
    // ------------ space for fixed Objects -------------- //
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarCoin);
    this.addToMap(this.statusbarBottle);
    this.ctx.translate(this.cameraX, 0);
    this.ctx.translate(-this.cameraX, 0);
    this.checkCollisionsCollectableObjects();
    this.checkCollisionsTop();
    // Draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  /**
   * This function adds multiple Images from a array the canvas
   */
  addObjectstoMap(objects) {
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  /**
   * This function adds image the canvas
   * @param {object} mo - instance of class
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    /* mo.drawFrame(this.ctx); */
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * This function mirrors image
   * @param {object} mo - instance of class
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * This function mirrors a image back
   * @param {object} mo - instance of class
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * This function stop alle animations of the character
   */
  stopAllIntervals() {
    if (this.character) {
      this.character.stopAnimation();
    }
  }

  /**
   * This function lets the end boss start walking when the character has reached a certain x-value
   */
  activateEndboss() {
    setInterval(() => {
      this.level.enemies.forEach(enemy => {
        if (enemy instanceof Endboss) {
          enemy.update(this.character.x);
        }
      });
    }, 1000 / 60);
  }
}
