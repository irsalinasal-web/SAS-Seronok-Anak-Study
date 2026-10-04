/**
 * Procedural Web Audio API Sound and Background Music Engine.
 * 100% offline, zero external audio assets required.
 * Complies with: "Gunakan muzik kanak-kanak yang ceria, lembut dan menenangkan. Tiada audio suara."
 */

class AudioService {
  private ctx: AudioContext | null = null;
  private musicGainNode: GainNode | null = null;
  private sfxGainNode: GainNode | null = null;
  private isMusicPlaying = false;
  private musicIntervalId: number | null = null;
  private musicEnabled = true;
  private sfxEnabled = true;
  private currentStep = 0;

  constructor() {
    // Read user preference from localStorage if available
    try {
      const savedMusic = localStorage.getItem('sas_music_enabled');
      if (savedMusic !== null) this.musicEnabled = savedMusic === 'true';
      const savedSfx = localStorage.getItem('sas_sfx_enabled');
      if (savedSfx !== null) this.sfxEnabled = savedSfx === 'true';
    } catch {
      // Fallback
    }
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      // Master BGM gain
      this.musicGainNode = this.ctx.createGain();
      this.musicGainNode.gain.setValueAtTime(this.musicEnabled ? 0.15 : 0, this.ctx.currentTime);
      this.musicGainNode.connect(this.ctx.destination);

      // Master SFX gain
      this.sfxGainNode = this.ctx.createGain();
      this.sfxGainNode.gain.setValueAtTime(this.sfxEnabled ? 0.35 : 0, this.ctx.currentTime);
      this.sfxGainNode.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMusicEnabled(enabled: boolean) {
    this.musicEnabled = enabled;
    try {
      localStorage.setItem('sas_music_enabled', String(enabled));
    } catch {
      // Ignore
    }
    if (this.musicGainNode && this.ctx) {
      this.musicGainNode.gain.setTargetAtTime(enabled ? 0.15 : 0, this.ctx.currentTime, 0.1);
    }
    if (enabled && !this.isMusicPlaying) {
      this.startMusic();
    } else if (!enabled && this.isMusicPlaying) {
      this.stopMusic();
    }
  }

  public setSfxEnabled(enabled: boolean) {
    this.sfxEnabled = enabled;
    try {
      localStorage.setItem('sas_sfx_enabled', String(enabled));
    } catch {
      // Ignore
    }
    if (this.sfxGainNode && this.ctx) {
      this.sfxGainNode.gain.setTargetAtTime(enabled ? 0.35 : 0, this.ctx.currentTime, 0.05);
    }
  }

  public isMusicOn(): boolean {
    return this.musicEnabled;
  }

  public isSfxOn(): boolean {
    return this.sfxEnabled;
  }

  /**
   * Gentle, cheerful, lullaby/music box style procedural melody.
   * Playful pentatonic / major progression (C major / G major / F major / C major).
   */
  public startMusic() {
    if (this.isMusicPlaying || !this.musicEnabled) return;
    this.initContext();
    this.isMusicPlaying = true;

    // Cheerful pentatonic melody notes: C4, D4, E4, G4, A4, C5, D5, E5
    // 16-step musical progression pattern
    const melody: { note: number; dur: number; bass: number }[] = [
      { note: 261.63, dur: 0.28, bass: 130.81 }, // C4 / C3
      { note: 329.63, dur: 0.22, bass: 130.81 }, // E4
      { note: 392.00, dur: 0.28, bass: 130.81 }, // G4
      { note: 523.25, dur: 0.35, bass: 130.81 }, // C5
      { note: 440.00, dur: 0.22, bass: 174.61 }, // A4 / F3
      { note: 392.00, dur: 0.22, bass: 174.61 }, // G4
      { note: 329.63, dur: 0.30, bass: 174.61 }, // E4
      { note: 349.23, dur: 0.25, bass: 174.61 }, // F4
      { note: 392.00, dur: 0.28, bass: 196.00 }, // G4 / G3
      { note: 440.00, dur: 0.22, bass: 196.00 }, // A4
      { note: 493.88, dur: 0.28, bass: 196.00 }, // B4
      { note: 587.33, dur: 0.35, bass: 196.00 }, // D5
      { note: 523.25, dur: 0.30, bass: 130.81 }, // C5 / C3
      { note: 392.00, dur: 0.25, bass: 130.81 }, // G4
      { note: 329.63, dur: 0.25, bass: 130.81 }, // E4
      { note: 261.63, dur: 0.45, bass: 130.81 }, // C4
    ];

    const stepDurationMs = 380; // ~95 BPM comfortable kid speed

    this.musicIntervalId = window.setInterval(() => {
      if (!this.musicEnabled || !this.ctx || !this.musicGainNode) return;
      const step = melody[this.currentStep % melody.length];
      this.currentStep++;

      const now = this.ctx.currentTime;

      // Melody note (soft vibraphone / marimba timbre)
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(step.note, now);

      noteGain.gain.setValueAtTime(0.001, now);
      noteGain.gain.exponentialRampToValueAtTime(0.3, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + step.dur);

      osc.connect(noteGain);
      noteGain.connect(this.musicGainNode);

      osc.start(now);
      osc.stop(now + step.dur);

      // Bass note on every 4 steps
      if (this.currentStep % 4 === 1) {
        const bassOsc = this.ctx.createOscillator();
        const bassGain = this.ctx.createGain();
        bassOsc.type = 'sine';
        bassOsc.frequency.setValueAtTime(step.bass, now);

        bassGain.gain.setValueAtTime(0.001, now);
        bassGain.gain.exponentialRampToValueAtTime(0.2, now + 0.05);
        bassGain.gain.exponentialRampToValueAtTime(0.001, now + 0.6);

        bassOsc.connect(bassGain);
        bassGain.connect(this.musicGainNode);

        bassOsc.start(now);
        bassOsc.stop(now + 0.65);
      }
    }, stepDurationMs);
  }

  public stopMusic() {
    this.isMusicPlaying = false;
    if (this.musicIntervalId !== null) {
      clearInterval(this.musicIntervalId);
      this.musicIntervalId = null;
    }
  }

  // SFX: Tahniah / Correct answer fanfare chime
  public playSuccess() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      const now = this.ctx!.currentTime + idx * 0.09;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.4, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

      osc.connect(gain);
      gain.connect(this.sfxGainNode!);

      osc.start(now);
      osc.stop(now + 0.4);
    });
  }

  // SFX: Cuba lagi (soft, non-punitive boing)
  public playError() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(320, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.28);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.3, now + 0.03);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // SFX: Bubble click / Tap
  public playPop() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.06);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.08);
  }

  // SFX: Puzzle / Drag Snap Effect
  public playSnap() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.08);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

    osc.connect(gain);
    gain.connect(this.sfxGainNode);

    osc.start(now);
    osc.stop(now + 0.13);
  }

  // SFX: Star / Reward sparkle
  public playStar() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const notes = [784, 987.77, 1174.66, 1567.98];
    notes.forEach((freq, idx) => {
      const now = this.ctx!.currentTime + idx * 0.07;
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.25, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.sfxGainNode!);

      osc.start(now);
      osc.stop(now + 0.32);
    });
  }

  // SFX: Crystal Ting Bell Sound when hidden object found (June's Journey style)
  public playTing() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    const gain2 = this.ctx.createGain();

    osc1.type = 'sine';
    osc1.frequency.setValueAtTime(1760, now); // A6
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.linearRampToValueAtTime(0.4, now + 0.008);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.65);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(3520, now); // A7
    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.linearRampToValueAtTime(0.2, now + 0.005);
    gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

    osc1.connect(gain1);
    gain1.connect(this.sfxGainNode);
    osc2.connect(gain2);
    gain2.connect(this.sfxGainNode);

    osc1.start(now);
    osc1.stop(now + 0.7);
    osc2.start(now);
    osc2.stop(now + 0.5);
  }

  // SFX: Celebration fanfare on level victory
  public playFanfare() {
    if (!this.sfxEnabled) return;
    this.initContext();
    if (!this.ctx || !this.sfxGainNode) return;

    const arpeggio = [
      { f: 523.25, d: 0.1 },
      { f: 659.25, d: 0.1 },
      { f: 783.99, d: 0.1 },
      { f: 1046.50, d: 0.25 },
      { f: 880.00, d: 0.12 },
      { f: 1046.50, d: 0.5 },
    ];

    let t = this.ctx.currentTime;
    arpeggio.forEach((note) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(note.f, t);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.35, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + note.d);

      osc.connect(gain);
      gain.connect(this.sfxGainNode!);

      osc.start(t);
      osc.stop(t + note.d + 0.02);
      t += note.d + 0.03;
    });
  }

  // Playful cartoon-style animal sound effects like YouTube kids animations (Didi & Friends / Cocomelon style)
  public playAnimalSound(animalId: string) {
    if (!this.sfxEnabled) return;
    this.initContext();

    // 1. Play cute cheerful cartoon xylophone chime
    if (this.ctx && this.sfxGainNode) {
      const now = this.ctx.currentTime;
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6 happy cartoon bells
      notes.forEach((freq, idx) => {
        const t = now + idx * 0.07;
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, t);
        gain.gain.setValueAtTime(0.001, t);
        gain.gain.linearRampToValueAtTime(0.2, t + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.001, t + 0.22);
        osc.connect(gain);
        gain.connect(this.sfxGainNode!);
        osc.start(t);
        osc.stop(t + 0.24);
      });
    }

    // 2. Play clear cartoon character animal voice onomatopoeia (just like YouTube cartoon songs for toddlers)
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();

        const cartoonVoices: Record<string, string> = {
          kucing: 'Meow! Meow! Meow!',
          lembu: 'Mooo! Mooo!',
          itik: 'Kwek! Kwek! Kwek!',
          ayam: 'Kok! Kok! Kok! Kok-kok-koo!',
          singa: 'Roaaar! Roaaar!',
          harimau: 'Roaaar! Roaaar!',
          gajah: 'Pawooo! Pawooo!',
          burung: 'Ciap! Ciap! Ciap!',
          katak: 'Ribbit! Ribbit! Ong! Ong!',
          kuda: 'Hiii! Neigh! Neigh!',
          monyet: 'Uu-uu! Aa-aa! Uu-uu! Aa-aa!',
          arnab: 'Cicit! Cicit!',
          ikan: 'Glup! Glup! Glup!',
          kura_kura: 'Ssshh! Ssshh!',
        };

        const phrase = cartoonVoices[animalId.toLowerCase()] || 'Meow! Meow!';
        const utterance = new SpeechSynthesisUtterance(phrase);

        // High, cheerful, child-like cartoon pitch so children easily understand
        utterance.pitch = 1.55;
        utterance.rate = 1.05;
        utterance.volume = 1.0;

        // Try to match Malay/Indonesian or child voice
        const voices = window.speechSynthesis.getVoices();
        const preferred = voices.find(v =>
          v.lang.startsWith('ms') ||
          v.lang.startsWith('id') ||
          v.name.toLowerCase().includes('child') ||
          v.name.toLowerCase().includes('kid') ||
          v.name.toLowerCase().includes('female')
        );
        if (preferred) {
          utterance.voice = preferred;
        }

        window.speechSynthesis.speak(utterance);
      } catch (err) {
        console.warn('Speech synthesis error:', err);
      }
    }
  }
}

export const audio = new AudioService();
