import React, { useState, useEffect } from 'react';
import { SILANG_KATA_LEVELS, SilangKataLevel, TargetWord } from '../../data/silangKataData';
import { audio } from '../../services/audioService';

interface SilangKataGameProps {
  onComplete: () => void;
}

export const SilangKataGame: React.FC<SilangKataGameProps> = ({ onComplete }) => {
  const [levelIdx, setLevelIdx] = useState(0);
  const currentLevel: SilangKataLevel = SILANG_KATA_LEVELS[levelIdx % SILANG_KATA_LEVELS.length];

  // List of IDs of words already found
  const [foundWordIds, setFoundWordIds] = useState<string[]>([]);
  // Currently tapped cell sequence: list of { r, c }
  const [selectedCells, setSelectedCells] = useState<{ r: number; c: number }[]>([]);
  // Currently focused target word (optional hint / helper)
  const [activeHintWordId, setActiveHintWordId] = useState<string | null>(null);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  // Reset when level changes
  useEffect(() => {
    setFoundWordIds([]);
    setSelectedCells([]);
    setActiveHintWordId(null);
    setIsLevelComplete(false);
  }, [currentLevel.id]);

  // Check if a cell is in the currently tapped selection
  const isCellSelected = (r: number, c: number) => {
    return selectedCells.some(cell => cell.r === r && cell.c === c);
  };

  // Get all found words that include this cell
  const getFoundWordsForCell = (r: number, c: number): TargetWord[] => {
    return currentLevel.words.filter(
      w => foundWordIds.includes(w.id) && w.cells.some(cell => cell.r === r && cell.c === c)
    );
  };

  // Pronounce word aloud using Speech Synthesis
  const speakWord = (text: string) => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utter = new SpeechSynthesisUtterance(text);
        utter.pitch = 1.4;
        utter.rate = 0.95;
        const voices = window.speechSynthesis.getVoices();
        const msVoice = voices.find(v => v.lang.startsWith('ms') || v.lang.startsWith('id'));
        if (msVoice) utter.voice = msVoice;
        window.speechSynthesis.speak(utter);
      } catch {
        // ignore
      }
    }
  };

  // Check if the current tapped sequence matches any target word
  const checkMatchesWord = (cells: { r: number; c: number }[]) => {
    const letters = cells.map(cell => currentLevel.grid[cell.r][cell.c]).join('');

    for (const w of currentLevel.words) {
      if (foundWordIds.includes(w.id)) continue;

      // Check if letters match the target word forward or if cells match the word's coordinates
      const isLetterMatch = w.word === letters;
      const isCellMatch =
        cells.length === w.cells.length &&
        cells.every((cell, idx) => cell.r === w.cells[idx].r && cell.c === w.cells[idx].c);

      if (isLetterMatch && isCellMatch) {
        // Found!
        audio.playSnap();
        speakWord(w.word);

        setFoundWordIds(prev => {
          const next = [...prev, w.id];
          if (next.length === currentLevel.words.length) {
            setIsLevelComplete(true);
            audio.playSuccess();
          }
          return next;
        });

        setSelectedCells([]);
        setActiveHintWordId(null);
        return true;
      }
    }
    return false;
  };

  // Handle clicking / tapping a letter in the grid
  const handleCellClick = (r: number, c: number) => {
    audio.playPop();

    // If cell already clicked in current sequence, remove it (toggle off)
    const existingIdx = selectedCells.findIndex(cell => cell.r === r && cell.c === c);
    let nextCells: { r: number; c: number }[];

    if (existingIdx !== -1) {
      // Clicked on already selected letter: if it's the last one, remove it
      nextCells = selectedCells.slice(0, existingIdx);
    } else {
      nextCells = [...selectedCells, { r, c }];
    }

    setSelectedCells(nextCells);

    // Check if the new sequence matches any word
    const matched = checkMatchesWord(nextCells);
    if (!matched && nextCells.length >= 6) {
      // Auto-reset if too long without a match
      setTimeout(() => {
        setSelectedCells([]);
      }, 400);
    }
  };

  // Clear current tapped selection
  const handleClearSelection = () => {
    audio.playPop();
    setSelectedCells([]);
  };

  // Clicking on a target word card gives voice pronunciation and visual hint
  const handleWordCardClick = (word: TargetWord) => {
    audio.playPop();
    speakWord(word.word);

    if (foundWordIds.includes(word.id)) {
      // Already found
      return;
    }

    if (activeHintWordId === word.id) {
      // Second tap auto-selects the word cells for the toddler!
      audio.playSnap();
      setSelectedCells(word.cells);
      checkMatchesWord(word.cells);
    } else {
      setActiveHintWordId(word.id);
    }
  };

  // Navigation handlers
  const handleNextLevel = () => {
    audio.playPop();
    setLevelIdx(prev => prev + 1);
  };

  const handlePrevLevel = () => {
    audio.playPop();
    setLevelIdx(prev => (prev > 0 ? prev - 1 : SILANG_KATA_LEVELS.length - 1));
  };

  const currentTappedWord = selectedCells
    .map(cell => currentLevel.grid[cell.r][cell.c])
    .join('');

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col items-center px-1 select-none relative">
      {/* Top Header: Navigation & Level Status */}
      <div className="w-full flex items-center justify-between gap-2 mb-2 bg-white/95 px-3 py-1.5 rounded-2xl border-2 border-indigo-200 shadow-sm">
        <button
          onClick={handlePrevLevel}
          className="py-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs rounded-xl border border-indigo-200 transition-colors"
          title="Soalan Sebelumnya"
        >
          ◀ Sebelum
        </button>

        <div className="flex flex-col items-center">
          <div className="flex items-center gap-1.5">
            <span className="text-[10px] font-black px-2 py-0.5 rounded-full border bg-indigo-100 text-indigo-900 border-indigo-300">
              Silang Kata Bersilang 🔤
            </span>
            <span className="text-xs font-black text-slate-800">
              Tahap {levelIdx + 1} / {SILANG_KATA_LEVELS.length}
            </span>
          </div>
          <span className="text-[11px] font-bold text-slate-500">
            {currentLevel.title}
          </span>
        </div>

        <button
          onClick={handleNextLevel}
          className="py-1 px-2.5 bg-indigo-50 hover:bg-indigo-100 text-indigo-800 font-bold text-xs rounded-xl border border-indigo-200 transition-colors"
          title="Soalan Seterusnya"
        >
          Seterus ▶
        </button>
      </div>

      {/* 5 KOTAK SOALAN PERKATAAN: MENDATAR ➡ & MENEGAK ⬇ */}
      <div className="w-full bg-white/95 backdrop-blur-sm p-2 rounded-2xl border-2 border-indigo-200 shadow-sm mb-2">
        <div className="flex items-center justify-between mb-1.5 px-0.5">
          <span className="text-xs font-black text-indigo-900 flex items-center gap-1">
            <span>🔍</span>
            <span>5 Perkataan Bersilang:</span>
          </span>
          <span className="text-[10px] font-black bg-indigo-100 text-indigo-800 px-2 py-0.5 rounded-full">
            {foundWordIds.length} / {currentLevel.words.length} Selesai
          </span>
        </div>

        {/* 5 Word Badges / Cards with Direction Indicator */}
        <div className="grid grid-cols-5 gap-1">
          {currentLevel.words.map((w) => {
            const isFound = foundWordIds.includes(w.id);
            const isHint = activeHintWordId === w.id;
            const isMendatar = w.direction === 'mendatar';

            return (
              <button
                key={w.id}
                onClick={() => handleWordCardClick(w)}
                className={`py-1 px-0.5 rounded-xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                  isFound
                    ? 'bg-emerald-100 border-emerald-400 text-emerald-950 shadow-sm scale-98'
                    : isHint
                    ? 'bg-amber-100 border-amber-400 ring-2 ring-amber-300 scale-102 animate-pulse'
                    : `${w.color} hover:scale-102`
                }`}
              >
                <span className="text-lg md:text-xl leading-none drop-shadow-xs">
                  {w.icon}
                </span>
                <span className={`text-[10px] md:text-xs font-black tracking-wider leading-tight ${isFound ? 'line-through text-emerald-800' : ''}`}>
                  {w.word}
                </span>

                {/* Petunjuk Arah Bersilang: Mendatar ➡ atau Menegak ⬇ */}
                <span
                  className={`text-[7px] md:text-[8px] font-bold px-1 py-0.2 rounded-full mt-0.5 leading-none ${
                    isFound
                      ? 'bg-emerald-200 text-emerald-800'
                      : isMendatar
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-amber-100 text-amber-800'
                  }`}
                >
                  {isFound ? '✓' : isMendatar ? '➡ M' : '⬇ T'}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* SATU KOTAK SOALAN PENUH DENGAN HURUF BERSILANG */}
      <div className="w-full flex flex-col items-center">
        {/* Preview huruf yang sedang ditekan */}
        <div className="w-full max-w-[390px] md:max-w-[430px] flex items-center justify-between px-2 mb-1.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Huruf ditekan:</span>
            <span className="text-sm font-black text-indigo-900 bg-white px-3 py-0.5 rounded-xl border-2 border-indigo-200 tracking-widest min-w-[70px] text-center shadow-xs">
              {currentTappedWord || '...'}
            </span>
          </div>
          {selectedCells.length > 0 && (
            <button
              onClick={handleClearSelection}
              className="text-xs font-bold text-rose-600 hover:text-rose-800 bg-rose-50 hover:bg-rose-100 px-2.5 py-0.5 rounded-lg border border-rose-200 transition-colors"
            >
              Padam ✕
            </button>
          )}
        </div>

        {/* Kotak Soalan Huruf Utama - Dibesarkan dan luas agar setiap kotak huruf kemas & tiada yang terkeluar */}
        <div
          className={`w-full max-w-[390px] md:max-w-[430px] rounded-3xl p-3 md:p-4 border-4 relative transition-all bg-gradient-to-b from-indigo-50/95 via-sky-50/90 to-purple-50/95 shadow-xl ${
            isLevelComplete
              ? 'border-emerald-400 ring-4 md:ring-8 ring-emerald-200 bg-emerald-50'
              : 'border-indigo-300'
          }`}
        >
          {/* Grid 6x6 Huruf Besar Bersilang - Susunan 6 baris x 6 lajur kemas dengan saiz yang seimbang */}
          <div className="w-full flex flex-col gap-1.5 md:gap-2">
            {currentLevel.grid.map((row, rIdx) => (
              <div key={`row-${rIdx}`} className="w-full flex gap-1.5 md:gap-2 justify-center">
                {row.map((letter, cIdx) => {
                  const isSelected = isCellSelected(rIdx, cIdx);
                  const foundWords = getFoundWordsForCell(rIdx, cIdx);
                  const isFound = foundWords.length > 0;
                  const isIntersection = foundWords.length > 1;

                  // Is part of active hint word
                  const activeWord = currentLevel.words.find(w => w.id === activeHintWordId);
                  const isHintCell = activeWord?.cells.some(cell => cell.r === rIdx && cell.c === cIdx);
                  const isHintStart = activeWord?.cells[0].r === rIdx && activeWord?.cells[0].c === cIdx;

                  return (
                    <button
                      key={`cell-${rIdx}-${cIdx}`}
                      onClick={() => handleCellClick(rIdx, cIdx)}
                      className={`flex-1 aspect-square max-w-[56px] rounded-xl md:rounded-2xl font-black text-base sm:text-lg md:text-xl flex items-center justify-center transition-all select-none relative shadow-sm border-2 ${
                        isIntersection
                          ? 'bg-gradient-to-br from-amber-400 to-emerald-400 text-white border-amber-500 ring-2 ring-white shadow-md'
                          : isFound
                          ? `${foundWords[0].highlightBg} ring-2 ring-white`
                          : isSelected
                          ? 'bg-amber-400 text-amber-950 border-amber-500 ring-2 ring-amber-300 shadow-md animate-pulse z-20'
                          : isHintCell
                          ? 'bg-amber-100 text-amber-950 border-amber-400 ring-2 ring-amber-300 animate-wiggle'
                          : 'bg-white text-slate-800 border-indigo-200 hover:border-indigo-400 hover:bg-indigo-50/80 active:scale-95'
                      }`}
                    >
                      <span className="leading-none select-none">{letter}</span>

                      {/* Simbol Persilangan jika huruf dikongsi oleh 2 perkataan */}
                      {isIntersection ? (
                        <span className="absolute -top-1 -right-1 text-[9px] leading-none z-10" title="Huruf Bersilang!">
                          ✨
                        </span>
                      ) : isFound ? (
                        <span className="absolute -top-1 -right-1 text-[8px] leading-none">
                          ⭐
                        </span>
                      ) : isHintStart ? (
                        <span className="absolute -top-1 -left-1 text-[9px] leading-none animate-bounce">
                          {activeWord?.direction === 'mendatar' ? '👉' : '👇'}
                        </span>
                      ) : null}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Victory Celebration Overlay bila semua 5 perkataan dijumpai */}
          {isLevelComplete && (
            <div className="absolute inset-0 bg-emerald-500/20 backdrop-blur-[2px] flex flex-col items-center justify-center z-30 animate-scale-up rounded-3xl p-4 text-center">
              <span className="text-5xl md:text-6xl animate-bounce">🎉</span>
              <span className="text-sm md:text-base font-black text-emerald-950 bg-white/95 px-4 py-1.5 rounded-full shadow-lg mt-2 border border-emerald-300">
                Tahniah! Semua 5 Perkataan Selesai! ✨
              </span>
            </div>
          )}
        </div>

        {/* Panduan & Butang Seterusnya */}
        {isLevelComplete ? (
          <div className="w-full max-w-[390px] md:max-w-[430px] mt-3 flex items-center justify-center gap-3">
            <button
              onClick={handleNextLevel}
              className="py-2.5 px-5 bg-gradient-to-r from-emerald-400 via-teal-400 to-emerald-500 text-white font-black text-sm rounded-2xl shadow-md hover:scale-105 active:scale-95 transition-all btn-3d"
            >
              Tahap Seterusnya ➔
            </button>
            <button
              onClick={onComplete}
              className="py-2.5 px-4 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-sm rounded-2xl shadow-sm transition-all"
            >
              Selesai 🏆
            </button>
          </div>
        ) : (
          <p className="text-xs text-indigo-800 font-bold text-center mt-2.5">
            👉 Tekan huruf-huruf mengikut perkataan Mendatar ➡ atau Menegak ⬇!
          </p>
        )}
      </div>
    </div>
  );
};
