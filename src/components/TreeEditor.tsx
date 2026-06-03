"use client";

import { useCallback, useRef, DragEvent, useState, useEffect } from "react";
import {
  ReactFlow,
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  Handle,
  Position,
  Node,
  Connection,
  NodeProps,
  ReactFlowInstance,
  useReactFlow,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Trash2, Diamond, Type } from "lucide-react";
import { v4 as uuidv4 } from "uuid";

// --- Custom Node Components ---

function DecisionNode({ data, selected }: NodeProps) {
  const label = data.label as string || "";
  return (
    <div className="relative group w-36 h-36">
      <Handle type="target" position={Position.Top} className="!bg-[var(--color-accent)] !w-2.5 !h-2.5 !border-2 !border-white" />
      <div
        className={`w-full h-full flex items-center justify-center rounded-full border-2 bg-white transition-colors ${
          selected ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent)] ring-offset-2" : "border-[var(--color-border)]"
        }`}
      >
        <input
          type="text"
          value={label}
          onChange={(e) => (data as any).onLabelChange?.(e.target.value)}
          placeholder="Escribí la pregunta..."
          className="w-28 bg-transparent text-xs text-center focus:outline-none placeholder-gray-300 resize-none"
        />
      </div>
      <Handle type="source" position={Position.Bottom} className="!bg-[var(--color-accent)] !w-2.5 !h-2.5 !border-2 !border-white" />
    </div>
  );
}

function TextNode({ data, selected }: NodeProps) {
  const label = data.label as string || "";
  return (
    <div className="relative group min-w-24 max-w-48">
      <input
        type="text"
        value={label}
        onChange={(e) => (data as any).onLabelChange?.(e.target.value)}
        placeholder="Escribí el texto..."
        className={`w-full bg-transparent text-xs focus:outline-none placeholder-gray-300 px-1 py-0.5 rounded border border-dashed transition-colors ${
          selected 
            ? "border-gray-400 bg-white" 
            : "border-transparent hover:border-gray-300 hover:bg-white/50"
        }`}
      />
    </div>
  );
}

const nodeTypes = {
  decision: DecisionNode,
  text: TextNode,
};

// --- UUID fallback ---
function generateId(): string {
  if (typeof uuidv4 === "function") return uuidv4();
  return `node_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
}

// --- Toolbar Item ---
const TOOLBAR_ITEMS = [
  { type: "decision" as const, label: "Nodo decisión", icon: Diamond, description: "Preguntas / decisiones" },
  { type: "text" as const, label: "Cuadro texto", icon: Type, description: "Información adicional" },
];

// --- Main Component ---
function FlowEditor({ data, onChange }: { data?: any; onChange?: (data: any) => void }) {
  const reactFlowWrapper = useRef<HTMLDivElement>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [nodes, setNodes, onNodesChange] = useNodesState(data?.nodes || []);
  const [edges, setEdges, onEdgesChange] = useEdgesState(data?.edges || []);
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Notify parent of changes
  useEffect(() => {
    onChange?.({ nodes, edges });
  }, [nodes, edges]);

  const onConnect = useCallback(
    (connection: Connection) => {
      setEdges((eds) => addEdge({ ...connection, type: "smoothstep", animated: false, style: { stroke: "#707070", strokeWidth: 2 } }, eds));
    },
    [setEdges]
  );

  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();
      const type = event.dataTransfer.getData("application/reactflow");
      if (!type || !reactFlowInstance || !reactFlowWrapper.current) return;

      const bounds = reactFlowWrapper.current.getBoundingClientRect();
      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const id = generateId();
      
      const baseNode = {
        id,
        position,
        data: {
          label: "",
          onLabelChange: (newLabel: string) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, label: newLabel } } : n
              )
            );
          },
        },
      };

      const newNode: Node = {
        ...baseNode,
        type,
        ...(type === "decision"
          ? { style: { width: 144, height: 144 } }
          : {}),
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  const onDragStart = (event: DragEvent, nodeType: string) => {
    event.dataTransfer.setData("application/reactflow", nodeType);
    event.dataTransfer.effectAllowed = "move";
  };

  const onNodeClick = (_: React.MouseEvent, node: Node) => {
    setSelectedNodeId(node.id);
  };

  const onPaneClick = () => {
    setSelectedNodeId(null);
  };

  const deleteSelected = useCallback(() => {
    if (selectedNodeId) {
      setNodes((nds) => nds.filter((n) => n.id !== selectedNodeId));
      setEdges((eds) => eds.filter((e) => e.source !== selectedNodeId && e.target !== selectedNodeId));
      setSelectedNodeId(null);
    }
  }, [selectedNodeId, setNodes, setEdges]);

  const addNodeAtCenter = useCallback(
    (type: "decision" | "text") => {
      if (!reactFlowInstance) return;
      const center = reactFlowInstance.screenToFlowPosition({
        x: window.innerWidth / 2,
        y: window.innerHeight / 2,
      });

      const id = generateId();
      const newNode: Node = {
        id,
        type,
        position: center,
        data: {
          label: "",
          onLabelChange: (newLabel: string) => {
            setNodes((nds) =>
              nds.map((n) =>
                n.id === id ? { ...n, data: { ...n.data, label: newLabel } } : n
              )
            );
          },
        },
        ...(type === "decision" ? { style: { width: 144, height: 144 } } : {}),
      };
      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="space-y-4">
      {/* Toolbar */}
      <div className="flex items-center gap-3 p-3 bg-gray-50 border border-[var(--color-border)] rounded-xl">
        {TOOLBAR_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <div
              key={item.type}
              draggable
              onDragStart={(e) => onDragStart(e, item.type)}
              onClick={() => addNodeAtCenter(item.type)}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-[var(--color-border)] rounded-xl cursor-pointer hover:border-[var(--color-accent)] hover:shadow-sm transition-all select-none"
            >
              <Icon className="w-4 h-4 text-[var(--color-accent)]" />
              <span className="text-xs font-medium">{item.label}</span>
            </div>
          );
        })}
        <div className="ml-auto flex items-center gap-2">
          {selectedNodeId && (
            <button
              onClick={deleteSelected}
              className="flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            >
              <Trash2 className="w-3.5 h-3.5" />
              Eliminar
            </button>
          )}
          <span className="text-[10px] text-[var(--color-secondary)]">
            Arrastrá los elementos al canvas o hacé clic para agregarlos
          </span>
        </div>
      </div>

      {/* Canvas */}
      <div
        ref={reactFlowWrapper}
        className="h-[420px] border border-[var(--color-border)] rounded-xl overflow-hidden"
      >
        <ReactFlowProvider>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onInit={setReactFlowInstance}
            onNodeClick={onNodeClick}
            onPaneClick={onPaneClick}
            nodeTypes={nodeTypes}
            fitView
            deleteKeyCode={["Delete", "Backspace"]}
            snapToGrid
            snapGrid={[20, 20]}
            defaultEdgeOptions={{
              type: "smoothstep",
              style: { stroke: "#707070", strokeWidth: 2 },
            }}
          >
            <Controls showInteractive={false} className="!rounded-lg !border !border-[var(--color-border)] !shadow-none" />
            <Background color="#e8e8ed" gap={20} />
          </ReactFlow>
        </ReactFlowProvider>
      </div>
    </div>
  );
}

export default function TreeEditor({ value, onChange }: { value?: any; onChange?: (data: any) => void }) {
  return (
    <div>
      <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Árbol de decisión</label>
      <FlowEditor data={value} onChange={onChange} />
    </div>
  );
}
