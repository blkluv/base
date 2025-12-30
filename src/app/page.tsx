"use client";

import { useState } from "react";
import AuthAndBaseTx from "@/components/AuthAndBaseTx";

export default function Home() {
  const [showTransfer, setShowTransfer] = useState(false);

  return (
    <main className="min-h-screen flex items-center justify-center p-5 bg-black relative">

      {/* Emerald Aura Background */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_900px_at_50%_-10%,#22c55e18,transparent)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_700px_at_50%_90%,#4ade8030,transparent)]" />

      <div className="z-10 w-full max-w-md mx-auto space-y-8 text-center">

        {/* Brand */}
        <h1 className="text-3xl font-bold tracking-tight text-white">
          BLKLUV.ORG
        </h1>

        {/* Balance Panel — Apple Wallet style */}
        <div className="glass-card neon-emerald aura py-8 rounded-2xl">
          <p className="text-zinc-400 text-xs mb-1">Balance</p>
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            $ — — —
          </h2>
        </div>

        {/* Primary Actions */}
        <div className="grid grid-cols-2 gap-3 text-sm">
          <button
            onClick={() => setShowTransfer(true)}
            className="bg-emerald-400/15 border border-emerald-400/40 rounded-full py-3 text-emerald-200"
          >
            Send Love 💸
          </button>

          <button
            onClick={() => setShowTransfer(true)}
            className="bg-white/5 border border-white/15 rounded-full py-3 text-white"
          >
            Support The Tribe 💚
          </button>
        </div>

        {/* Movement Benefit Statement */}
        <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl py-4 px-3 text-[13px] text-emerald-200 leading-snug">
          No banks. No Cash App fees.<br />
          Support your tribe — show your Luv. #BLKLUV
        </div>

        {/* Bottom-Sheet Transfer Panel */}
        {showTransfer && (
          <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end">

            <div className="w-full bg-black/70 border-t border-white/10 rounded-t-3xl glass-card p-4 pb-8">

              {/* Drag Handle */}
              <div className="flex justify-center mb-3">
                <div className="w-12 h-1.5 rounded-full bg-white/20" />
              </div>

              <AuthAndBaseTx />

              <button
                onClick={() => setShowTransfer(false)}
                className="mt-4 text-xs text-zinc-400"
              >
                Close
              </button>
            </div>
          </div>
        )}

      </div>
    </main>
  );
}