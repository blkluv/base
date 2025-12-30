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
  const blkluvReceive = numAmount - 0.05;

  if (!mounted) return null;

  return (
    <main className="relative h-screen w-full flex flex-col font-sans overflow-hidden text-white bg-black selection:bg-[#00D632]/30">
      
      {/* --- BACKGROUND LAYER --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="bg-grain" />
         <div className="aura-spot aura-top" />
         <div className="aura-spot aura-bottom" />
      </div>

      {/* --- HEADER: BRAND & WALLET --- */}
      <nav className="relative z-20 w-full p-6 flex justify-between items-center shrink-0">
        <h1 className="text-xl font-black tracking-tighter italic flex items-center gap-1">
          BLK<span className="text-[#00D632]">LUV</span>
        </h1>
        <button 
          onClick={() => setShowWalletModal(true)}
          className="px-4 py-2 rounded-full border border-white/10 bg-white/5 text-[10px] font-bold uppercase tracking-widest hover:bg-white/10 transition-colors cursor-pointer"
        >
          Wallet Connected ●
        </button>
      </nav>

      {/* --- MAIN STAGE: INPUT & ACTION --- */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center w-full max-w-md mx-auto px-6 pb-20">
        
        {/* 1. The Input */}
        <div className="relative w-full text-center space-y-4 mb-10">
          <div className="relative flex items-center justify-center">
            <span className="text-5xl sm:text-7xl font-bold text-white/30 mr-2">$</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0"
              className="input-massive max-w-[300px] bg-transparent text-6xl sm:text-8xl"
              autoFocus
            />
          </div>
          <p className="text-zinc-500 text-xs font-medium tracking-widest uppercase">
            No Fees. No Middleman.
          </p>
        </div>

        {/* 2. The ACTION Button (Center Stage) */}
        <button 
            onClick={() => setShowTransfer(true)}
            className="w-full max-w-xs btn-primary py-5 text-xl shadow-[0_0_50px_rgba(0,214,50,0.4)] hover:scale-105 active:scale-95 transition-all"
        >
            Send Amount 💸
        </button>

      </div>

      {/* --- FOOTER: THE COMPARISON / EDUCATION --- */}
      <div className="relative z-10 w-full bg-zinc-900/50 backdrop-blur-md border-t border-white/5 shrink-0">
        <div className="max-w-md mx-auto px-6 py-6">
            <div className="flex items-center justify-between text-xs mb-2">
                <span className="text-zinc-500 font-bold uppercase tracking-wider">Reality Check</span>
                <span className="text-[#00D632]">You save ~${(numAmount * 0.035).toFixed(2)}</span>
            </div>
            
            {/* The Comparison Bar */}
            <div className="w-full h-12 bg-black/50 rounded-lg flex items-center relative overflow-hidden border border-white/5">
                {/* Cash App Segment (Loss) */}
                <div className="h-full flex items-center justify-center bg-red-500/10 text-red-500/70 border-r border-white/5 w-[30%] text-[10px] font-mono relative">
                    <span className="absolute top-1 left-2 text-[8px] uppercase opacity-50">Cash App</span>
                    -${(numAmount - cashAppReceive).toFixed(2)}
                </div>
                
                {/* Tribe Segment (Win) */}
                <div className="h-full flex-1 flex items-center justify-between px-4 bg-[#00D632]/5 text-[#00D632] relative">
                    <span className="absolute top-1 left-2 text-[8px] uppercase opacity-50">Tribe Keeps</span>
                    <span className="font-mono text-sm font-bold ml-auto">
                        ${(numAmount - 0.05).toFixed(2)}
                    </span>
                </div>
            </div>
            
            <p className="text-center text-zinc-600 text-[9px] mt-4 uppercase tracking-widest">
                Powered by Base Network
            </p>
        </div>
      </div>

      {/* --- MODALS --- */}
      
      {/* TRANSFER MODAL */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
           <div 
             className="absolute inset-0 bg-black/90 backdrop-blur-xl"
             onClick={() => setShowTransfer(false)}
           />
           <div className="relative w-full max-w-md bg-zinc-900 border-t sm:border border-white/10 sm:rounded-3xl rounded-t-3xl p-0 animate-in slide-in-from-bottom duration-300 shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-white/5 bg-black/20">
                 <h3 className="text-white font-bold text-lg">Send Money</h3>
                 <button onClick={() => setShowTransfer(false)} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70 hover:bg-white/20">✕</button>
              </div>

              {/* Wallet Component */}
              <div className="p-6">
                  <AuthAndBaseTx prefilledAmount={amount} />
              </div>
           </div>
        </div>
      )}

      {/* WALLET INFO MODAL */}
      {showWalletModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={() => setShowWalletModal(false)} />
           <div className="relative w-full max-w-sm bg-[#111] border border-white/10 rounded-3xl p-8 animate-in zoom-in-95 duration-200">
                <div className="text-center space-y-4">
                    <div className="w-16 h-16 bg-[#AB9FF2]/10 text-[#AB9FF2] rounded-full flex items-center justify-center mx-auto text-3xl">🟣</div>
                    <h3 className="text-xl font-black text-white">Phantom Wallet</h3>
                    <p className="text-zinc-400 text-sm">The simplest way to connect to Base.</p>
                    <a href="https://phantom.app" target="_blank" rel="noreferrer" className="block w-full bg-white text-black font-bold py-4 rounded-xl text-sm uppercase tracking-wider">Download</a>
                </div>
           </div>
        </div>
      )}

    </main>
  );
}