import React, { useState, useEffect } from 'react';
import { QuestionData, MemoryCard } from '../../types';
import { audio } from '../../services/audioService';

interface MemoryGameProps {
  question: QuestionData;
  onAnswer: (isCorrect: boolean) => void;
}

export const MemoryGame: React.FC<MemoryGameProps> = ({ question, onAnswer }) => {
  const cards = question.memoryCards || [];

  const [flippedIds, setFlippedIds] = useState<string[]>([]);
  const [matchedKeys, setMatchedKeys] = useState<Set<string>>(new Set());
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    setFlippedIds([]);
    setMatchedKeys(new Set());
    setIsProcessing(false);
  }, [question.id]);

  const totalPairs = cards.length / 2;

  const handleCardClick = (card: MemoryCard) => {
    if (isProcessing) return;
    if (matchedKeys.has(card.pairKey)) return;
    if (flippedIds.includes(card.id)) return;

    audio.playPop();
    const newFlipped = [...flippedIds, card.id];
    setFlippedIds(newFlipped);

    if (newFlipped.length === 2) {
      setIsProcessing(true);
      const card1 = cards.find(c => c.id === newFlipped[0]);
      const card2 = cards.find(c => c.id === newFlipped[1]);

      if (card1 && card2 && card1.pairKey === card2.pairKey) {
        // MATCH!
        audio.playSnap();
        const updated = new Set(matchedKeys);
        updated.add(card1.pairKey);
        setMatchedKeys(updated);
        setFlippedIds([]);
        setIsProcessing(false);

        // Check victory
        if (updated.size === totalPairs) {
          audio.playSuccess();
          setTimeout(() => onAnswer(true), 500);
        }
      } else {
        // NO MATCH
        audio.playError();
        setTimeout(() => {
          setFlippedIds([]);
          setIsProcessing(false);
        }, 900);
      }
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center p-2">
      {/* Question Header */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-4 mb-5 text-center border-4 border-amber-200 shadow-md">
        <h3 className="text-2xl md:text-3xl font-black text-slate-800">
          {question.instruction}
        </h3>
        <p className="text-sm md:text-base font-semibold text-slate-500 mt-1">
          {question.subInstruction || `Padankan ${totalPairs} pasangan kad yang sama.`}
        </p>
        <div className="mt-2 text-xs font-bold text-emerald-600 bg-emerald-50 py-1 px-3 rounded-full inline-block">
          Dipadankan: {matchedKeys.size} / {totalPairs} Pasangan
        </div>
      </div>

      {/* Memory Grid */}
      <div className={`grid gap-3 w-full ${
        cards.length <= 4
          ? 'grid-cols-2 max-w-sm'
          : cards.length <= 8
          ? 'grid-cols-3 md:grid-cols-4'
          : 'grid-cols-3 md:grid-cols-4'
      }`}>
        {cards.map((card) => {
          const isMatched = matchedKeys.has(card.pairKey);
          const isFlipped = isMatched || flippedIds.includes(card.id);

          return (
            <button
              key={card.id}
              disabled={isMatched || isProcessing}
              onClick={() => handleCardClick(card)}
              className={`h-28 md:h-36 rounded-3xl border-4 transition-all duration-300 flex flex-col items-center justify-center p-2 cursor-pointer shadow-md select-none ${
                isMatched
                  ? 'bg-emerald-100 border-emerald-400 scale-95 opacity-80'
                  : isFlipped
                  ? 'bg-amber-100 border-amber-400 rotate-0 scale-100'
                  : 'bg-gradient-to-br from-sky-400 to-blue-500 border-white hover:scale-105 active:scale-95'
              }`}
            >
              {isFlipped ? (
                <div className="flex flex-col items-center animate-scale-up">
                  {card.icon && <span className="text-4xl md:text-5xl">{card.icon}</span>}
                  <span className="text-lg md:text-xl font-black text-slate-800 mt-1">
                    {card.label}
                  </span>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center text-white">
                  <span className="text-3xl md:text-4xl">❓</span>
                  <span className="text-xs font-bold mt-1 text-sky-100">S.A.S</span>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
