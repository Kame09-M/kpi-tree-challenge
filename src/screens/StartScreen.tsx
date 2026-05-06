import { useState } from 'react';
import { useGameStore } from '../store/gameStore';
import { getRandomScenario, getRandomMercariScenario } from '../data/scenarios';
import type { Difficulty, GameMode } from '../types/scenario';

const difficulties: { value: Difficulty; label: string; time: string; desc: string }[] = [
  { value: 'easy', label: 'Easy', time: '3分', desc: '2階層・基本的な分解' },
  { value: 'normal', label: 'Normal', time: '5分', desc: '3階層・実践的な分解' },
  { value: 'hard', label: 'Hard', time: '7分', desc: '4階層以上・高度な分解' },
];

const genres = [
  { value: 'random', label: 'ランダム' },
  { value: 'EC', label: 'ECサイト' },
  { value: 'SaaS', label: 'SaaS' },
  { value: 'Marketing', label: 'マーケティング' },
];

export const StartScreen = () => {
  const [mode, setMode] = useState<GameMode>('normal');
  const [genre, setGenre] = useState<string>('random');
  const [difficulty, setDifficulty] = useState<Difficulty>('normal');
  const { setScenario, setScreen } = useGameStore();

  const handleStart = () => {
    const scenario =
      mode === 'company'
        ? getRandomMercariScenario(difficulty)
        : getRandomScenario(genre === 'random' ? undefined : genre, difficulty);

    if (!scenario) {
      alert('該当するシナリオが見つかりませんでした。別の設定をお試しください。');
      return;
    }
    setScenario(scenario);
    setScreen('scenario');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-xl w-full">
        {/* Hero */}
        <div className="text-center mb-8">
          <div className="text-5xl mb-3">🌳</div>
          <h1 className="text-4xl font-bold text-white mb-2">KPI Tree Challenge</h1>
          <p className="text-blue-300">ビジネスKPIを分解して、思考力を鍛えよう</p>
          <button
            onClick={() => setScreen('learn')}
            className="mt-3 text-sm text-slate-400 hover:text-blue-300 underline underline-offset-2 transition-colors"
          >
            📖 はじめての方はこちら（KPI分解とは？）
          </button>
        </div>

        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl space-y-6">

          {/* Mode selection */}
          <div>
            <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              モード
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => setMode('normal')}
                className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
                  mode === 'normal'
                    ? 'bg-blue-500/20 border-blue-400 text-white'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
                }`}
              >
                <span className="text-2xl mb-1">🎮</span>
                <span className="font-bold">通常モード</span>
                <span className="text-xs opacity-70 mt-0.5">EC / SaaS / マーケ</span>
              </button>
              <button
                onClick={() => setMode('company')}
                className={`flex flex-col items-start p-4 rounded-xl border-2 transition-all text-left ${
                  mode === 'company'
                    ? 'bg-blue-500/20 border-blue-400 text-white'
                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/30'
                }`}
              >
                <span className="text-2xl mb-1">🏢</span>
                <span className="font-bold">企業モード</span>
                <span className="text-xs opacity-70 mt-0.5">メルカリのKPIを分解</span>
              </button>
            </div>
          </div>

          {/* Company badge */}
          {mode === 'company' && (
            <div className="flex items-center gap-3 bg-red-500/10 border border-red-500/30 rounded-xl px-4 py-3">
              <span className="text-2xl">🛍️</span>
              <div>
                <div className="text-white font-bold text-sm">メルカリ</div>
                <div className="text-slate-400 text-xs">フリマアプリ国内No.1。GMV・MAU・Take Rateを分解。</div>
              </div>
            </div>
          )}

          {/* Genre (normal mode only) */}
          {mode === 'normal' && (
            <div>
              <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wider">
                ジャンル
              </label>
              <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
                {genres.map((g) => (
                  <button
                    key={g.value}
                    onClick={() => setGenre(g.value)}
                    className={`py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                      genre === g.value
                        ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                        : 'bg-white/10 text-blue-200 hover:bg-white/20'
                    }`}
                  >
                    {g.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Difficulty */}
          <div>
            <label className="block text-white font-semibold mb-3 text-sm uppercase tracking-wider">
              難易度
            </label>
            <div className="space-y-2">
              {difficulties.map((d) => (
                <button
                  key={d.value}
                  onClick={() => setDifficulty(d.value)}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-xl transition-all ${
                    difficulty === d.value
                      ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                      : 'bg-white/10 text-blue-200 hover:bg-white/20'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="font-bold text-base">{d.label}</span>
                    <span className="text-xs opacity-80">{d.desc}</span>
                  </div>
                  <span className="text-xs font-mono bg-black/20 px-2 py-1 rounded">{d.time}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Start */}
          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-lg rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 active:scale-95"
          >
            スタート →
          </button>
        </div>

        {/* Footer hints */}
        <div className="mt-6 grid grid-cols-3 gap-3 text-center text-sm text-blue-300">
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-xl mb-1">🎯</div>
            <div>KPIを正確に分解してスコアを稼ごう</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-xl mb-1">⏱</div>
            <div>時間内に提出するとボーナスあり</div>
          </div>
          <div className="bg-white/5 rounded-xl p-3">
            <div className="text-xl mb-1">🏢</div>
            <div>企業モードで実際のKPIに挑戦</div>
          </div>
        </div>
      </div>
    </div>
  );
};
