let canvas;
let world;
let keyboard = new Keyboard();
let mainMelodie = new Sound("../audio/main_melodie.wav", 0.1);
let youWinSound = new Sound("../audio/you_win.wav");
let gameOverSound = new Sound("../audio/game_over.wav");

/**
 * Initializes sound settings based on user preferences stored in localStorage.
 * Called when the page loads.
 */
function init() {
  let storedSoundStatus = JSON.parse(localStorage.getItem("soundOn"));
  globalMute = !storedSoundStatus;
  let soundIcon = document.getElementById("muteBtn");
  soundIcon.src = globalMute ? "./img/volume_off.png" : "./img/volume_on.png";
}

/**
 * Starts the game by initializing level elements, setting up the canvas and world,
 * hiding the start overlay, and checking sound settings.
 */
function startGame() {
  initLevelElements();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  document.getElementById("gameStartOverlay").classList.add("dNone");
  checkSoundOnOff();
}

/**
 * Initializes level elements by creating empty coin and bottle arrays,
 * adding coins and bottles, and generating the level.
 */
function initLevelElements() {
  coins = [];
  bottles = [];
  addCoins();
  addBottles();
  level1 = createLevel(coins, bottles);
}

/**
 * Checks the sound status from localStorage and plays the main melody if enabled.
 */
function checkSoundOnOff() {
  let soundStatus = getSoundStatusLocalStorage();
  if (soundStatus) {
    mainMelodie.play(true);
  }
}

/**
 * Resets the game by stopping world intervals, reinitializing level elements,
 * creating a new world, checking sound settings, and hiding overlays.
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
 * Returns to the main menu by stopping all intervals, resetting level elements,
 * displaying the start overlay, and ensuring the main melody is playing.
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
 * Creates a new level with enemies, clouds, background objects, coins, and bottles.
 *
 * @param {Array} coins - Array of coin objects.
 * @param {Array} bottles - Array of bottle objects.
 * @returns {Level} A new Level instance.
 */
function createLevel(coins, bottles) {
  const enemies = createEnemies();
  const clouds = createClouds();
  const backgroundObjects = createBackgroundObjects();
  return new Level(enemies, clouds, backgroundObjects, coins, bottles);
}

/**
 * Returns the background objects array.
 * @returns {Array} The array of background objects.
 */
function createBackgroundObjects() {
  return backgroundObjects;
}

/**
 * Creates and returns an array of enemy objects, including various chickens and the end boss.
 * @returns {Array} An array containing enemy instances.
 */
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
    new Chicken(),
    new ChickenSmall(),
    new Chicken(),
    new ChickenSmall(),
    new Endboss(),
  ];
}

/**
 * Creates and returns an array of cloud objects with specific image sources and positions.
 * @returns {Array} An array containing cloud instances.
 */
function createClouds() {
  return [
    new Cloud("../img/5_background/layers/4_clouds/1.png", 0),
    new Cloud("../img/5_background/layers/4_clouds/2.png", 500),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 1000),
    new Cloud("../img/5_background/layers/4_clouds/2.png", 1500),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 2000),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 2500),
    new Cloud("../img/5_background/layers/4_clouds/1.png", 3000),
  ];
}

/**
 * Plays the main melody in a loop.
 */
function playMelodie() {
  mainMelodie.play(true);
}

/**
 * Stops the main melody and plays the game over sound.
 */
function playGameOverSound() {
  mainMelodie.stop();
  stopAllSoundsExcept([gameOverSound]);
  gameOverSound.play();
}

/**
 * Toggles the mute status for all game sounds, updates the mute button icon,
 * saves the new status to localStorage, and applies the mute state to all sound objects.
 */
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

/**
 * Retrieves the current sound status from localStorage.
 * If no status is found, defaults to true and saves that value.
 * @returns {boolean} The stored sound status.
 */
function getSoundStatusLocalStorage() {
  let sound = JSON.parse(localStorage.getItem("soundOn"));
  if (sound != null) {
    return sound;
  } else {
    saveToLocalStorage(true);
  }
}

/**
 * Saves the provided sound status to localStorage.
 * @param {boolean} bool - The sound status to save.
 */
function saveToLocalStorage(bool) {
  localStorage.setItem("soundOn", JSON.stringify(bool));
}

/**
 * Closes an overlay by adding the 'dNone' class to the element with the specified ID.
 * @param {string} id - The ID of the overlay element to close.
 */
function closeOverlay(id) {
  document.getElementById(id).classList.add("dNone");
}

/**
 * Opens an overlay by removing the 'dNone' class from the element with the specified ID.
 * @param {string} id - The ID of the overlay element to open.
 */
function openOverlay(id) {
  document.getElementById(id).classList.remove("dNone");
}

/**
 * Clears all active intervals
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) window.clearInterval(i);
}

/**
 * Sets the sound status to mute by saving false to localStorage.
 */
function setSoundStatusMute() {
  saveToLocalStorage(false);
}

/**
 * Stops all sounds except for those provided in the exceptions array.
 * Iterates over the global 'allSounds' array and stops each sound that is not included
 * in the 'exceptions' array by calling its stop() method.
 * @param {Array} [exceptions=[]] - An array of sound objects that should not be stopped.
 */
function stopAllSoundsExcept(exceptions = []) {
  allSounds.forEach(sound => {
    if (!exceptions.includes(sound)) {
      sound.stop();
    }
  });
}
