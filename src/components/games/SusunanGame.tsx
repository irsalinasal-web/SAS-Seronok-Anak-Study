import React, { useState } from 'react';
import { QuestionData, SusunItem } from '../../types';
import { audio } from '../../services/audioService';
import { shuffleArray } from '../../services/questionGenerator';

interface SusunanGameProps {
  question: QuestionData;
  onAnswer: (isCorrect: boolean) => void;
}

export const SusunanGame: React.FC<SusunanGameProps> = ({ question, onAnswer }) => {
  const targetItems = question.susunItems || [];
  
  // Shuffled items in tray initially
  const [trayItems, setTrayItems] = useState<SusunItem[]>(() => shuffleArray(targetItems));
  const [arrangedSlots, setArrangedSlots] = useState<(SusunItem | null)[]>(
    () => Array(targetItems.length).fill(null)
  );

  // Sync state whenever the question changes
  React.useEffect(() => {
    setTrayItems(shuffleArray(targetItems));
    setArrangedSlots(Array(targetItems.length).fill(null));
  }, [question.id]);

  const handlePickFromTray = (item: SusunItem) => {
    audio.playPop();
    // Find first empty slot
    const emptyIndex = arrangedSlots.findIndex(s => s === null);
    if (emptyIndex === -1) return;

    const newSlots = [...arrangedSlots];
    newSlots[emptyIndex] = item;
    setArrangedSlots(newSlots);

    // Remove from tray
    setTrayItems(prev => prev.filter(t => t.id !== item.id));

    // Check if full
    if (newSlots.every(s => s !== null)) {
      checkArrangement(newSlots as SusunItem[]);
    }
  };

  const handleRemoveFromSlot = (slotIndex: number) => {
    const item = arrangedSlots[slotIndex];
    if (!item) return;

    audio.playPop();
    const newSlots = [...arrangedSlots];
    newSlots[slotIndex] = null;
    setArrangedSlots(newSlots);
    setTrayItems(prev => [...prev, item]);
  };

  const checkArrangement = (slots: SusunItem[]) => {
    // Check if each item is in ascending order
    const isCorrect = slots.every((item, idx) => item.order === idx);

    if (isCorrect) {
      audio.playSuccess();
      setTimeout(() => onAnswer(true), 400);
    } else {
      audio.playError();
      setTimeout(() => onAnswer(false), 400);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center p-2">
      {/* Question Header */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-4 mb-6 text-center border-4 border-amber-200 shadow-md">
        <h3 className="text-2xl md:text-3xl font-black text-slate-800">
          {question.instruction}
        </h3>
        <p className="text-sm md:text-base font-semibold text-slate-500 mt-1">
          {question.subInstruction || 'Klik kad untuk menyusunnya ke dalam petak mengikut urutan yang betul.'}
        </p>
      </div>

      {/* Target Slots Bar */}
      <div className="flex flex-wrap items-center justify-center gap-3 w-full mb-8 p-4 bg-white/70 rounded-3xl border-4 border-dashed border-amber-300 min-h-[120px]">
        {arrangedSlots.map((item, idx) => (
          <div
            key={idx}
            onClick={() => handleRemoveFromSlot(idx)}
            className={`w-20 h-24 md:w-28 md:h-32 rounded-2xl border-4 flex flex-col items-center justify-center cursor-pointer transition-all ${
              item
                ? 'bg-amber-100 border-amber-400 shadow-md scale-100 animate-scale-up'
                : 'bg-amber-50/50 border-amber-200'
            }`}
          >
            {item ? (
              <div className="flex flex-col items-center">
                {item.icon && <span className="text-3xl">{item.icon}</span>}
                <span className="text-2xl md:text-3xl font-black text-slate-800 mt-1">
                  {item.label}
                </span>
                <span className="text-[10px] text-amber-700 font-bold">Tekan batal</span>
              </div>
            ) : (
              <div className="flex flex-col items-center text-slate-400">
                <span className="text-xl font-bold">#{idx + 1}</span>
                <span className="text-xs">Kosong</span>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Tray of remaining items to pick */}
      <div className="w-full bg-amber-200/60 p-4 rounded-3xl border-2 border-amber-300">
        <p className="text-xs font-bold text-amber-900 text-center mb-3">
          {trayItems.length > 0 ? 'Pilih kad di bawah untuk dimasukkan:' : 'Semua petak telah diisi!'}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 min-h-[80px]">
          {trayItems.map((item) => (
            <button
              key={item.id}
              onClick={() => handlePickFromTray(item)}
              className="py-3 px-6 bg-white border-b-4 border-slate-300 rounded-2xl flex items-center gap-3 shadow-md hover:border-amber-400 hover:scale-105 active:scale-95 transition-all btn-3d"
            >
              {item.icon && <span className="text-3xl">{item.icon}</span>}
              <span className="text-2xl font-black text-slate-800">
                {item.label}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
