import { writable } from 'svelte/store';
import { STEPS, type DefaultQuestion, type Steps, type ThemeImages } from '$lib/utils/constants/quiz';
import type { UserLessonDataType } from '$lib/types/lesson';

// Interfaces for store state
interface CreateQuizModalState {
  open: boolean;
  openEdit: boolean;
  title: string;
  id: string | null;
}

interface DeleteModalState {
  id: string | null;
  open: boolean;
  isQuestion: boolean;
}

interface QuizStoreState {
  uuid: string;
  title: string;
  questions: DefaultQuestion[];
  timelimit: string;
  theme: keyof ThemeImages;
  pin: number;
}

interface PlayQuizStoreState {
  step: string;
}

// Quiz
export const createQuizModal = writable<CreateQuizModalState>({
  open: false,
  openEdit: false,
  title: '',
  id: null,
});

export const deleteModal = writable<DeleteModalState>({
  id: null,
  open: false,
  isQuestion: false,
});

export const quizesStore = writable<DefaultQuestion[]>([]);

export const quizStore = writable<QuizStoreState>({
  uuid: '',
  title: '',
  questions: [],
  timelimit: '10s',
  theme: 'standard',
  pin: 0,
});

export const playQuizStore = writable<PlayQuizStoreState>({
  step: STEPS.CONNECT_TO_PLAY as keyof Steps,
});

export const userUpcomingData = writable<UserLessonDataType[]>([]);
