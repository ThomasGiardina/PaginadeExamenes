"use client";

import { Bell, ChevronRight, ChevronLeft, Calendar as CalendarIcon, Clock, CheckCircle2, Star, BookOpen } from "lucide-react";
import { LineChart, Line, ResponsiveContainer } from "recharts";

const dataProgreso = [
  { name: '1', value: 4 },
  { name: '2', value: 3 },
  { name: '3', value: 5 },
  { name: '4', value: 6 },
  { name: '5', value: 5 },
  { name: '6', value: 8 },
  { name: '7', value: 7 },
  { name: '8', value: 9 },
  { name: '9', value: 8.4 },
];

export default function AlumnoDashboard() {
  return (
    <div className="p-8 lg:p-10 w-full max-w-[1600px] mx-auto space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-12 lg:mt-0">
        <div>
          <h1 className="text-3xl font-bold font-display flex items-center gap-2">
            ¡Hola, Juan! <span className="text-2xl">👋</span>
          </h1>
          <p className="text-[var(--color-secondary)] mt-1">
            Estos son tus exámenes y actividades.
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

      {/* 4 Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Card 1 */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] shadow-none flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[var(--color-accent)] flex items-center justify-center">
              <FileTextIcon className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">Próximos exámenes</p>
              <h2 className="text-4xl font-bold font-display mt-1">3</h2>
            </div>
          </div>
          <button className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1 hover:underline w-fit">
            Ver calendario <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 2 */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] shadow-none flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-[var(--color-success)] flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">Exámenes completados</p>
              <h2 className="text-4xl font-bold font-display mt-1">8</h2>
            </div>
          </div>
          <button className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1 hover:underline w-fit">
            Ver resultados <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 3 */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] shadow-none flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-purple-50 text-purple-500 flex items-center justify-center">
              <Star className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">Promedio general</p>
              <h2 className="text-4xl font-bold font-display mt-1">8.4 <span className="text-xl text-[var(--color-secondary)] font-medium">/ 10</span></h2>
            </div>
          </div>
          <button className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1 hover:underline w-fit">
            Ver mis métricas <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Card 4 */}
        <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] shadow-none flex flex-col justify-between">
          <div className="flex items-start gap-4 mb-4">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[var(--color-warning)] flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-secondary)]">Horas estudiadas</p>
              <h2 className="text-4xl font-bold font-display mt-1">24 <span className="text-xl text-[var(--color-secondary)] font-medium">h</span></h2>
            </div>
          </div>
          <button className="text-[var(--color-accent)] text-sm font-medium flex items-center gap-1 hover:underline w-fit">
            Ver estadísticas <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-[1fr_400px] gap-8">
        
        {/* Left Column (Lists) */}
        <div className="space-y-8">
          
          {/* Próximos Exámenes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold font-display">Próximos exámenes</h3>
              <button className="text-[var(--color-accent)] text-sm font-medium flex items-center hover:underline">
                Ver todos <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] overflow-hidden">
              
              {/* Item 1 */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 text-[var(--color-accent)] flex items-center justify-center shrink-0 mt-1">
                    <FileTextIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Parcial 2 - Estructuras de Datos</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-[var(--color-secondary)]">Algoritmos y Programación</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Teórico</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:ml-auto">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm font-medium">
                      <CalendarIcon className="w-4 h-4 text-[var(--color-secondary)]" /> 23 may 2025
                    </div>
                    <div className="text-sm text-[var(--color-secondary)] mt-0.5">10:00 AM</div>
                  </div>
                  <div className="bg-blue-50 text-[var(--color-accent)] px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                    En 2 días
                  </div>
                </div>
              </div>

              {/* Item 2 */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[var(--color-border)]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[var(--color-success)] flex items-center justify-center shrink-0 mt-1">
                    <FileTextIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Trabajo Práctico 3</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-[var(--color-secondary)]">Bases de Datos</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Práctico</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:ml-auto">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm font-medium">
                      <CalendarIcon className="w-4 h-4 text-[var(--color-secondary)]" /> 28 may 2025
                    </div>
                    <div className="text-sm text-[var(--color-secondary)] mt-0.5">11:59 PM</div>
                  </div>
                  <div className="bg-emerald-50 text-[var(--color-success)] px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                    En 7 días
                  </div>
                </div>
              </div>

              {/* Item 3 */}
              <div className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0 mt-1">
                    <FileTextIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium">Parcial 1 - Redes</h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-sm text-[var(--color-secondary)]">Redes y Comunicaciones</span>
                      <span className="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">Teórico</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-6 sm:ml-auto">
                  <div className="text-right">
                    <div className="flex items-center justify-end gap-1 text-sm font-medium">
                      <CalendarIcon className="w-4 h-4 text-[var(--color-secondary)]" /> 05 jun 2025
                    </div>
                    <div className="text-sm text-[var(--color-secondary)] mt-0.5">09:00 AM</div>
                  </div>
                  <div className="bg-gray-100 text-gray-600 px-3 py-1 rounded-full text-sm font-medium whitespace-nowrap">
                    En 15 días
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Resultados recientes */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold font-display">Resultados recientes</h3>
              <button className="text-[var(--color-accent)] text-sm font-medium flex items-center hover:underline">
                Ver todos <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] border border-[var(--color-border)] overflow-hidden">
              
              {/* Result 1 */}
              <div className="p-5 flex items-center justify-between gap-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-emerald-50 text-[var(--color-success)] flex items-center justify-center shrink-0">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Parcial 1 - Matemática Discreta</h4>
                    <p className="text-sm text-[var(--color-secondary)]">Matemática</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="bg-emerald-50 text-[var(--color-success)] px-3 py-1 rounded-full text-sm font-semibold">
                    8.5 / 10
                  </div>
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-medium text-[var(--color-secondary)]">Completado</div>
                    <div className="text-sm text-[var(--color-secondary)]">12 may 2025</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Result 2 */}
              <div className="p-5 flex items-center justify-between gap-4 border-b border-[var(--color-border)]">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-orange-50 text-[var(--color-warning)] flex items-center justify-center shrink-0">
                    <FileTextIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Trabajo Práctico 2</h4>
                    <p className="text-sm text-[var(--color-secondary)]">Ingeniería de Software</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="bg-orange-50 text-[var(--color-warning)] px-3 py-1 rounded-full text-sm font-semibold">
                    7.0 / 10
                  </div>
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-medium text-[var(--color-secondary)]">Completado</div>
                    <div className="text-sm text-[var(--color-secondary)]">05 may 2025</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

              {/* Result 3 */}
              <div className="p-5 flex items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center shrink-0">
                    <FileTextIcon className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-medium text-sm sm:text-base">Quiz - Introducción a la Programación</h4>
                    <p className="text-sm text-[var(--color-secondary)]">Algoritmos y Programación</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:gap-8">
                  <div className="bg-emerald-50 text-[var(--color-success)] px-3 py-1 rounded-full text-sm font-semibold">
                    9.0 / 10
                  </div>
                  <div className="hidden sm:block text-right">
                    <div className="text-sm font-medium text-[var(--color-secondary)]">Completado</div>
                    <div className="text-sm text-[var(--color-secondary)]">28 abr 2025</div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
              </div>

            </div>
          </section>

        </div>

        {/* Right Column (Widgets) */}
        <div className="space-y-8">
          
          {/* Calendario Widget */}
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)]">
            <h3 className="font-semibold font-display mb-4 text-lg">Calendario</h3>
            
            <div className="flex items-center justify-between mb-4">
              <span className="font-medium">Mayo 2025</span>
              <div className="flex gap-2 text-[var(--color-secondary)]">
                <ChevronLeft className="w-5 h-5 cursor-pointer hover:text-[var(--color-text)]" />
                <ChevronRight className="w-5 h-5 cursor-pointer hover:text-[var(--color-text)]" />
              </div>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--color-secondary)] mb-2 font-medium">
              <div>LUN</div><div>MAR</div><div>MIÉ</div><div>JUE</div><div>VIE</div><div>SÁB</div><div>DOM</div>
            </div>
            
            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {/* Dummy days just to match design shape */}
              {[28,29,30,1,2,3,4, 5,6,7,8,9,10,11, 12,13,14,15,16,17,18, 19,20,21,22,23,24,25, 26,27,28,29,30,31,1].map((day, i) => {
                const isSelected = i === 25; // day 23
                const hasExam = i === 7; // day 5
                const hasDelivery = i === 30; // day 28

                return (
                  <div key={i} className="aspect-square flex flex-col items-center justify-center relative py-1">
                    <span className={`w-8 h-8 flex items-center justify-center rounded-full ${isSelected ? 'bg-[var(--color-accent)] text-white font-medium' : i < 3 || i > 33 ? 'text-gray-300' : 'text-[var(--color-text)]'}`}>
                      {day}
                    </span>
                    {hasExam && <div className="w-1.5 h-1.5 bg-[var(--color-accent)] rounded-full absolute bottom-1"></div>}
                    {hasDelivery && <div className="w-1.5 h-1.5 bg-[var(--color-success)] rounded-full absolute bottom-1"></div>}
                  </div>
                )
              })}
            </div>

            <div className="flex items-center gap-4 mt-6 text-xs text-[var(--color-secondary)]">
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--color-accent)]"></div> Examen</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-[var(--color-success)]"></div> Entrega</div>
              <div className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-purple-500"></div> Evento</div>
            </div>
          </div>

          {/* Mi progreso Widget */}
          <div className="bg-[var(--color-surface)] rounded-[var(--radius-card)] p-6 border border-[var(--color-border)] flex flex-col">
            <div className="flex items-center justify-between mb-6">
              <h3 className="font-semibold font-display text-lg">Mi progreso</h3>
              <button className="text-[var(--color-accent)] text-sm font-medium flex items-center hover:underline">
                Ver métricas <ChevronRight className="w-4 h-4 ml-1" />
              </button>
            </div>
            
            <div className="flex items-end justify-between mb-4">
              <div>
                <p className="text-sm text-[var(--color-secondary)] mb-1">Promedio general</p>
                <div className="text-3xl font-bold font-display text-[var(--color-accent)]">
                  8.4 <span className="text-lg text-[var(--color-secondary)] font-medium">/ 10</span>
                </div>
              </div>
              <div className="w-32 h-16">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={dataProgreso}>
                    <Line type="monotone" dataKey="value" stroke="var(--color-accent)" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="border border-[var(--color-border)] rounded-2xl p-4">
                <p className="text-sm text-[var(--color-secondary)] mb-2">Asignaturas activas</p>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold font-display">4</span>
                  <BookOpen className="w-5 h-5 text-[var(--color-secondary)]" />
                </div>
              </div>
              <div className="border border-[var(--color-border)] rounded-2xl p-4">
                <p className="text-sm text-[var(--color-secondary)] mb-2">Actividades pendientes</p>
                <div className="flex justify-between items-end">
                  <span className="text-2xl font-bold font-display">2</span>
                  <Clock className="w-5 h-5 text-[var(--color-warning)]" />
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

// Temporary icon component since FileText is already imported from lucide-react but we want to use it twice or maybe it clashes.
function FileTextIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>
  );
}
