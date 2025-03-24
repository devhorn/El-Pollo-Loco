class Statusbar extends DrawableObject {
  width = 200;
  height = 60;

  constructor(images, x, y, percentage) {
    super();
    this.IMAGES = images;
    this.y = y;
    this.x = x;
    this.percentage = percentage;
    this.loadImages(images);
    this.setPercentage(percentage);
  }

  /**
   * Sets the current percentage of the status bar and updates the displayed image accordingly.
   * @param {number} percentage - The new percentage to display.
   */
  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

  /**
   * Resolves the appropriate image index based on the current percentage.
   * @returns {number} The index of the image that should be displayed.
   */
  resolveImageIndex() {
    if (this.percentage == 100) {
      return 5;
    } else if (this.percentage == 80) {
      return 4;
    } else if (this.percentage == 60) {
      return 3;
    } else if (this.percentage == 40) {
      return 2;
    } else if (this.percentage == 20) {
      return 1;
    } else {
      return 0;
    }
  }
}
