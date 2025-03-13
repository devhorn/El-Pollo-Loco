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
  throwableObjects = [];

  constructor(canvas, keyboard) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.keyboard = keyboard;
    this.draw();
    this.setWorld();
    this.checkCollisionEnemie();
    this.checkThrowObject();
    this.checkCollisionThrowableWithEnemy();
    this.activateEndboss();
  }

  setWorld() {
    this.character.world = this;
  }

  checkCollisionsCollectableObjects() {
    setInterval(() => {
      this.checkCollisionCoin();
      this.checkCollisionBottle();
    }, 1000);
  }

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

  checkThrowObject() {
    setInterval(() => {
      if (this.keyboard.D && this.character.bottles > 0) {
        let bottle = new Throwableobject();
        this.throwableObjects.push(bottle);
        bottle.throw(this.character.x + 50, this.character.y + 50);
        this.character.bottles -= 20;
        this.statusbarBottle.setPercentage(this.character.bottles);
      }
    }, 150);
  }

  checkCollisionEnemie() {
    setInterval(() => {
      this.level.enemies.forEach(enemy => {
        if (this.character.isColliding(enemy)) {
          this.character.hit();
          this.statusbarHealth.setPercentage(this.character.energy);
        }
      });
    }, 1000);
  }

  checkCollisionsTop() {
    this.level.enemies.forEach(enemy => {
      if (this.character.isCollidingOnTop(enemy) && this.character.speedY < 0) {
        this.character.jump();
        this.defeatEnemy(enemy);
      }
    });
  }

  checkCollisionThrowableWithEnemy() {
    setInterval(() => {
      this.throwableObjects.forEach((bottle, bottleIndex) => {
        this.level.enemies.forEach(enemy => {
          if (bottle.isColliding(enemy)) {
            if (enemy instanceof Endboss) {
              enemy.hitByBottle();
            } else {
              enemy.die();
            }
            this.throwableObjects.splice(bottleIndex, 1);
          }
        });
      });
    }, 50);
  }

  defeatEnemy(enemy) {
    enemy.die();
    setTimeout(() => {
      this.level.enemies = this.level.enemies.filter(e => e !== enemy);
    }, 500);
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.ctx.translate(this.cameraX, 0);
    this.addObjectstoMap(this.level.backgroundObjects);

    this.addObjectstoMap(this.level.bottles);
    this.addObjectstoMap(this.level.coins);

    this.addObjectstoMap(this.level.enemies);
    this.addObjectstoMap(this.throwableObjects);
    this.addToMap(this.character);
    this.addObjectstoMap(this.level.clouds);

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

  addObjectstoMap(objects) {
    objects.forEach(object => {
      this.addToMap(object);
    });
  }

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

  flipImage(mo) {
    this.ctx.save();
    this.ctx.translate(mo.width, 0);
    this.ctx.scale(-1, 1);
    mo.x = mo.x * -1;
  }

  flipImageBack(mo) {
    mo.x = mo.x * -1;
    this.ctx.restore();
  }

  stopAllIntervals() {
    if (this.character) {
      this.character.stopAnimation();
    }
  }

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
