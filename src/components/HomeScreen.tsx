import React from 'react';
import { audio } from '../services/audioService';
import { UserProgress } from '../types';

interface HomeScreenProps {
  userProgress: UserProgress;
  onStart: () => void;
  onOpenSettings: () => void;
  onOpenAchievements: () => void;
  onOpenRewards: () => void;
  onToggleMusic: () => void;
  musicOn: boolean;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userProgress,
  onStart,
  onOpenSettings,
  onOpenAchievements,
  onOpenRewards,
  onToggleMusic,
  musicOn,
}) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-sky-200 via-amber-50 to-emerald-100 p-4 md:p-6 select-none">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Sun & Rainbow */}
        <div className="absolute top-4 right-6 text-7xl md:text-8xl animate-pulse-glow">
          ☀️
        </div>
        <div className="absolute top-8 left-8 text-6xl md:text-7xl opacity-80 animate-wiggle">
          🌈
        </div>

        {/* Floating Clouds */}
        <div className="absolute top-16 left-1/4 text-6xl text-white/80 animate-cloud-float">
          ☁️
        </div>
        <div className="absolute top-28 right-1/4 text-5xl text-white/80 animate-cloud-float" style={{ animationDelay: '5s' }}>
          ☁️
        </div>

        {/* Floating Educational Playful Icons */}
        <div className="absolute bottom-20 left-10 text-5xl animate-soft-bounce opacity-70">
          🎨
        </div>
        <div className="absolute bottom-28 right-12 text-5xl animate-soft-bounce opacity-70" style={{ animationDelay: '1.2s' }}>
          🚀
        </div>
        <div className="absolute top-1/2 left-6 text-4xl opacity-50 animate-wiggle">
          🅰️
        </div>
        <div className="absolute top-1/3 right-8 text-4xl opacity-50 animate-wiggle" style={{ animationDelay: '0.8s' }}>
          🔢
        </div>
        <div className="absolute bottom-8 left-1/3 text-4xl opacity-60">
          🌸
        </div>
        <div className="absolute bottom-8 right-1/3 text-4xl opacity-60">
          🌿
        </div>
      </div>

      {/* Top Header Bar */}
      <header className="relative z-10 w-full max-w-5xl mx-auto flex items-center justify-between gap-2">
        {/* Child Level & Progress */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white/90 backdrop-blur-sm px-3.5 py-1.5 rounded-2xl shadow-sm border-2 border-amber-300">
            <span className="text-xl">🎖️</span>
            <div>
              <span className="text-[10px] text-slate-500 font-bold block leading-none">PENGUASAAN</span>
              <span className="text-sm font-black text-amber-900 leading-tight">Tahap {userProgress.level}</span>
            </div>
          </div>

          {/* Stars & Coins */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-2xl shadow-sm border-2 border-amber-200">
              <span className="text-lg">⭐</span>
              <span className="text-sm font-black text-amber-600">{userProgress.stars}</span>
            </div>
            <div className="flex items-center gap-1 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-2xl shadow-sm border-2 border-amber-200">
              <span className="text-lg">🪙</span>
              <span className="text-sm font-black text-amber-700">{userProgress.coins}</span>
            </div>
          </div>
        </div>

        {/* Quick Audio Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              audio.playPop();
              onToggleMusic();
            }}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center text-xl shadow-md border-b-4 transition-all btn-3d ${
              musicOn
                ? 'bg-amber-400 border-amber-600 text-amber-950'
                : 'bg-white border-slate-300 text-slate-400'
            }`}
            title={musicOn ? 'Matikan Muzik' : 'Pasang Muzik'}
          >
            {musicOn ? '🎵' : '🔇'}
          </button>
        </div>
      </header>

      {/* Center Branding Area */}
      <main className="relative z-10 w-full max-w-xl mx-auto flex flex-col items-center text-center my-auto py-6">
        {/* Animated Cute Mascot / Logo Emblem */}
        <div className="relative mb-3">
          <div className="w-28 h-28 md:w-36 md:h-36 bg-gradient-to-tr from-amber-400 via-amber-300 to-yellow-200 rounded-3xl p-3 shadow-2xl border-4 border-white flex items-center justify-center animate-soft-bounce">
            <div className="text-6xl md:text-7xl">
              🦁
            </div>
          </div>
        </div>

        {/* Logo Text */}
        <h1 className="text-5xl md:text-7xl font-black tracking-tight text-amber-950 drop-shadow-sm flex items-center gap-2">
          <span>S</span>
          <span className="text-emerald-600">.</span>
          <span>A</span>
          <span className="text-sky-500">.</span>
          <span>S</span>
        </h1>

        <p className="text-2xl md:text-3xl font-black text-amber-800 tracking-wide mt-1">
          Seronok Anak Study
        </p>

        <div className="mt-2 inline-block bg-white/80 backdrop-blur-sm px-5 py-1.5 rounded-full border-2 border-amber-300 shadow-sm">
          <span className="text-sm md:text-base font-bold text-slate-700">
            Belajar Sambil Bermain ✨
          </span>
        </div>

        {/* Main Action Buttons */}
        <div className="w-full max-w-xs flex flex-col gap-3.5 mt-8">
          {/* MULA BUTTON */}
          <button
            onClick={() => {
              audio.playPop();
              audio.startMusic();
              onStart();
            }}
            className="w-full py-4 text-2xl font-black text-amber-950 btn-3d btn-3d-amber rounded-3xl flex items-center justify-center gap-3 animate-soft-bounce"
          >
            <span className="text-3xl">▶</span>
            <span>Mula Belajar</span>
          </button>

          {/* Secondary Buttons Row */}
          <div className="grid grid-cols-3 gap-2.5">
            <button
              onClick={() => {
                audio.playPop();
                onOpenRewards();
              }}
              className="py-3 px-2 bg-white border-b-4 border-slate-300 hover:border-amber-400 text-slate-800 rounded-2xl flex flex-col items-center justify-center font-bold text-xs shadow-md transition-all btn-3d"
            >
              <span className="text-2xl mb-0.5">⭐</span>
              <span>Ganjaran</span>
            </button>

            <button
              onClick={() => {
                audio.playPop();
                onOpenAchievements();
              }}
              className="py-3 px-2 bg-white border-b-4 border-slate-300 hover:border-amber-400 text-slate-800 rounded-2xl flex flex-col items-center justify-center font-bold text-xs shadow-md transition-all btn-3d"
            >
              <span className="text-2xl mb-0.5">🏆</span>
              <span>Pencapaian</span>
            </button>

            <button
              onClick={() => {
                audio.playPop();
                onOpenSettings();
              }}
              className="py-3 px-2 bg-white border-b-4 border-slate-300 hover:border-amber-400 text-slate-800 rounded-2xl flex flex-col items-center justify-center font-bold text-xs shadow-md transition-all btn-3d"
            >
              <span className="text-2xl mb-0.5">⚙️</span>
              <span>Tetapan</span>
            </button>
          </div>
        </div>
      </main>

      {/* Bottom Footer Note */}
      <footer className="relative z-10 w-full text-center text-xs text-slate-500 font-semibold py-2">
        Aplikasi Pendidikan Prasekolah Malaysia · Berpandukan KSPK & Standard Tadika
      </footer>
    </div>
  );
};
