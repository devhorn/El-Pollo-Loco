class Endboss extends MoveableObject {
  imagesAlert = [
    "../img/4_enemie_boss_chicken/2_alert/G10.png",
    "../img/4_enemie_boss_chicken/2_alert/G11.png",
    "../img/4_enemie_boss_chicken/2_alert/G12.png",
  ];
  imagesWalking = [
    "../img/4_enemie_boss_chicken/1_walk/G1.png",
    "../img/4_enemie_boss_chicken/1_walk/G2.png",
    "../img/4_enemie_boss_chicken/1_walk/G3.png",
    "../img/4_enemie_boss_chicken/1_walk/G4.png",
  ];
  imagesHurt = [
    "../img/4_enemie_boss_chicken/4_hurt/G21.png",
    "../img/4_enemie_boss_chicken/4_hurt/G22.png",
    "../img/4_enemie_boss_chicken/4_hurt/G23.png",
  ];
  imagesDead = [
    "../img/4_enemie_boss_chicken/5_dead/G24.png",
    "../img/4_enemie_boss_chicken/5_dead/G25.png",
    "../img/4_enemie_boss_chicken/5_dead/G26.png",
  ];
  imagesAttack = [
    "../img/4_enemie_boss_chicken/3_attack/G13.png",
    "../img/4_enemie_boss_chicken/3_attack/G14.png",
    "../img/4_enemie_boss_chicken/3_attack/G15.png",
    "../img/4_enemie_boss_chicken/3_attack/G16.png",
    "../img/4_enemie_boss_chicken/3_attack/G17.png",
    "../img/4_enemie_boss_chicken/3_attack/G18.png",
    "../img/4_enemie_boss_chicken/3_attack/G19.png",
    "../img/4_enemie_boss_chicken/3_attack/G20.png",
  ];

  x = 2600;
  y = 50;
  width = 300;
  height = 400;
  triggerActivated = false;
  movingLeft = true;
  startingX = 2600;
  minX = 1600;
  hits = 0;
  distanceWalked = 0;

  // Neue Variablen für den Zustand und für Intervalle
  currentState = "alert"; // mögliche Zustände: 'alert', 'moving', 'attacking', 'hurt', 'dead'
  movementInterval = null;
  animationInterval = null;
  hurtInterval = null;
  attackInterval = null;

  constructor() {
    super().loadImage(this.imagesAlert[0]);
    this.loadImages(this.imagesAlert);
    this.loadImages(this.imagesWalking);
    this.loadImages(this.imagesHurt);
    this.loadImages(this.imagesDead);
    this.loadImages(this.imagesAttack);
    this.speed = 1;
    this.endbossHitSound = new Sound("../audio/hit_endboss.wav");
    this.endbossDieSound = new Sound("../audio/die_endboss.wav", 0.2);
    this.animateAlert();
  }

  animateAlert() {
    // Während der Alert-Phase
    this.alertInterval = setInterval(() => {
      if (!this.triggerActivated) {
        this.playAnimation(this.imagesAlert);
      }
    }, 300);
  }

  update(characterX) {
    if (!this.triggerActivated && characterX >= 2100) {
      this.triggerActivated = true;
      clearInterval(this.alertInterval);
      this.startMovement();
    }
  }

  startMovement() {
    // Verhindere mehrfaches Starten, wenn bereits "moving"
    if (this.currentState === "moving") return;
    this.currentState = "moving";
    this.distanceWalked = 0;
    // Starte Bewegungs- und Animationsintervalle
    this.animationInterval = setInterval(() => {
      this.playAnimation(this.imagesWalking);
    }, 150);
    this.movementInterval = setInterval(() => {
      if (this.x > this.minX) {
        this.moveLeft();
        this.distanceWalked += this.speed;
        // Nach 30 Pixeln stoppe die Bewegung und starte den Angriff
        if (this.distanceWalked >= 30) {
          this.clearMovementIntervals();
          this.attack();
        }
      } else {
        this.clearMovementIntervals();
      }
    }, 1000 / 60);
  }

  attack() {
    this.currentState = "attacking";
    this.attackInterval = setInterval(() => {
      this.playAnimation(this.imagesAttack);
    }, 150);
    setTimeout(() => {
      clearInterval(this.attackInterval);
      // Nach dem Angriff wechsle zurück in den Bewegungszustand
      this.startMovement();
    }, 800);
  }

  hitByBottle() {
    // Ignoriere Treffer, wenn schon in einem unpassenden Zustand
    if (this.isDefeated || this.currentState === "hurt" || this.currentState === "dead") return;
    this.currentState = "hurt";
    if (this.hits < 3) {
      this.endbossHitSound.play();
      this.hits++;
      this.clearAllIntervals();
      this.hurtInterval = setInterval(() => {
        this.playAnimation(this.imagesHurt);
      }, 150);
      setTimeout(() => {
        clearInterval(this.hurtInterval);
        // Wechsle nur dann zurück in den Bewegungsmodus, wenn er nicht besiegt ist
        if (!this.isDefeated) {
          this.startMovement();
        }
      }, 1000);
    } else {
      this.dieBoss();
    }
  }

  dieBoss() {
    this.currentState = "dead";
    this.endbossDieSound.play();
    this.clearAllIntervals();
    let deadInterval = setInterval(() => {
      this.playAnimation(this.imagesDead);
    }, 150);
    setTimeout(() => {
      clearInterval(deadInterval);
      document.getElementById("gameWonOverlay").classList.remove("dNone");
    }, 1000);
    setTimeout(() => {
      this.gameEndTasks();
    }, 1000);
  }

  clearMovementIntervals() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    this.movementInterval = null;
    this.animationInterval = null;
  }

  clearAllIntervals() {
    clearInterval(this.movementInterval);
    clearInterval(this.animationInterval);
    clearInterval(this.hurtInterval);
    clearInterval(this.attackInterval);
    this.movementInterval = null;
    this.animationInterval = null;
    this.hurtInterval = null;
    this.attackInterval = null;
  }

  gameEndTasks() {
    mainMelodie.stop();
    youWinSound.play();
    clearAllIntervals();
  }
}
