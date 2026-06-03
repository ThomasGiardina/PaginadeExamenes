"use client";

import { useState } from "react";
import TreeEditor from "@/components/TreeEditor";
import {
  ChevronRight,
  ChevronDown,
  Plus,
  Save,
  Eye,
  Send,
  Trash2,
  Bold,
  Italic,
  Underline,
  List,
  GripVertical,
  Lightbulb,
  FileText,
  CheckSquare,
  Grid3x3,
  GitBranch,

  Settings,
  HelpCircle,
} from "lucide-react";

type QuestionType = "texto-libre" | "multiple-choice" | "tabla-decision" | "arbol-decision";

type Topic = {
  id: number;
  name: string;
  expanded: boolean;
  color: string;
  questions: Question[];
};

type Question = {
  id: number;
  title: string;
  type: QuestionType;
  score: number;
};

const STEPS = [
  { label: "Información general", completed: true },
  { label: "Temas y preguntas", completed: false, active: true },
  { label: "Turnos y disponibilidad", completed: false },
  { label: "Revisión y publicación", completed: false },
];

const QUESTION_TYPES: { id: QuestionType; label: string; icon: any }[] = [
  { id: "texto-libre", label: "Texto libre", icon: FileText },
  { id: "multiple-choice", label: "Multiple choice", icon: CheckSquare },
  { id: "tabla-decision", label: "Tabla de decisión", icon: Grid3x3 },
  { id: "arbol-decision", label: "Árbol de decisión", icon: GitBranch },
];

const PUNTAJES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const TOPIC_COLORS = [
  { label: "Azul", value: "#0071e3" },
  { label: "Verde", value: "#28c76f" },
  { label: "Naranja", value: "#ff9f43" },
  { label: "Rojo", value: "#ea5455" },
  { label: "Púrpura", value: "#8b5cf6" },
  { label: "Celeste", value: "#0ea5e9" },
  { label: "Rosa", value: "#ec4899" },
  { label: "Amarillo", value: "#f59e0b" },
];

export default function CrearExamen() {
  // --- State ---
  const [selectedType, setSelectedType] = useState<QuestionType>("texto-libre");
  const [questionScore, setQuestionScore] = useState(2);
  const [enunciado, setEnunciado] = useState("");
  const [respuestaEsperada, setRespuestaEsperada] = useState("");
  const [examName, setExamName] = useState("Parcial 1 - Testing de Aplicaciones");
  const [examDescription, setExamDescription] = useState("");
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  // Tree data state
  const [treeData, setTreeData] = useState({ nodes: [], edges: [] });

  // MC options state
  const [mcOptions, setMcOptions] = useState([
    { id: 1, text: "", isCorrect: false },
    { id: 2, text: "", isCorrect: false },
    { id: 3, text: "", isCorrect: false },
    { id: 4, text: "", isCorrect: false },
  ]);

  // Table state
  const [tableRows, setTableRows] = useState(3);
  const [tableCols, setTableCols] = useState(3);

  // Topics
  const [topics, setTopics] = useState<Topic[]>([
    {
      id: 1,
      name: "Tema 1 - Fundamentos",
      expanded: true,
      color: "#0071e3",
      questions: [
        { id: 1, title: "Texto libre", type: "texto-libre", score: 2 },
        { id: 2, title: "Multiple choice", type: "multiple-choice", score: 3 },
        { id: 3, title: "Tabla de decisión", type: "tabla-decision", score: 2 },
        { id: 4, title: "Árbol de decisión", type: "arbol-decision", score: 3 },
      ],
    },
    { id: 2, name: "Tema 2 - Testing Unitario", expanded: false, color: "#28c76f", questions: [] },
    { id: 3, name: "Tema 3 - Testing de Integración", expanded: false, color: "#ff9f43", questions: [] },
  ]);

  // --- Handlers ---
  const toggleTopic = (id: number) => {
    setTopics(topics.map((t) => (t.id === id ? { ...t, expanded: !t.expanded } : t)));
  };

  const changeTopicColor = (id: number, color: string) => {
    setTopics((prev) => {
      const target = prev.find((t) => t.id === id);
      const existing = prev.find((t) => t.color === color && t.id !== id);
      if (!target) return prev;
      if (!existing) return prev.map((t) => (t.id === id ? { ...t, color } : t));
      return prev.map((t) => {
        if (t.id === id) return { ...t, color };
        if (t.id === existing.id) return { ...t, color: target.color };
        return t;
      });
    });
  };

  const selectQuestionType = (type: QuestionType) => {
    setSelectedType(type);
  };

  const handleMcOptionChange = (id: number, text: string) => {
    setMcOptions(mcOptions.map((o) => (o.id === id ? { ...o, text } : o)));
  };

  const handleMcCorrectChange = (id: number) => {
    setMcOptions(mcOptions.map((o) => ({ ...o, isCorrect: o.id === id })));
  };

  const renderQuestionEditor = () => {
    switch (selectedType) {
      case "texto-libre":
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Enunciado de la pregunta</label>
              <textarea
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
                placeholder="Escribí el enunciado de la pregunta..."
                rows={5}
                className="block w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Respuesta esperada / Criterios de corrección</label>
              <div className="border border-[var(--color-border)] rounded-xl overflow-hidden focus-within:ring-1 focus-within:ring-[var(--color-accent)] focus-within:border-[var(--color-accent)]">
                <div className="flex items-center gap-1 px-3 py-2 border-b border-[var(--color-border)] bg-gray-50/50">
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600"><Bold className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600"><Italic className="w-4 h-4" /></button>
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600"><Underline className="w-4 h-4" /></button>
                  <div className="w-px h-5 bg-gray-300 mx-1" />
                  <button className="p-1.5 rounded-lg hover:bg-gray-200 text-gray-600"><List className="w-4 h-4" /></button>
                </div>
                <textarea
                  value={respuestaEsperada}
                  onChange={(e) => setRespuestaEsperada(e.target.value)}
                  placeholder="Escribí la respuesta esperada o los criterios de corrección..."
                  rows={5}
                  className="block w-full px-4 py-3 text-sm placeholder-gray-400 focus:outline-none resize-none"
                />
              </div>
            </div>
          </div>
        );

      case "multiple-choice":
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Enunciado de la pregunta</label>
              <textarea
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
                placeholder="Escribí el enunciado de la pregunta..."
                rows={3}
                className="block w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Opciones</label>
              <div className="space-y-2">
                {mcOptions.map((opt, i) => {
                  const letters = ["A", "B", "C", "D"];
                  return (
                    <div key={opt.id} className="flex items-center gap-3">
                      <div className="flex items-center gap-3 flex-1 p-3 border border-[var(--color-border)] rounded-xl">
                        <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-xs font-medium text-[var(--color-secondary)] shrink-0">
                          {letters[i]}
                        </span>
                        <input
                          type="text"
                          value={opt.text}
                          onChange={(e) => handleMcOptionChange(opt.id, e.target.value)}
                          placeholder={`Opción ${letters[i]}`}
                          className="flex-1 bg-transparent text-sm focus:outline-none placeholder-gray-400"
                        />
                        <button
                          onClick={() => handleMcCorrectChange(opt.id)}
                          className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
                            opt.isCorrect
                              ? "border-[var(--color-success)] bg-[var(--color-success)] text-white"
                              : "border-gray-300 hover:border-gray-400"
                          }`}
                        >
                          {opt.isCorrect && <CheckSquare className="w-3 h-3" />}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
              <p className="text-xs text-[var(--color-secondary)] mt-2">Hacé clic en el círculo para marcar la opción correcta</p>
            </div>
          </div>
        );

      case "tabla-decision":
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Enunciado de la pregunta</label>
              <textarea
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
                placeholder="Escribí el enunciado de la pregunta..."
                rows={3}
                className="block w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] resize-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Tabla de decisión</label>
              <div className="border border-[var(--color-border)] rounded-xl overflow-hidden">
                <table className="w-full text-sm">
                  <tbody>
                    {Array.from({ length: tableRows }).map((_, r) => (
                      <tr key={r} className={r < tableRows - 1 ? "border-b border-[var(--color-border)]" : ""}>
                        {Array.from({ length: tableCols }).map((_, c) => (
                          <td key={c} className={c < tableCols - 1 ? "border-r border-[var(--color-border)]" : ""}>
                            <input
                              type="text"
                              placeholder={`${String.fromCharCode(65 + c)}${r + 1}`}
                              className="w-full px-3 py-2 bg-transparent text-sm focus:outline-none placeholder-gray-300"
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="flex gap-4 mt-3">
                <button
                  onClick={() => setTableRows(tableRows + 1)}
                  className="text-xs text-[var(--color-accent)] font-medium flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3 h-3" /> Agregar fila
                </button>
                <button
                  onClick={() => setTableCols(tableCols + 1)}
                  className="text-xs text-[var(--color-accent)] font-medium flex items-center gap-1 hover:underline"
                >
                  <Plus className="w-3 h-3" /> Agregar columna
                </button>
              </div>
            </div>
          </div>
        );

      case "arbol-decision":
        return (
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-2">Enunciado de la pregunta</label>
              <textarea
                value={enunciado}
                onChange={(e) => setEnunciado(e.target.value)}
                placeholder="Escribí el enunciado de la pregunta..."
                rows={3}
                className="block w-full px-4 py-3 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] resize-none"
              />
            </div>
            <TreeEditor value={treeData} onChange={setTreeData} />
          </div>
        );
    }
  };

  return (
    <div className="p-8 lg:p-10 w-full max-w-[1600px] mx-auto space-y-6 mt-12 lg:mt-0">
      
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-sm text-[var(--color-secondary)]">
        <span className="hover:text-[var(--color-text)] cursor-pointer">Exámenes</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[var(--color-text)] font-medium">Crear nuevo examen</span>
      </nav>

      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <h1 className="text-3xl font-bold font-display">Crear nuevo examen</h1>
        <div className="flex items-center gap-3">
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border)] text-sm font-medium rounded-xl hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text)]">
            <Save className="w-4 h-4" />
            Guardar borrador
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 border border-[var(--color-border)] text-sm font-medium rounded-xl hover:bg-[var(--color-surface)] transition-colors text-[var(--color-text)]">
            <Eye className="w-4 h-4" />
            Vista previa
          </button>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition-colors">
            <Send className="w-4 h-4" />
            Publicar examen
          </button>
        </div>
      </div>

      {/* Stepper */}
      <div className="flex items-center gap-0 w-full">
        {STEPS.map((step, i) => (
          <div key={i} className="flex-1 flex items-center">
            <div className="flex items-center gap-2">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium shrink-0 ${
                  step.completed
                    ? "bg-[var(--color-accent)] text-white"
                    : step.active
                    ? "bg-[var(--color-accent)] text-white ring-4 ring-blue-100"
                    : "bg-gray-100 text-gray-400"
                }`}
              >
                {step.completed ? (
                  <CheckSquare className="w-4 h-4" />
                ) : (
                  i + 1
                )}
              </div>
              <span
                className={`text-sm font-medium hidden sm:inline ${
                  step.active
                    ? "text-[var(--color-text)]"
                    : step.completed
                    ? "text-[var(--color-accent)]"
                    : "text-[var(--color-secondary)]"
                }`}
              >
                {step.label}
              </span>
            </div>
            {i < STEPS.length - 1 && (
              <div
                className={`flex-1 h-px mx-3 ${
                  step.completed ? "bg-[var(--color-accent)]" : "bg-gray-200"
                }`}
              />
            )}
          </div>
        ))}
      </div>

      {/* 3-Column Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr_340px] gap-6">
        
        {/* ===== LEFT COLUMN: TEMAS ===== */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 flex flex-col h-fit lg:sticky lg:top-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold font-display text-lg">Temas del examen</h2>
            <button className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--color-accent)] text-white text-xs font-medium rounded-xl hover:bg-blue-600 transition-colors">
              <Plus className="w-3.5 h-3.5" />
              Agregar tema
            </button>
          </div>

          <div className="space-y-2">
            {topics.map((topic) => (
              <div key={topic.id} className="border border-[var(--color-border)] rounded-xl overflow-hidden">
                <button
                  onClick={() => toggleTopic(topic.id)}
                  className="w-full flex items-center justify-between px-4 py-3 text-sm font-medium hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: topic.color }} />
                    <span>Tema {topic.id}</span>
                  </div>
                  {topic.expanded ? (
                    <ChevronDown className="w-4 h-4 text-[var(--color-secondary)]" />
                  ) : (
                    <ChevronRight className="w-4 h-4 text-[var(--color-secondary)]" />
                  )}
                </button>
                {topic.expanded && topic.questions.length > 0 && (
                  <div className="border-t border-[var(--color-border)] divide-y divide-[var(--color-border)]">
                    {topic.questions.map((q, idx) => (
                      <button
                        key={q.id}
                        onClick={() => setSelectedQuestionIndex(idx)}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm text-left transition-colors ${
                          selectedQuestionIndex === idx
                            ? "bg-blue-50 text-[var(--color-accent)] font-medium"
                            : "text-[var(--color-secondary)] hover:bg-gray-50"
                        }`}
                      >
                        <GripVertical className="w-3.5 h-3.5 text-gray-300 shrink-0" />
                        {q.type === "texto-libre" && <FileText className="w-3.5 h-3.5" />}
                        {q.type === "multiple-choice" && <CheckSquare className="w-3.5 h-3.5" />}
                        {q.type === "tabla-decision" && <Grid3x3 className="w-3.5 h-3.5" />}
                        {q.type === "arbol-decision" && <GitBranch className="w-3.5 h-3.5" />}
                        <span className="truncate">{q.title}</span>
                        <span className="ml-auto text-xs text-[var(--color-secondary)]">{q.score} pts</span>
                      </button>
                    ))}
                  </div>
                )}
                {topic.expanded && topic.questions.length === 0 && (
                  <div className="px-4 py-3 text-sm text-[var(--color-secondary)] border-t border-[var(--color-border)]">
                    Sin preguntas aún
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-6 p-4 bg-gray-50 rounded-xl border border-[var(--color-border)]">
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium">Total del examen</span>
              <span className="font-bold font-display text-lg text-[var(--color-accent)]">10 / 10 puntos</span>
            </div>
          </div>
        </div>

        {/* ===== CENTER COLUMN: EDITOR ===== */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 space-y-6">
          {/* Question header */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center gap-3">
              <h2 className="font-semibold font-display text-lg">Pregunta 1</h2>
              <span className="text-xs text-[var(--color-secondary)] bg-gray-100 px-2 py-0.5 rounded-full">
                Tema 1
              </span>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-[var(--color-secondary)]">Puntaje:</label>
              <select
                value={questionScore}
                onChange={(e) => setQuestionScore(Number(e.target.value))}
                className="appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-xl py-1.5 pl-3 pr-8 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)]"
              >
                {PUNTAJES.map((p) => (
                  <option key={p} value={p}>
                    {p} punto{p > 1 ? "s" : ""}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Question type selector */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {QUESTION_TYPES.map((qt) => {
              const Icon = qt.icon;
              const isSelected = selectedType === qt.id;
              return (
                <button
                  key={qt.id}
                  onClick={() => selectQuestionType(qt.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 transition-all ${
                    isSelected
                      ? "border-[var(--color-accent)] bg-blue-50 text-[var(--color-accent)]"
                      : "border-[var(--color-border)] text-[var(--color-secondary)] hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="text-xs font-medium">{qt.label}</span>
                </button>
              );
            })}
          </div>

          {/* Dynamic editor */}
          {renderQuestionEditor()}

          {/* Delete button */}
          <div className="pt-2">
            <button className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-red-500 border border-red-200 rounded-xl hover:bg-red-50 transition-colors">
              <Trash2 className="w-4 h-4" />
              Eliminar pregunta
            </button>
          </div>
        </div>

        {/* ===== RIGHT COLUMN: CONFIG ===== */}
        <div className="space-y-6 h-fit lg:sticky lg:top-6">
          {/* Configuration */}
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] p-6 space-y-5">
            <h2 className="font-semibold font-display text-lg flex items-center gap-2">
              <Settings className="w-5 h-5 text-[var(--color-secondary)]" />
              Configuración del examen
            </h2>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Nombre del examen</label>
              <input
                type="text"
                value={examName}
                onChange={(e) => setExamName(e.target.value)}
                className="block w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-1.5">Descripción</label>
              <textarea
                value={examDescription}
                onChange={(e) => setExamDescription(e.target.value)}
                placeholder="Descripción del examen..."
                rows={3}
                className="block w-full px-4 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] resize-none"
              />
            </div>

            {/* Colores de temas */}
            <div>
              <label className="block text-sm font-medium text-[var(--color-text)] mb-3">Colores de temas</label>
              <div className="space-y-3">
                {topics.map((topic) => (
                  <div key={topic.id} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full shrink-0" style={{ backgroundColor: topic.color }} />
                      <span className="text-sm text-[var(--color-text)]">Tema {topic.id}</span>
                    </div>
                    <div className="flex gap-1">
                      {TOPIC_COLORS.map((c) => (
                        <button
                          key={c.value}
                          onClick={() => changeTopicColor(topic.id, c.value)}
                          className={`w-5 h-5 rounded-full border-2 transition-all ${
                            topic.color === c.value ? "border-[var(--color-accent)] scale-125" : "border-transparent hover:scale-110"
                          }`}
                          style={{ backgroundColor: c.value }}
                          title={c.label}
                        />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Tip card */}
          <div className="bg-blue-50 rounded-[var(--radius-card)] p-5 border border-blue-100">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center shrink-0">
                <Lightbulb className="w-4 h-4 text-[var(--color-accent)]" />
              </div>
              <div>
                <h3 className="text-sm font-semibold text-[var(--color-accent)] mb-1">Consejo útil</h3>
                <p className="text-xs text-gray-600 leading-relaxed">
                  Podés arrastrar las preguntas para reordenarlas dentro de cada tema. También podés mover temas enteros arrastrando su cabecera.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
