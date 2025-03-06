amountCoins = 15;
amountChickens = 6;
coins = [];
chickens = [];

function addCoins() {
  let xPos = 100;
  for (let i = 0; i < amountCoins; i++) {
    coins.push(new Coin(xPos));
    xPos += 100;
  }
}

function addChickens() {
  for (let i = 0; i < amountChickens; i++) {
    chickens.push(new Chicken());
  }
}

addCoins();
addChickens();

const level1 = new Level(
  chickens,
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
  coins
);
