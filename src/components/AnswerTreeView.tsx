import type { KpiNode } from '../types/scenario';

interface Props {
  node: KpiNode;
  userLabels: Set<string>;
  feedback: Record<string, string>;
  depth?: number;
}

const getNodeStatus = (label: string, userLabels: Set<string>) => {
  const normalized = label.toLowerCase().trim();
  return userLabels.has(normalized) ? 'correct' : 'missing';
};

export const AnswerTreeView = ({ node, userLabels, feedback, depth = 0 }: Props) => {
  const status = depth === 0 ? 'root' : getNodeStatus(node.label, userLabels);

  return (
    <div className={`${depth > 0 ? 'ml-6 border-l-2 border-slate-700 pl-3' : ''}`}>
      <div className="flex items-start gap-2 mb-2">
        {node.operator && depth > 0 && (
          <span className="text-slate-400 font-mono text-sm mt-1">{node.operator}</span>
        )}
        <div className="flex-1">
          <div
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold ${
              status === 'root'
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : status === 'correct'
                ? 'bg-green-500/20 text-green-300 border border-green-500/40'
                : 'bg-red-500/20 text-red-300 border border-red-500/40'
            }`}
          >
            <span>
              {status === 'root' ? '🎯' : status === 'correct' ? '🟢' : '🔴'}
            </span>
            {node.label}
          </div>
          {status === 'missing' && feedback[node.id] && (
            <p className="text-xs text-slate-400 mt-1 ml-1">{feedback[node.id]}</p>
          )}
          {status === 'correct' && feedback[node.id] && (
            <p className="text-xs text-slate-500 mt-1 ml-1">{feedback[node.id]}</p>
          )}
        </div>
      </div>
      {node.children?.map((child) => (
        <AnswerTreeView
          key={child.id}
          node={child}
          userLabels={userLabels}
          feedback={feedback}
          depth={depth + 1}
        />
      ))}
    </div>
  );
};

interface UserTreeViewProps {
  labels: string[];
  answerLabels: Set<string>;
}

export const UserTreeView = ({ labels, answerLabels }: UserTreeViewProps) => {
  const extraLabels = labels.filter(
    (l) => !answerLabels.has(l.toLowerCase().trim())
  );
  const correctLabels = labels.filter((l) => answerLabels.has(l.toLowerCase().trim()));

  return (
    <div className="space-y-2">
      {labels.map((label, i) => {
        const isExtra = extraLabels.includes(label);
        const isRoot = i === 0;
        return (
          <div
            key={i}
            className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-semibold mr-2 mb-1 ${
              isRoot
                ? 'bg-blue-500/20 text-blue-300 border border-blue-500/40'
                : isExtra
                ? 'bg-yellow-500/20 text-yellow-300 border border-yellow-500/40'
                : 'bg-green-500/20 text-green-300 border border-green-500/40'
            }`}
          >
            {isRoot ? '🎯' : isExtra ? '🟡' : '🟢'}
            {label}
          </div>
        );
      })}
    </div>
  );
};
