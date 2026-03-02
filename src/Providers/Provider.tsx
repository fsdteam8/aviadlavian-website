// src/Providers/Provider.tsx

"use client";

import { SessionProvider } from "next-auth/react";
import type { ReactNode } from "react";
import { ThemeProvider } from "next-themes";

export default function Provider({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
        {children}
      </ThemeProvider>
    </SessionProvider>
  );
}
