import { memo, useState, useRef, useCallback, useEffect } from 'react';
import { Handle, Position, type NodeProps } from '@xyflow/react';
import { useGameStore } from '../store/gameStore';
import type { Operator } from '../types/scenario';

const operators: Operator[] = ['×', '÷', '+', '-'];

interface KpiNodeData {
  id: string;
  label: string;
  operator?: Operator;
  isRoot?: boolean;
}

export const KpiNodeComponent = memo(({ data }: NodeProps) => {
  const nodeData = data as KpiNodeData;
  const { updateNode, openPicker, removeNode } = useGameStore();
  const [editing, setEditing] = useState(false);
  const [localLabel, setLocalLabel] = useState(nodeData.label);
  const composingRef = useRef(false);

  // ストアの値が外から変わったときにローカルを同期
  useEffect(() => {
    if (!editing) setLocalLabel(nodeData.label);
  }, [nodeData.label, editing]);

  const commitLabel = useCallback(
    (value: string) => {
      updateNode(nodeData.id, { label: value });
    },
    [nodeData.id, updateNode]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLocalLabel(e.target.value);
    // IME変換中はストアを更新しない
    if (!composingRef.current) {
      commitLabel(e.target.value);
    }
  };

  const handleCompositionStart = () => {
    composingRef.current = true;
  };

  const handleCompositionEnd = (e: React.CompositionEvent<HTMLInputElement>) => {
    composingRef.current = false;
    commitLabel((e.target as HTMLInputElement).value);
  };

  const handleBlur = () => {
    setEditing(false);
    commitLabel(localLabel);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !composingRef.current) {
      setEditing(false);
      commitLabel(localLabel);
    }
  };

  const handleOperatorChange = useCallback(
    (op: Operator) => updateNode(nodeData.id, { operator: op }),
    [nodeData.id, updateNode]
  );

  return (
    <div className="relative min-w-[160px]">
      {/* Operator selector */}
      {!nodeData.isRoot && nodeData.operator && (
        <div className="absolute -top-7 left-1/2 -translate-x-1/2 z-10">
          <div className="flex gap-1">
            {operators.map((op) => (
              <button
                key={op}
                onClick={() => handleOperatorChange(op)}
                className={`w-6 h-6 text-xs rounded font-bold transition-all ${
                  nodeData.operator === op
                    ? 'bg-blue-500 text-white shadow-md'
                    : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                }`}
              >
                {op}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Node body */}
      <div
        className={`rounded-xl border-2 shadow-lg transition-all ${
          nodeData.isRoot
            ? 'bg-gradient-to-br from-blue-600 to-cyan-600 border-blue-400 text-white'
            : 'bg-slate-800 border-slate-600 text-white hover:border-blue-500'
        }`}
      >
        <div className="px-4 py-3">
          {editing && !nodeData.isRoot ? (
            <input
              autoFocus
              value={localLabel}
              onChange={handleChange}
              onCompositionStart={handleCompositionStart}
              onCompositionEnd={handleCompositionEnd}
              onBlur={handleBlur}
              onKeyDown={handleKeyDown}
              className="bg-transparent border-b border-blue-400 outline-none text-white text-sm w-full min-w-[120px]"
              placeholder="KPI名を入力..."
            />
          ) : (
            <div
              onDoubleClick={() => !nodeData.isRoot && setEditing(true)}
              title={nodeData.isRoot ? '' : 'ダブルクリックで名前を変更'}
              className={`text-sm font-semibold ${!nodeData.isRoot && 'cursor-pointer'}`}
            >
              {nodeData.label}
            </div>
          )}
        </div>

        <div className={`flex border-t ${nodeData.isRoot ? 'border-blue-400/30' : 'border-slate-700'}`}>
          <button
            onClick={() => openPicker(nodeData.id)}
            className={`flex-1 py-1.5 text-xs font-medium transition-colors rounded-bl-xl ${
              nodeData.isRoot
                ? 'text-blue-100 hover:bg-blue-500/30'
                : 'text-slate-400 hover:text-white hover:bg-slate-700'
            }`}
          >
            + 追加
          </button>
          {!nodeData.isRoot && (
            <button
              onClick={() => removeNode(nodeData.id)}
              className="flex-1 py-1.5 text-xs text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors rounded-br-xl border-l border-slate-700"
            >
              削除
            </button>
          )}
        </div>
      </div>

      <Handle type="target" position={Position.Top} className="opacity-0" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" />
    </div>
  );
});
