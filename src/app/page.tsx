import AuthAndBaseTx from "@/components/AuthAndBaseTx";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black selection:bg-emerald-400/30 relative">

      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1a1a_1px,transparent_1px),linear-gradient(to_bottom,#1a1a1a_1px,transparent_1px)] bg-[size:26px_26px]" />

      {/* Spiritual Aura Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_900px_at_50%_120px,#22c55e18,transparent)]" />

      {/* Inner Heart Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_600px_at_50%_70%,#4ade8030,transparent)]" />

      <div className="z-10 w-full max-w-lg mx-auto space-y-7 text-center">

        {/* Logo + Presence */}
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white tracking-tight">
            BLKLUV.ORG
          </h1>

          <p className="text-emerald-300/80 text-sm">
            Love in motion. Community in flow.
          </p>
        </div>

        {/* Minimal Value Tiles — Cash App style */}
        <div className="grid grid-cols-3 gap-2 text-xs text-emerald-200">
          <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl py-3">
            Give Love 🖤
          </div>
          <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl py-3">
            Share Blessings 💸
          </div>
          <div className="bg-emerald-400/10 border border-emerald-400/30 rounded-xl py-3">
            Lift Each Other ✨
          </div>
        </div>

        {/* Spiritual affirmation tone */}
        <p className="text-emerald-200/60 text-xs">
          Simple. Peaceful. Tribe powered.
        </p>

        {/* App Module */}
        <div className="bg-white/5 border border-white/10 rounded-2xl shadow-[0_0_40px_#22c55e10] backdrop-blur-md">
          <AuthAndBaseTx />
        </div>
      </div>
    </main>
  );
}