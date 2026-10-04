import React, { useState } from 'react';
import { audio } from '../services/audioService';
import { AgeGroup, CategoryId, CategoryInfo, GameType, UserProgress } from '../types';

interface CategorySelectionProps {
  age: AgeGroup;
  userProgress: UserProgress;
  onSelectCategory: (category: CategoryId, gameType: GameType) => void;
  onBack: () => void;
}

const CATEGORIES: CategoryInfo[] = [
  {
    id: 'huruf',
    title: 'Huruf & Bacaan',
    subtitle: 'Abjad A-Z, fonik, suku kata & mengeja',
    iconName: '🔤',
    colorTheme: 'bg-rose-50 text-rose-900 border-rose-300',
    borderTheme: 'hover:border-rose-400',
    bgGradient: 'from-rose-400 to-pink-500',
    defaultGameType: 'klik_jawapan',
    availableGames: ['klik_jawapan', 'drag_drop', 'padanan', 'susunan', 'memory'],
  },
  {
    id: 'nombor',
    title: 'Nombor & Kiraan',
    subtitle: 'Kira objek, nombor, tambah & tolak asas',
    iconName: '🔢',
    colorTheme: 'bg-sky-50 text-sky-900 border-sky-300',
    borderTheme: 'hover:border-sky-400',
    bgGradient: 'from-sky-400 to-blue-500',
    defaultGameType: 'klik_jawapan',
    availableGames: ['klik_jawapan', 'drag_drop', 'padanan', 'susunan', 'memory'],
  },
  {
    id: 'warna_bentuk',
    title: 'Warna & Bentuk',
    subtitle: 'Bentuk geometri & spektrum warna ceria',
    iconName: '🎨',
    colorTheme: 'bg-amber-50 text-amber-900 border-amber-300',
    borderTheme: 'hover:border-amber-400',
    bgGradient: 'from-amber-400 to-orange-500',
    defaultGameType: 'klik_jawapan',
    availableGames: ['klik_jawapan', 'drag_drop', 'padanan', 'memory'],
  },
  {
    id: 'haiwan',
    title: 'Dunia Haiwan',
    subtitle: 'Habitat, makanan, bunyi & ciri haiwan',
    iconName: '🦁',
    colorTheme: 'bg-emerald-50 text-emerald-900 border-emerald-300',
    borderTheme: 'hover:border-emerald-400',
    bgGradient: 'from-emerald-400 to-teal-500',
    defaultGameType: 'klik_jawapan',
    availableGames: ['klik_jawapan', 'drag_drop', 'padanan', 'memory'],
  },
  {
    id: 'puzzle',
    title: 'Susun Suai (Puzzle)',
    subtitle: 'Cantum kepingan gambar mengikut umur',
    iconName: '🧩',
    colorTheme: 'bg-purple-50 text-purple-900 border-purple-300',
    borderTheme: 'hover:border-purple-400',
    bgGradient: 'from-purple-400 to-indigo-500',
    defaultGameType: 'puzzle',
    availableGames: ['puzzle'],
  },
  {
    id: 'mewarna',
    title: 'Studio Mewarna',
    subtitle: 'Lukisan A4 boleh dicetak, tong warna & berus',
    iconName: '🖍️',
    colorTheme: 'bg-teal-50 text-teal-900 border-teal-300',
    borderTheme: 'hover:border-teal-400',
    bgGradient: 'from-teal-400 to-emerald-500',
    defaultGameType: 'mewarna',
    availableGames: ['mewarna'],
  },
];

const GAME_TYPE_LABELS: Record<GameType, { label: string; icon: string }> = {
  klik_jawapan: { label: 'Klik Jawapan', icon: '👆' },
  drag_drop: { label: 'Tarik & Letak', icon: '✋' },
  padanan: { label: 'Padanan', icon: '🔗' },
  susunan: { label: 'Susunan', icon: '🔢' },
  memory: { label: 'Kad Memori', icon: '🃏' },
  puzzle: { label: 'Puzzle', icon: '🧩' },
  mewarna: { label: 'Mewarna', icon: '🎨' },
  anggota_badan: { label: 'Anggota Badan', icon: '🧒' },
  kenderaan: { label: 'Kenali Kenderaan', icon: '🚒' },
  silang_kata: { label: 'Silang Kata', icon: '🔤' },
  tersembunyi: { label: 'Objek Tersembunyi', icon: '🔍' },
};

export const CategorySelection: React.FC<CategorySelectionProps> = ({
  age,
  userProgress,
  onSelectCategory,
  onBack,
}) => {
  const [selectedCat, setSelectedCat] = useState<CategoryInfo | null>(null);

  // Customize categories based on age:
  // - 2-3 years: Studio Mewarna becomes Mengenal Anggota Badan
  // - 3-4 years: Studio Mewarna becomes Kenali Kenderaan
  // - 4-5 years: Studio Mewarna becomes Silang Kata
  const displayCategories = CATEGORIES.map(cat => {
    if (cat.id === 'mewarna') {
      if (age === '2-3') {
        return {
          ...cat,
          title: 'Mengenal Anggota Badan',
          subtitle: 'Padanan kotak: 5 gambar anggota badan (kiri) dipadankan dengan fungsi (kanan)',
          iconName: '🧒',
          colorTheme: 'bg-teal-50 text-teal-900 border-teal-300',
          borderTheme: 'hover:border-teal-400',
          bgGradient: 'from-teal-400 to-emerald-500',
          defaultGameType: 'mewarna' as GameType,
          availableGames: ['mewarna' as GameType],
        };
      }
      if (age === '3-4') {
        return {
          ...cat,
          title: 'Kenali Kenderaan',
          subtitle: 'Padankan situasi kecemasan & kegunaan dengan kenderaan',
          iconName: '🚒',
          colorTheme: 'bg-indigo-50 text-indigo-900 border-indigo-300',
          borderTheme: 'hover:border-indigo-400',
          bgGradient: 'from-indigo-500 via-blue-500 to-sky-500',
          defaultGameType: 'kenderaan' as GameType,
          availableGames: ['kenderaan' as GameType],
        };
      }
      if (age === '4-5') {
        return {
          ...cat,
          title: 'Silang Kata',
          subtitle: 'Cari 5 perkataan dalam kotak huruf (Buku, Sudu, Ayam, Ikan, Kipas)',
          iconName: '🔤',
          colorTheme: 'bg-purple-50 text-purple-900 border-purple-300',
          borderTheme: 'hover:border-purple-400',
          bgGradient: 'from-purple-500 via-indigo-500 to-pink-500',
          defaultGameType: 'silang_kata' as GameType,
          availableGames: ['silang_kata' as GameType],
        };
      }
      if (age === '5-6') {
        return {
          ...cat,
          title: 'Hidden Object',
          subtitle: 'Cari 5 objek tersembunyi (5 gambar setiap sesi • susunan rawak)',
          iconName: '🔍',
          colorTheme: 'bg-teal-50 text-teal-900 border-teal-300',
          borderTheme: 'hover:border-teal-400',
          bgGradient: 'from-teal-400 via-emerald-400 to-sky-500',
          defaultGameType: 'tersembunyi' as GameType,
          availableGames: ['tersembunyi' as GameType],
        };
      }
    }
    if (cat.id === 'puzzle' && age === '5-6') {
      return {
        ...cat,
        title: 'Susun Suai Kenderaan',
        subtitle: 'Cantum puzzle kenderaan (5 soalan/sesi • 20 soalan berbeza)',
        iconName: '🚗',
        colorTheme: 'bg-blue-50 text-blue-900 border-blue-300',
        borderTheme: 'hover:border-blue-400',
        bgGradient: 'from-blue-500 via-indigo-500 to-sky-400',
      };
    }
    return cat;
  });

  const getAgeLabel = () => {
    switch (age) {
      case '2-3': return '2–3 Tahun (Mengenal Dunia)';
      case '3-4': return '3–4 Tahun (Kenal Bahasa & Asas)';
      case '4-5': return '4–5 Tahun (Pra Sekolah)';
      case '5-6': return '5–6 Tahun (Persediaan Sekolah)';
    }
  };

  const handleLaunchGame = (cat: CategoryInfo, gameType: GameType) => {
    audio.playPop();
    onSelectCategory(cat.id, gameType);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-sky-100 via-amber-50 to-emerald-100 p-4 md:p-8 flex flex-col justify-between select-none">
      {/* Top Header */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <button
          onClick={() => {
            audio.playPop();
            onBack();
          }}
          className="py-2 px-4 bg-white rounded-2xl shadow-sm border-2 border-slate-200 font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors btn-3d text-sm"
        >
          <span>◀</span>
          <span>Tukar Umur</span>
        </button>

        <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full border-2 border-amber-300 shadow-sm">
          <span className="text-sm font-bold text-amber-900">Peringkat:</span>
          <span className="text-sm font-black text-amber-700">{getAgeLabel()}</span>
        </div>

        {/* Stars Display */}
        <div className="flex items-center gap-1.5 bg-white/90 px-3 py-1.5 rounded-2xl border-2 border-amber-200 shadow-sm">
          <span className="text-base">⭐</span>
          <span className="text-sm font-black text-amber-600">{userProgress.stars}</span>
        </div>
      </div>

      {/* Title */}
      <div className="w-full max-w-4xl mx-auto text-center my-3">
        <h2 className="text-3xl md:text-5xl font-black text-slate-800">
          Pilih Kategori Pembelajaran
        </h2>
        <p className="text-slate-600 font-semibold text-sm md:text-base mt-1">
          Pilih modul di bawah untuk memulakan aktiviti interaktif.
        </p>
      </div>

      {/* 6 Category Cards Grid */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-5 my-auto">
        {displayCategories.map((cat) => {
          const catStars = userProgress.categoryStars[cat.id] || 0;

          return (
            <div
              key={cat.id}
              onClick={() => {
                if (cat.id === 'puzzle' || cat.id === 'mewarna') {
                  handleLaunchGame(cat, cat.defaultGameType);
                } else {
                  setSelectedCat(cat);
                }
              }}
              className={`bg-white rounded-3xl p-5 border-4 border-slate-200 ${cat.borderTheme} shadow-md hover:shadow-xl hover:scale-102 active:scale-98 transition-all cursor-pointer flex flex-col justify-between group`}
            >
              <div>
                {/* Header Icon + Stars */}
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-14 h-14 rounded-2xl bg-gradient-to-tr ${cat.bgGradient} flex items-center justify-center text-3xl shadow-sm text-white group-hover:scale-110 transition-transform`}>
                    {cat.iconName}
                  </div>
                  <div className="flex items-center gap-1 bg-amber-50 px-2.5 py-1 rounded-full border border-amber-200">
                    <span className="text-amber-500 text-xs">⭐</span>
                    <span className="text-xs font-black text-amber-800">{catStars}</span>
                  </div>
                </div>

                <h3 className="text-2xl font-black text-slate-800 group-hover:text-amber-700 transition-colors">
                  {cat.title}
                </h3>
                <p className="text-xs font-semibold text-slate-500 mt-1">
                  {cat.subtitle}
                </p>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <span className="text-xs font-bold text-slate-400">
                  {cat.availableGames.length > 1
                    ? `${cat.availableGames.length} Mod Permainan`
                    : 'Aktiviti Khas'}
                </span>
                <span className="text-sm font-black text-amber-600 group-hover:translate-x-1 transition-transform">
                  Main Sekarang ▶
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Game Mode Selection Modal (for categories with multiple game types) */}
      {selectedCat && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 text-slate-800 shadow-2xl border-4 border-amber-300 animate-scale-up">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <span className="text-3xl">{selectedCat.iconName}</span>
                <div>
                  <h3 className="text-2xl font-black text-slate-800">
                    {selectedCat.title}
                  </h3>
                  <p className="text-xs text-slate-500">Pilih jenis permainan:</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedCat(null)}
                className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-1 gap-2.5 my-4">
              {selectedCat.availableGames.map((gameType) => {
                const info = GAME_TYPE_LABELS[gameType];
                return (
                  <button
                    key={gameType}
                    onClick={() => {
                      const cat = selectedCat;
                      setSelectedCat(null);
                      handleLaunchGame(cat, gameType);
                    }}
                    className="w-full p-3.5 bg-slate-50 hover:bg-amber-100 border-2 border-slate-200 hover:border-amber-400 rounded-2xl flex items-center justify-between transition-all group btn-3d"
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{info.icon}</span>
                      <span className="text-base font-black text-slate-800 group-hover:text-amber-950">
                        {info.label}
                      </span>
                    </div>
                    <span className="text-amber-600 font-bold text-sm">Mula ▶</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Footer advice */}
      <div className="w-full text-center text-xs text-slate-500 py-2">
        S.A.S menjana soalan secara rawak & berterusan untuk setiap sesi pembelajaran.
      </div>
    </div>
  );
};
