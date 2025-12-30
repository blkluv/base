"use client";

import { useState, useEffect } from "react";
// This is your original functional component
import AuthAndBaseTx from "@/components/AuthAndBaseTx";

export default function Home() {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [amount, setAmount] = useState<string>("100");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Safe math parsing for the "Versus" calculator
  const numAmount = parseFloat(amount) || 0;
  const cashAppReceive = numAmount * 0.965; // ~3.5% fee
  const blkluvReceive = numAmount - 0.20;   // Flat gas fee

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex flex-col font-sans overflow-x-hidden text-white bg-black selection:bg-[#00D632]/30">
      
      {/* --- 1. BACKGROUND LAYER (LOCKED) --- 
          CRITICAL: pointer-events-none ensures these layers NEVER block your buttons.
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         {/* The Grain Texture */}
         <div className="bg-grain" />
         
         {/* The Moving Auras */}
         <div className="aura-spot aura-top" />
         <div className="aura-spot aura-bottom" />
         
         {/* Your Original subtle grid (Optional, added back for texture) */}
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:40px_40px] opacity-20" />
      </div>

      {/* --- 2. HEADER (Interactive) --- */}
      <nav className="relative z-10 w-full p-6 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter italic">BLKLUV.ORG</h1>
        <button 
          onClick={() => setShowWalletModal(true)}
          className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
        >
          About Wallet
        </button>
      </nav>

      {/* --- 3. MAIN INTERACTION (The "Hero") --- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 min-h-[50vh]">
        
        {/* Massive Input Wrapper */}
        <div className="relative w-full max-w-sm text-center space-y-2 animate-in fade-in zoom-in-95 duration-700">
          <p className="text-[#00D632] font-mono text-xs uppercase tracking-widest mb-4 opacity-80">
            Love in Motion
          </p>
          
          <div className="relative flex items-center justify-center">
            <span className="text-4xl sm:text-6xl font-bold text-white/40 mr-2">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="input-massive max-w-[300px] bg-transparent"
              autoFocus
            />
          </div>

          {/* Comparison Pills (The "Why Use Us" Logic) */}
          <div className="mt-10 inline-flex flex-col gap-2 w-full max-w-[280px]">
            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-white/5 border border-white/5 text-sm backdrop-blur-sm">
              <span className="text-zinc-500">Cash App takes</span>
              <span className="text-red-400 font-mono line-through decoration-red-500/50">
                ${(numAmount - cashAppReceive).toFixed(2)}
              </span>
            </div>
            
            <div className="flex justify-between items-center px-4 py-3 rounded-xl bg-[#00D632]/10 border border-[#00D632]/20 text-sm backdrop-blur-sm shadow-[0_0_20px_rgba(0,214,50,0.1)]">
              <span className="text-[#00D632] font-bold">Tribe keeps</span>
              <span className="text-[#00D632] font-mono font-bold">
                ${(numAmount - 0.20).toFixed(2)}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* --- 4. STICKY FOOTER ACTION (High Z-Index) --- */}
      <div className="relative z-20 w-full p-6 pb-12 bg-gradient-to-t from-black via-black/90 to-transparent">
        <div className="max-w-md mx-auto space-y-4">
          <button 
            onClick={() => setShowTransfer(true)}
            className="w-full btn-primary py-5 text-lg shadow-[0_0_40px_rgba(0,214,50,0.3)] hover:shadow-[0_0_60px_rgba(0,214,50,0.5)] active:scale-95 transition-all"
          >
            Send Love 💸
          </button>
          
          <p className="text-center text-zinc-600 text-[10px] tracking-wide uppercase">
            Simple. Peaceful. Tribe powered.
          </p>
        </div>
      </div>

      {/* --- 5. MODALS (Z-INDEX 50+) --- */}
      
      {/* TRANSFER MODAL - THIS CONTAINS YOUR REAL CODE */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
           {/* Backdrop */}
           <div 
             className="absolute inset-0 bg-black/90 backdrop-blur-xl"
             onClick={() => setShowTransfer(false)}
           />
           
           {/* Modal Card */}
           <div className="relative w-full max-w-md bg-zinc-900 border-t border-white/10 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">Connect & Send</h3>
                <button onClick={() => setShowTransfer(false)} className="text-zinc-500 hover:text-white p-2 text-xl">×</button>
              </div>
              
              {/* --- HERE IS THE MISSING PART RESTORED --- */}
              <div className="bg-black/40 border border-white/5 rounded-2xl p-1">
                 <AuthAndBaseTx />
              </div>
              {/* ----------------------------------------- */}
              
              <button 
                onClick={() => setShowTransfer(false)} 
                className="w-full mt-6 py-3 text-zinc-500 text-xs uppercase tracking-widest hover:text-white transition-colors"
              >
                Cancel Transaction
              </button>
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
           <div className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-2xl p-6 animate-in zoom-in-95 duration-200">
              <div className="text-center space-y-4">
                <div className="w-16 h-16 bg-[#AB9FF2]/20 text-[#AB9FF2] rounded-full flex items-center justify-center mx-auto text-3xl">
                  🟣
                </div>
                <h3 className="text-xl font-bold text-white">Phantom Wallet</h3>
                <p className="text-zinc-400 text-sm">
                  The simplest way to connect to Base and manage your community money.
                </p>
                <a 
                  href="https://phantom.app" 
                  target="_blank" 
                  rel="noreferrer"
                  className="block w-full bg-white text-black font-bold py-3 rounded-xl hover:bg-gray-200 transition-colors"
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