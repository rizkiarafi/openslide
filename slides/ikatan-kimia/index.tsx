import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

// Import local subtle background SVG assets
import bgConstellation from './assets/bg-chemical-constellation.svg';
import bgLattice from './assets/bg-crystal-lattice.svg';
import bgOrbitals from './assets/bg-molecular-orbitals.svg';
import bgElectronSea from './assets/bg-electron-sea.svg';

// Web fonts injection: Plus Jakarta Sans (Modern Clean Body), Newsreader (Editorial Serif Headings), JetBrains Mono (Chemical Formulas & Symbols)
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap';
const FONT_LINK_ID = 'osd-webfont-ikatan-kimia';

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
    bg: '#ffffff', // Crisp white background
    text: '#0f172a', // Deep slate navy for high-contrast legibility
    accent: '#2563eb', // Royal sapphire blue accent
  },
  fonts: {
    display: '"Newsreader", Georgia, serif',
    body: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 132,
    body: 32,
  },
  radius: 16,
};

const fontSerif = '"Newsreader", Georgia, serif';
const fontSans = '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, monospace';

// High-definition scientific blue and white color system
const colors = {
  bluePrimary: '#2563eb', // Royal sapphire blue
  blueDark: '#1d4ed8', // Deep cobalt
  blueNavy: '#0f172a', // Slate ink navy
  blueSky: '#0284c7', // Bright sky blue
  blueCyan: '#06b6d4', // Cyan accent
  blueLight: '#38bdf8', // Light cyan highlight
  blueSoft: 'rgba(37, 99, 235, 0.08)', // Tinted blue surface
  blueSoftHover: 'rgba(37, 99, 235, 0.14)',
  blueBorder: 'rgba(37, 99, 235, 0.22)',
  blueBorderStrong: 'rgba(37, 99, 235, 0.45)',

  ink: '#0f172a', // Primary typography
  text: '#1e293b', // Body copy
  muted: '#475569', // Supporting labels
  dim: '#64748b', // Subtle metadata

  cardBg: '#ffffff', // Pure white card surface
  cardBgGlass: 'rgba(255, 255, 255, 0.88)',
  cardBorder: 'rgba(37, 99, 235, 0.16)',
  cardShadow: '0 12px 36px -8px rgba(37, 99, 235, 0.10), 0 2px 10px -2px rgba(15, 23, 42, 0.04)',

  emerald: '#059669', // Stability / Oktet
  emeraldSoft: 'rgba(5, 150, 105, 0.08)',
  emeraldBorder: 'rgba(5, 150, 105, 0.25)',

  amber: '#d97706', // Anion / Energy
  amberSoft: 'rgba(217, 119, 6, 0.08)',
  amberBorder: 'rgba(217, 119, 6, 0.25)',

  rose: '#e11d48', // Pengecualian / Unstable
  roseSoft: 'rgba(225, 29, 72, 0.08)',
  roseBorder: 'rgba(225, 29, 72, 0.25)',
};

// Base canvas style for 1920x1080 canvas
const canvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  backgroundImage:
    'radial-gradient(1300px circle at 90% 12%, rgba(56, 189, 248, 0.07), transparent 60%), radial-gradient(1100px circle at 10% 88%, rgba(37, 99, 235, 0.05), transparent 55%)',
  color: colors.text,
  fontFamily: fontSans,
  padding: '60px 100px 50px 100px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

// Symmetrical Centered Layout container for Slide 2 onwards
const centeredContentStyle: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: 1620,
  margin: '0 auto',
};

// ================= BACKGROUND IMAGE COMPONENT =================
type BackgroundMotif = 'constellation' | 'lattice' | 'orbitals' | 'electron-sea';

const SubtleBackground = ({ motif }: { motif: BackgroundMotif }) => {
  const assetMap = {
    constellation: bgConstellation,
    lattice: bgLattice,
    orbitals: bgOrbitals,
    'electron-sea': bgElectronSea,
  };

  const currentAsset = assetMap[motif] || bgConstellation;

  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* Background SVG Asset */}
      <img
        src={currentAsset}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.9,
        }}
      />
      {/* Fine scientific watermark coordinates */}
      <div
        style={{
          position: 'absolute',
          top: 36,
          right: 50,
          fontFamily: fontMono,
          fontSize: 12,
          letterSpacing: '0.18em',
          color: colors.dim,
          opacity: 0.5,
          textTransform: 'uppercase',
        }}
      >
        MODUL IKATAN KIMIA • CHEM-101 • V.2026
      </div>
      <div
        style={{
          position: 'absolute',
          bottom: 30,
          left: 50,
          fontFamily: fontMono,
          fontSize: 12,
          letterSpacing: '0.14em',
          color: colors.dim,
          opacity: 0.45,
        }}
      >
        SEC // STRUCTURAL & BONDING THEORY
      </div>
    </div>
  );
};

// ================= GLOBAL SLIDE HEADER & FOOTER =================
const SlideHeader = ({
  category,
  title,
  subtitle,
  center = true,
}: {
  category: string;
  title: string;
  subtitle?: string;
  center?: boolean;
}) => (
  <div
    style={{
      position: 'relative',
      zIndex: 1,
      marginBottom: 24,
      display: 'flex',
      flexDirection: 'column',
      alignItems: center ? 'center' : 'flex-start',
      textAlign: center ? 'center' : 'left',
      width: '100%',
    }}
  >
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 14px',
        borderRadius: 20,
        background: colors.blueSoft,
        border: `1px solid ${colors.blueBorder}`,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          background: colors.bluePrimary,
          boxShadow: `0 0 8px ${colors.bluePrimary}`,
        }}
      />
      <span
        style={{
          fontSize: 13,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: colors.blueDark,
          fontFamily: fontSans,
        }}
      >
        {category}
      </span>
    </div>
    <h2
      style={{
        fontFamily: fontSerif,
        fontSize: 52,
        fontWeight: 600,
        lineHeight: 1.12,
        color: colors.ink,
        margin: 0,
        letterSpacing: '-0.02em',
        textAlign: center ? 'center' : 'left',
      }}
    >
      {title}
    </h2>
    {subtitle && (
      <p
        style={{
          fontSize: 20,
          color: colors.muted,
          marginTop: 8,
          marginBottom: 0,
          lineHeight: 1.45,
          maxWidth: 1260,
          textAlign: center ? 'center' : 'left',
          marginLeft: center ? 'auto' : 0,
          marginRight: center ? 'auto' : 0,
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

const SlideFooter = ({
  currentTopic,
  page,
}: {
  currentTopic?: string;
  page?: number;
}) => {
  let currentNum = page ?? 1;
  let totalNum = 12;

  try {
    const pageContext = useSlidePageNumber();
    if (pageContext && typeof pageContext.current === 'number') {
      currentNum = pageContext.current;
      totalNum = pageContext.total;
    }
  } catch {
    if (page) currentNum = page;
  }

  const formatNum = (n: number) => String(n).padStart(2, '0');

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 16,
        borderTop: `1px solid ${colors.blueBorder}`,
        fontSize: 14,
        color: colors.dim,
        fontFamily: fontMono,
        width: '100%',
        flexShrink: 0,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: colors.bluePrimary, fontWeight: 700 }}>IKATAN KIMIA</span>
        <span style={{ opacity: 0.4 }}>|</span>
        <span style={{ fontFamily: fontSans, color: colors.muted }}>
          {currentTopic || 'Struktur Atom, Valensi, & Interaksi Molekul'}
        </span>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 6,
          background: colors.blueSoft,
          padding: '6px 14px',
          borderRadius: 8,
          border: `1px solid ${colors.blueBorder}`,
        }}
      >
        <span style={{ letterSpacing: '0.08em', color: colors.blueDark, fontWeight: 700, fontSize: 13 }}>
          HALAMAN {formatNum(currentNum)}
        </span>
        <span style={{ color: colors.blueLight, fontWeight: 400 }}>/</span>
        <span style={{ letterSpacing: '0.08em', color: colors.blueDark, fontWeight: 600, fontSize: 13 }}>
          {formatNum(totalNum)}
        </span>
      </div>
    </div>
  );
};

// ================= REUSABLE UI COMPONENTS (Instantiated explicitly, NO array.map) =================

// Info Box Card for Content slides
const InfoBox = ({
  icon,
  badge,
  title,
  desc,
  highlight,
  tone = 'blue',
  center = true,
}: {
  icon: string;
  badge?: string;
  title: string;
  desc: string;
  highlight?: string;
  tone?: 'blue' | 'emerald' | 'amber' | 'rose';
  center?: boolean;
}) => {
  const toneColors = {
    blue: {
      border: colors.blueBorder,
      bg: colors.cardBg,
      badgeBg: colors.blueSoft,
      badgeText: colors.blueDark,
      accent: colors.bluePrimary,
    },
    emerald: {
      border: colors.emeraldBorder,
      bg: colors.cardBg,
      badgeBg: colors.emeraldSoft,
      badgeText: colors.emerald,
      accent: colors.emerald,
    },
    amber: {
      border: colors.amberBorder,
      bg: colors.cardBg,
      badgeBg: colors.amberSoft,
      badgeText: colors.amber,
      accent: colors.amber,
    },
    rose: {
      border: colors.roseBorder,
      bg: colors.cardBg,
      badgeBg: colors.roseSoft,
      badgeText: colors.rose,
      accent: colors.rose,
    },
  }[tone];

  return (
    <div
      style={{
        background: toneColors.bg,
        border: `1px solid ${toneColors.border}`,
        borderRadius: 16,
        padding: '24px 28px',
        boxShadow: colors.cardShadow,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: center ? 'center' : 'stretch',
        textAlign: center ? 'center' : 'left',
        flex: 1,
        position: 'relative',
        transition: 'all 0.2s ease',
      }}
    >
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: center ? 'center' : 'flex-start', width: '100%' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: center ? 'center' : 'space-between',
            alignItems: 'center',
            gap: 12,
            marginBottom: 14,
            width: '100%',
          }}
        >
          <div
            style={{
              width: 44,
              height: 44,
              borderRadius: 12,
              background: toneColors.badgeBg,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 22,
            }}
          >
            {icon}
          </div>
          {badge && (
            <span
              style={{
                fontFamily: fontMono,
                fontSize: 12,
                fontWeight: 700,
                color: toneColors.badgeText,
                background: toneColors.badgeBg,
                padding: '4px 10px',
                borderRadius: 8,
              }}
            >
              {badge}
            </span>
          )}
        </div>
        <h3
          style={{
            fontFamily: fontSans,
            fontSize: 23,
            fontWeight: 700,
            color: colors.ink,
            margin: '0 0 10px 0',
            lineHeight: 1.25,
            textAlign: center ? 'center' : 'left',
          }}
        >
          {title}
        </h3>
        <p
          style={{
            fontSize: 16,
            color: colors.muted,
            lineHeight: 1.55,
            margin: 0,
            textAlign: center ? 'center' : 'left',
          }}
        >
          {desc}
        </p>
      </div>
      {highlight && (
        <div
          style={{
            marginTop: 16,
            paddingTop: 12,
            borderTop: `1px dashed ${toneColors.border}`,
            fontFamily: fontMono,
            fontSize: 14,
            fontWeight: 600,
            color: toneColors.accent,
            textAlign: center ? 'center' : 'left',
            width: '100%',
          }}
        >
          {highlight}
        </div>
      )}
    </div>
  );
};

// Chemical Example Card for specific bond reactions
const ChemReactionCard = ({
  formula,
  type,
  mechanism,
  properties,
}: {
  formula: string;
  type: string;
  mechanism: string;
  properties: string;
}) => (
  <div
    style={{
      background: colors.cardBg,
      border: `1px solid ${colors.blueBorder}`,
      borderRadius: 16,
      padding: '22px 26px',
      boxShadow: colors.cardShadow,
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      alignItems: 'center',
      textAlign: 'center',
    }}
  >
    <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <span
          style={{
            fontFamily: fontMono,
            fontSize: 28,
            fontWeight: 700,
            color: colors.blueDark,
          }}
        >
          {formula}
        </span>
        <span
          style={{
            fontSize: 12,
            fontWeight: 700,
            padding: '3px 10px',
            borderRadius: 6,
            background: colors.blueSoft,
            color: colors.blueDark,
            fontFamily: fontMono,
          }}
        >
          {type}
        </span>
      </div>
      <div style={{ fontSize: 16, color: colors.text, lineHeight: 1.5, marginBottom: 10, textAlign: 'center' }}>
        <strong style={{ color: colors.ink }}>Mekanisme: </strong>
        {mechanism}
      </div>
    </div>
    <div
      style={{
        width: '100%',
        background: '#f8fafc',
        borderRadius: 10,
        padding: '10px 14px',
        border: `1px solid rgba(15, 23, 42, 0.06)`,
        fontSize: 14,
        color: colors.muted,
        textAlign: 'center',
        boxSizing: 'border-box',
      }}
    >
      <span style={{ fontWeight: 600, color: colors.bluePrimary }}>Karakter: </span>
      {properties}
    </div>
  </div>
);

// Comparison Table Cell
const TableRow = ({
  col1,
  col2,
  col3,
  col4,
  isHeader = false,
}: {
  col1: string;
  col2: string;
  col3: string;
  col4: string;
  isHeader?: boolean;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '280px 1fr 1fr 1fr',
      gap: 20,
      padding: isHeader ? '14px 20px' : '15px 20px',
      background: isHeader ? colors.blueSoft : colors.cardBg,
      borderBottom: `1px solid ${colors.blueBorder}`,
      alignItems: 'center',
      fontFamily: fontSans,
      fontWeight: isHeader ? 700 : 400,
      fontSize: 16,
      color: isHeader ? colors.blueDark : colors.text,
      borderRadius: isHeader ? 10 : 0,
    }}
  >
    <div style={{ fontWeight: isHeader ? 700 : 600, color: isHeader ? colors.blueDark : colors.ink }}>{col1}</div>
    <div style={{ color: isHeader ? colors.blueDark : colors.text, textAlign: 'center' }}>{col2}</div>
    <div style={{ color: isHeader ? colors.blueDark : colors.text, textAlign: 'center' }}>{col3}</div>
    <div style={{ color: isHeader ? colors.blueDark : colors.text, textAlign: 'center' }}>{col4}</div>
  </div>
);

// ================= PAGE 1: COVER SLIDE =================
const PageCover: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="constellation" />
    <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      {/* Top Badges */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            padding: '6px 18px',
            borderRadius: 30,
            background: colors.cardBg,
            border: `1.5px solid ${colors.blueBorderStrong}`,
            boxShadow: colors.cardShadow,
          }}
        >
          <span style={{ fontSize: 16 }}>⚛️</span>
          <span
            style={{
              fontFamily: fontMono,
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              color: colors.blueDark,
            }}
          >
            KIMIA DASAR & STRUKTUR MATERI
          </span>
        </div>
        <div
          style={{
            fontFamily: fontMono,
            fontSize: 12,
            color: colors.blueSky,
            padding: '5px 14px',
            borderRadius: 20,
            background: colors.blueSoft,
            border: `1px solid ${colors.blueBorder}`,
            letterSpacing: '0.05em',
          }}
        >
          PRESENTASI KELOMPOK
        </div>
      </div>

      {/* Hero Title */}
      <h1
        style={{
          fontFamily: fontSerif,
          fontSize: 90,
          fontWeight: 700,
          lineHeight: 1.05,
          color: colors.ink,
          margin: '0 0 14px 0',
          letterSpacing: '-0.03em',
        }}
      >
        Ikatan <span style={{ color: colors.bluePrimary, fontStyle: 'italic' }}>Kimia</span>
      </h1>

      {/* Subtitle */}
      <p
        style={{
          fontSize: 22,
          lineHeight: 1.4,
          color: colors.muted,
          maxWidth: 1300,
          margin: '0 0 22px 0',
          fontWeight: 400,
        }}
      >
        Konsep Fundamental Pembentukan Ikatan Ion, Kovalen (Tunggal/Rangkap/Koordinasi), Ikatan Logam,
        serta Hubungannya dengan Geometri & Sifat Fisis Senyawa.
      </p>

      {/* 4 Feature Badges (Compact) */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, maxWidth: 1440, marginBottom: 22 }}>
        <div
          style={{
            background: colors.cardBgGlass,
            border: `1px solid ${colors.blueBorder}`,
            borderRadius: 12,
            padding: '12px 16px',
            boxShadow: colors.cardShadow,
          }}
        >
          <div style={{ fontSize: 12, fontFamily: fontMono, color: colors.blueSky, fontWeight: 700, marginBottom: 2 }}>
            PILAR 01
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.ink }}>Kaidah Oktet & Duplet</div>
          <div style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>Kestabilan gas mulia & Lewis</div>
        </div>

        <div
          style={{
            background: colors.cardBgGlass,
            border: `1px solid ${colors.blueBorder}`,
            borderRadius: 12,
            padding: '12px 16px',
            boxShadow: colors.cardShadow,
          }}
        >
          <div style={{ fontSize: 12, fontFamily: fontMono, color: colors.bluePrimary, fontWeight: 700, marginBottom: 2 }}>
            PILAR 02
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.ink }}>Ikatan Ionik (Elektrovalen)</div>
          <div style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>Serah terima elektron & kisi NaCl</div>
        </div>

        <div
          style={{
            background: colors.cardBgGlass,
            border: `1px solid ${colors.blueBorder}`,
            borderRadius: 12,
            padding: '12px 16px',
            boxShadow: colors.cardShadow,
          }}
        >
          <div style={{ fontSize: 12, fontFamily: fontMono, color: colors.blueSky, fontWeight: 700, marginBottom: 2 }}>
            PILAR 03
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.ink }}>Ikatan Kovalen & Koordinasi</div>
          <div style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>Penggunaan bersama pasangan PEI</div>
        </div>

        <div
          style={{
            background: colors.cardBgGlass,
            border: `1px solid ${colors.blueBorder}`,
            borderRadius: 12,
            padding: '12px 16px',
            boxShadow: colors.cardShadow,
          }}
        >
          <div style={{ fontSize: 12, fontFamily: fontMono, color: colors.blueDark, fontWeight: 700, marginBottom: 2 }}>
            PILAR 04
          </div>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.ink }}>Ikatan Logam & Gaya Fisik</div>
          <div style={{ fontSize: 13, color: colors.muted, marginTop: 2 }}>Lautan elektron & gaya fisik</div>
        </div>
      </div>

      {/* Author / Student Team Section */}
      <div style={{ maxWidth: 1440, width: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: colors.blueDark,
              background: colors.blueSoft,
              padding: '4px 12px',
              borderRadius: 6,
              border: `1px solid ${colors.blueBorder}`,
            }}
          >
            DISUSUN OLEH • ANGGOTA KELOMPOK
          </div>
          <div style={{ height: 1, flex: 1, background: colors.blueBorder, opacity: 0.6 }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
          {/* Member 1 */}
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 12,
              padding: '11px 16px',
              boxShadow: colors.cardShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                RACHMATDANI PERMANA AULIAN
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 13, color: colors.bluePrimary, fontWeight: 700, marginTop: 2 }}>
                NPM: 50426752
              </div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.75 }}>🎓</div>
          </div>

          {/* Member 2 */}
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 12,
              padding: '11px 16px',
              boxShadow: colors.cardShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                RASYA ZAHRAN MARDIANSYAH
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 13, color: colors.bluePrimary, fontWeight: 700, marginTop: 2 }}>
                NPM: 50426803
              </div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.75 }}>🎓</div>
          </div>

          {/* Member 3 */}
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 12,
              padding: '11px 16px',
              boxShadow: colors.cardShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                RIZKI ARAFI ZAIDAN
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 13, color: colors.bluePrimary, fontWeight: 700, marginTop: 2 }}>
                NPM: 50426848
              </div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.75 }}>🎓</div>
          </div>

          {/* Member 4 */}
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 12,
              padding: '11px 16px',
              boxShadow: colors.cardShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                RIZKIANI YUNINGSI LOUNYANYI
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 13, color: colors.bluePrimary, fontWeight: 700, marginTop: 2 }}>
                NPM: 50426850
              </div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.75 }}>🎓</div>
          </div>

          {/* Member 5 */}
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 12,
              padding: '11px 16px',
              boxShadow: colors.cardShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                SHARMAN RADHITYA BILAL
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 13, color: colors.bluePrimary, fontWeight: 700, marginTop: 2 }}>
                NPM: 50426900
              </div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.75 }}>🎓</div>
          </div>

          {/* Member 6 */}
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 12,
              padding: '11px 16px',
              boxShadow: colors.cardShadow,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: 12,
            }}
          >
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: colors.ink, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                WAHYU RAKHA SAPUTRA
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 13, color: colors.bluePrimary, fontWeight: 700, marginTop: 2 }}>
                NPM: 50426943
              </div>
            </div>
            <div style={{ fontSize: 18, opacity: 0.75 }}>🎓</div>
          </div>
        </div>
      </div>
    </div>

    <SlideFooter page={1} currentTopic="Modul Pembelajaran Interaktif Kimia Dasar" />
  </div>
);

// ================= PAGE 2: KESTABILAN ATOM & KAIDAH OKTET/DUPLET =================
const PageKestabilan: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="orbitals" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Fondasi Teori Ikatan"
        title="Kestabilan Atom: Kaidah Duplet & Oktet"
        subtitle="Di alam, atom-atom unsur saling bergabung karena ingin mencapai kestabilan termodinamika dengan konfigurasi elektron menyerupai Gas Mulia (Golongan VIIIA)."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 16, width: '100%' }}>
        <InfoBox
          icon="⚡"
          badge="PRINSIP DASAR"
          title="Kecenderungan Gas Mulia"
          desc="Gas mulia (He, Ne, Ar, Kr, Xe, Rn) bersifat sangat stabil dan sukar bereaksi karena memiliki orbital terluar yang telah terisi penuh oleh elektron valensi."
          highlight="Energi potensial terendah = kestabilan maksimal"
          tone="blue"
        />

        <InfoBox
          icon="2️⃣"
          badge="KAIDAH DUPLET"
          title="Kaidah Duplet (2 Elektron)"
          desc="Berlaku khusus untuk atom bernomor atom kecil (H, Li, Be, B) yang berusaha memiliki 2 elektron valensi pada kulit K, meniru konfigurasi Helium (1s²)."
          highlight="Contoh: H + H → H₂ (masing-masing 2e⁻)"
          tone="emerald"
        />

        <InfoBox
          icon="8️⃣"
          badge="KAIDAH OKTET"
          title="Kaidah Oktet (8 Elektron)"
          desc="Diajukan oleh G.N. Lewis dan W. Kossel. Atom-atom cenderung melepaskan, menerima, atau berbagi elektron hingga memiliki 8 elektron valensi (ns² np⁶)."
          highlight="Meniru konfigurasi Ne, Ar, dkk (8 elektron)"
          tone="blue"
        />
      </div>

      <div
        style={{
          marginTop: 20,
          background: colors.cardBg,
          border: `1px solid ${colors.blueBorder}`,
          borderRadius: 14,
          padding: '16px 28px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            padding: '8px 18px',
            background: colors.blueSoft,
            borderRadius: 10,
            fontFamily: fontMono,
            fontWeight: 700,
            fontSize: 20,
            color: colors.blueDark,
            whiteSpace: 'nowrap',
          }}
        >
          LAMBANG LEWIS
        </div>
        <div style={{ fontSize: 16, lineHeight: 1.5, color: colors.text, textAlign: 'left', maxWidth: 1000 }}>
          Penggambaran elektron valensi menggunakan titik (•) atau silang (×) di sekeliling lambang atom.
          Elektron yang belum berpasangan bertindak sebagai penyedia elektron untuk berikatan kimia.
        </div>
      </div>
    </div>

    <SlideFooter page={2} currentTopic="Kaidah Kestabilan Lewis & Kossel" />
  </div>
);

// ================= PAGE 3: PETA KONSEP 3 JENIS IKATAN =================
const PagePetaKonsep: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="constellation" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Taksonomi Ikatan Kimia"
        title="Tiga Pilar Utama Ikatan Kimia Intramolekul"
        subtitle="Berdasarkan jenis unsur dan cara atom mencapai kestabilan oktet/duplet, ikatan kimia primer dibagi menjadi tiga klasifikasi besar."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26, marginTop: 16, width: '100%' }}>
        <div
          style={{
            background: colors.cardBg,
            border: `2px solid ${colors.blueBorderStrong}`,
            borderRadius: 18,
            padding: '28px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                background: colors.blueSoft,
                color: colors.blueDark,
                fontFamily: fontMono,
                fontSize: 13,
                fontWeight: 700,
                padding: '4px 14px',
                borderRadius: 20,
                marginBottom: 14,
              }}
            >
              JENIS 01 • TRANSFER ELEKTRON
            </div>
            <h3 style={{ fontFamily: fontSans, fontSize: 32, fontWeight: 800, color: colors.ink, margin: '0 0 12px 0' }}>
              Ikatan Ion
            </h3>
            <p style={{ fontSize: 16, color: colors.muted, lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Terjadi akibat gaya tarik elektrostatik antara ion positif (kation logam) dan ion negatif (anion nonlogam).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15, color: colors.text, textAlign: 'left', width: '100%', maxWidth: 380 }}>
              <div>• <strong>Pelaku:</strong> Logam (IA, IIA) + Nonlogam (VIA, VIIA)</div>
              <div>• <strong>Mekanisme:</strong> Serah-terima elektron valensi</div>
              <div>• <strong>Karakteristik:</strong> Beda keelektronegatifan besar (ΔEN &gt; 1.7)</div>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              padding: '12px 18px',
              borderRadius: 10,
              background: '#f8fafc',
              border: `1px solid ${colors.blueBorder}`,
              fontFamily: fontMono,
              fontSize: 15,
              fontWeight: 600,
              color: colors.blueDark,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            Contoh: NaCl, MgCl₂, CaO, K₂O
          </div>
        </div>

        <div
          style={{
            background: colors.cardBg,
            border: `2px solid ${colors.emeraldBorder}`,
            borderRadius: 18,
            padding: '28px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                background: colors.emeraldSoft,
                color: colors.emerald,
                fontFamily: fontMono,
                fontSize: 13,
                fontWeight: 700,
                padding: '4px 14px',
                borderRadius: 20,
                marginBottom: 14,
              }}
            >
              JENIS 02 • SHARING ELEKTRON
            </div>
            <h3 style={{ fontFamily: fontSans, fontSize: 32, fontWeight: 800, color: colors.ink, margin: '0 0 12px 0' }}>
              Ikatan Kovalen
            </h3>
            <p style={{ fontSize: 16, color: colors.muted, lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Terjadi akibat pemakaian bersama pasangan elektron (PEI) antara sesama atom nonlogam yang sama-sama ingin menarik elektron.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15, color: colors.text, textAlign: 'left', width: '100%', maxWidth: 380 }}>
              <div>• <strong>Pelaku:</strong> Nonlogam + Nonlogam</div>
              <div>• <strong>Mekanisme:</strong> Berbagi pasangan elektron</div>
              <div>• <strong>Variasi:</strong> Tunggal, Rangkap 2 & 3, Koordinasi</div>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              padding: '12px 18px',
              borderRadius: 10,
              background: colors.emeraldSoft,
              border: `1px solid ${colors.emeraldBorder}`,
              fontFamily: fontMono,
              fontSize: 15,
              fontWeight: 600,
              color: colors.emerald,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            Contoh: H₂O, CO₂, NH₃, CH₄, O₂
          </div>
        </div>

        <div
          style={{
            background: colors.cardBg,
            border: `2px solid ${colors.amberBorder}`,
            borderRadius: 18,
            padding: '28px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div
              style={{
                display: 'inline-block',
                background: colors.amberSoft,
                color: colors.amber,
                fontFamily: fontMono,
                fontSize: 13,
                fontWeight: 700,
                padding: '4px 14px',
                borderRadius: 20,
                marginBottom: 14,
              }}
            >
              JENIS 03 • ELECTRON SEA
            </div>
            <h3 style={{ fontFamily: fontSans, fontSize: 32, fontWeight: 800, color: colors.ink, margin: '0 0 12px 0' }}>
              Ikatan Logam
            </h3>
            <p style={{ fontSize: 16, color: colors.muted, lineHeight: 1.6, margin: '0 0 16px 0' }}>
              Terjadi antara kation logam positif yang diselimuti oleh awan elektron valensi yang bebas bergerak (terdelokalisasi).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontSize: 15, color: colors.text, textAlign: 'left', width: '100%', maxWidth: 380 }}>
              <div>• <strong>Pelaku:</strong> Sesama atom unsur Logam</div>
              <div>• <strong>Mekanisme:</strong> Delokalisasi elektron valensi</div>
              <div>• <strong>Karakteristik:</strong> Konduktor ulung & lentur (malleable)</div>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              padding: '12px 18px',
              borderRadius: 10,
              background: colors.amberSoft,
              border: `1px solid ${colors.amberBorder}`,
              fontFamily: fontMono,
              fontSize: 15,
              fontWeight: 600,
              color: colors.amber,
              width: '100%',
              boxSizing: 'border-box',
            }}
          >
            Contoh: Besi (Fe), Tembaga (Cu), Emas (Au)
          </div>
        </div>
      </div>
    </div>

    <SlideFooter page={3} currentTopic="Klasifikasi Utama Ikatan Kimia" />
  </div>
);

// ================= PAGE 4: IKATAN IONIK =================
const PageIkatanIon: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="lattice" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Mekanisme Transfer Elektron"
        title="Ikatan Ion (Elektrovalen): Pembentukan & Kisi Kristal"
        subtitle="Interaksi elektrostatik yang sangat kuat terbentuk saat atom logam dengan energi ionisasi rendah melepaskan elektron kepada atom nonlogam yang memiliki afinitas elektron tinggi."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 30, marginTop: 16, width: '100%' }}>
        {/* Left: Detail Mekanisme */}
        <div
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.blueBorder}`,
            borderRadius: 16,
            padding: '26px 28px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div style={{ fontSize: 19, fontWeight: 700, color: colors.blueDark, marginBottom: 16, fontFamily: fontSans, textAlign: 'center' }}>
            Mekanisme Pembentukan Garam Dapur (NaCl)
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            <div
              style={{
                padding: '14px 18px',
                borderRadius: 12,
                background: colors.blueSoft,
                border: `1px solid ${colors.blueBorder}`,
              }}
            >
              <div style={{ fontFamily: fontMono, fontSize: 17, fontWeight: 700, color: colors.blueDark }}>
                1. Oksidasi Logam Na (Donor Elektron):
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 15, color: colors.ink, marginTop: 4 }}>
                Na (2.8.1) → Na⁺ (2.8) + e⁻  [Memenuhi Kaidah Oktet]
              </div>
            </div>

            <div
              style={{
                padding: '14px 18px',
                borderRadius: 12,
                background: colors.amberSoft,
                border: `1px solid ${colors.amberBorder}`,
              }}
            >
              <div style={{ fontFamily: fontMono, fontSize: 17, fontWeight: 700, color: colors.amber }}>
                2. Reduksi Nonlogam Cl (Akseptor Elektron):
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 15, color: colors.ink, marginTop: 4 }}>
                Cl (2.8.7) + e⁻ → Cl⁻ (2.8.8) [Memenuhi Kaidah Oktet]
              </div>
            </div>

            <div
              style={{
                padding: '14px 18px',
                borderRadius: 12,
                background: colors.emeraldSoft,
                border: `1px solid ${colors.emeraldBorder}`,
              }}
            >
              <div style={{ fontFamily: fontMono, fontSize: 17, fontWeight: 700, color: colors.emerald }}>
                3. Tarikan Elektrostatik Coulomb:
              </div>
              <div style={{ fontFamily: fontMono, fontSize: 15, color: colors.ink, marginTop: 4 }}>
                Na⁺ + Cl⁻ → NaCl (Kisi Kristal Kubus Berpusat Muka / FCC)
              </div>
            </div>
          </div>
        </div>

        {/* Right: Sifat Fisis Khas Senyawa Ion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'space-between' }}>
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 14,
              padding: '18px 22px',
              boxShadow: colors.cardShadow,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 17, color: colors.ink, marginBottom: 4 }}>
              🔥 Titik Leleh & Titik Didih Sangat Tinggi
            </div>
            <div style={{ fontSize: 15, color: colors.muted, lineHeight: 1.45 }}>
              Energi kisi (lattice energy) sangat kuat sehingga membutuhkan energi termal luar biasa untuk memisahkan ion-ionnya (misal: NaCl meleleh pada 801 °C).
            </div>
          </div>

          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 14,
              padding: '18px 22px',
              boxShadow: colors.cardShadow,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 17, color: colors.ink, marginBottom: 4 }}>
              ⚡ Daya Hantar Listrik Unik
            </div>
            <div style={{ fontSize: 15, color: colors.muted, lineHeight: 1.45 }}>
              <strong>Padatan:</strong> Isolator (ion terkunci). <strong>Lelehan & Larutan:</strong> Konduktor elektrolit kuat (ion Na⁺ dan Cl⁻ bebas bergerak).
            </div>
          </div>

          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 14,
              padding: '18px 22px',
              boxShadow: colors.cardShadow,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 17, color: colors.ink, marginBottom: 4 }}>
              💎 Keras Namun Rapuh (Brittle)
            </div>
            <div style={{ fontSize: 15, color: colors.muted, lineHeight: 1.45 }}>
              Tekanan mekanik geser menyebabkan lapisan ion bergeser. Ion sejenis saling berdekatan dan tolak-menolak, memecahkan kristal seketika.
            </div>
          </div>
        </div>
      </div>
    </div>

    <SlideFooter page={4} currentTopic="Ikatan Ion & Sifat Kristal Kisi" />
  </div>
);

// ================= PAGE 5: IKATAN KOVALEN (TUNGGAL, RANGKAP 2, RANGKAP 3) =================
const PageIkatanKovalen: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="orbitals" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Pemakaian Elektron Bersama"
        title="Ikatan Kovalen: Tunggal, Rangkap Dua & Tiga"
        subtitle="Terbentuk antara atom nonlogam yang memiliki afinitas elektron tinggi sehingga keduanya saling menyumbangkan elektron valensi untuk digunakan bersama (Pasangan Elektron Ikatan / PEI)."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 16, width: '100%' }}>
        <ChemReactionCard
          formula="Ikatan Tunggal (1 PEI)"
          type="H₂, HCl, CH₄, H₂O"
          mechanism="Masing-masing atom menyumbangkan 1 elektron, membentuk 1 pasang elektron ikatan (H—H atau H—Cl)."
          properties="Panjang ikatan paling panjang (~140 pm), energi ikatan terendah (~436 kJ/mol), rotasi bebas."
        />

        <ChemReactionCard
          formula="Ikatan Rangkap 2 (2 PEI)"
          type="O₂, CO₂, C₂H₄"
          mechanism="Masing-masing atom menyumbangkan 2 elektron, membentuk 2 pasang elektron ikatan (O=O atau O=C=O)."
          properties="Terdiri dari 1 ikatan sigma (σ) + 1 ikatan pi (π). Lebih pendek dan lebih kuat dari ikatan tunggal."
        />

        <ChemReactionCard
          formula="Ikatan Rangkap 3 (3 PEI)"
          type="N₂, C₂H₂, HCN"
          mechanism="Masing-masing atom menyumbangkan 3 elektron, membentuk 3 pasang elektron ikatan (N≡N)."
          properties="Terdiri dari 1 ikatan σ + 2 ikatan π. Sangat pendek (~110 pm), energi ikatan raksasa (945 kJ/mol), sangat inert."
        />
      </div>

      <div
        style={{
          marginTop: 20,
          background: colors.cardBg,
          border: `1px solid ${colors.blueBorder}`,
          borderRadius: 14,
          padding: '16px 26px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div style={{ fontSize: 16, color: colors.text, display: 'flex', alignItems: 'center', gap: 12 }}>
          <span style={{ fontSize: 24 }}>💡</span>
          <span>
            <strong>Aturan Panjang vs Energi Ikatan:</strong> Semakin banyak pasangan elektron ikatan (orde ikatan meningkat 1 → 2 → 3),
            jarak antar inti atom semakin dekat dan ikatan menjadi semakin kuat serta sukar diputus.
          </span>
        </div>
        <div
          style={{
            fontFamily: fontMono,
            fontSize: 14,
            fontWeight: 700,
            color: colors.blueDark,
            background: colors.blueSoft,
            padding: '8px 16px',
            borderRadius: 8,
            whiteSpace: 'nowrap',
          }}
        >
          Kekuatan: N≡N &gt; O=O &gt; F—F
        </div>
      </div>
    </div>

    <SlideFooter page={5} currentTopic="Variasi Orde Ikatan Kovalen" />
  </div>
);

// ================= PAGE 6: IKATAN KOVALEN KOORDINASI =================
const PageKovalenKoordinasi: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="orbitals" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Ikatan Datif / Semipolar"
        title="Ikatan Kovalen Koordinasi (Kovalen Datif)"
        subtitle="Ikatan kovalen istimewa di mana pasangan elektron yang digunakan bersama hanya berasal dari salah satu atom (donor PEB), sedangkan atom penerima hanya menyediakan orbital kosong."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1.3fr', gap: 30, marginTop: 16, width: '100%' }}>
        {/* Left Card: Syarat Terjadinya */}
        <div
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.blueBorder}`,
            borderRadius: 16,
            padding: '26px 28px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontFamily: fontMono,
                fontWeight: 700,
                color: colors.blueDark,
                background: colors.blueSoft,
                padding: '4px 10px',
                borderRadius: 6,
                display: 'inline-block',
                marginBottom: 12,
              }}
            >
              SYARAT ESENSIAL
            </div>
            <h3 style={{ fontFamily: fontSans, fontSize: 23, fontWeight: 700, color: colors.ink, margin: '0 0 14px 0' }}>
              Donor vs Akseptor Pasangan Elektron
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12, fontSize: 15, color: colors.muted, lineHeight: 1.55 }}>
              <div>
                <strong style={{ color: colors.bluePrimary }}>1. Atom Donor:</strong> Wajib memiliki minimal satu Pasangan Elektron Bebas (PEB) yang belum terpakai (misal: N pada NH₃, O pada H₂O).
              </div>
              <div>
                <strong style={{ color: colors.blueSky }}>2. Atom Akseptor:</strong> Memiliki orbital kosong yang siap menampung sepasang elektron (misal: kation H⁺, atom B pada BF₃).
              </div>
              <div>
                <strong style={{ color: colors.emerald }}>3. Notasi Panah (→):</strong> Dalam struktur Lewis, ikatan koordinasi digambarkan dengan panah mengarah dari atom donor ke atom akseptor.
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              padding: '12px 18px',
              borderRadius: 10,
              background: '#f8fafc',
              border: `1px solid ${colors.blueBorder}`,
              fontFamily: fontMono,
              fontSize: 14,
              color: colors.ink,
              textAlign: 'center',
            }}
          >
            Notasi: H₃N: → H⁺ menghasilkan ion [NH₄]⁺
          </div>
        </div>

        {/* Right Card: Studi Kasus Reaksi Kimia */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div
            style={{
              background: colors.cardBg,
              border: `1.5px solid ${colors.blueBorder}`,
              borderRadius: 14,
              padding: '18px 24px',
              boxShadow: colors.cardShadow,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontFamily: fontMono, fontSize: 20, fontWeight: 700, color: colors.bluePrimary }}>
                Ion Amonium: NH₄⁺
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: colors.blueDark, background: colors.blueSoft, padding: '3px 8px', borderRadius: 4 }}>
                NH₃ + H⁺
              </span>
            </div>
            <p style={{ fontSize: 15, color: colors.muted, lineHeight: 1.45, margin: 0 }}>
              Molekul NH₃ memiliki 1 PEB pada atom N. Ketika ion H⁺ (tanpa elektron) mendekat, atom N mendonorkan PEB-nya untuk membentuk 1 ikatan kovalen koordinasi dan 3 ikatan kovalen biasa.
            </p>
          </div>

          <div
            style={{
              background: colors.cardBg,
              border: `1.5px solid ${colors.blueBorder}`,
              borderRadius: 14,
              padding: '18px 24px',
              boxShadow: colors.cardShadow,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontFamily: fontMono, fontSize: 20, fontWeight: 700, color: colors.blueSky }}>
                Ion Hidronium: H₃O⁺
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: colors.blueDark, background: colors.blueSoft, padding: '3px 8px', borderRadius: 4 }}>
                H₂O + H⁺
              </span>
            </div>
            <p style={{ fontSize: 15, color: colors.muted, lineHeight: 1.45, margin: 0 }}>
              Oksigen pada air (H₂O) memiliki 2 PEB. Salah satu PEB digunakan untuk mengikat proton H⁺, menghasilkan kation asam hidronium H₃O⁺ yang stabil.
            </p>
          </div>

          <div
            style={{
              background: colors.cardBg,
              border: `1.5px solid ${colors.blueBorder}`,
              borderRadius: 14,
              padding: '18px 24px',
              boxShadow: colors.cardShadow,
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6 }}>
              <span style={{ fontFamily: fontMono, fontSize: 20, fontWeight: 700, color: colors.emerald }}>
                Senyawa Adisi: NH₃•BF₃
              </span>
              <span style={{ fontSize: 12, fontWeight: 700, color: colors.emerald, background: colors.emeraldSoft, padding: '3px 8px', borderRadius: 4 }}>
                Lewis Acid-Base
              </span>
            </div>
            <p style={{ fontSize: 15, color: colors.muted, lineHeight: 1.45, margin: 0 }}>
              Atom B pada BF₃ hanya memiliki 6 elektron valensi (kurang oktet). Atom N dari NH₃ mendonasikan PEB-nya ke orbital p kosong milik B, menyempurnakan oktet kedua atom.
            </p>
          </div>
        </div>
      </div>
    </div>

    <SlideFooter page={6} currentTopic="Ikatan Kovalen Koordinasi / Datif" />
  </div>
);

// ================= PAGE 7: KEPOLARAN SENYAWA KOVALEN =================
const PageKepolaran: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="orbitals" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Distribusi Muatan Elektron"
        title="Kepolaran Senyawa Kovalen: Polar vs Nonpolar"
        subtitle="Kepolaran suatu molekul ditentukan oleh dua faktor utama: selisih keelektronegatifan antar atom ikatan (ΔEN) dan simetri bentuk geometri molekul (momen dipol μ)."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 30, marginTop: 16, width: '100%' }}>
        {/* Senyawa Kovalen Polar */}
        <div
          style={{
            background: colors.cardBg,
            border: `2px solid ${colors.blueBorderStrong}`,
            borderRadius: 18,
            padding: '28px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: colors.blueDark }}>Molekul Kovalen Polar</span>
              <span style={{ fontFamily: fontMono, fontSize: 14, fontWeight: 700, padding: '4px 10px', borderRadius: 6, background: colors.blueSoft, color: colors.blueDark }}>
                Momen Dipol μ &gt; 0
              </span>
            </div>
            <p style={{ fontSize: 16, color: colors.muted, lineHeight: 1.55, margin: '0 0 16px 0' }}>
              Distribusi awan elektron tidak merata, tertarik lebih kuat ke atom yang lebih elektronegatif sehingga terbentuk kutub parsial positif (δ⁺) dan parsial negatif (δ⁻).
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15, color: colors.text }}>
              <div>• <strong>Selisih Keelektronegatifan:</strong> Signifikan (0.5 ≤ ΔEN &lt; 1.7)</div>
              <div>• <strong>Bentuk Molekul:</strong> Asimetris (bengkok, piramida trigonal)</div>
              <div>• <strong>Atom Pusat:</strong> Memiliki Pasangan Elektron Bebas (PEB)</div>
              <div>• <strong>Medan Listrik:</strong> Tertarik dan membelok jika didekatkan medan listrik</div>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              padding: '12px 18px',
              borderRadius: 10,
              background: colors.blueSoft,
              border: `1px solid ${colors.blueBorder}`,
              fontFamily: fontMono,
              fontSize: 15,
              fontWeight: 600,
              color: colors.blueDark,
              textAlign: 'center',
            }}
          >
            Contoh Utama: H₂O (bengkok), NH₃ (piramida), HF, HCl, PCl₃
          </div>
        </div>

        {/* Senyawa Kovalen Nonpolar */}
        <div
          style={{
            background: colors.cardBg,
            border: `2px solid ${colors.emeraldBorder}`,
            borderRadius: 18,
            padding: '28px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
              <span style={{ fontSize: 28, fontWeight: 800, color: colors.emerald }}>Molekul Kovalen Nonpolar</span>
              <span style={{ fontFamily: fontMono, fontSize: 14, fontWeight: 700, padding: '4px 10px', borderRadius: 6, background: colors.emeraldSoft, color: colors.emerald }}>
                Momen Dipol μ = 0
              </span>
            </div>
            <p style={{ fontSize: 16, color: colors.muted, lineHeight: 1.55, margin: '0 0 16px 0' }}>
              Distribusi awan elektron tersebar simetris ke segala arah. Vektor dipol ikatan saling meniadakan sehingga resultan momen dipol total sama dengan nol.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontSize: 15, color: colors.text }}>
              <div>• <strong>Selisih Keelektronegatifan:</strong> Nol atau sangat kecil (ΔEN &lt; 0.5)</div>
              <div>• <strong>Bentuk Molekul:</strong> Simetris (linear, tetrahedral, trigonal planar)</div>
              <div>• <strong>Atom Pusat:</strong> Tidak memiliki Pasangan Elektron Bebas (PEB = 0)</div>
              <div>• <strong>Medan Listrik:</strong> Tidak terpengaruh / tidak membelok</div>
            </div>
          </div>
          <div
            style={{
              marginTop: 20,
              padding: '12px 18px',
              borderRadius: 10,
              background: colors.emeraldSoft,
              border: `1px solid ${colors.emeraldBorder}`,
              fontFamily: fontMono,
              fontSize: 15,
              fontWeight: 600,
              color: colors.emerald,
              textAlign: 'center',
            }}
          >
            Contoh Utama: CH₄ (tetrahedral), CO₂ (linear), BF₃, O₂, N₂, CCl₄
          </div>
        </div>
      </div>
    </div>

    <SlideFooter page={7} currentTopic="Analisis Kepolaran & Vektor Dipol Molekul" />
  </div>
);

// ================= PAGE 8: PENGECUALIAN KAIDAH OKTET =================
const PagePengecualianOktet: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="constellation" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Anomali Struktur Lewis"
        title="Pengecualian & Keterbatasan Kaidah Oktet"
        subtitle="Meskipun kaidah oktet berlaku umum, terdapat sejumlah molekul stabil di alam yang tidak memiliki tepat 8 elektron valensi pada atom pusatnya."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 16, width: '100%' }}>
        <InfoBox
          icon="🔻"
          badge="KASUS 1 • SUB-OKTET"
          title="Oktet Tidak Lengkap (Incomplete)"
          desc="Atom pusat memiliki kurang dari 8 elektron valensi (biasanya atom Be, B, Al) namun tetap stabil sebagai senyawa kovalen."
          highlight="BeCl₂ (4 elektron) • BF₃ (6 elektron)"
          tone="rose"
        />

        <InfoBox
          icon="⚡"
          badge="KASUS 2 • RADIKAL"
          title="Spesies Elektron Ganjil"
          desc="Molekul yang memiliki jumlah total elektron valensi ganjil sehingga mustahil semua elektron berpasangan memenuhi oktet 8 elektron."
          highlight="NO₂ (17 elektron valensi) • NO (11 e⁻)"
          tone="amber"
        />

        <InfoBox
          icon="🔺"
          badge="KASUS 3 • HYPERVALENT"
          title="Oktet Berkembang (Expanded)"
          desc="Atom pusat pada periode 3 ke atas (P, S, Cl, Xe) dapat menampung lebih dari 8 elektron valensi dengan memanfaatkan orbital kosong subkulit 3d."
          highlight="PCl₅ (10 elektron) • SF₆ (12 elektron)"
          tone="blue"
        />
      </div>

      <div
        style={{
          marginTop: 20,
          background: colors.cardBg,
          border: `1px solid ${colors.blueBorder}`,
          borderRadius: 14,
          padding: '18px 28px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <span style={{ fontSize: 26 }}>🔍</span>
        <div style={{ fontSize: 16, lineHeight: 1.5, color: colors.text, textAlign: 'left', maxWidth: 1100 }}>
          <strong>Penyebab Oktet Berkembang:</strong> Unsur periode 2 (seperti C, N, O, F) hanya memiliki subkulit 2s dan 2p (maksimal 8 elektron).
          Sebaliknya, unsur periode 3 ke bawah memiliki subkulit d kosong (misal 3d pada Fosfor dan Sulfur) yang dapat dieksitasi untuk berikatan lebih lanjut.
        </div>
      </div>
    </div>

    <SlideFooter page={8} currentTopic="Pengecualian Kaidah Oktet & Orbital d" />
  </div>
);

// ================= PAGE 9: IKATAN LOGAM & LAUTAN ELEKTRON =================
const PageIkatanLogam: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="electron-sea" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Teori Drude-Lorentz"
        title="Ikatan Logam: Model Lautan Elektron Valensi"
        subtitle="Unsur logam memiliki keelektronegatifan dan energi ionisasi sangat rendah, sehingga elektron valensinya mudah lepas dan bergerak bebas membentuk 'lautan elektron' di sekitar kation logam."
      />

      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: 30, marginTop: 16, width: '100%' }}>
        {/* Left: Teori Lautan Elektron */}
        <div
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.blueBorder}`,
            borderRadius: 16,
            padding: '26px 28px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <div
              style={{
                fontSize: 13,
                fontFamily: fontMono,
                fontWeight: 700,
                color: colors.blueDark,
                background: colors.blueSoft,
                padding: '4px 10px',
                borderRadius: 6,
                display: 'inline-block',
                marginBottom: 12,
              }}
            >
              STRUKTUR MIKROSKOPIS
            </div>
            <h3 style={{ fontFamily: fontSans, fontSize: 24, fontWeight: 700, color: colors.ink, margin: '0 0 12px 0' }}>
              Delokalisasi Elektron Valensi
            </h3>
            <p style={{ fontSize: 16, color: colors.muted, lineHeight: 1.6, margin: '0 0 14px 0' }}>
              Kisi logam terdiri atas kation-kation bermuatan positif (inti atom beserta elektron kulit dalam) yang tersusun rapi dalam ruang kristal.
              Elektron valensi tidak terikat pada satu inti tertentu, melainkan terdelokalisasi menyelimuti seluruh ion logam.
            </p>
            <div style={{ fontSize: 15, color: colors.text, lineHeight: 1.6 }}>
              Gaya tarik elektrostatik yang simultan antara lautan awan elektron negatif dan kisi kation positif itulah yang disebut sebagai <strong>Ikatan Logam</strong>.
            </div>
          </div>
          <div
            style={{
              marginTop: 18,
              padding: '12px 18px',
              borderRadius: 10,
              background: colors.blueSoft,
              border: `1px solid ${colors.blueBorder}`,
              fontFamily: fontMono,
              fontSize: 14,
              color: colors.blueDark,
              fontWeight: 600,
              textAlign: 'center',
            }}
          >
            Faktor Kekuatan: Semakin banyak elektron valensi (Al &gt; Mg &gt; Na), ikatan semakin kuat.
          </div>
        </div>

        {/* Right: Sifat Fisis Khas Logam */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14, justifyContent: 'space-between' }}>
          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 14,
              padding: '16px 20px',
              boxShadow: colors.cardShadow,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 17, color: colors.ink, marginBottom: 4 }}>
              ⚡ Konduktor Listrik & Panas Luar Biasa
            </div>
            <div style={{ fontSize: 14, color: colors.muted, lineHeight: 1.45 }}>
              Elektron terdelokalisasi bebas meluncur ketika diberi beda potensial listrik atau transfer energi kinetik termal.
            </div>
          </div>

          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 14,
              padding: '16px 20px',
              boxShadow: colors.cardShadow,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 17, color: colors.ink, marginBottom: 4 }}>
              🔨 Dapat Ditempa (Malleable) & Ditarik (Ductile)
            </div>
            <div style={{ fontSize: 14, color: colors.muted, lineHeight: 1.45 }}>
              Saat dipukul martil, lapisan kation bergeser namun tidak retak karena tetap direkatkan oleh 'lem' lautan elektron fleksibel.
            </div>
          </div>

          <div
            style={{
              background: colors.cardBg,
              border: `1px solid ${colors.blueBorder}`,
              borderRadius: 14,
              padding: '16px 20px',
              boxShadow: colors.cardShadow,
            }}
          >
            <div style={{ fontWeight: 700, fontSize: 17, color: colors.ink, marginBottom: 4 }}>
              ✨ Berkilau (Lustre) & Titik Leleh Tinggi
            </div>
            <div style={{ fontSize: 14, color: colors.muted, lineHeight: 1.45 }}>
              Lautan elektron menyerap dan memantulkan kembali gelombang cahaya tampak, memberikan kilau khas logam.
            </div>
          </div>
        </div>
      </div>
    </div>

    <SlideFooter page={9} currentTopic="Ikatan Logam & Teori Lautan Elektron" />
  </div>
);

// ================= PAGE 10: GAYA ANTARMOLEKUL =================
const PageGayaAntarmolekul: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="orbitals" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Intermolecular Forces"
        title="Gaya Antarmolekul & Ikatan Hidrogen"
        subtitle="Gaya tarik elektrostatik antarmolekul menentukan wujud zat (padat, cair, gas), titik didih, dan titik leleh suatu senyawa kovalen molekuler."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 16, width: '100%' }}>
        <InfoBox
          icon="💧"
          badge="TERKUAT • ANOMALI DIDIH"
          title="Ikatan Hidrogen"
          desc="Gaya dipol-dipol istimewa yang sangat kuat, terjadi saat atom H yang terikat pada atom berukuran kecil & sangat elektronegatif (F, O, N) berinteraksi dengan PEB molekul tetangga."
          highlight="Contoh: H₂O (titik didih 100°C), HF, NH₃"
          tone="blue"
        />

        <InfoBox
          icon="🧲"
          badge="SEDANG • PERMANEN"
          title="Gaya Dipol - Dipol"
          desc="Terjadi antarmolekul kovalen polar yang memiliki momen dipol permanen. Kutub positif (δ⁺) suatu molekul menarik kutub negatif (δ⁻) molekul di sebelahnya."
          highlight="Contoh: HCl ••• HCl, H₂S, SO₂"
          tone="emerald"
        />

        <InfoBox
          icon="💨"
          badge="LEMAH • SEMENTARA"
          title="Gaya Dispersi London"
          desc="Terjadi pada semua molekul (termasuk molekul nonpolar & gas mulia) akibat pergerakan acak elektron yang menciptakan dipol sesaat dan menginduksi molekul tetangga."
          highlight="Makin besar Mr atom/molekul, makin kuat"
          tone="amber"
        />
      </div>

      <div
        style={{
          marginTop: 20,
          background: colors.cardBg,
          border: `1px solid ${colors.blueBorder}`,
          borderRadius: 14,
          padding: '16px 26px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          width: '100%',
          boxSizing: 'border-box',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: 16, color: colors.text, maxWidth: 1200 }}>
          <strong>Penting Dibedakan:</strong> Ikatan kovalen H—O di dalam 1 molekul air adalah ikatan <em>intramolekul</em> (sangat kuat, butuh ribuan derajat untuk putus).
          Sedangkan tarikan antar molekul H₂O adalah <em>ikatan hidrogen</em> yang putus saat air mendidih pada 100 °C.
        </div>
      </div>
    </div>

    <SlideFooter page={10} currentTopic="Gaya Antarmolekul & Ikatan Hidrogen" />
  </div>
);

// ================= PAGE 11: TABEL KOMPARASI SIFAT FISIS =================
const PageKomparasiSifat: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="lattice" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Sintesis Komparatif"
        title="Perbandingan Sifat Fisis: Senyawa Ion, Kovalen & Logam"
        subtitle="Rangkuman komprehensif perbedaan sifat fisik materi berdasarkan jenis ikatan kimia dan struktur partikel penyusunnya."
      />

      <div
        style={{
          background: colors.cardBg,
          border: `1px solid ${colors.blueBorder}`,
          borderRadius: 16,
          boxShadow: colors.cardShadow,
          overflow: 'hidden',
          marginTop: 16,
          width: '100%',
        }}
      >
        <TableRow
          col1="PARAMETER FISIS"
          col2="SENYAWA IONIK (e.g. NaCl)"
          col3="SENYAWA KOVALEN (e.g. H₂O, CO₂)"
          col4="LOGAM (e.g. Fe, Cu, Al)"
          isHeader={true}
        />
        <TableRow
          col1="Partikel Penyusun"
          col2="Kation (+) dan Anion (-)"
          col3="Molekul Netral"
          col4="Kation dalam Lautan Elektron"
        />
        <TableRow
          col1="Wujud Suhu Ruang"
          col2="Padatan kristal rapuh"
          col3="Gas, Cair, atau Padat lunak"
          col4="Padatan keras (kecuali Raksa / Hg)"
        />
        <TableRow
          col1="Titik Leleh & Didih"
          col2="Sangat Tinggi (800 - 2000 °C)"
          col3="Rendah hingga Sedang"
          col4="Tinggi hingga Sangat Tinggi"
        />
        <TableRow
          col1="Konduktivitas (Padatan)"
          col2="❌ Isolator (ion terkunci)"
          col3="❌ Isolator (tanpa ion/elektron)"
          col4="✅ Konduktor sangat baik"
        />
        <TableRow
          col1="Konduktivitas (Lelehan)"
          col2="✅ Konduktor (ion leluasa)"
          col3="❌ Isolator"
          col4="✅ Konduktor sangat baik"
        />
        <TableRow
          col1="Kelarutan dalam Air"
          col2="Umumnya mudah larut (polar)"
          col3="Kovalen polar larut, nonpolar tidak"
          col4="Tidak larut (bereaksi khusus)"
        />
      </div>
    </div>

    <SlideFooter page={11} currentTopic="Tabel Komparasi Karakter Fisis Materi" />
  </div>
);

// ================= PAGE 12: RANGKUMAN & PANDUAN PENUTUP =================
const PagePenutup: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="constellation" />
    <div style={centeredContentStyle}>
      <SlideHeader
        category="Kesimpulan & Panduan Cepat"
        title="Rangkuman & Kaidah Identifikasi Ikatan"
        subtitle="Gunakan alur analisis selisih keelektronegatifan dan golongan unsur untuk mengidentifikasi ikatan kimia secara cepat dan tepat."
      />

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24, marginTop: 16, width: '100%' }}>
        <div
          style={{
            background: colors.cardBg,
            border: `1.5px solid ${colors.blueBorder}`,
            borderRadius: 16,
            padding: '24px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.bluePrimary, marginBottom: 10 }}>
            1. Cek Golongan Unsur
          </div>
          <div style={{ fontSize: 15, color: colors.text, lineHeight: 1.6, textAlign: 'left', width: '100%', maxWidth: 340 }}>
            • Logam + Nonlogam → <strong>Ikatan Ion</strong><br />
            • Nonlogam + Nonlogam → <strong>Ikatan Kovalen</strong><br />
            • Sesama Logam → <strong>Ikatan Logam</strong>
          </div>
        </div>

        <div
          style={{
            background: colors.cardBg,
            border: `1.5px solid ${colors.blueBorder}`,
            borderRadius: 16,
            padding: '24px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.blueSky, marginBottom: 10 }}>
            2. Cek Selisih Elektronegatif (ΔEN)
          </div>
          <div style={{ fontSize: 15, color: colors.text, lineHeight: 1.6, textAlign: 'left', width: '100%', maxWidth: 340 }}>
            • ΔEN &gt; 1.7 → Karakter Ion Dominan<br />
            • 0.5 ≤ ΔEN ≤ 1.7 → Kovalen Polar<br />
            • ΔEN &lt; 0.5 → Kovalen Nonpolar
          </div>
        </div>

        <div
          style={{
            background: colors.cardBg,
            border: `1.5px solid ${colors.blueBorder}`,
            borderRadius: 16,
            padding: '24px',
            boxShadow: colors.cardShadow,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
          }}
        >
          <div style={{ fontSize: 18, fontWeight: 700, color: colors.emerald, marginBottom: 10 }}>
            3. Cek Simetri & PEB
          </div>
          <div style={{ fontSize: 15, color: colors.text, lineHeight: 1.6, textAlign: 'left', width: '100%', maxWidth: 340 }}>
            • Ada PEB / Asimetris → <strong>Polar</strong> (H₂O, NH₃)<br />
            • Tanpa PEB / Simetris → <strong>Nonpolar</strong> (CH₄, CO₂)<br />
            • Ada H terikat F/O/N → <strong>Ikatan Hidrogen</strong>
          </div>
        </div>
      </div>

      {/* Motivational / Quote card */}
      <div
        style={{
          marginTop: 22,
          background: colors.cardBgGlass,
          border: `1px solid ${colors.blueBorderStrong}`,
          borderRadius: 16,
          padding: '20px 32px',
          boxShadow: colors.cardShadow,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
          boxSizing: 'border-box',
        }}
      >
        <div>
          <div style={{ fontFamily: fontSerif, fontSize: 24, fontStyle: 'italic', color: colors.ink }}>
            "Chemistry is the study of matter, but more specifically, it is the study of how matter connects."
          </div>
          <div style={{ fontSize: 14, color: colors.dim, marginTop: 4 }}>
            Selamat belajar dan menguasai konsep ikatan kimia untuk memahami arsitektur molekuler alam semesta!
          </div>
        </div>
        <div
          style={{
            padding: '10px 20px',
            borderRadius: 10,
            background: colors.bluePrimary,
            color: '#ffffff',
            fontWeight: 700,
            fontSize: 15,
            fontFamily: fontSans,
            whiteSpace: 'nowrap',
          }}
        >
          SELESAI & TUNTAS
        </div>
      </div>
    </div>

    <SlideFooter page={12} currentTopic="Rangkuman Materi & Penutup" />
  </div>
);

// ================= SLIDE METADATA & SPEAKER NOTES =================
export const meta: SlideMeta = {
  title: 'Ikatan Kimia: Struktur, Kaidah, dan Sifat Fisis',
  createdAt: '2026-10-18T08:38:51.847Z',
};

export const notes: (string | undefined)[] = [
  // Page 1: Cover
  `Selamat datang di presentasi mendalam tentang Ikatan Kimia.
Disusun oleh Tim Kelompok:
- Rachmatdani Permana Aulian (50426752)
- Rasya Zahran Mardiansyah (50426803)
- Rizki Arafi Zaidan (50426848)
- Rizkiani Yuningsi Lounyanyi (50426850)
- Sharman Radhitya Bilal (50426900)
- Wahyu Rakha Saputra (50426943)

Pada modul ini, kita akan mengeksplorasi mengapa atom berikatan, bagaimana konfigurasi elektron menentukan jenis ikatan (Ion, Kovalen, dan Logam), serta bagaimana struktur mikroskopis ini secara langsung menentukan sifat fisis materi di kehidupan sehari-hari.`,

  // Page 2: Kestabilan
  `Buka dengan pertanyaan reflektif: Mengapa atom-atom di alam jarang berdiri sendiri sebagai atom tunggal?
Jelaskan bahwa hampir semua unsur berusaha mencapai keadaan energi potensial paling rendah, yaitu dengan meniru kestabilan gas mulia melalui kaidah oktet (8 elektron) atau duplet (2 elektron).`,

  // Page 3: Peta Konsep
  `Tampilkan peta konsep besar 3 jenis ikatan kimia.
Tekankan perbedaan mendasar: Ikatan Ion melibatkan serah terima elektron (transfer), Ikatan Kovalen melibatkan pemakaian bersama pasangan elektron (sharing), dan Ikatan Logam melibatkan lautan elektron valensi terdelokalisasi.`,

  // Page 4: Ikatan Ion
  `Jelaskan mekanisme transfer elektron pada pembentukan NaCl.
Tunjukkan bahwa logam Na melepas 1 elektron menjadi kation Na+, sedangkan Cl menangkap 1 elektron menjadi anion Cl-. Jelaskan mengapa padatan kristal ionik bersifat rapuh dan mengapa hanya menghantarkan listrik saat berwujud lelehan atau larutan.`,

  // Page 5: Ikatan Kovalen
  `Jelaskan konsep pemakaian bersama pasangan elektron (PEI).
Bandingkan ikatan kovalen tunggal (H2, HCl), rangkap dua (O2), dan rangkap tiga (N2). Soroti hubungan antara orde ikatan, panjang ikatan, dan kekuatan energi ikatan (N2 paling kuat dan paling pendek).`,

  // Page 6: Kovalen Koordinasi
  `Jelaskan keistimewaan ikatan kovalen koordinasi (ikatan datif).
Soroti bahwa kedua elektron ikatan disumbangkan oleh satu atom donor yang memiliki Pasangan Elektron Bebas (PEB). Bahas contoh klasik pembentukan ion amonium NH4+ dari NH3 dan ion H+.`,

  // Page 7: Kepolaran
  `Jelaskan perbedaan senyawa polar dan nonpolar.
Tekankan bahwa polaritas tidak hanya ditentukan oleh selisih keelektronegatifan (ΔEN), tetapi sangat ditentukan oleh simetri geometri molekul (momen dipol total). Gunakan kontras antara H2O (polar, asimetris, ada PEB) dan CO2 / CH4 (nonpolar, simetris).`,

  // Page 8: Pengecualian Oktet
  `Paparkan 3 kelompok pengecualian kaidah oktet:
1. Oktet tidak lengkap (BeCl2, BF3)
2. Spesies elektron ganjil (NO2)
3. Oktet berkembang atau diperluas (PCl5, SF6) yang dimungkinkan karena keterlibatan orbital kosong subkulit 3d pada periode 3 ke atas.`,

  // Page 9: Ikatan Logam
  `Jelaskan model lautan elektron (electron sea model) oleh Drude dan Lorentz.
Gunakan analogi kation positif yang direkatkan oleh lem lautan elektron yang fleksibel. Ini menjelaskan mengapa logam dapat ditempa (tidak rapuh saat dipukul) dan mengapa logam menghantarkan arus listrik dengan sangat baik dalam wujud padat.`,

  // Page 10: Gaya Antarmolekul
  `Perjelas perbedaan krusial antara ikatan intramolekul (ikatan kovalen di dalam molekul) dengan gaya antarmolekul (tarikan antar molekul tetangga).
Jelaskan anomali tingginya titik didih air (H2O) yang disebabkan oleh kekuatan ikatan hidrogen.`,

  // Page 11: Tabel Komparasi
  `Ajak audiens menyimak tabel sintesis komparatif.
Tunjukkan kontras daya hantar listrik: Logam menghantar listrik pada semua wujud; Senyawa ion hanya pada lelehan/larutan; Senyawa kovalen umumnya tidak menghantar listrik.`,

  // Page 12: Penutup
  `Tutup presentasi dengan 3 langkah praktis mengidentifikasi ikatan kimia: periksa jenis golongan unsur, periksa selisih keelektronegatifan, dan periksa simetri geometri molekul.
Buka sesi tanya jawab kepada audiens.`,
];

export default [
  PageCover,
  PageKestabilan,
  PagePetaKonsep,
  PageIkatanIon,
  PageIkatanKovalen,
  PageKovalenKoordinasi,
  PageKepolaran,
  PagePengecualianOktet,
  PageIkatanLogam,
  PageGayaAntarmolekul,
  PageKomparasiSifat,
  PagePenutup,
] satisfies Page[];
