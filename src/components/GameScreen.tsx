import React, { useState, useEffect, useCallback } from 'react';
import { AgeGroup, CategoryId, GameType, QuestionData, UserProgress } from '../types';
import { questionGenerator } from '../services/questionGenerator';
import { audio } from '../services/audioService';
import { storage } from '../services/storageService';
import { fireSuccessConfetti } from './ConfettiCelebration';

// Game Mode Components
import { KlikJawapanGame } from './games/KlikJawapanGame';
import { DragDropGame } from './games/DragDropGame';
import { PadananGame } from './games/PadananGame';
import { SusunanGame } from './games/SusunanGame';
import { MemoryGame } from './games/MemoryGame';
import { JigsawPuzzleGame } from './games/JigsawPuzzleGame';
import { MewarnaStudio } from './games/MewarnaStudio';
import { AnggotaBadanGame } from './games/AnggotaBadanGame';
import { KenaliKenderaanGame } from './games/KenaliKenderaanGame';
import { SilangKataGame } from './games/SilangKataGame';
import { TersembunyiGame } from './games/TersembunyiGame';

// Modals
import { FeedbackModal } from './FeedbackModal';
import { ResultModal } from './ResultModal';

interface GameScreenProps {
  age: AgeGroup;
  category: CategoryId;
  gameType: GameType;
  userProgress: UserProgress;
  onUpdateProgress: (updated: UserProgress) => void;
  onExit: () => void;
  onNextCategory: () => void;
}

export const GameScreen: React.FC<GameScreenProps> = ({
  age,
  category,
  gameType,
  userProgress,
  onUpdateProgress,
  onExit,
  onNextCategory,
}) => {
  const [questions, setQuestions] = useState<QuestionData[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentScore, setCurrentScore] = useState(0);
  const [comboCount, setComboCount] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [maxCombo, setMaxCombo] = useState(0);

  // Modal States
  const [showFeedback, setShowFeedback] = useState(false);
  const [isLastAnswerCorrect, setIsLastAnswerCorrect] = useState(false);
  const [lastScoreGained, setLastScoreGained] = useState(10);
  const [showResult, setShowResult] = useState(false);

  // Audio state
  const [musicOn, setMusicOn] = useState(audio.isMusicOn());
  const [sessionKey, setSessionKey] = useState(0);

  // Initialize questions
  const initGameSession = useCallback(() => {
    setSessionKey(prev => prev + 1);
    setCurrentScore(0);
    setComboCount(0);
    setCorrectCount(0);
    setMaxCombo(0);
    setShowFeedback(false);
    setShowResult(false);

    if (
      gameType === 'puzzle' ||
      gameType === 'mewarna' ||
      gameType === 'anggota_badan' ||
      gameType === 'kenderaan' ||
      gameType === 'silang_kata' ||
      gameType === 'tersembunyi'
    ) {
      setQuestions([]);
      return;
    }

    const sessionQuestions = questionGenerator.generateSessionQuestions(age, category, gameType, 5);
    setQuestions(sessionQuestions);
    setCurrentIndex(0);
  }, [age, category, gameType]);

  useEffect(() => {
    initGameSession();
  }, [initGameSession]);

  const handleAnswer = (isCorrect: boolean) => {
    setIsLastAnswerCorrect(isCorrect);

    if (isCorrect) {
      fireSuccessConfetti();
      const nextCombo = comboCount + 1;
      const scoreDelta = 10 + (nextCombo >= 2 ? 5 : 0);
      setLastScoreGained(scoreDelta);
      setCurrentScore(prev => prev + scoreDelta);
      setComboCount(nextCombo);
      setMaxCombo(prev => Math.max(prev, nextCombo));
      setCorrectCount(prev => prev + 1);

      // Save progress
      storage.addScore(true, comboCount, category);
      onUpdateProgress(storage.getProgress());
    } else {
      setComboCount(0);
      setLastScoreGained(0);
      storage.addScore(false, 0, category);
    }

    setShowFeedback(true);
  };

  const handleContinueAfterFeedback = () => {
    setShowFeedback(false);
    const nextIndex = currentIndex + 1;

    if (nextIndex < questions.length) {
      setCurrentIndex(nextIndex);
    } else {
      // Completed all 5 questions
      setShowResult(true);
    }
  };

  const handleRetryAfterFeedback = () => {
    setShowFeedback(false);
    // Stay on current question to give the child another chance!
  };

  const toggleMusic = () => {
    audio.playPop();
    const next = !musicOn;
    setMusicOn(next);
    audio.setMusicEnabled(next);
  };

  const currentQ = questions[currentIndex];

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-50 p-2 md:p-6 flex flex-col justify-between select-none overflow-y-auto">
      {/* Top Header Status Bar */}
      <header className="w-full max-w-5xl mx-auto flex items-center justify-between gap-2 mb-2 md:mb-3 shrink-0">
        {/* Back Button */}
        <button
          onClick={() => {
            audio.playPop();
            onExit();
          }}
          className="py-2 px-3.5 bg-white rounded-2xl shadow-sm border-2 border-slate-200 font-bold text-slate-700 flex items-center gap-1.5 hover:bg-slate-50 transition-colors btn-3d text-xs md:text-sm"
        >
          <span>◀</span>
          <span>Kembali</span>
        </button>

        {/* Center Progress Pill (for 5 questions quiz) */}
        {gameType !== 'puzzle' &&
          gameType !== 'mewarna' &&
          gameType !== 'anggota_badan' &&
          gameType !== 'kenderaan' &&
          gameType !== 'silang_kata' &&
          gameType !== 'tersembunyi' &&
          questions.length > 0 && (
            <div className="flex items-center gap-2 bg-white/90 px-4 py-1.5 rounded-full border-2 border-amber-300 shadow-sm">
              <span className="text-xs font-bold text-slate-500">Soalan</span>
              <span className="text-sm font-black text-amber-900">
                {currentIndex + 1} / {questions.length}
              </span>
            </div>
          )}

        {/* Right Stats & Audio */}
        <div className="flex items-center gap-2">
          {/* Combo indicator */}
          {comboCount >= 2 && (
            <div className="flex items-center gap-1 bg-amber-400 text-amber-950 font-black text-xs px-2.5 py-1 rounded-full shadow-sm animate-pulse">
              <span>🔥</span>
              <span>{comboCount}x Kombo</span>
            </div>
          )}

          {/* Current Score */}
          {gameType !== 'puzzle' &&
            gameType !== 'mewarna' &&
            gameType !== 'anggota_badan' &&
            gameType !== 'kenderaan' &&
            gameType !== 'silang_kata' && (
              <div className="flex items-center gap-1 bg-white/90 px-3 py-1.5 rounded-2xl border-2 border-amber-200 shadow-sm">
                <span className="text-xs font-bold text-slate-400">Markah</span>
                <span className="text-sm font-black text-amber-700">+{currentScore}</span>
              </div>
            )}

          {/* Music Toggle */}
          <button
            onClick={toggleMusic}
            className={`w-9 h-9 rounded-xl flex items-center justify-center text-sm shadow-sm border-2 transition-all ${
              musicOn
                ? 'bg-amber-300 border-amber-500 text-amber-950'
                : 'bg-white border-slate-300 text-slate-400'
            }`}
          >
            {musicOn ? '🎵' : '🔇'}
          </button>
        </div>
      </header>

      {/* Main Game Stage */}
      <main className="w-full max-w-5xl mx-auto flex-1 flex flex-col items-center justify-center my-auto">
        {gameType === 'puzzle' ? (
          <JigsawPuzzleGame
            age={age}
            onComplete={() => {
              fireSuccessConfetti();
              storage.addScore(true, 1, 'puzzle');
              onUpdateProgress(storage.getProgress());
              setShowResult(true);
            }}
          />
        ) : gameType === 'kenderaan' || (gameType === 'mewarna' && age === '3-4') ? (
          <KenaliKenderaanGame
            onComplete={() => {
              fireSuccessConfetti();
              storage.addScore(true, 1, 'mewarna');
              onUpdateProgress(storage.getProgress());
              setShowResult(true);
            }}
          />
        ) : gameType === 'silang_kata' || (gameType === 'mewarna' && age === '4-5') ? (
          <SilangKataGame
            onComplete={() => {
              fireSuccessConfetti();
              storage.addScore(true, 1, 'mewarna');
              onUpdateProgress(storage.getProgress());
              setShowResult(true);
            }}
          />
        ) : gameType === 'tersembunyi' || (gameType === 'mewarna' && age === '5-6') ? (
          <TersembunyiGame
            key={`tersembunyi-${sessionKey}`}
            onComplete={(stats) => {
              fireSuccessConfetti();
              const finalScore = stats?.score ?? 65;
              const finalCorrect = stats?.correct ?? 5;
              const finalTotal = stats?.total ?? 5;
              const finalCombo = stats?.maxCombo ?? 5;

              setCurrentScore(finalScore);
              setCorrectCount(finalCorrect);
              setMaxCombo(finalCombo);
              setQuestions(new Array(finalTotal).fill(null) as QuestionData[]);

              // Simpan kemajuan skor selari dengan kategori game lain
              for (let i = 0; i < finalCorrect; i++) {
                storage.addScore(true, Math.min(i + 1, finalCombo), category);
              }
              onUpdateProgress(storage.getProgress());
              setShowResult(true);
            }}
          />
        ) : gameType === 'mewarna' || gameType === 'anggota_badan' ? (
          age === '2-3' ? (
            <AnggotaBadanGame
              onComplete={() => {
                fireSuccessConfetti();
                storage.addScore(true, 1, 'mewarna');
                onUpdateProgress(storage.getProgress());
                setShowResult(true);
              }}
            />
          ) : (
            <MewarnaStudio
              onArtworkCompleted={() => {
                fireSuccessConfetti();
                storage.addScore(true, 1, 'mewarna');
                onUpdateProgress(storage.getProgress());
              }}
            />
          )
        ) : currentQ ? (
          <React.Fragment key={currentQ.id}>
            {currentQ.gameType === 'klik_jawapan' && (
              <KlikJawapanGame key={currentQ.id} question={currentQ} onAnswer={handleAnswer} />
            )}
            {currentQ.gameType === 'drag_drop' && (
              <DragDropGame key={currentQ.id} question={currentQ} onAnswer={handleAnswer} />
            )}
            {currentQ.gameType === 'padanan' && (
              <PadananGame key={currentQ.id} question={currentQ} onAnswer={handleAnswer} />
            )}
            {currentQ.gameType === 'susunan' && (
              <SusunanGame key={currentQ.id} question={currentQ} onAnswer={handleAnswer} />
            )}
            {currentQ.gameType === 'memory' && (
              <MemoryGame key={currentQ.id} question={currentQ} onAnswer={handleAnswer} />
            )}
          </React.Fragment>
        ) : null}
      </main>

      {/* Answer Feedback Popup (Salah: Merah, Betul: Hijau) */}
      <FeedbackModal
        isOpen={showFeedback}
        isCorrect={isLastAnswerCorrect}
        scoreGained={lastScoreGained}
        comboCount={comboCount}
        onRetry={handleRetryAfterFeedback}
        onContinue={handleContinueAfterFeedback}
      />

      {/* Final Results Modal */}
      <ResultModal
        isOpen={showResult}
        totalQuestions={questions.length > 0 ? questions.length : 5}
        correctAnswers={correctCount > 0 ? correctCount : 5}
        totalScore={currentScore > 0 ? currentScore : 65}
        maxCombo={maxCombo > 0 ? maxCombo : 5}
        onReplay={initGameSession}
        onHome={onExit}
        onNextCategory={onNextCategory}
      />
    </div>
  );
};
