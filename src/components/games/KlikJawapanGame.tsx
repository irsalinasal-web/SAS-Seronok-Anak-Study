import React, { useState } from 'react';
import { QuestionData } from '../../types';
import { audio } from '../../services/audioService';

interface KlikJawapanGameProps {
  question: QuestionData;
  onAnswer: (isCorrect: boolean) => void;
}

const CARTOON_SOUND_TEXTS: Record<string, string> = {
  kucing: '🎶 Meoow! Mee-oooww! 🐱',
  lembu: '🎶 Mooo-Moo! 🐮',
  itik: '🎶 Kuek! Kuek! Kuek! 🦆',
  ayam: '🎶 Kok-kok-BA-GOK! 🐔',
  singa: '🎶 Grrr-ROAAAR! 🦁',
  harimau: '🎶 Grrr-ROAAAR! 🐯',
  gajah: '🎶 Tuut-tuut-PAWOOO! 🐘',
  burung: '🎶 Ciap-ciap-ciap! 🐦',
  katak: '🎶 Boing! Kwaaak-ribbit! 🐸',
  kuda: '🎶 Hi-hi-hi-Neigh! 🐴',
  monyet: '🎶 Uu-uu-aa-aa! 🐒',
  arnab: '🎶 Boing-boing-cicit! 🐰',
  ikan: '🎶 Blub-blub-pop! 🐟',
};

export const KlikJawapanGame: React.FC<KlikJawapanGameProps> = ({ question, onAnswer }) => {
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isPlayingSound, setIsPlayingSound] = useState(false);

  const triggerCartoonSound = (animalId: string) => {
    setIsPlayingSound(true);
    audio.playAnimalSound(animalId);
    setTimeout(() => {
      setIsPlayingSound(false);
    }, 1100);
  };

  React.useEffect(() => {
    setSelectedOptionId(null);
    if (question.soundAnimalId) {
      const timer = setTimeout(() => {
        triggerCartoonSound(question.soundAnimalId!);
      }, 400);
      return () => clearTimeout(timer);
    }
  }, [question.id, question.soundAnimalId]);

  const handleSelect = (optionId: string, isCorrect?: boolean) => {
    setSelectedOptionId(optionId);
    audio.playPop();

    if (isCorrect) {
      audio.playSuccess();
      onAnswer(true);
    } else {
      audio.playError();
      onAnswer(false);
    }
  };

  const cartoonSoundText = question.soundAnimalId
    ? CARTOON_SOUND_TEXTS[question.soundAnimalId.toLowerCase()] || '🎶 Bunyi Haiwan Comel! 🐾'
    : null;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center justify-center p-2">
      {/* Target Question / Object Spotlight */}
      <div className="w-full bg-white/90 backdrop-blur-sm rounded-3xl p-5 mb-6 text-center border-4 border-amber-200 shadow-md">
        <h3 className="text-2xl md:text-3xl font-black text-slate-800">
          {question.instruction}
        </h3>
        {question.subInstruction && (
          <p className="text-xl md:text-2xl font-bold text-amber-600 mt-2 bg-amber-50/80 py-2 px-4 rounded-2xl inline-block border border-amber-100">
            {question.subInstruction}
          </p>
        )}
        {question.targetIcon && (
          <div className="text-4xl sm:text-5xl md:text-6xl mt-3 animate-soft-bounce tracking-wider text-center flex flex-wrap justify-center gap-2 py-2">
            {question.targetIcon}
          </div>
        )}

        {/* Animal Sound Audio Button (Playful YouTube cartoon-style sound effect) */}
        {question.soundAnimalId && (
          <div className="mt-4 flex flex-col items-center justify-center">
            {/* Cartoon sound text bubble like in YouTube kids animation */}
            <div className={`mb-2 py-2 px-5 rounded-full border-2 transition-all flex items-center gap-2 ${
              isPlayingSound
                ? 'bg-amber-400 border-amber-600 text-amber-950 scale-110 shadow-lg ring-4 ring-amber-300 animate-wiggle'
                : 'bg-amber-100 border-amber-300 text-amber-900 shadow-sm'
            }`}>
              <span className="text-xl">✨</span>
              <span className="text-base md:text-lg font-black tracking-wide">
                {cartoonSoundText}
              </span>
              <span className="text-xl">✨</span>
            </div>

            <button
              onClick={() => {
                triggerCartoonSound(question.soundAnimalId!);
              }}
              className={`py-3 px-6 rounded-2xl font-black transition-all flex items-center gap-3 border-3 shadow-lg btn-3d ${
                isPlayingSound
                  ? 'bg-amber-500 border-amber-700 text-white scale-105 ring-4 ring-amber-300'
                  : 'bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500 border-amber-400 text-amber-950 hover:scale-105 active:scale-95'
              }`}
            >
              <span className={`text-3xl ${isPlayingSound ? 'animate-bounce' : ''}`}>
                {isPlayingSound ? '📢' : '🔊'}
              </span>
              <span className="text-base md:text-lg">
                {isPlayingSound ? 'Tengah Berbunyi... 🎶' : 'Tekan Untuk Dengar Bunyi Kartun!'}
              </span>
            </button>
            <span className="text-xs text-amber-800 font-bold mt-1.5">
              Tekan butang di atas bila-bila masa untuk dengar bunyi kartun semula
            </span>
          </div>
        )}
      </div>

      {/* Options Grid */}
      <div className={`grid w-full gap-4 ${
        (question.options?.length || 0) <= 2
          ? 'grid-cols-2'
          : (question.options?.length || 0) === 3
          ? 'grid-cols-1 sm:grid-cols-3'
          : 'grid-cols-2 md:grid-cols-4'
      }`}>
        {question.options?.map((option) => {
          return (
            <button
              key={option.id}
              onClick={() => handleSelect(option.id, option.isCorrect)}
              className="flex flex-col items-center justify-center p-4 sm:p-5 bg-white rounded-3xl border-4 border-slate-200 hover:border-amber-400 active:scale-95 shadow-md btn-3d btn-3d-white min-h-[140px] md:min-h-[160px] transition-all group"
            >
              {option.icon && (
                <span className="text-3xl sm:text-4xl md:text-5xl mb-2 group-hover:scale-110 transition-transform tracking-wider text-center leading-relaxed">
                  {option.icon}
                </span>
              )}
              <span className="text-2xl md:text-3xl font-black text-slate-800 tracking-wide">
                {option.label}
              </span>
              {option.subLabel && (
                <span className="text-xs md:text-sm font-semibold text-slate-500 mt-1">
                  {option.subLabel}
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
