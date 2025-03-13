class Sound {
  constructor(src, volume = 0.5) {
    this.audio = new Audio(src);
    this.audio.preload = "auto";
    this.audio.volume = volume;
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
