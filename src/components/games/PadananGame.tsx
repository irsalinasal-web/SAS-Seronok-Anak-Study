import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { QuestionData } from '../../types';
import { audio } from '../../services/audioService';
import { shuffleArray } from '../../services/questionGenerator';

interface PadananGameProps {
  question: QuestionData;
  onAnswer: (isCorrect: boolean) => void;
}

interface ActiveDrag {
  pairKey: string;
  startX: number;
  startY: number;
  currentX: number;
  currentY: number;
}

const LINE_COLORS = ['#10B981', '#3B82F6', '#F59E0B', '#EC4899', '#8B5CF6', '#14B8A6'];

export const PadananGame: React.FC<PadananGameProps> = ({ question, onAnswer }) => {
  const pairs = question.pairs || [];
  const containerRef = useRef<HTMLDivElement>(null);
  const leftItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const rightItemRefs = useRef<Map<string, HTMLDivElement>>(new Map());

  // Left items in order, Right items shuffled
  const leftItems = useMemo(() => pairs.map(p => ({
    id: p.leftId,
    text: p.leftText,
    icon: p.leftIcon,
    color: p.leftColor,
    pairKey: p.leftId.replace('l_', ''),
  })), [pairs]);

  const rightItems = useMemo(() => shuffleArray(pairs.map(p => ({
    id: p.rightId,
    text: p.rightText,
    icon: p.rightIcon,
    color: p.rightColor,
    pairKey: p.rightId.replace('r_', ''),
  }))), [pairs]);

  const [matchedPairs, setMatchedPairs] = useState<Set<string>>(new Set());
  const [activeDrag, setActiveDrag] = useState<ActiveDrag | null>(null);
  const [hoveredRightKey, setHoveredRightKey] = useState<string | null>(null);
  const [completedLines, setCompletedLines] = useState<{
    pairKey: string;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    color: string;
  }[]>([]);

  // Reset state when question changes
  useEffect(() => {
    setMatchedPairs(new Set());
    setActiveDrag(null);
    setHoveredRightKey(null);
    setCompletedLines([]);
  }, [question.id]);

  // Recalculate line coordinates for matched pairs on layout / resize
  const recalculateLines = useCallback(() => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();

    const newLines = Array.from(matchedPairs).map((pairKey, idx) => {
      const leftEl = leftItemRefs.current.get(pairKey);
      const rightEl = rightItemRefs.current.get(pairKey);
      if (!leftEl || !rightEl) return null;

      const leftRect = leftEl.getBoundingClientRect();
      const rightRect = rightEl.getBoundingClientRect();

      return {
        pairKey,
        x1: leftRect.right - containerRect.left,
        y1: leftRect.top + leftRect.height / 2 - containerRect.top,
        x2: rightRect.left - containerRect.left,
        y2: rightRect.top + rightRect.height / 2 - containerRect.top,
        color: LINE_COLORS[idx % LINE_COLORS.length],
      };
    }).filter(Boolean) as {
      pairKey: string;
      x1: number;
      y1: number;
      x2: number;
      y2: number;
      color: string;
    }[];

    setCompletedLines(newLines);
  }, [matchedPairs]);

  useEffect(() => {
    recalculateLines();
    window.addEventListener('resize', recalculateLines);
    return () => window.removeEventListener('resize', recalculateLines);
  }, [recalculateLines]);

  // Helper to test if a pointer position is inside any right item
  const findHoveredRightKey = (clientX: number, clientY: number): string | null => {
    for (const [key, el] of rightItemRefs.current.entries()) {
      if (matchedPairs.has(key)) continue;
      const rect = el.getBoundingClientRect();
      // Generous hit box for toddlers (+10px padding)
      if (
        clientX >= rect.left - 10 &&
        clientX <= rect.right + 10 &&
        clientY >= rect.top - 10 &&
        clientY <= rect.bottom + 10
      ) {
        return key;
      }
    }
    return null;
  };

  // Start dragging a line from a left item
  const handleDragStart = (e: React.PointerEvent, pairKey: string) => {
    if (matchedPairs.has(pairKey)) return;
    if (!containerRef.current) return;

    audio.playPop();

    const containerRect = containerRef.current.getBoundingClientRect();
    const leftEl = leftItemRefs.current.get(pairKey);
    let startX = e.clientX - containerRect.left;
    let startY = e.clientY - containerRect.top;

    if (leftEl) {
      const leftRect = leftEl.getBoundingClientRect();
      startX = leftRect.right - containerRect.left;
      startY = leftRect.top + leftRect.height / 2 - containerRect.top;
    }

    const currentX = e.clientX - containerRect.left;
    const currentY = e.clientY - containerRect.top;

    setActiveDrag({
      pairKey,
      startX,
      startY,
      currentX,
      currentY,
    });
    setHoveredRightKey(null);

    // Capture pointer to guarantee move & up events
    try {
      (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
    } catch {
      // Ignore if unsupported
    }
  };

  // During pointer move
  const handlePointerMove = (e: React.PointerEvent) => {
    if (!activeDrag || !containerRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const currentX = e.clientX - containerRect.left;
    const currentY = e.clientY - containerRect.top;

    setActiveDrag(prev => prev ? { ...prev, currentX, currentY } : null);

    const hovered = findHoveredRightKey(e.clientX, e.clientY);
    setHoveredRightKey(hovered);
  };

  // When pointer is released
  const handlePointerUp = (e: React.PointerEvent) => {
    if (!activeDrag) return;

    const targetKey = findHoveredRightKey(e.clientX, e.clientY);

    if (targetKey) {
      if (targetKey === activeDrag.pairKey) {
        // Correct match!
        audio.playSnap();
        const updated = new Set(matchedPairs);
        updated.add(targetKey);
        setMatchedPairs(updated);

        // Check if all matched
        if (updated.size === pairs.length) {
          audio.playSuccess();
          setTimeout(() => onAnswer(true), 600);
        }
      } else {
        // Wrong match: feedback
        audio.playError();
      }
    }

    setActiveDrag(null);
    setHoveredRightKey(null);

    try {
      (e.target as HTMLElement).releasePointerCapture?.(e.pointerId);
    } catch {
      // Ignore
    }
  };

  // Touch fallback helpers for older mobile browsers
  const handleTouchStart = (e: React.TouchEvent, pairKey: string) => {
    if (matchedPairs.has(pairKey) || e.touches.length === 0) return;
    if (!containerRef.current) return;

    audio.playPop();

    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    const leftEl = leftItemRefs.current.get(pairKey);
    let startX = touch.clientX - containerRect.left;
    let startY = touch.clientY - containerRect.top;

    if (leftEl) {
      const leftRect = leftEl.getBoundingClientRect();
      startX = leftRect.right - containerRect.left;
      startY = leftRect.top + leftRect.height / 2 - containerRect.top;
    }

    setActiveDrag({
      pairKey,
      startX,
      startY,
      currentX: touch.clientX - containerRect.left,
      currentY: touch.clientY - containerRect.top,
    });
    setHoveredRightKey(null);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!activeDrag || !containerRef.current || e.touches.length === 0) return;

    const touch = e.touches[0];
    const containerRect = containerRef.current.getBoundingClientRect();
    const currentX = touch.clientX - containerRect.left;
    const currentY = touch.clientY - containerRect.top;

    setActiveDrag(prev => prev ? { ...prev, currentX, currentY } : null);

    const hovered = findHoveredRightKey(touch.clientX, touch.clientY);
    setHoveredRightKey(hovered);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!activeDrag) return;

    const touch = e.changedTouches[0];
    const targetKey = touch ? findHoveredRightKey(touch.clientX, touch.clientY) : null;

    if (targetKey) {
      if (targetKey === activeDrag.pairKey) {
        audio.playSnap();
        const updated = new Set(matchedPairs);
        updated.add(targetKey);
        setMatchedPairs(updated);

        if (updated.size === pairs.length) {
          audio.playSuccess();
          setTimeout(() => onAnswer(true), 600);
        }
      } else {
        audio.playError();
      }
    }

    setActiveDrag(null);
    setHoveredRightKey(null);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center p-2 select-none">
      {/* Question Header */}
      <div className="w-full bg-white/95 backdrop-blur-sm rounded-3xl p-4 mb-4 text-center border-4 border-amber-300 shadow-md">
        <h3 className="text-2xl md:text-3xl font-black text-slate-800">
          {question.instruction}
        </h3>
        <div className="inline-flex items-center gap-2 mt-2 bg-amber-100/90 text-amber-900 font-bold px-4 py-1.5 rounded-full text-sm md:text-base border border-amber-300 shadow-sm animate-pulse">
          <span>✍️</span>
          <span>Sentuh titik di kotak kiri dan tarik garisan ke kotak padanan di kanan</span>
        </div>
      </div>

      {/* Main Matching Stage with SVG Connection Layer */}
      <div
        ref={containerRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="relative w-full p-2 touch-none"
        style={{ touchAction: 'none' }}
      >
        {/* SVG Canvas for connecting lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none z-20"
          style={{ overflow: 'visible' }}
        >
          {/* Completed Matched Lines */}
          {completedLines.map(line => {
            const dx = Math.max(30, Math.abs(line.x2 - line.x1) * 0.45);
            const pathData = `M ${line.x1} ${line.y1} C ${line.x1 + dx} ${line.y1}, ${line.x2 - dx} ${line.y2}, ${line.x2} ${line.y2}`;
            return (
              <g key={line.pairKey} className="animate-scale-up">
                {/* Glow underlay */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="12"
                  strokeOpacity="0.25"
                  strokeLinecap="round"
                />
                {/* Main line */}
                <path
                  d={pathData}
                  fill="none"
                  stroke={line.color}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Start connector circle */}
                <circle cx={line.x1} cy={line.y1} r="7" fill={line.color} stroke="#fff" strokeWidth="2.5" />
                {/* End connector circle */}
                <circle cx={line.x2} cy={line.y2} r="7" fill={line.color} stroke="#fff" strokeWidth="2.5" />
              </g>
            );
          })}

          {/* Active Live Dragging Line */}
          {activeDrag && (
            <g>
              {(() => {
                const dx = Math.max(30, Math.abs(activeDrag.currentX - activeDrag.startX) * 0.45);
                const pathData = `M ${activeDrag.startX} ${activeDrag.startY} C ${activeDrag.startX + dx} ${activeDrag.startY}, ${activeDrag.currentX - dx} ${activeDrag.currentY}, ${activeDrag.currentX} ${activeDrag.currentY}`;
                return (
                  <>
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="12"
                      strokeOpacity="0.3"
                      strokeLinecap="round"
                    />
                    <path
                      d={pathData}
                      fill="none"
                      stroke="#F59E0B"
                      strokeWidth="6"
                      strokeDasharray="8 6"
                      strokeLinecap="round"
                      className="animate-pulse"
                    />
                    <circle
                      cx={activeDrag.startX}
                      cy={activeDrag.startY}
                      r="8"
                      fill="#F59E0B"
                      stroke="#fff"
                      strokeWidth="2.5"
                    />
                    <circle
                      cx={activeDrag.currentX}
                      cy={activeDrag.currentY}
                      r="10"
                      fill="#F59E0B"
                      stroke="#fff"
                      strokeWidth="3"
                    />
                  </>
                );
              })()}
            </g>
          )}
        </svg>

        {/* Two Columns Grid */}
        <div className="grid grid-cols-2 gap-8 md:gap-14 w-full relative z-10">
          {/* Left Column (Drag Origins) */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-black text-amber-800 uppercase tracking-widest text-center bg-amber-100/80 py-1 rounded-xl">
              1. Kotak Soalan (Tarik dari sini)
            </span>

            {leftItems.map((item) => {
              const isMatched = matchedPairs.has(item.pairKey);
              const isDraggingThis = activeDrag?.pairKey === item.pairKey;

              return (
                <div
                  key={item.id}
                  ref={el => {
                    if (el) leftItemRefs.current.set(item.pairKey, el);
                    else leftItemRefs.current.delete(item.pairKey);
                  }}
                  onPointerDown={(e) => handleDragStart(e, item.pairKey)}
                  onTouchStart={(e) => handleTouchStart(e, item.pairKey)}
                  className={`relative w-full py-4 px-4 rounded-2xl flex items-center justify-between border-4 transition-all min-h-[82px] cursor-grab active:cursor-grabbing ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-400 opacity-90 shadow-sm'
                      : isDraggingThis
                      ? 'bg-amber-100 border-amber-500 scale-102 shadow-lg ring-4 ring-amber-300'
                      : 'bg-white border-slate-300 hover:border-amber-400 hover:scale-102 active:scale-98 shadow-md'
                  }`}
                >
                  <div className="flex flex-wrap items-center gap-2 pr-6">
                    {item.icon && (
                      <span className="text-2xl md:text-3xl tracking-wider leading-none">
                        {item.icon}
                      </span>
                    )}
                    <span className="text-lg md:text-xl font-black text-slate-800">
                      {item.text}
                    </span>
                  </div>

                  {/* Right Edge Connector Handle */}
                  <div
                    className={`absolute -right-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-transform shadow-md ${
                      isMatched
                        ? 'bg-emerald-500 border-white text-white text-xs'
                        : isDraggingThis
                        ? 'bg-amber-500 border-white scale-125 ring-2 ring-amber-300'
                        : 'bg-amber-400 border-white hover:scale-110'
                    }`}
                  >
                    {isMatched ? '✓' : <span className="w-2.5 h-2.5 bg-white rounded-full"></span>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column (Drop Targets) */}
          <div className="flex flex-col gap-4">
            <span className="text-xs font-black text-blue-800 uppercase tracking-widest text-center bg-blue-100/80 py-1 rounded-xl">
              2. Kotak Jawapan (Sambung ke sini)
            </span>

            {rightItems.map((item) => {
              const isMatched = matchedPairs.has(item.pairKey);
              const isHovered = hoveredRightKey === item.pairKey;

              return (
                <div
                  key={item.id}
                  ref={el => {
                    if (el) rightItemRefs.current.set(item.pairKey, el);
                    else rightItemRefs.current.delete(item.pairKey);
                  }}
                  className={`relative w-full py-4 px-4 rounded-2xl flex items-center justify-between border-4 transition-all min-h-[82px] ${
                    isMatched
                      ? 'bg-emerald-50 border-emerald-400 opacity-90 shadow-sm'
                      : isHovered
                      ? 'bg-amber-100 border-amber-500 scale-105 shadow-xl ring-4 ring-amber-300 animate-pulse'
                      : 'bg-white border-slate-300 shadow-md'
                  }`}
                >
                  {/* Left Edge Connector Receiver */}
                  <div
                    className={`absolute -left-3.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-full flex items-center justify-center border-2 transition-transform shadow-md ${
                      isMatched
                        ? 'bg-emerald-500 border-white text-white text-xs'
                        : isHovered
                        ? 'bg-amber-500 border-white scale-125 ring-2 ring-amber-300'
                        : 'bg-slate-200 border-white'
                    }`}
                  >
                    {isMatched ? '✓' : <span className="w-2 h-2 bg-slate-400 rounded-full"></span>}
                  </div>

                  <div className="flex flex-wrap items-center gap-2 pl-6">
                    {item.icon && (
                      <span className="text-2xl md:text-3xl tracking-wider leading-none">
                        {item.icon}
                      </span>
                    )}
                    <span className="text-lg md:text-xl font-black text-slate-800">
                      {item.text}
                    </span>
                  </div>

                  {isMatched && (
                    <span className="text-lg text-emerald-600 font-bold ml-auto">
                      ✓
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
