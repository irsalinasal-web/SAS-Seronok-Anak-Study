import React from 'react';

interface SceneBackgroundProps {
  theme: 'perkhemahan' | 'perpustakaan' | 'pantai' | 'dapur';
}

export const SceneBackgroundIllustration: React.FC<SceneBackgroundProps> = ({ theme }) => {
  switch (theme) {
    // 1. 🏕️ Tapak Perkhemahan Rimba (Campsite) - Volumetric God-Rays, Canvas Tent, Mossy Rocks, Campfire & Stump
    case 'perkhemahan':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full absolute inset-0 pointer-events-none select-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="forest_dawn_sky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="50%" stopColor="#38bdf8" />
              <stop offset="85%" stopColor="#fef08a" />
              <stop offset="100%" stopColor="#fed7aa" />
            </linearGradient>
            <linearGradient id="forest_floor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#86efac" />
              <stop offset="40%" stopColor="#22c55e" />
              <stop offset="80%" stopColor="#15803d" />
              <stop offset="100%" stopColor="#14532d" />
            </linearGradient>
            <linearGradient id="tent_canvas" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#b45309" />
            </linearGradient>
            <radialGradient id="sun_glow_rays" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="45%" stopColor="#fef08a" stopOpacity="0.8" />
              <stop offset="80%" stopColor="#f59e0b" stopOpacity="0.3" />
              <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
            </radialGradient>
          </defs>

          {/* Deep Forest Dawn Sky */}
          <rect width="800" height="600" fill="url(#forest_dawn_sky)" />
          {/* Volumetric Sun & Morning Glow */}
          <circle cx="140" cy="85" r="95" fill="url(#sun_glow_rays)" className="animate-pulse" />
          <polygon points="140,85 280,600 480,600" fill="#ffffff" opacity="0.14" />
          <polygon points="140,85 520,600 750,600" fill="#ffffff" opacity="0.09" />

          {/* Mountain Silhouettes in Morning Mist */}
          <path d="M 0 240 Q 240 160 480 220 T 800 200 L 800 600 L 0 600 Z" fill="#1e3a8a" opacity="0.45" />
          <rect y="220" width="800" height="30" fill="#e0f2fe" opacity="0.3" filter="blur(4px)" />

          {/* Isometric Forest Floor Layers */}
          <path d="M 0 310 Q 320 230 640 300 T 800 280 L 800 600 L 0 600 Z" fill="#4ade80" />
          <path d="M 0 380 Q 250 320 500 370 T 800 350 L 800 600 L 0 600 Z" fill="url(#forest_floor)" />

          {/* Campsite Dirt Ground Clearing */}
          <path d="M 120 600 Q 350 440 500 600 Z" fill="#b45309" opacity="0.55" stroke="#78350f" strokeWidth="2.5" />

          {/* Vintage Canvas Explorer Tent (Right Side) */}
          {/* Tent Ground Shadow */}
          <ellipse cx="680" cy="540" rx="90" ry="24" fill="rgba(15,23,42,0.45)" />
          {/* A-Frame Tent Body */}
          <polygon points="680,240 560,520 800,520" fill="url(#tent_canvas)" stroke="#92400e" strokeWidth="3" />
          <polygon points="680,240 680,520 800,520" fill="#d97706" opacity="0.8" />
          {/* Tent Door Flap Inner Shadow */}
          <polygon points="680,310 610,520 680,520" fill="#451a03" />
          {/* Tent Poles & Guy-Ropes */}
          <line x1="680" y1="240" x2="680" y2="520" stroke="#78350f" strokeWidth="5" />
          <line x1="680" y1="240" x2="520" y2="530" stroke="#fef08a" strokeWidth="2" opacity="0.8" />

          {/* Campfire Pit with Realistic River Stones (Middle Ground) */}
          <ellipse cx="540" cy="530" rx="44" ry="16" fill="rgba(15,23,42,0.45)" />
          {Array.from({ length: 8 }).map((_, idx) => (
            <ellipse
              key={idx}
              cx={540 + Math.cos((idx * Math.PI) / 4) * 32}
              cy={530 + Math.sin((idx * Math.PI) / 4) * 12}
              rx="9"
              ry="6"
              fill="#64748b"
              stroke="#334155"
              strokeWidth="1.5"
            />
          ))}
          <line x1="520" y1="524" x2="560" y2="536" stroke="#451a03" strokeWidth="6" strokeLinecap="round" />
          <line x1="522" y1="536" x2="558" y2="524" stroke="#451a03" strokeWidth="6" strokeLinecap="round" />
          {/* Warm Amber Embers Glow */}
          <ellipse cx="540" cy="528" rx="14" ry="6" fill="#f59e0b" opacity="0.75" className="animate-pulse" />

          {/* Large Mossy Log Tree Stump (Tunggul Kayu - Left Ground for Compass) */}
          <ellipse cx="260" cy="510" rx="42" ry="16" fill="rgba(15,23,42,0.45)" />
          <path d="M 220 505 L 220 460 Q 260 450 300 460 L 300 505 Q 260 520 220 505 Z" fill="#78350f" stroke="#451a03" strokeWidth="2.5" />
          <ellipse cx="260" cy="460" rx="40" ry="14" fill="#a16207" stroke="#78350f" strokeWidth="2" />
          {/* Concentric Tree Rings */}
          <ellipse cx="260" cy="460" rx="30" ry="10" fill="none" stroke="#78350f" strokeWidth="1.5" />
          <ellipse cx="260" cy="460" rx="18" ry="6" fill="none" stroke="#78350f" strokeWidth="1.5" />
          <ellipse cx="260" cy="460" rx="6" ry="2" fill="none" stroke="#78350f" strokeWidth="1.5" />
          {/* Moss Patch on Stump */}
          <path d="M 224 466 Q 236 458 244 468 Q 234 472 224 466 Z" fill="#22c55e" opacity="0.85" />

          {/* Scented Tall Pine Trees on Borders */}
          <g className="animate-gentle-sway">
            {/* Pine Left */}
            <rect x="70" y="340" width="22" height="150" fill="#451a03" rx="4" />
            <polygon points="81,140 10,260 152,260" fill="#14532d" />
            <polygon points="81,210 5,330 157,330" fill="#166534" />
            <polygon points="81,280 0,400 162,400" fill="#15803d" />
          </g>
        </svg>
      );

    // 2. 📚 Perpustakaan Kanak-Kanak (Library) - Warm Mahogany Bookshelves, Reading Desk, Globe Stand & Parquet
    case 'perpustakaan':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full absolute inset-0 pointer-events-none select-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="lib_wall_wallpaper" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#fef3c7" />
              <stop offset="60%" stopColor="#fde68a" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <linearGradient id="lib_wood_floor" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#b45309" />
              <stop offset="60%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
            <linearGradient id="mahogany_shelf" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#78350f" />
              <stop offset="50%" stopColor="#92400e" />
              <stop offset="100%" stopColor="#451a03" />
            </linearGradient>
          </defs>

          {/* Antique Wallpaper & Parquet Flooring */}
          <rect width="800" height="410" fill="url(#lib_wall_wallpaper)" />
          <rect y="410" width="800" height="190" fill="url(#lib_wood_floor)" />
          <line x1="160" y1="410" x2="60" y2="600" stroke="#451a03" strokeWidth="2" />
          <line x1="360" y1="410" x2="260" y2="600" stroke="#451a03" strokeWidth="2" />
          <line x1="560" y1="410" x2="480" y2="600" stroke="#451a03" strokeWidth="2" />
          <line x1="720" y1="410" x2="680" y2="600" stroke="#451a03" strokeWidth="2" />

          {/* Massive Mahogany Bookshelf on the Right */}
          <rect x="580" y="80" width="200" height="340" fill="url(#mahogany_shelf)" stroke="#451a03" strokeWidth="4" />
          {/* Shelves Dividers */}
          <rect x="585" y="150" width="190" height="12" fill="#451a03" />
          <rect x="585" y="230" width="190" height="12" fill="#451a03" />
          <rect x="585" y="310" width="190" height="12" fill="#451a03" />
          <rect x="585" y="390" width="190" height="12" fill="#451a03" />
          {/* Colorful Book Spines in Shelves */}
          {Array.from({ length: 9 }).map((_, idx) => (
            <rect
              key={`b1_${idx}`}
              x={595 + idx * 19}
              y={166}
              width={16}
              height={60}
              rx={2}
              fill={idx % 3 === 0 ? '#ef4444' : idx % 3 === 1 ? '#0284c7' : '#15803d'}
            />
          ))}
          {Array.from({ length: 9 }).map((_, idx) => (
            <rect
              key={`b2_${idx}`}
              x={595 + idx * 19}
              y={246}
              width={16}
              height={60}
              rx={2}
              fill={idx % 3 === 0 ? '#eab308' : idx % 3 === 1 ? '#8b5cf6' : '#ea580c'}
            />
          ))}

          {/* Large Window on Left revealing Sunlit Garden */}
          <rect x="40" y="60" width="160" height="220" rx="8" fill="#38bdf8" stroke="#78350f" strokeWidth="6" />
          <line x1="120" y1="60" x2="120" y2="280" stroke="#78350f" strokeWidth="4" />
          <line x1="40" y1="160" x2="200" y2="160" stroke="#78350f" strokeWidth="4" />
          {/* Sunlight Pool from window */}
          <polygon points="40,280 200,280 340,550 120,550" fill="#fef08a" opacity="0.25" />

          {/* Solid Wood Reading Study Desk in Center-Left */}
          <ellipse cx="380" cy="520" rx="140" ry="24" fill="rgba(15,23,42,0.4)" />
          <rect x="250" y="380" width="260" height="48" rx="6" fill="#a16207" stroke="#78350f" strokeWidth="3" />
          <rect x="270" y="428" width="16" height="90" fill="#78350f" />
          <rect x="474" y="428" width="16" height="90" fill="#78350f" />
          <line x1="270" y1="468" x2="490" y2="468" stroke="#451a03" strokeWidth="5" />
        </svg>
      );

    // 3. 🏖️ Pantai Peranginan Ceria (Beach) - Golden Shore, Turquoise Ocean, Foam Waves, Beach Umbrella & Palm
    case 'pantai':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full absolute inset-0 pointer-events-none select-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="beach_sky_warm" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" />
              <stop offset="45%" stopColor="#38bdf8" />
              <stop offset="85%" stopColor="#7dd3fc" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="sea_turquoise" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0369a1" />
              <stop offset="50%" stopColor="#0891b2" />
              <stop offset="100%" stopColor="#06b6d4" />
            </linearGradient>
            <linearGradient id="sand_warm_shore" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" />
              <stop offset="45%" stopColor="#fde047" />
              <stop offset="85%" stopColor="#eab308" />
              <stop offset="100%" stopColor="#ca8a04" />
            </linearGradient>
          </defs>

          {/* Tropical Sky */}
          <rect width="800" height="600" fill="url(#beach_sky_warm)" />
          <circle cx="700" cy="85" r="55" fill="#fef08a" />
          <circle cx="700" cy="85" r="80" fill="#fde047" opacity="0.3" filter="blur(6px)" />

          {/* Distant Palm Island */}
          <path d="M 40 230 Q 130 185 220 230 Z" fill="#15803d" opacity="0.8" />
          <rect y="225" width="400" height="15" fill="#bae6fd" opacity="0.4" filter="blur(3px)" />

          {/* Ocean Waters with Layered Foam */}
          <rect y="230" width="800" height="180" fill="url(#sea_turquoise)" />
          <g className="animate-wave-sway">
            <path d="M 0 310 Q 120 295 240 310 T 480 310 T 720 310 T 800 310" stroke="#ffffff" strokeWidth="4" fill="none" opacity="0.75" />
            <path d="M 0 365 Q 110 345 220 365 T 440 365 T 660 365 T 800 365" stroke="#ffffff" strokeWidth="7" fill="none" opacity="0.9" />
          </g>

          {/* Golden Warm Shore */}
          <path d="M 0 385 Q 200 360 400 395 T 800 375 L 800 600 L 0 600 Z" fill="url(#sand_warm_shore)" />

          {/* Striped Beach Towel / Mat on Sand (Right Shore) */}
          <polygon points="560,490 680,490 710,545 590,545" fill="#38bdf8" />
          <polygon points="575,495 665,495 692,540 602,540" fill="#f43f5e" />

          {/* Sandcastle on Left Shore */}
          <ellipse cx="180" cy="540" rx="35" ry="12" fill="rgba(15,23,42,0.35)" />
          <polygon points="150,540 210,540 200,490 160,490" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          <rect x="170" y="470" width="20" height="24" fill="#eab308" stroke="#ca8a04" strokeWidth="1.5" />
          <polygon points="170,470 190,470 180,450" fill="#f43f5e" />

          {/* Palm Tree Trunk & Fronds Right */}
          <g className="animate-gentle-sway">
            <ellipse cx="740" cy="570" rx="40" ry="14" fill="rgba(15,23,42,0.4)" />
            <path d="M 750 580 Q 800 410 750 240" stroke="#78350f" strokeWidth="24" fill="none" strokeLinecap="round" />
            <path d="M 750 580 Q 800 410 750 240" stroke="#92400e" strokeWidth="16" fill="none" strokeLinecap="round" />
            <path d="M 750 240 Q 640 200 570 270" stroke="#15803d" strokeWidth="13" fill="none" strokeLinecap="round" />
            <path d="M 750 240 Q 680 150 600 150" stroke="#16a34a" strokeWidth="13" fill="none" strokeLinecap="round" />
            <path d="M 750 240 Q 780 130 840 150" stroke="#15803d" strokeWidth="13" fill="none" strokeLinecap="round" />
          </g>
        </svg>
      );

    // 4. 🍳 Dapur Idaman Ceria (Kitchen) - Subway Tiles, Granite Countertops, Cooking Stove, Hanging Utensils
    case 'dapur':
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full absolute inset-0 pointer-events-none select-none" preserveAspectRatio="none">
          <defs>
            <linearGradient id="kitchen_tile_wall" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#f8fafc" />
              <stop offset="60%" stopColor="#e2e8f0" />
              <stop offset="100%" stopColor="#cbd5e1" />
            </linearGradient>
            <linearGradient id="granite_counter" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#475569" />
              <stop offset="50%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
            <linearGradient id="cabinet_wood" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#d97706" />
              <stop offset="60%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#78350f" />
            </linearGradient>
          </defs>

          {/* Kitchen Subway Tiled Wall */}
          <rect width="800" height="360" fill="url(#kitchen_tile_wall)" />
          {/* Subtle Tile Grid Lines */}
          {Array.from({ length: 6 }).map((_, r) => (
            <line key={`th_${r}`} x1="0" y1={r * 60} x2="800" y2={r * 60} stroke="#94a3b8" strokeWidth="1" opacity="0.6" />
          ))}
          {Array.from({ length: 8 }).map((_, c) => (
            <line key={`tv_${c}`} x1={c * 100} y1="0" x2={c * 100} y2="360" stroke="#94a3b8" strokeWidth="1" opacity="0.6" />
          ))}

          {/* Stainless Steel Hanging Utensil Rail */}
          <rect x="180" y="80" width="440" height="8" rx="4" fill="#94a3b8" stroke="#475569" strokeWidth="1.5" />
          <circle cx="210" cy="84" r="6" fill="#475569" />
          <circle cx="590" cy="84" r="6" fill="#475569" />

          {/* Solid Granite Countertop Surface (Isometric Perspective) */}
          <polygon points="0,340 800,340 800,430 0,430" fill="url(#granite_counter)" stroke="#0f172a" strokeWidth="3" />
          {/* Beveled Edge Highlight */}
          <line x1="0" y1="340" x2="800" y2="340" stroke="#94a3b8" strokeWidth="2.5" />

          {/* Lower Kitchen Wooden Cabinets with Brass Knobs */}
          <rect y="430" width="800" height="170" fill="url(#cabinet_wood)" />
          {/* Cabinet Door Paneling */}
          <rect x="40" y="450" width="180" height="130" rx="4" fill="#a16207" stroke="#78350f" strokeWidth="2" />
          <circle cx="205" cy="510" r="5" fill="#facc15" stroke="#713f12" strokeWidth="1" />

          <rect x="260" y="450" width="180" height="130" rx="4" fill="#a16207" stroke="#78350f" strokeWidth="2" />
          <circle cx="425" cy="510" r="5" fill="#facc15" stroke="#713f12" strokeWidth="1" />

          <rect x="480" y="450" width="180" height="130" rx="4" fill="#a16207" stroke="#78350f" strokeWidth="2" />
          <circle cx="645" cy="510" r="5" fill="#facc15" stroke="#713f12" strokeWidth="1" />

          {/* Built-in Modern Induction Cooking Hob (Right Counter) */}
          <polygon points="520,355 760,355 745,415 505,415" fill="#0f172a" stroke="#475569" strokeWidth="2" />
          <ellipse cx="580" cy="385" rx="28" ry="14" fill="none" stroke="#ef4444" strokeWidth="3" opacity="0.8" className="animate-pulse" />
          <ellipse cx="680" cy="385" rx="22" ry="11" fill="none" stroke="#cbd5e1" strokeWidth="2" />
        </svg>
      );

    default:
      return (
        <svg viewBox="0 0 800 600" className="w-full h-full absolute inset-0 pointer-events-none select-none" preserveAspectRatio="none">
          <rect width="800" height="600" fill="#38bdf8" />
          <path d="M 0 350 Q 400 250 800 350 L 800 600 L 0 600 Z" fill="#22c55e" />
        </svg>
      );
  }
};
