import { AUDIO_SRC } from "./constants";

let audioInstance: HTMLAudioElement | null = null;
const listeners = new Set<() => void>();

function getAudio(): HTMLAudioElement {
  if (!audioInstance) {
    audioInstance = new Audio(AUDIO_SRC);
    audioInstance.loop = true;
    audioInstance.preload = "auto";
    audioInstance.volume = 0.55;
    // Media events are the source of truth, so every subscriber stays in sync
    // no matter who started playback (gate, button, or the browser itself).
    for (const event of ["play", "pause", "ended", "volumechange"]) {
      audioInstance.addEventListener(event, emit);
    }
  }
  return audioInstance;
}

export function getAudioElement() {
  return getAudio();
}

function emit() {
  listeners.forEach((fn) => fn());
}

export function musicSubscribe(fn: () => void): () => void {
  listeners.add(fn);
  return () => listeners.delete(fn);
}

export function isMusicPlaying(): boolean {
  return !!audioInstance && !audioInstance.paused && !audioInstance.ended;
}

export function isMusicMuted(): boolean {
  return !!audioInstance && audioInstance.muted;
}

export async function playMusic(): Promise<void> {
  const audio = getAudio();
  try {
    await audio.play();
  } catch {
    // Browsers may still block; retrying on next user gesture happens naturally.
  }
}

export function pauseMusic(): void {
  getAudio().pause();
}

export function toggleMusic(): void {
  if (isMusicPlaying()) {
    pauseMusic();
  } else {
    void playMusic();
  }
}