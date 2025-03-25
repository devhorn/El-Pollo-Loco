/**
 * Listen for keyboard "keydown" events.
 * When a key is pressed, update the corresponding property on the 'keyboard' object to true.
 */
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

/**
 * Listen for keyboard "keyup" events.
 * When a key is released, update the corresponding property on the 'keyboard' object to false.
 */
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

/**
 * Add touch event listeners for the on-screen left button.
 * When the touch starts, prevent the default behavior and set keyboard.LEFT to true.
 * When the touch ends, prevent the default behavior and set keyboard.LEFT to false.
 */
document.getElementById("btnLeft").addEventListener("touchstart", e => {
  e.preventDefault();
  keyboard.LEFT = true;
});
document.getElementById("btnLeft").addEventListener("touchend", e => {
  e.preventDefault();
  keyboard.LEFT = false;
});

/**
 * Add touch event listeners for the on-screen right button.
 * When the touch starts, prevent the default behavior and set keyboard.RIGHT to true.
 * When the touch ends, prevent the default behavior and set keyboard.RIGHT to false.
 */
document.getElementById("btnRight").addEventListener("touchstart", e => {
  e.preventDefault();
  keyboard.RIGHT = true;
});
document.getElementById("btnRight").addEventListener("touchend", e => {
  e.preventDefault();
  keyboard.RIGHT = false;
});

/**
 * Add touch event listeners for the on-screen jump button.
 * When the touch starts, prevent the default behavior and set keyboard.SPACE to true (for jump).
 * When the touch ends, prevent the default behavior and set keyboard.SPACE to false.
 */
document.getElementById("btnJump").addEventListener("touchstart", e => {
  e.preventDefault();
  keyboard.SPACE = true;
});
document.getElementById("btnJump").addEventListener("touchend", e => {
  e.preventDefault();
  keyboard.SPACE = false;
});

/**
 * Add touch event listeners for the on-screen throw button.
 * When the touch starts, prevent the default behavior and set keyboard.D to true (for throw).
 * When the touch ends, prevent the default behavior and set keyboard.D to false.
 */
document.getElementById("btnThrow").addEventListener("touchstart", e => {
  e.preventDefault();
  keyboard.D = true;
});
document.getElementById("btnThrow").addEventListener("touchend", e => {
  e.preventDefault();
  keyboard.D = false;
});
