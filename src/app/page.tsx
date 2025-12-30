"use client";

import { useState, useEffect } from "react";
import AuthAndBaseTx from "@/components/AuthAndBaseTx"; // Ensure path matches your project

export default function Home() {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  
  // Default to empty string or "0" so the placeholder shows first, 
  // or "100" if you want a default value.
  const [amount, setAmount] = useState<string>("100"); 
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Safe math for the "Versus" comparison
  const numAmount = parseFloat(amount) || 0;
  const cashAppReceive = numAmount * 0.965; // ~3.5% fee assumption
  const blkluvReceive = numAmount - 0.05;   // Base gas is usually <$0.05

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex flex-col font-sans overflow-x-hidden text-white bg-black selection:bg-[#00D632]/30">
      
      {/* --- 1. BACKGROUND LAYER (LOCKED) --- 
          pointer-events-none is critical here so the background 
          never blocks your clicks.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="bg-grain" />
         <div className="aura-spot aura-top" />
         <div className="aura-spot aura-bottom" />
      </div>

      {/* --- 2. HEADER --- */}
      <nav className="relative z-10 w-full p-6 flex justify-between items-center animate-in fade-in duration-1000">
        <h1 className="text-xl font-black tracking-tighter italic flex items-center gap-1">
          BLK<span className="text-[#00D632]">LUV</span>
        </h1>
        <button 
          onClick={() => setShowWalletModal(true)}
          className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
        >
          About Wallet
        </button>
      </nav>

      {/* --- 3. MAIN HERO (Massive Input) --- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 min-h-[50vh]">
        
        <div className="relative w-full max-w-sm text-center space-y-2 animate-in fade-in zoom-in-95 duration-700">
          <p className="text-[#00D632] font-mono text-[10px] uppercase tracking-[0.2em] mb-4 opacity-80">
            Send Money, Not Fees
          </p>
          
          <div className="relative flex items-center justify-center">
            {/* Dollar Sign */}
            <span className="text-4xl sm:text-6xl font-bold text-white/30 mr-2">$</span>
            
            {/* The Massive Input */}
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="input-massive max-w-[300px] bg-transparent"
              autoFocus
            />
          </div>

          {/* VS Pills (Comparison) */}
          <div className="mt-12 inline-flex flex-col gap-3 w-full max-w-[280px]">
            {/* Competitor */}
            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm backdrop-blur-sm group hover:bg-white/10 transition-colors">
              <span className="text-zinc-500 text-xs uppercase font-bold tracking-wider">Cash App</span>
              <span className="text-red-400 font-mono line-through decoration-red-500/50 opacity-70 group-hover:opacity-100 transition-opacity">
                ${(numAmount - cashAppReceive).toFixed(2)}
              </span>
            </div>
            
            {/* You */}
            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#00D632]/5 border border-[#00D632]/20 text-sm backdrop-blur-sm shadow-[0_0_20px_rgba(0,214,50,0.05)]">
              <span className="text-[#00D632] text-xs uppercase font-bold tracking-wider">Tribe Keeps</span>
              <span className="text-[#00D632] font-mono font-bold text-lg">
                ${(numAmount - 0.20).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. STICKY FOOTER --- */}
      <div className="relative z-20 w-full p-6 pb-12 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-md mx-auto space-y-4">
          <button 
            onClick={() => setShowTransfer(true)}
            className="w-full btn-primary py-5 text-lg shadow-[0_0_40px_rgba(0,214,50,0.3)] hover:shadow-[0_0_60px_rgba(0,214,50,0.5)] active:scale-95 transition-all"
          >
            Send Love 💸
          </button>
          
          <p className="text-center text-zinc-600 text-[10px] tracking-widest uppercase">
            Built on Base • Secured by Math
          </p>
        </div>
      </div>

      {/* --- 5. MODALS --- */}
      
      {/* TRANSFER MODAL (The Engine) */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
           {/* Dark Backdrop */}
           <div 
             className="absolute inset-0 bg-black/90 backdrop-blur-xl"
             onClick={() => setShowTransfer(false)}
           />
           
           {/* Modal Container */}
           <div className="relative w-full max-w-md bg-transparent animate-in slide-in-from-bottom duration-300 z-50 p-4 sm:p-0">
              
              {/* Close Button */}
              <div className="flex justify-end mb-4 sm:absolute sm:-top-10 sm:right-0">
                 <button 
                   onClick={() => setShowTransfer(false)} 
                   className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20 hover:text-white transition-colors"
                 >
                   ✕
                 </button>
              </div>

              {/* YOUR LUXURY WALLET COMPONENT */}
              {/* We pass the 'amount' state here */}
              <AuthAndBaseTx prefilledAmount={amount} />
              
           </div>
        </div>
      )}

      {/* WALLET INFO MODAL */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div 
             className="absolute inset-0 bg-black/80 backdrop-blur-md"
             onClick={() => setShowWalletModal(false)}
           />
           <div className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-3xl p-8 animate-in zoom-in-95 duration-200 shadow-2xl">
              <div className="text-center space-y-6">
                <div className="w-20 h-20 bg-[#AB9FF2]/10 text-[#AB9FF2] rounded-full flex items-center justify-center mx-auto text-4xl shadow-[0_0_30px_rgba(171,159,242,0.2)]">
                  🟣
                </div>
                <div className="space-y-2">
                    <h3 className="text-2xl font-black text-white tracking-tight">Phantom Wallet</h3>
                    <p className="text-zinc-400 text-sm leading-relaxed">
                      The simplest way to connect to Base. Store your crypto, send to friends, and keep 100% of your money.
                    </p>
                </div>
                <a 
                  href="https://phantom.app" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full bg-white text-black font-bold py-4 rounded-xl hover:bg-zinc-200 transition-colors text-sm uppercase tracking-wider"
                >
                  Download Phantom
                </a>
              </div>
           </div>
        </div>
      )}

    </main>
  );
}