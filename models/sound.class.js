let allSounds = [];
let globalMute = false;

class Sound {
  constructor(src, volume = 0.5) {
    this.audio = new Audio(src);
    this.audio.preload = "auto";
    this.audio.volume = volume;
    this.originalVolume = volume;
    this.audio.muted = globalMute;
    allSounds.push(this);
  }

  play(loop = false) {
    if (globalMute) return; // Kein Sound abspielen, wenn globalMute aktiv ist
    this.audio.loop = loop;
    if (this.audio.paused) {
      this.audio.play();
    }
  }

  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
