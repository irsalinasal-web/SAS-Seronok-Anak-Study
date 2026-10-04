import React, { useState, useEffect, useRef } from 'react';
import { KENDERAAN_QUESTIONS_DATA, KenderaanQuestion, VehicleOption } from '../../data/kenderaanData';
import { audio } from '../../services/audioService';

interface KenaliKenderaanGameProps {
  onComplete: () => void;
}

export const KenaliKenderaanGame: React.FC<KenaliKenderaanGameProps> = ({ onComplete }) => {
  const [questionIdx, setQuestionIdx] = useState(0);
  const currentQ: KenderaanQuestion = KENDERAAN_QUESTIONS_DATA[questionIdx % KENDERAAN_QUESTIONS_DATA.length];

  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [placedVehicle, setPlacedVehicle] = useState<VehicleOption | null>(null);
  const [isAnsweredCorrect, setIsAnsweredCorrect] = useState(false);
  const [wrongAttemptId, setWrongAttemptId] = useState<string | null>(null);

  // Unified Dragging State (Mouse, Touch, Stylus)
  const [activeDragOption, setActiveDragOption] = useState<VehicleOption | null>(null);
  const [dragCursorPos, setDragCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isHoveredOnTarget, setIsHoveredOnTarget] = useState(false);

  const questionTargetBoxRef = useRef<HTMLDivElement>(null);

  // Reset when question changes
  useEffect(() => {
    setSelectedOptionId(null);
    setPlacedVehicle(null);
    setIsAnsweredCorrect(false);
    setWrongAttemptId(null);
    setActiveDragOption(null);
    setIsHoveredOnTarget(false);
  }, [currentQ.id]);

  // Handle answering logic
  const handleSelectOption = (option: VehicleOption) => {
    if (isAnsweredCorrect) return;

    if (option.id === currentQ.correctVehicleId) {
      // BETUL!
      audio.playSuccess();
      setPlacedVehicle(option);
      setIsAnsweredCorrect(true);
      setWrongAttemptId(null);
      setSelectedOptionId(option.id);

      // Cartoon speech utterance
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        try {
          window.speechSynthesis.cancel();
          const utter = new SpeechSynthesisUtterance(`Hebat! ${option.name}!`);
          utter.pitch = 1.5;
          utter.rate = 1.0;
          const voices = window.speechSynthesis.getVoices();
          const msVoice = voices.find(v => v.lang.startsWith('ms') || v.lang.startsWith('id'));
          if (msVoice) utter.voice = msVoice;
          window.speechSynthesis.speak(utter);
        } catch {
          // ignore
        }
      }
    } else {
      // SALAH
      audio.playError();
      setWrongAttemptId(option.id);
      setSelectedOptionId(option.id);
      setTimeout(() => {
        setWrongAttemptId(null);
      }, 1000);
    }
  };

  // Check if position is over the Question Target Box
  const isPosOverTarget = (clientX: number, clientY: number): boolean => {
    if (!questionTargetBoxRef.current) return false;
    const rect = questionTargetBoxRef.current.getBoundingClientRect();
    const margin = 25; // toddler tolerance
    return (
      clientX >= rect.left - margin &&
      clientX <= rect.right + margin &&
      clientY >= rect.top - margin &&
      clientY <= rect.bottom + margin
    );
  };

  // Global Pointer Events for Smooth Touch & Mouse Dragging
  useEffect(() => {
    if (!activeDragOption) return;

    const handlePointerMove = (e: PointerEvent) => {
      setDragCursorPos({ x: e.clientX, y: e.clientY });
      setIsHoveredOnTarget(isPosOverTarget(e.clientX, e.clientY));
    };

    const handlePointerUp = (e: PointerEvent) => {
      if (isPosOverTarget(e.clientX, e.clientY)) {
        handleSelectOption(activeDragOption);
      } else {
        audio.playError();
      }
      setActiveDragOption(null);
      setIsHoveredOnTarget(false);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [activeDragOption, currentQ]);

  // Pointer drag start on vehicle card
  const handleStartPointerDrag = (option: VehicleOption, e: React.PointerEvent) => {
    if (e.button !== 0 || isAnsweredCorrect) return;
    e.preventDefault();
    audio.playPop();
    setActiveDragOption(option);
    setSelectedOptionId(option.id);
    setDragCursorPos({ x: e.clientX, y: e.clientY });
  };

  // HTML5 Drag & Drop handlers (fallback)
  const handleHtml5DragStart = (e: React.DragEvent, option: VehicleOption) => {
    if (isAnsweredCorrect) return;
    audio.playPop();
    setActiveDragOption(option);
    e.dataTransfer.setData('text/plain', option.id);
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleHtml5DragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setIsHoveredOnTarget(true);
  };

  const handleHtml5DragLeave = () => {
    setIsHoveredOnTarget(false);
  };

  const handleHtml5Drop = (e: React.DragEvent) => {
    e.preventDefault();
    const optId = e.dataTransfer.getData('text/plain') || activeDragOption?.id;
    const found = currentQ.options.find(o => o.id === optId);
    if (found) {
      handleSelectOption(found);
    }
    setActiveDragOption(null);
    setIsHoveredOnTarget(false);
  };

  // Navigation
  const handleNextQuestion = () => {
    audio.playPop();
    setQuestionIdx(prev => prev + 1);
  };

  const handlePrevQuestion = () => {
    audio.playPop();
    setQuestionIdx(prev => (prev > 0 ? prev - 1 : KENDERAAN_QUESTIONS_DATA.length - 1));
  };

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center p-2 select-none relative">
      {/* FLOATING DRAGGED VEHICLE GHOST */}
      {activeDragOption && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 bg-white/95 rounded-3xl p-4 shadow-2xl border-4 border-amber-400 scale-125 flex flex-col items-center justify-center animate-wiggle ring-4 ring-amber-300"
          style={{ left: dragCursorPos.x, top: dragCursorPos.y }}
        >
          <span className="text-5xl leading-none">{activeDragOption.icon}</span>
          <span className="text-xs font-black text-amber-950 mt-1">{activeDragOption.name}</span>
        </div>
      )}

      {/* Top Header: Navigation & Status */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 bg-white/95 px-4 py-2 rounded-2xl border-2 border-indigo-200 shadow-sm">
        <button
          onClick={handlePrevQuestion}
          className="py-1 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs rounded-xl border border-indigo-200 transition-colors"
          title="Soalan Sebelumnya"
        >
          ◀ Sebelumnya
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className={`text-[10px] font-black px-2 py-0.5 rounded-full border ${currentQ.badgeColor}`}>
              {currentQ.situationBadge}
            </span>
            <span className="text-xs font-black text-slate-800">
              Soalan {questionIdx + 1} / {KENDERAAN_QUESTIONS_DATA.length}
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-500">
            {currentQ.title}
          </span>
        </div>

        <button
          onClick={handleNextQuestion}
          className="py-1 px-3 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs rounded-xl border border-indigo-200 transition-colors"
          title="Soalan Seterusnya"
        >
          Seterusnya ▶
        </button>
      </div>

      {/* KOTAK SOALAN DI TENGAH: HANYA GAMBAR & RUANG JAWAPAN */}
      <div className="w-full flex flex-col items-center">
        {/* SATU KOTAK SOALAN UTAMA DI TENGAH */}
        <div
          ref={questionTargetBoxRef}
          onDragOver={handleHtml5DragOver}
          onDragLeave={handleHtml5DragLeave}
          onDrop={handleHtml5Drop}
          className={`w-full max-w-[320px] md:max-w-[350px] aspect-[4/5] rounded-3xl p-4 border-4 relative transition-all overflow-hidden flex flex-col items-center justify-between bg-gradient-to-b ${currentQ.themeBg} ${
            isAnsweredCorrect
              ? 'border-emerald-500 ring-8 ring-emerald-200 shadow-2xl scale-102 bg-emerald-50/95'
              : isHoveredOnTarget
              ? 'border-amber-500 ring-6 ring-amber-300 shadow-2xl scale-102 bg-amber-50/90 animate-pulse'
              : 'border-slate-300 shadow-xl'
          }`}
        >
          {/* 1. GAMBAR BESAR SITUASI SOALAN */}
          <div className="w-full flex-1 flex flex-col items-center justify-center select-none py-2">
            <div className="text-7xl md:text-8xl drop-shadow-md transition-transform hover:scale-105 filter">
              {currentQ.sceneEmoji}
            </div>
          </div>

          {/* 2. RUANG JAWAPAN YANG PERLU DIMASUKKAN SAHAJA */}
          <div
            className={`w-full py-3 px-3 rounded-2xl border-3 flex flex-col items-center justify-center transition-all select-none ${
              isAnsweredCorrect
                ? 'bg-white border-emerald-500 ring-4 ring-emerald-200 shadow-md animate-scale-up'
                : isHoveredOnTarget
                ? 'bg-amber-100 border-dashed border-amber-500 ring-4 ring-amber-300 shadow-lg scale-105'
                : 'bg-white/70 backdrop-blur-xs border-dashed border-indigo-400 hover:bg-white/90'
            }`}
          >
            {placedVehicle ? (
              // Kenderaan jawapan yang telah dimasukkan
              <div className="flex items-center justify-center gap-2">
                <span className="text-4xl md:text-5xl leading-none drop-shadow-xs animate-bounce">
                  {placedVehicle.icon}
                </span>
                <div className="flex flex-col items-start">
                  <span className="text-sm md:text-base font-black text-emerald-950">
                    {placedVehicle.name}
                  </span>
                  <span className="text-[10px] font-black text-emerald-700 bg-emerald-100 px-2 py-0.2 rounded-full">
                    Jawapan Betul ✓
                  </span>
                </div>
              </div>
            ) : (
              // Petak sasaran bayang samar kenderaan untuk dimasukkan
              <div className="flex flex-col items-center justify-center text-center">
                <div className="flex items-center gap-2">
                  <span className="text-3xl opacity-30 leading-none">
                    {currentQ.correctVehicleIcon}
                  </span>
                  <span className="text-xl opacity-40 leading-none">❓</span>
                </div>
                <span className="text-xs font-black text-indigo-900 mt-1">
                  {isHoveredOnTarget ? 'Lepaskan Di Sini!' : 'Masukkan Kenderaan Di Sini'}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* KOTAK JAWAPAN DI BAWAH: PILIHAN KAD KENDERAAN BERGAMBAR BESAR */}
      <div className="w-full mt-4 bg-white/95 backdrop-blur-sm p-4 rounded-3xl border-3 border-indigo-300 shadow-md">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-black text-indigo-900 uppercase tracking-wide flex items-center gap-1.5">
            <span>🚗</span>
            <span>Kotak Jawapan: Pilih Kenderaan Yang Betul</span>
          </span>
          <span className="text-[11px] font-bold text-indigo-700 bg-indigo-100 px-2 py-0.5 rounded-full">
            Tarik atau Tekan ✋
          </span>
        </div>

        {isAnsweredCorrect ? (
          // Butang Teruskan ke Soalan Seterusnya
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <p className="text-sm md:text-base font-black text-emerald-700 mb-2">
              🌟 Tahniah! Jawapan anda sangat tepat!
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleNextQuestion}
                className="py-2.5 px-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all btn-3d"
              >
                Soalan Seterusnya ➔
              </button>
              <button
                onClick={onComplete}
                className="py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm rounded-2xl shadow-sm transition-all"
              >
                Selesai 🏆
              </button>
            </div>
          </div>
        ) : (
          // Kad-kad kenderaan
          <div className="grid grid-cols-3 gap-2.5 py-1">
            {currentQ.options.map((option) => {
              const isSelected = selectedOptionId === option.id;
              const isWrong = wrongAttemptId === option.id;
              const isBeingDragged = activeDragOption?.id === option.id;

              return (
                <div
                  key={option.id}
                  draggable
                  onPointerDown={(e) => handleStartPointerDrag(option, e)}
                  onDragStart={(e) => handleHtml5DragStart(e, option)}
                  onClick={() => handleSelectOption(option)}
                  style={{ touchAction: 'none' }}
                  className={`rounded-2xl p-2 border-3 cursor-grab active:cursor-grabbing transition-all flex flex-col items-center justify-center text-center select-none shadow-sm relative ${
                    option.color
                  } ${
                    isBeingDragged
                      ? 'opacity-40 scale-95 border-amber-400'
                      : isWrong
                      ? 'border-red-500 bg-red-100 ring-4 ring-red-300 animate-wiggle'
                      : isSelected
                      ? 'border-indigo-500 scale-102 ring-4 ring-indigo-300'
                      : 'hover:scale-105 active:scale-95'
                  }`}
                >
                  <span className="text-4xl md:text-5xl leading-none drop-shadow-xs mb-1">
                    {option.icon}
                  </span>
                  <span className="text-xs md:text-sm font-black leading-tight">
                    {option.name}
                  </span>

                  {/* Kategori kecil */}
                  <span className="text-[9px] font-semibold text-slate-500 mt-0.5">
                    {option.category}
                  </span>

                  {/* Badge Tarik */}
                  <div className="absolute top-1 left-1 bg-white/90 text-slate-700 text-[8px] font-black px-1 rounded shadow-xs pointer-events-none">
                    Tarik ✋
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isAnsweredCorrect && (
          <p className="text-[11px] text-indigo-800 font-bold text-center mt-2.5">
            {wrongAttemptId
              ? '❌ Bukan kenderaan ini, cuba cari kenderaan lain yang lebih sesuai!'
              : '👉 Tarik gambar kenderaan ke kotak situasi di atas, atau sentuh kad kenderaan terus.'}
          </p>
        )}
      </div>
    </div>
  );
};
