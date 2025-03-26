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
   * Plays the audio.
   * If the global mute is enabled, the function exits without playing.
   * Otherwise, it sets the loop property of the audio element to the provided value.
   * If the audio is currently paused, it starts playing the audio.
   * @param {boolean} [loop=false] - Determines whether the audio should loop.
   */
  play(loop = false) {
    if (globalMute) return;
    this.audio.loop = loop;
    if (this.audio.paused) {
      this.audio.play();
    }
  }

  /**
   * Stops the audio playback.
   * This function pauses the audio and resets the playback time to the beginning.
   */
  stop() {
    this.audio.pause();
    this.audio.currentTime = 0;
  }
}
