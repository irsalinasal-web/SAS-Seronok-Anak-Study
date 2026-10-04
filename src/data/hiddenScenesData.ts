export interface HiddenTarget {
  id: string;
  name: string;
  x: number; // percentage from left (0 - 100)
  y: number; // percentage from top (0 - 100)
  radius: number; // hotspot touch radius in percentage
}

export interface HiddenScene {
  id: string;
  title: string;
  label: string;
  targets: HiddenTarget[];
  defaultSvg: string;
}

// Helper untuk menghasilkan visual berkualiti tinggi jika belum dimuat naik
function makeSceneSvg(_title: string, bgColor: string, elements: string): string {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
    <rect width="800" height="450" fill="${bgColor}"/>
    ${elements}
  </svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

export const ALL_HIDDEN_SCENES: Record<string, HiddenScene> = {
  // 1. Muzium Dinosaur
  '01_muzium_dinosaur': {
    id: '01_muzium_dinosaur',
    title: 'Muzium Dinosaur',
    label: '01_muzium_dinosaur',
    targets: [
      { id: 'hd_rangka_trex', name: 'Rangka T-Rex', x: 46.0, y: 11.0, radius: 7.0 },
      { id: 'hd_triceratops', name: 'Triceratops', x: 28.0, y: 44.0, radius: 7.0 },
      { id: 'hd_pterodactyl', name: 'Pterodactyl', x: 67.0, y: 10.0, radius: 6.0 },
      { id: 'hd_beg_biru', name: 'Beg Biru', x: 33.0, y: 58.0, radius: 5.5 },
      { id: 'hd_kanta', name: 'Kanta Pembesar', x: 31.0, y: 89.0, radius: 5.0 },
    ],
    defaultSvg: makeSceneSvg(
      'Muzium Dinosaur',
      '#1e293b',
      `
      <rect y="320" width="800" height="130" fill="#475569"/>
      <!-- T-Rex (x:46, y:11) -->
      <g transform="translate(368, 50) scale(1.4)">
        <path d="M-40,40 Q-10,0 20,10 Q50,0 60,-20" stroke="#fef3c7" stroke-width="6" fill="none"/>
        <path d="M60,-20 C75,-25 85,-15 78,0 C70,8 60,-5 60,-20 Z" fill="#fef3c7" stroke="#92400e" stroke-width="2"/>
      </g>
      <!-- Triceratops (x:28, y:44) -->
      <circle cx="224" cy="198" r="32" fill="#fed7aa" stroke="#9a3412" stroke-width="3"/>
      <!-- Pterodactyl (x:67, y:10) -->
      <polygon points="536,35 480,55 592,55" fill="#fbcfe8" stroke="#be185d" stroke-width="2"/>
      <!-- Beg Biru (x:33, y:58) -->
      <rect x="250" y="246" width="30" height="32" rx="6" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
      <!-- Kanta (x:31, y:89) -->
      <circle cx="248" cy="400" r="16" fill="#e0f2fe" stroke="#0284c7" stroke-width="3"/>
      <line x1="260" y1="412" x2="274" y2="426" stroke="#78350f" stroke-width="4"/>
      `
    ),
  },

  // 2. Muzium Angkasa
  '02_muzium_angkasawan': {
    id: '02_muzium_angkasawan',
    title: 'Muzium Angkasa',
    label: '02_muzium_angkasawan',
    targets: [
      { id: 'ha_shuttle', name: 'Space Shuttle', x: 51.0, y: 28.0, radius: 8.0 },
      { id: 'ha_baju', name: 'Baju Angkasawan', x: 8.5, y: 48.0, radius: 6.5 },
      { id: 'ha_lander', name: 'Lunar Lander', x: 27.5, y: 44.0, radius: 6.5 },
      { id: 'ha_teleskop', name: 'Teleskop', x: 92.5, y: 44.0, radius: 6.0 },
      { id: 'ha_beg', name: 'Beg Angkasa', x: 32.0, y: 81.0, radius: 5.5 },
    ],
    defaultSvg: makeSceneSvg(
      'Muzium Angkasa',
      '#090d16',
      `
      <rect y="320" width="800" height="130" fill="#1e293b"/>
      <!-- Space Shuttle (x:51, y:28) -->
      <polygon points="408,70 380,180 436,180" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
      <!-- Baju Angkasawan (x:8.5, y:48) -->
      <rect x="42" y="175" width="52" height="85" rx="8" fill="#38bdf8" opacity="0.5"/>
      <circle cx="68" cy="195" r="14" fill="#f8fafc"/>
      <!-- Lunar Lander (x:27.5, y:44) -->
      <rect x="200" y="180" width="40" height="36" fill="#eab308" stroke="#854d0e" stroke-width="2"/>
      <!-- Teleskop (x:92.5, y:44) -->
      <line x1="715" y1="220" x2="765" y2="175" stroke="#0f172a" stroke-width="8" stroke-linecap="round"/>
      <!-- Beg Angkasa (x:32, y:81) -->
      <rect x="242" y="348" width="28" height="32" rx="5" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
      `
    ),
  },

  // 3. Akuarium
  '03_akuarium': {
    id: '03_akuarium',
    title: 'Akuarium Samudera',
    label: '03_akuarium',
    targets: [
      { id: 'aq_whale', name: 'Jerung Paus', x: 82.0, y: 16.0, radius: 8.0 },
      { id: 'aq_skeleton', name: 'Rangka Paus', x: 48.0, y: 16.0, radius: 7.5 },
      { id: 'aq_penyu', name: 'Penyu Hijau', x: 91.0, y: 50.0, radius: 6.5 },
      { id: 'aq_topi', name: 'Topi Biru', x: 13.0, y: 92.0, radius: 5.5 },
      { id: 'aq_jaring', name: 'Jaring Tangguk', x: 36.0, y: 81.0, radius: 5.5 },
    ],
    defaultSvg: makeSceneSvg(
      'Akuarium',
      '#0369a1',
      `
      <rect y="320" width="800" height="130" fill="#0c4a6e"/>
      <!-- Jerung Paus (x:82, y:16) -->
      <ellipse cx="656" cy="72" rx="80" ry="35" fill="#0284c7" stroke="#38bdf8" stroke-width="2"/>
      <!-- Rangka Paus (x:48, y:16) -->
      <path d="M320,72 Q384,50 448,72" stroke="#f8fafc" stroke-width="5" fill="none"/>
      <!-- Penyu (x:91, y:50) -->
      <ellipse cx="728" cy="225" rx="35" ry="24" fill="#15803d" stroke="#86efac" stroke-width="2"/>
      <!-- Topi (x:13, y:92) -->
      <ellipse cx="104" cy="414" rx="24" ry="12" fill="#2563eb"/>
      <!-- Jaring (x:36, y:81) -->
      <circle cx="288" cy="364" r="18" fill="none" stroke="#38bdf8" stroke-width="3"/>
      `
    ),
  },

  // 4. Stesen Kereta Api
  '04_stesen_kereta_api': {
    id: '04_stesen_kereta_api',
    title: 'Stesen Kereta Api',
    label: '04_stesen_kereta_api',
    targets: [
      { id: 'sk_lokomotif', name: 'Kereta Api Stim', x: 55.0, y: 46.0, radius: 8.0 },
      { id: 'sk_jam', name: 'Jam Stesen', x: 47.0, y: 15.0, radius: 6.0 },
      { id: 'sk_beg', name: 'Beg Kulit', x: 8.5, y: 76.0, radius: 6.5 },
      { id: 'sk_topi', name: 'Topi Jerami', x: 13.0, y: 89.0, radius: 5.5 },
      { id: 'sk_lampu', name: 'Lampu Tanglung', x: 95.0, y: 62.0, radius: 5.5 },
    ],
    defaultSvg: makeSceneSvg(
      'Stesen Kereta Api',
      '#475569',
      `
      <rect y="320" width="800" height="130" fill="#334155"/>
      <!-- Lokomotif (x:55, y:46) -->
      <rect x="400" y="160" width="80" height="90" fill="#0f172a" stroke="#dc2626" stroke-width="3"/>
      <circle cx="440" cy="205" r="22" fill="#facc15"/>
      <!-- Jam Stesen (x:47, y:15) -->
      <circle cx="376" cy="67" r="24" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
      <!-- Beg Kulit (x:8.5, y:76) -->
      <rect x="48" y="324" width="40" height="36" rx="6" fill="#854d0e"/>
      <!-- Topi Jerami (x:13, y:89) -->
      <ellipse cx="104" cy="400" rx="26" ry="12" fill="#fde047"/>
      <!-- Lampu Tanglung (x:95, y:62) -->
      <polygon points="760,260 745,295 775,295" fill="#f59e0b"/>
      `
    ),
  },

  // 5. Lapangan Terbang
  '05_lapangan_terbang': {
    id: '05_lapangan_terbang',
    title: 'Lapangan Terbang',
    label: '05_lapangan_terbang',
    targets: [
      { id: 'lt_pesawat', name: 'Kapal Terbang', x: 67.0, y: 46.0, radius: 8.0 },
      { id: 'lt_menara', name: 'Menara Kawalan', x: 78.5, y: 34.0, radius: 5.0 },
      { id: 'lt_troli', name: 'Troli Bagasi', x: 55.0, y: 69.0, radius: 7.0 },
      { id: 'lt_beg', name: 'Beg Pink', x: 16.0, y: 73.0, radius: 6.0 },
      { id: 'lt_bantal', name: 'Bantal Leher', x: 30.0, y: 76.0, radius: 5.0 },
    ],
    defaultSvg: makeSceneSvg(
      'Lapangan Terbang',
      '#64748b',
      `
      <rect y="320" width="800" height="130" fill="#94a3b8"/>
      <!-- Kapal Terbang (x:67, y:46) -->
      <ellipse cx="536" cy="207" rx="90" ry="24" fill="#f8fafc" stroke="#0284c7" stroke-width="3"/>
      <!-- Menara Kawalan (x:78.5, y:34) -->
      <rect x="618" y="120" width="20" height="70" fill="#cbd5e1"/>
      <polygon points="612,120 628,95 644,120" fill="#dc2626"/>
      <!-- Troli Bagasi (x:55, y:69) -->
      <rect x="415" y="280" width="50" height="60" fill="#0284c7" rx="4"/>
      <!-- Beg Pink (x:16, y:73) -->
      <rect x="112" y="310" width="32" height="38" rx="6" fill="#f43f5e"/>
      <!-- Bantal Leher (x:30, y:76) -->
      <circle cx="240" cy="342" r="16" fill="#f97316"/>
      `
    ),
  },

  // 6. Pasar Raya
  '06_pasar_raya': {
    id: '06_pasar_raya',
    title: 'Pasar Raya',
    label: '06_pasar_raya',
    targets: [
      { id: 'pr_troli', name: 'Troli Barangan', x: 66.0, y: 88.0, radius: 8.0 },
      { id: 'pr_tembikai', name: 'Tembikai', x: 6.5, y: 82.0, radius: 6.5 },
      { id: 'pr_lobak', name: 'Lobak Merah', x: 18.0, y: 80.0, radius: 6.0 },
      { id: 'pr_papan', name: 'Papan Kedai', x: 51.0, y: 12.0, radius: 6.5 },
      { id: 'pr_bunga', name: 'Pasu Bunga', x: 92.0, y: 64.0, radius: 6.5 },
    ],
    defaultSvg: makeSceneSvg(
      'Pasar Raya',
      '#f1f5f9',
      `
      <rect y="320" width="800" height="130" fill="#e2e8f0"/>
      <!-- Papan Kedai (x:51, y:12) -->
      <rect x="360" y="20" width="96" height="50" rx="8" fill="#0284c7"/>
      <!-- Troli (x:66, y:88) -->
      <rect x="490" y="350" width="76" height="60" rx="6" fill="#dc2626"/>
      <!-- Tembikai (x:6.5, y:82) -->
      <circle cx="52" cy="369" r="26" fill="#15803d"/>
      <!-- Lobak (x:18, y:80) -->
      <polygon points="144,340 134,380 154,380" fill="#f97316"/>
      <!-- Pasu Bunga (x:92, y:64) -->
      <rect x="716" y="270" width="40" height="40" rx="4" fill="#ca8a04"/>
      `
    ),
  },

  // 7. Taman Bunga
  '07_taman_bunga': {
    id: '07_taman_bunga',
    title: 'Taman Bunga',
    label: '07_ taman_bunga',
    targets: [
      { id: 'tb_kincir', name: 'Kincir Angin', x: 60.5, y: 31.0, radius: 6.0 },
      { id: 'tb_pancutan', name: 'Pancutan Air', x: 65.0, y: 46.0, radius: 6.5 },
      { id: 'tb_topi', name: 'Topi Jerami', x: 10.0, y: 80.0, radius: 6.5 },
      { id: 'tb_kereta', name: 'Kereta Sorong', x: 76.5, y: 75.0, radius: 7.0 },
      { id: 'tb_penyiram', name: 'Penyiram Biru', x: 88.0, y: 89.0, radius: 5.5 },
    ],
    defaultSvg: makeSceneSvg(
      'Taman Bunga',
      '#86efac',
      `
      <rect y="320" width="800" height="130" fill="#bbf7d0"/>
      <!-- Kincir Angin (x:60.5, y:31) -->
      <polygon points="484,100 468,160 500,160" fill="#dc2626"/>
      <!-- Pancutan Air (x:65, y:46) -->
      <ellipse cx="520" cy="207" rx="40" ry="16" fill="#38bdf8"/>
      <!-- Topi (x:10, y:80) -->
      <ellipse cx="80" cy="360" rx="30" ry="14" fill="#fde047"/>
      <!-- Kereta Sorong (x:76.5, y:75) -->
      <polygon points="580,310 644,310 630,350 594,350" fill="#854d0e"/>
      <!-- Penyiram (x:88, y:89) -->
      <rect x="686" y="380" width="36" height="34" rx="4" fill="#0284c7"/>
      `
    ),
  },

  // 8. Istana
  '08_istana': {
    id: '08_istana',
    title: 'Istana Diraja',
    label: '08_ istana',
    targets: [
      { id: 'is_gerbang', name: 'Pintu Gerbang', x: 48.0, y: 52.0, radius: 7.5 },
      { id: 'is_angsa', name: 'Angsa Putih', x: 79.5, y: 63.0, radius: 5.5 },
      { id: 'is_mahkota', name: 'Mahkota Emas', x: 10.0, y: 90.0, radius: 6.5 },
      { id: 'is_perisai', name: 'Perisai Singa', x: 19.0, y: 88.0, radius: 5.5 },
      { id: 'is_pancut', name: 'Air Pancut', x: 90.0, y: 63.0, radius: 6.5 },
    ],
    defaultSvg: makeSceneSvg(
      'Istana',
      '#bae6fd',
      `
      <rect y="320" width="800" height="130" fill="#fed7aa"/>
      <!-- Pintu Gerbang (x:48, y:52) -->
      <path d="M344,270 L344,210 Q384,180 424,210 L424,270 Z" fill="#78350f"/>
      <!-- Angsa Putih (x:79.5, y:63) -->
      <ellipse cx="636" cy="283" rx="18" ry="12" fill="#ffffff"/>
      <!-- Mahkota (x:10, y:90) -->
      <polygon points="60,390 70,415 90,415 100,390 80,405" fill="#facc15" stroke="#ca8a04" stroke-width="2"/>
      <!-- Perisai (x:19, y:88) -->
      <path d="M136,375 L168,375 L152,410 Z" fill="#2563eb" stroke="#1d4ed8" stroke-width="2"/>
      <!-- Air Pancut (x:90, y:63) -->
      <ellipse cx="720" cy="283" rx="30" ry="15" fill="#38bdf8"/>
      `
    ),
  },

  // 9. Pulau
  '09_pulau': {
    id: '09_pulau',
    title: 'Pulau Tropika',
    label: '09_pulau',
    targets: [
      { id: 'pl_rumah_api', name: 'Rumah Api', x: 77.0, y: 21.0, radius: 6.5 },
      { id: 'pl_bot', name: 'Bot Biru', x: 56.0, y: 52.0, radius: 7.0 },
      { id: 'pl_papan', name: 'Papan Tanda', x: 14.0, y: 38.0, radius: 7.5 },
      { id: 'pl_bola', name: 'Bola Pantai', x: 34.0, y: 86.0, radius: 5.5 },
      { id: 'pl_kerusi', name: 'Kerusi Pantai', x: 79.0, y: 66.0, radius: 6.5 },
    ],
    defaultSvg: makeSceneSvg(
      'Pulau Tropika',
      '#38bdf8',
      `
      <rect y="320" width="800" height="130" fill="#fef08a"/>
      <!-- Rumah Api (x:77, y:21) -->
      <rect x="600" y="60" width="32" height="70" fill="#dc2626"/>
      <!-- Bot Biru (x:56, y:52) -->
      <polygon points="410,245 486,245 470,265 426,265" fill="#0284c7"/>
      <!-- Papan Tanda (x:14, y:38) -->
      <rect x="80" y="140" width="64" height="60" rx="6" fill="#854d0e"/>
      <!-- Bola Pantai (x:34, y:86) -->
      <circle cx="272" cy="387" r="18" fill="#f43f5e"/>
      <!-- Kerusi Pantai (x:79, y:66) -->
      <polygon points="600,280 660,280 640,315 620,315" fill="#0284c7"/>
      `
    ),
  },

  // 10. Hutan Hujan
  '10_hutan_hujan': {
    id: '10_hutan_hujan',
    title: 'Hutan Hujan',
    label: '10_hutan_hujan',
    targets: [
      { id: 'hh_air_terjun', name: 'Air Terjun', x: 67.0, y: 49.0, radius: 7.5 },
      { id: 'hh_khemah', name: 'Khemah Kuning', x: 36.0, y: 58.0, radius: 7.5 },
      { id: 'hh_unggun', name: 'Unggun Api', x: 61.0, y: 78.0, radius: 7.0 },
      { id: 'hh_kerusi', name: 'Kerusi Lipat', x: 81.0, y: 69.0, radius: 6.5 },
      { id: 'hh_teropong', name: 'Teropong Hitam', x: 8.0, y: 88.0, radius: 5.5 },
    ],
    defaultSvg: makeSceneSvg(
      'Hutan Hujan',
      '#166534',
      `
      <rect y="320" width="800" height="130" fill="#78350f"/>
      <!-- Air Terjun (x:67, y:49) -->
      <rect x="510" y="180" width="50" height="80" fill="#38bdf8"/>
      <!-- Khemah Kuning (x:36, y:58) -->
      <polygon points="288,210 240,285 336,285" fill="#eab308"/>
      <!-- Unggun Api (x:61, y:78) -->
      <polygon points="488,320 472,365 504,365" fill="#f97316"/>
      <!-- Kerusi Lipat (x:81, y:69) -->
      <rect x="628" y="285" width="40" height="45" fill="#ea580c"/>
      <!-- Teropong (x:8, y:88) -->
      <circle cx="64" cy="396" r="12" fill="#0f172a"/>
      `
    ),
  },
};

export const SCENE_KEYS = Object.keys(ALL_HIDDEN_SCENES);
