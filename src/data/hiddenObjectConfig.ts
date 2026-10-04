/**
 * Konfigurasi Modul Hidden Object S.A.S (Seronok Anak Study)
 * Modul ini menggunakan gambar yang dimuat naik oleh pengguna.
 * Tiada pencarian fail di /assets/background/ dan tiada rujukan fail seperti 09_pulau.webp.
 */

export interface HotspotItem {
  id: string;
  name: string;
  x: number; // % dari kiri (0 - 100)
  y: number; // % dari atas (0 - 100)
  radius: number; // radius sentuhan %
  hint: string;
}

export interface BackgroundScene {
  id: string;
  title: string;
  locationName: string;
  uploadKey: string;
  defaultImage?: string;
  hotspots: HotspotItem[];
}

export interface GameSession {
  sessionId: number;
  sessionTitle: string;
  sceneIds: [string, string];
}

export const HIDDEN_OBJECT_BACKGROUNDS: Record<string, BackgroundScene> = {
  // 1. Muzium Dinosaur (01_muzium_dinosaur)
  'muzium_dinosaur': {
    id: 'muzium_dinosaur',
    title: 'Muzium Dinosaur',
    locationName: 'Dewan Fosil & Prasejarah',
    uploadKey: '01_muzium_dinosaur',
    hotspots: [
      { id: 'hd_rangka_trex', name: 'Rangka T-Rex', x: 58.5, y: 28.5, radius: 8, hint: 'Di atas pelantar batu tengah dewan' },
      { id: 'hd_triceratops', name: 'Triceratops', x: 28.2, y: 44.5, radius: 7, hint: 'Di sebelah kiri dewan pameran' },
      { id: 'hd_sauropod', name: 'Leher Panjang', x: 86.5, y: 39.0, radius: 7, hint: 'Rangka leher panjang di sebelah kanan' },
      { id: 'hd_pterodactyl', name: 'Pterodactyl', x: 66.5, y: 11.5, radius: 6, hint: 'Tergantung terbang di siling muzium' },
      { id: 'hd_tengkorak', name: 'Tengkorak Fosil', x: 13.5, y: 72.0, radius: 6, hint: 'Di dalam kotak kaca hadapan kiri' },
      { id: 'hd_ammonite', name: 'Fosil Ammonite', x: 20.5, y: 88.0, radius: 5, hint: 'Di atas meja kajian bulat hadapan' },
      { id: 'hd_kanta', name: 'Kanta Pembesar', x: 31.0, y: 90.0, radius: 5, hint: 'Di sebelah fosil atas meja kajian' },
      { id: 'hd_kristal', name: 'Batu Permata', x: 47.0, y: 83.5, radius: 6, hint: 'Di dalam dulang atas meja hadapan' },
      { id: 'hd_peta_dino', name: 'Peta Dinosaur', x: 56.5, y: 92.5, radius: 6, hint: 'Terbuka luas di atas meja hadapan' },
      { id: 'hd_buku_tebal', name: 'Buku Prasejarah', x: 67.0, y: 76.5, radius: 6, hint: 'Buku bertingkat di atas meja' },
      { id: 'hd_binokular', name: 'Binokular', x: 79.5, y: 85.0, radius: 5, hint: 'Di sebelah buku atas meja hadapan' },
      { id: 'hd_beg_galas', name: 'Beg Pelawat', x: 33.5, y: 58.5, radius: 5, hint: 'Di atas bangku kayu pelawat' },
    ],
  },

  // 2. Muzium Angkasa (02_muzium_angkasawan)
  'muzium_angkasa': {
    id: 'muzium_angkasa',
    title: 'Muzium Angkasa',
    locationName: 'Pusat Penerokaan Angkasa Lepas',
    uploadKey: '02_muzium_angkasawan',
    hotspots: [
      { id: 'ha_shuttle', name: 'Space Shuttle', x: 50.8, y: 35.0, radius: 8, hint: 'Roket angkasa gergasi di tengah dewan' },
      { id: 'ha_angkasawan', name: 'Baju Angkasawan', x: 8.5, y: 50.0, radius: 6, hint: 'Di dalam almari pameran kaca kiri' },
      { id: 'ha_lunar_lander', name: 'Lunar Lander', x: 26.5, y: 44.5, radius: 7, hint: 'Di atas lanskap permukaan bulan' },
      { id: 'ha_teleskop', name: 'Teleskop Besar', x: 92.0, y: 44.0, radius: 6, hint: 'Teleskop bintang berkaki tiga' },
      { id: 'ha_rover', name: 'Mars Rover', x: 69.5, y: 52.5, radius: 6, hint: 'Kenderaan rover di bawah gerbang' },
      { id: 'ha_saturn', name: 'Model Zuhal', x: 67.5, y: 6.5, radius: 6, hint: 'Planet bergelang tergantung di siling' },
      { id: 'ha_marikh', name: 'Model Marikh', x: 40.0, y: 21.0, radius: 5, hint: 'Planet merah bulat di siling muzium' },
      { id: 'ha_skrin_suria', name: 'Skrin Sentuh', x: 26.5, y: 69.0, radius: 6, hint: 'Papan interaktif sistem suria' },
      { id: 'ha_beg_angkasa', name: 'Beg Angkasa', x: 32.5, y: 81.5, radius: 5, hint: 'Di atas bangku kayu hadapan' },
      { id: 'ha_botol_air', name: 'Botol Minuman', x: 38.6, y: 81.0, radius: 4, hint: 'Di sebelah beg atas bangku' },
      { id: 'ha_meja_suria', name: 'Meja Orbit', x: 88.0, y: 90.0, radius: 7, hint: 'Meja bulat orbit di hadapan kanan' },
      { id: 'ha_helmet_emas', name: 'Topi Keledar', x: 97.5, y: 64.0, radius: 5, hint: 'Di dalam kotak kaca hadapan kanan' },
    ],
  },
};

export const HIDDEN_OBJECT_SESSIONS: GameSession[] = [
  {
    sessionId: 1,
    sessionTitle: 'Khazanah Prasejarah & Angkasa Lepas',
    sceneIds: ['muzium_dinosaur', 'muzium_angkasa'],
  },
];
