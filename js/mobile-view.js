/**
 * Checks if the page is running on a mobile device
 * @returns {boolean} returns true if on of this devices is detected
 */
function isMobileDevice() {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
}

/**
 * Checks if the page is in landscape mode
 * @returns {boolean} returns true if page is in landscape mode
 */
function isLandscape() {
  return window.innerWidth > window.innerHeight;
}

/**
 * Creates the overlay which is diplayed if page is running on mobile and not in landscape mode
 */
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

/**
 * This function hides the overlay
 */
function hideOverlay() {
  const overlay = document.getElementById("orientationOverlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

/**
 * This eventlistener checks if the page is running on mobile device and if the page is in landscape mode.
 * If its in mobile the mobile keys will be shown. If its not in landscape mode the overlay for turning the device will be shown
 */
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

/**
 * This eventlistener checks if the page is running on mobile device and if the page is in landscape mode.
 * This function removes the overlay when the user is switching to landscape mode
 */
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

/**
 * This eventlistener checks if the page is running on mobile device and if the page is in landscape mode.
 * This function removes the overlay when the user is switching to landscape mode
 */
window.addEventListener("resize", function () {
  if (isMobileDevice()) {
    if (isLandscape()) {
      hideOverlay();
    } else {
      showOverlay();
    }
  }
});
