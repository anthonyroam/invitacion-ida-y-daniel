---
name: wedding-template-standards
description: Trigger whenever you are creating, designing, or modifying UI components, sections, or layouts for the wedding invitation template. Enforces strict modularity, data extraction from event-details.ts, and forbids hardcoded CSS/Tailwind values in favor of shadcn/ui native properties.
---

# Wedding Template Coding Standards

You are building a premium, highly modular wedding invitation template. The absolute most important rule of this repository is that **the template must be trivially easy to replicate for a new wedding without touching the UI code**.

Whenever you are writing or modifying code in this project, you MUST strictly adhere to the following architecture rules:

## 1. Single Source of Truth (`event-details.ts`)
- **NEVER** hardcode information like names, dates, times, locations, or colors directly into React components.
- **ALWAYS** import and consume the data from `src/config/event-details.ts` (`eventConfig`).
- **Why?** Because the next developer (or agent) should only have to change `event-details.ts` to generate a completely new invitation.

**Examples:**
- ❌ BAD: `<p>Estancia La Paz</p>`
- ✅ GOOD: `<p>{eventConfig.location}</p>`

## 2. No Hardcoded Styles (shadcn/ui First)
- **NEVER** arbitrarily force Tailwind classes for sizing or spacing if a UI component already provides a semantic variant.
- **ALWAYS** use the native properties of the `shadcn/ui` components.
- **Why?** Hardcoded styles break responsiveness and make global design system updates impossible. 

**Examples:**
- ❌ BAD: `<Button className="h-8 w-24 px-3 text-sm">RSVP</Button>`
- ✅ GOOD: `<Button size="sm">RSVP</Button>`
- ❌ BAD: `<div className="flex flex-col gap-4 mt-8 mb-4 p-6">` (Unless it's a specific wrapper, avoid over-utilitying. Prefer semantic HTML or layout components).

## 3. Dynamic UI Coloring
- Colors must not be hardcoded as Tailwind arbitrary values (`bg-[#D4AF37]`).
- For theming, utilize the `themeColors` object from `eventConfig`. Apply these colors via inline styles at the component wrapper level or via dynamic CSS variables so they cascade properly without hardcoding them into every `className`.
- ❌ BAD: `<h2 className="text-[#2C3E50]">`
- ✅ GOOD: `<h2 style={{ color: eventConfig.themeColors.secondary }}>`

## 4. Maximum Modularity
- Break down the layout into completely independent, encapsulated components under `src/components/wedding/` (e.g., `Hero.tsx`, `Countdown.tsx`, `RSVPForm.tsx`).
  - Components should ideally be "dumb" (Presentational) and rely purely on the global config or passed props, maintaining the separation of concerns.

## 5. Componentes de Animación (Desacoplamiento Estructural)
- **NUNCA** apliques clases de estructura de Tailwind (ej. `flex flex-col max-w-xs items-center`) directamente a un wrapper de animación (como `<ScaleIn>` o `<FadeInUp>`).
- **SIEMPRE** envuelve el contenido en un `<div>` interno que maneje el layout. El componente de animación debe encargarse única y exclusivamente del movimiento.
- **¿Por qué?** Acoplar animación asilada con layout destruye la reusabilidad del wrapper y viola la separación de responsabilidades.

## 6. Animaciones Rápidas y Precisas
- **NUNCA** utilices duraciones superiores a `0.3` segundos en transiciones de UI o Framer Motion (ej. `transition={{ duration: 0.3 }}`) a menos que se te indique explícitamente lo contrario.
- **¿Por qué?** Una interfaz rápida y responsiva se siente premium. Tiempos como `0.8s` o `0.5s` hacen que tu web se perciba lenta y pesada.

> **CRITICAL REMINDER**: Concept > Code. If you find yourself hardcoding a style or a piece of text to quickly solve a layout issue, **STOP**. Think about how to abstract it into the `shadcn/ui` theme or the `event-details.ts` configuration.

## 7. Iconografía y Animaciones Avanzadas (Tracing)
- **NUNCA** inventes o adivines los `paths` de íconos base (ej. Lucide). Si construyes un SVG compuesto (para trazarlo con `pathLength`), extrae los atributos `d` exactos de la definición oficial de la librería (`node_modules/lucide-react/dist/lucide-react.suffixed.d.ts`).
- **Excepción a la regla de 0.3s:** Las animaciones visuales detalladas de tipo *draw/trace SVG* (ej: copas o iglesias revelándose con la vista) **DEBEN durar 1.5s** para que el usuario aprecie el delineado y se sienta un diseño "Premium".

## 8. ERRORES FRECUENTES (¡NO LOS COMETAS!)
- **Acoplamiento de Animación y Layout (Regla 5):** Nunca pongas clases estructurales como `max-w-3xl`, `text-center`, o `flex` directamente en envoltorios como `<FadeInUp>` o `<ScaleIn>`. **SIEMPRE** envuelve el contenido en un `<div>` interno que reciba esas clases.
- **Tipografía Hardcodeada (Fuentes Nativas):** **NUNCA** uses clases tipográficas genéricas de Tailwind como `font-sans` o `font-serif`. **SIEMPRE** utiliza las variables semánticas inyectadas en el tema del proyecto: `font-primary` y `font-secondary`. Usar las genéricas desconecta el componente de la configuración global de fuentes de Next.js.
