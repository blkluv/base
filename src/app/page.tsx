"use client";

import { useState, useEffect } from "react";
import AuthAndBaseTx from "@/components/AuthAndBaseTx";

export default function Home() {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showWalletModal, setShowWalletModal] = useState(false);
  const [amount, setAmount] = useState<string>("100");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const numAmount = parseFloat(amount) || 0;
  const cashAppReceive = numAmount * 0.965; 
  const blkluvReceive = numAmount - 0.20;

  if (!mounted) return null;

  return (
    <main className="relative min-h-screen w-full flex flex-col font-sans overflow-x-hidden text-white bg-black selection:bg-[#00D632]/30">
      
      {/* --- 1. BACKGROUND LAYER (LOCKED) --- 
          pointer-events-none ensures clicks pass through to the buttons 
      */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
         <div className="bg-grain" />
         <div className="aura-spot aura-top" />
         <div className="aura-spot aura-bottom" />
      </div>

      {/* --- 2. HEADER (Interactive) --- */}
      <nav className="relative z-10 w-full p-6 flex justify-between items-center">
        <h1 className="text-xl font-black tracking-tighter italic">BLKLUV</h1>
        <button 
          onClick={() => setShowWalletModal(true)}
          className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-xs font-bold hover:bg-white/10 transition-colors cursor-pointer"
        >
          Connect Wallet
        </button>
      </nav>

      {/* --- 3. MAIN INTERACTION --- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 min-h-[50vh]">
        
        {/* Massive Input Wrapper */}
        <div className="relative w-full max-w-sm text-center space-y-2 animate-in fade-in zoom-in-95 duration-700">
          <p className="text-[#00D632] font-mono text-xs uppercase tracking-widest mb-4 opacity-80">
            Send to Family
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

          {/* Comparison Pills */}
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
            onClick={() => {
              console.log("Button Clicked"); // Debug check
              setShowTransfer(true);
            }}
            className="w-full btn-primary py-5 text-lg shadow-[0_0_40px_rgba(0,214,50,0.3)] hover:shadow-[0_0_60px_rgba(0,214,50,0.5)] active:scale-95 transition-all"
          >
            Send Love
          </button>
          
          <p className="text-center text-zinc-600 text-[10px] tracking-wide uppercase">
            Built on Base • Secured by Math
          </p>
        </div>
      </div>

      {/* --- 5. MODALS (Z-INDEX 50+) --- */}
      
      {/* Transfer Modal */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
           <div 
             className="absolute inset-0 bg-black/90 backdrop-blur-xl"
             onClick={() => setShowTransfer(false)}
           />
           <div className="relative w-full max-w-md bg-zinc-900 border-t border-white/10 rounded-t-3xl p-6 animate-in slide-in-from-bottom duration-300 shadow-2xl">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-white font-bold text-lg">Confirm Send</h3>
                <button onClick={() => setShowTransfer(false)} className="text-zinc-500 hover:text-white p-2">✕</button>
              </div>
              
              <div className="bg-black/50 p-4 rounded-xl border border-white/5 mb-6">
                 <AuthAndBaseTx />
              </div>
              
              <button 
                onClick={() => setShowTransfer(false)} 
                className="w-full py-3 text-zinc-500 text-sm hover:text-white transition-colors"
              >
                Cancel
              </button>
           </div>
        </div>
      )}

      {/* Wallet Modal */}
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