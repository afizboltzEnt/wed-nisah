import { AUDIO_SRC } from "./constants";

let audioInstance: HTMLAudioElement | null = null;
let listeners = new Set<() => void>();

function getAudio(): HTMLAudioElement {
  if (!audioInstance) {
    audioInstance = new Audio(AUDIO_SRC);
    audioInstance.loop = true;
    audioInstance.preload = "auto";
    audioInstance.volume = 0.55;
    audioInstance.addEventListener("ended", () => emit());
    audioInstance.addEventListener("pause", () => emit());
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

export async function playMusic(): Promise<void> {
  const audio = getAudio();
  try {
    await audio.play();
    emit();
  } catch {
    // Browsers may still block; retrying on next user gesture happens naturally.
  }
}

export function pauseMusic(): void {
  getAudio().pause();
  emit();
}

export function toggleMusic(): void {
  if (isMusicPlaying()) {
    pauseMusic();
  } else {
    void playMusic();
  }
}