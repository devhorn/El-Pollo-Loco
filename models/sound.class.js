class Sound {
  constructor(src) {
    this.audio = new Audio(src);
    this.audio.preload = "auto";
    this.audio.volume = 0.5;
  }

  play(loop = false) {
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
