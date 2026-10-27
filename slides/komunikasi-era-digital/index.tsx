import { type DesignSystem, type Page, type SlideMeta, useSlidePageNumber } from '@open-slide/core';

// Local mirror of the framework's `SlideTransition` contract (see
// `.claude/skills/slide-authoring/references/transitions.md`) — used for
// typing the house transition family below.
type TransitionPhase = {
  keyframes: Record<string, unknown>[];
  duration?: number;
  easing?: string;
  delay?: number;
};
type SlideTransition = {
  duration: number;
  easing?: string;
  enter?: TransitionPhase;
  exit?: TransitionPhase;
  throughBackground?: boolean;
};
// Per-page overrides ride on a property of the page component.
type PageWithTransition = Page & { transition?: SlideTransition };
import type { CSSProperties, ReactElement, ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Web fonts injection: Plus Jakarta Sans (display + body) + JetBrains Mono
// ---------------------------------------------------------------------------
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap';
const FONT_LINK_ID = 'osd-webfont-komdig';

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

// ---------------------------------------------------------------------------
// Keyframes injected once per deck (scoped names with kd- prefix)
// ---------------------------------------------------------------------------
const STYLE_ID = 'osd-keyframes-komdig';
const KEYFRAMES = `
@keyframes kd-pulse-dot { 0%,100% { opacity: 0.35; transform: scale(0.9); } 50% { opacity: 1; transform: scale(1.15); } }
@keyframes kd-float-y { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-10px); } }
`;
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

export const design: DesignSystem = {
  palette: {
    bg: '#f7fafc', // Cool off-white canvas
    text: '#0f172a', // Deep slate ink
    accent: '#0f766e', // Teal — digital communication
  },
  fonts: {
    display: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
    body: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 110,
    body: 32,
  },
  radius: 18,
};

// Extra colors outside the DesignSystem shape stay as plain consts.
const c = {
  tealDark: '#115e59',
  tealMid: '#0d9488',
  tealSoft: '#ccfbf1',
  tealBorder: '#99f6e4',
  blue: '#1d4ed8',
  blueSoft: '#dbeafe',
  blueBorder: '#bfdbfe',
  amber: '#b45309',
  amberSoft: '#fef3c7',
  rose: '#be123c',
  roseSoft: '#ffe4e6',
  ink: '#0f172a',
  body: '#334155',
  muted: '#64748b',
  faint: '#94a3b8',
  line: '#e2e8f0',
  card: '#ffffff',
  cardShadow: '0 10px 28px -10px rgba(15, 118, 110, 0.14), 0 2px 8px -2px rgba(15, 23, 42, 0.05)',
  cardShadowLg: '0 22px 44px -14px rgba(15, 118, 110, 0.18), 0 4px 12px -2px rgba(15, 23, 42, 0.06)',
};

const fontMono = '"JetBrains Mono", ui-monospace, monospace';

// ---------------------------------------------------------------------------
// HOUSE TRANSITION FAMILY — one DNA, three members:
//   RISE (house default) · BLOOM (cover) · DISSOLVE (final page)
//   All hold the outgoing page and fade the incoming one in on top.
// ---------------------------------------------------------------------------
const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';
const HOLD = [{ opacity: 1 }, { opacity: 1 }];

/** RISE — house transition: quiet 6 px Y-rise + fade. Module default. */
export const transition: SlideTransition = {
  duration: 260,
  exit: { duration: 260, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 260,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(6px)' },
      { opacity: 1, transform: 'translateY(0)' },
    ],
  },
};

/** BLOOM — cover page: materializes in place, scale 0.97 → 1. */
const bloom: SlideTransition = {
  duration: 240,
  exit: { duration: 240, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 240,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'scale(0.97)' },
      { opacity: 1, transform: 'scale(1)' },
    ],
  },
};

/** DISSOLVE — pure opacity, reserved for the closing page. */
const dissolve: SlideTransition = {
  duration: 240,
  exit: { duration: 240, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 240,
    easing: EASE_OUT,
    keyframes: [{ opacity: 0 }, { opacity: 1 }],
  },
};

// ---------------------------------------------------------------------------
// Base canvas + shared building blocks
// ---------------------------------------------------------------------------
const baseCanvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '64px 110px 96px',
  backgroundImage:
    'radial-gradient(1100px circle at 96% 6%, rgba(204,251,241,0.55), transparent 60%), radial-gradient(900px circle at 3% 95%, rgba(219,234,254,0.5), transparent 55%)',
};

// Decorative dotted "network" corner motif (pure CSS, no assets)
const CornerDots = ({ color = c.tealBorder }: { color?: string }): ReactElement => (
  <div
    style={{
      position: 'absolute',
      top: 44,
      right: 52,
      width: 180,
      height: 120,
      opacity: 0.7,
      pointerEvents: 'none',
      backgroundImage: `radial-gradient(${color} 2.5px, transparent 2.5px)`,
      backgroundSize: '24px 24px',
    }}
  />
);

const Eyebrow = ({
  children,
  tone = 'teal',
}: {
  children: ReactNode;
  tone?: 'teal' | 'blue' | 'amber';
}): ReactElement => {
  const tones = {
    teal: { bg: c.tealSoft, border: c.tealBorder, text: c.tealDark },
    blue: { bg: c.blueSoft, border: c.blueBorder, text: c.blue },
    amber: { bg: c.amberSoft, border: '#fde68a', text: c.amber },
  } as const;
  const t = tones[tone];
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: t.bg,
        border: `1.5px solid ${t.border}`,
        borderRadius: 26,
        padding: '7px 20px',
        marginBottom: 14,
      }}
    >
      <div
        style={{
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: t.text,
          animation: 'kd-pulse-dot 2.4s ease-in-out infinite',
        }}
      />
      <span
        style={{
          fontSize: 19,
          fontWeight: 700,
          color: t.text,
          letterSpacing: '0.09em',
          textTransform: 'uppercase',
        }}
      >
        {children}
      </span>
    </div>
  );
};

const SlideHeader = ({
  category,
  title,
  subtitle,
  tone = 'teal',
}: {
  category: string;
  title: string;
  subtitle?: string;
  tone?: 'teal' | 'blue' | 'amber';
}): ReactElement => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: 34,
      zIndex: 1,
      maxWidth: 1560,
    }}
  >
    <Eyebrow tone={tone}>{category}</Eyebrow>
    <h2
      style={{
        fontSize: 54,
        fontWeight: 800,
        color: c.ink,
        margin: '0 0 8px 0',
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p style={{ fontSize: 25, color: c.body, margin: 0, fontWeight: 500, maxWidth: 1320, lineHeight: 1.4 }}>
        {subtitle}
      </p>
    )}
  </div>
);

const SlideFooter = ({ chapter }: { chapter?: string }): ReactElement => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 26,
        left: 110,
        right: 110,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 17,
        color: c.muted,
        zIndex: 1,
        borderTop: `1px solid ${c.line}`,
        paddingTop: 14,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 700, color: c.tealDark }}>Pengantar Teknologi Komputer &amp; Informatika</span>
        <span style={{ color: c.faint }}>|</span>
        <span style={{ color: c.body }}>{chapter ?? 'Komunikasi di Era Digital'}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: fontMono, fontWeight: 600 }}>
        <span style={{ color: c.tealDark, fontWeight: 700 }}>{String(current).padStart(2, '0')}</span>
        <span style={{ color: c.faint }}>/</span>
        <span>{String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

// ---------------------------------------------------------------------------
// SVG icons (stroke-based, no emojis)
// ---------------------------------------------------------------------------
type IconProps = { size?: number };
const svgBase = (size: number) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  fill: 'none' as const,
  stroke: 'currentColor',
  strokeWidth: 2,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
});

const MailIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);
const ChatIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);
const VideoIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
    <rect x="2" y="6" width="14" height="12" rx="2" />
  </svg>
);
const CloudIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);
const BrainIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
  </svg>
);
const ComputerIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
);
const GlobeIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);
const ShieldIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <circle cx="12" cy="11" r="2" />
    <path d="M12 13v2" />
  </svg>
);
const LockIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);
const ArrowRightIcon = ({ size = 20, color = c.tealDark }: IconProps & { color?: string }): ReactElement => (
  <svg {...svgBase(size)} stroke={color} strokeWidth={2.5}>
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);
const CheckIcon = ({ size = 24, color = c.tealDark }: IconProps & { color?: string }): ReactElement => (
  <svg {...svgBase(size)} stroke={color} strokeWidth={2.5}>
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);
const XIcon = ({ size = 24, color = c.rose }: IconProps & { color?: string }): ReactElement => (
  <svg {...svgBase(size)} stroke={color} strokeWidth={2.5}>
    <path d="M18 6 6 18M6 6l12 12" />
  </svg>
);
const AlertIcon = ({ size = 24, color = c.rose }: IconProps & { color?: string }): ReactElement => (
  <svg {...svgBase(size)} stroke={color}>
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);
const UsersIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);
const ServerIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);
const PhoneIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);
const CapIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);
const BriefcaseIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);
const StoreIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);
const SparkleIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);
const TranslateIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M19 13h6" />
  </svg>
);
const MicIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v3" />
  </svg>
);
const VrIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M3 8h18a1 1 0 0 1 1 1v6a1 1 0 0 1-1 1h-5.5l-1.8-2.2a2 2 0 0 0-3.4 0L8 16H3a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1Z" />
  </svg>
);
const BoltIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" />
  </svg>
);
const DocIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
  </svg>
);
const EyeIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7Z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);
const ScaleIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M12 3v18M8 21h8M12 5 6 8M12 5l6 3" />
    <path d="M3 13a3 3 0 0 0 6 0L6 8Z" />
    <path d="M15 13a3 3 0 0 0 6 0l-3-5Z" />
  </svg>
);
const KeyboardIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <rect width="20" height="14" x="2" y="5" rx="2" />
    <path d="M6 8h.01M10 8h.01M14 8h.01M18 8h.01M6 12h.01M10 12h.01M14 12h.01M18 12h.01M8 16h8" />
  </svg>
);
const BinaryIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <rect x="3" y="3" width="6" height="6" rx="1" />
    <path d="M15 3v6M15 15v6M9 21h12M3 15h6" />
    <circle cx="18" cy="6" r="3" />
    <circle cx="6" cy="18" r="3" />
  </svg>
);
const CogIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <circle cx="12" cy="12" r="3" />
    <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.6a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1Z" />
  </svg>
);
const WifiIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M5 12.55a11 11 0 0 1 14.08 0M1.42 9a16 16 0 0 1 21.16 0M8.53 16.11a6 6 0 0 1 6.95 0" />
    <line x1="12" y1="20" x2="12.01" y2="20" />
  </svg>
);
const MonitorScreenIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" y1="21" x2="16" y2="21" />
    <line x1="12" y1="17" x2="12" y2="21" />
    <path d="M7 9h6" />
  </svg>
);
const HeartIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
  </svg>
);
const FingerprintIcon = ({ size = 26 }: IconProps): ReactElement => (
  <svg {...svgBase(size)}>
    <path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 4" />
    <path d="M14 13.12c0 2.38 0 6.38-1 8.88" />
    <path d="M17.29 21.02c.12-.6.43-2.3.5-3.02" />
    <path d="M2 12a10 10 0 0 1 18-6" />
    <path d="M2 16h.01" />
    <path d="M21.8 16c.2-2 .131-5.354 0-6" />
    <path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2" />
    <path d="M8.67 19c.333-1.333.86-3.5 1-4.5" />
    <path d="M9 6.8a6 6 0 0 1 9 5.2v2" />
  </svg>
);

const IconChip = ({
  children,
  bg = c.tealSoft,
  border = c.tealBorder,
  fg = c.tealDark,
  size = 54,
}: {
  children: ReactNode;
  bg?: string;
  border?: string;
  fg?: string;
  size?: number;
}): ReactElement => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.3,
      backgroundColor: bg,
      border: `1.5px solid ${border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      color: fg,
    }}
  >
    {children}
  </div>
);

// Generic content card used across grid pages
const InfoCard = ({
  icon,
  number,
  title,
  desc,
  tag,
  highlight = false,
  tint,
}: {
  icon: ReactNode;
  number?: string;
  title: string;
  desc: string;
  tag?: string;
  highlight?: boolean;
  tint?: { bg: string; border: string; fg: string };
}): ReactElement => {
  const t = tint ?? { bg: c.tealSoft, border: c.tealBorder, fg: c.tealDark };
  return (
    <div
      style={{
        backgroundColor: highlight ? t.bg : c.card,
        border: `1.5px solid ${highlight ? t.border : c.line}`,
        borderRadius: 18,
        padding: '26px 28px',
        boxShadow: highlight ? c.cardShadowLg : c.cardShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: 13,
        position: 'relative',
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <IconChip size={50} bg={highlight ? '#ffffff' : t.bg} border={t.border} fg={t.fg}>
          {icon}
        </IconChip>
        {number && (
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 19,
              fontWeight: 800,
              color: t.fg,
              backgroundColor: highlight ? '#ffffff' : t.bg,
              padding: '4px 12px',
              borderRadius: 12,
              border: `1px solid ${t.border}`,
            }}
          >
            {number}
          </span>
        )}
      </div>
      <div>
        <h3 style={{ fontSize: 27, fontWeight: 700, color: c.ink, margin: '0 0 7px 0', lineHeight: 1.25 }}>
          {title}
        </h3>
        <p style={{ fontSize: 20, color: c.body, margin: 0, lineHeight: 1.45, fontWeight: 500 }}>{desc}</p>
      </div>
      {tag && (
        <div
          style={{
            marginTop: 'auto',
            fontSize: 16,
            fontWeight: 600,
            color: t.fg,
            display: 'flex',
            alignItems: 'center',
            gap: 7,
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: t.fg }} />
          {tag}
        </div>
      )}
    </div>
  );
};

// Small pill row listing concrete examples
const Pills = ({ items, fg = c.tealDark }: { items: string[]; fg?: string }): ReactElement => (
  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
    {items.map((it) => (
      <span
        key={it}
        style={{
          fontFamily: fontMono,
          fontSize: 16,
          fontWeight: 600,
          color: fg,
          backgroundColor: '#ffffff',
          border: `1px solid ${c.line}`,
          borderRadius: 10,
          padding: '5px 12px',
        }}
      >
        {it}
      </span>
    ))}
  </div>
);

// ===========================================================================
// SLIDE 1 — COVER  (transition: BLOOM)
// ===========================================================================
const S01Cover: PageWithTransition = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <div
      style={{
        zIndex: 1,
        maxWidth: 1460,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Eyebrow>Mata Kuliah · Pengantar Teknologi Komputer dan Informatika</Eyebrow>
      <h1
        style={{
          fontSize: 80,
          fontWeight: 800,
          color: c.ink,
          margin: '18px 0 22px 0',
          lineHeight: 1.14,
          letterSpacing: '-0.03em',
        }}
      >
        Penerapan Teknologi Komputer{' '}
        <span
          style={{
            backgroundImage: `linear-gradient(115deg, ${c.tealDark}, ${c.blue})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          dalam Bidang Komunikasi
        </span>
      </h1>
      <p style={{ fontSize: 31, color: c.body, maxWidth: 1180, margin: '0 0 44px 0', fontWeight: 500, lineHeight: 1.5 }}>
        Peran, Manfaat, Tantangan, dan Perkembangan Komunikasi di Era Digital
      </p>

      {/* Mini network motif: keyboard → data → wifi → server → screen */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 44 }}>
        <IconChip size={62} bg={c.blueSoft} border={c.blueBorder} fg={c.blue}>
          <KeyboardIcon size={30} />
        </IconChip>
        <ArrowRightIcon size={26} />
        <IconChip size={62} bg={c.tealSoft} border={c.tealBorder} fg={c.tealDark}>
          <BinaryIcon size={30} />
        </IconChip>
        <ArrowRightIcon size={26} />
        <IconChip size={62} bg={c.tealSoft} border={c.tealBorder} fg={c.tealDark}>
          <WifiIcon size={30} />
        </IconChip>
        <ArrowRightIcon size={26} />
        <IconChip size={62} bg={c.tealSoft} border={c.tealBorder} fg={c.tealDark}>
          <ServerIcon size={30} />
        </IconChip>
        <ArrowRightIcon size={26} />
        <IconChip size={62} bg={c.amberSoft} border="#fcd34d" fg={c.amber}>
          <MonitorScreenIcon size={30} />
        </IconChip>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 22, width: '100%', maxWidth: 1320 }}>
        {[
          { icon: <GlobeIcon size={23} />, label: 'Cakupan', value: 'Koneksi Global' },
          { icon: <ChatIcon size={23} />, label: 'Kecepatan', value: 'Pesan Real-Time' },
          { icon: <ShieldIcon size={23} />, label: 'Keamanan', value: 'Enkripsi & Privasi' },
          { icon: <BrainIcon size={23} />, label: 'Masa Depan', value: 'AI & Otomatisasi' },
        ].map((b) => (
          <div
            key={b.label}
            style={{
              backgroundColor: 'rgba(255,255,255,0.94)',
              border: `1.5px solid ${c.line}`,
              borderRadius: 16,
              padding: '18px 22px',
              boxShadow: c.cardShadow,
              display: 'flex',
              alignItems: 'center',
              gap: 14,
              textAlign: 'left',
            }}
          >
            <IconChip size={46}>{b.icon}</IconChip>
            <div>
              <div style={{ fontSize: 15, color: c.muted, fontWeight: 600 }}>{b.label}</div>
              <div style={{ fontSize: 21, fontWeight: 700, color: c.ink }}>{b.value}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
    <SlideFooter chapter="Pengantar & Gambaran Umum" />
  </div>
);
S01Cover.transition = bloom;

// ===========================================================================
// SLIDE 2 — MENGAPA CARA KITA BERKOMUNIKASI BERUBAH?
// ===========================================================================
const S02Evolusi: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Latar Belakang"
      title="Mengapa Cara Kita Berkomunikasi Berubah?"
      subtitle="Tiga besar zaman pertukaran pesan manusia — dari kertas ke kabel, dari kabel ke awan, dari awan ke kecerdasan buatan."
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, width: '100%', maxWidth: 1660, zIndex: 1 }}>
      <InfoCard
        icon={<MailIcon size={26} />}
        number="01"
        title="Dahulu"
        desc="Komunikasi terikat jarak dan waktu fisik; pesan bergerak secepat kurir membawanya."
        tag="Era pra-digital"
      />
      <InfoCard
        icon={<CloudIcon size={26} />}
        number="02"
        title="Era Komputer & Internet"
        desc="Komputer dan jaringan mengubah pesan menjadi data yang melintas dunia dalam hitungan detik."
        tag="Era digital"
        highlight
      />
      <InfoCard
        icon={<BrainIcon size={26} />}
        number="03"
        title="Era Artificial Intelligence"
        desc="Mesin tidak hanya menghantarkan pesan, tetapi juga memahami, menerjemahkan, dan menghasilkan pesan."
        tag="Era cerdas"
        tint={{ bg: c.blueSoft, border: c.blueBorder, fg: c.blue }}
      />
    </div>
    {/* Example pills under each era */}
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, width: '100%', maxWidth: 1660, zIndex: 1, marginTop: 24 }}>
      <Pills items={['Surat', 'Pertemuan Langsung', 'Telegram', 'Telepon']} />
      <Pills items={['Email', 'Chatting', 'Video Conference', 'Media Sosial', 'Cloud']} />
      <Pills items={['Chatbot', 'Terjemahan Otomatis', 'Speech Recognition', 'AI-Assisted']} fg={c.blue} />
    </div>
    <SlideFooter chapter="Latar Belakang Perubahan" />
  </div>
);

// ===========================================================================
// SLIDE 3 — KONSEP DASAR TEKNOLOGI KOMUNIKASI
// ===========================================================================
const S03Konsep: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Landasan Teori"
      title="Konsep Dasar Teknologi Komunikasi"
      subtitle="Empat istilah kunci yang menjadi fondasi pemahaman seluruh materi ini."
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, width: '100%', maxWidth: 1560, zIndex: 1 }}>
      <InfoCard icon={<UsersIcon size={26} />} number="1" title="Komunikasi" desc="Proses penyampaian informasi atau pesan dari pengirim kepada penerima melalui suatu media." />
      <InfoCard icon={<ComputerIcon size={26} />} number="2" title="Komputer" desc="Perangkat elektronik yang dapat menerima, mengolah, menyimpan, dan menghasilkan data/informasi." />
      <InfoCard icon={<WifiIcon size={26} />} number="3" title="Teknologi Komunikasi" desc="Teknologi yang digunakan untuk membantu proses penyampaian dan pertukaran informasi." />
      <InfoCard
        icon={<GlobeIcon size={26} />}
        number="4"
        title="Penerapan Komputer dalam Komunikasi"
        desc="Pemanfaatan komputer dan teknologi pendukungnya untuk mengolah, mengirim, menerima, menyimpan, dan menyajikan informasi."
        highlight
      />
    </div>
    <SlideFooter chapter="Konsep Dasar" />
  </div>
);

// ===========================================================================
// SLIDE 4 — EVOLUSI KOMUNIKASI BERBASIS TEKNOLOGI (timeline)
// ===========================================================================
const evolutionSteps = [
  { n: '1', label: 'Surat', icon: <MailIcon size={24} /> },
  { n: '2', label: 'Telegram', icon: <BoltIcon size={24} /> },
  { n: '3', label: 'Telepon', icon: <PhoneIcon size={24} /> },
  { n: '4', label: 'Komputer & Email', icon: <ComputerIcon size={24} /> },
  { n: '5', label: 'Internet & Chat', icon: <ChatIcon size={24} /> },
  { n: '6', label: 'Smartphone & Medsos', icon: <UsersIcon size={24} /> },
  { n: '7', label: 'Video Conf & Cloud', icon: <VideoIcon size={24} /> },
  { n: '8', label: 'AI Communication', icon: <BrainIcon size={24} />, hot: true },
];

const S04Timeline: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Garis Waktu"
      title="Evolusi Komunikasi Berbasis Teknologi"
      subtitle="Delapan tahapan lompatan besar manusia dalam bertukar pesan lintas generasi."
    />
    <div style={{ width: '100%', maxWidth: 1660, zIndex: 1 }}>
      {/* Row 1 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {evolutionSteps.slice(0, 4).map((s) => (
          <div
            key={s.n}
            style={{
              backgroundColor: c.card,
              border: `1.5px solid ${c.line}`,
              borderRadius: 16,
              padding: '24px 22px',
              boxShadow: c.cardShadow,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: fontMono, fontSize: 16, fontWeight: 800, color: c.tealDark, backgroundColor: c.tealSoft, padding: '4px 11px', borderRadius: 9 }}>
                TAHAP {s.n}
              </span>
              <span style={{ color: c.tealDark }}>{s.icon}</span>
            </div>
            <h4 style={{ fontSize: 25, fontWeight: 700, margin: '2px 0 0', color: c.ink }}>{s.label}</h4>
          </div>
        ))}
      </div>
      {/* Connector */}
      <div style={{ display: 'flex', justifyContent: 'center', padding: '16px 0' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: c.tealDark }}>
          <div style={{ width: 140, height: 2, backgroundColor: c.tealBorder }} />
          <ArrowRightIcon size={24} />
          <span style={{ fontSize: 16, fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: c.muted }}>
            percepatan eksponensial
          </span>
          <ArrowRightIcon size={24} />
          <div style={{ width: 140, height: 2, backgroundColor: c.tealBorder }} />
        </div>
      </div>
      {/* Row 2 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18 }}>
        {evolutionSteps.slice(4).map((s) => (
          <div
            key={s.n}
            style={{
              backgroundColor: s.hot ? c.tealSoft : c.card,
              border: `1.5px solid ${s.hot ? c.tealBorder : c.line}`,
              borderRadius: 16,
              padding: '24px 22px',
              boxShadow: s.hot ? c.cardShadowLg : c.cardShadow,
              display: 'flex',
              flexDirection: 'column',
              gap: 10,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontFamily: fontMono, fontSize: 16, fontWeight: 800, color: c.tealDark, backgroundColor: s.hot ? '#ffffff' : c.tealSoft, padding: '4px 11px', borderRadius: 9 }}>
                TAHAP {s.n}
              </span>
              <span style={{ color: c.tealDark }}>{s.icon}</span>
            </div>
            <h4 style={{ fontSize: 25, fontWeight: 700, margin: '2px 0 0', color: c.ink }}>{s.label}</h4>
          </div>
        ))}
      </div>
    </div>
    <SlideFooter chapter="Garis Waktu Evolusi" />
  </div>
);

// ===========================================================================
// SLIDE 5 — CARA KOMPUTER MEMUNGKINKAN KOMUNIKASI (7 steps)
// ===========================================================================
const pipeline = [
  { t: 'Mengetik Pesan', d: 'Pengguna mengetik pesan pada perangkat.', icon: <KeyboardIcon size={24} /> },
  { t: 'Konversi Digital', d: 'Perangkat mengubah pesan menjadi data digital.', icon: <BinaryIcon size={24} /> },
  { t: 'Pemrosesan Lokal', d: 'Data diproses oleh aplikasi dan perangkat keras.', icon: <CogIcon size={24} /> },
  { t: 'Transmisi Jaringan', d: 'Data dikirim melalui jaringan seluler atau internet.', icon: <WifiIcon size={24} /> },
  { t: 'Server & Routing', d: 'Server memproses dan meneruskan data.', icon: <ServerIcon size={24} /> },
  { t: 'Penerima Data', d: 'Perangkat penerima menerima data digital.', icon: <PhoneIcon size={24} /> },
  { t: 'Pesan Ditampilkan', d: 'Pesan ditampilkan secara utuh kepada penerima.', icon: <MonitorScreenIcon size={24} /> },
];

const S05Pipeline: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Cara Kerja"
      title="Cara Komputer Memungkinkan Komunikasi"
      subtitle="Tujuh tahap perjalanan sebuah pesan digital — terjadi hanya dalam sepersekian detik."
    />
    <div style={{ display: 'flex', alignItems: 'stretch', gap: 10, width: '100%', maxWidth: 1700, zIndex: 1 }}>
      {pipeline.map((p, i) => (
        <div key={p.t} style={{ display: 'contents' }}>
          <div
            style={{
              flex: 1,
              backgroundColor: i === 3 || i === 4 ? c.tealSoft : c.card,
              border: `1.5px solid ${i === 3 || i === 4 ? c.tealBorder : c.line}`,
              borderRadius: 16,
              padding: '24px 14px',
              boxShadow: c.cardShadow,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 12,
            }}
          >
            <div
              style={{
                fontFamily: fontMono,
                fontSize: 17,
                fontWeight: 800,
                color: '#ffffff',
                backgroundColor: c.tealDark,
                width: 40,
                height: 40,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              {i + 1}
            </div>
            <span style={{ color: c.tealDark }}>{p.icon}</span>
            <h4 style={{ fontSize: 20, fontWeight: 700, margin: 0, color: c.ink, lineHeight: 1.25 }}>{p.t}</h4>
            <p style={{ fontSize: 16, color: c.body, margin: 0, lineHeight: 1.45, fontWeight: 500 }}>{p.d}</p>
          </div>
          {i < pipeline.length - 1 && (
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <ArrowRightIcon size={20} />
            </div>
          )}
        </div>
      ))}
    </div>
    <div
      style={{
        marginTop: 30,
        zIndex: 1,
        fontSize: 21,
        fontWeight: 600,
        color: c.tealDark,
        backgroundColor: c.tealSoft,
        border: `1px solid ${c.tealBorder}`,
        borderRadius: 14,
        padding: '14px 28px',
      }}
    >
      Inti proses: pesan → data → jaringan → data → pesan. Komputasi hadir di setiap panahnya.
    </div>
    <SlideFooter chapter="Mekanisme Pesan Digital" />
  </div>
);

// ===========================================================================
// SLIDE 6 — BENTUK PENERAPAN KOMPUTER DALAM KOMUNIKASI
// ===========================================================================
const S06Bentuk: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Penerapan"
      title="Bentuk Penerapan Komputer dalam Komunikasi"
      subtitle="Empat kategori utama sesuai konteks dan kebutuhan para penggunanya."
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, width: '100%', maxWidth: 1560, zIndex: 1 }}>
      <InfoCard
        icon={<ChatIcon size={26} />}
        number="1"
        title="Komunikasi Personal"
        desc="Pesan instan satu-lawan-satu maupun grup untuk hubungan sehari-hari."
        tag="WhatsApp · Telegram"
      />
      <InfoCard
        icon={<BriefcaseIcon size={26} />}
        number="2"
        title="Komunikasi Formal & Bisnis"
        desc="Korespondensi resmi dan rapat jarak jauh lintas organisasi dan wilayah."
        tag="Email · Zoom · MS Teams"
        highlight
      />
      <InfoCard
        icon={<CapIcon size={26} />}
        number="3"
        title="Komunikasi Pendidikan"
        desc="Material ajar, tugas, kuis, dan forum diskusi terpusat dalam satu platform."
        tag="Learning Management System"
        tint={{ bg: c.blueSoft, border: c.blueBorder, fg: c.blue }}
      />
      <InfoCard
        icon={<UsersIcon size={26} />}
        number="4"
        title="Komunikasi Sosial & Publik"
        desc="Distribusi informasi massal dan interaksi komunitas daring lintas batas."
        tag="Media sosial · Forum"
        tint={{ bg: c.amberSoft, border: '#fcd34d', fg: c.amber }}
      />
    </div>
    <SlideFooter chapter="Bentuk Penerapan" />
  </div>
);

// ===========================================================================
// SLIDE 7 — PENERAPAN DALAM AKTIVITAS SEHARI-HARI
// ===========================================================================
const S07SehariHari: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Konteks Nyata"
      title="Penerapan dalam Aktivitas Sehari-hari"
      subtitle="Di empat ruang kehidupan inilah dampak komputer dalam komunikasi paling sering kita rasakan."
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 22, width: '100%', maxWidth: 1560, zIndex: 1 }}>
      <InfoCard
        icon={<CapIcon size={26} />}
        number="1"
        title="Pendidikan"
        desc="Pembelajaran online, pengumpulan tugas, diskusi virtual, dan konsultasi dengan pengajar."
      />
      <InfoCard
        icon={<BriefcaseIcon size={26} />}
        number="2"
        title="Dunia Kerja"
        desc="Rapat online, email profesional, kolaborasi dokumen, dan komunikasi antar-divisi."
        highlight
      />
      <InfoCard
        icon={<StoreIcon size={26} />}
        number="3"
        title="Bisnis"
        desc="Customer service, promosi digital, komunikasi pelanggan, serta notifikasi transaksi."
        tint={{ bg: c.amberSoft, border: '#fcd34d', fg: c.amber }}
      />
      <InfoCard
        icon={<HeartIcon size={26} />}
        number="4"
        title="Kehidupan Sosial"
        desc="Pesan singkat, panggilan video, media sosial, dan forum komunitas."
        tint={{ bg: c.roseSoft, border: '#fecdd3', fg: c.rose }}
      />
    </div>
    <SlideFooter chapter="Aktivitas Sehari-hari" />
  </div>
);

// ===========================================================================
// SLIDE 8 — MANFAAT TEKNOLOGI KOMPUTER DALAM KOMUNIKASI (7 cards + CTA tile)
// ===========================================================================
const benefits = [
  { t: 'Kecepatan', d: 'Pengiriman informasi terjadi secara real-time.', icon: <BoltIcon size={24} /> },
  { t: 'Jangkauan Luas', d: 'Menghubungkan komunikasi antar-wilayah hingga lintas negara.', icon: <GlobeIcon size={24} /> },
  { t: 'Efisiensi Biaya', d: 'Mengurangi kebutuhan perjalanan fisik.', icon: <ScaleIcon size={24} /> },
  { t: 'Kolaborasi', d: 'Memungkinkan kerja bersama secara terintegrasi.', icon: <UsersIcon size={24} /> },
  { t: 'Dokumentasi', d: 'Pesan dan data tersimpan rapi serta mudah ditelusuri.', icon: <DocIcon size={24} /> },
  { t: 'Multimedia', d: 'Mendukung teks, suara, gambar, video, dan dokumen.', icon: <VideoIcon size={24} /> },
  { t: 'Aksesibilitas', d: 'Fitur text-to-speech & speech-to-text bagi penyandang disabilitas.', icon: <EyeIcon size={24} /> },
];

const S08Manfaat: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Sisi Positif"
      title="Manfaat Teknologi Komputer dalam Komunikasi"
      subtitle="Tujuh manfaat utama yang menjadikannya tulang punggung peradaban digital."
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, width: '100%', maxWidth: 1660, zIndex: 1 }}>
      {benefits.map((b, i) => (
        <InfoCard key={b.t} icon={b.icon} number={String(i + 1)} title={b.t} desc={b.d} highlight={i === 0} />
      ))}
      {/* Closing tile to balance the 4×2 grid */}
      <div
        style={{
          backgroundColor: c.tealDark,
          borderRadius: 18,
          padding: '24px 26px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 10,
          boxShadow: c.cardShadowLg,
          height: '100%',
          boxSizing: 'border-box',
          color: '#ffffff',
        }}
      >
        <SparkleIcon size={30} />
        <div style={{ fontSize: 21, fontWeight: 700, lineHeight: 1.35 }}>
          Semua manfaat ini hanya bernilai jika digunakan secara aman dan beretika.
        </div>
      </div>
    </div>
    <SlideFooter chapter="Manfaat Utama" />
  </div>
);

// ===========================================================================
// SLIDE 9 — TANTANGAN KOMUNIKASI DIGITAL
// ===========================================================================
const challenges = [
  { t: 'Misinformasi & Hoaks', d: 'Penyebaran informasi palsu secara cepat dan masif.', icon: <AlertIcon size={24} color={c.rose} /> },
  { t: 'Privasi & Keamanan Data', d: 'Risiko kebocoran data pribadi dari platform digital.', icon: <LockIcon size={24} /> },
  { t: 'Miskomunikasi', d: 'Keterbatasan intonasi dan ekspresi dalam pesan teks.', icon: <ChatIcon size={24} /> },
  { t: 'Overload & Ketergantungan', d: 'Beban informasi berlebih membuat pengguna sulit fokus.', icon: <BrainIcon size={24} /> },
  { t: 'Kesenjangan Digital', d: 'Ketimpangan akses perangkat dan jaringan internet.', icon: <ScaleIcon size={24} /> },
];

const S09Tantangan: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Sisi Kritis"
      title="Tantangan Komunikasi Digital"
      tone="amber"
      subtitle="Lima persoalan nyata yang menyertai pesatnya adopsi teknologi komunikasi."
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: '100%', maxWidth: 1460, zIndex: 1 }}>
      {challenges.map((ch, i) => (
        <div
          key={ch.t}
          style={{
            backgroundColor: c.card,
            border: `1.5px solid ${c.line}`,
            borderLeft: `6px solid ${c.rose}`,
            borderRadius: 16,
            padding: '17px 28px',
            boxShadow: c.cardShadow,
            display: 'flex',
            alignItems: 'center',
            gap: 22,
          }}
        >
          <span style={{ fontFamily: fontMono, fontSize: 22, fontWeight: 800, color: c.rose, width: 40, textAlign: 'center' }}>
            {i + 1}
          </span>
          <IconChip size={50} bg={c.roseSoft} border="#fecdd3" fg={c.rose}>
            {ch.icon}
          </IconChip>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 20, flex: 1 }}>
            <h3 style={{ fontSize: 25, fontWeight: 700, color: c.ink, margin: 0, minWidth: 360 }}>{ch.t}</h3>
            <p style={{ fontSize: 20, color: c.body, margin: 0, fontWeight: 500, lineHeight: 1.4 }}>{ch.d}</p>
          </div>
        </div>
      ))}
    </div>
    <SlideFooter chapter="Tantangan Digital" />
  </div>
);

// ===========================================================================
// SLIDE 10 — KEAMANAN DALAM KOMUNIKASI DIGITAL
// ===========================================================================
const security = [
  { t: 'Enkripsi', d: 'Mengamankan pesan sehingga hanya dapat dibaca oleh penerima sah.', icon: <LockIcon size={24} /> },
  { t: 'Autentikasi', d: 'Verifikasi identitas pengguna: password, PIN, biometrik, dan 2FA.', icon: <FingerprintIcon size={24} /> },
  { t: 'Pencegahan Phishing', d: 'Kewaspadaan terhadap penipuan berbasis manipulasi informasi.', icon: <AlertIcon size={24} color={c.tealDark} /> },
  { t: 'Privasi Data', d: 'Perlindungan dan pengelolaan data pribadi secara terbatas.', icon: <ShieldIcon size={24} /> },
  { t: 'Literasi Digital', d: 'Kesadaran dan pemahaman pengguna mengenai risiko keamanan.', icon: <EyeIcon size={24} /> },
];

const S10Keamanan: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Perlindungan"
      title="Keamanan dalam Komunikasi Digital"
      subtitle="Lima pilar perlindungan yang menjawab tantangan privasi dan ancaman siber."
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, width: '100%', maxWidth: 1680, zIndex: 1 }}>
      {security.map((s, i) => (
        <div
          key={s.t}
          style={{
            backgroundColor: i === 0 ? c.tealSoft : c.card,
            border: `1.5px solid ${i === 0 ? c.tealBorder : c.line}`,
            borderRadius: 18,
            padding: '26px 18px',
            boxShadow: c.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 13,
            height: '100%',
            boxSizing: 'border-box',
          }}
        >
          <IconChip size={62} bg={i === 0 ? '#ffffff' : c.tealSoft}>
            {s.icon}
          </IconChip>
          <div style={{ fontFamily: fontMono, fontSize: 15, fontWeight: 800, color: c.tealDark }}>PILAR {i + 1}</div>
          <h3 style={{ fontSize: 23, fontWeight: 700, color: c.ink, margin: 0, lineHeight: 1.25 }}>{s.t}</h3>
          <p style={{ fontSize: 17.5, color: c.body, margin: 0, lineHeight: 1.45, fontWeight: 500 }}>{s.d}</p>
        </div>
      ))}
    </div>
    <div style={{ display: 'flex', gap: 12, marginTop: 26, zIndex: 1 }}>
      {['Password', 'PIN', 'Biometrik', '2FA', 'End-to-End Encryption'].map((k) => (
        <span
          key={k}
          style={{
            fontFamily: fontMono,
            fontSize: 17,
            fontWeight: 600,
            color: c.tealDark,
            backgroundColor: '#ffffff',
            border: `1.5px solid ${c.tealBorder}`,
            borderRadius: 12,
            padding: '8px 18px',
            boxShadow: c.cardShadow,
          }}
        >
          {k}
        </span>
      ))}
    </div>
    <SlideFooter chapter="Keamanan Digital" />
  </div>
);

// ===========================================================================
// SLIDE 11 — DAMPAK TEKNOLOGI KOMPUTER TERHADAP MASYARAKAT
// ===========================================================================
const positiveImpacts = [
  'Pembelajaran jarak jauh dan kemudahan akses informasi.',
  'Pertumbuhan bisnis digital dan peluang kerja baru.',
  'Pembentukan komunitas global dan kemudahan hubungan jarak jauh.',
];
const negativeImpacts = [
  'Berkurangnya interaksi tatap muka dan isolasi sosial.',
  'Penyebaran berita bohong dan manipulasi data.',
  'Kesenjangan digital serta otomatisasi yang menggantikan peran kerja tertentu.',
];

const ImpactColumn = ({ kind, items }: { kind: 'pos' | 'neg'; items: string[] }): ReactElement => {
  const pos = kind === 'pos';
  return (
    <div
      style={{
        backgroundColor: c.card,
        border: `1.5px solid ${pos ? c.tealBorder : '#fecdd3'}`,
        borderTop: `6px solid ${pos ? c.tealDark : c.rose}`,
        borderRadius: 18,
        padding: '30px 34px',
        boxShadow: c.cardShadow,
        display: 'flex',
        flexDirection: 'column',
        gap: 20,
        height: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
        <IconChip size={48} bg={pos ? c.tealSoft : c.roseSoft} border={pos ? c.tealBorder : '#fecdd3'} fg={pos ? c.tealDark : c.rose}>
          {pos ? <CheckIcon size={24} color={c.tealDark} /> : <XIcon size={24} color={c.rose} />}
        </IconChip>
        <h3 style={{ fontSize: 30, fontWeight: 800, margin: 0, color: pos ? c.tealDark : c.rose }}>
          Dampak {pos ? 'Positif' : 'Negatif'}
        </h3>
      </div>
      {items.map((it) => (
        <div key={it} style={{ display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <span style={{ marginTop: 8, flexShrink: 0 }}>
            {pos ? <CheckIcon size={20} color={c.tealDark} /> : <XIcon size={20} color={c.rose} />}
          </span>
          <p style={{ fontSize: 22, color: c.body, margin: 0, lineHeight: 1.5, fontWeight: 500 }}>{it}</p>
        </div>
      ))}
    </div>
  );
};

const S11Dampak: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Perspektif Sosial"
      title="Dampak Teknologi Komputer terhadap Masyarakat"
      subtitle="Dua sisi mata uang — setiap kemajuan membawa peluang sekaligus risiko."
    />
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, width: '100%', maxWidth: 1500, zIndex: 1 }}>
      <ImpactColumn kind="pos" items={positiveImpacts} />
      <ImpactColumn kind="neg" items={negativeImpacts} />
    </div>
    <SlideFooter chapter="Dampak Masyarakat" />
  </div>
);

// ===========================================================================
// SLIDE 12 — STUDI KASUS: ALUR PENGIRIMAN PESAN "HALO"
// ===========================================================================
const haloSteps = [
  { t: 'Pengirim', d: 'Mengetik "Halo"', icon: <KeyboardIcon size={24} /> },
  { t: 'Perangkat Pengirim', d: 'Konversi ke data digital', icon: <ComputerIcon size={24} /> },
  { t: 'Jaringan', d: 'Wi-Fi / Seluler', icon: <WifiIcon size={24} /> },
  { t: 'Internet & Server', d: 'Pemrosesan & pengarahan data', icon: <ServerIcon size={24} /> },
  { t: 'Jaringan Penerima', d: 'Sinyal ditangkap perangkat tujuan', icon: <BoltIcon size={24} /> },
  { t: 'Perangkat Penerima', d: '"Halo" muncul di layar', icon: <MonitorScreenIcon size={24} /> },
];

const S12StudiKasus: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Studi Kasus"
      title={'Alur Pengiriman Pesan "Halo"'}
      subtitle="Satu kata sederhana, enam etape teknis, ribuan kilometer infrastruktur."
    />
    <div style={{ width: '100%', maxWidth: 1660, zIndex: 1 }}>
      {/* Message bubble travelling through the chain */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 30 }}>
        <span
          style={{
            fontFamily: fontMono,
            fontSize: 24,
            fontWeight: 700,
            color: '#ffffff',
            backgroundColor: c.tealDark,
            borderRadius: 20,
            borderBottomLeftRadius: 4,
            padding: '10px 26px',
            boxShadow: c.cardShadowLg,
            animation: 'kd-float-y 3.2s ease-in-out infinite',
          }}
        >
          Halo
        </span>
        <div style={{ width: 260, height: 2, background: `linear-gradient(90deg, ${c.tealBorder}, ${c.blueBorder})`, marginLeft: 16 }} />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 18 }}>
        {haloSteps.map((s, i) => (
          <div
            key={s.t}
            style={{
              backgroundColor: c.card,
              border: `1.5px solid ${i === 3 ? c.tealBorder : c.line}`,
              borderRadius: 16,
              padding: '26px 16px 22px',
              boxShadow: c.cardShadow,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: 10,
              position: 'relative',
              height: '100%',
              boxSizing: 'border-box',
            }}
          >
            <div
              style={{
                position: 'absolute',
                top: -14,
                left: '50%',
                transform: 'translateX(-50%)',
                fontFamily: fontMono,
                fontSize: 14,
                fontWeight: 800,
                color: '#ffffff',
                backgroundColor: i === 3 ? c.blue : c.tealDark,
                borderRadius: 999,
                padding: '4px 13px',
                whiteSpace: 'nowrap',
              }}
            >
              LANGKAH {i + 1}
            </div>
            <span style={{ color: c.tealDark, marginTop: 6 }}>{s.icon}</span>
            <h4 style={{ fontSize: 20, fontWeight: 700, color: c.ink, margin: 0, lineHeight: 1.25 }}>{s.t}</h4>
            <p style={{ fontSize: 16, color: c.body, margin: 0, lineHeight: 1.4, fontWeight: 500 }}>{s.d}</p>
            {i < haloSteps.length - 1 && (
              <div style={{ position: 'absolute', right: -15, top: '50%', transform: 'translateY(-50%)', zIndex: 2 }}>
                <ArrowRightIcon size={18} />
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        style={{
          marginTop: 30,
          backgroundColor: c.blueSoft,
          border: `1.5px solid ${c.blueBorder}`,
          borderRadius: 14,
          padding: '16px 28px',
          fontSize: 21,
          fontWeight: 600,
          color: c.blue,
          textAlign: 'center',
        }}
      >
        Kesimpulan: satu pesan sederhana melibatkan serangkaian proses komputasi dan jaringan data yang kompleks.
      </div>
    </div>
    <SlideFooter chapter="Studi Kasus Teknis" />
  </div>
);

// ===========================================================================
// SLIDE 13 — ETIKA DALAM KOMUNIKASI DIGITAL
// ===========================================================================
const ethics = [
  { t: 'Bertanggung Jawab', d: 'Mempertimbangkan dampak sebelum membagikan informasi.', icon: <ScaleIcon size={24} /> },
  { t: 'Menghormati Privasi', d: 'Tidak menyebarkan data pribadi orang lain tanpa izin.', icon: <ShieldIcon size={24} /> },
  { t: 'Memverifikasi Informasi', d: 'Memastikan kebenaran berita sebelum diteruskan.', icon: <CheckIcon size={24} color={c.tealDark} /> },
  { t: 'Menghargai Orang Lain', d: 'Menghindari kata kasar, provokasi, dan cyberbullying.', icon: <HeartIcon size={24} /> },
  { t: 'Menghormati Hak Cipta', d: 'Menggunakan konten dengan mencantumkan sumber resmi.', icon: <DocIcon size={24} /> },
  { t: 'Menjaga Keamanan', d: 'Menggunakan akun dan perangkat secara bijak.', icon: <LockIcon size={24} /> },
];

const S13Etika: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Netiket"
      title="Etika dalam Komunikasi Digital"
      subtitle="Enam prinsip agar ekosistem digital tetap sehat, aman, dan manusiawi."
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, width: '100%', maxWidth: 1560, zIndex: 1 }}>
      {ethics.map((e, i) => (
        <InfoCard key={e.t} icon={e.icon} number={String(i + 1)} title={e.t} desc={e.d} highlight={i === 2} />
      ))}
    </div>
    <SlideFooter chapter="Etika Digital" />
  </div>
);

// ===========================================================================
// SLIDE 14 — MASA DEPAN KOMUNIKASI BERBASIS TEKNOLOGI
// ===========================================================================
const future = [
  { t: 'Artificial Intelligence', d: 'Asisten komunikasi dan pemrosesan konten otomatis.', icon: <BrainIcon size={24} /> },
  { t: 'Natural Language Processing', d: 'Pemahaman bahasa manusia secara lebih natural.', icon: <ChatIcon size={24} /> },
  { t: 'Real-Time Translation', d: 'Penerjemahan bahasa langsung saat berkomunikasi.', icon: <TranslateIcon size={24} /> },
  { t: 'Speech Technology', d: 'Integrasi fitur pengenal suara yang lebih akurat.', icon: <MicIcon size={24} /> },
  { t: 'AR/VR & Spatial Communication', d: 'Ruang pertemuan virtual yang imersif.', icon: <VrIcon size={24} /> },
  { t: 'Otomatisasi', d: 'Sistem respons dan penyaringan informasi cerdas.', icon: <CogIcon size={24} /> },
];

const S14MasaDepan: Page = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Horizon 2030+"
      title="Masa Depan Komunikasi Berbasis Teknologi"
      tone="blue"
      subtitle="Enam arah perkembangan yang akan kembali mengubah cara kita bertukar makna."
    />
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, width: '100%', maxWidth: 1560, zIndex: 1 }}>
      {future.map((f, i) => (
        <InfoCard
          key={f.t}
          icon={f.icon}
          number={String(i + 1)}
          title={f.t}
          desc={f.d}
          highlight={i === 0}
          tint={{ bg: c.blueSoft, border: c.blueBorder, fg: c.blue }}
        />
      ))}
    </div>
    <SlideFooter chapter="Masa Depan Komunikasi" />
  </div>
);

// ===========================================================================
// SLIDE 15 — KESIMPULAN  (transition: DISSOLVE)
// ===========================================================================
const shifts = [
  { from: 'Terbatas', to: 'Terhubung' },
  { from: 'Lambat', to: 'Real-Time' },
  { from: 'Lokal', to: 'Global' },
  { from: 'Teks', to: 'Multimedia' },
  { from: 'Manual', to: 'Otomatis & Cerdas' },
];

const S15Kesimpulan: PageWithTransition = () => (
  <div style={baseCanvasStyle}>
    <CornerDots />
    <SlideHeader
      category="Penutup"
      title="Kesimpulan"
      subtitle="Teknologi komputer telah mengubah komunikasi dari…"
    />
    <div style={{ display: 'flex', flexDirection: 'column', gap: 13, width: '100%', maxWidth: 1150, zIndex: 1 }}>
      {shifts.map((s) => (
        <div
          key={s.from}
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 20,
            backgroundColor: c.card,
            border: `1.5px solid ${c.line}`,
            borderRadius: 14,
            padding: '12px 30px',
            boxShadow: c.cardShadow,
          }}
        >
          <span style={{ fontSize: 23, fontWeight: 600, color: c.muted, width: 240 }}>{s.from}</span>
          <ArrowRightIcon size={24} />
          <span style={{ fontSize: 26, fontWeight: 800, color: c.tealDark, textAlign: 'right', flex: 1 }}>{s.to}</span>
        </div>
      ))}
    </div>
    <div
      style={{
        marginTop: 26,
        zIndex: 1,
        width: '100%',
        maxWidth: 1150,
        backgroundColor: c.tealDark,
        borderRadius: 18,
        padding: '26px 34px',
        boxShadow: c.cardShadowLg,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <span style={{ color: '#ffffff', flexShrink: 0 }}>
        <SparkleIcon size={36} />
      </span>
      <p style={{ fontSize: 25, fontWeight: 700, color: '#ffffff', margin: 0, lineHeight: 1.5 }}>
        Teknologi adalah alat, sedangkan etika, literasi digital, dan kesadaran keamanan dari penggunanya yang
        menentukan manfaat akhirnya.
      </p>
    </div>
    <SlideFooter chapter="Penutup & Refleksi" />
  </div>
);
S15Kesimpulan.transition = dissolve;

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------
export const meta: SlideMeta = {
  title: 'Penerapan Teknologi Komputer dalam Bidang Komunikasi',
  createdAt: '2026-10-27T08:21:57.773Z',
};

// Speaker notes — index-aligned with the 15 pages below
export const notes: (string | undefined)[] = [
  `Salam pembuka dan perkenalan topik: "Penerapan Teknologi Komputer dalam Bidang Komunikasi".
Tekankan bahwa slide ini adalah peta perjalanan: peran, manfaat, tantangan, dan masa depan komunikasi digital.
Sebutkan mata kuliah: Pengantar Teknologi Komputer dan Informatika.`,

  `Mulai dengan pertanyaan pemantik: "Bagaimana cara kalian mengirim pesan pagi ini?"
Jelaskan tiga besar zaman: dahulu (surat, pertemuan, telegram, telepon), era komputer & internet (email, chat, video conference, medsos, cloud), dan era AI (chatbot, penerjemahan otomatis, speech recognition).
Poin kuncinya: perubahan bukan sekadar alat baru, tapi berubahnya kecepatan, jangkauan, dan bentuk pesan itu sendiri.`,

  `Beri definisi ringkas empat konsep: komunikasi, komputer, teknologi komunikasi, dan penerapan komputer dalam komunikasi.
Tegaskan benang merahnya: komputer adalah otak yang mengolah, mengirim, menerima, menyimpan, dan menyajikan informasi.`,

  `Ajak audiens membaca garis waktu delapan tahap: surat → telegram → telepon → komputer & email → internet & chat → smartphone & medsos → video conference & cloud → AI.
Soroti kata "percepatan eksponensial": jarak antar-tahap makin pendek, dampaknya makin besar.`,

  `Jelaskan tujuh tahap pipeline pesan digital dengan gestur kiri ke kanan.
Titik berat: tahap 4-5 adalah wilayah kerja komputer sejati — transmisi, pemrosesan, dan routing di server.
Tutup dengan formula: pesan → data → jaringan → data → pesan.`,

  `Kelompokkan penerapan ke empat bentuk: personal (WhatsApp/Telegram), formal & bisnis (email, Zoom, Teams), pendidikan (LMS), sosial & publik (medsos, forum).
Undang audiens menyebut contoh mereka di masing-masing kategori.`,

  `Turunkan ke konteks keseharian: pendidikan (kuliah online, submit tugas), dunia kerja (rapat & kolaborasi dokumen), bisnis (customer service, notifikasi transaksi), kehidupan sosial (video call keluarga).
Hubungkan dengan pengalaman pribadi mahasiswa.`,

  `Bacakan tujuh manfaat dengan penekanan pada kecepatan dan jangkauan.
Jangan lewatkan aksesibilitas — teknologi bantu seperti text-to-speech adalah wajah humanis dari komputasi.
Tutup kartu hijau: manfaat hanya bernilai bila digunakan aman dan beretika — jembatan ke slide berikutnya.`,

  `Nada bicara berubah kritis: lima tantangan komunikasi digital.
Contohkan hoaks yang viral, kasus kebocoran data, salah paham karena chat, rasa kewalahan notifikasi, dan saudara di daerah terpencil yang sulit sinyal.`,

  `Jawab tantangan sebelumnya dengan lima pilar keamanan: enkripsi, autentikasi (password, PIN, biometrik, 2FA), kewaspadaan phishing, privasi data, dan literasi digital.
Praktik cepat: minta audiens cek apakah 2FA sudah aktif di akun mereka.`,

  `Presentasikan dua kolom sebagai dua sisi mata uang: positif (pendidikan luas, bisnis digital, komunitas global) vs negatif (isolasi sosial, berita bohong, kesenjangan & otomatisasi kerja).
Tekankan: bukan teknologinya baik atau buruk, melainkan bagaimana masyarakat mengelolanya.`,

  `Ambil momen "wow": kirim kata "Halo" secara live bila memungkinkan.
Telusuri enam langkah teknis dari pengetikan hingga muncul di layar penerima.
Punchline: satu kata sederhana menempuh proses komputasi dan jaringan yang sangat kompleks.`,

  `Masuk ke netiket: bertanggung jawab, menghormati privasi, verifikasi sebelum share, anti cyberbullying, hormati hak cipta, jaga keamanan akun.
Soroti kartu "Memverifikasi Informasi" sebagai kebiasaan berwaktu kecil namun berdampak besar.`,

  `Menatap ke depan: AI asisten, NLP yang makin natural, real-time translation, teknologi suara, AR/VR spatial communication, dan otomatisasi cerdas.
Beri contoh konkret: rapat lintas bahasa dengan subtitle langsung, kantor virtual immersive.`,

  `Rangkum lima pergeseran besar: terbatas→terhubung, lambat→real-time, lokal→global, teks→multimedia, manual→otomatis & cerdas.
Tutup dengan kalimat kunci sambil menatap audiens: teknologi hanyalah alat; etika, literasi digital, dan kesadaran keamanan kitalah yang menentukan manfaat akhirnya. Ucapkan terima kasih dan buka sesi tanya jawab.`,
];

export default [
  S01Cover,
  S02Evolusi,
  S03Konsep,
  S04Timeline,
  S05Pipeline,
  S06Bentuk,
  S07SehariHari,
  S08Manfaat,
  S09Tantangan,
  S10Keamanan,
  S11Dampak,
  S12StudiKasus,
  S13Etika,
  S14MasaDepan,
  S15Kesimpulan,
] satisfies Page[];
