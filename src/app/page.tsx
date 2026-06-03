import { 
  ShieldCheck, 
  BarChart3, 
  Clock, 
  Mail, 
  Lock, 
  Eye, 
  Shield
} from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row bg-[var(--color-bg)] text-[var(--color-text)] font-sans">
      
      {/* LEFT COLUMN - BRANDING & INFO */}
      <div 
        className="w-full lg:w-[55%] flex flex-col justify-center p-8 lg:p-12 border-r border-[var(--color-border)] relative overflow-hidden bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/imagenes/fondo.png')" }}
      >
        
        <div className="relative z-10 w-full max-w-md mx-auto flex flex-col gap-12 lg:gap-16">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-[var(--color-accent)] rounded-lg flex items-center justify-center text-white font-bold text-xl rounded-tl-none">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 9l-6 6" />
              </svg>
            </div>
            <span className="text-2xl font-bold tracking-tight">Pruebitas</span>
          </div>

          {/* Hero Text */}
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl lg:text-5xl font-bold leading-tight tracking-tight">
              Evaluaciones <br/>
              más simples, <br/>
              <span className="text-[var(--color-accent)]">resultados reales.</span>
            </h1>
            <p className="text-[var(--color-secondary)] text-lg mt-2">
              La plataforma que te permite rendir exámenes de forma virtual y recibir devoluciones claras y justas.
            </p>
          </div>

          {/* Features */}
          <div className="flex flex-col gap-8">
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="pt-0.5">
                <h3 className="font-semibold text-[17px]">Seguridad</h3>
                <p className="text-[var(--color-secondary)] text-sm mt-1 leading-relaxed">
                  Entorno seguro y monitoreado para garantizar evaluaciones confiables.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div className="pt-0.5">
                <h3 className="font-semibold text-[17px]">Transparencia</h3>
                <p className="text-[var(--color-secondary)] text-sm mt-1 leading-relaxed">
                  Cada corrección incluye criterios claros y retroalimentación detallada.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-blue-50 text-[var(--color-accent)] flex items-center justify-center shrink-0">
                <Clock className="w-6 h-6" />
              </div>
              <div className="pt-0.5">
                <h3 className="font-semibold text-[17px]">Eficiencia</h3>
                <p className="text-[var(--color-secondary)] text-sm mt-1 leading-relaxed">
                  Ahorra tiempo con correcciones asistidas por IA y gestión centralizada.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="absolute z-10 bottom-8 left-8 lg:bottom-12 lg:left-12 xl:left-auto xl:ml-8 flex items-center gap-2 text-[var(--color-secondary)] text-sm">
          <Shield className="w-4 h-4" />
          <span>Plataforma desarrollada para instituciones educativas.</span>
        </div>
      </div>

      {/* RIGHT COLUMN - LOGIN FORM */}
      <div className="w-full lg:w-[45%] flex items-center justify-center p-8 lg:p-12">
        
        {/* Login Card */}
        <div className="bg-[var(--color-surface)] w-full max-w-[480px] rounded-[var(--radius-card)] p-8 lg:p-12 border border-[var(--color-border)] flex flex-col gap-8">
          
          <div className="text-center flex flex-col gap-3">
            <h2 className="text-3xl font-bold tracking-tight">Iniciar sesión</h2>
            <p className="text-[var(--color-secondary)] text-[15px]">
              Ingresá con tus credenciales institucionales <br/> para continuar.
            </p>
          </div>

          <form className="flex flex-col gap-5">
            {/* Correo institucional */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Correo institucional</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-[var(--color-secondary)]" />
                </div>
                <input
                  type="email"
                  className="w-full bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)] rounded-[10px] pl-10 pr-4 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                  placeholder="tu@uade.edu.ar"
                />
              </div>
            </div>

            {/* Contraseña */}
            <div className="flex flex-col gap-2">
              <label className="text-sm font-semibold">Contraseña</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-[var(--color-secondary)]" />
                </div>
                <input
                  type="password"
                  className="w-full bg-[var(--color-bg)] text-[var(--color-text)] border border-[var(--color-border)] rounded-[10px] pl-10 pr-10 py-3 text-[15px] focus:outline-none focus:ring-2 focus:ring-[var(--color-accent)] focus:border-transparent transition-all"
                  placeholder="••••••••"
                />
                <button type="button" className="absolute inset-y-0 right-0 pr-3 flex items-center text-[var(--color-secondary)] hover:text-[var(--color-text)]">
                  <Eye className="h-5 w-5" />
                </button>
              </div>
              <div className="flex justify-end mt-1">
                <a href="#" className="text-[13px] text-[var(--color-accent)] font-medium hover:underline">
                  ¿Olvidaste tu contraseña?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="mt-2 w-full bg-[var(--color-accent)] text-white font-medium text-[17px] rounded-[var(--radius-pill)] py-3 hover:opacity-90 transition-opacity active:scale-[0.98]"
            >
              Iniciar sesión
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center py-2">
            <div className="flex-grow border-t border-[var(--color-border)]"></div>
            <span className="flex-shrink-0 mx-4 text-[var(--color-secondary)] text-sm bg-[var(--color-surface)] px-2">
              o continuar con
            </span>
            <div className="flex-grow border-t border-[var(--color-border)]"></div>
          </div>

          {/* SSO Button */}
          <button
            type="button"
            className="w-full bg-transparent border border-[var(--color-border)] text-[var(--color-text)] font-medium text-[15px] rounded-[10px] py-3 flex items-center justify-center gap-3 hover:bg-[var(--color-bg)] transition-colors"
          >
            <span className="text-[var(--color-accent)] font-bold text-sm tracking-widest">UADE</span>
            Cuenta institucional UADE
          </button>

          {/* Register Link */}
          <div className="text-center mt-2">
            <p className="text-[14px] text-[var(--color-secondary)]">
              ¿No tenés una cuenta?{' '}
              <a href="#" className="text-[var(--color-accent)] font-medium hover:underline">
                Contactá a tu docente.
              </a>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
}
