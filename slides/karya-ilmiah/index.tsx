import {
  type DesignSystem,
  type Page,
  type SlideMeta,
  type SlideTransition,
  useSlidePageNumber,
} from '@open-slide/core';
import type { CSSProperties, ReactNode } from 'react';

// Web fonts injection: Plus Jakarta Sans (Modern Clean Body), Newsreader (Editorial Serif Headings), JetBrains Mono (Labels)
const FONT_HREF =
  'https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@500;600;700&family=Newsreader:ital,opsz,wght@0,6..72,500;0,6..72,600;0,6..72,700;1,6..72,400&family=Plus+Jakarta+Sans:ital,wght@0,400;0,500;0,600;0,700;0,800;1,400&display=swap';
const FONT_LINK_ID = 'osd-webfont-karya-ilmiah';

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
    hero: 132,
    body: 32,
  },
  radius: 16,
};

const fontSerif = '"Newsreader", Georgia, serif';
const fontMono = '"JetBrains Mono", ui-monospace, monospace';

const colors = {
  gold: '#c59b27',
  goldBright: '#d4af37',
  goldDark: '#996515',
  goldDeep: '#7c4d0a',
  goldSoft: 'rgba(212, 175, 55, 0.12)',
  goldBorder: 'rgba(197, 155, 39, 0.35)',
  goldBorderLight: 'rgba(197, 155, 39, 0.18)',

  ink: '#171512',
  muted: '#57534e',
  dim: '#857e75',
  cardBg: 'rgba(255, 255, 255, 0.92)',
  cardBorder: 'rgba(212, 175, 55, 0.28)',
  cardShadow: '0 10px 28px -4px rgba(184, 134, 11, 0.08), 0 2px 8px -1px rgba(0, 0, 0, 0.04)',
};

const canvasStyle: CSSProperties = {
  width: '100%',
  height: '100%',
  padding: '80px 120px',
  boxSizing: 'border-box',
  display: 'flex',
  flexDirection: 'column',
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
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

// ================= SHARED UI PIECES =================

const Eyebrow = ({ children }: { children: ReactNode }) => (
  <div
    style={{
      fontFamily: fontMono,
      fontSize: 22,
      fontWeight: 600,
      letterSpacing: '0.24em',
      color: colors.goldDark,
      textTransform: 'uppercase',
      display: 'flex',
      alignItems: 'center',
      gap: 16,
    }}
  >
    <span style={{ width: 44, height: 2, background: colors.goldBright, display: 'inline-block' }} />
    {children}
  </div>
);

const PageTitle = ({ children }: { children: ReactNode }) => (
  <h2
    style={{
      fontFamily: fontSerif,
      fontSize: 68,
      fontWeight: 700,
      lineHeight: 1.15,
      color: colors.ink,
      margin: '20px 0 0',
    }}
  >
    {children}
  </h2>
);

const Footer = () => {
  const pageNumber = useSlidePageNumber();
  return (
    <div
      style={{
        position: 'absolute',
        left: 120,
        right: 120,
        bottom: 44,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTop: `1px solid ${colors.goldBorderLight}`,
        paddingTop: 18,
      }}
    >
      <div
        style={{
          fontFamily: fontMono,
          fontSize: 18,
          letterSpacing: '0.18em',
          color: colors.dim,
          textTransform: 'uppercase',
        }}
      >
        Karya Ilmiah — Struktur &amp; Definisi
      </div>
      <div style={{ fontFamily: fontMono, fontSize: 18, color: colors.goldDark }}>
        {String(pageNumber.current).padStart(2, '0')} / {String(pageNumber.total).padStart(2, '0')}
      </div>
    </div>
  );
};

const DocIcon = ({ size = 30, color = colors.goldDark }: { size?: number; color?: string }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <path d="M14 2v6h6" />
    <path d="M9 13h6" />
    <path d="M9 17h6" />
  </svg>
);

const QuoteIcon = ({ size = 44, color = colors.goldBright }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill={color}>
    <path d="M10 7H6a3 3 0 0 0-3 3v7h7v-7H6.5A2.5 2.5 0 0 1 9 7.5V7h1Zm11 0h-4a3 3 0 0 0-3 3v7h7v-7h-3.5A2.5 2.5 0 0 1 20 7.5V7h1Z" />
  </svg>
);

// ================= PAGE 1 — COVER =================

const Cover: Page = () => (
  <div style={{ ...canvasStyle, justifyContent: 'center', padding: '0 160px', position: 'relative' }}>
    {/* Decorative gold frame */}
    <div
      style={{
        position: 'absolute',
        inset: 56,
        border: `1px solid ${colors.goldBorderLight}`,
        borderRadius: 24,
        pointerEvents: 'none',
      }}
    />
    <div
      style={{
        marginBottom: 36,
        width: 88,
        height: 88,
        borderRadius: 20,
        background: colors.goldSoft,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <DocIcon size={46} />
    </div>
    <Eyebrow>Materi Bahasa Indonesia Akademik</Eyebrow>
    <h1
      style={{
        fontFamily: fontSerif,
        fontSize: 'var(--osd-size-hero)',
        fontWeight: 700,
        lineHeight: 1.08,
        color: colors.ink,
        margin: '28px 0 0',
      }}
    >
      Karya Ilmiah
    </h1>
    <p
      style={{
        fontSize: 38,
        fontFamily: fontSerif,
        fontStyle: 'italic',
        color: colors.goldDark,
        margin: '18px 0 0',
      }}
    >
      Struktur dan Definisinya
    </p>
    <p
      style={{
        fontSize: 'var(--osd-size-body)',
        lineHeight: 1.6,
        color: colors.muted,
        maxWidth: 1100,
        margin: '36px 0 0',
      }}
    >
      Memahami pengertian, ciri-ciri, serta sistematika penulisan karya ilmiah yang benar sesuai kaidah keilmuan.
    </p>
    <Footer />
  </div>
);

// ================= PAGE 2 — DEFINISI =================

const Definisi: Page = () => (
  <div style={{ ...canvasStyle, position: 'relative' }}>
    <Eyebrow>Definisi</Eyebrow>
    <PageTitle>Apa itu Karya Ilmiah?</PageTitle>

    <div
      style={{
        marginTop: 48,
        background: colors.cardBg,
        border: `1px solid ${colors.cardBorder}`,
        borderLeft: `6px solid ${colors.goldBright}`,
        borderRadius: 'var(--osd-radius)',
        boxShadow: colors.cardShadow,
        padding: '40px 48px',
        display: 'flex',
        gap: 28,
        alignItems: 'flex-start',
      }}
    >
      <QuoteIcon />
      <div>
        <div
          style={{
            fontFamily: fontSerif,
            fontSize: 40,
            lineHeight: 1.45,
            color: colors.ink,
          }}
        >
          Karya ilmiah adalah tulisan yang membahas suatu masalah berdasarkan{' '}
          <span style={{ color: colors.goldDark, fontWeight: 600 }}>kaidah keilmuan</span>, disusun secara{' '}
          <span style={{ color: colors.goldDark, fontWeight: 600 }}>sistematis</span>, dan dapat{' '}
          <span style={{ color: colors.goldDark, fontWeight: 600 }}>dipertanggungjawabkan</span> kebenarannya.
        </div>
        <div style={{ marginTop: 20, fontFamily: fontMono, fontSize: 20, color: colors.dim, letterSpacing: '0.08em' }}>
          — KBBI &amp; PUEBI, diringkas
        </div>
      </div>
    </div>

    <div style={{ display: 'flex', gap: 24, marginTop: 40 }}>
      {[
        ['Objektif', 'Berdasarkan data & fakta, bukan opini pribadi'],
        ['Logis', 'Dapat diterima akal dan bernalar'],
        ['Sistematis', 'Terstruktur mengikuti pola baku'],
      ].map(([t, d]) => (
        <div
          key={t}
          style={{
            flex: 1,
            background: colors.goldSoft,
            border: `1px solid ${colors.goldBorderLight}`,
            borderRadius: 'var(--osd-radius)',
            padding: '26px 30px',
          }}
        >
          <div style={{ fontFamily: fontSerif, fontSize: 32, fontWeight: 700, color: colors.goldDeep }}>{t}</div>
          <div style={{ fontSize: 24, lineHeight: 1.45, color: colors.muted, marginTop: 10 }}>{d}</div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

// ================= PAGE 3 — CIRI-CIRI =================

const CiriCiri: Page = () => (
  <div style={{ ...canvasStyle, position: 'relative' }}>
    <Eyebrow>Karakteristik</Eyebrow>
    <PageTitle>Ciri-Ciri Karya Ilmiah</PageTitle>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 32px', marginTop: 52 }}>
      {[
        ['Logis', 'Penalarannya runtut dan dapat diterima oleh akal sehat pembaca.'],
        ['Objektif', 'Isinya sesuai fakta dan data, tidak dipengaruhi pandangan pribadi penulis.'],
        ['Sistematis', 'Disusun berurutan dalam struktur baku yang saling berkaitan.'],
        ['Baku', 'Menggunakan bahasa resmi, ejaan yang disempurnakan, dan istilah ilmiah.'],
        ['Lugas', 'Menyatakan informasi secara jelas, tanpa kiasan atau basa-basi.'],
        ['Dapat diuji', 'Benar atau salahnya bisa dibuktikan kembali oleh orang lain.'],
      ].map(([t, d], i) => (
        <div
          key={t}
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'flex-start',
            background: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 'var(--osd-radius)',
            boxShadow: colors.cardShadow,
            padding: '28px 32px',
          }}
        >
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 26,
              fontWeight: 700,
              color: colors.goldDark,
              background: colors.goldSoft,
              borderRadius: 12,
              width: 56,
              height: 56,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <div>
            <div style={{ fontFamily: fontSerif, fontSize: 34, fontWeight: 700, color: colors.ink }}>{t}</div>
            <div style={{ fontSize: 25, lineHeight: 1.5, color: colors.muted, marginTop: 6 }}>{d}</div>
          </div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

// ================= PAGE 4 — STRUKTUR UMUM =================

const Struktur: Page = () => (
  <div style={{ ...canvasStyle, position: 'relative' }}>
    <Eyebrow>Sistematika</Eyebrow>
    <PageTitle>Struktur Umum Karya Ilmiah</PageTitle>

    <div style={{ marginTop: 44, display: 'flex', flexDirection: 'column', gap: 22 }}>
      {[
        ['Judul', 'Ringkas, jelas, dan mencerminkan isi serta masalah yang dikaji.'],
        ['Abstrak', 'Ringkasan menyeluruh: tujuan, metode, hasil, dan kesimpulan.'],
        ['Pendahuluan', 'Latar belakang, rumusan masalah, tujuan, dan manfaat penelitian.'],
        ['Landasan Teori & Metode', 'Teori pendukung, objek penelitian, serta langkah kajian.'],
        ['Pembahasan', 'Inti kajian: analisis data dan jawaban atas rumusan masalah.'],
        ['Penutup', 'Kesimpulan yang menjawab tujuan, disertai saran bila diperlukan.'],
        ['Daftar Pustaka', 'Sumber rujukan: buku, jurnal, dan artikel yang dikutip.'],
      ].map(([t, d], i) => (
        <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 26 }}>
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: '50%',
              background: i === 4 ? colors.gold : colors.goldSoft,
              border: `1.5px solid ${i === 4 ? colors.gold : colors.goldBorder}`,
              color: i === 4 ? '#ffffff' : colors.goldDark,
              fontFamily: fontMono,
              fontSize: 24,
              fontWeight: 700,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {i + 1}
          </div>
          <div
            style={{
              flex: 1,
              display: 'flex',
              alignItems: 'baseline',
              gap: 24,
              background: colors.cardBg,
              border: `1px solid ${colors.cardBorder}`,
              borderRadius: 'var(--osd-radius)',
              padding: '16px 30px',
            }}
          >
            <div
              style={{
                fontFamily: fontSerif,
                fontSize: 30,
                fontWeight: 700,
                color: i === 4 ? colors.goldDeep : colors.ink,
                minWidth: 380,
              }}
            >
              {t}
            </div>
            <div style={{ fontSize: 23, lineHeight: 1.4, color: colors.muted }}>{d}</div>
          </div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

// ================= PAGE 5 — JENIS & KONDISI KEILMUAN =================

const JenisKaryaIlmiah: Page = () => (
  <div style={{ ...canvasStyle, position: 'relative' }}>
    <Eyebrow>Taxonomi</Eyebrow>
    <PageTitle>Jenis Karya Ilmiah dan Kondisi Keilmuan</PageTitle>
    <p style={{ fontSize: 26, lineHeight: 1.5, color: colors.muted, margin: '18px 0 0', maxWidth: 1300 }}>
      Setiap jenis karya ilmiah menempati satu titik pada spektrum keilmuan — dari yang murni mencari{' '}
      <span style={{ color: colors.goldDark, fontWeight: 600 }}>kebenaran teoritis</span> hingga yang berorientasi{' '}
      <span style={{ color: colors.goldDark, fontWeight: 600 }}>pemecahan masalah praktis</span>.
    </p>

    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 28, marginTop: 44 }}>
      {[
        [
          'Makalah',
          'Kajian singkat suatu masalah',
          'Kondisi keilmuan: membahas isu terbatas dengan argumen logis berbasis pustaka.',
          'Struktur: pendahuluan – pembahasan – penutup; biasanya tanpa metodologi penelitian.',
        ],
        [
          'Skripsi',
          'Karya ilmiah jenjang S-1',
          'Kondisi keilmuan: menerapkan metode penelitian yang sudah mapan pada suatu kasus.',
          'Struktur lengkap lima bab: pendahuluan, teori & metode, hasil, pembahasan, penutup.',
        ],
        [
          'Tesis',
          'Karya ilmiah jenjang S-2',
          'Kondisi keilmuan: menguji, mengembangkan, atau menganalisis lebih dalam suatu teori.',
          'Mensyaratkan kontribusi analisis yang lebih tajam dan metodologi yang lebih rigor.',
        ],
        [
          'Disertasi',
          'Karya ilmiah jenjang S-3',
          'Kondisi keilmuan: menemukan pengetahuan/teori baru yang orisinal dan dapat diuji.',
          'Kebaruan (novelty) menjadi syarat utama; dipertahankan di hadapan tim penguji.',
        ],
      ].map(([t, sub, kondisi, struktur], i) => (
        <div
          key={t}
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 'var(--osd-radius)',
            boxShadow: colors.cardShadow,
            padding: '28px 28px',
            display: 'flex',
            flexDirection: 'column',
            borderTop: `4px solid ${colors.goldBright}`,
          }}
        >
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 18,
              letterSpacing: '0.18em',
              color: colors.dim,
              textTransform: 'uppercase',
            }}
          >
            {String(i + 1).padStart(2, '0')} / Tingkat kompleksitas
          </div>
          <div style={{ fontFamily: fontSerif, fontSize: 38, fontWeight: 700, color: colors.ink, marginTop: 10 }}>{t}</div>
          <div style={{ fontFamily: fontSerif, fontStyle: 'italic', fontSize: 23, color: colors.goldDark, marginTop: 4 }}>
            {sub}
          </div>
          <div style={{ fontSize: 21, lineHeight: 1.45, color: colors.muted, marginTop: 16 }}>{kondisi}</div>
          <div
            style={{
              marginTop: 'auto',
              paddingTop: 16,
              borderTop: `1px dashed ${colors.goldBorder}`,
              fontSize: 20,
              lineHeight: 1.45,
              color: colors.dim,
            }}
          >
            {struktur}
          </div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

// ================= PAGE 6 — KETENTUAN/KETENTUAN PENULISAN =================

const KetentuanPenulisan: Page = () => (
  <div style={{ ...canvasStyle, position: 'relative' }}>
    <Eyebrow>Kaidah Penulisan</Eyebrow>
    <PageTitle>Ketentuan dan Syarat Karya Ilmiah</PageTitle>

    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '28px 32px', marginTop: 48 }}>
      {[
        ['Berpijak pada fakta', 'Setiap pernyataan didukung data, bukti, atau rujukan yang dapat ditelusuri — bukan asumsi pribadi.'],
        ['Bahasa baku dan lugas', 'Memakai ejaan resmi (EYD), kalimat efektif, istilah ilmiah, serta bebas dari makna kiasan.'],
        ['Bersifat impersonal', 'Menghindari sudut pandang orang pertama; penulis melebur ke dalam objek yang dikaji.'],
        ['Konsisten dan koheren', 'Istilah, format sitasi, dan alur antarbagian konsisten dari judul sampai daftar pustaka.'],
        ['Sitasi dan anti-plagiasi', 'Gagasan orang lain wajib diakui lewat kutipan langsung/tidak langsung dan daftar pustaka.'],
        ['Dapat direplikasi', 'Metode ditulis cukup rinci sehingga peneliti lain dapat mengulang kajian dan menguji hasilnya.'],
      ].map(([t, d], i) => (
        <div
          key={t}
          style={{
            display: 'flex',
            gap: 24,
            alignItems: 'flex-start',
            background: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 'var(--osd-radius)',
            boxShadow: colors.cardShadow,
            padding: '26px 30px',
          }}
        >
          <div
            style={{
              fontFamily: fontMono,
              fontSize: 24,
              fontWeight: 700,
              color: colors.goldDark,
              background: colors.goldSoft,
              borderRadius: 12,
              width: 52,
              height: 52,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}
          >
            {String(i + 1).padStart(2, '0')}
          </div>
          <div>
            <div style={{ fontFamily: fontSerif, fontSize: 32, fontWeight: 700, color: colors.ink }}>{t}</div>
            <div style={{ fontSize: 24, lineHeight: 1.5, color: colors.muted, marginTop: 6 }}>{d}</div>
          </div>
        </div>
      ))}
    </div>
    <Footer />
  </div>
);

// ================= PAGE 7 — PENUTUP =================

const Penutup: Page = () => (
  <div
    style={{
      ...canvasStyle,
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      position: 'relative',
    }}
  >
    <Eyebrow>Poin Penting</Eyebrow>
    <h2
      style={{
        fontFamily: fontSerif,
        fontSize: 76,
        fontWeight: 700,
        lineHeight: 1.2,
        color: colors.ink,
        margin: '32px 0 0',
        maxWidth: 1400,
      }}
    >
      Ilmiah berarti <span style={{ color: colors.goldDark }}>terukur</span>:<br />
      struktur yang sistematis, isi yang objektif.
    </h2>

    <div style={{ marginTop: 48, display: 'flex', gap: 18, justifyContent: 'center', flexWrap: 'wrap' }}>
      {[
        ['Definisi', 'Berlandaskan kaidah keilmuan'],
        ['Ciri-ciri', 'Logis, objektif, sistematis'],
        ['Struktur', 'Judul hingga daftar pustaka'],
        ['Jenis', 'Makalah → skripsi → tesis → disertasi'],
        ['Ketentuan', 'Fakta, bahasa baku, sitasi'],
      ].map(([t, d]) => (
        <div
          key={t}
          style={{
            background: colors.cardBg,
            border: `1px solid ${colors.cardBorder}`,
            borderRadius: 999,
            boxShadow: colors.cardShadow,
            padding: '16px 30px',
            display: 'flex',
            alignItems: 'baseline',
            gap: 12,
          }}
        >
          <span style={{ fontFamily: fontSerif, fontSize: 27, fontWeight: 700, color: colors.goldDeep }}>{t}</span>
          <span style={{ fontSize: 20, color: colors.muted }}>{d}</span>
        </div>
      ))}
    </div>

    <div
      style={{
        marginTop: 44,
        display: 'flex',
        gap: 20,
        alignItems: 'center',
        justifyContent: 'center',
        background: colors.goldSoft,
        border: `1px solid ${colors.goldBorder}`,
        borderRadius: 999,
        padding: '22px 44px',
      }}
    >
      <span style={{ fontFamily: fontMono, fontSize: 24, fontWeight: 600, color: colors.goldDeep }}>DEFINISI</span>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors.goldBright }} />
      <span style={{ fontFamily: fontMono, fontSize: 24, fontWeight: 600, color: colors.goldDeep }}>CIRI-CIRI</span>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors.goldBright }} />
      <span style={{ fontFamily: fontMono, fontSize: 24, fontWeight: 600, color: colors.goldDeep }}>STRUKTUR</span>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors.goldBright }} />
      <span style={{ fontFamily: fontMono, fontSize: 24, fontWeight: 600, color: colors.goldDeep }}>JENIS</span>
      <span style={{ width: 8, height: 8, borderRadius: '50%', background: colors.goldBright }} />
      <span style={{ fontFamily: fontMono, fontSize: 24, fontWeight: 600, color: colors.goldDeep }}>KETENTUAN</span>
    </div>

    <p
      style={{
        marginTop: 40,
        fontFamily: fontSerif,
        fontStyle: 'italic',
        fontSize: 30,
        color: colors.muted,
        maxWidth: 1100,
        lineHeight: 1.5,
      }}
    >
      Terima kasih — saatnya mempraktikkan: bedah satu contoh karya ilmiah dan kenali seluruh bagiannya.
    </p>
    <Footer />
  </div>
);

// ================= EXPORTS =================

export const meta: SlideMeta = {
  title: 'Karya Ilmiah: Struktur dan Definisi',
  createdAt: '2026-10-27T08:52:51Z',
};

export const notes: (string | undefined)[] = [
  'Buka dengan pertanyaan pemantik: "Apa bedanya karya ilmiah dengan tulisan biasa?" Lalu perkenalkan topik: definisi, ciri-ciri, dan struktur karya ilmiah.',
  'Bayakan definisi KBBI, tekankan tiga kata kunci: kaidah keilmuan, sistematis, dapat dipertanggungjawabkan. Hubungkan dengan tiga kartu di bawahnya.',
  'Jelaskan enam ciri satu per satu; beri contoh kontras — misalnya opini di media sosial (tidak lugas, tidak dapat diuji) versus artikel jurnal.',
  'Telusuri tujuh bagian struktur dari judul sampai daftar pustaka. Tekankan bahwa "Pembahasan" adalah inti karya — bagian paling tebal pada setiap skripsi atau makalah.',
  'Luruskan pemahaman jenis karya ilmiah: makalah → skripsi → tesis → disertasi, ordered by kedalaman kondisi keilmuannya — dari kajian isu terbatas hingga penemuan teori baru yang orisinal.',
  'Bahasan kaidah penulisan: fakta, bahasa baku, impersonal, konsistensi, sitasi/anti-plagiasi, dan replikabilitas. Kaitkan dengan pengalaman peserta saat menulis tugas.',
  'Tutup dengan merangkum alur: definisi → ciri-ciri → struktur → jenis → ketentuan. Ajak peserta memeriksa sebuah contoh karya ilmiah dan mengidentifikasi seluruh bagiannya.',
];

export default [Cover, Definisi, CiriCiri, Struktur, JenisKaryaIlmiah, KetentuanPenulisan, Penutup] satisfies Page[];
