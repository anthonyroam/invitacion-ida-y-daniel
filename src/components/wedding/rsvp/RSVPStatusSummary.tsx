"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { GuestRSVPData, EventRSVPData } from "@/types/rsvp";
import { cn } from "@/lib/utils";

interface RSVPStatusSummaryProps {
  guest: GuestRSVPData;
  event?: EventRSVPData;
}

export function RSVPStatusSummary({ guest, event }: RSVPStatusSummaryProps) {
  const isConfirmed = guest.status === "confirmed";

  const cleanPhone = event?.planner_phone ? event.planner_phone.replace(/\D/g, "") : null;
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hola, soy ${guest.name}. Quisiera hacer una consulta sobre la invitación para ${event?.title || "la boda"}.`
      )}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6 text-center py-2"
    >
      {/* 1. Encabezado */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="size-16 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600 shadow-inner">
          <CheckCircle2 className="size-10" />
        </div>

        <div className="space-y-1.5">
          <h3 className="font-primary text-3xl font-normal tracking-tight text-foreground">
            Invitación Respondida
          </h3>
          <p className="font-secondary text-sm text-muted-foreground">
            ¡Hola, {guest.name}! Tu respuesta ya ha sido registrada.
          </p>
        </div>
      </div>

      {/* 2. Cuerpo del Resumen */}
      <div className="border border-border p-4 space-y-3 bg-secondary/15 text-left font-secondary">
        <div className="flex items-center justify-between">
          <span className="font-secondary text-sm font-medium text-muted-foreground">
            Estado de asistencia
          </span>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold font-secondary",
              isConfirmed
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                : "bg-destructive/15 text-destructive"
            )}
          >
            {isConfirmed ? "Confirmado" : "No asistirá"}
          </span>
        </div>

        {isConfirmed && (
          <div className="pt-2 border-t border-border flex items-center justify-between">
            <span className="font-secondary text-sm font-medium text-muted-foreground">
              Pases confirmados
            </span>
            <span className="font-secondary text-sm font-semibold text-foreground">
              {guest.passes_confirmed} de {guest.passes_assigned}
            </span>
          </div>
        )}

        {guest.dietary_restrictions && guest.dietary_restrictions.trim() !== "" && (
          <div className="pt-2 border-t border-border space-y-1">
            <span className="font-secondary text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Restricciones alimentarias
            </span>
            <p className="font-secondary text-sm text-foreground">
              {guest.dietary_restrictions}
            </p>
          </div>
        )}

        {guest.notes && guest.notes.trim() !== "" && (
          <div className="pt-2 border-t border-border space-y-1">
            <span className="font-secondary text-xs uppercase tracking-wider font-semibold text-muted-foreground">
              Notas
            </span>
            <p className="font-secondary text-sm text-foreground">
              {guest.notes}
            </p>
          </div>
        )}
      </div>

      {/* 3. Pie de Página */}
      <div className="space-y-3 font-secondary">
        <p className="font-secondary text-xs leading-relaxed text-muted-foreground">
          Para modificar tu respuesta, contactá a los anfitriones o al Wedding Planner.
        </p>

        {whatsappUrl && (
          <div className="pt-1">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 text-xs transition-colors underline underline-offset-4 font-secondary text-foreground hover:text-foreground/80"
            >
              <MessageCircle className="size-3.5" />
              <span>Contactar al Wedding Planner</span>
            </a>
          </div>
        )}
      </div>
    </motion.div>
  );
}
