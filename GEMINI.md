# Reglas Maestras del Proyecto: Template Invitación (Wedding Planner SaaS)

Bienvenido a la joya de la corona. Si estás modificando o creando código en este repositorio, sos parte del equipo que construye la arquitectura del producto más premium de invitaciones de boda.

Estas reglas **NO SON NEGOCIABLES**.

## 1. Arquitectura Híbrida Estricta (Source of Truth)

- **La UI es Dummie (Tonta).** Bajo ningún concepto la UI debe saber cómo se llaman los novios, qué día se casan o de qué color es la boda.
- **Cero Textos Hardcodeados.** Todo dato variable DEBE leerse de `src/config/event-details.ts`.
- **Los invitados son Dinámicos.** Todo proceso de confirmación de asistencia, validación de estado o conteo de pases se hace EXCLUSIVAMENTE mediante Prisma consultando la base de datos (y verificando el `EVENT_ID` del archivo `.env`).

## 2. Factor WOW y Estética Premium (shadcn/ui + Framer Motion)

- **Colores Centralizados en Tokens Canónicos.** Los colores se definen exclusivamente en `src/app/globals.css` mediante variables semánticas de `shadcn/ui`. Quedan estrictamente **prohibidos los estilos inline de color** (`style={{ color: ... }}`) y colores arbitrarios de Tailwind (`text-[#ff0000]`). Los textos sobre `bg-background` usan `text-foreground` (títulos/principal) o `text-muted-foreground` (subtítulos/fechas/descripciones).
- **Layout Acotado Mobile-First (700px).** La aplicación se enmarca en un contenedor mobile-first de ancho máximo `max-w-[700px]` con `shadow-xl`. El diseño base de mobile es el definitivo: quedan **prohibidos los breakpoints de escritorio (`lg:`, `xl:`, `2xl:`)** y modificadores `md:` que alteren escalas o espaciados.
- Las animaciones y componentes dinámicos (cuentas regresivas, *fade-ins*) se manejan **solamente** con Framer Motion y componentes encapsulados con `"use client"`.
- Respeta los patrones visuales de `shadcn/ui`. Si necesitás cambiar tamaño o comportamiento, usá sus `props` oficiales (como `size`, `variant`).

## 3. Seguridad de Datos en RSVP

- Nadie puede tocar la base de datos sin pasar por `Zod`. Todos los formularios deben contar con parseo estricto del lado del servidor en nuestros *Server Actions* (ej: `src/actions/rsvp.ts`).
- Cada mutación de invitado DEBE validar siempre primero que el `eventId` de ese invitado concuerde con el `process.env.EVENT_ID` global de Next.js, caso contrario, bloqueá la acción (protección de Cross-Wedding).

## 4. Filosofía de Trabajo y Modularidad

- Todo cambio arquitectónico pasa por la metodología **Spec-Driven Development (SDD)**. Primero documentamos y planificamos; ejecutar código es la etapa final.
- **Lego, no bloques de cemento:** Separa todos los elementos visuales (`Hero`, `Countdown`, `RSVPForm`) en la carpeta `src/components/wedding/`. La página base de Next.js (`page.tsx`) solo debe dedicarse a ensamblar.

> **RECORDATORIO A LOS AGENTES**: Apliquen proactivamente las instrucciones de la skill `wedding-template-standards` al escribir código UI en este proyecto. Nunca asuman reglas convencionales sobre buenas prácticas predefinidas ¡Este proyecto vuela a otra altura!
