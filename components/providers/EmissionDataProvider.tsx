"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import { calculateEmissions } from "@/lib/calculateEmissions";
import type { EmissionDataset, EmissionMetrics } from "@/lib/types";

type EmissionDataContextValue = {
  dataset: EmissionDataset | null;
  metrics: EmissionMetrics | null;
  setDataset: (dataset: EmissionDataset) => void;
  reset: () => void;
};

const EmissionDataContext = createContext<EmissionDataContextValue | undefined>(
  undefined,
);

export function EmissionDataProvider({ children }: { children: ReactNode }) {
  const [dataset, setDatasetState] = useState<EmissionDataset | null>(null);

  const metrics = useMemo(() => {
    if (!dataset) return null;
    return calculateEmissions(dataset);
  }, [dataset]);

  const value = useMemo<EmissionDataContextValue>(
    () => ({
      dataset,
      metrics,
      setDataset: (nextDataset) => setDatasetState(nextDataset),
      reset: () => setDatasetState(null),
    }),
    [dataset, metrics],
  );

  return (
    <EmissionDataContext.Provider value={value}>
      {children}
    </EmissionDataContext.Provider>
  );
}

export function useEmissionData() {
  const context = useContext(EmissionDataContext);

  if (!context) {
    throw new Error("useEmissionData must be used within EmissionDataProvider");
  }

  return context;
}

