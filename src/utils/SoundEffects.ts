
// Sound effects manager for the memory game

class SoundEffects {
  private static sounds: { [key: string]: HTMLAudioElement } = {};
  private static muted: boolean = false;

  // Initialize all sounds
  static init() {
    this.sounds = {
      start: new Audio('/sounds/game-start.mp3'),
      correct: new Audio('/sounds/correct-answer.mp3'),
      wrong: new Audio('/sounds/wrong-answer.mp3'),
      tick: new Audio('/sounds/tick.mp3'),
      memorize: new Audio('/sounds/memorize.mp3'),
    };

    // Load sounds
    Object.values(this.sounds).forEach(sound => {
      sound.load();
    });
  }

  // Play a sound if not muted
  static play(soundName: 'start' | 'correct' | 'wrong' | 'tick' | 'memorize') {
    if (this.muted || !this.sounds[soundName]) return;
    
    // Stop the sound if it's already playing
    this.sounds[soundName].pause();
    this.sounds[soundName].currentTime = 0;
    
    // Play the sound
    this.sounds[soundName].play().catch(err => {
      console.warn(`Failed to play sound: ${soundName}`, err);
    });
  }

  // Toggle mute state
  static toggleMute() {
    this.muted = !this.muted;
    return this.muted;
  }

  // Get current mute state
  static isMuted() {
    return this.muted;
  }
}

export default SoundEffects;
