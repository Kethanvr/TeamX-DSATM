import type { Metadata } from "next";
import { JetBrains_Mono, Poppins } from "next/font/google";

import "@/styles/globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Providers } from "@/components/providers/Providers";

const poppins = Poppins({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "EcoMeter AI",
  description:
    "EcoMeter AI visualizes carbon emissions, forecasts reductions, and generates AI-driven sustainability actions.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppins.variable} ${jetbrainsMono.variable} bg-slate-50 text-slate-900`}
      >
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Navbar />
            <main className="flex-1 px-4 pb-16 pt-6 md:px-8">{children}</main>
            <Footer />
          </div>
        </Providers>
      </body>
    </html>
  );
}
