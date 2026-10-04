import React, { useState } from 'react';
import { audio } from '../../services/audioService';
import { storage } from '../../services/storageService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onProgressReset: () => void;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onProgressReset }) => {
  const [musicOn, setMusicOn] = useState(audio.isMusicOn());
  const [sfxOn, setSfxOn] = useState(audio.isSfxOn());
  const [confirmReset, setConfirmReset] = useState(false);

  if (!isOpen) return null;

  const toggleMusic = () => {
    audio.playPop();
    const next = !musicOn;
    setMusicOn(next);
    audio.setMusicEnabled(next);
  };

  const toggleSfx = () => {
    audio.playPop();
    const next = !sfxOn;
    setSfxOn(next);
    audio.setSfxEnabled(next);
  };

  const handleReset = () => {
    audio.playPop();
    storage.resetAllProgress();
    setConfirmReset(false);
    onProgressReset();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-md bg-white rounded-3xl p-6 text-slate-800 shadow-2xl border-4 border-amber-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <span className="text-3xl">⚙️</span>
            <h2 className="text-2xl font-black text-slate-800">Tetapan Aplikasi</h2>
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

        {/* Audio Toggles */}
        <div className="my-5 flex flex-col gap-3">
          {/* Music Toggle */}
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{musicOn ? '🎵' : '🔇'}</span>
              <div>
                <p className="font-black text-slate-800">Muzik Latar (BGM)</p>
                <p className="text-xs text-slate-500">Muzik santai & ceria kanak-kanak</p>
              </div>
            </div>
            <button
              onClick={toggleMusic}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                musicOn
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {musicOn ? 'Music ON' : 'Music OFF'}
            </button>
          </div>

          {/* Sound FX Toggle */}
          <div className="flex items-center justify-between p-4 bg-amber-50 rounded-2xl border border-amber-200">
            <div className="flex items-center gap-3">
              <span className="text-3xl">{sfxOn ? '🔔' : '🔕'}</span>
              <div>
                <p className="font-black text-slate-800">Kesan Bunyi (SFX)</p>
                <p className="text-xs text-slate-500">Bunyi klik, betul & ganjaran</p>
              </div>
            </div>
            <button
              onClick={toggleSfx}
              className={`px-4 py-2 rounded-xl text-xs font-black transition-all ${
                sfxOn
                  ? 'bg-emerald-500 text-white shadow-md'
                  : 'bg-slate-200 text-slate-600'
              }`}
            >
              {sfxOn ? 'Sound ON' : 'Sound OFF'}
            </button>
          </div>
        </div>

        {/* KSPK Info Box */}
        <div className="bg-sky-50 p-4 rounded-2xl border border-sky-200 text-xs text-slate-600 mb-5 leading-relaxed">
          <p className="font-bold text-sky-900 mb-1 flex items-center gap-1.5">
            <span>🇲🇾</span> Kurikulum Standard Prasekolah Kebangsaan (KSPK)
          </p>
          S.A.S direka mengikut standard pembelajaran prasekolah Malaysia: Tunjang Komunikasi (Bahasa Melayu), Tunjang Sains & Teknologi (Awal Matematik & Sains), serta Tunjang Perkembangan Fizikal & Estetika.
        </div>

        {/* Reset Progress */}
        <div className="pt-2 border-t border-slate-100">
          {!confirmReset ? (
            <button
              onClick={() => setConfirmReset(true)}
              className="w-full py-2.5 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
            >
              ⚠️ Set Semula Kemajuan Pembelajaran
            </button>
          ) : (
            <div className="p-3 bg-rose-50 rounded-2xl border border-rose-200 text-center">
              <p className="text-xs font-bold text-rose-800 mb-2">
                Adakah anda pasti mahu memadam semua rekod bintang dan syiling?
              </p>
              <div className="flex gap-2">
                <button
                  onClick={handleReset}
                  className="flex-1 py-1.5 bg-rose-600 text-white rounded-xl text-xs font-bold"
                >
                  Ya, Padam
                </button>
                <button
                  onClick={() => setConfirmReset(false)}
                  className="flex-1 py-1.5 bg-slate-200 text-slate-700 rounded-xl text-xs font-bold"
                >
                  Batal
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
