export default function SaveMoneyVsCashApp() {
  return (
    <main className="min-h-screen p-5 aura-bg bg-black text-white relative">

      <div className="max-w-2xl mx-auto space-y-8">

        {/* HERO */}
        <h1 className="text-3xl font-bold tracking-tight">
          BLKLUV.ORG vs Cash App
        </h1>

        <p className="text-emerald-300/80 text-sm">
          Real numbers. Real savings. No middleman.
        </p>


        {/* CASH APP FEES BREAKDOWN */}
        <div className="glass-card neon-emerald aura p-5 rounded-2xl space-y-3">

          <h2 className="text-xl font-semibold">
            💸 Cash App Middleman Fees
          </h2>

          <p className="text-sm text-emerald-100">
            When you send money on Cash App — a platform sits in the middle.
          </p>

          <ul className="space-y-2 text-sm text-emerald-200">
            <li>⚠️ Instant Transfer Fee — <b>1.5%–3%</b></li>
            <li>⚠️ Card Processing Fee — <b>2.75%</b></li>
            <li>⚠️ Business Account Fee — <b>+$2 per transaction</b></li>
            <li>⚠️ Cross-region costs — <b>extra charges</b></li>
          </ul>

          <p className="text-emerald-300/90 mt-2 text-sm">
            Send $100 → your tribe may receive only <b>$94–$97</b> 🥲
          </p>
        </div>


        {/* BLKLUV SAVINGS */}
        <div className="bg-emerald-500/10 border border-emerald-400/40 rounded-2xl p-5 space-y-3">

          <h2 className="text-xl font-semibold">
            🖤 BLKLUV.ORG — Community Money Flow
          </h2>

          <p className="text-sm text-emerald-100">
            BLKLUV uses Base blockchain so support goes straight to your people.
          </p>

          <ul className="space-y-2 text-sm text-emerald-200">
            <li>💚 No banks</li>
            <li>💚 No middleman</li>
            <li>💚 No platform taxing your support</li>
            <li>💚 Proof of support = screenshot receipts</li>
          </ul>

          <p className="text-emerald-300/90 mt-1 text-sm">
            Send $100 → your tribe receives <b>$99.80+</b> ⚡
          </p>

          <p className="text-xs text-emerald-400/80">
            (Typical Base fees ≈ $0.10–$0.25 per send)
          </p>
        </div>


        {/* VISUAL SAVINGS COMPARISON */}
        <div className="glass-card p-5 rounded-2xl space-y-2 text-sm">

          <h3 className="font-semibold">📊 Real-World Savings Example</h3>

          <p>Send $500 to your people:</p>

          <div className="space-y-1">
            <p>❌ Cash App ≈ <b>$470–$485 received</b> 😩</p>
            <p>✅ BLKLUV ≈ <b>$498–$499+ received</b> 🖤</p>
          </div>

          <p className="text-emerald-300/80 text-xs mt-1">
            More support stays in the community.
          </p>
        </div>


        {/* WALLET DOWNLOAD SECTION */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4">

          <h2 className="text-xl font-semibold">
            🔐 What you need to use BLKLUV
          </h2>

          <p className="text-sm text-emerald-200">
            A crypto wallet = your Cash App replacement.
          </p>

          <p className="text-sm text-emerald-100">
            We recommend:
          </p>

          <div className="glass-card neon-emerald aura p-4 rounded-xl">
            <h3 className="font-semibold text-lg">
              🟣 Phantom Wallet (Recommended)
            </h3>

            <p className="text-sm text-emerald-200 mt-1">
              Simple. Safe. Beginner-friendly. Works great on Base.
            </p>

            <a
              href="https://apps.apple.com/app/phantom-wallet/id1598432977"
              className="mt-3 block bg-emerald-500/20 border border-emerald-400/40 rounded-xl py-2 text-center"
            >
              📲 Download Phantom on iOS
            </a>
          </div>

          <ul className="space-y-2 text-sm text-emerald-200">
            <li>🟢 Coinbase Wallet — easy for Coinbase users</li>
            <li>🦊 MetaMask — most popular</li>
            <li>💼 Ledger — hardware wallet (advanced)</li>
          </ul>

          <p className="text-xs text-emerald-400/80">
            Your wallet = your money. No bank owns it.
          </p>
        </div>


        {/* HOW IT WORKS — MINIMAL STEPS */}
        <div className="glass-card neon-emerald aura p-5 rounded-2xl space-y-3">

          <h2 className="text-xl font-semibold">
            ⚡ How BLKLUV Works (Simple)
          </h2>

          <ul className="space-y-2 text-sm text-emerald-200">
            <li>1️⃣ Download Phantom</li>
            <li>2️⃣ Add a little ETH on Base</li>
            <li>3️⃣ Connect wallet on BLKLUV.ORG</li>
            <li>4️⃣ Send Love 💸</li>
            <li>5️⃣ Screenshot your receipt 📸</li>
            <li>6️⃣ Show your Luv #BLKLUV 🖤</li>
          </ul>
        </div>


        {/* MOVEMENT FOOTER LINE */}
        <p className="text-emerald-300/80 text-xs text-center">
          No banks. No Cash App fees. Support your tribe — show your Luv. #BLKLUV
        </p>

      </div>
    </main>
  );
}