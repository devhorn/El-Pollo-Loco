class MoveableObject extends DrawableObject {
  currentImageJump = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
        if (!(this instanceof Throwableobject) && this.y > 120) {
          this.y = 120;
          this.speedY = 0;
        }
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    if (this instanceof Throwableobject) {
      return true;
    } else {
      return this.y < 120;
    }
  }

  moveRight() {
    this.x += this.speed;
  }

  moveLeft() {
    this.x -= this.speed;
  }

  playAnimation(images) {
    let indexImg = this.currentImage % images.length;
    let path = images[indexImg];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  playJumpAnimation(images) {
    if (this.currentImageJump < images.length) {
      let indexImg = this.currentImageJump;
      let path = images[indexImg];
      this.img = this.imageCache[path];
      this.currentImageJump++;
    } else {
      this.currentImageJump = 0;
    }
  }

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  isCollidingOnTop(mo) {
    return (
      this.x + this.width / 2 > mo.x &&
      this.x + this.width / 2 < mo.x + mo.width &&
      this.y + this.height > mo.y &&
      this.y + this.height < mo.y + mo.height / 2
    );
  }

  isDead() {
    return this.energy == 0;
  }

  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // diff in ms
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }
}
