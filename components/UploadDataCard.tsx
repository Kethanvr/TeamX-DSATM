"use client";

import { useRef, useState } from "react";
import { Upload, Database, FileDown } from "lucide-react";
import { useRouter } from "next/navigation";

import type { EmissionDataset, EmissionRecord } from "@/lib/types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useEmissionData } from "@/components/providers/EmissionDataProvider";

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

  const handleDemoData = async () => {
    try {
      setErrorMessage(null);
      setIsLoading(true);
      const demoModule = await import("@/data/dummy_emission_data.json");
      const dataset = demoModule.default as EmissionDataset;
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
    <Card className="card-hover mx-auto max-w-2xl bg-white/90 shadow-lg shadow-emerald-100/40 backdrop-blur">
      <CardHeader>
        <Badge aria-label="Dataset selector badge" variant="secondary" className="w-fit">
          Load Emission Data
        </Badge>
        <CardTitle className="text-2xl font-bold text-slate-900">
          Start your sustainability analysis
        </CardTitle>
        <CardDescription className="text-base text-slate-600">
          Load the curated demo dataset or upload your own CSV with department-level activity data.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid gap-4 sm:grid-cols-2">
          <Button
            onClick={handleDemoData}
            aria-label="Use the built-in demo dataset"
            disabled={isLoading}
            className="h-24 justify-start gap-3 text-left text-base transition-transform active:scale-[0.98]"
          >
            <Database className="h-6 w-6" aria-hidden="true" />
            <div>
              <p className="font-semibold">Use Demo Dataset</p>
              <p className="text-sm opacity-80">
                Q4 data with pre-calculated emissions and forecasts.
              </p>
            </div>
          </Button>

          <Button
            variant="secondary"
            onClick={handleOpenFilePicker}
            aria-label="Upload a CSV file"
            disabled={isLoading}
            className="h-24 justify-start gap-3 text-left text-base transition-transform active:scale-[0.98]"
          >
            <Upload className="h-6 w-6 text-slate-600" aria-hidden="true" />
            <div>
              <p className="font-semibold text-slate-900">Upload CSV</p>
              <p className="text-sm text-slate-500">
                Expected columns: {REQUIRED_COLUMNS.join(", ")}
              </p>
            </div>
          </Button>
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

