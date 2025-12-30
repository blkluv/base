"use client";

import { useState } from "react";
import AuthAndBaseTx from "@/components/AuthAndBaseTx";

// Reusable feature section
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
    <section className="py-8 space-y-3 text-left">
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      {subtitle && (
        <p className="text-emerald-300/80 text-sm">{subtitle}</p>
      )}
      <p className="text-emerald-200/75 text-sm leading-relaxed">
        {body}
      </p>
      {children && <div className="mt-2">{children}</div>}
    </section>
  );
}

export default function Home() {
  const [showTransfer, setShowTransfer] = useState(false);
  const [showPhantomModal, setShowPhantomModal] = useState(false);
  const [amount, setAmount] = useState<number>(100);

  // simple comparison math (illustrative, not exact fee table)
  const cashAppReceive = amount * 0.965; // lose ~3.5%
  const blkluvReceive = amount - 0.2;    // ~0.20 gas

  return (
    <main className="min-h-screen bg-black aura-bg relative text-white overflow-y-auto">

      {/* Floating aura particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="particle top-10 left-6" />
        <div className="particle bottom-16 right-10" />
        <div className="particle top-1/2 left-1/2" />
      </div>

      <div className="relative z-10 max-w-2xl mx-auto px-4 pb-12">

        {/* HERO */}
        <header className="pt-10 pb-6 space-y-3 text-left">
          <h1 className="text-4xl font-extrabold tracking-tight">
            BLKLUV.ORG
          </h1>

          <p className="text-emerald-300/90 text-xl">
            The way community money should work.
          </p>

          <p className="text-emerald-200/75 text-sm max-w-md">
            No banks. No Cash App fees. Support your tribe and keep more in the circle.
          </p>

          <div className="mt-5 space-y-2 text-sm">
            <button
              onClick={() => setShowTransfer(true)}
              className="w-full bg-emerald-500/20 border border-emerald-400/40 rounded-full py-3 text-white"
            >
              Send Love 💸
            </button>

            <button
              onClick={() => setShowPhantomModal(true)}
              className="w-full bg-white/5 border border-white/20 rounded-full py-3 text-white"
            >
              Learn About Phantom Wallet 🟣
            </button>

            <button
              onClick={() => (window.location.href = "/blkluv-vs-cashapp")}
              className="w-full bg-white/5 border border-white/20 rounded-full py-3 text-white"
            >
              BLKLUV.ORG 🆚 Cash App
            </button>
          </div>
        </header>

        {/* BALANCE CARD */}
        <section className="mt-2 mb-6 bg-white/5 border border-white/10 rounded-2xl p-5">
          <p className="text-xs text-zinc-400 mb-1">Balance</p>
          <h2 className="text-3xl font-semibold">$ — — —</h2>
          <p className="text-emerald-200/70 text-xs mt-2">
            Your money. Your people. No middleman.
          </p>
        </section>

        {/* FEATURE SECTIONS */}

        {/* 1. Community Money */}
        <FeatureSection
          title="The way community money should work."
          body="BLKLUV is built so your support flows directly to your people instead of getting shaved down by platform fees and banks. Money moves like a group chat — fast, simple, and between people who actually know each other."
        >
          <p className="text-emerald-300/80 text-xs">
            No banks. No Cash App platform fees. Support your tribe — show your Luv. #BLKLUV
          </p>
        </FeatureSection>

        {/* 2. Phantom Wallet + New Money */}
        <FeatureSection
          title="Phantom Wallet + BLKLUV = New Money"
          subtitle="One place for all your money, onchain and off."
          body="With Phantom, you can add funds from a bank or card, hold value, and send support worldwide — all from one app. BLKLUV rides on top so your giving and receiving is fast, transparent, and tribe-first."
        >
          <ul className="text-sm text-emerald-200 space-y-1">
            <li>⚡ Add money from bank or card in a few taps.</li>
            <li>🔁 Move between crypto and stable value without extra apps.</li>
            <li>🌍 Pay friends instantly using Phantom usernames.</li>
            <li>💳 Use your balance anywhere Visa works with Phantom’s debit flow.</li>
            <li>🧾 Get paid into your wallet with virtual account details.</li>
            <li>🟣 Perks and rewards on eligible balances rolling out over time.</li>
          </ul>

          <div className="mt-4 space-y-3">
            <iframe
              className="rounded-2xl border border-white/10 w-full aspect-video"
              src="https://www.youtube.com/embed/kOZ3sOu3AN0"
              title="Phantom Cash"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <p className="text-emerald-300/75 text-xs">
              Phantom handles the wallet magic. BLKLUV makes sure the love hits your tribe.
            </p>
          </div>
        </FeatureSection>

        {/* 3. Savings Calculator */}
        <FeatureSection
          title="See how much your tribe keeps."
          subtitle="Cash App vs BLKLUV. Same love. Different outcome."
          body="Type any amount and see how much more your people keep when you skip the middleman."
        >
          <div className="glass-card p-5 rounded-2xl space-y-3 bg-black/40 border border-white/10">
            <label className="block text-xs text-emerald-200/80 mb-1">
              How much do you want to send?
            </label>
            <input
              type="number"
              min={0}
              value={amount}
              onChange={(e) => {
                const v = Number(e.target.value);
                setAmount(Number.isNaN(v) ? 0 : v);
              }}
              className="w-full bg-black/60 border border-white/15 rounded-xl px-3 py-2 text-sm outline-none focus:border-emerald-400/80"
            />

            <div className="space-y-1 text-sm">
              <p>
                ❌ Cash App (after typical fees):{" "}
                <span className="font-semibold">
                  ${cashAppReceive.toFixed(2)}
                </span>
              </p>
              <p>
                ✅ BLKLUV on Base (est.):{" "}
                <span className="font-semibold">
                  ${blkluvReceive.toFixed(2)}
                </span>
              </p>
            </div>

            <p className="text-emerald-300/80 text-xs">
              More of your love actually reaches your people — instead of a platform.
            </p>
          </div>
        </FeatureSection>

        {/* 4. Social Challenge */}
        <FeatureSection
          title="#BLKLUVORG Challenge"
          subtitle="Who shows the most Luv for their tribe?"
          body="Every time you support someone, screenshot the receipt and share it. Turn giving into a visible flex, not a quiet afterthought."
        >
          <ul className="text-sm text-emerald-200 space-y-1">
            <li>1️⃣ Send Love through BLKLUV.ORG.</li>
            <li>2️⃣ Screenshot your support receipt.</li>
            <li>3️⃣ Post it with <b>#BLKLUVORG</b> and tag your tribe.</li>
          </ul>
          <p className="text-emerald-300/80 text-xs mt-2">
            Coming soon: Tribe leaderboard and monthly highlights for the most generous crews. 🏆
          </p>
        </FeatureSection>

        {/* 5. Quick “What you need” */}
        <FeatureSection
          title="What you need to get started."
          body="BLKLUV is simple: one wallet, a little ETH on Base, and people you care about."
        >
          <div className="bg-white/5 border border-white/10 rounded-2xl p-4 space-y-2 text-sm text-emerald-100">
            <p>🟣 Download Phantom Wallet on iOS or Android.</p>
            <p>⚡ Add a small amount of ETH on the Base network.</p>
            <p>🖤 Connect at BLKLUV.ORG and start sending Love.</p>
          </div>
        </FeatureSection>

        {/* Footer movement line */}
        <footer className="pt-4 pb-6 text-center">
          <p className="text-emerald-300/80 text-xs">
            No banks. No Cash App fees. Support your tribe — show your Luv. #BLKLUV
          </p>
        </footer>
      </div>

      {/* Bottom-Sheet Transfer Panel */}
      {showTransfer && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-end z-20">
          <div className="w-full bg-black/85 border-t border-white/10 rounded-t-3xl glass-card p-4 pb-8">
            <div className="flex justify-center mb-3">
              <div className="w-12 h-1.5 rounded-full bg-white/25" />
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

      {/* Phantom Wallet Modal */}
      {showPhantomModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-xl flex items-center justify-center p-4 z-30">
          <div className="bg-black/90 border border-white/15 rounded-2xl p-5 max-w-md w-full space-y-4 glass-card">
            <h3 className="text-xl font-bold">
              Phantom Wallet — New Money For Your Tribe
            </h3>

            <p className="text-sm text-emerald-200/85">
              Add funds, hold value, pay friends, and spend worldwide — all from one wallet that
              works beautifully with BLKLUV on Base.
            </p>

            <ul className="text-sm text-emerald-200 space-y-1">
              <li>⚡ Link a bank or card to add money fast.</li>
              <li>🔁 Swap between crypto and stable value without extra apps.</li>
              <li>🌍 Pay anyone with a Phantom username in seconds.</li>
              <li>💳 Tap-to-pay and debit-style spending where Visa is accepted.</li>
              <li>🧾 Get paid into a virtual account for work or contributions.</li>
              <li>🟣 Rewards on eligible balances are rolling out over time.</li>
            </ul>

            <a
              href="https://apps.apple.com/app/phantom-wallet/id1598432977"
              className="block bg-emerald-500/20 border border-emerald-400/40 rounded-full py-3 text-center text-sm"
              target="_blank"
              rel="noreferrer"
            >
              📲 Download Phantom Wallet on iOS
            </a>

            <button
              onClick={() => setShowPhantomModal(false)}
              className="text-emerald-300/80 text-xs"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </main>
  );
}