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

  setPercentage(percentage) {
    this.percentage = percentage;
    let path = this.IMAGES[this.resolveImageIndex()];
    this.img = this.imageCache[path];
  }

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
