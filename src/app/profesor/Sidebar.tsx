"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  Home, 
  BookOpen, 
  FileText, 
  Users, 
  ClipboardCheck, 
  BarChart3, 
  FilePlus, 
  Settings, 
  Menu, 
  X 
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { name: "Inicio", href: "/profesor", icon: Home },
  { name: "Mis cursos", href: "/profesor/cursos", icon: BookOpen },
  { name: "Exámenes", href: "/profesor/examenes", icon: FileText },
  { name: "Alumnos", href: "/profesor/alumnos", icon: Users },
  { name: "Correcciones", href: "/profesor/correcciones", icon: ClipboardCheck, badge: 5 },
  { name: "Métricas", href: "/profesor/metricas", icon: BarChart3 },
  { name: "Plantillas", href: "/profesor/plantillas", icon: FilePlus },
  { name: "Configuración", href: "/profesor/configuracion", icon: Settings },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
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
                  <span className="bg-orange-100 text-orange-600 text-xs font-semibold px-2 py-0.5 rounded-full">
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Bottom Section - Perfil */}
        <div className="p-4 border-t border-[var(--color-border)]">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl">
            <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold text-[var(--color-text)]">
              JB
            </div>
            <div>
              <p className="text-sm font-medium text-[var(--color-text)]">Juan Bianchi</p>
              <p className="text-xs text-[var(--color-secondary)]">Profesor</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
