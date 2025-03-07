class MovableObject {
  x = 120;
  y = 300;
  img;
  height = 150;
  width = 100;
  imageCache = [];
  currentImage = 0;
  currentImageJump = 0;
  speed = 0.15;
  otherDirection = false;
  speedY = 0;
  acceleration = 2.5;
  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };
  energy = 100;
  lastHit = 0;

  applyGravity() {
    setInterval(() => {
      if (this.isAboveGround() || this.speedY > 0) {
        this.y -= this.speedY;
        this.speedY -= this.acceleration;
      }
    }, 1000 / 25);
  }

  isAboveGround() {
    return this.y < 120;
  }

  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  loadImages(arr) {
    arr.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
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

  jump() {
    this.speedY = 33;
  }

  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }

  /* isColliding(mo) {
    return this.x + this.width > mo.x && this.y + this.height > mo.y && this.x < mo.x && this.y < mo.y + mo.height;
  } */
  /* isColliding(mo) {
    return (
      this.x + this.width >= mo.x &&
      this.x <= mo.x + mo.width &&
      this.y + this.offsetY + this.height >= mo.y &&
      this.y + this.offsetY <= mo.y + mo.height
    );
  } */

  isColliding(mo) {
    return (
      this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
      this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
      this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
      this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom
    );
  }

  hit() {
    this.energy -= 5;
    if (this.energy < 0) {
      this.energy = 0;
    } else {
      this.lastHit = new Date().getTime(); // Milli sekunden seit dem 01.01.1970
    }
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
