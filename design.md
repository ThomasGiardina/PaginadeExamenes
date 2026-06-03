# Examia — Design System

> *Clarity under pressure — the interface disappears so the exam remains.*

---

## 🎯 Design Philosophy

Examia adopta un lenguaje visual inspirado en Apple (Refero), pero adaptado a una aplicación productiva de evaluación.

### Principios

* **Minimalismo funcional:** eliminar distracciones durante el examen.
* **Jerarquía tipográfica fuerte:** priorizar claridad en preguntas y respuestas.
* **Un solo color de acción:** reducir ambigüedad en decisiones críticas.
* **Feedback constante:** cada acción del usuario debe tener respuesta visual inmediata.
* **Consistencia:** misma lógica visual para alumno y docente.

---

## 🎨 Color System

### Base Colors

| Name           | Value     | Token               | Uso              |
| -------------- | --------- | ------------------- | ---------------- |
| Background     | `#f5f5f7` | `--color-bg`        | Fondo general    |
| Surface        | `#ffffff` | `--color-surface`   | Cards, inputs    |
| Text Primary   | `#1d1d1f` | `--color-text`      | Texto principal  |
| Text Secondary | `#707070` | `--color-secondary` | Texto secundario |
| Border         | `#e8e8ed` | `--color-border`    | Divisores        |

### Accent

| Name        | Value     | Token            | Uso             |
| ----------- | --------- | ---------------- | --------------- |
| Primary CTA | `#0071e3` | `--color-accent` | Botón principal |

👉 **Regla clave:** este color SOLO se usa para acciones importantes.

---

### Semantic Colors (Adaptación necesaria)

| Name    | Value     | Uso                       |
| ------- | --------- | ------------------------- |
| Success | `#28c76f` | Envío exitoso             |
| Warning | `#ff9f43` | Tiempo restante           |
| Danger  | `#ea5455` | Error / intento de salida |
| Info    | `#00cfe8` | Feedback IA               |

---

## 🔤 Typography

### Font Families

```css
--font-display: 'SF Pro Display', Inter, system-ui;
--font-text: 'SF Pro Text', Inter, system-ui;
```

---

### Type Scale

| Role       | Size    | Uso        |
| ---------- | ------- | ---------- |
| Display    | 80px    | Landing    |
| Heading    | 40px    | Títulos    |
| Subheading | 24px    | Preguntas  |
| Body       | 17px    | Respuestas |
| Caption    | 12–14px | Metadata   |

---

### Rules

* Headlines: weight 700
* Body: weight 400
* Tracking negativo en títulos
* No centrar párrafos largos

---

## 📐 Layout

### App Structure

```md
Sidebar (left)
Topbar (fixed)
Main Content (dynamic)
```

---

### Sidebar

* Cursos
* Exámenes
* Dashboard

---

### Topbar

* Usuario
* Estado
* Timer

---

### Main Content

* Examen
* Corrección
* Métricas

---

### Spacing

* Base: 4px
* Card padding: 28px
* Section gap: 40–80px

---

### Border Radius

| Element | Value |
| ------- | ----- |
| Cards   | 28px  |
| Buttons | 999px |

---

## 🧩 Components

---

### Primary Button

**Uso:** acción principal

```md
background: #0071e3
color: #ffffff
border-radius: 999px
padding: 8px 16px
```

Ejemplos:

* Iniciar examen
* Enviar examen
* Publicar nota

👉 Solo uno por pantalla

---

### Ghost Button

```md
background: transparent
color: #1d1d1f
```

Uso:

* Acciones secundarias

---

### Question Card

```md
background: #ffffff
border-radius: 28px
padding: 28px
```

Contenido:

* Enunciado
* Input
* Estado

---

### Timer Badge

```md
posición: fixed top-right
background: #ffffff
```

Estados:

* Normal → gris
* Warning → naranja
* Crítico → rojo

---

### Input Fields

```md
background: #f5f5f7
border-radius: 10px
padding: 12px
```

---

### AI Correction Panel

Layout split:

```md
Left:
- respuesta alumno

Right:
- respuesta correcta
- sugerencia IA
- nota editable
```

---

### Dashboard Card

```md
background: #ffffff
border-radius: 28px
padding: 28px
```

Contenido:

* métricas
* gráficos

---

## 📊 Key Screens

---

### 👨‍🎓 Student

* Login
* Pantalla de examen
* Confirmación envío
* Resultados

---

### 👨‍🏫 Teacher

* Dashboard
* Crear examen
* Corrección
* Métricas

---

## 🧠 Interaction Patterns

---

### Feedback

* Guardado automático → indicador visual
* Envío → confirmación obligatoria
* Error → mensaje claro

---

### Timer Behavior

* 30 min → warning
* 15 min → warning fuerte
* 0 → envío automático

---

### Focus Tracking

* Detectar cambio de pestaña
* Mostrar advertencia
* Registrar evento

---

## 🚫 Do's and Don'ts

### Do

* Usar fondo #f5f5f7 + cards blancas
* Mantener 28px radius
* Usar un solo CTA principal
* Mantener consistencia

---

### Don't

* No usar sombras
* No usar múltiples colores fuertes
* No saturar la UI
* No ocultar información crítica

---

## 🎭 Motion

* Duración: 0.2s – 0.3s
* Tipo: ease
* Usos:

  * hover
  * transiciones
  * feedback

---

## 🧱 Surfaces

| Nivel | Color   |
| ----- | ------- |
| Base  | #f5f5f7 |
| Card  | #ffffff |
| Dark  | #000000 |

---

## ⚙️ CSS Variables

```css
:root {
  --color-bg: #f5f5f7;
  --color-surface: #ffffff;
  --color-text: #1d1d1f;
  --color-secondary: #707070;
  --color-border: #e8e8ed;
  --color-accent: #0071e3;

  --color-success: #28c76f;
  --color-warning: #ff9f43;
  --color-danger: #ea5455;
  --color-info: #00cfe8;

  --radius-card: 28px;
  --radius-pill: 999px;
}
```

---

## 🧪 Product Positioning

Examia combina:

* Estética Apple (claridad, minimalismo)
* UX de herramientas productivas (Notion, Linear)
* Requerimientos académicos reales

Resultado:
👉 Plataforma moderna, clara y eficiente para evaluación digital.
