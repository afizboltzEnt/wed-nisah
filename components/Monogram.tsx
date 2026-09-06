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
          <stop offset="0%" stopColor="#9c7a1f" />
          <stop offset="30%" stopColor="#d4af37" />
          <stop offset="50%" stopColor="#f6e27a" />
          <stop offset="72%" stopColor="#d4af37" />
          <stop offset="100%" stopColor="#9c7a1f" />
        </linearGradient>
      </defs>
      <ellipse
        cx="60"
        cy="60"
        rx="47"
        ry="47"
        fill="none"
        stroke="url(#goldfoil)"
        strokeWidth="1.7"
        strokeDasharray="0.5 6.5"
        strokeLinecap="round"
        opacity="0.95"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="40"
        ry="40"
        fill="#8b2a3a"
        opacity="0.07"
        stroke="url(#goldfoil)"
        strokeWidth="0.9"
        strokeLinecap="round"
      />
      <ellipse
        cx="60"
        cy="60"
        rx="33"
        ry="33"
        fill="none"
        stroke="url(#goldfoil)"
        strokeWidth="0.6"
        strokeDasharray="1 4"
        strokeLinecap="round"
        opacity="0.8"
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