import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactElement, ReactNode } from 'react';

// ---------------------------------------------------------------------------
// Web fonts injection: Space Grotesk (display) + Inter (body) + JetBrains Mono
// ---------------------------------------------------------------------------
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@500;600;700&family=Space+Grotesk:wght@500;600;700&display=swap';
const FONT_LINK_ID = 'osd-webfont-fisika-kuantum';

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
// Keyframes injected once per slide (scoped names with qk- prefix)
// ---------------------------------------------------------------------------
const STYLE_ID = 'osd-keyframes-fisika-kuantum';
const KEYFRAMES = `
@keyframes qk-float { 0%,100% { transform: translateY(0px); } 50% { transform: translateY(-18px); } }
@keyframes qk-pulse { 0%,100% { opacity: 0.35; } 50% { opacity: 1; } }
@keyframes qk-orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
@keyframes qk-rise { from { opacity: 0; transform: translateY(28px); } to { opacity: 1; transform: translateY(0); } }
@keyframes qk-glow { 0%,100% { text-shadow: 0 0 18px rgba(34,211,238,.35); } 50% { text-shadow: 0 0 42px rgba(34,211,238,.75); } }
`;
if (typeof document !== 'undefined' && !document.getElementById(STYLE_ID)) {
  const el = document.createElement('style');
  el.id = STYLE_ID;
  el.textContent = KEYFRAMES;
  document.head.appendChild(el);
}

export const design: DesignSystem = {
  palette: {
    bg: '#0b1020', // Deep space navy
    text: '#e8edf7', // Soft white
    accent: '#22d3ee', // Quantum cyan
  },
  fonts: {
    display: '"Space Grotesk", system-ui, sans-serif',
    body: '"Inter", system-ui, -apple-system, sans-serif',
  },
  typeScale: {
    hero: 150,
    body: 34,
  },
  radius: 18,
};

// Extra colors outside the DesignSystem shape stay as plain consts.
const violet = '#a78bfa';
const pink = '#f472b6';
const muted = '#93a3bd';
const surface = 'rgba(255,255,255,0.05)';
const surfaceBorder = 'rgba(148,163,184,0.22)';

const fontDisplay = '"Space Grotesk", system-ui, sans-serif';
const fontMono = '"JetBrains Mono", ui-monospace, monospace';

const fill: CSSProperties = {
  width: '100%',
  height: '100%',
  fontFamily: 'var(--osd-font-body)',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  position: 'relative',
  overflow: 'hidden',
};

// ---------------------------------------------------------------------------
// Shared building blocks
// ---------------------------------------------------------------------------
function Eyebrow({ children }: { children: ReactNode }): ReactElement {
  return (
    <div
      style={{
        fontSize: 24,
        fontWeight: 600,
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'var(--osd-accent)',
        fontFamily: fontMono,
      }}
    >
      {children}
    </div>
  );
}

function PageTitle({ children }: { children: ReactNode }): ReactElement {
  return (
    <h2
      style={{
        fontFamily: 'var(--osd-font-display)',
        fontSize: 72,
        fontWeight: 700,
        lineHeight: 1.15,
        margin: '20px 0 0 0',
        color: 'var(--osd-text)',
      }}
    >
      {children}
    </h2>
  );
}

function Card({
  children,
  glow,
  delay,
}: {
  children: ReactNode;
  glow?: string;
  delay?: number;
}): ReactElement {
  return (
    <div
      style={{
        background: surface,
        border: `1px solid ${surfaceBorder}`,
        borderLeft: glow ? `4px solid ${glow}` : undefined,
        borderRadius: 'var(--osd-radius)',
        padding: '32px 36px',
        animation: 'qk-rise 0.7s ease both',
        animationDelay: `${delay ?? 0}ms`,
      }}
    >
      {children}
    </div>
  );
}

function Footer(): ReactElement {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 48,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        fontSize: 22,
        color: muted,
        fontFamily: fontMono,
      }}
    >
      <span>FISIKA KUANTUM</span>
      <span>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
}

// Decorative faint grid overlay
function GridBg(): ReactElement {
  return (
    <div
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage:
          'linear-gradient(rgba(148,163,184,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.07) 1px, transparent 1px)',
        backgroundSize: '80px 80px',
        pointerEvents: 'none',
      }}
    />
  );
}

// ---------------------------------------------------------------------------
// Atom graphic (animated orbits) — used on Cover & Penutup
// ---------------------------------------------------------------------------
function ElectronDot({ color }: { color: string }): ReactElement {
  return (
    <div
      style={{
        position: 'absolute',
        top: -9,
        left: 'calc(50% - 9px)',
        width: 18,
        height: 18,
        borderRadius: '50%',
        background: color,
        boxShadow: `0 0 18px ${color}`,
      }}
    />
  );
}

function AtomGraphic({ size }: { size: number }): ReactElement {
  const orbitBase: CSSProperties = {
    position: 'absolute',
    inset: 0,
    border: '2px solid rgba(34,211,238,0.4)',
    borderRadius: '50%',
  };
  return (
    <div
      style={{
        position: 'relative',
        width: size,
        height: size,
        animation: 'qk-float 6s ease-in-out infinite',
      }}
    >
      {/* Nucleus */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: 56,
          height: 56,
          marginTop: -28,
          marginLeft: -28,
          borderRadius: '50%',
          background: `radial-gradient(circle at 35% 35%, ${violet}, #6d28d9)`,
          boxShadow: '0 0 48px rgba(167,139,250,0.7)',
        }}
      />
      {/* Orbit 1 */}
      <div style={{ ...orbitBase, transform: 'rotateX(70deg)' }}>
        <div style={{ position: 'absolute', inset: 0, animation: 'qk-orbit 7s linear infinite' }}>
          <ElectronDot color="#22d3ee" />
        </div>
      </div>
      {/* Orbit 2 */}
      <div style={{ ...orbitBase, transform: 'rotate(60deg) rotateX(70deg)', borderColor: 'rgba(167,139,250,0.4)' }}>
        <div style={{ position: 'absolute', inset: 0, animation: 'qk-orbit 10s linear infinite reverse' }}>
          <ElectronDot color={violet} />
        </div>
      </div>
      {/* Orbit 3 */}
      <div style={{ ...orbitBase, transform: 'rotate(120deg) rotateX(70deg)', borderColor: 'rgba(244,114,182,0.35)' }}>
        <div style={{ position: 'absolute', inset: 0, animation: 'qk-orbit 13s linear infinite' }}>
          <ElectronDot color={pink} />
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Page 1 — Cover
// ---------------------------------------------------------------------------
const PageCover: Page = () => (
  <div style={{ ...fill, display: 'flex', alignItems: 'center', padding: '0 140px', gap: 90 }}>
    <GridBg />
    <div style={{ flex: 1.15, zIndex: 1 }}>
      <Eyebrow>Presentasi Sains Modern</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 700,
          lineHeight: 1.05,
          margin: '28px 0',
          animation: 'qk-glow 4s ease-in-out infinite',
        }}
      >
        Fisika <span style={{ color: 'var(--osd-accent)' }}>Kuantum</span>
      </h1>
      <p style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.6, color: muted, maxWidth: 900, margin: 0 }}>
        Menjelajahi dunia partikel subatomik — tempat cahaya berperilaku ganda, elektron berada di dua tempat sekaligus, dan realitas ditentukan oleh probabilitas.
      </p>
    </div>
    <div style={{ flex: 0.85, display: 'flex', justifyContent: 'center', zIndex: 1 }}>
      <AtomGraphic size={520} />
    </div>
    <Footer />
  </div>
);

// ---------------------------------------------------------------------------
// Page 2 — Krisis Fisika Klasik
// ---------------------------------------------------------------------------
const PageKrisis: Page = () => (
  <div style={{ ...fill, padding: '110px 120px 140px 120px', boxSizing: 'border-box' }}>
    <GridBg />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Eyebrow>Latar Belakang · 1900</Eyebrow>
      <PageTitle>Krisis Fisika Klasik</PageTitle>
      <p style={{ fontSize: 30, color: muted, margin: '18px 0 44px 0', lineHeight: 1.5 }}>
        Di akhir abad ke-19, fisika Newton &amp; Maxwell gagal menjelaskan empat fenomena fundamental:
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 32px' }}>
        {[
          ['Radiasi Benda Hitam', 'Kurva spektrum tak cocok dengan teori — "bencana ultraviolet"', 'var(--osd-accent)'],
          ['Efek Fotolistrik', 'Elektron lepas hanya jika frekuensi cahaya cukup, bukan karena intensitas', violet],
          ['Spektrum Atom Hidrogen', 'Garis emisi diskret, bukan spektrum kontinu seperti prediksi klasik', pink],
          ['Stabilitas Atom', 'Elektron yang mengorbit seharusnya meradiasi energi dan jatuh ke inti', '#fbbf24'],
        ].map(([t, d, c], i) => (
          <Card key={t} glow={c} delay={i * 120}>
            <div style={{ fontSize: 34, fontWeight: 700, fontFamily: fontDisplay, color: c }}>{t}</div>
            <div style={{ fontSize: 27, color: muted, marginTop: 10, lineHeight: 1.5 }}>{d}</div>
          </Card>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

// ---------------------------------------------------------------------------
// Page 3 — Kuantisasi Energi (Planck & Einstein)
// ---------------------------------------------------------------------------
const PageKuantisasi: Page = () => (
  <div style={{ ...fill, padding: '110px 120px 140px 120px', boxSizing: 'border-box' }}>
    <GridBg />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Eyebrow>Pilar 01 · 1900–1913</Eyebrow>
      <PageTitle>Energi Terkuantisasi</PageTitle>
      <div style={{ display: 'flex', gap: 60, marginTop: 56, alignItems: 'center' }}>
        <div style={{ flex: 1 }}>
          <Card delay={0}>
            <div
              style={{
                fontFamily: fontMono,
                fontSize: 72,
                fontWeight: 700,
                color: 'var(--osd-accent)',
                textAlign: 'center',
                animation: 'qk-pulse 3s ease-in-out infinite',
              }}
            >
              E = h·f
            </div>
            <div style={{ fontSize: 26, color: muted, marginTop: 22, lineHeight: 1.6, textAlign: 'center' }}>
              <b style={{ color: 'var(--osd-text)' }}>Max Planck:</b> energi dipancarkan dalam paket diskret ("kuanta"), bukan aliran kontinu.
            </div>
          </Card>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 26 }}>
          <Card glow="var(--osd-accent)" delay={150}>
            <div style={{ fontSize: 30, fontWeight: 700, fontFamily: fontDisplay }}>Albert Einstein — Foton</div>
            <div style={{ fontSize: 26, color: muted, marginTop: 8, lineHeight: 1.55 }}>
              Cahaya itu sendiri terdiri dari partikel (foton). Menjelaskan efek fotolistrik — Nobel 1921.
            </div>
          </Card>
          <Card glow={violet} delay={300}>
            <div style={{ fontSize: 30, fontWeight: 700, fontFamily: fontDisplay }}>Niels Bohr — Orbit Kuantum</div>
            <div style={{ fontSize: 26, color: muted, marginTop: 8, lineHeight: 1.55 }}>
              Elektron hanya boleh menempati tingkat energi tertentu; lompatan antar-tingkat memancarkan foton.
            </div>
          </Card>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ---------------------------------------------------------------------------
// Page 4 — Dualitas Gelombang-Partikel
// ---------------------------------------------------------------------------
const PageDualitas: Page = () => (
  <div style={{ ...fill, padding: '110px 120px 140px 120px', boxSizing: 'border-box' }}>
    <GridBg />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Eyebrow>Pilar 02 · De Broglie 1924</Eyebrow>
      <PageTitle>Dualitas Gelombang–Partikel</PageTitle>
      <p style={{ fontSize: 30, color: muted, margin: '20px 0 44px 0', lineHeight: 1.5, maxWidth: 1500 }}>
        Semua benda memiliki sifat gelombang sekaligus partikel. Semakin kecil massanya, semakin jelas sifat gelombangnya.
      </p>
      <div style={{ display: 'flex', gap: 40, alignItems: 'stretch' }}>
        <div style={{ flex: 1 }}>
          <Card glow="var(--osd-accent)" delay={0}>
            <div style={{ fontSize: 32, fontWeight: 700, fontFamily: fontDisplay, color: 'var(--osd-accent)' }}>Sifat Gelombang</div>
            <ul style={{ fontSize: 27, lineHeight: 1.6, margin: '16px 0 0 0', paddingLeft: 34 }}>
              <li>Interferensi &amp; difraksi</li>
              <li>Eksperimen celah ganda Young</li>
              <li>Difraksi elektron (Davisson–Germer)</li>
            </ul>
          </Card>
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            fontFamily: fontMono,
            fontSize: 46,
            fontWeight: 700,
            color: violet,
            animation: 'qk-pulse 2.6s ease-in-out infinite',
          }}
        >
          λ = h/p
        </div>
        <div style={{ flex: 1 }}>
          <Card glow={pink} delay={150}>
            <div style={{ fontSize: 32, fontWeight: 700, fontFamily: fontDisplay, color: pink }}>Sifat Partikel</div>
            <ul style={{ fontSize: 27, lineHeight: 1.6, margin: '16px 0 0 0', paddingLeft: 34 }}>
              <li>Lokalisasi di satu titik</li>
              <li>Tumbukan &amp; efek fotolistrik</li>
              <li>Foton &amp; elektron terdeteksi utuh</li>
            </ul>
          </Card>
        </div>
      </div>
      <div style={{ marginTop: 42, fontSize: 27, color: muted, lineHeight: 1.5 }}>
        Kunci: bahkan <b style={{ color: 'var(--osd-text)' }}>satu elektron</b> yang ditembakkan bergantian melewati dua celah tetap membentuk pola interferensi — seolah ia "berinterferensi dengan dirinya sendiri".
      </div>
    </div>
    <Footer />
  </div>
);

// ---------------------------------------------------------------------------
// Page 5 — Prinsip Ketidakpastian Heisenberg
// ---------------------------------------------------------------------------
const PageHeisenberg: Page = () => (
  <div style={{ ...fill, padding: '110px 120px 140px 120px', boxSizing: 'border-box' }}>
    <GridBg />
    <div style={{ position: 'relative', zIndex: 1, textAlign: 'center' }}>
      <Eyebrow>Pilar 03 · Heisenberg 1927</Eyebrow>
      <PageTitle>Prinsip Ketidakpastian</PageTitle>
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 100,
          fontWeight: 700,
          color: 'var(--osd-accent)',
          marginTop: 80,
          animation: 'qk-glow 4s ease-in-out infinite',
        }}
      >
        Δx · Δp ≥ ħ/2
      </div>
      <p style={{ fontSize: 32, color: muted, maxWidth: 1250, margin: '70px auto 0 auto', lineHeight: 1.6 }}>
        Kita tidak dapat mengetahui posisi dan momentum partikel secara bersamaan dengan presisi sempurna. Ini bukan keterbatasan alat ukur — melainkan <b style={{ color: 'var(--osd-text)' }}>sifat alam itu sendiri</b>.
      </p>
    </div>
    <Footer />
  </div>
);

// ---------------------------------------------------------------------------
// Page 6 — Fungsi Gelombang & Pengukuran
// ---------------------------------------------------------------------------
const PageGelombang: Page = () => (
  <div style={{ ...fill, padding: '110px 120px 140px 120px', boxSizing: 'border-box' }}>
    <GridBg />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Eyebrow>Pilar 04 · Schrödinger 1926</Eyebrow>
      <PageTitle>Fungsi Gelombang &amp; Probabilitas</PageTitle>
      <div style={{ display: 'flex', gap: 44, marginTop: 48, alignItems: 'center' }}>
        <div style={{ flex: 1.1, display: 'flex', flexDirection: 'column', gap: 24 }}>
          <Card glow="var(--osd-accent)" delay={0}>
            <div style={{ fontSize: 28, lineHeight: 1.55 }}>
              <b style={{ fontFamily: fontDisplay }}>Persamaan Schrödinger</b> menggambarkan bagaimana fungsi gelombang <span style={{ fontFamily: fontMono, color: 'var(--osd-accent)' }}>Ψ</span> berevolusi terhadap waktu.
            </div>
          </Card>
          <Card glow={violet} delay={140}>
            <div style={{ fontSize: 28, lineHeight: 1.55 }}>
              <b style={{ fontFamily: fontDisplay }}>Maks Born:</b> |Ψ|² adalah <i>kerapatan probabilitas</i> — kita hanya bisa memprediksi di mana partikel mungkin ditemukan.
            </div>
          </Card>
          <Card glow={pink} delay={280}>
            <div style={{ fontSize: 28, lineHeight: 1.55 }}>
              <b style={{ fontFamily: fontDisplay }}>Kolaps fungsi gelombang:</b> saat diukur, superposisi runtuh menjadi satu hasil pasti.
            </div>
          </Card>
        </div>
        <div style={{ flex: 0.9, display: 'flex', justifyContent: 'center' }}>
          <svg width="560" height="380" viewBox="0 0 560 380">
            <defs>
              <linearGradient id="psiGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#22d3ee" />
                <stop offset="100%" stopColor="#a78bfa" />
              </linearGradient>
            </defs>
            <line x1="40" y1="330" x2="520" y2="330" stroke="rgba(148,163,184,0.35)" strokeWidth="2" />
            <path
              d="M40,330 C120,330 140,120 200,110 C260,100 250,300 300,300 C350,300 340,60 400,70 C460,80 480,330 520,330"
              fill="none"
              stroke="url(#psiGrad)"
              strokeWidth="5"
              strokeLinecap="round"
              style={{ animation: 'qk-pulse 3.2s ease-in-out infinite' }}
            />
            <path
              d="M40,330 C120,330 140,220 200,215 C260,210 250,315 300,315 C350,315 340,190 400,195 C460,200 480,330 520,330 Z"
              fill="rgba(34,211,238,0.12)"
              stroke="none"
            />
            <text x="280" y="365" fill="#93a3bd" fontSize="22" fontFamily={fontMono} textAnchor="middle">
              posisi (x)
            </text>
            <text x="280" y="45" fill="#22d3ee" fontSize="26" fontFamily={fontMono} textAnchor="middle">
              |Ψ(x)|²
            </text>
          </svg>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ---------------------------------------------------------------------------
// Page 7 — Paradoks Kucing Schrödinger
// ---------------------------------------------------------------------------
const PageKucing: Page = () => (
  <div style={{ ...fill, padding: '110px 120px 140px 120px', boxSizing: 'border-box' }}>
    <GridBg />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Eyebrow>Eksperimen Pikiran · 1935</Eyebrow>
      <PageTitle>Kucing Schrödinger</PageTitle>
      <div style={{ display: 'flex', gap: 48, marginTop: 50, alignItems: 'center' }}>
        <div style={{ flex: 1.2 }}>
          <p style={{ fontSize: 30, lineHeight: 1.6, color: 'var(--osd-text)', margin: 0 }}>
            Seekor kucing dalam kotak tertutup bersama detektor radioaktif dan racun. Jika satu atom meluruh, racun terlepas.
          </p>
          <p style={{ fontSize: 30, lineHeight: 1.6, color: muted, margin: '28px 0 0 0' }}>
            Sebelum kotak dibuka, atom berada dalam <b style={{ color: 'var(--osd-accent)' }}>superposisi</b> — dan kucing pun secara matematis <b style={{ color: 'var(--osd-text)' }}>hidup dan mati sekaligus</b>.
          </p>
          <p style={{ fontSize: 30, lineHeight: 1.6, color: muted, margin: '28px 0 0 0' }}>
            Paradoks ini mengkritik absurditas superposisi di dunia makroskopik, dan memicu berbagai <b style={{ color: violet }}>interpretasi</b>: Kopenhagen, Many-Worlds, hingga decoherence.
          </p>
        </div>
        <div style={{ flex: 0.8, display: 'flex', justifyContent: 'center' }}>
          <div
            style={{
              width: 380,
              height: 380,
              borderRadius: 'var(--osd-radius)',
              border: `3px dashed ${surfaceBorder}`,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 18,
              background: surface,
              animation: 'qk-float 5s ease-in-out infinite',
            }}
          >
            <div style={{ fontSize: 110, lineHeight: 1 }}>🐱</div>
            <div style={{ fontFamily: fontMono, fontSize: 30, fontWeight: 700 }}>
              <span style={{ color: '#4ade80', animation: 'qk-pulse 2s ease-in-out infinite' }}>|hidup⟩</span>
              <span style={{ color: muted }}> + </span>
              <span style={{ color: pink, animation: 'qk-pulse 2s ease-in-out infinite', animationDelay: '1s' }}>|mati⟩</span>
            </div>
            <div style={{ fontSize: 22, color: muted }}>belum diukur…</div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
);

// ---------------------------------------------------------------------------
// Page 8 — Aplikasi Teknologi Kuantum
// ---------------------------------------------------------------------------
const PageAplikasi: Page = () => (
  <div style={{ ...fill, padding: '110px 120px 140px 120px', boxSizing: 'border-box' }}>
    <GridBg />
    <div style={{ position: 'relative', zIndex: 1 }}>
      <Eyebrow>Kuantum dalam Kehidupan</Eyebrow>
      <PageTitle>Aplikasi Teknologi Kuantum</PageTitle>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '28px 32px', marginTop: 48 }}>
        {[
          ['Komputer Kuantum', 'Qubit memanfaatkan superposisi & belitan untuk menghitung secara paralel', 'var(--osd-accent)'],
          ['Kriptografi Kuantum', 'QKD mendeteksi penyadap karena pengukuran mengubah keadaan foton', violet],
          ['MRI & Laser', 'Resonansi magnetik nuklir dan emisi terstimulasi lahir dari fisika kuantum', pink],
          ['Sel Surya', 'Efek fotolistrik mengubah foton matahari menjadi arus listrik', '#fbbf24'],
          ['Jam Atom & GPS', 'Transisi kuantum cesium memberi presisi waktu nanodetik', '#4ade80'],
          ['Material & Obat', 'Simulasi struktur elektronik molekul untuk material baru', '#fb923c'],
        ].map(([t, d, c], i) => (
          <Card key={t} glow={c} delay={i * 100}>
            <div style={{ fontSize: 29, fontWeight: 700, fontFamily: fontDisplay, color: c }}>{t}</div>
            <div style={{ fontSize: 24, color: muted, marginTop: 8, lineHeight: 1.5 }}>{d}</div>
          </Card>
        ))}
      </div>
    </div>
    <Footer />
  </div>
);

// ---------------------------------------------------------------------------
// Page 9 — Penutup
// ---------------------------------------------------------------------------
const PagePenutup: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: '0 160px' }}>
    <GridBg />
    <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Eyebrow>Kesimpulan</Eyebrow>
      <h1
        style={{
          fontFamily: 'var(--osd-font-display)',
          fontSize: 104,
          fontWeight: 700,
          lineHeight: 1.1,
          margin: '26px 0 36px 0',
        }}
      >
        Alam semesta bersifat{' '}
        <span style={{ color: 'var(--osd-accent)', animation: 'qk-glow 4s ease-in-out infinite' }}>probabilistik</span>
      </h1>
      <p style={{ fontSize: 32, color: muted, lineHeight: 1.6, maxWidth: 1250, margin: 0 }}>
        "Jika mekanika kuantum belum membuatmu pusing, berarti kamu belum memahaminya." — Niels Bohr
      </p>
      <div style={{ marginTop: 48 }}>
        <AtomGraphic size={220} />
      </div>
    </div>
    <Footer />
  </div>
);

// ---------------------------------------------------------------------------
// Meta + notes + page array
// ---------------------------------------------------------------------------
export const meta: SlideMeta = {
  title: 'Fisika Kuantum: Dunia Partikel Subatomik',
  createdAt: '2026-10-27T07:59:28.294Z',
};

export const notes: (string | undefined)[] = [
  // Halaman 1: Cover
  `Sapa audiens dan perkenalkan topik: fisika yang mengatur dunia paling kecil.
Tekankan bahwa fisika kuantum adalah fondasi teknologi modern — dari laser hingga komputer kuantum.`,

  // Halaman 2: Krisis Fisika Klasik
  `Buka dengan narasi: pada 1900, Lord Kelvin menyebut ada "awan kecil" di cakrawala fisika.
Jelaskan empat kegagalan fisika klasik satu per satu; tekankan bencana ultraviolet dan stabilitas atom sebagai motivasi utama lahirnya teori kuantum.`,

  // Halaman 3: Kuantisasi Energi
  `Ceritakan kisah Planck yang "terpaksa" memperkenalkan kuanta energi pada 14 Desember 1900 — hari lahir fisika kuantum.
Hubungkan ke Einstein: foton menjelaskan efek fotolistrik (Nobel 1921), lalu Bohr memindahkan kuantisasi ke orbit elektron.`,

  // Halaman 4: Dualitas Gelombang-Partikel
  `De Broglie mengajukan ide radikal: jika gelombang bisa berperilaku seperti partikel, partikel pun bisa berperilaku seperti gelombang.
Ceritakan eksperimen celah ganda: satu elektron pun menghasilkan interferensi — "satu-satunya misteri" mekanika kuantum menurut Feynman.`,

  // Halaman 5: Heisenberg
  `Halaman ini biarkan hening sejenak — satu rumus, satu gagasan.
Tegaskan: ketidakpastian bukan soal alat ukur yang buruk, tapi sifat intrinsik alam. Analogi paket gelombang: makin sempit posisi, makin lebar rentang momentum.`,

  // Halaman 6: Fungsi Gelombang
  `Jelaskan Psi sebagai "peta probabilitas" dan peran Max Born menafsirkannya.
Tekankan perbedaan evolusi deterministik (Schrödinger) versus hasil pengukuran yang acak — ketegangan sentral interpretasi kuantum.`,

  // Halaman 7: Kucing Schrödinger
  `Narasikan eksperimen pikiran dengan dramatis, lalu tekankan tujuannya: kritik (reductio ad absurdum), bukan klaim bahwa kucing benar-benar hidup-mati.
Singgung interpretasi: Kopenhagen (kolaps saat pengukuran), Many-Worlds (cabang alam semesta), dan decoherence.`,

  // Halaman 8: Aplikasi
  `Tarik kembali ke kehidupan nyata: tunjukkan bahwa kuantum bukan filsafat abstrak — ponsel, GPS, MRI, dan panel surya bergantung padanya.
Soroti komputer kuantum dan kriptografi kuantum sebagai "revolusi kuantum kedua".`,

  // Halaman 9: Penutup
  `Tutup dengan kutipan Bohr, rangkum tiga pilar: kuantisasi, dualitas, probabilitas.
Buka sesi tanya jawab.`,
];

export default [
  PageCover,
  PageKrisis,
  PageKuantisasi,
  PageDualitas,
  PageHeisenberg,
  PageGelombang,
  PageKucing,
  PageAplikasi,
  PagePenutup,
] satisfies Page[];
