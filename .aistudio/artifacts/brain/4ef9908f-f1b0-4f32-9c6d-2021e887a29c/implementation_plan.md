# Penerapan Teknologi Komputer dalam Bidang Komunikasi (15 Slide)

Rencana pembuatan slide presentasi komprehensif 15 halaman berbasis framework OpenSlide dengan topik "Penerapan Teknologi Komputer dalam Bidang Komunikasi", menggunakan palet warna putih dan hijau pastel yang elegan, latar belakang subtle bermotif sirkuit digital dan jaringan data, ikon murni SVG (tanpa emoji), tata letak terpusat (vertikal & horizontal) dengan pemanfaatan ruang yang proporsional, serta transisi halus antar slide.

---

> [!IMPORTANT]
> **Keputusan Desain Terkonfirmasi:**
> - **Palet Warna**: Putih bersih (`#ffffff`), hijau pastel lembut (sage/mint `#e8f5e9`, `#dcfce7`, `#bbf7d0`), dengan aksen emerald pekat (`#15803d`) dan tipografi kontras slate gelap (`#0f172a`, `#1e293b`) untuk keterbacaan optimal proyektor.
> - **Visual Latar Belakang**: Latar subtle grafis vektor SVG bermotif jaringan sirkuit komputer dan aliran node data digital dengan opasitas sangat halus (4%–8%).
> - **Ikonografi**: Seluruh ikon menggunakan grafis SVG inline murni bergaris bersih (stroke 1.75–2px); bebas dari emoji.
> - **Tata Letak**: Terpusat secara horizontal dan vertikal pada kanvas 1920×1080px dengan sistem kartu dan grid berimbang sehingga tidak menyisakan ruang kosong berlebih.
> - **Transisi & Navigasi**: Transisi masuk halus (fade 240ms dengan *nudge* elevasi 6px) yang konsisten di setiap perpindahan slide.
> - **Presenter Notes**: Disertakan transkrip *speaker notes* lengkap dalam bahasa Indonesia pada ekspor `notes` untuk setiap slide.

---

## 1. Ikhtisar & Struktur 15 Slide

Presentasi disusun untuk mata kuliah *Pengantar Teknologi Komputer dan Informatika* yang membedah transformasi komunikasi manusia dari konvensional ke era digital dan kecerdasan buatan.

```
┌────────────────────────────────────────────────────────────────────────┐
│                        ALUR ARSITEKTUR 15 SLIDE                        │
├────────────────────────────────────────────────────────────────────────┤
│ [01] Cover: Judul Mata Kuliah & Topik Utama                            │
│ [02] Mengapa Berubah? (3 Era: Dahulu → Komputer/Internet → AI)         │
│ [03] Konsep Dasar (4 Pilar: Komunikasi, Komputer, Tek. Kom, Integrasi) │
│ [04] Evolusi Berbasis Teknologi (Garis Waktu 8 Tahapan Komunikasi)     │
│ [05] Cara Komputer Memungkinkan Komunikasi (7 Tahap Pemrosesan Pesan)  │
│ [06] 4 Bentuk Penerapan Komputer (Personal, Bisnis, Edukasi, Sosial)   │
│ [07] Penerapan Sehari-hari (Matriks 4 Bidang: Edukasi, Kerja, Bisnis)  │
│ [08] 7 Manfaat Utama (Kecepatan, Jangkauan, Kolaborasi, dll.)          │
│ [09] 5 Tantangan Komunikasi Digital (Misinformasi, Privasi, Gap, dll.) │
│ [10] 5 Aspek Keamanan (Enkripsi, Autentikasi 2FA, Anti-Phishing, dll.) │
│ [11] Dampak Positif vs Negatif terhadap Masyarakat (Komparasi 2 Kolom) │
│ [12] Studi Kasus Alur Pesan Digital (Langkah Pengiriman "Halo")        │
│ [13] 6 Prinsip Etika Komunikasi Digital (Netiket & Tanggung Jawab)     │
│ [14] Masa Depan Komunikasi Digital (AI, NLP, AR/VR Spatial, Translasi) │
│ [15] Kesimpulan & Refleksi: Alat vs Kebijaksanaan Pengguna             │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Desain Visual & Pengalaman Pengguna

### Palet Warna Hijau Pastel & Putih
- **Canvas Base**: Putih murni (`#ffffff`) dengan aksen radial gradien hijau mint (`rgba(220, 252, 231, 0.45)` dan `rgba(240, 253, 244, 0.6)`).
- **Surface & Cards**: Kartu putih dengan border hijau pastel halus (`#86efac` dan `#bbf7d0`), bayangan lembut (*soft ambient shadow*).
- **Aksen Primer**: Emerald hijau tua (`#15803d` / `#166534`) untuk judul, badge nomor, dan titik penting.
- **Tipografi**: Slate navy pekat (`#0f172a`) untuk keterbacaan tajam, slate abu-abu (`#475569`) untuk deskripsi pendukung.
- **Ikon Vektor**: SVG stroke bernuansa emerald dan mint pastel dengan wadah lingkaran berlatar hijau lembut.

### Komposisi Tata Letak (Anti Ruang Kosong Berlebih)
- Kanvas standar resolusi 1920×1080 piksel.
- Setiap slide dibungkus dalam container berpusat vertikal dan horizontal dengan padding terukur (80–120px).
- Menggunakan arsitektur layout beragam sesuai materi:
  - **Hero Header + 3-4 Grid Card** (Slide 2, 3, 6, 7)
  - **Horizontal Step Flow / Timeline Pipeline** (Slide 4, 5, 12)
  - **Stat / Feature Bento Grid** (Slide 8, 10, 14)
  - **Balanced Two-Column Pros & Cons** (Slide 11)
  - **Hexagonal / Card Checklist** (Slide 9, 13)
  - **Ceremonial Summary Anchor** (Slide 1, 15)

### Detail Elemen Header & Footer
- **Header Top**: Label mata kuliah dan penanda bab/topik.
- **Footer Bottom**: Penomoran halaman dinamis (`useSlidePageNumber()`), status topik, dan branding presentasi.

---

## 3. Rencana Komponen & Teknis

1. **Folder Slide**:
   - `slides/teknologi-komunikasi/index.tsx`
   - `slides/teknologi-komunikasi/assets/bg-circuit-network.svg` (pola sirkuit dan node jaringan digital lembut)
2. **Koleksi Ikon SVG**:
   - `MailIcon`, `ChatIcon`, `VideoIcon`, `ServerIcon`, `ShieldCheckIcon`, `LockIcon`, `CpuIcon`, `GlobeIcon`, `BrainIcon`, `UserGroupIcon`, `ArrowRightIcon`, `CheckCircleIcon`, `AlertTriangleIcon`, `ScaleIcon`, dll.
3. **Ekspor OpenSlide**:
   - `export const design: DesignSystem`: Token CSS untuk bg, text, font, radius, dan typeScale.
   - `export const meta: SlideMeta`: Judul presentasi & tanggal ISO 8601.
   - `export const transition: SlideTransition`: Transisi 250ms dengan fade dan translateY 6px.
   - `export const notes: string[]`: 15 transkrip teks pembicara lengkap.
   - `export default Page[]`: 15 komponen React individual tanpa loop mapping yang merusak inspektor.

---

## 4. Langkah Pelaksanaan Setelah Persetujuan

1. Membuat aset latar belakang SVG `bg-circuit-network.svg` pada direktori `/slides/teknologi-komunikasi/assets/`.
2. Menyusun komponen utama `/slides/teknologi-komunikasi/index.tsx` dengan ke-15 halaman slide, komponen pembantu (Card, TimelineStep, Badge, IconContainer, Header, Footer), palet warna pastel green, dan transisi halus.
3. Memastikan semua perhitungan tinggi elemen (font size × baris + margin + padding) berada aman dalam batas 1080px tanpa overflow vertikal.
4. Memvalidasi kode melalui `compile_applet` dan memastikan build sukses tanpa error.
