import React, { useState, useEffect, useMemo, useRef } from 'react';
import { AgeGroup, PuzzleData } from '../../types';
import { PUZZLES_DATA } from '../../data/kspkData';
import { VEHICLES_PUZZLES_56 } from '../../data/vehiclePuzzlesData';
import { audio } from '../../services/audioService';
import { shuffleArray } from '../../services/questionGenerator';

interface JigsawPuzzleGameProps {
  age: AgeGroup;
  onComplete: () => void;
}

export const JigsawPuzzleGame: React.FC<JigsawPuzzleGameProps> = ({ age, onComplete }) => {
  // Target pieces count based on age:
  // 2-3: 2 keping (pecahan kiri & kanan, 1x2)
  // 3-4: 4 keping (pecahan 4 sudut, 2x2)
  // 4-5: 6 keping (2x3)
  // 5-6: 9 keping (3x3) - Khas untuk Kenderaan 20 soalan!
  const targetPiecesCount = useMemo(() => {
    switch (age) {
      case '2-3': return 2;
      case '3-4': return 4;
      case '4-5': return 6;
      case '5-6': return 9;
      default: return 9;
    }
  }, [age]);

  // Bagi umur 5-6 tahun, gunakan 20 koleksi puzzle kenderaan khas (VEHICLES_PUZZLES_56)
  const isVehicles56 = age === '5-6';

  // 20 soalan berbeza
  const allPuzzlesPool: PuzzleData[] = useMemo(() => {
    if (isVehicles56) {
      return VEHICLES_PUZZLES_56;
    }
    const list = PUZZLES_DATA.filter(p => p.piecesCount === targetPiecesCount);
    return list.length > 0 ? list : [PUZZLES_DATA[0]];
  }, [isVehicles56, targetPiecesCount]);

  // Session tracking: 5 soalan setiap sesi game
  const QUESTIONS_PER_SESSION = 5;
  const [sessionIndex, setSessionIndex] = useState(0); // Index sesi (0, 1, 2, 3...)
  const [questionInSession, setQuestionInSession] = useState(0); // 0..4 (5 soalan setiap sesi)
  const [sessionScore, setSessionScore] = useState(0);
  const [isSessionCompleted, setIsSessionCompleted] = useState(false);

  // Puzzle array for the active session (5 questions drawn from the 20 questions pool)
  const [sessionPuzzles, setSessionPuzzles] = useState<PuzzleData[]>(() => {
    return allPuzzlesPool.slice(0, QUESTIONS_PER_SESSION);
  });

  // Regenerate session puzzles when sessionIndex changes
  useEffect(() => {
    // If we have 20 puzzles, offset by sessionIndex * 5 or shuffle
    const startIdx = (sessionIndex * QUESTIONS_PER_SESSION) % allPuzzlesPool.length;
    let selected: PuzzleData[] = [];
    if (allPuzzlesPool.length >= QUESTIONS_PER_SESSION) {
      for (let i = 0; i < QUESTIONS_PER_SESSION; i++) {
        selected.push(allPuzzlesPool[(startIdx + i) % allPuzzlesPool.length]);
      }
    } else {
      selected = allPuzzlesPool.slice(0, QUESTIONS_PER_SESSION);
    }
    setSessionPuzzles(selected);
    setQuestionInSession(0);
    setSessionScore(0);
    setIsSessionCompleted(false);
  }, [sessionIndex, allPuzzlesPool]);

  // Current puzzle in the 5-questions session
  const puzzle: PuzzleData = sessionPuzzles[questionInSession] || sessionPuzzles[0] || allPuzzlesPool[0];

  const rows = puzzle.rows;
  const cols = puzzle.cols;
  const totalPieces = rows * cols;

  // Board slots: slotIndex -> pieceId or null
  const [boardSlots, setBoardSlots] = useState<(number | null)[]>([]);
  // Tray has unplaced pieces IDs
  const [trayPieces, setTrayPieces] = useState<number[]>([]);
  const [selectedPieceId, setSelectedPieceId] = useState<number | null>(null);
  const [isCurrentPuzzleSolved, setIsCurrentPuzzleSolved] = useState(false);

  // Unified Pointer Dragging State (Mouse, Touch, Stylus)
  const [activeDragPieceId, setActiveDragPieceId] = useState<number | null>(null);
  const [dragCursorPos, setDragCursorPos] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [hoveredSlotIdx, setHoveredSlotIdx] = useState<number | null>(null);

  const questionBoxRef = useRef<HTMLDivElement>(null);
  const slotElementsRef = useRef<Record<number, HTMLDivElement | null>>({});

  // Theme background gradient based on category or vehicle theme
  const themeGradient = useMemo(() => {
    if (isVehicles56) {
      return 'from-sky-200 via-blue-200 to-indigo-300';
    }
    switch (puzzle.category) {
      case 'Haiwan':
        return 'from-amber-200 via-emerald-200 to-teal-300';
      case 'Kenderaan':
        return 'from-sky-200 via-blue-200 to-indigo-300';
      case 'Buah':
        return 'from-rose-200 via-pink-200 to-amber-200';
      case 'Makanan':
        return 'from-pink-200 via-purple-200 to-yellow-200';
      case 'Alam':
        return 'from-teal-200 via-emerald-200 to-sky-300';
      case 'Bentuk':
        return 'from-indigo-200 via-purple-200 to-pink-200';
      default:
        return 'from-sky-200 via-teal-200 to-blue-200';
    }
  }, [puzzle.category, isVehicles56]);

  // Dynamic large font size for the graphic so it fills the board with zero white space
  const graphicFontSize = useMemo(() => {
    if (rows === 3 && cols === 3) return '170px';
    if (rows === 2 && cols === 3) return '190px';
    if (rows === 2 && cols === 2) return '170px';
    if (rows === 1 && cols === 2) return '160px';
    return '150px';
  }, [rows, cols]);

  // Initialize or reset when puzzle changes
  useEffect(() => {
    const allPieceIds = Array.from({ length: totalPieces }, (_, i) => i);
    setTrayPieces(shuffleArray(allPieceIds));
    setBoardSlots(Array(totalPieces).fill(null));
    setSelectedPieceId(null);
    setActiveDragPieceId(null);
    setHoveredSlotIdx(null);
    setIsCurrentPuzzleSolved(false);
  }, [puzzle.id, totalPieces]);

  // Snap piece into a target slot
  const placePieceIntoSlot = (slotIdx: number, pieceIdToPlace: number) => {
    if (slotIdx === pieceIdToPlace) {
      // Correct snap!
      audio.playSnap();
      const newSlots = [...boardSlots];
      newSlots[slotIdx] = pieceIdToPlace;
      setBoardSlots(newSlots);
      setTrayPieces(prev => prev.filter(id => id !== pieceIdToPlace));
      setSelectedPieceId(null);
      setActiveDragPieceId(null);
      setHoveredSlotIdx(null);

      // Check if all slots are filled correctly
      const allDone = newSlots.every((pid, idx) => pid === idx);
      if (allDone) {
        setIsCurrentPuzzleSolved(true);
        audio.playSuccess();
        setSessionScore(s => s + 1);
      }
    } else {
      // Incorrect slot
      audio.playError();
      setSelectedPieceId(null);
      setActiveDragPieceId(null);
      setHoveredSlotIdx(null);
    }
  };

  // Check which slot is at position (clientX, clientY)
  const getSlotAtPos = (clientX: number, clientY: number): number | null => {
    if (!questionBoxRef.current) return null;

    for (let i = 0; i < totalPieces; i++) {
      const el = slotElementsRef.current[i];
      if (el) {
        const rect = el.getBoundingClientRect();
        const margin = 20;
        if (
          clientX >= rect.left - margin &&
          clientX <= rect.right + margin &&
          clientY >= rect.top - margin &&
          clientY <= rect.bottom + margin
        ) {
          return i;
        }
      }
    }

    const boxRect = questionBoxRef.current.getBoundingClientRect();
    if (
      clientX >= boxRect.left &&
      clientX <= boxRect.right &&
      clientY >= boxRect.top &&
      clientY <= boxRect.bottom
    ) {
      let closestIdx: number | null = null;
      let minDistance = Infinity;

      for (let i = 0; i < totalPieces; i++) {
        if (boardSlots[i] !== null) continue;
        const el = slotElementsRef.current[i];
        if (el) {
          const rect = el.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dist = Math.hypot(clientX - centerX, clientY - centerY);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = i;
          }
        }
      }
      return closestIdx;
    }

    return null;
  };

  // Touch and Pointer Drag Handling
  const handleStartPointerDrag = (pieceId: number, e: React.PointerEvent) => {
    if (e.button !== 0 && e.pointerType === 'mouse') return;
    e.preventDefault();
    audio.playPop();
    setActiveDragPieceId(pieceId);
    setDragCursorPos({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    if (activeDragPieceId === null) return;

    const handlePointerMove = (e: PointerEvent) => {
      setDragCursorPos({ x: e.clientX, y: e.clientY });
      const targetSlot = getSlotAtPos(e.clientX, e.clientY);
      setHoveredSlotIdx(targetSlot);
    };

    const handlePointerUp = (e: PointerEvent) => {
      const targetSlot = getSlotAtPos(e.clientX, e.clientY);
      if (targetSlot !== null && activeDragPieceId !== null) {
        placePieceIntoSlot(targetSlot, activeDragPieceId);
      }
      setActiveDragPieceId(null);
      setHoveredSlotIdx(null);
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
    };
  }, [activeDragPieceId, boardSlots]);

  // HTML5 Drag and Drop fallbacks for Desktop Mouse
  const handleHtml5DragStart = (e: React.DragEvent, pieceId: number) => {
    e.dataTransfer.setData('text/plain', pieceId.toString());
    e.dataTransfer.effectAllowed = 'move';
    setActiveDragPieceId(pieceId);
  };

  const handleHtml5DragOver = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    setHoveredSlotIdx(slotIdx);
  };

  const handleHtml5Drop = (e: React.DragEvent, slotIdx: number) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('text/plain');
    const pieceId = data ? parseInt(data, 10) : activeDragPieceId;
    if (pieceId !== null && !isNaN(pieceId)) {
      placePieceIntoSlot(slotIdx, pieceId);
    }
    setActiveDragPieceId(null);
    setHoveredSlotIdx(null);
  };

  // Tap-to-place fallback
  const handleSelectTrayPiece = (pieceId: number) => {
    audio.playPop();
    setSelectedPieceId(prev => (prev === pieceId ? null : pieceId));
  };

  const handleSlotClick = (slotIdx: number) => {
    if (boardSlots[slotIdx] !== null && !isCurrentPuzzleSolved) {
      const pieceId = boardSlots[slotIdx]!;
      audio.playPop();
      const newSlots = [...boardSlots];
      newSlots[slotIdx] = null;
      setBoardSlots(newSlots);
      setTrayPieces(prev => [...prev, pieceId]);
      return;
    }

    if (selectedPieceId !== null) {
      placePieceIntoSlot(slotIdx, selectedPieceId);
    }
  };

  // Next Question in Session Handler (1 to 5)
  const handleNextInSession = () => {
    audio.playPop();
    if (questionInSession + 1 < QUESTIONS_PER_SESSION) {
      setQuestionInSession(prev => prev + 1);
    } else {
      // 5 questions in session finished!
      setIsSessionCompleted(true);
      audio.playSuccess();
    }
  };

  // Previous Question in Session Handler
  const handlePrevInSession = () => {
    audio.playPop();
    setQuestionInSession(prev => (prev > 0 ? prev - 1 : 0));
  };

  // Replay Current Session Handler (Ulang Semula 5 Soalan Dalam Sesi Ini)
  const handleReplaySession = () => {
    audio.playPop();
    setQuestionInSession(0);
    setSessionScore(0);
    setIsSessionCompleted(false);

    // Reset current puzzle pieces
    const allPieceIds = Array.from({ length: totalPieces }, (_, i) => i);
    setTrayPieces(shuffleArray(allPieceIds));
    setBoardSlots(Array(totalPieces).fill(null));
    setSelectedPieceId(null);
    setActiveDragPieceId(null);
    setHoveredSlotIdx(null);
    setIsCurrentPuzzleSolved(false);
  };

  // Next Session Handler (Sesi Baru dengan 5 Soalan Baru daripada 20 Soalan Berbeza)
  const handleNextSession = () => {
    audio.playPop();
    setSessionIndex(prev => prev + 1);
  };

  // Random Session Pick (Rawak 5 soalan daripada 20 soalan kenderaan)
  const handleRandomSession = () => {
    audio.playPop();
    const maxSessions = Math.ceil(allPuzzlesPool.length / QUESTIONS_PER_SESSION);
    let nextSess = Math.floor(Math.random() * maxSessions);
    if (nextSess === sessionIndex) {
      nextSess = (sessionIndex + 1) % maxSessions;
    }
    setSessionIndex(nextSess);
  };

  /**
   * Helper component to render the exact slice of the image on each piece (FULL BLEED, NO WHITE SPACE)
   */
  const renderPieceSlice = (pieceId: number, _isAssembled: boolean = false) => {
    const r = Math.floor(pieceId / cols);
    const c = pieceId % cols;

    return (
      <div className="w-full h-full relative overflow-hidden flex items-center justify-center select-none pointer-events-none">
        {/* Full Image Canvas with Vibrant Theme Background (Zero white margins) */}
        <div
          className={`absolute flex items-center justify-center select-none bg-gradient-to-br ${themeGradient}`}
          style={{
            width: `${cols * 100}%`,
            height: `${rows * 100}%`,
            left: `${-c * 100}%`,
            top: `${-r * 100}%`,
          }}
        >
          {/* Decorative vibrant scenery backdrop */}
          <div className="absolute inset-0 pointer-events-none opacity-40 overflow-hidden">
            <div className="absolute top-2 left-6 text-2xl">☁️</div>
            <div className="absolute top-3 right-8 text-2xl">✨</div>
            <div className="absolute bottom-2 left-10 text-2xl">🌿</div>
            <div className="absolute bottom-2 right-12 text-2xl">🌸</div>
            <div className="absolute inset-x-0 bottom-0 h-1/4 bg-emerald-400/30 rounded-t-full filter blur-[1px]"></div>
          </div>

          {/* MASSIVE GRAPHIC FILLING THE ENTIRE BOARD */}
          <span
            className="leading-none drop-shadow-2xl select-none transform transition-transform"
            style={{
              fontSize: graphicFontSize,
            }}
          >
            {puzzle.sceneSvg}
          </span>
        </div>
      </div>
    );
  };

  // JIKA 5 SOALAN SELESAI DILENGKAPKAN: TAMPILKAN SKRIN SELESAI SESI
  if (isSessionCompleted) {
    return (
      <div className="w-full max-w-xl mx-auto flex flex-col items-center p-4 bg-white/95 rounded-3xl border-4 border-emerald-300 shadow-xl text-center animate-scale-up">
        <span className="text-6xl animate-bounce">🏆</span>
        <h3 className="text-2xl md:text-3xl font-black text-slate-800 mt-2">
          Tahniah! Sesi Selesai!
        </h3>
        <p className="text-sm font-bold text-slate-600 mt-1">
          Anda telah menyelesaikan <span className="text-emerald-600 font-black">5 soalan</span> puzzle{' '}
          {isVehicles56 ? 'kenderaan' : 'gambar'} dalam sesi ini!
        </p>

        {/* 5 Bintang Skor Sesi */}
        <div className="flex items-center justify-center gap-2 my-4">
          {Array.from({ length: QUESTIONS_PER_SESSION }).map((_, idx) => (
            <span key={idx} className="text-3xl animate-pulse">
              ⭐
            </span>
          ))}
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 mt-2">
          {/* Ulang Semula Sesi Ini */}
          <button
            onClick={handleReplaySession}
            className="py-2.5 px-5 bg-white hover:bg-slate-100 text-slate-800 font-black text-xs md:text-sm rounded-2xl shadow-md border-2 border-slate-300 transition-all hover:scale-105 active:scale-95"
          >
            🔄 Ulang Semula Sesi Ini
          </button>

          {/* Sesi Seterusnya: 5 Soalan Baru daripada 20 Soalan Berbeza */}
          <button
            onClick={handleNextSession}
            className="py-2.5 px-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-white font-black text-xs md:text-sm rounded-2xl shadow-lg hover:scale-105 active:scale-95 transition-all btn-3d"
          >
            Sesi Seterusnya (5 Soalan Baru) ➔
          </button>

          {/* Selesai / Tamat */}
          <button
            onClick={onComplete}
            className="py-2.5 px-5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs md:text-sm rounded-2xl shadow-md transition-all hover:scale-105 active:scale-95"
          >
            Tamat Permainan 🎖️
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-xl mx-auto flex flex-col items-center p-2 select-none relative">
      {/* FLOATING DRAG GHOST (Follows Finger or Cursor) */}
      {activeDragPieceId !== null && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 w-28 h-28 rounded-2xl shadow-2xl border-4 border-amber-400 scale-110 overflow-hidden ring-4 ring-amber-300"
          style={{ left: dragCursorPos.x, top: dragCursorPos.y }}
        >
          {renderPieceSlice(activeDragPieceId, false)}
        </div>
      )}

      {/* Top Header: 5 Soalan Setiap Sesi & Navigasi */}
      <div className="w-full flex items-center justify-between gap-2 mb-3 bg-white/95 px-4 py-2 rounded-2xl border-2 border-purple-200 shadow-sm">
        <button
          onClick={handlePrevInSession}
          disabled={questionInSession === 0}
          className={`py-1 px-3 font-bold text-xs rounded-xl border transition-colors ${
            questionInSession === 0
              ? 'opacity-40 bg-slate-100 text-slate-400 border-slate-200 cursor-not-allowed'
              : 'bg-purple-50 hover:bg-purple-100 text-purple-700 border-purple-200'
          }`}
          title="Soalan Sebelumnya Dalam Sesi Ini"
        >
          ◀ Sebelum
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-xs font-black text-purple-900">
              Soalan {questionInSession + 1} / {QUESTIONS_PER_SESSION}
            </span>
            <span className="text-[10px] font-black bg-purple-100 text-purple-700 px-2 py-0.2 rounded-full border border-purple-300">
              {totalPieces} Keping
            </span>
            {isVehicles56 && (
              <span className="text-[10px] font-black bg-blue-100 text-blue-700 px-2 py-0.2 rounded-full border border-blue-300">
                Kenderaan 🚗
              </span>
            )}
          </div>
          <span className="text-[11px] font-bold text-slate-500">
            {puzzle.title} {puzzle.sceneSvg} (Sesi {sessionIndex + 1})
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            onClick={handleRandomSession}
            className="py-1 px-2.5 bg-sky-50 hover:bg-sky-100 text-sky-800 font-bold text-[11px] rounded-xl border border-sky-200 transition-colors"
            title="Tukar Sesi Lain (20 Soalan Berbeza Tersedia)"
          >
            🔀
          </button>

          <button
            onClick={handleNextInSession}
            className="py-1 px-3 bg-purple-50 hover:bg-purple-100 text-purple-700 font-bold text-xs rounded-xl border border-purple-200 transition-colors"
            title="Soalan Seterusnya Dalam Sesi Ini"
          >
            Seterusnya ▶
          </button>
        </div>
      </div>

      {/* KOTAK SOALAN DI TENGAH: HANYA GAMBAR SAMAR (TIADA PERKATAAN ARAHAN) */}
      <div className="w-full flex flex-col items-center">
        {/* Satu Kotak Soalan Di Tengah (Center Question / Assembly Box) */}
        <div
          ref={questionBoxRef}
          style={{
            aspectRatio: `${cols} / ${rows}`,
            maxWidth: cols === 3 ? '420px' : '340px',
          }}
          className={`w-full rounded-3xl p-1.5 md:p-2 border-4 relative transition-all overflow-hidden bg-gradient-to-br ${themeGradient} ${
            isCurrentPuzzleSolved
              ? 'border-emerald-500 ring-8 ring-emerald-200 shadow-2xl scale-102'
              : 'border-purple-400 shadow-xl'
          }`}
        >
          {/* GAMBAR BESAR SAMAR DI TENGAH (Faint Ghost Image Guide - Zero White Space & No Text) */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0">
            <span
              className={`leading-none transition-all select-none drop-shadow-md ${
                isCurrentPuzzleSolved
                  ? 'opacity-0 scale-90'
                  : 'opacity-35 grayscale-[20%] blur-[0.3px]'
              }`}
              style={{
                fontSize: graphicFontSize,
              }}
            >
              {puzzle.sceneSvg}
            </span>
          </div>

          {/* Garisan Pembahagi Samar di Tengah (Untuk 2 Keping 1x2) */}
          {!isCurrentPuzzleSolved && cols === 2 && rows === 1 && (
            <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
          )}

          {/* Garisan Palang Pembahagi di Tengah (Untuk 4 Keping 2x2) */}
          {!isCurrentPuzzleSolved && cols === 2 && rows === 2 && (
            <>
              <div className="absolute inset-y-2 left-1/2 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 border-b-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
            </>
          )}

          {/* Garisan Palang Pembahagi di Tengah (Untuk 6 Keping 2x3) */}
          {!isCurrentPuzzleSolved && cols === 3 && rows === 2 && (
            <>
              <div className="absolute inset-y-2 left-1/3 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
              <div className="absolute inset-y-2 left-2/3 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
              <div className="absolute inset-x-2 top-1/2 -translate-y-1/2 h-0.5 border-b-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
            </>
          )}

          {/* Garisan Palang Pembahagi di Tengah (Untuk 9 Keping 3x3) */}
          {!isCurrentPuzzleSolved && cols === 3 && rows === 3 && (
            <>
              {/* Garisan Menegak 1 (1/3) */}
              <div className="absolute inset-y-2 left-1/3 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
              {/* Garisan Menegak 2 (2/3) */}
              <div className="absolute inset-y-2 left-2/3 -translate-x-1/2 w-0.5 border-r-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
              {/* Garisan Mendatar 1 (1/3) */}
              <div className="absolute inset-x-2 top-1/3 -translate-y-1/2 h-0.5 border-b-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
              {/* Garisan Mendatar 2 (2/3) */}
              <div className="absolute inset-x-2 top-2/3 -translate-y-1/2 h-0.5 border-b-2 border-dashed border-purple-500/50 pointer-events-none z-10" />
            </>
          )}

          {/* Grid Petak Cantuman Kotak Tengah (Edge-to-Edge with minimal clean gap) */}
          <div
            className="w-full h-full grid gap-1 relative z-10"
            style={{
              gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))`,
              gridTemplateColumns: `repeat(${cols}, minmax(0, 1fr))`,
            }}
          >
            {Array.from({ length: totalPieces }).map((_, slotIdx) => {
              const placedPieceId = boardSlots[slotIdx];
              const isFilled = placedPieceId !== null;
              const isHovered = hoveredSlotIdx === slotIdx;
              const isSelectedTarget = selectedPieceId === slotIdx;

              return (
                <div
                  key={slotIdx}
                  ref={(el) => {
                    slotElementsRef.current[slotIdx] = el;
                  }}
                  onClick={() => handleSlotClick(slotIdx)}
                  onDragOver={(e) => handleHtml5DragOver(e, slotIdx)}
                  onDrop={(e) => handleHtml5Drop(e, slotIdx)}
                  className={`rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all border border-white/60 relative overflow-hidden ${
                    isFilled
                      ? 'shadow-md'
                      : isHovered || isSelectedTarget
                      ? 'bg-amber-100/50 border-dashed border-amber-500 ring-4 ring-amber-300 scale-102 shadow-lg animate-pulse'
                      : 'bg-white/10 border-dashed border-purple-400/50 hover:bg-white/20'
                  }`}
                >
                  {isFilled && (
                    // Pecahan yang sudah dicantumkan (Penuh warna & gambar besar)
                    renderPieceSlice(placedPieceId, isCurrentPuzzleSolved)
                  )}

                  {/* Penanda berjaya pada petak */}
                  {isFilled && (
                    <div className="absolute top-1.5 right-1.5 bg-emerald-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-[10px] font-black shadow-xs z-30">
                      ✓
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          {/* Success Glow Overlay bila berjaya cantum */}
          {isCurrentPuzzleSolved && (
            <div className="absolute inset-0 bg-emerald-400/25 backdrop-blur-[1px] flex flex-col items-center justify-center z-40 animate-scale-up pointer-events-none rounded-3xl">
              <span className="text-6xl animate-bounce">🎉</span>
              <span className="text-base font-black text-emerald-950 bg-white/95 px-5 py-1.5 rounded-full shadow-lg mt-2 border border-emerald-300">
                Berjaya Dicantumkan! ✨
              </span>
            </div>
          )}
        </div>
      </div>

      {/* KOTAK JAWAPAN DI BAWAH (HANYA GAMBAR KEPINGAN UNTUK DICANTUMKAN TANPA PERKATAAN ARAHAN) */}
      <div className="w-full mt-3 bg-white/95 backdrop-blur-sm p-3.5 rounded-3xl border-3 border-amber-300 shadow-md">
        {trayPieces.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-2 text-center">
            <p className="text-sm md:text-base font-black text-emerald-700 mb-2">
              🌟 Tahniah! Gambar {puzzle.title} siap dicantum dengan sempurna!
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              {/* Soalan seterusnya dalam sesi 5 soalan */}
              <button
                onClick={handleNextInSession}
                className="py-2.5 px-6 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all btn-3d"
              >
                {questionInSession + 1 < QUESTIONS_PER_SESSION
                  ? `Soalan Seterusnya (${questionInSession + 2}/5) ➔`
                  : 'Selesai 5 Soalan! 🏆'}
              </button>

              {/* Ulang semula soalan ini */}
              <button
                onClick={() => {
                  audio.playPop();
                  const allPieceIds = Array.from({ length: totalPieces }, (_, i) => i);
                  setTrayPieces(shuffleArray(allPieceIds));
                  setBoardSlots(Array(totalPieces).fill(null));
                  setIsCurrentPuzzleSolved(false);
                }}
                className="py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-bold text-sm rounded-2xl shadow-sm transition-all"
              >
                🔄 Cantum Semula
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-wrap items-center justify-center gap-2.5 py-2 min-h-[110px]">
            {trayPieces.map((pieceId) => {
              const isSelected = selectedPieceId === pieceId;
              const isBeingDragged = activeDragPieceId === pieceId;

              return (
                <div
                  key={pieceId}
                  draggable
                  onPointerDown={(e) => handleStartPointerDrag(pieceId, e)}
                  onDragStart={(e) => handleHtml5DragStart(e, pieceId)}
                  onClick={() => handleSelectTrayPiece(pieceId)}
                  style={{ touchAction: 'none' }}
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-2xl border-3 cursor-grab active:cursor-grabbing transition-all relative overflow-hidden shadow-md flex items-center justify-center select-none ${
                    isBeingDragged
                      ? 'opacity-40 border-amber-400 scale-95'
                      : isSelected
                      ? 'border-amber-500 scale-105 ring-4 ring-amber-300 animate-wiggle'
                      : 'border-amber-300 hover:border-amber-500 hover:scale-105'
                  }`}
                >
                  {/* Kepingan pecahan gambar sahaja untuk dicantumkan tanpa teks perkataan */}
                  {renderPieceSlice(pieceId, false)}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* FOOTER INFO SESI */}
      <div className="w-full flex items-center justify-between mt-2.5 px-2">
        <button
          onClick={handleReplaySession}
          className="text-xs font-bold text-slate-600 hover:text-slate-900 bg-white/90 px-3 py-1.5 rounded-xl border border-slate-300 shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <span>🔄</span>
          <span>Ulang Sesi ({questionInSession + 1}/5)</span>
        </button>

        <p className="text-[11px] text-purple-900 font-bold hidden md:block">
          {isVehicles56
            ? '🚗 Puzzle Kenderaan 5-6 Tahun • 5 Soalan/Sesi • 20 Soalan Berbeza'
            : '🧩 Cantumkan kepingan ke dalam kotak soalan di atas!'}
        </p>

        <button
          onClick={handleNextSession}
          className="text-xs font-bold text-purple-800 hover:text-purple-950 bg-purple-100 hover:bg-purple-200 px-3 py-1.5 rounded-xl border border-purple-300 shadow-xs flex items-center gap-1.5 transition-colors"
        >
          <span>Sesi Seterusnya ➔</span>
        </button>
      </div>
    </div>
  );
};
