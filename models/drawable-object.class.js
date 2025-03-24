class DrawableObject {
  img;
  imageCache = [];
  currentImage = 0;
  x = 120;
  y = 300;
  height = 150;
  width = 100;

  offset = {
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  };

  /**
   * Plays an animation by cycling through the provided images.
   * The function selects the current image based on the currentImage index,
   * retrieves it from the cache, and increments the index.
   * @param {string[]} images - Array of image paths for the animation.
   */
  playAnimation(images) {
    let indexImg = this.currentImage % images.length;
    let path = images[indexImg];
    this.img = this.imageCache[path];
    this.currentImage++;
  }

  /**
   * Loads a single image from the specified path and sets it as the current image.
   * @param {string} path - The source path of the image to load.
   */
  loadImage(path) {
    this.img = new Image();
    this.img.src = path;
  }

  /**
   * Draws the current image of the object onto the provided canvas context.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  draw(ctx) {
    ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
  }

  /**
   * Loads multiple images from an array of paths and caches them for later use.
   * @param {string[]} arr - Array of image paths to load.
   */
  loadImages(arr) {
    arr.forEach(path => {
      let img = new Image();
      img.src = path;
      this.imageCache[path] = img;
    });
  }

  /**
   * Draws a debug frame around the object if it is an instance of Character, Chicken, or Coin.
   * This can be used to visualize the object's boundaries.
   * @param {CanvasRenderingContext2D} ctx - The canvas 2D rendering context.
   */
  drawFrame(ctx) {
    if (this instanceof Character || this instanceof Chicken || this instanceof Coin) {
      ctx.beginPath();
      ctx.lineWidth = "5";
      ctx.strokeStyle = "blue";
      ctx.rect(this.x, this.y, this.width, this.height);
      ctx.stroke();
    }
  }
}
