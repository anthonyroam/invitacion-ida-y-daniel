import type { RSVPResponse, RSVPSubmitPayload } from "@/types/rsvp";

/**
 * Normaliza los errores a un formato RSVPResponse consistente
 */
function errorResponse(error: string): RSVPResponse {
  return {
    success: false,
    error,
  };
}

/**
 * Obtiene los datos del invitado y del evento mediante la API Inbound (/api/v1/rsvp).
 */
export async function getRSVPData(token: string): Promise<RSVPResponse> {
  if (!token || token.trim() === "") {
    return errorResponse("El parámetro token es requerido");
  }

  const baseUrl = process.env.NEXT_PUBLIC_WEDDY_API_URL || "https://www.weddy.lat";
  const endpoint = `${baseUrl}/api/v1/rsvp?token=${encodeURIComponent(token)}`;

  try {
    const res = await fetch(endpoint, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    const json = await res.json().catch(() => null);

    if (res.ok && json?.data) {
      return {
        success: true,
        data: json.data,
        message: json.message,
      };
    }

    if (json?.error) {
      return errorResponse(json.error);
    }

    return errorResponse(`Error de servidor (${res.status})`);
  } catch {
    return errorResponse("No pudimos conectar con el servidor de confirmaciones. Verifica tu conexión a internet.");
  }
}

/**
 * Envía la confirmación de asistencia mediante la API Inbound (/api/v1/rsvp).
 */
export async function submitRSVP(payload: RSVPSubmitPayload): Promise<RSVPResponse> {
  const baseUrl = process.env.NEXT_PUBLIC_WEDDY_API_URL || "https://www.weddy.lat";
  const endpoint = `${baseUrl}/api/v1/rsvp`;

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        rsvp_token: payload.rsvp_token,
        status: payload.status,
        passes_confirmed: payload.status === "confirmed" ? payload.passes_confirmed : 0,
        dietary_restrictions: payload.dietary_restrictions,
        notes: payload.notes,
      }),
    });

    const json = await res.json().catch(() => null);

    if (res.ok && json?.success) {
      return {
        success: true,
        data: json.data,
        message: json.message || "RSVP registrado correctamente",
      };
    }

    if (json?.error) {
      return errorResponse(json.error);
    }

    return errorResponse(`Error al registrar tu confirmación (${res.status})`);
  } catch {
    return errorResponse("Ocurrió un error de red al enviar tu respuesta.");
  }
}
