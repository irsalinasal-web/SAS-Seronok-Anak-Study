import React from 'react';
import { audio } from '../services/audioService';
import { AgeGroup, AgeInfo } from '../types';

interface AgeSelectionProps {
  onSelectAge: (age: AgeGroup) => void;
  onBack: () => void;
}

const AGE_TIERS: AgeInfo[] = [
  {
    id: '2-3',
    range: '2–3 Tahun',
    focusTitle: 'Mengenal Dunia',
    focusDesc: 'Fokus awal penerokaan deria & motor halus',
    tagline: 'Langkah Pertama Belajar',
    badgeColor: 'bg-rose-500',
    bgGradient: 'from-rose-50 to-orange-50 border-rose-300',
    borderColor: 'border-rose-400',
    objectives: [
      'Kenal objek harian & warna asas',
      'Kenal haiwan & bunyi comel',
      'Bentuk geometri & nombor mudah (1-5)',
      'Latih koordinasi mata & jari tangan',
    ],
  },
  {
    id: '3-4',
    range: '3–4 Tahun',
    focusTitle: 'Kenal Bahasa & Asas',
    focusDesc: 'Fokus asas sebutan, nombor & logik awal',
    tagline: 'Mula Petah Berkata-kata',
    badgeColor: 'bg-amber-500',
    bgGradient: 'from-amber-50 to-yellow-50 border-amber-300',
    borderColor: 'border-amber-400',
    objectives: [
      'Sebut huruf & kenal perkataan bergambar',
      'Padanan gambar & objek seiras',
      'Mengira nombor 1 hingga 10',
      'Mengelaskan objek & logik asas',
    ],
  },
  {
    id: '4-5',
    range: '4–5 Tahun',
    focusTitle: 'Pra Sekolah',
    focusDesc: 'Fokus suku kata, operasi tambah & turutan',
    tagline: 'Tahap Awal Tadika KSPK',
    badgeColor: 'bg-emerald-500',
    bgGradient: 'from-emerald-50 to-teal-50 border-emerald-300',
    borderColor: 'border-emerald-400',
    objectives: [
      'Kenal suku kata terbuka (ba, bi, bu)',
      'Membaca perkataan mudah (bola, buku)',
      'Operasi tambah & tolak asas bergambar',
      'Menyusun urutan & penaakulan logik',
    ],
  },
  {
    id: '5-6',
    range: '5–6 Tahun',
    focusTitle: 'Persediaan Sekolah',
    focusDesc: 'Fokus membaca lancar, mengira & Tahun 1',
    tagline: 'Sedia Melangkah ke Tahun 1',
    badgeColor: 'bg-sky-500',
    bgGradient: 'from-sky-50 to-indigo-50 border-sky-300',
    borderColor: 'border-sky-400',
    objectives: [
      'Membaca ayat & mengeja perkataan',
      'Operasi tambah & tolak lingkungan 20',
      'Penyelesaian masalah & logik analitikal',
      'Kemahiran persediaan awal Tahun 1',
    ],
  },
];

export const AgeSelection: React.FC<AgeSelectionProps> = ({ onSelectAge, onBack }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-amber-100 via-amber-50 to-sky-100 p-4 md:p-8 flex flex-col justify-between select-none">
      {/* Top Bar */}
      <div className="w-full max-w-5xl mx-auto flex items-center justify-between">
        <button
          onClick={() => {
            audio.playPop();
            onBack();
          }}
          className="py-2.5 px-4 bg-white rounded-2xl shadow-sm border-2 border-slate-200 font-bold text-slate-700 flex items-center gap-2 hover:bg-slate-50 transition-colors btn-3d"
        >
          <span>◀</span>
          <span>Kembali</span>
        </button>

        <div className="text-center">
          <span className="text-xs font-bold text-amber-700 bg-amber-200/80 px-3 py-1 rounded-full uppercase tracking-wider">
            Kurikulum KSPK
          </span>
        </div>

        <div className="w-20" />
      </div>

      {/* Title */}
      <div className="w-full max-w-4xl mx-auto text-center my-4">
        <h2 className="text-3xl md:text-5xl font-black text-slate-800">
          Pilih Peringkat Umur
        </h2>
        <p className="text-slate-600 font-semibold text-sm md:text-base mt-2">
          Setiap peringkat mempunyai silibus, tahap kesukaran dan aktiviti yang disesuaikan khas.
        </p>
      </div>

      {/* 4 Age Cards Grid */}
      <div className="w-full max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 my-auto">
        {AGE_TIERS.map((tier) => (
          <div
            key={tier.id}
            onClick={() => {
              audio.playPop();
              onSelectAge(tier.id);
            }}
            className={`bg-gradient-to-b ${tier.bgGradient} rounded-3xl p-5 border-4 ${tier.borderColor} shadow-lg hover:scale-102 hover:shadow-xl active:scale-98 transition-all cursor-pointer flex flex-col justify-between group`}
          >
            <div>
              {/* Badge */}
              <div className="flex items-center justify-between mb-3">
                <span className={`${tier.badgeColor} text-white font-black text-sm px-3.5 py-1 rounded-full shadow-sm`}>
                  {tier.range}
                </span>
                <span className="text-2xl group-hover:scale-125 transition-transform">
                  {tier.id === '2-3' ? '👶' : tier.id === '3-4' ? '🧒' : tier.id === '4-5' ? '🎒' : '🎓'}
                </span>
              </div>

              {/* Focus Title */}
              <h3 className="text-2xl font-black text-slate-800 group-hover:text-amber-700 transition-colors">
                {tier.focusTitle}
              </h3>
              <p className="text-xs font-bold text-slate-500 mt-1 mb-4">
                {tier.focusDesc}
              </p>

              {/* Objectives List */}
              <div className="space-y-2 border-t border-slate-200/60 pt-3">
                <span className="text-[11px] font-black text-slate-400 uppercase tracking-wider block">
                  Objektif Pembelajaran:
                </span>
                {tier.objectives.map((obj, idx) => (
                  <div key={idx} className="flex items-start gap-1.5 text-xs font-semibold text-slate-700 leading-snug">
                    <span className="text-emerald-600 font-bold shrink-0">✓</span>
                    <span>{obj}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Select Button */}
            <div className="mt-5 pt-3 border-t border-slate-200/60">
              <button className="w-full py-3 bg-white hover:bg-slate-50 text-slate-800 font-black text-sm rounded-2xl border-2 border-slate-300 shadow-sm flex items-center justify-center gap-2 group-hover:border-amber-400 group-hover:bg-amber-400 group-hover:text-amber-950 transition-all btn-3d">
                <span>Pilih Umur Ini</span>
                <span>▶</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Footer advice */}
      <div className="w-full text-center text-xs text-slate-500 py-2">
        Ibu bapa atau guru boleh menukar umur pada bila-bila masa.
      </div>
    </div>
  );
};
