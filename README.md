# Pelita Desa Outbound

Pelita Desa Outbound adalah platform web modern untuk wahana edukasi luar ruang "Pelita Desa". Website ini dirancang untuk memberikan informasi lengkap mengenai paket wisata edukasi, fasilitas, dan aktivitas yang tersedia, serta memudahkan calon pengunjung untuk melakukan reservasi.

Dibangun menggunakan **Next.js 16**, **Tailwind CSS v4**, dan **TypeScript**, aplikasi ini menawarkan performa tinggi, desain responsif, dan pengalaman pengguna yang interaktif.

## Fitur Utama

### 🌟 Pengunjung (Public)
*   **Katalog Paket Outbound**: Informasi detail mengenai paket edukasi (Edu 1, Edu 2, Camping Ground, dll) beserta harga, fasilitas, dan aktivitas.
*   **Galeri Aktivitas & Fasilitas**: Tampilan visual kegiatan outbound dan fasilitas yang tersedia.
*   **Formulir Reservasi**: Kemudahan bagi pengunjung untuk mengirim permintaan booking langsung via WhatsApp.
*   **Testimoni Pengunjung**: Menampilkan ulasan dari pengunjung sebelumnya (integrasi Google Reviews).
*   **Informasi Kontak & Lokasi**: Peta lokasi dan kontak yang mudah dihubungi.
*   **PWA Support**: Dapat diinstal sebagai aplikasi di perangkat mobile.

### 🛡️ Admin Dashboard
*   **Manajemen Paket**: Tambah, ubah, atau non-aktifkan paket outbound.
*   **Manajemen Galeri**: Upload dan kelola foto-foto kegiatan.
*   **Manajemen Konten**: Update informasi "Tentang Kami" dan "Kontak".
*   **Statistik**: Melihat ringkasan pengunjung dan aktivitas.

## Teknologi yang Digunakan

*   **Framework**: [Next.js 16](https://nextjs.org/) (App Router)
*   **Bahasa**: [TypeScript](https://www.typescriptlang.org/)
*   **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
*   **Animasi**: [Framer Motion](https://www.framer.com/motion/)
*   **Ikon**: [Lucide React](https://lucide.dev/)
*   **Carousel**: [Swiper](https://swiperjs.com/)
*   **Notifikasi**: [Sonner](https://sonner.emilkowal.ski/)
*   **PWA**: [next-pwa](https://www.npmjs.com/package/next-pwa)

## Prasyarat

Sebelum memulai, pastikan Anda telah menginstal:

*   [Node.js](https://nodejs.org/) (Versi 18 atau lebih baru)
*   [npm](https://www.npmjs.com/) atau yarn/pnpm

## Instalasi & Pengembangan

1.  **Clone repositori:**
    ```bash
    git clone https://github.com/username/outbound-next.git
    cd outbound-next
    ```

2.  **Instal dependensi:**
    ```bash
    npm install
    ```

3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Buka [http://localhost:3000](http://localhost:3000) di browser Anda.

## Build & Deploy

### Deployment ke cPanel (Static Export)

Proyek ini telah dikonfigurasi untuk deployment ke hosting statis (seperti **cPanel** public_html) tanpa memerlukan Node.js server.

1.  **Jalankan perintah build:**
    ```bash
    npm run build
    ```
    Perintah ini akan menghasilkan folder `out/` yang berisi file HTML, CSS, dan JS statis.

2.  **Upload ke cPanel:**
    *   Compress (zip) seluruh isi folder `out/`.
    *   Upload file zip ke folder `public_html` di File Manager cPanel.
    *   Ekstrak file zip tersebut.

**Catatan:** Karena menggunakan mode `static export`, fitur API Routes dan Middleware server-side tidak akan berjalan. Logika dinamis ditangani di sisi klien (Client-side rendering).

### Deployment ke Vercel/Node.js Server

Jika ingin menggunakan fitur server-side (seperti API Routes), ubah konfigurasi `next.config.ts`:

1.  Ganti `output: 'export'` menjadi `output: 'standalone'`.
2.  Hapus `generateStaticParams` di `src/app/package/[id]/page.tsx` jika tidak diperlukan lagi.
3.  Jalankan `npm run build`.
4.  Gunakan `node server.js` (dari folder `dist` atau `.next/standalone`) untuk menjalankan server.

## Struktur Proyek

```
outbound-next/
├── public/              # Aset statis (gambar, ikon, manifest)
├── src/
│   ├── app/             # Next.js App Router (Halaman & Layout)
│   ├── assets/          # Aset gambar yang diimport di kode
│   ├── components/      # Komponen React (UI, Sections, Layout)
│   ├── context/         # React Context (State Management)
│   ├── data/            # Data statis awal (Initial Data)
│   ├── services/        # Service logic (Storage, API)
│   ├── styles/          # Global styles
│   ├── types/           # TypeScript definitions
│   └── utils/           # Helper functions
├── next.config.ts       # Konfigurasi Next.js
├── tailwind.config.ts   # Konfigurasi Tailwind CSS
└── package.json         # Dependensi & Scripts
```

## Lisensi

[MIT License](LICENSE)
