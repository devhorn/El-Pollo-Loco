/**
 * Checks if the device is an iPad Air.
 * iPad Air: Portrait 820x1180 and Landscape 1180x820.
 */
function isIpadAir() {
  return (
    (window.innerWidth === 820 && window.innerHeight === 1180) ||
    (window.innerWidth === 1180 && window.innerHeight === 820)
  );
}

/**
 * Checks if the device is an iPad Pro.
 * iPad Pro: Portrait 1024x1366 and Landscape 1366x1024.
 */
function isIpadPro() {
  return (
    (window.innerWidth === 1024 && window.innerHeight === 1366) ||
    (window.innerWidth === 1366 && window.innerHeight === 1024)
  );
}

/**
 * Checks if the iPad Air is in landscape mode (resolution 1180x820).
 */
function isIpadAirLandscape() {
  return window.innerWidth === 1180 && window.innerHeight === 820;
}

/**
 * Checks if the iPad Pro is in landscape mode (resolution 1366x1024).
 */
function isIpadProLandscape() {
  return window.innerWidth === 1366 && window.innerHeight === 1024;
}

/**
 * Checks if the page is running on a mobile device.
 * This function not only performs the standard User-Agent checks,
 * but also verifies if the device is an iPad (Air or Pro).
 */
function isMobileDevice() {
  const ua = navigator.userAgent;
  const isMobileUA = /Android|webOS|iPhone|iPod|BlackBerry|IEMobile|Opera Mini/i.test(ua);
  // iPads are considered mobile devices even if the User-Agent sometimes appears desktop-like.
  const isiPad = /iPad/i.test(ua) || isIpadAir() || isIpadPro();
  return isMobileUA || isiPad;
}

/**
 * Checks if the device is in landscape mode.
 * For iPad Air and iPad Pro, it checks based on the resolution.
 */
function isLandscape() {
  if (isIpadAir() || isIpadPro()) {
    return isIpadAirLandscape() || isIpadProLandscape();
  }
  return window.innerWidth > window.innerHeight;
}

/**
 * Creates and displays an overlay if the orientation is not correct.
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
 * Hides the overlay.
 */
function hideOverlay() {
  const overlay = document.getElementById("orientationOverlay");
  if (overlay) {
    overlay.style.display = "none";
  }
}

/**
 * On page load:
 * If the page is running on a mobile device, the mobile keys are displayed
 * only if the device is in landscape mode (or has the correct resolution for iPad Air/Pro).
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
 * On window resize (e.g., rotation), the mobile keys and overlay are updated accordingly.
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
