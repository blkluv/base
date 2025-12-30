"use client";

import { useState, useEffect } from "react";
import AuthAndBaseTx from "@/components/AuthAndBaseTx"; 

// ... FeatureSection Component remains the same ...
function FeatureSection({
  title,
  subtitle,
  body,
  children,
}: {
  title: string;
  subtitle?: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <section className="space-y-3 text-left">
      <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
      {subtitle && (
        <p className="text-emerald-400 font-medium text-sm tracking-wide uppercase opacity-90">
          {subtitle}
        </p>
      )}
      <p className="text-emerald-100/70 text-base leading-relaxed text-balance">
        {body}
      </p>
      {children && <div className="mt-4">{children}</div>}
    </section>
  );
}

export default function Home() {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showPhantomModal, setShowPhantomModal] = useState(false);
  const [amount, setAmount] = useState<number>(100);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  const cashAppReceive = amount * 0.965; 
  const blkluvReceive = amount - 0.2; 

  if (!mounted) return null;

  return (
    // SCROLL FIX: min-h-screen allows growth, relative allows z-index stacking
    <main className="relative min-h-screen w-full text-white selection:bg-emerald-500/30">
      
      {/* --- BACKGROUND LAYERS --- */}
      {/* 1. Grain Texture (Fixed, Top Layer of BG) */}
      <div className="bg-noise" />
      
      {/* 2. Moving Orbs (Fixed, Bottom Layer of BG) */}
      <div className="aura-orb-1" />
      <div className="aura-orb-2" />

      {/* --- CONTENT LAYER (Scrollable) --- */}
      <div className="relative z-10 max-w-md mx-auto px-6 pb-24 pt-12 flex flex-col">
        
        {/* HERO */}
        <header className="space-y-6 mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-900/20 backdrop-blur-md">
            <span className="text-xs font-bold tracking-widest text-emerald-300 uppercase">
              The New Standard
            </span>
          </div>
          
          <h1 className="text-5xl font-extrabold tracking-tighter spirit-text leading-[0.9]">
            BLK<br />LUV.ORG
          </h1>

          <p className="text-xl text-emerald-100/80 font-light leading-snug">
            Community money.<br />
            <span className="text-white font-normal">Zero friction. Zero banks.</span>
          </p>
        </header>

        {/* BALANCE CARD */}
        <section className="glass-card p-6 mb-10 neon-emerald">
          <div className="flex justify-between items-start">
            <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-widest">Available Balance</p>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/10">
              <span className="text-lg">✨</span>
            </div>
          </div>
          <h2 className="text-4xl font-mono mt-4 mb-4 tracking-tight text-white">$ — — —</h2>
          <div className="flex gap-3">
             <button
              onClick={() => setShowTransfer(true)}
              className="flex-1 bg-emerald-500 text-black font-bold py-3 rounded-xl text-sm hover:bg-emerald-400 transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)]"
            >
              Send Luv 💸
            </button>
            <button
              onClick={() => setShowPhantomModal(true)}
              className="flex-1 bg-white/5 border border-white/10 text-white font-medium py-3 rounded-xl text-sm hover:bg-white/10 transition-all"
            >
              Wallet 🟣
            </button>
          </div>
        </section>

        {/* SCROLLABLE CONTENT AREA */}
        <div className="space-y-16">
          
          <FeatureSection
            title="Keep it in the Circle."
            body="BLKLUV is built so your support flows directly to your people. Money moves like a text message—instant, final, and strictly between us."
          />

          <FeatureSection
            title="The Cost of Culture."
            subtitle="Don't let them tax your love."
            body="See exactly how much the 'convenience' of Web2 is costing your community."
          >
            <div className="glass-card p-6 mt-4 space-y-6 bg-black/20">
              <div className="space-y-2">
                <label className="text-xs text-emerald-200/60 uppercase tracking-wider">Amount to Send</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 text-xl font-light">$</span>
                  <input
                    type="number"
                    min={0}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-2xl font-medium text-white focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                  <div className="flex flex-col">
                    <span className="text-xs text-red-300 font-bold uppercase">Cash App</span>
                    <span className="text-xs text-red-200/50">~3.5% Fees</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-mono text-red-200 opacity-60 line-through decoration-red-500/50">
                      ${amount.toFixed(2)}
                    </span>
                    <span className="text-sm text-red-400 font-bold">
                      Rec: ${cashAppReceive.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_10px_rgba(34,197,94,0.1)]">
                  <div className="flex flex-col">
                    <span className="text-xs text-emerald-300 font-bold uppercase">BLKLUV</span>
                    <span className="text-xs text-emerald-200/50">Base Network Gas</span>
                  </div>
                  <div className="text-right">
                    <span className="block text-xl font-mono text-emerald-100">
                      ${blkluvReceive.toFixed(2)}
                    </span>
                     <span className="text-[10px] text-emerald-400 uppercase tracking-wider">
                      Saved: ${(amount - cashAppReceive - 0.20).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </FeatureSection>

          <FeatureSection
            title="New Money. One App."
            body="Phantom isn't just a crypto wallet. It's a global bank account that fits in your pocket. No permission needed."
          >
             <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                <iframe
                  className="w-full aspect-video grayscale hover:grayscale-0 transition-all duration-700 opacity-80 hover:opacity-100"
                  src="https://www.youtube.com/embed/kOZ3sOu3AN0?controls=0&modestbranding=1"
                  title="Phantom Cash"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
            </div>
          </FeatureSection>

        </div>
        
        {/* FOOTER */}
        <footer className="mt-24 pt-8 border-t border-white/5 text-center">
            <p className="text-emerald-200/40 text-xs">Built on Base. Secured by Math.</p>
        </footer>

      </div>

      {/* MODALS (Keep your modal logic here, just ensure z-index is 50+) */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
           <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowTransfer(false)} />
           <div className="relative w-full max-w-md bg-zinc-900 border-t border-white/10 rounded-t-3xl p-6 slide-in-from-bottom">
              <AuthAndBaseTx />
              <button onClick={() => setShowTransfer(false)} className="mt-4 w-full text-center text-zinc-500 text-sm py-2">Close</button>
           </div>
        </div>
      )}
      
      {showPhantomModal && (
         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={() => setShowPhantomModal(false)} />
            <div className="glass-card relative w-full max-w-sm p-6 space-y-4">
                <h3 className="text-xl font-bold">Phantom Wallet</h3>
                <p className="text-sm text-zinc-300">The safest way to hold your Luv.</p>
                <a href="https://phantom.app" className="block w-full bg-white text-black text-center py-3 rounded-xl font-bold">Download</a>
            </div>
         </div>
      )}

    </main>
  );
}