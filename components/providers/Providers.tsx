"use client";

import type { ReactNode } from "react";

import { EmissionDataProvider } from "./EmissionDataProvider";

export function Providers({ children }: { children: ReactNode }) {
  return <EmissionDataProvider>{children}</EmissionDataProvider>;
}

