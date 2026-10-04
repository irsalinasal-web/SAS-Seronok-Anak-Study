import React, { useEffect } from 'react';
import { audio } from '../services/audioService';
import { fireVictoryConfetti } from './ConfettiCelebration';

interface ResultModalProps {
  isOpen: boolean;
  totalQuestions: number;
  correctAnswers: number;
  totalScore: number;
  maxCombo: number;
  onReplay: () => void;
  onHome: () => void;
  onNextCategory: () => void;
}

export const ResultModal: React.FC<ResultModalProps> = ({
  isOpen,
  totalQuestions,
  correctAnswers,
  totalScore,
  maxCombo,
  onReplay,
  onHome,
  onNextCategory,
}) => {
  useEffect(() => {
    if (isOpen) {
      audio.playFanfare();
      fireVictoryConfetti();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const percentage = Math.round((correctAnswers / Math.max(totalQuestions, 1)) * 100);

  // Stars per prompt:
  // 90-100% ⭐⭐⭐
  // 70-89% ⭐⭐
  // 50-69% ⭐
  let starCount = 1;
  let praiseText = 'Bagus! Teruskan Berusaha!';
  if (percentage >= 90) {
    starCount = 3;
    praiseText = 'Luar Biasa! Cemerlang Sekali! 🌟';
  } else if (percentage >= 70) {
    starCount = 2;
    praiseText = 'Hebat! Sangat Pandai! 🎉';
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 text-slate-800 text-center shadow-2xl border-4 border-amber-300">
        {/* Star Badge */}
        <div className="flex justify-center items-center gap-3 my-2">
          {[1, 2, 3].map((starIdx) => (
            <div
              key={starIdx}
              className={`text-5xl transform transition-transform duration-500 ${
                starIdx <= starCount
                  ? 'scale-110 text-amber-400 drop-shadow-md animate-bounce'
                  : 'scale-90 text-slate-200 opacity-60'
              }`}
            >
              ⭐
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-black text-amber-500 mt-2">
          Aktiviti Selesai!
        </h2>
        <p className="text-lg font-bold text-slate-600 mt-1">
          {praiseText}
        </p>

        {/* Score & Stats Card */}
        <div className="grid grid-cols-2 gap-3 my-5 bg-amber-50 p-4 rounded-2xl border border-amber-200">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-amber-100">
            <span className="text-xs text-slate-500 font-semibold block">Ketepatan</span>
            <span className="text-2xl font-black text-emerald-600">{percentage}%</span>
            <span className="text-xs text-slate-400 block">({correctAnswers}/{totalQuestions} Soalan)</span>
          </div>

          <div className="bg-white p-3 rounded-xl shadow-sm border border-amber-100">
            <span className="text-xs text-slate-500 font-semibold block">Jumlah Markah</span>
            <span className="text-2xl font-black text-amber-600">+{totalScore}</span>
            <span className="text-xs text-slate-400 block">Kombo Tertinggi: {maxCombo}x</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5">
          <button
            onClick={() => {
              audio.playPop();
              onReplay();
            }}
            className="w-full py-3.5 text-lg font-black text-amber-950 btn-3d btn-3d-amber rounded-2xl"
          >
            🔄 Main Sekali Lagi
          </button>

          <button
            onClick={() => {
              audio.playPop();
              onNextCategory();
            }}
            className="w-full py-3.5 text-lg font-black text-emerald-950 btn-3d btn-3d-emerald rounded-2xl"
          >
            🎯 Kategori Lain
          </button>

          <button
            onClick={() => {
              audio.playPop();
              onHome();
            }}
            className="w-full py-3 text-base font-bold text-slate-600 hover:text-slate-800 transition-colors"
          >
            🏠 Kembali ke Halaman Utama
          </button>
        </div>
      </div>
    </div>
  );
};
