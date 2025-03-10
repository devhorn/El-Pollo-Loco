amountCoins = 10;
amountBottles = 7;

coins = [];
bottles = [];

function addBottles() {
  let xPos = 200;
  for (let i = 0; i < amountBottles; i++) {
    bottles.push(new Bottle(xPos));
    xPos += 220;
  }
}

function addCoins() {
  let xPos = 100;
  for (let i = 0; i < amountCoins; i++) {
    coins.push(new Coin(xPos));
    xPos += 200;
  }
}

addCoins();
addBottles();

let level1 = new Level(
  [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Endboss()],
  [new Cloud()],
  [
    new BackgroundObject("../img/5_background/layers/air.png", -719),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", -719),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", -719),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", -719),

    new BackgroundObject("../img/5_background/layers/air.png", 0),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 0),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 0),

    new BackgroundObject("../img/5_background/layers/air.png", 719),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 719),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 719),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 719),

    new BackgroundObject("../img/5_background/layers/air.png", 719 * 2),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 719 * 2),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 719 * 2),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 719 * 2),

    new BackgroundObject("../img/5_background/layers/air.png", 719 * 3),
    new BackgroundObject("../img/5_background/layers/3_third_layer/2.png", 719 * 3),
    new BackgroundObject("../img/5_background/layers/2_second_layer/2.png", 719 * 3),
    new BackgroundObject("../img/5_background/layers/1_first_layer/2.png", 719 * 3),

    new BackgroundObject("../img/5_background/layers/air.png", 719 * 4),
    new BackgroundObject("../img/5_background/layers/3_third_layer/1.png", 719 * 4),
    new BackgroundObject("../img/5_background/layers/2_second_layer/1.png", 719 * 4),
    new BackgroundObject("../img/5_background/layers/1_first_layer/1.png", 719 * 4),
  ],
  coins,
  bottles
);
