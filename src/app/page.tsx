"use client";

import { useState, useEffect } from "react";
import AuthAndBaseTx from "@/components/AuthAndBaseTx"; // Ensure this path is correct

// --- UI Components ---

function FeatureSection({
  title,
  subtitle,
  body,
  children,
  delay = 0,
}: {
  title: string;
  subtitle?: string;
  body: string;
  children?: React.ReactNode;
  delay?: number;
}) {
  return (
    <section 
      className="space-y-3 text-left animate-in fade-in slide-in-from-bottom-4 duration-1000 fill-mode-backwards"
      style={{ animationDelay: `${delay}ms` }}
    >
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

  // Prevent hydration mismatch on animations
  useEffect(() => setMounted(true), []);

  // Math logic
  const cashAppFee = amount * 0.035; // ~3.5%
  const cashAppReceive = amount - cashAppFee;
  const blkluvFee = 0.2; // Fixed gas estimate
  const blkluvReceive = amount - blkluvFee;

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-black aura-bg relative text-white overflow-x-hidden selection:bg-emerald-500/30">
      
      {/* 🌌 Ambient Particles (Simulated via Tailwind) */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden z-0">
        <div className="absolute top-10 left-6 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-64 h-64 bg-emerald-400/5 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      <div className="relative z-10 max-w-md mx-auto px-6 pb-24 pt-12 min-h-screen flex flex-col">
        
        {/* HERO SECTION */}
        <header className="space-y-6 mb-12">
          <div className="inline-block px-3 py-1 rounded-full border border-emerald-500/20 bg-emerald-500/10 backdrop-blur-md">
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

        {/* BALANCE CARD (The "Wallet" Feel) */}
        <section className="glass-card p-6 mb-10 transform hover:scale-[1.02] transition-transform duration-500 neon-emerald group cursor-default">
          <div className="flex justify-between items-start">
            <p className="text-xs font-medium text-emerald-400/80 uppercase tracking-widest">Available Balance</p>
            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-emerald-500/20 transition-colors">
              <span className="text-lg">✨</span>
            </div>
          </div>
          <h2 className="text-4xl font-mono mt-4 mb-1 tracking-tight text-white">$ — — —</h2>
          <div className="h-px w-full bg-gradient-to-r from-emerald-500/50 to-transparent my-4 opacity-30" />
          <div className="flex gap-3">
             <button
              onClick={() => setShowTransfer(true)}
              className="flex-1 bg-emerald-500 text-black font-bold py-3 rounded-xl text-sm hover:bg-emerald-400 transition-all shadow-[0_0_20px_rgba(52,211,153,0.4)] active:scale-95"
            >
              Send Luv 💸
            </button>
            <button
              onClick={() => setShowPhantomModal(true)}
              className="flex-1 bg-white/5 border border-white/10 text-white font-medium py-3 rounded-xl text-sm hover:bg-white/10 transition-all active:scale-95"
            >
              Wallet 🟣
            </button>
          </div>
        </section>

        {/* CONTENT STACK */}
        <div className="space-y-16">
          
          {/* 1. Value Prop */}
          <FeatureSection
            title="Keep it in the Circle."
            body="BLKLUV is built so your support flows directly to your people. Money moves like a text message—instant, final, and strictly between us."
            delay={100}
          />

          {/* 2. The Calculator (Interactive Hook) */}
          <FeatureSection
            title="The Cost of Culture."
            subtitle="Don't let them tax your love."
            body="See exactly how much the 'convenience' of Web2 is costing your community."
            delay={200}
          >
            <div className="glass-card p-6 mt-4 space-y-6 border border-white/10 bg-black/40">
              <div className="space-y-2">
                <label className="text-xs text-emerald-200/60 uppercase tracking-wider">Amount to Send</label>
                <div className="relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-emerald-400 text-xl font-light">$</span>
                  <input
                    type="number"
                    min={0}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="w-full bg-black/40 border border-white/10 rounded-2xl py-4 pl-10 pr-4 text-2xl font-medium text-white placeholder-white/20 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
                  />
                </div>
              </div>

              <div className="space-y-3">
                {/* Cash App Row */}
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

                {/* BLKLUV Row */}
                <div className="flex justify-between items-center p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 shadow-[0_0_15px_rgba(16,185,129,0.1)]">
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

          {/* 3. Phantom Integration */}
          <FeatureSection
            title="New Money. One App."
            body="Phantom isn't just a crypto wallet. It's a global bank account that fits in your pocket. No permission needed."
            delay={300}
          >
             <div className="mt-6 rounded-2xl overflow-hidden border border-white/10 shadow-2xl relative group">
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
                <iframe
                  className="w-full aspect-[9/16] md:aspect-video grayscale group-hover:grayscale-0 transition-all duration-700 opacity-80 group-hover:opacity-100"
                  src="https://www.youtube.com/embed/kOZ3sOu3AN0?controls=0&modestbranding=1"
                  title="Phantom Cash"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                />
                <div className="absolute bottom-4 left-4 z-20">
                  <p className="text-xs font-bold text-white bg-black/50 backdrop-blur-md px-2 py-1 rounded-md border border-white/10">
                    Watch the future ↗
                  </p>
                </div>
            </div>
          </FeatureSection>

           {/* 4. Social Proof / Challenge */}
           <FeatureSection 
            title="#BLKLUVORG Challenge" 
            body="Turn giving into a flex. Screenshot your receipt, tag your tribe, and show them how money is supposed to move."
            delay={400}
           >
             <button className="w-full mt-2 py-4 rounded-xl border border-dashed border-emerald-500/30 text-emerald-400/60 hover:text-emerald-300 hover:border-emerald-400/60 hover:bg-emerald-500/5 transition-all text-sm font-mono">
               View Leaderboard (Coming Soon)
             </button>
           </FeatureSection>

        </div>

        {/* FOOTER */}
        <footer className="mt-24 pt-8 border-t border-white/5 text-center space-y-4">
          <p className="text-emerald-200/40 text-xs">
            Built on Base. Secured by Math. Powered by Luv.
          </p>
          <div className="flex justify-center gap-4 text-xs text-zinc-500">
             <a href="#" className="hover:text-emerald-400 transition-colors">Terms</a>
             <a href="#" className="hover:text-emerald-400 transition-colors">Privacy</a>
             <a href="#" className="hover:text-emerald-400 transition-colors">Smart Contract</a>
          </div>
        </footer>

      </div>

      {/* --- MODALS --- */}

      {/* Transfer Bottom Sheet */}
      {showTransfer && (
        <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
            onClick={() => setShowTransfer(false)}
          />
          <div className="relative w-full max-w-md bg-[#0a0a0a] border-t sm:border border-white/10 sm:rounded-3xl rounded-t-3xl p-6 shadow-2xl animate-in slide-in-from-bottom duration-300">
            <div className="absolute top-3 left-1/2 -translate-x-1/2 w-12 h-1 bg-white/20 rounded-full sm:hidden" />
            <div className="mt-2 mb-6">
              <h3 className="text-lg font-bold text-white">Send Money</h3>
              <p className="text-sm text-zinc-400">Secure transaction via Base Network</p>
            </div>
            
            <AuthAndBaseTx />

            <button
              onClick={() => setShowTransfer(false)}
              className="mt-6 w-full py-4 text-sm text-zinc-500 hover:text-white transition-colors"
            >
              Cancel Transaction
            </button>
          </div>
        </div>
      )}

      {/* Phantom Info Modal */}
      {showPhantomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            className="absolute inset-0 bg-black/80 backdrop-blur-md transition-opacity"
            onClick={() => setShowPhantomModal(false)}
          />
          <div className="glass-card relative w-full max-w-sm p-6 space-y-6 animate-in zoom-in-95 duration-200 border-emerald-500/20">
            <div className="space-y-2 text-center">
               <div className="w-16 h-16 mx-auto bg-purple-500/20 rounded-full flex items-center justify-center mb-4 neon-emerald">
                 <span className="text-2xl">🟣</span>
               </div>
               <h3 className="text-xl font-bold spirit-text">Phantom Wallet</h3>
               <p className="text-sm text-emerald-100/70 text-balance">
                 The only app you need to hold, send, and spend your money globally.
               </p>
            </div>

            <div className="space-y-3">
              {[
                "Link bank or card instantly",
                "Pay friends via username",
                "Tap-to-pay where Visa works"
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 text-sm text-emerald-200/90 bg-white/5 p-3 rounded-lg border border-white/5">
                  <span className="text-emerald-400">✓</span>
                  {item}
                </div>
              ))}
            </div>

            <a
              href="https://phantom.app"
              target="_blank"
              rel="noreferrer"
              className="block w-full bg-white text-black font-bold text-center py-3 rounded-xl hover:bg-emerald-50 transition-colors"
            >
              Get Phantom
            </a>
          </div>
        </div>
      )}

    </main>
  );
}