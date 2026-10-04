export interface HiddenItem {
  id: string;
  name: string;
  icon: string;
  // Position in the full scene (% from top, % from left)
  top: number;
  left: number;
  size?: number; // size in px or rem, default 36-44px
  category: 'bentuk' | 'nombor' | 'kenderaan' | 'lain_lain';
}

export interface BackgroundElement {
  id: string;
  icon: string;
  top: number;
  left: number;
  size: number;
  opacity?: number;
  rotation?: number;
}

export interface HiddenSceneData {
  id: string;
  title: string;
  theme: 'bentuk' | 'nombor' | 'kenderaan' | 'alam_sekolah';
  description: string;
  themeGradient: string;
  // Background ambient elements that enrich the full scene
  ambientElements: BackgroundElement[];
  // Target objects to be found in the scene (kotak jawapan)
  targets: HiddenItem[];
}

export const TWENTY_HIDDEN_SCENES: HiddenSceneData[] = [
  // 1. Bandar Ceria & Kenderaan
  {
    id: 'hs_01_bandar_kenderaan',
    title: 'Pekan Ceria & Kenderaan',
    theme: 'kenderaan',
    description: 'Cari kenderaan dan objek tersembunyi di jalan raya!',
    themeGradient: 'from-sky-300 via-blue-200 to-indigo-300',
    ambientElements: [
      { id: 'b1', icon: '🏢', top: 15, left: 10, size: 48 },
      { id: 'b2', icon: '🏬', top: 12, left: 40, size: 52 },
      { id: 'b3', icon: '🏦', top: 18, left: 75, size: 46 },
      { id: 'b4', icon: '🌳', top: 48, left: 5, size: 38 },
      { id: 'b5', icon: '🚦', top: 42, left: 45, size: 34 },
      { id: 'b6', icon: '☁️', top: 5, left: 25, size: 36, opacity: 0.8 },
      { id: 'b7', icon: '☁️', top: 8, left: 70, size: 40, opacity: 0.7 },
      { id: 'b8', icon: '🛣️', top: 70, left: 50, size: 60 },
    ],
    targets: [
      { id: 't1', name: 'Kereta Polis', icon: '🚓', top: 62, left: 22, category: 'kenderaan' },
      { id: 't2', name: 'Bomba', icon: '🚒', top: 68, left: 72, category: 'kenderaan' },
      { id: 't3', name: 'Nombor 7', icon: '7️⃣', top: 22, left: 52, category: 'nombor' },
      { id: 't4', name: 'Bintang', icon: '⭐', top: 28, left: 88, category: 'bentuk' },
    ],
  },

  // 2. Taman Permainan Bentuk & Warna
  {
    id: 'hs_02_taman_bentuk',
    title: 'Taman Bentuk Geometri',
    theme: 'bentuk',
    description: 'Cari pelbagai bentuk geometri tersembunyi di taman permainan!',
    themeGradient: 'from-emerald-200 via-teal-200 to-green-300',
    ambientElements: [
      { id: 'b1', icon: '🌳', top: 20, left: 12, size: 50 },
      { id: 'b2', icon: '🌲', top: 25, left: 80, size: 46 },
      { id: 'b3', icon: '🎡', top: 15, left: 48, size: 54 },
      { id: 'b4', icon: '🌸', top: 75, left: 15, size: 32 },
      { id: 'b5', icon: '🍄', top: 78, left: 65, size: 30 },
      { id: 'b6', icon: '☀️', top: 8, left: 85, size: 44 },
    ],
    targets: [
      { id: 't1', name: 'Segi Tiga', icon: '🔺', top: 38, left: 28, category: 'bentuk' },
      { id: 't2', name: 'Bulatan Biru', icon: '🔵', top: 65, left: 42, category: 'bentuk' },
      { id: 't3', name: 'Segi Empat', icon: '🟧', top: 52, left: 82, category: 'bentuk' },
      { id: 't4', name: 'Basikal', icon: '🚲', top: 68, left: 78, category: 'kenderaan' },
    ],
  },

  // 3. Bilik Darjah & Nombor Ceria
  {
    id: 'hs_03_bilik_darjah',
    title: 'Bilik Darjah Matematik',
    theme: 'nombor',
    description: 'Cari nombor-nombor tersembunyi di dalam kelas!',
    themeGradient: 'from-amber-200 via-orange-100 to-yellow-200',
    ambientElements: [
      { id: 'b1', icon: '🏫', top: 12, left: 15, size: 48 },
      { id: 'b2', icon: '📚', top: 35, left: 10, size: 36 },
      { id: 'b3', icon: '🪑', top: 65, left: 18, size: 40 },
      { id: 'b4', icon: '🪑', top: 65, left: 75, size: 40 },
      { id: 'b5', icon: '🖼️', top: 18, left: 80, size: 38 },
      { id: 'b6', icon: '⏰', top: 15, left: 50, size: 34 },
    ],
    targets: [
      { id: 't1', name: 'Nombor 3', icon: '3️⃣', top: 38, left: 48, category: 'nombor' },
      { id: 't2', name: 'Nombor 5', icon: '5️⃣', top: 72, left: 32, category: 'nombor' },
      { id: 't3', name: 'Nombor 9', icon: '9️⃣', top: 25, left: 72, category: 'nombor' },
      { id: 't4', name: 'Bas Sekolah', icon: '🚌', top: 48, left: 85, category: 'kenderaan' },
    ],
  },

  // 4. Langit & Udara Angkasa
  {
    id: 'hs_04_angkasa_lepas',
    title: 'Angkasa Lepas & Roket',
    theme: 'kenderaan',
    description: 'Cari kenderaan angkasa dan bentuk di antara bintang!',
    themeGradient: 'from-indigo-300 via-purple-300 to-slate-400',
    ambientElements: [
      { id: 'b1', icon: '🌌', top: 10, left: 50, size: 60, opacity: 0.6 },
      { id: 'b2', icon: '🌙', top: 15, left: 15, size: 45 },
      { id: 'b3', icon: '🪐', top: 22, left: 78, size: 50 },
      { id: 'b4', icon: '✨', top: 45, left: 35, size: 30 },
      { id: 'b5', icon: '☄️', top: 70, left: 80, size: 36 },
    ],
    targets: [
      { id: 't1', name: 'Roket', icon: '🚀', top: 48, left: 45, category: 'kenderaan' },
      { id: 't2', name: 'Kapal Terbang', icon: '✈️', top: 68, left: 18, category: 'kenderaan' },
      { id: 't3', name: 'Bintang Emas', icon: '⭐', top: 32, left: 62, category: 'bentuk' },
      { id: 't4', name: 'Nombor 1', icon: '1️⃣', top: 28, left: 25, category: 'nombor' },
    ],
  },

  // 5. Lautan Biru & Pelabuhan
  {
    id: 'hs_05_pelabuhan_laut',
    title: 'Lautan Biru & Pelabuhan',
    theme: 'kenderaan',
    description: 'Cari kapal laut dan hidupan di sekitar pelabuhan!',
    themeGradient: 'from-sky-300 via-teal-200 to-blue-300',
    ambientElements: [
      { id: 'b1', icon: '🌊', top: 60, left: 20, size: 44, opacity: 0.8 },
      { id: 'b2', icon: '🌊', top: 65, left: 70, size: 44, opacity: 0.8 },
      { id: 'b3', icon: '🏝️', top: 15, left: 80, size: 50 },
      { id: 'b4', icon: '⚓', top: 35, left: 12, size: 38 },
      { id: 'b5', icon: '🐬', top: 78, left: 55, size: 36 },
    ],
    targets: [
      { id: 't1', name: 'Kapal Layar', icon: '⛵', top: 35, left: 48, category: 'kenderaan' },
      { id: 't2', name: 'Kapal Laut', icon: '🚢', top: 25, left: 28, category: 'kenderaan' },
      { id: 't3', name: 'Segi Empat Merah', icon: '🟥', top: 70, left: 32, category: 'bentuk' },
      { id: 't4', name: 'Nombor 4', icon: '4️⃣', top: 52, left: 82, category: 'nombor' },
    ],
  },

  // 6. Stesen Kereta Api
  {
    id: 'hs_06_stesen_keretaapi',
    title: 'Stesen Kereta Api Cergas',
    theme: 'kenderaan',
    description: 'Cari objek tersembunyi di landasan dan peron!',
    themeGradient: 'from-amber-200 via-stone-200 to-sky-300',
    ambientElements: [
      { id: 'b1', icon: '🚉', top: 15, left: 20, size: 52 },
      { id: 'b2', icon: '🛤️', top: 65, left: 50, size: 60 },
      { id: 'b3', icon: '🧳', top: 55, left: 15, size: 32 },
      { id: 'b4', icon: '🎟️', top: 35, left: 78, size: 30 },
    ],
    targets: [
      { id: 't1', name: 'Kereta Api Laju', icon: '🚄', top: 52, left: 58, category: 'kenderaan' },
      { id: 't2', name: 'Helikopter', icon: '🚁', top: 18, left: 72, category: 'kenderaan' },
      { id: 't3', name: 'Bulatan Kuning', icon: '🟡', top: 38, left: 35, category: 'bentuk' },
      { id: 't4', name: 'Nombor 2', icon: '2️⃣', top: 72, left: 22, category: 'nombor' },
    ],
  },

  // 7. Ladang Ceria & Haiwan
  {
    id: 'hs_07_ladang_ceria',
    title: 'Ladang Hijau & Haiwan',
    theme: 'alam_sekolah',
    description: 'Cari traktor dan bentuk tersembunyi di ladang!',
    themeGradient: 'from-lime-200 via-emerald-200 to-amber-200',
    ambientElements: [
      { id: 'b1', icon: '🏡', top: 15, left: 25, size: 50 },
      { id: 'b2', icon: '🐄', top: 45, left: 15, size: 40 },
      { id: 'b3', icon: '🐑', top: 55, left: 78, size: 38 },
      { id: 'b4', icon: '🌾', top: 72, left: 12, size: 34 },
    ],
    targets: [
      { id: 't1', name: 'Traktor', icon: '🚜', top: 62, left: 48, category: 'kenderaan' },
      { id: 't2', name: 'Bentuk Hati', icon: '❤️', top: 22, left: 75, category: 'bentuk' },
      { id: 't3', name: 'Nombor 8', icon: '8️⃣', top: 38, left: 32, category: 'nombor' },
      { id: 't4', name: 'Ayam', icon: '🐔', top: 68, left: 82, category: 'lain_lain' },
    ],
  },

  // 8. Zoo Riang Kanak-Kanak
  {
    id: 'hs_08_zoo_riang',
    title: 'Ekspedisi Rimba Zoo',
    theme: 'alam_sekolah',
    description: 'Cari kenderaan pelancong dan nombor di zoo!',
    themeGradient: 'from-green-200 via-teal-200 to-yellow-200',
    ambientElements: [
      { id: 'b1', icon: '🦁', top: 35, left: 18, size: 44 },
      { id: 'b2', icon: '🐘', top: 25, left: 75, size: 48 },
      { id: 'b3', icon: '🌴', top: 15, left: 45, size: 42 },
      { id: 'b4', icon: '🦒', top: 58, left: 82, size: 46 },
    ],
    targets: [
      { id: 't1', name: 'Kereta Safari', icon: '🚙', top: 68, left: 38, category: 'kenderaan' },
      { id: 't2', name: 'Nombor 6', icon: '6️⃣', top: 18, left: 22, category: 'nombor' },
      { id: 't3', name: 'Bentuk Berlian', icon: '🔷', top: 48, left: 52, category: 'bentuk' },
      { id: 't4', name: 'Monyet', icon: '🐒', top: 32, left: 82, category: 'lain_lain' },
    ],
  },

  // 9. Pasaraya Buah & Makanan
  {
    id: 'hs_09_pasaraya_buah',
    title: 'Pasaraya Buah Segar',
    theme: 'bentuk',
    description: 'Cari bentuk dan nombor tersembunyi di rak buah!',
    themeGradient: 'from-rose-200 via-amber-200 to-orange-200',
    ambientElements: [
      { id: 'b1', icon: '🏬', top: 12, left: 20, size: 50 },
      { id: 'b2', icon: '🛒', top: 62, left: 18, size: 40 },
      { id: 'b3', icon: '🍎', top: 45, left: 75, size: 36 },
      { id: 'b4', icon: '🍌', top: 52, left: 12, size: 34 },
    ],
    targets: [
      { id: 't1', name: 'Segi Tiga Hijau', icon: '🔺', top: 28, left: 62, category: 'bentuk' },
      { id: 't2', name: 'Lori Buah', icon: '🚚', top: 68, left: 65, category: 'kenderaan' },
      { id: 't3', name: 'Nombor 10', icon: '🔟', top: 22, left: 38, category: 'nombor' },
      { id: 't4', name: 'Bintang Jingga', icon: '⭐', top: 42, left: 45, category: 'bentuk' },
    ],
  },

  // 10. Tapak Pembinaan Gagah
  {
    id: 'hs_10_pembinaan',
    title: 'Tapak Pembinaan Gagah',
    theme: 'kenderaan',
    description: 'Cari jentera pembinaan dan nombor keselamatan!',
    themeGradient: 'from-yellow-200 via-amber-300 to-stone-300',
    ambientElements: [
      { id: 'b1', icon: '🏗️', top: 15, left: 25, size: 56 },
      { id: 'b2', icon: '🧱', top: 68, left: 15, size: 38 },
      { id: 'b3', icon: '🚧', top: 45, left: 80, size: 36 },
      { id: 'b4', icon: '⚠️', top: 22, left: 72, size: 32 },
    ],
    targets: [
      { id: 't1', name: 'Lori Simen', icon: '🚛', top: 62, left: 52, category: 'kenderaan' },
      { id: 't2', name: 'Segi Empat Kuning', icon: '🟨', top: 42, left: 32, category: 'bentuk' },
      { id: 't3', name: 'Topi Keselamatan', icon: '⛑️', top: 32, left: 62, category: 'lain_lain' },
      { id: 't4', name: 'Nombor 3', icon: '3️⃣', top: 72, left: 82, category: 'nombor' },
    ],
  },

  // 11. Lapangan Terbang Antarabangsa
  {
    id: 'hs_11_lapangan_terbang',
    title: 'Lapangan Terbang Melayang',
    theme: 'kenderaan',
    description: 'Cari kenderaan udara dan nombor terminal!',
    themeGradient: 'from-blue-200 via-sky-200 to-cyan-200',
    ambientElements: [
      { id: 'b1', icon: '🏢', top: 15, left: 18, size: 48 },
      { id: 'b2', icon: '🛫', top: 25, left: 75, size: 42 },
      { id: 'b3', icon: '🧳', top: 65, left: 25, size: 34 },
      { id: 'b4', icon: '☁️', top: 10, left: 50, size: 40 },
    ],
    targets: [
      { id: 't1', name: 'Helikopter', icon: '🚁', top: 32, left: 38, category: 'kenderaan' },
      { id: 't2', name: 'Kapal Terbang', icon: '✈️', top: 58, left: 68, category: 'kenderaan' },
      { id: 't3', name: 'Nombor 7', icon: '7️⃣', top: 22, left: 48, category: 'nombor' },
      { id: 't4', name: 'Bulatan Hijau', icon: '🟢', top: 72, left: 45, category: 'bentuk' },
    ],
  },

  // 12. Pantai Ceria Musim Cuti
  {
    id: 'hs_12_pantai_ceria',
    title: 'Pantai & Ombak Berseri',
    theme: 'alam_sekolah',
    description: 'Cari bot dan bentuk di pantai berpasir!',
    themeGradient: 'from-cyan-200 via-sky-200 to-amber-200',
    ambientElements: [
      { id: 'b1', icon: '🏖️', top: 52, left: 18, size: 44 },
      { id: 'b2', icon: '🌴', top: 18, left: 12, size: 48 },
      { id: 'b3', icon: '🦀', top: 78, left: 28, size: 30 },
      { id: 'b4', icon: '☀️', top: 10, left: 82, size: 44 },
    ],
    targets: [
      { id: 't1', name: 'Bot Laju', icon: '🚤', top: 42, left: 62, category: 'kenderaan' },
      { id: 't2', name: 'Bintang Laut', icon: '⭐', top: 68, left: 72, category: 'bentuk' },
      { id: 't3', name: 'Nombor 5', icon: '5️⃣', top: 28, left: 42, category: 'nombor' },
      { id: 't4', name: 'Pelampung', icon: '🛟', top: 72, left: 48, category: 'lain_lain' },
    ],
  },

  // 13. Taman Bunga & Rama-Rama
  {
    id: 'hs_13_taman_bunga',
    title: 'Taman Bunga Menawan',
    theme: 'bentuk',
    description: 'Cari bentuk bunga dan nombor di celah daun!',
    themeGradient: 'from-pink-200 via-purple-200 to-emerald-200',
    ambientElements: [
      { id: 'b1', icon: '🌺', top: 22, left: 20, size: 42 },
      { id: 'b2', icon: '🌻', top: 55, left: 15, size: 44 },
      { id: 'b3', icon: '🌷', top: 62, left: 82, size: 40 },
      { id: 'b4', icon: '🌿', top: 38, left: 52, size: 36 },
    ],
    targets: [
      { id: 't1', name: 'Rama-Rama', icon: '🦋', top: 25, left: 72, category: 'lain_lain' },
      { id: 't2', name: 'Bulatan Merah', icon: '🔴', top: 48, left: 28, category: 'bentuk' },
      { id: 't3', name: 'Nombor 9', icon: '9️⃣', top: 72, left: 52, category: 'nombor' },
      { id: 't4', name: 'Basikal', icon: '🚲', top: 32, left: 38, category: 'kenderaan' },
    ],
  },

  // 14. Karnival & Taman Tema
  {
    id: 'hs_14_karnival',
    title: 'Karnival Ria Kanak-Kanak',
    theme: 'bentuk',
    description: 'Cari kenderaan mini dan bentuk di karnival!',
    themeGradient: 'from-fuchsia-200 via-pink-200 to-yellow-200',
    ambientElements: [
      { id: 'b1', icon: '🎪', top: 15, left: 25, size: 54 },
      { id: 'b2', icon: '🎈', top: 25, left: 80, size: 38 },
      { id: 'b3', icon: '🍿', top: 68, left: 18, size: 34 },
      { id: 'b4', icon: '🎡', top: 20, left: 55, size: 48 },
    ],
    targets: [
      { id: 't1', name: 'Kereta Lumba', icon: '🏎️', top: 68, left: 62, category: 'kenderaan' },
      { id: 't2', name: 'Segi Tiga Kuning', icon: '🔺', top: 45, left: 18, category: 'bentuk' },
      { id: 't3', name: 'Nombor 4', icon: '4️⃣', top: 35, left: 38, category: 'nombor' },
      { id: 't4', name: 'Bintang', icon: '⭐', top: 52, left: 82, category: 'bentuk' },
    ],
  },

  // 15. Balai Bomba Pantas
  {
    id: 'hs_15_balai_bomba',
    title: 'Balai Bomba Penyelamat',
    theme: 'kenderaan',
    description: 'Cari peralatan bomba dan nombor kecemasan!',
    themeGradient: 'from-red-200 via-orange-200 to-amber-200',
    ambientElements: [
      { id: 'b1', icon: '🏢', top: 15, left: 20, size: 50 },
      { id: 'b2', icon: '🚒', top: 55, left: 25, size: 48 },
      { id: 'b3', icon: '🧯', top: 42, left: 82, size: 36 },
      { id: 'b4', icon: '🚨', top: 22, left: 68, size: 34 },
    ],
    targets: [
      { id: 't1', name: 'Ambulans', icon: '🚑', top: 65, left: 72, category: 'kenderaan' },
      { id: 't2', name: 'Nombor 9', icon: '9️⃣', top: 32, left: 45, category: 'nombor' },
      { id: 't3', name: 'Segi Empat Merah', icon: '🟥', top: 68, left: 45, category: 'bentuk' },
      { id: 't4', name: 'Air Bomba', icon: '💧', top: 38, left: 22, category: 'lain_lain' },
    ],
  },

  // 16. Pusat Sains & Robotik
  {
    id: 'hs_16_pusat_sains',
    title: 'Makmal Sains & Robot',
    theme: 'nombor',
    description: 'Cari alat sains dan nombor di makmal!',
    themeGradient: 'from-violet-200 via-indigo-200 to-cyan-200',
    ambientElements: [
      { id: 'b1', icon: '🔬', top: 35, left: 15, size: 40 },
      { id: 'b2', icon: '🤖', top: 25, left: 75, size: 46 },
      { id: 'b3', icon: '🧪', top: 65, left: 20, size: 36 },
      { id: 'b4', icon: '💡', top: 15, left: 45, size: 38 },
    ],
    targets: [
      { id: 't1', name: 'Roket Mini', icon: '🚀', top: 58, left: 52, category: 'kenderaan' },
      { id: 't2', name: 'Nombor 2', icon: '2️⃣', top: 42, left: 68, category: 'nombor' },
      { id: 't3', name: 'Bentuk Berlian', icon: '🔷', top: 68, left: 78, category: 'bentuk' },
      { id: 't4', name: 'Magnet', icon: '🧲', top: 28, left: 32, category: 'lain_lain' },
    ],
  },

  // 17. Kem Hutan Rimba
  {
    id: 'hs_17_kem_hutan',
    title: 'Perkhemahan Di Hutan',
    theme: 'alam_sekolah',
    description: 'Cari khemah dan bentuk tersembunyi di hutan!',
    themeGradient: 'from-emerald-300 via-green-200 to-teal-300',
    ambientElements: [
      { id: 'b1', icon: '🏕️', top: 45, left: 22, size: 50 },
      { id: 'b2', icon: '🌲', top: 15, left: 12, size: 46 },
      { id: 'b3', icon: '🌲', top: 18, left: 82, size: 46 },
      { id: 'b4', icon: '🔥', top: 68, left: 48, size: 38 },
    ],
    targets: [
      { id: 't1', name: 'Motosikal Rimba', icon: '🏍️', top: 58, left: 75, category: 'kenderaan' },
      { id: 't2', name: 'Bintang Malam', icon: '⭐', top: 15, left: 52, category: 'bentuk' },
      { id: 't3', name: 'Nombor 1', icon: '1️⃣', top: 38, left: 62, category: 'nombor' },
      { id: 't4', name: 'Burung Hantu', icon: '🦉', top: 28, left: 28, category: 'lain_lain' },
    ],
  },

  // 18. Bandar Malam Lampu Neon
  {
    id: 'hs_18_bandar_malam',
    title: 'Bandar Malam Bercahaya',
    theme: 'kenderaan',
    description: 'Cari teksi dan bentuk lampu di bandar malam!',
    themeGradient: 'from-slate-400 via-indigo-300 to-blue-400',
    ambientElements: [
      { id: 'b1', icon: '🌃', top: 15, left: 25, size: 56, opacity: 0.8 },
      { id: 'b2', icon: '🌙', top: 12, left: 82, size: 40 },
      { id: 'b3', icon: '🚦', top: 48, left: 18, size: 36 },
      { id: 'b4', icon: '🛣️', top: 68, left: 50, size: 58 },
    ],
    targets: [
      { id: 't1', name: 'Teksi', icon: '🚕', top: 65, left: 68, category: 'kenderaan' },
      { id: 't2', name: 'Skuter', icon: '🛴', top: 58, left: 28, category: 'kenderaan' },
      { id: 't3', name: 'Bulatan Biru', icon: '🔵', top: 35, left: 52, category: 'bentuk' },
      { id: 't4', name: 'Nombor 8', icon: '8️⃣', top: 25, left: 42, category: 'nombor' },
    ],
  },

  // 19. Perpustakaan Pintar
  {
    id: 'hs_19_perpustakaan',
    title: 'Perpustakaan Buku Cilik',
    theme: 'nombor',
    description: 'Cari nombor buku dan bentuk tersembunyi!',
    themeGradient: 'from-amber-100 via-orange-100 to-yellow-200',
    ambientElements: [
      { id: 'b1', icon: '📚', top: 22, left: 20, size: 44 },
      { id: 'b2', icon: '📖', top: 55, left: 75, size: 38 },
      { id: 'b3', icon: '🪑', top: 62, left: 22, size: 38 },
      { id: 'b4', icon: '🪴', top: 35, left: 82, size: 34 },
    ],
    targets: [
      { id: 't1', name: 'Nombor 6', icon: '6️⃣', top: 42, left: 48, category: 'nombor' },
      { id: 't2', name: 'Bentuk Hati', icon: '❤️', top: 28, left: 62, category: 'bentuk' },
      { id: 't3', name: 'Pensel', icon: '✏️', top: 68, left: 45, category: 'lain_lain' },
      { id: 't4', name: 'Bas Sekolah', icon: '🚌', top: 18, left: 42, category: 'kenderaan' },
    ],
  },

  // 20. Padang Sukan Cergas
  {
    id: 'hs_20_padang_sukan',
    title: 'Stadium & Padang Sukan',
    theme: 'bentuk',
    description: 'Cari bola, nombor pemain dan kenderaan sukan!',
    themeGradient: 'from-emerald-200 via-teal-200 to-green-300',
    ambientElements: [
      { id: 'b1', icon: '🏟️', top: 15, left: 25, size: 52 },
      { id: 'b2', icon: '⚽', top: 62, left: 20, size: 38 },
      { id: 'b3', icon: '🏆', top: 25, left: 78, size: 40 },
      { id: 'b4', icon: '⛳', top: 45, left: 82, size: 34 },
    ],
    targets: [
      { id: 't1', name: 'Basikal', icon: '🚲', top: 68, left: 65, category: 'kenderaan' },
      { id: 't2', name: 'Nombor 10', icon: '🔟', top: 38, left: 52, category: 'nombor' },
      { id: 't3', name: 'Segi Empat Biru', icon: '🟦', top: 52, left: 32, category: 'bentuk' },
      { id: 't4', name: 'Bintang Emas', icon: '⭐', top: 22, left: 45, category: 'bentuk' },
    ],
  },
];
