"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import AuthAndBaseTx from "@/components/AuthAndBaseTx"; 

export default function Home() {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [amount, setAmount] = useState<string>("100"); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Comparison Math
  const numAmount = parseFloat(amount) || 0;
  const cashAppReceive = numAmount * 0.965; // ~3.5% fees
  const blkluvReceive = numAmount - 0.05;   // Base gas <$0.05

  if (!mounted) return null;

  return (
    <main className="relative h-[100dvh] w-full flex flex-col font-sans overflow-hidden text-white bg-black selection:bg-[#00D632]/30">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-zinc-900/40 via-black to-black">
         <div className="bg-grain" />
         <div className="aura-spot aura-top opacity-20" />
      </div>

      {/* --- HEADER --- */}
      <nav className="relative z-20 w-full p-6 flex justify-between items-center shrink-0">
        {/* LOGO: BLK=White, LUV=Green */}
        <h1 className="text-xl font-black tracking-tighter italic flex items-center">
          BLK<span className="text-[#00D632]">LUV</span>.ORG
        </h1>
        
        <div className="flex items-center gap-3">
            {/* NEW: Comparison Page Button */}
            <Link 
              href="/blkluvorg-vs-cashapp"
              className="hidden sm:block px-3 py-1.5 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 hover:text-[#00D632] transition-colors"
            >
              Vs Cash App
            </Link>

            {/* Wallet Info Button */}
            <button 
              onClick={() => setShowWalletModal(true)}
              className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="w-2 h-2 rounded-full bg-[#00D632] animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-zinc-300">Wallet</span>
            </button>
        </div>
      </nav>

      {/* --- MAIN STAGE: INPUT & ACTION --- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6">
        
        {/* INPUT DISPLAY */}
        <div className="w-full text-center space-y-2 mb-12 animate-in fade-in zoom-in-95 duration-700">
          <p className="text-[#00D632] text-[10px] font-bold tracking-[0.2em] uppercase opacity-80 mb-2">
            Send Money, Not Fees
          </p>
          <div className="relative flex items-center justify-center">
            <span className="text-5xl sm:text-7xl font-bold text-white/30 mr-2">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="input-massive max-w-[300px] bg-transparent text-6xl sm:text-8xl p-0"
              autoFocus
            />
          </div>
        </div>

        {/* ACTION BUTTON */}
        <button 
            onClick={() => setShowTransfer(true)}
            className="w-full max-w-[320px] btn-primary py-5 text-xl shadow-[0_0_40px_rgba(0,214,50,0.3)] hover:scale-[1.02] active:scale-95 transition-all"
        >
            Send Amount 💸
        </button>

      </div>

      {/* --- FOOTER: COMPARISON BAR --- */}
      <div className="relative z-20 w-full bg-[#09090b] border-t border-white/5 shrink-0 pb-safe">
        <div className="max-w-md mx-auto px-6 py-6">
            <div className="flex items-center justify-between text-xs mb-3">
                <span className="text-zinc-500 font-bold uppercase tracking-wider text-[10px]">Fee Breakdown</span>
                <span className="text-[#00D632] font-bold text-[10px]">You save ~${(numAmount * 0.035).toFixed(2)}</span>
            </div>
            
            {/* COMPARISON VISUAL */}
            <div className="w-full h-10 bg-black rounded-md flex items-center relative overflow-hidden border border-white/10">
                {/* Cash App Segment */}
                <div className="h-full flex items-center justify-center bg-red-900/20 text-red-500 w-[30%] text-[10px] font-mono border-r border-white/5">
                    <span className="mr-2 opacity-50 hidden sm:inline">CASH APP</span>
                    <span className="mr-2 opacity-50 sm:hidden">CASH</span>
                    -${(numAmount - cashAppReceive).toFixed(2)}
                </div>
                {/* BLKLUV Segment */}
                <div className="h-full flex-1 flex items-center justify-between px-4 bg-[#00D632]/5 text-[#00D632]">
                    <span className="text-[10px] font-bold uppercase opacity-70">BLKLUV Tribe</span>
                    <span className="font-mono text-sm font-bold">${(numAmount - 0.05).toFixed(2)}</span>
                </div>
            </div>
        </div>
      </div>

      {/* --- TRANSFER MODAL (Solid Background Fix) --- */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
           <div 
             className="absolute inset-0 bg-black/80 backdrop-blur-md"
             onClick={() => setShowTransfer(false)}
           />
           {/* Modal Wrapper with SOLID #09090b Background */}
           <div className="relative w-full max-w-md bg-[#09090b] border-t sm:border border-white/10 sm:rounded-3xl rounded-t-3xl p-0 animate-in slide-in-from-bottom duration-300 shadow-2xl overflow-hidden">
              <div className="flex justify-between items-center p-4 border-b border-white/5 bg-black/40">
                 <h3 className="text-white font-bold text-sm uppercase tracking-wider">Confirm Transaction</h3>
                 <button onClick={() => setShowTransfer(false)} className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-white/50 hover:bg-white/10">✕</button>
              </div>
              <div className="p-4 bg-[#09090b]">
                  {/* Pass the amount prop here */}
                  <AuthAndBaseTx prefilledAmount={amount} />
              </div>
           </div>
        </div>
      )}

      {/* --- WALLET INFO MODAL --- */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setShowWalletModal(false)} />
           <div className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-8 animate-in zoom-in-95">
                <div className="text-center space-y-4">
                    <div className="w-14 h-14 bg-[#AB9FF2]/10 text-[#AB9FF2] rounded-full flex items-center justify-center mx-auto text-2xl">🟣</div>
                    <h3 className="text-lg font-bold text-white">Phantom Wallet</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">
                        The simplest way to connect to Base. Store your crypto, send to friends, and keep 100% of your money.
                    </p>
                    <a href="https://phantom.app" target="_blank" rel="noreferrer" className="block w-full bg-white text-black font-bold py-3 rounded-lg text-xs uppercase tracking-wider hover:bg-zinc-200">
                        Download App
                    </a>
                </div>
           </div>
        </div>
      )}

    </main>
  );
}