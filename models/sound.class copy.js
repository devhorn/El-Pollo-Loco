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

  /**
   * This function is to start playing the sound
   * @param {boolean} loop - if true sound is playing non stop, else sound will be played only one time
   */
  play(loop = false) {
    this.audio.loop = loop;
    if (this.audio.paused) {
      this.audio.play();
    }
  }

  /**
   * This function is top stop the sound
   */
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
