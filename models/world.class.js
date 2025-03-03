class World {
  character = new Character();
  enemies = [new Chicken(), new Chicken(), new Chicken()];
  clouds = [new Cloud()];
  ctx;
  canvas;
  backgroundObjects = [
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png"),
  ];

  constructor(canvas) {
    this.ctx = canvas.getContext("2d");
    this.canvas = canvas;
    this.draw();
  }

  draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    this.addToMap(this.character);

    this.enemies.forEach(enemie => {
      this.addToMap(enemie);
    });

    this.clouds.forEach(cloud => {
      this.addToMap(cloud);
    });

    // Draw wird immer wieder aufgerufen
    let self = this;
    requestAnimationFrame(function () {
      self.draw();
    });
  }

  addToMap(model) {
    this.ctx.drawImage(model.img, model.x, model.y, model.width, model.height);
  }
}
