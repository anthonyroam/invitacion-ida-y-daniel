export interface EventDetails {
  meta: {
    title: string;
    description: string;
  };
  introVideo?: {
    videoSrc: string;
    fadeStartTime: number;
    fadeDuration: number;
  };
  brideName: string;
  groomName: string;
  weddingDate: string;
  ceremony: {
    time: string;
    locationName: string;
    locationAddress: string;
    mapUrl: string;
  };
  reception: {
    time: string;
    locationName: string;
    locationAddress: string;
    mapUrl: string;
  };
  itinerary: {
    title: string;
    events: {
      time: string;
      title: string;
    }[];
  };
  songSettings: {
    message: string;
    audioUrl: string;
  };
  quote: {
    text: string;
    reference: string;
  };
  guidelines: {
    dressCode: {
      title: string;
      style: string;
      description: string;
      colors: string[];
      url: string;
    };
    attendance: {
      title: string;
      description: string;
    };
    passes: {
      title: string;
      description: string;
      defaultPasses: number;
    };
  };
  gifts: {
    title: string;
    description: string;
  };
  gallery: {
    title: string;
    images: {
      src: string;
      alt: string;
    }[];
  };
  rsvp: {
    title: string;
    description: string;
    buttonText: string;
  };
  farewell: {
    message: string;
    imageUrl: string;
  };
}

export const eventConfig: EventDetails = {
  meta: {
    title: "Maria & Andres",
    description:
      "Nuestra historia de amor celebra su capítulo más soñado. Nos encantará que seas parte de este recuerdo inolvidable.",
  },
  introVideo: {
    videoSrc: "/videos/envelope-weddy-template-04.mp4",
    fadeStartTime: 2.4,
    fadeDuration: 0.6,
  },
  brideName: "Maria",
  groomName: "Andres",
  weddingDate: "2027-08-09",
  ceremony: {
    time: "15:00",
    locationName: "Catedral de San Cristóbal",
    locationAddress: "Centro Histórico, San Cristóbal",
    mapUrl: "https://maps.google.com/?q=Catedral+de+San+Cristóbal",
  },
  reception: {
    time: "16:30",
    locationName: "D'ensueños Casa Eventos",
    locationAddress: "San Cristóbal",
    mapUrl: "https://maps.google.com/?q=Densueños+Casa+Eventos",
  },
  itinerary: {
    title: "Itinerario",
    events: [
      { time: "3:30 PM", title: "Ceremonia" },
      { time: "5:00 PM", title: "Recepción" },
      { time: "5:40 PM", title: "Brindis y Primer baile" },
      { time: "7:20 PM", title: "Cena de celebración" },
      { time: "8:00 PM", title: "Fiesta" },
    ],
  },
  songSettings: {
    message: "Pulsa play para sentir nuestro amor",
    audioUrl: "/audio/hasta-mi-final.mp3",
  },
  quote: {
    text: "Y sobre todas estas cosas, vístanse de amor, que es el vínculo perfecto",
    reference: "Colosenses 3:14",
  },
  guidelines: {
    dressCode: {
      title: "Dress code",
      style: "Formal",
      description: "Prepárense para una boda llena de colores\n¡Dejen el blanco y el beige para los novios!",
      colors: ["#C04B14", "#DECD68", "#C3A36D", "#7E9254", "#3B7A8B", "#6C6C6C", "#000000"],
      url: "https://pinterest.com/",
    },
    attendance: {
      title: "No niños",
      description: "Aunque amamos a los más pequeños, este evento está pensado solo para adultos.\nNiños, dulces sueños.",
    },
    passes: {
      title: "Pases",
      description: "El amor es infinito pero el espacio es limitado, te agradecemos asistir según el número de lugares destinados para ti.",
      defaultPasses: 2,
    },
  },
  gifts: {
    title: "Regalos",
    description: "Nuestro mejor regalo es tu presencia, pero si tu deseo es tener un detalle con nosotros puedes hacerlo dentro de un sobre.",
  },
  gallery: {
    title: "Galería",
    images: [
      { src: "/images/hero-image.png", alt: "Nosotros 2" },
      { src: "/images/quote-image.png", alt: "Nosotros 3" },
      { src: "/images/farewell-image.png", alt: "Nosotros 4" },
      { src: "/images/hero-image.png", alt: "Nosotros 2" },
      { src: "/images/quote-image.png", alt: "Nosotros 3" },
    ],
  },
  rsvp: {
    title: "Confirmar asistencia",
    description: "¡Nos encantaría que nos acompañes!\nPor favor confírmanos tu asistencia lo antes posible, tu presencia es muy importante para nosotros.",
    buttonText: "Confirmar asistencia",
  },
  farewell: {
    message: "¡Te esperamos!",
    imageUrl: "/images/farewell-image.png",
  },
};
