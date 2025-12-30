import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThirdwebProvider } from "thirdweb/react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BLKLUV.ORG",
  description: "Send. Share. Support ya tribe.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black relative overflow-hidden`}>

        {/* 🌿 Soft Emerald Aura Background */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(circle_900px_at_50%_-10%,#22c55e18,transparent)]" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_90%,#4ade8030,transparent)]" />
        </div>

        {/* ✨ Subtle Floating Particles (calm, not flashy) */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.25]">
          <div className="aura animate-pulse-slow" />
        </div>

        <ThirdwebProvider>
          {children}
        </ThirdwebProvider>

      </body>
    </html>
  );
}