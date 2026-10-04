import React from 'react';
import { audio } from '../../services/audioService';
import { UserProgress } from '../../types';
import { INITIAL_ACHIEVEMENTS } from '../../data/kspkData';

interface AchievementsModalProps {
  isOpen: boolean;
  userProgress: UserProgress;
  onClose: () => void;
  onClaimAchievement: (achievementId: string, coins: number) => void;
}

export const AchievementsModal: React.FC<AchievementsModalProps> = ({
  isOpen,
  userProgress,
  onClose,
  onClaimAchievement,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 text-slate-800 shadow-2xl border-4 border-amber-300 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🏆</span>
            <div>
              <h2 className="text-2xl font-black text-slate-800">Pencapaian Hebat</h2>
              <p className="text-xs text-slate-500">Kumpul lencana dan menangi syiling emas!</p>
            </div>
          </div>
          <button
            onClick={() => {
              audio.playPop();
              onClose();
            }}
            className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center"
          >
            ✕
          </button>
        </div>

        {/* Badges List */}
        <div className="overflow-y-auto py-4 flex flex-col gap-3 my-1 pr-1">
          {INITIAL_ACHIEVEMENTS.map((ach) => {
            // Calculate progress based on user stats
            let current = 0;
            if (ach.id === 'ach_first_step') current = userProgress.totalCorrect >= 1 ? 1 : 0;
            else if (ach.id === 'ach_huruf_star') current = Math.min(ach.maxProgress, userProgress.categoryStars.huruf || 0);
            else if (ach.id === 'ach_math_star') current = Math.min(ach.maxProgress, userProgress.categoryStars.nombor || 0);
            else if (ach.id === 'ach_artist') current = Math.min(ach.maxProgress, userProgress.categoryStars.mewarna || 0);
            else if (ach.id === 'ach_puzzle_master') current = Math.min(ach.maxProgress, userProgress.categoryStars.puzzle || 0);
            else if (ach.id === 'ach_animal_friend') current = Math.min(ach.maxProgress, userProgress.categoryStars.haiwan || 0);
            else if (ach.id === 'ach_combo_king') current = Math.min(ach.maxProgress, userProgress.maxCombo || 0);
            else if (ach.id === 'ach_level_up') current = Math.min(ach.maxProgress, userProgress.level || 1);

            const isDone = current >= ach.maxProgress;
            const isClaimed = userProgress.achievements[ach.id] || false;
            const pct = Math.min(100, Math.round((current / ach.maxProgress) * 100));

            return (
              <div
                key={ach.id}
                className={`p-3.5 rounded-2xl border-2 flex items-center gap-3 transition-all ${
                  isClaimed
                    ? 'bg-slate-50 border-slate-200 opacity-80'
                    : isDone
                    ? 'bg-amber-50 border-amber-400 ring-2 ring-amber-200'
                    : 'bg-white border-slate-200'
                }`}
              >
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl shrink-0 ${
                  isDone ? 'bg-amber-100 animate-wiggle' : 'bg-slate-100 opacity-60'
                }`}>
                  {ach.icon}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-black text-sm text-slate-800 truncate">
                      {ach.title}
                    </h4>
                    <span className="text-xs font-bold text-amber-600 ml-2 shrink-0">
                      +{ach.rewardCoins} 🪙
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                    {ach.description}
                  </p>

                  {/* Progress Bar */}
                  <div className="mt-2 flex items-center gap-2">
                    <div className="flex-1 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                    <span className="text-[10px] font-bold text-slate-500">
                      {current}/{ach.maxProgress}
                    </span>
                  </div>
                </div>

                {/* Claim Button */}
                {isDone && !isClaimed && (
                  <button
                    onClick={() => {
                      audio.playStar();
                      onClaimAchievement(ach.id, ach.rewardCoins);
                    }}
                    className="py-1.5 px-3 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs rounded-xl shadow-sm shrink-0 animate-bounce btn-3d"
                  >
                    Tuntut!
                  </button>
                )}
                {isClaimed && (
                  <span className="text-xs font-bold text-emerald-600 shrink-0">
                    ✓ Dituntut
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
