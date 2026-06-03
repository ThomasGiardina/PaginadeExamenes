"use client";

import { useState, useMemo } from "react";
import {
  Bell,
  Plus,
  Search,
  ChevronDown,
  MoreHorizontal,
  Eye,
  Edit,
  FileText,
  Clock,
  CheckCircle,
  PenTool,
  PlayCircle,
  Archive,
  Copy,
  Trash2
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_EXAMS = [
  {
    id: 1,
    name: "Parcial 2 - Estructuras de Datos",
    topics: 8,
    questions: 25,
    course: "Algoritmos y Programación",
    status: "Activo",
    shifts: 2,
    lastModified: "22 may 2025",
  },
  {
    id: 2,
    name: "Trabajo Práctico 3",
    topics: 4,
    questions: 10,
    course: "Bases de Datos",
    status: "Programado",
    shifts: 1,
    lastModified: "20 may 2025",
  },
  {
    id: 3,
    name: "Parcial 1 - Redes",
    topics: 10,
    questions: 30,
    course: "Redes y Comunicaciones",
    status: "Borrador",
    shifts: 2,
    lastModified: "15 may 2025",
  },
  {
    id: 4,
    name: "Quiz 2 - Álgebra Lineal",
    topics: 3,
    questions: 8,
    course: "Álgebra Lineal",
    status: "Activo",
    shifts: 1,
    lastModified: "18 may 2025",
  },
  {
    id: 5,
    name: "Parcial 1 - Matemática Discreta",
    topics: 6,
    questions: 20,
    course: "Matemática",
    status: "Finalizado",
    shifts: 2,
    lastModified: "12 may 2025",
  },
  {
    id: 6,
    name: "Trabajo Práctico 2",
    topics: 5,
    questions: 15,
    course: "Ingeniería de Software",
    status: "Finalizado",
    shifts: 1,
    lastModified: "05 may 2025",
  },
  {
    id: 7,
    name: "Examen Final - Programación",
    topics: 12,
    questions: 40,
    course: "Algoritmos y Programación",
    status: "Borrador",
    shifts: 3,
    lastModified: "28 abr 2025",
  },
  {
    id: 8,
    name: "Parcial 1 - Base de Datos Avanzadas",
    topics: 7,
    questions: 22,
    course: "Bases de Datos",
    status: "Programado",
    shifts: 2,
    lastModified: "25 abr 2025",
  },
];

const TABS = ["Todos", "Borradores", "Programados", "Activos", "Finalizados"];

const STATUS_COLORS: Record<string, string> = {
  Borrador: "bg-gray-100 text-gray-600",
  Programado: "bg-blue-50 text-[var(--color-accent)]",
  Activo: "bg-emerald-50 text-[var(--color-success)]",
  Finalizado: "bg-purple-50 text-purple-500",
};

export default function ProfesorExamenes() {
  const [activeTab, setActiveTab] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("Todos los cursos");
  const [statusFilter, setStatusFilter] = useState("Todos los estados");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);

  const uniqueCourses = ["Todos los cursos", ...Array.from(new Set(MOCK_EXAMS.map(e => e.course)))];

  const filteredExams = useMemo(() => {
    return MOCK_EXAMS.filter((exam) => {
      if (activeTab !== "Todos" && exam.status !== activeTab) return false;

      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!exam.name.toLowerCase().includes(q) && !exam.course.toLowerCase().includes(q)) return false;
      }

      if (courseFilter !== "Todos los cursos" && exam.course !== courseFilter) return false;

      if (statusFilter !== "Todos los estados" && exam.status !== statusFilter) return false;

      return true;
    });
  }, [activeTab, searchQuery, courseFilter, statusFilter]);

  return (
    <div className="p-8 lg:p-10 w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold font-display">Exámenes</h1>
          <p className="text-[var(--color-secondary)] mt-1">
            Crea y gestiona tus exámenes
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button className="inline-flex items-center gap-2 px-5 py-2.5 bg-[var(--color-accent)] text-white text-sm font-medium rounded-xl hover:bg-blue-600 transition-colors">
            <Plus className="w-4 h-4" />
            Crear examen
          </button>
          <button className="w-10 h-10 rounded-full border border-[var(--color-border)] flex items-center justify-center text-[var(--color-secondary)] hover:bg-[var(--color-surface)] bg-transparent transition-colors">
            <Bell className="w-5 h-5" />
          </button>
          <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-[var(--color-text)]">
            JB
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="border-b border-[var(--color-border)] flex gap-8 overflow-x-auto no-scrollbar">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-4 px-1 text-sm font-medium transition-colors relative whitespace-nowrap ${
              activeTab === tab
                ? "text-[var(--color-accent)]"
                : "text-[var(--color-secondary)] hover:text-[var(--color-text)]"
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[var(--color-accent)] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="w-4 h-4 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Buscar exámenes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="block w-full pl-10 pr-3 py-2.5 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)]"
          />
        </div>

        <div className="flex gap-4">
          <div className="relative">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] min-w-[170px]"
            >
              {uniqueCourses.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>

          <div className="relative hidden sm:block">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] min-w-[170px]"
            >
              <option>Todos los estados</option>
              <option>Borrador</option>
              <option>Programado</option>
              <option>Activo</option>
              <option>Finalizado</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
              <ChevronDown className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-[var(--color-border)] bg-[var(--color-bg)]/30">
                <th className="text-left px-6 py-4 font-medium text-[var(--color-secondary)]">Nombre</th>
                <th className="text-left px-6 py-4 font-medium text-[var(--color-secondary)] hidden md:table-cell">Curso</th>
                <th className="text-left px-6 py-4 font-medium text-[var(--color-secondary)]">Estado</th>
                <th className="text-left px-6 py-4 font-medium text-[var(--color-secondary)] hidden lg:table-cell">Turnos</th>
                <th className="text-left px-6 py-4 font-medium text-[var(--color-secondary)] hidden lg:table-cell">Última modif.</th>
                <th className="text-right px-6 py-4 font-medium text-[var(--color-secondary)]">Acciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredExams.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-12 text-[var(--color-secondary)]">
                    No se encontraron exámenes con estos filtros.
                  </td>
                </tr>
              ) : (
                filteredExams.map((exam) => {
                  const isLast = exam.id === filteredExams[filteredExams.length - 1].id;
                  const statusColor = STATUS_COLORS[exam.status] || "bg-gray-100 text-gray-600";

                  return (
                    <tr
                      key={exam.id}
                      className={`${!isLast ? "border-b border-[var(--color-border)]" : ""} hover:bg-[var(--color-bg)]/40 transition-colors relative`}
                    >
                      <td className="px-6 py-4">
                        <div>
                          <span className="font-medium text-[var(--color-text)]">{exam.name}</span>
                          <div className="text-xs text-[var(--color-secondary)] mt-0.5">
                            {exam.topics} temas · {exam.questions} preguntas
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-[var(--color-secondary)] hidden md:table-cell">
                        {exam.course}
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusColor}`}>
                          {exam.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--color-secondary)] hidden lg:table-cell">
                        {exam.shifts} turno{exam.shifts > 1 ? "s" : ""}
                      </td>
                      <td className="px-6 py-4 text-[var(--color-secondary)] hidden lg:table-cell">
                        {exam.lastModified}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button className="p-2 text-[var(--color-secondary)] hover:text-[var(--color-accent)] hover:bg-blue-50 rounded-lg transition-colors">
                            <Eye className="w-4 h-4" />
                          </button>
                          <button className="p-2 text-[var(--color-secondary)] hover:text-[var(--color-accent)] hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <div className="relative">
                            <button
                              onClick={() => setOpenMenuId(openMenuId === exam.id ? null : exam.id)}
                              className="p-2 text-[var(--color-secondary)] hover:text-[var(--color-text)] hover:bg-gray-100 rounded-lg transition-colors"
                            >
                              <MoreHorizontal className="w-4 h-4" />
                            </button>
                            {openMenuId === exam.id && (
                              <>
                                <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                                <div className="absolute right-0 top-full mt-1 w-48 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-lg z-20 py-2 overflow-hidden">
                                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg)]/50 transition-colors text-left">
                                    <Copy className="w-4 h-4 text-[var(--color-secondary)]" />
                                    Duplicar
                                  </button>
                                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-[var(--color-text)] hover:bg-[var(--color-bg)]/50 transition-colors text-left">
                                    <Archive className="w-4 h-4 text-[var(--color-secondary)]" />
                                    Archivar
                                  </button>
                                  <div className="border-t border-[var(--color-border)] my-1" />
                                  <button className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-500 hover:bg-red-50 transition-colors text-left">
                                    <Trash2 className="w-4 h-4" />
                                    Eliminar
                                  </button>
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
