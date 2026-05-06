import { useState } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { useGameStore } from '../store/gameStore';
import { TreeCanvas } from '../components/TreeCanvas';
import { Timer } from '../components/Timer';
import { GlossaryModal } from '../components/GlossaryModal';
import { HintPanel } from '../components/HintPanel';
import { KpiPickerModal } from '../components/KpiPickerModal';

export const TreeScreen = () => {
  const { scenario, submitAnswer, userNodes, resetGame, hintsUsed, pendingParentId, closePicker } = useGameStore();
  const [glossaryOpen, setGlossaryOpen] = useState(false);
  const [glossaryQuery, setGlossaryQuery] = useState('');
  const [hintOpen, setHintOpen] = useState(false);

  if (!scenario) return null;

  const nodeCount = userNodes.length;

  const openGlossary = (query = '') => {
    setGlossaryQuery(query);
    setGlossaryOpen(true);
  };

  return (
    <div className="h-screen flex flex-col bg-slate-950">
      {/* Toolbar */}
      <div className="flex items-center justify-between px-4 py-3 bg-slate-900 border-b border-slate-700 shrink-0">
        <div className="flex items-center gap-4">
          <button
            onClick={resetGame}
            className="text-slate-400 hover:text-white text-sm transition-colors"
          >
            ← 戻る
          </button>
          <div>
            <h1 className="text-white font-bold text-base">{scenario.title}</h1>
            <p className="text-slate-400 text-xs">
              ルート:{' '}
              <button
                onClick={() => openGlossary(scenario.rootKpi)}
                className="text-blue-400 font-semibold hover:text-blue-300 underline underline-offset-2 transition-colors"
              >
                {scenario.rootKpi}
              </button>
              {' '}・ノード数: {nodeCount}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setHintOpen(true)}
            className={`flex items-center gap-1.5 px-3 py-2 text-sm rounded-lg transition-colors border ${
              hintsUsed > 0
                ? 'bg-yellow-500/10 text-yellow-300 border-yellow-600/40 hover:bg-yellow-500/20'
                : 'bg-slate-700 text-slate-200 border-slate-600 hover:bg-slate-600'
            }`}
          >
            <span>💡</span>
            <span>ヒント{hintsUsed > 0 ? `（${hintsUsed}回使用）` : ''}</span>
          </button>
          <button
            onClick={() => openGlossary('')}
            className="flex items-center gap-1.5 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-slate-200 text-sm rounded-lg transition-colors border border-slate-600"
          >
            <span>📖</span>
            <span>用語</span>
          </button>
          <Timer />
          <button
            onClick={submitAnswer}
            className="px-5 py-2 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold rounded-lg hover:from-blue-600 hover:to-cyan-600 transition-all shadow-lg active:scale-95"
          >
            回答する →
          </button>
        </div>
      </div>

      {/* Scenario description bar */}
      <div className="px-4 py-2 bg-amber-950/30 border-b border-amber-800/20 text-amber-300 text-xs flex items-center gap-2">
        <span>💡</span>
        <span className="line-clamp-1">{scenario.description}</span>
      </div>

      {/* Canvas */}
      <div className="flex-1 min-h-0">
        <ReactFlowProvider>
          <TreeCanvas />
        </ReactFlowProvider>
      </div>

      {/* Footer */}
      <div className="px-4 py-2 bg-slate-900 border-t border-slate-700 text-slate-500 text-xs flex gap-4 shrink-0">
        <span>「+ 追加」でKPIを選択して追加</span>
        <span>ノード名はダブルクリックで変更可</span>
        <span>
          <button onClick={() => setHintOpen(true)} className="text-blue-400 hover:text-blue-300 underline underline-offset-2">
            💡 分解の手順を見る
          </button>
        </span>
      </div>

      {hintOpen && <HintPanel onClose={() => setHintOpen(false)} />}
      {glossaryOpen && (
        <GlossaryModal initialQuery={glossaryQuery} onClose={() => setGlossaryOpen(false)} />
      )}
      {pendingParentId && (
        <KpiPickerModal
          parentId={pendingParentId}
          genre={scenario.genre}
          onClose={closePicker}
        />
      )}
    </div>
  );
};
