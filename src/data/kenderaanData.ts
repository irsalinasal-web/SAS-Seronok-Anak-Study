export interface VehicleOption {
  id: string;
  name: string;
  icon: string;
  category: string;
  color: string;
}

export interface KenderaanQuestion {
  id: string;
  title: string;
  situationBadge: string;
  badgeColor: string;
  situationTitle: string;
  situationPrompt: string;
  sceneEmoji: string;
  sceneDetails: string[];
  themeBg: string;
  correctVehicleId: string;
  correctVehicleName: string;
  correctVehicleIcon: string;
  sirenSoundName?: string;
  praiseMessage: string;
  options: VehicleOption[];
}

export const KENDERAAN_QUESTIONS_DATA: KenderaanQuestion[] = [
  // 1. Rumah Terbakar (Lori Bomba)
  {
    id: 'ken_rumah_terbakar',
    title: 'Situasi Kecemasan: Api Marak',
    situationBadge: '🚨 Kecemasan Bomba',
    badgeColor: 'bg-red-100 text-red-700 border-red-300',
    situationTitle: 'Rumah Terbakar Mengeluarkan Api & Asap!',
    situationPrompt: 'Kenderaan manakah yang ada tangga tinggi dan hos air untuk padamkan api?',
    sceneEmoji: '🔥🏠🔥',
    sceneDetails: ['Asap tebal berkepul', 'Api marak di bumbung', 'Perlukan air dengan segera!'],
    themeBg: 'from-red-50 via-orange-50 to-amber-100 border-red-400',
    correctVehicleId: 'lori_bomba',
    correctVehicleName: 'Lori Bomba',
    correctVehicleIcon: '🚒',
    praiseMessage: 'Betul! Lori Bomba 🚒 datang bawa air dan hos panjang untuk padamkan api!',
    options: [
      { id: 'lori_bomba', name: 'Lori Bomba', icon: '🚒', category: 'Kecemasan', color: 'bg-red-50 hover:bg-red-100 border-red-400 text-red-900' },
      { id: 'bas_sekolah', name: 'Bas Sekolah', icon: '🚌', category: 'Awam', color: 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900' },
      { id: 'kereta_biasa', name: 'Kereta Merah', icon: '🚗', category: 'Persendirian', color: 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-800' },
    ],
  },

  // 2. Perompak Bank (Kereta Polis)
  {
    id: 'ken_perompak_bank',
    title: 'Situasi: Menangkap Perompak',
    situationBadge: '🚓 Polis Bertindak',
    badgeColor: 'bg-blue-100 text-blue-700 border-blue-300',
    situationTitle: 'Perompak Bank Sedang Melarikan Diri!',
    situationPrompt: 'Kenderaan polis manakah yang berbunyi siren untuk mengejar dan menangkap perompak?',
    sceneEmoji: '🦹‍♂️🏦💰',
    sceneDetails: ['Pintu bank terbuka', 'Duit bertaburan', 'Polis perlu kejar segera!'],
    themeBg: 'from-blue-50 via-sky-50 to-indigo-100 border-blue-400',
    correctVehicleId: 'kereta_polis',
    correctVehicleName: 'Kereta Polis',
    correctVehicleIcon: '🚓',
    praiseMessage: 'Hebat! Polis menaiki Kereta Polis 🚓 dengan siren laju untuk tangkap perompak!',
    options: [
      { id: 'lori_sampah', name: 'Lori Sampah', icon: '🚛', category: 'Kebersihan', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900' },
      { id: 'kereta_polis', name: 'Kereta Polis', icon: '🚓', category: 'Keselamatan', color: 'bg-blue-50 hover:bg-blue-100 border-blue-400 text-blue-900' },
      { id: 'traktor', name: 'Traktor Sawah', icon: '🚜', category: 'Pertanian', color: 'bg-lime-50 hover:bg-lime-100 border-lime-300 text-lime-900' },
    ],
  },

  // 3. Orang Sakit Cemas (Ambulans)
  {
    id: 'ken_orang_sakit',
    title: 'Situasi: Bantuan Perubatan',
    situationBadge: '🚑 Kecemasan Hospital',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    situationTitle: 'Pesakit Jatuh Sakit Perlu ke Hospital Segera!',
    situationPrompt: 'Kenderaan putih bersiren yang ada katil pesakit & doktor di dalamnya?',
    sceneEmoji: '🤕🏥🩺',
    sceneDetails: ['Pesakit memerlukan rawatan', 'Doktor sedia membantu', 'Segera ke wad kecemasan!'],
    themeBg: 'from-emerald-50 via-teal-50 to-green-100 border-emerald-400',
    correctVehicleId: 'ambulans',
    correctVehicleName: 'Ambulans',
    correctVehicleIcon: '🚑',
    praiseMessage: 'Tepat sekali! Ambulans 🚑 membawa pesakit dengan selamat dan laju ke hospital!',
    options: [
      { id: 'motosikal', name: 'Motosikal', icon: '🏍️', category: 'Dua Roda', color: 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900' },
      { id: 'ambulans', name: 'Ambulans', icon: '🚑', category: 'Perubatan', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-400 text-emerald-900' },
      { id: 'kereta_lumba', name: 'Kereta Lumba', icon: '🏎️', category: 'Sukan', color: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-900' },
    ],
  },

  // 4. Pergi ke Sekolah (Bas Sekolah)
  {
    id: 'ken_pergi_sekolah',
    title: 'Situasi: Waktu Pagi ke Sekolah',
    situationBadge: '🏫 Anak Sekolah',
    badgeColor: 'bg-yellow-100 text-yellow-800 border-yellow-300',
    situationTitle: 'Kanak-kanak Hendak Pergi ke Sekolah!',
    situationPrompt: 'Kenderaan besar berwarna kuning yang mengambil ramai kawan-kawan di tepi rumah?',
    sceneEmoji: '🎒🏫👦👧',
    sceneDetails: ['Beg sekolah sudah siap', 'Kawan-kawan menunggu bersama', 'Hon berbunyi di depan pagar!'],
    themeBg: 'from-amber-50 via-yellow-50 to-orange-100 border-amber-400',
    correctVehicleId: 'bas_sekolah',
    correctVehicleName: 'Bas Sekolah',
    correctVehicleIcon: '🚌',
    praiseMessage: 'Bijak! Bas Sekolah 🚌 berwarna kuning menjemput semua murid pergi ke sekolah!',
    options: [
      { id: 'bas_sekolah', name: 'Bas Sekolah', icon: '🚌', category: 'Pengangkutan', color: 'bg-amber-50 hover:bg-amber-100 border-amber-400 text-amber-900' },
      { id: 'lori_bomba', name: 'Lori Bomba', icon: '🚒', category: 'Kecemasan', color: 'bg-red-50 hover:bg-red-100 border-red-300 text-red-900' },
      { id: 'bot_kayuh', name: 'Sampan Dayung', icon: '🚣', category: 'Air', color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-300 text-cyan-900' },
    ],
  },

  // 5. Terbang ke Luar Negara (Kapal Terbang)
  {
    id: 'ken_terbang_awan',
    title: 'Situasi: Melancong Jauh',
    situationBadge: '✈️ Di Udara',
    badgeColor: 'bg-sky-100 text-sky-700 border-sky-300',
    situationTitle: 'Hendak Melancong Melintasi Lautan & Awan!',
    situationPrompt: 'Kenderaan besar yang mempunyai sayap lebar dan terbang tinggi di langit?',
    sceneEmoji: '☁️🛫🌍',
    sceneDetails: ['Membelah awan biru', 'Lapangan terbang antarabangsa', 'Sayap besar di udara!'],
    themeBg: 'from-sky-50 via-blue-50 to-cyan-100 border-sky-400',
    correctVehicleId: 'kapal_terbang',
    correctVehicleName: 'Kapal Terbang',
    correctVehicleIcon: '✈️',
    praiseMessage: 'Hebat! Kapal Terbang ✈️ terbang tinggi di awan membawa penumpang melancong!',
    options: [
      { id: 'kereta_api', name: 'Kereta Api', icon: '🚂', category: 'Landasan', color: 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-900' },
      { id: 'kapal_terbang', name: 'Kapal Terbang', icon: '✈️', category: 'Penerbangan', color: 'bg-sky-50 hover:bg-sky-100 border-sky-400 text-sky-900' },
      { id: 'lori_kontena', name: 'Lori Kontena', icon: '🚛', category: 'Kargo', color: 'bg-orange-50 hover:bg-orange-100 border-orange-300 text-orange-900' },
    ],
  },

  // 6. Angkasawan ke Bulan (Roket)
  {
    id: 'ken_angkasa_lepas',
    title: 'Situasi: Misi Angkasa Lepas',
    situationBadge: '🚀 Bintang & Bulan',
    badgeColor: 'bg-purple-100 text-purple-700 border-purple-300',
    situationTitle: 'Angkasawan Hendak Mendarat di Bulan!',
    situationPrompt: 'Kenderaan berkuasa api kuat yang dilancarkan tegak ke bintang di angkasa lepas?',
    sceneEmoji: '👨‍🚀🌙⭐',
    sceneDetails: ['Bulan dan bintang berkelip', 'Graviti sifar di angkasa', 'Kira detik: Tiga, dua, satu!'],
    themeBg: 'from-purple-50 via-indigo-50 to-violet-100 border-purple-400',
    correctVehicleId: 'roket',
    correctVehicleName: 'Roket Angkasa',
    correctVehicleIcon: '🚀',
    praiseMessage: 'Cemerlang! Roket Angkasa 🚀 meluncur pantas menuju ke bulan dan bintang!',
    options: [
      { id: 'roket', name: 'Roket Angkasa', icon: '🚀', category: 'Angkasa', color: 'bg-purple-50 hover:bg-purple-100 border-purple-400 text-purple-900' },
      { id: 'basikal', name: 'Basikal', icon: '🚲', category: 'Kayuhan', color: 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-900' },
      { id: 'teksi', name: 'Kereta Teksi', icon: '🚕', category: 'Jalan Raya', color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-300 text-yellow-900' },
    ],
  },

  // 7. Sampah di Tepi Jalan (Lori Sampah)
  {
    id: 'ken_lori_sampah',
    title: 'Situasi: Kebersihan Bandar',
    situationBadge: '🧹 Bandar Bersih',
    badgeColor: 'bg-emerald-100 text-emerald-700 border-emerald-300',
    situationTitle: 'Tong Sampah Penuh Perlu Dibersihkan!',
    situationPrompt: 'Kenderaan besar yang mengutip tong sampah dan memampatkan sisa buangan?',
    sceneEmoji: '🗑️🚮🦺',
    sceneDetails: ['Tong sampah di tepi jalan', 'Pekerja kebersihan berkhidmat', 'Bandar jadi wangi dan bersih!'],
    themeBg: 'from-emerald-50 via-lime-50 to-green-100 border-emerald-400',
    correctVehicleId: 'lori_sampah',
    correctVehicleName: 'Lori Sampah',
    correctVehicleIcon: '🚛',
    praiseMessage: 'Bagus! Lori Sampah 🚛 memastikan taman dan perumahan kita sentiasa bersih!',
    options: [
      { id: 'kereta_sport', name: 'Kereta Lumba', icon: '🏎️', category: 'Litar', color: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-900' },
      { id: 'lori_sampah', name: 'Lori Sampah', icon: '🚛', category: 'Kebersihan', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-400 text-emerald-900' },
      { id: 'kapal_layar', name: 'Kapal Layar', icon: '⛵', category: 'Air', color: 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-900' },
    ],
  },

  // 8. Menyeberang Laut ke Pulau (Feri / Kapal Laut)
  {
    id: 'ken_menyeberang_laut',
    title: 'Situasi: Pulau Percutian',
    situationBadge: '🚢 Di Permukaan Laut',
    badgeColor: 'bg-blue-100 text-blue-800 border-blue-300',
    situationTitle: 'Keluarga Hendak Menyeberang ke Pulau Langkawi!',
    situationPrompt: 'Kenderaan air besar yang terapung di atas ombak membawa kereta & manusia?',
    sceneEmoji: '🏝️🌊🐬',
    sceneDetails: ['Ombak laut bergelora', 'Pulau indah di kejauhan', 'Pelampung keselamatan tersedia!'],
    themeBg: 'from-blue-50 via-teal-50 to-sky-100 border-blue-400',
    correctVehicleId: 'kapal_feri',
    correctVehicleName: 'Kapal Feri Laut',
    correctVehicleIcon: '🚢',
    praiseMessage: 'Tepat sekali! Kapal Feri 🚢 terapung di atas laut membawa kita sampai ke pulau!',
    options: [
      { id: 'kapal_feri', name: 'Kapal Feri Laut', icon: '🚢', category: 'Pengangkutan Air', color: 'bg-blue-50 hover:bg-blue-100 border-blue-400 text-blue-900' },
      { id: 'kereta_api', name: 'Kereta Api', icon: '🚂', category: 'Landasan', color: 'bg-stone-50 hover:bg-stone-100 border-stone-300 text-stone-900' },
      { id: 'motosikal', name: 'Motosikal', icon: '🛵', category: 'Darat', color: 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900' },
    ],
  },

  // 9. Menggali Tanah & Membina Bangunan (Jengkaut / Ekskavator)
  {
    id: 'ken_tapak_pembinaan',
    title: 'Situasi: Tapak Pembinaan',
    situationBadge: '🏗️ Kerja Berat',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    situationTitle: 'Tanah Tebal Perlu Digali & Batu Besar Diangkat!',
    situationPrompt: 'Jentera kuning gagah dengan lengan besi dan pencedok besar di hadapan?',
    sceneEmoji: '🚧🪨🏗️',
    sceneDetails: ['Batu besar menghalang laluan', 'Lubang asas bangunan', 'Abang kontraktor bertopi keselamatan!'],
    themeBg: 'from-amber-50 via-orange-50 to-yellow-100 border-amber-400',
    correctVehicleId: 'jengkaut',
    correctVehicleName: 'Jengkaut (Excavator)',
    correctVehicleIcon: '🚜',
    praiseMessage: 'Hebat! Jengkaut 🚜 ada penyodok kuat untuk mengaut tanah dan batu-batu besar!',
    options: [
      { id: 'ambulans', name: 'Ambulans', icon: '🚑', category: 'Hospital', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900' },
      { id: 'jengkaut', name: 'Jengkaut Pembinaan', icon: '🚜', category: 'Jentera Berat', color: 'bg-amber-50 hover:bg-amber-100 border-amber-400 text-amber-900' },
      { id: 'kereta_polis', name: 'Kereta Polis', icon: '🚓', category: 'Keselamatan', color: 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-900' },
    ],
  },

  // 10. Ramai Penumpang Berjalan di Atas Landasan (Kereta Api)
  {
    id: 'ken_landasan_rel',
    title: 'Situasi: Stesen Rel Kereta Api',
    situationBadge: '🚂 Landasan Besi',
    badgeColor: 'bg-slate-100 text-slate-800 border-slate-300',
    situationTitle: 'Ratusan Penumpang Hendak Pulang ke Kampung!',
    situationPrompt: 'Kenderaan sangat panjang yang berbunyi "Cho-Cho!" dan bergerak di atas rel landasan?',
    sceneEmoji: '🛤️🚉👨‍👩‍👧‍👦',
    sceneDetails: ['Stesen kereta api riuh', 'Gerabak panjang bersambung', 'Bunyi wisel stesen bertiup!'],
    themeBg: 'from-slate-50 via-stone-50 to-zinc-100 border-slate-400',
    correctVehicleId: 'kereta_api',
    correctVehicleName: 'Kereta Api (Train)',
    correctVehicleIcon: '🚂',
    praiseMessage: 'Betul! Kereta Api 🚂 membawa gerabak panjang di atas landasan ke seluruh negeri!',
    options: [
      { id: 'kereta_api', name: 'Kereta Api', icon: '🚂', category: 'Landasan Rel', color: 'bg-slate-50 hover:bg-slate-100 border-slate-400 text-slate-900' },
      { id: 'kapal_terbang', name: 'Kapal Terbang', icon: '✈️', category: 'Awan', color: 'bg-sky-50 hover:bg-sky-100 border-sky-300 text-sky-900' },
      { id: 'lori_bomba', name: 'Lori Bomba', icon: '🚒', category: 'Kecemasan', color: 'bg-red-50 hover:bg-red-100 border-red-300 text-red-900' },
    ],
  },

  // 11. Hantar Surat & Bungkusan Hadiah (Motosikal Posmen)
  {
    id: 'ken_hantar_surat',
    title: 'Situasi: Penghantaran Pos',
    situationBadge: '📦 Surat & Hadiah',
    badgeColor: 'bg-red-100 text-red-800 border-red-300',
    situationTitle: 'Surat dan Bungkusan Hadiah Sampai di Pintu Pagar!',
    situationPrompt: 'Kenderaan lincah beroda dua yang dinaiki abang posmen dengan beg surat?',
    sceneEmoji: '📦✉️🏡',
    sceneDetails: ['Surat khabar dan poskad', 'Peti surat di pagar', 'Abang posmen tersenyum ramah!'],
    themeBg: 'from-rose-50 via-amber-50 to-red-100 border-rose-400',
    correctVehicleId: 'motosikal_pos',
    correctVehicleName: 'Motosikal Posmen',
    correctVehicleIcon: '🛵',
    praiseMessage: 'Pandai! Motosikal Posmen 🛵 lincah masuk lorong untuk hantar bungkusan hadiah!',
    options: [
      { id: 'motosikal_pos', name: 'Motosikal Posmen', icon: '🛵', category: 'Dua Roda', color: 'bg-rose-50 hover:bg-rose-100 border-rose-400 text-rose-900' },
      { id: 'lori_sampah', name: 'Lori Sampah', icon: '🚛', category: 'Kebersihan', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900' },
      { id: 'bas_sekolah', name: 'Bas Sekolah', icon: '🚌', category: 'Sekolah', color: 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900' },
    ],
  },

  // 12. Menyelamat di Laut & Puncak Gunung (Helikopter)
  {
    id: 'ken_helikopter_penyelamat',
    title: 'Situasi: Penyelamat Udara',
    situationBadge: '🚁 Bilah Kipas Berputar',
    badgeColor: 'bg-teal-100 text-teal-800 border-teal-300',
    situationTitle: 'Mangsa Terperangkap di Puncak Bukit yang Tinggi!',
    situationPrompt: 'Kenderaan udara dengan kipas berputar di atas kepala yang boleh mendarat di mana-mana?',
    sceneEmoji: '⛰️🛟🚁',
    sceneDetails: ['Tiada jalan raya bertar', 'Kipas berputar laju di atas', 'Tali penyelamat diturunkan!'],
    themeBg: 'from-teal-50 via-cyan-50 to-emerald-100 border-teal-400',
    correctVehicleId: 'helikopter',
    correctVehicleName: 'Helikopter Penyelamat',
    correctVehicleIcon: '🚁',
    praiseMessage: 'Hebat! Helikopter 🚁 boleh terbang tegak dan selamatkan orang di tempat tinggi!',
    options: [
      { id: 'helikopter', name: 'Helikopter', icon: '🚁', category: 'Penyelamat Udara', color: 'bg-teal-50 hover:bg-teal-100 border-teal-400 text-teal-900' },
      { id: 'kereta_biasa', name: 'Kereta Sedan', icon: '🚗', category: 'Jalan Raya', color: 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-900' },
      { id: 'sampan', name: 'Sampan Dayung', icon: '🛶', category: 'Sungai', color: 'bg-amber-50 hover:bg-amber-100 border-amber-300 text-amber-900' },
    ],
  },

  // 13. Petani Membajak Sawah Padi (Traktor Sawah)
  {
    id: 'ken_traktor_sawah',
    title: 'Situasi: Ladang & Sawah Padi',
    situationBadge: '🌾 Petani Rajin',
    badgeColor: 'bg-lime-100 text-lime-800 border-lime-300',
    situationTitle: 'Pak Cik Petani Hendak Membajak Tanah Sawah Padi!',
    situationPrompt: 'Jentera beroda belakang besar bergigi yang kuat meredah lumpur di sawah?',
    sceneEmoji: '🌾🧑‍🌾🚜',
    sceneDetails: ['Tanah sawah berlumpur', 'Padi menghijau subur', 'Keluarga petani gembira!'],
    themeBg: 'from-lime-50 via-emerald-50 to-green-100 border-lime-400',
    correctVehicleId: 'traktor_sawah',
    correctVehicleName: 'Traktor Sawah',
    correctVehicleIcon: '🚜',
    praiseMessage: 'Cemerlang! Traktor Sawah 🚜 ada roda besar khas untuk bajak tanah padi!',
    options: [
      { id: 'traktor_sawah', name: 'Traktor Sawah', icon: '🚜', category: 'Pertanian', color: 'bg-lime-50 hover:bg-lime-100 border-lime-400 text-lime-900' },
      { id: 'kereta_lumba', name: 'Kereta Lumba', icon: '🏎️', category: 'Litar', color: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-900' },
      { id: 'kapal_terbang', name: 'Kapal Terbang', icon: '✈️', category: 'Awan', color: 'bg-sky-50 hover:bg-sky-100 border-sky-300 text-sky-900' },
    ],
  },

  // 14. Kereta Rosak di Lebuh Raya (Lori Tunda)
  {
    id: 'ken_lori_tunda',
    title: 'Situasi: Kereta Rosak',
    situationBadge: '⚠️ Bantuan Jalan Raya',
    badgeColor: 'bg-amber-100 text-amber-800 border-amber-300',
    situationTitle: 'Sebuah Kereta Mengalami Kerosakan Enjin di Tepi Jalan!',
    situationPrompt: 'Kenderaan yang ada cangkuk rantai besi di belakang untuk tarik kereta rosak ke bengkel?',
    sceneEmoji: '⚠️🚗🔧',
    sceneDetails: ['Enjin berasap kecil', 'Segitiga kecemasan dipasang', 'Perlu dibawa ke bengkel membaiki!'],
    themeBg: 'from-amber-50 via-yellow-50 to-stone-100 border-amber-400',
    correctVehicleId: 'lori_tunda',
    correctVehicleName: 'Lori Tunda (Tow Truck)',
    correctVehicleIcon: '🚚',
    praiseMessage: 'Betul! Lori Tunda 🚚 ada cangkuk khas untuk menarik kereta ke bengkel!',
    options: [
      { id: 'lori_tunda', name: 'Lori Tunda', icon: '🚚', category: 'Bantuan Jalan', color: 'bg-amber-50 hover:bg-amber-100 border-amber-400 text-amber-900' },
      { id: 'bas_sekolah', name: 'Bas Sekolah', icon: '🚌', category: 'Awam', color: 'bg-yellow-50 hover:bg-yellow-100 border-yellow-300 text-yellow-900' },
      { id: 'roket', name: 'Roket', icon: '🚀', category: 'Angkasa', color: 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-900' },
    ],
  },

  // 15. Melawat Safari Rimba (Kereta Pacuan 4 Roda / Jeep)
  {
    id: 'ken_kereta_safari',
    title: 'Situasi: Taman Haiwan Safari',
    situationBadge: '🦁 Alam Liar',
    badgeColor: 'bg-orange-100 text-orange-800 border-orange-300',
    situationTitle: 'Melawat Rimba Menemui Singa, Gajah & Zirafah!',
    situationPrompt: 'Kenderaan pacuan 4 roda lasak beratap terbuka untuk melihat haiwan di safari?',
    sceneEmoji: '🦁🐘🦓',
    sceneDetails: ['Jalan berbatu di rimba', 'Haiwan liar bebas merayau', 'Keluarga gembira mengambil gambar!'],
    themeBg: 'from-orange-50 via-amber-50 to-yellow-100 border-orange-400',
    correctVehicleId: 'kereta_jeep',
    correctVehicleName: 'Kereta Jeep Safari',
    correctVehicleIcon: '🚙',
    praiseMessage: 'Bijak! Kereta Jeep Safari 🚙 sangat lasak untuk meredah laluan berbatu di zoo rimba!',
    options: [
      { id: 'kereta_jeep', name: 'Jeep Safari', icon: '🚙', category: 'Lasak Rimba', color: 'bg-orange-50 hover:bg-orange-100 border-orange-400 text-orange-900' },
      { id: 'kereta_api', name: 'Kereta Api', icon: '🚂', category: 'Rel', color: 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-900' },
      { id: 'lori_sampah', name: 'Lori Sampah', icon: '🚛', category: 'Kebersihan', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900' },
    ],
  },

  // 16. Perlumbaan di Litar Lumba (Kereta Lumba F1)
  {
    id: 'ken_kereta_lumba',
    title: 'Situasi: Litar Lumba Pantas',
    situationBadge: '🏁 Litar Laju',
    badgeColor: 'bg-rose-100 text-rose-800 border-rose-300',
    situationTitle: 'Perlumbaan Kereta Paling Pantas di Dunia Bermula!',
    situationPrompt: 'Kereta rendah tayar lebar yang menderu laju seperti kilat mengibarkan bendera penamat?',
    sceneEmoji: '🏁🏎️💨',
    sceneDetails: ['Bunyi enjin menderu kuat: Vrooom!', 'Bendera berpetak hitam putih', 'Sorakan penonton riuh di stadium!'],
    themeBg: 'from-rose-50 via-red-50 to-pink-100 border-rose-400',
    correctVehicleId: 'kereta_lumba',
    correctVehicleName: 'Kereta Lumba (F1)',
    correctVehicleIcon: '🏎️',
    praiseMessage: 'Hebat! Kereta Lumba 🏎️ meluncur laju: Vroooom! Menjadi juara di garisan penamat!',
    options: [
      { id: 'kereta_lumba', name: 'Kereta Lumba', icon: '🏎️', category: 'Sukan Laju', color: 'bg-rose-50 hover:bg-rose-100 border-rose-400 text-rose-900' },
      { id: 'traktor', name: 'Traktor', icon: '🚜', category: 'Sawah', color: 'bg-lime-50 hover:bg-lime-100 border-lime-300 text-lime-900' },
      { id: 'basikal', name: 'Basikal', icon: '🚲', category: 'Santai', color: 'bg-teal-50 hover:bg-teal-100 border-teal-300 text-teal-900' },
    ],
  },

  // 17. Menyelam ke Dasar Laut (Kapal Selam)
  {
    id: 'ken_kapal_selam',
    title: 'Situasi: Dasar Laut Misteri',
    situationBadge: '🐠 Bawah Air',
    badgeColor: 'bg-cyan-100 text-cyan-800 border-cyan-300',
    situationTitle: 'Penyelidik Hendak Meneroka Batu Karang & Ikan Jerung di Dasar Laut!',
    situationPrompt: 'Kenderaan bulat berkaca kalis air yang boleh menyelam jauh ke dalam laut gelap?',
    sceneEmoji: '🌊🐠🦈🪸',
    sceneDetails: ['Ikan warna-warni berenang', 'Lampu suluh menerangi laut dalam', 'Gelembung udara keluar: Gloop-gloop!'],
    themeBg: 'from-cyan-50 via-blue-50 to-teal-100 border-cyan-400',
    correctVehicleId: 'kapal_selam',
    correctVehicleName: 'Kapal Selam',
    correctVehicleIcon: '🤿',
    praiseMessage: 'Wah, tepat sekali! Kapal Selam 🤿 menyelam jauh ke dasar lautan melihat hidupan air!',
    options: [
      { id: 'kapal_selam', name: 'Kapal Selam', icon: '🤿', category: 'Bawah Laut', color: 'bg-cyan-50 hover:bg-cyan-100 border-cyan-400 text-cyan-900' },
      { id: 'kapal_terbang', name: 'Kapal Terbang', icon: '✈️', category: 'Awan', color: 'bg-sky-50 hover:bg-sky-100 border-sky-300 text-sky-900' },
      { id: 'lori_bomba', name: 'Lori Bomba', icon: '🚒', category: 'Kecemasan', color: 'bg-red-50 hover:bg-red-100 border-red-300 text-red-900' },
    ],
  },

  // 18. Membawa Pasir & Batu Pembinaan (Lori Jongket / Dump Truck)
  {
    id: 'ken_lori_jongket',
    title: 'Situasi: Pengangkutan Batu & Pasir',
    situationBadge: '🧱 Bahan Binaan',
    badgeColor: 'bg-amber-100 text-amber-900 border-amber-300',
    situationTitle: 'Gunungan Pasir dan Batu Perlu Ditumpahkan di Tapak Projek!',
    situationPrompt: 'Lori besar bertong besi di belakang yang boleh jongket ke atas mencurahkan pasir?',
    sceneEmoji: '🧱🪨🏗️',
    sceneDetails: ['Muatan pasir berat', 'Tong besi terangkat tinggi', 'Pasir ditumpahkan dengan mudah!'],
    themeBg: 'from-amber-50 via-yellow-50 to-stone-100 border-amber-400',
    correctVehicleId: 'lori_jongket',
    correctVehicleName: 'Lori Jongket (Dump Truck)',
    correctVehicleIcon: '🚚',
    praiseMessage: 'Betul! Lori Jongket 🚚 menjongketkan tong belakang untuk menuang batu dan pasir!',
    options: [
      { id: 'lori_jongket', name: 'Lori Jongket', icon: '🚚', category: 'Bahan Binaan', color: 'bg-amber-50 hover:bg-amber-100 border-amber-400 text-amber-900' },
      { id: 'kereta_polis', name: 'Kereta Polis', icon: '🚓', category: 'Keselamatan', color: 'bg-blue-50 hover:bg-blue-100 border-blue-300 text-blue-900' },
      { id: 'motosikal', name: 'Motosikal Pos', icon: '🛵', category: 'Surat', color: 'bg-rose-50 hover:bg-rose-100 border-rose-300 text-rose-900' },
    ],
  },

  // 19. Mengayuh di Taman Rekreasi (Basikal)
  {
    id: 'ken_basikal_taman',
    title: 'Situasi: Beriadah Petang',
    situationBadge: '🌳 Taman Hijau',
    badgeColor: 'bg-green-100 text-green-800 border-green-300',
    situationTitle: 'Bersenam Santai Bersama Kawan Menghirup Udara Segar!',
    situationPrompt: 'Kenderaan dua roda sihat yang digerakkan dengan mengayuh pedal kaki?',
    sceneEmoji: '🌳🌸🚲',
    sceneDetails: ['Bunga kembang mekar', 'Laluan khas beriadah', 'Genta loceng berbunyi: Kring-Kring!'],
    themeBg: 'from-green-50 via-emerald-50 to-teal-100 border-green-400',
    correctVehicleId: 'basikal',
    correctVehicleName: 'Basikal Ceria',
    correctVehicleIcon: '🚲',
    praiseMessage: 'Pandai! Basikal 🚲 sangat sihat untuk bersenam dan tidak mengeluarkan asap!',
    options: [
      { id: 'basikal', name: 'Basikal Ceria', icon: '🚲', category: 'Kesihatan', color: 'bg-green-50 hover:bg-green-100 border-green-400 text-green-900' },
      { id: 'roket', name: 'Roket', icon: '🚀', category: 'Angkasa', color: 'bg-purple-50 hover:bg-purple-100 border-purple-300 text-purple-900' },
      { id: 'lori_bomba', name: 'Lori Bomba', icon: '🚒', category: 'Kecemasan', color: 'bg-red-50 hover:bg-red-100 border-red-300 text-red-900' },
    ],
  },

  // 20. Menjual Aiskrim Sejuk (Van Aiskrim)
  {
    id: 'ken_van_aiskrim',
    title: 'Situasi: Aiskrim Menjelang Petang',
    situationBadge: '🍦 Muzik Riang',
    badgeColor: 'bg-pink-100 text-pink-800 border-pink-300',
    situationTitle: 'Muzik Ceria Bergema Memanggil Kanak-kanak!',
    situationPrompt: 'Kenderaan comel berpeti ais sejuk yang menjual aiskrim pelbagai rasa enak?',
    sceneEmoji: '🍦🍧🚐🎶',
    sceneDetails: ['Lagu riang berkumandang', 'Peti ais sejuk beku', 'Semua kanak-kanak beratur tersenyum!'],
    themeBg: 'from-pink-50 via-rose-50 to-amber-100 border-pink-400',
    correctVehicleId: 'van_aiskrim',
    correctVehicleName: 'Van Aiskrim Comel',
    correctVehicleIcon: '🚐',
    praiseMessage: 'Yummy! Van Aiskrim 🚐 membawa aiskrim coklat dan strawberi yang manis & sejuk!',
    options: [
      { id: 'van_aiskrim', name: 'Van Aiskrim', icon: '🚐', category: 'Makanan Sejuk', color: 'bg-pink-50 hover:bg-pink-100 border-pink-400 text-pink-900' },
      { id: 'ambulans', name: 'Ambulans', icon: '🚑', category: 'Hospital', color: 'bg-emerald-50 hover:bg-emerald-100 border-emerald-300 text-emerald-900' },
      { id: 'lori_sampah', name: 'Lori Sampah', icon: '🚛', category: 'Kebersihan', color: 'bg-slate-50 hover:bg-slate-100 border-slate-300 text-slate-900' },
    ],
  },
];
