# SPK Profile Matching – Seleksi Admin Medsos UMKM Thrifting

Aplikasi **Sistem Pendukung Keputusan (SPK)** berbasis web untuk membantu pemilik UMKM Thrifting dalam memilih kandidat Admin Media Sosial yang paling kompeten secara objektif. Sistem ini dibangun menggunakan metode **Profile Matching** dan berjalan seluruhnya di sisi klien (*client-side*) tanpa perlu instalasi server atau framework apapun.

---

## Daftar Isi
- [Konteks & Latar Belakang Proyek](#konteks--latar-belakang-proyek)
- [Sumber Data](#sumber-data)
- [Metode: Profile Matching](#metode-profile-matching)
  - [Kriteria Penilaian](#kriteria-penilaian)
  - [Tabel Konversi Bobot GAP](#tabel-konversi-bobot-gap)
  - [Pembagian Core & Secondary Factor](#pembagian-core--secondary-factor)
  - [Rumus Nilai Total](#rumus-nilai-total)
- [Fitur Aplikasi Web](#fitur-aplikasi-web)
- [Hasil Akhir Perankingan](#hasil-akhir-perankingan-output-aplikasi)
- [Teknologi](#teknologi)
- [Struktur File](#struktur-file)
- [Cara Menjalankan](#cara-menjalankan)
- [Cara Memperbarui Data Kandidat](#cara-memperbarui-data-kandidat)
- [Penjelasan Kode (untuk AI)](#penjelasan-kode-untuk-ai)
- [Referensi](#referensi)

---

## Konteks & Latar Belakang Proyek

Proyek ini merupakan **tugas mata kuliah Sistem Pendukung Keputusan (SPK) Semester 4** yang dibuat oleh:
- **Hafizh Naufal Raditya**
- **Ahmad Fikri Zakaria**
- **Raja Arcenio Ravi Hussain**

### Latar Belakang Masalah
Seorang pemilik UMKM *thrifting* di Purwokerto mengalami kesulitan dalam memilih admin media sosial secara objektif. Proses rekrutmen yang selama ini dilakukan bersifat subjektif (berdasarkan "feeling" pemilik), sehingga sering menghasilkan keputusan yang tidak tepat.

### Solusi yang Dibangun
Dibangun sebuah sistem berbasis web yang:
1. Mengambil data penilaian kandidat dari Google Form yang disebarkan ke pelamar.
2. Data hasil respons tersimpan otomatis di Google Spreadsheet.
3. Data dari Google Spreadsheet dimasukkan ke dalam file `app.js` (secara statis).
4. Sistem menghitung dan meranking semua kandidat menggunakan algoritma *Profile Matching*.
5. Hasil akhir ditampilkan di halaman web secara transparan *step-by-step*.

---

## Sumber Data

### Google Form (Input Data Pelamar)
**Link Form:** [🔗 Isi Formulir Pendaftaran Admin Medsos](https://docs.google.com/forms/d/e/1FAIpQLScVbwLEnR_KjgzibGHlYDHiOksa9AF2FaaeNUAgpI9gdUowVg/viewform)

Form ini berisi kuesioner dengan 5 kriteria penilaian yang dijawab oleh para pelamar. Jawaban diberikan dalam rentang skala nilai **1 hingga 5**.

### Google Spreadsheet (Penyimpanan Respons)
**Link Spreadsheet:** [📊 Lihat Data Respons Pelamar (Google Spreadsheet)](https://docs.google.com/spreadsheets/d/1gRrc6lCLPDKNzQ0jXFplZ6550kCpIP3t0DK2I5GiAAs/edit?usp=sharing)

Spreadsheet ini menampung semua jawaban responden secara otomatis dari Google Form.

**Struktur kolom Spreadsheet:**
| Kolom | Nama Kolom | Keterangan |
|-------|------------|------------|
| A | Timestamp | Waktu pengisian |
| B | Nama Lengkap | Identitas pelamar |
| C | K1 - Fast Response | Nilai Kriteria 1 (Core) |
| D | K2 - Copywriting | Nilai Kriteria 2 (Core) |
| E | K3 - Pemahaman Tren | Nilai Kriteria 3 (Core) |
| F | K4 - Fleksibilitas Waktu | Nilai Kriteria 4 (Secondary) |
| G | K5 - Keterampilan Desain | Nilai Kriteria 5 (Secondary) |

### Data Aktual Kandidat (dari Spreadsheet per Juni 2026)
Total **27 kandidat** yang masuk melalui Google Form (data disalin secara statik ke `app.js`):

| Nama Kandidat | K1 | K2 | K3 | K4 | K5 |
|---|---|---|---|---|---|
| Nabila Lutfia Sari | 5 | 5 | 5 | 5 | 5 |
| Rita Rahmawati | 4 | 2 | 3 | 3 | 2 |
| Dhanda Rismanda | 3 | 2 | 4 | 4 | 3 |
| Elfarizki Naufal | 3 | 4 | 2 | 2 | 3 |
| Dwi Bagus Purwo Aji | 5 | 5 | 3 | 4 | 4 |
| Haydar Ali Furqon | 5 | 4 | 5 | 4 | 5 |
| Yusuf Rafii Ahmad | 3 | 2 | 3 | 4 | 3 |
| Rizky Maulana | 4 | 3 | 4 | 5 | 4 |
| Anisa Fitriani | 5 | 4 | 5 | 3 | 4 |
| Dimas Saputra | 3 | 4 | 3 | 4 | 3 |
| Putri Wulandari | 5 | 5 | 4 | 4 | 5 |
| Kevin Pratama | 4 | 3 | 5 | 2 | 4 |
| Tiara Kusuma | 5 | 4 | 4 | 5 | 4 |
| Bima Satria | 3 | 2 | 3 | 4 | 3 |
| Nadya Aulia | 4 | 5 | 5 | 3 | 5 |
| Reza Aditya | 5 | 4 | 3 | 5 | 4 |
| Siti Fadhilah | 4 | 4 | 4 | 4 | 4 |
| Fajar Nugroho | 3 | 5 | 4 | 2 | 3 |
| Amira Ramadhani | 5 | 4 | 5 | 5 | 5 |
| Gilang Ramadhan | 4 | 3 | 4 | 4 | 3 |
| Citra Ayu | 5 | 5 | 4 | 3 | 4 |
| Dwi Susanto | 2 | 3 | 3 | 4 | 2 |
| Viona Amelia | 4 | 4 | 5 | 4 | 5 |
| Ihsan Kamil | 5 | 3 | 4 | 5 | 4 |
| Sarah Oktaviani | 4 | 5 | 4 | 3 | 3 |
| Hendra Wijaya | 3 | 4 | 5 | 4 | 3 |
| Ayu Lestari | 5 | 4 | 5 | 5 | 5 |

---

## Metode: Profile Matching

*Profile Matching* adalah metode SPK yang bekerja dengan membandingkan nilai profil pelamar (*actual profile*) dengan nilai profil ideal yang diharapkan (*target profile*). Selisih antara keduanya disebut **GAP**, dan kemudian dikonversi menjadi bobot untuk dihitung nilai akhirnya.

### Kriteria Penilaian

| Kode | Nama Kriteria | Jenis | Nilai Target Ideal |
|------|---------------|-------|--------------------|
| K1 | Fast Response (Kecepatan Merespons) | **Core Factor** | **5** |
| K2 | Copywriting (Kemampuan Menulis Konten) | **Core Factor** | **4** |
| K3 | Pemahaman Tren Sosial Media | **Core Factor** | **4** |
| K4 | Fleksibilitas Waktu | Secondary Factor | 4 |
| K5 | Keterampilan Desain Grafis | Secondary Factor | 3 |

### Tabel Konversi Bobot GAP

| Nilai GAP | Keterangan | Bobot Nilai |
|-----------|------------|-------------|
| 0 | Tidak ada selisih (Profil = Target) | 5.0 |
| 1 | Kelebihan 1 tingkat | 4.5 |
| -1 | Kekurangan 1 tingkat | 4.0 |
| 2 | Kelebihan 2 tingkat | 3.5 |
| -2 | Kekurangan 2 tingkat | 3.0 |
| 3 | Kelebihan 3 tingkat | 2.5 |
| -3 | Kekurangan 3 tingkat | 2.0 |
| 4 | Kelebihan 4 tingkat | 1.5 |
| -4 | Kekurangan 4 tingkat | 1.0 |

### Pembagian Core & Secondary Factor

- **Core Factor (Kriteria Inti):** K1, K2, K3 — bobot **60%**
- **Secondary Factor (Kriteria Pendukung):** K4, K5 — bobot **40%**

**Rumus NCF (Nilai Core Factor):**
```
NCF = (Bobot_K1 + Bobot_K2 + Bobot_K3) / 3
```

**Rumus NSF (Nilai Secondary Factor):**
```
NSF = (Bobot_K4 + Bobot_K5) / 2
```

### Rumus Nilai Total

```
Nilai Total = (60% × NCF) + (40% × NSF)
```

Kandidat diranking dari **nilai total tertinggi ke terendah**. Jika dua kandidat memiliki nilai total yang sama (*tie*), maka yang memiliki nilai NCF lebih tinggi akan ditempatkan di peringkat lebih atas.

---

## Fitur Aplikasi Web

Aplikasi menampilkan seluruh proses perhitungan secara transparan dalam 5 tahap:

### Tahap 1 — Tabel Data Pelamar & Profil Target Ideal
Menampilkan nilai mentah dari seluruh kandidat beserta nilai profil target ideal di baris terakhir (disorot dengan warna gelap agar mudah dibedakan).

### Tahap 2 — Tabel Pemetaan GAP
Menampilkan hasil selisih (GAP) antara nilai setiap kandidat dengan nilai target ideal (`Nilai Kandidat - Nilai Target`). Angka positif berarti kandidat melebihi target; negatif berarti kurang.

### Tahap 3 — Tabel Konversi Bobot GAP
Menampilkan hasil konversi nilai GAP menjadi bobot angka berdasarkan tabel standar *Profile Matching*. Nilai bobot inilah yang digunakan dalam semua perhitungan selanjutnya.

### Tahap 4 — Tabel Perhitungan NCF & NSF
Menampilkan hasil perhitungan rata-rata untuk kelompok kriteria Inti (NCF) dan Pendukung (NSF) per kandidat.

### Tahap 5 — Tabel Hasil Akhir & Perankingan ⭐
Menampilkan daftar kandidat yang telah diurutkan dari nilai total tertinggi ke terendah. Kandidat peringkat 1 (rekomendasi utama) disorot dengan warna biru khusus dan emoji mahkota 👑 agar mudah teridentifikasi.

---

## Hasil Akhir Perankingan (Output Aplikasi)

Berikut hasil perhitungan *Profile Matching* untuk seluruh **27 kandidat** (target ideal `[5, 4, 4, 4, 3]`). Kandidat dengan nilai total sama diurutkan berdasarkan NCF yang lebih tinggi.

| Peringkat | Nama Kandidat | NCF | NSF | Nilai Total |
|:---:|---|:---:|:---:|:---:|
| 🥇 1 | **Tiara Kusuma** 👑 | 5.000 | 4.500 | **4.800** |
| 2 | Siti Fadhilah | 4.667 | 4.750 | 4.700 |
| 3 | Anisa Fitriani | 4.833 | 4.250 | 4.600 |
| 4 | Haydar Ali Furqon | 4.833 | 4.250 | 4.600 |
| 5 | Putri Wulandari | 4.833 | 4.250 | 4.600 |
| 6 | Citra Ayu | 4.833 | 4.250 | 4.600 |
| 7 | Reza Aditya | 4.667 | 4.500 | 4.600 |
| 8 | Ihsan Kamil | 4.667 | 4.500 | 4.600 |
| 9 | Dwi Bagus Purwo Aji | 4.500 | 4.750 | 4.600 |
| 10 | Gilang Ramadhan | 4.333 | 5.000 | 4.600 |
| 11 | Ayu Lestari | 4.833 | 4.000 | 4.500 |
| 12 | Amira Ramadhani | 4.833 | 4.000 | 4.500 |
| 13 | Sarah Oktaviani | 4.500 | 4.500 | 4.500 |
| 14 | Hendra Wijaya | 4.167 | 5.000 | 4.500 |
| 15 | Nabila Lutfia Sari | 4.667 | 4.000 | 4.400 |
| 16 | Viona Amelia | 4.500 | 4.250 | 4.400 |
| 17 | Rizky Maulana | 4.333 | 4.500 | 4.400 |
| 18 | Dimas Saputra | 4.000 | 5.000 | 4.400 |
| 19 | Dhanda Rismanda | 3.667 | 5.000 | 4.200 |
| 20 | Nadya Aulia | 4.333 | 3.750 | 4.100 |
| 21 | Fajar Nugroho | 4.167 | 4.000 | 4.100 |
| 22 | Kevin Pratama | 4.167 | 3.750 | 4.000 |
| 23 | Bima Satria | 3.333 | 5.000 | 4.000 |
| 24 | Yusuf Rafii Ahmad | 3.333 | 5.000 | 4.000 |
| 25 | Rita Rahmawati | 3.667 | 4.000 | 3.800 |
| 26 | Elfarizki Naufal | 3.667 | 4.000 | 3.800 |
| 27 | Dwi Susanto | 3.333 | 4.500 | 3.800 |

> **Rekomendasi Utama: Tiara Kusuma** — profilnya tepat memenuhi target pada ketiga kriteria inti (K1, K2, K3 → NCF sempurna 5.000), sehingga unggul meski beberapa kandidat lain memiliki nilai mentah lebih tinggi. Ini menunjukkan karakteristik *Profile Matching*: yang dicari adalah **kesesuaian dengan profil ideal**, bukan sekadar nilai tertinggi.

> ⚠️ Nilai **K5 Ayu Lestari** masih perlu dikonfirmasi (sementara diisi `5`); hasil peringkatnya dapat sedikit berubah jika nilainya berbeda.

---

## Teknologi

| Teknologi | Keterangan |
|-----------|------------|
| **HTML5** | Struktur dan konten halaman web |
| **CSS3 (Vanilla)** | Desain antarmuka, tabel, dan layout responsif |
| **JavaScript (Vanilla)** | Logika perhitungan SPK dan rendering data dinamis ke DOM |

> **Zero dependency.** Tidak ada *library*, *framework*, atau instalasi apapun yang dibutuhkan.

---

## Struktur File

```
Web/
├── index.html   # Halaman utama, berisi kerangka 5 tabel kosong (diisi oleh JS)
├── style.css    # Desain antarmuka (clean, minimalis, profesional)
└── app.js       # Data kandidat + logika perhitungan Profile Matching + render DOM
```

---

## Cara Menjalankan

Karena seluruh aplikasi berjalan di sisi klien, cara menjalankannya sangat mudah:

1. Pastikan ketiga file (`index.html`, `style.css`, `app.js`) berada dalam satu folder yang sama.
2. Klik dua kali (*double-click*) pada file **`index.html`**.
3. File akan otomatis terbuka di *browser* default Anda (Chrome, Edge, Firefox, dll).
4. Halaman web menampilkan seluruh proses SPK dari awal hingga akhir secara otomatis.

> ✅ Tidak perlu internet, tidak perlu XAMPP, tidak perlu Node.js.

---

## Cara Memperbarui Data Kandidat

Jika ada pelamar baru dari Google Form atau data berubah, edit bagian berikut di dalam file **`app.js`**:

```javascript
// Data Pelamar — Edit bagian ini sesuai data terbaru dari Google Spreadsheet
const candidates = [
    { name: "Nama Kandidat 1", scores: [K1, K2, K3, K4, K5] },
    { name: "Nama Kandidat 2", scores: [K1, K2, K3, K4, K5] },
    // ... tambahkan kandidat baru di sini
];

// Profil Target Ideal — Sesuaikan jika kriteria target diubah oleh pemilik UMKM
const targetProfile = [5, 4, 4, 4, 3]; // [K1, K2, K3, K4, K5]
```

Simpan file, lalu *refresh* halaman di browser. Semua perhitungan akan diperbarui secara otomatis.

---

## Penjelasan Kode (untuk AI)

> Bagian ini ditulis khusus agar AI asisten yang melanjutkan proyek ini dapat langsung memahami arsitektur kode tanpa harus membaca ulang semua dokumen sumber.

### Alur Eksekusi `app.js`

1. **Deklarasi Data** — Objek `candidates` (array) menyimpan nama dan nilai tiap kandidat. Objek `targetProfile` (array) menyimpan 5 nilai target ideal.

2. **`getGapWeight(gap)`** — Fungsi *pure* yang menerima angka GAP dan mengembalikan nilai bobot berdasarkan tabel konversi. Menggunakan object `gapMap` sebagai *lookup table*.

3. **Event Listener `DOMContentLoaded`** — Seluruh logika dieksekusi setelah DOM siap. Di dalamnya:
   - **Tabel 1 (`#table-raw`):** Loop `candidates`, render baris data mentah, tambahkan baris `targetProfile` di akhir dengan class `target-row`.
   - **Tabel 2 (`#table-gap`) & Tabel 3 (`#table-weight`):** Loop `candidates` bersamaan (1 pass), hitung GAP dan Bobot GAP untuk setiap kriteria, simpan ke array `gaps[]` dan `weights[]`, render ke DOM.
   - **Tabel 4 (`#table-factors`):** Dari `weights[]` yang telah tersimpan, hitung NCF (indeks 0-2) dan NSF (indeks 3-4), simpan ke array `calculatedCandidates[]`.
   - **Tabel 5 (`#table-final`):** Sort array `calculatedCandidates` berdasarkan `total` (descending). Tie-breaker: jika `total` sama (toleransi `< 0.0001`), bandingkan `ncf`. Render hasilnya, baris pertama mendapat class `rank-1` dan label 👑.

### Struktur Objek Kandidat Setelah Kalkulasi
```javascript
{
  name: "String",
  coreSum: Number,  // Jumlah bobot K1+K2+K3
  ncf: Number,      // coreSum / 3
  secSum: Number,   // Jumlah bobot K4+K5
  nsf: Number,      // secSum / 2
  total: Number     // (0.6 * ncf) + (0.4 * nsf)
}
```

### Catatan Penting Untuk Pengembangan Selanjutnya
- **Menambah Kriteria:** Ubah `targetProfile`, tambah kolom baru di header tabel HTML (`index.html`), sesuaikan logika NCF/NSF di `app.js` (perhitungan `coreSum` dan `secSum`).
- **Mengubah Bobot (bukan lagi 60/40):** Ubah nilai `0.6` dan `0.4` pada baris kalkulasi `total` di `app.js`.
- **Integrasi API Google Sheets:** Gantikan array `candidates` statis dengan hasil `fetch()` ke Google Sheets API v4 atau hasil ekspor CSV publik.

---

## Referensi

1. **Jurnal Utama (Panduan Implementasi):**
   Hafizh Naufal Raditya, Ahmad Fikri Zakaria, Raja Arcenio Ravi Hussain. *"Sistem Pendukung Keputusan Pemilihan Admin Media Sosial UMKM Thrifting Menggunakan Metode Profile Matching"*. Jurnal Teknik Informatika dan Sistem Informasi (JUTIF), 2026.
   *(File lokal: `JUTIF-SPK.pdf` — berisi seluruh aturan kriteria, nilai target ideal, tabel bobot GAP, dan contoh perhitungan manual yang menjadi acuan kode ini.)*

2. **Materi Perkuliahan (Panduan Algoritma):**
   *"Pertemuan 11: Profile Matching"*. Slide Kuliah SPK Semester 4, 2026.
   *(File lokal: `Pert. 11. Profile Matching.pptx` — berisi definisi, langkah-langkah, dan contoh soal latihan Profile Matching dengan studi kasus "Pemilihan Rumah Tinggal" dan "Penerima Reward Pelanggan".)*

3. **Referensi Metode:**
   Sunarti dan Sundari, J., *"Perbandingan Metode SAW dan Profile Matching Pada Pemilihan Rumah Tinggal Studi Kasus: Perumahan Depok"*, Jurnal INTENSIF, Vol.2 No.2, hal. 115-126, August 2018.
