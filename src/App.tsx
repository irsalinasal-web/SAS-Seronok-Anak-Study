import React, { useState, useEffect } from 'react';
import { AgeGroup, CategoryId, GameType, UserProgress } from './types';
import { storage } from './services/storageService';
import { audio } from './services/audioService';
import { imageStorage } from './services/imageStorageService';

// Screens
import { HomeScreen } from './components/HomeScreen';
import { AgeSelection } from './components/AgeSelection';
import { CategorySelection } from './components/CategorySelection';
import { GameScreen } from './components/GameScreen';

// Modals
import { SettingsModal } from './components/modals/SettingsModal';
import { AchievementsModal } from './components/modals/AchievementsModal';
import { RewardsModal } from './components/modals/RewardsModal';

type AppView = 'home' | 'age_select' | 'category_select' | 'game';

export default function App() {
  const [view, setView] = useState<AppView>('home');
  const [selectedAge, setSelectedAge] = useState<AgeGroup>('3-4');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId>('huruf');
  const [selectedGameType, setSelectedGameType] = useState<GameType>('klik_jawapan');

  // Modals state
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isAchievementsOpen, setIsAchievementsOpen] = useState(false);
  const [isRewardsOpen, setIsRewardsOpen] = useState(false);

  // User Progress state
  const [userProgress, setUserProgress] = useState<UserProgress>(() => storage.getProgress());
  const [musicOn, setMusicOn] = useState(audio.isMusicOn());

  useEffect(() => {
    // Pra-muat imej latar ke dalam cache memori serta-merta
    imageStorage.warmUp();

    // Check daily reward on mount
    const { canClaim } = storage.checkDailyReward();
    if (canClaim) {
      // Auto open rewards prompt gently if reward is ready
      const timer = setTimeout(() => {
        setIsRewardsOpen(true);
      }, 1200);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleToggleMusic = () => {
    const next = !musicOn;
    setMusicOn(next);
    audio.setMusicEnabled(next);
  };

  const handleStartFromHome = () => {
    setView('age_select');
  };

  const handleSelectAge = (age: AgeGroup) => {
    setSelectedAge(age);
    setView('category_select');
  };

  const handleSelectCategory = (cat: CategoryId, gameType: GameType) => {
    setSelectedCategory(cat);
    setSelectedGameType(gameType);
    setView('game');
  };

  const handleProgressReset = () => {
    setUserProgress(storage.getProgress());
    setView('home');
  };

  const handleClaimAchievement = (achId: string, coins: number) => {
    const current = storage.getProgress();
    const updated = storage.save({
      coins: current.coins + coins,
      achievements: {
        ...current.achievements,
        [achId]: true,
      },
    });
    setUserProgress(updated);
  };

  return (
    <div className="min-h-screen w-full font-sans antialiased text-slate-800 bg-amber-50">
      {view === 'home' && (
        <HomeScreen
          userProgress={userProgress}
          onStart={handleStartFromHome}
          onOpenSettings={() => setIsSettingsOpen(true)}
          onOpenAchievements={() => setIsAchievementsOpen(true)}
          onOpenRewards={() => setIsRewardsOpen(true)}
          onToggleMusic={handleToggleMusic}
          musicOn={musicOn}
        />
      )}

      {view === 'age_select' && (
        <AgeSelection
          onSelectAge={handleSelectAge}
          onBack={() => setView('home')}
        />
      )}

      {view === 'category_select' && (
        <CategorySelection
          age={selectedAge}
          userProgress={userProgress}
          onSelectCategory={handleSelectCategory}
          onBack={() => setView('age_select')}
        />
      )}

      {view === 'game' && (
        <GameScreen
          age={selectedAge}
          category={selectedCategory}
          gameType={selectedGameType}
          userProgress={userProgress}
          onUpdateProgress={(updated) => setUserProgress(updated)}
          onExit={() => setView('category_select')}
          onNextCategory={() => setView('category_select')}
        />
      )}

      {/* Settings Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onProgressReset={handleProgressReset}
      />

      {/* Achievements Modal */}
      <AchievementsModal
        isOpen={isAchievementsOpen}
        userProgress={userProgress}
        onClose={() => setIsAchievementsOpen(false)}
        onClaimAchievement={handleClaimAchievement}
      />

      {/* Rewards & Sticker Store Modal */}
      <RewardsModal
        isOpen={isRewardsOpen}
        userProgress={userProgress}
        onClose={() => setIsRewardsOpen(false)}
        onUpdateProgress={(updated) => setUserProgress(updated)}
      />
    </div>
  );
}
