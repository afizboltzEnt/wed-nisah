import type { SVGProps } from "react";

type FlowerProps = SVGProps<SVGSVGElement> & {
  size?: number;
};

const BURGUNDY = "#8b2635";
const BURGUNDY_DEEP = "#6f1d2a";
const ROSE = "#d9737e";
const DUSTY = "#c97b82";
const SAGE = "#4a5d4e";
const SAGE_LIGHT = "#7d9077";
const CREAM = "#fbf6ec";

export function PeonyBloom({
  size = 40,
  ...props
}: FlowerProps) {
  const petals = [-80, -55, -30, 0, 30, 55, 80].map((r, i) => ({
    rot: r,
    s: 0.85 - (i % 3) * 0.12,
  }));
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      {...props}
    >
      <defs>
        <radialGradient id="peonyA" cx="40%" cy="40%" r="80%">
          <stop offset="0%" stopColor={ROSE} />
          <stop offset="60%" stopColor={BURGUNDY} />
          <stop offset="100%" stopColor={BURGUNDY_DEEP} />
        </radialGradient>
        <radialGradient id="peonyB" cx="40%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#e5a7ad" />
          <stop offset="70%" stopColor={DUSTY} />
          <stop offset="100%" stopColor={BURGUNDY} />
        </radialGradient>
      </defs>
      {petals.map((p, i) => (
        <ellipse
          key={i}
          cx="50"
          cy="50"
          rx={26 * p.s}
          ry={34 * p.s}
          transform={`rotate(${p.rot} 50 50)`}
          fill={i % 2 === 0 ? "url(#peonyA)" : "url(#peonyB)"}
          opacity={0.92}
        />
      ))}
      <circle cx="50" cy="50" r="12" fill="#fff0f1" opacity="0.8" />
      <circle cx="50" cy="50" r="7" fill="#e8c25c" opacity="0.9" />
      {Array.from({ length: 6 }).map((_, i) => {
        const cx = Math.round((50 + Math.cos((i * Math.PI) / 3) * 4) * 1e3) / 1e3;
        const cy = Math.round((50 + Math.sin((i * Math.PI) / 3) * 4) * 1e3) / 1e3;
        return (
          <circle key={i} cx={cx} cy={cy} r="1.6" fill="#b8871c" />
        );
      })}
    </svg>
  );
}

export function RoseBloom({
  size = 26,
  ...props
}: FlowerProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 60 60"
      fill="none"
      {...props}
    >
      <defs>
        <radialGradient id="roseA" cx="45%" cy="40%" r="75%">
          <stop offset="0%" stopColor="#f2c7cb" />
          <stop offset="55%" stopColor={DUSTY} />
          <stop offset="100%" stopColor={BURGUNDY} />
        </radialGradient>
      </defs>
      {[-70, -35, 0, 35, 70].map((r, i) => (
        <ellipse
          key={i}
          cx="30"
          cy="30"
          rx="12"
          ry="16"
          transform={`rotate(${r} 30 30)`}
          fill="url(#roseA)"
          opacity={0.95}
        />
      ))}
      <circle cx="30" cy="30" r="5" fill="#fff0f1" opacity="0.85" />
      <circle cx="30" cy="30" r="3" fill="#e8c25c" />
    </svg>
  );
}

export function Leaf({
  size = 20,
  flip = false,
  ...props
}: FlowerProps & { flip?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      {...props}
      transform={flip ? "scale(-1,1)" : undefined}
    >
      <path
        d="M4 36 C 6 18, 16 8, 36 4 C 32 22, 22 34, 4 36 Z"
        fill={SAGE}
        opacity="0.9"
      />
      <path
        d="M8 32 C 14 22, 22 14, 30 8 M4 36 C 16 30, 26 24, 34 8"
        stroke={SAGE_LIGHT}
        strokeWidth="1.4"
        fill="none"
        opacity="0.8"
      />
    </svg>
  );
}

export function Fern({
  size = 50,
  flip = false,
  ...props
}: FlowerProps & { flip?: boolean }) {
  const stemLen = 26;
  const leaflets = Array.from({ length: 7 }, (_, i) => {
    const t = i / 7;
    return {
      n: i,
      x1: 6 + t * stemLen - 3,
      y1: 36 - t * stemLen,
      x2: 6 + t * stemLen + 8,
      y2: 36 - t * stemLen + 4,
    };
  });
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 44 40"
      fill="none"
      {...props}
      transform={flip ? "scale(-1,1)" : undefined}
    >
      <path
        d="M6 38 C 10 26, 12 14, 12 4"
        stroke={SAGE}
        strokeWidth="2.2"
        strokeLinecap="round"
      />
      {leaflets.map((l) => (
        <path
          key={l.n}
          d={`M ${l.x1} ${l.y1} C ${l.x1 + 4} ${l.y1 - 2}, ${l.x2} ${l.y2 - 4}, ${l.x2} ${l.y2}`}
          stroke={l.n % 2 === 0 ? SAGE : SAGE_LIGHT}
          strokeWidth="2.4"
          strokeLinecap="round"
          fill="none"
          opacity="0.9"
        />
      ))}
      {leaflets.map((l) => (
        <path
          key={`l${l.n}`}
          d={`M ${l.x1} ${l.y1} C ${l.x1 - 4} ${l.y1 + 4}, ${l.x1 - 8} ${l.y1 + 8}, ${l.x1 - 8} ${l.y1 + 10}`}
          stroke={l.n % 2 === 1 ? SAGE : SAGE_LIGHT}
          strokeWidth="2.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.8"
        />
      ))}
    </svg>
  );
}

export function FloralDivider({
  size = 200,
  ...props
}: FlowerProps) {
  return (
    <svg
      width={size}
      height={size * 0.3}
      viewBox="0 0 200 60"
      fill="none"
      {...props}
    >
      <path
        d="M10 32 C 60 26, 140 26, 190 32"
        stroke={SAGE}
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeDasharray="0.5 6"
        opacity="0.75"
      />
      <path
        d="M10 40 C 60 46, 140 46, 190 40"
        stroke={SAGE}
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="0.5 7"
        opacity="0.55"
      />
      <path
        d="M100 12 C 94 18, 94 22, 100 24 C 106 22, 106 18, 100 12 Z"
        fill={SAGE_LIGHT}
        opacity="0.8"
      />
      <circle cx="100" cy="16" r="3" fill={DUSTY} opacity="0.9" />
      <circle cx="106" cy="12" r="2.4" fill={BURGUNDY} opacity="0.85" />
      <circle cx="94" cy="12" r="2.4" fill={BURGUNDY} opacity="0.85" />
      <circle cx="100" cy="42" r="2.2" fill="#caa84e" opacity="0.9" />
    </svg>
  );
}

export function CornerFloral({
  size = 140,
  flip = false,
  ...props
}: FlowerProps & { flip?: boolean }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 140 140"
      fill="none"
      {...props}
    >
      <g transform={flip ? "translate(140,140) scale(-1,-1)" : undefined}>
        <path
          d="M28 132 C 34 96, 40 78, 58 62 C 72 50, 84 42, 96 30 C 100 26, 106 20, 112 14"
          stroke={SAGE}
          strokeWidth="3"
          strokeLinecap="round"
          fill="none"
          opacity="0.85"
        />
        <ellipse cx="108" cy="18" rx="9" ry="14" transform="rotate(-40 108 18)" fill={SAGE_LIGHT} opacity="0.9" />
        <ellipse cx="120" cy="26" rx="8" ry="12" transform="rotate(-60 120 26)" fill={SAGE} opacity="0.9" />
        <ellipse cx="96" cy="40" rx="8" ry="12" transform="rotate(-25 96 40)" fill={SAGE} opacity="0.75" />
        <circle cx="26" cy="122" r="20" fill={ROSE} opacity="0.18" />
        <PeonyBloom x={26} y={122} size={52} />
        <g transform="translate(58,96)">
          <RoseBloom size={30} />
        </g>
        <g transform="translate(88,62) scale(0.72)">
          <RoseBloom size={34} />
        </g>
        <circle cx="24" cy="94" r="5" fill="#e8c25c" opacity="0.9" />
        <circle cx="52" cy="72" r="4" fill={DUSTY} opacity="0.8" />
      </g>
    </svg>
  );
}