import { useState } from 'react';
import { searchGlossary, findGlossaryEntries, type GlossaryEntry } from '../data/glossary';

interface Props {
  onClose: () => void;
  initialQuery?: string;
}

export const GlossaryModal = ({ onClose, initialQuery = '' }: Props) => {
  const [query, setQuery] = useState(initialQuery);
  const results = searchGlossary(query);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.7)' }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-slate-900 border border-slate-700 rounded-2xl w-full max-w-lg max-h-[80vh] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-700">
          <h2 className="text-white font-bold text-lg">📖 KPI用語集</h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white text-2xl leading-none transition-colors"
          >
            ×
          </button>
        </div>

        {/* Search */}
        <div className="px-5 py-3 border-b border-slate-700">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="用語を検索... （例：ROAS、CVR、MRR）"
            className="w-full bg-slate-800 border border-slate-600 rounded-lg px-4 py-2.5 text-white text-sm placeholder-slate-500 outline-none focus:border-blue-500 transition-colors"
          />
        </div>

        {/* Results */}
        <div className="flex-1 overflow-y-auto px-5 py-3 space-y-4">
          {results.length === 0 ? (
            <p className="text-slate-400 text-sm text-center py-8">
              「{query}」は見つかりませんでした
            </p>
          ) : (
            results.map((entry) => <GlossaryCard key={entry.term} entry={entry} onSearch={setQuery} />)
          )}
        </div>
      </div>
    </div>
  );
};

const GlossaryCard = ({
  entry,
  onSearch,
}: {
  entry: GlossaryEntry;
  onSearch: (q: string) => void;
}) => (
  <div className="bg-slate-800 rounded-xl p-4 border border-slate-700">
    <div className="flex items-baseline gap-2 mb-2">
      <span className="text-white font-bold text-base">{entry.term}</span>
      <span className="text-slate-500 text-xs">{entry.reading}</span>
    </div>
    <p className="text-slate-300 text-sm leading-relaxed mb-2">{entry.definition}</p>
    {entry.example && (
      <div className="bg-blue-950/40 border border-blue-800/30 rounded-lg px-3 py-2 mb-2">
        <span className="text-blue-400 text-xs font-semibold">例）</span>
        <span className="text-blue-200 text-xs ml-1">{entry.example}</span>
      </div>
    )}
    {entry.related && entry.related.length > 0 && (
      <div className="flex flex-wrap gap-1 mt-2">
        <span className="text-slate-500 text-xs">関連：</span>
        {entry.related.map((r) => (
          <button
            key={r}
            onClick={() => onSearch(r)}
            className="text-xs text-blue-400 hover:text-blue-200 underline underline-offset-2 transition-colors"
          >
            {r}
          </button>
        ))}
      </div>
    )}
  </div>
);
