class MoveableObject extends DrawableObject {
  currentImageJump = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  energy = 100;
  lastHit = 0;

  /**
   * Applies gravity to the object by updating its vertical position and vertical speed.
   * If the object is above ground or still moving upward, it adjusts the y position,
   * decreases the speedY by the acceleration, and resets position/speed when hitting the ground.
   */
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

  /**
   * Checks whether the object is above the ground.
   * For throwable objects, it always returns true.
   * @returns {boolean} True if the object is above ground or if it is a throwable object; otherwise, false.
   */
  isAboveGround() {
    if (this instanceof Throwableobject) {
      return true;
    } else {
      return this.y < 120;
    }
  }

  /**
   * Moves the object to the right by adding the object's speed to its x coordinate.
   */
  moveRight() {
    this.x += this.speed;
  }

  /**
   * Moves the object to the left by subtracting the object's speed from its x coordinate.
   */
  moveLeft() {
    this.x -= this.speed;
  }

  /**
   * Plays the jump animation by cycling through the provided images.
   * Increments the jump animation index; resets if it exceeds the images array length.
   * @param {string[]} images - Array of image paths for the jump animation.
   */
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

  /**
   * Checks if this object is colliding with another moveable object.
   * Uses the object's bounding boxes and offset values for collision detection.
   * @param {MoveableObject} mo - The other moveable object to check collision against.
   * @returns {boolean} True if a collision is detected; otherwise, false.
   */
  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  /**
   * Checks if this object is colliding on top of another moveable object.
   * It verifies if the object's horizontal center lies within the other object's boundaries
   * and if the bottom of the object overlaps with the top half of the other object.
   * @param {MoveableObject} mo - The other moveable object to check top collision against.
   * @returns {boolean} True if a top collision is detected; otherwise, false.
   */
  isCollidingOnTop(mo) {
    return (
      this.x + this.width / 2 > mo.x &&
      this.x + this.width / 2 < mo.x + mo.width &&
      this.y + this.height > mo.y &&
      this.y + this.height < mo.y + mo.height / 2
    );
  }

  /**
   * Checks if the object is dead by verifying if its energy is zero.
   * @returns {boolean} True if energy equals zero (object is dead); otherwise, false.
   */
  isDead() {
    return this.energy == 0;
  }

  /**
   * Determines if the object is in a "hurt" state.
   * Compares the time elapsed since the last hit to 1 second.
   * @returns {boolean} True if the time passed since the last hit is less than 1 second; otherwise, false.
   */
  isHurt() {
    let timepassed = new Date().getTime() - this.lastHit; // difference in ms
    timepassed = timepassed / 1000;
    return timepassed < 1;
  }
}
