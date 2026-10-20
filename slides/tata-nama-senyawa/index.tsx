import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

// Subtle background SVG assets
import bgConstellation from './assets/bg-chemical-constellation-purple.svg';
import bgLattice from './assets/bg-crystal-lattice-purple.svg';
import bgOrbitals from './assets/bg-molecular-orbitals-purple.svg';
import bgElectronSea from './assets/bg-electron-sea-purple.svg';

// Web font injection: Plus Jakarta Sans for clean body, Newsreader for editorial headlines, JetBrains Mono for chemical formulas
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400;1,6..72,600&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400;1,600&display=swap';
const FONT_LINK_ID = 'osd-webfont-tata-nama';

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
    accent: '#7c3aed',
  },
  fonts: {
    display: '"Newsreader", Georgia, serif',
    body: '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 128,
    body: 32,
  },
  radius: 16,
};

const fontSerif = '"Newsreader", Georgia, serif';
const fontSans = '"Plus Jakarta Sans", system-ui, -apple-system, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, monospace';

// Purple and white palette
const colors = {
  purplePrimary: '#7c3aed',
  purpleDark: '#581c87',
  purpleCobalt: '#6d28d9',
  purpleVibrant: '#9333ea',
  purpleLight: '#c084fc',
  purplePale: '#f5f3ff',
  purpleSoft: 'rgba(124, 58, 237, 0.08)',
  purpleSoftBorder: 'rgba(124, 58, 237, 0.22)',
  purpleStrongBorder: 'rgba(124, 58, 237, 0.45)',

  textDark: '#0f172a',
  textBody: '#334155',
  textMuted: '#64748b',

  cardBg: '#ffffff',
  cardShadow: '0 10px 30px -6px rgba(124, 58, 237, 0.12), 0 2px 10px -2px rgba(15, 23, 42, 0.04)',
};

// Canvas base style
const canvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  position: 'relative',
  overflow: 'hidden',
  backgroundColor: '#ffffff',
  backgroundImage:
    'radial-gradient(1200px circle at 90% 10%, rgba(192, 132, 252, 0.08), transparent 60%), radial-gradient(1100px circle at 10% 90%, rgba(124, 58, 237, 0.06), transparent 55%)',
  color: colors.textDark,
  fontFamily: fontSans,
  padding: '40px 90px 34px 90px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
};

// Centered content container for balanced 1920x1080 layouts
const centeredContainerStyle: CSSProperties = {
  position: 'relative',
  zIndex: 1,
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  maxWidth: 1640,
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

  const asset = assetMap[motif] || bgConstellation;

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
      <img
        src={asset}
        alt=""
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.95,
        }}
      />
    </div>
  );
};

// ================= HEADER & FOOTER COMPONENTS =================
const SlideHeader = ({ tag, title }: { tag: string; title: string }) => (
  <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', marginBottom: 20 }}>
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 8,
        padding: '5px 16px',
        borderRadius: 999,
        background: colors.purpleSoft,
        border: `1px solid ${colors.purpleSoftBorder}`,
        color: colors.purplePrimary,
        fontSize: 15,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        marginBottom: 8,
      }}
    >
      <IconFlask size={15} color={colors.purplePrimary} />
      <span>{tag}</span>
    </div>
    <h2
      style={{
        margin: 0,
        fontFamily: fontSerif,
        fontSize: 48,
        fontWeight: 700,
        color: colors.purpleDark,
        letterSpacing: '-0.02em',
        lineHeight: 1.15,
      }}
    >
      {title}
    </h2>
  </div>
);

const SlideFooter = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'relative',
        zIndex: 2,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: 12,
        borderTop: '1px solid rgba(124, 58, 237, 0.14)',
        fontSize: 15,
        color: colors.textMuted,
        fontWeight: 500,
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <IconAtom size={18} color={colors.purplePrimary} />
        <span style={{ fontWeight: 600, color: colors.purpleDark }}>Kimia Dasar</span>
        <span>•</span>
        <span>Tata Nama Senyawa Kimia</span>
      </div>
      <div
        style={{
          background: colors.purplePale,
          padding: '4px 14px',
          borderRadius: 12,
          fontWeight: 700,
          color: colors.purplePrimary,
          letterSpacing: '0.04em',
        }}
      >
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </div>
    </div>
  );
};

// ================= CUSTOM SVG ICONS (NO EMOJIS!) =================
const IconFlask = ({ size = 24, color = colors.purplePrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M10 2v7.31L4.35 19.5A2 2 0 0 0 6.07 22h11.86a2 2 0 0 0 1.72-2.5L14 9.31V2" />
    <line x1="8.5" y1="2" x2="15.5" y2="2" />
    <path d="M14 9.3a6.5 6.5 0 0 0-4 0" />
    <circle cx="9" cy="17" r="1" fill={color} />
    <circle cx="14" cy="16" r="1.5" fill={color} />
  </svg>
);

const IconAtom = ({ size = 24, color = colors.purplePrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="3" fill={color} />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(30 12 12)" />
    <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(-30 12 12)" />
  </svg>
);

const IconTarget = ({ size = 24, color = colors.purplePrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" fill={color} />
  </svg>
);

const IconCheck = ({ size = 24, color = colors.purplePrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconScale = ({ size = 24, color = colors.purplePrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="3" x2="12" y2="21" />
    <polyline points="4 7 12 5 20 7" />
    <path d="M4 7l-2 7a3 3 0 0 0 6 0L6 7" />
    <path d="M20 7l-2 7a3 3 0 0 0 6 0L22 7" />
    <line x1="8" y1="21" x2="16" y2="21" />
  </svg>
);

const IconBook = ({ size = 24, color = colors.purplePrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const IconLayers = ({ size = 24, color = colors.purplePrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 17 12 22 22 17" />
    <polyline points="2 12 12 17 22 12" />
  </svg>
);

const IconCalculator = ({ size = 24, color = colors.purplePrimary }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="4" y="2" width="16" height="20" rx="2" />
    <line x1="8" y1="6" x2="16" y2="6" />
    <line x1="16" y1="14" x2="16" y2="18" />
    <path d="M16 10h.01" />
    <path d="M12 10h.01" />
    <path d="M8 10h.01" />
    <path d="M12 14h.01" />
    <path d="M8 14h.01" />
    <path d="M12 18h.01" />
    <path d="M8 18h.01" />
  </svg>
);

// =========================================================================
// SLIDE 1: Cover
// =========================================================================
const Slide1Cover: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="constellation" />

    <div style={centeredContainerStyle}>
      <div
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          padding: '8px 24px',
          borderRadius: 999,
          background: colors.purpleSoft,
          border: `1.5px solid ${colors.purpleSoftBorder}`,
          color: colors.purplePrimary,
          fontSize: 18,
          fontWeight: 700,
          letterSpacing: '0.14em',
          textTransform: 'uppercase',
          marginBottom: 16,
        }}
      >
        <IconFlask size={20} color={colors.purplePrimary} />
        <span>Kimia Dasar • Modul Pembelajaran</span>
      </div>

      <h1
        style={{
          margin: '0 0 14px 0',
          fontFamily: fontSerif,
          fontSize: 80,
          fontWeight: 700,
          color: colors.purpleDark,
          letterSpacing: '-0.03em',
          textAlign: 'center',
          lineHeight: 1.1,
        }}
      >
        Tata Nama Senyawa Kimia
      </h1>

      <p
        style={{
          maxWidth: 1100,
          fontSize: 23,
          lineHeight: 1.5,
          color: colors.textBody,
          textAlign: 'center',
          margin: '0 0 32px 0',
        }}
      >
        Tata nama senyawa kimia adalah aturan yang digunakan untuk memberikan nama pada suatu senyawa berdasarkan unsur-unsur penyusunnya.
      </p>

      {/* 4 Example cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 24, width: '100%', maxWidth: 1300, marginBottom: 28 }}>
        <div style={{ background: '#ffffff', border: `1.5px solid ${colors.purpleSoftBorder}`, borderRadius: 16, padding: '20px 24px', textAlign: 'center', boxShadow: colors.cardShadow }}>
          <div style={{ fontFamily: fontMono, fontSize: 32, fontWeight: 700, color: colors.purplePrimary, marginBottom: 6 }}>H₂O</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: colors.textDark }}>air</div>
        </div>
        <div style={{ background: '#ffffff', border: `1.5px solid ${colors.purpleSoftBorder}`, borderRadius: 16, padding: '20px 24px', textAlign: 'center', boxShadow: colors.cardShadow }}>
          <div style={{ fontFamily: fontMono, fontSize: 32, fontWeight: 700, color: colors.purplePrimary, marginBottom: 6 }}>NaCl</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: colors.textDark }}>natrium klorida</div>
        </div>
        <div style={{ background: '#ffffff', border: `1.5px solid ${colors.purpleSoftBorder}`, borderRadius: 16, padding: '20px 24px', textAlign: 'center', boxShadow: colors.cardShadow }}>
          <div style={{ fontFamily: fontMono, fontSize: 32, fontWeight: 700, color: colors.purplePrimary, marginBottom: 6 }}>CO₂</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: colors.textDark }}>karbon dioksida</div>
        </div>
        <div style={{ background: '#ffffff', border: `1.5px solid ${colors.purpleSoftBorder}`, borderRadius: 16, padding: '20px 24px', textAlign: 'center', boxShadow: colors.cardShadow }}>
          <div style={{ fontFamily: fontMono, fontSize: 32, fontWeight: 700, color: colors.purplePrimary, marginBottom: 6 }}>NH₃</div>
          <div style={{ fontSize: 18, fontWeight: 600, color: colors.textDark }}>amonia</div>
        </div>
      </div>

      {/* Key Takeaways */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 24,
          width: '100%',
          maxWidth: 1300,
        }}
      >
        <div
          style={{
            background: colors.purplePale,
            borderLeft: `5px solid ${colors.purplePrimary}`,
            borderRadius: 12,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <IconBook size={28} color={colors.purplePrimary} />
          <div style={{ fontSize: 18, color: colors.textDark, lineHeight: 1.45 }}>
            Tata nama yang teratur membantu kita mengenali suatu senyawa tanpa harus menghafal semua sifatnya.
          </div>
        </div>

        <div
          style={{
            background: colors.purplePale,
            borderLeft: `5px solid ${colors.purpleVibrant}`,
            borderRadius: 12,
            padding: '16px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: 16,
          }}
        >
          <IconLayers size={28} color={colors.purpleVibrant} />
          <div style={{ fontSize: 18, color: colors.textDark, lineHeight: 1.45 }}>
            Materi ini akan membahas dua hal utama, yaitu <strong>bilangan oksidasi</strong> dan <strong>aturan penamaan senyawa kimia</strong>.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 2: Tujuan Pembelajaran
// =========================================================================
const Slide2Tujuan: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="orbitals" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Kompetensi" title="Tujuan Pembelajaran" />

      <p style={{ fontSize: 21, color: colors.textDark, textAlign: 'center', marginBottom: 24, fontWeight: 600 }}>
        Setelah mempelajari materi ini, mahasiswa diharapkan mampu:
      </p>

      {/* 5 Objectives Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 18, width: '100%', marginBottom: 28 }}>
        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '24px 20px', boxShadow: colors.cardShadow, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.purplePrimary, fontWeight: 800, fontSize: 22, marginBottom: 12 }}>1</div>
          <div style={{ fontSize: 17, lineHeight: 1.5, color: colors.textBody, fontWeight: 500 }}>
            Menjelaskan pengertian bilangan oksidasi.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '24px 20px', boxShadow: colors.cardShadow, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.purplePrimary, fontWeight: 800, fontSize: 22, marginBottom: 12 }}>2</div>
          <div style={{ fontSize: 17, lineHeight: 1.5, color: colors.textBody, fontWeight: 500 }}>
            Menentukan bilangan oksidasi suatu unsur dalam senyawa.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '24px 20px', boxShadow: colors.cardShadow, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.purplePrimary, fontWeight: 800, fontSize: 22, marginBottom: 12 }}>3</div>
          <div style={{ fontSize: 17, lineHeight: 1.5, color: colors.textBody, fontWeight: 500 }}>
            Memahami aturan dasar penamaan senyawa kimia.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '24px 20px', boxShadow: colors.cardShadow, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.purplePrimary, fontWeight: 800, fontSize: 22, marginBottom: 12 }}>4</div>
          <div style={{ fontSize: 17, lineHeight: 1.5, color: colors.textBody, fontWeight: 500 }}>
            Membedakan tata nama senyawa ion dan senyawa kovalen.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '24px 20px', boxShadow: colors.cardShadow, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <div style={{ width: 50, height: 50, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', color: colors.purplePrimary, fontWeight: 800, fontSize: 22, marginBottom: 12 }}>5</div>
          <div style={{ fontSize: 17, lineHeight: 1.5, color: colors.textBody, fontWeight: 500 }}>
            Memberikan nama senyawa berdasarkan rumus kimianya dengan menerapkan aturan penamaan yang tepat.
          </div>
        </div>
      </div>

      {/* Primary Goal Banner */}
      <div
        style={{
          width: '100%',
          maxWidth: 1200,
          background: 'linear-gradient(135deg, #7c3aed, #581c87)',
          borderRadius: 20,
          padding: '22px 38px',
          color: '#ffffff',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          boxShadow: '0 12px 32px -6px rgba(124, 58, 237, 0.35)',
        }}
      >
        <div style={{ background: 'rgba(255, 255, 255, 0.2)', padding: 12, borderRadius: 14, display: 'flex' }}>
          <IconTarget size={34} color="#ffffff" />
        </div>
        <div>
          <div style={{ fontSize: 14, textTransform: 'uppercase', letterSpacing: '0.12em', opacity: 0.85, fontWeight: 700 }}>
            Fokus Capaian Utama
          </div>
          <div style={{ fontSize: 21, fontWeight: 600, marginTop: 4, lineHeight: 1.4 }}>
            Tujuan utamanya adalah mahasiswa mampu menyebutkan nama suatu senyawa dengan benar berdasarkan rumus kimianya.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 3: Pengertian Bilangan Oksidasi
// =========================================================================
const Slide3BiloksDef: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="lattice" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Konsep Dasar" title="Pengertian Bilangan Oksidasi" />

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 32, width: '100%', alignItems: 'stretch' }}>
        {/* Left Column: Concept definition */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          <div
            style={{
              background: '#ffffff',
              borderRadius: 20,
              border: `1.5px solid ${colors.purpleSoftBorder}`,
              boxShadow: colors.cardShadow,
              padding: '26px 30px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 10 }}>
              <IconAtom size={26} color={colors.purplePrimary} />
              <h3 style={{ margin: 0, fontSize: 23, color: colors.purpleDark, fontWeight: 700 }}>
                Definisi Biloks
              </h3>
            </div>
            <p style={{ fontSize: 20, lineHeight: 1.6, color: colors.textBody, margin: 0 }}>
              Bilangan oksidasi atau <strong>biloks</strong> adalah bilangan yang menunjukkan muatan suatu atom secara formal dalam senyawa atau ion.
            </p>
          </div>

          <div
            style={{
              background: colors.purplePale,
              borderRadius: 20,
              border: `1.5px solid ${colors.purpleSoftBorder}`,
              padding: '22px 28px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 8 }}>
              <IconLayers size={22} color={colors.purplePrimary} />
              <span style={{ fontSize: 18, fontWeight: 700, color: colors.purpleDark }}>
                Peran Biloks
              </span>
            </div>
            <p style={{ fontSize: 19, lineHeight: 1.55, color: colors.textDark, margin: 0 }}>
              Biloks membantu kita memahami bagaimana elektron dianggap berpindah atau dibagi ketika unsur-unsur membentuk senyawa.
            </p>
          </div>

          <div
            style={{
              background: '#ffffff',
              borderRadius: 18,
              borderLeft: `6px solid ${colors.purpleVibrant}`,
              border: `1px solid ${colors.purpleSoftBorder}`,
              padding: '18px 24px',
            }}
          >
            <div style={{ fontSize: 17, lineHeight: 1.5, color: colors.textBody }}>
              <strong>Perlu diingat:</strong> biloks tidak selalu sama dengan muatan nyata atom. Dalam senyawa kovalen, biloks ditentukan menggunakan aturan pembagian elektron secara formal.
            </div>
          </div>
        </div>

        {/* Right Column: Concrete Example NaCl */}
        <div
          style={{
            background: '#ffffff',
            borderRadius: 24,
            border: `2px solid ${colors.purplePrimary}`,
            boxShadow: '0 16px 36px -8px rgba(124, 58, 237, 0.18)',
            padding: '30px 34px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <div style={{ textAlign: 'center', marginBottom: 18 }}>
            <span style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: colors.purplePrimary }}>
              Contoh Kasus Senyawa Ionik
            </span>
            <div style={{ fontFamily: fontMono, fontSize: 54, fontWeight: 800, color: colors.purpleDark, marginTop: 4 }}>
              NaCl
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 20 }}>
            <div style={{ background: colors.purplePale, padding: '18px', borderRadius: 16, textAlign: 'center', border: `1px solid ${colors.purpleSoftBorder}` }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: colors.textMuted }}>Natrium (Na)</div>
              <div style={{ fontFamily: fontMono, fontSize: 36, fontWeight: 800, color: colors.purplePrimary, margin: '6px 0' }}>+1</div>
              <div style={{ fontSize: 14, color: colors.textBody }}>Melepaskan 1 elektron</div>
            </div>

            <div style={{ background: colors.purplePale, padding: '18px', borderRadius: 16, textAlign: 'center', border: `1px solid ${colors.purpleSoftBorder}` }}>
              <div style={{ fontSize: 15, fontWeight: 600, color: colors.textMuted }}>Klorin (Cl)</div>
              <div style={{ fontFamily: fontMono, fontSize: 36, fontWeight: 800, color: colors.purpleDark, margin: '6px 0' }}>−1</div>
              <div style={{ fontSize: 14, color: colors.textBody }}>Menerima 1 elektron</div>
            </div>
          </div>

          <div style={{ background: 'rgba(124, 58, 237, 0.05)', padding: '16px 20px', borderRadius: 14, fontSize: 16, lineHeight: 1.5, color: colors.textBody, textAlign: 'center' }}>
            Hal ini berkaitan dengan kecenderungan natrium melepaskan satu elektron dan klorin menerima satu elektron ketika membentuk senyawa ion.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 4: Aturan Dasar Bilangan Oksidasi
// =========================================================================
const Slide4AturanDasar: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="constellation" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Panduan Penentuan" title="Aturan Dasar Bilangan Oksidasi" />

      <p style={{ fontSize: 19, color: colors.textDark, textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>
        Untuk menentukan biloks suatu unsur, ada beberapa aturan yang perlu diketahui:
      </p>

      {/* Grid of 7 rules */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, width: '100%', marginBottom: 16 }}>
        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: colors.purplePrimary, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>1</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Unsur Bebas</strong>
          </div>
          <div style={{ fontSize: 15, color: colors.textBody, lineHeight: 1.45 }}>
            Unsur bebas memiliki biloks <strong>0</strong>.<br />
            <span style={{ fontSize: 13, color: colors.textMuted }}>Contoh: Fe, O₂, H₂, dan Cl₂ memiliki biloks 0.</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: colors.purplePrimary, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>2</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Ion Monoatomik</strong>
          </div>
          <div style={{ fontSize: 15, color: colors.textBody, lineHeight: 1.45 }}>
            Sesuai muatannya.<br />
            <span style={{ fontSize: 13, color: colors.textMuted }}>Contoh: Na⁺ = +1, Mg²⁺ = +2, dan Cl⁻ = −1.</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: colors.purplePrimary, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>3</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Logam Golongan IA</strong>
          </div>
          <div style={{ fontSize: 15, color: colors.textBody, lineHeight: 1.45 }}>
            Umumnya memiliki biloks <strong>+1</strong>.<br />
            <span style={{ fontSize: 13, color: colors.textMuted }}>Contoh: Li, Na, dan K dalam senyawanya.</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: colors.purplePrimary, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>4</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Logam Golongan IIA</strong>
          </div>
          <div style={{ fontSize: 15, color: colors.textBody, lineHeight: 1.45 }}>
            Umumnya memiliki biloks <strong>+2</strong>.<br />
            <span style={{ fontSize: 13, color: colors.textMuted }}>Contoh: Mg dan Ca dalam senyawanya.</span>
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: colors.purplePrimary, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>5</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Fluorin (F)</strong>
          </div>
          <div style={{ fontSize: 15, color: colors.textBody, lineHeight: 1.45 }}>
            Fluorin (F) dalam senyawanya memiliki biloks <strong>−1</strong>.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ width: 26, height: 26, borderRadius: '50%', background: colors.purplePrimary, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700 }}>6</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Oksigen (O)</strong>
          </div>
          <div style={{ fontSize: 15, color: colors.textBody, lineHeight: 1.45 }}>
            Umumnya memiliki biloks <strong>−2</strong>.<br />
            <span style={{ fontSize: 13, color: colors.textMuted }}>Pengecualian: peroksida, seperti H₂O₂ (biloks O = −1).</span>
          </div>
        </div>
      </div>

      {/* Rule 7 Full-width card */}
      <div
        style={{
          width: '100%',
          background: colors.purplePale,
          borderRadius: 16,
          border: `1.5px solid ${colors.purpleSoftBorder}`,
          padding: '16px 24px',
          display: 'flex',
          alignItems: 'center',
          gap: 16,
        }}
      >
        <span style={{ width: 30, height: 30, borderRadius: '50%', background: colors.purpleDark, color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 15, fontWeight: 700, flexShrink: 0 }}>7</span>
        <div>
          <strong style={{ fontSize: 17, color: colors.purpleDark }}>Hidrogen (H):</strong>
          <span style={{ fontSize: 16, color: colors.textDark, marginLeft: 8 }}>
            Hidrogen umumnya memiliki biloks <strong>+1</strong>. Dalam hidrida logam, seperti <strong>NaH</strong>, biloks hidrogen adalah <strong>−1</strong>.
          </span>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 5: Jumlah Bilangan Oksidasi
// =========================================================================
const Slide5JumlahBiloks: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="electron-sea" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Aturan Total Muatan" title="Jumlah Bilangan Oksidasi" />

      <p style={{ fontSize: 19, color: colors.textDark, textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>
        Selain aturan dasar, jumlah biloks juga mengikuti aturan tertentu:
      </p>

      {/* Rules Banners */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', marginBottom: 24 }}>
        <div style={{ background: colors.purplePale, borderLeft: `6px solid ${colors.purplePrimary}`, borderRadius: 16, padding: '18px 22px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: colors.purplePrimary, letterSpacing: '0.08em' }}>Senyawa Netral</div>
          <div style={{ fontSize: 19, fontWeight: 700, color: colors.purpleDark, marginTop: 4 }}>
            Jumlah seluruh biloks atom adalah 0.
          </div>
        </div>

        <div style={{ background: colors.purplePale, borderLeft: `6px solid ${colors.purpleVibrant}`, borderRadius: 16, padding: '18px 22px' }}>
          <div style={{ fontSize: 14, fontWeight: 700, textTransform: 'uppercase', color: colors.purpleVibrant, letterSpacing: '0.08em' }}>Ion Poliatomik</div>
          <div style={{ fontSize: 19, fontWeight: 700, color: colors.purpleDark, marginTop: 4 }}>
            Jumlah seluruh biloks atom sama dengan muatan ion tersebut.
          </div>
        </div>
      </div>

      {/* Two Worked Examples */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, width: '100%' }}>
        {/* Example 1: H2O */}
        <div style={{ background: '#ffffff', borderRadius: 20, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '24px 28px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: colors.purpleDark }}>Contoh 1: H₂O</span>
            <span style={{ fontFamily: fontMono, fontSize: 14, background: colors.purplePale, color: colors.purplePrimary, padding: '4px 10px', borderRadius: 8, fontWeight: 700 }}>Senyawa Netral</span>
          </div>
          <div style={{ fontSize: 16, color: colors.textBody, marginBottom: 10 }}>
            Diketahui biloks H = +1 dan biloks O = −2.
          </div>
          <div style={{ background: colors.purplePale, borderRadius: 12, padding: '12px 18px', fontFamily: fontMono, fontSize: 22, fontWeight: 700, color: colors.purpleDark, textAlign: 'center', marginBottom: 12 }}>
            2(+1) + (−2) = 0
          </div>
          <div style={{ fontSize: 15, color: colors.textDark, lineHeight: 1.5, background: 'rgba(124, 58, 237, 0.05)', padding: '10px 14px', borderRadius: 10 }}>
            Jadi, jumlah biloks dalam H₂O adalah <strong>0</strong> karena air merupakan senyawa netral.
          </div>
        </div>

        {/* Example 2: SO4 2- */}
        <div style={{ background: '#ffffff', borderRadius: 20, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '24px 28px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
            <span style={{ fontSize: 18, fontWeight: 700, color: colors.purpleDark }}>Contoh 2: SO₄²⁻</span>
            <span style={{ fontFamily: fontMono, fontSize: 14, background: colors.purplePale, color: colors.purpleVibrant, padding: '4px 10px', borderRadius: 8, fontWeight: 700 }}>Ion Poliatomik</span>
          </div>
          <div style={{ fontSize: 16, color: colors.textBody, marginBottom: 10 }}>
            Misalkan biloks S = x, sedangkan biloks O = −2.
          </div>
          <div style={{ background: colors.purplePale, borderRadius: 12, padding: '12px 18px', fontFamily: fontMono, fontSize: 20, fontWeight: 700, color: colors.purpleDark, textAlign: 'center', marginBottom: 12 }}>
            x + 4(−2) = −2 &nbsp;→&nbsp; x − 8 = −2 &nbsp;→&nbsp; <span style={{ color: colors.purplePrimary }}>x = +6</span>
          </div>
          <div style={{ fontSize: 15, color: colors.textDark, lineHeight: 1.5, background: 'rgba(124, 58, 237, 0.05)', padding: '10px 14px', borderRadius: 10 }}>
            Jadi, biloks sulfur dalam ion SO₄²⁻ adalah <strong>+6</strong>.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 6: Cara Menentukan Bilangan Oksidasi
// =========================================================================
const Slide6CaraMenentukan: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="orbitals" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Metode Perhitungan" title="Cara Menentukan Bilangan Oksidasi" />

      <p style={{ fontSize: 19, color: colors.textDark, textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>
        Biloks yang belum diketahui dapat ditentukan menggunakan persamaan matematika sederhana.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, width: '100%', alignItems: 'stretch' }}>
        {/* Left: 5 Steps */}
        <div style={{ background: '#ffffff', borderRadius: 20, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '24px 28px', boxShadow: colors.cardShadow, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
            <IconCalculator size={22} color={colors.purplePrimary} />
            <h3 style={{ margin: 0, fontSize: 21, color: colors.purpleDark, fontWeight: 700 }}>
              Langkah-langkah Penentuan:
            </h3>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePale, color: colors.purplePrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>1</span>
              <span style={{ fontSize: 16, color: colors.textDark }}>Tentukan biloks unsur yang sudah diketahui.</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePale, color: colors.purplePrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>2</span>
              <span style={{ fontSize: 16, color: colors.textDark }}>Misalkan biloks unsur yang dicari sebagai <strong>x</strong>.</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePale, color: colors.purplePrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>3</span>
              <span style={{ fontSize: 16, color: colors.textDark }}>Kalikan setiap biloks dengan jumlah atom unsur tersebut.</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePale, color: colors.purplePrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>4</span>
              <span style={{ fontSize: 16, color: colors.textDark }}>Jumlahkan seluruh biloks dan samakan dengan muatan total senyawa atau ion.</span>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePale, color: colors.purplePrimary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 800, flexShrink: 0 }}>5</span>
              <span style={{ fontSize: 16, color: colors.textDark }}>Selesaikan persamaan untuk mendapatkan nilai <strong>x</strong>.</span>
            </div>
          </div>
        </div>

        {/* Right: Step-by-step example H2SO4 */}
        <div style={{ background: '#ffffff', borderRadius: 20, border: `2px solid ${colors.purplePrimary}`, padding: '24px 28px', boxShadow: '0 14px 34px -8px rgba(124, 58, 237, 0.16)' }}>
          <div style={{ marginBottom: 10 }}>
            <span style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.purplePrimary }}>Studi Kasus Perhitungan</span>
            <h3 style={{ margin: '4px 0 0 0', fontSize: 21, color: colors.purpleDark, fontWeight: 700 }}>
              Tentukan biloks sulfur dalam H₂SO₄!
            </h3>
          </div>

          <div style={{ background: colors.purplePale, borderRadius: 12, padding: '10px 16px', fontSize: 15, color: colors.textDark, marginBottom: 12 }}>
            <strong>Diketahui:</strong> H = +1, O = −2, S = x.<br />
            Karena H₂SO₄ merupakan senyawa netral:
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 5, fontFamily: fontMono, fontSize: 17, fontWeight: 700, color: colors.purpleDark, background: '#faf5ff', padding: '12px 18px', borderRadius: 12, border: `1px dashed ${colors.purpleSoftBorder}`, marginBottom: 12 }}>
            <div>2(+1) + x + 4(−2) = 0</div>
            <div>2 + x − 8 = 0</div>
            <div>x − 6 = 0</div>
            <div style={{ color: colors.purplePrimary, fontSize: 21 }}>x = +6</div>
          </div>

          <div style={{ background: 'rgba(124, 58, 237, 0.08)', borderRadius: 10, padding: '10px 14px', fontSize: 15, fontWeight: 600, color: colors.purpleDark, textAlign: 'center' }}>
            Jadi, biloks sulfur dalam H₂SO₄ adalah <span style={{ color: colors.purplePrimary, fontWeight: 800 }}>+6</span>.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 7: Pengertian Tata Nama Senyawa
// =========================================================================
const Slide7TataNamaDef: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="constellation" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Klasifikasi Kimia" title="Pengertian Tata Nama Senyawa" />

      <div style={{ maxWidth: 1200, textAlign: 'center', marginBottom: 22 }}>
        <p style={{ fontSize: 21, lineHeight: 1.5, color: colors.textDark, margin: '0 0 8px 0', fontWeight: 600 }}>
          Tata nama senyawa adalah sistem aturan untuk memberikan nama pada senyawa kimia berdasarkan komposisi atau karakteristik kimianya.
        </p>
        <span style={{ fontSize: 16, color: colors.textMuted }}>
          Aturan ini penting karena satu rumus kimia perlu memiliki nama yang dapat dikenali secara konsisten.
        </span>
      </div>

      {/* 4 Classification Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 18, width: '100%', marginBottom: 20 }}>
        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '22px 18px', boxShadow: colors.cardShadow }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <IconAtom size={22} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: colors.purplePrimary, letterSpacing: '0.08em' }}>Kelompok 1</div>
          <h4 style={{ margin: '4px 0 8px 0', fontSize: 19, color: colors.purpleDark, fontWeight: 700 }}>Senyawa Ion</h4>
          <p style={{ fontSize: 14, color: colors.textBody, lineHeight: 1.5, margin: '0 0 10px 0' }}>
            Biasanya tersusun dari kation dan anion.
          </p>
          <div style={{ fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.purplePrimary, background: colors.purplePale, padding: '4px 10px', borderRadius: 8, display: 'inline-block' }}>
            Contoh: NaCl
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '22px 18px', boxShadow: colors.cardShadow }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <IconLayers size={22} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: colors.purplePrimary, letterSpacing: '0.08em' }}>Kelompok 2</div>
          <h4 style={{ margin: '4px 0 8px 0', fontSize: 19, color: colors.purpleDark, fontWeight: 700 }}>Senyawa Kovalen</h4>
          <p style={{ fontSize: 14, color: colors.textBody, lineHeight: 1.5, margin: '0 0 10px 0' }}>
            Terbentuk dari unsur nonlogam berbagi elektron.
          </p>
          <div style={{ fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.purplePrimary, background: colors.purplePale, padding: '4px 10px', borderRadius: 8, display: 'inline-block' }}>
            Contoh: CO₂
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '22px 18px', boxShadow: colors.cardShadow }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <IconFlask size={22} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: colors.purplePrimary, letterSpacing: '0.08em' }}>Kelompok 3</div>
          <h4 style={{ margin: '4px 0 8px 0', fontSize: 19, color: colors.purpleDark, fontWeight: 700 }}>Asam</h4>
          <p style={{ fontSize: 14, color: colors.textBody, lineHeight: 1.5, margin: '0 0 10px 0' }}>
            Zat yang melepaskan H⁺ dalam air.
          </p>
          <div style={{ fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.purplePrimary, background: colors.purplePale, padding: '4px 10px', borderRadius: 8, display: 'inline-block' }}>
            Contoh: HCl(aq), H₂SO₄
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '22px 18px', boxShadow: colors.cardShadow }}>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 10 }}>
            <IconScale size={22} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', color: colors.purplePrimary, letterSpacing: '0.08em' }}>Kelompok 4</div>
          <h4 style={{ margin: '4px 0 8px 0', fontSize: 19, color: colors.purpleDark, fontWeight: 700 }}>Basa</h4>
          <p style={{ fontSize: 14, color: colors.textBody, lineHeight: 1.5, margin: '0 0 10px 0' }}>
            Zat yang menghasilkan ion OH⁻.
          </p>
          <div style={{ fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.purplePrimary, background: colors.purplePale, padding: '4px 10px', borderRadius: 8, display: 'inline-block' }}>
            Contoh: NaOH, Ca(OH)₂
          </div>
        </div>
      </div>

      <div style={{ background: colors.purplePale, border: `1px solid ${colors.purpleSoftBorder}`, borderRadius: 14, padding: '12px 24px', textAlign: 'center', fontSize: 16, color: colors.purpleDark, fontWeight: 600 }}>
        Setiap kelompok memiliki aturan penamaan yang perlu dipahami agar tidak salah menyebutkan nama senyawa.
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 8: Aturan Penamaan Senyawa Ion
// =========================================================================
const Slide8SenyawaIon: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="lattice" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Senyawa Ionik" title="Aturan Penamaan Senyawa Ion" />

      <p style={{ fontSize: 18, color: colors.textDark, textAlign: 'center', marginBottom: 14 }}>
        Senyawa ion umumnya terbentuk dari <strong>kation</strong> (ion positif) dan <strong>anion</strong> (ion negatif).
      </p>

      {/* Main Golden Rule Box */}
      <div
        style={{
          background: 'linear-gradient(135deg, #7c3aed, #581c87)',
          borderRadius: 16,
          padding: '14px 34px',
          color: '#ffffff',
          textAlign: 'center',
          fontSize: 21,
          fontWeight: 700,
          letterSpacing: '0.02em',
          marginBottom: 20,
          boxShadow: '0 10px 24px -4px rgba(124, 58, 237, 0.3)',
        }}
      >
        Nama kation disebutkan terlebih dahulu, kemudian nama anion.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 0.9fr', gap: 26, width: '100%', alignItems: 'stretch' }}>
        {/* Table of Examples */}
        <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '18px 22px', boxShadow: colors.cardShadow }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.purpleDark, marginBottom: 10 }}>
            Contoh Senyawa Ionik
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${colors.purpleSoftBorder}` }}>
                <th style={{ padding: '7px 10px', fontSize: 15, color: colors.purplePrimary, fontWeight: 700 }}>Rumus Kimia</th>
                <th style={{ padding: '7px 10px', fontSize: 15, color: colors.purplePrimary, fontWeight: 700 }}>Nama Senyawa</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>NaCl</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Natrium klorida</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>KBr</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Kalium bromida</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>MgO</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Magnesium oksida</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>CaS</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Kalsium sulfida</td>
              </tr>
              <tr>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>Al₂O₃</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Aluminium oksida</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Suffix Rule & Ratio Note */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
          <div style={{ background: colors.purplePale, borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px' }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: colors.purpleDark, marginBottom: 6 }}>
              Akhiran -ida pada Anion Biner
            </div>
            <div style={{ fontSize: 14, color: colors.textBody, lineHeight: 1.5 }}>
              Pada senyawa biner ionik, nama unsur nonlogam diubah menjadi nama anion dengan akhiran <strong>-ida</strong>:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 5, marginTop: 8, fontSize: 14, color: colors.purpleDark, fontWeight: 600 }}>
              <div>• Klorin → klorida</div>
              <div>• Bromin → bromida</div>
              <div>• Oksigen → oksida</div>
              <div>• Sulfur → sulfida</div>
            </div>
          </div>

          <div style={{ background: '#ffffff', borderRadius: 16, borderLeft: `5px solid ${colors.purplePrimary}`, border: `1px solid ${colors.purpleSoftBorder}`, padding: '14px 18px', fontSize: 14, lineHeight: 1.5, color: colors.textDark }}>
            <strong>Catatan Penting:</strong> Rumus kimia tidak selalu menunjukkan perbandingan atom 1:1. Contohnya, <strong>Al₂O₃</strong> memiliki dua atom aluminium untuk setiap tiga atom oksigen dalam satu satuan rumus.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 9: Logam dengan Biloks Berbeda
// =========================================================================
const Slide9LogamBiloks: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="orbitals" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Logam Transisi" title="Penamaan Logam dengan Biloks Berbeda" />

      <p style={{ fontSize: 18, color: colors.textDark, textAlign: 'center', marginBottom: 10 }}>
        Beberapa logam dapat memiliki lebih dari satu bilangan oksidasi. Contohnya: <strong>besi (Fe)</strong>, <strong>tembaga (Cu)</strong>, dan <strong>timah (Sn)</strong>.
      </p>

      <div style={{ background: colors.purplePale, borderRadius: 14, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '10px 22px', textAlign: 'center', fontSize: 17, fontWeight: 700, color: colors.purpleDark, marginBottom: 18 }}>
        Untuk membedakan senyawa tersebut, biloks logam ditulis menggunakan <span style={{ color: colors.purplePrimary }}>angka Romawi di dalam tanda kurung</span>.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '0.95fr 1.05fr', gap: 26, width: '100%', alignItems: 'stretch' }}>
        {/* Table of Examples */}
        <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '18px 22px', boxShadow: colors.cardShadow }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: `2px solid ${colors.purpleSoftBorder}` }}>
                <th style={{ padding: '7px 10px', fontSize: 15, color: colors.purplePrimary, fontWeight: 700 }}>Rumus Kimia</th>
                <th style={{ padding: '7px 10px', fontSize: 15, color: colors.purplePrimary, fontWeight: 700 }}>Nama Senyawa</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>FeCl₂</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Besi(II) klorida</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>FeCl₃</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Besi(III) klorida</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>Cu₂O</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Tembaga(I) oksida</td>
              </tr>
              <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>CuO</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Tembaga(II) oksida</td>
              </tr>
              <tr>
                <td style={{ padding: '7px 10px', fontFamily: fontMono, fontSize: 16, fontWeight: 700, color: colors.purpleDark }}>SnCl₄</td>
                <td style={{ padding: '7px 10px', fontSize: 15, color: colors.textDark }}>Timah(IV) klorida</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Walkthrough determining biloks in FeCl3 */}
        <div style={{ background: '#ffffff', borderRadius: 18, border: `2px solid ${colors.purplePrimary}`, padding: '20px 26px', boxShadow: '0 12px 30px -6px rgba(124, 58, 237, 0.14)' }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: colors.purpleDark, marginBottom: 6 }}>
            Bagaimana cara menentukan biloks besi dalam FeCl₃?
          </div>
          <div style={{ fontSize: 14, color: colors.textBody, lineHeight: 1.5, marginBottom: 8 }}>
            Setiap Cl memiliki biloks −1. Karena terdapat tiga atom Cl, jumlah biloks klorin adalah −3. Misalkan biloks Fe = x:
          </div>
          <div style={{ background: colors.purplePale, borderRadius: 10, padding: '8px 16px', fontFamily: fontMono, fontSize: 17, fontWeight: 700, color: colors.purpleDark, marginBottom: 10, textAlign: 'center' }}>
            x + 3(−1) = 0 &nbsp;→&nbsp; <span style={{ color: colors.purplePrimary }}>x = +3</span>
          </div>
          <div style={{ fontSize: 15, color: colors.textDark, marginBottom: 10 }}>
            Jadi, nama <strong>FeCl₃</strong> adalah <strong>besi(III) klorida</strong>.
          </div>
          <div style={{ background: 'rgba(124, 58, 237, 0.07)', borderRadius: 10, padding: '8px 14px', fontSize: 13, color: colors.purpleDark, fontWeight: 600 }}>
            ⚠️ <strong>Perhatikan:</strong> Angka Romawi menunjukkan <em>biloks logam</em>, bukan jumlah atom logam dalam rumus.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 10: Penamaan Senyawa Kovalen
// =========================================================================
const Slide10SenyawaKovalen: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="constellation" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Ikatan Kovalen" title="Penamaan Senyawa Kovalen" />

      <p style={{ fontSize: 18, color: colors.textDark, textAlign: 'center', marginBottom: 14 }}>
        Senyawa kovalen umumnya terbentuk dari dua unsur nonlogam yang berbagi elektron. Digunakan awalan untuk menunjukkan jumlah atom:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 24, width: '100%', alignItems: 'stretch' }}>
        {/* Prefixes Table 1 to 10 */}
        <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 22px', boxShadow: colors.cardShadow }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.purpleDark, marginBottom: 8 }}>
            Awalan Jumlah Atom (Yunani)
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 14px', fontSize: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: colors.purplePale, borderRadius: 6 }}>
              <span>1 = <strong>Mono-</strong></span>
              <span>6 = <strong>Heksa-</strong></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: '#f8fafc', borderRadius: 6 }}>
              <span>2 = <strong>Di-</strong></span>
              <span>7 = <strong>Hepta-</strong></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: colors.purplePale, borderRadius: 6 }}>
              <span>3 = <strong>Tri-</strong></span>
              <span>8 = <strong>Okta-</strong></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: '#f8fafc', borderRadius: 6 }}>
              <span>4 = <strong>Tetra-</strong></span>
              <span>9 = <strong>Nona-</strong></span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '4px 8px', background: colors.purplePale, borderRadius: 6 }}>
              <span>5 = <strong>Penta-</strong></span>
              <span>10 = <strong>Deka-</strong></span>
            </div>
          </div>
        </div>

        {/* Examples of Covalent Compounds */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: colors.purpleDark, marginBottom: 8 }}>
              Contoh Penamaan Senyawa
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px 10px', fontSize: 14 }}>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>CO</span> = karbon monoksida</div>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>CO₂</span> = karbon dioksida</div>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>N₂O</span> = dinitrogen monoksida</div>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>N₂O₃</span> = dinitrogen trioksida</div>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>N₂O₅</span> = dinitrogen pentaoksida</div>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>PCl₃</span> = fosfor triklorida</div>
            </div>
          </div>

          <div style={{ background: colors.purplePale, borderRadius: 14, borderLeft: `5px solid ${colors.purplePrimary}`, padding: '12px 16px', fontSize: 14, lineHeight: 1.5, color: colors.textDark }}>
            <strong>Catatan Awalan Mono:</strong> Awalan <em>mono-</em> pada unsur pertama biasanya tidak digunakan. Oleh karena itu, <strong>CO</strong> disebut <em>karbon monoksida</em>, bukan monokarbon monoksida.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 11: Penamaan Asam dan Basa
// =========================================================================
const Slide11AsamBasa: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="electron-sea" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Pola Penamaan" title="Penamaan Asam dan Basa" />

      <p style={{ fontSize: 18, color: colors.textDark, textAlign: 'center', marginBottom: 18 }}>
        Asam dan basa memiliki pola penamaan yang perlu dikenali.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, width: '100%', alignItems: 'stretch' }}>
        {/* Asam Section */}
        <div style={{ background: '#ffffff', borderRadius: 20, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '22px 26px', boxShadow: colors.cardShadow, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <IconFlask size={22} color={colors.purplePrimary} />
              <h3 style={{ margin: 0, fontSize: 21, color: colors.purpleDark, fontWeight: 700 }}>1. Asam</h3>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', marginBottom: 12 }}>
              <thead>
                <tr style={{ borderBottom: `2px solid ${colors.purpleSoftBorder}` }}>
                  <th style={{ padding: '6px 10px', fontSize: 15, color: colors.purplePrimary, fontWeight: 700 }}>Rumus Kimia</th>
                  <th style={{ padding: '6px 10px', fontSize: 15, color: colors.purplePrimary, fontWeight: 700 }}>Nama Senyawa</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '5px 10px', fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.purpleDark }}>HCl(aq)</td>
                  <td style={{ padding: '5px 10px', fontSize: 15, color: colors.textDark }}>Asam klorida</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '5px 10px', fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.purpleDark }}>H₂SO₄</td>
                  <td style={{ padding: '5px 10px', fontSize: 15, color: colors.textDark }}>Asam sulfat</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '5px 10px', fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.purpleDark }}>HNO₃</td>
                  <td style={{ padding: '5px 10px', fontSize: 15, color: colors.textDark }}>Asam nitrat</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={{ padding: '5px 10px', fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.purpleDark }}>H₃PO₄</td>
                  <td style={{ padding: '5px 10px', fontSize: 15, color: colors.textDark }}>Asam fosfat</td>
                </tr>
                <tr>
                  <td style={{ padding: '5px 10px', fontFamily: fontMono, fontSize: 15, fontWeight: 700, color: colors.purpleDark }}>H₂CO₃</td>
                  <td style={{ padding: '5px 10px', fontSize: 15, color: colors.textDark }}>Asam karbonat</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div style={{ background: colors.purplePale, padding: '10px 14px', borderRadius: 10, fontSize: 14, color: colors.textDark, lineHeight: 1.45 }}>
            Untuk HCl, nama <strong>asam klorida</strong> digunakan ketika HCl berada dalam larutan air. HCl dalam bentuk gas dinamakan <strong>hidrogen klorida</strong>.
          </div>
        </div>

        {/* Basa Section */}
        <div style={{ background: '#ffffff', borderRadius: 20, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '22px 26px', boxShadow: colors.cardShadow, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 10 }}>
              <IconScale size={22} color={colors.purpleVibrant} />
              <h3 style={{ margin: 0, fontSize: 21, color: colors.purpleDark, fontWeight: 700 }}>2. Basa</h3>
            </div>

            <p style={{ fontSize: 15, lineHeight: 1.5, color: colors.textBody, margin: '0 0 14px 0' }}>
              Basa yang mengandung ion hidroksida (OH⁻) umumnya dinamai dengan menyebutkan <strong>nama kation</strong>, lalu kata <strong>hidroksida</strong>.
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 8 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 14px', background: colors.purplePale, borderRadius: 10 }}>
                <span style={{ fontFamily: fontMono, fontWeight: 700, color: colors.purpleDark }}>NaOH</span>
                <span style={{ fontWeight: 600, color: colors.textDark }}>natrium hidroksida</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 14px', background: '#faf5ff', borderRadius: 10 }}>
                <span style={{ fontFamily: fontMono, fontWeight: 700, color: colors.purpleDark }}>KOH</span>
                <span style={{ fontWeight: 600, color: colors.textDark }}>kalium hidroksida</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 14px', background: colors.purplePale, borderRadius: 10 }}>
                <span style={{ fontFamily: fontMono, fontWeight: 700, color: colors.purpleDark }}>Ca(OH)₂</span>
                <span style={{ fontWeight: 600, color: colors.textDark }}>kalsium hidroksida</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', padding: '9px 14px', background: '#faf5ff', borderRadius: 10 }}>
                <span style={{ fontFamily: fontMono, fontWeight: 700, color: colors.purpleDark }}>Al(OH)₃</span>
                <span style={{ fontWeight: 600, color: colors.textDark }}>aluminium hidroksida</span>
              </div>
            </div>
          </div>

          <div style={{ background: 'rgba(124, 58, 237, 0.06)', padding: '10px 14px', borderRadius: 10, fontSize: 14, color: colors.textDark, lineHeight: 1.45, marginTop: 12 }}>
            Jumlah ion hidroksida dapat berbeda, tetapi nama dasarnya tetap mengikuti aturan tersebut.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 12: Penamaan Senyawa dengan Ion Poliatomik
// =========================================================================
const Slide12IonPoliatomik: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="lattice" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Ion Kompleks" title="Penamaan dengan Ion Poliatomik" />

      <p style={{ fontSize: 18, color: colors.textDark, textAlign: 'center', marginBottom: 14 }}>
        Ion poliatomik adalah ion yang tersusun dari dua atau lebih atom yang berikatan dan memiliki muatan total.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, width: '100%', alignItems: 'stretch' }}>
        {/* Table of Polyatomic Ions */}
        <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 22px', boxShadow: colors.cardShadow }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: colors.purpleDark, marginBottom: 8 }}>
            Tabel Ion Poliatomik Penting
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5px 12px', fontSize: 14 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 9px', background: colors.purplePale, borderRadius: 6 }}>
              <span style={{ fontFamily: fontMono, fontWeight: 700 }}>OH⁻</span>
              <span>Hidroksida</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 9px', background: '#faf5ff', borderRadius: 6 }}>
              <span style={{ fontFamily: fontMono, fontWeight: 700 }}>SO₃²⁻</span>
              <span>Sulfit</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 9px', background: colors.purplePale, borderRadius: 6 }}>
              <span style={{ fontFamily: fontMono, fontWeight: 700 }}>NO₃⁻</span>
              <span>Nitrat</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 9px', background: '#faf5ff', borderRadius: 6 }}>
              <span style={{ fontFamily: fontMono, fontWeight: 700 }}>CO₃²⁻</span>
              <span>Karbonat</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 9px', background: colors.purplePale, borderRadius: 6 }}>
              <span style={{ fontFamily: fontMono, fontWeight: 700 }}>NO₂⁻</span>
              <span>Nitrit</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 9px', background: '#faf5ff', borderRadius: 6 }}>
              <span style={{ fontFamily: fontMono, fontWeight: 700 }}>PO₄³⁻</span>
              <span>Fosfat</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 9px', background: colors.purplePale, borderRadius: 6 }}>
              <span style={{ fontFamily: fontMono, fontWeight: 700 }}>SO₄²⁻</span>
              <span>Sulfat</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '5px 9px', background: '#faf5ff', borderRadius: 6 }}>
              <span style={{ fontFamily: fontMono, fontWeight: 700 }}>NH₄⁺</span>
              <span>Amonium</span>
            </div>
          </div>
        </div>

        {/* Examples and distinction */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: colors.purpleDark, marginBottom: 6 }}>
              Aturan & Contoh Penamaan Senyawa
            </div>
            <div style={{ fontSize: 14, color: colors.textMuted, marginBottom: 6 }}>
              Kation disebutkan terlebih dahulu, kemudian nama ion poliatomiknya:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 5, fontSize: 14 }}>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>NaNO₃</span> = natrium nitrat</div>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>CaCO₃</span> = kalsium karbonat</div>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>K₂SO₄</span> = kalium sulfat</div>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>NH₄Cl</span> = amonium klorida</div>
              <div>• <span style={{ fontFamily: fontMono, fontWeight: 700 }}>Mg(OH)₂</span> = magnesium hidroksida</div>
            </div>
          </div>

          <div style={{ background: colors.purplePale, borderRadius: 14, borderLeft: `5px solid ${colors.purplePrimary}`, padding: '10px 16px', fontSize: 13.5, lineHeight: 1.5, color: colors.textDark }}>
            <strong>Perhatikan Perbedaan Oksigen:</strong> Perbedaan nitrat (NO₃⁻) dan nitrit (NO₂⁻), serta sulfat (SO₄²⁻) dan sulfit (SO₃²⁻). Perbedaan jumlah oksigen menghasilkan nama ion yang berbeda.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 13: Langkah Menentukan Nama Senyawa dari Rumus Kimia
// =========================================================================
const Slide13LangkahMenentukan: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="orbitals" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Prosedur Sistematis" title="Langkah Menentukan Nama Senyawa" />

      <p style={{ fontSize: 18, color: colors.textDark, textAlign: 'center', marginBottom: 18 }}>
        Agar lebih mudah, gunakan langkah berikut ketika menghadapi rumus kimia yang belum dikenal:
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1.05fr 0.95fr', gap: 26, width: '100%', alignItems: 'stretch' }}>
        {/* 5 Steps Left */}
        <div style={{ background: '#ffffff', borderRadius: 20, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '20px 24px', boxShadow: colors.cardShadow, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 9 }}>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePrimary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>1</span>
              <div style={{ fontSize: 14.5, color: colors.textDark }}>
                <strong>Identifikasi unsur penyusunnya.</strong> Periksa apakah unsur tersebut merupakan logam, nonlogam, atau membentuk ion poliatomik.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePrimary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>2</span>
              <div style={{ fontSize: 14.5, color: colors.textDark }}>
                <strong>Tentukan jenis senyawanya.</strong> Apakah termasuk senyawa ion, kovalen, asam, atau basa?
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePrimary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>3</span>
              <div style={{ fontSize: 14.5, color: colors.textDark }}>
                <strong>Tentukan biloks jika diperlukan.</strong> Langkah ini terutama penting untuk logam yang memiliki lebih dari satu biloks.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePrimary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>4</span>
              <div style={{ fontSize: 14.5, color: colors.textDark }}>
                <strong>Terapkan aturan penamaan.</strong> Gunakan nama ion, angka Romawi, atau awalan jumlah atom sesuai jenis senyawanya.
              </div>
            </div>
            <div style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}>
              <span style={{ width: 25, height: 25, borderRadius: '50%', background: colors.purplePrimary, color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 13, fontWeight: 700, flexShrink: 0 }}>5</span>
              <div style={{ fontSize: 14.5, color: colors.textDark }}>
                <strong>Periksa kembali nama yang dihasilkan.</strong> Pastikan urutan nama dan penulisannya benar.
              </div>
            </div>
          </div>
        </div>

        {/* Applied Example Right Fe2O3 */}
        <div style={{ background: '#ffffff', borderRadius: 20, border: `2px solid ${colors.purplePrimary}`, padding: '20px 26px', boxShadow: '0 12px 30px -6px rgba(124, 58, 237, 0.16)', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: colors.purplePrimary }}>Penerapan Nyata</div>
            <h3 style={{ margin: '4px 0 10px 0', fontSize: 21, color: colors.purpleDark, fontWeight: 700 }}>
              Contoh Penerapan pada Fe₂O₃:
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 7, fontSize: 14.5, color: colors.textDark }}>
              <div>• Fe merupakan logam dan O merupakan nonlogam.</div>
              <div>• Senyawa ini termasuk <strong>senyawa ionik</strong>.</div>
              <div>• Biloks O = −2, sehingga tiga atom O memiliki jumlah biloks <strong>−6</strong>.</div>
              <div>• Dua atom Fe harus memiliki jumlah biloks <strong>+6</strong> agar senyawa netral.</div>
              <div>• Biloks setiap Fe = <strong>+3</strong>.</div>
            </div>
          </div>

          <div style={{ background: colors.purplePale, borderRadius: 12, padding: '12px 18px', textAlign: 'center', marginTop: 12 }}>
            <div style={{ fontSize: 13.5, color: colors.textMuted }}>Hasil Akhir Penamaan:</div>
            <div style={{ fontSize: 21, fontWeight: 800, color: colors.purplePrimary, marginTop: 4 }}>
              Jadi, nama Fe₂O₃ adalah besi(III) oksida.
            </div>
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 14: Contoh Soal dan Pembahasan
// =========================================================================
const Slide14ContohSoal: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="constellation" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Latihan Terpandu" title="Contoh Soal dan Pembahasan" />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, width: '100%' }}>
        {/* Soal 1 */}
        <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '18px 22px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ background: colors.purplePale, color: colors.purplePrimary, padding: '3px 9px', borderRadius: 8, fontSize: 12.5, fontWeight: 800 }}>SOAL 1</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Tentukan nama senyawa Na₂O!</strong>
          </div>
          <div style={{ fontSize: 14.5, color: colors.textBody, lineHeight: 1.5, marginBottom: 8 }}>
            <strong>Pembahasan:</strong> Na adalah natrium, sedangkan O adalah oksigen yang membentuk anion oksida.
          </div>
          <div style={{ background: colors.purplePale, borderRadius: 10, padding: '7px 12px', fontSize: 15, color: colors.purpleDark }}>
            Nama senyawanya adalah <strong>natrium oksida</strong>.
          </div>
        </div>

        {/* Soal 2 */}
        <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '18px 22px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ background: colors.purplePale, color: colors.purplePrimary, padding: '3px 9px', borderRadius: 8, fontSize: 12.5, fontWeight: 800 }}>SOAL 2</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Tentukan nama senyawa SO₃!</strong>
          </div>
          <div style={{ fontSize: 14.5, color: colors.textBody, lineHeight: 1.5, marginBottom: 8 }}>
            <strong>Pembahasan:</strong> S dan O merupakan unsur nonlogam, sehingga digunakan aturan penamaan kovalen. Terdapat satu atom sulfur dan tiga atom oksigen.
          </div>
          <div style={{ background: colors.purplePale, borderRadius: 10, padding: '7px 12px', fontSize: 15, color: colors.purpleDark }}>
            Nama senyawanya adalah <strong>sulfur trioksida</strong>.
          </div>
        </div>

        {/* Soal 3 */}
        <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '18px 22px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ background: colors.purplePale, color: colors.purplePrimary, padding: '3px 9px', borderRadius: 8, fontSize: 12.5, fontWeight: 800 }}>SOAL 3</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Tentukan nama senyawa CuCl₂!</strong>
          </div>
          <div style={{ fontSize: 14.5, color: colors.textBody, lineHeight: 1.5, marginBottom: 8 }}>
            <strong>Pembahasan:</strong> Setiap atom Cl memiliki biloks −1 (total 2 atom Cl = −2). Agar netral, biloks Cu harus +2.
          </div>
          <div style={{ background: colors.purplePale, borderRadius: 10, padding: '7px 12px', fontSize: 15, color: colors.purpleDark }}>
            Nama senyawanya adalah <strong>tembaga(II) klorida</strong>.
          </div>
        </div>

        {/* Soal 4 */}
        <div style={{ background: '#ffffff', borderRadius: 18, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '18px 22px', boxShadow: colors.cardShadow }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6 }}>
            <span style={{ background: colors.purplePale, color: colors.purplePrimary, padding: '3px 9px', borderRadius: 8, fontSize: 12.5, fontWeight: 800 }}>SOAL 4</span>
            <strong style={{ fontSize: 16, color: colors.purpleDark }}>Tentukan nama senyawa Ca(NO₃)₂!</strong>
          </div>
          <div style={{ fontSize: 14.5, color: colors.textBody, lineHeight: 1.5, marginBottom: 8 }}>
            <strong>Pembahasan:</strong> Ca adalah kalsium, sedangkan NO₃⁻ adalah ion nitrat.
          </div>
          <div style={{ background: colors.purplePale, borderRadius: 10, padding: '7px 12px', fontSize: 15, color: colors.purpleDark }}>
            Nama senyawanya adalah <strong>kalsium nitrat</strong>.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SLIDE 15: Kesimpulan
// =========================================================================
const Slide15Kesimpulan: Page = () => (
  <div style={canvasStyle}>
    <SubtleBackground motif="electron-sea" />

    <div style={centeredContainerStyle}>
      {/* Title positioned directly above content */}
      <SlideHeader tag="Rangkuman Materi" title="Kesimpulan" />

      <p style={{ fontSize: 19, color: colors.textDark, textAlign: 'center', marginBottom: 20, fontWeight: 600 }}>
        Tata nama senyawa merupakan aturan penting untuk mengidentifikasi senyawa kimia secara konsisten.
      </p>

      {/* 6 Key Takeaways Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 16, width: '100%' }}>
        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconCheck size={18} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 15, color: colors.textDark, lineHeight: 1.5 }}>
            <strong>Bilangan oksidasi</strong> membantu menentukan keadaan oksidasi suatu unsur dan membedakan beberapa jenis senyawa.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconCheck size={18} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 15, color: colors.textDark, lineHeight: 1.5 }}>
            Jumlah biloks dalam senyawa netral adalah <strong>0</strong>, sedangkan dalam ion poliatomik sama dengan <strong>muatan ionnya</strong>.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconCheck size={18} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 15, color: colors.textDark, lineHeight: 1.5 }}>
            <strong>Senyawa ion</strong> umumnya dinamai dengan menyebutkan <em>kation terlebih dahulu</em>, kemudian <em>anion</em>.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconCheck size={18} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 15, color: colors.textDark, lineHeight: 1.5 }}>
            Logam yang memiliki beberapa biloks dapat menggunakan <strong>angka Romawi</strong> di dalam tanda kurung untuk membedakan namanya.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconCheck size={18} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 15, color: colors.textDark, lineHeight: 1.5 }}>
            <strong>Senyawa kovalen biner</strong> menggunakan awalan jumlah atom seperti <em>mono-, di-, tri-, dan tetra-</em>.
          </div>
        </div>

        <div style={{ background: '#ffffff', borderRadius: 16, border: `1.5px solid ${colors.purpleSoftBorder}`, padding: '16px 20px', boxShadow: colors.cardShadow, display: 'flex', gap: 14, alignItems: 'flex-start' }}>
          <div style={{ width: 34, height: 34, borderRadius: '50%', background: colors.purplePale, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
            <IconCheck size={18} color={colors.purplePrimary} />
          </div>
          <div style={{ fontSize: 15, color: colors.textDark, lineHeight: 1.5 }}>
            <strong>Asam, basa</strong>, serta senyawa yang mengandung <strong>ion poliatomik</strong> mengikuti pola penamaan khusus.
          </div>
        </div>
      </div>
    </div>

    <SlideFooter />
  </div>
);

// =========================================================================
// SPEAKER NOTES (Index-aligned with pages)
// =========================================================================
export const notes: (string | undefined)[] = [
  'Slide 1: Pengantar tata nama senyawa kimia. Jelaskan pengertian tata nama senyawa sebagai aturan penamaan berdasarkan unsur penyusunnya, serta berikan contoh umum seperti H2O, NaCl, CO2, dan NH3.',
  'Slide 2: Uraikan lima tujuan pembelajaran yang diharapkan dikuasai mahasiswa, dengan fokus utama mampu menyebutkan nama senyawa secara tepat dari rumus kimianya.',
  'Slide 3: Jelaskan definisi bilangan oksidasi sebagai muatan formal atom. Diskusikan contoh NaCl mengenai serah-terima elektron, dan ingatkan bahwa biloks berbeda dari muatan nyata pada senyawa kovalen.',
  'Slide 4: Bahas 7 aturan dasar penentuan biloks: unsur bebas, ion monoatomik, golongan IA, IIA, fluorin, oksigen beserta perkecualiannya, dan hidrogen.',
  'Slide 5: Terangkan aturan total biloks: senyawa netral bernilai 0 dan ion poliatomik bernilai sama dengan muatan ionnya. Tunjukkan contoh perhitungan H2O dan SO4(2-).',
  'Slide 6: Berikan panduan langkah sistematis menyelesaikan persamaan matematika penentuan biloks. Ajak audiens meninjau penentuan biloks sulfur dalam H2SO4 step-by-step.',
  'Slide 7: Masuk ke materi tata nama senyawa. Paparkan empat kategori utama: senyawa ion, senyawa kovalen, asam, dan basa beserta karakteristik dan contoh masing-masing.',
  'Slide 8: Jelaskan aturan penamaan senyawa ion, kation lalu anion dengan akhiran -ida pada nonlogam. Tunjukkan tabel contoh NaCl, KBr, MgO, CaS, dan Al2O3.',
  'Slide 9: Terangkan penamaan logam dengan biloks bervariasi menggunakan angka Romawi. Bedakan besi(II) dan besi(III) klorida, serta jelaskan cara perhitungannya.',
  'Slide 10: Ulas penamaan senyawa kovalen biner dengan awalan Yunani dari mono- hingga deka-. Ingatkan aturan pengecualian awalan mono pada unsur pertama.',
  'Slide 11: Bahas penamaan asam dengan awalan asam dan basa dengan akhiran hidroksida. Berikan catatan khusus perbedaan fase aqueous dan gas pada HCl.',
  'Slide 12: Kenalkan ion-ion poliatomik penting dan aturan penamaan senyawa yang mengikatnya. Tekankan perbedaan akhiran -at dan -it pada nitrat/nitrit serta sulfat/sulfit.',
  'Slide 13: Berikan 5 langkah praktis saat membaca rumus kimia yang belum dikenal, dengan contoh studi kasus Fe2O3 hingga menghasilkan nama besi(III) oksida.',
  'Slide 14: Latihan soal interaktif membahas Na2O, SO3, CuCl2, dan Ca(NO3)2 secara mendalam.',
  'Slide 15: Rangkum 6 poin inti yang telah dipelajari sebagai penutup materi perkuliahan hari ini.',
];

// =========================================================================
// SLIDE METADATA
// =========================================================================
export const meta: SlideMeta = {
  title: 'Tata Nama Senyawa Kimia',
  createdAt: '2026-10-20T12:25:27.146Z',
};

// =========================================================================
// EXPORT DEFAULT (Array of 15 Pages)
// =========================================================================
export default [
  Slide1Cover,
  Slide2Tujuan,
  Slide3BiloksDef,
  Slide4AturanDasar,
  Slide5JumlahBiloks,
  Slide6CaraMenentukan,
  Slide7TataNamaDef,
  Slide8SenyawaIon,
  Slide9LogamBiloks,
  Slide10SenyawaKovalen,
  Slide11AsamBasa,
  Slide12IonPoliatomik,
  Slide13LangkahMenentukan,
  Slide14ContohSoal,
  Slide15Kesimpulan,
] satisfies Page[];
