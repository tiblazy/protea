import type { Metadata } from "next";
import { Inter, JetBrains_Mono, Sora } from "next/font/google";
import { Toaster } from "@/core/feedback";
import { DEFAULT_PREFS, ThemeProvider, ThemeScript } from "@/core/theme";
import "./globals.css";

// DS §3: Sora (títulos e números finos), Inter (interface), JetBrains Mono (código).
const sora = Sora({ variable: "--font-sora", subsets: ["latin"], weight: ["200", "300", "600", "700", "800"] });
const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });
const jetbrains = JetBrains_Mono({ variable: "--font-jetbrains", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Protea", template: "%s · Protea" },
  description: "Projetos, notas, leads, financeiro, agenda e foco num só lugar.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="pt-BR"
      data-theme={DEFAULT_PREFS.theme}
      data-mode={DEFAULT_PREFS.mode}
      data-motion={DEFAULT_PREFS.motion}
      className={`${sora.variable} ${inter.variable} ${jetbrains.variable}`}
      // O script do <head> troca os atributos antes da hidratação.
      suppressHydrationWarning
    >
      <head>
        <ThemeScript />
      </head>
      <body className="app-fundo min-h-dvh">
        <ThemeProvider>
          {children}
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
