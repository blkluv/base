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
import { client } from "@/lib/client"; 
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

const wallets = [
    createWallet("io.metamask"),
    createWallet("app.phantom"),
    createWallet("com.coinbase.wallet"),
    createWallet("com.ledger"),
];

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
            {/* Main Card - FIXED: Solid Background to stop bleed-through */}
            <div className="relative rounded-2xl p-6 w-full shadow-2xl overflow-hidden bg-[#09090b] border border-white/10">
                
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h2 className="text-lg font-black text-white flex items-center gap-2 italic tracking-tighter">
                            <Zap className="text-[#00D632] fill-[#00D632]" size={18} />
                            BASE SENDER
                        </h2>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest mt-0.5">
                            Secure Web3 Channels
                        </p>
                    </div>

                    <div className={cn(
                        "px-2 py-1 rounded-md text-[9px] font-bold border uppercase tracking-wider",
                        isTestnet
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-[#00D632]/10 text-[#00D632] border-[#00D632]/20"
                    )}>
                        {isTestnet ? "Testnet" : "Mainnet"}
                    </div>
                </div>

                {/* Network Toggle */}
                <div className="flex bg-black/50 p-1 rounded-lg border border-white/5 mb-6 relative">
                    <button
                        onClick={() => { setIsTestnet(true); reset(); }}
                        className={cn(
                            "flex-1 py-2 text-[10px] font-bold rounded-md transition-all z-10 uppercase",
                            isTestnet ? "text-black" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        Sepolia
                    </button>
                    <button
                        onClick={() => { setIsTestnet(false); reset(); }}
                        className={cn(
                            "flex-1 py-2 text-[10px] font-bold rounded-md transition-all z-10 uppercase",
                            !isTestnet ? "text-black" : "text-zinc-500 hover:text-zinc-300"
                        )}
                    >
                        Mainnet
                    </button>
                    {/* Sliding Pill */}
                    <div
                        className={cn(
                            "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-[#00D632] rounded-md transition-all duration-300 ease-[cubic-bezier(0.25,1,0.5,1)]",
                            isTestnet ? "left-1" : "left-[50%]"
                        )}
                    />
                </div>

                {/* Connect Button */}
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
                                padding: '12px',
                                fontSize: '13px',
                                fontWeight: '600',
                            }
                        }}
                    />
                </div>

                {!account ? (
                    <div className="text-center py-8 border border-dashed border-white/10 rounded-xl bg-white/5">
                        <Wallet className="mx-auto text-zinc-600 mb-2" size={24} />
                        <p className="text-zinc-500 text-[10px] uppercase tracking-widest">Connect to Start</p>
                    </div>
                ) : (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {/* Account Info */}
                        <div className="p-3 bg-white/5 border border-white/5 rounded-xl space-y-3">
                            <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded-full bg-[#00D632]/20 flex items-center justify-center text-[#00D632] font-bold text-xs">Ξ</div>
                                <div>
                                    <p className="text-[9px] uppercase text-zinc-500 tracking-wider">Available Balance</p>
                                    <p className="text-white font-mono font-medium text-sm">
                                        {balanceData?.displayValue.slice(0, 6) || "0.00"} {balanceData?.symbol}
                                    </p>
                                </div>
                            </div>
                            <button
                                onClick={copyAddress}
                                className="w-full flex items-center justify-between px-3 py-2 bg-black/30 hover:bg-black/50 border border-white/5 rounded-lg text-[10px] text-zinc-400 transition-colors group/copy"
                            >
                                <span className="font-mono tracking-wide">
                                    {account.address.slice(0, 6)}...{account.address.slice(-4)}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[9px] text-zinc-600 group-hover/copy:text-white uppercase">
                                        {hasCopied ? "Copied" : "Copy"}
                                    </span>
                                </div>
                            </button>
                        </div>

                        {/* Form Section */}
                        {txResult ? (
                            <div className="bg-[#00D632]/10 border border-[#00D632]/20 rounded-xl p-6 text-center">
                                <CheckCircle2 className="text-[#00D632] mx-auto mb-2" size={32} />
                                <h3 className="text-white font-bold text-sm mb-4">Sent Successfully</h3>
                                <button onClick={() => reset()} className="w-full bg-white/10 py-2 rounded-lg text-xs font-bold">New Transfer</button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div>
                                    <label className="text-[9px] uppercase text-zinc-500 font-bold ml-1 tracking-wider">Recipient</label>
                                    <input
                                        type="text"
                                        placeholder={account.address}
                                        value={toAddress}
                                        onChange={(e) => setToAddress(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 text-white text-xs rounded-lg p-3 focus:outline-none focus:border-[#00D632]/50 font-mono mt-1"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] uppercase text-zinc-500 font-bold ml-1 tracking-wider">Amount</label>
                                    <input
                                        type="number"
                                        value={amount}
                                        onChange={(e) => setAmount(e.target.value)}
                                        className="w-full bg-black/40 border border-white/10 text-white text-lg font-mono rounded-lg p-3 focus:outline-none focus:border-[#00D632]/50 mt-1"
                                    />
                                </div>
                                <button
                                    onClick={handleSendTransaction}
                                    disabled={isPending || !amount}
                                    className={cn(
                                        "w-full py-3 rounded-lg font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-all mt-2",
                                        isPending ? "bg-zinc-800 text-zinc-500" : "bg-[#00D632] text-black hover:bg-[#00ff3c]"
                                    )}
                                >
                                    {isPending ? "Processing..." : "Sign & Send"}
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}