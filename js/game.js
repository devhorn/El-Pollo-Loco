let canvas;
let world;
let keyboard = new Keyboard();
let mainMelodie = new Sound("../audio/main_melodie.wav", 0.1);
let youWinSound = new Sound("../audio/you_win.wav");
let gameOverSound = new Sound("../audio/game_over.wav");

/**
 * This function will be loaded if page is loaded an handles the sound
 */
function init() {
  /*  mainMelodie.stop(); */
  let storedSoundStatus = JSON.parse(localStorage.getItem("soundOn"));
  globalMute = !storedSoundStatus;
  let soundIcon = document.getElementById("muteBtn");
  soundIcon.src = globalMute ? "./img/volume_off.png" : "./img/volume_on.png";
}

/**
 * This function is for stating the game. It intiliaze the level and the world
 */
function startGame() {
  initLevelElements();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  document.getElementById("gameStartOverlay").classList.add("dNone");
  checkSoundOnOff();
}

/**
 * This function is for intializing the level in stargame function
 */
function initLevelElements() {
  coins = [];
  bottles = [];
  addCoins();
  addBottles();
  level1 = createLevel(coins, bottles);
}

/**
 * Checks the sound status in localstorage for the main game melodie
 */
function checkSoundOnOff() {
  let soundStatus = getSoundStatusLocalStorage();
  if (soundStatus) {
    mainMelodie.play(true);
  }
}

/**
 * This function is for reset the game in the game over/game won screen
 */
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
  checkSoundOnOff();
  document.getElementById("gameOverOverlay").classList.add("dNone");
  document.getElementById("gameWonOverlay").classList.add("dNone");
}

/**
 * This function is for routing back to menu in the game over/game won screen
 */
function backToMenu() {
  if (world) {
    world.stopAllIntervals();
  }
  clearAllIntervals();
  world = null;
  coins = [];
  bottles = [];
  document.getElementById("gameStartOverlay").classList.remove("dNone");
  document.getElementById("gameOverOverlay").classList.add("dNone");
  document.getElementById("gameWonOverlay").classList.add("dNone");
  mainMelodie.play(true);
}

/**
 * This function is for create the level objects
 * @param {object} coins - array of coins
 * @param {object} bottles - array of bottles
 */
function createLevel(coins, bottles) {
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
    new Cloud("../img/5_background/layers/4_clouds/1.png", 2500),
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
  globalMute = !globalMute;
  let soundIcon = document.getElementById("muteBtn");
  if (globalMute) {
    soundIcon.src = "./img/volume_off.png";
    saveToLocalStorage(false);
  } else {
    soundIcon.src = "./img/volume_on.png";
    saveToLocalStorage(true);
    mainMelodie.play(true);
  }
  allSounds.forEach(sound => {
    sound.audio.muted = globalMute;
  });
}

function getSoundStatusLocalStorage() {
  let sound = JSON.parse(localStorage.getItem("soundOn"));
  if (sound != null) {
    return sound;
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

function setSoundStatusMute() {
  saveToLocalStorage(false);
}

function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

function isLandscape() {
  return window.innerWidth > window.innerHeight;
}

function showOverlay() {
  let overlay = document.getElementById("orientationOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "orientationOverlay";
    overlay.style.position = "fixed";
    overlay.style.top = "0";
    overlay.style.left = "0";
    overlay.style.width = "100%";
    overlay.style.height = "100%";
    overlay.style.backgroundColor = "black";
    overlay.style.color = "white";
    overlay.style.display = "flex";
    overlay.style.alignItems = "center";
    overlay.style.justifyContent = "center";
    overlay.style.zIndex = "1000";
    overlay.style.fontSize = "24px";
    overlay.innerText = "Please turn your device";
    document.body.appendChild(overlay);
  }
  overlay.style.display = "flex";
}

function hideOverlay() {
  const overlay = document.getElementById("orientationOverlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

window.addEventListener("load", function () {
  const mobileKeys = document.getElementById("mobileKeys");
  if (isMobileDevice()) {
    if (!isLandscape()) {
      showOverlay();
      mobileKeys.style.display = "none";
    } else {
      hideOverlay();
      mobileKeys.style.display = "flex";
    }
  } else {
    mobileKeys.style.display = "none";
  }
});

window.addEventListener("resize", function () {
  const mobileKeys = document.getElementById("mobileKeys");
  if (isMobileDevice()) {
    if (isLandscape()) {
      hideOverlay();
      mobileKeys.style.display = "flex";
    } else {
      showOverlay();
      mobileKeys.style.display = "none";
    }
  } else {
    mobileKeys.style.display = "none";
  }
});

window.addEventListener("resize", function () {
  if (isMobileDevice()) {
    if (isLandscape()) {
      hideOverlay();
    } else {
      showOverlay();
    }
  }
});
