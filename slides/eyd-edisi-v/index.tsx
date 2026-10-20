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

// Web fonts injection: Plus Jakarta Sans (Modern Clean Body), Newsreader (Editorial Serif Headings), JetBrains Mono (Code/Accreditation)
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap';
const FONT_LINK_ID = 'osd-webfont-eyd-edisi-v';

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
    bg: '#ffffff', // Radiant pristine white
    text: '#171512', // Deep rich charcoal for maximum legibility
    accent: '#c59b27', // Elegant metallic gold accent
  },
  fonts: {
    display: '"Newsreader", Georgia, serif',
    body: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 136,
    body: 32,
  },
  radius: 16,
};

const fontSerif = '"Newsreader", Georgia, serif';
const fontSans = '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, monospace';

const colors = {
  gold: '#c59b27', // Classic Indonesian royal gold
  goldBright: '#d4af37', // Bright gold reflection
  goldDark: '#996515', // High-contrast deep gold for text & icons
  goldDeep: '#7c4d0a', // Darker gold for small labels
  goldSoft: 'rgba(212, 175, 55, 0.12)', // Subtle golden glow
  goldSoftHover: 'rgba(212, 175, 55, 0.18)',
  goldBorder: 'rgba(197, 155, 39, 0.35)', // Golden hairline frame
  goldBorderLight: 'rgba(197, 155, 39, 0.18)',

  emerald: '#0f766e', // Crisp forest emerald (for correct usage)
  emeraldSoft: 'rgba(15, 118, 110, 0.08)',
  rose: '#be123c', // Deep ruby rose (for incorrect usage)
  roseSoft: 'rgba(190, 18, 60, 0.08)',
  amber: '#b45309', // Warm bronze/amber
  amberSoft: 'rgba(180, 83, 9, 0.08)',

  ink: '#171512', // Deep warm black heading color
  text: '#292524', // Crisp body text
  muted: '#57534e', // Elegant muted subtitle color
  dim: '#857e75', // Light metadata
  cardBg: 'rgba(255, 255, 255, 0.92)', // Semi-opaque white luxury glass
  cardBorder: 'rgba(212, 175, 55, 0.28)', // Delicate gold card outline
  cardShadow: '0 10px 28px -4px rgba(184, 134, 11, 0.08), 0 2px 8px -1px rgba(0, 0, 0, 0.04)',
};

const canvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  padding: '80px 120px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#fcfbf8',
  backgroundImage:
    'radial-gradient(circle at 85% 15%, rgba(212, 175, 55, 0.14) 0%, transparent 55%), radial-gradient(circle at 10% 90%, rgba(197, 155, 39, 0.10) 0%, transparent 50%), linear-gradient(135deg, #ffffff 0%, #fbf9f4 50%, #f7f3e8 100%)',
  color: colors.ink,
  fontFamily: fontSans,
};

const EASE_OUT = 'cubic-bezier(0, 0, 0.2, 1)';
const EASE_IN = 'cubic-bezier(0.4, 0, 1, 1)';

// House smooth transition (Lift & Crossfade)
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


// ================= SVG ILLUSTRATIONS & ICONS =================
const BookFeatherSVG = ({ size = 28, color = colors.goldDark }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1-2.5-2.5Z" />
    <path d="M6 6h10" />
    <path d="M6 10h10" />
    <path d="m14 18 4-4" />
    <path d="m18 14 2 2" />
  </svg>
);

const CheckCircleSVG = ({ size = 22, color = colors.emerald }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <polyline points="22 4 12 14.01 9 11.01" />
  </svg>
);

const XCircleSVG = ({ size = 22, color = colors.rose }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <line x1="15" y1="9" x2="9" y2="15" />
    <line x1="9" y1="9" x2="15" y2="15" />
  </svg>
);

const HistoryClockSVG = ({ size = 24, color = colors.goldDark }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const SparkleStarSVG = ({ size = 24, color = colors.goldBright }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// High-fidelity luxury background vector wave/geometric motifs in White & Gold
const BackgroundVector = ({ motif = 'waves' }: { motif?: 'waves' | 'grid' | 'circles' | 'typography' }) => (
  <div
    style={{
      position: 'absolute',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 0,
      overflow: 'hidden',
    }}
  >
    {/* Global Gold Ornamental Corner Brackets */}
    <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0 }}>
      <path d="M 44 76 L 44 44 L 76 44" stroke="#c59b27" strokeWidth="2" opacity="0.35" />
      <path d="M 1876 76 L 1876 44 L 1844 44" stroke="#c59b27" strokeWidth="2" opacity="0.35" />
      <path d="M 44 1004 L 44 1036 L 76 1036" stroke="#c59b27" strokeWidth="2" opacity="0.35" />
      <path d="M 1876 1004 L 1876 1036 L 1844 1036" stroke="#c59b27" strokeWidth="2" opacity="0.35" />
      <circle cx="44" cy="44" r="3" fill="#c59b27" opacity="0.4" />
      <circle cx="1876" cy="44" r="3" fill="#c59b27" opacity="0.4" />
      <circle cx="44" cy="1036" r="3" fill="#c59b27" opacity="0.4" />
      <circle cx="1876" cy="1036" r="3" fill="#c59b27" opacity="0.4" />
    </svg>

    {motif === 'waves' && (
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        fill="none"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <path
          d="M-100 850 C 300 650, 700 950, 1150 780 C 1600 600, 1850 820, 2100 700"
          stroke="url(#goldGrad)"
          strokeWidth="3.5"
          opacity="0.8"
        />
        <path
          d="M-50 920 C 350 720, 750 1020, 1200 850 C 1650 670, 1900 890, 2150 770"
          stroke="url(#goldDashed)"
          strokeWidth="1.8"
          strokeDasharray="8 8"
          opacity="0.65"
        />
        <circle cx="1650" cy="220" r="320" stroke="#d4af37" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.35" />
        <circle cx="1650" cy="220" r="400" fill="radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 70%)" />
        <defs>
          <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.35" />
            <stop offset="50%" stopColor="#c59b27" stopOpacity="0.85" />
            <stop offset="100%" stopColor="#f3e5ab" stopOpacity="0.4" />
          </linearGradient>
          <linearGradient id="goldDashed" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#b8860b" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.25" />
          </linearGradient>
        </defs>
      </svg>
    )}

    {motif === 'grid' && (
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        fill="none"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <defs>
          <pattern id="eydGrid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M 60 0 L 0 0 0 60" fill="none" stroke="rgba(197, 155, 39, 0.22)" strokeWidth="0.8" />
            <circle cx="60" cy="60" r="1.8" fill="#c59b27" opacity="0.6" />
          </pattern>
        </defs>
        <rect width="1920" height="1080" fill="url(#eydGrid)" />
        <circle cx="280" cy="850" r="320" fill="radial-gradient(circle, rgba(212,175,55,0.14) 0%, transparent 70%)" />
      </svg>
    )}

    {motif === 'typography' && (
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        fill="none"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <text x="1320" y="760" fontSize="420" fontFamily={fontSerif} fill="#c59b27" opacity="0.12" fontWeight="700">
          Aa
        </text>
        <text x="100" y="450" fontSize="280" fontFamily={fontMono} fill="#b8860b" opacity="0.08" fontWeight="700">
          &lt;/&gt;
        </text>
        <path d="M1180 120 L 1820 740" stroke="#c59b27" strokeWidth="2" strokeDasharray="10 10" opacity="0.25" />
      </svg>
    )}

    {motif === 'circles' && (
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        fill="none"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <circle cx="1700" cy="180" r="240" stroke="#d4af37" strokeWidth="2.5" opacity="0.4" />
        <circle cx="1700" cy="180" r="180" stroke="#b8860b" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.35" />
        <circle cx="1700" cy="180" r="120" stroke="#c59b27" strokeWidth="1" opacity="0.4" />
        <circle cx="150" cy="950" r="200" stroke="#d4af37" strokeWidth="2" opacity="0.3" />
        <circle cx="150" cy="950" r="140" stroke="#b8860b" strokeWidth="1" strokeDasharray="4 4" opacity="0.3" />
      </svg>
    )}
  </div>
);

// Global Slide Header
const SlideHeader = ({
  category,
  title,
  subtitle,
}: {
  category: string;
  title: string;
  subtitle?: string;
}) => (
  <div style={{ position: 'relative', zIndex: 1, marginBottom: 28 }}>
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '6px 14px',
        borderRadius: 20,
        backgroundColor: colors.goldSoft,
        border: `1px solid ${colors.goldBorder}`,
        marginBottom: 12,
      }}
    >
      <span
        style={{
          fontFamily: fontMono,
          fontSize: 16,
          fontWeight: 700,
          color: colors.goldDark,
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        {category}
      </span>
    </div>
    <h1
      style={{
        fontFamily: fontSerif,
        fontSize: 54,
        fontWeight: 600,
        lineHeight: 1.15,
        margin: 0,
        letterSpacing: '-0.02em',
        color: colors.ink,
      }}
    >
      {title}
    </h1>
    {subtitle && (
      <p
        style={{
          fontFamily: fontSans,
          fontSize: 22,
          color: colors.muted,
          margin: '6px 0 0 0',
          lineHeight: 1.4,
        }}
      >
        {subtitle}
      </p>
    )}
  </div>
);

// Global Slide Footer
const SlideFooter = ({ chapter }: { chapter: string }) => {
  const { current, total } = useSlidePageNumber();
  const formatNum = (n: number) => String(n).padStart(2, '0');

  return (
    <div
      style={{
        position: 'relative',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: 18,
        borderTop: '1px solid rgba(197, 155, 39, 0.25)',
        fontSize: 18,
        color: colors.muted,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <BookFeatherSVG size={20} color={colors.goldDark} />
        <span style={{ fontFamily: fontSans, fontWeight: 500, color: colors.text }}>
          EYD Edisi V (Kepmendikbudristek No. 0424/I/2022)
        </span>
        <span style={{ color: colors.gold }}>•</span>
        <span style={{ fontFamily: fontMono, color: colors.goldDark, fontSize: 16, fontWeight: 600 }}>{chapter}</span>
      </div>

      <div
        style={{
          fontFamily: fontMono,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.06em',
          color: colors.goldDark,
          backgroundColor: colors.goldSoft,
          padding: '4px 14px',
          borderRadius: 8,
          border: `1px solid ${colors.goldBorder}`,
        }}
      >
        {formatNum(current)} <span style={{ color: colors.gold, fontWeight: 400 }}>/</span> {formatNum(total)}
      </div>
    </div>
  );
};

// Reusable Correct vs Incorrect Card component
const ComparisonItem = ({
  correct,
  wrong,
  rule,
}: {
  correct: string;
  wrong: string;
  rule: string;
}) => (
  <div
    style={{
      backgroundColor: colors.cardBg,
      border: `1px solid ${colors.cardBorder}`,
      boxShadow: colors.cardShadow,
      borderRadius: 14,
      padding: '16px 20px',
      display: 'flex',
      flexDirection: 'column',
      gap: 10,
      backdropFilter: 'blur(10px)',
    }}
  >
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <CheckCircleSVG size={22} color={colors.emerald} />
        <span
          style={{
            fontFamily: fontMono,
            fontSize: 20,
            fontWeight: 700,
            color: colors.emerald,
          }}
        >
          {correct}
        </span>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <XCircleSVG size={22} color={colors.rose} />
        <span
          style={{
            fontFamily: fontMono,
            fontSize: 19,
            fontWeight: 600,
            color: colors.rose,
            textDecoration: 'line-through',
            opacity: 0.85,
          }}
        >
          {wrong}
        </span>
      </div>
    </div>
    <div
      style={{
        fontSize: 16,
        fontFamily: fontSans,
        color: colors.muted,
        borderTop: '1px dashed rgba(197, 155, 39, 0.25)',
        paddingTop: 8,
      }}
    >
      <span style={{ color: colors.goldDark, fontWeight: 700 }}>Alasan:</span> {rule}
    </div>
  </div>
);

// ================= PAGE 1: COVER =================
const PageCover: Page = () => (
  <div style={canvasStyle}>
    <BackgroundVector motif="waves" />
    <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, marginBottom: 20 }}>
        <div
          style={{
            backgroundColor: colors.goldSoft,
            border: `1px solid ${colors.goldBorder}`,
            padding: '8px 18px',
            borderRadius: 30,
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <SparkleStarSVG size={20} color={colors.goldBright} />
          <span style={{ fontFamily: fontMono, fontSize: 18, fontWeight: 700, color: colors.goldDark, letterSpacing: '0.08em' }}>
            STANDAR RESMI BAHASA INDONESIA TERKINI
          </span>
        </div>
      </div>

      <h1
        style={{
          fontFamily: fontSerif,
          fontSize: 98,
          fontWeight: 700,
          lineHeight: 1.05,
          margin: '0 0 24px 0',
          color: colors.ink,
          letterSpacing: '-0.025em',
        }}
      >
        Ejaan Yang <span style={{ color: colors.goldDark, fontStyle: 'italic' }}>Disempurnakan</span> (EYD) Edisi V
      </h1>

      <p
        style={{
          fontFamily: fontSans,
          fontSize: 28,
          lineHeight: 1.5,
          color: colors.muted,
          maxWidth: 1100,
          margin: '0 0 36px 0',
        }}
      >
        Pedoman komprehensif kaidah penulisan huruf, pemisahan kata, penggunaan tanda baca, dan kata serapan resmi berdasarkan Keputusan Kepala Badan Pengembangan dan Pembinaan Bahasa.
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            padding: '12px 24px',
            borderRadius: 12,
            fontFamily: fontMono,
            fontSize: 18,
            color: colors.text,
          }}
        >
          <span style={{ color: colors.goldDark, fontWeight: 700 }}>Dasar Hukum:</span> Kepmendikbudristek No. 0424/I/2022
        </div>
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            padding: '12px 24px',
            borderRadius: 12,
            fontFamily: fontMono,
            fontSize: 18,
            color: colors.text,
          }}
        >
          <span style={{ color: colors.emerald, fontWeight: 700 }}>Status:</span> Berlaku Aktif (Pengganti PUEBI)
        </div>
      </div>
    </div>

    <SlideFooter chapter="01. Pembuka" />
  </div>
);

// ================= PAGE 2: SEJARAH & EVOLUSI EJAAN =================
const PageSejarah: Page = () => {
  const timeline = [
    { year: '1901', name: 'Van Ophuijsen', desc: 'Huruf oe (u), dj (j), tj (c), ch (kh). Standar latin pertama di Hindia Belanda.' },
    { year: '1947', name: 'Soewandi / Republik', desc: 'Huruf oe resmi diganti u (Goenoeng → Gunung). Tanda dua untuk kata ulang.' },
    { year: '1972', name: 'EYD Edisi I-III', desc: 'Penyelarasan serentak RI & Malaysia: dj→j, j→y, ch→kh, tj→c, nj→ny, sj→sy.' },
    { year: '2015', name: 'PUEBI (Edisi IV)', desc: 'Penambahan diftong ei dan penegasan penulisan singkatan/akronim.' },
    { year: '2022', name: 'EYD Edisi V', desc: 'Kembali memakai nama EYD. Penambahan diftong eu, penulisan monoftong, penataan tanda baca.' },
  ];

  return (
    <div style={canvasStyle}>
      <BackgroundVector motif="grid" />
      <div>
        <SlideHeader
          category="Kilasan Historis"
          title="Evolusi Ejaan Bahasa Indonesia dari Masa ke Masa"
          subtitle="Transformasi ortografi nasional untuk memodernkan komunikasi dan mencerminkan dinamika penutur."
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, marginTop: 12 }}>
          {timeline.map((item, idx) => (
            <div
              key={item.year}
              style={{
                backgroundColor: idx === 4 ? 'linear-gradient(180deg, #fffdf7, #faf3e1)' : colors.cardBg,
                border: idx === 4 ? `2px solid ${colors.goldBright}` : `1px solid ${colors.cardBorder}`,
                boxShadow: idx === 4 ? '0 12px 30px -4px rgba(197, 155, 39, 0.22)' : colors.cardShadow,
                borderRadius: 14,
                padding: '22px 18px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                backdropFilter: 'blur(8px)',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 8 }}>
                  <HistoryClockSVG size={18} color={idx === 4 ? colors.goldDeep : colors.goldDark} />
                  <span style={{ fontFamily: fontMono, fontSize: 24, fontWeight: 800, color: idx === 4 ? colors.goldDeep : colors.goldDark }}>
                    {item.year}
                  </span>
                </div>
                <h3 style={{ fontFamily: fontSerif, fontSize: 26, margin: '0 0 10px 0', color: colors.ink }}>
                  {item.name}
                </h3>
                <p style={{ fontFamily: fontSans, fontSize: 16, color: colors.muted, lineHeight: 1.45, margin: 0 }}>
                  {item.desc}
                </p>
              </div>

              {idx === 4 && (
                <div style={{ marginTop: 16, paddingTop: 10, borderTop: `1px solid ${colors.goldBorder}` }}>
                  <span style={{ fontFamily: fontMono, fontSize: 14, fontWeight: 700, color: colors.goldDeep, textTransform: 'uppercase' }}>
                    ★ Standar Terkini
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <SlideFooter chapter="02. Sejarah Ejaan" />
    </div>
  );
};

// ================= PAGE 3: 4 PILAR UTAMA EYD V =================
const PagePilar: Page = () => {
  const pilars = [
    {
      num: '01',
      title: 'Pemakaian Huruf',
      points: ['Huruf abjad (26), vokal (a, i, u, e, o)', 'Diftong lengkap (ai, au, ei, eu)', 'Huruf kapital, miring, dan tebal'],
      color: colors.goldDark,
    },
    {
      num: '02',
      title: 'Penulisan Kata',
      points: ['Kata dasar dan kata berimbuhan', 'Bentuk ulang dan gabungan kata', 'Partikel (lah, kah, pun) & kata ganti'],
      color: colors.amber,
    },
    {
      num: '03',
      title: 'Penggunaan Tanda Baca',
      points: ['Tanda titik (.), koma (,), titik dua (:)', 'Tanda hubung (-), pisah (—), petik (" ")', 'Tanda kurung, elipsis, dan apostrof'],
      color: colors.emerald,
    },
    {
      num: '04',
      title: 'Penulisan Unsur Serapan',
      points: ['Serapan umum (bahasa daerah/asing)', 'Penyesuaian akhiran (-ism → -isme)', 'Transkripsi serapan khusus & istilah ilmu'],
      color: colors.goldDeep,
    },
  ];

  return (
    <div style={canvasStyle}>
      <BackgroundVector motif="circles" />
      <div>
        <SlideHeader
          category="Kerangka Struktur"
          title="Empat Pilar Pokok Pedoman EYD Edisi V"
          subtitle="Sistematika aturan resmi yang menjadi rujukan penulisan karya ilmiah, pers, dinas, dan sastra."
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginTop: 14 }}>
          {pilars.map((p) => (
            <div
              key={p.num}
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: colors.cardShadow,
                borderRadius: 16,
                padding: '24px 22px',
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: fontMono,
                    fontSize: 20,
                    fontWeight: 800,
                    color: p.color,
                    padding: '4px 12px',
                    borderRadius: 8,
                    backgroundColor: colors.goldSoft,
                    border: `1px solid ${colors.goldBorder}`,
                  }}
                >
                  BAB {p.num}
                </span>
                <div style={{ width: 10, height: 10, borderRadius: '50%', backgroundColor: p.color }} />
              </div>

              <h3 style={{ fontFamily: fontSerif, fontSize: 32, margin: 0, color: colors.ink, lineHeight: 1.2 }}>
                {p.title}
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 4 }}>
                {p.points.map((pt, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, fontSize: 17, color: colors.muted, lineHeight: 1.4 }}>
                    <span style={{ color: p.color, fontWeight: 700 }}>•</span>
                    <span>{pt}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SlideFooter chapter="03. Pilar Pokok" />
    </div>
  );
};

// ================= PAGE 4: PEMBAHARUAN PADA EYD EDISI V =================
const PagePembaruan: Page = () => {
  const updates = [
    {
      title: 'Monoftong Baru "eu"',
      desc: 'Penambahan fonem vokal monoftong "eu" (diambil dari bahasa Sunda & Aceh) untuk kata seperti: seudati, sadeu, peuyeum.',
      badge: 'Diftong & Vokal',
      accent: colors.goldDark,
    },
    {
      title: 'Bentuk Terikat Serapan Asing',
      desc: 'Penyatuan bentuk terikat serapan seperti pro-, kontra-, pasca-, sub-, multi- yang wajib dirangkaikan langsung tanpa spasi (pascasarjana, multikultural).',
      badge: 'Morfologi',
      accent: colors.emerald,
    },
    {
      title: 'Penataan Tanda Titik Dua (:)',
      desc: 'Titik dua tidak dipakai jika perincian atau penjelasan itu merupakan pelengkap yang mengakhiri pernyataan.',
      badge: 'Tanda Baca',
      accent: colors.amber,
    },
    {
      title: 'Penulisan Julukan & Kekerabatan',
      desc: 'Huruf kapital dipakai untuk huruf pertama kata penunjuk hubungan kekerabatan yang digunakan dalam penyapaan atau pengacuan (contoh: "Silakan duduk, Kak!").',
      badge: 'Kapitalisasi',
      accent: colors.goldDeep,
    },
  ];

  return (
    <div style={canvasStyle}>
      <BackgroundVector motif="typography" />
      <div>
        <SlideHeader
          category="Pembaruan Signifikan"
          title="Apa yang Baru di EYD Edisi V Dibandingkan PUEBI?"
          subtitle="Penyesuaian termutakhir untuk merespons perkembangan kosakata lokal, serapan teknologi, dan konsistensi nalar kaidah."
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 20, marginTop: 12 }}>
          {updates.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: colors.cardShadow,
                borderRadius: 16,
                padding: '24px 24px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span
                  style={{
                    fontFamily: fontMono,
                    fontSize: 15,
                    fontWeight: 700,
                    color: item.accent,
                    textTransform: 'uppercase',
                    letterSpacing: '0.06em',
                  }}
                >
                  {item.badge}
                </span>
                <SparkleStarSVG size={18} color={item.accent} />
              </div>

              <h3 style={{ fontFamily: fontSerif, fontSize: 30, margin: 0, color: colors.ink }}>
                {item.title}
              </h3>

              <p style={{ fontFamily: fontSans, fontSize: 18, color: colors.muted, lineHeight: 1.5, margin: 0 }}>
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      <SlideFooter chapter="04. Pembaruan EYD V" />
    </div>
  );
};

// ================= PAGE 5: HURUF KAPITAL & MIRING =================
const PageHuruf: Page = () => (
  <div style={canvasStyle}>
    <BackgroundVector motif="waves" />
    <div>
      <SlideHeader
        category="Kaidah Huruf"
        title="Penggunaan Huruf Kapital dan Huruf Miring"
        subtitle="Membedakan penulisan nama geografi, jabatan, judul karya, dan istilah asing secara akurat."
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 12 }}>
        {/* Kolom Kapital */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            borderRadius: 16,
            padding: '22px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: fontSerif, fontSize: 32, fontWeight: 700, color: colors.goldDark }}>A</span>
            <h3 style={{ fontFamily: fontSerif, fontSize: 26, margin: 0, color: colors.ink }}>Kaidah Huruf Kapital</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ComparisonItem
              correct="kunci inggris, gula jawa, jeruk bali"
              wrong="kunci Inggris, gula Jawa, jeruk Bali"
              rule="Nama jenis / bukan nama geografis spesifik ditulis huruf kecil."
            />
            <ComparisonItem
              correct="Presiden Joko Widodo; seorang presiden"
              wrong="seorang Presiden Republik"
              rule="Jabatan tanpa diikuti nama orang/lembaga ditulis huruf kecil."
            />
            <ComparisonItem
              correct="Pergi ke arah timur; Jawa Timur"
              wrong="Pergi ke arah Timur"
              rule="Arah mata angin huruf kecil, nama wilayah administratif kapital."
            />
          </div>
        </div>

        {/* Kolom Miring */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            borderRadius: 16,
            padding: '22px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: fontSerif, fontSize: 32, fontStyle: 'italic', fontWeight: 700, color: colors.amber }}>I</span>
            <h3 style={{ fontFamily: fontSerif, fontSize: 26, margin: 0, color: colors.ink }}>Kaidah Huruf Miring</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ComparisonItem
              correct="Surat kabar Kompas, novel Laskar Pelangi"
              wrong="surat kabar 'Kompas', novel 'Laskar Pelangi'"
              rule="Judul buku, majalah, dan surat kabar yang dikutip ditulis miring."
            />
            <ComparisonItem
              correct="politik devide et impera, download → unduh"
              wrong="politik 'devide et impera', download"
              rule="Kata atau ungkapan bahasa daerah atau bahasa asing ditulis miring."
            />
            <ComparisonItem
              correct="Huruf pertama kata abad adalah a."
              wrong="Huruf pertama kata 'abad' adalah 'a'."
              rule="Menegaskan atau mengkhususkan huruf, bagian kata, atau kelompok kata."
            />
          </div>
        </div>
      </div>
    </div>

    <SlideFooter chapter="05. Huruf Kapital & Miring" />
  </div>
);

// ================= PAGE 6: PENULISAN KATA (GABUNGAN & BENTUK TERIKAT) =================
const PagePenulisanKata: Page = () => (
  <div style={canvasStyle}>
    <BackgroundVector motif="grid" />
    <div>
      <SlideHeader
        category="Morfologi & Ejaan"
        title="Penulisan Kata Depan, Imbuhan, dan Bentuk Terikat"
        subtitle="Aturan pemisahan 'di'/'ke' vs awalan, gabungan kata, serta bentuk terikat multinasional."
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 12 }}>
        {/* Kolom 1: Kata Depan vs Awalan */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            borderRadius: 16,
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.goldDark }}>KATA DEPAN vs AWALAN</span>
          <ComparisonItem
            correct="di rumah, ke kantor, di mana"
            wrong="dirumah, kekantor, dimana"
            rule="Kata depan (preposisi tempat/arah) wajib dipisah spasi."
          />
          <ComparisonItem
            correct="dimakan, ditulis, keberangkatan"
            wrong="di makan, di tulis, ke berangkatan"
            rule="Awalan (prefiks pembentuk kata pasif/benda) dirangkai serangkai."
          />
        </div>

        {/* Kolom 2: Gabungan Kata */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            borderRadius: 16,
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.emerald }}>GABUNGAN KATA BERIMBUHAN</span>
          <ComparisonItem
            correct="tanggung jawab → bertanggung jawab"
            wrong="bertanggungjawab"
            rule="Jika hanya berawalan atau berakhiran, tetap dipisah terpisah."
          />
          <ComparisonItem
            correct="pertanggungjawaban, menandatangani"
            wrong="pertanggung jawaban, menanda tangani"
            rule="Jika diapit awalan DAN akhiran sekaligus, ditulis serangkai."
          />
        </div>

        {/* Kolom 3: Bentuk Terikat */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            borderRadius: 16,
            padding: '22px 20px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.amber }}>BENTUK TERIKAT (BOUND MORPHEME)</span>
          <ComparisonItem
            correct="pascapanen, antarkota, subbagian"
            wrong="pasca panen, antar kota, sub bagian"
            rule="Bentuk terikat wajib ditulis serangkai langsung dengan kata dasarnya."
          />
          <ComparisonItem
            correct="non-ASEAN, pro-Barat, anti-Amerika"
            wrong="non ASEAN, proBarat, anti Amerika"
            rule="Jika digabung dengan kata berhuruf kapital, gunakan tanda hubung (-)."
          />
        </div>
      </div>
    </div>

    <SlideFooter chapter="06. Penulisan Kata" />
  </div>
);

// ================= PAGE 7: TANDA BACA KRUSIAL (KOMA & TITIK DUA) =================
const PageTandaBaca: Page = () => (
  <div style={canvasStyle}>
    <BackgroundVector motif="typography" />
    <div>
      <SlideHeader
        category="Sintaksis & Pungtuasi"
        title="Tanda Baca Krusial: Koma (,), Titik Dua (:), dan Hubung (-)"
        subtitle="Mencegah ambiguitas makna dalam struktur kalimat majemuk, rincian, dan pemenggalan."
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 12 }}>
        {/* Kolom Koma */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            borderRadius: 16,
            padding: '22px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: fontMono, fontSize: 32, fontWeight: 800, color: colors.goldDark }}>,</span>
            <h3 style={{ fontFamily: fontSerif, fontSize: 26, margin: 0, color: colors.ink }}>Tanda Koma (,)</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ComparisonItem
              correct="apel, jeruk, dan mangga (Oxford Comma)"
              wrong="apel, jeruk dan mangga"
              rule="Digunakan di antara unsur-unsur dalam perincian atau pembilangan."
            />
            <ComparisonItem
              correct="Karena hujan lebat, ia terlambat datang."
              wrong="Karena hujan lebat ia terlambat datang."
              rule="Digunakan untuk memisahkan anak kalimat yang mendahului induk kalimat."
            />
            <ComparisonItem
              correct="Ia terlambat datang karena hujan lebat."
              wrong="Ia terlambat datang, karena hujan lebat."
              rule="TIDAK digunakan jika induk kalimat mendahului anak kalimat."
            />
          </div>
        </div>

        {/* Kolom Titik Dua & Hubung */}
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            borderRadius: 16,
            padding: '22px 22px',
            display: 'flex',
            flexDirection: 'column',
            gap: 14,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{ fontFamily: fontMono, fontSize: 32, fontWeight: 800, color: colors.amber }}>: / —</span>
            <h3 style={{ fontFamily: fontSerif, fontSize: 26, margin: 0, color: colors.ink }}>Titik Dua (:) & Pisah (—)</h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <ComparisonItem
              correct="Kita memerlukan perabot: meja, kursi, dan lemari."
              wrong="Kita memerlukan: meja, kursi, dan lemari."
              rule="Titik dua TIDAK dipakai jika perincian merupakan pelengkap predikat."
            />
            <ComparisonItem
              correct="ke-25, tahun 1990-an, KTP-nya"
              wrong="ke 25 / ke25, tahun 1990an"
              rule="Tanda hubung merangkai angka dengan -an atau kata ganti milik."
            />
            <ComparisonItem
              correct="Jakarta—Surabaya (tanda pisah em-dash)"
              wrong="Jakarta-Surabaya (tanda hubung minus)"
              rule="Tanda pisah (—) berarti 'sampai ke' atau 'sampai dengan'."
            />
          </div>
        </div>
      </div>
    </div>

    <SlideFooter chapter="07. Tanda Baca" />
  </div>
);

// ================= PAGE 8: PENULISAN PARTIKEL & KATA GANTI =================
const PagePartikel: Page = () => {
  const items = [
    {
      label: 'Partikel -lah, -kah, -tah',
      rule: 'Ditulis serangkai dengan kata yang mendahuluinya.',
      examples: [
        { c: 'Bacalah buku itu dengan saksama.', w: 'Baca lah buku itu...' },
        { c: 'Siapakah gerangan penemu vaksin itu?', w: 'Siapa kah gerangan...' },
      ],
    },
    {
      label: 'Partikel pun (Berarti "Juga" / "Saja")',
      rule: 'Ditulis terpisah dari kata yang mendahuluinya.',
      examples: [
        { c: 'Jika kamu pergi, aku pun akan pergi.', w: '...aku pun akan pergi' },
        { c: 'Satu kali pun ia belum pernah mengeluh.', w: 'Satu kalipun...' },
      ],
    },
    {
      label: 'Pengecualian: 12 Kata Klise "pun"',
      rule: 'Wajib ditulis serangkai karena sudah menyatu sebagai konjungsi.',
      examples: [
        { c: 'adapun, bagaimanapun, biarpun, kalaupun', w: 'ada pun, bagaimana pun...' },
        { c: 'meskipun, walaupun, sungguhpun, sekalipun (meski)', w: 'meski pun, walau pun...' },
      ],
    },
  ];

  return (
    <div style={canvasStyle}>
      <BackgroundVector motif="waves" />
      <div>
        <SlideHeader
          category="Morfofonemik"
          title="Penulisan Partikel (-lah, -kah, pun) & Kata Sandang"
          subtitle="Menguasai pemisahan 'pun' bermakna 'juga' serta daftar 12 kata konjungsi 'pun' yang ditulis serangkai."
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 20, marginTop: 12 }}>
          {items.map((it, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: colors.cardShadow,
                borderRadius: 16,
                padding: '22px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 12,
                backdropFilter: 'blur(8px)',
              }}
            >
              <h3 style={{ fontFamily: fontSerif, fontSize: 26, margin: 0, color: colors.goldDark }}>
                {it.label}
              </h3>
              <p style={{ fontFamily: fontSans, fontSize: 16, color: colors.muted, margin: 0, lineHeight: 1.4 }}>
                {it.rule}
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginTop: 8 }}>
                {it.examples.map((ex, i) => (
                  <div key={i} style={{ padding: '10px 14px', borderRadius: 10, backgroundColor: '#fcfbf8', border: `1px solid ${colors.goldBorderLight}` }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <CheckCircleSVG size={18} color={colors.emerald} />
                      <span style={{ fontFamily: fontMono, fontSize: 16, color: colors.emerald, fontWeight: 700 }}>{ex.c}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <XCircleSVG size={18} color={colors.rose} />
                      <span style={{ fontFamily: fontMono, fontSize: 15, color: colors.rose, textDecoration: 'line-through', opacity: 0.85 }}>{ex.w}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <SlideFooter chapter="08. Partikel & Kata Sandang" />
    </div>
  );
};

// ================= PAGE 9: PENULISAN SINGKATAN & AKRONIM =================
const PageSingkatan: Page = () => (
  <div style={canvasStyle}>
    <BackgroundVector motif="grid" />
    <div>
      <SlideHeader
        category="Ortografi Singkatan"
        title="Penulisan Singkatan, Akronim, Angka, dan Bilangan"
        subtitle="Membedakan singkatan nama lembaga, satuan ukuran, gelar kehormatan, dan penulisan bilangan."
      />

      <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 24, marginTop: 12 }}>
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            borderRadius: 16,
            padding: '24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.goldDark }}>SINGKATAN UMUM & NAMA LEMBAGA</span>
          <ComparisonItem
            correct="d.l.l., d.s.b., s.d., a.n."
            wrong="dll., dsb., s/d, a/n"
            rule="Singkatan umum 3 huruf diakhiri 1 titik (dsb.), 2 huruf masing-masing titik (s.d.). Garis miring (/) adalah kesalahan umum."
          />
          <ComparisonItem
            correct="Dr. Budi Santoso, M.Pd. (Doktor) vs dr. (Dokter)"
            wrong="DR. Budi Santoso / dr Budi Santoso"
            rule="Dr. (kapital) untuk gelar Doktor; dr. (kecil) untuk profesi Dokter medis."
          />
          <ComparisonItem
            correct="WHO, PBB, KTP, SIM (huruf kapital tanpa titik)"
            wrong="W.H.O., P.B.B., K.T.P."
            rule="Singkatan nama lembaga pemerintah/organisasi tidak memakai titik."
          />
        </div>

        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            borderRadius: 16,
            padding: '24px 24px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.emerald }}>ANGKA DAN BILANGAN RESMI</span>
          <ComparisonItem
            correct="Tiga puluh siswa hadir di kelas."
            wrong="30 siswa hadir di kelas."
            rule="Bilangan pada awal kalimat wajib ditulis dengan huruf kata utuh."
          />
          <ComparisonItem
            correct="Ia membeli tiga ekor ayam; 150 ekor sapi..."
            wrong="Ia membeli 3 ekor ayam"
            rule="Bilangan yang dapat dinyatakan dalam satu atau dua kata ditulis huruf, kecuali perincian."
          />
          <ComparisonItem
            correct="abad ke-21 / abad XXI"
            wrong="abad ke 21 / abad ke-XXI"
            rule="Jangan menggabungkan awalan 'ke-' dengan angka romawi."
          />
        </div>
      </div>
    </div>

    <SlideFooter chapter="09. Singkatan & Bilangan" />
  </div>
);

// ================= PAGE 10: PENYERAPAN KATA ASING & DAERAH =================
const PageSerapan: Page = () => {
  const rules = [
    { pattern: '-tion → -si', eng: 'action, communication', id: 'aksi, komunikasi' },
    { pattern: '-ic → -ik / -is', eng: 'electronic, pragmatic', id: 'elektronik, pragmatis' },
    { pattern: '-ism → -isme', eng: 'nationalism, pragmatism', id: 'nasionalisme, pragmatisme' },
    { pattern: '-ity → -itas', eng: 'activity, productivity', id: 'aktivitas, produktivitas' },
    { pattern: 'ph → f', eng: 'photo, phonology', id: 'foto, fonologi' },
    { pattern: 'c (di muka e, i, y) → s', eng: 'central, circulation', id: 'sentral, sirkulasi' },
  ];

  return (
    <div style={canvasStyle}>
      <BackgroundVector motif="waves" />
      <div>
        <SlideHeader
          category="Leksikologi Serapan"
          title="Kaidah Penyerapan Kosakata Asing ke Bahasa Indonesia"
          subtitle="Prinsip adaptasi morfologis dan fonologis agar selaras dengan sistem lafal bahasa nasional."
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 12 }}>
          {rules.map((r, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: colors.cardShadow,
                borderRadius: 14,
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontFamily: fontMono, fontSize: 18, fontWeight: 700, color: colors.goldDark }}>
                  {r.pattern}
                </span>
                <span style={{ fontSize: 13, fontFamily: fontMono, color: colors.dim }}>Kaidah #{idx + 1}</span>
              </div>
              <div style={{ fontSize: 15, fontFamily: fontSans, color: colors.muted }}>
                Asal: <span style={{ fontFamily: fontMono, color: colors.ink, fontStyle: 'italic' }}>{r.eng}</span>
              </div>
              <div style={{ fontSize: 18, fontFamily: fontMono, color: colors.emerald, fontWeight: 700 }}>
                Serapan: {r.id}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            position: 'relative',
            zIndex: 1,
            marginTop: 18,
            padding: '16px 24px',
            borderRadius: 12,
            backgroundColor: colors.goldSoft,
            border: `1px solid ${colors.goldBorder}`,
            boxShadow: colors.cardShadow,
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <SparkleStarSVG size={24} color={colors.goldDark} />
          <div style={{ fontSize: 17, color: colors.text, lineHeight: 1.4 }}>
            <span style={{ color: colors.goldDark, fontWeight: 700 }}>Prinsip Mutlak:</span> Unsur serapan yang telah disesuaikan ejaannya tidak lagi ditulis miring (contoh: <span style={{ fontFamily: fontMono, color: colors.emerald, fontWeight: 700 }}>analisis, risiko, standardisasi</span>). Hanya istilah asing asli yang belum diserap yang dicetak miring.
          </div>
        </div>
      </div>

      <SlideFooter chapter="10. Kata Serapan" />
    </div>
  );
};

// ================= PAGE 11: KESALAHAN UMUM PALING SERING =================
const PageKesalahanUmum: Page = () => {
  const commonErrors = [
    { correct: 'antre, apotek, atlet, cedera', wrong: 'antri, apotik, atlit, cidera' },
    { correct: 'analisis, diagnosis, sintesis', wrong: 'analisa, diagnosa, sintesa' },
    { correct: 'objek, subjek, proyek', wrong: 'obyek, subyek, projek' },
    { correct: 'kualitas, kuantitas, jadwal', wrong: 'kwalitas, kwantitas, jadual' },
    { correct: 'utang, silakan, saksama', wrong: 'hutang, silahkan, seksama' },
    { correct: 'fondasi, frekuensi, konkret', wrong: 'pondasi, frekwensi, kongkrit' },
  ];

  return (
    <div style={canvasStyle}>
      <BackgroundVector motif="typography" />
      <div>
        <SlideHeader
          category="Koreksi Harian"
          title="Daftar Kosakata Baku vs Tidak Baku Terpopuler"
          subtitle="Koreksi terhadap leksikon yang sering keliru digunakan dalam media massa, kantor, dan media sosial."
        />

        <div style={{ position: 'relative', zIndex: 1, display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 18, marginTop: 12 }}>
          {commonErrors.map((item, idx) => (
            <div
              key={idx}
              style={{
                backgroundColor: colors.cardBg,
                border: `1px solid ${colors.cardBorder}`,
                boxShadow: colors.cardShadow,
                borderRadius: 14,
                padding: '18px 20px',
                display: 'flex',
                flexDirection: 'column',
                gap: 10,
                backdropFilter: 'blur(8px)',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <CheckCircleSVG size={22} color={colors.emerald} />
                <span style={{ fontFamily: fontMono, fontSize: 18, fontWeight: 700, color: colors.emerald }}>
                  {item.correct}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <XCircleSVG size={22} color={colors.rose} />
                <span style={{ fontFamily: fontMono, fontSize: 17, color: colors.rose, textDecoration: 'line-through', opacity: 0.85 }}>
                  {item.wrong}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <SlideFooter chapter="11. Glosarium Baku" />
    </div>
  );
};

// ================= PAGE 12: KESIMPULAN & PENUTUP =================
const PagePenutup: Page = () => (
  <div style={canvasStyle}>
    <BackgroundVector motif="waves" />
    <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center' }}>
      <div
        style={{
          backgroundColor: colors.goldSoft,
          border: `1px solid ${colors.goldBorder}`,
          padding: '8px 20px',
          borderRadius: 30,
          marginBottom: 24,
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
        }}
      >
        <BookFeatherSVG size={22} color={colors.goldDark} />
        <span style={{ fontFamily: fontMono, fontSize: 18, fontWeight: 700, color: colors.goldDark, letterSpacing: '0.08em' }}>
          TUNTUTAN PROFESIONALISME BERBAHASA
        </span>
      </div>

      <h1
        style={{
          fontFamily: fontSerif,
          fontSize: 78,
          fontWeight: 700,
          color: colors.ink,
          lineHeight: 1.15,
          maxWidth: 1200,
          margin: '0 0 24px 0',
        }}
      >
        "Utamakan Bahasa Indonesia, Lestarikan Bahasa Daerah, Kuasai Bahasa Asing"
      </h1>

      <p
        style={{
          fontFamily: fontSans,
          fontSize: 26,
          color: colors.muted,
          maxWidth: 950,
          lineHeight: 1.5,
          margin: '0 0 36px 0',
        }}
      >
        Penerapan EYD Edisi V bukan sekadar mematuhi ortografi administratif, melainkan wujud martabat, kejernihan berpikir, dan kehormatan bahasa persatuan Indonesia.
      </p>

      <div style={{ display: 'flex', gap: 24 }}>
        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            padding: '14px 28px',
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: fontMono, fontSize: 16, color: colors.goldDark, fontWeight: 700 }}>PORTAL RESMI</span>
          <span style={{ fontFamily: fontSans, fontSize: 20, color: colors.ink, fontWeight: 600 }}>ejaan.kemdikbud.go.id</span>
        </div>

        <div
          style={{
            backgroundColor: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            boxShadow: colors.cardShadow,
            padding: '14px 28px',
            borderRadius: 14,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <span style={{ fontFamily: fontMono, fontSize: 16, color: colors.emerald, fontWeight: 700 }}>KAMUS BESAR</span>
          <span style={{ fontFamily: fontSans, fontSize: 20, color: colors.ink, fontWeight: 600 }}>kbbi.kemdikbud.go.id</span>
        </div>
      </div>
    </div>

    <SlideFooter chapter="12. Penutup" />
  </div>
);

// Meta export for framework registration
export const meta: SlideMeta = {
  title: 'Pedoman Ejaan Yang Disempurnakan (EYD) Edisi V',
  createdAt: '2026-10-14T12:47:34.122Z',
};

// Speaker notes for presenter mode
export const notes: (string | undefined)[] = [
  'Selamat pagi/siang rekan-rekan. Hari ini kita akan membahas Pedoman Ejaan Bahasa Indonesia yang Disempurnakan (EYD) Edisi V yang resmi diterbitkan Badan Bahasa Kemendikbudristek.',
  'Mari kita lihat kilas balik sejarah: dari Ejaan Van Ophuijsen tahun 1901, Ejaan Republik 1947, EYD 1972, PUEBI 2015, hingga kembalinya nama EYD pada Edisi V tahun 2022.',
  'Struktur pedoman ini dibangun atas 4 pilar utama: Pemakaian Huruf, Penulisan Kata, Penggunaan Tanda Baca, dan Penulisan Unsur Serapan.',
  'Berikut adalah beberapa pembaruan kunci pada Edisi V: adanya monoftong eu, aturan bentuk terikat, perbaikan penempatan titik dua, dan pengkhususan sapaan kekerabatan.',
  'Perhatikan perbedaan penulisan nama jenis yang tidak berhuruf kapital (kunci inggris, gula jawa) serta penulisan miring untuk istilah asing yang belum diserap.',
  'Aturan preposisi di/ke wajib dipisah, sedangkan prefiks di-/ke- digabung. Perhatikan juga kata berimbuhan gabung seperti pertanggungjawaban.',
  'Tanda koma digunakan sebelum konjungsi rincian terakhir (Oxford comma) dan pemisah anak kalimat di awal. Perhatikan aturan titik dua yang tidak boleh memutus predikat.',
  'Partikel pun yang berarti juga wajib dipisah, kecuali 12 kata klise konjungsi seperti meskipun, walaupun, maupun, dan adapun.',
  'Singkatan umum 3 huruf diakhiri satu titik (dsb., dll.), singkatan 2 huruf dua titik (s.d.). Hindari garis miring yang tidak baku seperti s/d atau a/n.',
  'Kaidah penyerapan unsur asing secara fonologis dan morfologis. Kata yang sudah diserap resmi tidak boleh lagi dicetak miring.',
  'Ini adalah daftar kata baku yang paling sering salah ditulis dalam pekerjaan sehari-hari: antre bukan antri, apotek bukan apotik, analisis bukan analisa.',
  'Sebagai penutup, mari kita tegakkan slogan Trigatra Bangun Bahasa: Utamakan Bahasa Indonesia, Lestarikan Bahasa Daerah, Kuasai Bahasa Asing. Terima kasih.',
];

// Pages registry in exact order
export default [
  PageCover,
  PageSejarah,
  PagePilar,
  PagePembaruan,
  PageHuruf,
  PagePenulisanKata,
  PageTandaBaca,
  PagePartikel,
  PageSingkatan,
  PageSerapan,
  PageKesalahanUmum,
  PagePenutup,
] satisfies Page[];
