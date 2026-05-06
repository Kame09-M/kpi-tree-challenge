import { create } from 'zustand';
import type { Scenario, UserNode, GameResult, KpiNode, Operator } from '../types/scenario';

type Screen = 'learn' | 'start' | 'scenario' | 'tree' | 'feedback';

interface GameStore {
  screen: Screen;
  scenario: Scenario | null;
  userNodes: UserNode[];
  timeLeft: number;
  timerActive: boolean;
  results: GameResult[];
  lastScore: number | null;
  hintsUsed: number;
  pendingParentId: string | null;

  setScreen: (screen: Screen) => void;
  setScenario: (scenario: Scenario) => void;
  openPicker: (parentId: string) => void;
  closePicker: () => void;
  addNamedNode: (parentId: string, label: string, operator: Operator) => void;
  updateNode: (id: string, updates: Partial<UserNode>) => void;
  removeNode: (id: string) => void;
  tick: () => void;
  startTimer: () => void;
  stopTimer: () => void;
  useHint: () => void;
  submitAnswer: () => number;
  resetGame: () => void;
  loadResults: () => void;
}

const generateId = () => Math.random().toString(36).slice(2, 9);

const getAllDescendantIds = (nodes: UserNode[], parentId: string): string[] => {
  const children = nodes.filter((n) => n.parentId === parentId);
  return children.flatMap((c) => [c.id, ...getAllDescendantIds(nodes, c.id)]);
};

const flattenTree = (node: KpiNode): string[] => {
  const labels = [node.label.toLowerCase().trim()];
  if (node.children) {
    node.children.forEach((child) => labels.push(...flattenTree(child)));
  }
  return labels;
};

const calcScore = (
  userNodes: UserNode[],
  scenario: Scenario,
  timeLeft: number,
  hintsUsed: number
) => {
  const answerLabels = flattenTree(scenario.answerTree);
  const answerCount = answerLabels.length;
  const userLabels = userNodes.map((n) => n.label.toLowerCase().trim());

  const correct = userLabels.filter((l) => answerLabels.includes(l)).length;
  const extra = userLabels.filter((l) => !answerLabels.includes(l)).length;
  const timeBonus = Math.floor(timeLeft / 10);
  const hintPenalty = hintsUsed * 10;

  const raw =
    Math.round((correct / answerCount) * 100) - extra * 5 + timeBonus - hintPenalty;
  return Math.max(0, Math.min(100, raw));
};

export const useGameStore = create<GameStore>((set, get) => ({
  screen: 'start',
  scenario: null,
  userNodes: [],
  timeLeft: 0,
  timerActive: false,
  results: [],
  lastScore: null,
  hintsUsed: 0,
  pendingParentId: null,

  setScreen: (screen) => set({ screen }),

  setScenario: (scenario) => {
    const rootNode: UserNode = { id: 'root', label: scenario.rootKpi };
    set({
      scenario,
      userNodes: [rootNode],
      timeLeft: scenario.timeLimit,
      timerActive: false,
      lastScore: null,
      hintsUsed: 0,
      pendingParentId: null,
    });
  },

  openPicker: (parentId) => set({ pendingParentId: parentId }),
  closePicker: () => set({ pendingParentId: null }),

  addNamedNode: (parentId, label, operator) => {
    const newNode: UserNode = { id: generateId(), label, operator, parentId };
    set((state) => ({ userNodes: [...state.userNodes, newNode], pendingParentId: null }));
  },

  updateNode: (id, updates) => {
    set((state) => ({
      userNodes: state.userNodes.map((n) => (n.id === id ? { ...n, ...updates } : n)),
    }));
  },

  removeNode: (id) => {
    const { userNodes } = get();
    const toRemove = new Set([id, ...getAllDescendantIds(userNodes, id)]);
    set({ userNodes: userNodes.filter((n) => !toRemove.has(n.id)) });
  },

  tick: () => {
    const { timeLeft, timerActive } = get();
    if (!timerActive) return;
    if (timeLeft <= 0) {
      set({ timerActive: false });
      get().submitAnswer();
    } else {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  startTimer: () => set({ timerActive: true }),
  stopTimer: () => set({ timerActive: false }),

  useHint: () => set((state) => ({ hintsUsed: state.hintsUsed + 1 })),

  submitAnswer: () => {
    const { userNodes, scenario, timeLeft, results, hintsUsed } = get();
    if (!scenario) return 0;

    get().stopTimer();
    const score = calcScore(userNodes, scenario, timeLeft, hintsUsed);
    const result: GameResult = {
      scenarioId: scenario.id,
      score,
      timeUsed: scenario.timeLimit - timeLeft,
      date: new Date().toISOString(),
    };

    const newResults = [result, ...results].slice(0, 50);
    localStorage.setItem('kpi_results', JSON.stringify(newResults));

    set({ lastScore: score, results: newResults, screen: 'feedback' });
    return score;
  },

  resetGame: () => {
    set({
      screen: 'start',
      scenario: null,
      userNodes: [],
      timeLeft: 0,
      timerActive: false,
      lastScore: null,
      hintsUsed: 0,
    });
  },

  loadResults: () => {
    const saved = localStorage.getItem('kpi_results');
    if (saved) set({ results: JSON.parse(saved) });
  },
}));
