"use client";

import type { CSSProperties } from "react";
import { Toaster as Sonner } from "sonner";

/**
 * Toasts do app (PLANO §5.3): canto inferior direito, 4 s, pausam com a aba oculta
 * (comportamento nativo do Sonner), entram e saem pelo mesmo lado.
 * Cores só por token, então o tema troca sozinho.
 */
export function Toaster() {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      duration={4000}
      swipeDirections={["right"]}
      containerAriaLabel="Avisos"
      className="toaster"
      style={
        {
          "--normal-bg": "var(--musgo)",
          "--normal-text": "var(--tx)",
          "--normal-border": "var(--vidro-borda)",
          "--success-bg": "var(--musgo)",
          "--success-text": "var(--folha-cl)",
          "--success-border": "var(--vidro-borda)",
          "--error-bg": "var(--musgo)",
          "--error-text": "var(--verm-cl)",
          "--error-border": "var(--vidro-borda)",
          "--border-radius": "var(--r-item)",
          fontFamily: "var(--f-ui)",
        } as CSSProperties
      }
    />
  );
}
