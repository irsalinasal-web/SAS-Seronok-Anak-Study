import { UserProgress, AgeGroup } from '../types';
import { INITIAL_ACHIEVEMENTS } from '../data/kspkData';

const STORAGE_KEY = 'sas_preschool_user_data_v1';

const DEFAULT_PROGRESS: UserProgress = {
  coins: 50,
  stars: 0,
  level: 1,
  xp: 0,
  streak: 1,
  lastDailyRewardDate: null,
  dailyRewardDay: 0,
  soundEnabled: true,
  musicEnabled: true,
  unlockedStickers: ['stk_bintang_emas'],
  achievements: {},
  categoryStars: {
    huruf: 0,
    nombor: 0,
    warna_bentuk: 0,
    haiwan: 0,
    puzzle: 0,
    mewarna: 0,
  },
  totalCorrect: 0,
  maxCombo: 0,
};

class StorageService {
  private progress: UserProgress;

  constructor() {
    this.progress = this.load();
  }

  public getProgress(): UserProgress {
    return { ...this.progress };
  }

  private load(): UserProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEY);
      if (data) {
        return { ...DEFAULT_PROGRESS, ...JSON.parse(data) };
      }
    } catch (e) {
      console.error('Failed to load user progress:', e);
    }
    return { ...DEFAULT_PROGRESS };
  }

  public save(newProgress: Partial<UserProgress>): UserProgress {
    this.progress = { ...this.progress, ...newProgress };
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.progress));
    } catch (e) {
      console.error('Failed to save user progress:', e);
    }
    return { ...this.progress };
  }

  public addScore(isCorrect: boolean, currentCombo: number, category: string): {
    scoreDelta: number;
    coinsEarned: number;
    newCombo: number;
    newTotalStars: number;
    leveledUp: boolean;
  } {
    if (!isCorrect) {
      return {
        scoreDelta: 0,
        coinsEarned: 0,
        newCombo: 0,
        newTotalStars: this.progress.stars,
        leveledUp: false,
      };
    }

    const newCombo = currentCombo + 1;
    // Base 10 + 5 combo bonus
    const scoreDelta = 10 + (newCombo >= 2 ? 5 : 0);
    const coinsEarned = 5 + (newCombo >= 2 ? 2 : 0);

    const oldLevel = this.progress.level;
    const newXp = this.progress.xp + scoreDelta;
    const newLevel = Math.floor(newXp / 100) + 1;
    const leveledUp = newLevel > oldLevel;

    const newStars = this.progress.stars + 1;
    const catStars = { ...this.progress.categoryStars };
    catStars[category] = (catStars[category] || 0) + 1;

    const maxCombo = Math.max(this.progress.maxCombo, newCombo);
    const totalCorrect = this.progress.totalCorrect + 1;

    this.save({
      coins: this.progress.coins + coinsEarned,
      stars: newStars,
      xp: newXp,
      level: newLevel,
      categoryStars: catStars,
      maxCombo,
      totalCorrect,
    });

    return {
      scoreDelta,
      coinsEarned,
      newCombo,
      newTotalStars: newStars,
      leveledUp,
    };
  }

  public checkDailyReward(): { canClaim: boolean; nextDay: number } {
    const today = new Date().toISOString().split('T')[0];
    const lastDate = this.progress.lastDailyRewardDate;

    if (!lastDate) {
      return { canClaim: true, nextDay: 1 };
    }

    if (lastDate === today) {
      return { canClaim: false, nextDay: (this.progress.dailyRewardDay % 7) + 1 };
    }

    // Check if consecutive day
    const lastTime = new Date(lastDate).getTime();
    const todayTime = new Date(today).getTime();
    const dayDiff = Math.round((todayTime - lastTime) / (1000 * 3600 * 24));

    let nextDay = this.progress.dailyRewardDay + 1;
    if (dayDiff > 1) {
      // Streak broken, reset to day 1
      nextDay = 1;
    } else if (nextDay > 7) {
      nextDay = 1;
    }

    return { canClaim: true, nextDay };
  }

  public claimDailyReward(rewardCoins: number, rewardStars: number): UserProgress {
    const today = new Date().toISOString().split('T')[0];
    const nextDay = (this.progress.dailyRewardDay % 7) + 1;

    return this.save({
      coins: this.progress.coins + rewardCoins,
      stars: this.progress.stars + rewardStars,
      lastDailyRewardDate: today,
      dailyRewardDay: nextDay,
      streak: this.progress.streak + 1,
    });
  }

  public unlockSticker(stickerId: string, cost: number): boolean {
    if (this.progress.coins < cost) return false;
    if (this.progress.unlockedStickers.includes(stickerId)) return true;

    this.save({
      coins: this.progress.coins - cost,
      unlockedStickers: [...this.progress.unlockedStickers, stickerId],
    });
    return true;
  }

  public resetAllProgress(): UserProgress {
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
    this.progress = { ...DEFAULT_PROGRESS };
    return this.progress;
  }
}

export const storage = new StorageService();
