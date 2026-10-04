import React from 'react';

interface ObjectIconProps {
  id: string;
  name: string;
  className?: string;
}

/**
 * Visual Icon Representation for Hidden Object targets.
 * Clean, recognizable SVG illustration for kids aged 5-6 years old.
 */
export const HiddenObjectIcon: React.FC<ObjectIconProps> = ({ id, name, className = 'w-10 h-10' }) => {
  const key = `${id}_${name}`.toLowerCase();

  // Dinosaur museum items
  if (key.includes('trex') || key.includes('rangka')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <path d="M12 28 C12 16, 28 8, 48 14 C56 18, 54 28, 44 32 C38 34, 30 38, 22 42 Z" fill="#fef3c7" stroke="#92400e" strokeWidth="2.5" />
        <circle cx="36" cy="20" r="3.5" fill="#451a03" />
        <path d="M26 36 L28 48 M34 34 L36 48 M42 32 L44 46" stroke="#92400e" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes('triceratops')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <ellipse cx="32" cy="38" rx="20" ry="14" fill="#fed7aa" stroke="#9a3412" strokeWidth="2.5" />
        <path d="M22 24 L16 12 M42 24 L48 12 M32 20 L32 8" stroke="#ca8a04" strokeWidth="3" strokeLinecap="round" />
        <circle cx="26" cy="36" r="3" fill="#431407" />
        <circle cx="38" cy="36" r="3" fill="#431407" />
      </svg>
    );
  }

  if (key.includes('sauropod') || key.includes('leher')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <path d="M16 52 C24 50, 28 44, 28 32 C28 20, 36 12, 46 12 C52 12, 54 18, 46 22 C40 25, 36 32, 36 52 Z" fill="#bbf7d0" stroke="#166534" strokeWidth="2.5" />
        <circle cx="44" cy="16" r="2.5" fill="#14532d" />
      </svg>
    );
  }

  if (key.includes('pterodactyl')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <polygon points="32,24 8,36 32,32 56,36" fill="#fbcfe8" stroke="#be185d" strokeWidth="2.5" />
        <polygon points="32,14 28,26 36,26" fill="#f472b6" />
      </svg>
    );
  }

  if (key.includes('ammonite') || key.includes('fosil')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <circle cx="32" cy="32" r="22" fill="#fed7aa" stroke="#9a3412" strokeWidth="2.5" />
        <path d="M32 14 A18 18 0 1 1 20 44 A12 12 0 1 1 32 26 A6 6 0 1 1 32 38" fill="none" stroke="#7c2d12" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes('kanta')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <circle cx="26" cy="26" r="16" fill="#e0f2fe" stroke="#0284c7" strokeWidth="3" />
        <line x1="38" y1="38" x2="54" y2="54" stroke="#78350f" strokeWidth="5" strokeLinecap="round" />
        <path d="M18 20 A10 10 0 0 1 32 18" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" fill="none" />
      </svg>
    );
  }

  if (key.includes('kristal') || key.includes('permata')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <polygon points="32,8 52,24 42,54 22,54 12,24" fill="#c084fc" stroke="#6b21a8" strokeWidth="2.5" />
        <line x1="12" y1="24" x2="52" y2="24" stroke="#6b21a8" strokeWidth="2" />
        <line x1="32" y1="8" x2="22" y2="54" stroke="#6b21a8" strokeWidth="1.5" />
        <line x1="32" y1="8" x2="42" y2="54" stroke="#6b21a8" strokeWidth="1.5" />
      </svg>
    );
  }

  if (key.includes('peta')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <polygon points="10,16 26,10 42,16 54,10 54,48 42,54 26,48 10,54" fill="#fef3c7" stroke="#b45309" strokeWidth="2.5" />
        <path d="M20 28 Q28 22 36 32 T50 26" fill="none" stroke="#dc2626" strokeWidth="2" strokeDasharray="3,3" />
      </svg>
    );
  }

  if (key.includes('buku')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <rect x="14" y="16" width="36" height="34" rx="4" fill="#3b82f6" stroke="#1d4ed8" strokeWidth="2.5" />
        <rect x="10" y="20" width="8" height="30" rx="2" fill="#1e40af" />
        <line x1="22" y1="26" x2="44" y2="26" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
        <line x1="22" y1="34" x2="38" y2="34" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (key.includes('binokular') || key.includes('teropong')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <rect x="12" y="20" width="16" height="30" rx="4" fill="#475569" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="36" y="20" width="16" height="30" rx="4" fill="#475569" stroke="#1e293b" strokeWidth="2.5" />
        <rect x="28" y="28" width="8" height="6" fill="#f59e0b" />
        <circle cx="20" cy="44" r="6" fill="#38bdf8" />
        <circle cx="44" cy="44" r="6" fill="#38bdf8" />
      </svg>
    );
  }

  if (key.includes('beg')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <rect x="16" y="20" width="32" height="36" rx="6" fill="#ea580c" stroke="#9a3412" strokeWidth="2.5" />
        <rect x="22" y="32" width="20" height="18" rx="3" fill="#fb923c" />
        <path d="M26 20 C26 12, 38 12, 38 20" fill="none" stroke="#7c2d12" strokeWidth="3" />
      </svg>
    );
  }

  // Space museum items
  if (key.includes('shuttle') || key.includes('roket')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <polygon points="32,6 20,44 44,44" fill="#f8fafc" stroke="#0f172a" strokeWidth="2.5" />
        <polygon points="20,38 8,50 20,48" fill="#ea580c" />
        <polygon points="44,38 56,50 44,48" fill="#ea580c" />
        <circle cx="32" cy="24" r="4" fill="#0284c7" />
      </svg>
    );
  }

  if (key.includes('angkasawan') || key.includes('helmet')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <circle cx="32" cy="30" r="18" fill="#f8fafc" stroke="#334155" strokeWidth="2.5" />
        <ellipse cx="32" cy="30" rx="12" ry="9" fill="#f59e0b" stroke="#b45309" strokeWidth="1.5" />
        <rect x="24" y="46" width="16" height="10" rx="2" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
      </svg>
    );
  }

  if (key.includes('lander') || key.includes('lunar')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <rect x="20" y="22" width="24" height="20" rx="3" fill="#eab308" stroke="#854d0e" strokeWidth="2" />
        <line x1="20" y1="42" x2="10" y2="56" stroke="#475569" strokeWidth="3" />
        <line x1="44" y1="42" x2="54" y2="56" stroke="#475569" strokeWidth="3" />
      </svg>
    );
  }

  if (key.includes('teleskop')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <line x1="14" y1="48" x2="48" y2="18" stroke="#1e293b" strokeWidth="6" strokeLinecap="round" />
        <line x1="28" y1="36" x2="16" y2="58" stroke="#64748b" strokeWidth="3" />
        <line x1="28" y1="36" x2="40" y2="58" stroke="#64748b" strokeWidth="3" />
      </svg>
    );
  }

  if (key.includes('rover')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <rect x="18" y="24" width="28" height="18" rx="3" fill="#cbd5e1" stroke="#334155" strokeWidth="2" />
        <circle cx="16" cy="46" r="6" fill="#1e293b" />
        <circle cx="32" cy="46" r="6" fill="#1e293b" />
        <circle cx="48" cy="46" r="6" fill="#1e293b" />
        <line x1="38" y1="24" x2="44" y2="14" stroke="#334155" strokeWidth="2" />
      </svg>
    );
  }

  if (key.includes('zuhal') || key.includes('saturn') || key.includes('planet')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <ellipse cx="32" cy="32" rx="26" ry="8" fill="none" stroke="#f59e0b" strokeWidth="3" transform="rotate(-20 32 32)" />
        <circle cx="32" cy="32" r="14" fill="#fbbf24" stroke="#d97706" strokeWidth="2" />
      </svg>
    );
  }

  if (key.includes('marikh')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <circle cx="32" cy="32" r="18" fill="#ef4444" stroke="#991b1b" strokeWidth="2.5" />
        <circle cx="26" cy="24" r="3" fill="#b91c1c" />
        <circle cx="38" cy="36" r="4" fill="#b91c1c" />
      </svg>
    );
  }

  if (key.includes('botol')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <rect x="22" y="20" width="20" height="36" rx="5" fill="#0284c7" stroke="#0369a1" strokeWidth="2.5" />
        <rect x="27" y="12" width="10" height="8" rx="2" fill="#cbd5e1" stroke="#475569" strokeWidth="2" />
      </svg>
    );
  }

  if (key.includes('skrin') || key.includes('meja')) {
    return (
      <svg viewBox="0 0 64 64" className={className} filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))">
        <rect x="12" y="16" width="40" height="28" rx="3" fill="#0f172a" stroke="#38bdf8" strokeWidth="2.5" />
        <line x1="32" y1="44" x2="32" y2="54" stroke="#64748b" strokeWidth="4" />
        <line x1="22" y1="54" x2="42" y2="54" stroke="#64748b" strokeWidth="4" strokeLinecap="round" />
        <circle cx="32" cy="30" r="6" fill="#facc15" />
      </svg>
    );
  }

  // Generic Fallback Icon Token
  return (
    <div className={`relative flex items-center justify-center rounded-2xl bg-amber-100 border-2 border-amber-400 shadow-md ${className}`}>
      <span className="text-xl">🔍</span>
    </div>
  );
};
