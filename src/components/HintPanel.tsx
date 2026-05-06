import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import type { KpiNode } from '../types/scenario';

const STEPS = [
  {
    icon: '🎯',
    title: 'ルートKPIを理解する',
    desc: 'まず最上位のKPIが「何を掛け合わせると成り立つか」を考える。売上 = 訪問者数 × CVR × 客単価 のように。',
  },
  {
    icon: '✂️',
    title: '×（掛け算）で分解する',
    desc: 'KPIは多くの場合、複数の要素の掛け算で表せる。「どの要素が下がると全体が下がるか」を問う。',
  },
  {
    icon: '➕',
    title: '＋（足し算）で列挙する',
    desc: '複数のチャネルや種類がある場合は足し算。例：MRR = 新規MRR + 拡張MRR − チャーンMRR。',
  },
  {
    icon: '🔍',
    title: 'さらに細かく分解する',
    desc: '各要素をもう一段深く分解できないか考える。CVR → 広告流入CVR × 購入CVR のように。',
  },
];

const getFirstLevelHint = (tree: KpiNode): string => {
  if (!tree.children || tree.children.length === 0) return 'ヒントなし';
  const parts = tree.children.map((c) => `${c.operator ?? ''}${c.label}`).join(' ');
  return `${tree.label} = ${parts}`;
};

export const HintPanel = ({ onClose }: { onClose: () => void }) => {
  const { scenario, hintsUsed, useHint } = useGameStore();
  const [hintRevealed, setHintRevealed] = useState(hintsUsed > 0);
  const [tab, setTab] = useState<'hint' | 'steps'>('hint');

  if (!scenario) return null;

  const handleRevealHint = () => {
    if (!hintRevealed) useHint();
    setHintRevealed(true);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-md shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <div className="flex gap-1 bg-slate-800 rounded-lg p-1">
            <button
              onClick={() => setTab('hint')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                tab === 'hint'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              💡 ヒント
            </button>
            <button
              onClick={() => setTab('steps')}
              className={`px-4 py-1.5 rounded-md text-sm font-semibold transition-colors ${
                tab === 'steps'
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              📋 分解の手順
            </button>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none transition-colors ml-2"
          >
            ×
          </button>
        </div>

        <div className="px-5 py-5">
          {tab === 'hint' ? (
            <div>
              <p className="text-slate-400 text-sm mb-4">
                ヒントを見ると <span className="text-red-400 font-bold">-10pt</span> のペナルティがあります。
                {hintsUsed > 0 && (
                  <span className="text-yellow-400 ml-2">（使用済み: {hintsUsed}回）</span>
                )}
              </p>

              {hintRevealed ? (
                <div className="bg-green-950/40 border border-green-700/40 rounded-xl p-4">
                  <div className="text-green-400 text-xs font-bold uppercase tracking-wider mb-2">
                    ヒント（第1階層）
                  </div>
                  <p className="text-white font-mono text-sm leading-relaxed">
                    {getFirstLevelHint(scenario.answerTree)}
                  </p>
                  <p className="text-slate-500 text-xs mt-3">
                    ※ これは模範解答の1つです。他の切り口でも正解になる場合があります。
                  </p>
                </div>
              ) : (
                <button
                  onClick={handleRevealHint}
                  className="w-full py-4 border-2 border-dashed border-slate-600 rounded-xl text-slate-400 hover:border-blue-500 hover:text-blue-400 transition-all text-sm font-semibold"
                >
                  クリックしてヒントを表示（-10pt）
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              <p className="text-slate-400 text-sm">KPI分解の基本ステップ</p>
              {STEPS.map((step, i) => (
                <div key={i} className="flex gap-3">
                  <div className="text-xl shrink-0 mt-0.5">{step.icon}</div>
                  <div>
                    <div className="text-white font-semibold text-sm mb-1">
                      <span className="text-slate-500 mr-1">STEP {i + 1}</span>
                      {step.title}
                    </div>
                    <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                  </div>
                </div>
              ))}

              <div className="bg-blue-950/40 border border-blue-800/30 rounded-xl p-3 mt-2">
                <p className="text-blue-300 text-xs">
                  <span className="font-bold">今回のテーマ：</span>
                  {scenario.description}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
