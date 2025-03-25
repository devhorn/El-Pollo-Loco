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
  statusbarEndboss = new Statusbar(statusbarImagesEndboss, 500, 0, 100);
  bottleSplashSound = new Sound("../audio/glass_splash.flac");
  throwableObjects = [];
  groundY = 340;
  showEndbossBar = false;

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
   * Sets the world reference in the character, so the character can access world properties and methods.
   */
  setWorld() {
    this.character.world = this;
  }

  /**
   * Checks for collisions with collectable objects (coins and bottles).
   * Calls collision check functions for coins and bottles every 1 second.
   */
  checkCollisionsCollectableObjects() {
    setInterval(() => {
      this.checkCollisionCoin();
      this.checkCollisionBottle();
    }, 1000);
  }

  /**
   * Checks for collision between the character and coins.
   * If a collision is detected, the coin is collected, removed from the level,
   * and the coin status bar is updated.
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
   * Checks for collision between the character and bottles.
   * If a collision is detected and the character has less than 100 bottles,
   * the bottle is collected, removed from the level,
   * and the bottle status bar is updated.
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
   * Checks if the player is throwing an object (bottle) by pressing the D key.
   * When a throw is detected, a new throwable object is created, thrown,
   * and the bottle count is decreased while updating the status bar.
   */
  checkThrowObject() {
    setInterval(() => {
      if (this.keyboard.D && this.character.bottles > 0 && Date.now() - this.character.lastMoveTime < 7000) {
        let currentTime = Date.now();
        if (currentTime - this.character.lastBottleThrow >= 1500) {
          this.character.lastBottleThrow = currentTime;
          let bottle = new Throwableobject();
          this.throwableObjects.push(bottle);
          bottle.throw(this.character.x + 50, this.character.y + 50);
          this.character.bottles -= 20;
          this.statusbarBottle.setPercentage(this.character.bottles);
        }
      }
    }, 120);
  }

  /**
   * Checks for collisions between the character and enemies.
   * If a collision occurs, applies damage based on enemy type and updates the health status bar.
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
   * Checks if the character collides with an enemy from above.
   * If a top collision is detected while the character is moving upward,
   * the character performs a jump and the enemy is defeated.
   */
  checkCollisionsTop() {
    this.level.enemies.forEach(enemy => {
      if (enemy instanceof Chicken || enemy instanceof ChickenSmall) {
        if (this.character.isCollidingOnTop(enemy) && this.character.speedY < 0) {
          this.character.jump();
          this.defeatEnemy(enemy);
        }
      }
    });
  }

  /**
   * Periodically checks for collisions between throwable objects and enemies.
   *
   * @returns {void}
   */
  checkCollisionThrowableWithEnemy() {
    setInterval(() => {
      this.throwableObjects.forEach((bottle, bottleIndex) => {
        this.level.enemies.forEach(enemy => {
          this.processBottleCollision(bottle, enemy, bottleIndex);
        });
      });
    }, 50);
  }

  /**
   * Processes the collision between a bottle and an enemy.
   * Plays splash sound and animation, handles enemy hit or death and schedules the removal of the bottle.
   * @param {Object} bottle - The throwable bottle object.
   * @param {Object} enemy - The enemy object.
   * @param {number} bottleIndex - The index of the bottle in the throwableObjects array.
   */
  processBottleCollision(bottle, enemy, bottleIndex) {
    if (bottle.isColliding(enemy) && !bottle.splashPlayed) {
      this.bottleSplashSound.play();
      bottle.splashPlayed = true;
      bottle.splashAnimation();
      if (enemy instanceof Endboss) {
        enemy.hitByBottle();
        this.statusbarEndboss.setPercentage(enemy.life);
      } else {
        enemy.die();
      }
      this.removeBottleAfterDelay(bottleIndex, 600);
    }
  }

  /**
   * Removes a bottle from the throwableObjects array after a specified delay.
   * @param {number} bottleIndex - The index of the bottle to remove.
   * @param {number} delay - The delay in milliseconds before removal.
   */
  removeBottleAfterDelay(bottleIndex, delay) {
    setTimeout(() => {
      this.throwableObjects.splice(bottleIndex, 1);
    }, delay);
  }

  /**
   * Checks for collisions between throwable objects (bottles) and the ground every 50 ms.
   * If a collision with the ground is detected, plays a splash sound and triggers the splash animation,
   * then removes the bottle from the throwable objects list.
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
   * Defeats an enemy by initiating its death process and then removing it from the level's enemy list after 500 ms.
   * @param {object} enemy - The enemy instance to defeat.
   */
  defeatEnemy(enemy) {
    enemy.die();
    setTimeout(() => {
      this.level.enemies = this.level.enemies.filter(e => e !== enemy);
    }, 500);
  }

  /**
   * Draws the current frame by clearing the canvas, drawing moving objects, drawing status bars,
   * and handling collisions. Calls itself repeatedly with requestAnimationFrame.
   */
  draw() {
    this.clearCanvas();
    this.drawingObjects();
    this.drawStatusBars();
    this.handleCollisions();
    requestAnimationFrame(() => this.draw());
  }

  /**
   * Clears the entire canvas.
   */
  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Draws all moving objects that are rendered relative to the camera.
   * This includes background objects, bottles, coins, clouds, enemies, throwable objects, and the character.
   */
  drawingObjects() {
    this.ctx.translate(this.cameraX, 0);
    this.addObjectstoMap(this.level.backgroundObjects);
    this.addObjectstoMap(this.level.bottles);
    this.addObjectstoMap(this.level.coins);
    this.addObjectstoMap(this.level.clouds);
    this.addObjectstoMap(this.level.enemies);
    this.addObjectstoMap(this.throwableObjects);
    this.addToMap(this.character);
    this.ctx.translate(-this.cameraX, 0);
  }

  /**
   * Draws the status bars, such as health, coins, and bottles.
   */
  drawStatusBars() {
    this.addToMap(this.statusbarHealth);
    this.addToMap(this.statusbarCoin);
    this.addToMap(this.statusbarBottle);
    if (this.showEndbossBar) {
      this.addToMap(this.statusbarEndboss);
    }
  }

  /**
   * Handles collision detection for collectable objects and top collisions.
   */
  handleCollisions() {
    this.checkCollisionsCollectableObjects();
    this.checkCollisionsTop();
  }

  /**
   * Adds multiple objects from an array to the canvas.
   * @param {Array} objects - An array of drawable objects.
   */
  addObjectstoMap(objects) {
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

  /**
   * Adds a single drawable object to the canvas.
   * Handles image flipping if the object is moving in the opposite direction.
   * @param {object} mo - A drawable object instance.
   */
  addToMap(mo) {
    if (mo.otherDirection) {
      this.flipImage(mo);
    }
    mo.draw(this.ctx);
    if (mo.otherDirection) {
      this.flipImageBack(mo);
    }
  }

  /**
   * Flips the image horizontally by saving the current context, translating,
   * scaling the context, and inverting the object's x coordinate.
   * @param {object} mo - A drawable object instance.
   */
  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  /**
   * Restores the flipped image to its original orientation by reverting the x coordinate and restoring the context.
   * @param {object} mo - A drawable object instance.
   */
  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  /**
   * Stops all animations related to the character by calling its stopAnimation method.
   */
  stopAllIntervals() {
    if (this.character) {
      this.character.stopAnimation();
    }
  }

  /**
   * Activates the endboss by updating its state based on the character's x position.
   * This causes the endboss to start walking when the character reaches a certain threshold.
   */
  activateEndboss() {
    setInterval(() => {
      this.level.enemies.forEach(enemy => {
        if (enemy instanceof Endboss) {
          enemy.update(this.character.x);
          if (enemy.triggerActivated && !this.showEndbossBar) {
            this.showEndbossBar = true;
          }
        }
      });
    }, 1000 / 60);
  }
}
