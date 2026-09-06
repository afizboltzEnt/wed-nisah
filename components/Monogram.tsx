import type { SVGProps } from "react";

export function Monogram({
  size = 96,
  ...props
}: SVGProps<SVGSVGElement> & { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      {...props}
    >
      <defs>
        <linearGradient id="goldfoil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#8b6c1f" />
          <stop offset="30%" stopColor="#c9a227" />
          <stop offset="50%" stopColor="#f0d878" />
          <stop offset="72%" stopColor="#c9a227" />
          <stop offset="100%" stopColor="#8b6c1f" />
        </linearGradient>
      </defs>
      <ellipse
        cx="60"
        cy="60"
        rx="46"
        ry="46"
        fill="none"
        stroke="url(#goldfoil)"
        strokeWidth="1.6"
        strokeDasharray="0.5 7"
        strokeLinecap="round"
        opacity="0.9"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="38"
        ry="38"
        fill="#8b2635"
        opacity="0.08"
        stroke="url(#goldfoil)"
        strokeWidth="0.8"
        strokeLinecap="round"
      />
      <text
        x="60"
        y="72"
        textAnchor="middle"
        fontFamily="Playfair Display, serif"
        fontSize="46"
        fontWeight="600"
        fill="url(#goldfoil)"
        letterSpacing="1"
      >
        D&amp;A
      </text>
      <path
        d="M36 88 C 46 84, 74 84, 84 88"
        stroke="url(#goldfoil)"
        strokeWidth="1.2"
        strokeLinecap="round"
        strokeDasharray="0.5 5"
        opacity="0.8"
      />
      <path
        d="M40 92 C 50 89, 70 89, 80 92"
        stroke="url(#goldfoil)"
        strokeWidth="1"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}