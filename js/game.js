let canvas;
let world;
let keyboard = new Keyboard();
let mainMelodie = new Sound("../audio/main_melodie.wav", 0.1);
let youWinSound = new Sound("../audio/you_win.wav");
let gameOverSound = new Sound("../audio/game_over.wav");
let soundStatus;

function init() {
  getSoundStatusLocalStorage();
}

function startGame() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  console.log("My character is ", world.character);
  document.getElementById("gameStartOverlay").classList.add("dNone");
  mainMelodie.play(true);
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
  mainMelodie.play(true);
  document.getElementById("gameOverOverlay").classList.add("dNone");
  document.getElementById("gameWonOverlay").classList.add("dNone");
}

function backToMenu() {
  document.getElementById("gameStartOverlay").classList.remove("dNone");
}

function createLevel(coins) {
  const enemies = createEnemies();
  const clouds = createClouds();
  const backgroundObjects = createBackgroundObjects();
  return new Level(enemies, clouds, backgroundObjects, coins, bottles);
}

function createBackgroundObjects() {
  return backgroundObjects;
}

function createEnemies() {
  return [
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
}

function createClouds() {
  return [
    new Cloud("../img/5_background/layers/4_clouds/1.png", 0),
    new Cloud("../img/5_background/layers/4_clouds/2.png", 500),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 1000),
    new Cloud("../img/5_background/layers/4_clouds/2.png", 1500),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 2000),
  ];
}

function playMelodie() {
  mainMelodie.play(true);
}

function playGameOverSound() {
  mainMelodie.stop();
  gameOverSound.play();
}

function muteSound() {
  let sound = JSON.parse(localStorage.getItem("soundOn"));
  let soundRef = document.getElementById("muteBtn");
  if (sound) {
    soundRef.src = "./img/volume_off.png";
    saveToLocalStorage(false);
  } else {
    soundRef.src = "./img/volume_on.png";
    saveToLocalStorage(true);
  }
}

function getSoundStatusLocalStorage() {
  let sound = JSON.parse(localStorage.getItem("soundOn"));
  if (sound != null) {
    soundStatus = sound;
  } else {
    saveToLocalStorage(true);
  }
}

function saveToLocalStorage(bool) {
  localStorage.setItem("soundOn", JSON.stringify(bool));
}

function closeOverlay(id) {
  document.getElementById(id).classList.add("dNone");
}

function openOverlay(id) {
  document.getElementById(id).classList.remove("dNone");
}

function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}
