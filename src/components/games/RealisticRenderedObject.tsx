import React from 'react';

interface ObjectRenderProps {
  id: string;
  name: string;
  className?: string;
}

/**
 * Premium 3D Digital Illustration Vector Rendering.
 * Realistic texturing, directional highlights, specular shine, and soft ambient drop shadows.
 * Zero flat icons, zero emoji, zero clipart.
 */
export const RealisticRenderedObject: React.FC<ObjectRenderProps> = ({ id, name, className = 'w-10 h-10' }) => {
  const key = `${id}_${name}`.toLowerCase();

  // 1. Kompas Antik Tembaga (Antique Brass Compass)
  if (key.includes('kompas')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <defs>
          <radialGradient id="brass_body" cx="38%" cy="32%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="35%" stopColor="#eab308" />
            <stop offset="75%" stopColor="#a16207" />
            <stop offset="100%" stopColor="#451a03" />
          </radialGradient>
          <radialGradient id="compass_dial" cx="45%" cy="40%" r="55%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="70%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>
        </defs>
        {/* Soft Ambient Contact Shadow */}
        <ellipse cx="50" cy="88" rx="36" ry="8" fill="rgba(24,15,6,0.5)" />
        {/* Top Ring Loop */}
        <circle cx="50" cy="14" r="9" fill="none" stroke="url(#brass_body)" strokeWidth="4.5" />
        {/* Heavy Brass Bezel */}
        <circle cx="50" cy="52" r="38" fill="url(#brass_body)" />
        <circle cx="50" cy="52" r="31" fill="#451a03" />
        <circle cx="50" cy="52" r="29" fill="url(#compass_dial)" />
        {/* Compass Cardinal Marks */}
        {Array.from({ length: 12 }).map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="25"
            x2="50"
            y2={i % 3 === 0 ? "29" : "27"}
            stroke="#78350f"
            strokeWidth={i % 3 === 0 ? "2.5" : "1.2"}
            transform={`rotate(${i * 30} 50 52)`}
          />
        ))}
        {/* 3D Magnetic Needle */}
        <polygon points="50,52 46,50 50,27 54,50" fill="#dc2626" />
        <polygon points="50,52 46,54 50,77 54,54" fill="#64748b" />
        <circle cx="50" cy="52" r="4" fill="#facc15" stroke="#78350f" strokeWidth="1" />
        {/* Curved Glass Highlight */}
        <path d="M 28 36 A 26 26 0 0 1 70 34 Q 50 48 28 36 Z" fill="#ffffff" opacity="0.35" />
      </svg>
    );
  }

  // 2. Lampu Suluh Kembara (Camping Flashlight)
  if (key.includes('lampu')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <defs>
          <linearGradient id="torch_casing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="45%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
          <linearGradient id="torch_rim" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#0f172a" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="85" rx="34" ry="7" fill="rgba(15,23,42,0.4)" />
        {/* Body Cylindrical Grip */}
        <rect x="22" y="44" width="44" height="18" rx="4" fill="url(#torch_casing)" transform="rotate(-25 50 50)" />
        {/* Rubberized Ribbed Rings */}
        <rect x="30" y="44" width="4" height="18" fill="#1e293b" transform="rotate(-25 50 50)" />
        <rect x="38" y="44" width="4" height="18" fill="#1e293b" transform="rotate(-25 50 50)" />
        <rect x="46" y="44" width="4" height="18" fill="#1e293b" transform="rotate(-25 50 50)" />
        {/* Flared Lamp Bezel */}
        <polygon points="56,36 78,25 84,42 63,52" fill="url(#torch_rim)" />
        {/* Glowing Convex Lens */}
        <ellipse cx="78" cy="33" rx="4" ry="10" fill="#fef08a" stroke="#ffffff" strokeWidth="1" transform="rotate(-25 78 33)" />
      </svg>
    );
  }

  // 3. Beg Galas Kembara Kanvas (Backpack)
  if (key.includes('beg')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 8px 6px rgba(0,0,0,0.5))">
        <defs>
          <linearGradient id="backpack_fabric" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#d97706" />
            <stop offset="55%" stopColor="#b45309" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="88" rx="34" ry="8" fill="rgba(15,23,42,0.45)" />
        {/* Main Canvas Body */}
        <path d="M 24 45 C 24 25, 76 25, 76 45 L 78 82 C 78 86, 22 86, 22 82 Z" fill="url(#backpack_fabric)" />
        {/* Flap Cover */}
        <path d="M 25 38 C 25 24, 75 24, 75 38 L 74 54 C 58 60, 42 60, 26 54 Z" fill="#92400e" stroke="#78350f" strokeWidth="1" />
        {/* Front Utility Pocket */}
        <rect x="32" y="58" width="36" height="24" rx="5" fill="#f59e0b" stroke="#78350f" strokeWidth="1" />
        {/* Straps & Metal Buckles */}
        <rect x="36" y="36" width="5" height="38" fill="#451a03" rx="1" />
        <rect x="59" y="36" width="5" height="38" fill="#451a03" rx="1" />
        <rect x="35" y="60" width="7" height="6" fill="#fde047" stroke="#78350f" strokeWidth="1" rx="1" />
        <rect x="58" y="60" width="7" height="6" fill="#fde047" stroke="#78350f" strokeWidth="1" rx="1" />
        <path d="M 40 24 C 40 16, 60 16, 60 24" fill="none" stroke="#451a03" strokeWidth="4" />
      </svg>
    );
  }

  // 4. Cerek Camping Keluli (Steel Camping Kettle)
  if (key.includes('cerek')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <defs>
          <radialGradient id="kettle_steel_shading" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="30%" stopColor="#cbd5e1" />
            <stop offset="70%" stopColor="#64748b" />
            <stop offset="100%" stopColor="#334155" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="88" rx="32" ry="8" fill="rgba(15,23,42,0.45)" />
        {/* Handle */}
        <path d="M 28 45 C 28 15, 72 15, 72 45" fill="none" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
        <path d="M 38 20 C 44 17, 56 17, 62 20" fill="none" stroke="#b45309" strokeWidth="8" strokeLinecap="round" />
        {/* Spout */}
        <path d="M 70 54 Q 88 48 88 40 L 85 36 Q 66 48 64 58 Z" fill="#64748b" stroke="#334155" strokeWidth="1" />
        {/* Pot Belly */}
        <ellipse cx="50" cy="65" rx="30" ry="24" fill="url(#kettle_steel_shading)" />
        {/* Lid & Knob */}
        <ellipse cx="50" cy="46" rx="16" ry="6" fill="#475569" />
        <ellipse cx="50" cy="44" rx="15" ry="5" fill="#94a3b8" />
        <circle cx="50" cy="38" r="4" fill="#d97706" />
        <path d="M 32 54 Q 38 68 44 76" stroke="#ffffff" strokeWidth="4" strokeLinecap="round" opacity="0.6" fill="none" />
      </svg>
    );
  }

  // 5. Tali Kembara Bergelung (Climbing Rope Coil)
  if (key.includes('tali')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <defs>
          <linearGradient id="rope_hemp" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#d97706" />
            <stop offset="100%" stopColor="#78350f" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="85" rx="32" ry="7" fill="rgba(15,23,42,0.4)" />
        {/* Coiled Rope Rings */}
        <ellipse cx="50" cy="52" rx="28" ry="18" fill="none" stroke="url(#rope_hemp)" strokeWidth="9" />
        <ellipse cx="50" cy="52" rx="21" ry="14" fill="none" stroke="url(#rope_hemp)" strokeWidth="9" />
        {/* Middle Binding Wrap */}
        <rect x="42" y="34" width="16" height="36" rx="3" fill="#92400e" stroke="#451a03" strokeWidth="1.5" />
        <line x1="42" y1="42" x2="58" y2="42" stroke="#451a03" strokeWidth="1.5" />
        <line x1="42" y1="50" x2="58" y2="50" stroke="#451a03" strokeWidth="1.5" />
        <line x1="42" y1="58" x2="58" y2="58" stroke="#451a03" strokeWidth="1.5" />
      </svg>
    );
  }

  // 6. Buku Ensiklopedia Kulit Tebal (Hardcover Leather Book)
  if (key.includes('buku')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <defs>
          <linearGradient id="book_cover_blue" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#0284c7" />
            <stop offset="50%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#082f49" />
          </linearGradient>
          <linearGradient id="book_page_block" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#fffbeb" />
            <stop offset="50%" stopColor="#fef3c7" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="85" rx="35" ry="7" fill="rgba(15,23,42,0.45)" />
        <polygon points="20,44 68,30 84,48 36,64" fill="url(#book_cover_blue)" stroke="#0c4a6e" strokeWidth="1" />
        <polygon points="36,64 84,48 84,60 36,76" fill="url(#book_page_block)" />
        <polygon points="20,44 36,64 36,76 20,56" fill="#082f49" />
        <circle cx="52" cy="46" r="6" fill="#fde047" stroke="#b45309" strokeWidth="1" />
        <path d="M 64 32 L 64 74 L 60 70 L 56 74 L 56 34" fill="#ef4444" />
      </svg>
    );
  }

  // 7. Pensel Kayu Bertekstur (Pencil)
  if (key.includes('pensel')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 6px 4px rgba(0,0,0,0.4))">
        <ellipse cx="50" cy="85" rx="36" ry="6" fill="rgba(15,23,42,0.35)" />
        <polygon points="22,66 22,54 74,24 74,36" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
        <polygon points="22,60 22,54 74,24 74,30" fill="#fef08a" opacity="0.6" />
        {/* Sharpened Wood Tip & Graphite */}
        <polygon points="74,24 74,36 88,30" fill="#fed7aa" />
        <polygon points="84,28 74,30 88,30" fill="#1e293b" />
        {/* Eraser End & Ferrule */}
        <rect x="14" y="60" width="8" height="12" rx="2" fill="#f43f5e" transform="rotate(-30 18 66)" />
        <rect x="18" y="58" width="5" height="12" fill="#cbd5e1" transform="rotate(-30 20 64)" />
      </svg>
    );
  }

  // 8. Pemadam Pensel Bersih (Eraser)
  if (key.includes('pemadam')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 6px 4px rgba(0,0,0,0.4))">
        <ellipse cx="50" cy="84" rx="30" ry="6" fill="rgba(15,23,42,0.35)" />
        <polygon points="24,54 62,38 78,52 40,68" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        <polygon points="40,68 78,52 78,60 40,76" fill="#94a3b8" />
        <polygon points="24,54 40,68 40,76 24,62" fill="#64748b" />
        {/* Blue Sleeve Band */}
        <polygon points="32,50 52,42 60,49 40,57" fill="#0284c7" />
      </svg>
    );
  }

  // 9. Globe Dunia Prasekolah (Classroom Globe)
  if (key.includes('globe')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 8px 6px rgba(0,0,0,0.45))">
        <defs>
          <radialGradient id="globe_sphere" cx="35%" cy="30%" r="70%">
            <stop offset="0%" stopColor="#7dd3fc" />
            <stop offset="45%" stopColor="#0284c7" />
            <stop offset="85%" stopColor="#0369a1" />
            <stop offset="100%" stopColor="#0c4a6e" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="88" rx="28" ry="7" fill="rgba(15,23,42,0.45)" />
        {/* Metal Brass Stand Base */}
        <ellipse cx="50" cy="84" rx="20" ry="6" fill="#d97706" stroke="#78350f" strokeWidth="1.5" />
        <rect x="47" y="66" width="6" height="18" fill="#b45309" />
        {/* Semi-Meridian Arc */}
        <path d="M 50 20 A 32 32 0 0 1 50 74" fill="none" stroke="#d97706" strokeWidth="4.5" />
        {/* Globe Sphere */}
        <circle cx="50" cy="47" r="24" fill="url(#globe_sphere)" />
        {/* Continents Green Layer */}
        <path d="M 42 35 Q 50 32 54 40 Q 58 48 48 52 Q 40 46 42 35 Z" fill="#22c55e" />
        <path d="M 56 46 Q 64 42 66 50 Q 62 58 56 54 Z" fill="#16a34a" />
        {/* Specular Shine */}
        <ellipse cx="44" cy="38" rx="6" ry="12" fill="#ffffff" opacity="0.35" transform="rotate(-30 44 38)" />
      </svg>
    );
  }

  // 10. Jam Dinding Bulat Klasik (Wall Clock)
  if (key.includes('jam')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <ellipse cx="50" cy="88" rx="30" ry="7" fill="rgba(15,23,42,0.4)" />
        <circle cx="50" cy="50" r="38" fill="#b91c1c" stroke="#7f1d1d" strokeWidth="2" />
        <circle cx="50" cy="50" r="32" fill="#ffffff" stroke="#94a3b8" strokeWidth="2" />
        {Array.from({ length: 12 }).map((_, i) => (
          <circle
            key={i}
            cx="50"
            cy="24"
            r={i % 3 === 0 ? "2.5" : "1.2"}
            fill="#1e293b"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
        <line x1="50" y1="50" x2="50" y2="30" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
        <line x1="50" y1="50" x2="66" y2="50" stroke="#0f172a" strokeWidth="2" strokeLinecap="round" />
        <line x1="50" y1="50" x2="40" y2="62" stroke="#dc2626" strokeWidth="1" strokeLinecap="round" />
        <circle cx="50" cy="50" r="3" fill="#dc2626" />
      </svg>
    );
  }

  // 11. Baldi Pasir Pantai (Beach Bucket)
  if (key.includes('baldi')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <defs>
          <linearGradient id="bucket_red" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#f87171" />
            <stop offset="50%" stopColor="#ef4444" />
            <stop offset="100%" stopColor="#b91c1c" />
          </linearGradient>
        </defs>
        <ellipse cx="50" cy="88" rx="30" ry="7" fill="rgba(15,23,42,0.4)" />
        {/* Metal Handle */}
        <path d="M 28 42 C 28 18, 72 18, 72 42" fill="none" stroke="#64748b" strokeWidth="3" />
        {/* Bucket Body 3D */}
        <polygon points="26,42 74,42 66,82 34,82" fill="url(#bucket_red)" stroke="#991b1b" strokeWidth="1.5" />
        <ellipse cx="50" cy="42" rx="24" ry="6" fill="#fca5a5" />
        <ellipse cx="50" cy="42" rx="21" ry="5" fill="#fde047" />
        <ellipse cx="50" cy="82" rx="16" ry="4" fill="#991b1b" />
      </svg>
    );
  }

  // 12. Penyodok Pasir Kanak-Kanak (Toy Sand Shovel)
  if (key.includes('penyodok')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 6px 4px rgba(0,0,0,0.4))">
        <ellipse cx="50" cy="85" rx="32" ry="6" fill="rgba(15,23,42,0.35)" />
        {/* Handle Shaft */}
        <line x1="28" y1="28" x2="64" y2="64" stroke="#eab308" strokeWidth="6" strokeLinecap="round" />
        <circle cx="26" cy="26" r="6" fill="none" stroke="#ca8a04" strokeWidth="4" />
        {/* Scoop Spade 3D */}
        <path d="M 58 58 L 84 84 L 72 92 L 48 68 Z" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="1.5" />
      </svg>
    );
  }

  // 13. Bola Pantai Jalur Berwarna (Striped Beach Ball)
  if (key.includes('bola')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <ellipse cx="50" cy="86" rx="32" ry="8" fill="rgba(15,23,42,0.4)" />
        <circle cx="50" cy="50" r="34" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" />
        {/* Vibrant Beach Ball Panels */}
        <path d="M 50 16 A 34 34 0 0 0 24 64 Q 50 50 50 16 Z" fill="#ef4444" />
        <path d="M 50 16 A 34 34 0 0 1 76 64 Q 50 50 50 16 Z" fill="#3b82f6" />
        <path d="M 50 16 Q 50 50 50 84 Q 50 50 50 16 Z" fill="#eab308" stroke="#ca8a04" strokeWidth="1" />
        <ellipse cx="50" cy="22" r="6" ry="4" fill="#ffffff" stroke="#94a3b8" strokeWidth="1" />
        <ellipse cx="44" cy="38" rx="8" ry="14" fill="#ffffff" opacity="0.35" transform="rotate(-30 44 38)" />
      </svg>
    );
  }

  // 14. Topi Jerami Pantai (Straw Sun Hat)
  if (key.includes('topi')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <defs>
          <radialGradient id="straw_weave" cx="45%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fef08a" />
            <stop offset="50%" stopColor="#eab308" />
            <stop offset="100%" stopColor="#a16207" />
          </radialGradient>
        </defs>
        <ellipse cx="50" cy="84" rx="36" ry="8" fill="rgba(15,23,42,0.4)" />
        {/* Wide Brim */}
        <ellipse cx="50" cy="62" rx="42" ry="16" fill="url(#straw_weave)" stroke="#854d0e" strokeWidth="1.5" />
        {/* Crown Dome */}
        <path d="M 32 58 C 32 30, 68 30, 68 58 Z" fill="url(#straw_weave)" stroke="#854d0e" strokeWidth="1.5" />
        {/* Crimson Ribbon Band */}
        <ellipse cx="50" cy="58" rx="20" ry="7" fill="#dc2626" />
      </svg>
    );
  }

  // 15. Pelampung Penyelamat Merah Putih (Lifebuoy Ring)
  if (key.includes('pelampung')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <ellipse cx="50" cy="86" rx="34" ry="7" fill="rgba(15,23,42,0.4)" />
        <circle cx="50" cy="50" r="36" fill="#f8fafc" stroke="#e2e8f0" strokeWidth="1.5" />
        <circle cx="50" cy="50" r="18" fill="#38bdf8" opacity="0.3" stroke="#0284c7" strokeWidth="1" />
        {/* Red Quarter Stripes */}
        <path d="M 50 14 A 36 36 0 0 1 76 24 L 63 37 A 18 18 0 0 0 50 32 Z" fill="#ef4444" />
        <path d="M 86 50 A 36 36 0 0 1 76 76 L 63 63 A 18 18 0 0 0 68 50 Z" fill="#ef4444" />
        <path d="M 50 86 A 36 36 0 0 1 24 76 L 37 63 A 18 18 0 0 0 50 68 Z" fill="#ef4444" />
        <path d="M 14 50 A 36 36 0 0 1 24 24 L 37 37 A 18 18 0 0 0 32 50 Z" fill="#ef4444" />
      </svg>
    );
  }

  // 16. Pinggan Seramik Dapur (Ceramic Plate)
  if (key.includes('pinggan')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 6px 4px rgba(0,0,0,0.4))">
        <ellipse cx="50" cy="85" rx="38" ry="8" fill="rgba(15,23,42,0.35)" />
        <ellipse cx="50" cy="52" rx="42" ry="22" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="2" />
        <ellipse cx="50" cy="52" rx="30" ry="15" fill="#f1f5f9" stroke="#94a3b8" strokeWidth="1" />
        <path d="M 28 44 Q 50 36 72 44" stroke="#ffffff" strokeWidth="3" fill="none" opacity="0.7" />
      </svg>
    );
  }

  // 17. Cawan Seramik Bersih (Ceramic Coffee Cup)
  if (key.includes('cawan')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <ellipse cx="50" cy="88" rx="28" ry="7" fill="rgba(15,23,42,0.4)" />
        {/* Handle */}
        <path d="M 64 42 C 86 42, 86 68, 64 68" fill="none" stroke="#0284c7" strokeWidth="5" />
        {/* Cup Body */}
        <path d="M 28 36 L 34 76 C 34 82, 66 82, 66 76 L 72 36 Z" fill="#38bdf8" stroke="#0284c7" strokeWidth="1.5" />
        <ellipse cx="50" cy="36" rx="22" ry="6" fill="#0284c7" />
        <ellipse cx="50" cy="36" rx="19" ry="5" fill="#78350f" />
      </svg>
    );
  }

  // 18. Periuk Sup Masakan Bertutup (Cooking Pot)
  if (key.includes('periuk')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <ellipse cx="50" cy="88" rx="36" ry="8" fill="rgba(15,23,42,0.45)" />
        {/* Handles */}
        <rect x="14" y="46" width="10" height="6" rx="3" fill="#1e293b" />
        <rect x="76" y="46" width="10" height="6" rx="3" fill="#1e293b" />
        {/* Pot Body */}
        <rect x="22" y="44" width="56" height="38" rx="6" fill="#475569" stroke="#1e293b" strokeWidth="2" />
        {/* Lid */}
        <ellipse cx="50" cy="44" rx="30" ry="7" fill="#64748b" stroke="#334155" strokeWidth="2" />
        <circle cx="50" cy="34" r="5" fill="#d97706" />
      </svg>
    );
  }

  // 19. Papan Pemotong Kayu Dapur (Wooden Cutting Board)
  if (key.includes('papan')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <ellipse cx="50" cy="86" rx="35" ry="7" fill="rgba(15,23,42,0.4)" />
        <rect x="24" y="32" width="52" height="48" rx="8" fill="#d97706" stroke="#78350f" strokeWidth="3" transform="rotate(-15 50 56)" />
        <circle cx="36" cy="38" r="4" fill="#451a03" />
      </svg>
    );
  }

  // 20. Binokular Kembara (Binoculars)
  if (key.includes('binokular')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <ellipse cx="50" cy="86" rx="34" ry="7" fill="rgba(15,23,42,0.4)" />
        <rect x="25" y="32" width="20" height="42" rx="5" fill="#334155" stroke="#0f172a" strokeWidth="2" />
        <rect x="55" y="32" width="20" height="42" rx="5" fill="#334155" stroke="#0f172a" strokeWidth="2" />
        <rect x="42" y="44" width="16" height="8" rx="2" fill="#d97706" />
        <ellipse cx="35" cy="72" rx="8" ry="4" fill="#38bdf8" />
        <ellipse cx="65" cy="72" rx="8" ry="4" fill="#38bdf8" />
      </svg>
    );
  }

  // 21. Wisel Kembara Logam (Metal Whistle)
  if (key.includes('wisel')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 6px 4px rgba(0,0,0,0.4))">
        <ellipse cx="50" cy="85" rx="32" ry="6" fill="rgba(15,23,42,0.35)" />
        <circle cx="38" cy="52" r="16" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
        <rect x="38" y="42" width="36" height="14" rx="2" fill="#e2e8f0" stroke="#475569" strokeWidth="2" />
        <circle cx="24" cy="52" r="4" fill="none" stroke="#475569" strokeWidth="2" />
      </svg>
    );
  }

  // 22. Peta Kembara Kertas Parasyut (Rolled / Folded Adventure Map)
  if (key.includes('peta')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <ellipse cx="50" cy="86" rx="35" ry="7" fill="rgba(15,23,42,0.4)" />
        <polygon points="18,48 50,34 82,44 52,62" fill="#fffbeb" stroke="#d97706" strokeWidth="2" />
        <polygon points="52,62 82,44 82,54 52,72" fill="#fef3c7" />
        <polygon points="18,48 52,62 52,72 18,58" fill="#fde68a" />
        <path d="M 32 50 Q 42 44 54 52 T 72 48" stroke="#ef4444" strokeWidth="2" strokeDasharray="3,3" fill="none" />
      </svg>
    );
  }

  // 23. Botol Air Keluli Kembara (Adventure Canteen)
  if (key.includes('botol')) {
    return (
      <svg viewBox="0 0 100 100" className={className} filter="drop-shadow(0px 7px 5px rgba(0,0,0,0.45))">
        <ellipse cx="50" cy="88" rx="26" ry="7" fill="rgba(15,23,42,0.4)" />
        <rect x="36" y="24" width="28" height="58" rx="9" fill="#15803d" stroke="#14532d" strokeWidth="2" />
        <rect x="43" y="16" width="14" height="10" rx="3" fill="#cbd5e1" stroke="#475569" strokeWidth="1.5" />
        <ellipse cx="50" cy="48" rx="10" ry="18" fill="#22c55e" opacity="0.4" />
      </svg>
    );
  }

  // Fallback Professional 3D Solid Token
  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-md">
        <ellipse cx="50" cy="86" rx="32" ry="7" fill="rgba(15,23,42,0.4)" />
        <circle cx="50" cy="48" r="34" fill="#d97706" stroke="#78350f" strokeWidth="2" />
        <circle cx="50" cy="48" r="28" fill="#fef3c7" stroke="#b45309" strokeWidth="1.5" />
      </svg>
      <span className="absolute text-xs font-black text-amber-950 uppercase tracking-tight truncate max-w-[80%]">
        {name}
      </span>
    </div>
  );
};
