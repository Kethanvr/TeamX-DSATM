"use client";

import { useRef, useState } from "react";
import { Upload, Database, FileDown, Sparkles } from "lucide-react";
import { useRouter } from "next/navigation";

import type { EmissionDataset, EmissionRecord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEmissionData } from "@/components/providers/EmissionDataProvider";

type DemoDatasetMeta = {
  id: string;
  title: string;
  description: string;
  loader: () => Promise<EmissionDataset>;
};

const DEMO_DATASETS: DemoDatasetMeta[] = [
  {
    id: "manufacturing",
    title: "ABC Manufacturing · Q4 2025",
    description: "Heavy manufacturing operations with electricity audits and business travel.",
    loader: async () =>
      (await import("@/data/dummy_emission_data.json")).default as EmissionDataset,
  },
  {
    id: "logistics",
    title: "Nova Logistics · Fleet 2025",
    description: "Long-haul trucking vs air freight with seasonal fuel surges.",
    loader: async () =>
      (await import("@/data/dummy_emission_data_logistics.json"))
        .default as EmissionDataset,
  },
  {
    id: "energy",
    title: "HelioTech Energy · Q1 2026",
    description: "Hybrid solar plants balancing storage, backup diesel, and site travel.",
    loader: async () =>
      (await import("@/data/dummy_emission_data_energy.json")).default as EmissionDataset,
  },
];

const REQUIRED_COLUMNS = [
  "department",
  "month",
  "quantity",
  "unit",
  "emission_factor",
];

const SAMPLE_CSV = `department,month,quantity,unit,emission_factor
Transport,2025-01,480,L,2.68
Electricity,2025-01,1190,kWh,0.82
Travel,2025-01,18,trips,245
Manufacturing,2025-01,300,kg,1.36`;

function parseCsv(text: string): EmissionRecord[] {
  const [headerLine, ...lines] = text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean);

  if (!headerLine) {
    throw new Error("The uploaded CSV has no header row.");
  }

  const headers = headerLine.split(",").map((header) => header.trim().toLowerCase());
  const missingColumns = REQUIRED_COLUMNS.filter(
    (column) => !headers.includes(column),
  );

  if (missingColumns.length > 0) {
    throw new Error(
      `Missing required columns: ${missingColumns.join(", ")}. Expected header: ${REQUIRED_COLUMNS.join(", ")}`,
    );
  }

  return lines.map((line, lineIndex) => {
    const values = line.split(",").map((value) => value.trim());
    if (values.length !== headers.length) {
      throw new Error(
        `Line ${lineIndex + 2} has ${values.length} values but ${headers.length} headers.`,
      );
    }

    const record: Partial<EmissionRecord> = {};
    headers.forEach((header, index) => {
      const value = values[index];
      if (header === "quantity" || header === "emission_factor") {
        const numeric = Number.parseFloat(value);
        if (Number.isNaN(numeric)) {
          throw new Error(
            `Line ${lineIndex + 2} has non-numeric value "${value}" in column "${header}".`,
          );
        }

        record[header as "quantity" | "emission_factor"] = numeric;
      } else {
        record[header as Exclude<keyof EmissionRecord, "quantity" | "emission_factor">] = value;
      }
    });

    return record as EmissionRecord;
  });
}

function downloadSampleCsv() {
  const blob = new Blob([SAMPLE_CSV], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = "sample_upload.csv";
  anchor.click();
  URL.revokeObjectURL(url);
}

export function UploadDataCard() {
  const { setDataset } = useEmissionData();
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [selectedDatasetId, setSelectedDatasetId] = useState<string>(DEMO_DATASETS[0]?.id ?? "");

  const handleDemoData = async () => {
    try {
      setErrorMessage(null);
      setIsLoading(true);
      const selectedDataset = DEMO_DATASETS.find((dataset) => dataset.id === selectedDatasetId);
      if (!selectedDataset) {
        throw new Error("Select a demo scenario before loading.");
      }
      const dataset = await selectedDataset.loader();
      setDataset(dataset);
      router.push("/dashboard");
    } catch (error) {
      console.error(error);
      setErrorMessage("Unable to load the demo dataset. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenFilePicker = () => {
    inputRef.current?.click();
  };

  const handleCsvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsLoading(true);
    setErrorMessage(null);
    try {
      const text = await file.text();
      const records = parseCsv(text);
      const dataset: EmissionDataset = {
        company: "Uploaded Dataset",
        period: "Latest Upload",
        departments: records,
      };
      setDataset(dataset);
      router.push("/dashboard");
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      } else {
        setErrorMessage("We could not parse that CSV file. Please check the format.");
      }
    } finally {
      setIsLoading(false);
      event.target.value = "";
    }
  };

  return (
    <Card className="card-hover mx-auto max-w-3xl bg-white/95 shadow-lg shadow-emerald-100/40 backdrop-blur">
      <CardHeader>
        <Badge aria-label="Dataset selector badge" variant="secondary" className="w-fit">
          Load Emission Data
        </Badge>
        <CardTitle className="flex items-center gap-2 text-2xl font-bold text-slate-900">
          <Sparkles className="h-5 w-5 text-emerald-500" aria-hidden="true" />
          Start your sustainability analysis
        </CardTitle>
        <CardDescription className="text-base text-slate-600">
          Load a curated industry scenario or upload your own CSV with department-level activity data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-7">
        <div className="grid gap-4 md:grid-cols-[1.2fr_0.8fr]">
          <div className="space-y-3">
            <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
              Demo scenarios
            </p>
            <div className="grid gap-3">
              {DEMO_DATASETS.map((dataset) => {
                const isSelected = dataset.id === selectedDatasetId;
                return (
                  <button
                    key={dataset.id}
                    type="button"
                    onClick={() => setSelectedDatasetId(dataset.id)}
                    aria-label={`Select ${dataset.title}`}
                    className={`rounded-2xl border px-4 py-4 text-left transition-all duration-150 ${
                      isSelected
                        ? "border-emerald-300 bg-emerald-50 shadow-sm"
                        : "border-slate-200 hover:border-emerald-200 hover:bg-emerald-50/60"
                    }`}
                  >
                    <p className="text-sm font-semibold text-slate-900">{dataset.title}</p>
                    <p className="text-sm text-slate-600">{dataset.description}</p>
                  </button>
                );
              })}
            </div>
            <Button
              onClick={handleDemoData}
              aria-label="Load selected demo dataset"
              disabled={isLoading}
              className="w-full justify-center gap-2"
            >
              <Database className="h-5 w-5" aria-hidden="true" />
              Launch selected scenario
            </Button>
          </div>

          <div className="flex h-full flex-col justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/70 p-5">
            <div className="space-y-3">
              <p className="text-sm font-semibold uppercase tracking-wide text-slate-500">
                Upload CSV
              </p>
              <p className="text-sm text-slate-600">
                Bring your own activity data with the expected columns below. We validate column
                headers, numeric fields, and month formatting before loading the dashboard.
              </p>
              <div className="rounded-xl border border-dashed border-slate-300 bg-white p-4 text-xs font-medium uppercase tracking-wide text-slate-500">
                {REQUIRED_COLUMNS.join(" · ")}
              </div>
            </div>
            <Button
              variant="secondary"
              onClick={handleOpenFilePicker}
              aria-label="Upload a CSV file"
              disabled={isLoading}
              className="justify-center gap-2"
            >
              <Upload className="h-5 w-5" aria-hidden="true" />
              Browse CSV
            </Button>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept=".csv"
            className="hidden"
            onChange={handleCsvUpload}
            aria-hidden="true"
          />
        </div>

        {isLoading && (
          <p className="text-sm font-medium text-blue-600" role="status">
            Processing data… hang tight.
          </p>
        )}

        {errorMessage && (
          <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-600">
            {errorMessage}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500">
          <span aria-label="Upload help text">
            Need an example? Download the template CSV.
          </span>
          <Button
            variant="ghost"
            onClick={downloadSampleCsv}
            aria-label="Download sample CSV"
            className="gap-2 text-slate-700 hover:text-slate-900"
          >
            <FileDown className="h-4 w-4" aria-hidden="true" />
            Sample CSV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

