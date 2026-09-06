"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  phase: number;
  speed: number;
  hue: "gold" | "rose";
  twinkle: number;
};

const GOLD = "#e6c978";
const GOLD_DIM = "#c9a227";
const ROSE = "#d9737e";

export default function Particles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let particles: Particle[] = [];
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    const isMobile = window.innerWidth < 640;

    const spawn = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const count = reduced ? 0 : isMobile ? 22 : 44;
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.8 + Math.random() * 1.8,
        vx: (Math.random() - 0.5) * 0.18,
        vy: -(0.08 + Math.random() * 0.22),
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random(),
        hue: Math.random() < 0.82 ? "gold" : "rose",
        twinkle: 0.5 + Math.random() * 0.5,
      }));
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      spawn();
    };

    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 16.67, 3);
      last = now;
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);
      for (const p of particles) {
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.phase += 0.008 * p.speed * dt;
        if (p.y < -10 || p.x < -10 || p.x > w + 10) {
          p.x = Math.random() * w;
          p.y = h + 10;
        }
        if (p.y > h + 10) p.y = h + 10;
        const alpha =
          (0.25 + 0.55 * (0.5 + 0.5 * Math.sin(p.phase))) * p.twinkle;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle =
          p.hue === "rose" ? ROSE : p.phase % 2 > 1 ? GOLD_DIM : GOLD;
        ctx.globalAlpha = alpha;
        ctx.fill();
        ctx.globalAlpha = 0.12;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 3.2, 0, Math.PI * 2);
        ctx.fillStyle = p.hue === "rose" ? ROSE : GOLD;
        ctx.fill();
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    raf = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0"
      aria-hidden
    />
  );
}