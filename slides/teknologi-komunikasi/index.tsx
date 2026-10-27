import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

// Subtle background SVG assets
import bgNetwork from './assets/bg-digital-network.svg';
import bgConstellation from './assets/bg-digital-constellation.svg';

// Web font injection: Plus Jakarta Sans for clean modern typography & JetBrains Mono for technical codes
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap';
const FONT_LINK_ID = 'osd-webfont-tek-kom';

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
    bg: '#ffffff',
    text: '#0f172a',
    accent: '#15803d',
  },
  fonts: {
    display: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
    body: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 120,
    body: 32,
  },
  radius: 16,
};

// Pastel Green & Pure White Color Theme
const colors = {
  bgBase: '#ffffff',
  bgMintSubtle: '#f2fbf5',
  bgMintSoft: '#e8f7ed',
  bgMintMedium: '#d5f2de',
  pastelGreenBorder: '#bbf0cc',
  pastelGreenBorderStrong: '#86dfa2',
  emeraldPrimary: '#15803d',
  emeraldDark: '#14532d',
  emeraldLight: '#16a34a',
  emeraldVibrant: '#22c55e',

  inkPrimary: '#0f172a',
  textSecondary: '#334155',
  mutedText: '#64748b',
  faintText: '#94a3b8',

  cardSurface: '#ffffff',
  cardSurfaceGlass: 'rgba(255, 255, 255, 0.94)',
  cardBorder: 'rgba(34, 197, 94, 0.22)',
  cardBorderHover: 'rgba(21, 128, 61, 0.45)',
  cardShadow: '0 10px 30px -8px rgba(22, 101, 52, 0.08), 0 2px 8px -2px rgba(15, 23, 42, 0.04)',
  cardShadowLarge: '0 20px 40px -12px rgba(22, 101, 52, 0.12), 0 4px 12px -2px rgba(15, 23, 42, 0.05)',

  roseTint: '#fef2f2',
  roseBorder: '#fecaca',
  roseText: '#b91c1c',
};

// ---------------------------------------------------------------------------
// HOUSE TRANSITION FAMILY — one DNA (hold outgoing page, fade incoming in on
// top), three members: RISE (module default) · SETTLE (cover) · DISSOLVE
// (closing page). No `throughBackground`, no exit fades, no enter delays —
// the previous dip-through-background made every cut flash dark. See
// .claude/skills/slide-authoring/references/transitions.md for the contract.
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

/** SETTLE — cover page: rise + a hair of blur on enter only. */
const settle: SlideTransition = {
  duration: 280,
  exit: { duration: 280, easing: EASE_IN, keyframes: HOLD },
  enter: {
    duration: 280,
    easing: EASE_OUT,
    keyframes: [
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(4px)' },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)' },
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

// Base Canvas Styling (1920x1080)
const baseCanvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  backgroundImage:
    'radial-gradient(1200px circle at 95% 10%, rgba(213, 242, 222, 0.45), transparent 60%), radial-gradient(1000px circle at 5% 90%, rgba(232, 247, 237, 0.55), transparent 55%)',
  color: colors.inkPrimary,
  fontFamily: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  padding: '60px 110px',
};

// Background Decorative Overlay
const BackgroundGraphic = ({ variant = 'network' }: { variant?: 'network' | 'constellation' }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      opacity: 0.85,
      backgroundImage: `url(${variant === 'network' ? bgNetwork : bgConstellation})`,
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      backgroundRepeat: 'no-repeat',
    }}
  />
);

// Standard Slide Header
const SlideHeader = ({
  category,
  title,
  subtitle,
}: {
  category: string;
  title: string;
  subtitle?: string;
}) => (
  <div
    style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      textAlign: 'center',
      marginBottom: 36,
      zIndex: 1,
      maxWidth: 1600,
    }}
  >
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        backgroundColor: colors.bgMintSoft,
        border: `1px solid ${colors.pastelGreenBorder}`,
        borderRadius: 24,
        padding: '6px 18px',
        marginBottom: 12,
      }}
    >
      <div style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
      <span
        style={{
          fontSize: 20,
          fontWeight: 700,
          color: colors.emeraldDark,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {category}
      </span>
    </div>
    <h2
      style={{
        fontSize: 54,
        fontWeight: 800,
        color: colors.inkPrimary,
        margin: '0 0 8px 0',
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        style={{
          fontSize: 26,
          color: colors.textSecondary,
          margin: 0,
          fontWeight: 500,
          maxWidth: 1300,
          lineHeight: 1.35,
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

// Standard Slide Footer
const SlideFooter = ({ chapter }: { chapter?: string }) => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        bottom: 28,
        left: 110,
        right: 110,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 18,
        color: colors.mutedText,
        zIndex: 1,
        borderTop: `1px solid ${colors.pastelGreenBorder}`,
        paddingTop: 16,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ fontWeight: 700, color: colors.emeraldDark }}>Pengantar Teknologi Komputer &amp; Informatika</span>
        <span style={{ color: colors.faintText }}>|</span>
        <span style={{ color: colors.textSecondary }}>{chapter || 'Penerapan Teknologi Komputer dalam Komunikasi'}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: '"JetBrains Mono", monospace', fontWeight: 600 }}>
        <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>{String(current).padStart(2, '0')}</span>
        <span style={{ color: colors.faintText }}>/</span>
        <span style={{ color: colors.mutedText }}>{String(total).padStart(2, '0')}</span>
      </div>
    </div>
  );
};

// ==========================================
// SVG ICONS (STRICTLY NO EMOJIS)
// ==========================================

const SvgIconWrapper = ({ children, bg = colors.bgMintSoft, border = colors.pastelGreenBorder, size = 56 }: { children: ReactNode; bg?: string; border?: string; size?: number }) => (
  <div
    style={{
      width: size,
      height: size,
      borderRadius: size * 0.32,
      backgroundColor: bg,
      border: `1.5px solid ${border}`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexShrink: 0,
      color: colors.emeraldPrimary,
    }}
  >
    {children}
  </div>
);

// 1. Mail Icon
const MailIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
  </svg>
);

// 2. Chat / Message Icon
const ChatIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
  </svg>
);

// 3. Video Conference Icon
const VideoIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m16 13 5.223 3.482a.5.5 0 0 0 .777-.416V7.87a.5.5 0 0 0-.752-.432L16 10.5" />
    <rect x="2" y="6" width="14" height="12" rx="2" />
  </svg>
);

// 4. Cloud Icon
const CloudIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
  </svg>
);

// 5. AI / Brain Circuit Icon
const BrainAiIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

// 6. Computer / Hardware Icon
const ComputerIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="3" rx="2" />
    <line x1="8" x2="16" y1="21" y2="21" />
    <line x1="12" x2="12" y1="17" y2="21" />
  </svg>
);

// 7. Network / Globe Icon
const NetworkIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="2" x2="22" y1="12" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

// 8. Shield / Security Icon
const ShieldLockIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    <circle cx="12" cy="11" r="2" />
    <path d="M12 13v2" />
  </svg>
);

// 9. Key / Lock Icon
const LockIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

// 10. Arrow Right Icon
const ArrowRightIcon = ({ size = 20, color = colors.emeraldPrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// 11. Check Icon
const CheckCircleIcon = ({ size = 24, color = colors.emeraldPrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

// 12. Alert Icon
const AlertTriangleIcon = ({ size = 24, color = '#dc2626' }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <line x1="12" y1="9" x2="12" y2="13" />
    <line x1="12" y1="17" x2="12.01" y2="17" />
  </svg>
);

// 13. Users / Collaboration Icon
const UsersIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// 14. Server / Database Icon
const ServerIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="8" x="2" y="2" rx="2" ry="2" />
    <rect width="20" height="8" x="2" y="14" rx="2" ry="2" />
    <line x1="6" x2="6.01" y1="6" y2="6" />
    <line x1="6" x2="6.01" y1="18" y2="18" />
  </svg>
);

// 15. Smartphone Icon
const PhoneIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="14" height="20" x="5" y="2" rx="2" ry="2" />
    <path d="M12 18h.01" />
  </svg>
);

// 16. Education / Cap Icon
const EducationIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 10v6M2 10l10-5 10 5-10 5z" />
    <path d="M6 12v5c3 3 9 3 12 0v-5" />
  </svg>
);

// 17. Briefcase / Work Icon
const BriefcaseIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="20" height="14" x="2" y="7" rx="2" ry="2" />
    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
  </svg>
);

// 18. Store / Business Icon
const BusinessIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
    <path d="M3 6h18" />
    <path d="M16 10a4 4 0 0 1-8 0" />
  </svg>
);

// 19. Sparkle / Innovation Icon
const SparkleIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m12 3-1.9 5.8a2 2 0 0 1-1.3 1.3L3 12l5.8 1.9a2 2 0 0 1 1.3 1.3L12 21l1.9-5.8a2 2 0 0 1 1.3-1.3L21 12l-5.8-1.9a2 2 0 0 1-1.3-1.3Z" />
  </svg>
);

// 20. Translation / Languages Icon
const TranslateIcon = ({ size = 26 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="m5 8 6 6" />
    <path d="m4 14 6-6 2-3" />
    <path d="M2 5h12" />
    <path d="M7 2h1" />
    <path d="m22 22-5-10-5 10" />
    <path d="M14 18h6" />
  </svg>
);

// ==========================================
// REUSABLE PRESENTATION CARD COMPONENTS
// ==========================================

const FeatureCard = ({
  icon,
  number,
  title,
  desc,
  tag,
  highlight = false,
}: {
  icon: ReactNode;
  number?: string;
  title: string;
  desc: string;
  tag?: string;
  highlight?: boolean;
}) => (
  <div
    style={{
      backgroundColor: highlight ? colors.bgMintSoft : colors.cardSurface,
      border: `1.5px solid ${highlight ? colors.pastelGreenBorderStrong : colors.pastelGreenBorder}`,
      borderRadius: 18,
      padding: '28px 30px',
      boxShadow: highlight ? colors.cardShadowLarge : colors.cardShadow,
      display: 'flex',
      flexDirection: 'column',
      gap: 14,
      position: 'relative',
      height: '100%',
      boxSizing: 'border-box',
    }}
  >
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <SvgIconWrapper size={52} bg={highlight ? '#ffffff' : colors.bgMintSoft}>
        {icon}
      </SvgIconWrapper>
      {number && (
        <span
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: 20,
            fontWeight: 800,
            color: colors.emeraldPrimary,
            backgroundColor: highlight ? '#ffffff' : colors.bgMintSoft,
            padding: '4px 12px',
            borderRadius: 12,
            border: `1px solid ${colors.pastelGreenBorder}`,
          }}
        >
          {number}
        </span>
      )}
    </div>
    <div>
      <h3
        style={{
          fontSize: 28,
          fontWeight: 700,
          color: colors.inkPrimary,
          margin: '0 0 8px 0',
          lineHeight: 1.25,
        }}
      >
        {title}
      </h3>
      <p
        style={{
          fontSize: 21,
          color: colors.textSecondary,
          margin: 0,
          lineHeight: 1.45,
          fontWeight: 500,
        }}
      >
        {desc}
      </p>
    </div>
    {tag && (
      <div
        style={{
          marginTop: 'auto',
          fontSize: 16,
          fontWeight: 600,
          color: colors.emeraldDark,
          display: 'flex',
          alignItems: 'center',
          gap: 6,
        }}
      >
        <span style={{ width: 6, height: 6, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
        {tag}
      </div>
    )}
  </div>
);

// ==========================================
// SLIDE 1: COVER
// ==========================================
const Slide01Cover: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <div
      style={{
        zIndex: 1,
        maxWidth: 1450,
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '30px 40px',
      }}
    >
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 12,
          backgroundColor: colors.bgMintSoft,
          border: `1.5px solid ${colors.pastelGreenBorderStrong}`,
          borderRadius: 30,
          padding: '10px 24px',
          marginBottom: 32,
          boxShadow: '0 4px 16px rgba(22, 101, 52, 0.08)',
        }}
      >
        <ComputerIcon size={24} />
        <span
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: colors.emeraldDark,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
          }}
        >
          Mata Kuliah: Pengantar Teknologi Komputer dan Informatika
        </span>
      </div>

      <h1
        style={{
          fontSize: 76,
          fontWeight: 800,
          color: colors.inkPrimary,
          margin: '0 0 24px 0',
          lineHeight: 1.15,
          letterSpacing: '-0.03em',
        }}
      >
        Penerapan Teknologi Komputer <br />
        <span
          style={{
            color: colors.emeraldPrimary,
            backgroundImage: `linear-gradient(120deg, ${colors.emeraldPrimary}, ${colors.emeraldLight})`,
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          dalam Bidang Komunikasi
        </span>
      </h1>

      <p
        style={{
          fontSize: 32,
          color: colors.textSecondary,
          maxWidth: 1200,
          margin: '0 0 48px 0',
          fontWeight: 500,
          lineHeight: 1.45,
        }}
      >
        Peran, Manfaat, Tantangan, dan Perkembangan Komunikasi di Era Digital
      </p>

      {/* 4 Feature Badges at Bottom */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 24,
          width: '100%',
          maxWidth: 1300,
        }}
      >
        <div
          style={{
            backgroundColor: colors.cardSurfaceGlass,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '20px 24px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            textAlign: 'left',
          }}
        >
          <SvgIconWrapper size={46}>
            <NetworkIcon size={24} />
          </SvgIconWrapper>
          <div>
            <div style={{ fontSize: 16, color: colors.mutedText, fontWeight: 600 }}>Cakupan</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary }}>Koneksi Global</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.cardSurfaceGlass,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '20px 24px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            textAlign: 'left',
          }}
        >
          <SvgIconWrapper size={46}>
            <ChatIcon size={24} />
          </SvgIconWrapper>
          <div>
            <div style={{ fontSize: 16, color: colors.mutedText, fontWeight: 600 }}>Kecepatan</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary }}>Pesan Real-Time</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.cardSurfaceGlass,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '20px 24px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            textAlign: 'left',
          }}
        >
          <SvgIconWrapper size={46}>
            <ShieldLockIcon size={24} />
          </SvgIconWrapper>
          <div>
            <div style={{ fontSize: 16, color: colors.mutedText, fontWeight: 600 }}>Keamanan</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary }}>Enkripsi &amp; Privasi</div>
          </div>
        </div>

        <div
          style={{
            backgroundColor: colors.cardSurfaceGlass,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '20px 24px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
            textAlign: 'left',
          }}
        >
          <SvgIconWrapper size={46}>
            <BrainAiIcon size={24} />
          </SvgIconWrapper>
          <div>
            <div style={{ fontSize: 16, color: colors.mutedText, fontWeight: 600 }}>Masa Depan</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary }}>AI &amp; Otomatisasi</div>
          </div>
        </div>
      </div>
    </div>
    <SlideFooter chapter="Pengantar &amp; Gambaran Umum" />
  </div>
);

// ==========================================
// SLIDE 2: MENGAPA CARA KITA BERKOMUNIKASI BERUBAH?
// ==========================================
const Slide02MengapaBerubah: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <SlideHeader
      category="Transformasi Zaman"
      title="Mengapa Cara Kita Berkomunikasi Berubah?"
      subtitle="Evolusi Komunikasi Manusia dari Konvensional Menuju Otomatisasi Cerdas"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 32,
        width: '100%',
        maxWidth: 1640,
        zIndex: 1,
      }}
    >
      {/* Era 1: Dahulu */}
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 20,
          padding: '36px 36px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SvgIconWrapper size={56} bg={colors.bgMintSoft}>
            <MailIcon size={28} />
          </SvgIconWrapper>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: colors.mutedText,
              backgroundColor: colors.bgMintSubtle,
              padding: '6px 14px',
              borderRadius: 12,
              border: `1px solid ${colors.pastelGreenBorder}`,
            }}
          >
            FASE 01
          </span>
        </div>
        <div>
          <h3 style={{ fontSize: 32, fontWeight: 800, color: colors.inkPrimary, margin: '0 0 6px 0' }}>
            1. Era Konvensional
          </h3>
          <p style={{ fontSize: 20, color: colors.mutedText, margin: 0, fontWeight: 500 }}>
            Komunikasi fisik dengan batas jarak &amp; waktu
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.textSecondary, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
            Surat Pos &amp; Kurir
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.textSecondary, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
            Pertemuan Langsung (Tatap Muka)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.textSecondary, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
            Telegram Kode Morse
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.textSecondary, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
            Telepon Analog Rumah
          </div>
        </div>
      </div>

      {/* Era 2: Komputer & Internet */}
      <div
        style={{
          backgroundColor: colors.bgMintSoft,
          border: `2px solid ${colors.pastelGreenBorderStrong}`,
          borderRadius: 20,
          padding: '36px 36px',
          boxShadow: colors.cardShadowLarge,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SvgIconWrapper size={56} bg="#ffffff">
            <ComputerIcon size={28} />
          </SvgIconWrapper>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: colors.emeraldDark,
              backgroundColor: '#ffffff',
              padding: '6px 14px',
              borderRadius: 12,
              border: `1px solid ${colors.pastelGreenBorderStrong}`,
            }}
          >
            FASE 02
          </span>
        </div>
        <div>
          <h3 style={{ fontSize: 32, fontWeight: 800, color: colors.inkPrimary, margin: '0 0 6px 0' }}>
            2. Komputer &amp; Internet
          </h3>
          <p style={{ fontSize: 20, color: colors.emeraldDark, margin: 0, fontWeight: 600 }}>
            Konektivitas digital instan lintas batas
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.inkPrimary, fontWeight: 600 }}>
            <CheckCircleIcon size={20} color={colors.emeraldPrimary} />
            Email (Surat Elektronik)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.inkPrimary, fontWeight: 600 }}>
            <CheckCircleIcon size={20} color={colors.emeraldPrimary} />
            Chatting &amp; Pesan Instan
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.inkPrimary, fontWeight: 600 }}>
            <CheckCircleIcon size={20} color={colors.emeraldPrimary} />
            Video Conference (Zoom, Teams)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.inkPrimary, fontWeight: 600 }}>
            <CheckCircleIcon size={20} color={colors.emeraldPrimary} />
            Media Sosial &amp; Komunikasi Cloud
          </div>
        </div>
      </div>

      {/* Era 3: Artificial Intelligence */}
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 20,
          padding: '36px 36px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <SvgIconWrapper size={56} bg={colors.bgMintSoft}>
            <BrainAiIcon size={28} />
          </SvgIconWrapper>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: colors.emeraldPrimary,
              backgroundColor: colors.bgMintSubtle,
              padding: '6px 14px',
              borderRadius: 12,
              border: `1px solid ${colors.pastelGreenBorder}`,
            }}
          >
            FASE 03
          </span>
        </div>
        <div>
          <h3 style={{ fontSize: 32, fontWeight: 800, color: colors.inkPrimary, margin: '0 0 6px 0' }}>
            3. Artificial Intelligence
          </h3>
          <p style={{ fontSize: 20, color: colors.mutedText, margin: 0, fontWeight: 500 }}>
            Komunikasi cerdas, adaptif &amp; terotomatisasi
          </p>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 10 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.textSecondary, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
            Chatbot Cerdas Interaktif
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.textSecondary, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
            Penerjemahan Bahasa Otomatis
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.textSecondary, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
            Speech Recognition (Suara ke Teks)
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 22, color: colors.textSecondary, fontWeight: 600 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', backgroundColor: colors.emeraldPrimary }} />
            AI-Assisted Communication &amp; Ringkasan
          </div>
        </div>
      </div>
    </div>

    <SlideFooter chapter="Evolusi Komunikasi" />
  </div>
);

// ==========================================
// SLIDE 3: KONSEP DASAR TEKNOLOGI KOMUNIKASI
// ==========================================
const Slide03KonsepDasar: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="constellation" />
    <SlideHeader
      category="Pondasi Teoretis"
      title="Konsep Dasar Teknologi Komunikasi"
      subtitle="Memahami 4 Elemen Kunci yang Membentuk Ekosistem Komunikasi Komputasi Modern"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 28,
        width: '100%',
        maxWidth: 1600,
        zIndex: 1,
      }}
    >
      <FeatureCard
        icon={<ChatIcon size={26} />}
        number="01"
        title="1. Komunikasi"
        desc="Proses penyampaian informasi, ide, atau pesan dari pengirim (sender) kepada penerima (receiver) melalui suatu media komunikasi secara efektif."
        tag="Fondasi Pertukaran Pesan"
      />
      <FeatureCard
        icon={<ComputerIcon size={26} />}
        number="02"
        title="2. Komputer"
        desc="Perangkat elektronik yang dapat menerima data masukan (input), mengolah (processing), menyimpan (storage), dan menghasilkan keluaran informasi (output)."
        tag="Mesin Pemroses Informasi"
      />
      <FeatureCard
        icon={<NetworkIcon size={26} />}
        number="03"
        title="3. Teknologi Komunikasi"
        desc="Perangkat keras, perangkat lunak, dan infrastruktur jaringan yang digunakan secara khusus untuk memfasilitasi pertukaran pesan jarak jauh."
        tag="Kanal &amp; Infrastruktur Media"
      />
      <FeatureCard
        icon={<BrainAiIcon size={26} />}
        number="04"
        title="4. Penerapan Komputer dalam Komunikasi"
        desc="Pemanfaatan sistem komputer dan teknologi pendukungnya untuk mengolah, mengenkripsi, mengirimkan, menerima, menyimpan, dan menyajikan informasi digital."
        tag="Sinergi Komputasi &amp; Telekomunikasi"
        highlight={true}
      />
    </div>

    <SlideFooter chapter="Konsep Dasar" />
  </div>
);

// ==========================================
// SLIDE 4: EVOLUSI KOMUNIKASI BERBASIS TEKNOLOGI
// ==========================================
const Slide04EvolusiTimeline: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <SlideHeader
      category="Garis Waktu Sejarah"
      title="Evolusi Komunikasi Berbasis Teknologi"
      subtitle="8 Tahapan Lompatan Besar Manusia dalam Bertukar Pesan Lintas Generasi"
    />

    {/* 8-Step Timeline Grid (2 rows of 4 steps with arrows) */}
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 24,
        width: '100%',
        maxWidth: 1640,
        zIndex: 1,
      }}
    >
      {/* Row 1: Steps 1 to 4 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        <div
          style={{
            backgroundColor: colors.cardSurface,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 22px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: colors.bgMintSoft, padding: '4px 10px', borderRadius: 8 }}>
              TAHAP 1
            </span>
            <MailIcon size={22} />
          </div>
          <h4 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0', color: colors.inkPrimary }}>Surat Fisik</h4>
          <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Berbasis kertas, bergantung pada kurir dan transportasi darat/laut.
          </p>
        </div>

        <div
          style={{
            backgroundColor: colors.cardSurface,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 22px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: colors.bgMintSoft, padding: '4px 10px', borderRadius: 8 }}>
              TAHAP 2
            </span>
            <NetworkIcon size={22} />
          </div>
          <h4 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0', color: colors.inkPrimary }}>Telegram</h4>
          <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Pesan listrik berbasis kode Morse melalui kabel telegrafi jarak jauh.
          </p>
        </div>

        <div
          style={{
            backgroundColor: colors.cardSurface,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 22px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: colors.bgMintSoft, padding: '4px 10px', borderRadius: 8 }}>
              TAHAP 3
            </span>
            <PhoneIcon size={22} />
          </div>
          <h4 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0', color: colors.inkPrimary }}>Telepon Analog</h4>
          <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Transmisi sinyal suara langsung dua arah secara real-time.
          </p>
        </div>

        <div
          style={{
            backgroundColor: colors.cardSurface,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 22px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: colors.bgMintSoft, padding: '4px 10px', borderRadius: 8 }}>
              TAHAP 4
            </span>
            <ComputerIcon size={22} />
          </div>
          <h4 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0', color: colors.inkPrimary }}>Komputer &amp; Email</h4>
          <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Awal mula digitalisasi komunikasi teks surat secara elektronik.
          </p>
        </div>
      </div>

      {/* Row 2: Steps 5 to 8 */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20 }}>
        <div
          style={{
            backgroundColor: colors.bgMintSubtle,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 22px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: '#ffffff', padding: '4px 10px', borderRadius: 8 }}>
              TAHAP 5
            </span>
            <ChatIcon size={22} />
          </div>
          <h4 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0', color: colors.inkPrimary }}>Internet &amp; Chatting</h4>
          <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Instant messaging, forum daring, dan protokol web global (WWW).
          </p>
        </div>

        <div
          style={{
            backgroundColor: colors.bgMintSubtle,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 22px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: '#ffffff', padding: '4px 10px', borderRadius: 8 }}>
              TAHAP 6
            </span>
            <UsersIcon size={22} />
          </div>
          <h4 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0', color: colors.inkPrimary }}>Smartphone &amp; Sosmed</h4>
          <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Komunikasi bergerak dalam genggaman dan jejaring sosial masif.
          </p>
        </div>

        <div
          style={{
            backgroundColor: colors.bgMintSoft,
            border: `1.5px solid ${colors.pastelGreenBorderStrong}`,
            borderRadius: 16,
            padding: '24px 22px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldDark, backgroundColor: '#ffffff', padding: '4px 10px', borderRadius: 8 }}>
              TAHAP 7
            </span>
            <VideoIcon size={22} />
          </div>
          <h4 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0', color: colors.inkPrimary }}>Video Conf &amp; Cloud</h4>
          <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Kolaborasi visual multipihak dan sinkronisasi data jarak jauh.
          </p>
        </div>

        <div
          style={{
            backgroundColor: colors.bgMintSoft,
            border: `2px solid ${colors.emeraldPrimary}`,
            borderRadius: 16,
            padding: '24px 22px',
            boxShadow: colors.cardShadowLarge,
            display: 'flex',
            flexDirection: 'column',
            gap: 10,
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <span style={{ fontSize: 16, fontWeight: 800, color: '#ffffff', backgroundColor: colors.emeraldPrimary, padding: '4px 10px', borderRadius: 8 }}>
              TAHAP 8
            </span>
            <BrainAiIcon size={22} />
          </div>
          <h4 style={{ fontSize: 24, fontWeight: 700, margin: '4px 0', color: colors.emeraldDark }}>AI &amp; Intelligent Comm</h4>
          <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.4 }}>
            Penerjemahan langsung, agen cerdas, dan interaksi natural spasial.
          </p>
        </div>
      </div>
    </div>

    <SlideFooter chapter="Evolusi Komunikasi" />
  </div>
);

// ==========================================
// SLIDE 5: CARA KOMPUTER MEMUNGKINKAN KOMUNIKASI
// ==========================================
const Slide05CaraKerjaPesan: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <SlideHeader
      category="Mekanisme Kerja"
      title="Cara Komputer Memungkinkan Komunikasi"
      subtitle="7 Tahapan Alur Pemrosesan Pesan Digital dari Pengirim hingga Tiba di Layar Penerima"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 20,
        width: '100%',
        maxWidth: 1640,
        zIndex: 1,
      }}
    >
      <FeatureCard
        icon={<ComputerIcon size={24} />}
        number="01"
        title="1. Input Pesan"
        desc="Pengguna mengetik teks, merekam suara, atau memilih media pada antarmuka aplikasi."
      />
      <FeatureCard
        icon={<ServerIcon size={24} />}
        number="02"
        title="2. Konversi Biner"
        desc="Perangkat mengubah pesan ke format sinyal data biner (0 &amp; 1) melalui kompresi dan enkripsi."
      />
      <FeatureCard
        icon={<BrainAiIcon size={24} />}
        number="03"
        title="3. Pemrosesan Data"
        desc="Data diproses oleh sistem operasi, prosesor, dan protokol perangkat lunak pengirim."
      />
      <FeatureCard
        icon={<NetworkIcon size={24} />}
        number="04"
        title="4. Transmisi Kanal"
        desc="Paket data dikirimkan melalui gelombang radio Wi-Fi, jaringan seluler 4G/5G, atau fiber optik."
      />
      <FeatureCard
        icon={<CloudIcon size={24} />}
        number="05"
        title="5. Routing Server"
        desc="Server dan router di internet memvalidasi, merutekan, dan mengarahkan paket ke alamat tujuan."
      />
      <FeatureCard
        icon={<PhoneIcon size={24} />}
        number="06"
        title="6. Penerimaan Paket"
        desc="Perangkat penerima menangkap paket digital dan merekonstruksi urutan paket secara utuh."
      />
      <FeatureCard
        icon={<CheckCircleIcon size={24} />}
        number="07"
        title="7. Tampilan Layar"
        desc="Aplikasi mendekripsi data dan menampilkan pesan utuh di layar perangkat penerima."
        highlight={true}
      />
      {/* Summary Box */}
      <div
        style={{
          backgroundColor: colors.bgMintSoft,
          border: `2px dashed ${colors.pastelGreenBorderStrong}`,
          borderRadius: 18,
          padding: '24px 26px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.emeraldPrimary, fontWeight: 700, fontSize: 18 }}>
          <SparkleIcon size={22} />
          RINGKASAN PROSES
        </div>
        <p style={{ fontSize: 20, color: colors.inkPrimary, fontWeight: 600, margin: 0, lineHeight: 1.45 }}>
          Seluruh 7 tahapan komputasi ini berlangsung hanya dalam hitungan milidetik secara mulus.
        </p>
      </div>
    </div>

    <SlideFooter chapter="Arsitektur Pengiriman Pesan" />
  </div>
);

// ==========================================
// SLIDE 6: BENTUK PENERAPAN KOMPUTER DALAM KOMUNIKASI
// ==========================================
const Slide06BentukPenerapan: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="constellation" />
    <SlideHeader
      category="Klasifikasi Layanan"
      title="Bentuk Penerapan Komputer dalam Komunikasi"
      subtitle="4 Kategori Utama Saluran Komunikasi Berbasis Komputasi yang Mengubah Pola Interaksi"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 32,
        width: '100%',
        maxWidth: 1600,
        zIndex: 1,
      }}
    >
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 20,
          padding: '36px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <SvgIconWrapper size={58}>
            <ChatIcon size={28} />
          </SvgIconWrapper>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary }}>KATEGORI 01</span>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>Komunikasi Personal</h3>
          </div>
        </div>
        <p style={{ fontSize: 22, color: colors.textSecondary, margin: '8px 0 0 0', lineHeight: 1.5 }}>
          Pertukaran pesan privat antar-individu atau grup kecil keluarga dan pertemanan.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          <span style={{ backgroundColor: colors.bgMintSoft, border: `1px solid ${colors.pastelGreenBorder}`, padding: '8px 16px', borderRadius: 10, fontSize: 19, fontWeight: 600, color: colors.emeraldDark }}>
            Pesan Instan (WhatsApp, Telegram)
          </span>
          <span style={{ backgroundColor: colors.bgMintSoft, border: `1px solid ${colors.pastelGreenBorder}`, padding: '8px 16px', borderRadius: 10, fontSize: 19, fontWeight: 600, color: colors.emeraldDark }}>
            Panggilan Suara &amp; Video Personal
          </span>
        </div>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 20,
          padding: '36px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <SvgIconWrapper size={58}>
            <BriefcaseIcon size={28} />
          </SvgIconWrapper>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary }}>KATEGORI 02</span>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>Komunikasi Formal &amp; Bisnis</h3>
          </div>
        </div>
        <p style={{ fontSize: 22, color: colors.textSecondary, margin: '8px 0 0 0', lineHeight: 1.5 }}>
          Komunikasi resmi profesional terstruktur untuk operasional organisasi dan kemitraan.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          <span style={{ backgroundColor: colors.bgMintSoft, border: `1px solid ${colors.pastelGreenBorder}`, padding: '8px 16px', borderRadius: 10, fontSize: 19, fontWeight: 600, color: colors.emeraldDark }}>
            Email Profesional Korporasi
          </span>
          <span style={{ backgroundColor: colors.bgMintSoft, border: `1px solid ${colors.pastelGreenBorder}`, padding: '8px 16px', borderRadius: 10, fontSize: 19, fontWeight: 600, color: colors.emeraldDark }}>
            Video Conference (Zoom, Teams, Meet)
          </span>
        </div>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 20,
          padding: '36px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <SvgIconWrapper size={58}>
            <EducationIcon size={28} />
          </SvgIconWrapper>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary }}>KATEGORI 03</span>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>Komunikasi Pendidikan</h3>
          </div>
        </div>
        <p style={{ fontSize: 22, color: colors.textSecondary, margin: '8px 0 0 0', lineHeight: 1.5 }}>
          Penyampaian materi ajar, bimbingan, evaluasi tugas, dan diskusi akademik interaktif.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          <span style={{ backgroundColor: colors.bgMintSoft, border: `1px solid ${colors.pastelGreenBorder}`, padding: '8px 16px', borderRadius: 10, fontSize: 19, fontWeight: 600, color: colors.emeraldDark }}>
            Learning Management System (LMS)
          </span>
          <span style={{ backgroundColor: colors.bgMintSoft, border: `1px solid ${colors.pastelGreenBorder}`, padding: '8px 16px', borderRadius: 10, fontSize: 19, fontWeight: 600, color: colors.emeraldDark }}>
            Webinar &amp; Kelas Interaktif Virtual
          </span>
        </div>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 20,
          padding: '36px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <SvgIconWrapper size={58}>
            <NetworkIcon size={28} />
          </SvgIconWrapper>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary }}>KATEGORI 04</span>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>Komunikasi Sosial &amp; Publik</h3>
          </div>
        </div>
        <p style={{ fontSize: 22, color: colors.textSecondary, margin: '8px 0 0 0', lineHeight: 1.5 }}>
          Distribusi informasi skala luas, pembentukan opini publik, dan interaksi komunitas.
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 8 }}>
          <span style={{ backgroundColor: colors.bgMintSoft, border: `1px solid ${colors.pastelGreenBorder}`, padding: '8px 16px', borderRadius: 10, fontSize: 19, fontWeight: 600, color: colors.emeraldDark }}>
            Media Sosial Lintas Generasi
          </span>
          <span style={{ backgroundColor: colors.bgMintSoft, border: `1px solid ${colors.pastelGreenBorder}`, padding: '8px 16px', borderRadius: 10, fontSize: 19, fontWeight: 600, color: colors.emeraldDark }}>
            Komunitas &amp; Forum Daring Global
          </span>
        </div>
      </div>
    </div>

    <SlideFooter chapter="Bentuk Penerapan" />
  </div>
);

// ==========================================
// SLIDE 7: PENERAPAN DALAM AKTIVITAS SEHARI-HARI
// ==========================================
const Slide07AktivitasSehariHari: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <SlideHeader
      category="Studi Implementasi"
      title="Penerapan dalam Aktivitas Sehari-hari"
      subtitle="Integrasi Teknologi Komputer dalam 4 Pilar Kehidupan Modern yang Produktif"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 24,
        width: '100%',
        maxWidth: 1640,
        zIndex: 1,
      }}
    >
      {/* 1. Pendidikan */}
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 18,
          padding: '28px 24px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <SvgIconWrapper size={52}>
          <EducationIcon size={26} />
        </SvgIconWrapper>
        <h3 style={{ fontSize: 26, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>1. Pendidikan</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Pembelajaran online &amp; kuliah daring
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Pengumpulan tugas digital (LMS)
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Diskusi virtual &amp; presentasi kelas
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Konsultasi dosen via telekonferensi
          </div>
        </div>
      </div>

      {/* 2. Dunia Kerja */}
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 18,
          padding: '28px 24px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <SvgIconWrapper size={52}>
          <BriefcaseIcon size={26} />
        </SvgIconWrapper>
        <h3 style={{ fontSize: 26, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>2. Dunia Kerja</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Rapat online lintas zona waktu
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Email profesional &amp; persuratan
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Kolaborasi dokumen real-time (Docs)
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Komunikasi antar-divisi via Slack/Teams
          </div>
        </div>
      </div>

      {/* 3. Bisnis */}
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 18,
          padding: '28px 24px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <SvgIconWrapper size={52}>
          <BusinessIcon size={26} />
        </SvgIconWrapper>
        <h3 style={{ fontSize: 26, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>3. Bisnis</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Customer service via bot &amp; live chat
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Promosi digital &amp; broadcast katalog
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Komunikasi keluhan &amp; review pembeli
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Notifikasi transaksi otomatis SMS/WA
          </div>
        </div>
      </div>

      {/* 4. Kehidupan Sosial */}
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 18,
          padding: '28px 24px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <SvgIconWrapper size={52}>
          <UsersIcon size={26} />
        </SvgIconWrapper>
        <h3 style={{ fontSize: 26, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>4. Sosial</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Pesan singkat instan keluarga
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Panggilan video jarak jauh
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Media sosial &amp; berbagi momen hidup
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: 19, color: colors.textSecondary }}>
            <span style={{ color: colors.emeraldPrimary, fontWeight: 700 }}>•</span>
            Forum komunitas hobi &amp; minat
          </div>
        </div>
      </div>
    </div>

    <SlideFooter chapter="Aktivitas Sehari-hari" />
  </div>
);

// ==========================================
// SLIDE 8: MANFAAT TEKNOLOGI KOMPUTER DALAM KOMUNIKASI
// ==========================================
const Slide08ManfaatUtama: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="constellation" />
    <SlideHeader
      category="Nilai Tambah"
      title="Manfaat Teknologi Komputer dalam Komunikasi"
      subtitle="7 Keunggulan Signifikan yang Meningkatkan Produktivitas dan Efektivitas Manusia"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: 22,
        width: '100%',
        maxWidth: 1640,
        zIndex: 1,
      }}
    >
      <FeatureCard
        icon={<ChatIcon size={24} />}
        number="01"
        title="1. Kecepatan"
        desc="Pengiriman informasi berlangsung seketika secara real-time tanpa penundaan waktu tempuh fisik."
      />
      <FeatureCard
        icon={<NetworkIcon size={24} />}
        number="02"
        title="2. Jangkauan Luas"
        desc="Menembus batas geografis, menghubungkan komunikasi antar-wilayah terpencil hingga mancanegara."
      />
      <FeatureCard
        icon={<SparkleIcon size={24} />}
        number="03"
        title="3. Efisiensi Biaya"
        desc="Mengurangi kebutuhan logistik dan perjalanan dinas melalui rapat virtual &amp; dokumen terpadu."
      />
      <FeatureCard
        icon={<UsersIcon size={24} />}
        number="04"
        title="4. Kolaborasi"
        desc="Memungkinkan banyak orang mengedit satu dokumen bersamaan dan mengoordinasikan proyek kompleks."
      />
      <FeatureCard
        icon={<ServerIcon size={24} />}
        number="05"
        title="5. Dokumentasi"
        desc="Riwayat percakapan dan berkas digital tersimpan rapi, mudah diarsipkan, dan cepat ditelusuri."
      />
      <FeatureCard
        icon={<VideoIcon size={24} />}
        number="06"
        title="6. Multimedia"
        desc="Mendukung integrasi format teks, audio, foto resolusi tinggi, video interaktif, dan grafik 3D."
      />
      <FeatureCard
        icon={<CheckCircleIcon size={24} />}
        number="07"
        title="7. Aksesibilitas"
        desc="Fitur pembantu seperti Text-to-Speech dan Speech-to-Text bagi penyandang disabilitas sensorik."
        highlight={true}
      />
      {/* Visual Indicator Box */}
      <div
        style={{
          backgroundColor: colors.bgMintSoft,
          border: `1.5px solid ${colors.pastelGreenBorderStrong}`,
          borderRadius: 18,
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          textAlign: 'center',
          gap: 10,
        }}
      >
        <span style={{ fontSize: 36, fontWeight: 800, color: colors.emeraldPrimary }}>100x</span>
        <span style={{ fontSize: 20, fontWeight: 700, color: colors.inkPrimary }}>Lebih Cepat &amp; Efisien</span>
        <p style={{ fontSize: 16, color: colors.textSecondary, margin: 0 }}>
          Dibandingkan metode pos surat dan komunikasi manual abad lalu
        </p>
      </div>
    </div>

    <SlideFooter chapter="Manfaat Komunikasi Komputer" />
  </div>
);

// ==========================================
// SLIDE 9: TANTANGAN KOMUNIKASI DIGITAL
// ==========================================
const Slide09TantanganDigital: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <SlideHeader
      category="Analisis Kritis"
      title="Tantangan Komunikasi Digital"
      subtitle="5 Isu Krusial yang Muncul di Tengah Pesatnya Arus Pertukaran Informasi Digital"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gap: 20,
        width: '100%',
        maxWidth: 1660,
        zIndex: 1,
      }}
    >
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.roseBorder}`,
          borderRadius: 18,
          padding: '28px 22px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SvgIconWrapper size={50} bg={colors.roseTint} border={colors.roseBorder}>
            <AlertTriangleIcon size={24} color={colors.roseText} />
          </SvgIconWrapper>
          <span style={{ fontSize: 16, fontWeight: 800, color: colors.roseText }}>01</span>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: colors.inkPrimary, margin: 0, lineHeight: 1.3 }}>
          Misinformasi &amp; Hoaks
        </h3>
        <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
          Penyebaran informasi bohong dan narasi palsu yang cepat viral melalui jejaring sosial.
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 18,
          padding: '28px 22px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SvgIconWrapper size={50}>
            <ShieldLockIcon size={24} />
          </SvgIconWrapper>
          <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary }}>02</span>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: colors.inkPrimary, margin: 0, lineHeight: 1.3 }}>
          Privasi &amp; Keamanan Data
        </h3>
        <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
          Ancaman kebocoran data pribadi, pencurian identitas akun, dan penyadapan siber ilegal.
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 18,
          padding: '28px 22px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SvgIconWrapper size={50}>
            <ChatIcon size={24} />
          </SvgIconWrapper>
          <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary }}>03</span>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: colors.inkPrimary, margin: 0, lineHeight: 1.3 }}>
          Miskomunikasi Teks
        </h3>
        <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
          Ketiadaan intonasi suara dan ekspresi wajah dalam teks yang memicu salah tafsir maksud pesan.
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 18,
          padding: '28px 22px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SvgIconWrapper size={50}>
            <ServerIcon size={24} />
          </SvgIconWrapper>
          <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary }}>04</span>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: colors.inkPrimary, margin: 0, lineHeight: 1.3 }}>
          Information Overload
        </h3>
        <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
          Beban banjir informasi berlebih dan ketergantungan gawai yang memicu stres digital.
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 18,
          padding: '28px 22px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <SvgIconWrapper size={50}>
            <NetworkIcon size={24} />
          </SvgIconWrapper>
          <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary }}>05</span>
        </div>
        <h3 style={{ fontSize: 24, fontWeight: 800, color: colors.inkPrimary, margin: 0, lineHeight: 1.3 }}>
          Kesenjangan Digital
        </h3>
        <p style={{ fontSize: 18, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
          Ketimpangan akses perangkat keras dan kecepatan jaringan internet antar-wilayah.
        </p>
      </div>
    </div>

    <SlideFooter chapter="Tantangan Era Digital" />
  </div>
);

// ==========================================
// SLIDE 10: KEAMANAN DALAM KOMUNIKASI DIGITAL
// ==========================================
const Slide10KeamananDigital: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="constellation" />
    <SlideHeader
      category="Proteksi &amp; Keamanan Siber"
      title="Keamanan dalam Komunikasi Digital"
      subtitle="5 Lapisan Perlindungan Kunci untuk Menjamin Integritas dan Kerahasiaan Data Pengguna"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28,
        width: '100%',
        maxWidth: 1600,
        zIndex: 1,
      }}
    >
      <FeatureCard
        icon={<LockIcon size={26} />}
        number="01"
        title="1. Enkripsi End-to-End"
        desc="Mengacak pesan dengan algoritma kriptografi sehingga hanya dapat didekripsi oleh perangkat penerima yang sah, mencegah penyadapan ISP/pihak ketiga."
        tag="Kerahasiaan Pesan Mutlak"
      />
      <FeatureCard
        icon={<ShieldLockIcon size={26} />}
        number="02"
        title="2. Autentikasi Berlapis (2FA)"
        desc="Verifikasi identitas pengguna menggunakan kombinasi kata sandi, PIN, kode OTP perangkat, serta biometrik (sidik jari &amp; face recognition)."
        tag="Validasi Hak Akses Akun"
      />
      <FeatureCard
        icon={<AlertTriangleIcon size={26} color={colors.emeraldPrimary} />}
        number="03"
        title="3. Pencegahan Phishing"
        desc="Penyaringan proaktif terhadap tautan palsu dan taktik manipulasi psikologis penipu yang mencoba mencuri kredensial perbankan atau data akun."
        tag="Deteksi Rekayasa Sosial"
      />
      <FeatureCard
        icon={<ServerIcon size={26} />}
        number="04"
        title="4. Perlindungan Privasi Data"
        desc="Kepatuhan regulasi perlindungan data pribadi (UU PDP / GDPR), pembatasan akses data oleh aplikasi, dan pengelolaan izin izin privasi yang ketat."
        tag="Kepatuhan Regulasi Legal"
      />
      <FeatureCard
        icon={<EducationIcon size={26} />}
        number="05"
        title="5. Literasi Keamanan Digital"
        desc="Kesadaran pengguna untuk mengenali risiko, memperbarui perangkat lunak secara berkala, dan tidak membagikan kode OTP kepada siapa pun."
        tag="Benteng Terakhir Pengguna"
      />
      {/* Highlight Box */}
      <div
        style={{
          backgroundColor: colors.bgMintSoft,
          border: `2px solid ${colors.pastelGreenBorderStrong}`,
          borderRadius: 18,
          padding: '28px 30px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, color: colors.emeraldDark, fontWeight: 700, fontSize: 18 }}>
          <ShieldLockIcon size={24} />
          PRINSIP KEAMANAN UTAMA
        </div>
        <h4 style={{ fontSize: 26, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>
          Keamanan adalah Tanggung Jawab Bersama
        </h4>
        <p style={{ fontSize: 19, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
          Sistem teknologi terkuat sekalipun memerlukan kesadaran dan kehati-hatian pengguna dalam menjaga kredensialnya.
        </p>
      </div>
    </div>

    <SlideFooter chapter="Keamanan Komunikasi" />
  </div>
);

// ==========================================
// SLIDE 11: DAMPAK TEKNOLOGI KOMPUTER TERHADAP MASYARAKAT
// ==========================================
const Slide11DampakMasyarakat: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <SlideHeader
      category="Dampak Sosial &amp; Ekonomi"
      title="Dampak Teknologi Komputer terhadap Masyarakat"
      subtitle="Komparasi Objektif Dampak Positif dan Konsekuensi Negatif dalam Dinamika Sosial Budaya"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 36,
        width: '100%',
        maxWidth: 1600,
        zIndex: 1,
      }}
    >
      {/* Kolom Kiri: Dampak Positif */}
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `2px solid ${colors.pastelGreenBorderStrong}`,
          borderRadius: 20,
          padding: '36px 38px',
          boxShadow: colors.cardShadowLarge,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <SvgIconWrapper size={54} bg={colors.bgMintSoft}>
            <CheckCircleIcon size={28} />
          </SvgIconWrapper>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.emeraldPrimary, textTransform: 'uppercase' }}>
              Peluang &amp; Kemajuan
            </span>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>
              Dampak Positif
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
          <div
            style={{
              backgroundColor: colors.bgMintSubtle,
              border: `1px solid ${colors.pastelGreenBorder}`,
              borderRadius: 14,
              padding: '18px 22px',
            }}
          >
            <h4 style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary, margin: '0 0 6px 0' }}>
              Akses Pendidikan &amp; Informasi Tanpa Batas
            </h4>
            <p style={{ fontSize: 19, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
              Pembelajaran jarak jauh, perpustakaan digital terbuka, dan kemudahan literasi sains dari seluruh dunia.
            </p>
          </div>

          <div
            style={{
              backgroundColor: colors.bgMintSubtle,
              border: `1px solid ${colors.pastelGreenBorder}`,
              borderRadius: 14,
              padding: '18px 22px',
            }}
          >
            <h4 style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary, margin: '0 0 6px 0' }}>
              Pertumbuhan Bisnis Digital &amp; Lapangan Kerja
            </h4>
            <p style={{ fontSize: 19, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
              Lahirnya ekosistem e-commerce, profesi digital baru, pekerjaan jarak jauh (remote work), dan ekonomi kreator.
            </p>
          </div>

          <div
            style={{
              backgroundColor: colors.bgMintSubtle,
              border: `1px solid ${colors.pastelGreenBorder}`,
              borderRadius: 14,
              padding: '18px 22px',
            }}
          >
            <h4 style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary, margin: '0 0 6px 0' }}>
              Solidaritas &amp; Komunitas Global
            </h4>
            <p style={{ fontSize: 19, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
              Kemudahan menjalin relasi lintas benua, penggalangan donasi kemanusiaan cepat, dan pertukaran budaya.
            </p>
          </div>
        </div>
      </div>

      {/* Kolom Kanan: Dampak Negatif */}
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `2px solid ${colors.roseBorder}`,
          borderRadius: 20,
          padding: '36px 38px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <SvgIconWrapper size={54} bg={colors.roseTint} border={colors.roseBorder}>
            <AlertTriangleIcon size={28} color={colors.roseText} />
          </SvgIconWrapper>
          <div>
            <span style={{ fontSize: 16, fontWeight: 800, color: colors.roseText, textTransform: 'uppercase' }}>
              Tantangan &amp; Risiko
            </span>
            <h3 style={{ fontSize: 32, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>
              Dampak Negatif
            </h3>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 8 }}>
          <div
            style={{
              backgroundColor: colors.roseTint,
              border: `1px solid ${colors.roseBorder}`,
              borderRadius: 14,
              padding: '18px 22px',
            }}
          >
            <h4 style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary, margin: '0 0 6px 0' }}>
              Penurunan Interaksi Tatap Muka &amp; Isolasi Sosial
            </h4>
            <p style={{ fontSize: 19, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
              Kecenderungan berkurangnya kepekaan sosial langsung, individualisme, dan sindrom FOMO di dunia nyata.
            </p>
          </div>

          <div
            style={{
              backgroundColor: colors.roseTint,
              border: `1px solid ${colors.roseBorder}`,
              borderRadius: 14,
              padding: '18px 22px',
            }}
          >
            <h4 style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary, margin: '0 0 6px 0' }}>
              Penyebaran Berita Bohong &amp; Polarisasi
            </h4>
            <p style={{ fontSize: 19, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
              Ruang gema (echo chamber) media sosial yang mempertajam polarisasi opini dan ujaran kebencian.
            </p>
          </div>

          <div
            style={{
              backgroundColor: colors.roseTint,
              border: `1px solid ${colors.roseBorder}`,
              borderRadius: 14,
              padding: '18px 22px',
            }}
          >
            <h4 style={{ fontSize: 22, fontWeight: 700, color: colors.inkPrimary, margin: '0 0 6px 0' }}>
              Ketimpangan Akses &amp; Pergeseran Lapangan Kerja
            </h4>
            <p style={{ fontSize: 19, color: colors.textSecondary, margin: 0, lineHeight: 1.45 }}>
              Kesenjangan fasilitas antara kota dan pelosok serta otomasi yang menuntut reskilling keahlian tenaga kerja.
            </p>
          </div>
        </div>
      </div>
    </div>

    <SlideFooter chapter="Dampak Sosial &amp; Masyarakat" />
  </div>
);

// ==========================================
// SLIDE 12: STUDI KASUS: ALUR PENGIRIMAN PESAN
// ==========================================
const Slide12StudiKasusPesan: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <SlideHeader
      category="Studi Kasus Teknis"
      title="Studi Kasus: Alur Pengiriman Pesan"
      subtitle="Membedah Alur Komputasi di Balik Pengiriman Satu Kata Sederhana: 'Halo'"
    />

    {/* 6 Step Horizontal Pipeline */}
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gap: 16,
        width: '100%',
        maxWidth: 1660,
        zIndex: 1,
        marginBottom: 28,
      }}
    >
      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 16,
          padding: '24px 18px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: colors.bgMintSoft, padding: '4px 12px', borderRadius: 8 }}>
          STEP 1
        </span>
        <SvgIconWrapper size={46}>
          <UsersIcon size={22} />
        </SvgIconWrapper>
        <h4 style={{ fontSize: 20, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>Pengirim</h4>
        <p style={{ fontSize: 16, color: colors.textSecondary, margin: 0, lineHeight: 1.35 }}>
          User mengetik kata <strong>&quot;Halo&quot;</strong> pada aplikasi pesan instan.
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 16,
          padding: '24px 18px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: colors.bgMintSoft, padding: '4px 12px', borderRadius: 8 }}>
          STEP 2
        </span>
        <SvgIconWrapper size={46}>
          <PhoneIcon size={22} />
        </SvgIconWrapper>
        <h4 style={{ fontSize: 20, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>Perangkat</h4>
        <p style={{ fontSize: 16, color: colors.textSecondary, margin: 0, lineHeight: 1.35 }}>
          Teks dikonversi menjadi data biner dan dienkripsi oleh OS.
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 16,
          padding: '24px 18px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: colors.bgMintSoft, padding: '4px 12px', borderRadius: 8 }}>
          STEP 3
        </span>
        <SvgIconWrapper size={46}>
          <NetworkIcon size={22} />
        </SvgIconWrapper>
        <h4 style={{ fontSize: 20, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>Jaringan Lokal</h4>
        <p style={{ fontSize: 16, color: colors.textSecondary, margin: 0, lineHeight: 1.35 }}>
          Sinyal ditransmisikan via Wi-Fi atau menara Base Transceiver Station (BTS).
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.bgMintSoft,
          border: `2px solid ${colors.pastelGreenBorderStrong}`,
          borderRadius: 16,
          padding: '24px 18px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 800, color: colors.emeraldDark, backgroundColor: '#ffffff', padding: '4px 12px', borderRadius: 8 }}>
          STEP 4
        </span>
        <SvgIconWrapper size={46} bg="#ffffff">
          <ServerIcon size={22} />
        </SvgIconWrapper>
        <h4 style={{ fontSize: 20, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>Internet &amp; Server</h4>
        <p style={{ fontSize: 16, color: colors.textSecondary, margin: 0, lineHeight: 1.35 }}>
          Server memvalidasi rute data dan meneruskannya ke IP tujuan.
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.cardSurface,
          border: `1.5px solid ${colors.pastelGreenBorder}`,
          borderRadius: 16,
          padding: '24px 18px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 800, color: colors.emeraldPrimary, backgroundColor: colors.bgMintSoft, padding: '4px 12px', borderRadius: 8 }}>
          STEP 5
        </span>
        <SvgIconWrapper size={46}>
          <NetworkIcon size={22} />
        </SvgIconWrapper>
        <h4 style={{ fontSize: 20, fontWeight: 800, color: colors.inkPrimary, margin: 0 }}>Jaringan Penerima</h4>
        <p style={{ fontSize: 16, color: colors.textSecondary, margin: 0, lineHeight: 1.35 }}>
          Paket data tiba di jaringan seluler/Wi-Fi perangkat penerima.
        </p>
      </div>

      <div
        style={{
          backgroundColor: colors.bgMintSoft,
          border: `2px solid ${colors.emeraldPrimary}`,
          borderRadius: 16,
          padding: '24px 18px',
          boxShadow: colors.cardShadowLarge,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          gap: 12,
        }}
      >
        <span style={{ fontSize: 15, fontWeight: 800, color: '#ffffff', backgroundColor: colors.emeraldPrimary, padding: '4px 12px', borderRadius: 8 }}>
          STEP 6
        </span>
        <SvgIconWrapper size={46} bg="#ffffff">
          <CheckCircleIcon size={22} />
        </SvgIconWrapper>
        <h4 style={{ fontSize: 20, fontWeight: 800, color: colors.emeraldDark, margin: 0 }}>Perangkat Penerima</h4>
        <p style={{ fontSize: 16, color: colors.textSecondary, margin: 0, lineHeight: 1.35 }}>
          Pesan didekripsi dan kata <strong>&quot;Halo&quot;</strong> muncul di layar.
        </p>
      </div>
    </div>

    {/* Kesimpulan Studi Kasus */}
    <div
      style={{
        backgroundColor: colors.cardSurface,
        border: `2px solid ${colors.pastelGreenBorderStrong}`,
        borderRadius: 18,
        padding: '24px 36px',
        boxShadow: colors.cardShadow,
        width: '100%',
        maxWidth: 1660,
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: 24,
      }}
    >
      <SvgIconWrapper size={54} bg={colors.bgMintSoft}>
        <SparkleIcon size={28} />
      </SvgIconWrapper>
      <div>
        <h4 style={{ fontSize: 22, fontWeight: 800, color: colors.emeraldDark, margin: '0 0 6px 0' }}>
          Kesimpulan Studi Kasus
        </h4>
        <p style={{ fontSize: 22, color: colors.inkPrimary, margin: 0, fontWeight: 600, lineHeight: 1.4 }}>
          Satu pesan sederhana &quot;Halo&quot; yang tampak instan sesungguhnya melibatkan orkestrasi jutaan komputasi mikro, protokol TCP/IP, enkripsi data, dan infrastruktur telekomunikasi global yang luar biasa presisi.
        </p>
      </div>
    </div>

    <SlideFooter chapter="Studi Kasus Alur Pesan" />
  </div>
);

// ==========================================
// SLIDE 13: ETIKA DALAM KOMUNIKASI DIGITAL
// ==========================================
const Slide13EtikaKomunikasi: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="constellation" />
    <SlideHeader
      category="Netiket &amp; Moralitas Siber"
      title="Etika dalam Komunikasi Digital"
      subtitle="6 Pedoman Moral dan Tanggung Jawab bagi Warga Digital yang Bijak dan Beradab"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28,
        width: '100%',
        maxWidth: 1600,
        zIndex: 1,
      }}
    >
      <FeatureCard
        icon={<CheckCircleIcon size={26} />}
        number="01"
        title="1. Bertanggung Jawab"
        desc="Selalu mempertimbangkan dampak sosial, hukum, dan emosional sebelum membagikan pesan atau komentar di ruang publik."
        tag="Akuntabilitas Pribadi"
      />
      <FeatureCard
        icon={<ShieldLockIcon size={26} />}
        number="02"
        title="2. Menghormati Privasi"
        desc="Tidak menyebarkan data pribadi, nomor kontak, tangkapan layar privat, atau foto orang lain tanpa persetujuan eksplisit."
        tag="Proteksi Hak Privasi"
      />
      <FeatureCard
        icon={<ServerIcon size={26} />}
        number="03"
        title="3. Memverifikasi Fakta"
        desc="Memastikan kebenaran berita melalui sumber resmi kredibel sebelum meneruskan (sharing) informasi ke publik."
        tag="Saring Sebelum Sharing"
      />
      <FeatureCard
        icon={<UsersIcon size={26} />}
        number="04"
        title="4. Menghargai Orang Lain"
        desc="Menghindari ujaran kebencian, kata-kata kasar provokatif, pelecehan siber (cyberbullying), serta merawat sopan santun."
        tag="Empati &amp; Kesantunan"
      />
      <FeatureCard
        icon={<BriefcaseIcon size={26} />}
        number="05"
        title="5. Menghormati Hak Cipta"
        desc="Mencantumkan atribusi sumber resmi dan lisensi saat mengutip karya tulis, foto, musik, atau kode orang lain."
        tag="Integritas Akademik"
      />
      <FeatureCard
        icon={<LockIcon size={26} />}
        number="06"
        title="6. Menjaga Keamanan"
        desc="Menggunakan kata sandi kuat, tidak menyebarkan kredensial, dan bijak dalam menggunakan jaringan publik."
        tag="Kesadaran Keamanan Bersama"
        highlight={true}
      />
    </div>

    <SlideFooter chapter="Etika Komunikasi Digital" />
  </div>
);

// ==========================================
// SLIDE 14: MASA DEPAN KOMUNIKASI BERBASIS TEKNOLOGI
// ==========================================
const Slide14MasaDepanKomunikasi: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <SlideHeader
      category="Tren &amp; Horizon Masa Depan"
      title="Masa Depan Komunikasi Berbasis Teknologi"
      subtitle="6 Inovasi Mutakhir yang Sedang Merevolusi Cara Manusia dan Mesin Berinteraksi"
    />

    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 28,
        width: '100%',
        maxWidth: 1600,
        zIndex: 1,
      }}
    >
      <FeatureCard
        icon={<BrainAiIcon size={26} />}
        number="01"
        title="1. Generative AI"
        desc="Asisten komunikasi otonom, penyusunan draft pesan cerdas, serta sintesis ringkasan percakapan secara instan."
        tag="Kecerdasan Artifisial"
      />
      <FeatureCard
        icon={<SparkleIcon size={26} />}
        number="02"
        title="2. Natural Language (NLP)"
        desc="Pemahaman konteks bahasa manusia yang semakin peka nuansa, emosi, idiom bahasa lokal, dan dialek regional."
        tag="Pemrosesan Bahasa Alami"
      />
      <FeatureCard
        icon={<TranslateIcon size={26} />}
        number="03"
        title="3. Real-Time Translation"
        desc="Penerjemahan suara dan teks secara simultan saat percakapan langsung, meruntuhkan batasan bahasa di dunia."
        tag="Komunikasi Tanpa Hambatan Bahasa"
      />
      <FeatureCard
        icon={<PhoneIcon size={26} />}
        number="04"
        title="4. Advanced Speech Tech"
        desc="Interaksi suara tingkat tinggi (voice-driven interface) dengan pengenalan aksen presisi dan kloning suara etis."
        tag="Antarmuka Suara Interaktif"
      />
      <FeatureCard
        icon={<NetworkIcon size={26} />}
        number="05"
        title="5. AR / VR Spatial Comm"
        desc="Ruang pertemuan hologram dan virtual reality 3D imersif yang menghadirkan sensasi kehadiran fisik utuh."
        tag="Komunikasi Spasial Imersif"
        highlight={true}
      />
      <FeatureCard
        icon={<ServerIcon size={26} />}
        number="06"
        title="6. Smart Automation"
        desc="Sistem perutean informasi otomatis, penjadwalan cerdas terintegrasi, dan penyaringan spam proaktif."
        tag="Otomasi Alur Produktivitas"
      />
    </div>

    <SlideFooter chapter="Masa Depan Komunikasi" />
  </div>
);

// ==========================================
// SLIDE 15: KESIMPULAN
// ==========================================
const Slide15Kesimpulan: Page = () => (
  <div style={baseCanvasStyle}>
    <BackgroundGraphic variant="network" />
    <SlideHeader
      category="Rangkuman &amp; Refleksi Akhir"
      title="Kesimpulan"
      subtitle="Refleksi Perubahan Paradigma Komunikasi Manusia dan Kunci Pemanfaatannya"
    />

    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 28,
        width: '100%',
        maxWidth: 1600,
        zIndex: 1,
      }}
    >
      {/* 5 Transformational Shifts */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',
          gap: 18,
        }}
      >
        <div
          style={{
            backgroundColor: colors.cardSurface,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 20px',
            textAlign: 'center',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 16, color: colors.mutedText, textDecoration: 'line-through' }}>Terbatas</div>
          <ArrowRightIcon size={20} color={colors.emeraldPrimary} />
          <div style={{ fontSize: 24, fontWeight: 800, color: colors.emeraldDark }}>Terhubung</div>
        </div>

        <div
          style={{
            backgroundColor: colors.cardSurface,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 20px',
            textAlign: 'center',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 16, color: colors.mutedText, textDecoration: 'line-through' }}>Lambat</div>
          <ArrowRightIcon size={20} color={colors.emeraldPrimary} />
          <div style={{ fontSize: 24, fontWeight: 800, color: colors.emeraldDark }}>Real-Time</div>
        </div>

        <div
          style={{
            backgroundColor: colors.cardSurface,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 20px',
            textAlign: 'center',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 16, color: colors.mutedText, textDecoration: 'line-through' }}>Lokal</div>
          <ArrowRightIcon size={20} color={colors.emeraldPrimary} />
          <div style={{ fontSize: 24, fontWeight: 800, color: colors.emeraldDark }}>Global</div>
        </div>

        <div
          style={{
            backgroundColor: colors.cardSurface,
            border: `1.5px solid ${colors.pastelGreenBorder}`,
            borderRadius: 16,
            padding: '24px 20px',
            textAlign: 'center',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 16, color: colors.mutedText, textDecoration: 'line-through' }}>Teks Murni</div>
          <ArrowRightIcon size={20} color={colors.emeraldPrimary} />
          <div style={{ fontSize: 24, fontWeight: 800, color: colors.emeraldDark }}>Multimedia</div>
        </div>

        <div
          style={{
            backgroundColor: colors.bgMintSoft,
            border: `2px solid ${colors.pastelGreenBorderStrong}`,
            borderRadius: 16,
            padding: '24px 20px',
            textAlign: 'center',
            boxShadow: colors.cardShadowLarge,
            display: 'flex',
            flexDirection: 'column',
            gap: 8,
          }}
        >
          <div style={{ fontSize: 16, color: colors.mutedText, textDecoration: 'line-through' }}>Manual</div>
          <ArrowRightIcon size={20} color={colors.emeraldPrimary} />
          <div style={{ fontSize: 24, fontWeight: 800, color: colors.emeraldDark }}>Cerdas &amp; AI</div>
        </div>
      </div>

      {/* Big Closing Takeaway Quote */}
      <div
        style={{
          backgroundColor: colors.bgMintSoft,
          border: `2px solid ${colors.emeraldPrimary}`,
          borderRadius: 22,
          padding: '40px 48px',
          boxShadow: colors.cardShadowLarge,
          display: 'flex',
          alignItems: 'center',
          gap: 32,
        }}
      >
        <SvgIconWrapper size={76} bg="#ffffff" border={colors.pastelGreenBorderStrong}>
          <SparkleIcon size={38} />
        </SvgIconWrapper>
        <div>
          <span
            style={{
              fontSize: 18,
              fontWeight: 800,
              color: colors.emeraldDark,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
            }}
          >
            Pesan Refleksi Utama
          </span>
          <p
            style={{
              fontSize: 30,
              fontWeight: 700,
              color: colors.inkPrimary,
              margin: '12px 0 0 0',
              lineHeight: 1.45,
            }}
          >
            &quot;Teknologi adalah alat, sedangkan etika, literasi digital, dan kesadaran keamanan dari penggunanya yang menentukan manfaat akhirnya.&quot;
          </p>
        </div>
      </div>
    </div>

    <SlideFooter chapter="Penutup &amp; Refleksi" />
  </div>
);

// Per-page transition overrides: the cover materializes with SETTLE and the
// closing page fades out/in with DISSOLVE; slides 2–14 inherit RISE.
(Slide01Cover as { transition?: SlideTransition }).transition = settle;
(Slide15Kesimpulan as { transition?: SlideTransition }).transition = dissolve;

// Metadata OpenSlide
export const meta: SlideMeta = {
  title: 'Penerapan Teknologi Komputer dalam Komunikasi',
  createdAt: '2026-10-18T09:52:49.350Z',
};

// Complete Speaker Notes Index-Aligned for the 15 Slides
export const notes: (string | undefined)[] = [
  // Slide 1
  `Selamat datang di presentasi mengenai 'Penerapan Teknologi Komputer dalam Bidang Komunikasi'.
Pada sesi ini kita akan mengulas bagaimana komputasi telah mengubah cara umat manusia berinteraksi, berkolaborasi, dan bertukar informasi.
Topik ini merupakan bagian penting dalam mata kuliah Pengantar Teknologi Komputer dan Informatika.`,

  // Slide 2
  `Mari kita mulai dengan menelusuri evolusi komunikasi manusia.
Dahulu komunikasi sangat terikat oleh jarak fisik: surat pos memakan waktu berhari-hari, pertemuan tatap muka menuntut perjalanan panjang, dan telegraf serta telepon analog masih terbatas.
Lalu tibalah era komputer dan internet yang melahirkan email, chat instan, video conference, dan media sosial.
Kini, kita memasuki era Artificial Intelligence, di mana komunikasi diperkuat dengan chatbot, penerjemah instan multi-bahasa, serta transkripsi suara otomatis.`,

  // Slide 3
  `Pada slide ini kita menelaah empat konsep dasar yang melandasi topik ini:
1. Komunikasi sebagai proses penyampaian pesan dari pengirim ke penerima.
2. Komputer sebagai mesin pemroses data input menjadi informasi yang bernilai.
3. Teknologi komunikasi sebagai seluruh sarana dan saluran media penghubung.
4. Penerapan komputer dalam komunikasi, yaitu sinergi di mana komputer menjadi otak pemroses, penyimpan, pengaman, dan penyaji pesan digital.`,

  // Slide 4
  `Perhatikan garis waktu delapan tahapan ini.
Perjalanan evolusi ini memperlihatkan percepatan eksponensial. Dari surat fisik, telegraf kabel, telepon suara analog, kemunculan komputer pribadi & email, revolusi internet WWW & instant messaging, era smartphone & media sosial, video conference & cloud, hingga hari ini: komunikasi cerdas berbasis AI.`,

  // Slide 5
  `Bagaimana sebenarnya komputer memungkinkan komunikasi?
Terdapat tujuh tahapan teknis berurutan:
Pengguna mengetik pesan -> diubah ke data biner 0 dan 1 -> diproses oleh sistem operasi & aplikasi -> dikirim melalui gelombang radio atau fiber optik -> dirutekan oleh server cloud -> ditangkap oleh perangkat penerima -> didekripsi dan ditampilkan di layar.
Semua ini terjadi hanya dalam sepersekian detik.`,

  // Slide 6
  `Penerapan komputer dalam komunikasi dapat kita kelompokkan ke dalam empat bentuk utama:
Pertama, komunikasi personal seperti WhatsApp dan Telegram.
Kedua, komunikasi formal dan bisnis seperti email korporat dan Zoom.
Ketiga, komunikasi pendidikan melalui Learning Management System (LMS) dan webinar akademik.
Keempat, komunikasi sosial publik melalui platform media sosial dan forum komunitas dunia.`,

  // Slide 7
  `Dalam kehidupan sehari-hari, kita merasakan kehadirannya di berbagai sektor:
Di pendidikan: kuliah online dan submit tugas digital.
Di dunia kerja: rapat online lintas negara dan kolaborasi dokumen bersamaan.
Di bisnis: layanan pelanggan chatbot 24/7 dan promosi instan.
Di kehidupan sosial: video call dengan keluarga serta jejaring pertemanan.`,

  // Slide 8
  `Mengapa teknologi komputer sangat krusial dalam komunikasi?
Inilah tujuh manfaat terbesarnya:
Kecepatan transfer data instan, jangkauan global tanpa sekat geografis, penghematan biaya operasional, kolaborasi multi-pengguna serentak, kemudahan dokumentasi arsip digital, kekayaan format multimedia, serta aksesibilitas bagi penyandang disabilitas.`,

  // Slide 9
  `Namun di balik manfaat besar, terdapat tantangan nyata yang harus kita hadapi:
1. Banjir hoaks dan misinformasi.
2. Ancaman kebocoran privasi dan pencurian data pribadi.
3. Miskomunikasi akibat keterbatasan ekspresi teks.
4. Information overload dan kecanduan gawai.
5. Kesenjangan akses infrastruktur digital antara kota dan pelosok.`,

  // Slide 10
  `Untuk menjawab tantangan keamanan, kita memerlukan lima pilar perlindungan:
Enkripsi end-to-end agar pesan tidak bisa disadap di tengah jalan, autentikasi dua faktor (2FA) dan biometrik untuk menjaga akun, kewaspadaan terhadap penipuan phishing, regulasi privasi data, serta peningkatan literasi keamanan bagi setiap pengguna.`,

  // Slide 11
  `Jika kita kaji dampaknya terhadap masyarakat, selalu ada dua sisi mata uang:
Sisi positifnya membuka peluang pendidikan luas, efisiensi bisnis, dan kerja sama global.
Sisi negatifnya memunculkan isolasi sosial, polarisasi akibat ruang gema di medsos, serta disrupsi tenaga kerja yang harus diantisipasi dengan peningkatan keahlian baru.`,

  // Slide 12
  `Mari kita telaah studi kasus sederhana ini: pengiriman kata 'Halo'.
Kata sederhana ini melewati enam tahapan kompleks dari pengetikan, kompresi biner, transmisi gelombang Wi-Fi/seluler, perutean ribuan kilometer di server internet, hingga akhirnya tiba dan didekripsi di layar penerima. Hal ini menunjukkan betapa canggihnya infrastruktur komputasi kita saat ini.`,

  // Slide 13
  `Agar ekosistem digital tetap sehat dan manusiawi, etika digital atau netiket mutlak dijunjung tinggi:
Bertanggung jawab atas setiap unggahan, menghormati privasi orang lain, selalu menyaring kebenaran berita sebelum membagikan, menjaga kesantunan dan empati, menghormati hak cipta intelektual, serta aktif menjaga keamanan akun.`,

  // Slide 14
  `Menatap ke depan, komunikasi berbasis teknologi akan semakin revolusioner:
Integrasi Generative AI yang semakin pintar, pemahaman bahasa alami (NLP) yang lebih emosional dan kontekstual, penerjemahan suara real-time antar-bahasa, antarmuka percakapan suara, hingga komunikasi spasial AR dan VR yang membuat kita serasa bertatap muka secara langsung.`,

  // Slide 15
  `Sebagai penutup, kita telah menyaksikan perubahan fundamental: dari terbatas menjadi terhubung, lambat menjadi real-time, lokal menjadi global, teks menjadi multimedia, dan manual menjadi cerdas.
Ingatlah pesan penting ini:
Teknologi hanyalah alat (tools). Etika, literasi, dan kebijaksanaan manusialah yang akan menentukan dampak positifnya bagi peradaban. Terima kasih.`,
];

// Default Export 15 Pages
export default [
  Slide01Cover,
  Slide02MengapaBerubah,
  Slide03KonsepDasar,
  Slide04EvolusiTimeline,
  Slide05CaraKerjaPesan,
  Slide06BentukPenerapan,
  Slide07AktivitasSehariHari,
  Slide08ManfaatUtama,
  Slide09TantanganDigital,
  Slide10KeamananDigital,
  Slide11DampakMasyarakat,
  Slide12StudiKasusPesan,
  Slide13EtikaKomunikasi,
  Slide14MasaDepanKomunikasi,
  Slide15Kesimpulan,
] satisfies Page[];
