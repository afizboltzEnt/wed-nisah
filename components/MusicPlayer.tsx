"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  isMusicPlaying,
  musicSubscribe,
  toggleMusic,
  getAudioElement,
} from "@/lib/audio";

export default function MusicPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    const unsub = musicSubscribe(() => {
      const audio = getAudioElement();
      setPlaying(isMusicPlaying());
      setMuted(audio.muted);
    });
    return unsub;
  }, []);

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col items-end gap-2">
      <motion.button
        type="button"
        onClick={toggleMusic}
        aria-label={playing ? "Pause music" : "Play music"}
        className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-burgundy text-gold-soft shadow-card ring-2 ring-gold/50 transition hover:ring-gold"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
      >
        <span
          className={`absolute inset-2 rounded-full border border-gold-soft/40 transition ${
            playing ? "animate-[spin_6s_linear_infinite]" : ""
          }`}
        />
        <span className="absolute inset-3.5 rounded-full border border-gold-soft/30" />
        <svg
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="relative"
        >
          {playing ? (
            <>
              <rect x="6" y="4" width="3" height="16" rx="1.2" />
              <rect x="15" y="4" width="3" height="16" rx="1.2" />
            </>
          ) : (
            <path d="M8 5.14v13.72a1 1 0 0 0 1.5.86l11-6.86a1 1 0 0 0 0-1.72l-11-6.86a1 1 0 0 0-1.5.86Z" />
          )}
        </svg>
      </motion.button>
      <button
        type="button"
        onClick={() => {
          const audio = getAudioElement();
          audio.muted = !audio.muted;
          setMuted(audio.muted);
        }}
        aria-label={muted ? "Unmute" : "Mute"}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-paper/90 text-sage shadow ring-1 ring-gold/40 transition hover:text-burgundy"
      >
        {muted ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3Zm13.6 3 3.7-3.7-1.4-1.4-3.7 3.7-3.7-3.7-1.4 1.4L13.8 12l-3.7 3.7 1.4 1.4 3.7-3.7 3.7 3.7 1.4-1.4L16.6 12Z" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
            <path d="M3 9v6h4l5 5V4L7 9H3Zm13.5 3c0-1.77-1-3.29-2.5-4.03v8.05c1.5-.71 2.5-2.24 2.5-4.02ZM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77Z" />
          </svg>
        )}
      </button>
    </div>
  );
}