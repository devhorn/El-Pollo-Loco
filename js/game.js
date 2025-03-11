let canvas;
let world;
let keyboard = new Keyboard();

function startGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.log("My character is ", world.character);
  document.getElementById("gameStartOverlay").classList.add("dNone");
}

window.addEventListener("keydown", e => {
  if (e.code == "ArrowLeft") {
    keyboard.LEFT = true;
  }

  if (e.code == "ArrowUp") {
    keyboard.UP = true;
  }

  if (e.code == "ArrowRight") {
    keyboard.RIGHT = true;
  }

  if (e.code == "ArrowDown") {
    keyboard.DOWN = true;
  }

  if (e.code == "Space") {
    keyboard.SPACE = true;
  }

  if (e.code == "KeyD") {
    keyboard.D = true;
  }
});

window.addEventListener("keyup", e => {
  if (e.code == "ArrowLeft") {
    keyboard.LEFT = false;
  }

  if (e.code == "ArrowUp") {
    keyboard.UP = false;
  }

  if (e.code == "ArrowRight") {
    keyboard.RIGHT = false;
  }

  if (e.code == "ArrowDown") {
    keyboard.DOWN = false;
  }

  if (e.code == "Space") {
    keyboard.SPACE = false;
  }

  if (e.code == "KeyD") {
    keyboard.D = false;
  }
});

function resetGame() {
  if (world) {
    world.stopAllIntervals();
  }
  coins = [];
  bottles = [];
  addCoins();
  addBottles();
  level1 = createLevel(coins, bottles);
  world = new World(canvas, keyboard);
  document.getElementById("gameOverOverlay").classList.add("dNone");
}

function createLevel(coins) {
  const enemies = [new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Chicken(), new Endboss()];
  const clouds = [new Cloud()];
  const backgroundObjects = createBackgroundObjects();
  return new Level(enemies, clouds, backgroundObjects, coins, bottles);
}

function createBackgroundObjects() {
  return backgroundObjects;
}
