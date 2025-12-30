"use client";

import { useState, useEffect } from "react";
import {
    ConnectButton,
    useActiveAccount,
    useSendTransaction,
    useWalletBalance,
} from "thirdweb/react";
import { base, baseSepolia } from "thirdweb/chains";
import { prepareTransaction, toWei } from "thirdweb";
import { createWallet } from "thirdweb/wallets";
import { client } from "@/lib/client"; // Ensure this matches your project
import {
    ArrowRight,
    Wallet,
    AlertCircle,
    CheckCircle2,
    ExternalLink,
    Zap,
    Copy,
    Check
} from "lucide-react";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs: (string | undefined | null | false)[]) {
    return twMerge(clsx(inputs));
}

// 1. YOUR ORIGINAL WALLET CONFIG (Untouched)
const wallets = [
    createWallet("io.metamask"),
    createWallet("app.phantom"),
    createWallet("com.coinbase.wallet"),
    createWallet("com.ledger"),
];

// 2. LUXURY STYLING CONSTANTS
const BRAND_COLOR = "#00D632"; // Cash App Neon
const GLASS_BG = "bg-zinc-900/80 backdrop-blur-xl";
const GLASS_BORDER = "border border-white/10";

export default function AuthAndBaseTx({ prefilledAmount }: { prefilledAmount?: string }) {
    const [isTestnet, setIsTestnet] = useState(true);
    const activeChain = isTestnet ? baseSepolia : base;
    const account = useActiveAccount();

    const [hasCopied, setHasCopied] = useState(false);

    const { data: balanceData } = useWalletBalance({
        client,
        chain: activeChain,
        address: account?.address,
    });

    const { mutate: sendTx, data: txResult, isPending, error, reset } = useSendTransaction();
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState(prefilledAmount || "0.0001");

    // Sync from Home Screen
    useEffect(() => {
        if (prefilledAmount) setAmount(prefilledAmount);
    }, [prefilledAmount]);

    const handleSendTransaction = () => {
        if (!account) return;
        try {
            const transaction = prepareTransaction({
                to: toAddress || account.address,
                value: toWei(amount),
                chain: activeChain,
                client: client,
            });
            sendTx(transaction);
        } catch (err) {
            console.error("Tx preparation failed", err);
        }
    };

    const copyAddress = () => {
        if (!account) return;
        navigator.clipboard.writeText(account.address);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <div className="relative w-full mx-auto">
            {/* Main Card */}
            <div className={cn("relative rounded-2xl p-6 w-full shadow-2xl overflow-hidden", GLASS_BG, GLASS_BORDER)}>
                
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-xl font-black text-white flex items-center gap-2 italic tracking-tighter">
                            <Zap className="text-[#00D632] fill-[#00D632]" size={20} />
                            BASE SENDER
                        </h2>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-1">
                            Secure Web3 Channels
                        </p>
                    </div>

                    <div className={cn(
                        "px-3 py-1 rounded-full text-[10px] font-bold border uppercase tracking-wider",
                        isTestnet
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-[#00D632]/10 text-[#00D632] border-[#00D632]/20"
                    )}>
                        {isTestnet ? "Testnet" : "Mainnet"}
                    </div>
                </div>

                {/* Network Toggle Pill (Redesigned) */}
                <div className="flex bg-black/50 p-1 rounded-full border border-white/5 mb-6 relative">
                    <button
                        onClick={() => { setIsTestnet(true); reset(); }}
                        className={cn(
                            "flex-1 py-2 text-xs font-bold rounded-full transition-all z-10",
                            isTestnet ? "text-black" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        Sepolia
                    </button>
                    <button
                        onClick={() => { setIsTestnet(false); reset(); }}
                        className={cn(
                            "flex-1 py-2 text-xs font-bold rounded-full transition-all z-10",
                            !isTestnet ? "text-black" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        Mainnet
                    </button>
                    {/* The Sliding Pill */}
                    <div
                        className={cn(
                            "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#00D632] rounded-full transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] shadow-[0_0_15px_rgba(0,214,50,0.4)]",
                            isTestnet ? "left-1" : "left-[50%]"
                        )}
                    />
                </div>

                {/* Connect Button (Wrapped to fit style) */}
                <div className="flex justify-center mb-6">
                    <ConnectButton
                        client={client}
                        wallets={wallets}
                        chain={activeChain}
                        theme={"dark"}
                        connectButton={{
                            style: {
                                width: '100%',
                                background: 'transparent',
                                border: '1px solid rgba(255,255,255,0.1)',
                                borderRadius: '12px',
                                padding: '14px',
                                fontSize: '14px',
                                fontWeight: '600',
                            }
                        }}
                    />
                </div>

                {!account ? (
                    <div className="text-center py-10 px-4 border border-dashed border-white/10 rounded-2xl bg-white/5">
                        <Wallet className="mx-auto text-zinc-600 mb-3" size={32} />
                        <p className="text-zinc-500 text-xs uppercase tracking-widest">Connect to Start</p>
                    </div>
                ) : (
                    <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">

                        {/* Account Info Card */}
                        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-[#00D632]/20 flex items-center justify-center text-[#00D632] font-bold">
                                    Ξ
                                </div>
                                <div>
                                    <p className="text-[10px] uppercase text-zinc-500 tracking-wider">Available Balance</p>
                                    <p className="text-white font-mono font-medium text-lg">
                                        {balanceData?.displayValue.slice(0, 6) || "0.00"} {balanceData?.symbol}
                                    </p>
                                </div>
                            </div>

                            <button
                                onClick={copyAddress}
                                className="w-full flex items-center justify-between px-3 py-2 bg-black/30 hover:bg-black/50 border border-white/5 rounded-lg text-xs text-zinc-400 transition-colors group/copy"
                            >
                                <span className="font-mono tracking-wide">
                                    {account.address.slice(0, 6)}...{account.address.slice(-4)}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] text-zinc-600 group-hover/copy:text-zinc-400 transition-colors uppercase">
                                        {hasCopied ? "Copied" : "Copy"}
                                    </span>
                                    {hasCopied ? (
                                        <Check size={12} className="text-[#00D632]" />
                                    ) : (
                                        <Copy size={12} className="text-zinc-600 group-hover/copy:text-white" />
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Success State */}
                        {txResult ? (
                            <div className="bg-[#00D632]/10 border border-[#00D632]/20 rounded-2xl p-6 text-center animate-in zoom-in-95">
                                <div className="w-12 h-12 bg-[#00D632]/20 rounded-full flex items-center justify-center mx-auto mb-3 shadow-[0_0_20px_rgba(0,214,50,0.2)]">
                                    <CheckCircle2 className="text-[#00D632]" size={24} />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-1">Sent Successfully</h3>
                                <p className="text-zinc-400 text-[10px] font-mono mb-4 break-all opacity-70">
                                    {txResult.transactionHash}
                                </p>
                                <div className="flex gap-2">
                                    <a
                                        href={`https://${isTestnet ? "sepolia." : ""}basescan.org/tx/${txResult.transactionHash}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 bg-[#00D632] hover:bg-[#00b32a] text-black text-sm font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(0,214,50,0.3)]"
                                    >
                                        Explorer <ExternalLink size={14} />
                                    </a>
                                    <button
                                        onClick={() => reset()}
                                        className="px-4 py-3 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-colors"
                                    >
                                        New
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Form Input Section
                            <>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1 tracking-wider">Recipient</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder={account.address}
                                                value={toAddress}
                                                onChange={(e) => setToAddress(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 text-white text-sm rounded-xl p-4 focus:outline-none focus:border-[#00D632]/50 focus:ring-1 focus:ring-[#00D632]/50 transition-all placeholder:text-zinc-700 font-mono"
                                            />
                                            {!toAddress && (
                                                <span className="absolute right-3 top-4 text-[10px] text-zinc-600 bg-black/50 px-2 py-0.5 rounded border border-white/5 pointer-events-none uppercase">
                                                    Self
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-[10px] uppercase text-zinc-500 font-bold ml-1 tracking-wider">Amount</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full bg-black/40 border border-white/10 text-white text-xl font-mono rounded-xl p-4 pr-16 focus:outline-none focus:border-[#00D632]/50 focus:ring-1 focus:ring-[#00D632]/50 transition-all"
                                            />
                                            <div className="absolute right-4 top-4 text-[#00D632] text-sm font-bold pointer-events-none">
                                                ETH
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-xl text-red-400 text-xs">
                                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                        <span className="break-words">{error.message}</span>
                                    </div>
                                )}

                                <button
                                    onClick={handleSendTransaction}
                                    disabled={isPending || !amount}
                                    className={cn(
                                        "w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]",
                                        isPending
                                            ? "bg-zinc-800 cursor-not-allowed text-zinc-500"
                                            : "bg-[#00D632] text-black shadow-[0_0_30px_rgba(0,214,50,0.3)] hover:shadow-[0_0_50px_rgba(0,214,50,0.5)] hover:bg-[#00ff3c]"
                                    )}
                                >
                                    {isPending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-zinc-600 border-t-black rounded-full animate-spin" />
                                            Confirming...
                                        </>
                                    ) : (
                                        <>
                                            Sign & Send <ArrowRight size={18} />
                                        </>
                                    )}
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}