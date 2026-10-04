import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ALL_HIDDEN_SCENES, HiddenScene, HiddenTarget, SCENE_KEYS } from '../../data/hiddenScenesData';
import { imageStorage } from '../../services/imageStorageService';
import { audio } from '../../services/audioService';
import { CroppedObjectPreview } from './CroppedObjectPreview';

interface HiddenObjectModuleProps {
  onComplete: (stats?: { score: number; correct: number; total: number; maxCombo: number }) => void;
}

export const TersembunyiGame: React.FC<HiddenObjectModuleProps> = ({ onComplete }) => {
  // Susunan 5 gambar secara rawak daripada 10 babak (terus di-randomkan semasa mount)
  const [sessionSceneKeys, setSessionSceneKeys] = useState<string[]>(() => {
    const shuffled = [...SCENE_KEYS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled.slice(0, 5);
  });
  // Indeks gambar semasa dalam sesi (0 hingga 4)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);

  // Kamus gambar yang disimpan oleh pengguna (terus tersedia serta-merta pada 0ms tanpa flash dashboard)
  const [savedImages, setSavedImages] = useState<Record<string, string>>(() => imageStorage.getAllImagesSync());

  // Senarai ID sasaran yang telah dijumpai bagi gambar semasa
  const [foundIds, setFoundIds] = useState<Set<string>>(new Set());

  // Efek kilauan & visual jawapan betul / salah
  const [sparklePos, setSparklePos] = useState<{ x: number; y: number } | null>(null);
  const [wrongClickPos, setWrongClickPos] = useState<{ x: number; y: number } | null>(null);

  // Nisbah aspek gambar sebenar untuk pengiraan koordinat & potongan (crop) tepat
  const [imageAspectRatio, setImageAspectRatio] = useState<number>(16 / 9);

  // Ref kontena & elemen gambar
  const imageElementRef = useRef<HTMLImageElement>(null);

  // Muatkan semua gambar tersimpan daripada IndexedDB
  useEffect(() => {
    let mounted = true;
    imageStorage.getAllImages().then((imgs) => {
      if (mounted) {
        setSavedImages(imgs);
      }
    });
    return () => {
      mounted = false;
    };
  }, []);

  // Jana 5 gambar rawak baharu (randomized & shuffled)
  const startNewRandomSession = useCallback(() => {
    const shuffled = [...SCENE_KEYS];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    const picked5 = shuffled.slice(0, 5);
    setSessionSceneKeys(picked5);
    setCurrentImageIndex(0);
    setFoundIds(new Set());
    setSparklePos(null);
    setWrongClickPos(null);
  }, []);

  // Babak semasa
  const currentSceneKey = sessionSceneKeys[currentImageIndex] || '01_muzium_dinosaur';
  const currentScene: HiddenScene = ALL_HIDDEN_SCENES[currentSceneKey] || ALL_HIDDEN_SCENES['01_muzium_dinosaur'];

  // Sumber gambar aktif: Gambar muat naik pengguna atau visual asal berkualiti tinggi
  const activeImageSrc = savedImages[currentScene.id] || currentScene.defaultSvg;

  // Reset objek yang dijumpai apabila bertukar gambar
  useEffect(() => {
    setFoundIds(new Set());
    setSparklePos(null);
    setWrongClickPos(null);
  }, [currentImageIndex, currentSceneKey]);

  // Kemas kini saiz & nisbah aspek gambar apabila dimuatkan
  const handleImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth, naturalHeight } = e.currentTarget;
    if (naturalWidth && naturalHeight) {
      setImageAspectRatio(naturalWidth / naturalHeight);
    }
  };

  // Pengendali sentuhan hotspot pada gambar background
  const handleContainerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageElementRef.current) return;

    const rect = imageElementRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const clickY = e.clientY - rect.top;

    // Pastikan sentuhan di dalam kawasan gambar
    if (clickX < 0 || clickX > rect.width || clickY < 0 || clickY > rect.height) {
      return;
    }

    const pctX = (clickX / rect.width) * 100;
    const pctY = (clickY / rect.height) * 100;

    // Cari objek yang belum dijumpai
    const remaining = currentScene.targets.filter((t) => !foundIds.has(t.id));
    let hitTarget: HiddenTarget | null = null;

    for (const target of remaining) {
      const dx = pctX - target.x;
      const dy = (pctY - target.y) * (rect.height / rect.width);
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance <= target.radius) {
        hitTarget = target;
        break;
      }
    }

    if (hitTarget) {
      // Mainkan bunyi jawapan betul rasmi S.A.S
      audio.playSuccess();

      // Tunjukkan animasi kilauan kejayaan
      setSparklePos({ x: clickX, y: clickY });
      setTimeout(() => setSparklePos(null), 900);

      const nextFound = new Set(foundIds);
      nextFound.add(hitTarget.id);
      setFoundIds(nextFound);

      // Jika kesemua 5 objek pada gambar semasa telah dijumpai
      if (nextFound.size === 5) {
        // Bunyi bintang / pencapaian tamat gambar
        audio.playStar();

        setTimeout(() => {
          if (currentImageIndex < 4) {
            // Berpindah terus ke gambar seterusnya (Gambar 2, 3, 4, 5)
            setCurrentImageIndex((prev) => prev + 1);
          } else {
            // Selepas gambar ke-5 selesai, tamatkan sesi dengan markah & bintang yang selari dengan game S.A.S
            onComplete({
              score: 65, // Markah penuh piawai S.A.S (10 markah + kombo setiap gambar)
              correct: 5, // 5 gambar berjaya diselesaikan sepenuhnya (100%)
              total: 5,   // Jumlah soalan/gambar = 5
              maxCombo: 5 // Kombo penuh 5x
            });
          }
        }, 900);
      }
    } else {
      // Sentuhan tersasar: Bunyi cuba lagi lembut sedia ada S.A.S
      audio.playError();
      setWrongClickPos({ x: clickX, y: clickY });
      setTimeout(() => setWrongClickPos(null), 600);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center p-2 select-none">
      {/* S.A.S Status Bar: Gambar X daripada 5 & Kemajuan */}
      <div className="w-full flex items-center justify-between gap-2 mb-2 px-4 py-2 bg-white/95 rounded-2xl border-2 border-teal-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-xl">🔍</span>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-black text-teal-950 uppercase tracking-wide">
                {currentScene.title}
              </span>
              <span className="text-[10px] font-black bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full border border-teal-300">
                Gambar {currentImageIndex + 1} daripada 5
              </span>
            </div>
            <p className="text-[11px] font-semibold text-slate-500">
              Cari 5 objek tersembunyi pada gambar ini
            </p>
          </div>
        </div>

        {/* Kemajuan 5 Gambar & Butang Rawak Sesi Baharu */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            {[0, 1, 2, 3, 4].map((stepIdx) => {
              const isCompleted = stepIdx < currentImageIndex;
              const isCurrent = stepIdx === currentImageIndex;
              return (
                <div
                  key={stepIdx}
                  className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-black transition-all ${
                    isCompleted
                      ? 'bg-emerald-500 text-white'
                      : isCurrent
                      ? 'bg-teal-600 text-white ring-2 ring-teal-300 scale-110'
                      : 'bg-slate-200 text-slate-500'
                  }`}
                >
                  {isCompleted ? '✓' : stepIdx + 1}
                </div>
              );
            })}
          </div>

          <button
            onClick={startNewRandomSession}
            title="Mula Sesi Baru (5 gambar rawak berbeza)"
            className="py-1 px-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs rounded-xl border border-slate-300 transition-colors flex items-center gap-1"
          >
            <span>🔄</span>
            <span className="hidden sm:inline">Sesi Baru</span>
          </button>
        </div>
      </div>

      {/* RUANG GAMBAR LATAR HIDDEN OBJECT */}
      <div className="w-full flex flex-col items-center">
        <div
          onClick={handleContainerClick}
          className="w-full aspect-[16/9] max-w-[760px] rounded-3xl p-1 bg-slate-900 border-4 border-teal-400 relative overflow-hidden shadow-2xl flex items-center justify-center cursor-crosshair"
        >
          {/* Gambar Sebenar (Gambar muat naik atau visual asal tanpa sebarang ralat) */}
          <img
            ref={imageElementRef}
            src={activeImageSrc}
            alt={currentScene.title}
            onLoad={handleImageLoad}
            className="w-full h-full object-contain rounded-2xl select-none pointer-events-none"
          />

          {/* Efek Bintang & Kilauan Jawapan Betul */}
          {sparklePos && (
            <div
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-30 animate-bounce"
              style={{ left: `${sparklePos.x}px`, top: `${sparklePos.y}px` }}
            >
              <div className="flex items-center gap-1 bg-emerald-500 text-white px-3 py-1 rounded-full font-black text-xs shadow-lg border-2 border-white">
                <span>✨</span>
                <span>Betul!</span>
                <span>⭐</span>
              </div>
            </div>
          )}

          {/* Efek Sentuhan Salah (Riak merah lembut) */}
          {wrongClickPos && (
            <div
              className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: `${wrongClickPos.x}px`, top: `${wrongClickPos.y}px` }}
            >
              <div className="w-9 h-9 rounded-full border-2 border-red-500 bg-red-400/30 animate-ping" />
            </div>
          )}

          {/* Indikator Lencana Objek Dijumpai Terus Pada Hotspot Gambar */}
          {currentScene.targets
            .filter((t) => foundIds.has(t.id))
            .map((t) => (
              <div
                key={t.id}
                className="absolute pointer-events-none transform -translate-x-1/2 -translate-y-1/2 z-20 animate-scale-up"
                style={{ left: `${t.x}%`, top: `${t.y}%` }}
              >
                <div className="w-8 h-8 rounded-full border-2 border-emerald-400 bg-emerald-500/80 text-white flex items-center justify-center font-black text-sm shadow-lg">
                  ✓
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* DULANG SASARAN: POTONGAN (CROP) SEBENAR 80x80 PX DARI GAMBAR */}
      <div className="w-full max-w-[760px] mt-2.5 p-3 bg-white/95 rounded-2xl border-2 border-amber-300 shadow-sm flex flex-col items-center">
        <div className="w-full flex items-center justify-between px-1 mb-2.5">
          <div className="flex items-center gap-1.5 text-xs font-black text-amber-950">
            <span>🎯</span>
            <span>Objek Yang Perlu Dicari:</span>
          </div>
          <span className="text-xs font-black bg-amber-100 text-amber-900 px-2.5 py-0.5 rounded-full border border-amber-300">
            {foundIds.size} / 5 Dijumpai
          </span>
        </div>

        {/* 5 Kad Potongan Crop Sebenar (80x80 px, Border Putih Nipis, Bucu Bulat) */}
        <div className="w-full flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
          {currentScene.targets.map((item) => {
            const isFound = foundIds.has(item.id);
            return (
              <CroppedObjectPreview
                key={item.id}
                imageSrc={activeImageSrc}
                item={item}
                aspectRatio={imageAspectRatio}
                isFound={isFound}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
