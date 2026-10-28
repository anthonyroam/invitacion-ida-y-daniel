"use client";

import { motion } from "framer-motion";
import { CheckCircle2, MessageCircle } from "lucide-react";
import type { GuestRSVPData, EventRSVPData } from "@/types/rsvp";
import { Button } from "@/components/ui/button";
import { DrawerClose } from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface RSVPSuccessStateProps {
  guest: GuestRSVPData;
  event?: EventRSVPData;
  onClose?: () => void;
}

export function RSVPSuccessState({ guest, event, onClose }: RSVPSuccessStateProps) {
  const isConfirmed = guest.status === "confirmed";

  const cleanPhone = event?.planner_phone ? event.planner_phone.replace(/\D/g, "") : null;
  const whatsappUrl = cleanPhone
    ? `https://wa.me/${cleanPhone}?text=${encodeURIComponent(
        `Hola, soy ${guest.name}. Quisiera hacer una consulta sobre la invitación para ${event?.title || "la boda"}.`
      )}`
    : null;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="space-y-6 text-center py-3"
    >
      {/* Emerald Success Icon */}
      <div className="flex flex-col items-center justify-center space-y-3">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.1 }}
          className="size-16 rounded-full flex items-center justify-center bg-emerald-100 text-emerald-600 shadow-inner"
        >
          <CheckCircle2 className="size-10" />
        </motion.div>

        <div className="space-y-1.5">
          <h3 className="font-primary text-3xl font-normal tracking-tight text-foreground">
            ¡Gracias por responder!
          </h3>
          <p className="font-secondary text-sm max-w-xs mx-auto text-muted-foreground">
            Tu respuesta fue registrada.
          </p>
        </div>
      </div>

      {/* Summary Box */}
      <div className="border border-border p-4.5 space-y-3 bg-background text-left font-secondary">
        <div className="flex items-center justify-between">
          <span className="font-secondary text-xs uppercase tracking-wider font-semibold text-muted-foreground">
            Invitado
          </span>
          <span className="font-secondary text-sm font-semibold text-foreground">
            {guest.name}
          </span>
        </div>

        <div className="pt-2 border-t border-border flex items-center justify-between">
          <span className="font-secondary text-xs uppercase tracking-wider font-semibold text-muted-foreground">
            Estado
          </span>
          <span
            className={cn(
              "px-3 py-1 rounded-full text-xs font-semibold font-secondary",
              isConfirmed
                ? "bg-emerald-500/15 text-emerald-700 dark:text-emerald-400"
                : "bg-muted text-muted-foreground"
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
              {guest.passes_confirmed} de {guest.passes_assigned} {guest.passes_assigned === 1 ? "pase" : "pases"}
            </span>
          </div>
        )}
      </div>

      {/* Close Action */}
      <div className="pt-1 font-secondary">
        <DrawerClose asChild onClick={onClose}>
          <Button className="w-full">
            Entendido
          </Button>
        </DrawerClose>
      </div>

      {/* Subtle WhatsApp Link */}
      {whatsappUrl && (
        <div className="pt-1 font-secondary">
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
    </motion.div>
  );
}
