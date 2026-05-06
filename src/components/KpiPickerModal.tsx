import { useState, useMemo } from 'react';
import { useGameStore } from '../store/gameStore';
import { getCandidates } from '../data/kpiCandidates';
import type { Genre, Operator } from '../types/scenario';

const operators: Operator[] = ['×', '÷', '+', '-'];

interface Props {
  parentId: string;
  genre: Genre;
  onClose: () => void;
}

export const KpiPickerModal = ({ parentId, genre, onClose }: Props) => {
  const { addNamedNode } = useGameStore();
  const [search, setSearch] = useState('');
  const [customLabel, setCustomLabel] = useState('');
  const [customOp, setCustomOp] = useState<Operator>('×');
  const [composing, setComposing] = useState(false);

  const candidates = useMemo(() => getCandidates(genre), [genre]);

  const filtered = useMemo(() => {
    if (!search.trim()) return candidates;
    const q = search.toLowerCase();
    return candidates.filter((c) => c.label.toLowerCase().includes(q));
  }, [candidates, search]);

  // カテゴリ別にグループ化
  const grouped = useMemo(() => {
    const map: Record<string, typeof candidates> = {};
    filtered.forEach((c) => {
      if (!map[c.category]) map[c.category] = [];
      map[c.category].push(c);
    });
    return map;
  }, [filtered]);

  const handleSelect = (label: string, operator: Operator) => {
    addNamedNode(parentId, label, operator);
    onClose();
  };

  const handleCustomSubmit = () => {
    const label = customLabel.trim();
    if (!label) return;
    addNamedNode(parentId, label, customOp);
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.75)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg shadow-2xl flex flex-col max-h-[80vh]">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700 shrink-0">
          <h2 className="text-white font-bold text-base">KPIを選択</h2>
          <button onClick={onClose} className="text-slate-400 hover:text-white text-2xl leading-none">×</button>
        </div>

        {/* Search */}
        <div className="px-4 pt-3 pb-2 shrink-0">
          <input
            autoFocus
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onCompositionStart={() => setComposing(true)}
            onCompositionEnd={(e) => { setComposing(false); setSearch((e.target as HTMLInputElement).value); }}
            placeholder="絞り込み検索..."
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2 text-white text-sm placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Candidates */}
        <div className="flex-1 overflow-y-auto px-4 py-2 space-y-4">
          {Object.keys(grouped).length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">候補が見つかりません</p>
          ) : (
            Object.entries(grouped).map(([category, items]) => (
              <div key={category}>
                <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
                  {category}
                </div>
                <div className="flex flex-wrap gap-2">
                  {items.map((item) => (
                    <button
                      key={item.label}
                      onClick={() => handleSelect(item.label, item.defaultOperator)}
                      className="group flex items-center gap-1.5 px-3 py-2 bg-slate-800 hover:bg-blue-500 border border-slate-600 hover:border-blue-400 text-slate-200 hover:text-white rounded-lg text-sm font-medium transition-all"
                    >
                      <span className="text-slate-500 group-hover:text-blue-200 font-mono text-xs">
                        {item.defaultOperator}
                      </span>
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>

        {/* Custom input */}
        <div className="px-4 py-4 border-t border-slate-700 shrink-0">
          <div className="text-slate-500 text-xs font-semibold uppercase tracking-wider mb-2">
            手入力（候補にないKPI）
          </div>
          <div className="flex gap-2">
            <div className="flex gap-1 shrink-0">
              {operators.map((op) => (
                <button
                  key={op}
                  onClick={() => setCustomOp(op)}
                  className={`w-8 h-9 text-sm rounded font-bold transition-all ${
                    customOp === op
                      ? 'bg-blue-500 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  {op}
                </button>
              ))}
            </div>
            <input
              value={customLabel}
              onChange={(e) => setCustomLabel(e.target.value)}
              onCompositionStart={() => setComposing(true)}
              onCompositionEnd={(e) => { setComposing(false); setCustomLabel((e.target as HTMLInputElement).value); }}
              onKeyDown={(e) => { if (e.key === 'Enter' && !composing) handleCustomSubmit(); }}
              placeholder="KPI名を入力..."
              className="flex-1 bg-slate-800 border border-slate-600 rounded-lg px-3 py-2 text-white text-sm placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
            />
            <button
              onClick={handleCustomSubmit}
              disabled={!customLabel.trim()}
              className="px-4 py-2 bg-blue-500 disabled:bg-slate-700 disabled:text-slate-500 text-white font-bold rounded-lg text-sm hover:bg-blue-600 transition-colors"
            >
              追加
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
