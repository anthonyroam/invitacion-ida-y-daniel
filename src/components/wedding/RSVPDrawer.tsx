"use client";

import { useState, useEffect, useCallback, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";
import { eventConfig } from "@/config/event-details";
import { getRSVPData, submitRSVP } from "@/services/rsvp";
import type { GuestRSVPData, EventRSVPData } from "@/types/rsvp";
import { RSVPFormPending } from "@/components/wedding/rsvp/RSVPFormPending";
import { RSVPStatusSummary } from "@/components/wedding/rsvp/RSVPStatusSummary";
import { RSVPSuccessState } from "@/components/wedding/rsvp/RSVPSuccessState";
import { RSVPExpiredNotice } from "@/components/wedding/rsvp/RSVPExpiredNotice";

function RSVPDrawerContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") || searchParams.get("rsvp_token") || searchParams.get("guestId");
  const { rsvp } = eventConfig;

  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [guest, setGuest] = useState<GuestRSVPData | null>(null);
  const [event, setEvent] = useState<EventRSVPData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<{
    guest: GuestRSVPData;
    event?: EventRSVPData;
  } | null>(null);

  const fetchGuestData = useCallback(async () => {
    if (!token) {
      setError("No se encontró el token de tu invitación. Por favor accede mediante el enlace personalizado.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const response = await getRSVPData(token);

      if (!response.success || !response.data) {
        setError(response.error || "No pudimos cargar la información de tu invitación.");
        return;
      }

      if (response.data.guest) {
        setGuest(response.data.guest);
      }
      if (response.data.event) {
        setEvent(response.data.event);
      }
    } catch {
      setError("Ocurrió un error al consultar tu invitación. Por favor intenta de nuevo.");
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useEffect(() => {
    if (isOpen) {
      fetchGuestData();
    }
  }, [isOpen, fetchGuestData]);

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open);
    if (!open) {
      if (isSubmitted) {
        setIsSubmitted(false);
      }
    }
  };

  const handleSubmit = async (status: "confirmed" | "declined", passesConfirmed: number) => {
    if (!token) {
      toast.error("Token de invitación no disponible");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await submitRSVP({
        rsvp_token: token,
        status,
        passes_confirmed: passesConfirmed,
      });

      if (!response.success) {
        toast.error(response.error || "Hubo un error al procesar tu confirmación.");
        return;
      }

      toast.success(response.message || "¡Tu respuesta ha sido registrada!");

      const updatedGuest: GuestRSVPData = response.data?.guest || {
        id: response.data?.id || guest?.id || token,
        name: guest?.name || "Invitado",
        status,
        passes_assigned: guest?.passes_assigned || passesConfirmed || 1,
        passes_confirmed: response.data?.passes_confirmed ?? (status === "confirmed" ? passesConfirmed : 0),
      };

      const updatedEvent: EventRSVPData | undefined = response.data?.event || event || undefined;

      setGuest(updatedGuest);
      if (updatedEvent) {
        setEvent(updatedEvent);
      }
      setSubmittedData({
        guest: updatedGuest,
        event: updatedEvent,
      });
      setIsSubmitted(true);
    } catch {
      toast.error("Ocurrió un error de conexión al enviar tu respuesta.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const isDeadlineExpired = Boolean(
    guest?.status === "pending" &&
      event?.rsvp_deadline &&
      new Date() > new Date(event.rsvp_deadline)
  );

  return (
    <Drawer open={isOpen} onOpenChange={handleOpenChange}>
      <DrawerTrigger asChild>
        <Button>
          {rsvp.buttonText}
        </Button>
      </DrawerTrigger>

      <DrawerContent>
        <DrawerHeader className="px-0 pb-2">
          <DrawerTitle className="font-primary text-3xl text-center text-foreground">
            {rsvp.title}
          </DrawerTitle>
          <DrawerDescription className="font-secondary text-xs text-center text-muted-foreground">
            {isSubmitted
              ? "Confirmación exitosa"
              : isDeadlineExpired || guest?.status === "confirmed" || guest?.status === "declined"
              ? "Información de tu respuesta"
              : "Completa el formulario para enviarnos tu confirmación"}
          </DrawerDescription>
        </DrawerHeader>

        <div className="py-2 font-secondary">
          {isLoading ? (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="size-8 animate-spin text-foreground" />
              <p className="font-secondary text-sm text-muted-foreground">
                Cargando los datos de tu invitación...
              </p>
            </div>
          ) : !token ? (
            <RSVPExpiredNotice
              type="missing_token"
              message="Para confirmar tu asistencia, ingresa mediante el enlace personalizado que recibiste por mensaje."
              plannerPhone={event?.planner_phone}
            />
          ) : error ? (
            <RSVPExpiredNotice
              type="error"
              message={error}
              plannerPhone={event?.planner_phone}
            />
          ) : isSubmitted && (submittedData || guest) ? (
            <RSVPSuccessState
              guest={submittedData?.guest || guest!}
              event={submittedData?.event || event || undefined}
              onClose={() => setIsOpen(false)}
            />
          ) : isDeadlineExpired ? (
            <RSVPExpiredNotice
              type="expired"
              message="El período de confirmación para este evento ha finalizado."
              plannerPhone={event?.planner_phone}
            />
          ) : guest && (guest.status === "confirmed" || guest.status === "declined") ? (
            <RSVPStatusSummary guest={guest} event={event || undefined} />
          ) : guest ? (
            <RSVPFormPending
              guest={guest}
              onSubmit={handleSubmit}
              isSubmitting={isSubmitting}
            />
          ) : (
            <div className="flex flex-col items-center justify-center py-12 space-y-3">
              <Loader2 className="size-8 animate-spin text-foreground" />
              <p className="font-secondary text-sm text-muted-foreground">
                Cargando...
              </p>
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export function RSVPDrawer() {
  const { rsvp } = eventConfig;

  return (
    <Suspense
      fallback={
        <Button disabled>
          <Loader2 className="size-4 animate-spin mr-2" />
          <span>{rsvp.buttonText}</span>
        </Button>
      }
    >
      <RSVPDrawerContent />
    </Suspense>
  );
}
