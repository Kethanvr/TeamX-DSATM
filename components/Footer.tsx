"use client";

import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-white py-6">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-slate-500 md:flex-row md:px-8">
        <p aria-label="EcoMeter AI copyright">
          © {new Date().getFullYear()} EcoMeter AI. Built for sustainable ops.
        </p>
        <div className="flex items-center gap-6">
          <Link href="/guide" aria-label="Open the EcoMeter usage guide">
            Usage Guide
          </Link>
          <Link href="/demo" aria-label="View the demo script">
            Demo Script
          </Link>
        </div>
      </div>
    </footer>
  );
}

