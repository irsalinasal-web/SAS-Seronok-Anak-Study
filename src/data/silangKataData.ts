export interface TargetWord {
  id: string;
  word: string;
  icon: string;
  direction: 'mendatar' | 'menegak';
  color: string;
  highlightBg: string;
  highlightText: string;
  cells: { r: number; c: number }[];
}

export interface SilangKataLevel {
  id: string;
  title: string;
  tagline: string;
  gridRows: number;
  gridCols: number;
  grid: string[][];
  words: TargetWord[];
}

export const SILANG_KATA_LEVELS: SilangKataLevel[] = [
  // TAHAP 1: Perkataan Bersilang Sebenar (BUKU, SUDU, KIPAS, IKAN, AYAM)
  // SUDU (Menegak) & BUKU (Mendatar) bersilang pada 'U'
  // BUKU (Mendatar) & KIPAS (Menegak) bersilang pada 'K'
  // KIPAS (Menegak) & IKAN (Mendatar) bersilang pada 'I'
  // KIPAS (Menegak) & AYAM (Mendatar) bersilang pada 'A'
  {
    id: 'sk_tahap_1',
    title: 'Benda & Haiwan Di Rumah',
    tagline: 'Cari 5 perkataan bersilang (Mendatar ➡ & Menegak ⬇)',
    gridRows: 6,
    gridCols: 6,
    grid: [
      ['R', 'S', 'T', 'L', 'E', 'P'], // (0,1)=S (SUDU)
      ['B', 'U', 'K', 'U', 'M', 'O'], // (1,0..3)=B-U-K-U, (1,1)=U (SUDU), (1,2)=K (KIPAS)
      ['J', 'D', 'I', 'K', 'A', 'N'], // (2,1)=D (SUDU), (2,2..5)=I-K-A-N, (2,2)=I (KIPAS)
      ['H', 'U', 'P', 'E', 'N', 'A'], // (3,1)=U (SUDU), (3,2)=P (KIPAS)
      ['G', 'B', 'A', 'Y', 'A', 'M'], // (4,2..5)=A-Y-A-M, (4,2)=A (KIPAS)
      ['C', 'D', 'S', 'W', 'X', 'Z'], // (5,2)=S (KIPAS)
    ],
    words: [
      {
        id: 'w_buku',
        word: 'BUKU',
        icon: '📖',
        direction: 'mendatar',
        color: 'border-blue-400 bg-blue-50 text-blue-900',
        highlightBg: 'bg-blue-500 text-white shadow-md border-blue-600',
        highlightText: 'text-white',
        cells: [
          { r: 1, c: 0 },
          { r: 1, c: 1 },
          { r: 1, c: 2 },
          { r: 1, c: 3 },
        ],
      },
      {
        id: 'w_sudu',
        word: 'SUDU',
        icon: '🥄',
        direction: 'menegak',
        color: 'border-amber-400 bg-amber-50 text-amber-900',
        highlightBg: 'bg-amber-500 text-amber-950 shadow-md border-amber-600',
        highlightText: 'text-amber-950',
        cells: [
          { r: 0, c: 1 },
          { r: 1, c: 1 },
          { r: 2, c: 1 },
          { r: 3, c: 1 },
        ],
      },
      {
        id: 'w_kipas',
        word: 'KIPAS',
        icon: '🪭',
        direction: 'menegak',
        color: 'border-purple-400 bg-purple-50 text-purple-900',
        highlightBg: 'bg-purple-500 text-white shadow-md border-purple-600',
        highlightText: 'text-white',
        cells: [
          { r: 1, c: 2 },
          { r: 2, c: 2 },
          { r: 3, c: 2 },
          { r: 4, c: 2 },
          { r: 5, c: 2 },
        ],
      },
      {
        id: 'w_ikan',
        word: 'IKAN',
        icon: '🐟',
        direction: 'mendatar',
        color: 'border-cyan-400 bg-cyan-50 text-cyan-900',
        highlightBg: 'bg-cyan-500 text-cyan-950 shadow-md border-cyan-600',
        highlightText: 'text-cyan-950',
        cells: [
          { r: 2, c: 2 },
          { r: 2, c: 3 },
          { r: 2, c: 4 },
          { r: 2, c: 5 },
        ],
      },
      {
        id: 'w_ayam',
        word: 'AYAM',
        icon: '🐔',
        direction: 'mendatar',
        color: 'border-rose-400 bg-rose-50 text-rose-900',
        highlightBg: 'bg-rose-500 text-white shadow-md border-rose-600',
        highlightText: 'text-white',
        cells: [
          { r: 4, c: 2 },
          { r: 4, c: 3 },
          { r: 4, c: 4 },
          { r: 4, c: 5 },
        ],
      },
    ],
  },

  // TAHAP 2: BOLA, TOPI, AWAN, IKAN, KAKI (Bersilang Mendatar & Menegak)
  // BOLA (Mendatar) & TOPI (Menegak) bersilang pada 'O' di (1,2)
  // BOLA (Mendatar) & AWAN (Menegak) bersilang pada 'A' di (1,4)
  // AWAN (Menegak) & IKAN (Mendatar) bersilang pada 'N' di (4,4)
  // IKAN (Mendatar) & KAKI (Menegak) bersilang pada 'K' di (4,2)
  {
    id: 'sk_tahap_2',
    title: 'Mainan & Alam Ceria',
    tagline: 'Cari Bola, Topi, Awan, Ikan & Kaki bersilang!',
    gridRows: 6,
    gridCols: 6,
    grid: [
      ['M', 'E', 'T', 'R', 'S', 'B'], // (0,2)=T (TOPI)
      ['P', 'B', 'O', 'L', 'A', 'J'], // (1,1..4)=B-O-L-A, (1,2)=O (TOPI), (1,4)=A (AWAN)
      ['Q', 'H', 'P', 'C', 'W', 'K'], // (2,2)=P (TOPI), (2,4)=W (AWAN)
      ['D', 'E', 'I', 'K', 'A', 'L'], // (3,2)=I (TOPI), (3,4)=A (AWAN)
      ['F', 'I', 'K', 'A', 'N', 'Z'], // (4,1..4)=I-K-A-N, (4,2)=K (KAKI), (4,4)=N (AWAN)
      ['V', 'A', 'A', 'K', 'I', 'Y'], // (5,2)=A, (5,3)=K, (5,4)=I (KAKI: (4,2)K, (5,2)A, (5,3)K, (5,4)I or Down at (4..5,2))
    ],
    words: [
      {
        id: 'w_bola',
        word: 'BOLA',
        icon: '⚽',
        direction: 'mendatar',
        color: 'border-emerald-400 bg-emerald-50 text-emerald-900',
        highlightBg: 'bg-emerald-500 text-white shadow-md border-emerald-600',
        highlightText: 'text-white',
        cells: [
          { r: 1, c: 1 },
          { r: 1, c: 2 },
          { r: 1, c: 3 },
          { r: 1, c: 4 },
        ],
      },
      {
        id: 'w_topi',
        word: 'TOPI',
        icon: '🧢',
        direction: 'menegak',
        color: 'border-sky-400 bg-sky-50 text-sky-900',
        highlightBg: 'bg-sky-500 text-white shadow-md border-sky-600',
        highlightText: 'text-white',
        cells: [
          { r: 0, c: 2 },
          { r: 1, c: 2 },
          { r: 2, c: 2 },
          { r: 3, c: 2 },
        ],
      },
      {
        id: 'w_awan',
        word: 'AWAN',
        icon: '☁️',
        direction: 'menegak',
        color: 'border-blue-400 bg-blue-50 text-blue-900',
        highlightBg: 'bg-blue-500 text-white shadow-md border-blue-600',
        highlightText: 'text-white',
        cells: [
          { r: 1, c: 4 },
          { r: 2, c: 4 },
          { r: 3, c: 4 },
          { r: 4, c: 4 },
        ],
      },
      {
        id: 'w_ikan_2',
        word: 'IKAN',
        icon: '🐟',
        direction: 'mendatar',
        color: 'border-cyan-400 bg-cyan-50 text-cyan-900',
        highlightBg: 'bg-cyan-500 text-cyan-950 shadow-md border-cyan-600',
        highlightText: 'text-cyan-950',
        cells: [
          { r: 4, c: 1 },
          { r: 4, c: 2 },
          { r: 4, c: 3 },
          { r: 4, c: 4 },
        ],
      },
      {
        id: 'w_kaki',
        word: 'KAKI',
        icon: '🦶',
        direction: 'mendatar',
        color: 'border-teal-400 bg-teal-50 text-teal-900',
        highlightBg: 'bg-teal-500 text-white shadow-md border-teal-600',
        highlightText: 'text-white',
        cells: [
          { r: 5, c: 1 },
          { r: 5, c: 2 },
          { r: 5, c: 3 },
          { r: 5, c: 4 },
        ],
      },
    ],
  },

  // TAHAP 3: KUDA, DADU, SUSU, MEJA, OREN (Bersilang Mendatar & Menegak)
  // KUDA (Mendatar) & DADU (Menegak) bersilang pada 'D' di (1,2)
  // DADU (Menegak) & SUSU (Mendatar) bersilang pada 'U' di (3,2)
  // DADU (Menegak) & DADU ends, KUDA (Mendatar) & OREN (Menegak) bersilang pada 'A' or 'U'
  {
    id: 'sk_tahap_3',
    title: 'Haiwan & Makanan Ceria',
    tagline: 'Cari Kuda, Dadu, Susu, Meja & Roti bersilang!',
    gridRows: 6,
    gridCols: 6,
    grid: [
      ['R', 'K', 'D', 'L', 'M', 'P'], // (0,2)=D (DADU), (0,4)=M (MEJA)
      ['K', 'U', 'D', 'A', 'E', 'B'], // (1,0..3)=K-U-D-A, (1,2)=D (DADU), (1,4)=E (MEJA)
      ['T', 'Y', 'A', 'P', 'J', 'S'], // (2,2)=A (DADU), (2,4)=J (MEJA)
      ['S', 'U', 'S', 'U', 'A', 'N'], // (3,0..3)=S-U-S-U, (3,4)=A (MEJA), (3,3)=U (shared with DADU? (3,2)=D, (4,2)=U)
      ['B', 'R', 'O', 'T', 'I', 'W'], // (4,1..4)=R-O-T-I
      ['H', 'J', 'U', 'K', 'L', 'Z'], // (5,2)=U (DADU: (0,2)D, (2,2)A, (3,2)S, (5,2)U)
    ],
    words: [
      {
        id: 'w_kuda',
        word: 'KUDA',
        icon: '🐴',
        direction: 'mendatar',
        color: 'border-amber-400 bg-amber-50 text-amber-900',
        highlightBg: 'bg-amber-500 text-amber-950 shadow-md border-amber-600',
        highlightText: 'text-amber-950',
        cells: [
          { r: 1, c: 0 },
          { r: 1, c: 1 },
          { r: 1, c: 2 },
          { r: 1, c: 3 },
        ],
      },
      {
        id: 'w_meja',
        word: 'MEJA',
        icon: '🪑',
        direction: 'menegak',
        color: 'border-purple-400 bg-purple-50 text-purple-900',
        highlightBg: 'bg-purple-500 text-white shadow-md border-purple-600',
        highlightText: 'text-white',
        cells: [
          { r: 0, c: 4 },
          { r: 1, c: 4 },
          { r: 2, c: 4 },
          { r: 3, c: 4 },
        ],
      },
      {
        id: 'w_susu',
        word: 'SUSU',
        icon: '🥛',
        direction: 'mendatar',
        color: 'border-blue-400 bg-blue-50 text-blue-900',
        highlightBg: 'bg-blue-500 text-white shadow-md border-blue-600',
        highlightText: 'text-white',
        cells: [
          { r: 3, c: 0 },
          { r: 3, c: 1 },
          { r: 3, c: 2 },
          { r: 3, c: 3 },
        ],
      },
      {
        id: 'w_roti',
        word: 'ROTI',
        icon: '🍞',
        direction: 'mendatar',
        color: 'border-orange-400 bg-orange-50 text-orange-900',
        highlightBg: 'bg-orange-500 text-white shadow-md border-orange-600',
        highlightText: 'text-white',
        cells: [
          { r: 4, c: 1 },
          { r: 4, c: 2 },
          { r: 4, c: 3 },
          { r: 4, c: 4 },
        ],
      },
      {
        id: 'w_dadu',
        word: 'DADU',
        icon: '🎲',
        direction: 'menegak',
        color: 'border-rose-400 bg-rose-50 text-rose-900',
        highlightBg: 'bg-rose-500 text-white shadow-md border-rose-600',
        highlightText: 'text-white',
        cells: [
          { r: 0, c: 2 },
          { r: 1, c: 2 },
          { r: 2, c: 2 },
          { r: 3, c: 2 },
        ],
      },
    ],
  },

  // TAHAP 4: EPAL, LORI, ITIK, KEK, MATA
  {
    id: 'sk_tahap_4',
    title: 'Buah & Kenderaan',
    tagline: 'Cari Epal, Lori, Itik, Kek & Mata bersilang!',
    gridRows: 6,
    gridCols: 6,
    grid: [
      ['S', 'E', 'P', 'A', 'L', 'T'], // (0,1..4)=E-P-A-L, (0,4)=L (LORI)
      ['M', 'A', 'T', 'A', 'O', 'K'], // (1,0..3)=M-A-T-A, (1,4)=O (LORI)
      ['B', 'C', 'I', 'T', 'R', 'I'], // (2,4)=R (LORI)
      ['K', 'E', 'K', 'P', 'I', 'N'], // (3,0..2)=K-E-K, (3,4)=I (LORI)
      ['I', 'T', 'I', 'K', 'Y', 'W'], // (4,0..3)=I-T-I-K
      ['D', 'G', 'H', 'J', 'X', 'Z'],
    ],
    words: [
      {
        id: 'w_epal',
        word: 'EPAL',
        icon: '🍎',
        direction: 'mendatar',
        color: 'border-rose-400 bg-rose-50 text-rose-900',
        highlightBg: 'bg-rose-500 text-white shadow-md border-rose-600',
        highlightText: 'text-white',
        cells: [
          { r: 0, c: 1 },
          { r: 0, c: 2 },
          { r: 0, c: 3 },
          { r: 0, c: 4 },
        ],
      },
      {
        id: 'w_lori',
        word: 'LORI',
        icon: '🚚',
        direction: 'menegak',
        color: 'border-red-400 bg-red-50 text-red-900',
        highlightBg: 'bg-red-500 text-white shadow-md border-red-600',
        highlightText: 'text-white',
        cells: [
          { r: 0, c: 4 },
          { r: 1, c: 4 },
          { r: 2, c: 4 },
          { r: 3, c: 4 },
        ],
      },
      {
        id: 'w_mata',
        word: 'MATA',
        icon: '👀',
        direction: 'mendatar',
        color: 'border-indigo-400 bg-indigo-50 text-indigo-900',
        highlightBg: 'bg-indigo-500 text-white shadow-md border-indigo-600',
        highlightText: 'text-white',
        cells: [
          { r: 1, c: 0 },
          { r: 1, c: 1 },
          { r: 1, c: 2 },
          { r: 1, c: 3 },
        ],
      },
      {
        id: 'w_kek',
        word: 'KEK',
        icon: '🎂',
        direction: 'mendatar',
        color: 'border-pink-400 bg-pink-50 text-pink-900',
        highlightBg: 'bg-pink-500 text-white shadow-md border-pink-600',
        highlightText: 'text-white',
        cells: [
          { r: 3, c: 0 },
          { r: 3, c: 1 },
          { r: 3, c: 2 },
        ],
      },
      {
        id: 'w_itik',
        word: 'ITIK',
        icon: '🦆',
        direction: 'mendatar',
        color: 'border-amber-400 bg-amber-50 text-amber-900',
        highlightBg: 'bg-amber-500 text-amber-950 shadow-md border-amber-600',
        highlightText: 'text-amber-950',
        cells: [
          { r: 4, c: 0 },
          { r: 4, c: 1 },
          { r: 4, c: 2 },
          { r: 4, c: 3 },
        ],
      },
    ],
  },
];
