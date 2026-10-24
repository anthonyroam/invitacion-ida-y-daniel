import type { Metadata, Viewport } from "next";
import { Playfair_Display, Great_Vibes } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { eventConfig } from "@/config/event-details";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-great-vibes",
});

const getBaseUrl = () => {
  if (process.env.APP_URL) return process.env.APP_URL;
  if (process.env.NEXT_PUBLIC_APP_URL) return process.env.NEXT_PUBLIC_APP_URL;
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    return `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  }
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  return "https://invitacion-ida-y-daniel.vercel.app";
};

export const metadata: Metadata = {
  metadataBase: new URL(getBaseUrl()),
  title: eventConfig.meta.title,
  description: eventConfig.meta.description,
  openGraph: {
    title: eventConfig.meta.title,
    description: eventConfig.meta.description,
    type: "website",
    locale: "es_ES",
    images: [
      {
        url: "/images/open-graph.png",
        width: 500,
        height: 500,
        alt: eventConfig.meta.title,
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: eventConfig.meta.title,
    description: eventConfig.meta.description,
    images: ["/images/open-graph.png"],
  },
  icons: {
    icon: [
      { url: "/favicon.png", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
  other: {
    "color-scheme": "light",
    "supported-color-schemes": "light",
  },
};

export const viewport: Viewport = {
  themeColor: "#FAF8F5",
  colorScheme: "light",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`light ${playfair.variable} ${greatVibes.variable} h-full antialiased bg-background`}
      style={{ colorScheme: "light" }}
    >
      <head>
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <meta name="theme-color" content="#FAF8F5" />
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration = 'manual'",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col items-center font-secondary bg-background text-foreground text-balance">
        <main className="w-full max-w-[700px] min-h-screen bg-background shadow-xl flex flex-col relative">
          {children}
        </main>
        {/* Top viewport fade overlay - Opción 3: Visor cinematográfico */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed top-0 left-0 right-0 mx-auto w-full max-w-[700px] h-28 backdrop-blur-md [mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_bottom,black_20%,transparent_100%)] bg-gradient-to-b from-background via-background/80 to-transparent z-30"
        />

        {/* Bottom viewport fade overlay - Opción 3: Visor cinematográfico */}
        <div
          aria-hidden="true"
          className="pointer-events-none fixed bottom-0 left-0 right-0 mx-auto w-full max-w-[700px] h-48 backdrop-blur-md [mask-image:linear-gradient(to_top,black_25%,transparent_100%)] [-webkit-mask-image:linear-gradient(to_top,black_25%,transparent_100%)] bg-gradient-to-t from-background via-background/80 to-transparent z-30"
        />
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
