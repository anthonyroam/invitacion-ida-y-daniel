"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Loader2, Plus, Minus } from "lucide-react";
import type { GuestRSVPData } from "@/types/rsvp";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RSVPFormPendingProps {
  guest: GuestRSVPData;
  onSubmit: (status: "confirmed" | "declined", passesConfirmed: number) => Promise<void>;
  isSubmitting: boolean;
}

export function RSVPFormPending({ guest, onSubmit, isSubmitting }: RSVPFormPendingProps) {
  // Selected status: 'confirmed' | 'declined' | null
  const [selectedStatus, setSelectedStatus] = useState<"confirmed" | "declined" | null>(null);

  // Passes count: defaults to 100% of passes_assigned
  const [passesConfirmed, setPassesConfirmed] = useState<number>(
    guest.passes_assigned > 0 ? guest.passes_assigned : 1
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedStatus) return;

    const passes = selectedStatus === "confirmed" ? passesConfirmed : 0;
    await onSubmit(selectedStatus, passes);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 1. Encabezado del Formulario: ¡Hola, {guestName}! */}
      <div className="text-center mb-4">
        <h3 className="font-primary text-3xl font-normal tracking-tight text-foreground">
          ¡Hola, {guest.name}!
        </h3>
      </div>

      {/* 2. Choice Cards (Sí, asistiré / No podré asistir) */}
      <div className="grid grid-cols-1 gap-3 mb-4 font-secondary">
        {/* Opción Positiva: Sí, asistiré */}
        <button
          type="button"
          onClick={() => setSelectedStatus("confirmed")}
          className={cn(
            "relative flex items-center justify-between p-4 border-2 transition-all duration-200 cursor-pointer text-left group",
            selectedStatus === "confirmed"
              ? "border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/20 shadow-xs"
              : "border-border bg-background hover:bg-secondary/20"
          )}
        >
          <div className="flex flex-col">
            <span className="font-secondary font-semibold text-base text-foreground">
              Sí, asistiré
            </span>
            <span className="font-secondary text-xs text-muted-foreground">
              ¡Celebraré con ustedes!
            </span>
          </div>
          <div
            className={cn(
              "size-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
              selectedStatus === "confirmed"
                ? "border-emerald-600 bg-emerald-600"
                : "border-muted-foreground/40"
            )}
          >
            {selectedStatus === "confirmed" && (
              <div className="size-2 rounded-full bg-white" />
            )}
          </div>
        </button>

        {/* Opción Negativa: No podré asistir */}
        <button
          type="button"
          onClick={() => setSelectedStatus("declined")}
          className={cn(
            "relative flex items-center justify-between p-4 border-2 transition-all duration-200 cursor-pointer text-left group",
            selectedStatus === "declined"
              ? "border-destructive/60 bg-destructive/5 shadow-xs"
              : "border-border bg-background hover:bg-secondary/20"
          )}
        >
          <div className="flex flex-col">
            <span className="font-secondary font-semibold text-base text-foreground">
              No podré asistir
            </span>
            <span className="font-secondary text-xs text-muted-foreground">
              Lo celebraré a la distancia
            </span>
          </div>
          <div
            className={cn(
              "size-5 rounded-full border-2 flex items-center justify-center transition-colors shrink-0",
              selectedStatus === "declined"
                ? "border-destructive bg-destructive"
                : "border-muted-foreground/40"
            )}
          >
            {selectedStatus === "declined" && (
              <div className="size-2 rounded-full bg-white" />
            )}
          </div>
        </button>
      </div>

      {/* 3. Contador de Pases (- [ count ] +) con Header 'Pases' y Badge 'Máximo: X' */}
      <AnimatePresence mode="wait">
        {selectedStatus === "confirmed" && (
          <motion.div
            initial={{ opacity: 0, height: 0, y: -10 }}
            animate={{ opacity: 1, height: "auto", y: 0 }}
            exit={{ opacity: 0, height: 0, y: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="overflow-hidden pt-1"
          >
            <div className="border border-border p-4 bg-secondary/15 space-y-4 font-secondary">
              {/* Header: Label Pases a la izquierda y Badge Máximo a la derecha */}
              <div className="flex items-center justify-between">
                <span className="font-secondary text-sm font-semibold text-foreground">
                  Pases
                </span>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-secondary font-medium bg-secondary text-secondary-foreground">
                  Máximo: {guest.passes_assigned}
                </span>
              </div>

              {/* Controles: Minus, valor central, Plus */}
              <div className="flex items-center justify-center gap-6 py-1">
                <button
                  type="button"
                  disabled={passesConfirmed <= 1}
                  onClick={() => setPassesConfirmed((prev) => Math.max(1, prev - 1))}
                  aria-label="Disminuir pases"
                  className="size-11 rounded-full border border-border text-foreground flex items-center justify-center transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer bg-background hover:bg-secondary/40 shadow-xs"
                >
                  <Minus className="size-5" />
                </button>

                <div className="min-w-[60px] text-center font-secondary font-bold text-2xl select-none text-foreground">
                  {passesConfirmed}
                </div>

                <button
                  type="button"
                  disabled={passesConfirmed >= guest.passes_assigned}
                  onClick={() =>
                    setPassesConfirmed((prev) => Math.min(guest.passes_assigned, prev + 1))
                  }
                  aria-label="Aumentar pases"
                  className="size-11 rounded-full border border-border text-foreground flex items-center justify-center transition-all active:scale-95 disabled:opacity-30 disabled:pointer-events-none cursor-pointer bg-background hover:bg-secondary/40 shadow-xs"
                >
                  <Plus className="size-5" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 4. Botón de Acción Principal: 'Enviar Confirmación' / 'Enviando...' */}
      <div className="pt-2">
        <Button
          type="submit"
          disabled={!selectedStatus || isSubmitting}
          className="w-full"
        >
          {isSubmitting ? (
            <div className="flex items-center justify-center gap-2">
              <Loader2 className="size-5 animate-spin" />
              <span>Enviando...</span>
            </div>
          ) : (
            "Enviar Confirmación"
          )}
        </Button>
      </div>
    </form>
  );
}
