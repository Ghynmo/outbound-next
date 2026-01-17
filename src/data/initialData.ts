import { assets } from '../assets/images';

import { StaticImageData } from 'next/image';

export interface Package {
  id: string;
  title: string;
  price: string;
  unit: string;
  image: string | StaticImageData;
  description: string;
  features: string[];
  games: string[];
  facilities: string[];
  levels: string[];
  duration: string;
  location: string;
  isActive: boolean;
  category: string;
  // New detailed fields
  activities_detail?: { title: string; description: string }[];
  facilities_detail?: string[];
  menu?: {
    welcome?: string;
    snack?: string;
    makan_siang_anak?: string;
    makan_siang_dewasa?: string;
    makan_malam?: string;
    sarapan?: string;
    [key: string]: string | undefined;
  };
  requirements?: string[];
  notes?: string[];
  gallery?: (string | StaticImageData)[];
}

export interface GalleryItem {
  id: string;
  src: string | StaticImageData;
  category: string;
  title: string;
  description?: string;
}

export interface TeamMember {
  id: string;
  name: string;
  position: string;
  photo: string;
}

export interface AboutContent {
  title: string;
  subtitle: string;
  whoWeAre: string;
  vision: string;
  mission: string;
  values: string;
  team: TeamMember[];
}

export interface ContactInfo {
  email: string;
  phone: string[];
  address: string;
  mapsUrl: string;
  instagram: string;
  facebook: string;
  youtube: string;
}

export const initialPackages: Package[] = [
  {
    id: 'paket-edu-1',
    title: 'Paket EDU 1',
    price: 'Rp.150.000',
    unit: '/orang',
    image: assets.packageImg1,
    description: 'Berfokus pada edukasi pertanian yang mengenalkan alam secara langsung, dilengkapi dengan berbagai permainan tambahan yang seru dan mendidik.',
    features: [
      'Flying Fox', 'Rakit Kita', 'Tangkap Ikan', 'Program Pak Tani', 'Program Sapi Perah',
      'Program Tanah Liat', 'Pipa Bocor', 'Tarik Tambang', 'Vampir Cina', 'Hola Hop',
      'Human Tower', 'Transfer Pipa', 'Bakiak', 'Twoline', 'Burma Bridge',
      'V-Bridge Besi', 'Jembatan Goyang', 'Jembatan Monkey', 'Spider Block', 'Titian Ban',
      'X-Cave', 'Tiket Masuk', 'Welcome Drink', 'Makan Siang', 'Snack', 'Souvenir'
    ],
    games: [
      'Flying Fox', 'Rakit Kita', 'Tangkap Ikan', 'Program Pak Tani', 'Program Sapi Perah',
      'Program Tanah Liat', 'Pipa Bocor', 'Tarik Tambang', 'Vampir Cina', 'Hola Hop',
      'Human Tower', 'Transfer Pipa', 'Bakiak', 'Twoline', 'Burma Bridge',
      'V-Bridge Besi', 'Jembatan Goyang', 'Jembatan Monkey', 'Spider Block', 'Titian Ban',
      'X-Cave'
    ],
    facilities: [
      'Tiket Masuk', 'Welcome Drink', 'Makan Siang', 'Snack', 'Souvenir', 'Aula'
    ],
    levels: ['Play Ground-TK-SD', 'SMP-SMA-Umum'],
    duration: '1 Hari (08.00 - Selesai)',
    location: 'Pelita Desa Ciseeng, Edu 1',
    isActive: true,
    category: 'Edukasi',
    menu: {
        welcome: 'Jagung Rebus & Teh Manis Hangat',
        snack: 'Bakso, Air Mineral',
        makan_siang_anak: 'Nasi Putih, Ayam Goreng Tepung, Sup Ayam, Perkedel Jagung, Krupuk, Buah Semangka, Air Mineral',
        makan_siang_dewasa: 'Nasi Putih, Ayam Bakar, Sayur Asem, Perkedel Jagung, Ikan Asin, Lalapan + Sambal, Kerupuk, Buah Semangka, Air Mineral'
    },
    requirements: [
        'Kaos Kaki 2 Pasang',
        'Pakaian Ganti Lengkap',
        'Peralatan Mandi',
        'Peralatan Sholat',
        'Obat Pribadi',
        'Tidak disarankan membawa Barang-Barang Berharga',
        'Setiap kelompok pengunjung diharuskan membawa 1 orang petugas untuk stand by di Area Peristirahatan'
    ],
    notes: [
        'Bila makan siang di box, akan dikenakan biaya'
    ],
    gallery: [
      assets.packageGalleryEdu1_1,
      assets.packageGalleryEdu1_2,
      assets.packageGalleryEdu1_3,
      assets.packageGalleryEdu1_4,
      assets.packageGalleryEdu1_5,
      assets.packageGalleryEdu1_6
    ]
  },
  {
    id: 'paket-edu-2',
    title: 'Paket EDU 2',
    price: 'Rp.150.000',
    unit: '/orang',
    image: assets.packageImg2,
    description: 'Fokus pada edukasi perairan dan aktivitas air yang menantang, dilengkapi dengan permainan tambahan untuk melatih ketangkasan dan kerjasama tim.',
    features: [
      'Memanah', 'Tower Champion', 'Pengolahan Tahu', 'Membatik',
      'Jamu Tradisional', 'Hand Boat', 'Tank Gulung', 'Samurai',
      'Mencari Kawan', 'Kiri Kanan', 'Ular Naga Air', 'Estafet Air Peralon',
      'Tarik Pipa', 'Berang-Berang', 'Jembatan Goyang', 'V-Bridge', 'Monkey Bridge',
      'Bak Goyang', 'Aqua Scape', 'Tiket Masuk', 'Welcome Drink', 'Makan Siang', 'Snack'
    ],
    games: [
      'Memanah', 'Tower Champion', 'Pengolahan Tahu', 'Membatik',
      'Jamu Tradisional', 'Hand Boat', 'Tank Gulung', 'Samurai',
      'Mencari Kawan', 'Kiri Kanan', 'Ular Naga Air', 'Estafet Air Peralon',
      'Tarik Pipa', 'Berang-Berang', 'Jembatan Goyang', 'V-Bridge', 'Monkey Bridge',
      'Bak Goyang', 'Aqua Scape'
    ],
    facilities: [
      'Tiket Masuk', 'Welcome Drink', 'Makan Siang', 'Snack', 'Aula'
    ],
    levels: ['SD-Dewasa'],
    duration: '1 Hari (08.00 - Selesai)',
    location: 'Pelita Desa Ciseeng, Edu 2',
    isActive: true,
    category: 'Edukasi',
    menu: {
        welcome: 'Jagung Rebus & Teh Manis Hangat',
        snack: 'Bakso, Air Mineral',
        makan_siang_anak: 'Nasi Putih, Ayam Goreng Tepung, Sup Ayam, Perkedel Jagung, Krupuk, Buah Semangka, Air Mineral',
        makan_siang_dewasa: 'Nasi Putih, Ayam Bakar, Sayur Asem, Perkedel Jagung, Ikan Asin, Lalapan + Sambal, Kerupuk, Buah Semangka, Air Mineral'
    },
    requirements: [
        'Kaos Kaki 2 Pasang',
        'Pakaian Ganti Lengkap',
        'Peralatan Mandi',
        'Peralatan Sholat',
        'Obat Pribadi',
        'Tidak disarankan membawa Barang-Barang Berharga',
        'Setiap kelompok pengunjung diharuskan membawa 1 orang petugas untuk stand by di Area Peristirahatan'
    ],
    notes: [
        'Bila makan siang di box, akan dikenakan biaya'
    ],
    gallery: [
      assets.packageGalleryEdu2_1,
      assets.packageGalleryEdu2_2,
      assets.packageGalleryEdu2_3,
      assets.packageGalleryEdu2_4,
      assets.packageGalleryEdu2_5,
      assets.packageGalleryEdu2_6
    ]
  },
  {
    id: 'paket-camping-ground',
    title: 'Paket Camping Ground',
    price: 'Rp.300.000',
    unit: '/orang',
    image: assets.packageImg3,
    description: 'Pengalaman bermalam di alam terbuka dengan fasilitas lengkap. Nikmati suasana malam yang hangat dengan api unggun dan kebersamaan.',
    features: [
      'Tenda Dome', 'Api Unggun', 'Jurit Malam', 'Makan 3x', 'Snack 2x',
      'Outbound', 'Bakar Ikan/Jagung', 'Welcome Drink', 'Aula & Mushola', 'Toilet Bersih'
    ],
    games: [
      'Api Unggun', 'Jurit Malam', 'Outbound', 'Bakar Ikan/Jagung'
    ],
    facilities: [
      'Tenda Dome', 'Makan 3x', 'Snack 2x', 'Welcome Drink', 'Aula & Mushola', 'Toilet Bersih'
    ],
    levels: ['Anak', 'Dewasa'],
    duration: '2 Hari 1 Malam',
    location: 'Pelita Desa Ciseeng',
    isActive: true,
    category: 'Camping',
    menu: {
        welcome: 'Jagung Rebus & Teh Manis Hangat',
        snack: 'Bakso, Air Mineral',
        makan_siang_anak: 'Nasi Putih, Ayam Goreng Tepung, Sup Ayam, Perkedel Jagung, Krupuk, Buah Semangka, Air Mineral',
        makan_siang_dewasa: 'Nasi Putih, Ayam Bakar, Sayur Asem, Perkedel Jagung, Ikan Asin, Lalapan + Sambal, Kerupuk, Buah Semangka, Air Mineral'
    },
    requirements: [
        'Kaos Kaki 2 Pasang',
        'Pakaian Ganti Lengkap',
        'Peralatan Mandi',
        'Peralatan Sholat',
        'Obat Pribadi',
        'Tidak disarankan membawa Barang-Barang Berharga',
        'Setiap kelompok pengunjung diharuskan membawa 1 orang petugas untuk stand by di Area Peristirahatan'
    ],
    notes: [
        'Bila makan siang di box, akan dikenakan biaya'
    ],
    gallery: [
        assets.packageGalleryCG_1,
        assets.packageGalleryCG_2,
        assets.packageGalleryCG_3,
        assets.packageGalleryCG_4
    ]
  },
];

export const initialGallery: GalleryItem[] = [
  // Edu 1
  { id: '1', src: assets.packageGalleryEdu1_1, category: 'Edukasi', title: 'Menanam' },
  { id: '2', src: assets.packageGalleryEdu1_2, category: 'Edukasi', title: 'Flying Fox' },
  { id: '3', src: assets.packageGalleryEdu1_3, category: 'Edukasi', title: 'Rakit Kita' },
  { id: '4', src: assets.packageGalleryEdu1_4, category: 'Edukasi', title: 'Susu Sapi' },
  { id: '5', src: assets.packageGalleryEdu1_5, category: 'Edukasi', title: 'Tangkap Ikan' },
  { id: '6', src: assets.packageGalleryEdu1_6, category: 'Edukasi', title: 'Pipa Bocor' },
  // Edu 2
  { id: '7', src: assets.packageGalleryEdu2_1, category: 'Edukasi', title: 'Memanah' },
  { id: '8', src: assets.packageGalleryEdu2_2, category: 'Edukasi', title: 'Flying Fox' },
  { id: '9', src: assets.packageGalleryEdu2_3, category: 'Edukasi', title: 'Berang-berang' },
  { id: '10', src: assets.packageGalleryEdu2_4, category: 'Edukasi', title: 'Membatik' },
  { id: '11', src: assets.packageGalleryEdu2_5, category: 'Edukasi', title: 'Tower' },
  { id: '12', src: assets.packageGalleryEdu2_6, category: 'Edukasi', title: 'Jamu' },
];

export const initialAbout: AboutContent = {
  title: 'Tentang Kami',
  subtitle: 'Mengenal lebih dekat Pelita Desa, tempat di mana alam dan edukasi menyatu.',
  whoWeAre: 'Pelita Desa adalah wahana edukasi luar ruang yang berdedikasi untuk memberikan pengalaman belajar yang menyenangkan bagi semua kalangan. Berdiri sejak tahun 2006, kami telah melayani ribuan pengunjung dari berbagai sekolah, perusahaan, dan keluarga.\n\nKami percaya bahwa belajar tidak harus membosankan. Melalui metode experiential learning, kami mengajak peserta untuk berinteraksi langsung dengan alam, mempelajari kearifan lokal, dan membangun karakter positif seperti kerjasama, kepemimpinan, dan kemandirian.',
  vision: 'Menjadi pusat edukasi alam terdepan yang menginspirasi generasi muda untuk mencintai lingkungan dan budaya.',
  mission: 'Menyediakan program outbound yang aman, edukatif, dan menyenangkan dengan pelayanan prima.',
  values: 'Integritas, Keamanan, Kreativitas, dan Kepedulian terhadap Lingkungan adalah inti dari setiap aktivitas kami.',
  team: []
};

export const initialContact: ContactInfo = {
  email: 'pelitavillage@gmail.com',
  phone: ['+628569005959', '02518543456'],
  address: 'Jl. H. Miing, RT.01/RW.03, Putat Nutug, Kec. Ciseeng, Kabupaten Bogor, Jawa Barat 16120',
  mapsUrl: 'https://maps.app.goo.gl/7WdvZZsW7mJ897hHA',
  instagram: 'https://www.instagram.com/outbound_pelitadesa/?hl=id',
  facebook: 'https://facebook.com',
  youtube: 'https://youtube.com'
};

export interface Review {
  id: string;
  author_name: string;
  rating: number;
  text: string;
  profile_photo_url?: string; // For Google reviews
  relative_time_description?: string; // For Google: time ago, For Local: Role/Location
  source: 'google' | 'local';
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export const initialReviews: Review[] = [
  {
    id: 'dae7302b-a7ab-4e5f-8912-ea88e9c426cf',
    author_name: 'Pingkan Kurniawan',
    rating: 5,
    text: 'Aktivitas edukasi yg menyenangkan untuk anak2. Makan siang nya enak. Bakso nya oke. Jajanannya juga ga mahal2. Harga foto masih masuk akal 15rb/lembar.',
    profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjXKXGluajr6mKvAGsTs2WoMvvkScOAyx-T_mHgK6C3qlv12_FT4kw=s128-c0x00000000-cc-rp-mo',
    relative_time_description: 'seminggu yang lalu',
    source: 'google',
    is_visible: true,
    created_at: '2025-12-25T13:02:34.000Z',
    updated_at: '2025-12-25T13:02:34.000Z'
  },
  {
    id: '88eb5ecc-09a1-42c5-af0f-a77c9ff6e357',
    author_name: 'fredina destyorini',
    rating: 5,
    text: 'Kemarin kami rombongan kantor ke Pelita Desa. Instruktur nya ramah, seru, dan hidup terus tiap sesi acaranya. Pak Alwi, kak Susi dan pendamping lainnya yg belum sempat tanya namanya. Terima kasih ya buat semua service nya yg luar biasa dari disambut pas datang sampai bus kami pulang. Bakso, jamu, dan tahunya enak semua, dapat oleh-oleh tahu pula. Sesi yg paling berkesan, latihan panahan, karena instruksi yg sangt jelas dari mereka saya pribadi jd tiba-tiba cinta sama panahan. Terima kasih dan sukses terus Pelita Desa',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocLMBo_XyKcXtOGBDDeI0D4bI8rZ2d0_NsJpZRCcICVs1InhyG4v=s128-c0x00000000-cc-rp-mo-ba3',
    relative_time_description: 'sebulan yang lalu',
    source: 'google',
    is_visible: true,
    created_at: '2025-12-25T13:02:34.000Z',
    updated_at: '2025-12-25T13:02:34.000Z'
  },
  {
    id: '708636ff-3824-47de-945a-3c2e1cc570ed',
    author_name: 'BONG DJUNG TJHONG',
    rating: 5,
    text: 'areanya luas, ada danau, pendopo, byk permainannya, ramai dikunjungin',
    profile_photo_url: 'https://lh3.googleusercontent.com/a/ACg8ocLMbymtIqcwkFz3P8rroJsJTMnQvBmqEGJcJLuetHS5tQ-ORP4=s128-c0x00000000-cc-rp-mo',
    relative_time_description: 'seminggu yang lalu',
    source: 'google',
    is_visible: true,
    created_at: '2025-12-25T13:02:34.000Z',
    updated_at: '2025-12-25T13:02:34.000Z'
  },
  {
    id: '8e7910f1-cf15-443e-ae3d-8f28da331bf2',
    author_name: 'Anisa Susanti',
    rating: 5,
    text: 'Permainan nya dan suasananya enak banget sejuk juga. Dan permainan untuk anak2 aman. Cocok buat edukasi dan melatih keberanian anak. Keamanannya juga baik. Makanannya juga enak dan fresh',
    profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjXigPHC-9xj_WDdMj1cYKi_S9fXf3yW2g1aHBGT_VID8SIGXmKX=s128-c0x00000000-cc-rp-mo-ba3',
    relative_time_description: '2 minggu yang lalu',
    source: 'google',
    is_visible: true,
    created_at: '2025-12-25T13:02:34.000Z',
    updated_at: '2025-12-25T13:02:34.000Z'
  },
  {
    id: 'bbe2111a-a402-4d2a-82d6-70185cc037f6',
    author_name: 'Salsabilah Firdaussiah',
    rating: 5,
    text: 'Tempatnya luas, bersih, yang paling penting kamar mandinya bersih.. staffnya banyak dan ramah ramah. Menu makanan prasmanannya enak banget, gak asal asalan.\\n\\nRecommended buat acara perpisahan anak2 sekolah. Outboundnya juga cukup banyak, acara yg disediakan panitia juga gak kalah seru.',
    profile_photo_url: 'https://lh3.googleusercontent.com/a-/ALV-UjV2nG69IpNnNWA0JM4pmTE8ja8EUEARIV-7LaZoMbXdF4NLA-4V=s128-c0x00000000-cc-rp-mo-ba5',
    relative_time_description: '6 bulan lalu',
    source: 'google',
    is_visible: true,
    created_at: '2025-12-25T13:02:34.000Z',
    updated_at: '2025-12-25T13:02:34.000Z'
  }
];
