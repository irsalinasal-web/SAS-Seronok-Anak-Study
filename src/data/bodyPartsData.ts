export interface BodyPartFunctionItem {
  id: string;
  name: string; // e.g. "Telinga", "Mata", "Hidung", "Lidah/Mulut", "Tangan", "Kaki", "Gigi", "Rambut", "Bibir", "Lutut"
  partIcon: string; // Gambar anggota badan (e.g. 👂)
  partLabel: string;
  functionName: string; // e.g. "Mendengar", "Melihat", "Mencium Bau", "Mengecap / Merasa", "Meraba / Memegang"
  functionIcon: string; // Gambar fungsi (e.g. 📻, 📖, 👃🌸, 🍉, 🧸)
  functionDescription: string; // e.g. "Mendengar muzik radio", "Membaca buku cerita", "Mencium bau wangi bunga"
  category: 'deria' | 'anggota_utama' | 'kebersihan_gerak';
}

// Koleksi luas mengandungi 20+ item anggota badan & fungsi padanan lengkap
export const ALL_BODY_PARTS_FUNCTIONS: BodyPartFunctionItem[] = [
  // --- 5 DERIA UTAMA (PANCA INDRA seperti dalam lembaran rujukan) ---
  {
    id: 'telinga_radio',
    name: 'Telinga',
    partIcon: '👂',
    partLabel: 'Telinga',
    functionName: 'Mendengar',
    functionIcon: '📻',
    functionDescription: 'Mendengar muzik radio & suara',
    category: 'deria',
  },
  {
    id: 'mata_baca',
    name: 'Mata',
    partIcon: '👀',
    partLabel: 'Mata',
    functionName: 'Melihat',
    functionIcon: '📖',
    functionDescription: 'Melihat & membaca buku',
    category: 'deria',
  },
  {
    id: 'hidung_bunga',
    name: 'Hidung',
    partIcon: '👃',
    partLabel: 'Hidung',
    functionName: 'Mencium Bau',
    functionIcon: '🌸',
    functionDescription: 'Mencium bau wangi bunga',
    category: 'deria',
  },
  {
    id: 'lidah_makan',
    name: 'Lidah & Mulut',
    partIcon: '👅',
    partLabel: 'Lidah',
    functionName: 'Mengecap / Merasa',
    functionIcon: '🍉',
    functionDescription: 'Merasa makanan tembikai manis',
    category: 'deria',
  },
  {
    id: 'tangan_meraba',
    name: 'Tangan',
    partIcon: '✋',
    partLabel: 'Tangan',
    functionName: 'Meraba & Memegang',
    functionIcon: '🧸',
    functionDescription: 'Meraba bulu lembut anak patung',
    category: 'deria',
  },

  // --- ANGGOTA BADAN & FUNGSI TAMBAHAN (UNTUK MEMBENTUK 20+ SOALAN BERBEZA) ---
  {
    id: 'kaki_jalan',
    name: 'Kaki',
    partIcon: '🦵',
    partLabel: 'Kaki',
    functionName: 'Berjalan & Berlari',
    functionIcon: '👟',
    functionDescription: 'Berjalan dan berlari aktif',
    category: 'anggota_utama',
  },
  {
    id: 'gigi_kunyah',
    name: 'Gigi',
    partIcon: '🦷',
    partLabel: 'Gigi',
    functionName: 'Mengunyah Makanan',
    functionIcon: '🍎',
    functionDescription: 'Menggigit & mengunyah buah epal',
    category: 'anggota_utama',
  },
  {
    id: 'kaki_bola',
    name: 'Kaki',
    partIcon: '🦶',
    partLabel: 'Kaki',
    functionName: 'Menendang Bola',
    functionIcon: '⚽',
    functionDescription: 'Menendang bola ke gawang',
    category: 'anggota_utama',
  },
  {
    id: 'tangan_tulis',
    name: 'Tangan',
    partIcon: '🖐️',
    partLabel: 'Tangan',
    functionName: 'Menulis & Melukis',
    functionIcon: '✏️',
    functionDescription: 'Memegang pensel & melukis',
    category: 'anggota_utama',
  },
  {
    id: 'mulut_minum',
    name: 'Mulut',
    partIcon: '👄',
    partLabel: 'Mulut',
    functionName: 'Minum Air',
    functionIcon: '🥛',
    functionDescription: 'Menghirup susu segar & sihat',
    category: 'deria',
  },
  {
    id: 'telinga_burung',
    name: 'Telinga',
    partIcon: '👂',
    partLabel: 'Telinga',
    functionName: 'Mendengar Kicauan',
    functionIcon: '🐦',
    functionDescription: 'Mendengar kicauan burung riang',
    category: 'deria',
  },
  {
    id: 'mata_pelangi',
    name: 'Mata',
    partIcon: '👁️',
    partLabel: 'Mata',
    functionName: 'Melihat Pelangi',
    functionIcon: '🌈',
    functionDescription: 'Melihat warna pelangi di langit',
    category: 'deria',
  },
  {
    id: 'hidung_roti',
    name: 'Hidung',
    partIcon: '👃',
    partLabel: 'Hidung',
    functionName: 'Menghidu Bau Roti',
    functionIcon: '🍞',
    functionDescription: 'Menghidu bau roti panas yang enak',
    category: 'deria',
  },
  {
    id: 'lidah_aiskrim',
    name: 'Lidah',
    partIcon: '👅',
    partLabel: 'Lidah',
    functionName: 'Menjilat Aiskrim',
    functionIcon: '🍦',
    functionDescription: 'Menikmati rasa aiskrim manis sejuk',
    category: 'deria',
  },
  {
    id: 'tangan_tepuk',
    name: 'Tangan',
    partIcon: '👏',
    partLabel: 'Tangan',
    functionName: 'Bertepuk Tangan',
    functionIcon: '🎵',
    functionDescription: 'Bertepuk mengikut rentak lagu',
    category: 'anggota_utama',
  },
  {
    id: 'kaki_lompat',
    name: 'Kaki',
    partIcon: '🦵',
    partLabel: 'Kaki',
    functionName: 'Melompat Riang',
    functionIcon: '🦘',
    functionDescription: 'Melompat tinggi seperti kanggaru',
    category: 'anggota_utama',
  },
  {
    id: 'rambut_sikat',
    name: 'Rambut',
    partIcon: '💇‍♂️',
    partLabel: 'Rambut',
    functionName: 'Disikat Kemas',
    functionIcon: '🪮',
    functionDescription: 'Menyikat rambut agar sentiasa rapi',
    category: 'kebersihan_gerak',
  },
  {
    id: 'gigi_berus',
    name: 'Gigi',
    partIcon: '🦷',
    partLabel: 'Gigi',
    functionName: 'Diberus Bersih',
    functionIcon: '🪥',
    functionDescription: 'Menggosok gigi bersih berseri',
    category: 'kebersihan_gerak',
  },
  {
    id: 'mata_teleskop',
    name: 'Mata',
    partIcon: '👀',
    partLabel: 'Mata',
    functionName: 'Melihat Bintang',
    functionIcon: '⭐',
    functionDescription: 'Melihat bintang gemerlap di langit',
    category: 'deria',
  },
  {
    id: 'tangan_basuh',
    name: 'Tangan',
    partIcon: '🧼',
    partLabel: 'Tangan',
    functionName: 'Membasuh Bersih',
    functionIcon: '🚿',
    functionDescription: 'Membasuh tangan dengan sabun',
    category: 'kebersihan_gerak',
  },
  {
    id: 'telinga_loceng',
    name: 'Telinga',
    partIcon: '👂',
    partLabel: 'Telinga',
    functionName: 'Mendengar Loceng',
    functionIcon: '🔔',
    functionDescription: 'Mendengar bunyi loceng berdering',
    category: 'deria',
  },
  {
    id: 'kaki_basikal',
    name: 'Kaki',
    partIcon: '🦵',
    partLabel: 'Kaki',
    functionName: 'Mengayuh Basikal',
    functionIcon: '🚲',
    functionDescription: 'Mengayuh pedal basikal laju',
    category: 'anggota_utama',
  },
];

// Soalan Sesi Padanan: Setiap sesi mempunyai 5 pasangan anggota badan vs fungsi
export interface PadananSessionQuestion {
  id: string;
  title: string;
  themeDescription: string;
  pairs: BodyPartFunctionItem[];
}

// 20 Set Soalan Berbeza Setiap Sesi Game (Penuh Variasi, Tidak Bosan)
export const TWENTY_PADANAN_SESSIONS: PadananSessionQuestion[] = [
  // Set 1: Panca Indra Asas (Persis Lembaran Gambar Rujukan)
  {
    id: 'sesi_01_panca_indra',
    title: '5 Deria Manusia (Panca Indra)',
    themeDescription: 'Padankan 5 anggota badan dengan fungsinya yang betul!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[0], // Telinga - Radio
      ALL_BODY_PARTS_FUNCTIONS[1], // Mata - Buku
      ALL_BODY_PARTS_FUNCTIONS[2], // Hidung - Bunga
      ALL_BODY_PARTS_FUNCTIONS[3], // Lidah - Tembikai
      ALL_BODY_PARTS_FUNCTIONS[4], // Tangan - Anak Patung
    ],
  },
  // Set 2: Deria & Gerakan Cergas
  {
    id: 'sesi_02_gerakan',
    title: 'Deria & Tubuh Aktif',
    themeDescription: 'Padankan anggota badan dengan fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[1], // Mata - Buku
      ALL_BODY_PARTS_FUNCTIONS[5], // Kaki - Kasut Berjalan
      ALL_BODY_PARTS_FUNCTIONS[6], // Gigi - Mengunyah Epal
      ALL_BODY_PARTS_FUNCTIONS[0], // Telinga - Radio
      ALL_BODY_PARTS_FUNCTIONS[8], // Tangan - Pensel Tulis
    ],
  },
  // Set 3: Deria Lazat & Cergas
  {
    id: 'sesi_03_makanan_deria',
    title: 'Rasa, Bau & Bunyi Ceria',
    themeDescription: 'Hubungkan anggota badan dengan kegunaannya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[13], // Lidah - Aiskrim
      ALL_BODY_PARTS_FUNCTIONS[12], // Hidung - Roti
      ALL_BODY_PARTS_FUNCTIONS[10], // Telinga - Burung
      ALL_BODY_PARTS_FUNCTIONS[7],  // Kaki - Bola
      ALL_BODY_PARTS_FUNCTIONS[14], // Tangan - Bertepuk
    ],
  },
  // Set 4: Tubuh Bersih & Ceria
  {
    id: 'sesi_04_kebersihan',
    title: 'Penjagaan Diri & Anggota Badan',
    themeDescription: 'Cari padanan tepat untuk setiap anggota badan!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[17], // Gigi - Berus Gigi
      ALL_BODY_PARTS_FUNCTIONS[16], // Rambut - Sikat
      ALL_BODY_PARTS_FUNCTIONS[19], // Tangan - Sabun Basuh
      ALL_BODY_PARTS_FUNCTIONS[11], // Mata - Pelangi
      ALL_BODY_PARTS_FUNCTIONS[15], // Kaki - Melompat
    ],
  },
  // Set 5: Terokai Sekeliling
  {
    id: 'sesi_05_terokai',
    title: 'Melihat, Mendengar & Bergerak',
    themeDescription: 'Tarik garisan atau klik kotak untuk memadankan!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[18], // Mata - Bintang
      ALL_BODY_PARTS_FUNCTIONS[20], // Telinga - Loceng
      ALL_BODY_PARTS_FUNCTIONS[21], // Kaki - Basikal
      ALL_BODY_PARTS_FUNCTIONS[2],  // Hidung - Bunga
      ALL_BODY_PARTS_FUNCTIONS[3],  // Lidah - Tembikai
    ],
  },
  // Set 6: Panca Indra Variasi B
  {
    id: 'sesi_06_indra_b',
    title: 'Kenali 5 Fungsi Badan',
    themeDescription: 'Padankan gambar di sebelah kiri dengan fungsi di sebelah kanan!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[0],  // Telinga - Radio
      ALL_BODY_PARTS_FUNCTIONS[11], // Mata - Pelangi
      ALL_BODY_PARTS_FUNCTIONS[12], // Hidung - Roti
      ALL_BODY_PARTS_FUNCTIONS[13], // Lidah - Aiskrim
      ALL_BODY_PARTS_FUNCTIONS[8],  // Tangan - Menulis
    ],
  },
  // Set 7: Senaman Ceria
  {
    id: 'sesi_07_senaman',
    title: 'Aktiviti Anggota Tubuh',
    themeDescription: 'Padankan anggota badan dengan fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[7],  // Kaki - Bola
      ALL_BODY_PARTS_FUNCTIONS[14], // Tangan - Tepuk
      ALL_BODY_PARTS_FUNCTIONS[6],  // Gigi - Epal
      ALL_BODY_PARTS_FUNCTIONS[1],  // Mata - Buku
      ALL_BODY_PARTS_FUNCTIONS[20], // Telinga - Loceng
    ],
  },
  // Set 8: Panca Indra & Diri
  {
    id: 'sesi_08_pancaindra_c',
    title: 'Fungsi Deria Kanak-Kanak',
    themeDescription: 'Hubungkan anggota badan ke fungsi yang sesuai!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[2],  // Hidung - Bunga
      ALL_BODY_PARTS_FUNCTIONS[4],  // Tangan - Patung
      ALL_BODY_PARTS_FUNCTIONS[10], // Telinga - Burung
      ALL_BODY_PARTS_FUNCTIONS[3],  // Lidah - Tembikai
      ALL_BODY_PARTS_FUNCTIONS[18], // Mata - Bintang
    ],
  },
  // Set 9: Cergas & Bersih
  {
    id: 'sesi_09_cergas',
    title: 'Anggota Cergas & Kemas',
    themeDescription: 'Padankan 5 anggota badan dengan fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[16], // Rambut - Sikat
      ALL_BODY_PARTS_FUNCTIONS[17], // Gigi - Berus
      ALL_BODY_PARTS_FUNCTIONS[21], // Kaki - Basikal
      ALL_BODY_PARTS_FUNCTIONS[9],  // Mulut - Susu
      ALL_BODY_PARTS_FUNCTIONS[1],  // Mata - Buku
    ],
  },
  // Set 10: Dunia Muzik & Seni
  {
    id: 'sesi_10_muzik_seni',
    title: 'Muzik, Warna & Gerakan',
    themeDescription: 'Padankan anggota badan dengan fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[0],  // Telinga - Radio
      ALL_BODY_PARTS_FUNCTIONS[8],  // Tangan - Melukis
      ALL_BODY_PARTS_FUNCTIONS[11], // Mata - Pelangi
      ALL_BODY_PARTS_FUNCTIONS[15], // Kaki - Melompat
      ALL_BODY_PARTS_FUNCTIONS[12], // Hidung - Roti
    ],
  },
  // Set 11: Panca Indra Pagi
  {
    id: 'sesi_11_pagi',
    title: 'Pagi Ceria Bersama Deria',
    themeDescription: 'Padankan gambar anggota badan dengan fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[1],  // Mata - Buku
      ALL_BODY_PARTS_FUNCTIONS[17], // Gigi - Berus
      ALL_BODY_PARTS_FUNCTIONS[9],  // Mulut - Susu
      ALL_BODY_PARTS_FUNCTIONS[10], // Telinga - Burung
      ALL_BODY_PARTS_FUNCTIONS[5],  // Kaki - Kasut Jalan
    ],
  },
  // Set 12: Sentuhan & Rasa
  {
    id: 'sesi_12_sentuhan',
    title: 'Sentuhan, Rasa & Pandangan',
    themeDescription: 'Hubungkan kotak soalan dengan kotak jawapan!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[4],  // Tangan - Patung
      ALL_BODY_PARTS_FUNCTIONS[13], // Lidah - Aiskrim
      ALL_BODY_PARTS_FUNCTIONS[18], // Mata - Bintang
      ALL_BODY_PARTS_FUNCTIONS[2],  // Hidung - Bunga
      ALL_BODY_PARTS_FUNCTIONS[0],  // Telinga - Radio
    ],
  },
  // Set 13: Permainan & Senaman
  {
    id: 'sesi_13_main',
    title: 'Bermain Di Taman',
    themeDescription: 'Padankan 5 anggota badan dengan kegunaannya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[7],  // Kaki - Bola
      ALL_BODY_PARTS_FUNCTIONS[14], // Tangan - Tepuk
      ALL_BODY_PARTS_FUNCTIONS[20], // Telinga - Loceng
      ALL_BODY_PARTS_FUNCTIONS[1],  // Mata - Buku
      ALL_BODY_PARTS_FUNCTIONS[3],  // Lidah - Tembikai
    ],
  },
  // Set 14: Hidangan Lazat
  {
    id: 'sesi_14_makan',
    title: 'Makan & Minum Bersama Deria',
    themeDescription: 'Padankan setiap anggota badan dengan fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[6],  // Gigi - Kunyah Epal
      ALL_BODY_PARTS_FUNCTIONS[9],  // Mulut - Minum Susu
      ALL_BODY_PARTS_FUNCTIONS[12], // Hidung - Bau Roti
      ALL_BODY_PARTS_FUNCTIONS[19], // Tangan - Basuh Sabun
      ALL_BODY_PARTS_FUNCTIONS[10], // Telinga - Burung
    ],
  },
  // Set 15: Anggota Gerak Lincah
  {
    id: 'sesi_15_lincah',
    title: 'Lincah Bergerak',
    themeDescription: 'Cari pasangan anggota badan yang sepadan!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[21], // Kaki - Basikal
      ALL_BODY_PARTS_FUNCTIONS[8],  // Tangan - Menulis
      ALL_BODY_PARTS_FUNCTIONS[18], // Mata - Bintang
      ALL_BODY_PARTS_FUNCTIONS[0],  // Telinga - Radio
      ALL_BODY_PARTS_FUNCTIONS[13], // Lidah - Aiskrim
    ],
  },
  // Set 16: Panca Indra Alam
  {
    id: 'sesi_16_alam',
    title: 'Deria Di Alam Semulajadi',
    themeDescription: 'Padankan anggota badan dengan fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[2],  // Hidung - Bunga
      ALL_BODY_PARTS_FUNCTIONS[10], // Telinga - Kicauan Burung
      ALL_BODY_PARTS_FUNCTIONS[11], // Mata - Pelangi
      ALL_BODY_PARTS_FUNCTIONS[4],  // Tangan - Patung
      ALL_BODY_PARTS_FUNCTIONS[5],  // Kaki - Kasut
    ],
  },
  // Set 17: Kemas & Berseri
  {
    id: 'sesi_17_kemas',
    title: 'Diri Kemas & Menawan',
    themeDescription: 'Padankan gambar anggota badan dengan kegunaannya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[16], // Rambut - Sikat
      ALL_BODY_PARTS_FUNCTIONS[17], // Gigi - Berus
      ALL_BODY_PARTS_FUNCTIONS[19], // Tangan - Sabun
      ALL_BODY_PARTS_FUNCTIONS[3],  // Lidah - Tembikai
      ALL_BODY_PARTS_FUNCTIONS[1],  // Mata - Buku
    ],
  },
  // Set 18: Dunia Muzik Riang
  {
    id: 'sesi_18_muzik',
    title: 'Mendengar & Menyanyi',
    themeDescription: 'Hubungkan kotak anggota dengan kotak fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[0],  // Telinga - Radio
      ALL_BODY_PARTS_FUNCTIONS[9],  // Mulut - Susu
      ALL_BODY_PARTS_FUNCTIONS[14], // Tangan - Bertepuk
      ALL_BODY_PARTS_FUNCTIONS[15], // Kaki - Melompat
      ALL_BODY_PARTS_FUNCTIONS[18], // Mata - Bintang
    ],
  },
  // Set 19: Cergas Ria
  {
    id: 'sesi_19_cergas_ria',
    title: 'Kanak-Kanak Cergas Pintar',
    themeDescription: 'Padankan 5 anggota badan dengan fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[8],  // Tangan - Pensel
      ALL_BODY_PARTS_FUNCTIONS[7],  // Kaki - Bola
      ALL_BODY_PARTS_FUNCTIONS[6],  // Gigi - Epal
      ALL_BODY_PARTS_FUNCTIONS[12], // Hidung - Bau Roti
      ALL_BODY_PARTS_FUNCTIONS[20], // Telinga - Loceng
    ],
  },
  // Set 20: Panca Indra Gemilang
  {
    id: 'sesi_20_panca_indra_lengkap',
    title: 'Panca Indra & Syukur',
    themeDescription: 'Padankan 5 panca indra dengan nikmat fungsinya!',
    pairs: [
      ALL_BODY_PARTS_FUNCTIONS[1],  // Mata - Membaca Buku
      ALL_BODY_PARTS_FUNCTIONS[0],  // Telinga - Mendengar Radio
      ALL_BODY_PARTS_FUNCTIONS[2],  // Hidung - Mencium Bunga
      ALL_BODY_PARTS_FUNCTIONS[3],  // Lidah - Merasa Tembikai
      ALL_BODY_PARTS_FUNCTIONS[4],  // Tangan - Meraba Patung
    ],
  },
];
