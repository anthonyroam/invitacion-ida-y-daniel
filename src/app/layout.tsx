import type { Metadata } from "next";
import { Alex_Brush, Figtree } from "next/font/google";
import { Toaster } from "@/components/ui/sonner";
import { eventConfig } from "@/config/event-details";
import "./globals.css";

const alexBrush = Alex_Brush({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-alex-brush",
});

const figtree = Figtree({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.APP_URL || "https://template-invitation-02.vercel.app/"
  ),
  title: eventConfig.meta.title,
  description: eventConfig.meta.description,
  openGraph: {
    title: eventConfig.meta.title,
    description: eventConfig.meta.description,
    type: "website",
    images: [
      {
        url: "/images/open-graph.jpg",
        width: 1200,
        height: 630,
        alt: eventConfig.meta.title,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: eventConfig.meta.title,
    description: eventConfig.meta.description,
    images: ["/images/open-graph.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${alexBrush.variable} ${figtree.variable} h-full antialiased`}
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: "history.scrollRestoration = 'manual'",
          }}
        />
      </head>
      <body className="min-h-full flex flex-col items-center font-sans bg-muted/40 text-foreground text-balance">
        <main className="w-full max-w-[700px] min-h-screen bg-background shadow-xl flex flex-col relative">
          {children}
        </main>
        <Toaster position="top-center" />
      </body>
    </html>
  );
}
