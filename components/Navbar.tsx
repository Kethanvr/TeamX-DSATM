"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Leaf, PanelsTopLeft } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin", label: "Admin" },
  { href: "/community", label: "Community" },
  { href: "/news", label: "Daily Insights" },
  { href: "/leaderboard", label: "Leaderboard" },
  { href: "/guide", label: "Guide" },
];

export function Navbar() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:px-8">
        <Link
          href="/"
          aria-label="EcoMeter AI Home"
          className="flex items-center gap-2 text-lg font-semibold"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-primary text-white shadow">
            <Leaf className="h-5 w-5" aria-hidden="true" />
          </div>
          <span className="gradient-text text-xl font-bold tracking-tight">
            EcoMeter AI
          </span>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-medium text-slate-600 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-label={`Navigate to ${item.label}`}
              className={cn(
                "transition-colors hover:text-slate-900",
                pathname.startsWith(item.href) && "text-slate-900",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button
            asChild
            variant="secondary"
            className="hidden md:inline-flex"
            aria-label="View sustainability dashboard"
          >
            <Link href="/dashboard" className="flex items-center gap-2">
              <PanelsTopLeft className="h-4 w-4" aria-hidden="true" />
              View Dashboard
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

