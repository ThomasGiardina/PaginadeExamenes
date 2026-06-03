"use client";

import { 
  Bell, 
  Plus, 
  FileText, 
  Users, 
  ClipboardCheck, 
  CheckCircle, 
  ChevronRight,
  BookOpen,
  Edit,
  UserPlus,
  BarChart3
} from "lucide-react";

// --- MOCK DATA ---
const MOCK_EXAMS = [
  { name: "Parcial 2 - Estructuras de Datos", course: "Algoritmos y Programación", topic: "Turno Mañana", status: "En curso", date: "23 may 2025" },
  { name: "Trabajo Práctico 3", course: "Bases de Datos", topic: "Turno Tarde", status: "Programado", date: "28 may 2025" },
  { name: "Parcial 1 - Redes", course: "Redes y Comunicaciones", topic: "Turno Noche", status: "En curso", date: "05 jun 2025" },
  { name: "Quiz 2 - Álgebra", course: "Álgebra Lineal", topic: "Turno Mañana", status: "Programado", date: "12 jun 2025" },
  { name: "Parcial 1 - Ingeniería de Software", course: "Ingeniería de Software", topic: "Turno Tarde", status: "En curso", date: "18 jun 2025" },
];

const MOCK_ACTIVITY = [
  { description: "Publicaste las notas del Parcial 1 - Matemática Discreta", time: "Hace 15 minutos", icon: Edit, color: "text-[var(--color-accent)]", bg: "bg-blue-50" },
  { description: "Nuevas entregas para corregir (5 alumnos)", time: "Hace 1 hora", icon: ClipboardCheck, color: "text-orange-500", bg: "bg-orange-50" },
  { description: "Se inició el examen Parcial 2 - Estructuras de Datos", time: "Hace 2 horas", icon: FileText, color: "text-emerald-500", bg: "bg-emerald-50" },
  { description: "Se inscribió un nuevo alumno al curso Bases de Datos", time: "Hace 3 horas", icon: UserPlus, color: "text-purple-500", bg: "bg-purple-50" },
  { description: "Actualizaste la plantilla de Examen Final", time: "Hace 5 horas", icon: Edit, color: "text-yellow-500", bg: "bg-yellow-50" },
  { description: "Exportaste métricas de rendimiento del mes", time: "Hace 1 día", icon: BarChart3, color: "text-[var(--color-accent)]", bg: "bg-blue-50" },
];

export default function ProfesorDashboard() {
  return (
    <div className="p-8 lg:p-10 w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold font-display flex items-center gap-2">
            ¡Hola, Juan! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-[var(--color-secondary)] mt-1">
            Resumen general de tu actividad
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

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-accent)] flex items-center justify-center">
              <FileText className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">Exámenes activos</p>
              <h2 className="text-4xl font-bold font-display mt-1">3</h2>
            </div>
          </div>
          <button className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1 hover:underline w-fit">
            Ver todos <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">Alumnos</p>
              <h2 className="text-4xl font-bold font-display mt-1">89</h2>
            </div>
          </div>
          <button className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1 hover:underline w-fit">
            Ver alumnos <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-orange-500 flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">Correcciones pendientes</p>
              <h2 className="text-4xl font-bold font-display mt-1">12</h2>
            </div>
          </div>
          <button className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1 hover:underline w-fit">
            Ir a correcciones <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 4 */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[var(--color-success)] flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">Exámenes finalizados</p>
              <h2 className="text-4xl font-bold font-display mt-1">18</h2>
            </div>
          </div>
          <button className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1 hover:underline w-fit">
            Ver resultados <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_420px] gap-8">
        
        {/* Left Column - Exámenes Activos */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] overflow-hidden">
          <div className="flex items-center justify-between px-6 pt-6 pb-4">
            <h3 className="text-lg font-semibold font-display">Exámenes activos</h3>
            <button className="text-[var(--color-accent)] text-sm font-medium flex items-center hover:underline">
              Ver todos <ChevronRight className="w-4 h-4 ml-1" />
            </button>
          </div>
          
          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-[var(--color-border)]">
                  <th className="text-left px-6 py-3 font-medium text-[var(--color-secondary)]">Nombre del examen</th>
                  <th className="text-left px-6 py-3 font-medium text-[var(--color-secondary)]">Curso</th>
                  <th className="text-left px-6 py-3 font-medium text-[var(--color-secondary)] hidden md:table-cell">Tema / Turno</th>
                  <th className="text-left px-6 py-3 font-medium text-[var(--color-secondary)]">Estado</th>
                  <th className="text-left px-6 py-3 font-medium text-[var(--color-secondary)] hidden lg:table-cell">Fecha</th>
                </tr>
              </thead>
              <tbody>
                {MOCK_EXAMS.map((exam, i) => {
                  const isLast = i === MOCK_EXAMS.length - 1;
                  const statusPill = exam.status === "En curso" 
                    ? "bg-emerald-50 text-[var(--color-success)]" 
                    : "bg-blue-50 text-[var(--color-accent)]";
                  
                  return (
                    <tr key={i} className={`${!isLast ? "border-b border-[var(--color-border)]" : ""} hover:bg-[var(--color-bg)]/40 transition-colors`}>
                      <td className="px-6 py-4">
                        <span className="font-medium text-[var(--color-text)]">{exam.name}</span>
                      </td>
                      <td className="px-6 py-4 text-[var(--color-secondary)]">{exam.course}</td>
                      <td className="px-6 py-4 text-[var(--color-secondary)] hidden md:table-cell">{exam.topic}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusPill}`}>
                          {exam.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[var(--color-secondary)] hidden lg:table-cell">{exam.date}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column - Actividad Reciente */}
        <div className="space-y-6">
          
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] p-6">
            <h3 className="text-lg font-semibold font-display mb-6">Actividad reciente</h3>
            
            <div className="space-y-5">
              {MOCK_ACTIVITY.map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                    <item.icon className="w-4 h-4" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-[var(--color-text)]">{item.description}</p>
                    <p className="text-xs text-[var(--color-secondary)] mt-0.5">{item.time}</p>
                  </div>
                </div>
              ))}
            </div>

            <button className="mt-6 w-full text-center text-[var(--color-accent)] text-sm font-medium py-3 border-t border-[var(--color-border)] hover:underline">
              Ver toda la actividad
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}
