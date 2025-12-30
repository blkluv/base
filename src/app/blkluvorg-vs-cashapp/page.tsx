"use client";

import Link from "next/link";
import { ArrowLeft, Check, X, Smartphone, Globe, ShieldCheck } from "lucide-react";

export default function SaveMoneyVsCashApp() {
  return (
    <main className="relative min-h-screen w-full font-sans text-white bg-black selection:bg-[#00D632]/30 overflow-x-hidden">
      
      {/* --- BACKGROUND LAYERS --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
         <div className="bg-grain" />
         <div className="aura-spot aura-top opacity-30" />
         <div className="aura-spot aura-bottom opacity-20" />
      </div>

      {/* --- NAV --- */}
      <nav className="relative z-20 w-full p-6 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 text-zinc-400 hover:text-white transition-colors group">
          <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
          <span className="text-xs font-bold uppercase tracking-widest">Back to Sender</span>
        </Link>
      </nav>

      {/* --- CONTENT --- */}
      <div className="relative z-10 max-w-2xl mx-auto px-6 pb-24 pt-10">

        {/* HERO */}
        <div className="text-center space-y-4 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <h1 className="text-4xl sm:text-5xl font-black tracking-tighter italic">
            THE COST OF <br /><span className="text-[#00D632]">CONVENIENCE</span>
          </h1>
          <p className="text-zinc-400 text-sm max-w-md mx-auto leading-relaxed">
            Cash App and Venmo are banks in disguise. They charge you to move your own money. 
            <span className="text-white font-bold block mt-2">BLKLUV is different.</span>
          </p>
        </div>

        {/* --- COMPARISON CARDS --- */}
        <div className="grid gap-6 md:grid-cols-2 mb-16">
            
            {/* CARD 1: THE OLD WAY (Cash App) */}
            <div className="bg-zinc-900/50 border border-red-500/20 rounded-3xl p-6 backdrop-blur-sm relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-40 transition-opacity">
                    <X className="text-red-500 w-12 h-12" />
                </div>
                <h3 className="text-red-500 font-bold text-sm uppercase tracking-widest mb-1">Old Money</h3>
                <h2 className="text-2xl font-black text-white mb-6">Cash App / Venmo</h2>
                
                <ul className="space-y-4">
                    <li className="flex gap-3 text-sm text-zinc-400">
                        <span className="text-red-500 font-bold">− 3%</span>
                        Instant Transfer Fees
                    </li>
                    <li className="flex gap-3 text-sm text-zinc-400">
                        <span className="text-red-500 font-bold">− 2.75%</span>
                        Card Processing Fees
                    </li>
                    <li className="flex gap-3 text-sm text-zinc-400">
                        <span className="text-red-500 font-bold">Limited</span>
                        Only works in your country
                    </li>
                    <li className="flex gap-3 text-sm text-zinc-400">
                        <span className="text-red-500 font-bold">Frozen</span>
                        They can lock your account
                    </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-white/5">
                    <p className="text-xs text-zinc-500 uppercase tracking-widest mb-2">You Send $100</p>
                    <div className="flex justify-between items-end">
                        <span className="text-3xl font-mono font-bold text-red-400">$94.00</span>
                        <span className="text-xs text-red-500/50 font-mono">Arrives</span>
                    </div>
                </div>
            </div>

            {/* CARD 2: THE NEW WAY (BLKLUV) */}
            <div className="bg-zinc-900/80 border border-[#00D632]/30 rounded-3xl p-6 backdrop-blur-md relative overflow-hidden shadow-[0_0_40px_rgba(0,214,50,0.1)]">
                <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Check className="text-[#00D632] w-12 h-12" />
                </div>
                <h3 className="text-[#00D632] font-bold text-sm uppercase tracking-widest mb-1">New Money</h3>
                <h2 className="text-2xl font-black text-white mb-6">BLKLUV + Phantom</h2>
                
                <ul className="space-y-4">
                    <li className="flex gap-3 text-sm text-white">
                        <span className="text-[#00D632] font-bold">0%</span>
                        No Middleman Fees
                    </li>
                    <li className="flex gap-3 text-sm text-white">
                        <span className="text-[#00D632] font-bold">Global</span>
                        Send anywhere instantly
                    </li>
                    <li className="flex gap-3 text-sm text-white">
                        <span className="text-[#00D632] font-bold">Yours</span>
                        Nobody can freeze your funds
                    </li>
                    <li className="flex gap-3 text-sm text-white">
                        <span className="text-[#00D632] font-bold">Growth</span>
                        Earn interest on savings
                    </li>
                </ul>

                <div className="mt-8 pt-6 border-t border-[#00D632]/20">
                    <p className="text-xs text-[#00D632] uppercase tracking-widest mb-2">You Send $100</p>
                    <div className="flex justify-between items-end">
                        <span className="text-3xl font-mono font-bold text-[#00D632]">$99.95</span>
                        <span className="text-xs text-[#00D632]/50 font-mono">Arrives</span>
                    </div>
                </div>
            </div>
        </div>

        {/* --- EDUCATION SECTION (PHANTOM) --- */}
        <div className="space-y-8 mb-20">
            <h2 className="text-2xl font-black text-center italic tracking-tight">
                "BUT IT'S CRYPTO..." 
                <span className="block text-[#00D632] text-lg font-normal not-italic font-sans mt-2 tracking-normal">
                    (It's actually just better money)
                </span>
            </h2>

            <div className="grid gap-4 sm:grid-cols-3">
                <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-3 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-[#00D632]/20 rounded-full flex items-center justify-center text-[#00D632]">
                        <Smartphone size={20} />
                    </div>
                    <h3 className="font-bold text-white">One App, All Money</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Phantom isn't just for "trading." It holds your dollars (USDC) just like a bank, but without the bank hours.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-3 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-[#00D632]/20 rounded-full flex items-center justify-center text-[#00D632]">
                        <Globe size={20} />
                    </div>
                    <h3 className="font-bold text-white">Works Everywhere</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Send money to family overseas in 2 seconds. No "International Wire Fees." Just send.
                    </p>
                </div>

                <div className="bg-white/5 border border-white/5 p-5 rounded-2xl space-y-3 hover:bg-white/10 transition-colors">
                    <div className="w-10 h-10 bg-[#00D632]/20 rounded-full flex items-center justify-center text-[#00D632]">
                        <ShieldCheck size={20} />
                    </div>
                    <h3 className="font-bold text-white">You Own It</h3>
                    <p className="text-xs text-zinc-400 leading-relaxed">
                        Cash App lends your money out. In Phantom, your money sits in your wallet until YOU move it.
                    </p>
                </div>
            </div>
        </div>

        {/* --- CTA --- */}
        <div className="text-center space-y-6">
            <div className="inline-block p-1 rounded-full border border-[#00D632]/30 bg-[#00D632]/10 px-4 py-1 text-[10px] font-bold uppercase tracking-widest text-[#00D632] mb-2">
                Start keeping your money
            </div>
            
            <h2 className="text-3xl font-black text-white">Ready to switch?</h2>
            
            <a 
                href="https://phantom.app" 
                target="_blank" 
                rel="noreferrer"
                className="inline-flex items-center gap-2 bg-[#00D632] text-black font-black text-lg py-4 px-8 rounded-full shadow-[0_0_40px_rgba(0,214,50,0.4)] hover:scale-105 transition-transform"
            >
                Download Phantom 🟣
            </a>
            
            <p className="text-zinc-600 text-[10px] uppercase tracking-widest mt-4">
                Takes 2 minutes • No ID required to start
            </p>
        </div>

      </div>
    </main>
  );
}