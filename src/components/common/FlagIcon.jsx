import React from 'react';

export const FlagIcon = ({ code, className = "w-5 h-3.5 rounded-[2px] shadow-sm inline-block object-cover overflow-hidden shrink-0 border border-slate-300/40 dark:border-slate-700/60" }) => {
  const c = code?.toLowerCase();

  if (c === 'uz') {
    // Uzbekistan Flag SVG
    return (
      <svg className={className} viewBox="0 0 500 250" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="500" height="80" fill="#0099B5" />
        <rect y="80" width="500" height="5" fill="#CE1126" />
        <rect y="85" width="500" height="80" fill="#FFFFFF" />
        <rect y="165" width="500" height="5" fill="#CE1126" />
        <rect y="170" width="500" height="80" fill="#1EB53A" />
        {/* Crescent */}
        <circle cx="50" cy="40" r="24" fill="#FFFFFF" />
        <circle cx="57" cy="40" r="21" fill="#0099B5" />
        {/* Stars */}
        <g fill="#FFFFFF">
          <circle cx="85" cy="20" r="3.5" />
          <circle cx="102" cy="20" r="3.5" />
          <circle cx="119" cy="20" r="3.5" />
          <circle cx="85" cy="40" r="3.5" />
          <circle cx="102" cy="40" r="3.5" />
          <circle cx="119" cy="40" r="3.5" />
          <circle cx="85" cy="60" r="3.5" />
          <circle cx="102" cy="60" r="3.5" />
          <circle cx="119" cy="60" r="3.5" />
          <circle cx="136" cy="40" r="3.5" />
          <circle cx="136" cy="60" r="3.5" />
          <circle cx="153" cy="60" r="3.5" />
        </g>
      </svg>
    );
  }

  if (c === 'ru') {
    // Russia Flag SVG
    return (
      <svg className={className} viewBox="0 0 450 300" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect width="450" height="100" fill="#FFFFFF" />
        <rect y="100" width="450" height="100" fill="#0039A6" />
        <rect y="200" width="450" height="100" fill="#D52B1E" />
      </svg>
    );
  }

  // USA / English Flag SVG
  return (
    <svg className={className} viewBox="0 0 741 390" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="741" height="390" fill="#B22234" />
      <path d="M0,30H741M0,90H741M0,150H741M0,210H741M0,270H741M0,330H741" stroke="#FFFFFF" strokeWidth="30" />
      <rect width="296" height="210" fill="#3C3B6E" />
      <g fill="#FFFFFF">
        <circle cx="35" cy="25" r="7" />
        <circle cx="95" cy="25" r="7" />
        <circle cx="155" cy="25" r="7" />
        <circle cx="215" cy="25" r="7" />
        <circle cx="270" cy="25" r="7" />
        <circle cx="65" cy="50" r="7" />
        <circle cx="125" cy="50" r="7" />
        <circle cx="185" cy="50" r="7" />
        <circle cx="245" cy="50" r="7" />
        <circle cx="35" cy="75" r="7" />
        <circle cx="95" cy="75" r="7" />
        <circle cx="155" cy="75" r="7" />
        <circle cx="215" cy="75" r="7" />
        <circle cx="270" cy="75" r="7" />
        <circle cx="65" cy="100" r="7" />
        <circle cx="125" cy="100" r="7" />
        <circle cx="185" cy="100" r="7" />
        <circle cx="245" cy="100" r="7" />
        <circle cx="35" cy="125" r="7" />
        <circle cx="95" cy="125" r="7" />
        <circle cx="155" cy="125" r="7" />
        <circle cx="215" cy="125" r="7" />
        <circle cx="270" cy="125" r="7" />
        <circle cx="65" cy="150" r="7" />
        <circle cx="125" cy="150" r="7" />
        <circle cx="185" cy="150" r="7" />
        <circle cx="245" cy="150" r="7" />
        <circle cx="35" cy="175" r="7" />
        <circle cx="95" cy="175" r="7" />
        <circle cx="155" cy="175" r="7" />
        <circle cx="215" cy="175" r="7" />
        <circle cx="270" cy="175" r="7" />
      </g>
    </svg>
  );
};
