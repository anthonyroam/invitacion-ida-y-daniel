"use client";

import { motion } from "framer-motion";
import { AlertCircle, Clock, Link2Off, MessageCircle } from "lucide-react";

interface RSVPExpiredNoticeProps {
  type: "expired" | "missing_token" | "error";
  message?: string;
  plannerPhone?: string | null;
}

export function RSVPExpiredNotice({
  type,
  message,
  plannerPhone,
}: RSVPExpiredNoticeProps) {
  const cleanPhone = plannerPhone ? plannerPhone.replace(/\D/g, "") : null;
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        "Hola, tengo una consulta sobre la invitación al evento."
      )}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6 text-center py-4"
    >
      {/* Icon */}
      <div className="flex justify-center">
        <div className="size-14 rounded-full flex items-center justify-center bg-secondary/50">
          {type === "expired" ? (
            <Clock className="size-7 text-foreground" />
          ) : type === "missing_token" ? (
            <Link2Off className="size-7 text-muted-foreground" />
          ) : (
            <AlertCircle className="size-7 text-destructive" />
          )}
        </div>
      </div>

      {/* Headings & Descriptions */}
      <div className="space-y-2">
        <h3 className="font-primary text-3xl font-normal tracking-tight text-foreground">
          {type === "expired"
            ? "Plazo de confirmación finalizado"
            : type === "missing_token"
            ? "Enlace de invitación no encontrado"
            : "No pudimos cargar la invitación"}
        </h3>
        <p className="font-secondary text-sm max-w-sm mx-auto leading-relaxed text-muted-foreground">
          {type === "expired"
            ? (message || "El período de confirmación para este evento ha finalizado.")
            : type === "missing_token"
            ? (message || "Para confirmar tu asistencia, ingresa mediante el enlace personalizado que recibiste por mensaje.")
            : (message || "Ocurrió un inconveniente al consultar tu información. Por favor, intenta de nuevo.")}
        </p>
      </div>

      {/* Subtle WhatsApp Text Link */}
      {whatsappUrl && (
        <div className="pt-2">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 text-xs transition-colors underline underline-offset-4 font-secondary text-foreground hover:text-foreground/80"
          >
            <MessageCircle className="size-3.5" />
            <span>¿Dudas sobre el evento? Contactar al Wedding Planner ➔</span>
          </a>
        </div>
      )}
    </motion.div>
  );
}
