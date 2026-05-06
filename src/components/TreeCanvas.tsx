import { useMemo } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  useNodesState,
  useEdgesState,
  type Node,
  type Edge,
  type NodeTypes,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useGameStore } from '../store/gameStore';
import { KpiNodeComponent } from './KpiNode';
import type { UserNode } from '../types/scenario';

const nodeTypes: NodeTypes = { kpi: KpiNodeComponent };

const buildLayout = (nodes: UserNode[]): { nodes: Node[]; edges: Edge[] } => {
  const flowNodes: Node[] = [];
  const flowEdges: Edge[] = [];
  const childrenMap: Record<string, string[]> = {};
  const posMap: Record<string, { x: number; y: number }> = {};

  nodes.forEach((n) => {
    const pid = n.parentId || '';
    if (!childrenMap[pid]) childrenMap[pid] = [];
    childrenMap[pid].push(n.id);
  });

  const nodeMap: Record<string, UserNode> = {};
  nodes.forEach((n) => (nodeMap[n.id] = n));

  const place = (id: string, depth: number, xOffset: number): number => {
    const children = childrenMap[id] || [];
    if (children.length === 0) {
      posMap[id] = { x: xOffset * 200, y: depth * 140 };
      return 1;
    }
    let totalWidth = 0;
    let startX = xOffset;
    children.forEach((cid) => {
      const w = place(cid, depth + 1, startX);
      startX += w;
      totalWidth += w;
    });
    const childPositions = children.map((cid) => posMap[cid].x);
    const centerX = (childPositions[0] + childPositions[childPositions.length - 1]) / 2;
    posMap[id] = { x: centerX, y: depth * 140 };
    return totalWidth;
  };

  const roots = nodes.filter((n) => !n.parentId);
  roots.forEach((r) => place(r.id, 0, 0));

  nodes.forEach((n) => {
    const pos = posMap[n.id] || { x: 0, y: 0 };
    flowNodes.push({
      id: n.id,
      type: 'kpi',
      position: pos,
      data: {
        id: n.id,
        label: n.label,
        operator: n.operator,
        isRoot: !n.parentId,
        note: n.note,
      },
    });

    if (n.parentId) {
      flowEdges.push({
        id: `e-${n.parentId}-${n.id}`,
        source: n.parentId,
        target: n.id,
        style: { stroke: '#475569', strokeWidth: 2 },
        animated: false,
      });
    }
  });

  return { nodes: flowNodes, edges: flowEdges };
};

export const TreeCanvas = () => {
  const { userNodes } = useGameStore();
  const { nodes: layoutNodes, edges: layoutEdges } = useMemo(
    () => buildLayout(userNodes),
    [userNodes]
  );

  const [nodes, , onNodesChange] = useNodesState(layoutNodes);
  const [edges, , onEdgesChange] = useEdgesState(layoutEdges);

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={layoutNodes}
        edges={layoutEdges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.3 }}
        minZoom={0.3}
        maxZoom={2}
        defaultEdgeOptions={{ style: { stroke: '#475569', strokeWidth: 2 } }}
      >
        <Background color="#334155" gap={20} size={1} />
        <Controls className="!bg-slate-800 !border-slate-600" />
        <MiniMap
          nodeColor="#3b82f6"
          maskColor="rgba(15, 23, 42, 0.7)"
          className="!bg-slate-800 !border-slate-600"
        />
      </ReactFlow>
    </div>
  );
};
