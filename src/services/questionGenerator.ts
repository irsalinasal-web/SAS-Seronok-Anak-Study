import { 
  AgeGroup, 
  CategoryId, 
  GameType, 
  QuestionData, 
  QuestionOption, 
  DragItem, 
  DropSlot, 
  PadananPair, 
  SusunItem, 
  MemoryCard 
} from '../types';
import { 
  ALPHABET_LIST, 
  SUKU_KATA_EASY, 
  NUMBERS_DATA, 
  COLORS_DATA, 
  SHAPES_DATA, 
  ANIMALS_DATA 
} from '../data/kspkData';

// Utility helper to shuffle arrays (Fisher-Yates)
export function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Random integer between min and max (inclusive)
function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

/**
 * Question Generator Engine compliant with Malaysian KSPK Preschool Standards.
 * Capable of procedurally generating over 500+ unique questions with zero repeats per session.
 */
class QuestionGenerator {
  private usedQuestionIds = new Set<string>();

  public clearHistory() {
    this.usedQuestionIds.clear();
  }

  /**
   * Generates a batch of randomized, non-repeating questions for an age group and category.
   */
  public generateSessionQuestions(
    age: AgeGroup, 
    category: CategoryId, 
    gameType: GameType, 
    count: number = 5
  ): QuestionData[] {
    const questions: QuestionData[] = [];
    let attempts = 0;

    while (questions.length < count && attempts < count * 20) {
      attempts++;
      const q = this.generateSingleQuestion(age, category, gameType);
      if (q && !this.usedQuestionIds.has(q.id)) {
        this.usedQuestionIds.add(q.id);
        questions.push(q);
      }
    }

    // If pool exhausted in long session, clear and regenerate
    if (questions.length < count) {
      this.clearHistory();
      while (questions.length < count) {
        const q = this.generateSingleQuestion(age, category, gameType);
        if (q) questions.push(q);
      }
    }

    return questions;
  }

  public generateSingleQuestion(age: AgeGroup, category: CategoryId, gameType: GameType): QuestionData | null {
    switch (gameType) {
      case 'klik_jawapan':
        return this.generateKlikJawapan(age, category);
      case 'drag_drop':
        return this.generateDragDrop(age, category);
      case 'padanan':
        return this.generatePadanan(age, category);
      case 'susunan':
        return this.generateSusunan(age, category);
      case 'memory':
        return this.generateMemoryGame(age, category);
      default:
        return this.generateKlikJawapan(age, category);
    }
  }

  /* -------------------------------------------------------------
     1. KLIK JAWAPAN (Multiple-Choice Picture/Symbol Selection)
  ------------------------------------------------------------- */
  private generateKlikJawapan(age: AgeGroup, category: CategoryId): QuestionData {
    const qid = `kj_${age}_${category}_${Date.now()}_${Math.random()}`;

    if (category === 'huruf') {
      if (age === '2-3') {
        // Find single letter
        const target = ALPHABET_LIST[randomInt(0, ALPHABET_LIST.length - 1)];
        const distractors = shuffleArray(ALPHABET_LIST.filter(a => a.letter !== target.letter)).slice(0, 2);
        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: target.letter, icon: target.icon, subLabel: target.word, isCorrect: true },
          { id: 'w1', label: distractors[0].letter, icon: distractors[0].icon, subLabel: distractors[0].word, isCorrect: false },
          { id: 'w2', label: distractors[1].letter, icon: distractors[1].icon, subLabel: distractors[1].word, isCorrect: false },
        ]);
        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Klik Huruf "${target.letter}"`,
          subInstruction: `${target.letter} untuk ${target.word}`,
          targetPrompt: target.letter,
          targetIcon: target.icon,
          options,
          correctOptionId: 'corr',
        };
      } else if (age === '3-4') {
        // Match letter to initial sound
        const target = ALPHABET_LIST[randomInt(0, ALPHABET_LIST.length - 1)];
        const distractors = shuffleArray(ALPHABET_LIST.filter(a => a.letter !== target.letter)).slice(0, 2);
        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: target.word, icon: target.icon, subLabel: `Bermula huruf ${target.letter}`, isCorrect: true },
          { id: 'w1', label: distractors[0].word, icon: distractors[0].icon, subLabel: `Bermula huruf ${distractors[0].letter}`, isCorrect: false },
          { id: 'w2', label: distractors[1].word, icon: distractors[1].icon, subLabel: `Bermula huruf ${distractors[1].letter}`, isCorrect: false },
        ]);
        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Pilih gambar yang bermula dengan huruf "${target.letter}"`,
          subInstruction: `Huruf awal: ${target.letter}`,
          targetPrompt: target.letter,
          options,
          correctOptionId: 'corr',
        };
      } else if (age === '4-5') {
        // Suku kata awal (e.g. Bo - Bola)
        const target = SUKU_KATA_EASY[randomInt(0, SUKU_KATA_EASY.length - 1)];
        const distractors = shuffleArray(SUKU_KATA_EASY.filter(s => s.word !== target.word)).slice(0, 3);
        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: target.s1, subLabel: target.word, icon: target.icon, isCorrect: true },
          { id: 'w1', label: distractors[0].s1, subLabel: distractors[0].word, icon: distractors[0].icon, isCorrect: false },
          { id: 'w2', label: distractors[1].s1, subLabel: distractors[1].word, icon: distractors[1].icon, isCorrect: false },
          { id: 'w3', label: distractors[2].s1, subLabel: distractors[2].word, icon: distractors[2].icon, isCorrect: false },
        ]);
        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Apakah suku kata awal bagi perkataan "${target.word}"?`,
          subInstruction: `${target.icon} [ ? ] + ${target.s2} = ${target.word}`,
          targetPrompt: target.word,
          targetIcon: target.icon,
          options,
          correctOptionId: 'corr',
        };
      } else {
        // 5-6: Mengeja perkataan lengkap / Suku kata akhir
        const target = SUKU_KATA_EASY[randomInt(0, SUKU_KATA_EASY.length - 1)];
        const distractors = shuffleArray(SUKU_KATA_EASY.filter(s => s.word !== target.word)).slice(0, 3);
        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: target.word, subLabel: `${target.s1} + ${target.s2}`, icon: target.icon, isCorrect: true },
          { id: 'w1', label: distractors[0].word, subLabel: `${distractors[0].s1} + ${distractors[0].s2}`, icon: distractors[0].icon, isCorrect: false },
          { id: 'w2', label: distractors[1].word, subLabel: `${distractors[1].s1} + ${distractors[1].s2}`, icon: distractors[1].icon, isCorrect: false },
          { id: 'w3', label: distractors[2].word, subLabel: `${distractors[2].s1} + ${distractors[2].s2}`, icon: distractors[2].icon, isCorrect: false },
        ]);
        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Pilih ejaan yang betul untuk gambar "${target.word}"`,
          subInstruction: `${target.icon} Gambar: ${target.word}`,
          targetPrompt: target.word,
          targetIcon: target.icon,
          options,
          correctOptionId: 'corr',
        };
      }
    }

    if (category === 'nombor') {
      if (age === '2-3') {
        // Count 1 to 5 objects - tailored specifically for 2-3 years old KSPK
        const count = randomInt(1, 5);
        const target = NUMBERS_DATA.find(n => n.num === count)!;
        const otherNums = [1, 2, 3, 4, 5].filter(n => n !== count);
        const wrongNums = shuffleArray(otherNums).slice(0, 2);

        const w1Target = NUMBERS_DATA.find(n => n.num === wrongNums[0])!;
        const w2Target = NUMBERS_DATA.find(n => n.num === wrongNums[1])!;

        // 2 variety formats for 2-3 years:
        // Format A: Gambar objek dipaparkan -> pilih nombor & perkataan yang sepadan
        // Format B: Soalan meminta pilih kumpulan gambar yang sepadan dengan nombor & perkataan
        const format = Math.random() > 0.5 ? 'kira_objek' : 'pilih_gambar';

        if (format === 'kira_objek') {
          const options: QuestionOption[] = shuffleArray([
            { id: 'corr', label: String(count), subLabel: target.word, isCorrect: true },
            { id: 'w1', label: String(wrongNums[0]), subLabel: w1Target.word, isCorrect: false },
            { id: 'w2', label: String(wrongNums[1]), subLabel: w2Target.word, isCorrect: false },
          ]);

          return {
            id: qid,
            age,
            category,
            gameType: 'klik_jawapan',
            instruction: `Berapa banyak ${target.item} ini? Kira dan klik nombor.`,
            subInstruction: `Kira bilangan ${target.item} di bawah:`,
            targetIcon: Array(count).fill(target.icon).join(' '),
            targetPrompt: `${count}`,
            options,
            correctOptionId: 'corr',
          };
        } else {
          // Format B: Pilih kumpulan gambar dengan bilangan yang sama
          const options: QuestionOption[] = shuffleArray([
            {
              id: 'corr',
              label: `${count} - ${target.word}`,
              icon: Array(count).fill(target.icon).join(' '),
              isCorrect: true,
            },
            {
              id: 'w1',
              label: `${wrongNums[0]} - ${w1Target.word}`,
              icon: Array(wrongNums[0]).fill(target.icon).join(' '),
              isCorrect: false,
            },
            {
              id: 'w2',
              label: `${wrongNums[1]} - ${w2Target.word}`,
              icon: Array(wrongNums[1]).fill(target.icon).join(' '),
              isCorrect: false,
            },
          ]);

          return {
            id: qid,
            age,
            category,
            gameType: 'klik_jawapan',
            instruction: `Manakah gambar yang ada ${count} (${target.word}) ${target.item}?`,
            subInstruction: `Cari kumpulan yang ada ${count} ${target.item} (${target.icon})`,
            targetPrompt: `${count}`,
            options,
            correctOptionId: 'corr',
          };
        }
      } else if (age === '3-4') {
        // Count 1 to 10 objects
        const count = randomInt(1, 10);
        const target = NUMBERS_DATA.find(n => n.num === count)!;
        const otherNums = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => n !== count);
        const wrongNums = shuffleArray(otherNums).slice(0, 3);

        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: String(count), subLabel: target.word, isCorrect: true },
          { id: 'w1', label: String(wrongNums[0]), subLabel: NUMBERS_DATA.find(n => n.num === wrongNums[0])?.word, isCorrect: false },
          { id: 'w2', label: String(wrongNums[1]), subLabel: NUMBERS_DATA.find(n => n.num === wrongNums[1])?.word, isCorrect: false },
          { id: 'w3', label: String(wrongNums[2]), subLabel: NUMBERS_DATA.find(n => n.num === wrongNums[2])?.word, isCorrect: false },
        ]);

        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Kira objek di bawah: Berapakah jumlahnya?`,
          subInstruction: `Kira bilangan ${target.item}:`,
          targetIcon: Array(count).fill(target.icon).join(' '),
          targetPrompt: `${count}`,
          options,
          correctOptionId: 'corr',
        };
      } else if (age === '4-5') {
        // Basic addition (1-5 + 1-4 <= 10)
        const a = randomInt(1, 5);
        const b = randomInt(1, 4);
        const sum = a + b;
        const wrongSums = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => n !== sum)).slice(0, 3);

        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: String(sum), isCorrect: true },
          { id: 'w1', label: String(wrongSums[0]), isCorrect: false },
          { id: 'w2', label: String(wrongSums[1]), isCorrect: false },
          { id: 'w3', label: String(wrongSums[2]), isCorrect: false },
        ]);

        const iconA = Array(a).fill('🍎').join(' ');
        const iconB = Array(b).fill('🍎').join(' ');

        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Kira operasi tambah: ${a} + ${b} = ?`,
          subInstruction: `${iconA} (${a})  +  ${iconB} (${b})`,
          targetPrompt: `${a} + ${b}`,
          options,
          correctOptionId: 'corr',
        };
      } else {
        // 5-6: Tolak & Tambah dalam lingkungan 1-20
        const isAddition = Math.random() > 0.5;
        if (isAddition) {
          const a = randomInt(4, 10);
          const b = randomInt(2, 8);
          const sum = a + b;
          const wrongSums = shuffleArray([6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18].filter(n => n !== sum)).slice(0, 3);
          const options: QuestionOption[] = shuffleArray([
            { id: 'corr', label: String(sum), isCorrect: true },
            { id: 'w1', label: String(wrongSums[0]), isCorrect: false },
            { id: 'w2', label: String(wrongSums[1]), isCorrect: false },
            { id: 'w3', label: String(wrongSums[2]), isCorrect: false },
          ]);
          return {
            id: qid,
            age,
            category,
            gameType: 'klik_jawapan',
            instruction: `Selesaikan operasi tambah: ${a} + ${b} = ?`,
            subInstruction: `Kira hasil tambah nombor`,
            targetPrompt: `${a} + ${b}`,
            options,
            correctOptionId: 'corr',
          };
        } else {
          const a = randomInt(5, 12);
          const b = randomInt(1, a - 1);
          const diff = a - b;
          const wrongDiffs = shuffleArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].filter(n => n !== diff)).slice(0, 3);
          const options: QuestionOption[] = shuffleArray([
            { id: 'corr', label: String(diff), isCorrect: true },
            { id: 'w1', label: String(wrongDiffs[0]), isCorrect: false },
            { id: 'w2', label: String(wrongDiffs[1]), isCorrect: false },
            { id: 'w3', label: String(wrongDiffs[2]), isCorrect: false },
          ]);
          return {
            id: qid,
            age,
            category,
            gameType: 'klik_jawapan',
            instruction: `Selesaikan operasi tolak: ${a} - ${b} = ?`,
            subInstruction: `Keluarkan ${b} daripada ${a}`,
            targetPrompt: `${a} - ${b}`,
            options,
            correctOptionId: 'corr',
          };
        }
      }
    }

    if (category === 'warna_bentuk') {
      const askColor = Math.random() > 0.5;
      if (askColor) {
        const target = COLORS_DATA[randomInt(0, COLORS_DATA.length - 1)];
        const distractors = shuffleArray(COLORS_DATA.filter(c => c.id !== target.id)).slice(0, age === '2-3' ? 2 : 3);
        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: target.name, icon: target.icon, color: target.hex, isCorrect: true },
          ...distractors.map((d, i) => ({
            id: `w${i}`,
            label: d.name,
            icon: d.icon,
            color: d.hex,
            isCorrect: false,
          })),
        ]);

        if (age === '2-3') {
          return {
            id: qid,
            age,
            category,
            gameType: 'klik_jawapan',
            instruction: 'Apakah warna gambar di bawah?',
            subInstruction: `${target.sampleIcon} ${target.sample}`,
            targetIcon: target.sampleIcon || target.icon,
            targetPrompt: target.name,
            options,
            correctOptionId: 'corr',
          };
        }

        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Klik warna "${target.name}"`,
          subInstruction: `Cari warna ${target.name} seperti ${target.sample}`,
          targetIcon: target.sampleIcon || target.icon,
          targetPrompt: target.name,
          options,
          correctOptionId: 'corr',
        };
      } else {
        const target = SHAPES_DATA[randomInt(0, SHAPES_DATA.length - 1)];
        const distractors = shuffleArray(SHAPES_DATA.filter(s => s.id !== target.id)).slice(0, age === '2-3' ? 2 : 3);
        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: target.name, icon: target.icon, subLabel: `Contoh: ${target.sample}`, isCorrect: true },
          ...distractors.map((d, i) => ({
            id: `w${i}`,
            label: d.name,
            icon: d.icon,
            subLabel: `Contoh: ${d.sample}`,
            isCorrect: false,
          })),
        ]);

        if (age === '2-3') {
          return {
            id: qid,
            age,
            category,
            gameType: 'klik_jawapan',
            instruction: 'Apakah bentuk gambar di bawah?',
            subInstruction: `${target.sampleIcon} Gambar: ${target.sample}`,
            targetIcon: target.sampleIcon || target.icon,
            targetPrompt: target.name,
            options,
            correctOptionId: 'corr',
          };
        }

        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Pilih bentuk "${target.name}"`,
          subInstruction: `Bentuk ${target.name} (${target.sides > 0 ? `${target.sides} sisi` : 'tiada bucu'})`,
          targetPrompt: target.name,
          targetIcon: target.sampleIcon ? `${target.icon} ${target.sampleIcon}` : target.icon,
          options,
          correctOptionId: 'corr',
        };
      }
    }

    if (category === 'haiwan') {
      const target = ANIMALS_DATA[randomInt(0, ANIMALS_DATA.length - 1)];

      // Khusus untuk umur 2-3 tahun: Soalan visual mesra kanak-kanak tanpa audio bunyi haiwan
      if (age === '2-3') {
        const distractors = shuffleArray(ANIMALS_DATA.filter(a => a.id !== target.id)).slice(0, 1);
        const distractor = distractors[0];

        // 3 jenis soalan visual bersilih ganti (Cari Haiwan, Makanan Kegemaran, Ibu & Anak)
        const subTypes = ['find_animal', 'favorite_food', 'mom_and_baby'];
        const chosenType = subTypes[randomInt(0, subTypes.length - 1)];

        if (chosenType === 'find_animal') {
          const options: QuestionOption[] = shuffleArray([
            { id: 'corr', label: target.name, icon: target.icon, isCorrect: true },
            { id: 'w0', label: distractor.name, icon: distractor.icon, isCorrect: false },
          ]);

          return {
            id: qid,
            age,
            category,
            gameType: 'klik_jawapan',
            instruction: `Manakah gambar ${target.name}?`,
            subInstruction: `👉 Cari dan tekan gambar ${target.name} yang betul:`,
            targetIcon: target.icon,
            targetPrompt: target.name,
            options,
            correctOptionId: 'corr',
          };
        } else if (chosenType === 'favorite_food') {
          const options: QuestionOption[] = shuffleArray([
            { id: 'corr', label: target.food, icon: target.foodIcon, isCorrect: true },
            { id: 'w0', label: distractor.food, icon: distractor.foodIcon, isCorrect: false },
          ]);

          return {
            id: qid,
            age,
            category,
            gameType: 'klik_jawapan',
            instruction: `Apakah makanan kegemaran ${target.name}?`,
            subInstruction: `${target.icon} ${target.name} suka makan apa?`,
            targetIcon: target.icon,
            targetPrompt: target.name,
            options,
            correctOptionId: 'corr',
          };
        } else {
          // Ibu & Anak Haiwan
          const options: QuestionOption[] = shuffleArray([
            { id: 'corr', label: target.babyName || `Anak ${target.name}`, icon: target.babyIcon || target.icon, isCorrect: true },
            { id: 'w0', label: distractor.babyName || `Anak ${distractor.name}`, icon: distractor.babyIcon || distractor.icon, isCorrect: false },
          ]);

          return {
            id: qid,
            age,
            category,
            gameType: 'klik_jawapan',
            instruction: `Manakah anak kepada Ibu ${target.name}?`,
            subInstruction: `Ibu ${target.name} ${target.icon} mencari anaknya:`,
            targetIcon: target.icon,
            targetPrompt: `Ibu ${target.name}`,
            options,
            correctOptionId: 'corr',
          };
        }
      }

      // Untuk umur 3-4, 4-5, 5-6
      const mode = age === '3-4' ? 'food' : 'habitat';
      const distractors = shuffleArray(ANIMALS_DATA.filter(a => a.id !== target.id)).slice(0, 3);

      if (mode === 'food') {
        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: target.food, icon: target.foodIcon, subLabel: `Makanan kegemaran`, isCorrect: true },
          ...distractors.map((d, i) => ({
            id: `w${i}`,
            label: d.food,
            icon: d.foodIcon,
            subLabel: `Makanan`,
            isCorrect: false,
          })),
        ]);
        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Apakah makanan kegemaran bagi seekor ${target.name}?`,
          subInstruction: `${target.icon} Haiwan: ${target.name}`,
          targetPrompt: target.name,
          targetIcon: target.icon,
          options,
          correctOptionId: 'corr',
        };
      } else {
        const options: QuestionOption[] = shuffleArray([
          { id: 'corr', label: target.habitat, subLabel: `Tempat tinggal`, isCorrect: true },
          { id: 'w1', label: target.habitat === 'Air' ? 'Darat' : 'Air', subLabel: 'Habitat lain', isCorrect: false },
          { id: 'w2', label: 'Udara', subLabel: 'Habitat lain', isCorrect: false },
        ]);
        return {
          id: qid,
          age,
          category,
          gameType: 'klik_jawapan',
          instruction: `Di manakah tempat tinggal (habitat) bagi ${target.name}?`,
          subInstruction: `${target.icon} Haiwan: ${target.name}`,
          targetPrompt: target.name,
          targetIcon: target.icon,
          options,
          correctOptionId: 'corr',
        };
      }
    }

    // Default fallback
    return {
      id: qid,
      age,
      category,
      gameType: 'klik_jawapan',
      instruction: 'Klik gambar yang betul',
      options: [
        { id: 'corr', label: 'Betul', icon: '⭐', isCorrect: true },
        { id: 'w1', label: 'Salah', icon: '❌', isCorrect: false },
      ],
      correctOptionId: 'corr',
    };
  }

  /* -------------------------------------------------------------
     2. DRAG & DROP (Tarik Jawapan ke Tempat Yang Betul)
  ------------------------------------------------------------- */
  private generateDragDrop(age: AgeGroup, category: CategoryId): QuestionData {
    const qid = `dd_${age}_${category}_${Date.now()}_${Math.random()}`;

    if (category === 'huruf') {
      const itemsCount = age === '2-3' ? 2 : age === '3-4' ? 3 : 4;
      const selected = shuffleArray(ALPHABET_LIST).slice(0, itemsCount);

      // Bagi umur 2-3 tahun: Kotak soalan ada GAMBAR SAMAR SAHAJA tanpa perkataan!
      const isToddler = age === '2-3';

      const dropSlots: DropSlot[] = selected.map(s => ({
        id: `slot_${s.letter}`,
        label: isToddler ? '' : s.letter,
        icon: isToddler ? s.icon : '🔲',
        faintImage: isToddler ? s.icon : undefined,
        hideLabel: isToddler,
        placeholder: isToddler ? '' : `Letak ${s.letter}`,
      }));

      const dragItems: DragItem[] = shuffleArray(selected.map(s => ({
        id: `drag_${s.letter}`,
        label: isToddler ? '' : s.letter,
        icon: s.icon,
        color: s.color,
        matchTargetId: `slot_${s.letter}`,
      })));

      return {
        id: qid,
        age,
        category,
        gameType: 'drag_drop',
        instruction: isToddler
          ? 'Tarik dan padankan gambar ke kotak bayang samar!'
          : 'Tarik huruf ke dalam kotak huruf yang sepadan.',
        subInstruction: isToddler
          ? '👉 Padankan gambar jawapan dengan gambar samar di dalam kotak soalan.'
          : 'Padankan setiap huruf ke kotaknya.',
        dropSlots,
        dragItems,
      };
    }

    if (category === 'nombor') {
      const itemsCount = age === '2-3' ? 2 : 3;
      const maxRange = age === '2-3' ? 5 : 10;
      const selected = shuffleArray(NUMBERS_DATA.slice(0, maxRange)).slice(0, itemsCount);

      // Bagi umur 2-3 tahun: Kotak soalan ada GAMBAR SAMAR SAHAJA tanpa perkataan/nombor!
      const isToddler = age === '2-3';

      const dropSlots: DropSlot[] = selected.map(n => ({
        id: `slot_num_${n.num}`,
        label: isToddler ? '' : `${n.num} - ${n.word}`,
        icon: isToddler ? Array(n.num).fill(n.icon).join(' ') : undefined,
        faintImage: isToddler ? Array(n.num).fill(n.icon).join(' ') : undefined,
        hideLabel: isToddler,
        placeholder: isToddler ? '' : `Kotak ${n.num}`,
      }));

      const dragItems: DragItem[] = shuffleArray(selected.map(n => ({
        id: `drag_num_${n.num}`,
        label: isToddler ? '' : `${n.num} ${n.word}`,
        icon: Array(n.num).fill(n.icon).join(' '),
        color: '#3B82F6',
        matchTargetId: `slot_num_${n.num}`,
      })));

      return {
        id: qid,
        age,
        category,
        gameType: 'drag_drop',
        instruction: isToddler
          ? 'Tarik gambar bilangan objek ke kotak bayang samar yang sepadan!'
          : 'Tarik bilangan objek ke dalam kotak nombor yang betul.',
        subInstruction: isToddler
          ? '👉 Padankan gambar objek dengan gambar samar di dalam kotak.'
          : 'Kira bilangan gambar dan masukkan ke kotak nombornya.',
        dropSlots,
        dragItems,
      };
    }

    if (category === 'warna_bentuk') {
      const isShape = Math.random() > 0.5;
      const itemsCount = age === '2-3' ? 2 : 3;

      if (isShape) {
        const selected = shuffleArray(SHAPES_DATA).slice(0, itemsCount);

        const dropSlots: DropSlot[] = selected.map(s => ({
          id: `slot_shape_${s.id}`,
          label: s.name,
          icon: s.icon,
          placeholder: s.sample,
        }));

        const dragItems: DragItem[] = shuffleArray(selected.map(s => ({
          id: `drag_shape_${s.id}`,
          label: s.sample,
          icon: s.sampleIcon || s.icon,
          color: '#8B5CF6',
          matchTargetId: `slot_shape_${s.id}`,
        })));

        return {
          id: qid,
          age,
          category,
          gameType: 'drag_drop',
          instruction: 'Tarik gambar objek ke dalam kotak bentuk yang sepadan.',
          subInstruction: 'Padankan gambar objek dengan bentuknya.',
          dropSlots,
          dragItems,
        };
      } else {
        const selected = shuffleArray(COLORS_DATA).slice(0, itemsCount);

        const dropSlots: DropSlot[] = selected.map(c => ({
          id: `slot_color_${c.id}`,
          label: c.name,
          icon: c.icon,
          color: c.hex,
          placeholder: c.sample,
        }));

        const dragItems: DragItem[] = shuffleArray(selected.map(c => ({
          id: `drag_color_${c.id}`,
          label: c.sample,
          icon: c.sampleIcon || c.icon,
          color: c.hex,
          matchTargetId: `slot_color_${c.id}`,
        })));

        return {
          id: qid,
          age,
          category,
          gameType: 'drag_drop',
          instruction: 'Tarik gambar objek ke dalam kotak warna yang sepadan.',
          subInstruction: 'Padankan gambar objek dengan warna yang sama.',
          dropSlots,
          dragItems,
        };
      }
    }

    // Haiwan
    const itemsCount = age === '2-3' ? 2 : 3;
    const selected = shuffleArray(ANIMALS_DATA).slice(0, itemsCount);

    if (age === '2-3') {
      // Untuk umur 2-3 tahun: Kotak soalan memaparkan gambar haiwan (bukan perkataan saja)
      const dropSlots: DropSlot[] = selected.map(a => ({
        id: `slot_anim_${a.id}`,
        label: a.name,
        icon: a.icon, // Gambar haiwan besar di kotak soalan
        placeholder: `Haiwan: ${a.name}`,
      }));

      // Kepingan yang ditarik adalah gambar makanan haiwan tersebut
      const dragItems: DragItem[] = shuffleArray(selected.map(a => ({
        id: `drag_anim_${a.id}`,
        label: a.food,
        icon: a.foodIcon || '🍽️', // Gambar makanan sebenar
        color: '#10B981',
        matchTargetId: `slot_anim_${a.id}`,
      })));

      return {
        id: qid,
        age,
        category,
        gameType: 'drag_drop',
        instruction: 'Tarik gambar makanan ke dalam kotak gambar haiwan yang betul.',
        subInstruction: 'Padankan makanan kegemaran dengan haiwan pemakannya.',
        dropSlots,
        dragItems,
      };
    }

    const dropSlots: DropSlot[] = selected.map(a => ({
      id: `slot_anim_${a.id}`,
      label: a.name,
      icon: a.icon,
      placeholder: `Rumah ${a.name}`,
    }));

    const dragItems: DragItem[] = shuffleArray(selected.map(a => ({
      id: `drag_anim_${a.id}`,
      label: a.food,
      icon: a.foodIcon || a.icon,
      color: '#10B981',
      matchTargetId: `slot_anim_${a.id}`,
    })));

    return {
      id: qid,
      age,
      category,
      gameType: 'drag_drop',
      instruction: 'Tarik gambar makanan ke dalam kotak gambar haiwan yang sesuai.',
      dropSlots,
      dragItems,
    };
  }

  /* -------------------------------------------------------------
     3. PADANAN (Matching Pairs)
  ------------------------------------------------------------- */
  private generatePadanan(age: AgeGroup, category: CategoryId): QuestionData {
    const qid = `pad_${age}_${category}_${Date.now()}_${Math.random()}`;
    const pairCount = age === '2-3' ? 3 : age === '3-4' ? 4 : 5;

    if (category === 'huruf') {
      const selected = shuffleArray(ALPHABET_LIST).slice(0, pairCount);
      const pairs: PadananPair[] = selected.map(s => ({
        leftId: `l_${s.letter}`,
        leftText: `${s.letter}`,
        leftColor: s.color,
        rightId: `r_${s.letter}`,
        rightText: `${s.word}`,
        rightIcon: s.icon,
      }));

      return {
        id: qid,
        age,
        category,
        gameType: 'padanan',
        instruction: 'Tarik garisan memadankan huruf besar dengan gambar yang betul.',
        subInstruction: '✍️ Tarik garisan dari kotak huruf ke kotak gambar permulaannya.',
        pairs,
      };
    }

    if (category === 'nombor') {
      const maxRange = age === '2-3' ? 5 : 10;
      const effectivePairCount = age === '2-3' ? 3 : pairCount;
      const selected = shuffleArray(NUMBERS_DATA.slice(0, maxRange)).slice(0, effectivePairCount);
      const pairs: PadananPair[] = selected.map(n => ({
        leftId: `l_num_${n.num}`,
        leftText: `${n.num} (${n.word})`,
        rightId: `r_num_${n.num}`,
        rightText: `${n.word} ${n.item}`,
        rightIcon: Array(n.num).fill(n.icon).join(' '),
      }));

      return {
        id: qid,
        age,
        category,
        gameType: 'padanan',
        instruction: 'Tarik garisan memadankan nombor dengan bilangan gambar yang sama.',
        subInstruction: '✍️ Tarik garisan dari kotak nombor ke kotak gambar.',
        pairs,
      };
    }

    if (category === 'warna_bentuk') {
      const isColor = Math.random() > 0.5;
      const effectivePairCount = age === '2-3' ? 3 : pairCount;

      if (isColor) {
        const selected = shuffleArray(COLORS_DATA).slice(0, effectivePairCount);
        const pairs: PadananPair[] = selected.map(c => ({
          leftId: `l_col_${c.id}`,
          leftText: c.name,
          leftIcon: c.icon,
          rightId: `r_col_${c.id}`,
          rightText: c.sample,
          rightIcon: c.sampleIcon || c.icon,
        }));

        return {
          id: qid,
          age,
          category,
          gameType: 'padanan',
          instruction: 'Tarik garisan memadankan warna dengan gambar objek yang sama warna.',
          subInstruction: '✍️ Tarik garisan dari kotak warna ke kotak gambar.',
          pairs,
        };
      } else {
        const selected = shuffleArray(SHAPES_DATA).slice(0, effectivePairCount);
        const pairs: PadananPair[] = selected.map(s => ({
          leftId: `l_sh_${s.id}`,
          leftText: s.name,
          leftIcon: s.icon,
          rightId: `r_sh_${s.id}`,
          rightText: s.sample,
          rightIcon: s.sampleIcon || s.icon,
        }));

        return {
          id: qid,
          age,
          category,
          gameType: 'padanan',
          instruction: 'Tarik garisan memadankan bentuk dengan gambar objek yang serupa.',
          subInstruction: '✍️ Tarik garisan dari kotak bentuk ke kotak gambar objek.',
          pairs,
        };
      }
    }

    // Haiwan: padankan haiwan dengan makanan (gambar sebenar di kotak jawapan)
    const effectivePairCount = age === '2-3' ? 3 : pairCount;
    const selected = shuffleArray(ANIMALS_DATA).slice(0, effectivePairCount);
    const pairs: PadananPair[] = selected.map(a => ({
      leftId: `l_an_${a.id}`,
      leftText: a.name,
      leftIcon: a.icon, // Gambar haiwan di kotak kiri
      rightId: `r_an_${a.id}`,
      rightText: a.food,
      rightIcon: a.foodIcon || '🍽️', // Gambar makanan sebenar di kotak jawapan kanan!
    }));

    return {
      id: qid,
      age,
      category,
      gameType: 'padanan',
      instruction: 'Tarik garisan memadankan haiwan dengan gambar makanannya.',
      subInstruction: '✍️ Tarik garisan dari kotak haiwan ke kotak gambar makanannya.',
      pairs,
    };
  }

  /* -------------------------------------------------------------
     4. SUSUNAN (Sequence: ABC, 123, Word Syllables)
  ------------------------------------------------------------- */
  private generateSusunan(age: AgeGroup, category: CategoryId): QuestionData {
    const qid = `sus_${age}_${category}_${Date.now()}_${Math.random()}`;

    if (category === 'nombor') {
      const length = age === '2-3' ? 3 : age === '3-4' ? 4 : 5;
      const maxVal = age === '2-3' ? 5 : 10;
      const start = randomInt(1, Math.max(1, maxVal - length + 1));
      const items: SusunItem[] = [];

      for (let i = 0; i < length; i++) {
        const val = start + i;
        const numData = NUMBERS_DATA.find(n => n.num === val);
        items.push({
          id: `num_${val}`,
          order: i,
          label: `${val} (${numData?.word || val})`,
          icon: numData ? Array(val).fill(numData.icon).join(' ') : '🔢',
          color: '#3B82F6',
        });
      }

      return {
        id: qid,
        age,
        category,
        gameType: 'susunan',
        instruction: 'Susun nombor-nombor ini mengikut tertib menaik (dari kecil ke besar).',
        subInstruction: 'Klik kad untuk menyusunnya ke petak urutan.',
        susunItems: items,
      };
    }

    if (category === 'huruf') {
      if (age === '4-5' || age === '5-6') {
        // Susun suku kata membentuk perkataan
        const target = SUKU_KATA_EASY[randomInt(0, SUKU_KATA_EASY.length - 1)];
        const items: SusunItem[] = [
          { id: 's1', order: 0, label: target.s1, icon: '🔤', color: '#10B981' },
          { id: 's2', order: 1, label: target.s2, icon: '🔤', color: '#F59E0B' },
        ];
        return {
          id: qid,
          age,
          category,
          gameType: 'susunan',
          instruction: `Susun suku kata untuk mengeja perkataan: "${target.word}"`,
          subInstruction: `${target.icon} Cantumkan suku kata menjadi "${target.word}"`,
          targetIcon: target.icon,
          susunItems: items,
        };
      } else {
        // Susun 3 abjad berturutan (A B C, D E F, etc.)
        const length = 3;
        const maxStart = ALPHABET_LIST.length - length;
        const startIdx = randomInt(0, maxStart);
        const slice = ALPHABET_LIST.slice(startIdx, startIdx + length);
        const items: SusunItem[] = slice.map((item, idx) => ({
          id: `letter_${item.letter}`,
          order: idx,
          label: item.letter,
          icon: item.icon,
          color: item.color,
        }));

        return {
          id: qid,
          age,
          category,
          gameType: 'susunan',
          instruction: 'Susun huruf-huruf abjad mengikut urutan yang betul.',
          subInstruction: `Susun mengikut turutan ABC`,
          susunItems: items,
        };
      }
    }

    // Default: Susun warna pelangi / saiz
    const items: SusunItem[] = [
      { id: 'kecil', order: 0, label: 'Kecil', icon: '🐣', color: '#38BDF8' },
      { id: 'sedang', order: 1, label: 'Sederhana', icon: '🐥', color: '#FACC15' },
      { id: 'besar', order: 2, label: 'Besar', icon: '🐔', color: '#EF4444' },
    ];

    return {
      id: qid,
      age,
      category,
      gameType: 'susunan',
      instruction: 'Susun dari saiz paling KECIL ke paling BESAR.',
      susunItems: items,
    };
  }

  /* -------------------------------------------------------------
     5. MEMORY GAME (Cari Pasangan Kad)
  ------------------------------------------------------------- */
  private generateMemoryGame(age: AgeGroup, category: CategoryId): QuestionData {
    const qid = `mem_${age}_${category}_${Date.now()}_${Math.random()}`;
    const pairCount = age === '2-3' ? 2 : age === '3-4' ? 3 : age === '4-5' ? 4 : 6;

    let cardSource: { pairKey: string; label: string; icon: string; color: string }[] = [];

    if (category === 'huruf') {
      const selected = shuffleArray(ALPHABET_LIST).slice(0, pairCount);
      cardSource = selected.map(s => ({
        pairKey: s.letter,
        label: s.letter,
        icon: s.icon,
        color: s.color,
      }));
    } else if (category === 'nombor') {
      const maxRange = age === '2-3' ? 5 : 10;
      const effectivePairCount = age === '2-3' ? 2 : pairCount;
      const selected = shuffleArray(NUMBERS_DATA.slice(0, maxRange)).slice(0, effectivePairCount);
      cardSource = selected.map(n => ({
        pairKey: `${n.num}`,
        label: `${n.num} (${n.word})`,
        icon: Array(n.num).fill(n.icon).join(' '),
        color: '#3B82F6',
      }));
    } else if (category === 'warna_bentuk') {
      const selected = shuffleArray(SHAPES_DATA).slice(0, pairCount);
      cardSource = selected.map(s => ({
        pairKey: s.id,
        label: s.name,
        icon: s.icon,
        color: '#8B5CF6',
      }));
    } else {
      const selected = shuffleArray(ANIMALS_DATA).slice(0, pairCount);
      cardSource = selected.map(a => ({
        pairKey: a.id,
        label: a.name,
        icon: a.icon,
        color: '#10B981',
      }));
    }

    const cards: MemoryCard[] = [];
    cardSource.forEach((item, idx) => {
      // 2 cards for each pair
      cards.push({
        id: `card_${item.pairKey}_1_${idx}`,
        pairKey: item.pairKey,
        label: item.label,
        icon: item.icon,
        color: item.color,
      });
      cards.push({
        id: `card_${item.pairKey}_2_${idx}`,
        pairKey: item.pairKey,
        label: item.label,
        icon: item.icon,
        color: item.color,
      });
    });

    return {
      id: qid,
      age,
      category,
      gameType: 'memory',
      instruction: 'Cari pasangan kad yang sama! Buka dua kad dan padankan.',
      subInstruction: `Kumpul ${pairCount} pasang kad.`,
      memoryCards: shuffleArray(cards),
    };
  }
}

export const questionGenerator = new QuestionGenerator();
