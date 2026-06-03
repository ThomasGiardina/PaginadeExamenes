"use client";

import { useState, useMemo } from "react";
import { 
  Bell, 
  Search, 
  ChevronDown, 
  Calendar as CalendarIcon, 
  Clock, 
  Star, 
  FileText, 
  CheckSquare,
  PenTool,
  PlayCircle,
  HelpCircle,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_EXAMS = [
  {
    id: 1,
    title: "Parcial 2 - Estructuras de Datos",
    course: "Algoritmos y Programación",
    type: "Teórico",
    date: "23 may 2025",
    time: "10:00 AM",
    duration: "2 hs",
    points: 10,
    status: "Próximo",
    statusText: "En 2 días",
    iconColor: "text-blue-500",
    iconBg: "bg-blue-50",
    Icon: FileText,
  },
  {
    id: 2,
    title: "Trabajo Práctico 3",
    course: "Bases de Datos",
    type: "Práctico",
    date: "28 may 2025",
    time: "11:59 PM",
    duration: "1 hs",
    points: 10,
    status: "Próximo",
    statusText: "En 7 días",
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    Icon: PenTool,
  },
  {
    id: 3,
    title: "Parcial 1 - Redes",
    course: "Redes y Comunicaciones",
    type: "Teórico",
    date: "05 jun 2025",
    time: "09:00 AM",
    duration: "2 hs",
    points: 10,
    status: "Pendiente",
    statusText: "En 15 días",
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    Icon: PlayCircle,
  },
  {
    id: 4,
    title: "Parcial 1 - Matemática Discreta",
    course: "Matemática",
    type: "Teórico",
    date: "12 may 2025",
    time: "09:00 AM",
    duration: "2 hs",
    points: 10,
    status: "Completado",
    statusText: "Calificación: 8.5 / 10",
    score: 8.5,
    iconColor: "text-emerald-500",
    iconBg: "bg-emerald-50",
    Icon: CheckSquare,
  },
  {
    id: 5,
    title: "Trabajo Práctico 2",
    course: "Ingeniería de Software",
    type: "Práctico",
    date: "05 may 2025",
    time: "11:59 PM",
    duration: "1 hs",
    points: 10,
    status: "Completado",
    statusText: "Calificación: 7.0 / 10",
    score: 7.0,
    iconColor: "text-orange-500",
    iconBg: "bg-orange-50",
    Icon: CheckSquare,
  },
  {
    id: 6,
    title: "Quiz - Introducción a la Programación",
    course: "Algoritmos y Programación",
    type: "Teórico",
    date: "28 abr 2025",
    time: "08:00 AM",
    duration: "30 min",
    points: 5,
    status: "Completado",
    statusText: "Calificación: 9.0 / 10",
    score: 9.0,
    iconColor: "text-purple-500",
    iconBg: "bg-purple-50",
    Icon: CheckSquare,
  }
];

const TABS = ["Todos", "Próximos", "En curso", "Completados", "Pendientes"];

export default function MisExamenes() {
  // --- STATES ---
  const [activeTab, setActiveTab] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [courseFilter, setCourseFilter] = useState("Todos los cursos");
  const [statusFilter, setStatusFilter] = useState("Todos los estados");

  // --- FILTERING LOGIC ---
  const filteredExams = useMemo(() => {
    return MOCK_EXAMS.filter((exam) => {
      // 1. Tab Filter
      if (activeTab !== "Todos") {
        // Handle plural/singular edge cases roughly
        const tabLower = activeTab.toLowerCase();
        const statusLower = exam.status.toLowerCase();
        if (!tabLower.includes(statusLower) && !statusLower.includes(tabLower.replace('s',''))) {
            return false;
        }
      }

      // 2. Search Filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        if (
          !exam.title.toLowerCase().includes(query) &&
          !exam.course.toLowerCase().includes(query)
        ) {
          return false;
        }
      }

      // 3. Course Filter (Dropdown)
      if (courseFilter !== "Todos los cursos" && exam.course !== courseFilter) {
        return false;
      }

      // 4. Status Filter (Dropdown)
      if (statusFilter !== "Todos los estados" && exam.status !== statusFilter) {
        return false;
      }

      return true;
    });
  }, [activeTab, searchQuery, courseFilter, statusFilter]);

  // Unique courses for dropdown
  const uniqueCourses = ["Todos los cursos", ...Array.from(new Set(MOCK_EXAMS.map(e => e.course)))];
  const uniqueStatuses = ["Todos los estados", "Próximo", "Pendiente", "Completado"];

  return (
    <div className="p-8 lg:p-10 w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold font-display">Mis exámenes</h1>
          <p className="text-[var(--color-secondary)] mt-1">
            Acá podés ver todos tus exámenes, su estado y acceder a ellos.
          </p>
        </div>
        
        <div className="flex items-center gap-4 hidden sm:flex">
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

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
        
        {/* Left Column (Filters & List) */}
        <div className="space-y-6">
          
          {/* Filters Bar */}
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
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
            
            {/* Selects */}
            <div className="flex gap-4">
              <div className="relative">
                <select 
                  value={courseFilter}
                  onChange={(e) => setCourseFilter(e.target.value)}
                  className="appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] min-w-[160px]"
                >
                  {uniqueCourses.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <div className="relative hidden sm:block">
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] min-w-[160px]"
                >
                  {uniqueStatuses.map(s => <option key={s} value={s}>{s}</option>)}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>

              <div className="relative hidden lg:block">
                <select className="appearance-none bg-[var(--color-surface)] border border-[var(--color-border)] text-sm rounded-xl py-2.5 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-[var(--color-accent)] focus:border-[var(--color-accent)] min-w-[140px]">
                  <option>Más recientes</option>
                  <option>Más antiguos</option>
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-gray-400">
                  <ChevronDown className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>

          {/* List */}
          <div className="space-y-4">
            {filteredExams.length === 0 ? (
              <div className="text-center py-12 bg-[var(--color-surface)] rounded-2xl border border-[var(--color-border)]">
                <p className="text-[var(--color-secondary)]">No se encontraron exámenes con estos filtros.</p>
              </div>
            ) : (
              filteredExams.map((exam) => {
                
                // Determine pill classes based on status
                let statusPillClasses = "bg-gray-100 text-gray-600";
                if (exam.status === "Próximo") statusPillClasses = "bg-emerald-50 text-[var(--color-success)]";
                if (exam.status === "Completado") statusPillClasses = "bg-emerald-50 text-[var(--color-success)]";

                // For completely accurate matching to the design, completed scores have specific green text logic
                const isCompleted = exam.status === "Completado";

                return (
                  <div key={exam.id} className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] flex flex-col md:flex-row md:items-center gap-6 shadow-none">
                    
                    {/* Left: Icon & Info */}
                    <div className="flex items-start gap-4 flex-1">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${exam.iconBg} ${exam.iconColor}`}>
                        <exam.Icon className="w-6 h-6" />
                      </div>
                      <div className="space-y-1 w-full">
                        <h3 className="font-semibold text-base">{exam.title}</h3>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-sm text-[var(--color-secondary)]">{exam.course}</span>
                          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">{exam.type}</span>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs text-[var(--color-secondary)] pt-2 flex-wrap">
                          <div className="flex items-center gap-1">
                            <CalendarIcon className="w-3.5 h-3.5" /> {exam.date} • {exam.time}
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" /> Duración: {exam.duration}
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5" /> Total: {exam.points} puntos
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right: Status & Actions */}
                    <div className="flex md:flex-col items-center md:items-end justify-between md:justify-center gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-[var(--color-border)] shrink-0">
                      <div className="text-left md:text-right">
                        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-1 ${statusPillClasses}`}>
                          {exam.status}
                        </div>
                        <div className={`text-sm ${isCompleted && exam.score && exam.score >= 8 ? "text-[var(--color-success)] font-medium" : isCompleted && exam.score ? "text-[var(--color-warning)] font-medium" : "text-[var(--color-secondary)]"}`}>
                          {exam.statusText}
                        </div>
                      </div>
                      <button className="px-4 py-2 border border-[var(--color-accent)] text-[var(--color-accent)] hover:bg-blue-50 text-sm font-medium rounded-xl transition-colors">
                        {isCompleted ? "Ver resultado" : "Ver detalles"}
                      </button>
                    </div>

                  </div>
                );
              })
            )}
          </div>

        </div>

        {/* Right Column (Widgets) */}
        <div className="space-y-6">
          
          {/* Resumen Widget */}
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)]">
            <h3 className="font-semibold font-display mb-6">Resumen</h3>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[var(--color-accent)] flex items-center justify-center">
                    <FileText className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-[var(--color-secondary)]">Total de exámenes</span>
                </div>
                <span className="font-semibold font-display">12</span>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-emerald-50 text-[var(--color-success)] flex items-center justify-center">
                    <CheckSquare className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-[var(--color-secondary)]">Completados</span>
                </div>
                <span className="font-semibold font-display">8</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-orange-50 text-[var(--color-warning)] flex items-center justify-center">
                    <Clock className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-[var(--color-secondary)]">Pendientes / Próximos</span>
                </div>
                <span className="font-semibold font-display">4</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-50 text-purple-500 flex items-center justify-center">
                    <Star className="w-4 h-4" />
                  </div>
                  <span className="text-sm text-[var(--color-secondary)]">Promedio general</span>
                </div>
                <span className="font-semibold font-display">8.4 <span className="text-xs text-[var(--color-secondary)] font-normal">/ 10</span></span>
              </div>
            </div>
          </div>

          {/* Calendario Widget */}
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)]">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold font-display text-sm">Próximos exámenes</h3>
              <button className="text-[var(--color-accent)] text-xs font-medium hover:underline">
                Ver calendario
              </button>
            </div>
            
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium text-sm">Mayo 2025</span>
              <div className="flex gap-2 text-[var(--color-secondary)]">
                <ChevronLeft className="w-4 h-4 cursor-pointer hover:text-[var(--color-text)]" />
                <ChevronRight className="w-4 h-4 cursor-pointer hover:text-[var(--color-text)]" />
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-[10px] text-[var(--color-secondary)] mb-2 font-medium">
              <div>LUN</div><div>MAR</div><div>MIÉ</div><div>JUE</div><div>VIE</div><div>SÁB</div><div>DOM</div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-xs">
              {[28,29,30,1,2,3,4, 5,6,7,8,9,10,11, 12,13,14,15,16,17,18, 19,20,21,22,23,24,25, 26,27,28,29,30,31,1].map((day, i) => {
                const isSelected = i === 25; // day 23
                const hasExam = i === 7; // day 5
                const hasDelivery = i === 30; // day 28

                return (
                  <div key={i} className="aspect-square flex flex-col items-center justify-center relative py-1">
                    <span className={`w-6 h-6 flex items-center justify-center rounded-full ${isSelected ? 'bg-[var(--color-accent)] text-white font-medium' : i < 3 || i > 33 ? 'text-gray-300' : 'text-[var(--color-text)]'}`}>
                      {day}
                    </span>
                    {hasExam && <div className="w-1 h-1 bg-[var(--color-accent)] rounded-full absolute bottom-1"></div>}
                    {hasDelivery && <div className="w-1 h-1 bg-[var(--color-success)] rounded-full absolute bottom-1"></div>}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-3 mt-4 text-[10px] text-[var(--color-secondary)]">
              <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-accent)]"></div> Examen</div>
              <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-[var(--color-success)]"></div> Entrega</div>
              <div className="flex items-center gap-1"><div className="w-1.5 h-1.5 rounded-full bg-purple-500"></div> Evento</div>
            </div>
          </div>

          {/* Ayuda Widget */}
          <div className="bg-[#f0f7ff] rounded-[var(--radius-card)] p-6 border border-blue-100 flex flex-col items-start">
             <div className="flex items-center gap-2 mb-2 text-[var(--color-accent)] font-medium">
                <HelpCircle className="w-5 h-5" />
                <span>¿Necesitás ayuda?</span>
             </div>
             <p className="text-sm text-gray-600 mb-4">
                Revisá las preguntas frecuentes o contactá a tu docente.
             </p>
             <button className="bg-[var(--color-surface)] text-[var(--color-text)] text-sm font-medium px-4 py-2 rounded-xl border border-[var(--color-border)] hover:bg-gray-50 transition-colors w-full text-left">
                Ir a ayuda
             </button>
          </div>

        </div>
      </div>
    </div>
  );
}