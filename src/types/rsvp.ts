export type RSVPStatus = "pending" | "confirmed" | "declined";

export interface GuestRSVPData {
  id: string;
  name: string;
  status: RSVPStatus;
  passes_assigned: number;
  passes_confirmed: number;
  dietary_restrictions?: string;
  notes?: string;
}

export interface EventRSVPData {
  title: string;
  event_date: string;
  rsvp_deadline?: string | null;
  planner_phone?: string | null;
}

export interface RSVPResponse {
  success: boolean;
  data?: {
    guest?: GuestRSVPData;
    event?: EventRSVPData;
    id?: string;
    guest_id?: string;
    status?: RSVPStatus;
    passes_confirmed?: number;
    dietary_restrictions?: string;
    notes?: string;
  };
  error?: string;
  message?: string;
}

export interface RSVPSubmitPayload {
  rsvp_token: string;
  status: "confirmed" | "declined";
  passes_confirmed: number;
  dietary_restrictions?: string;
  notes?: string;
}
