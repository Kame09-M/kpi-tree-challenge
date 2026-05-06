import { useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { AnswerTreeView, UserTreeView } from '../components/AnswerTreeView';
import type { KpiNode } from '../types/scenario';
import { getRandomScenario } from '../data/scenarios';

const flattenTreeLabels = (node: KpiNode): string[] => {
  const labels = [node.label.toLowerCase().trim()];
  if (node.children) {
    node.children.forEach((child) => labels.push(...flattenTreeLabels(child)));
  }
  return labels;
};

const getScoreColor = (score: number) => {
  if (score >= 80) return 'text-green-400';
  if (score >= 60) return 'text-yellow-400';
  if (score >= 40) return 'text-orange-400';
  return 'text-red-400';
};

const getScoreMessage = (score: number) => {
  if (score >= 90) return '🏆 完璧！素晴らしい分解です';
  if (score >= 70) return '🎉 よくできました！';
  if (score >= 50) return '💪 もう少し！重要なKPIを見直してみましょう';
  return '📚 模範解答をよく確認して、次回に活かしましょう';
};

export const FeedbackScreen = () => {
  const { scenario, userNodes, lastScore, resetGame, setScreen, setScenario } = useGameStore();
  if (!scenario) return null;

  const answerLabels = useMemo(
    () => new Set(flattenTreeLabels(scenario.answerTree)),
    [scenario]
  );

  const userLabels = userNodes.map((n) => n.label).filter(Boolean);
  const userLabelsNorm = useMemo(
    () => new Set(userLabels.map((l) => l.toLowerCase().trim())),
    [userLabels]
  );

  const answerLabelList = flattenTreeLabels(scenario.answerTree);
  const correctCount = userLabels.filter((l) =>
    answerLabels.has(l.toLowerCase().trim())
  ).length;
  const missingCount = answerLabelList.filter(
    (l) => !userLabelsNorm.has(l)
  ).length;
  const extraCount = userLabels.filter(
    (l) => !answerLabels.has(l.toLowerCase().trim())
  ).length;

  const score = lastScore ?? 0;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">
      {/* Header */}
      <div className="bg-slate-900 border-b border-slate-700 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="text-white font-bold text-xl">📊 フィードバック</h1>
          <div className="flex gap-3">
            <button
              onClick={resetGame}
              className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition-colors text-sm"
            >
              ← スタートへ戻る
            </button>
            <button
              onClick={() => {
                const next = getRandomScenario(scenario.genre, scenario.difficulty);
                if (next) {
                  setScenario(next);
                  setScreen('scenario');
                }
              }}
              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all text-sm"
            >
              次の問題へ →
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 max-w-6xl mx-auto w-full px-6 py-6">
        {/* Score Banner */}
        <div className="bg-slate-900 rounded-2xl p-6 mb-6 border border-slate-700 text-center">
          <div className={`text-6xl font-black mb-2 ${getScoreColor(score)}`}>
            {score}
            <span className="text-2xl text-slate-400 font-normal">pt</span>
          </div>
          <div className="text-white text-lg font-semibold mb-4">{getScoreMessage(score)}</div>

          <div className="flex justify-center gap-6 text-sm">
            <div className="flex items-center gap-2">
              <span className="text-green-400 font-bold text-base">🟢 {correctCount}</span>
              <span className="text-slate-400">正解ノード</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-red-400 font-bold text-base">🔴 {missingCount}</span>
              <span className="text-slate-400">不足ノード</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-yellow-400 font-bold text-base">🟡 {extraCount}</span>
              <span className="text-slate-400">余分なノード</span>
            </div>
          </div>
        </div>

        {/* Comparison */}
        <div className="grid grid-cols-2 gap-6">
          {/* User Tree */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span>👤</span> あなたの回答
            </h2>
            <div className="text-xs text-slate-500 mb-3">
              🟢 正解 &nbsp; 🟡 余分（-5pt/個）
            </div>
            {userLabels.length <= 1 ? (
              <p className="text-slate-500 text-sm">ノードが追加されていません</p>
            ) : (
              <UserTreeView labels={userLabels} answerLabels={answerLabels} />
            )}
          </div>

          {/* Answer Tree */}
          <div className="bg-slate-900 rounded-2xl p-6 border border-slate-700">
            <h2 className="text-white font-bold text-base mb-4 flex items-center gap-2">
              <span>✅</span> 模範解答
            </h2>
            <div className="text-xs text-slate-500 mb-3">
              🟢 あなたも正解 &nbsp; 🔴 不足（解説あり）
            </div>
            <AnswerTreeView
              node={scenario.answerTree}
              userLabels={userLabelsNorm}
              feedback={scenario.feedback}
            />
          </div>
        </div>

        {/* Scenario context */}
        <div className="mt-6 bg-blue-950/30 rounded-2xl p-5 border border-blue-800/20">
          <h3 className="text-blue-300 font-semibold mb-2">📋 シナリオ振り返り</h3>
          <p className="text-slate-300 text-sm">{scenario.description}</p>
        </div>
      </div>
    </div>
  );
};
