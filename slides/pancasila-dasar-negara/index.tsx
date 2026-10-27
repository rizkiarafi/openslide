import { useSlidePageNumber } from '@open-slide/core';
import type { DesignSystem, Page, SlideMeta } from '@open-slide/core';

import bgCover from './assets/bg-cover.svg';
import bgState from './assets/bg-state.svg';
import bgGoal from './assets/bg-goal.svg';
import bgNorm from './assets/bg-norm.svg';
import bgHierarchy from './assets/bg-hierarchy.svg';
import bgReason from './assets/bg-reason.svg';
import bgLegal from './assets/bg-legal.svg';
import bgHistory from './assets/bg-history.svg';
import bgSociety from './assets/bg-society.svg';
import bgPolitics from './assets/bg-politics.svg';
import bgDynamic from './assets/bg-dynamic.svg';
import bgChallenge from './assets/bg-challenge.svg';
import bgEssence from './assets/bg-essence.svg';
import bgUrgency from './assets/bg-urgency.svg';
import bgProclaim from './assets/bg-proclaim.svg';
import bgPreamble from './assets/bg-preamble.svg';
import bgDerivation from './assets/bg-derivation.svg';
import bgPolicy from './assets/bg-policy.svg';
import bgChain from './assets/bg-chain.svg';

export const design: DesignSystem = {
  palette: { bg: '#faf6ef', text: '#241a12', accent: '#b91c1c' },
  fonts: {
    display: 'Georgia, "Times New Roman", serif',
    body: '-apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  },
  typeScale: { hero: 108, body: 32 },
  radius: 16,
};

const muted = '#7a6a58';
const gold = '#a16207';
const cardBg = 'rgba(255, 252, 245, 0.88)';
const cardEdge = '#e6dccc';

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
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: '96px 130px 84px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
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
  <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 58, fontWeight: 800, lineHeight: 1.15, margin: '16px 0 0' }}>
    {children}
  </h2>
);

const Footer = () => {
  const { current, total } = useSlidePageNumber();
  return (
    <div style={{ marginTop: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: 36 }}>
      <span style={{ fontSize: 21, color: muted, letterSpacing: '0.06em' }}>
        Pendidikan Pancasila — BAB III · Pancasila sebagai Dasar Negara
      </span>
      <span style={{ fontSize: 21, color: muted, fontVariantNumeric: 'tabular-nums' }}>
        {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </div>
  );
};

const Bullet = ({ children }: { children: React.ReactNode }) => (
  <li style={{ display: 'flex', gap: 22, alignItems: 'baseline', marginBottom: 26, fontSize: 30, lineHeight: 1.5 }}>
    <span style={{ width: 12, height: 12, borderRadius: 999, background: 'var(--osd-accent)', flexShrink: 0, transform: 'translateY(-2px)' }} />
    <span>{children}</span>
  </li>
);

const Card = ({ title, children, tone }: { title: string; children: React.ReactNode; tone?: string }) => (
  <div
    style={{
      background: cardBg,
      border: `1.5px solid ${cardEdge}`,
      borderLeft: `8px solid ${tone ?? 'var(--osd-accent)'}`,
      borderRadius: 'var(--osd-radius)',
      padding: '28px 34px',
      boxShadow: '0 8px 24px rgba(60,40,20,0.06)',
    }}
  >
    <div style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 800, color: tone ?? 'var(--osd-accent)', marginBottom: 12 }}>
      {title}
    </div>
    <div style={{ fontSize: 27, lineHeight: 1.55, color: 'var(--osd-text)' }}>{children}</div>
  </div>
);

/* ── 1 · Cover ─────────────────────────────────────────────── */
const Cover: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 160px', boxSizing: 'border-box' }}>
    <img src={bgCover} alt="" style={bgStyle} />
    <div style={{ position: 'relative' }}>
      <div style={{ fontSize: 26, fontWeight: 700, letterSpacing: '0.3em', color: gold, textTransform: 'uppercase' }}>
        Pendidikan Pancasila · Bab III
      </div>
      <h1 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 'var(--osd-size-hero)', fontWeight: 900, lineHeight: 1.1, margin: '36px 0 0', maxWidth: 1500 }}>
        Bagaimana Pancasila Menjadi <span style={{ color: 'var(--osd-accent)' }}>Dasar Negara</span> Republik Indonesia?
      </h1>
      <div style={{ marginTop: 44, fontSize: 34, color: muted, fontStyle: 'italic', fontFamily: 'var(--osd-font-display)' }}>
        Menelusuri konsep negara, tujuan negara, dan urgensi dasar negara — serta kedudukan Pancasila sebagai sumber dari segala sumber hukum.
      </div>
    </div>
  </div>
);

/* ── 2 · Peta Bahasan ──────────────────────────────────────── */
const MapItem = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'baseline' }}>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 34, fontWeight: 900, color: 'var(--osd-accent)', minWidth: 44 }}>{n}</span>
    <div>
      <div style={{ fontSize: 30, fontWeight: 700 }}>{t}</div>
      <div style={{ fontSize: 24, color: muted, marginTop: 6, lineHeight: 1.45 }}>{d}</div>
    </div>
  </div>
);

const PetaBahasan: Page = () => (
  <Frame image={bgChain}>
    <Eyebrow>Peta Bahasan</Eyebrow>
    <H>Lima alur pembahasan bab ini</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 80, rowGap: 40, marginTop: 56 }}>
      <MapItem n="A" t="Konsep, Tujuan & Urgensi Dasar Negara" d="Negara, teori tujuan negara, dan makna dasar negara." />
      <MapItem n="B" t="Alasan Diperlukannya Kajian" d="Pancasila sebagai pandangan hidup dan pemersatu bangsa." />
      <MapItem n="C" t="Empat Sumber Kajian" d="Yuridis, historis, sosiologis, dan politis." />
      <MapItem n="D" t="Dinamika & Tantangan" d="Pasang surut Pancasila dalam perjalanan bangsa." />
      <MapItem n="E" t="Esensi, Urgensi & Implementasi" d="Hubungan dengan Proklamasi, Pembukaan UUD 1945, dan kebijakan." />
    </div>
    <Footer />
  </Frame>
);

/* ── 3 · A1 Konsep Negara ──────────────────────────────────── */
const KonsepNegara: Page = () => (
  <Frame image={bgState}>
    <Eyebrow>A · Konsep Negara</Eyebrow>
    <H>Negara: Organisasi Kekuasaan yang Berdaulat</H>
    <div style={{ fontSize: 30, lineHeight: 1.55, marginTop: 30, maxWidth: 1500 }}>
      Negara adalah organisasi kekuasaan berdaulat yang dengan tata pemerintahan melaksanakan tata tertib atas suatu{' '}
      <b>umat</b> di suatu <b>daerah</b> tertentu <span style={{ color: muted }}>(Diponolo, 1975: 23–25)</span>.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 44, marginTop: 44 }}>
      <Card title="Unsur Konstitutif (syarat mutlak)" tone={gold}>
        1. Tempat — daerah / wilayah (territoir)
        <br />
        2. Manusia — umat, masyarakat, rakyat, bangsa
        <br />
        3. Organisasi — tata kerja sama / tata pemerintahan
      </Card>
      <Card title="Unsur Deklaratif">Pengakuan dari negara lain.</Card>
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 44, marginTop: 32 }}>
      <Card title="Perspektif Tata Negara — Diam" tone={muted}>
        Fokus pada bentuk dan struktur organisasi negara.
      </Card>
      <Card title="Perspektif Tata Negara — Bergerak" tone={muted}>
        Fokus pada mekanisme penyelenggaraan lembaga negara, pusat &amp; daerah, serta bentuk pemerintahan yang paling tepat.
      </Card>
    </div>
    <Footer />
  </Frame>
);

/* ── 4 · A2 Tujuan Negara ──────────────────────────────────── */
const TeoriCard = ({ n, t, tok }: { n: string; t: string; tok: string }) => (
  <div style={{ background: cardBg, border: `1.5px solid ${cardEdge}`, borderRadius: 'var(--osd-radius)', padding: '20px 26px' }}>
    <div style={{ fontSize: 24, fontWeight: 800, color: 'var(--osd-accent)' }}>
      {n}. {t}
    </div>
    <div style={{ fontSize: 21, color: muted, marginTop: 8, lineHeight: 1.45 }}>{tok}</div>
  </div>
);

const TujuanNegara: Page = () => (
  <Frame image={bgGoal}>
    <Eyebrow>A · Tujuan Negara</Eyebrow>
    <H>Lima Teori tentang Tujuan Negara</H>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 28, marginTop: 46 }}>
      <TeoriCard n="a" t="Kekuatan & Kekuasaan" tok="Shan Yang · Machiavelli · Nietzsche" />
      <TeoriCard n="b" t="Kepastian Hidup, Keamanan & Ketertiban" tok="Dante · Thomas Hobbes · Theodore Roosevelt" />
      <TeoriCard n="c" t="Kemerdekaan" tok="Herbert Spencer · Immanuel Kant · Hegel" />
      <TeoriCard n="d" t="Keadilan" tok="Aristoteles · Thomas Aquinas · Immanuel Kant" />
      <TeoriCard n="e" t="Kesejahteraan & Kebahagiaan" tok="Mohammad Hatta · Immanuel Kant" />
      <TeoriCard n="f" t="Dua Aliran Jalan Mewujudkannya" tok="Liberal individualis (persaingan bebas) vs kolektivis/sosialis (terpimpin/totaliter)" />
    </div>
    <div style={{ marginTop: 40, background: cardBg, border: `1.5px solid ${cardEdge}`, borderLeft: '8px solid var(--osd-accent)', borderRadius: 'var(--osd-radius)', padding: '24px 32px', fontSize: 27, lineHeight: 1.55 }}>
      <b>Tujuan negara RI</b> disederhanakan menjadi dua: <b>mewujudkan kesejahteraan umum</b> dan <b>menjamin keamanan</b> seluruh bangsa dan wilayah —
      ditempuh melalui <i>prosperity approach</i> dan <i>security approach</i>.
    </div>
    <Footer />
  </Frame>
);

/* ── 5 · A3 Dasar Negara ───────────────────────────────────── */
const DasarNegara: Page = () => (
  <Frame image={bgNorm}>
    <Eyebrow>A · Dasar Negara</Eyebrow>
    <H>Konsep dan Urgensi Dasar Negara</H>
    <ul style={{ margin: '38px 0 0', paddingLeft: 0, listStyle: 'none' }}>
      <Bullet>
        <b>Etimologis:</b> dasar negara = <i>grandnorm</i> (norma dasar) = <i>rechtsidee</i> (cita hukum) = <i>staatsidee</i> (cita negara) ={' '}
        <i>philosophische grondslag</i> — bersifat universal, tiap negara memilikinya.
      </Bullet>
      <Bullet>
        <b>Terminologis:</b> landasan dan sumber dalam membentuk serta menyelenggarakan negara — sumber dari segala sumber hukum negara.
      </Bullet>
      <Bullet>
        Mengacu pada <i>Grundnorm</i> Hans Kelsen: norma tertinggi yang mendasari kesatuan sistem norma dalam masyarakat yang teratur, termasuk negara.
      </Bullet>
      <Bullet>
        Kedudukannya berbeda dengan peraturan perundang-undangan: dasar negara adalah <b>sumbernya</b>, maka bersifat <b>permanen</b>, sedangkan
        peraturan perundang-undangan fleksibel mengikuti tuntutan zaman.
      </Bullet>
      <Bullet>
        Norma dasar penyelenggaraan bernegara sekaligus cita hukum (<i>rechtsidee</i>) yang mencerminkan kesamaan kepentingan warga masyarakat
        (Yusuf, 2009).
      </Bullet>
    </ul>
    <Footer />
  </Frame>
);

/* ── 6 · Hierarki Perundang-undangan ───────────────────────── */
const Row = ({ n, t }: { n: string; t: string }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 24, background: cardBg, border: `1.5px solid ${cardEdge}`, borderRadius: 12, padding: '14px 26px' }}>
    <span style={{ fontSize: 22, fontWeight: 800, color: gold, minWidth: 34 }}>{n}</span>
    <span style={{ fontSize: 25 }}>{t}</span>
  </div>
);

const Hierarki: Page = () => (
  <Frame image={bgHierarchy}>
    <Eyebrow>A · Dasar Negara</Eyebrow>
    <H>Norma Hukum Bertingkat dan Berjenjang</H>
    <div style={{ fontSize: 27, color: muted, marginTop: 22 }}>
      Sesuai UU No. 12 Tahun 2011 tentang Pembentukan Peraturan Perundang-undangan (Pasal 7):
    </div>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 14, marginTop: 30, maxWidth: 1250 }}>
      <Row n="—" t="PANCASILA — sumber dari segala sumber hukum negara (di atas hierarki)" />
      <Row n="a" t="Undang-Undang Dasar Negara Republik Indonesia Tahun 1945" />
      <Row n="b" t="Ketetapan Majelis Permusyawaratan Rakyat" />
      <Row n="c" t="Undang-Undang / Peraturan Pemerintah Pengganti Undang-Undang" />
      <Row n="d" t="Peraturan Pemerintah" />
      <Row n="e" t="Peraturan Presiden" />
      <Row n="f" t="Peraturan Daerah Provinsi" />
      <Row n="g" t="Peraturan Daerah Kabupaten/Kota" />
    </div>
    <Footer />
  </Frame>
);

/* ── 7 · B Alasan Diperlukannya Kajian ─────────────────────── */
const AlasanKajian: Page = () => (
  <Frame image={bgReason}>
    <Eyebrow>B · Alasan Kajian</Eyebrow>
    <H>Mengapa Pancasila sebagai Dasar Negara Perlu dikaji?</H>
    <ul style={{ margin: '44px 0 0', paddingLeft: 0, listStyle: 'none' }}>
      <Bullet>
        Pancasila adalah <b>pandangan hidup dan kepribadian bangsa</b>; nilai-nilainya yang nasional merupakan perwujudan aspirasi (cita-cita hidup)
        bangsa Indonesia (Muzayin, 1992: 16).
      </Bullet>
      <Bullet>
        <b>Perpecahan mudah dihindari</b> — pola hidup yang berdasarkan keseimbangan, keselarasan, dan keserasian membina perbedaan menjadi
        keanekaragaman dalam satu keseragaman yang kokoh.
      </Bullet>
      <Bullet>
        Peraturan berlandaskan Pancasila <b>meminimalkan perasaan adil dan tidak adil</b> — berlaku untuk semua tanpa diskriminasi.
      </Bullet>
      <Bullet>
        Pancasila memberi arah agar hukum menciptakan keadaan negara yang lebih baik, berlandaskan nilai <b>ketuhanan, kemanusiaan, persatuan,
        kerakyatan, dan keadilan</b>.
      </Bullet>
    </ul>
    <Footer />
  </Frame>
);

/* ── 8 · C1 Sumber Yuridis ─────────────────────────────────── */
const SumberYuridis: Page = () => (
  <Frame image={bgLegal}>
    <Eyebrow>C · Sumber Kajian — 1</Eyebrow>
    <H>Sumber Yuridis Pancasila sebagai Dasar Negara</H>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 52, maxWidth: 1450 }}>
      <Card title="Pembukaan UUD 1945">
        Peneguhan Pancasila sebagai dasar negara tercantum dalam Pembukaan UUD NRI Tahun 1945 — tempat sila-sila Pancasila dijelmakan secara resmi.
      </Card>
      <Card title="Ketetapan MPR No. XVIII/MPR/1998" tone={gold}>
        Tentang Pencabutan Ketetapan MPR No. II/MPR/1978 (Ekaprasetya Pancakarsa) dan ketetapan tentang Penegasan Pancasila sebagai Dasar Negara.
      </Card>
      <Card title="Undang-Undang No. 12 Tahun 2011">
        Tentang Pembentukan Peraturan Perundang-undangan: menegaskan Pancasila merupakan <b>sumber dari segala sumber hukum negara</b>.
      </Card>
    </div>
    <Footer />
  </Frame>
);

/* ── 9 · C2 Sumber Historis ────────────────────────────────── */
const HistItem = ({ y, t }: { y: string; t: string }) => (
  <div style={{ display: 'flex', gap: 30, alignItems: 'baseline' }}>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 30, fontWeight: 900, color: 'var(--osd-accent)', minWidth: 190 }}>{y}</span>
    <span style={{ fontSize: 27, lineHeight: 1.5 }}>{t}</span>
  </div>
);

const SumberHistoris: Page = () => (
  <Frame image={bgHistory}>
    <Eyebrow>C · Sumber Kajian — 2</Eyebrow>
    <H>Sumber Historis Pancasila sebagai Dasar Negara</H>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 34, marginTop: 48, maxWidth: 1500 }}>
      <HistItem y="1 Juni 1945" t="Soekarno mengusulkan Pancasila sebagai dasar filsafat negara Indonesia merdeka dalam sidang BPUPKI (Notonagoro, 1994: 24)." />
      <HistItem y="22 Juni 1945" t="Perumusan pembukaan yang terkenal sebagai Jakarta-charter (Piagam Jakarta)." />
      <HistItem y="18 Agustus 1945" t="Pancasila dijadikan dasar negara sewaktu ditetapkannya Pembukaan UUD NRI 1945 — bersama UUD, Presiden, dan Wakil Presiden." />
    </div>
    <div style={{ marginTop: 44, background: cardBg, border: `1.5px solid ${cardEdge}`, borderLeft: '8px solid '+gold, borderRadius: 'var(--osd-radius)', padding: '24px 32px', fontSize: 26, lineHeight: 1.55, maxWidth: 1500 }}>
      <b>Mahfud MD (2009: 14):</b> Pancasila adalah hasil karya bersama berbagai aliran politik di BPUPKI yang disempurnakan dan disahkan PPKI — bukan
      hanya karya Moh. Yamin atau Soekarno semata. Dibentuk setelah menyerap pandangan yang berkembang demokratis dari para anggota BPUPKI/PPKI sebagai
      representasi bangsa.
    </div>
    <Footer />
  </Frame>
);

/* ── 10 · C3 Sumber Sosiologis ─────────────────────────────── */
const SosItem = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <div style={{ background: cardBg, border: `1.5px solid ${cardEdge}`, borderTop: '6px solid '+gold, borderRadius: 12, padding: '20px 24px' }}>
    <div style={{ fontSize: 23, fontWeight: 800, color: gold }}>{n}</div>
    <div style={{ fontSize: 22, marginTop: 8, lineHeight: 1.5 }}>
      <b>{t}</b> — {d}
    </div>
  </div>
);

const SumberSosiologis: Page = () => (
  <Frame image={bgSociety}>
    <Eyebrow>C · Sumber Kajian — 3</Eyebrow>
    <H>Sumber Sosiologis: Alam Pancasila (Latif)</H>
    <div style={{ fontSize: 25, color: muted, marginTop: 20 }}>Pokok-pokok moralitas dan haluan kebangsaan-kenegaraan menurut alam Pancasila:</div>
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 26, marginTop: 34 }}>
      <SosItem n="Pertama" t="Ketuhanan (religiusitas)" d="sumber etika & spiritualitas vertikal-transendental — fundamental etika kehidupan bernegara." />
      <SosItem n="Kedua" t="Kemanusiaan universal" d="bersumber dari hukum Tuhan, alam, & sifat sosial (horizontal) — fundamental etika-politik pergaulan dunia." />
      <SosItem n="Ketiga" t="Nilai etis kemanusiaan" d="harus mengakar dalam pergaulan kebangsaan sebelum menjangkau pergaulan dunia." />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 26, marginTop: 26 }}>
      <SosItem n="Keempat" t="Kedaulatan rakyat" d="aktualisasinya menjunjung tinggi kedaulatan rakyat yang dipimpin oleh hikmat kebijaksanaan." />
      <SosItem n="Kelima" t="Keadilan sosial" d="semua nilai itu memperoleh sejauh mewujudkan keadilan sosial." />
    </div>
    <Footer />
  </Frame>
);

/* ── 11 · C4 Sumber Politis ────────────────────────────────── */
const SumberPolitis: Page = () => (
  <Frame image={bgPolitics}>
    <Eyebrow>C · Sumber Kajian — 4</Eyebrow>
    <H>Sumber Politis Pancasila sebagai Dasar Negara</H>
    <ul style={{ margin: '40px 0 0', paddingLeft: 0, listStyle: 'none' }}>
      <Bullet>
        Pasal <b>1 ayat (2)</b> dan Pasal <b>36A jo Pasal 1 ayat (2)</b> UUD 1945: Pancasila menjelma menjadi asas dalam <b>demokrasi konstitusional</b> —
        landasan etik kehidupan politik bangsa.
      </Bullet>
      <Bullet>
        <b>Suprastruktur politik</b> (lembaga negara/pemerintah, pusat &amp; daerah): Pancasila menjadi <b>norma hukum</b> dalam memformulasikan dan
        mengimplementasikan kebijakan publik.
      </Bullet>
      <Bullet>
        <b>Infrastruktur politik</b> (ormas, parpol, media): Pancasila menjadi <b>kaidah penuntun</b> aktivitas sosio-politik yang memberi masukan bagi
        sektor pemerintah.
      </Bullet>
      <Bullet>
        Output-nya: kebijakan yang memihak kepentingan rakyat, terkendali, menuju <b>clean government &amp; good governance</b> — adil dalam kemakmuran,
        makmur dalam keadilan (Umar Wirahadikusumah).
      </Bullet>
    </ul>
    <Footer />
  </Frame>
);

/* ── 12 · D1 Dinamika Pancasila ────────────────────────────── */
const DynItem = ({ p, t }: { p: string; t: string }) => (
  <div style={{ display: 'flex', gap: 26, alignItems: 'baseline' }}>
    <span style={{ fontSize: 23, fontWeight: 800, color: 'var(--osd-accent)', minWidth: 250, fontFamily: 'var(--osd-font-display)' }}>{p}</span>
    <span style={{ fontSize: 24, lineHeight: 1.45 }}>{t}</span>
  </div>
);

const Dinamika: Page = () => (
  <Frame image={bgDynamic}>
    <Eyebrow>D · Dinamika</Eyebrow>
    <H>Dinamika Pancasila sebagai Dasar Negara</H>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 24, marginTop: 42 }}>
      <DynItem p="Awalnya" t="Adat istiadat dan agama membentuk pandangan hidup; Soekarno menggali kembali nilai-nilai luhur budaya Indonesia (1 Juni 1945)." />
      <DynItem p="18 Agustus 1945" t="Pancasila diresmikan sebagai dasar negara lewat Pembukaan UUD 1945." />
      <DynItem p="Dekrit 5 Juli 1959" t="Menandai berakhirnya praktik demokrasi liberal yang berjalan sebelumnya." />
      <DynItem p="Orde Baru" t="Pancasila dilaksanakan &quot;murni dan konsekuen&quot; + Tap MPR No. II/MPR/1978 (P-4), namun dianggap mempraktikkan liberalisme-kapitalisme." />
      <DynItem p="Reformasi 1998" t="Belum konsekuen diamalkan: abainya politisi pada fatsoen politik ber-Pancasila dan perilaku anarkis segelintir masyarakat." />
      <DynItem p="2004 – kini" t="Gerakan akademisi &amp; pencinta Pancasila menyuarakan kembali dasar negara lewat seminar dan kongres." />
    </div>
    <div style={{ marginTop: 34, fontSize: 25, color: muted, maxWidth: 1500, lineHeight: 1.5 }}>
      Tujuannya: <b style={{ color: 'var(--osd-text)' }}>mengembalikan eksistensi Pancasila</b>, membudayakan nilainya sebagai pandangan hidup bangsa, dan
      menegaskannya sebagai sumber hukum penyelenggaraan negara.
    </div>
    <Footer />
  </Frame>
);

/* ── 13 · D2 Tantangan ─────────────────────────────────────── */
const Tantangan: Page = () => (
  <Frame image={bgChallenge}>
    <Eyebrow>D · Tantangan</Eyebrow>
    <H>Tantangan terhadap Pancasila</H>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 40, marginTop: 52, maxWidth: 1500 }}>
      <Card title="a · Kehidupan Masyarakat" tone={gold}>
        Kegamangan bernegara di era reformasi akibat perubahan sistem yang cepat, termasuk otonomi daerah seluas-luasnya; masyarakat merasa bebas tanpa
        tuntutan nilai dan norma — lahir perilaku <b>anarkisme</b> terhadap fasilitas publik yang dipandang tidak cocok dengan paham yang dianutnya.
      </Card>
      <Card title="b · Bidang Pemerintahan">
        Munculnya aparatur sipil maupun militer yang <b>kurang mencerminkan jiwa kenegarawanan</b> — aji mumpung dan mementingkan kelompok.
        Pencegahannya: <b>meningkatkan efektivitas penegakan hukum</b> dan membudayakan nilai-nilai Pancasila secara masif serta sistematis bagi para
        aparatur negara.
      </Card>
    </div>
    <Footer />
  </Frame>
);

/* ── 14 · E1 Esensi ────────────────────────────────────────── */
const EssItem = ({ n, t }: { n: string; t: string }) => (
  <div style={{ display: 'flex', gap: 24, alignItems: 'baseline', background: cardBg, border: `1.5px solid ${cardEdge}`, borderRadius: 12, padding: '18px 26px' }}>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 26, fontWeight: 900, color: 'var(--osd-accent)', minWidth: 40 }}>{n}</span>
    <span style={{ fontSize: 24, lineHeight: 1.45 }}>{t}</span>
  </div>
);

const Esensi: Page = () => (
  <Frame image={bgEssence}>
    <Eyebrow>E · Esensi</Eyebrow>
    <H>Esensi Pancasila sebagai Dasar Negara</H>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 18, marginTop: 40, maxWidth: 1480 }}>
      <EssItem n="1" t="Sumber dari segala sumber tertib hukum Indonesia — kerohanian hukum yang dijelmakan dalam empat pokok pikiran Pembukaan UUD 1945." />
      <EssItem n="2" t="Meliputi suasana kebatinan (Geistlichenhintergrund) dari UUD 1945." />
      <EssItem n="3" t="Mewujudkan cita-cita hukum (rechtsidee) bagi dasar negara — hukum dasar tertulis maupun tidak tertulis." />
      <EssItem n="4" t="Mengandung norma yang mewajibkan pemerintah dan penyelenggara negara memegang teguh cita-cita moral rakyat yang luhur." />
      <EssItem n="5" t="Sumber semangat abadi UUD 1945 bagi penyelenggaraan negara (Kaelan, 2000: 198–199)." />
    </div>
    <div style={{ marginTop: 30, fontSize: 25, lineHeight: 1.5, maxWidth: 1480 }}>
      Rumusan Pancasila bersifat imperatif: setiap sila adalah satu kesatuan integral yang <b>saling mengandaikan dan saling mengunci</b> — negara
      kekeluargaan yang egaliter, mengatasi paham perseorangan dan golongan.
    </div>
    <Footer />
  </Frame>
);

/* ── 15 · E1 Urgensi ───────────────────────────────────────── */
const Urgensi: Page = () => (
  <Frame image={bgUrgency}>
    <Eyebrow>E · Urgensi</Eyebrow>
    <H>Urgensi Pancasila sebagai Dasar Negara</H>
    <div style={{ fontSize: 27, lineHeight: 1.55, marginTop: 28, maxWidth: 1500, fontStyle: 'italic', fontFamily: 'var(--osd-font-display)' }}>
      “Pancasila adalah Weltanschauung, satu dasar falsafah, satu alat pemersatu bangsa… Tidak ada dua bangsa yang cara berjuangnya sama” — Soekarno.
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, marginTop: 40 }}>
      <Card title="1 · Pendekatan Institusional" tone={gold}>
        Membentuk dan menyelenggarakan negara yang bersumber pada nilai Pancasila → negara modern yang menjamin tujuan negara dan kepentingan nasional →
        masyarakat adil dan makmur.
      </Card>
      <Card title="2 · Pendekatan Human Resources">
        Aparatur menjalankan Pancasila murni &amp; konsekuen, terhindar KKN; pebisnis menjadikannya etika bisnis; masyarakat menjadikannya kaidah
        penuntun.
      </Card>
    </div>
    <div style={{ marginTop: 36, background: cardBg, border: `1.5px solid ${cardEdge}`, borderLeft: '8px solid var(--osd-accent)', borderRadius: 'var(--osd-radius)', padding: '22px 30px', fontSize: 25, lineHeight: 1.5, maxWidth: 1500 }}>
      Nilai Pancasila harus menjadi <b>landasan dan pedoman</b> membentuk &amp; menyelenggarakan negara, serta <b>ruh dari berbagai peraturan</b> —
      diamalkan konsisten → tata kelola pemerintahan baik → cita-cita dan tujuan negara terwujud bertahap dan berkesinambungan.
    </div>
    <Footer />
  </Frame>
);

/* ── 16 · E2 Hubungan dengan Proklamasi ────────────────────── */
const Proklamasi: Page = () => (
  <Frame image={bgProclaim}>
    <Eyebrow>E · Hubungan</Eyebrow>
    <H>Hubungan Pancasila dengan Proklamasi 17 Agustus 1945</H>
    <ul style={{ margin: '38px 0 0', paddingLeft: 0, listStyle: 'none' }}>
      <Bullet>
        Proklamasi bukan tujuan semata, melainkan <b>sarana, isi, dan arti</b>: (a) pernyataan kemerdekaan bangsa — bagi diri sendiri dan dunia luar;
        (b) tindakan yang segera harus diselenggarakan (Kaelan, 1993: 62).
      </Bullet>
      <Bullet>
        Alinea ketiga Pembukaan menyebut kembali pernyataan kemerdekaan → <b>Proklamasi dan Pembukaan satu rangkaian</b> yang tak dapat dipisahkan.
      </Bullet>
      <Bullet>
        Penetapan Pembukaan 18 Agustus 1945 bersama UUD, Presiden, dan Wapres adalah <b>realisasi bagian kedua</b> Proklamasi.
      </Bullet>
      <Bullet>
        Pembukaan = pernyataan kemerdekaan yang lebih rinci — semangat negara merdeka, berdaulat, bersatu, adil dan makmur berasas Pancasila.
      </Bullet>
      <Bullet>
        Sifat hubungannya: memberikan <b>penjelasan, penegasan, dan pertanggungjawaban</b> atas pelaksanaan Proklamasi (Kaelan, 1993: 62–64).
      </Bullet>
    </ul>
    <Footer />
  </Frame>
);

/* ── 17 · E2 Pembukaan UUD 1945 ────────────────────────────── */
const Pembukaan: Page = () => (
  <Frame image={bgPreamble}>
    <Eyebrow>E · Hubungan</Eyebrow>
    <H>Hubungan Pancasila dengan Pembukaan UUD 1945</H>
    <ul style={{ margin: '42px 0 0', paddingLeft: 0, listStyle: 'none' }}>
      <Bullet>
        Pembukaan memenuhi unsur mutlak <b>staatsfundamentalnorm</b> — peraturan hukum tertinggi di atas Undang-Undang Dasar.
      </Bullet>
      <Bullet>
        Implikasinya: semua peraturan perundang-undangan, dari pasal-pasal UUD 1945 sampai Peraturan Daerah, <b>harus sesuai dengan Pembukaan UUD 1945</b>.
      </Bullet>
      <Bullet>
        Pancasila adalah <b>asas kerohanian</b> Pembukaan; secara ilmiah-akademis kedudukannya tetap, kuat, dan tak berubah — jalan hukum tidak dapat
        diubah lagi (Notonagoro, 1982: 25).
      </Bullet>
      <Bullet>
        Notonagoro (1982: 24–26): UUD <b>bukan</b> peraturan hukum tertinggi — di atasnya ada pokok kaidah negara yang fundamental
        (<i>staatsfundamentalnorm</i>).
      </Bullet>
    </ul>
    <Footer />
  </Frame>
);

/* ── 18 · E3 Penjabaran ke Pasal-Pasal ─────────────────────── */
const ChainStep = ({ n, t, d }: { n: string; t: string; d: string }) => (
  <div style={{ display: 'flex', gap: 30, alignItems: 'flex-start' }}>
    <span style={{ fontFamily: 'var(--osd-font-display)', fontSize: 44, fontWeight: 900, color: 'var(--osd-accent)', minWidth: 60 }}>{n}</span>
    <div>
      <div style={{ fontSize: 29, fontWeight: 800 }}>{t}</div>
      <div style={{ fontSize: 24, color: muted, marginTop: 8, lineHeight: 1.5, maxWidth: 1250 }}>{d}</div>
    </div>
  </div>
);

const Penjabaran: Page = () => (
  <Frame image={bgDerivation}>
    <Eyebrow>E · Penjabaran</Eyebrow>
    <H>Penjabaran Pancasila ke dalam Pasal-Pasal UUD 1945</H>
    <div style={{ display: 'flex', flexDirection: 'column', gap: 44, marginTop: 52 }}>
      <ChainStep n="1" t="Pancasila — asas kerohanian" d="Pancasila merupakan asas kerohanian dari Pembukaan UUD 1945 sebagai staatsfundamentalnorm." />
      <ChainStep n="2" t="Pembukaan — dikristalisasikan" d="Pembukaan UUD 1945 dikristalisasikan dalam wujud pokok-pokok pikiran (rechtsidee) yang menguasai hukum dasar, tertulis maupun tidak tertulis." />
      <ChainStep n="3" t="Pokok pikiran — terjelma dalam pasal" d="Pokok-pokok pikiran tersebut terjelma dalam pasal-pasal UUD 1945 — suasana kebatinan Undang-Undang Dasar Negara Indonesia." />
    </div>
    <Footer />
  </Frame>
);

/* ── 19 · E4 Implementasi Kebijakan ────────────────────────── */
const ImpCard = ({ t, d, tone }: { t: string; d: string; tone?: string }) => (
  <Card title={t} tone={tone}>
    {d}
  </Card>
);

const Implementasi: Page = () => (
  <Frame image={bgPolicy}>
    <Eyebrow>E · Implementasi</Eyebrow>
    <H>Implementasi dalam Perumusan Kebijakan</H>
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 30, marginTop: 40 }}>
      <ImpCard t="Politik" d="Sistem politik bertumpu pada kedaulatan rakyat (Pasal 1 ayat (2) UUD 1945) yang dibatasi konstitusi — konstitusionalisme mencegah penyalahgunaan kekuasaan." />
      <ImpCard t="Ekonomi" tone={gold} d="Lima prinsip Mubyarto: moral-religius, pemerataan sosial, nasionalisme ekonomi, koperasi sebagai sokoguru, imbangan perencanaan nasional–desentralisasi." />
      <ImpCard t="Sosial Budaya" tone={gold} d="Gotong royong terkikis globalisasi; kebudayaan berkembang lambat (pedesaan) atau cepat (perkotaan), didorong aspirasi masyarakat dan teknologi (Selo Soemardjan)." />
      <ImpCard t="Hankam" d="Pasal 30 UUD 1945: Sishankamrata — TNI &amp; POLRI kekuatan utama, rakyat pendukung; tiap warga berhak dan wajib ikut serta pertahanan-keamanan." />
    </div>
    <Footer />
  </Frame>
);

/* ── 20 · Penutup ──────────────────────────────────────────── */
const Penutup: Page = () => (
  <div style={{ ...fill, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', padding: '0 200px', boxSizing: 'border-box' }}>
    <img src={bgCover} alt="" style={bgStyle} />
    <div style={{ position: 'relative' }}>
      <div style={{ fontSize: 24, fontWeight: 700, letterSpacing: '0.3em', color: gold, textTransform: 'uppercase' }}>Kesimpulan</div>
      <h2 style={{ fontFamily: 'var(--osd-font-display)', fontSize: 76, fontWeight: 900, lineHeight: 1.15, margin: '30px 0 0', maxWidth: 1400 }}>
        Pancasila adalah <span style={{ color: 'var(--osd-accent)' }}>dasar negara</span> — sumber dari segala sumber hukum dan ruh penyelenggaraan
        negara.
      </h2>
      <div style={{ marginTop: 40, fontSize: 30, color: muted, lineHeight: 1.6, maxWidth: 1300 }}>
        Nilai-nilainya wajib menjadi landasan dan pedoman dalam membentuk serta menyelenggarakan negara — demi masyarakat yang adil dalam kemakmuran dan
        makmur dalam keadilan.
      </div>
      <div style={{ marginTop: 56, fontSize: 26, fontWeight: 700, color: 'var(--osd-accent)', letterSpacing: '0.12em' }}>— Selesai —</div>
    </div>
  </div>
);

export const meta: SlideMeta = {
  title: 'Pendidikan Pancasila — BAB III: Pancasila sebagai Dasar Negara',
  createdAt: '2026-10-27T10:06:27.150Z',
};

export default [
  Cover,
  PetaBahasan,
  KonsepNegara,
  TujuanNegara,
  DasarNegara,
  Hierarki,
  AlasanKajian,
  SumberYuridis,
  SumberHistoris,
  SumberSosiologis,
  SumberPolitis,
  Dinamika,
  Tantangan,
  Esensi,
  Urgensi,
  Proklamasi,
  Pembukaan,
  Penjabaran,
  Implementasi,
  Penutup,
] satisfies Page[];

export const notes: (string | undefined)[] = [
  'Buka dengan pertanyaan pemandu bab: bagaimana Pancasila bisa menjadi dasar negara Republik Indonesia?',
  'Petakan lima alur bahasan A sampai E agar audiens punya peta jalan.',
  'Bagian A1: tekankan tiga unsur konstitutif negara menurut Diponolo dan satu unsur deklaratif; sambungkan dengan dua perspektif tata negara (diam dan bergerak).',
  'Bagian A2: sebutkan lima teori tujuan negara beserta tokohnya, lalu sederhanakan tujuan negara RI menjadi kesejahteraan dan keamanan dengan dua pendekatan.',
  'Bagian A3: jelaskan padanan etimologis dasar negara (Grundnorm, rechtsidee, staatsidee, philosophische grondslag) dan sifat permanennya dibanding peraturan yang fleksibel.',
  'Tunjukkan hierarki UU No. 12/2011 sambil menegaskan Pancasila berada di atasnya sebagai sumber segala sumber hukum.',
  'Bagian B: alasan kajian — Pancasila sebagai pemersatu dan penjamin keadilan tanpa diskriminasi.',
  'Bagian C1: tiga landasan yuridis — Pembukaan, Tap MPR XVIII/1998, dan UU 12/2011.',
  'Bagian C2: garis waktu 1 Juni – 22 Juni – 18 Agustus 1945, plus tesis Mahfud MD bahwa Pancasila karya bersama.',
  'Bagian C3: lima pokok moralitas alam Pancasila menurut Latif.',
  'Bagian C4: bedakan peran suprastruktur (norma hukum kebijakan publik) dan infrastruktur (kaidah penuntun) menuju clean government & good governance.',
  'Bagian D1: narasi dinamika dari adat & agama, proklamasi, Orde Lama, Orba, Reformasi, hingga gerakan akademisi 2004-sekarang.',
  'Bagian D2: dua tantangan — kegamangan masyarakat pasca-reformasi (anarkisme) dan aparatur tanpa jiwa kenegarawanan.',
  'Bagian E1a: lima rincian esensi kedudukan Pancasila; ingatkan sila-sila saling mengandaikan dan saling mengunci.',
  'Bagian E1b: kutipan Soekarno tentang Weltanschauung, lalu dua pendekatan urgensi: institusional dan human resources.',
  'Bagian E2: hubungan Proklamasi–Pembukaan: penjelasan, penegasan, pertanggungjawaban.',
  'Jelaskan Pembukaan sebagai staatsfundamentalnorm — peraturan hukum tertinggi yang mengikat seluruh regulasi di bawahnya.',
  'Bagian E3: rantai penjabaran tiga langkah dari Pancasila ke pokok-pokok pikiran hingga pasal-pasal UUD.',
  'Bagian E4: implementasi di bidang politik, ekonomi (lima prinsip Mubyarto), sosial budaya, dan hankam (Sishankamrata).',
  'Tutup dengan kesimpulan: Pancasila adalah dasar negara, sumber segala sumber hukum, dan ruh penyelenggaraan negara. Selesai.',
];
