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
