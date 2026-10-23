---
name: wedding-structural-components
description: Estándares arquitectónicos obligatorios para la creación y maquetación de Layouts en el Wedding SaaS Template usando Section, Container y Spacer.
---

# Wedding Structural Layouts

Esta skill define las reglas obligatorias para la composición estructural de interfaces en el proyecto Wedding Template. El objetivo es eliminar o reducir a su mínima expresión las clases utilitarias de *inline padding*, *margin* y *max-width* en los elementos contenedores de **cada nueva sección** desarrollada o modificada.

## 1. Los Pilares Component-Driven
Siempre que se inicie o se modifique una **nueva sección** de UI (por ejemplo, el *Hero*, un bloque de *Invitación*, o *Detalles del Evento*), la jerarquía debe usar los componentes base:

```tsx
import { Section } from "@/components/layout/Section"
import { Container } from "@/components/layout/Container"
import { Spacer } from "@/components/layout/Spacer"
import { Heading } from "@/components/layout/Heading"

export function MiNuevaSeccion() {
  return (
    <Section size="default">
      <Container>
        {/* Contenido Tipográfico estructurado */}
        <Heading level={2}>Título</Heading>
        
        {/* Usamos Spacer responsivo en lugar de mb-8 o mt-4 en los elementos */}
        <Spacer size="md" />
        
        <p>Descripción...</p>
      </Container>
    </Section>
  )
}
```

## 2. Definición Componentes: Qué y Para qué

- **Section (`src/components/layout/Section.tsx`)**
  - Es el wrapper principal de cada bloque argumental en la UI.
  - Asegura que el contenido nunca desborde horizontalmente (`overflow-hidden`) y define posicionamiento base (`relative`), vital para fondos y animaciones en Framer Motion.
  - El prop `size` controla el *spacing* vertical global (`py-16 md:py-24` por default, o su variante `small`).

- **Container (`src/components/layout/Container.tsx`)**
  - **Función única:** Centralizar y dar un ancho máximo al contenido (generalmente `max-w-7xl` con `mx-auto`). 
  - Protege al contenido de "tocar" los bordes de la pantalla en dispositivos chicos usando `px`.

- **Spacer (`src/components/layout/Spacer.tsx`)**
  - Reemplaza el margen vertical clásico (`mt-`, `mb-`, `my-`). 
  - Centraliza el estándar de espacios de la app (`xs`, `sm`, `md`, `lg`, `xl`).
  - **Crucial:** Está configurado para ser responsivo (`md:`). Evita problemas donde el padding quede gigante en celulares. Nunca utilices divs ciegos con `h-32` fijos.

- **Heading (`src/components/layout/Heading.tsx`)**
  - Estandariza la tipografía jerárquica de `h1` a `h6` para no esparcir clases de tamaños de texto como `text-5xl md:text-6xl`.
  - Permite la prop polimórfica `as` (ej. `<Heading level={2} as="h1">`) para optimizar el **SEO** sin romper el sistema de diseño visual.

## 3. Prácticas Prohibidas

- ❌ Envolver contenido directamente en un `div` con flex + márgenes ignorando la jerarquía.
- ❌ Hardcodear clases de paddings globales en lugar del `Container`.
- ❌ Adornar tipografías o divs con grandes utilidades de margins (`mb-12`, `mb-24`). Usar `<Spacer />`.
- ❌ Hardcodear utilidades de tamaño en botones (e.g. `<a> o <button>` con `px-10 py-5 text-xl`). En su lugar, modifica/usa un `variant` y `size` en el componente `<Button />` base de shadcn.

## 4. ERRORES FRECUENTES (¡NO LOS COMETAS!)

- **El Síndrome del Margen Rápido:** Está ESTRICTAMENTE PROHIBIDO usar clases utilitarias como `mb-6`, `mt-4`, `my-8` dentro de los bloques de texto o contenedores internos. **SIEMPRE** debes importar y renderizar `<Spacer size="sm" />` (o el tamaño que corresponda) entre los elementos verticales. Esta regla es mandatoria para mantener el vertical rhythm intacto en toda la app.

## ¡Aplicación Proactiva!

Cuando se modifique UI orientada a la App base (fuera del dashboard del Admin), debés leer `SKILL.md` de *wedding-template-standards* y esta skill juntos para inferir un resultado responsivo, limpio y de calidad Premium.
