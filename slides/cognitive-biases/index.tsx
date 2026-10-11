import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  Step,
  Steps,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

// Web fonts injection: Instrument Serif (Editorial Display), Plus Jakarta Sans (Modern Body), JetBrains Mono (Technical/Data)
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=JetBrains+Mono:wght@500;700;800&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap';
const FONT_LINK_ID = 'osd-webfont-cognitive-biases';

if (typeof document !== 'undefined') {
  let link = document.getElementById(FONT_LINK_ID) as HTMLLinkElement | null;
  if (!link) {
    link = document.createElement('link');
    link.id = FONT_LINK_ID;
    link.rel = 'stylesheet';
    document.head.appendChild(link);
  }
  if (link.href !== FONT_HREF) link.href = FONT_HREF;
}

export const design: DesignSystem = {
  palette: {
    bg: '#0b101b',
    text: '#f8fafc',
    accent: '#38bdf8',
  },
  fonts: {
    display: '"Instrument Serif", Georgia, serif',
    body: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 148,
    body: 32,
  },
  radius: 14,
};

// Font family constants for granular variation
const fontSerif = '"Instrument Serif", Georgia, serif';
const fontSans = '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

const colors = {
  muted: '#94a3b8',
  dim: '#64748b',
  border: 'rgba(255, 255, 255, 0.08)',
  cardBg: '#131b2e',
  cardHover: '#18233c',
  amber: '#fbbf24',
  emerald: '#34d399',
  rose: '#fb7185',
  purple: '#c084fc',
};

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

// Getting-Started House Transition (Lift & Crossfade) applied across all pages
export const transition: SlideTransition = {
  duration: 200,
  exit: {
    duration: 140,
    easing: EASE_IN,
    keyframes: [
      { opacity: 1, transform: 'translateY(0)' },
      { opacity: 0, transform: 'translateY(-4px)' },
    ],
  },
  enter: {
    duration: 200,
    delay: 80,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

// Top-right badge displaying the active transition type
const TransitionBadge = ({ name = 'Getting Started (Lift)' }: { name?: string }) => (
  <div
    style={{
      position: 'absolute',
      top: 40,
      right: 140,
      display: 'inline-flex',
      alignItems: 'center',
      gap: 8,
      padding: '6px 14px',
      borderRadius: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      border: `1px solid ${colors.border}`,
      fontFamily: fontMono,
      fontSize: 15,
      fontWeight: 700,
      color: colors.dim,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      zIndex: 10,
    }}
  >
    <span style={{ fontSize: 13, color: 'var(--osd-accent)' }}>✦</span>
    <span>TRANSITION: <strong style={{ color: 'var(--osd-text)' }}>{name}</strong></span>
  </div>
);

// ================= VECTOR SVG ICONS =================
const BrainNeuralSVG = ({ size = 32, color = 'var(--osd-accent)' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 4.44-2.04" />
    <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-4.44-2.04" />
    <path d="M12 8h3" />
    <path d="M9 8h3" />
    <path d="M12 13h4" />
    <path d="M8 13h4" />
  </svg>
);

const BoltSVG = ({ size = 26, color = '#38bdf8' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" fill={`${color}22`} />
  </svg>
);

const GearsSVG = ({ size = 26, color = '#fbbf24' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="3" fill={`${color}22`} />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" />
  </svg>
);

const AnchorSVG = ({ size = 26, color = 'var(--osd-accent)' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="5" r="3" />
    <line x1="12" y1="22" x2="12" y2="8" />
    <path d="M5 12H2a10 10 0 0 0 20 0h-3" />
  </svg>
);

const PlaneSVG = ({ size = 32, color = colors.rose }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.4-.2.6-.6.5-1.1z" fill={`${color}18`} />
  </svg>
);

const CarSVG = ({ size = 32, color = colors.emerald }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H7c-.6 0-1.1.3-1.5.7L3.3 10S2 10.5 2 12v4c0 .6.4 1 1 1h2" fill={`${color}18`} />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const ScaleSVG = ({ size = 34, color = colors.rose }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" fill={`${color}18`} />
    <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" fill={`${color}18`} />
    <path d="M7 21h10" />
    <path d="M12 3v18" />
    <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
  </svg>
);

const SearchFilterSVG = ({ size = 26, color = 'var(--osd-accent)' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="11" cy="11" r="8" fill={`${color}18`} />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
    <line x1="8" y1="11" x2="14" y2="11" />
  </svg>
);

const PrismSVG = ({ size = 26, color = colors.amber }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polygon points="12 2 2 22 22 22" fill={`${color}18`} />
    <line x1="2" y1="15" x2="22" y2="15" />
    <line x1="7" y1="8" x2="17" y2="8" />
  </svg>
);

const MemoryArchiveSVG = ({ size = 26, color = colors.emerald }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <polyline points="21 8 21 21 3 21 3 8" fill={`${color}18`} />
    <rect x="1" y="3" width="22" height="5" rx="1" />
    <line x1="10" y1="12" x2="14" y2="12" />
  </svg>
);

const ToggleSVG = ({ size = 22, color = 'var(--osd-accent)' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <rect width="20" height="12" x="2" y="6" rx="6" ry="6" fill={`${color}18`} />
    <circle cx="16" cy="12" r="3" fill={color} />
  </svg>
);

const FramingSVG = ({ size = 22, color = colors.amber }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M2 7V2h5" />
    <path d="M22 7V2h-5" />
    <path d="M2 17v5h5" />
    <path d="M22 17v5h-5" />
    <rect width="10" height="10" x="7" y="7" rx="2" fill={`${color}18`} />
  </svg>
);

const FrictionClockSVG = ({ size = 22, color = colors.purple }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" fill={`${color}18`} />
    <polyline points="12 6 12 12 16 14" />
    <line x1="5" y1="19" x2="19" y2="5" strokeDasharray="2 2" />
  </svg>
);

const MeterPulseSVG = ({ size = 22, color = colors.emerald }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M12 2v4" />
    <path d="m4.93 4.93 2.83 2.83" />
    <path d="M2 12h4" />
    <path d="M20 12h2" />
    <path d="m19.07 4.93-2.83 2.83" />
    <path d="M14 12a2 2 0 1 0-4 0 2 2 0 0 0 4 0Z" fill={`${color}22`} />
    <path d="m13.4 10.6 2.7-2.7" />
  </svg>
);

const AlertPreMortemSVG = ({ size = 28, color = colors.amber }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" fill={`${color}18`} />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

const CompassOutsideSVG = ({ size = 28, color = 'var(--osd-accent)' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" fill={`${color}22`} />
  </svg>
);

const ShieldRedTeamSVG = ({ size = 28, color = colors.rose }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill={`${color}18`} />
    <path d="m9 12 2 2 4-4" />
  </svg>
);

// ================= BACKGROUND VECTOR ILLUSTRATIONS =================
// 1. Cover: Neural Synaptic Matrix & Double-Helix Flow
const BgCover = () => (
  <svg
    style={{ position: 'absolute', right: -40, top: -40, width: 960, height: 960, pointerEvents: 'none', opacity: 0.22, zIndex: 0 }}
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      <radialGradient id="coverGlow" cx="50%" cy="50%" r="50%">
        <stop offset="0%" stopColor="var(--osd-accent)" stopOpacity="0.3" />
        <stop offset="100%" stopColor="var(--osd-accent)" stopOpacity="0" />
      </radialGradient>
    </defs>
    <circle cx="400" cy="400" r="380" fill="url(#coverGlow)" />
    <circle cx="400" cy="400" r="360" stroke="var(--osd-accent)" strokeWidth="2.5" strokeDasharray="8 8" />
    <circle cx="400" cy="400" r="280" stroke="var(--osd-accent)" strokeWidth="2.5" />
    <circle cx="400" cy="400" r="190" stroke="var(--osd-accent)" strokeWidth="3" strokeDasharray="14 10" />
    <circle cx="400" cy="400" r="100" stroke="var(--osd-accent)" strokeWidth="2.5" />
    <path d="M400 30 V770 M30 400 H770" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="6 8" />
    <path d="M140 180 Q400 60 660 180 T400 720 Z" stroke="var(--osd-accent)" strokeWidth="3" />
    <path d="M220 260 Q400 140 580 260 T400 640 Z" stroke="var(--osd-accent)" strokeWidth="2" strokeDasharray="6 6" />
    <path d="M100 400 C100 180 300 80 400 80 S700 180 700 400 500 720 400 720 100 620 100 400" stroke="var(--osd-accent)" strokeWidth="2.5" />
    <circle cx="260" cy="220" r="8" fill="var(--osd-accent)" />
    <circle cx="540" cy="220" r="8" fill="var(--osd-accent)" />
    <circle cx="660" cy="400" r="9" fill="var(--osd-accent)" />
    <circle cx="540" cy="580" r="8" fill="var(--osd-accent)" />
    <circle cx="260" cy="580" r="8" fill="var(--osd-accent)" />
    <circle cx="140" cy="400" r="9" fill="var(--osd-accent)" />
    <circle cx="400" cy="400" r="12" fill="var(--osd-accent)" />
  </svg>
);

// 2. Dual Systems: Reflexive Lightning Pulse vs Precision Blueprint Gears
const BgDualSystems = () => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.22, zIndex: 0 }}
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* Left: System 1 Lightning impulse trajectories */}
    <g stroke="#38bdf8" strokeWidth="2.5">
      <path d="M140 60 L460 480 L360 520 L640 1000" strokeWidth="4" strokeDasharray="10 6" />
      <path d="M60 280 Q260 220 420 480 T700 820" strokeWidth="2.5" />
      <path d="M100 740 L340 540 L290 510 L520 280" strokeWidth="2" strokeDasharray="6 6" />
      <circle cx="460" cy="480" r="160" strokeDasharray="6 8" strokeWidth="2" />
      <circle cx="460" cy="480" r="90" strokeWidth="2.5" />
      <circle cx="460" cy="480" r="8" fill="#38bdf8" />
    </g>
    {/* Right: System 2 Technical Blueprint Gears */}
    <g stroke="#fbbf24" strokeWidth="2.5" transform="translate(1260, 160)">
      <circle cx="260" cy="260" r="230" strokeDasharray="8 8" strokeWidth="2" />
      <circle cx="260" cy="260" r="175" strokeWidth="2.5" />
      <circle cx="260" cy="260" r="120" strokeWidth="4" />
      <circle cx="260" cy="260" r="60" strokeDasharray="5 5" strokeWidth="2" />
      <line x1="20" y1="260" x2="500" y2="260" strokeDasharray="10 10" strokeWidth="2" />
      <line x1="260" y1="20" x2="260" y2="500" strokeDasharray="10 10" strokeWidth="2" />
      <rect x="175" y="175" width="170" height="170" strokeDasharray="6 6" strokeWidth="2" />
      <polygon points="260,75 325,125 395,125 415,195 475,235 455,305 475,375 415,395 385,465 315,445 265,485 205,445 135,465 115,395 55,375 75,305 55,235 115,195 135,125 205,125" strokeWidth="2.5" />
      <circle cx="260" cy="260" r="10" fill="#fbbf24" />
    </g>
  </svg>
);

// 3. Anchoring: Massive Gravitational Depth Field & Bathymetric Rings
const BgAnchoring = () => (
  <svg
    style={{ position: 'absolute', right: -30, bottom: -50, width: 940, height: 940, pointerEvents: 'none', opacity: 0.22, zIndex: 0 }}
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="450" cy="450" r="390" stroke="var(--osd-accent)" strokeWidth="2" strokeDasharray="10 8" />
    <circle cx="450" cy="450" r="300" stroke="var(--osd-accent)" strokeWidth="2.5" />
    <circle cx="450" cy="450" r="210" stroke="var(--osd-accent)" strokeWidth="3" strokeDasharray="8 6" />
    <circle cx="450" cy="450" r="120" stroke="var(--osd-accent)" strokeWidth="3.5" />
    <line x1="50" y1="450" x2="780" y2="450" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="8 8" />
    <line x1="450" y1="50" x2="450" y2="780" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="8 8" />
    <g stroke="var(--osd-accent)" strokeWidth="3" transform="translate(300, 250) scale(1.65)">
      <circle cx="100" cy="40" r="24" strokeWidth="3.5" />
      <line x1="100" y1="64" x2="100" y2="240" strokeWidth="6" />
      <line x1="40" y1="100" x2="160" y2="100" strokeWidth="6" />
      <path d="M20 180 C20 245 180 245 180 180" strokeWidth="6" />
      <polygon points="20,180 10,165 30,165" fill="var(--osd-accent)" />
      <polygon points="180,180 170,165 190,165" fill="var(--osd-accent)" />
    </g>
  </svg>
);

// 4. Availability: Flight Radar & Salience Vector Trajectories
const BgAvailability = () => (
  <svg
    style={{ position: 'absolute', right: 30, top: 10, width: 900, height: 900, pointerEvents: 'none', opacity: 0.22, zIndex: 0 }}
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <circle cx="400" cy="400" r="380" stroke={colors.rose} strokeWidth="2" strokeDasharray="12 8" />
    <circle cx="400" cy="400" r="280" stroke={colors.emerald} strokeWidth="2.5" />
    <circle cx="400" cy="400" r="180" stroke="var(--osd-accent)" strokeWidth="3" strokeDasharray="6 8" />
    <line x1="20" y1="400" x2="780" y2="400" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="10 10" />
    <line x1="400" y1="20" x2="400" y2="780" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="10 10" />
    <path d="M120 700 Q300 220 690 170" stroke={colors.rose} strokeWidth="3.5" />
    <path d="M170 630 Q440 370 730 310" stroke={colors.emerald} strokeWidth="3" strokeDasharray="8 6" />
    <circle cx="590" cy="200" r="18" stroke={colors.rose} strokeWidth="3" />
    <circle cx="590" cy="200" r="6" fill={colors.rose} />
    <circle cx="490" cy="350" r="15" stroke={colors.emerald} strokeWidth="3" />
    <circle cx="490" cy="350" r="5" fill={colors.emerald} />
  </svg>
);

// 5. Loss Aversion: Iconic Kahneman-Tversky Prospect S-Curve
const BgLossAversion = () => (
  <svg
    style={{ position: 'absolute', right: 20, bottom: 10, width: 900, height: 820, pointerEvents: 'none', opacity: 0.22, zIndex: 0 }}
    viewBox="0 0 800 700"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <line x1="60" y1="350" x2="740" y2="350" stroke="var(--osd-accent)" strokeWidth="2.5" />
    <line x1="400" y1="40" x2="400" y2="660" stroke="var(--osd-accent)" strokeWidth="2.5" />
    <line x1="60" y1="180" x2="740" y2="180" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="8 8" />
    <line x1="60" y1="520" x2="740" y2="520" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="8 8" />
    <line x1="210" y1="40" x2="210" y2="660" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="8 8" />
    <line x1="590" y1="40" x2="590" y2="660" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="8 8" />
    {/* Deep Steep Loss Curve vs Flatter Gain Curve */}
    <path d="M110 650 C270 620 355 490 400 350 C445 210 550 150 710 120" stroke={colors.rose} strokeWidth="5" />
    <line x1="235" y1="560" x2="400" y2="350" stroke={colors.rose} strokeWidth="3" strokeDasharray="6 6" />
    <line x1="400" y1="350" x2="565" y2="200" stroke={colors.emerald} strokeWidth="3" strokeDasharray="6 6" />
    <circle cx="400" cy="350" r="9" fill="var(--osd-accent)" />
  </svg>
);

// 6. Confirmation Bias: Optical Prism Funnel & Deflected Truth Rays
const BgConfirmationBias = () => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.22, zIndex: 0 }}
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g transform="translate(960, 480)">
      <polygon points="0,-260 -210,170 210,170" stroke={colors.amber} strokeWidth="3.5" />
      <polygon points="0,-180 -140,110 140,110" stroke={colors.amber} strokeWidth="2" strokeDasharray="8 8" />
      <line x1="-840" y1="-90" x2="-100" y2="-45" stroke="var(--osd-accent)" strokeWidth="3.5" />
      <line x1="-840" y1="0" x2="-120" y2="0" stroke="var(--osd-accent)" strokeWidth="3.5" />
      <line x1="-840" y1="90" x2="-100" y2="45" stroke="var(--osd-accent)" strokeWidth="3.5" />
      <path d="M-100 -45 L-240 -340" stroke={colors.rose} strokeWidth="3" strokeDasharray="8 8" />
      <path d="M-100 45 L-240 400" stroke={colors.rose} strokeWidth="3" strokeDasharray="8 8" />
      <line x1="70" y1="0" x2="840" y2="0" stroke={colors.emerald} strokeWidth="5" />
      <circle cx="500" cy="0" r="180" stroke={colors.emerald} strokeWidth="2" strokeDasharray="10 10" />
      <circle cx="500" cy="0" r="110" stroke={colors.emerald} strokeWidth="2" />
    </g>
  </svg>
);

// 7. Choice Architecture: Hydrodynamic Decision Streamlines & Nudge Contours
const BgChoiceArchitecture = () => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', pointerEvents: 'none', opacity: 0.22, zIndex: 0 }}
    viewBox="0 0 1920 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g stroke="var(--osd-accent)" strokeWidth="2.5">
      <path d="M60 130 C480 130 780 230 1180 230 S1580 330 1860 330" strokeWidth="2" />
      <path d="M60 270 C480 270 740 410 1140 410 S1540 550 1860 550" strokeWidth="3" />
      <path d="M60 430 C430 430 690 610 1090 610 S1490 770 1860 770" strokeWidth="3.5" />
      <path d="M60 590 C380 590 640 770 1040 770 S1440 930 1860 930" strokeWidth="2" />
      <circle cx="920" cy="320" r="75" stroke={colors.amber} strokeWidth="2.5" strokeDasharray="8 8" />
      <circle cx="920" cy="320" r="35" stroke={colors.amber} strokeWidth="2.5" />
      <circle cx="1320" cy="680" r="85" stroke={colors.emerald} strokeWidth="2.5" strokeDasharray="8 8" />
      <circle cx="1320" cy="680" r="45" stroke={colors.emerald} strokeWidth="2.5" />
    </g>
  </svg>
);

// 8. Closing: Hexagonal Defense Mesh & Concentric System-Check Triangulation
const BgClosing = () => (
  <svg
    style={{ position: 'absolute', right: -40, top: -40, width: 960, height: 960, pointerEvents: 'none', opacity: 0.22, zIndex: 0 }}
    viewBox="0 0 800 800"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <polygon points="400,50 710,225 710,575 400,750 90,575 90,225" stroke="var(--osd-accent)" strokeWidth="3" />
    <polygon points="400,135 640,265 640,535 400,665 160,535 160,265" stroke={colors.emerald} strokeWidth="2" strokeDasharray="12 10" />
    <polygon points="400,215 570,305 570,495 400,585 230,495 230,305" stroke={colors.amber} strokeWidth="2.5" />
    <circle cx="400" cy="400" r="130" stroke="var(--osd-accent)" strokeWidth="2.5" strokeDasharray="8 8" />
    <circle cx="400" cy="400" r="65" stroke={colors.rose} strokeWidth="2.5" />
    <line x1="400" y1="50" x2="400" y2="750" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="8 8" />
    <line x1="90" y1="225" x2="710" y2="575" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="8 8" />
    <line x1="90" y1="575" x2="710" y2="225" stroke="var(--osd-accent)" strokeWidth="1.5" strokeDasharray="8 8" />
  </svg>
);

const canvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  boxSizing: 'border-box',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  position: 'relative',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  padding: '88px 140px 64px 140px',
};

// Global Footer Component using useSlidePageNumber
const SlideFooter = ({ currentChapter }: { currentChapter?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        paddingTop: 20,
        borderTop: `1px solid ${colors.border}`,
        fontSize: 20,
        color: colors.dim,
        letterSpacing: '0.04em',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'var(--osd-accent)', fontWeight: 700, fontFamily: fontMono, fontSize: 18, letterSpacing: '0.08em' }}>COGNITIVE PSYCHOLOGY</span>
        <span>•</span>
        <span style={{ fontFamily: fontSans, fontWeight: 600 }}>{currentChapter ?? 'DECISION ARCHITECTURE'}</span>
      </div>
      <div style={{ fontFamily: fontMono, fontVariantNumeric: 'tabular-nums', fontWeight: 700, fontSize: 20 }}>
        <span style={{ color: 'var(--osd-text)' }}>{String(current).padStart(2, '0')}</span>
        <span style={{ margin: '0 6px', opacity: 0.4 }}>/</span>
        <span style={{ opacity: 0.6 }}>{String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

// Reusable Top Eyebrow + Header
const PageHeader = ({
  badge,
  title,
  subtitle,
}: {
  badge: string;
  title: string;
  subtitle?: string;
}) => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 26 }}>
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        color: 'var(--osd-accent)',
        fontFamily: fontMono,
        fontSize: 18,
        fontWeight: 700,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: 'var(--osd-accent)',
          display: 'inline-block',
        }}
      />
      {badge}
    </div>
    <h2
      style={{
        fontFamily: fontSerif,
        fontSize: 72,
        fontWeight: 400,
        lineHeight: 1.08,
        margin: 0,
        letterSpacing: '-0.01em',
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        style={{
          fontFamily: fontSans,
          fontSize: 26,
          color: colors.muted,
          margin: 0,
          lineHeight: 1.35,
          maxWidth: 1300,
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

// Individual System Card component for Page 2
const SystemCard = ({
  name,
  label,
  accentColor,
  speed,
  effort,
  characteristics,
  icon,
}: {
  name: string;
  label: string;
  accentColor: string;
  speed: string;
  effort: string;
  characteristics: string[];
  icon: ReactNode;
}) => (
  <div
    style={{
      backgroundColor: colors.cardBg,
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${colors.border}`,
      padding: '40px 48px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      height: 480,
      boxSizing: 'border-box',
    }}
  >
    <div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          {icon}
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 18,
              fontWeight: 700,
              color: accentColor,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              padding: '4px 14px',
              borderRadius: 6,
              backgroundColor: `${accentColor}18`,
            }}
          >
            {label}
          </span>
        </div>
        <div style={{ display: 'flex', gap: 16, fontSize: 19, color: colors.muted, fontFamily: fontSans }}>
          <span>Speed: <strong style={{ color: 'var(--osd-text)', fontFamily: fontMono }}>{speed}</strong></span>
          <span>•</span>
          <span>Effort: <strong style={{ color: 'var(--osd-text)' }}>{effort}</strong></span>
        </div>
      </div>
      <h3
        style={{
          fontFamily: fontSerif,
          fontSize: 64,
          fontWeight: 400,
          margin: '0 0 20px 0',
          letterSpacing: '-0.01em',
        }}
      >
        {name}
      </h3>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
        {characteristics.map((c, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 14, fontSize: 25, color: colors.muted, fontFamily: fontSans }}>
            <span style={{ color: accentColor, fontWeight: 'bold' }}>✓</span>
            <span style={{ lineHeight: 1.3 }}>{c}</span>
          </div>
        ))}
      </div>
    </div>
    <div
      style={{
        paddingTop: 18,
        borderTop: `1px solid ${colors.border}`,
        fontSize: 20,
        color: colors.dim,
        fontFamily: fontSans,
      }}
    >
      Daniel Kahneman: <em style={{ fontFamily: fontSerif, fontSize: 22 }}>Thinking, Fast and Slow</em>
    </div>
  </div>
);

// Explicit anchor example card
const AnchorExample = ({
  domain,
  anchor,
  impact,
}: {
  domain: string;
  anchor: string;
  impact: string;
}) => (
  <div
    style={{
      backgroundColor: colors.cardBg,
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${colors.border}`,
      padding: '24px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 8,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 18, fontWeight: 700, color: 'var(--osd-accent)', letterSpacing: '0.08em', fontFamily: fontMono }}>
      <AnchorSVG size={18} color="var(--osd-accent)" />
      <span>{domain}</span>
    </div>
    <div style={{ fontSize: 30, fontWeight: 400, fontFamily: fontSerif, color: 'var(--osd-text)' }}>
      {anchor}
    </div>
    <div style={{ fontSize: 24, color: colors.muted, lineHeight: 1.35, fontFamily: fontSans }}>
      {impact}
    </div>
  </div>
);

// Explicit Risk Comparison Card
const RiskCard = ({
  label,
  stat,
  subtext,
  perception,
  color,
  icon,
}: {
  label: string;
  stat: string;
  subtext: string;
  perception: string;
  color: string;
  icon: ReactNode;
}) => (
  <div
    style={{
      backgroundColor: colors.cardBg,
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${colors.border}`,
      padding: '36px 40px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      height: 380,
      boxSizing: 'border-box',
    }}
  >
    <div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        {icon}
        <div style={{ fontSize: 19, fontWeight: 700, color, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: fontMono }}>
          {label}
        </div>
      </div>
      <div style={{ fontSize: 84, fontWeight: 800, fontFamily: fontMono, color, lineHeight: 1, marginBottom: 12, letterSpacing: '-0.03em' }}>
        {stat}
      </div>
      <div style={{ fontSize: 26, fontWeight: 600, color: 'var(--osd-text)', marginBottom: 8, fontFamily: fontSans }}>
        {subtext}
      </div>
    </div>
    <div
      style={{
        paddingTop: 16,
        borderTop: `1px solid ${colors.border}`,
        fontSize: 22,
        color: colors.muted,
        lineHeight: 1.4,
        fontFamily: fontSans,
      }}
    >
      <strong style={{ color: 'var(--osd-text)' }}>Cognitive Trap:</strong> {perception}
    </div>
  </div>
);

// Nudge Pillar Card
const NudgeCard = ({
  number,
  title,
  example,
  mechanism,
  icon,
}: {
  number: string;
  title: string;
  example: string;
  mechanism: string;
  icon: ReactNode;
}) => (
  <div
    style={{
      backgroundColor: colors.cardBg,
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${colors.border}`,
      padding: '22px 28px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        {icon}
        <span style={{ fontSize: 17, fontWeight: 700, color: 'var(--osd-accent)', letterSpacing: '0.08em', fontFamily: fontMono }}>
          {number} • {title.toUpperCase()}
        </span>
      </div>
      <span style={{ fontSize: 15, color: colors.dim, textTransform: 'uppercase', fontFamily: fontMono }}>NUDGE</span>
    </div>
    <div style={{ fontSize: 22, color: colors.muted, lineHeight: 1.35, fontFamily: fontSans }}>
      {mechanism}
    </div>
    <div
      style={{
        marginTop: 4,
        padding: '8px 14px',
        backgroundColor: 'rgba(255,255,255,0.03)',
        borderRadius: 8,
        fontSize: 19,
        color: colors.amber,
        fontFamily: fontSans,
      }}
    >
      💡 <em>{example}</em>
    </div>
  </div>
);

// Bias Stage Card for Page 6
const BiasStageCard = ({
  stepNum,
  title,
  description,
  accentColor,
  icon,
}: {
  stepNum: string;
  title: string;
  description: ReactNode;
  accentColor: string;
  icon: ReactNode;
}) => (
  <div
    style={{
      backgroundColor: colors.cardBg,
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${colors.border}`,
      padding: '36px 32px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      height: 380,
      boxSizing: 'border-box',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 44, fontWeight: 800, color: accentColor, fontFamily: fontMono }}>
        {stepNum}
      </div>
      {icon}
    </div>
    <h3 style={{ fontSize: 34, fontWeight: 400, margin: 0, color: 'var(--osd-text)', fontFamily: fontSerif }}>
      {title}
    </h3>
    <p style={{ fontSize: 24, color: colors.muted, lineHeight: 1.45, margin: 0, fontFamily: fontSans }}>
      {description}
    </p>
  </div>
);

// Habit Card for Closing
const HabitCard = ({
  stepNum,
  name,
  question,
  action,
  icon,
}: {
  stepNum: string;
  name: string;
  question: string;
  action: string;
  icon: ReactNode;
}) => (
  <div
    style={{
      backgroundColor: colors.cardBg,
      borderRadius: 'var(--osd-radius)',
      border: `1px solid ${colors.border}`,
      padding: '36px 40px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16,
      flex: 1,
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ fontSize: 18, fontWeight: 700, color: 'var(--osd-accent)', fontFamily: fontMono, letterSpacing: '0.08em' }}>
        HABIT {stepNum}
      </div>
      {icon}
    </div>
    <h4 style={{ fontSize: 38, fontWeight: 400, margin: 0, color: 'var(--osd-text)', fontFamily: fontSerif }}>
      {name}
    </h4>
    <p style={{ fontSize: 26, color: colors.amber, margin: 0, fontStyle: 'italic', lineHeight: 1.35, fontFamily: fontSerif }}>
      "{question}"
    </p>
    <div style={{ fontSize: 22, color: colors.muted, lineHeight: 1.4, marginTop: 'auto', paddingTop: 16, borderTop: `1px solid ${colors.border}`, fontFamily: fontSans }}>
      {action}
    </div>
  </div>
);

// ================= PAGE 1: COVER =================
const Cover: Page = () => (
  <div style={canvasStyle}>
    <BgCover />
    <TransitionBadge />
    <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          color: 'var(--osd-accent)',
          fontFamily: fontMono,
          fontSize: 20,
          fontWeight: 700,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          marginBottom: 32,
        }}
      >
        <span
          style={{
            width: 10,
            height: 10,
            borderRadius: '50%',
            backgroundColor: 'var(--osd-accent)',
          }}
        />
        COGNITIVE PSYCHOLOGY & BEHAVIORAL SCIENCE
      </div>
      <h1
        style={{
          fontFamily: fontSerif,
          fontSize: 160,
          fontWeight: 400,
          lineHeight: 0.98,
          margin: '0 0 36px 0',
          letterSpacing: '-0.02em',
        }}
      >
        Thinking,<br />
        <span style={{ color: 'var(--osd-accent)', fontStyle: 'italic' }}>Fast and Slow</span>
      </h1>
      <p
        style={{
          fontFamily: fontSans,
          fontSize: 34,
          color: colors.muted,
          margin: '0 0 52px 0',
          maxWidth: 1200,
          lineHeight: 1.45,
          fontWeight: 400,
        }}
      >
        How cognitive shortcuts, subconscious biases, and evolutionary heuristics dictate
        every decision we make — and how to outsmart them.
      </p>
      <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 12,
            padding: '12px 24px',
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.border}`,
            borderRadius: 8,
            fontFamily: fontSans,
            fontSize: 22,
            color: 'var(--osd-text)',
            fontWeight: 600,
          }}
        >
          <BrainNeuralSVG size={26} color="var(--osd-accent)" />
          <span style={{ fontFamily: fontSerif, fontSize: 26, fontWeight: 400 }}>Daniel Kahneman & Amos Tversky</span>
        </div>
        <div style={{ fontSize: 20, color: colors.dim, fontFamily: fontMono, letterSpacing: '0.04em' }}>
          DUAL-PROCESS COGNITIVE ARCHITECTURE
        </div>
      </div>
    </div>
    <SlideFooter currentChapter="THE HUMAN OPERATING SYSTEM" />
  </div>
);

// ================= PAGE 2: DUAL SYSTEMS =================
const DualSystems: Page = () => (
  <div style={canvasStyle}>
    <BgDualSystems />
    <TransitionBadge />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader
        badge="THE CORE MODEL"
        title="Two Systems of the Mind"
        subtitle="Our brain uses two distinct operating engines. One runs on pure reflex; the other demands deliberate mental exertion."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 12 }}>
        <SystemCard
          name="System 1"
          label="The Reflexive Engine"
          accentColor="#38bdf8"
          speed="Instant (<100ms)"
          effort="Low (Effortless)"
          icon={<BoltSVG size={24} color="#38bdf8" />}
          characteristics={[
            'Automatic, emotional, associative, subconscious',
            'Recognizes faces, completes phrases like "war and…"',
            'Handles ~95% of our daily choices by default',
            'Prone to systematic cognitive biases and distortions',
          ]}
        />
        <SystemCard
          name="System 2"
          label="The Deliberate Engine"
          accentColor="#fbbf24"
          speed="Slow & Methodical"
          effort="High (Fatiguing)"
          icon={<GearsSVG size={24} color="#fbbf24" />}
          characteristics={[
            'Analytical, conscious, skeptical, rule-governed',
            'Computes 17 × 24, checks parking mirrors, proofreads',
            'Requires active metabolic focus and self-control',
            'Inherently lazy: trusts System 1 until an anomaly appears',
          ]}
        />
      </div>
    </div>
    <SlideFooter currentChapter="SYSTEM 1 VS SYSTEM 2" />
  </div>
);

// ================= PAGE 3: ANCHORING EFFECT =================
const Anchoring: Page = () => (
  <div style={canvasStyle}>
    <BgAnchoring />
    <TransitionBadge />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader
        badge="HEURISTIC 01"
        title="The Anchoring Effect"
        subtitle="When people evaluate an unknown quantity, any initial number mentioned acts as a magnetic anchor, pulling estimates toward it."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: 48, marginTop: 16 }}>
        <div
          style={{
            backgroundColor: colors.cardBg,
            borderRadius: 'var(--osd-radius)',
            border: `1px solid ${colors.border}`,
            padding: '40px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 460,
            boxSizing: 'border-box',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 18, fontWeight: 700, color: 'var(--osd-accent)', marginBottom: 12, fontFamily: fontMono, letterSpacing: '0.08em' }}>
              <AnchorSVG size={24} color="var(--osd-accent)" />
              <span>THE CLASSIC EXPERIMENT</span>
            </div>
            <div style={{ fontSize: 80, fontWeight: 800, fontFamily: fontMono, color: colors.amber, lineHeight: 1, letterSpacing: '-0.02em' }}>
              65% vs 25%
            </div>
            <div style={{ fontSize: 24, fontWeight: 500, color: colors.muted, marginTop: 14, lineHeight: 1.4, fontFamily: fontSans }}>
              Average estimate of African nations in the UN after spinning a rigged wheel of fortune (landing on 65 vs 10).
            </div>
          </div>
          <div
            style={{
              paddingTop: 18,
              borderTop: `1px solid ${colors.border}`,
              fontSize: 22,
              color: 'var(--osd-text)',
              lineHeight: 1.4,
              fontFamily: fontSans,
            }}
          >
            Even when participants knew the number was random, their System 1 adjusted insufficient distance from the anchor.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          <AnchorExample
            domain="REAL ESTATE & CAR SALES"
            anchor="Inflated Initial Listing Price"
            impact="Buyers anchor to the first sticker price, feeling they got a victory after a 5% discount that was pre-calculated."
          />
          <AnchorExample
            domain="SALARY NEGOTIATION"
            anchor="First Number on the Table"
            impact="The first party to propose a range anchors the counter-offer band; bids cluster around the opening figure."
          />
          <AnchorExample
            domain="SAAS PRICING TIERS"
            anchor="The $999 Enterprise Tier Anchor"
            impact="Displaying a massive tier first makes the $99/mo 'Pro' plan look remarkably modest by comparison."
          />
        </div>
      </div>
    </div>
    <SlideFooter currentChapter="ANCHORING BIAS" />
  </div>
);

// ================= PAGE 4: AVAILABILITY HEURISTIC =================
const Availability: Page = () => (
  <div style={canvasStyle}>
    <BgAvailability />
    <TransitionBadge />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader
        badge="HEURISTIC 02"
        title="The Availability Heuristic"
        subtitle="If you can recall an example effortlessly, your brain assumes it occurs frequently. Vividness is mistaken for probability."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 16 }}>
        <RiskCard
          label="HIGH DRAMA (AVAILABILITY SPIKE)"
          stat="1 in 11M"
          subtext="Lifetime risk of dying in a commercial flight crash"
          perception="Media coverage of catastrophes creates vivid, emotionally searing memories, sparking widespread aerophobia."
          color={colors.rose}
          icon={<PlaneSVG size={28} color={colors.rose} />}
        />
        <RiskCard
          label="MUNDANE REALITY (LOW SALIENCE)"
          stat="1 in 101"
          subtext="Lifetime risk of dying in a motor vehicle accident"
          perception="Daily commute accidents rarely make front-page news; low psychological salience breeds dangerous complacency."
          color={colors.emerald}
          icon={<CarSVG size={28} color={colors.emerald} />}
        />
      </div>
      <div
        style={{
          marginTop: 28,
          backgroundColor: colors.cardBg,
          border: `1px solid ${colors.border}`,
          borderRadius: 12,
          padding: '20px 36px',
          display: 'flex',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <BrainNeuralSVG size={30} color="var(--osd-accent)" />
        <div style={{ fontSize: 24, color: colors.muted, lineHeight: 1.35 }}>
          <strong style={{ color: 'var(--osd-text)' }}>Executive Takeaway:</strong> Recent high-profile escalations or customer complaints distort product roadmaps far more than quiet, statistically massive patterns.
        </div>
      </div>
    </div>
    <SlideFooter currentChapter="AVAILABILITY HEURISTIC" />
  </div>
);

// ================= PAGE 5: LOSS AVERSION =================
const LossAversion: Page = () => (
  <div style={canvasStyle}>
    <BgLossAversion />
    <TransitionBadge />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader
        badge="PROSPECT THEORY"
        title="Loss Aversion & Asymmetry"
        subtitle="The psychological pain of losing an asset is more than double the emotional joy of acquiring the exact same asset."
      />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.3fr', gap: 48, marginTop: 16 }}>
        <div
          style={{
            backgroundColor: colors.cardBg,
            borderRadius: 'var(--osd-radius)',
            border: `1px solid ${colors.border}`,
            padding: '44px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: 460,
            boxSizing: 'border-box',
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 8 }}>
              <span style={{ fontSize: 18, fontWeight: 700, color: 'var(--osd-accent)', fontFamily: fontMono, letterSpacing: '0.08em' }}>
                THE PSYCHOLOGICAL RATIO
              </span>
              <ScaleSVG size={36} color={colors.rose} />
            </div>
            <div style={{ fontSize: 110, fontWeight: 800, fontFamily: fontMono, color: colors.rose, lineHeight: 1, letterSpacing: '-0.04em' }}>
              2.5 : 1
            </div>
            <div style={{ fontSize: 26, fontWeight: 600, color: 'var(--osd-text)', marginTop: 16, fontFamily: fontSans }}>
              Losses loom twice as large as gains
            </div>
          </div>
          <div style={{ fontSize: 22, color: colors.muted, lineHeight: 1.4, fontFamily: fontSans }}>
            To accept a coin-flip bet with a $100 penalty on tails, the average person requires at least $250 on heads to say yes.
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <div
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 'var(--osd-radius)',
              border: `1px solid ${colors.border}`,
              padding: '24px 32px',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.amber, marginBottom: 6, fontFamily: fontMono, letterSpacing: '0.08em' }}>
              THE ENDOWMENT EFFECT
            </div>
            <div style={{ fontSize: 24, color: colors.muted, lineHeight: 1.4, fontFamily: fontSans }}>
              Once we take ownership of an object or project, our valuation instantly spikes. We demand more to surrender it than we would ever pay to acquire it.
            </div>
          </div>
          <div
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 'var(--osd-radius)',
              border: `1px solid ${colors.border}`,
              padding: '24px 32px',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.purple, marginBottom: 6, fontFamily: fontMono, letterSpacing: '0.08em' }}>
              SUNK COST FALLACY
            </div>
            <div style={{ fontSize: 24, color: colors.muted, lineHeight: 1.4, fontFamily: fontSans }}>
              Because abandoning a struggling venture codifies a definite loss, decision-makers continue pouring capital into failing initiatives to delay the emotional pain.
            </div>
          </div>
          <div
            style={{
              backgroundColor: colors.cardBg,
              borderRadius: 'var(--osd-radius)',
              border: `1px solid ${colors.border}`,
              padding: '24px 32px',
            }}
          >
            <div style={{ fontSize: 18, fontWeight: 700, color: colors.emerald, marginBottom: 6, fontFamily: fontMono, letterSpacing: '0.08em' }}>
              STATUS QUO BIAS
            </div>
            <div style={{ fontSize: 24, color: colors.muted, lineHeight: 1.4, fontFamily: fontSans }}>
              The potential downside of changing policies feels far riskier than the ongoing quiet bleed of staying the course.
            </div>
          </div>
        </div>
      </div>
    </div>
    <SlideFooter currentChapter="LOSS AVERSION" />
  </div>
);

// ================= PAGE 6: CONFIRMATION BIAS =================
const ConfirmationBias: Page = () => (
  <div style={canvasStyle}>
    <BgConfirmationBias />
    <TransitionBadge />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader
        badge="COGNITIVE DISTORTION"
        title="Confirmation Bias: The Internal Echo"
        subtitle="The human mind acts as a defense attorney for pre-existing beliefs, systematically filtering incoming reality."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 24 }}>
        <Steps>
          <Step duration={240}>
            <BiasStageCard
              stepNum="01"
              title="Biased Search"
              description={<>We only Google queries formulated to validate our hypothesis, asking <em>"Why X works"</em> rather than <em>"Evidence against X"</em>.</>}
              accentColor="var(--osd-accent)"
              icon={<SearchFilterSVG size={32} color="var(--osd-accent)" />}
            />
          </Step>
          <Step duration={240}>
            <BiasStageCard
              stepNum="02"
              title="Biased Interpretation"
              description="Ambiguous data is interpreted as triumphant confirmation. Contradictory evidence is dismissed as an outlier or flawed methodology."
              accentColor={colors.amber}
              icon={<PrismSVG size={32} color={colors.amber} />}
            />
          </Step>
          <Step duration={240}>
            <BiasStageCard
              stepNum="03"
              title="Selective Recall"
              description="Our memory acts like an algorithmic feed: past successes that confirm intuition are vividly recalled; embarrassing misjudgments are quietly purged."
              accentColor={colors.emerald}
              icon={<MemoryArchiveSVG size={32} color={colors.emerald} />}
            />
          </Step>
        </Steps>
      </div>
      <Steps>
        <Step duration={240}>
          <div
            style={{
              marginTop: 28,
              padding: '20px 32px',
              borderLeft: `4px solid ${colors.amber}`,
              backgroundColor: 'rgba(251, 191, 36, 0.06)',
              fontSize: 27,
              color: 'var(--osd-text)',
              fontStyle: 'italic',
              fontFamily: fontSerif,
              lineHeight: 1.35,
            }}
          >
            "What the human being is best at doing is interpreting all new information so that their prior conclusions remain intact." — <span style={{ fontFamily: fontSans, fontStyle: 'normal', fontSize: 22, color: colors.amber }}>Warren Buffett</span>
          </div>
        </Step>
      </Steps>
    </div>
    <SlideFooter currentChapter="CONFIRMATION BIAS" />
  </div>
);

// ================= PAGE 7: CHOICE ARCHITECTURE =================
const ChoiceArchitecture: Page = () => (
  <div style={canvasStyle}>
    <BgChoiceArchitecture />
    <TransitionBadge />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader
        badge="PRACTICAL APPLICATION"
        title="Choice Architecture & Nudges"
        subtitle="Rather than relying on scarce willpower, design environments where the default path is the optimal choice."
      />
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 12 }}>
        <NudgeCard
          number="01"
          title="Default Bias"
          mechanism="People overwhelmingly stick to pre-selected options because opting out demands active System 2 energy."
          example="Organ donation rates jumped from 15% to 99% simply by shifting from Opt-In to Opt-Out."
          icon={<ToggleSVG size={22} color="var(--osd-accent)" />}
        />
        <NudgeCard
          number="02"
          title="Framing Effects"
          mechanism="Information framing dictates emotional response without altering the mathematical probabilities."
          example="A surgery framed as '90% survival rate' is embraced far more than '10% mortality rate'."
          icon={<FramingSVG size={22} color={colors.amber} />}
        />
        <NudgeCard
          number="03"
          title="Cognitive Friction"
          mechanism="Inserting deliberate friction interrupts impulsive System 1 actions and engages analytical evaluation."
          example="A mandatory 24-hour cooling-off window before confirming high-stakes irreversible actions."
          icon={<FrictionClockSVG size={22} color={colors.purple} />}
        />
        <NudgeCard
          number="04"
          title="Salient Feedback"
          mechanism="Transforming abstract long-term consequences into immediate sensory cues shapes behavior instantly."
          example="Real-time ambient color indicators for household energy draw reduce waste by 18%."
          icon={<MeterPulseSVG size={22} color={colors.emerald} />}
        />
      </div>
    </div>
    <SlideFooter currentChapter="NUDGE THEORY" />
  </div>
);

// ================= PAGE 8: SUMMARY & HABITS =================
const Closing: Page = () => (
  <div style={canvasStyle}>
    <BgClosing />
    <TransitionBadge />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <PageHeader
        badge="ACTIONABLE FRAMEWORK"
        title="Cognitive Hygiene: Three Disciplines"
        subtitle="High-performing leaders don't possess fewer biases — they build institutional guardrails that catch them before catastrophe."
      />
      <div style={{ display: 'flex', gap: 32, marginTop: 24 }}>
        <HabitCard
          stepNum="01"
          name="The Pre-Mortem"
          question="Imagine we are 12 months in the future, and this project was an unmitigated disaster. What killed it?"
          action="Legitimizes dissenting opinions and disrupts optimistic groupthink before contracts are signed."
          icon={<AlertPreMortemSVG size={30} color={colors.amber} />}
        />
        <HabitCard
          stepNum="02"
          name="The Outside View"
          question="What is the base-rate outcome for similar initiatives across our entire industry?"
          action="Forces System 2 to anchor on hard historical statistics rather than internal wishful thinking."
          icon={<CompassOutsideSVG size={30} color="var(--osd-accent)" />}
        />
        <HabitCard
          stepNum="03"
          name="Appoint Red Teams"
          question="Whose explicit job is to construct the strongest argument against this consensus?"
          action="Removes social penalties for disagreeing, exposing flawed assumptions before markets do."
          icon={<ShieldRedTeamSVG size={30} color={colors.rose} />}
        />
      </div>
      <div
        style={{
          marginTop: 36,
          textAlign: 'center',
          fontSize: 30,
          color: colors.muted,
          fontWeight: 400,
          fontFamily: fontSerif,
          fontStyle: 'italic',
          lineHeight: 1.4,
        }}
      >
        "Organizations are better than individuals at avoiding errors, because they think more slowly and have the power to impose orderly procedures." — <span style={{ fontFamily: fontSans, fontStyle: 'normal', fontSize: 22, color: 'var(--osd-accent)', fontWeight: 600 }}>Daniel Kahneman</span>
      </div>
    </div>
    <SlideFooter currentChapter="EXECUTIVE SUMMARY" />
  </div>
);

// ================= SPEAKER NOTES =================
export const notes: (string | undefined)[] = [
  // Page 1: Cover
  `Welcome everyone. Today we are exploring the architecture of human judgment.
We tend to believe that our choices are the product of calm, conscious deliberation.
However, decades of cognitive psychology — spearheaded by Daniel Kahneman and Amos Tversky — prove that our minds rely on rapid, invisible heuristics that systematically distort how we view reality. Let's examine how this machinery works.`,

  // Page 2: Dual Systems
  `Let's begin with the core model: System 1 versus System 2.
System 1 is fast, automatic, emotional, and consumes almost no metabolic energy. It reads facial expressions and swerves around hazards.
System 2 is deliberative, analytical, and effortful — think of calculating 17 times 24.
Here is the crucial takeaway: System 1 runs 95% of our day. System 2 is lazy and routinely endorses System 1's intuitions without verification.`,

  // Page 3: Anchoring
  `Our first major heuristic is the Anchoring Effect.
When people make numerical estimates, whatever number they encountered first acts as a cognitive gravity well.
In Kahneman's famous experiment, spinning a wheel rigged to land on 65 caused participants to guess 45% for African UN representation, compared to 25% when the wheel landed on 10.
We see this everywhere: in luxury retail, car dealerships, and startup funding negotiations. The first number frames all subsequent adjustments.`,

  // Page 4: Availability
  `Next is the Availability Heuristic.
Our brains substitute an easy question for a hard one: instead of calculating actual statistical probability, we ask 'how easily does an example come to mind?'
A single plane crash creates vivid, terrifying imagery that lingers in memory, triggering aerophobia. Meanwhile, automobile accidents happen constantly with low dramatic coverage, causing us to drastically underestimate our everyday risk.`,

  // Page 5: Loss Aversion
  `Prospect Theory earned Kahneman the Nobel Prize in Economic Sciences.
Its centerpiece is Loss Aversion: the psychological pain of losing $100 is roughly two-and-a-half times more intense than the joy of gaining $100.
This asymmetry explains the Sunk Cost Fallacy: leaders throw good money after bad simply to avoid crystallizing the agony of an admitted loss. It also creates intense Status Quo Bias across enterprise organizations.`,

  // Page 6: Confirmation Bias
  `Confirmation bias is the immune system of existing beliefs.
It operates in three distinct phases: we search for affirming evidence, we interpret neutral or ambiguous facts as proof of our genius, and our memory conveniently purges contradictory misfires.
As Warren Buffett famously observed, human beings are world champions at reinterpreting new facts to leave old conclusions pristine.`,

  // Page 7: Choice Architecture
  `Knowing our flaws is not enough; willpower is a depleting resource.
The real solution is Choice Architecture, popularized by Richard Thaler and Cass Sunstein.
If you know System 1 defaults to the path of least resistance, change the defaults. Make retirement savings automatic. Insert cooling-off friction before high-stakes irreversible decisions. Make the invisible costs sensory and salient.`,

  // Page 8: Closing
  `To close: you cannot eliminate cognitive bias individually, but you can build organizational hygiene that catches errors before they compound.
Adopt three team rituals:
1. The Pre-Mortem: ask what killed the project assuming it failed.
2. The Outside View: look at industry base rates, not just your internal narrative.
3. Appoint a Red Team: mandate that someone attack the plan.
Thank you!`,
];

export const meta: SlideMeta = {
  title: 'Cognitive Biases & The Architecture of Decision Making',
  createdAt: '2026-10-11T06:34:10.004Z',
};

export default [
  Cover,
  DualSystems,
  Anchoring,
  Availability,
  LossAversion,
  ConfirmationBias,
  ChoiceArchitecture,
  Closing,
] satisfies Page[];
