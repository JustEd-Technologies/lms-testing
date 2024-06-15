// Interfaces for theme images
export interface ThemeImages {
  standard: ImageSet;
  mainland: ImageSet;
}

export interface ImageSet {
  card: string;
  editor: string;
  play: string;
}

// Interfaces for default option
export interface DefaultOption {
  id: number;
  label: string;
  options: string[];
}

// Interfaces for option images
export interface OptionImages {
  circle: string;
  spade: string;
  square: string;
  pentagon: string;
  hexagon: string;
  triangle: string;
}

// Interfaces for all options
export interface Option {
  id: string;
  label: string;
  isCorrect: boolean;
}

// Interfaces for boolean options
export interface BooleanOption {
  id: string;
  label: string;
  image: string;
}

// Interfaces for all themes
export interface Theme {
  id: string;
  label: string;
}

// Interfaces for default question
export interface DefaultQuestion {
  id: number;
  title: string;
  type: string;
  options: Option[];
  timelimit: string;
}

// Interfaces for steps
export interface Steps {
  CONNECT_TO_PLAY: string;
  WAIT_FOR_PLAYERS: string;
  SHOW_NEXT_QUESTION: string;
  SCOREBOARD: string;
  PODIUM: string;
}

// Data variables with interfaces

export const themeImages: ThemeImages = {
  standard: {
    card: 'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/standard-quiz-card.svg',
    editor:
      'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/standard-quiz-editor.svg',
    play: 'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/standard-quiz-play.svg',
  },
  mainland: {
    card: 'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/mainstream-quiz-card.svg',
    editor:
      'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/mainstream-quiz-editor.svg',
    play: 'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/mainstream-quiz-play.svg',
  },
};

export const defOption: DefaultOption = {
  id: 1,
  label: '',
  options: [],
};

export const optionImage: OptionImages = {
  circle:
    'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/circle.svg',
  spade:
    'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/spade.svg',
  square:
    'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/square.svg',
  pentagon:
    'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/pentagon.svg',
  hexagon:
    'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/hexagon.svg',
  triangle:
    'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/triangle.svg',
};

export const allOptions: Option[] = [
  {
    id: 'circle',
    label: '',
    isCorrect: false,
  },
  {
    id: 'triangle',
    label: '',
    isCorrect: false,
  },
  {
    id: 'spade',
    label: '',
    isCorrect: false,
  },
  {
    id: 'square',
    label: '',
    isCorrect: false,
  },
  {
    id: 'pentagon',
    label: '',
    isCorrect: false,
  },
  {
    id: 'hexagon',
    label: '',
    isCorrect: false,
  },
];

export const booleanOptions: BooleanOption[] = [
  {
    id: 'triangle',
    label: 'True',
    image:
      'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/triangle.svg',
  },
  {
    id: 'square',
    label: 'False',
    image:
      'https://tapaozmyjsuykgerrfkt.supabase.co/storage/v1/object/public/avatars/quizes/square.svg',
  },
];

export const allThemes: Theme[] = [
  {
    id: 'standard',
    label: 'Standard',
  },
  {
    id: 'mainland',
    label: 'Mainland Bridge',
  },
];

export const defQuestion: DefaultQuestion = {
  id: new Date().getTime(),
  title: '',
  type: 'multichoice',
  options: [],
  timelimit: '10s',
};

export const STEPS: Steps = {
  CONNECT_TO_PLAY: 'CONNECT_TO_PLAY',
  WAIT_FOR_PLAYERS: 'WAIT_FOR_PLAYERS',
  SHOW_NEXT_QUESTION: 'SHOW_NEXT_QUESTION',
  SCOREBOARD: 'SCOREBOARD',
  PODIUM: 'PODIUM',
};
