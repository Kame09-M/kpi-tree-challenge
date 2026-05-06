import { useGameStore } from '../store/gameStore';

const genreColors: Record<string, string> = {
  EC: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
  SaaS: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
  Marketing: 'bg-green-500/20 text-green-300 border-green-500/30',
  company: 'bg-red-500/20 text-red-300 border-red-500/30',
};

const difficultyColors: Record<string, string> = {
  easy: 'bg-green-500/20 text-green-300 border-green-500/30',
  normal: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30',
  hard: 'bg-red-500/20 text-red-300 border-red-500/30',
};

export const ScenarioScreen = () => {
  const { scenario, setScreen, startTimer } = useGameStore();
  if (!scenario) return null;

  const handleStart = () => {
    startTimer();
    setScreen('tree');
  };

  const timeMin = Math.floor(scenario.timeLimit / 60);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex items-center justify-center p-6">
      <div className="max-w-2xl w-full">
        {/* Badges */}
        <div className="flex gap-2 mb-6 justify-center flex-wrap">
          {scenario.company && (
            <span className="text-xs font-bold px-3 py-1 rounded-full border bg-red-500/20 text-red-300 border-red-500/30">
              🏢 {scenario.company === 'mercari' ? 'メルカリ' : scenario.company}
            </span>
          )}
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${genreColors[scenario.genre]}`}>
            {scenario.genre === 'company' ? '企業モード' : scenario.genre}
          </span>
          <span className={`text-xs font-bold px-3 py-1 rounded-full border ${difficultyColors[scenario.difficulty]}`}>
            {scenario.difficulty.toUpperCase()}
          </span>
          <span className="text-xs font-bold px-3 py-1 rounded-full border bg-blue-500/20 text-blue-300 border-blue-500/30">
            ⏱ {timeMin}分
          </span>
        </div>

        {/* Card */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 shadow-2xl">
          <h2 className="text-2xl font-bold text-white mb-4">📋 {scenario.title}</h2>

          {scenario.companyContext && (
            <div className="bg-red-950/30 border border-red-800/30 rounded-xl px-4 py-3 mb-4 flex items-center gap-3">
              <span className="text-xl">🏢</span>
              <p className="text-red-200 text-sm">{scenario.companyContext}</p>
            </div>
          )}

          <div className="bg-blue-950/50 rounded-xl p-5 mb-6 border border-blue-800/30">
            <p className="text-blue-100 text-base leading-relaxed">{scenario.description}</p>
          </div>

          <div className="bg-white/5 rounded-xl p-5 mb-8 border border-white/10">
            <div className="text-blue-300 text-sm font-semibold mb-2 uppercase tracking-wider">
              最上位KPI（ルートノード）
            </div>
            <div className="text-white text-3xl font-bold">{scenario.rootKpi}</div>
          </div>

          <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-4 mb-8">
            <p className="text-amber-200 text-sm">
              <span className="font-bold">📌 ミッション：</span>
              このKPIを構成する要素をツリー形式で分解してください。
              演算子（×・÷・+・-）を使って親ノードとの関係を表現しましょう。
            </p>
          </div>

          <button
            onClick={handleStart}
            className="w-full py-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold text-xl rounded-xl hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg shadow-blue-500/30 active:scale-95"
          >
            タイマースタート →
          </button>
        </div>

        <button
          onClick={() => useGameStore.getState().resetGame()}
          className="mt-4 w-full py-3 text-blue-400 hover:text-blue-200 text-sm transition-colors"
        >
          ← スタート画面に戻る
        </button>
      </div>
    </div>
  );
};
