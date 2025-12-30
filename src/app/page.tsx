import AuthAndBaseTx from "@/components/AuthAndBaseTx";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-black selection:bg-blue-500/30">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

      {/* Radial Gradient overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_800px_at_50%_200px,#1d4ed815,transparent)]"></div>

      <div className="z-10 w-full">
        <AuthAndBaseTx />
      </div>
    </main>
  );
}