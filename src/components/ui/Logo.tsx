import React from 'react';

export const MirabytesLogo = ({ className }: { className?: string }) => (
  <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="[http://www.w3.org/2000/svg](http://www.w3.org/2000/svg)" className={className}>
    <rect x="2" y="2" width="36" height="36" rx="8" className="fill-blue-600/20 stroke-blue-500/50" strokeWidth="1" />
    <path d="M12 28V12L20 20L28 12V28" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="12" r="2" className="fill-cyan-400" />
    <circle cx="28" cy="12" r="2" className="fill-cyan-400" />
    <circle cx="20" cy="20" r="2" className="fill-blue-400" />
    <circle cx="12" cy="28" r="2" className="fill-purple-400" />
    <circle cx="28" cy="28" r="2" className="fill-purple-400" />
    <path d="M20 20V28" stroke="url(#paint0_linear)" strokeWidth="1.5" strokeLinecap="round" />
    <defs>
      <linearGradient id="paint0_linear" x1="20" y1="20" x2="20" y2="28" gradientUnits="userSpaceOnUse">
        <stop stopColor="#60A5FA"/>
        <stop offset="1" stopColor="#A78BFA"/>
      </linearGradient>
    </defs>
  </svg>
);