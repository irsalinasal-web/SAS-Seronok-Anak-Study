import React, { useState, useRef, useEffect, useCallback } from 'react';
import { COLORING_ARTWORKS } from '../../data/kspkData';
import { ColoringArtwork, ColoringCategory } from '../../types';
import { audio } from '../../services/audioService';

interface MewarnaStudioProps {
  onArtworkCompleted?: () => void;
}

const CATEGORIES: { id: ColoringCategory; label: string; icon: string }[] = [
  { id: 'haiwan', label: 'Haiwan', icon: '🐱' },
  { id: 'buah', label: 'Buah', icon: '🍎' },
  { id: 'sayur', label: 'Sayur', icon: '🥕' },
  { id: 'huruf', label: 'Huruf', icon: '🅰️' },
  { id: 'nombor', label: 'Nombor', icon: '5️⃣' },
  { id: 'bentuk', label: 'Bentuk', icon: '⭐' },
  { id: 'kenderaan', label: 'Kenderaan', icon: '🚗' },
  { id: 'alam', label: 'Alam', icon: '🌈' },
];

const PALETTE = [
  '#EF4444', // Merah
  '#F97316', // Jingga
  '#FBBF24', // Kuning Emas
  '#FDE047', // Kuning Cerah
  '#10B981', // Hijau Zamrud
  '#22C55E', // Hijau Rumput
  '#06B6D4', // Biru Cyan
  '#38BDF8', // Biru Langit
  '#3B82F6', // Biru Laut
  '#8B5CF6', // Ungu
  '#A855F7', // Violet
  '#EC4899', // Merah Jambu
  '#F472B6', // Pink Pastel
  '#8B4513', // Coklat Kayu
  '#D97706', // Karamel
  '#64748B', // Kelabu
  '#1E293B', // Hitam / Arang
  '#FFFFFF', // Putih
];

export const MewarnaStudio: React.FC<MewarnaStudioProps> = ({ onArtworkCompleted }) => {
  const [selectedCat, setSelectedCat] = useState<ColoringCategory>('haiwan');
  const [selectedArtwork, setSelectedArtwork] = useState<ColoringArtwork>(COLORING_ARTWORKS[0]);
  const [selectedColor, setSelectedColor] = useState<string>(PALETTE[0]);
  const [tool, setTool] = useState<'bucket' | 'brush' | 'eraser'>('bucket');
  const [brushSize, setBrushSize] = useState<number>(12);
  const [showReference, setShowReference] = useState<boolean>(true);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [history, setHistory] = useState<ImageData[]>([]);
  const isDrawing = useRef(false);

  // Filter artworks by category
  const filteredArtworks = COLORING_ARTWORKS.filter(
    a => a.category === selectedCat
  );

  // Initialize Canvas with artwork outline
  const drawArtworkOutline = useCallback((ctx: CanvasRenderingContext2D, artwork: ColoringArtwork) => {
    const width = ctx.canvas.width;
    const height = ctx.canvas.height;

    // Clean white background
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, width, height);

    // Subtle outer printable frame
    ctx.strokeStyle = '#E2E8F0';
    ctx.lineWidth = 4;
    ctx.strokeRect(10, 10, width - 20, height - 20);

    ctx.strokeStyle = '#1E293B';
    ctx.lineWidth = 6;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    const cx = width / 2;
    const cy = height / 2;

    // Draw rich, vector outlines depending on artwork
    if (artwork.id === 'col_kucing') {
      // Head
      ctx.beginPath();
      ctx.arc(cx, cy, 110, 0, Math.PI * 2);
      ctx.stroke();

      // Ears
      ctx.beginPath();
      ctx.moveTo(cx - 80, cy - 80);
      ctx.lineTo(cx - 100, cy - 170);
      ctx.lineTo(cx - 20, cy - 100);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 80, cy - 80);
      ctx.lineTo(cx + 100, cy - 170);
      ctx.lineTo(cx + 20, cy - 100);
      ctx.stroke();

      // Inner ears
      ctx.beginPath();
      ctx.moveTo(cx - 70, cy - 85);
      ctx.lineTo(cx - 85, cy - 145);
      ctx.lineTo(cx - 35, cy - 98);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx + 70, cy - 85);
      ctx.lineTo(cx + 85, cy - 145);
      ctx.lineTo(cx + 35, cy - 98);
      ctx.stroke();

      // Eyes
      ctx.beginPath();
      ctx.arc(cx - 45, cy - 20, 16, 0, Math.PI * 2);
      ctx.arc(cx + 45, cy - 20, 16, 0, Math.PI * 2);
      ctx.stroke();

      // Nose & Mouth
      ctx.beginPath();
      ctx.arc(cx, cy + 20, 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(cx, cy + 32);
      ctx.lineTo(cx - 25, cy + 50);
      ctx.moveTo(cx, cy + 32);
      ctx.lineTo(cx + 25, cy + 50);
      ctx.stroke();

      // Whiskers
      ctx.beginPath();
      ctx.moveTo(cx - 60, cy + 20); ctx.lineTo(cx - 130, cy + 15);
      ctx.moveTo(cx - 60, cy + 35); ctx.lineTo(cx - 130, cy + 45);
      ctx.moveTo(cx + 60, cy + 20); ctx.lineTo(cx + 130, cy + 15);
      ctx.moveTo(cx + 60, cy + 35); ctx.lineTo(cx + 130, cy + 45);
      ctx.stroke();
    } else if (artwork.id === 'col_epal') {
      // Apple body
      ctx.beginPath();
      ctx.arc(cx - 50, cy, 95, 0, Math.PI * 2);
      ctx.arc(cx + 50, cy, 95, 0, Math.PI * 2);
      ctx.stroke();

      // Stem
      ctx.beginPath();
      ctx.lineWidth = 10;
      ctx.moveTo(cx, cy - 80);
      ctx.quadraticCurveTo(cx + 15, cy - 130, cx + 35, cy - 140);
      ctx.stroke();
      ctx.lineWidth = 6;

      // Leaf
      ctx.beginPath();
      ctx.moveTo(cx + 15, cy - 110);
      ctx.quadraticCurveTo(cx + 70, cy - 140, cx + 90, cy - 100);
      ctx.quadraticCurveTo(cx + 50, cy - 80, cx + 15, cy - 110);
      ctx.stroke();
    } else if (artwork.id === 'col_bintang') {
      // Big Star
      ctx.beginPath();
      const spikes = 5;
      const outerRadius = 140;
      const innerRadius = 65;
      let rot = (Math.PI / 2) * 3;
      let x = cx;
      let y = cy;
      const step = Math.PI / spikes;

      ctx.moveTo(cx, cy - outerRadius);
      for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
      }
      ctx.lineTo(cx, cy - outerRadius);
      ctx.closePath();
      ctx.stroke();

      // Cute Eyes on Star
      ctx.beginPath();
      ctx.arc(cx - 30, cy - 10, 10, 0, Math.PI * 2);
      ctx.arc(cx + 30, cy - 10, 10, 0, Math.PI * 2);
      ctx.stroke();

      // Smile
      ctx.beginPath();
      ctx.arc(cx, cy + 15, 20, 0, Math.PI);
      ctx.stroke();
    } else if (artwork.id === 'col_kereta') {
      // Car Body
      ctx.beginPath();
      ctx.roundRect(cx - 150, cy, 300, 70, 20);
      ctx.stroke();

      // Cabin
      ctx.beginPath();
      ctx.roundRect(cx - 90, cy - 70, 180, 70, [30, 30, 0, 0]);
      ctx.stroke();

      // Windows
      ctx.beginPath();
      ctx.roundRect(cx - 75, cy - 55, 65, 45, 10);
      ctx.roundRect(cx + 10, cy - 55, 65, 45, 10);
      ctx.stroke();

      // Wheels
      ctx.beginPath();
      ctx.arc(cx - 85, cy + 70, 35, 0, Math.PI * 2);
      ctx.arc(cx + 85, cy + 70, 35, 0, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(cx - 85, cy + 70, 15, 0, Math.PI * 2);
      ctx.arc(cx + 85, cy + 70, 15, 0, Math.PI * 2);
      ctx.stroke();
    } else {
      // Generic Friendly Illustration Outline (e.g. Letter/Number/Nature)
      ctx.beginPath();
      ctx.arc(cx, cy, 120, 0, Math.PI * 2);
      ctx.stroke();

      ctx.font = 'bold 110px "Fredoka", sans-serif';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      ctx.strokeText(artwork.referencePreview.replace(/[^A-Za-z0-9]/g, '') || artwork.title[0], cx, cy);
    }

    // Save baseline snapshot in history
    const baseline = ctx.getImageData(0, 0, width, height);
    setHistory([baseline]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;
    drawArtworkOutline(ctx, selectedArtwork);
  }, [selectedArtwork, drawArtworkOutline]);

  // Push state to undo history
  const pushState = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    const state = ctx.getImageData(0, 0, canvas.width, canvas.height);
    setHistory(prev => [...prev.slice(-15), state]); // keep max 15 steps
  };

  const handleUndo = () => {
    if (history.length <= 1) return;
    audio.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const newHistory = [...history];
    newHistory.pop(); // remove current
    const previous = newHistory[newHistory.length - 1];
    ctx.putImageData(previous, 0, 0);
    setHistory(newHistory);
  };

  const handleReset = () => {
    audio.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    drawArtworkOutline(ctx, selectedArtwork);
  };

  // Save PNG export
  const handleSavePNG = () => {
    audio.playSuccess();
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = `S.A.S_Mewarna_${selectedArtwork.title.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
    if (onArtworkCompleted) onArtworkCompleted();
  };

  // Printable A4
  const handlePrint = () => {
    audio.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;
    try {
      const dataUrl = canvas.toDataURL('image/png');
      const printIframe = document.createElement('iframe');
      printIframe.style.position = 'fixed';
      printIframe.style.right = '0';
      printIframe.style.bottom = '0';
      printIframe.style.width = '0';
      printIframe.style.height = '0';
      printIframe.style.border = '0';
      document.body.appendChild(printIframe);

      const frameDoc = printIframe.contentWindow?.document;
      if (frameDoc) {
        frameDoc.write(`
          <!DOCTYPE html>
          <html>
            <head>
              <title>S.A.S - Mewarna ${selectedArtwork.title}</title>
              <style>
                body { text-align: center; font-family: sans-serif; padding: 20px; }
                img { max-width: 95%; max-height: 85vh; border: 2px solid #ddd; border-radius: 8px; }
              </style>
            </head>
            <body>
              <h2>S.A.S (Seronok Anak Study) - ${selectedArtwork.title}</h2>
              <img src="${dataUrl}" />
            </body>
          </html>
        `);
        frameDoc.close();
        setTimeout(() => {
          printIframe.contentWindow?.focus();
          printIframe.contentWindow?.print();
          setTimeout(() => {
            document.body.removeChild(printIframe);
          }, 2000);
        }, 300);
      }
    } catch {
      // Fallback: trigger image download
      handleSavePNG();
    }
  };

  // Convert hex color to RGBA
  const hexToRgba = (hex: string): [number, number, number, number] => {
    let c = hex.replace('#', '');
    if (c.length === 3) c = c.split('').map(x => x + x).join('');
    const num = parseInt(c, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255, 255];
  };

  // Flood fill algorithm for bucket tool
  const floodFill = (startX: number, startY: number, fillColor: string) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const width = canvas.width;
    const height = canvas.height;
    const imageData = ctx.getImageData(0, 0, width, height);
    const data = imageData.data;

    const targetColor = hexToRgba(fillColor);
    const startPos = (startY * width + startX) * 4;
    const startR = data[startPos];
    const startG = data[startPos + 1];
    const startB = data[startPos + 2];
    const startA = data[startPos + 3];

    // Don't fill if clicking already filled color or dark outline boundary
    if (
      Math.abs(startR - targetColor[0]) < 10 &&
      Math.abs(startG - targetColor[1]) < 10 &&
      Math.abs(startB - targetColor[2]) < 10
    ) {
      return;
    }

    // Boundary check (avoid coloring dark black outlines)
    if (startR < 50 && startG < 50 && startB < 50 && startA > 200) {
      return;
    }

    const matchStartColor = (pos: number) => {
      const r = data[pos];
      const g = data[pos + 1];
      const b = data[pos + 2];
      const a = data[pos + 3];
      return (
        Math.abs(r - startR) < 35 &&
        Math.abs(g - startG) < 35 &&
        Math.abs(b - startB) < 35 &&
        Math.abs(a - startA) < 35
      );
    };

    const pixelStack: [number, number][] = [[startX, startY]];
    const seen = new Uint8Array(width * height);

    while (pixelStack.length > 0) {
      const [x, y] = pixelStack.pop()!;
      let newY = y;
      let pixelPos = (newY * width + x) * 4;

      while (newY >= 0 && matchStartColor(pixelPos)) {
        newY--;
        pixelPos -= width * 4;
      }

      pixelPos += width * 4;
      newY++;

      let reachLeft = false;
      let reachRight = false;

      while (newY < height && matchStartColor(pixelPos)) {
        const offset = newY * width + x;
        if (!seen[offset]) {
          seen[offset] = 1;
          data[pixelPos] = targetColor[0];
          data[pixelPos + 1] = targetColor[1];
          data[pixelPos + 2] = targetColor[2];
          data[pixelPos + 3] = targetColor[3];

          if (x > 0) {
            if (matchStartColor(pixelPos - 4)) {
              if (!reachLeft) {
                pixelStack.push([x - 1, newY]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }

          if (x < width - 1) {
            if (matchStartColor(pixelPos + 4)) {
              if (!reachRight) {
                pixelStack.push([x + 1, newY]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }
        }

        newY++;
        pixelPos += width * 4;
      }
    }

    ctx.putImageData(imageData, 0, 0);
    pushState();
    audio.playSnap();
  };

  // Canvas interaction handlers
  const getCanvasCoords = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const scaleX = canvas.width / rect.width;
    const scaleY = canvas.height / rect.height;

    let clientX = 0;
    let clientY = 0;

    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = e.clientX;
      clientY = e.clientY;
    }

    return {
      x: Math.floor((clientX - rect.left) * scaleX),
      y: Math.floor((clientY - rect.top) * scaleY),
    };
  };

  const handlePointerDown = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const { x, y } = getCanvasCoords(e);

    if (tool === 'bucket') {
      floodFill(x, y, selectedColor);
    } else {
      isDrawing.current = true;
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.strokeStyle = tool === 'eraser' ? '#FFFFFF' : selectedColor;
      ctx.lineWidth = brushSize;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
    }
  };

  const handlePointerMove = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    if (!isDrawing.current || tool === 'bucket') return;
    const { x, y } = getCanvasCoords(e);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const handlePointerUp = () => {
    if (isDrawing.current) {
      isDrawing.current = false;
      pushState();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center p-2">
      {/* Header */}
      <div className="w-full bg-white/95 rounded-3xl p-4 mb-4 text-center border-4 border-amber-200 shadow-md">
        <h3 className="text-2xl md:text-3xl font-black text-slate-800">
          Studio Mewarna S.A.S 🎨
        </h3>
        <p className="text-xs md:text-sm font-semibold text-slate-500 mt-1">
          Pilih lukisan kegemaran anda, gunakan Berus atau Tong Warna untuk mewarna!
        </p>

        {/* Categories Bar */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 mt-3">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                audio.playPop();
                setSelectedCat(cat.id);
                const first = COLORING_ARTWORKS.find(a => a.category === cat.id);
                if (first) setSelectedArtwork(first);
              }}
              className={`py-1.5 px-3 rounded-full text-xs font-bold flex items-center gap-1 transition-all ${
                selectedCat === cat.id
                  ? 'bg-amber-400 text-amber-950 shadow-sm scale-105'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              <span>{cat.icon}</span>
              <span>{cat.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Studio Arena */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 w-full">
        {/* Left Tools & Palette Panel */}
        <div className="lg:col-span-3 bg-white rounded-3xl p-4 border-4 border-slate-200 shadow-md flex flex-col gap-4">
          {/* Tool Selector */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Alat Mewarna
            </span>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => { audio.playPop(); setTool('bucket'); }}
                className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-xs font-bold border-2 transition-all ${
                  tool === 'bucket'
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-black shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl mb-1">🪣</span>
                <span>Isi Warna</span>
              </button>

              <button
                onClick={() => { audio.playPop(); setTool('brush'); }}
                className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-xs font-bold border-2 transition-all ${
                  tool === 'brush'
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-black shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl mb-1">🖌️</span>
                <span>Berus</span>
              </button>

              <button
                onClick={() => { audio.playPop(); setTool('eraser'); }}
                className={`p-2.5 rounded-2xl flex flex-col items-center justify-center text-xs font-bold border-2 transition-all ${
                  tool === 'eraser'
                    ? 'bg-amber-100 border-amber-500 text-amber-950 font-black shadow-sm'
                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                }`}
              >
                <span className="text-2xl mb-1">🧽</span>
                <span>Pemadam</span>
              </button>
            </div>
          </div>

          {/* Brush Size (if brush) */}
          {tool === 'brush' && (
            <div className="bg-slate-50 p-2.5 rounded-2xl border border-slate-200">
              <span className="text-xs font-bold text-slate-500 block mb-1.5">
                Saiz Berus: {brushSize}px
              </span>
              <div className="flex gap-2">
                {[6, 12, 24].map((size) => (
                  <button
                    key={size}
                    onClick={() => setBrushSize(size)}
                    className={`flex-1 py-1.5 rounded-xl text-xs font-bold border ${
                      brushSize === size
                        ? 'bg-amber-400 text-amber-950 border-amber-500'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                  >
                    {size === 6 ? 'Halus' : size === 12 ? 'Sedang' : 'Tebal'}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Color Palette */}
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Pilihan Warna
            </span>
            <div className="grid grid-cols-6 gap-1.5">
              {PALETTE.map((color) => (
                <button
                  key={color}
                  onClick={() => {
                    audio.playPop();
                    setSelectedColor(color);
                    if (tool === 'eraser') setTool('brush');
                  }}
                  className={`w-9 h-9 rounded-xl border-2 transition-transform shadow-sm ${
                    selectedColor === color
                      ? 'scale-115 ring-2 ring-amber-400 border-white z-10'
                      : 'border-slate-300 hover:scale-105'
                  }`}
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </div>

          {/* Sample Preview Thumbnail */}
          <div className="bg-amber-50 p-3 rounded-2xl border border-amber-200 flex flex-col items-center">
            <div className="flex items-center justify-between w-full mb-1">
              <span className="text-xs font-bold text-amber-900">Contoh Warna</span>
              <button
                onClick={() => setShowReference(!showReference)}
                className="text-[10px] text-amber-700 underline font-semibold"
              >
                {showReference ? 'Sembunyi' : 'Tunjuk'}
              </button>
            </div>
            {showReference && (
              <div className="text-5xl py-2 animate-soft-bounce">
                {selectedArtwork.referencePreview}
              </div>
            )}
            <span className="text-xs font-bold text-slate-700">
              {selectedArtwork.title}
            </span>
          </div>

          {/* Action buttons */}
          <div className="flex flex-col gap-2 mt-auto">
            <div className="flex gap-2">
              <button
                onClick={handleUndo}
                disabled={history.length <= 1}
                className="flex-1 py-2 bg-slate-100 hover:bg-slate-200 disabled:opacity-50 text-slate-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1"
              >
                <span>↩️</span> Undo
              </button>
              <button
                onClick={handleReset}
                className="flex-1 py-2 bg-rose-50 hover:bg-rose-100 text-rose-700 rounded-xl font-bold text-xs flex items-center justify-center gap-1 border border-rose-200"
              >
                <span>🔄</span> Reset
              </button>
            </div>

            <button
              onClick={handleSavePNG}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-md flex items-center justify-center gap-2 btn-3d"
            >
              <span>💾</span> Simpan Gambar (PNG)
            </button>

            <button
              onClick={handlePrint}
              className="w-full py-2 bg-sky-100 hover:bg-sky-200 text-sky-800 rounded-2xl font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <span>🖨️</span> Cetak Lembaran A4
            </button>
          </div>
        </div>

        {/* Center / Right: The Interactive HTML5 Canvas */}
        <div className="lg:col-span-9 bg-white rounded-3xl p-4 border-4 border-amber-300 shadow-xl flex flex-col items-center justify-center">
          <div className="relative w-full max-w-[560px] aspect-[4/3] bg-white rounded-2xl overflow-hidden border-2 border-slate-200 shadow-inner">
            <canvas
              ref={canvasRef}
              width={800}
              height={600}
              onMouseDown={handlePointerDown}
              onMouseMove={handlePointerMove}
              onMouseUp={handlePointerUp}
              onMouseLeave={handlePointerUp}
              onTouchStart={handlePointerDown}
              onTouchMove={handlePointerMove}
              onTouchEnd={handlePointerUp}
              className="w-full h-full object-contain cursor-crosshair touch-none"
            />
          </div>

          {/* Quick Artwork switcher thumbnail row */}
          <div className="flex gap-2 mt-4 overflow-x-auto max-w-full p-2">
            {filteredArtworks.map((art) => (
              <button
                key={art.id}
                onClick={() => {
                  audio.playPop();
                  setSelectedArtwork(art);
                }}
                className={`py-2 px-3 rounded-2xl border-2 flex items-center gap-2 whitespace-nowrap text-xs font-bold transition-all ${
                  selectedArtwork.id === art.id
                    ? 'bg-amber-300 border-amber-500 text-amber-950 scale-105 shadow-sm'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span className="text-xl">{art.referencePreview}</span>
                <span>{art.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
