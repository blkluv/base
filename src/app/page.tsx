"use client";

import { useState, useEffect } from "react";
import AuthAndBaseTx from "@/components/AuthAndBaseTx";

export default function Home() {
  const [showTransfer, setShowTransfer] = useState(false);
  const [amount, setAmount] = useState<string>("100"); // String for direct input control
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Safe math parsing
  const numAmount = parseFloat(amount) || 0;
  const cashAppReceive = numAmount * 0.965; // ~3.5% fee
  const blkluvReceive = numAmount - 0.20;   // Flat gas fee

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex flex-col font-sans">
      
      {/* Background Ambience */}
      <div className="bg-grain" />
      <div className="aura-spot aura-top" />
      <div className="aura-spot aura-bottom" />

      {/* --- HEADER --- */}
      <nav className="relative z-10 w-full p-6 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter italic">BLKLUV</h1>
        <button className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold hover:bg-white/10 transition-colors">
          Connect Wallet
        </button>
      </nav>

      {/* --- MAIN INTERACTION (The "Hero") --- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 min-h-[60vh]">
        
        {/* The "Cash App" Style Input */}
        <div className="relative w-full max-w-sm text-center space-y-2 animate-in fade-in zoom-in-95 duration-700">
          <p className="text-emerald-400 font-mono text-xs uppercase tracking-widest mb-4">
            Send to Family
          </p>
          
          <div className="relative flex items-center justify-center">
            <span className="text-4xl sm:text-6xl font-bold text-white/40 mr-2">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="input-massive max-w-[300px]"
              autoFocus
            />
          </div>

          {/* The "Versus" Pill */}
          <div className="mt-8 inline-flex flex-col gap-2 w-full max-w-[280px]">
            {/* Competitor Reality Check */}
            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm">
              <span className="text-zinc-500">Cash App takes</span>
              <span className="text-red-400 font-mono line-through decoration-red-500/50">
                ${(numAmount - cashAppReceive).toFixed(2)}
              </span>
            </div>
            
            {/* The Win */}
            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#00D632]/10 border border-[#00D632]/20 text-sm">
              <span className="text-[#00D632]">Tribe keeps</span>
              <span className="text-[#00D632] font-mono font-bold">
                ${(numAmount - 0.20).toFixed(2)}
              </span>
            </div>
          </div>

        </div>
      </div>

      {/* --- STICKY FOOTER ACTION --- */}
      <div className="relative z-20 w-full p-6 pb-10 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-md mx-auto space-y-3">
          <button 
            onClick={() => setShowTransfer(true)}
            className="w-full btn-primary py-5 text-lg shadow-[0_0_40px_rgba(0,214,50,0.4)]"
          >
            Send Love
          </button>
          
          <p className="text-center text-zinc-600 text-[10px] tracking-wide uppercase">
            Built on Base • Secured by Math • Powered by Culture
          </p>
        </div>
      </div>

      {/* --- MODAL (Transfer) --- */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
           <div 
             className="absolute inset-0 bg-black/90 backdrop-blur-md"
             onClick={() => setShowTransfer(false)}
           />
           <div className="relative w-full max-w-md bg-zinc-900 border-t border-white/10 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">Confirm Send</h3>
                <button onClick={() => setShowTransfer(false)} className="text-zinc-500 hover:text-white">✕</button>
              </div>
              
              <AuthAndBaseTx />
              
           </div>
        </div>
      )}

    </main>
  );
}