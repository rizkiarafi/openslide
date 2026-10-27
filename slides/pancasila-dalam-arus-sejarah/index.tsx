import { useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

import bgGaruda from './assets/bg-garuda.svg';
import bgStar from './assets/bg-star.svg';
import bgTimeline from './assets/bg-timeline.svg';
import bgBanyan from './assets/bg-banyan.svg';
import bgChain from './assets/bg-chain.svg';
import bgPadi from './assets/bg-padi.svg';

export const design: DesignSystem = {
  palette: { bg: '#faf6ef', text: '#241a12', accent: '#b91c1c' },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
  typeScale: { hero: 120, body: 34 },
  radius: 16,
};

const muted = '#7a6a58';
const gold = '#a16207';
const line = '#e5d9c6';

const fill = {
  width: '100%',
  height: '100%',
  position: 'relative' as const,
  overflow: 'hidden' as const,
  background: 'var(--osd-bg)',
  color: 'var(--osd-text)',
  fontFamily: 'var(--osd-font-body)',
};

const bgStyle = {
  position: 'absolute' as const,
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover' as const,
  pointerEvents: 'none' as const,
};

const Frame = ({ children, image }: { children: React.ReactNode; image: string }) => (
  <div style={fill}>
    <img src={image} alt="" style={bgStyle} />
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: '100px 130px 90px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
      {children}
    </div>
  </div>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.22em', color: 'var(--osd-accent)', textTransform: 'uppercase' }}>
    {children}
  </div>
);

const H = ({ children }: { children: React.ReactNode }) => (
  <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 60, fontWeight: 800, lineHeight: 1.15, margin: '18px 0 0' }}>
    {children}
  </h2>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 40 }}>
      <span style={{ fontSize: 21, color: muted, letterSpacing: '0.06em' }}>
        Pendidikan Pancasila — BAB II · Pancasila dalam Arus Sejarah Bangsa Indonesia
      </span>
      <span style={{ fontSize: 21, color: muted, fontVariantNumeric: 'tabular-nums' }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li style={{ display: 'flex', gap: 22, alignItems: 'baseline', marginBottom: 28 }}>
    <span style={{ width: 12, height: 12, borderRadius: 999, background: 'var(--osd-accent)', flexShrink: 0, transform: 'translateY(-2px)' }} />
    <span>{children}</span>
  </li>
);

/* ── 1 · Cover ─────────────────────────────────────────────── */
const Cover: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 160px', boxSizing: 'border-box' }}>
    <img src={bgGaruda} alt="" style={bgStyle} />
    <div style={{ position: 'relative' }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.3em', color: gold, textTransform: 'uppercase' }}>
        Pendidikan Pancasila
      </div>
      <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 'var(--osd-size-hero)', fontWeight: 900, lineHeight: 1.08, margin: '36px 0 0', maxWidth: 1500 }}>
        Bagaimana Pancasila dalam <span style={{ color: 'var(--osd-accent)' }}>Arus Sejarah</span> Bangsa Indonesia?
      </h1>
      <div style={{ marginTop: 48, fontSize: 36, color: muted, fontStyle: 'italic', fontFamily: 'var(--osd-font-display)' }}>
        BAB II — Menelusuri konsep dan urgensi Pancasila dalam kajian sejarah bangsa
      </div>
    </div>
  </div>
);

/* ── 2 · Peta Bahasan ──────────────────────────────────────── */
const PetaBahasan: Page = () => (
  <Frame image={bgTimeline}>
    <Eyebrow>Peta Bahasan</Eyebrow>
    <H>Enam sudut pandang satu bab</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 80, rowGap: 34, marginTop: 56 }}>
      <MapItem n="A" t="Konsep & Urgensi" d="Pancasila dalam tiga periode: pengusulan, perumusan, pengesahan." />
      <MapItem n="B" t="Alasan Diperlukan" d="Identitas, kepribadian, pandangan hidup, jiwa bangsa, perjanjian luhur." />
      <MapItem n="C" t="Tiga Sumber" d="Sumber historis, sosiologis, dan politis nilai-nilai Pancasila." />
      <MapItem n="D" t="Dinamika & Tantangan" d="Pasang surut pemahaman dan pelaksanaan Pancasila." />
      <MapItem n="E" t="Esensi & Urgensi" d="Philosophische grondslag dan weltanschauung untuk masa depan." />
      <MapItem n="F" t="Pengertian & Pentingnya" d="Produk otentik pendiri negara yang tetap bertahan." />
    </div>
    <Footer />
  </Frame>
);

const MapItem = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <div style={{ display: 'flex', gap: 26, alignItems: 'flex-start' }}>
    <div style={{ width: 64, height: 64, borderRadius: 'var(--osd-radius)', background: 'var(--osd-accent)', color: '#fdf8f1', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'var(--osd-font-display)', fontSize: 32, fontWeight: 800, flexShrink: 0 }}>
      {n}
    </div>
    <div>
      <div style={{ fontSize: 32, fontWeight: 700 }}>{t}</div>
      <div style={{ fontSize: 26, color: muted, lineHeight: 1.45, marginTop: 6 }}>{d}</div>
    </div>
  </div>
);

/* ── 3 · Akar Nasionalisme & BPUPKI ────────────────────────── */
const AkarNasionalisme: Page = () => (
  <Frame image={bgStar}>
    <Eyebrow>A · Periode Pengusulan</Eyebrow>
    <H>Akar nasionalisme &amp; sidang BPUPKI pertama</H>
    <ul style={{ listStyle: 'none', padding: 0, margin: '52px 0 0', fontSize: 'var(--osd-size-body)', lineHeight: 1.5, maxWidth: 1560 }}>
      <Bullet>Cikal bakal ideologi bangsa diawali lahirnya <strong>rasa nasionalisme</strong>.</Bullet>
      <Bullet>Benih nasionalisme tertanam kuat dalam <strong>Perhimpunan Indonesia</strong>: persatuan &amp; solidaritas melawan penjajahan.</Bullet>
      <Bullet>BPUPKI dibentuk pemerintah pendudukan Jepang pada <strong>29 April 1945</strong>, beranggota 60 orang, diketuai <strong>dr. Rajiman Wedyodiningrat</strong>.</Bullet>
      <Bullet>Dilantik 28 Mei 1945; sidang pertama <strong>29 Mei – 1 Juni 1945</strong> membahas calon dasar negara.</Bullet>
      <Bullet>Pembicara usul dasar negara: <strong>Mr. Muh. Yamin, Ir. Soekarno, Ki Bagus Hadikusumo, Mr. Soepomo</strong>.</Bullet>
    </ul>
    <Footer />
  </Frame>
);

/* ── 4 · Pidato 1 Juni 1945 ────────────────────────────────── */
const PidatoSoekarno: Page = () => (
  <Frame image={bgGaruda}>
    <Eyebrow>A · Periode Pengusulan</Eyebrow>
    <H>1 Juni 1945 — lima gagasan Soekarno</H>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 26, marginTop: 52 }}>
      <SilaCard n="1" t="Nasionalisme" d="Kebangsaan Indonesia" />
      <SilaCard n="2" t="Internasionalisme" d="Peri Kemanusiaan" />
      <SilaCard n="3" t="Mufakat" d="Demokrasi" />
      <SilaCard n="4" t="Kesejahteraan Sosial" d="Keadilan bagi rakyat" />
      <SilaCard n="5" t="Ketuhanan" d="Yang berkebudayaan" />
    </div>
    <ul style={{ listStyle: 'none', padding: 0, margin: '48px 0 0', fontSize: 30, lineHeight: 1.5 }}>
      <Bullet>Nama <strong>PANCASILA</strong> lahir dari pidato ini; ditawarkan pula <strong>Trisila</strong> dan <strong>Ekasila</strong> (Gotong-Royong).</Bullet>
      <Bullet>Sidang menerima nama Pancasila sebagai <em>philosophische grondslag</em> &rarr; dibentuk panitia kecil 8 orang untuk menampung usul-usul.</Bullet>
    </ul>
    <Footer />
  </Frame>
);

const SilaCard = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <div style={{ border: `1px solid ${line}`, borderRadius: 'var(--osd-radius)', background: 'rgba(255, 253, 248, 0.75)', padding: '28px 24px', textAlign: 'center' }}>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 900, color: 'var(--osd-accent)' }}>{n}</div>
    <div style={{ fontSize: 26, fontWeight: 700, marginTop: 10, lineHeight: 1.25 }}>{t}</div>
    <div style={{ fontSize: 21, color: muted, marginTop: 8, lineHeight: 1.35 }}>{d}</div>
  </div>
);

/* ── 5 · Piagam Jakarta ────────────────────────────────────── */
const PiagamJakarta: Page = () => (
  <Frame image={bgChain}>
    <Eyebrow>A · Periode Perumusan</Eyebrow>
    <H>Sidang BPUPKI kedua &amp; Piagam Jakarta (10–16 Juli 1945)</H>
    <div style={{ borderLeft: '8px solid var(--osd-accent)', background: 'rgba(255,253,248,0.8)', borderRadius: '0 var(--osd-radius) var(--osd-radius) 0', padding: '30px 44px', marginTop: 46, fontSize: 30, lineHeight: 1.55, maxWidth: 1620 }}>
      Naskah awal “Pembukaan Hukum Dasar” disetujui — kemudian dikenal sebagai <strong>Piagam Jakarta</strong>, naskah awal pernyataan kemerdekaan. Rumusan sila pertamanya masih disertai <em>kewajiban menjalankan syariat Islam bagi pemeluk-pemeluknya</em>.
    </div>
    <ul style={{ listStyle: 'none', padding: 0, margin: '44px 0 0', fontSize: 30, lineHeight: 1.5 }}>
      <Bullet>Keseluruhan rumusan termaktub dalam <strong>alinea keempat</strong> Piagam Jakarta.</Bullet>
      <Bullet>Naskah ini kelak menjadi cikal bakal <strong>Pembukaan UUD 1945</strong> dengan sejumlah perubahan.</Bullet>
      <Bullet><strong>14 Agustus 1945</strong>: Jepang menyerah kepada Sekutu &rarr; kekosongan kekuasaan dimanfaatkan untuk mempercepat kemerdekaan.</Bullet>
    </ul>
    <Footer />
  </Frame>
);

/* ── 6 · Proklamasi ────────────────────────────────────────── */
const Proklamasi: Page = () => (
  <Frame image={bgStar}>
    <Eyebrow>A · Periode Pengesahan</Eyebrow>
    <H>Proklamasi 17 Agustus 1945</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 70, marginTop: 50, alignItems: 'start' }}>
      <div style={{ background: 'rgba(255,253,248,0.85)', border: `1px solid ${line}`, borderRadius: 'var(--osd-radius)', padding: '44px 52px', fontFamily: 'var(--osd-font-display)', fontSize: 34, lineHeight: 1.6, fontStyle: 'italic' }}>
        “Kami Bangsa Indonesia dengan ini menyatakan kemerdekaan Indonesia. Hal-hal yang mengenai pemindahan kekuasaan dll. diselenggarakan dengan cara saksama dan dalam tempo yang sesingkat-singkatnya.”
        <div style={{ fontStyle: 'normal', fontFamily: 'var(--osd-font-body)', fontSize: 26, color: muted, marginTop: 26 }}>
          Jakarta, 17 Agustus 1945 — Atas nama Bangsa Indonesia,<br /><strong>Soekarno – Hatta</strong>
        </div>
      </div>
      <ul style={{ listStyle: 'none', padding: 0, margin: 0, fontSize: 29, lineHeight: 1.5 }}>
        <Bullet>Teks didiktekan <strong>Moh. Hatta</strong>, ditulis <strong>Soekarno</strong> pada dini hari — wajar dijuluki <strong>Dwitunggal</strong>.</Bullet>
        <Bullet>Naskah diketik oleh <strong>Sayuti Melik</strong>.</Bullet>
        <Bullet>Piagam Jakarta tidak dibacakan pada 17 Agustus karena situasi politik berubah.</Bullet>
      </ul>
    </div>
    <Footer />
  </Frame>
);

/* ── 7 · Sidang PPKI 18 Agustus ────────────────────────────── */
const SidangPPKI: Page = () => (
  <Frame image={bgTimeline}>
    <Eyebrow>A · Periode Pengesahan</Eyebrow>
    <H>18 Agustus 1945 — sidang PPKI</H>
    <div style={{ fontSize: 29, color: muted, marginTop: 22, maxWidth: 1560, lineHeight: 1.5 }}>
      PPKI (dibentuk 7 Agustus, dibubarkan 29 Agustus 1945) menegaskan posisi Indonesia sebagai bangsa merdeka yang memerlukan dasar negara, UUD, pemimpin, dan perangkat pendukung lainnya.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 34, marginTop: 48 }}>
      <DecisionCard n="1" t="Mengesahkan UUD 1945" d="Pembukaan berasal dari Piagam Jakarta dengan beberapa perubahan; Batang Tubuh dari rancangan BPUPKI." />
      <DecisionCard n="2" t="Memilih Presiden & Wapres" d="Ir. Soekarno dan Moh. Hatta secara aklamasi memimpin negara baru." />
      <DecisionCard n="3" t="Membentuk KNIP" d="Dilantik 29 Agustus, diketuai Mr. Kasman Singodimedjo; memegang kekuasaan legislatif sebelum MPR/DPR terbentuk." />
    </div>
    <Footer />
  </Frame>
);

const DecisionCard = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <div style={{ background: 'rgba(255,253,248,0.8)', border: `1px solid ${line}`, borderRadius: 'var(--osd-radius)', padding: '34px 34px' }}>
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 40, fontWeight: 900, color: gold }}>{n}</div>
    <div style={{ fontSize: 29, fontWeight: 700, marginTop: 12, lineHeight: 1.3 }}>{t}</div>
    <div style={{ fontSize: 24, color: muted, marginTop: 12, lineHeight: 1.45 }}>{d}</div>
  </div>
);

/* ── 8 · Rumusan Final & 7 Kata ────────────────────────────── */
const RumusanFinal: Page = () => (
  <Frame image={bgBanyan}>
    <Eyebrow>A · Periode Pengesahan</Eyebrow>
    <H>Rumusan final Pancasila dalam Pembukaan UUD 1945</H>
    <ol style={{ margin: '44px 0 0', paddingLeft: 56, fontSize: 31, lineHeight: 1.45, maxWidth: 1500 }}>
      <li style={{ marginBottom: 18 }}><strong>Ketuhanan Yang Maha Esa.</strong></li>
      <li style={{ marginBottom: 18 }}><strong>Kemanusiaan yang adil dan beradab.</strong></li>
      <li style={{ marginBottom: 18 }}><strong>Persatuan Indonesia.</strong></li>
      <li style={{ marginBottom: 18 }}><strong>Kerakyatan yang dipimpin oleh hikmat kebijaksanaan dalam permusyawaratan/perwakilan.</strong></li>
      <li><strong>Keadilan sosial bagi seluruh rakyat Indonesia.</strong></li>
    </ol>
    <div style={{ borderLeft: '8px solid ' + gold, background: 'rgba(255,253,248,0.8)', borderRadius: '0 var(--osd-radius) var(--osd-radius) 0', padding: '26px 40px', marginTop: 44, fontSize: 27, lineHeight: 1.5 }}>
      Tujuh kata “dengan kewajiban menjalankan syariat Islam…” dihapus demi persatuan — langkah arif para pendiri negara setelah aspirasi wakil Indonesia Bagian Timur disampaikan kepada Bung Hatta.
    </div>
    <Footer />
  </Frame>
);

/* ── 9 · Dinamika 1945–1966 ────────────────────────────────── */
const Dinamika1945: Page = () => (
  <Frame image={bgTimeline}>
    <Eyebrow>A · Uji Sejarah</Eyebrow>
    <H>Dinamika 1945–1959: Pancasila diuji berulang kali</H>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 56 }}>
      <EventCard date="27 Des 1949" t="Pengakuan Kedaulatan" d="Belanda mengakui Indonesia (RIS) setelah empat tahun agresi militer." />
      <EventCard date="17 Agu 1950" t="NKRI & UUDS 1950" d="Kembali ke negara kesatuan; tidak lagi memakai UUD 1945." />
      <EventCard date="1955" t="Pemilu Pertama" d="Membentuk Konstituante pembuat konstitusi dan DPR sebagai parlemen." />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 32, marginTop: 32 }}>
      <EventCard date="1959" t="Konstituante Gagal" d="Sidang-sidang tidak berhasil menghasilkan UUD baru." />
      <EventCard date="5 Jul 1959" t="Dekrit Presiden" d="Bung Karno menyatakan kembali ke UUD 1945." />
      <EventCard date="11 Mar 1966" t="SUPERSEMAR" d="Titik awal Orde Baru — babak baru dinamika Pancasila." />
    </div>
    <Footer />
  </Frame>
);

const EventCard = ({ date, t, d }: { date: string; t: string; d: string }) => (
  <div style={{ background: 'rgba(255,253,248,0.8)', border: `1px solid ${line}`, borderRadius: 'var(--osd-radius)', padding: '28px 30px' }}>
    <div style={{ fontSize: 22, fontWeight: 700, letterSpacing: '0.12em', color: 'var(--osd-accent)', textTransform: 'uppercase' }}>{date}</div>
    <div style={{ fontSize: 28, fontWeight: 700, marginTop: 10 }}>{t}</div>
    <div style={{ fontSize: 23, color: muted, marginTop: 10, lineHeight: 1.45 }}>{d}</div>
  </div>
);

/* ── 10 · Identitas & Kepribadian ──────────────────────────── */
const IdentitasKepribadian: Page = () => (
  <Frame image={bgGaruda}>
    <Eyebrow>B · Mengapa Pancasila Diperlukan</Eyebrow>
    <H>Identitas &amp; kepribadian bangsa</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 52 }}>
      <div>
        <div style={{ fontSize: 33, fontWeight: 800, fontFamily: 'var(--osd-font-display)' }}>1 · Identitas Bangsa</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '26px 0 0', fontSize: 27, lineHeight: 1.5 }}>
          <Bullet>Budaya membentuk identitas melalui <strong>inkulturasi</strong> &amp; <strong>akulturasi</strong>.</Bullet>
          <Bullet>Kebudayaan = “disain untuk hidup” (Sastrapratedja, 1991): rancangan masa depan berbangsa.</Bullet>
          <Bullet>Akulturasi: substitusi, sinkretisme, adisi, orijinasi, rejeksi (Haviland, 1985).</Bullet>
        </ul>
      </div>
      <div>
        <div style={{ fontSize: 33, fontWeight: 800, fontFamily: 'var(--osd-font-display)' }}>2 · Kepribadian Bangsa</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '26px 0 0', fontSize: 27, lineHeight: 1.5 }}>
          <Bullet>Nilai ketuhanan–keadilan diwujudkan dalam <strong>sikap mental, tingkah laku, amal perbuatan</strong>.</Bullet>
          <Bullet>Berciri khas, unik, dapat dibedakan dari bangsa lain (Bakry, 1994).</Bullet>
          <Bullet>Diangkat dari nilai kehidupan masyarakat Indonesia sendiri, dilaksanakan simultan.</Bullet>
        </ul>
      </div>
    </div>
    <Footer />
  </Frame>
);

/* ── 11 · Pandangan Hidup, Jiwa, Perjanjian Luhur ──────────── */
const PandanganHidup: Page = () => (
  <Frame image={bgPadi}>
    <Eyebrow>B · Mengapa Pancasila Diperlukan</Eyebrow>
    <H>Pandangan hidup, jiwa bangsa, perjanjian luhur</H>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, marginTop: 56 }}>
      <RoleCard title="3 · Pandangan Hidup" body="Nilai Pancasila diyakini kebenaran, kebaikan, keindahan, dan kegunaannya — dijadikan pedoman bermasyarakat & berbangsa (Bakry, 1994)." />
      <RoleCard title="4 · Jiwa Bangsa" body="Volkgeist (von Savigny): Pancasila lahir bersamaan dengan lahirnya bangsa Indonesia — telah ada sejak dahulu kala." />
      <RoleCard title="5 · Perjanjian Luhur" body="Konsensus para pendiri negara menjadikan Pancasila dasar negara — bukti bahwa pilihan itu tepat." />
    </div>
    <div style={{ marginTop: 52, fontSize: 28, color: muted, maxWidth: 1560, lineHeight: 1.5 }}>
      Kelima kedudukan ini menunjukkan Pancasila bukan sekadar teks hukum, melainkan ruh yang menjiwai seluruh kehidupan bernegara.
    </div>
    <Footer />
  </Frame>
);

const RoleCard = ({ title, body }: { title: string; body: string }) => (
  <div style={{ background: 'rgba(255,253,248,0.82)', borderTop: '6px solid ' + gold, borderRadius: 'var(--osd-radius)', padding: '34px 34px', boxShadow: '0 2px 10px rgba(122, 90, 40, 0.06)' }}>
    <div style={{ fontSize: 30, fontWeight: 800, fontFamily: 'var(--osd-font-display)' }}>{title}</div>
    <div style={{ fontSize: 25, color: '#41332a', marginTop: 16, lineHeight: 1.55 }}>{body}</div>
  </div>
);

/* ── 12 · Tiga Sumber ──────────────────────────────────────── */
const TigaSumber: Page = () => (
  <Frame image={bgBanyan}>
    <Eyebrow>C · Menggali Sumber</Eyebrow>
    <H>Sumber historis, sosiologis, dan politis Pancasila</H>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 36, marginTop: 56 }}>
      <SourceCard title="Historis" body="Nilai Pancasila sudah ada dalam adat, budaya, dan agama sejak zaman kerajaan — pengakuan akan Tuhan tercermin dalam unsur-unsur religious life (Encyclopedia of Philosophy)." />
      <SourceCard title="Sosiologis" body="Gotong royong hidup dari dulu hingga kini — saling bantu antar tetangga, kerja bakti di desa, semangat kekeluargaan, hingga sistem perpajakan untuk pembangunan." />
      <SourceCard title="Politis" body="Bersumber dari local wisdom dan pengalaman bangsa; nilai kerakyatan tampak pada kehidupan desa yang bersatu dan demokratis — musyawarah mufakat." />
    </div>
    <Footer />
  </Frame>
);

const SourceCard = ({ title, body }: { title: string; body: string }) => (
  <div style={{ background: 'rgba(255,253,248,0.82)', border: `1px solid ${line}`, borderRadius: 'var(--osd-radius)', padding: '36px 36px' }}>
    <div style={{ display: 'inline-block', fontSize: 22, fontWeight: 700, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#fdf8f1', background: 'var(--osd-accent)', borderRadius: 999, padding: '8px 26px' }}>{title}</div>
    <div style={{ fontSize: 25, marginTop: 24, lineHeight: 1.55, color: '#41332a' }}>{body}</div>
  </div>
);

/* ── 13 · Esensi & Urgensi ─────────────────────────────────── */
const EsensiUrgensi: Page = () => (
  <Frame image={bgChain}>
    <Eyebrow>D &amp; E · Argumen, Esensi, Urgensi</Eyebrow>
    <H>Pasang surut Pancasila dan mengapa ia tetap dibutuhkan</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 50 }}>
      <div>
        <div style={{ fontSize: 31, fontWeight: 800, color: 'var(--osd-accent)' }}>Dinamika &amp; tantangan</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', fontSize: 26, lineHeight: 1.5 }}>
          <Bullet>Orde Lama: <strong>NASAKOM</strong> lebih populer daripada Pancasila.</Bullet>
          <Bullet>Orde Baru: Pancasila jadi pembenar kekuasaan lewat <strong>P-4</strong>.</Bullet>
          <Bullet>Reformasi: penguasa seolah meninggalkan Pancasila.</Bullet>
          <Bullet>Contoh penyimpangan: presiden seumur hidup (TAP MPRS III/1960) — bertentangan dengan Pasal 7 UUD 1945.</Bullet>
        </ul>
      </div>
      <div>
        <div style={{ fontSize: 31, fontWeight: 800, color: gold }}>Esensi &amp; urgensi</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '24px 0 0', fontSize: 26, lineHeight: 1.5 }}>
          <Bullet><em>Philosophische grondslag</em>: dasar filsafat negara — setiap produk hukum harus berbasis Pancasila.</Bullet>
          <Bullet><em>Weltanschauung</em>: pandangan hidup berisi nilai agama, budaya, adat istiadat.</Bullet>
          <Bullet>Survei Kompas (1 Juni 2008): <strong>48,4%</strong> muda 17–29 th gagal menyebutkan sila Pancasila dengan benar lengkap.</Bullet>
        </ul>
      </div>
    </div>
    <Footer />
  </Frame>
);

/* ── 14 · Pengertian & Pentingnya ──────────────────────────── */
const PengertianPentingnya: Page = () => (
  <Frame image={bgStar}>
    <Eyebrow>F · Penutup Materi</Eyebrow>
    <H>Pengertian &amp; pentingnya Pancasila dalam sejarah</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 60, marginTop: 52 }}>
      <div>
        <div style={{ fontSize: 31, fontWeight: 800, fontFamily: 'var(--osd-font-display)', borderBottom: '3px solid ' + line, paddingBottom: 14 }}>Pengertian</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', fontSize: 27, lineHeight: 1.5 }}>
          <Bullet><strong>Produk otentik</strong> para pendiri negara Indonesia.</Bullet>
          <Bullet>Bersumber &amp; digali dari nilai <strong>agama, kebudayaan, adat istiadat</strong>.</Bullet>
          <Bullet>Pandangan hidup bangsa sekaligus <strong>dasar filsafat</strong> kenegaraan.</Bullet>
        </ul>
      </div>
      <div>
        <div style={{ fontSize: 31, fontWeight: 800, fontFamily: 'var(--osd-font-display)', borderBottom: '3px solid ' + line, paddingBottom: 14 }}>Pentingnya</div>
        <ul style={{ listStyle: 'none', padding: 0, margin: '28px 0 0', fontSize: 27, lineHeight: 1.5 }}>
          <Bullet>Tetap bertahan betapapun lemahnya pemerintahan suatu rezim.</Bullet>
          <Bullet>Seluruh upaya menggantinya gagal — terbukti <strong>pilihan terbaik</strong> bagi bangsa.</Bullet>
          <Bullet>Akar nilainya hidup dan berkembang di bumi Indonesia.</Bullet>
        </ul>
      </div>
    </div>
    <Footer />
  </Frame>
);

/* ── 15 · Kesimpulan ───────────────────────────────────────── */
const Kesimpulan: Page = () => (
  <Frame image={bgGaruda}>
    <Eyebrow>Kesimpulan</Eyebrow>
    <H>Sejarah membuktikan: Pancasila tetap berdiri</H>
    <ul style={{ listStyle: 'none', padding: 0, margin: '52px 0 0', fontSize: 30, lineHeight: 1.5, maxWidth: 1560 }}>
      <Bullet>Dari benih nasionalisme, ruang BPUPKI, Piagam Jakarta, hingga Pembukaan UUD 1945 — Pancasila melewati tiga periode: <strong>pengusulan, perumusan, pengesahan</strong>.</Bullet>
      <Bullet>Pancasila adalah <strong>identitas, kepribadian, pandangan hidup, jiwa bangsa,</strong> dan <strong>perjanjian luhur</strong>.</Bullet>
      <Bullet>Sumbernya historis, sosiologis, dan politis — digali dari tanah Indonesia sendiri.</Bullet>
      <Bullet>Pasang surut NASAKOM, P-4, dan apatisme reformasi tidak mampu menumbangkannya.</Bullet>
    </ul>
    <div style={{ marginTop: 'auto', fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 800, color: 'var(--osd-accent)', textAlign: 'center', fontStyle: 'italic' }}>
      — SELESAI —
    </div>
  </Frame>
);

export const meta: SlideMeta = {
  title: 'Pancasila dalam Arus Sejarah Bangsa Indonesia (BAB II)',
  createdAt: '2026-10-27T09:49:49Z',
};

export default [
  Cover,
  PetaBahasan,
  AkarNasionalisme,
  PidatoSoekarno,
  PiagamJakarta,
  Proklamasi,
  SidangPPKI,
  RumusanFinal,
  Dinamika1945,
  IdentitasKepribadian,
  PandanganHidup,
  TigaSumber,
  EsensiUrgensi,
  PengertianPentingnya,
  Kesimpulan,
] satisfies Page[];
