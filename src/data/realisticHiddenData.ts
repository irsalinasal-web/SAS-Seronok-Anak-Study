export interface HiddenItem {
  id: string;
  name: string;
  top: number;
  left: number;
  hint: string;
  category: 'perkakas' | 'hidupan' | 'alatan' | 'kenderaan';
}

export interface DecoyItem {
  id: string;
  name: string;
  top: number;
  left: number;
}

export interface HiddenSceneData {
  id: string;
  title: string;
  locationName: string;
  theme: 'perkhemahan' | 'perpustakaan' | 'pantai' | 'dapur';
  description: string;
  targets: HiddenItem[];
  decoys: DecoyItem[];
}

export const TWENTY_REALISTIC_SCENES: HiddenSceneData[] = [
  // 1. 🏕️ Tapak Perkhemahan Rimba (Campsite)
  {
    id: 'hs_camp_01',
    title: 'Tapak Perkhemahan Rimba',
    locationName: '🏕️ Di Tapak Perkhemahan Rimba',
    theme: 'perkhemahan',
    description: 'Cari 5 kelengkapan perkhemahan yang tersembunyi secara semula jadi!',
    targets: [
      { id: 'c_kompas', name: 'Kompas', top: 76, left: 32, hint: 'Di atas permukaan tunggul kayu', category: 'alatan' },
      { id: 'c_lampu', name: 'Lampu Suluh', top: 82, left: 18, hint: 'Di bawah rimbunan daun tepi pokok', category: 'alatan' },
      { id: 'c_beg', name: 'Beg Galas', top: 70, left: 74, hint: 'Disandarkan di sebelah khemah kanvas', category: 'perkakas' },
      { id: 'c_cerek', name: 'Cerek Camping', top: 84, left: 54, hint: 'Di atas batu unggun api', category: 'perkakas' },
      { id: 'c_tali', name: 'Tali Kembara', top: 58, left: 82, hint: 'Tergantung dekat batang pokok', category: 'alatan' },
    ],
    decoys: [
      { id: 'd_kayu_api', name: 'Kayu Api', top: 86, left: 42 },
      { id: 'd_khemah', name: 'Pancang Khemah', top: 64, left: 62 },
      { id: 'd_batu', name: 'Batu Sungai', top: 88, left: 68 },
      { id: 'd_tupai', name: 'Tupai Rimba', top: 44, left: 86 },
    ],
  },

  // 2. 📚 Perpustakaan Kanak-Kanak (Library)
  {
    id: 'hs_lib_01',
    title: 'Perpustakaan Ilmu',
    locationName: '📚 Di Ruang Membaca Perpustakaan',
    theme: 'perpustakaan',
    description: 'Cari 5 alatan membaca dan belajar di rak dan meja perpustakaan!',
    targets: [
      { id: 'l_buku', name: 'Buku', top: 62, left: 82, hint: 'Tersusun rapi di rak buku kayu', category: 'perkakas' },
      { id: 'l_pensel', name: 'Pensel', top: 68, left: 48, hint: 'Di atas meja bacaan murid', category: 'alatan' },
      { id: 'l_pemadam', name: 'Pemadam', top: 72, left: 34, hint: 'Di penjuru meja belajar', category: 'alatan' },
      { id: 'l_globe', name: 'Globe', top: 52, left: 76, hint: 'Di atas rak berdekatan buku rujukan', category: 'perkakas' },
      { id: 'l_jam', name: 'Jam Dinding', top: 20, left: 78, hint: 'Tergantung di dinding perpustakaan', category: 'alatan' },
    ],
    decoys: [
      { id: 'd_pembaris', name: 'Pembaris Kayu', top: 68, left: 58 },
      { id: 'd_krayon', name: 'Kotak Krayon', top: 74, left: 24 },
      { id: 'd_kerusi', name: 'Kerusi Kayu', top: 78, left: 65 },
      { id: 'd_bookmark', name: 'Penanda Buku', top: 58, left: 88 },
    ],
  },

  // 3. 🏖️ Pantai Peranginan Ceria (Beach)
  {
    id: 'hs_beach_01',
    title: 'Pantai Peranginan Ceria',
    locationName: '🏖️ Di Pesisir Pantai & Ombak',
    theme: 'pantai',
    description: 'Cari 5 peralatan santai di pesisir pasir dan ombak pantai!',
    targets: [
      { id: 'b_baldi', name: 'Baldi Pasir', top: 82, left: 24, hint: 'Di atas pasir berdekatan istana pasir', category: 'perkakas' },
      { id: 'b_penyodok', name: 'Penyodok', top: 84, left: 32, hint: 'Tertusuk di tepi baldi pasir', category: 'alatan' },
      { id: 'b_bola', name: 'Bola Pantai', top: 78, left: 46, hint: 'Bergolek di atas pasir pantai basah', category: 'alatan' },
      { id: 'b_topi', name: 'Topi Jerami', top: 74, left: 68, hint: 'Diletakkan di atas tikar pantai', category: 'perkakas' },
      { id: 'b_pelampung', name: 'Pelampung', top: 62, left: 35, hint: 'Terapung di gigi air ombak lautan', category: 'alatan' },
    ],
    decoys: [
      { id: 'd_tuala', name: 'Tuala Pantai', top: 78, left: 72 },
      { id: 'd_selipar', name: 'Selipar Pantai', top: 86, left: 62 },
      { id: 'd_cermin', name: 'Cermin Mata Hitam', top: 76, left: 80 },
      { id: 'd_cengkerang', name: 'Cengkerang Laut', top: 88, left: 52 },
    ],
  },

  // 4. 🍳 Dapur Idaman Ceria (Kitchen)
  {
    id: 'hs_kitchen_01',
    title: 'Dapur Masakan Ceria',
    locationName: '🍳 Di Ruang Dapur & Kaunter Masakan',
    theme: 'dapur',
    description: 'Cari 5 peralatan memasak di atas kaunter dan rak dapur!',
    targets: [
      { id: 'k_pinggan', name: 'Pinggan', top: 66, left: 32, hint: 'Di atas kaunter dapur bersih', category: 'perkakas' },
      { id: 'k_cawan', name: 'Cawan', top: 62, left: 44, hint: 'Di atas dulang minuman kaunter', category: 'perkakas' },
      { id: 'k_periuk', name: 'Periuk Sup', top: 54, left: 74, hint: 'Di atas dapur memasak', category: 'perkakas' },
      { id: 'k_cerek', name: 'Cerek Dapur', top: 52, left: 62, hint: 'Di sebelah periuk atas dapur', category: 'perkakas' },
      { id: 'k_papan', name: 'Papan Pemotong', top: 72, left: 22, hint: 'Bersandar di tepi singki kaunter', category: 'alatan' },
    ],
    decoys: [
      { id: 'd_sudu', name: 'Sudu Keluli', top: 70, left: 38 },
      { id: 'd_garfu', name: 'Garfu Makan', top: 70, left: 36 },
      { id: 'd_pisau', name: 'Pisau Buah', top: 74, left: 28 },
      { id: 'd_senduk', name: 'Senduk Sup', top: 48, left: 78 },
    ],
  },

  // 5. 🏕️ Tapak Perkhemahan Tasik Sunyi (Campsite 2)
  {
    id: 'hs_camp_02',
    title: 'Perkhemahan Tepi Tasik',
    locationName: '🏕️ Di Tepi Tasik Perkhemahan',
    theme: 'perkhemahan',
    description: 'Cari 5 peralatan penerokaan di tepi tasik hutan!',
    targets: [
      { id: 'c_binokular', name: 'Binokular', top: 72, left: 28, hint: 'Di atas bangku kayu tepi tasik', category: 'alatan' },
      { id: 'c_peta', name: 'Peta Kembara', top: 76, left: 42, hint: 'Terbuka di atas tunggul kayu meja', category: 'alatan' },
      { id: 'c_botol', name: 'Botol Air', top: 82, left: 68, hint: 'Di sebelah beg galas tepi khemah', category: 'perkakas' },
      { id: 'c_wisel', name: 'Wisel Kembara', top: 66, left: 16, hint: 'Tergantung pada dahan pokok rendah', category: 'alatan' },
      { id: 'c_cerek2', name: 'Cerek Camping', top: 84, left: 56, hint: 'Di atas batu bata unggun api', category: 'perkakas' },
    ],
    decoys: [
      { id: 'd_sleeping_bag', name: 'Sleeping Bag', top: 68, left: 82 },
      { id: 'd_kayu_bakar', name: 'Kayu Bakar', top: 88, left: 46 },
      { id: 'd_daun_kering', name: 'Daun Kering', top: 86, left: 22 },
      { id: 'd_batu_tasik', name: 'Batu Tasik', top: 86, left: 78 },
    ],
  },
];
