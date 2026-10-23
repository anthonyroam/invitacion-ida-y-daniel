# Guía de Integración: RSVP en Invitaciones Externas (Webflow / WordPress / React / Next.js / HTML)

Esta especificación describe el contrato de integración HTTP, la configuración de variables de entorno y los **estándares de UI/UX canónicos y simplificados** que cualquier sitio web o invitación externa debe implementar para comunicarse con la API Inbound de Weddy (`/api/v1/rsvp`).

---

## 🏛️ 1. Arquitectura y Variables de Entorno

La API pública de RSVP es totalmente **CORS-enabled** (`Access-Control-Allow-Origin: *`) y no requiere autenticación de usuario. Todo el acceso y la seguridad están respaldados por el token único de invitación (`rsvp_token` en formato UUID v4).

> [!IMPORTANT]
> Las aplicaciones externas **NUNCA** deben conectarse directamente a la base de datos de Weddy mediante Prisma o drivers SQL. La comunicación debe ser **100% HTTP REST** consumiendo `/api/v1/rsvp`.

### Configuración en el Cliente Externo (`.env`)
En el archivo `.env` o `.env.local` de la web externa (por ejemplo en Next.js), se debe definir la URL base de Weddy:

```env
# En desarrollo local:
NEXT_PUBLIC_WEDDY_API_URL="http://localhost:3000"

# En producción:
NEXT_PUBLIC_WEDDY_API_URL="https://www.weddy.lat"
```

---

## 📋 2. Pasos de Integración HTTP

### Paso 1: Capturar el Token desde la URL
Las invitaciones enviadas a los invitados deben incluir el parámetro `token` en la query string (ejemplo: `https://mi-boda.com?token=69f6bc84-781d-4ea7-ae70-85fe3e31bce4`).

```javascript
// JavaScript para extraer el token en la web externa
const urlParams = new URLSearchParams(window.location.search);
const rsvpToken = urlParams.get('token') || urlParams.get('rsvp_token');
```

---

### Paso 2: Consulta Inicial del Estado (`GET /api/v1/rsvp`)

Al cargar la página o al abrir el modal/drawer de confirmación, la web externa debe consultar los datos:

**Endpoint**: `GET ${NEXT_PUBLIC_WEDDY_API_URL}/api/v1/rsvp?token=<RSVP_TOKEN>`

#### Respuesta de Éxito (`200 OK`):
```json
{
  "success": true,
  "data": {
    "guest": {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "name": "Juan Pérez",
      "status": "pending",
      "passes_assigned": 2,
      "passes_confirmed": 0,
      "dietary_restrictions": "",
      "notes": ""
    },
    "event": {
      "title": "Boda María & Juan",
      "event_date": "2026-11-20T20:00:00Z",
      "rsvp_deadline": "2026-10-31T23:59:59Z",
      "planner_phone": "+5491112345678"
    }
  }
}
```

#### Respuestas de Error:
- `400 Bad Request`: `{"error": "rsvp_token is required"}`
- `404 Not Found`: `{"error": "Guest not found"}`

---

### Paso 3: Enviar la Respuesta (`POST /api/v1/rsvp`)

Al hacer clic en "Confirmar", el frontend externo envía el payload:

**Endpoint**: `POST ${NEXT_PUBLIC_WEDDY_API_URL}/api/v1/rsvp`  
**Headers**: `Content-Type: application/json`

#### Body JSON:
```json
{
  "rsvp_token": "69f6bc84-781d-4ea7-ae70-85fe3e31bce4",
  "status": "confirmed",
  "passes_confirmed": 2
}
```
*(Campos opcionales admitidos: `dietary_restrictions`, `notes`).*

#### Respuestas HTTP:
- `200 OK`:
  ```json
  {
    "success": true,
    "message": "RSVP updated successfully",
    "data": {
      "guest_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "status": "confirmed",
      "passes_confirmed": 2,
      "dietary_restrictions": "",
      "notes": ""
    }
  }
  ```
- `400 Bad Request`:
  - Invitación ya respondida: `{"error": "Esta invitación ya ha sido respondida y no puede modificarse directamente. Por favor contacta al Wedding Planner para cualquier cambio."}`
  - Pases fuera de rango: `{"error": "Confirmed passes out of valid range"}`
  - Estado inválido: `{"error": "Invalid status"}`
  - Falta token: `{"error": "rsvp_token is required"}`
- `403 Forbidden`:
  - Plazo vencido: `{"error": "RSVP deadline has passed"}`
- `404 Not Found`:
  - `{"error": "Guest not found"}` o `{"error": "Event not found"}`

---

## 🎨 3. Estándares Estrictos de UI/UX (Interfaz Simplificada)

Cualquier template o web de invitación que consuma esta API **DEBE RESPETAR** la estructura minimalista y los textos canónicos exactos de la interfaz oficial:

### 👤 1. Encabezado del Formulario
- **Título**: `¡Hola, {guestName}!`
- **Regla**: Sin subtítulos, preguntas secundarias ni descripciones redundantes.

---

### 🔘 2. Tarjetas de Selección (Choice Cards)
- **Opción Positiva (`status = 'confirmed'`)**:
  - **Texto**: `Sí, asistiré`
  - **Estilo visual seleccionado**: Borde y fondo esmeralda suave (`border-emerald-600`, `bg-emerald-50/50`), indicador circular con punto central esmeralda.
  - **Regla estricta**: **SIN subtítulos ni textos emocionales secundarios** (eliminados para mantener el diseño limpio).
- **Opción Negativa (`status = 'declined'`)**:
  - **Texto**: `No podré asistir`
  - **Estilo visual seleccionado**: Borde y fondo destructivo/rojo suave (`border-destructive/60`, `bg-destructive/5`), indicador circular con punto central rojo.
  - **Regla estricta**: **SIN subtítulos ni textos emocionales secundarios**.
- **Comportamiento dinámico**:
  - Al seleccionar `Sí, asistiré`: Se despliega el selector de pases.
  - Al seleccionar `No podré asistir`: Se oculta el selector de pases y se establece `passes_confirmed = 0`.

---

### 🔢 3. Contador de Pases (`- [ count ] +`)
- **Prohibido**: No usar elementos `<select>` nativos ni dropdowns.
- **Estructura del componente**:
  - **Header**: Label `Pases` a la izquierda y Badge `Máximo: {passesAssigned}` a la derecha.
  - **Controles**: Botón circular con icono `Minus` (`-`), valor numérico central `{passesConfirmed}` y botón circular con icono `Plus` (`+`).
  - **Valor por defecto**: Inicializa con el total de pases asignados (`guest.passes_assigned`).
  - **Rango permitido**: Mínimo `1`, Máximo `guest.passes_assigned`.

---

### 🚀 4. Botón de Acción Principal
- **Texto Normal / Habilitado**: `Confirmar`
- **Texto en Procesamiento**: `Enviando...`
- **Estado**: Deshabilitado si no hay selección de estado o si `loading === true`.

---

### 🟢 5. Pantalla de Éxito Post-Confirmación (`Success State`)
Al recibir respuesta exitosa (`200 OK`) del `POST /api/v1/rsvp`, el formulario interactivo se oculta y se muestra la tarjeta de confirmación:
- **Ícono**: `CheckCircle2` en círculo esmeralda (`bg-emerald-100 text-emerald-600`).
- **Título**: `¡Gracias por responder!`
- **Descripción**: `Tu respuesta fue registrada.`
- **Pie**: Enlace discreto a WhatsApp del Wedding Planner (si `planner_phone` está disponible).

---

### 🔒 6. Vista de Invitación Ya Respondida (Inmutable / Read-Only)
Si al consultar (`GET`) el invitado ya tiene estado `confirmed` o `declined`:
- **Encabezado**:
  - Ícono `CheckCircle2` esmeralda.
  - Título: `Invitación Respondida`
  - Descripción: `¡Hola, {guestName}! Tu respuesta ya ha sido registrada.`
- **Cuerpo del Resumen**:
  - Fila de estado: `Estado de asistencia` con Badge `Confirmado` (esmeralda) o `No asistirá` (destructivo).
  - Fila de pases (si fue confirmado): `Pases confirmados` con valor `{passesConfirmed} de {passesAssigned}`.
  - Restricciones alimentarias / Notas: Se muestran únicamente si contienen información no vacía.
- **Pie de Página**:
  - Mensaje de soporte: `Para modificar tu respuesta, contactá a los anfitriones o al Wedding Planner.`
  - Enlace de contacto: WhatsApp directo a `planner_phone`.

---

### 💬 7. Contacto con el Wedding Planner (WhatsApp)
- Enlace sutil con icono `MessageCircle` y texto exacto: `Contactar al Wedding Planner`.
- Formato de URL: `https://wa.me/{planner_phone_sanitizado}` (números limpios sin espacios ni signos).

---

## 💻 4. Código de Referencia para Frontend Externo

```typescript
// Ejemplo de integración en TypeScript / JavaScript (Next.js / React / Webflow)
const WEDDY_API_URL = process.env.NEXT_PUBLIC_WEDDY_API_URL || "http://localhost:3000";

export interface GuestRSVPResponse {
  success: boolean;
  data: {
    guest: {
      id: string;
      name: string;
      status: 'pending' | 'confirmed' | 'declined';
      passes_assigned: number;
      passes_confirmed: number;
      dietary_restrictions?: string;
      notes?: string;
    };
    event: {
      title: string;
      event_date: string;
      rsvp_deadline: string;
      planner_phone: string | null;
    };
  };
}

export async function fetchGuestRSVP(token: string): Promise<GuestRSVPResponse> {
  const res = await fetch(`${WEDDY_API_URL}/api/v1/rsvp?token=${encodeURIComponent(token)}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  return res.json();
}

export async function sendGuestRSVP(
  token: string, 
  status: "confirmed" | "declined", 
  passesConfirmed: number,
  dietaryRestrictions?: string,
  notes?: string
) {
  const res = await fetch(`${WEDDY_API_URL}/api/v1/rsvp`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      rsvp_token: token,
      status,
      passes_confirmed: status === "confirmed" ? passesConfirmed : 0,
      dietary_restrictions: dietaryRestrictions,
      notes,
    }),
  });
  return res.json();
}
```
