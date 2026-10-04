export type AgeGroup = '2-3' | '3-4' | '4-5' | '5-6';

export type CategoryId = 'huruf' | 'nombor' | 'warna_bentuk' | 'haiwan' | 'puzzle' | 'mewarna';

export type GameType = 
  | 'drag_drop' 
  | 'padanan' 
  | 'susunan' 
  | 'klik_jawapan' 
  | 'memory' 
  | 'puzzle' 
  | 'mewarna'
  | 'anggota_badan'
  | 'kenderaan'
  | 'silang_kata'
  | 'tersembunyi';

export interface AgeInfo {
  id: AgeGroup;
  range: string;
  focusTitle: string;
  focusDesc: string;
  tagline: string;
  badgeColor: string;
  bgGradient: string;
  borderColor: string;
  objectives: string[];
}

export interface CategoryInfo {
  id: CategoryId;
  title: string;
  subtitle: string;
  iconName: string;
  colorTheme: string;
  borderTheme: string;
  bgGradient: string;
  defaultGameType: GameType;
  availableGames: GameType[];
}

export interface QuestionOption {
  id: string;
  label: string;
  subLabel?: string;
  icon?: string;
  color?: string;
  imageSvg?: string;
  isCorrect?: boolean;
}

export interface DragItem {
  id: string;
  label: string;
  icon?: string;
  color?: string;
  matchTargetId: string;
}

export interface DropSlot {
  id: string;
  label: string;
  icon?: string;
  color?: string;
  placeholder?: string;
  faintImage?: string; // Gambar samar untuk matching kanak-kanak 2-3 tahun tanpa perkataan
  hideLabel?: boolean; // Sembunyikan label perkataan agar hanya gambar samar dipaparkan
}

export interface PadananPair {
  leftId: string;
  leftText: string;
  leftIcon?: string;
  leftColor?: string;
  rightId: string;
  rightText: string;
  rightIcon?: string;
  rightColor?: string;
}

export interface SusunItem {
  id: string;
  order: number;
  label: string;
  icon?: string;
  color?: string;
}

export interface MemoryCard {
  id: string;
  pairKey: string;
  label: string;
  icon?: string;
  color?: string;
}

export interface QuestionData {
  id: string;
  age: AgeGroup;
  category: CategoryId;
  gameType: GameType;
  instruction: string;
  subInstruction?: string;
  
  // Specific data for each game type:
  // For 'klik_jawapan'
  targetPrompt?: string;
  targetIcon?: string;
  soundAnimalId?: string;
  soundLabel?: string;
  options?: QuestionOption[];
  correctOptionId?: string;

  // For 'drag_drop'
  dragItems?: DragItem[];
  dropSlots?: DropSlot[];

  // For 'padanan'
  pairs?: PadananPair[];

  // For 'susunan'
  susunItems?: SusunItem[];

  // For 'memory'
  memoryCards?: MemoryCard[];
}

export interface PuzzlePiece {
  id: number;
  row: number;
  col: number;
  currentSlot: number | null; // slot index or null if in tray
}

export interface PuzzleData {
  id: string;
  title: string;
  category: string;
  imageTitle: string;
  themeColor: string;
  sceneSvg: string; // SVG data or canvas illustration code
  rows: number;
  cols: number;
  piecesCount: number;
}

export type ColoringCategory = 
  | 'haiwan' 
  | 'buah' 
  | 'sayur' 
  | 'huruf' 
  | 'nombor' 
  | 'bentuk' 
  | 'kenderaan' 
  | 'alam';

export interface ColoringArtwork {
  id: string;
  title: string;
  category: ColoringCategory;
  categoryLabel: string;
  difficulty: string;
  palette: string[];
  referencePreview: string; // SVG preview with colors
  outlineSvg: string; // SVG with path IDs for flood fill / coloring
}

export interface AchievementItem {
  id: string;
  title: string;
  description: string;
  icon: string;
  maxProgress: number;
  currentProgress: number;
  isUnlocked: boolean;
  rewardCoins: number;
}

export interface StickerItem {
  id: string;
  title: string;
  category: string;
  cost: number;
  isUnlocked: boolean;
  emoji: string;
  description: string;
}

export interface UserProgress {
  coins: number;
  stars: number;
  level: number;
  xp: number;
  streak: number;
  lastDailyRewardDate: string | null;
  dailyRewardDay: number;
  soundEnabled: boolean;
  musicEnabled: boolean;
  unlockedStickers: string[];
  achievements: Record<string, boolean>;
  categoryStars: Record<string, number>;
  totalCorrect: number;
  maxCombo: number;
}
