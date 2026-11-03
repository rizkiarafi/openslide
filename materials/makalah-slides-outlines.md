Slide ke-1

### RISC vs CISC: Studi Kinerja dan Efisiensi dalam Organisasi Arsitektur Komputer

**Background & Texture:** Subtle dark navy background with light blue geometric circuit trace grid overlay and soft radial glowing centerpiece.

**Component:** Container

**Content:**
- **Judul Presentasi:** RISC vs CISC: Studi Kinerja dan Efisiensi dalam Organisasi Arsitektur Komputer
- **Instansi:** Universitas Gunadarma - Tugas Pengantar Teknologi dan Informatika 1A (Kelompok 7)
- **Tim Penulis Jurnal Acuan:** Achmad Maulana, Allyssa Putri, Muhamad Alif Farras Syakir, Revan Sabilillah Saputra, dan Maulina Diah Lestari
- **Publikasi:** Jurnal *Jupiter: Publikasi Ilmu Keteknikan Industri, Teknik Elektro dan Informatika* (Vol. 3, No. 4, 2025)
- **Fokus Pembahasan:** Perbandingan mendasar antara paradigma arsitektur Reduced Instruction Set Computer (RISC) dan Complex Instruction Set Computer (CISC) dari aspek eksekusi, daya, dan konvergensi modern.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3B82F6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"/><rect x="9" y="9" width="6" height="6"/><line x1="9" y1="1" x2="9" y2="4"/><line x1="15" y1="1" x2="15" y2="4"/><line x1="9" y1="20" x2="9" y2="23"/><line x1="15" y1="20" x2="15" y2="23"/><line x1="20" y1="9" x2="23" y2="9"/><line x1="20" y1="15" x2="23" y2="15"/><line x1="1" y1="9" x2="4" y2="9"/><line x1="1" y1="15" x2="4" y2="15"/></svg>


Slide ke-2

### Latar Belakang & Siklus Eksekusi Komputasi Modern

**Background & Texture:** Soft off-white canvas with faint micro-dots pattern and subtle diagonal linear gradient.

**Component:** Text Area

**Content:**
Prosesor berkedudukan sebagai inti penggerak seluruh operasi pengolahan data digital. Kinerja pemrosesan suatu komputer tidak semata-mata ditentukan oleh frekuensi kerja clock, melainkan oleh efisiensi tahapan eksekusi instruksi terstruktur:
1. **Fetch:** Pengambilan instruksi dari memori utama.
2. **Decode:** Penguraian kode operasi (opcode).
3. **Execute:** Pelaksanaan operasi aritmatika dan logika oleh ALU.
4. **Memory Access:** Pengaksesan operand pada lokasi memori jika diperlukan.
5. **Write-Back:** Penulisan kembali hasil komputasi ke register internal.

Optimalisasi siklus ini dipengaruhi secara signifikan oleh struktur mikroarsitektur seperti hierarki memori cache, pipelining, serta mekanisme branch prediction.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>


Slide ke-3

### Problem Statement: Dilema Filosofi RISC vs CISC

**Background & Texture:** Light cool grey background featuring subtle isometric square grid background texture.

**Component:** Cards

**Content:**
- **Paradigma RISC (Reduced Instruction Set Computer):**
  - **Prinsip Utama:** Penyederhanaan himpunan instruksi berukuran seragam.
  - **Fokus:** Eksekusi instruksi per siklus tunggal (single-cycle), arsitektur load/store, serta optimalisasi pipelining dan paralelisme hardware.
  - **Tujuan:** Kecepatan eksekusi tinggi dan konsumsi energi yang minimal.
- **Paradigma CISC (Complex Instruction Set Computer):**
  - **Prinsip Utama:** Penyediaan instruksi kompleks multi-siklus langsung pada tingkat hardware.
  - **Fokus:** Meminimalkan beban kompilasi dan ukuran kode biner (code footprint) dengan kapabilitas operasi memori langsung.
  - **Tujuan:** Efisiensi kapasitas memori dan kemudahan pemrograman assembly.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M2 16l3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1z"/><path d="M7 21h10"/><path d="M12 3v18"/><path d="M3 7h18"/></svg>


Slide ke-4

### Rumusan Masalah & Tujuan Penelitian

**Background & Texture:** Clean white slate with subtle cyan wave line vector accent in the top-right corner.

**Component:** Cards

**Content:**
- **Rumusan Masalah:**
  - Bagaimana mekanisme siklus eksekusi instruksi (fetch, decode, execute) bekerja pada arsitektur komputer?
  - Apa perbedaan mendasar antara RISC dan CISC dalam karakteristik instruksi, register, dan pengalamatan?
  - Bagaimana perbandingan kinerja pemrosesan dan efisiensi energi RISC vs CISC pada berbagai skenario beban kerja?
  - Faktor mikrositektur apa yang mendorong evolusi serta tren konvergensi hibrida antara keduanya?
- **Tujuan Utama Penelitian:**
  - Menganalisis tahapan siklus eksekusi instruksi sistem komputasi secara mendalam.
  - Menguraikan karakteristik teknis, keunggulan, serta limitasi arsitektur RISC dan CISC.
  - Membandingkan kinerja, konsumsi daya, dan kompleksitas sirkuit silikon berdasarkan studi literatur akademis.
  - Memetakan implikasi konvergensi hibrida terhadap optimasi perangkat keras dan lunak modern.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>


Slide ke-5

### Landasan Teori: Klasifikasi Arsitektur Flynn

**Background & Texture:** Light slate texture with subtle structural block outlines.

**Component:** Container

**Content:**
Klasifikasi Flynn membagi arsitektur komputasi menjadi 4 kategori utama berdasarkan aliran instruksi dan aliran data:
- **SISD (Single Instruction Single Data):** Model konvensional Von Neumann berprosesor tunggal mengeksekusi satu instruksi pada satu data.
- **SIMD (Single Instruction Multiple Data):** Arsitektur paralel mengeksekusi satu instruksi terhadap banyak aliran data secara bersamaan (misalnya GPU dan unit eksekusi vektor).
- **MISD (Multiple Instruction Single Data):** Eksekusi beberapa aliran instruksi berbeda pada satu aliran data tunggal (jarang digunakan, aplikasi spesifik).
- **MIMD (Multiple Instruction Multiple Data):** Eksekusi beberapa aliran instruksi mandiri pada beberapa data terpisah secara independen (prosesor multi-core modern).

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>


Slide ke-6

### Metrik & Indikator Kuantitatif Kinerja Komputasi

**Background & Texture:** Soft frosted glass texture with subtle radial light blur.

**Component:** Cards

**Content:**
- **Kecepatan Instruksi:**
  - **MIPS (Million Instructions Per Second):** Ukuran kuantitatif jumlah juta instruksi per detik.
  - **MFLOPs (Million Floating-Point Operations Per Second):** Indikator kecepatan kalkulasi titik mengambang.
- **Efisiensi Siklus & Latensi:**
  - **CPI (Clock Per Instruction):** Rata-rata siklus clock yang diperlukan untuk menyelesaikan satu instruksi.
  - **Memory Latency & Access Time:** Waktu tunda pembacaan/penulisan pada hierarki memori.
- **Daya & Bandwidth:**
  - **Performance per Watt:** Rasio hasil komputasi terhadap konsumsi daya listrik dalam Watt.
  - **Memory & I/O Bandwidth:** Kecepatan transfer data per detik antar komponen sistem.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="M4.93 4.93l2.83 2.83"/><path d="M16.24 16.24l2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="M4.93 19.07l2.83-2.83"/><path d="M16.24 7.76l2.83-2.83"/></svg>


Slide ke-7

### Karakteristik Arsitektur RISC (Reduced Instruction Set Computer)

**Background & Texture:** Pale emerald green gradient background with fine line grid texture.

**Component:** Cards

**Content:**
- **Set Instruksi Sederhana:** Ukuran instruksi seragam (umumnya 4 byte) dengan eksekusi 1 siklus clock per instruksi.
- **Arsitektur Load/Store:** Operasi aritmatika/logika hanya terjadi antar-register internal; akses memori dibatasi pada instruksi LOAD dan STORE.
- **Register Set Melimpah:** Menyediakan minimal 32 register integer general-purpose untuk menekan latensi akses memori utama.
- **Unit Kontrol Hardwired:** Mode pengalamatan sederhana memungkinkan implementasi sirkuit kontrol berbasis logika keras yang cepat.
- **Contoh Implementasi:** ARM Cortex-X4 (ARMv9.2), RISC-V SiFive P670 (RVV 1.0), Apple M-Series, SPARC, dan MIPS R2000.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>


Slide ke-8

### Karakteristik Arsitektur CISC (Complex Instruction Set Computer)

**Background & Texture:** Pale amber background with subtle layered square patterns.

**Component:** Cards

**Content:**
- **Instruksi Kompleks & Variabel:** Panjang instruksi bervariasi antara 1 hingga 15 byte, dirancang untuk menyelesaikan tugas rumit dalam satu baris kode.
- **Eksekusi Multi-Siklus:** Satu instruksi kompleks memerlukan 2 hingga 4 siklus clock atau lebih untuk rampung.
- **Mode Pengalamatan Kaya:** Mendukung lebih dari 10 mode pengalamatan, termasuk operasi aritmatika langsung pada lokasi memori.
- **Unit Kontrol Mikrokode:** Menggunakan memori kontrol mikro (microprogram control store) untuk menerjemahkan instruksi tinggi.
- **Contoh Implementasi:** Intel Core i9-13900K (Raptor Lake), AMD Ryzen 9 7950X (Zen 4), VAX, dan Motorola 68000.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#D97706" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/><polyline points="3.27 6.96 12 12.01 20.73 6.96"/><line x1="12" y1="22.08" x2="12" y2="12"/></svg>


Slide ke-9

### Profil Identifikasi Jurnal Referensi Utama

**Background & Texture:** Clean white paper texture with soft border stroke and subtle drop shadow effect.

**Component:** Container

**Content:**
- **Judul Jurnal:** RISC vs CISC: Studi Kinerja dan Efisiensi dalam Organisasi Arsitektur Komputer
- **Penulis:** Achmad Maulana, Allyssa Putri, Muhamad Alif Farras Syakir, Revan Sabilillah Saputra, & Maulina Diah Lestari
- **Jurnal Terbitan:** *Jupiter: Publikasi Ilmu Keteknikan Industri, Teknik Elektro dan Informatika* (Volume 3, Nomor 4, Tahun 2025, hlm. 157–171)
- **Identifikasi Ilmiah:** e-ISSN: 3031-349X | p-ISSN: 3031-500X | Terakreditasi **Sinta 4** | DOI: `10.61132/jupiter.v3i4.973`
- **Tinjauan Kritis:** Memberikan analisis komprehensif mengenai parameter teknis dan efisiensi daya, namun terbatas pada tinjauan sekunder tanpa benchmarking hardware langsung.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#2563EB" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>


Slide ke-10

### Metodologi Penelitian Komparatif

**Background & Texture:** Soft blue grey background with faint flowchart node texture.

**Component:** Illustration

**Content:**
Penelitian menerapkan pendekatan kualitatif komparatif yang didasarkan pada peninjauan literatur analitis analitis:
- **Studi Literatur Sistematis:** Pengumpulan dokumentasi teknis bereputasi dari produsen prosesor utama (ARM, Intel, AMD, SiFive) serta buku teks arsitektur komputer (Hennessy & Patterson).
- **Analisis Komparatif Variabel:** Pembandingan mendalam berbasis variabel desain set instruksi, kecepatan eksekusi, daya, kompleksitas silikon, dan memori.
- **Evaluasi Performa Konseptual:** Penilaian keunggulan pada skenario komputasi general-purpose, sistem tersemat (embedded), dan edge AI.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/></svg>


Slide ke-11

### Alur Kerja Sistematis Penelitian

**Background & Texture:** Light cool background with sequential connector line accents.

**Component:** Carousel

**Content:**
1. **Identifikasi Masalah:** Menentukan batas analisis kinerja dan efisiensi pada arsitektur RISC dan CISC.
2. **Pengumpulan Literatur:** Mengompilasi dokumentasi teknis dan jurnal referensi eksekusi instruksi.
3. **Kategorisasi Metrik:** Mengelompokkan parameter evaluasi (CPI, daya Watt, mode pengalamatan, dan code size).
4. **Analisis Komparatif:** Membandingkan mekanisme eksekusi instruksi sederhana vs kompleks dan efisiensi sirkuit.
5. **Sintesis & Evaluasi:** Menilai fenomena hibridisasi dan implikasi pada prosesor modern.
6. **Kesimpulan & Saran:** Menyusun kesimpulan komprehensif serta arahan riset lanjutan.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#7C3AED" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>


Slide ke-12

### Hasil & Pembahasan: Analisis Kinerja Eksekusi

**Background & Texture:** Minimalist light gray texture with subtle horizontal speed line patterns.

**Component:** Cards

**Content:**
- **Arsitektur RISC (Kecepatan Eksekusi Sederhana):**
  - Mencapai rata-rata **CPI ≈ 1** pada prosesor ARM/RISC-V.
  - Set instruksi berukuran tetap dan unit kontrol hardwired mempercepat tahap decode.
  - Memudahkan penerapan pipelining mendalam tanpa bahaya instruksi (instruction hazard) yang rumit.
- **Arsitektur CISC (Efisiensi Jumlah Instruksi):**
  - Memerlukan **CPI 2–4+** siklus clock untuk instruksi kompleks pada Intel x86.
  - Pada operasi komputasi tingkat tinggi (seperti perkalian matriks), CISC membutuhkan baris instruksi program yang lebih sedikit.
  - Mengurangi overhead ekstraksi instruksi (fetch overhead) dari memori utama.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#EC4899" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>


Slide ke-13

### Hasil & Pembahasan: Analisis Efisiensi Energi

**Background & Texture:** Soft mint green gradient background with light energy wave vectors.

**Component:** Illustration

**Content:**
- **Keunggulan Konsumsi Daya RISC:**
  - Prosesor ARM Cortex-A mengonsumsi daya sangat rendah: **1 hingga 2 Watt**.
  - Efisiensi diperoleh dari penyederhanaan sirkuit dekoder dan pengurangan jumlah transistor aktif pada die silikon.
  - Menjadi standar mutlak untuk perangkat mobile, tablet, dan node IoT.
- **Pengelolaan Thermal & Daya CISC:**
  - Prosesor CISC performa tinggi (Intel Core i7/i9) mengonsumsi **45W hingga >200W** pada beban puncak.
  - Memerlukan mekanisme manajemen daya dinamis seperti DVFS (Dynamic Voltage and Frequency Scaling), Intel Turbo Boost, dan pendinginan aktif.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#10B981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="1" y="6" width="18" height="12" rx="2" ry="2"/><line x1="23" y1="11" x2="23" y2="13"/></svg>


Slide ke-14

### Hasil & Pembahasan: Kompleksitas Desain & Biaya Silikon

**Background & Texture:** Light golden background with subtle chip wafer grid lines.

**Component:** Cards

**Content:**
- **Kompleksitas Hardware RISC:**
  - Desain sirkuit lebih rasional dan minimalis.
  - Mengurangi luas area die silikon (die size) dan kerapatan transistor.
  - Berdampak positif pada penurunan biaya produksi dan tingkat kecacatan fabrikasi.
- **Kompleksitas Hardware CISC:**
  - Sirkuit sangat kompleks untuk mendukung dekode instruksi variatif (1–15 byte) dan >10 mode pengalamatan.
  - Menuntut biaya fabrikasi silikon yang lebih tinggi.
  - Keunggulan utama: Menghasilkan ukuran kode program (code footprint) yang jauh lebih ringkas, menghemat penggunaan RAM.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F59E0B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 18L18 6M6 6l12 12"/></svg>


Slide ke-15

### Tabel Perbandingan Parameter Kinerja (Bagian 1: Karakteristik Teknis)

**Background & Texture:** Neutral light slate background with fine clean table separator lines.

**Component:** Cards

**Content:**
- **Desain Instruksi:**
  - **RISC:** Set instruksi kecil, sederhana, ukuran tetap (umumnya 4 byte).
  - **CISC:** Set instruksi besar, kompleks, ukuran bervariasi (1–15 byte).
- **Kecepatan & Siklus Eksekusi:**
  - **RISC:** 1 siklus clock per instruksi; lebih cepat untuk instruksi dasar.
  - **CISC:** 2–4 siklus clock per instruksi kompleks.
- **Efisiensi Energi & Daya:**
  - **RISC:** Sangat hemat (1–2 Watt pada ARM Cortex-A).
  - **CISC:** Tinggi (45 Watt+ pada Intel Core i7), dikendalikan via DVFS.
- **Kompleksitas Sirkuit:**
  - **RISC:** Sirkuit sederhana (hardwired control), biaya silikon lebih murah.
  - **CISC:** Sirkuit sangat kompleks (microcode control), biaya fabrikasi lebih tinggi.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#64748B" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>


Slide ke-16

### Tabel Perbandingan Parameter Kinerja (Bagian 2: Aplikasi & Pro-Kons)

**Background & Texture:** Clean neutral background with soft vertical divider shadows.

**Component:** Cards

**Content:**
- **Ukuran Kode Program:**
  - **RISC:** Lebih besar karena instruksi dieksekusi secara atomik.
  - **CISC:** Lebih ringkas dan hemat memori utama (RAM).
- **Aplikasi Utama Industri:**
  - **RISC:** Smartphone, tablet, IoT, Apple Silicon M-Series, Edge AI.
  - **CISC:** PC Desktop, Laptop komputasi tinggi, Server Enterprise, Workstation.
- **Prosesor Utama di Pasar:**
  - **RISC:** ARM Cortex-X4, SiFive P670 (RISC-V), Apple M1/M2/M3.
  - **CISC:** Intel Core i9-13900K, AMD Ryzen 9 7950X, Intel Xeon.
- **Ringkasan Keunggulan:**
  - **RISC:** Efisiensi daya tinggi, pipelining optimal, desain rasional.
  - **CISC:** Kepadatan kode tinggi, kaya mode pengalamatan, kompatibilitas software legacy.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0284C7" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="3" width="20" height="14" rx="2" ry="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>


Slide ke-17

### Implikasi Modern & Konvergensi Hibrida Arsitektur

**Background & Texture:** Light purple-cyan gradient background with interconnected node network vectors.

**Component:** Illustration

**Content:**
Batasan teoretis antara RISC dan CISC kini semakin memudar melalui pendekatan **Konvergensi Hibrida**:
- **Prosesor CISC Modern (AMD Zen & Intel Core):**
  - Menggunakan dekoder internal untuk menerjemahkan instruksi x86 CISC yang kompleks menjadi instruksi mikro sederhana mirip RISC (**micro-operations / uops**) sebelum dieksekusi oleh mesin superscalar out-of-order.
- **Prosesor RISC Modern (Apple M-Series & ARM Neoverse):**
  - Menambahkan set instruksi khusus vektor dan matriks (seperti ARM SME/SVE) untuk mempercepat akselerasi Artificial Intelligence (AI) dan grafis.
- **Lapisan Perangkat Lunak & Bahasa Pemrograman:**
  - Bahasa seperti C/C++ dan Python beroperasi secara agnostik melalui kompilator pengoptimal (LLVM/GCC) yang memanfaatkan ekstensi hardware secara adaptif.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#8B5CF6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="18" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M13 6h3a2 2 0 0 1 2 2v7"/><line x1="6" y1="9" x2="6" y2="21"/></svg>


Slide ke-18

### Kelebihan dan Kekurangan Penelitian Jurnal

**Background & Texture:** Light neutral grey with dual-toned accent split.

**Component:** Cards

**Content:**
- **Kelebihan Penelitian:**
  - Pemaparan komprehensif mengenai parameter mikrositektur kritis, efisiensi konsumsi daya, dan fenomena konvergensi hibrida.
  - Menyajikan pembaruan data teknis terkini mencakup arsitektur modern seperti ARM Cortex-X4, RISC-V SiFive P670, Intel Raptor Lake, dan AMD Zen 4.
  - Kerangka analisis sistematis dan relevan dengan dinamika industri semikonduktor terkini.
- **Kekurangan Penelitian:**
  - Ketergantungan pada analisis literatur kualitatif dan data sekunder tanpa pengujian benchmark hardware empiris secara langsung (*benchtop testing*).
  - Data kuantitatif indikator Clock Per Instruction (CPI) masih terbatas pada angka rata-rata umum yang bervariasi tergantung kompilator.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#6366F1" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>


Slide ke-19

### Kesimpulan Utama Penelitian

**Background & Texture:** Soft blue ambient background with bold structural border highlights.

**Component:** Container

**Content:**
1. **Dominasi Efisiensi RISC:** RISC unggul secara dominan dalam efisiensi energi (1–2 W), kesederhanaan hardware, dan kecepatan instruksi dasar berbasis 1 siklus, menjadikannya standar utama mobile dan IoT.
2. **Kepadatan Kode CISC:** CISC menawarkan keunggulan dalam kepadatan instruksi biner (code density) dan komputasi kompleks mandiri, menjaganya tetap dominan di pasar server dan desktop performa tinggi.
3. **Era Konvergensi Hibrida:** Evolusi arsitektur komputer tidak lagi memisahkan RISC dan CISC secara kaku, melainkan bermigrasi ke hibridisasi mikro-operasi internal untuk mencapai efisiensi daya-per-watt optimal.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#059669" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/></svg>


Slide ke-20

### Rekomendasi & Saran Strategis

**Background & Texture:** Light teal background with soft radial directional arrows pattern.

**Component:** Cards

**Content:**
- **Peneliti Lanjutan:** Melakukan pengujian tolok ukur (*benchmarking*) empiris kuantitatif pada beban kerja nyata (*real-world workload*) untuk mengukur waktu eksekusi milidetik, pelepasan termal, dan daya presisi.
- **Pengembang Perangkat Keras:** Memperluas integrasi unit akselerator domain-spesifik seperti NPU pada arsitektur load/store terbuka (RISC-V).
- **Pengembang Perangkat Lunak:** Mengoptimalkan penggunaan profil kompilator modern (LLVM/GCC) yang adaptif terhadap fitur vektorisasi hardware target.
- **Institusi Akademis & Mahasiswa:** Menekankan pemahaman mengenai prinsip hibridisasi arsitektur modern dan assembly tingkat rendah di samping teori klasik RISC/CISC.

**Icons:**
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0D9488" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>