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
  logoUrl?: string;
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
    title: string;
    paragraphs: string[];
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
    description?: string;
    imageUrl?: string;
  };
}

export const eventConfig: EventDetails = {
  meta: {
    title: "Ida & Daniel",
    description:
      "Nuestra historia de amor celebra su capítulo más soñado. Nos encantará que seas parte de este recuerdo inolvidable.",
  },
  introVideo: {
    videoSrc: "/videos/envelope-weddy-template-02.mp4",
    fadeStartTime: 3,
    fadeDuration: 0.4,
  },
  logoUrl: "/images/ida-y-daniel-logo.png",
  brideName: "Ida",
  groomName: "Daniel",
  weddingDate: "2026-12-12",
  ceremony: {
    time: "15:00",
    locationName: "Iglesia Nuestra Señora de Chiquinquirá",
    locationAddress: "Urbanización La Florida, Caracas",
    mapUrl: "https://maps.app.goo.gl/hCazBc9sg4QCnqLC7",
  },
  reception: {
    time: "16:30",
    locationName: "Undici Ristorante",
    locationAddress: "Municipio Chacao, Caracas",
    mapUrl: "https://maps.app.goo.gl/Cuoov8evBBnsWsCV7",
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
    title: "Diez años de amor… y una bendición para toda la vida",
    paragraphs: [
      "Tras una década compartiendo la dicha de ser esposos y padres de Marcelo Andrés, deseamos poner nuestra historia y nuestro hogar en manos del Creador.",
      "Reconocemos lo importante que es tener la bendición de Dios en nuestras vidas para guiarnos y la alegría que nos da decidir caminar bajo Su luz.",
      "Nos encantaría que nos acompañes a celebrar la gracia de nuestro Matrimonio Eclesiástico.",
    ],
    text: "Diez años de amor… y una bendición para toda la vida",
    reference: "Ida & Daniel",
  },
  guidelines: {
    dressCode: {
      title: "Dress code",
      style: "Formal",
      description: "Se reserva el blanco, vinotinto y beige.",
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
    images: [],
  },
  rsvp: {
    title: "Confirmar asistencia",
    description: "¡Nos encantaría que nos acompañes!\nPor favor confírmanos tu asistencia lo antes posible, tu presencia es muy importante para nosotros.",
    buttonText: "Confirmar asistencia",
  },
  farewell: {
    description: "Tu presencia será una alegría y una bendición en este día tan especial.",
    message: "¡Te esperamos para celebrar el amor!",
    imageUrl: "",
  },
};
