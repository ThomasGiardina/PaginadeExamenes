"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  FileText, 
  BookOpen, 
  BarChart2, 
  Calendar, 
  MessageSquare, 
  Bell, 
  HelpCircle,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Inicio", href: "/alumno", icon: Home },
  { name: "Mis exámenes", href: "/alumno/examenes", icon: FileText },
  { name: "Mis cursos", href: "/alumno/cursos", icon: BookOpen },
  { name: "Resultados", href: "/alumno/resultados", icon: BarChart2 },
  { name: "Calendario", href: "/alumno/calendario", icon: Calendar },
  { name: "Mensajes", href: "/alumno/mensajes", icon: MessageSquare, badge: 2 },
  { name: "Notificaciones", href: "/alumno/notificaciones", icon: Bell, badge: 3 },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button (visible only on mobile, top left) */}
      <button 
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="w-5 h-5 text-[var(--color-text)]" /> : <Menu className="w-5 h-5 text-[var(--color-text)]" />}
      </button>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-[var(--color-surface)] border-r border-[var(--color-border)] transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static flex flex-col
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
      `}>
        {/* Logo */}
        <div className="h-20 flex items-center px-8">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">P</span>
            </div>
            <span className="font-display font-semibold text-xl text-[var(--color-text)]">Pruebitas</span>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-colors ${
                  isActive 
                    ? "bg-[var(--color-accent)]/10 text-[var(--color-accent)] font-medium" 
                    : "text-[var(--color-secondary)] hover:bg-[var(--color-bg)]/50 hover:text-[var(--color-text)]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon className={`w-5 h-5 ${isActive ? "text-[var(--color-accent)]" : "text-[var(--color-secondary)]"}`} />
                  <span>{item.name}</span>
                </div>
                {item.badge && (
                  <span className="bg-blue-100 text-[var(--color-accent)] text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section */}
        <div className="p-4 border-t border-[var(--color-border)] space-y-2">
          <Link href="/alumno/ayuda" className="flex items-center gap-3 px-4 py-3 rounded-xl text-[var(--color-secondary)] hover:bg-[var(--color-bg)]/50 hover:text-[var(--color-text)] transition-colors">
            <HelpCircle className="w-5 h-5" />
            <span>Ayuda</span>
          </Link>
          
          <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl hover:bg-[var(--color-bg)]/50 transition-colors text-left">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-[var(--color-text)]">
                JB
              </div>
              <div>
                <p className="text-sm font-medium text-[var(--color-text)]">Juan Bianchi</p>
                <p className="text-xs text-[var(--color-secondary)]">Estudiante</p>
              </div>
            </div>
            {/* Pequeño icono para dropdown si hiciese falta */}
            <svg className="w-4 h-4 text-[var(--color-secondary)]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </aside>
    </>
  );
}
