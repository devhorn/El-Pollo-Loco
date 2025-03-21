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
