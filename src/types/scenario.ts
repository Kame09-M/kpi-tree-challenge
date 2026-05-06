export type Genre = 'EC' | 'SaaS' | 'Marketing' | 'company';
export type GameMode = 'normal' | 'company';
export type Difficulty = 'easy' | 'normal' | 'hard';
export type Operator = '×' | '÷' | '+' | '-';

// Re-export as values so the module isn't empty after TS stripping
export const OPERATORS: Operator[] = ['×', '÷', '+', '-'] as const;

export interface KpiNode {
  id: string;
  label: string;
  operator?: Operator;
  children?: KpiNode[];
}

export interface Scenario {
  id: string;
  genre: Genre;
  difficulty: Difficulty;
  title: string;
  description: string;
  rootKpi: string;
  timeLimit: number;
  answerTree: KpiNode;
  feedback: Record<string, string>;
  company?: string;
  companyLogo?: string;
  companyContext?: string;
}

export interface UserNode {
  id: string;
  label: string;
  operator?: Operator;
  parentId?: string;
  note?: string;
}

export interface GameResult {
  scenarioId: string;
  score: number;
  timeUsed: number;
  date: string;
}
