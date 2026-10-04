import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { TWENTY_PADANAN_SESSIONS, PadananSessionQuestion, BodyPartFunctionItem } from '../../data/bodyPartsData';
import { audio } from '../../services/audioService';

interface AnggotaBadanGameProps {
  onComplete: () => void;
}

// Utility to shuffle array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Bright cheerful colors for matching lines & badges
const PAIR_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EC4899', '#8B5CF6'];

interface ActiveDragLine {
  pairId: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
  color: string;
}

export const AnggotaBadanGame: React.FC<AnggotaBadanGameProps> = ({ onComplete }) => {
  // Session tracking: Index of current set among 20 unique sessions
  const [sessionIndex, setSessionIndex] = useState(0);

  // Active question containing 5 body parts vs 5 functions
  const currentSession: PadananSessionQuestion =
    TWENTY_PADANAN_SESSIONS[sessionIndex % TWENTY_PADANAN_SESSIONS.length];

  // Matched pair IDs (set of matched item IDs from 0 to 4)
  const [matchedIds, setMatchedIds] = useState<Set<string>>(new Set());

  // Click-to-match state (for toddlers on tap/stylus)
  const [selectedLeftId, setSelectedLeftId] = useState<string | null>(null);
  const [selectedRightId, setSelectedRightId] = useState<string | null>(null);

  // Drag-and-draw line state (for dragging finger or mouse from dot to dot)
  const [activeDrag, setActiveDrag] = useState<ActiveDragLine | null>(null);
  const [hoveredRightId, setHoveredRightId] = useState<string | null>(null);

  // Completed connecting lines coordinates
  const [lines, setLines] = useState<
    {
      id: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
    }[]
  >([]);

  // DOM Refs for calculating line coordinates
  const containerRef = useRef<HTMLDivElement>(null);
  const leftDotRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const rightDotRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Left items: 5 Body Parts (Kotak Soalan Belah Kiri)
  const leftItems = useMemo(() => {
    return currentSession.pairs.map((p, idx) => ({
      ...p,
      color: PAIR_COLORS[idx % PAIR_COLORS.length],
    }));
  }, [currentSession]);

  // Right items: 5 Functions (Kotak Jawapan Belah Kanan) - Shuffled randomly for each session
  const [rightItems, setRightItems] = useState<(BodyPartFunctionItem & { color: string })[]>([]);

  // Setup/Reset when session changes
  useEffect(() => {
    setMatchedIds(new Set());
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setActiveDrag(null);
    setHoveredRightId(null);
    setLines([]);

    // Randomize the order of right-hand answer boxes so it's a real puzzle
    const shuffled = shuffleArray(
      currentSession.pairs.map((p, idx) => ({
        ...p,
        color: PAIR_COLORS[idx % PAIR_COLORS.length],
      }))
    );
    setRightItems(shuffled);
  }, [currentSession]);

  // Recalculate drawn line positions on resize or matches
  const updateCompletedLines = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newLines: {
      id: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
    }[] = [];

    matchedIds.forEach((id) => {
      const leftDot = leftDotRefs.current.get(id);
      const rightDot = rightDotRefs.current.get(id);

      if (leftDot && rightDot) {
        const lRect = leftDot.getBoundingClientRect();
        const rRect = rightDot.getBoundingClientRect();

        const x1 = lRect.left + lRect.width / 2 - containerRect.left;
        const y1 = lRect.top + lRect.height / 2 - containerRect.top;
        const x2 = rRect.left + rRect.width / 2 - containerRect.left;
        const y2 = rRect.top + rRect.height / 2 - containerRect.top;

        const original = leftItems.find((item) => item.id === id);
        newLines.push({
          id,
          x1,
          y1,
          x2,
          y2,
          color: original ? original.color : '#10B981',
        });
      }
    });

    setLines(newLines);
  }, [matchedIds, leftItems]);

  useEffect(() => {
    updateCompletedLines();
    const handleResize = () => updateCompletedLines();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [updateCompletedLines]);

  // Voice narration helper (baca nama & fungsi dengan suara riang)
  const speakUtterance = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.pitch = 1.4;
        utter.rate = 1.0;
        const voices = window.speechSynthesis.getVoices();
        const msVoice = voices.find((v) => v.lang.startsWith('ms') || v.lang.startsWith('id'));
        if (msVoice) utter.voice = msVoice;
        window.speechSynthesis.speak(utter);
      } catch {
        // ignore
      }
    }
  };

  // Check if a pair is correct
  const registerMatch = (pairId: string) => {
    if (matchedIds.has(pairId)) return;

    audio.playSnap();
    const matchedItem = leftItems.find((item) => item.id === pairId);
    if (matchedItem) {
      speakUtterance(`${matchedItem.partLabel} untuk ${matchedItem.functionName}`);
    }

    setMatchedIds((prev) => {
      const next = new Set(prev);
      next.add(pairId);

      // Check if all 5 pairs are completed!
      if (next.size === 5) {
        audio.playSuccess();
      }
      return next;
    });

    setSelectedLeftId(null);
    setSelectedRightId(null);
    setActiveDrag(null);
    setHoveredRightId(null);
  };

  // --- TAP / CLICK TO MATCH (MESRA SKRIN SENTUH KANAK-KANAK) ---
  const handleLeftClick = (item: BodyPartFunctionItem) => {
    if (matchedIds.has(item.id)) return;
    audio.playPop();
    speakUtterance(item.partLabel);

    if (selectedRightId) {
      // User previously clicked a right answer card
      if (selectedRightId === item.id) {
        registerMatch(item.id);
      } else {
        audio.playError();
        setSelectedRightId(null);
        setSelectedLeftId(null);
      }
    } else {
      setSelectedLeftId((prev) => (prev === item.id ? null : item.id));
    }
  };

  const handleRightClick = (item: BodyPartFunctionItem) => {
    if (matchedIds.has(item.id)) return;
    audio.playPop();
    speakUtterance(item.functionName);

    if (selectedLeftId) {
      // User previously clicked a left question card
      if (selectedLeftId === item.id) {
        registerMatch(item.id);
      } else {
        audio.playError();
        setSelectedLeftId(null);
        setSelectedRightId(null);
      }
    } else {
      setSelectedRightId((prev) => (prev === item.id ? null : item.id));
    }
  };

  // --- DRAG / DRAW LINE MATCHING (TARIK DARI TITIK KIRI KE TITIK KANAN) ---
  const handleStartDrag = (item: BodyPartFunctionItem & { color: string }, e: React.PointerEvent) => {
    if (matchedIds.has(item.id)) return;
    if (e.button !== 0) return;
    e.preventDefault();

    if (!containerRef.current) return;
    const dot = leftDotRefs.current.get(item.id);
    if (!dot) return;

    audio.playPop();
    speakUtterance(item.partLabel);

    const cRect = containerRef.current.getBoundingClientRect();
    const dRect = dot.getBoundingClientRect();
    const startX = dRect.left + dRect.width / 2 - cRect.left;
    const startY = dRect.top + dRect.height / 2 - cRect.top;

    setActiveDrag({
      pairId: item.id,
      startX,
      startY,
      currentX: e.clientX - cRect.left,
      currentY: e.clientY - cRect.top,
      color: item.color,
    });
  };

  useEffect(() => {
    if (!activeDrag || !containerRef.current) return;

    const handlePointerMove = (e: PointerEvent) => {
      if (!containerRef.current) return;
      const cRect = containerRef.current.getBoundingClientRect();
      const curX = e.clientX - cRect.left;
      const curY = e.clientY - cRect.top;

      setActiveDrag((prev) => (prev ? { ...prev, currentX: curX, currentY: curY } : null));

      // Check if hovering over any right dot or right card
      let hovered: string | null = null;
      rightItems.forEach((rItem) => {
        if (matchedIds.has(rItem.id)) return;
        const rDot = rightDotRefs.current.get(rItem.id);
        if (rDot) {
          const rRect = rDot.getBoundingClientRect();
          const margin = 40; // Generous hit area for little toddler fingers
          if (
            e.clientX >= rRect.left - margin &&
            e.clientX <= rRect.right + margin &&
            e.clientY >= rRect.top - margin &&
            e.clientY <= rRect.bottom + margin
          ) {
            hovered = rItem.id;
          }
        }
      });
      setHoveredRightId(hovered);
    };

    const handlePointerUp = (e: PointerEvent) => {
      // Find if released near correct right target
      let targetId: string | null = null;
      rightItems.forEach((rItem) => {
        if (matchedIds.has(rItem.id)) return;
        const rDot = rightDotRefs.current.get(rItem.id);
        if (rDot) {
          const rRect = rDot.getBoundingClientRect();
          const margin = 45;
          if (
            e.clientX >= rRect.left - margin &&
            e.clientX <= rRect.right + margin &&
            e.clientY >= rRect.top - margin &&
            e.clientY <= rRect.bottom + margin
          ) {
            targetId = rItem.id;
          }
        }
      });

      if (targetId && targetId === activeDrag.pairId) {
        registerMatch(activeDrag.pairId);
      } else {
        if (targetId && targetId !== activeDrag.pairId) {
          audio.playError();
        }
        setActiveDrag(null);
        setHoveredRightId(null);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [activeDrag, matchedIds, rightItems]);

  // Next Session Handler (Selesai 5 soalan, main sesi seterusnya daripada 20 set soalan)
  const handleNextSession = () => {
    audio.playPop();
    setSessionIndex((prev) => (prev + 1) % TWENTY_PADANAN_SESSIONS.length);
  };

  // Replay Current Session Handler (Ulang semula sesi yang sama)
  const handleReplaySession = () => {
    audio.playPop();
    setMatchedIds(new Set());
    setSelectedLeftId(null);
    setSelectedRightId(null);
    setActiveDrag(null);
    setHoveredRightId(null);
    setLines([]);
    setRightItems(shuffleArray([...rightItems]));
  };

  // Random Session Pick Handler (Pilih rawak mana-mana daripada 20 soalan)
  const handleRandomSession = () => {
    audio.playPop();
    let nextIdx = Math.floor(Math.random() * TWENTY_PADANAN_SESSIONS.length);
    if (nextIdx === sessionIndex) {
      nextIdx = (sessionIndex + 1) % TWENTY_PADANAN_SESSIONS.length;
    }
    setSessionIndex(nextIdx);
  };

  const isAllCompleted = matchedIds.size === 5;

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col items-center p-2 select-none relative">
      {/* Top Header: Session & Counter (20 Soalan Berbeza Setiap Sesi) */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 bg-white/95 px-4 py-2.5 rounded-2xl border-2 border-teal-200 shadow-sm">
        <div className="flex items-center gap-2">
          <span className="text-2xl">🧒</span>
          <div>
            <h2 className="text-xs md:text-sm font-black text-teal-900 leading-tight">
              Mengenal Anggota Badan & Fungsi
            </h2>
            <p className="text-[10px] md:text-xs font-bold text-slate-500">
              Sesi {sessionIndex + 1} / {TWENTY_PADANAN_SESSIONS.length}: {currentSession.title}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-teal-50 px-3 py-1 rounded-full border border-teal-200">
            <span className="text-xs font-bold text-slate-600">Padanan:</span>
            <span className="text-xs font-black text-teal-700">
              {matchedIds.size} / 5
            </span>
          </div>

          <button
            onClick={handleRandomSession}
            className="text-[11px] font-bold text-teal-800 bg-teal-100 hover:bg-teal-200 px-2.5 py-1 rounded-xl transition-all"
            title="Tukar Sesi Soalan Lain (20 Soalan Tersedia)"
          >
            Sesi Lain 🔀
          </button>
        </div>
      </div>

      {/* ARAHAN PADANAN JELAS MENGIKUT LEMBARAN PANCA INDRA */}
      <div className="text-center mb-3 px-2">
        <h3 className="text-lg md:text-2xl font-black text-slate-800">
          Padankan Anggota Badan dengan Fungsinya!
        </h3>
        <p className="text-xs md:text-sm font-bold text-teal-700 mt-0.5">
          👉 Tarik garisan dari titik hitam atau klik kotak soalan (kiri) & kotak jawapan (kanan).
        </p>
      </div>

      {/* STAGE PADANAN: 2 KOLUM (KOTAK SOALAN KIRI VS KOTAK JAWAPAN KANAN) */}
      <div
        ref={containerRef}
        className="w-full relative bg-white/95 backdrop-blur-md rounded-3xl p-3 md:p-6 border-4 border-teal-300 shadow-xl overflow-hidden min-h-[480px] md:min-h-[520px]"
      >
        {/* SVG CANVAS LAYER FOR DRAWN CONNECTING LINES */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-10"
          style={{ width: '100%', height: '100%' }}
        >
          {/* Completed matching lines with smooth glowing animation */}
          {lines.map((line) => (
            <g key={line.id}>
              {/* Outer soft glow line */}
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.color}
                strokeWidth="12"
                strokeOpacity="0.3"
                strokeLinecap="round"
              />
              {/* Main solid colored line */}
              <line
                x1={line.x1}
                y1={line.y1}
                x2={line.x2}
                y2={line.y2}
                stroke={line.color}
                strokeWidth="6"
                strokeLinecap="round"
              />
            </g>
          ))}

          {/* Active dragging line while finger/mouse moves */}
          {activeDrag && (
            <line
              x1={activeDrag.startX}
              y1={activeDrag.startY}
              x2={activeDrag.currentX}
              y2={activeDrag.currentY}
              stroke={activeDrag.color}
              strokeWidth="6"
              strokeDasharray="6 4"
              strokeLinecap="round"
              className="animate-pulse"
            />
          )}
        </svg>

        {/* HEADER KOLUM PADANAN */}
        <div className="w-full grid grid-cols-2 gap-4 md:gap-8 mb-3 z-20 relative">
          <div className="text-center bg-teal-100/90 py-1.5 px-3 rounded-2xl border-2 border-teal-300">
            <span className="text-xs md:text-sm font-black text-teal-950 uppercase tracking-wide flex items-center justify-center gap-1.5">
              <span>👤</span>
              <span>Kotak Soalan (Anggota)</span>
            </span>
          </div>
          <div className="text-center bg-amber-100/90 py-1.5 px-3 rounded-2xl border-2 border-amber-300">
            <span className="text-xs md:text-sm font-black text-amber-950 uppercase tracking-wide flex items-center justify-center gap-1.5">
              <span>✨</span>
              <span>Kotak Jawapan (Fungsi)</span>
            </span>
          </div>
        </div>

        {/* 5 BARIS PADANAN SEPERTI LEMBARAN PANCA INDRA */}
        <div className="w-full flex flex-col gap-3 md:gap-4 relative z-20">
          {leftItems.map((leftItem, index) => {
            const rightItem = rightItems[index];
            const isLeftMatched = matchedIds.has(leftItem.id);
            const isRightMatched = rightItem ? matchedIds.has(rightItem.id) : false;

            const isLeftSelected = selectedLeftId === leftItem.id;
            const isRightSelected = rightItem ? selectedRightId === rightItem.id : false;
            const isRightHovered = rightItem ? hoveredRightId === rightItem.id : false;

            return (
              <div key={leftItem.id} className="w-full grid grid-cols-2 gap-4 md:gap-8 items-center">
                {/* --- KOTAK SOALAN SEBELAH KIRI (GAMBAR ANGGOTA BADAN) --- */}
                <div className="flex items-center justify-between gap-1 relative">
                  <div
                    onClick={() => handleLeftClick(leftItem)}
                    className={`flex-1 flex items-center gap-2.5 p-2 md:p-3 rounded-2xl border-3 transition-all cursor-pointer select-none bg-white shadow-sm ${
                      isLeftMatched
                        ? 'border-emerald-400 bg-emerald-50/80 opacity-90'
                        : isLeftSelected
                        ? 'border-teal-500 bg-teal-50 ring-4 ring-teal-300 scale-102 animate-pulse shadow-md'
                        : 'border-slate-300 hover:border-teal-400 hover:bg-slate-50'
                    }`}
                  >
                    {/* Gambar Anggota Badan Besar & Jelas */}
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                      <span className="text-3xl md:text-4xl leading-none">{leftItem.partIcon}</span>
                    </div>

                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-sm md:text-base font-black text-slate-800 leading-tight">
                        {leftItem.partLabel}
                      </span>
                      <span className="text-[10px] md:text-xs font-bold text-slate-400">
                        {isLeftMatched ? '✓ Selesai' : 'Klik / Tarik'}
                      </span>
                    </div>
                  </div>

                  {/* TITIK HITAM SAMBUNGAN KIRI (TITIK LEMBARAN SEPERTI GAMBAR) */}
                  <div
                    ref={(el) => {
                      if (el) leftDotRefs.current.set(leftItem.id, el);
                      else leftDotRefs.current.delete(leftItem.id);
                    }}
                    onPointerDown={(e) => handleStartDrag(leftItem, e)}
                    style={{ touchAction: 'none' }}
                    className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shrink-0 cursor-grab active:cursor-grabbing transition-transform ${
                      isLeftMatched
                        ? 'bg-emerald-500 ring-2 ring-emerald-300'
                        : isLeftSelected
                        ? 'bg-teal-600 ring-4 ring-teal-300 scale-125 animate-pulse'
                        : 'bg-slate-800 hover:bg-teal-600 hover:scale-125'
                    }`}
                    title="Tarik garisan dari sini ke fungsi yang betul"
                  >
                    <div className="w-2.5 h-2.5 rounded-full bg-white" />
                  </div>
                </div>

                {/* --- KOTAK JAWAPAN SEBELAH KANAN (GAMBAR FUNGSI ANGGOTA BADAN) --- */}
                {rightItem && (
                  <div className="flex items-center justify-between gap-1 relative">
                    {/* TITIK HITAM SAMBUNGAN KANAN */}
                    <div
                      ref={(el) => {
                        if (el) rightDotRefs.current.set(rightItem.id, el);
                        else rightDotRefs.current.delete(rightItem.id);
                      }}
                      className={`w-6 h-6 md:w-7 md:h-7 rounded-full flex items-center justify-center shrink-0 transition-transform ${
                        isRightMatched
                          ? 'bg-emerald-500 ring-2 ring-emerald-300'
                          : isRightSelected || isRightHovered
                          ? 'bg-amber-500 ring-4 ring-amber-300 scale-125 animate-pulse'
                          : 'bg-slate-800'
                      }`}
                      title="Lepaskan garisan di sini"
                    >
                      <div className="w-2.5 h-2.5 rounded-full bg-white" />
                    </div>

                    <div
                      onClick={() => handleRightClick(rightItem)}
                      className={`flex-1 flex items-center gap-2.5 p-2 md:p-3 rounded-2xl border-3 transition-all cursor-pointer select-none bg-white shadow-sm ${
                        isRightMatched
                          ? 'border-emerald-400 bg-emerald-50/80 opacity-90'
                          : isRightSelected || isRightHovered
                          ? 'border-amber-500 bg-amber-50 ring-4 ring-amber-300 scale-102 animate-pulse shadow-md'
                          : 'border-slate-300 hover:border-amber-400 hover:bg-slate-50'
                      }`}
                    >
                      {/* Gambar Fungsi Badan (Radio, Buku, Bunga, Makanan, Mainan, dll) */}
                      <div className="w-12 h-12 md:w-16 md:h-16 rounded-xl bg-amber-50 flex items-center justify-center shrink-0 border border-amber-200">
                        <span className="text-3xl md:text-4xl leading-none">{rightItem.functionIcon}</span>
                      </div>

                      <div className="flex flex-col text-left overflow-hidden">
                        <span className="text-sm md:text-base font-black text-slate-800 leading-tight">
                          {rightItem.functionName}
                        </span>
                        <span className="text-[10px] md:text-xs font-semibold text-slate-500 truncate">
                          {rightItem.functionDescription}
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* SUCCESS OVERLAY BILA KESEMUA 5 PADANAN BERJAYA DILENGKAPKAN */}
        {isAllCompleted && (
          <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex flex-col items-center justify-center z-40 animate-scale-up rounded-3xl p-4 text-center">
            <span className="text-6xl animate-bounce">🎉</span>
            <h4 className="text-xl md:text-2xl font-black text-emerald-950 mt-2">
              Tahniah! 5 Padanan Selesai!
            </h4>
            <p className="text-xs md:text-sm font-bold text-emerald-800 mb-4">
              Anda berjaya memadankan semua 5 anggota badan dengan fungsinya dengan tepat.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Ulang Semula Sesi Ini */}
              <button
                onClick={handleReplaySession}
                className="py-2.5 px-5 bg-white hover:bg-slate-100 text-slate-800 font-black text-xs md:text-sm rounded-2xl shadow-md border-2 border-slate-300 transition-all hover:scale-105 active:scale-95"
              >
                🔄 Main Semula Sesi Ini
              </button>

              {/* Sesi Seterusnya daripada 20 Soalan Berbeza */}
              <button
                onClick={handleNextSession}
                className="py-2.5 px-6 bg-gradient-to-r from-teal-400 via-emerald-400 to-teal-500 text-white font-black text-xs md:text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all btn-3d"
              >
                Sesi Seterusnya (Soalan Baru) ➔
              </button>

              {/* Selesai Main & Kembali */}
              <button
                onClick={onComplete}
                className="py-2.5 px-5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs md:text-sm rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95"
              >
                Tamat Permainan 🏆
              </button>
            </div>
          </div>
        )}
      </div>

      {/* FOOTER ACTIONS: KAWALAN SOALAN & BANTUAN MESRA KANAK-KANAK */}
      <div className="w-full flex items-center justify-between mt-3 px-2">
        <button
          onClick={handleReplaySession}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-300 shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <span>🔄</span>
          <span>Set Semula Sesi Ini</span>
        </button>

        <p className="text-[11px] text-teal-800 font-bold hidden md:block">
          {matchedIds.size < 5
            ? `Tinggal ${5 - matchedIds.size} padanan lagi untuk diselesaikan!`
            : '🌟 Semua 5 padanan telah berjaya dilengkapkan!'}
        </p>

        <button
          onClick={handleNextSession}
          className="text-xs font-bold text-teal-800 hover:text-teal-950 bg-teal-100 hover:bg-teal-200 px-3 py-1.5 rounded-xl border border-teal-300 shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <span>Soalan Seterusnya ({sessionIndex + 2 <= TWENTY_PADANAN_SESSIONS.length ? sessionIndex + 2 : 1}/20)</span>
          <span>➔</span>
        </button>
      </div>
    </div>
  );
};
