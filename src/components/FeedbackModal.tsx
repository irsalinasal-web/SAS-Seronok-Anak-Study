import React from 'react';
import { audio } from '../services/audioService';

interface FeedbackModalProps {
  isOpen: boolean;
  isCorrect: boolean;
  scoreGained?: number;
  comboCount?: number;
  onRetry: () => void;
  onContinue: () => void;
}

export const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  isCorrect,
  scoreGained = 10,
  comboCount = 0,
  onRetry,
  onContinue,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      {isCorrect ? (
        /* POPUP HIJAU - TAHNIAH! PANDAI! */
        <div className="w-full max-w-sm bg-gradient-to-b from-emerald-400 to-teal-500 rounded-3xl p-6 text-white text-center shadow-2xl border-4 border-white transform scale-100 animate-scale-up">
          <div className="w-24 h-24 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center text-5xl shadow-inner animate-soft-bounce">
            🎉
          </div>

          <h2 className="text-3xl font-black tracking-wide text-white drop-shadow-md">
            Tahniah!
          </h2>
          <p className="text-xl font-bold text-amber-200 mt-1 mb-3">
            Pandai! ✨
          </p>

          <div className="bg-emerald-600/50 rounded-2xl p-3 mb-5 border border-emerald-300/40">
            <p className="text-sm font-medium text-emerald-100">
              Markah ditambah:
            </p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <span className="text-2xl font-black text-amber-300">+{scoreGained} Markah</span>
              {comboCount >= 2 && (
                <span className="bg-amber-400 text-amber-950 text-xs px-2 py-0.5 rounded-full font-bold animate-pulse">
                  🔥 Kombo {comboCount}x (+5 Bonus)
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => {
              audio.playPop();
              onContinue();
            }}
            className="w-full py-4 text-xl font-black text-emerald-900 bg-white rounded-2xl shadow-lg border-b-4 border-slate-300 active:border-b-0 active:translate-y-1 transition-all btn-3d"
          >
            Teruskan ▶
          </button>
        </div>
      ) : (
        /* POPUP MERAH - CUBA LAGI */
        <div className="w-full max-w-sm bg-gradient-to-b from-rose-400 to-red-500 rounded-3xl p-6 text-white text-center shadow-2xl border-4 border-white transform scale-100 animate-scale-up">
          <div className="w-24 h-24 mx-auto mb-3 bg-white/20 rounded-full flex items-center justify-center text-5xl shadow-inner animate-wiggle">
            😊
          </div>

          <h2 className="text-3xl font-black tracking-wide text-white drop-shadow-md">
            Cuba Lagi
          </h2>
          <p className="text-lg font-semibold text-rose-100 mt-2 mb-6">
            Jawapan belum tepat. Adik pasti boleh buat! 💪
          </p>

          <button
            onClick={() => {
              audio.playPop();
              onRetry();
            }}
            className="w-full py-4 text-xl font-black text-rose-900 bg-white rounded-2xl shadow-lg border-b-4 border-slate-300 active:border-b-0 active:translate-y-1 transition-all btn-3d"
          >
            🔄 Cuba Lagi
          </button>
        </div>
      )}
    </div>
  );
};
