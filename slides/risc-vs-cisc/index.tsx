import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';
import { useSlidePageNumber } from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

export const design: DesignSystem = {
  palette: { bg: '#f4f7fb', text: '#0f172a', accent: '#2563eb' },
  fonts: {
    display: '"Segoe UI", "Helvetica Neue", Arial, system-ui, sans-serif',
    body: '"Segoe UI", "Helvetica Neue", Arial, system-ui, sans-serif',
  },
  typeScale: { hero: 170, body: 28 },
  radius: 16,
};

/* ---------- Tokens that live outside the DesignSystem shape ---------- */

const mono = 'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", monospace';
const muted = '#475569';
const subtle = '#64748b';
const risc = '#059669';
const cisc = '#d97706';
const danger = '#dc2626';
const shadow = '0 8px 24px rgba(15, 23, 42, 0.07)';

const fill = { width: '100%', height: '100%' } as const;

const cardBase: CSSProperties = {
  background: 'rgba(255, 255, 255, 0.9)',
  border: '1px solid rgba(15, 23, 42, 0.08)',
  borderRadius: 'var(--osd-radius)',
  boxShadow: shadow,
  boxSizing: 'border-box',
};

const gridBg = (base: string, line: string, size: number) =>
  `linear-gradient(${line} 1px, transparent 1px) 0 0 / ${size}px ${size}px, linear-gradient(90deg, ${line} 1px, transparent 1px) 0 0 / ${size}px ${size}px, ${base}`;

/* ---------- Icons (from the outline, 24x24 stroke icons) ---------- */

const Ico = ({
  color,
  size = 48,
  strokeWidth = 2,
  children,
}: {
  color: string;
  size?: number;
  strokeWidth?: number;
  children: ReactNode;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth={strokeWidth}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {children}
  </svg>
);

const icons = {
  chip: (
    <>
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" />
      <line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" />
      <line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" />
      <line x1="20" y1="15" x2="23" y2="15" />
      <line x1="1" y1="9" x2="4" y2="9" />
      <line x1="1" y1="15" x2="4" y2="15" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </>
  ),
  scale: (
    <>
      <path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h18" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </>
  ),
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
    </>
  ),
  gauge: (
    <>
      <path d="M12 2v4" />
      <path d="M12 18v4" />
      <path d="M4.93 4.93l2.83 2.83" />
      <path d="M16.24 16.24l2.83 2.83" />
      <path d="M2 12h4" />
      <path d="M18 12h4" />
      <path d="M4.93 19.07l2.83-2.83" />
      <path d="M16.24 7.76l2.83-2.83" />
    </>
  ),
  bolt: <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />,
  cube: (
    <>
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </>
  ),
  book: (
    <>
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </>
  ),
  doc: (
    <>
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </>
  ),
  chevron: <polyline points="9 18 15 12 9 6" />,
  battery: (
    <>
      <rect x="1" y="6" width="18" height="12" rx="2" ry="2" />
      <line x1="23" y1="11" x2="23" y2="13" />
    </>
  ),
  cross: <path d="M6 18L18 6M6 6l12 12" />,
  bars: (
    <>
      <line x1="18" y1="20" x2="18" y2="10" />
      <line x1="12" y1="20" x2="12" y2="4" />
      <line x1="6" y1="20" x2="6" y2="14" />
    </>
  ),
  monitor: (
    <>
      <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
      <line x1="8" y1="21" x2="16" y2="21" />
      <line x1="12" y1="17" x2="12" y2="21" />
    </>
  ),
  branch: (
    <>
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M13 6h3a2 2 0 0 1 2 2v7" />
      <line x1="6" y1="9" x2="6" y2="21" />
    </>
  ),
  check: (
    <>
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </>
  ),
  thumb: (
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="10" />
      <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
    </>
  ),
};

/* ---------- Page chrome ---------- */

const pad = (n: number) => String(n).padStart(2, '0');

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 110,
        right: 110,
        bottom: 36,
        display: 'flex',
        justifyContent: 'space-between',
        fontFamily: mono,
        fontSize: 22,
        letterSpacing: '0.06em',
        color: subtle,
      }}
    >
      <span>RISC vs CISC · Universitas Gunadarma · Kelompok 7</span>
      <span>
        <span style={{ color: 'var(--osd-accent)', fontWeight: 700 }}>{pad(current)}</span> /{' '}
        {pad(total)}
      </span>
    </div>
  );
};

const Canvas = ({
  background,
  decor,
  children,
}: {
  background: string;
  decor?: ReactNode;
  children: ReactNode;
}) => (
  <div
    style={{
      ...fill,
      position: 'relative',
      background,
      color: 'var(--osd-text)',
      fontFamily: 'var(--osd-font-body)',
    }}
  >
    {decor}
    <div
      style={{
        ...fill,
        position: 'relative',
        boxSizing: 'border-box',
        padding: '96px 110px 100px',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {children}
      <Footer />
    </div>
  </div>
);

const Header = ({
  eyebrow,
  title,
  sub,
  color,
  icon,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
  color: string;
  icon: ReactNode;
}) => (
  <>
    <div
      style={{
        position: 'absolute',
        top: 84,
        right: 110,
        width: 96,
        height: 96,
        borderRadius: 24,
        background: `${color}1f`,
        border: `2px solid ${color}55`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ico color={color} size={52}>
        {icon}
      </Ico>
    </div>
    <div style={{ maxWidth: 1560 }}>
      <div
        style={{
          fontFamily: mono,
          fontSize: 22,
          fontWeight: 700,
          letterSpacing: '0.18em',
          color,
          textTransform: 'uppercase',
        }}
      >
        {eyebrow}
      </div>
      <h2
        style={{
          margin: '8px 0 0',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 56,
          lineHeight: 1.15,
          fontWeight: 800,
          letterSpacing: '-0.01em',
        }}
      >
        {title}
      </h2>
      {sub ? (
        <div style={{ marginTop: 8, fontSize: 30, lineHeight: 1.3, color: muted }}>{sub}</div>
      ) : null}
    </div>
  </>
);

const Body = ({ children }: { children: ReactNode }) => (
  <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', paddingTop: 28 }}>
    {children}
  </div>
);

const Grid = ({
  cols,
  gap = 28,
  children,
  style,
}: {
  cols: string;
  gap?: number;
  children: ReactNode;
  style?: CSSProperties;
}) => <div style={{ display: 'grid', gridTemplateColumns: cols, gap, ...style }}>{children}</div>;

/* ---------- Shared content components ---------- */

const Lead = ({ children }: { children: ReactNode }) => (
  <p style={{ margin: '0 0 28px', fontSize: 30, lineHeight: 1.5, color: muted }}>{children}</p>
);

const Card = ({
  color,
  tag,
  title,
  titleSize = 40,
  sub,
  children,
}: {
  color: string;
  tag?: string;
  title: string;
  titleSize?: number;
  sub?: string;
  children?: ReactNode;
}) => (
  <div
    style={{
      ...cardBase,
      borderTop: `6px solid ${color}`,
      padding: '30px 36px 34px',
      display: 'flex',
      flexDirection: 'column',
    }}
  >
    {tag ? (
      <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.16em', color }}>
        {tag}
      </div>
    ) : null}
    <div style={{ fontSize: titleSize, fontWeight: 800, lineHeight: 1.2, marginTop: tag ? 4 : 0 }}>
      {title}
    </div>
    {sub ? <div style={{ fontSize: 26, color: subtle, marginTop: 4, lineHeight: 1.3 }}>{sub}</div> : null}
    <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>
  </div>
);

const Text = ({ children }: { children: ReactNode }) => (
  <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.45 }}>{children}</div>
);

const Field = ({
  label,
  color,
  children,
}: {
  label: string;
  color: string;
  children: ReactNode;
}) => (
  <div>
    <div
      style={{
        fontFamily: mono,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color,
        marginBottom: 4,
      }}
    >
      {label}
    </div>
    <Text>{children}</Text>
  </div>
);

const Bullet = ({ color, children }: { color: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 16, fontSize: 'var(--osd-size-body)', lineHeight: 1.45 }}>
    <span
      style={{ flex: 'none', width: 10, height: 10, borderRadius: 5, background: color, marginTop: 15 }}
    />
    <span>{children}</span>
  </div>
);

const NumItem = ({ n, color, children }: { n: string; color: string; children: ReactNode }) => (
  <div style={{ display: 'flex', gap: 16, alignItems: 'flex-start', fontSize: 'var(--osd-size-body)', lineHeight: 1.4 }}>
    <span
      style={{
        flex: 'none',
        width: 40,
        height: 40,
        borderRadius: 20,
        background: `${color}1f`,
        color,
        fontFamily: mono,
        fontWeight: 700,
        fontSize: 22,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {n}
    </span>
    <span>{children}</span>
  </div>
);

const Chip = ({ color, children }: { color: string; children: ReactNode }) => (
  <span
    style={{
      fontFamily: mono,
      fontSize: 24,
      fontWeight: 600,
      padding: '10px 20px',
      borderRadius: 999,
      background: `${color}16`,
      border: `1.5px solid ${color}55`,
      whiteSpace: 'nowrap',
    }}
  >
    {children}
  </span>
);

const Examples = ({ color, children }: { color: string; children: ReactNode }) => (
  <div style={{ marginTop: 28 }}>
    <div
      style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.14em', color, marginBottom: 12 }}
    >
      CONTOH IMPLEMENTASI
    </div>
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>{children}</div>
  </div>
);

const FeatureCard = ({ title, color, children }: { title: string; color: string; children: ReactNode }) => (
  <div style={{ ...cardBase, padding: '26px 32px 28px', borderLeft: `6px solid ${color}` }}>
    <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2 }}>{title}</div>
    <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.45, marginTop: 8, color: muted }}>
      {children}
    </div>
  </div>
);

const StatCard = ({
  color,
  tag,
  title,
  stat,
  statCaption,
  children,
}: {
  color: string;
  tag: string;
  title: string;
  stat: string;
  statCaption: string;
  children: ReactNode;
}) => (
  <div style={{ ...cardBase, borderTop: `6px solid ${color}`, padding: '30px 36px 34px' }}>
    <div style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.16em', color }}>{tag}</div>
    <div style={{ fontSize: 36, fontWeight: 800, lineHeight: 1.2, marginTop: 4 }}>{title}</div>
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 24,
        marginTop: 18,
        paddingBottom: 18,
        borderBottom: '1.5px dashed rgba(15, 23, 42, 0.16)',
      }}
    >
      <span style={{ flex: 'none', fontFamily: mono, fontSize: 80, fontWeight: 800, lineHeight: 1, color }}>
        {stat}
      </span>
      <span style={{ fontSize: 26, lineHeight: 1.3, color: muted }}>{statCaption}</span>
    </div>
    <div style={{ marginTop: 22, display: 'flex', flexDirection: 'column', gap: 18 }}>{children}</div>
  </div>
);

/* ---------- Page 1 — Cover ---------- */

const coverBg = `radial-gradient(circle at 78% 36%, rgba(59,130,246,0.38) 0%, rgba(59,130,246,0.1) 28%, transparent 55%), ${gridBg('#0a1630', 'rgba(96,165,250,0.1)', 72)}`;

const MetaRow = ({ label, children }: { label: string; children: ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: '230px 1fr', gap: 24, alignItems: 'baseline' }}>
    <span
      style={{ fontFamily: mono, fontSize: 22, fontWeight: 700, letterSpacing: '0.14em', color: '#60a5fa' }}
    >
      {label}
    </span>
    <span style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.45, color: '#e2e8f0' }}>{children}</span>
  </div>
);

const Cover: Page = () => (
  <div style={{ ...fill, position: 'relative', background: coverBg, fontFamily: 'var(--osd-font-body)' }}>
    <div
      style={{
        position: 'absolute',
        left: 1290,
        top: 100,
        width: 480,
        height: 480,
        borderRadius: '50%',
        border: '1.5px solid rgba(96,165,250,0.35)',
        background: 'radial-gradient(circle, rgba(37,99,235,0.35), rgba(37,99,235,0.04) 70%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Ico color="#93c5fd" size={300} strokeWidth={0.9}>
        {icons.chip}
      </Ico>
    </div>
    <div
      style={{
        ...fill,
        boxSizing: 'border-box',
        padding: '0 110px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        position: 'relative',
      }}
    >
      <div style={{ fontFamily: mono, fontSize: 24, fontWeight: 700, letterSpacing: '0.16em', color: '#60a5fa' }}>
        TUGAS PENGANTAR TEKNOLOGI DAN INFORMATIKA 1A · KELOMPOK 7
      </div>
      <h1
        style={{
          margin: '24px 0 0',
          fontFamily: 'var(--osd-font-display)',
          fontSize: 'var(--osd-size-hero)',
          fontWeight: 900,
          lineHeight: 1,
          letterSpacing: '-0.02em',
          color: '#f8fafc',
        }}
      >
        RISC vs CISC
      </h1>
      <p style={{ margin: '24px 0 0', maxWidth: 1180, fontSize: 44, lineHeight: 1.3, color: '#cbd5e1' }}>
        Studi Kinerja dan Efisiensi dalam Organisasi Arsitektur Komputer
      </p>
      <div
        style={{
          marginTop: 48,
          paddingTop: 32,
          borderTop: '1.5px solid rgba(96,165,250,0.35)',
          maxWidth: 1560,
          display: 'flex',
          flexDirection: 'column',
          gap: 14,
        }}
      >
        <MetaRow label="INSTANSI">Universitas Gunadarma</MetaRow>
        <MetaRow label="PENULIS JURNAL">
          Achmad Maulana, Allyssa Putri, Muhamad Alif Farras Syakir, Revan Sabilillah Saputra, dan Maulina
          Diah Lestari
        </MetaRow>
        <MetaRow label="PUBLIKASI">
          Jupiter: Publikasi Ilmu Keteknikan Industri, Teknik Elektro dan Informatika (Vol. 3, No. 4, 2025)
        </MetaRow>
      </div>
    </div>
  </div>
);

/* ---------- Page 2 — Latar belakang ---------- */

const StepBox = ({
  n,
  title,
  color,
  children,
}: {
  n: string;
  title: string;
  color: string;
  children: ReactNode;
}) => (
  <div style={{ ...cardBase, padding: '26px 24px 28px', borderTop: `6px solid ${color}` }}>
    <div style={{ fontFamily: mono, fontSize: 24, fontWeight: 700, color }}>{n}</div>
    <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, marginTop: 4 }}>{title}</div>
    <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.4, marginTop: 12, color: muted }}>
      {children}
    </div>
  </div>
);

const Background: Page = () => (
  <Canvas
    background="radial-gradient(rgba(15,23,42,0.13) 1.5px, transparent 1.6px) 0 0 / 28px 28px, linear-gradient(135deg, #fffdf8 0%, #edf2fa 100%)"
  >
    <Header eyebrow="Latar Belakang" title="Siklus Eksekusi Komputasi Modern" color="#10b981" icon={icons.clock} />
    <Body>
      <Lead>
        Prosesor adalah inti penggerak seluruh operasi pengolahan data digital. Kinerjanya tidak semata
        ditentukan oleh <strong style={{ color: 'var(--osd-text)' }}>frekuensi clock</strong>, melainkan oleh
        efisiensi tahapan eksekusi instruksi:
      </Lead>
      <Grid cols="repeat(5, 1fr)" gap={20}>
        <StepBox n="01" title="Fetch" color="#10b981">
          Ambil instruksi dari memori utama.
        </StepBox>
        <StepBox n="02" title="Decode" color="#10b981">
          Uraikan kode operasi (opcode).
        </StepBox>
        <StepBox n="03" title="Execute" color="#10b981">
          Operasi aritmatika dan logika oleh ALU.
        </StepBox>
        <StepBox n="04" title="Memory Access" color="#10b981">
          Akses operand di memori bila perlu.
        </StepBox>
        <StepBox n="05" title="Write-Back" color="#10b981">
          Tulis hasil ke register internal.
        </StepBox>
      </Grid>
      <div
        style={{
          marginTop: 36,
          padding: '22px 32px',
          borderLeft: '8px solid #10b981',
          background: 'rgba(16,185,129,0.1)',
          borderRadius: 12,
          fontSize: 'var(--osd-size-body)',
          lineHeight: 1.5,
        }}
      >
        Optimalisasi siklus ini sangat dipengaruhi mikroarsitektur: <strong>hierarki memori cache</strong>,{' '}
        <strong>pipelining</strong>, dan <strong>branch prediction</strong>.
      </div>
    </Body>
  </Canvas>
);

/* ---------- Page 3 — Problem statement ---------- */

const Problem: Page = () => (
  <Canvas background={gridBg('#eef1f6', 'rgba(100,116,139,0.12)', 48)}>
    <Header eyebrow="Problem Statement" title="Dilema Filosofi RISC vs CISC" color="#f59e0b" icon={icons.scale} />
    <Body>
      <Grid cols="1fr 1fr">
        <Card color={risc} tag="RISC" title="Paradigma RISC" sub="Reduced Instruction Set Computer">
          <Field label="Prinsip utama" color={risc}>
            Himpunan instruksi sederhana berukuran seragam.
          </Field>
          <Field label="Fokus" color={risc}>
            Eksekusi single-cycle, arsitektur load/store, serta optimalisasi pipelining dan paralelisme
            hardware.
          </Field>
          <Field label="Tujuan" color={risc}>
            Kecepatan eksekusi tinggi dan konsumsi energi minimal.
          </Field>
        </Card>
        <Card color={cisc} tag="CISC" title="Paradigma CISC" sub="Complex Instruction Set Computer">
          <Field label="Prinsip utama" color={cisc}>
            Instruksi kompleks multi-siklus langsung di tingkat hardware.
          </Field>
          <Field label="Fokus" color={cisc}>
            Meminimalkan beban kompilasi dan ukuran kode biner (code footprint) dengan operasi memori
            langsung.
          </Field>
          <Field label="Tujuan" color={cisc}>
            Efisiensi kapasitas memori dan kemudahan pemrograman assembly.
          </Field>
        </Card>
      </Grid>
    </Body>
  </Canvas>
);

/* ---------- Page 4 — Rumusan masalah & tujuan ---------- */

const Wave = () => (
  <svg
    width="760"
    height="280"
    viewBox="0 0 760 280"
    fill="none"
    style={{ position: 'absolute', top: 0, right: 0 }}
  >
    <path d="M0 50 C120 130 220 -10 360 70 S600 170 760 50" stroke="#06b6d4" strokeOpacity="0.55" strokeWidth="3" />
    <path d="M0 90 C120 170 220 30 360 110 S600 210 760 90" stroke="#06b6d4" strokeOpacity="0.35" strokeWidth="3" />
    <path d="M0 130 C120 210 220 70 360 150 S600 250 760 130" stroke="#06b6d4" strokeOpacity="0.2" strokeWidth="3" />
  </svg>
);

const Questions: Page = () => (
  <Canvas background="#ffffff" decor={<Wave />}>
    <Header eyebrow="Pendahuluan" title="Rumusan Masalah & Tujuan Penelitian" color="#6366f1" icon={icons.target} />
    <Body>
      <Grid cols="1fr 1fr">
        <Card color="#6366f1" title="Rumusan Masalah">
          <NumItem n="1" color="#6366f1">
            Bagaimana siklus eksekusi instruksi (fetch, decode, execute) bekerja?
          </NumItem>
          <NumItem n="2" color="#6366f1">
            Apa perbedaan mendasar RISC dan CISC pada instruksi, register, dan pengalamatan?
          </NumItem>
          <NumItem n="3" color="#6366f1">
            Bagaimana kinerja dan efisiensi energi RISC vs CISC pada berbagai beban kerja?
          </NumItem>
          <NumItem n="4" color="#6366f1">
            Faktor mikroarsitektur apa yang mendorong konvergensi hibrida keduanya?
          </NumItem>
        </Card>
        <Card color="#06b6d4" title="Tujuan Utama Penelitian">
          <NumItem n="1" color="#0891b2">
            Menganalisis tahapan siklus eksekusi instruksi secara mendalam.
          </NumItem>
          <NumItem n="2" color="#0891b2">
            Menguraikan karakteristik teknis, keunggulan, dan limitasi RISC dan CISC.
          </NumItem>
          <NumItem n="3" color="#0891b2">
            Membandingkan kinerja, daya, dan kompleksitas silikon dari literatur akademis.
          </NumItem>
          <NumItem n="4" color="#0891b2">
            Memetakan implikasi konvergensi hibrida pada hardware dan software modern.
          </NumItem>
        </Card>
      </Grid>
    </Body>
  </Canvas>
);

/* ---------- Page 5 — Taksonomi Flynn ---------- */

const FlynnCard = ({
  acr,
  name,
  children,
}: {
  acr: string;
  name: string;
  children: ReactNode;
}) => (
  <div style={{ ...cardBase, padding: '26px 32px 28px', borderTop: '6px solid #0d9488' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: 20 }}>
      <span style={{ fontFamily: mono, fontSize: 56, fontWeight: 800, lineHeight: 1.1, color: '#0d9488' }}>
        {acr}
      </span>
      <span style={{ fontSize: 26, color: subtle }}>{name}</span>
    </div>
    <div style={{ marginTop: 10, fontSize: 'var(--osd-size-body)', lineHeight: 1.45 }}>{children}</div>
  </div>
);

const Flynn: Page = () => (
  <Canvas background={gridBg('#eef2f7', 'rgba(71,85,105,0.09)', 120)}>
    <Header eyebrow="Landasan Teori" title="Klasifikasi Arsitektur Flynn" color="#0d9488" icon={icons.grid} />
    <Body>
      <Lead>Empat kategori utama berdasarkan aliran instruksi dan aliran data:</Lead>
      <Grid cols="1fr 1fr">
        <FlynnCard acr="SISD" name="Single Instruction Single Data">
          Model Von Neumann berprosesor tunggal: satu instruksi pada satu data.
        </FlynnCard>
        <FlynnCard acr="SIMD" name="Single Instruction Multiple Data">
          Satu instruksi pada banyak aliran data sekaligus (mis. GPU dan unit vektor).
        </FlynnCard>
        <FlynnCard acr="MISD" name="Multiple Instruction Single Data">
          Beberapa aliran instruksi pada satu aliran data (jarang, aplikasi spesifik).
        </FlynnCard>
        <FlynnCard acr="MIMD" name="Multiple Instruction Multiple Data">
          Beberapa instruksi mandiri pada data terpisah (prosesor multi-core modern).
        </FlynnCard>
      </Grid>
    </Body>
  </Canvas>
);

/* ---------- Page 6 — Metrik kinerja ---------- */

const Metric = ({
  name,
  full,
  color,
  children,
}: {
  name: string;
  full?: string;
  color: string;
  children: ReactNode;
}) => (
  <div>
    <div style={{ fontSize: 34, fontWeight: 800, lineHeight: 1.2, color }}>{name}</div>
    {full ? (
      <div style={{ fontFamily: mono, fontSize: 22, lineHeight: 1.3, color: subtle, marginTop: 2 }}>{full}</div>
    ) : null}
    <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.45, marginTop: 8 }}>{children}</div>
  </div>
);

const Metrics: Page = () => (
  <Canvas
    background="radial-gradient(circle at 18% 12%, rgba(139,92,246,0.2), transparent 40%), radial-gradient(circle at 88% 88%, rgba(56,189,248,0.22), transparent 45%), #e9eefb"
  >
    <Header eyebrow="Landasan Teori" title="Indikator Kuantitatif Kinerja Komputasi" color="#8b5cf6" icon={icons.gauge} />
    <Body>
      <Grid cols="1fr 1fr 1fr">
        <Card color="#8b5cf6" title="Kecepatan Instruksi" titleSize={32}>
          <Metric name="MIPS" full="Million Instructions Per Second" color="#7c3aed">
            Jumlah juta instruksi per detik.
          </Metric>
          <Metric name="MFLOPs" full="Million Floating-Point Operations Per Second" color="#7c3aed">
            Kecepatan kalkulasi titik mengambang.
          </Metric>
        </Card>
        <Card color="#6366f1" title="Efisiensi Siklus & Latensi" titleSize={32}>
          <Metric name="CPI" full="Clock Per Instruction" color="#4f46e5">
            Rata-rata siklus clock untuk satu instruksi.
          </Metric>
          <Metric name="Memory Latency" full="Access Time" color="#4f46e5">
            Waktu tunda baca/tulis pada hierarki memori.
          </Metric>
        </Card>
        <Card color="#0ea5e9" title="Daya & Bandwidth" titleSize={32}>
          <Metric name="Performance per Watt" color="#0284c7">
            Rasio hasil komputasi terhadap konsumsi daya (Watt).
          </Metric>
          <Metric name="Memory & I/O Bandwidth" color="#0284c7">
            Kecepatan transfer data antar komponen sistem.
          </Metric>
        </Card>
      </Grid>
    </Body>
  </Canvas>
);

/* ---------- Pages 7–8 — Karakteristik RISC / CISC ---------- */

const RiscTraits: Page = () => (
  <Canvas background={`${gridBg('linear-gradient(160deg, #ecfdf5, #d1fae5)', 'rgba(5,150,105,0.1)', 40)}`}>
    <Header
      eyebrow="Profil Arsitektur"
      title="Karakteristik Arsitektur RISC"
      sub="Reduced Instruction Set Computer"
      color={risc}
      icon={icons.bolt}
    />
    <Body>
      <Grid cols="1fr 1fr">
        <FeatureCard title="Set Instruksi Sederhana" color={risc}>
          Ukuran seragam (umumnya 4 byte), 1 siklus clock per instruksi.
        </FeatureCard>
        <FeatureCard title="Arsitektur Load/Store" color={risc}>
          Aritmatika/logika hanya antar-register; memori diakses lewat LOAD dan STORE.
        </FeatureCard>
        <FeatureCard title="Register Set Melimpah" color={risc}>
          Minimal 32 register integer general-purpose menekan latensi memori utama.
        </FeatureCard>
        <FeatureCard title="Unit Kontrol Hardwired" color={risc}>
          Pengalamatan sederhana memungkinkan sirkuit kontrol logika keras yang cepat.
        </FeatureCard>
      </Grid>
      <Examples color={risc}>
        <Chip color={risc}>ARM Cortex-X4 (ARMv9.2)</Chip>
        <Chip color={risc}>RISC-V SiFive P670 (RVV 1.0)</Chip>
        <Chip color={risc}>Apple M-Series</Chip>
        <Chip color={risc}>SPARC</Chip>
        <Chip color={risc}>MIPS R2000</Chip>
      </Examples>
    </Body>
  </Canvas>
);

const CiscTraits: Page = () => (
  <Canvas background={`${gridBg('#fef3c7', 'rgba(217,119,6,0.12)', 56)}`}>
    <Header
      eyebrow="Profil Arsitektur"
      title="Karakteristik Arsitektur CISC"
      sub="Complex Instruction Set Computer"
      color={cisc}
      icon={icons.cube}
    />
    <Body>
      <Grid cols="1fr 1fr">
        <FeatureCard title="Instruksi Kompleks & Variabel" color={cisc}>
          Panjang 1–15 byte, dirancang menyelesaikan tugas rumit dalam satu baris kode.
        </FeatureCard>
        <FeatureCard title="Eksekusi Multi-Siklus" color={cisc}>
          Satu instruksi kompleks memerlukan 2 hingga 4 siklus clock atau lebih.
        </FeatureCard>
        <FeatureCard title="Mode Pengalamatan Kaya" color={cisc}>
          Lebih dari 10 mode, termasuk aritmatika langsung pada lokasi memori.
        </FeatureCard>
        <FeatureCard title="Unit Kontrol Mikrokode" color={cisc}>
          Microprogram control store menerjemahkan instruksi tingkat tinggi.
        </FeatureCard>
      </Grid>
      <Examples color={cisc}>
        <Chip color={cisc}>Intel Core i9-13900K (Raptor Lake)</Chip>
        <Chip color={cisc}>AMD Ryzen 9 7950X (Zen 4)</Chip>
        <Chip color={cisc}>VAX</Chip>
        <Chip color={cisc}>Motorola 68000</Chip>
      </Examples>
    </Body>
  </Canvas>
);

/* ---------- Page 9 — Profil jurnal ---------- */

const InfoRow = ({
  label,
  last,
  children,
}: {
  label: string;
  last?: boolean;
  children: ReactNode;
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: '260px 1fr',
      gap: 32,
      alignItems: 'baseline',
      padding: '18px 0',
      borderBottom: last ? 'none' : '1.5px solid rgba(15, 23, 42, 0.08)',
    }}
  >
    <div
      style={{
        fontFamily: mono,
        fontSize: 22,
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#2563eb',
      }}
    >
      {label}
    </div>
    <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.45 }}>{children}</div>
  </div>
);

const Journal: Page = () => (
  <Canvas background="#f6f6f3">
    <Header eyebrow="Jurnal Acuan" title="Profil Identifikasi Jurnal Referensi Utama" color="#2563eb" icon={icons.book} />
    <Body>
      <div
        style={{
          ...cardBase,
          background: '#ffffff',
          border: '1.5px solid rgba(15, 23, 42, 0.14)',
          boxShadow: '0 16px 40px rgba(15, 23, 42, 0.1)',
          padding: '16px 56px',
        }}
      >
        <InfoRow label="Judul Jurnal">
          <strong>RISC vs CISC: Studi Kinerja dan Efisiensi dalam Organisasi Arsitektur Komputer</strong>
        </InfoRow>
        <InfoRow label="Penulis">
          Achmad Maulana, Allyssa Putri, Muhamad Alif Farras Syakir, Revan Sabilillah Saputra, &amp; Maulina
          Diah Lestari
        </InfoRow>
        <InfoRow label="Terbitan">
          <em>Jupiter: Publikasi Ilmu Keteknikan Industri, Teknik Elektro dan Informatika</em> — Vol. 3, No. 4,
          2025, hlm. 157–171
        </InfoRow>
        <InfoRow label="Identifikasi">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 14 }}>
            <Chip color="#2563eb">e-ISSN 3031-349X</Chip>
            <Chip color="#2563eb">p-ISSN 3031-500X</Chip>
            <Chip color="#2563eb">Terakreditasi Sinta 4</Chip>
            <Chip color="#2563eb">DOI 10.61132/jupiter.v3i4.973</Chip>
          </div>
        </InfoRow>
        <InfoRow label="Tinjauan kritis" last>
          Analisis komprehensif parameter teknis dan efisiensi daya, namun terbatas pada tinjauan sekunder
          tanpa benchmarking hardware langsung.
        </InfoRow>
      </div>
    </Body>
  </Canvas>
);

/* ---------- Page 10 — Metodologi ---------- */

const FlowCard = ({
  n,
  title,
  color,
  children,
}: {
  n: string;
  title: string;
  color: string;
  children: ReactNode;
}) => (
  <div style={{ ...cardBase, padding: '32px 36px 36px' }}>
    <div
      style={{
        width: 64,
        height: 64,
        borderRadius: 32,
        background: color,
        color: '#fff',
        fontFamily: mono,
        fontSize: 30,
        fontWeight: 800,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {n}
    </div>
    <div style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2, marginTop: 20 }}>{title}</div>
    <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.45, marginTop: 12, color: muted }}>
      {children}
    </div>
  </div>
);

const FlowArrow = ({ color }: { color: string }) => (
  <div style={{ display: 'flex', justifyContent: 'center', paddingTop: 48 }}>
    <Ico color={color} size={40}>
      {icons.chevron}
    </Ico>
  </div>
);

const Methodology: Page = () => (
  <Canvas
    background={`radial-gradient(rgba(2,132,199,0.2) 3px, transparent 3.5px) 0 0 / 96px 96px, ${gridBg('#e8eef5', 'rgba(2,132,199,0.07)', 96)}`}
  >
    <Header eyebrow="Metodologi" title="Metodologi Penelitian Komparatif" color="#0284c7" icon={icons.doc} />
    <Body>
      <Lead>Pendekatan kualitatif komparatif berbasis peninjauan literatur analitis:</Lead>
      <Grid cols="1fr 56px 1fr 56px 1fr" gap={0}>
        <FlowCard n="1" title="Studi Literatur Sistematis" color="#0284c7">
          Dokumentasi teknis produsen prosesor (ARM, Intel, AMD, SiFive) dan buku teks Hennessy &amp;
          Patterson.
        </FlowCard>
        <FlowArrow color="#0284c7" />
        <FlowCard n="2" title="Analisis Komparatif Variabel" color="#0284c7">
          Membandingkan set instruksi, kecepatan eksekusi, daya, kompleksitas silikon, dan memori.
        </FlowCard>
        <FlowArrow color="#0284c7" />
        <FlowCard n="3" title="Evaluasi Performa Konseptual" color="#0284c7">
          Menilai keunggulan pada komputasi general-purpose, sistem embedded, dan edge AI.
        </FlowCard>
      </Grid>
    </Body>
  </Canvas>
);

/* ---------- Page 11 — Alur kerja ---------- */

const WorkStep = ({
  n,
  title,
  next,
  children,
}: {
  n: string;
  title: string;
  next?: boolean;
  children: ReactNode;
}) => (
  <div style={{ ...cardBase, padding: '28px 32px 32px', position: 'relative' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <span
        style={{
          flex: 'none',
          width: 56,
          height: 56,
          borderRadius: 14,
          background: '#7c3aed',
          color: '#fff',
          fontFamily: mono,
          fontSize: 28,
          fontWeight: 800,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {n}
      </span>
      <span style={{ fontSize: 32, fontWeight: 800, lineHeight: 1.2 }}>{title}</span>
    </div>
    <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.45, marginTop: 14, color: muted }}>
      {children}
    </div>
    {next ? (
      <div style={{ position: 'absolute', top: 36, right: 14, opacity: 0.55 }}>
        <Ico color="#7c3aed" size={36}>
          {icons.chevron}
        </Ico>
      </div>
    ) : null}
  </div>
);

const Workflow: Page = () => (
  <Canvas
    background={`repeating-linear-gradient(0deg, rgba(124,58,237,0.06) 0 2px, transparent 2px 54px), linear-gradient(180deg, #f1f5fb, #e8eefa)`}
  >
    <Header eyebrow="Metodologi" title="Alur Kerja Sistematis Penelitian" color="#7c3aed" icon={icons.chevron} />
    <Body>
      <Grid cols="1fr 1fr 1fr">
        <WorkStep n="1" title="Identifikasi Masalah" next>
          Menentukan batas analisis kinerja dan efisiensi pada arsitektur RISC dan CISC.
        </WorkStep>
        <WorkStep n="2" title="Pengumpulan Literatur" next>
          Mengompilasi dokumentasi teknis dan jurnal referensi eksekusi instruksi.
        </WorkStep>
        <WorkStep n="3" title="Kategorisasi Metrik">
          Mengelompokkan parameter: CPI, daya (Watt), mode pengalamatan, dan code size.
        </WorkStep>
        <WorkStep n="4" title="Analisis Komparatif" next>
          Membandingkan eksekusi instruksi sederhana vs kompleks dan efisiensi sirkuit.
        </WorkStep>
        <WorkStep n="5" title="Sintesis & Evaluasi" next>
          Menilai fenomena hibridisasi dan implikasinya pada prosesor modern.
        </WorkStep>
        <WorkStep n="6" title="Kesimpulan & Saran">
          Menyusun kesimpulan komprehensif serta arahan riset lanjutan.
        </WorkStep>
      </Grid>
    </Body>
  </Canvas>
);

/* ---------- Pages 12–14 — Hasil & pembahasan ---------- */

const Performance: Page = () => (
  <Canvas
    background="repeating-linear-gradient(0deg, rgba(100,116,139,0.08) 0 2px, transparent 2px 26px), #f1f2f4"
  >
    <Header eyebrow="Hasil & Pembahasan" title="Analisis Kinerja Eksekusi" color="#ec4899" icon={icons.bolt} />
    <Body>
      <Grid cols="1fr 1fr">
        <StatCard
          color={risc}
          tag="RISC"
          title="Kecepatan Eksekusi Sederhana"
          stat="CPI ≈ 1"
          statCaption="rata-rata pada prosesor ARM / RISC-V"
        >
          <Bullet color={risc}>Set instruksi tetap dan kontrol hardwired mempercepat tahap decode.</Bullet>
          <Bullet color={risc}>Pipelining mendalam tanpa instruction hazard yang rumit.</Bullet>
        </StatCard>
        <StatCard
          color={cisc}
          tag="CISC"
          title="Efisiensi Jumlah Instruksi"
          stat="CPI 2–4+"
          statCaption="siklus clock untuk instruksi kompleks (Intel x86)"
        >
          <Bullet color={cisc}>
            Operasi tingkat tinggi (mis. perkalian matriks) butuh lebih sedikit baris instruksi.
          </Bullet>
          <Bullet color={cisc}>Mengurangi overhead fetch instruksi dari memori utama.</Bullet>
        </StatCard>
      </Grid>
    </Body>
  </Canvas>
);

const EnergyWave = () => (
  <svg
    width="1920"
    height="240"
    viewBox="0 0 1920 240"
    fill="none"
    style={{ position: 'absolute', left: 0, bottom: 0 }}
  >
    <path d="M0 150 C240 70 480 230 720 150 S1200 70 1440 150 S1800 210 1920 160" stroke="#10b981" strokeOpacity="0.4" strokeWidth="3" />
    <path d="M0 185 C240 105 480 265 720 185 S1200 105 1440 185 S1800 245 1920 195" stroke="#10b981" strokeOpacity="0.25" strokeWidth="3" />
    <path d="M0 220 C240 140 480 300 720 220 S1200 140 1440 220 S1800 280 1920 230" stroke="#10b981" strokeOpacity="0.15" strokeWidth="3" />
  </svg>
);

const PowerBar = ({
  label,
  color,
  value,
  text,
}: {
  label: string;
  color: string;
  value: number;
  text: string;
}) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
    <span style={{ width: 110, fontFamily: mono, fontSize: 24, fontWeight: 700, color }}>{label}</span>
    <div style={{ flex: 1, height: 28, borderRadius: 14, background: 'rgba(15,23,42,0.07)' }}>
      <div style={{ width: `${value}%`, minWidth: 20, height: '100%', borderRadius: 14, background: color }} />
    </div>
    <span style={{ width: 190, fontFamily: mono, fontSize: 24, fontWeight: 700 }}>{text}</span>
  </div>
);

const Energy: Page = () => (
  <Canvas background="linear-gradient(160deg, #ecfdf5, #d1fae5)" decor={<EnergyWave />}>
    <Header eyebrow="Hasil & Pembahasan" title="Analisis Efisiensi Energi" color="#10b981" icon={icons.battery} />
    <Body>
      <Grid cols="1fr 1fr">
        <StatCard
          color={risc}
          tag="RISC"
          title="Keunggulan Konsumsi Daya"
          stat="1–2 W"
          statCaption="ARM Cortex-A, daya sangat rendah"
        >
          <Bullet color={risc}>
            Dekoder lebih sederhana dan transistor aktif lebih sedikit pada die silikon.
          </Bullet>
          <Bullet color={risc}>Standar mutlak untuk mobile, tablet, dan node IoT.</Bullet>
        </StatCard>
        <StatCard
          color={cisc}
          tag="CISC"
          title="Pengelolaan Thermal & Daya"
          stat="45–200+ W"
          statCaption="Intel Core i7/i9 pada beban puncak"
        >
          <Bullet color={cisc}>
            Butuh manajemen daya dinamis: DVFS dan Intel Turbo Boost.
          </Bullet>
          <Bullet color={cisc}>Memerlukan pendinginan aktif.</Bullet>
        </StatCard>
      </Grid>
      <div style={{ marginTop: 28, display: 'flex', flexDirection: 'column', gap: 14 }}>
        <PowerBar label="RISC" color={risc} value={1} text="1–2 W" />
        <PowerBar label="CISC" color={cisc} value={100} text="45–200+ W" />
        <div style={{ fontFamily: mono, fontSize: 22, color: subtle, paddingLeft: 130 }}>
          Skala linear, puncak 200 W
        </div>
      </div>
    </Body>
  </Canvas>
);

const Silicon: Page = () => (
  <Canvas background={gridBg('#fffaeb', 'rgba(217,119,6,0.12)', 64)}>
    <Header eyebrow="Hasil & Pembahasan" title="Kompleksitas Desain & Biaya Silikon" color="#f59e0b" icon={icons.cross} />
    <Body>
      <Grid cols="1fr 1fr">
        <Card color={risc} tag="RISC" title="Kompleksitas Hardware">
          <Bullet color={risc}>Desain sirkuit lebih rasional dan minimalis.</Bullet>
          <Bullet color={risc}>Area die dan kerapatan transistor lebih kecil.</Bullet>
          <Bullet color={risc}>Biaya produksi dan tingkat cacat fabrikasi turun.</Bullet>
        </Card>
        <Card color={cisc} tag="CISC" title="Kompleksitas Hardware">
          <Bullet color={cisc}>
            Sirkuit kompleks untuk dekode instruksi 1–15 byte dan lebih dari 10 mode pengalamatan.
          </Bullet>
          <Bullet color={cisc}>Biaya fabrikasi silikon lebih tinggi.</Bullet>
          <Bullet color={cisc}>Code footprint jauh lebih ringkas, menghemat RAM.</Bullet>
        </Card>
      </Grid>
      <div
        style={{
          marginTop: 28,
          padding: '20px 32px',
          borderRadius: 'var(--osd-radius)',
          background: '#0f172a',
          color: '#f8fafc',
          fontSize: 30,
          lineHeight: 1.4,
        }}
      >
        Trade-off: hardware lebih sederhana dan murah (RISC) vs. kode lebih ringkas dan hemat RAM (CISC).
      </div>
    </Body>
  </Canvas>
);

/* ---------- Pages 15–16 — Tabel perbandingan ---------- */

const tableCols = '340px 1fr 1fr';

const TableHead = () => (
  <div style={{ display: 'grid', gridTemplateColumns: tableCols }}>
    <div />
    <div
      style={{
        padding: '14px 24px',
        background: risc,
        color: '#fff',
        fontFamily: mono,
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: '0.12em',
        borderTopLeftRadius: 'var(--osd-radius)',
      }}
    >
      RISC
    </div>
    <div
      style={{
        padding: '14px 24px',
        background: cisc,
        color: '#fff',
        fontFamily: mono,
        fontSize: 30,
        fontWeight: 800,
        letterSpacing: '0.12em',
        borderTopRightRadius: 'var(--osd-radius)',
      }}
    >
      CISC
    </div>
  </div>
);

const TRow = ({ label, r, c }: { label: string; r: ReactNode; c: ReactNode }) => (
  <div style={{ display: 'grid', gridTemplateColumns: tableCols, borderTop: '1.5px solid rgba(15,23,42,0.08)' }}>
    <div
      style={{
        padding: '16px 24px',
        fontSize: 'var(--osd-size-body)',
        fontWeight: 800,
        lineHeight: 1.35,
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {label}
    </div>
    <div style={{ padding: '16px 24px', fontSize: 'var(--osd-size-body)', lineHeight: 1.4, background: 'rgba(5,150,105,0.07)' }}>
      {r}
    </div>
    <div style={{ padding: '16px 24px', fontSize: 'var(--osd-size-body)', lineHeight: 1.4, background: 'rgba(217,119,6,0.08)' }}>
      {c}
    </div>
  </div>
);

const tableWrap: CSSProperties = { ...cardBase, background: '#ffffff', boxShadow: '0 12px 32px rgba(15,23,42,0.08)' };

const TableOne: Page = () => (
  <Canvas background={gridBg('#f1f5f9', 'rgba(100,116,139,0.1)', 40)}>
    <Header
      eyebrow="Ringkasan Hasil"
      title="Tabel Perbandingan Parameter Kinerja"
      sub="Bagian 1: Karakteristik Teknis"
      color="#64748b"
      icon={icons.bars}
    />
    <Body>
      <div style={tableWrap}>
        <TableHead />
        <TRow
          label="Desain Instruksi"
          r="Set kecil, sederhana, ukuran tetap (umumnya 4 byte)."
          c="Set besar, kompleks, ukuran bervariasi (1–15 byte)."
        />
        <TRow
          label="Kecepatan & Siklus"
          r="1 siklus clock per instruksi; lebih cepat untuk instruksi dasar."
          c="2–4 siklus clock per instruksi kompleks."
        />
        <TRow
          label="Efisiensi Energi & Daya"
          r="Sangat hemat (1–2 W pada ARM Cortex-A)."
          c="Tinggi (45 W+ pada Intel Core i7), dikendalikan via DVFS."
        />
        <TRow
          label="Kompleksitas Sirkuit"
          r="Sederhana (hardwired control), biaya silikon lebih murah."
          c="Sangat kompleks (microcode control), biaya fabrikasi lebih tinggi."
        />
      </div>
    </Body>
  </Canvas>
);

const TableTwo: Page = () => (
  <Canvas
    background="linear-gradient(90deg, transparent calc(50% - 40px), rgba(15,23,42,0.05) 50%, transparent calc(50% + 40px)), #f8fafc"
  >
    <Header
      eyebrow="Ringkasan Hasil"
      title="Tabel Perbandingan Parameter Kinerja"
      sub="Bagian 2: Aplikasi & Pro-Kontra"
      color="#0284c7"
      icon={icons.monitor}
    />
    <Body>
      <div style={tableWrap}>
        <TableHead />
        <TRow
          label="Ukuran Kode Program"
          r="Lebih besar karena instruksi dieksekusi secara atomik."
          c="Lebih ringkas dan hemat memori utama (RAM)."
        />
        <TRow
          label="Aplikasi Utama Industri"
          r="Smartphone, tablet, IoT, Apple Silicon M-Series, Edge AI."
          c="PC desktop, laptop performa tinggi, server enterprise, workstation."
        />
        <TRow
          label="Prosesor Utama di Pasar"
          r="ARM Cortex-X4, SiFive P670 (RISC-V), Apple M1/M2/M3."
          c="Intel Core i9-13900K, AMD Ryzen 9 7950X, Intel Xeon."
        />
        <TRow
          label="Ringkasan Keunggulan"
          r="Efisiensi daya tinggi, pipelining optimal, desain rasional."
          c="Kepadatan kode tinggi, kaya mode pengalamatan, kompatibel dengan software legacy."
        />
      </div>
    </Body>
  </Canvas>
);

/* ---------- Page 17 — Konvergensi hibrida ---------- */

const Network = () => (
  <svg width="1920" height="1080" viewBox="0 0 1920 1080" fill="none" style={{ position: 'absolute', inset: 0 }}>
    <g stroke="#7c3aed" strokeOpacity="0.25" strokeWidth="2">
      <line x1="1500" y1="60" x2="1640" y2="150" />
      <line x1="1640" y1="150" x2="1800" y2="90" />
      <line x1="1640" y1="150" x2="1720" y2="250" />
      <line x1="1800" y1="90" x2="1860" y2="210" />
      <line x1="60" y1="880" x2="190" y2="980" />
      <line x1="190" y1="980" x2="350" y2="1030" />
      <line x1="190" y1="980" x2="90" y2="1050" />
    </g>
    <g fill="#06b6d4" fillOpacity="0.45">
      <circle cx="1500" cy="60" r="8" />
      <circle cx="1640" cy="150" r="10" />
      <circle cx="1800" cy="90" r="8" />
      <circle cx="1720" cy="250" r="7" />
      <circle cx="1860" cy="210" r="7" />
      <circle cx="60" cy="880" r="8" />
      <circle cx="190" cy="980" r="10" />
      <circle cx="350" cy="1030" r="7" />
      <circle cx="90" cy="1050" r="7" />
    </g>
  </svg>
);

const Node = ({ color, strong, children }: { color: string; strong?: boolean; children: ReactNode }) => (
  <div
    style={{
      padding: '16px 24px',
      borderRadius: 14,
      background: strong ? color : 'rgba(255,255,255,0.92)',
      color: strong ? '#fff' : '#0f172a',
      border: `2px solid ${color}`,
      fontFamily: mono,
      fontSize: 24,
      fontWeight: 700,
      lineHeight: 1.25,
      textAlign: 'center',
    }}
  >
    {children}
  </div>
);

const Convergence: Page = () => (
  <Canvas background="linear-gradient(135deg, #f3e8ff 0%, #cffafe 100%)" decor={<Network />}>
    <Header eyebrow="Implikasi Modern" title="Konvergensi Hibrida Arsitektur" color="#8b5cf6" icon={icons.branch} />
    <Body>
      <Lead>Batas teoretis RISC dan CISC kini memudar lewat pendekatan konvergensi hibrida:</Lead>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16, marginBottom: 28 }}>
        <Node color={cisc}>Instruksi x86 (CISC)</Node>
        <Ico color="#7c3aed" size={36}>
          {icons.chevron}
        </Ico>
        <Node color="#7c3aed">Dekoder internal</Node>
        <Ico color="#7c3aed" size={36}>
          {icons.chevron}
        </Ico>
        <Node color={risc} strong>
          µops mirip RISC
        </Node>
        <Ico color="#7c3aed" size={36}>
          {icons.chevron}
        </Ico>
        <Node color="#7c3aed">Mesin superscalar out-of-order</Node>
      </div>
      <Grid cols="1fr 1fr 1fr">
        <Card color={cisc} title="CISC Modern" titleSize={34} sub="AMD Zen & Intel Core">
          <Text>
            Dekoder internal menerjemahkan instruksi x86 kompleks menjadi micro-operations (uops)
            sederhana sebelum dieksekusi.
          </Text>
        </Card>
        <Card color={risc} title="RISC Modern" titleSize={34} sub="Apple M-Series & ARM Neoverse">
          <Text>
            Menambah instruksi khusus vektor dan matriks (ARM SME/SVE) untuk mempercepat AI dan grafis.
          </Text>
        </Card>
        <Card color="#7c3aed" title="Lapisan Software" titleSize={34} sub="C/C++, Python, LLVM/GCC">
          <Text>
            Berjalan agnostik lewat kompilator pengoptimal yang memanfaatkan ekstensi hardware secara
            adaptif.
          </Text>
        </Card>
      </Grid>
    </Body>
  </Canvas>
);

/* ---------- Page 18 — Kelebihan & kekurangan ---------- */

const ProsCons: Page = () => (
  <Canvas
    background="linear-gradient(90deg, rgba(5,150,105,0.09) 50%, rgba(220,38,38,0.07) 50%), #f3f4f6"
  >
    <Header eyebrow="Evaluasi Kritis" title="Kelebihan dan Kekurangan Penelitian Jurnal" color="#6366f1" icon={icons.check} />
    <Body>
      <Grid cols="1fr 1fr">
        <Card color={risc} tag="KELEBIHAN" title="Kelebihan Penelitian">
          <Bullet color={risc}>
            Memaparkan parameter mikroarsitektur kritis, efisiensi daya, dan konvergensi hibrida.
          </Bullet>
          <Bullet color={risc}>
            Data teknis terkini: ARM Cortex-X4, RISC-V SiFive P670, Intel Raptor Lake, AMD Zen 4.
          </Bullet>
          <Bullet color={risc}>
            Kerangka analisis sistematis dan relevan dengan industri semikonduktor terkini.
          </Bullet>
        </Card>
        <Card color={danger} tag="KEKURANGAN" title="Kekurangan Penelitian">
          <Bullet color={danger}>
            Bergantung pada literatur kualitatif dan data sekunder, tanpa pengujian benchmark hardware
            empiris (benchtop testing).
          </Bullet>
          <Bullet color={danger}>
            Data CPI terbatas pada angka rata-rata umum yang bervariasi menurut kompilator.
          </Bullet>
        </Card>
      </Grid>
    </Body>
  </Canvas>
);

/* ---------- Page 19 — Kesimpulan ---------- */

const Conclusion = ({
  n,
  title,
  color,
  children,
}: {
  n: string;
  title: string;
  color: string;
  children: ReactNode;
}) => (
  <div
    style={{
      ...cardBase,
      display: 'grid',
      gridTemplateColumns: '120px 1fr',
      gap: 32,
      alignItems: 'center',
      padding: '24px 40px',
      borderLeft: `8px solid ${color}`,
    }}
  >
    <div style={{ fontFamily: mono, fontSize: 88, fontWeight: 800, lineHeight: 1, color }}>{n}</div>
    <div>
      <div style={{ fontSize: 38, fontWeight: 800, lineHeight: 1.2 }}>{title}</div>
      <div style={{ fontSize: 'var(--osd-size-body)', lineHeight: 1.45, marginTop: 6, color: muted }}>
        {children}
      </div>
    </div>
  </div>
);

const Frame = () => (
  <div
    style={{
      position: 'absolute',
      inset: 32,
      borderRadius: 28,
      border: '6px solid rgba(37,99,235,0.35)',
      boxShadow: 'inset 0 0 0 2px rgba(255,255,255,0.7)',
    }}
  />
);

const Conclusions: Page = () => (
  <Canvas
    background="radial-gradient(circle at 20% 10%, rgba(59,130,246,0.22), transparent 50%), radial-gradient(circle at 90% 90%, rgba(14,165,233,0.2), transparent 50%), #e6f0ff"
    decor={<Frame />}
  >
    <Header eyebrow="Penutup" title="Kesimpulan Utama Penelitian" color="#059669" icon={icons.thumb} />
    <Body>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
        <Conclusion n="1" title="Dominasi Efisiensi RISC" color={risc}>
          RISC unggul dalam efisiensi energi (1–2 W), kesederhanaan hardware, dan kecepatan instruksi dasar
          1 siklus — standar utama mobile dan IoT.
        </Conclusion>
        <Conclusion n="2" title="Kepadatan Kode CISC" color={cisc}>
          CISC unggul dalam kepadatan kode biner dan komputasi kompleks mandiri, tetap dominan di server dan
          desktop performa tinggi.
        </Conclusion>
        <Conclusion n="3" title="Era Konvergensi Hibrida" color="#2563eb">
          RISC dan CISC tidak lagi dipisahkan kaku, melainkan bermigrasi ke hibridisasi mikro-operasi
          internal demi efisiensi daya-per-watt yang optimal.
        </Conclusion>
      </div>
    </Body>
  </Canvas>
);

/* ---------- Page 20 — Rekomendasi ---------- */

const Recommendations: Page = () => (
  <Canvas
    background="radial-gradient(circle at 85% 15%, rgba(13,148,136,0.18), transparent 40%), repeating-radial-gradient(circle at 92% 8%, rgba(13,148,136,0.1) 0 2px, transparent 2px 56px), #e6faf7"
  >
    <Header eyebrow="Penutup" title="Rekomendasi & Saran Strategis" color="#0d9488" icon={icons.compass} />
    <Body>
      <Grid cols="1fr 1fr">
        <Card color="#0d9488" tag="01" title="Peneliti Lanjutan" titleSize={36}>
          <Text>
            Benchmarking empiris kuantitatif pada beban kerja nyata untuk mengukur waktu eksekusi, pelepasan
            termal, dan daya presisi.
          </Text>
        </Card>
        <Card color="#0d9488" tag="02" title="Pengembang Perangkat Keras" titleSize={36}>
          <Text>
            Perluas integrasi akselerator domain-spesifik seperti NPU pada arsitektur load/store terbuka
            (RISC-V).
          </Text>
        </Card>
        <Card color="#0d9488" tag="03" title="Pengembang Perangkat Lunak" titleSize={36}>
          <Text>
            Optimalkan profil kompilator modern (LLVM/GCC) yang adaptif terhadap vektorisasi hardware
            target.
          </Text>
        </Card>
        <Card color="#0d9488" tag="04" title="Institusi Akademis & Mahasiswa" titleSize={36}>
          <Text>
            Tekankan hibridisasi arsitektur modern dan assembly tingkat rendah di samping teori klasik
            RISC/CISC.
          </Text>
        </Card>
      </Grid>
    </Body>
  </Canvas>
);

export const meta: SlideMeta = {
  title: 'RISC vs CISC: Studi Kinerja dan Efisiensi',
  createdAt: '2026-11-03T03:02:24Z',
};

export default [
  Cover,
  Journal,
  Background,
  Problem,
  Questions,
  Flynn,
  Metrics,
  RiscTraits,
  CiscTraits,
  Methodology,
  Workflow,
  Performance,
  Energy,
  Silicon,
  TableOne,
  TableTwo,
  Convergence,
  ProsCons,
  Conclusions,
  Recommendations,
] satisfies Page[];
