import React, { useState } from 'react';
import { audio } from '../../services/audioService';
import { storage } from '../../services/storageService';
import { UserProgress } from '../../types';
import { STICKERS_STORE } from '../../data/kspkData';
import { fireVictoryConfetti } from '../ConfettiCelebration';

interface RewardsModalProps {
  isOpen: boolean;
  userProgress: UserProgress;
  onClose: () => void;
  onUpdateProgress: (updated: UserProgress) => void;
}

const DAILY_REWARDS = [
  { day: 1, coins: 15, stars: 1, icon: '🪙', label: 'Hari 1' },
  { day: 2, coins: 20, stars: 1, icon: '🪙', label: 'Hari 2' },
  { day: 3, coins: 25, stars: 2, icon: '⭐', label: 'Hari 3' },
  { day: 4, coins: 30, stars: 2, icon: '🎁', label: 'Hari 4' },
  { day: 5, coins: 35, stars: 3, icon: '🪙', label: 'Hari 5' },
  { day: 6, coins: 40, stars: 3, icon: '⭐', label: 'Hari 6' },
  { day: 7, coins: 60, stars: 5, icon: '👑', label: 'Hari 7 (Hadiah Hebat!)' },
];

export const RewardsModal: React.FC<RewardsModalProps> = ({
  isOpen,
  userProgress,
  onClose,
  onUpdateProgress,
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'stickers'>('daily');
  const [feedbackMsg, setFeedbackMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const { canClaim, nextDay } = storage.checkDailyReward();

  const handleClaimDaily = () => {
    const reward = DAILY_REWARDS[nextDay - 1] || DAILY_REWARDS[0];
    audio.playStar();
    fireVictoryConfetti();
    const updated = storage.claimDailyReward(reward.coins, reward.stars);
    onUpdateProgress(updated);
    setFeedbackMsg(`Tahniah! Anda menerima +${reward.coins} Syiling & +${reward.stars} Bintang!`);
  };

  const handleBuySticker = (stickerId: string, cost: number, title: string) => {
    if (userProgress.unlockedStickers.includes(stickerId)) return;

    if (userProgress.coins < cost) {
      audio.playError();
      setFeedbackMsg('Syiling tidak mencukupi! Teruskan belajar untuk kumpul syiling.');
      return;
    }

    audio.playSuccess();
    const success = storage.unlockSticker(stickerId, cost);
    if (success) {
      const updated = storage.getProgress();
      onUpdateProgress(updated);
      setFeedbackMsg(`Tahniah! Anda berjaya membuka pelekat "${title}"! 🎉`);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-lg bg-white rounded-3xl p-6 text-slate-800 shadow-2xl border-4 border-amber-300 max-h-[85vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 shrink-0">
          <div className="flex items-center gap-2">
            <span className="text-3xl">⭐</span>
            <div>
              <h2 className="text-2xl font-black text-slate-800">Pusat Ganjaran S.A.S</h2>
              <p className="text-xs text-slate-500">
                Baki: <strong className="text-amber-600">{userProgress.coins} 🪙</strong> | <strong className="text-amber-500">{userProgress.stars} ⭐</strong>
              </p>
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

        {/* Tab Navigation */}
        <div className="grid grid-cols-2 gap-2 mt-4 shrink-0">
          <button
            onClick={() => { audio.playPop(); setActiveTab('daily'); setFeedbackMsg(null); }}
            className={`py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTab === 'daily'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🎁 Ganjaran Harian (7 Hari)
          </button>

          <button
            onClick={() => { audio.playPop(); setActiveTab('stickers'); setFeedbackMsg(null); }}
            className={`py-2.5 rounded-2xl text-xs font-black transition-all ${
              activeTab === 'stickers'
                ? 'bg-amber-400 text-amber-950 shadow-md'
                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            🎨 Album Pelekat & Mainan
          </button>
        </div>

        {/* Feedback Banner */}
        {feedbackMsg && (
          <div className="mt-3 p-2 bg-emerald-50 border border-emerald-300 rounded-xl text-emerald-800 text-xs font-bold text-center animate-scale-up">
            {feedbackMsg}
          </div>
        )}

        {/* Content Area */}
        <div className="overflow-y-auto py-4 flex-1 pr-1">
          {activeTab === 'daily' ? (
            /* DAILY REWARDS VIEW */
            <div>
              <p className="text-xs text-slate-600 font-medium mb-3 text-center">
                Buka aplikasi setiap hari untuk mengumpul syiling percuma!
              </p>

              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2.5">
                {DAILY_REWARDS.map((item) => {
                  const isCurrentDay = item.day === nextDay;
                  const isClaimedPast = item.day < nextDay && !canClaim;

                  return (
                    <div
                      key={item.day}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-center text-center transition-all ${
                        isCurrentDay && canClaim
                          ? 'bg-amber-100 border-amber-500 ring-2 ring-amber-300 animate-pulse'
                          : isClaimedPast
                          ? 'bg-slate-50 border-slate-200 opacity-60'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <span className="text-xs font-black text-slate-700">{item.label}</span>
                      <span className="text-3xl my-1.5">{item.icon}</span>
                      <span className="text-xs font-bold text-amber-600">+{item.coins} 🪙</span>
                      <span className="text-[10px] text-amber-500">+{item.stars} ⭐</span>
                      {isClaimedPast && (
                        <span className="text-[10px] text-emerald-600 font-bold mt-1">✓ Selesai</span>
                      )}
                    </div>
                  );
                })}
              </div>

              <div className="mt-6 flex flex-col items-center">
                {canClaim ? (
                  <button
                    onClick={handleClaimDaily}
                    className="w-full py-4 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-lg rounded-2xl shadow-lg border-b-4 border-amber-600 active:border-b-0 active:translate-y-1 transition-all btn-3d animate-bounce"
                  >
                    🎉 Tuntut Hadiah Hari {nextDay}!
                  </button>
                ) : (
                  <div className="text-center p-3 bg-slate-100 rounded-2xl w-full">
                    <p className="text-xs font-bold text-slate-600">
                      Anda telah menuntut hadiah hari ini! Datang lagi esok ya! 😊
                    </p>
                    <p className="text-[10px] text-slate-400 mt-1">
                      Streak belajar semasa: {userProgress.streak} hari berturut-turut 🔥
                    </p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            /* STICKER ALBUM / STORE VIEW */
            <div>
              <p className="text-xs text-slate-600 font-medium mb-3 text-center">
                Gunakan syiling pembelajaran anda untuk membeli dan mengumpul pelekat comel!
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {STICKERS_STORE.map((stk) => {
                  const isUnlocked = userProgress.unlockedStickers.includes(stk.id);

                  return (
                    <div
                      key={stk.id}
                      className={`p-3 rounded-2xl border-2 flex flex-col items-center justify-between text-center transition-all ${
                        isUnlocked
                          ? 'bg-amber-50/60 border-amber-300 shadow-sm'
                          : 'bg-white border-slate-200'
                      }`}
                    >
                      <span className={`text-4xl my-1 transition-transform ${isUnlocked ? 'scale-110' : 'grayscale opacity-60'}`}>
                        {stk.emoji}
                      </span>
                      <h4 className="font-black text-xs text-slate-800 mt-1 truncate w-full">
                        {stk.title}
                      </h4>
                      <p className="text-[10px] text-slate-400 line-clamp-1 mb-2">
                        {stk.description}
                      </p>

                      {isUnlocked ? (
                        <span className="w-full py-1 bg-emerald-100 text-emerald-800 font-bold text-[10px] rounded-lg">
                          ✓ Dimiliki
                        </span>
                      ) : (
                        <button
                          onClick={() => handleBuySticker(stk.id, stk.cost, stk.title)}
                          className="w-full py-1.5 bg-amber-400 hover:bg-amber-500 text-amber-950 font-black text-xs rounded-xl shadow-sm transition-all btn-3d"
                        >
                          Buka ({stk.cost} 🪙)
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
