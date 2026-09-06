// Generates a gentle music-box rendition of Pachelbel's Canon in D
// (public domain) as a self-contained WAV file: public/audio/background.wav
//
// Run: node scripts/generate-audio.mjs
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..");
const SAMPLE_RATE = 22050;
const DURATION = 136; // seconds
const N = SAMPLE_RATE * DURATION;

// Canon in D chord progression (D major), 8 bars, 2 beats per chord at ~76bpm
// Each bar is 8 eighth-notes.
const NOTES = {
  D4: 293.66, E4: 329.63, "F#4": 369.99, G4: 392.0, A4: 440.0,
  B4: 493.88, "C#5": 554.37, D5: 587.33, E5: 659.25, "F#5": 739.99,
  G5: 783.99, A5: 880.0, B5: 987.77, "C#6": 1108.73, D6: 1174.66,
  "F#3": 185.0, G3: 196.0, A3: 220.0, B3: 246.94, "C#4": 277.18, D3: 146.83,
};

const CHORDS = [
  ["D3", "F#3", "A3", "D4"],
  ["A3", "C#4", "E4", "A4"],
  ["B3", "D4", "F#4", "B4"],
  ["F#3", "A3", "C#4", "F#4"],
  ["G3", "B3", "D4", "G4"],
  ["D3", "F#3", "A3", "D4"],
  ["G3", "B3", "D4", "G4"],
  ["A3", "C#4", "E4", "A4"],
];

const MELODY = [
  ["F#5", "E5", "D5", "C#5", "B4", "A4", "B4", "C#5"], // bar 1
  ["D5", "C#5", "B4", "A4", "G4", "F#4", "G4", "A4"], // bar 2
  ["B4", "A4", "G4", "F#4", "E4", "D4", "E4", "F#4"], // bar 3
  ["F#4", "E4", "D4", "C#4", "B4", "C#4", "D4", "D4"], // bar 4
  ["G4", "B4", "D5", "B4", "G5", "F#5", "E5", "F#5"], // bar 5
  ["D5", "C#5", "B4", "A4", "B4", "A4", "G4", "F#4"], // bar 6
  ["G4", "B4", "D5", "G5", "F#5", "E5", "D5", "C#5"], // bar 7
  ["D5", "C#5", "D5", "E5", "F#5", "E5", "D5", "C#5"], // bar 8
];

const BAR_LEN = (SAMPLE_RATE * 60) / 76; // seconds per bar * samplerate
const NOTE_LEN = BAR_LEN / 8;
const LOOP_LEN = BAR_LEN * CHORDS.length;

// music-box / celesta timbre: sine + soft upper partials
function tone(freq, start, dur) {
  start = Math.round(start);
  dur = Math.round(dur);
  if (start < 0 || start >= N) return;
  const end = Math.min(N, start + dur);
  for (let i = start; i < end; i++) {
    const t = (i - start) / SAMPLE_RATE;
    const env = Math.exp(-1.9 * t) * (1 - Math.exp(-t * 90));
    let s =
      Math.sin(2 * Math.PI * freq * t) * 0.62 +
      Math.sin(2 * Math.PI * freq * 2 * t) * 0.12 +
      Math.sin(2 * Math.PI * freq * 3 * t) * 0.05 +
      Math.sin(2 * Math.PI * freq * 4.007 * t) * 0.03;
    data[i] += s * env * 0.22;
  }
}

const data = new Float64Array(N);

// Background chords (softer), 4-note arpeggio per bar with a wash
for (let bar = 0; bar < 17; bar++) {
  const start = bar * BAR_LEN;
  const chord = CHORDS[bar % 8];
  chord.forEach((n, idx) => {
    tone(NOTES[n], start + idx * (NOTE_LEN * 2), NOTE_LEN * 5.5);
    tone(NOTES[n], start + NOTE_LEN * 4 + idx * (NOTE_LEN * 2), NOTE_LEN * 5.5);
    tone(NOTES[n] / 2, start, BAR_LEN * 2.5); // root octave wash
  });
}

// Melody notes (brighter, a bit louder)
for (let bar = 0; bar < 17; bar++) {
  const start = bar * BAR_LEN;
  const mel = MELODY[bar % 8];
  mel.forEach((n, idx) => {
    tone(NOTES[n], start + idx * NOTE_LEN, NOTE_LEN * 1.6);
  });
}

// Simple feedback delay for dreamy space
function applyDelay() {
  const delayLen = Math.round(SAMPLE_RATE * 0.38);
  const out = new Float64Array(N);
  const feedback = 0.32;
  for (let i = 0; i < N; i++) {
    let v = data[i];
    if (i - delayLen >= 0) v += out[i - delayLen] * feedback;
    out[i] = v;
  }
  return out;
}

const wet = applyDelay();
for (let i = 0; i < N; i++) data[i] = data[i] * 0.82 + wet[i] * 0.18;

// Normalize
let peak = 0;
for (let i = 0; i < N; i++) peak = Math.max(peak, Math.abs(data[i]));
const gain = peak > 0 ? 0.86 / peak : 1;

// Write WAV (16-bit mono)
const pcm = Buffer.alloc(N * 2);
for (let i = 0; i < N; i++) {
  const s = Math.max(-1, Math.min(1, data[i] * gain));
  pcm.writeInt16LE(Math.round(s * 32767), i * 2);
}

const header = Buffer.alloc(44);
header.write("RIFF", 0);
header.writeUInt32LE(36 + pcm.length, 4);
header.write("WAVE", 8);
header.write("fmt ", 12);
header.writeUInt32LE(16, 16);
header.writeUInt16LE(1, 20); // PCM
header.writeUInt16LE(1, 22); // mono
header.writeUInt32LE(SAMPLE_RATE, 24);
header.writeUInt32LE(SAMPLE_RATE * 2, 28); // byte rate
header.writeUInt16LE(2, 32); // block align
header.writeUInt16LE(16, 34); // bits
header.write("data", 36);
header.writeUInt32LE(pcm.length, 40);

const outDir = join(rootDir, "public", "audio");
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "background.wav");
writeFileSync(outPath, Buffer.concat([header, pcm]));

console.log(`Wrote ${outPath} (${(pcm.length / 1048576).toFixed(2)} MB, ${DURATION}s)`);

// Keep constants in sync
const AUDIO_SRC = "/audio/background.wav";
writeFileSync(
  join(rootDir, "lib", "audio-src.tmp"),
  AUDIO_SRC,
  "utf8"
);