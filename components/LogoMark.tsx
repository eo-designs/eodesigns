import React from 'react';

/**
 * Placeholder logo. Drop your real logo at /public/assets/logo.svg and swap this component to <img /> if you prefer.
 */
export function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="EO Designs"
    >
      <defs>
        <linearGradient id="g" x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop stopColor="white" stopOpacity="0.95" />
          <stop offset="1" stopColor="white" stopOpacity="0.55" />
        </linearGradient>
      </defs>
      <path
        d="M32 4l24 14v28L32 60 8 46V18L32 4z"
        stroke="url(%23g)"
        strokeWidth="2"
      />
      <path d="M22 26h20" stroke="white" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 32h14" stroke="white" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" />
      <path d="M22 38h20" stroke="white" strokeOpacity="0.85" strokeWidth="2" strokeLinecap="round" />
      <path d="M45 22v20" stroke="white" strokeOpacity="0.55" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}
