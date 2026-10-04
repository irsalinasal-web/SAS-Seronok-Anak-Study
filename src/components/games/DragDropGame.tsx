import React, { useState } from 'react';
import { QuestionData, DragItem, DropSlot } from '../../types';
import { audio } from '../../services/audioService';

interface DragDropGameProps {
  question: QuestionData;
  onAnswer: (isCorrect: boolean) => void;
}

export const DragDropGame: React.FC<DragDropGameProps> = ({ question, onAnswer }) => {
  const [placedItems, setPlacedItems] = useState<Record<string, DragItem>>({}); // slotId -> DragItem
  const [selectedDragItem, setSelectedDragItem] = useState<DragItem | null>(null);

  const dropSlots = question.dropSlots || [];
  const dragItems = question.dragItems || [];

  React.useEffect(() => {
    setPlacedItems({});
    setSelectedDragItem(null);
  }, [question.id]);

  // Items remaining in the tray
  const placedItemIds = new Set(Object.values(placedItems).map(item => item.id));
  const remainingTrayItems = dragItems.filter(item => !placedItemIds.has(item.id));

  const checkCompletion = (currentPlaced: Record<string, DragItem>) => {
    if (Object.keys(currentPlaced).length === dropSlots.length) {
      // Check if all slots match
      const allCorrect = dropSlots.every(slot => {
        const item = currentPlaced[slot.id];
        return item && item.matchTargetId === slot.id;
      });

      if (allCorrect) {
        audio.playSuccess();
        setTimeout(() => onAnswer(true), 400);
      } else {
        audio.playError();
        setTimeout(() => onAnswer(false), 400);
      }
    }
  };

  // Click-to-place helper (touch friendly)
  const handleItemClick = (item: DragItem) => {
    audio.playPop();
    setSelectedDragItem(item);
  };

  const handleSlotClick = (slot: DropSlot) => {
    if (selectedDragItem) {
      // Attempt to drop into slot
      if (selectedDragItem.matchTargetId === slot.id) {
        audio.playSnap();
        const nextPlaced = { ...placedItems, [slot.id]: selectedDragItem };
        setPlacedItems(nextPlaced);
        setSelectedDragItem(null);
        checkCompletion(nextPlaced);
      } else {
        // Wrong slot
        audio.playError();
        setSelectedDragItem(null);
      }
    }
  };

  // Drag and Drop native events
  const handleDragStart = (e: React.DragEvent, item: DragItem) => {
    e.dataTransfer.setData('text/plain', item.id);
    setSelectedDragItem(item);
  };

  const handleDrop = (e: React.DragEvent, slot: DropSlot) => {
    e.preventDefault();
    const itemId = e.dataTransfer.getData('text/plain');
    const item = dragItems.find(i => i.id === itemId) || selectedDragItem;

    if (item) {
      if (item.matchTargetId === slot.id) {
        audio.playSnap();
        const nextPlaced = { ...placedItems, [slot.id]: item };
        setPlacedItems(nextPlaced);
        setSelectedDragItem(null);
        checkCompletion(nextPlaced);
      } else {
        audio.playError();
      }
    }
  };

  const isFaintPuzzleMode = dropSlots.some(s => s.faintImage || s.hideLabel);

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center p-2">
      {/* Question Header - Hidden in faint puzzle mode for pure visual experience */}
      {!isFaintPuzzleMode && (
        <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-4 mb-6 text-center border-4 border-amber-200 shadow-md">
          <h3 className="text-2xl md:text-3xl font-black text-slate-800">
            {question.instruction}
          </h3>
          <p className="text-sm md:text-base font-semibold text-slate-500 mt-1">
            {question.subInstruction || 'Tarik atau klik kad jawapan ke kotak yang sesuai.'}
          </p>
        </div>
      )}

      {/* Drop Slots (Target Boxes) */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 w-full mb-8">
        {dropSlots.map((slot) => {
          const placed = placedItems[slot.id];
          return (
            <div
              key={slot.id}
              onClick={() => handleSlotClick(slot)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => handleDrop(e, slot)}
              className={`min-h-[140px] md:min-h-[160px] rounded-3xl border-4 flex flex-col items-center justify-center p-4 transition-all cursor-pointer ${
                placed
                  ? 'bg-emerald-50 border-emerald-400 shadow-md scale-100'
                  : selectedDragItem
                  ? 'bg-amber-50/80 border-dashed border-amber-400 hover:scale-105 animate-pulse'
                  : 'bg-white/80 border-dashed border-slate-300'
              }`}
            >
              {placed ? (
                <div className="flex flex-col items-center animate-scale-up text-center">
                  <span className="text-3xl md:text-5xl tracking-wider text-center mb-1">{placed.icon || '✨'}</span>
                  {placed.label && (
                    <span className="text-xl md:text-2xl font-black text-emerald-800">
                      {placed.label}
                    </span>
                  )}
                  <span className="text-xs text-emerald-600 font-black mt-0.5 bg-emerald-100 px-2 py-0.5 rounded-full">✓ Tepat!</span>
                </div>
              ) : (
                <div className="flex flex-col items-center text-center justify-center w-full h-full p-2">
                  {slot.faintImage || (slot.hideLabel && slot.icon) ? (
                    // GAMBAR SAMAR SAHAJA TANPA PERKATAAN UNTUK 2-3 TAHUN
                    <div className="flex flex-col items-center justify-center">
                      <span className="text-4xl md:text-5xl tracking-wider opacity-30 filter grayscale-[30%] blur-[0.2px] select-none animate-pulse">
                        {slot.faintImage || slot.icon}
                      </span>
                    </div>
                  ) : (
                    <>
                      {slot.icon ? (
                        <span className="text-4xl md:text-5xl mb-1.5 animate-soft-bounce">
                          {slot.icon}
                        </span>
                      ) : (
                        <span className="text-3xl text-slate-300 mb-1">📥</span>
                      )}
                      {slot.label && (
                        <span className="text-lg md:text-xl font-black text-slate-700">
                          {slot.label}
                        </span>
                      )}
                      {slot.placeholder && (
                        <span className="text-xs text-slate-400 mt-1">
                          {slot.placeholder}
                        </span>
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Drag Items Tray */}
      <div className="w-full bg-amber-100/80 backdrop-blur-sm p-4 rounded-3xl border-2 border-amber-300">
        {!isFaintPuzzleMode && (
          <p className="text-xs font-bold text-amber-800 text-center mb-3">
            {selectedDragItem
              ? `👉 Klik kotak sasaran untuk meletakkan jawapan`
              : 'Pilihan Jawapan (Tarik atau Klik kad):'}
          </p>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4 min-h-[90px]">
          {remainingTrayItems.length === 0 ? (
            <p className="text-emerald-700 font-bold text-lg animate-bounce">
              Semua kad telah dimasukkan! 🎉
            </p>
          ) : (
            remainingTrayItems.map((item) => (
              <div
                key={item.id}
                draggable
                onDragStart={(e) => handleDragStart(e, item)}
                onClick={() => handleItemClick(item)}
                className={`py-3 px-6 rounded-2xl flex items-center gap-3 cursor-grab active:cursor-grabbing border-b-4 shadow-md transition-all select-none ${
                  selectedDragItem?.id === item.id
                    ? 'bg-amber-400 border-amber-600 scale-105 ring-4 ring-amber-300 animate-wiggle'
                    : 'bg-white border-slate-300 hover:border-amber-400 hover:scale-105'
                }`}
              >
                {item.icon && <span className="text-3xl sm:text-4xl tracking-wider leading-none">{item.icon}</span>}
                {item.label && (
                  <span className="text-lg md:text-xl font-black text-slate-800">
                    {item.label}
                  </span>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
