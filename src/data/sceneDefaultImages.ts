/**
 * Default High-Quality SVG Visuals for Muzium Dinosaur and Muzium Angkasa.
 * Exported as Data URIs so they can be seamlessly cropped in 80x80 px target cards
 * just like user-uploaded images.
 */

const DINOSAUR_MUSEUM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="hallWall" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1e293b"/>
      <stop offset="70%" stop-color="#334155"/>
      <stop offset="100%" stop-color="#475569"/>
    </linearGradient>
    <linearGradient id="hallFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#57534e"/>
      <stop offset="100%" stop-color="#292524"/>
    </linearGradient>
    <linearGradient id="spotlightDino" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="rgba(254,240,138,0.35)"/>
      <stop offset="100%" stop-color="rgba(254,240,138,0.0)"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="800" height="320" fill="url(#hallWall)"/>
  <rect x="0" y="320" width="800" height="130" fill="url(#hallFloor)"/>
  <polygon points="0,0 120,80 120,320 0,450" fill="#0f172a" opacity="0.4"/>
  <polygon points="800,0 680,80 680,320 800,450" fill="#0f172a" opacity="0.4"/>

  <line x1="0" y1="80" x2="800" y2="80" stroke="#64748b" stroke-width="3"/>
  <polygon points="460,0 360,320 580,320" fill="url(#spotlightDino)"/>

  <!-- Rangka Pterodactyl Tergantung di Siling (x: 66.5, y: 11.5) -->
  <g transform="translate(532, 52) scale(0.9)">
    <path d="M-50,0 Q0,-15 50,0 Q20,15 0,8 Q-20,15 -50,0 Z" fill="#fef3c7" stroke="#78350f" stroke-width="2"/>
    <line x1="0" y1="-50" x2="0" y2="0" stroke="#94a3b8" stroke-width="1.5"/>
  </g>

  <!-- Pelantar Pameran Utama -->
  <polygon points="340,240 600,240 640,310 300,310" fill="#78716c" stroke="#44403c" stroke-width="3"/>

  <!-- Rangka T-Rex di Pelantar (x: 58.5, y: 28.5) -->
  <g transform="translate(468, 128) scale(1.3)">
    <path d="M-60,50 Q-20,10 20,20 Q60,10 70,-10" fill="none" stroke="#fef3c7" stroke-width="6" stroke-linecap="round"/>
    <path d="M70,-10 C85,-15 95,-5 88,10 C80,18 70,5 70,-10 Z" fill="#fef3c7" stroke="#92400e" stroke-width="2.5"/>
    <path d="M76,6 L82,10 M72,2 L76,6" stroke="#92400e" stroke-width="2"/>
    <path d="M-10,25 L-8,45 M0,23 L4,47 M10,21 L16,45 M20,20 L26,42" stroke="#fef3c7" stroke-width="3" stroke-linecap="round"/>
    <path d="M15,22 L22,70 L35,80 M5,24 L-2,70 L-15,80" stroke="#fef3c7" stroke-width="4.5" stroke-linecap="round" fill="none"/>
  </g>

  <!-- Triceratops di Kiri Dewan (x: 28.2, y: 44.5) -->
  <g transform="translate(225, 200) scale(1.1)">
    <rect x="-40" y="20" width="80" height="40" rx="10" fill="#fed7aa" stroke="#9a3412" stroke-width="3"/>
    <circle cx="45" cy="25" r="22" fill="#fdba74" stroke="#9a3412" stroke-width="3"/>
    <line x1="55" y1="10" x2="75" y2="0" stroke="#fef3c7" stroke-width="4" stroke-linecap="round"/>
    <line x1="45" y1="5" x2="55" y2="-10" stroke="#fef3c7" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- Leher Panjang / Sauropod di Kanan (x: 86.5, y: 39.0) -->
  <g transform="translate(692, 175) scale(1.1)">
    <path d="M0,60 Q-20,0 20,-30 Q30,-40 45,-35" fill="none" stroke="#bbf7d0" stroke-width="9" stroke-linecap="round"/>
    <circle cx="45" cy="-35" r="7" fill="#86efac"/>
    <rect x="-25" y="55" width="50" height="35" rx="8" fill="#86efac" stroke="#166534" stroke-width="2.5"/>
  </g>

  <!-- Kotak Kaca Tengkorak Fosil Kiri (x: 13.5, y: 72.0) -->
  <g transform="translate(108, 324)">
    <rect x="-35" y="-30" width="70" height="60" fill="rgba(186,230,253,0.3)" stroke="#38bdf8" stroke-width="2.5" rx="6"/>
    <ellipse cx="0" cy="0" rx="18" ry="12" fill="#fef3c7" stroke="#78350f" stroke-width="2"/>
    <circle cx="-6" cy="-2" r="3" fill="#451a03"/>
    <circle cx="6" cy="-2" r="3" fill="#451a03"/>
  </g>

  <!-- Bangku Kayu Pelawat & Beg Galas (x: 33.5, y: 58.5) -->
  <g transform="translate(268, 263)">
    <rect x="-35" y="10" width="70" height="12" rx="3" fill="#854d0e"/>
    <rect x="-10" y="-8" width="22" height="24" rx="4" fill="#ea580c" stroke="#9a3412" stroke-width="2"/>
    <path d="M-3,-8 C-3,-16 7,-16 7,-8" fill="none" stroke="#7c2d12" stroke-width="2.5"/>
  </g>

  <!-- Meja Kajian Bulat Hadapan -->
  <ellipse cx="440" cy="390" rx="280" ry="50" fill="#a8a29e" stroke="#57534e" stroke-width="4"/>

  <!-- Fosil Ammonite (x: 20.5, y: 88.0) -->
  <g transform="translate(164, 396)">
    <circle cx="0" cy="0" r="16" fill="#fed7aa" stroke="#9a3412" stroke-width="2"/>
    <path d="M0,-10 A10,10 0 1 1 -8,6 A6,6 0 1 1 0,0" fill="none" stroke="#7c2d12" stroke-width="2"/>
  </g>

  <!-- Kanta Pembesar (x: 31.0, y: 90.0) -->
  <g transform="translate(248, 405)">
    <circle cx="-5" cy="-5" r="13" fill="#e0f2fe" stroke="#0284c7" stroke-width="2.5"/>
    <line x1="5" y1="5" x2="18" y2="18" stroke="#78350f" stroke-width="4" stroke-linecap="round"/>
  </g>

  <!-- Batu Permata / Kristal (x: 47.0, y: 83.5) -->
  <g transform="translate(376, 375)">
    <polygon points="0,-16 16,-4 10,16 -10,16 -16,-4" fill="#c084fc" stroke="#6b21a8" stroke-width="2"/>
  </g>

  <!-- Peta Dinosaur (x: 56.5, y: 92.5) -->
  <g transform="translate(452, 416)">
    <polygon points="-24,-12 0,-18 24,-12 24,14 0,8 -24,14" fill="#fef3c7" stroke="#b45309" stroke-width="2"/>
    <path d="M-14,0 Q0,-6 14,0" stroke="#dc2626" stroke-width="2" stroke-dasharray="2,2" fill="none"/>
  </g>

  <!-- Buku Prasejarah (x: 67.0, y: 76.5) -->
  <g transform="translate(536, 344)">
    <rect x="-20" y="-12" width="40" height="24" rx="3" fill="#2563eb" stroke="#1d4ed8" stroke-width="2"/>
    <line x1="-12" y1="-4" x2="12" y2="-4" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
    <line x1="-12" y1="2" x2="6" y2="2" stroke="#ffffff" stroke-width="2" stroke-linecap="round"/>
  </g>

  <!-- Binokular (x: 79.5, y: 85.0) -->
  <g transform="translate(636, 382)">
    <rect x="-14" y="-10" width="12" height="20" rx="3" fill="#334155"/>
    <rect x="2" y="-10" width="12" height="20" rx="3" fill="#334155"/>
    <circle cx="-8" cy="6" r="4" fill="#38bdf8"/>
    <circle cx="8" cy="6" r="4" fill="#38bdf8"/>
  </g>
</svg>`;

const SPACE_MUSEUM_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450">
  <defs>
    <linearGradient id="spaceDome" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#090d16"/>
      <stop offset="60%" stop-color="#0f172a"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
    <linearGradient id="moonFloor" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#475569"/>
      <stop offset="100%" stop-color="#1e293b"/>
    </linearGradient>
  </defs>

  <rect x="0" y="0" width="800" height="320" fill="url(#spaceDome)"/>
  <rect x="0" y="320" width="800" height="130" fill="url(#moonFloor)"/>

  <!-- Model Zuhal (x: 67.5, y: 6.5) -->
  <g transform="translate(540, 29)">
    <ellipse cx="0" cy="0" rx="28" ry="8" fill="none" stroke="#f59e0b" stroke-width="3" transform="rotate(-20)"/>
    <circle cx="0" cy="0" r="14" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
  </g>

  <!-- Model Marikh (x: 40.0, y: 21.0) -->
  <g transform="translate(320, 94)">
    <circle cx="0" cy="0" r="15" fill="#ef4444" stroke="#991b1b" stroke-width="2"/>
  </g>

  <!-- Space Shuttle (x: 50.8, y: 35.0) -->
  <g transform="translate(406, 157) scale(1.35)">
    <polygon points="0,-60 -24,20 24,20" fill="#f8fafc" stroke="#0f172a" stroke-width="3"/>
    <polygon points="-24,10 -40,30 -24,26" fill="#ea580c"/>
    <polygon points="24,10 40,30 24,26" fill="#ea580c"/>
    <ellipse cx="0" cy="-25" rx="6" ry="10" fill="#0284c7"/>
    <polygon points="-8,20 0,36 8,20" fill="#f97316"/>
  </g>

  <!-- Baju Angkasawan dalam Almari Kaca Kiri (x: 8.5, y: 50.0) -->
  <g transform="translate(68, 225)">
    <rect x="-26" y="-45" width="52" height="90" rx="6" fill="rgba(56,189,248,0.2)" stroke="#38bdf8" stroke-width="2.5"/>
    <circle cx="0" cy="-22" r="14" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
    <ellipse cx="0" cy="-22" rx="9" ry="6" fill="#f59e0b"/>
    <rect x="-14" y="-8" width="28" height="35" rx="5" fill="#f8fafc" stroke="#334155" stroke-width="2"/>
  </g>

  <!-- Lunar Lander di Permukaan Bulan (x: 26.5, y: 44.5) -->
  <g transform="translate(212, 200) scale(1.1)">
    <rect x="-20" y="-15" width="40" height="30" rx="4" fill="#eab308" stroke="#854d0e" stroke-width="2"/>
    <line x1="-16" y1="15" x2="-28" y2="35" stroke="#475569" stroke-width="3"/>
    <line x1="16" y1="15" x2="28" y2="35" stroke="#475569" stroke-width="3"/>
  </g>

  <!-- Mars Rover (x: 69.5, y: 52.5) -->
  <g transform="translate(556, 236)">
    <rect x="-25" y="-12" width="50" height="24" rx="4" fill="#cbd5e1" stroke="#334155" stroke-width="2"/>
    <circle cx="-16" cy="16" r="8" fill="#0f172a"/>
    <circle cx="0" cy="16" r="8" fill="#0f172a"/>
    <circle cx="16" cy="16" r="8" fill="#0f172a"/>
    <line x1="10" y1="-12" x2="16" y2="-25" stroke="#334155" stroke-width="2"/>
    <circle cx="16" cy="-25" r="4" fill="#ef4444"/>
  </g>

  <!-- Teleskop Bintang Besar Kanan (x: 92.0, y: 44.0) -->
  <g transform="translate(736, 198)">
    <line x1="-25" y1="20" x2="20" y2="-20" stroke="#0f172a" stroke-width="7" stroke-linecap="round"/>
    <line x1="-5" y1="6" x2="-20" y2="38" stroke="#475569" stroke-width="3"/>
    <line x1="-5" y1="6" x2="10" y2="38" stroke="#475569" stroke-width="3"/>
  </g>

  <!-- Skrin Sentuh Interaktif Suria (x: 26.5, y: 69.0) -->
  <g transform="translate(212, 310)">
    <rect x="-24" y="-18" width="48" height="32" rx="3" fill="#0f172a" stroke="#38bdf8" stroke-width="2"/>
    <circle cx="0" cy="-2" r="7" fill="#facc15"/>
  </g>

  <!-- Bangku Kayu Pelawat & Beg Angkasa (x: 32.5, y: 81.5) & Botol Air (x: 38.6, y: 81.0) -->
  <g transform="translate(270, 370)">
    <rect x="-20" y="5" width="80" height="12" rx="3" fill="#854d0e"/>
    <rect x="-10" y="-12" width="24" height="20" rx="4" fill="#0284c7" stroke="#0369a1" stroke-width="2"/>
    <rect x="36" y="-14" width="10" height="22" rx="3" fill="#38bdf8" stroke="#0284c7" stroke-width="1.5"/>
  </g>

  <!-- Meja Orbit Hadapan Kanan (x: 88.0, y: 90.0) -->
  <g transform="translate(704, 405)">
    <ellipse cx="0" cy="0" rx="60" ry="24" fill="#0284c7" stroke="#38bdf8" stroke-width="3"/>
  </g>

  <!-- Helmet Emas dalam Kotak Kaca Hadapan Kanan (x: 97.5, y: 64.0) -->
  <g transform="translate(780, 288)">
    <rect x="-18" y="-22" width="36" height="44" rx="4" fill="rgba(254,240,138,0.25)" stroke="#facc15" stroke-width="2"/>
    <circle cx="0" cy="0" r="12" fill="#fbbf24" stroke="#d97706" stroke-width="2"/>
  </g>
</svg>`;

export function getSceneSvgDataUri(sceneId: string): string {
  const svg = sceneId === 'muzium_dinosaur' ? DINOSAUR_MUSEUM_SVG : SPACE_MUSEUM_SVG;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}
