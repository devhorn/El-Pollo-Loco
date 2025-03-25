amountCoins = 10;
amountBottles = 7;

coins = [];
bottles = [];
enemies = [
  new Chicken(),
  new ChickenSmall(),
  new Chicken(),
  new ChickenSmall(),
  new Chicken(),
  new ChickenSmall(),
  new Chicken(),
  new ChickenSmall(),
  new Chicken(),
  new ChickenSmall(),
  new Chicken(),
  new ChickenSmall(),
  new Chicken(),
  new ChickenSmall(),
  new Endboss(),
];

/**
 * Creates instances of a bottle and push it to the bottles array
 * depending on the amount in the global amountBottles variable
 */
function addBottles() {
  let xPos = 200;
  for (let i = 0; i < amountBottles; i++) {
    bottles.push(new Bottle(xPos));
    xPos += 220;
  }
}

/**
 * Creates instances of a cion and push it to the coins array
 * depending on the amount in the global amountCoins variable
 */
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
  enemies,
  [
    new Cloud("../img/5_background/layers/4_clouds/1.png", 0),
    new Cloud("../img/5_background/layers/4_clouds/2.png", 500),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 1000),
    new Cloud("../img/5_background/layers/4_clouds/2.png", 1500),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 2000),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 2500),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 3000),
  ],
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
