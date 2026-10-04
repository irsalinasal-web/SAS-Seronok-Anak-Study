import React from 'react';
import { HiddenTarget } from '../../data/hiddenScenesData';

interface CroppedObjectPreviewProps {
  imageSrc: string;
  item: HiddenTarget;
  aspectRatio: number;
  isFound: boolean;
  onClick?: () => void;
}

/**
 * Paparan potongan (crop) kecil 80x80 px daripada gambar latar sebenar.
 * Menepati arahan pengguna:
 * - Saiz lebih kurang 80x80 px
 * - Border putih nipis dan bucu bulat
 * - Tiada perubahan warna atau rupa objek (menggunakan gambar asal secara terus)
 * - Objek diletakkan tepat di tengah-tengah kotak crop
 * - 100% Senyap tanpa sebarang bunyi atau suara
 */
export const CroppedObjectPreview: React.FC<CroppedObjectPreviewProps> = ({
  imageSrc,
  item,
  aspectRatio,
  isFound,
  onClick,
}) => {
  // Saiz kotak crop = 80px
  const boxSize = 80;
  // Faktor zoom ~6.2x untuk membesarkan objek agar padat dan jelas di dalam kotak 80x80 px
  const zoom = 6.2;
  const cropW = boxSize * zoom;
  const cropH = cropW / (aspectRatio || 16 / 9);

  // Titik tengah kotak 80px ialah 40px
  // Letakkan koordinat objek (item.x%, item.y%) tepat di (40px, 40px)
  const leftPos = boxSize / 2 - (item.x / 100) * cropW;
  const topPos = boxSize / 2 - (item.y / 100) * cropH;

  return (
    <div
      onClick={onClick}
      className={`flex flex-col items-center select-none transition-all ${
        isFound ? 'opacity-40 scale-95 pointer-events-none' : 'hover:scale-105'
      }`}
    >
      {/* Kotak Potongan Crop Sebenar 80x80 px */}
      <div
        style={{ width: `${boxSize}px`, height: `${boxSize}px` }}
        className={`relative rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-900 transition-all ${
          isFound ? 'ring-2 ring-emerald-400' : 'shadow-lg'
        }`}
      >
        {/* Gambar Sebenar yang Dipotong Tepat Pada Koordinat Hotspot */}
        <img
          src={imageSrc}
          alt={item.name}
          className="select-none pointer-events-none"
          style={{
            position: 'absolute',
            width: `${cropW}px`,
            maxWidth: 'none',
            height: `${cropH}px`,
            left: `${leftPos}px`,
            top: `${topPos}px`,
            objectFit: 'fill',
          }}
        />

        {/* Lencana Selesai (✓) jika telah dijumpai */}
        {isFound && (
          <div className="absolute inset-0 bg-emerald-950/40 flex items-center justify-center">
            <div className="w-7 h-7 rounded-full bg-emerald-500 border-2 border-white text-white flex items-center justify-center font-black text-sm shadow-md">
              ✓
            </div>
          </div>
        )}
      </div>

      {/* Label Nama Objek di Bawah Kotak Crop */}
      <span
        className={`text-[11px] font-bold text-center mt-1.5 max-w-[84px] truncate leading-tight ${
          isFound ? 'line-through text-emerald-800' : 'text-amber-950'
        }`}
      >
        {item.name}
      </span>
    </div>
  );
};
