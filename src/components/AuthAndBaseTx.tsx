"use client";

import { useState } from "react";
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

// Allowed wallets configuration
const wallets = [
    createWallet("io.metamask"),
    createWallet("app.phantom"),
    createWallet("com.coinbase.wallet"),
    createWallet("com.ledger"),
];

export default function AuthAndBaseTx() {
    const [isTestnet, setIsTestnet] = useState(true);
    const activeChain = isTestnet ? baseSepolia : base;
    const account = useActiveAccount();

    // State for the copy button feedback
    const [hasCopied, setHasCopied] = useState(false);

    const { data: balanceData } = useWalletBalance({
        client,
        chain: activeChain,
        address: account?.address,
    });

    const { mutate: sendTx, data: txResult, isPending, error, reset } = useSendTransaction();
    const [toAddress, setToAddress] = useState("");
    const [amount, setAmount] = useState("0.0001");

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

    // Helper to copy address
    const copyAddress = () => {
        if (!account) return;
        navigator.clipboard.writeText(account.address);
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
    };

    return (
        <div className="relative group w-full max-w-md mx-auto">

            {/* Background Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-30 group-hover:opacity-60 transition duration-1000"></div>

            {/* Main Card */}
            <div className="relative bg-gray-900/90 backdrop-blur-xl border border-gray-800 rounded-xl p-6 sm:p-8 w-full shadow-2xl">

                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Zap className="text-blue-500 fill-blue-500" size={24} />
                            Base Sender
                        </h2>
                        <p className="text-gray-400 text-xs mt-1">
                            Secure Web3 Transactions
                        </p>
                    </div>

                    <div className={cn(
                        "px-3 py-1 rounded-full text-xs font-medium border",
                        isTestnet
                            ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                            : "bg-blue-500/10 text-blue-500 border-blue-500/20"
                    )}>
                        {isTestnet ? "Testnet" : "Mainnet"}
                    </div>
                </div>

                {/* Network Toggle */}
                <div className="flex bg-gray-950 p-1 rounded-lg border border-gray-800 mb-6 relative">
                    <button
                        onClick={() => { setIsTestnet(true); reset(); }}
                        className={cn(
                            "flex-1 py-2 text-sm font-medium rounded-md transition-all z-10",
                            isTestnet ? "text-white" : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        Base Sepolia
                    </button>
                    <button
                        onClick={() => { setIsTestnet(false); reset(); }}
                        className={cn(
                            "flex-1 py-2 text-sm font-medium rounded-md transition-all z-10",
                            !isTestnet ? "text-white" : "text-gray-500 hover:text-gray-300"
                        )}
                    >
                        Base Mainnet
                    </button>
                    <div
                        className={cn(
                            "absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gray-800 rounded-md transition-all duration-300 ease-out",
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
                                background: '#0F172A',
                                border: '1px solid #1E293B',
                            }
                        }}
                    />
                </div>

                {!account ? (
                    <div className="text-center py-8 px-4 border border-dashed border-gray-800 rounded-lg bg-gray-950/50">
                        <Wallet className="mx-auto text-gray-600 mb-3" size={32} />
                        <p className="text-gray-500 text-sm">Connect your wallet to start sending funds on the Base network.</p>
                    </div>
                ) : (
                    <div className="space-y-5 animate-in fade-in slide-in-from-bottom-2 duration-500">

                        {/* Account Info Card (Balance + Copy Address) */}
                        <div className="p-4 bg-blue-950/20 border border-blue-900/30 rounded-lg space-y-3">

                            {/* Row 1: Balance */}
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold">
                                    Ξ
                                </div>
                                <div>
                                    <p className="text-xs text-blue-300">Available Balance</p>
                                    <p className="text-white font-mono font-medium">
                                        {balanceData?.displayValue.slice(0, 6) || "0.00"} {balanceData?.symbol}
                                    </p>
                                </div>
                            </div>

                            {/* Row 2: Copy Address Button */}
                            <button
                                onClick={copyAddress}
                                className="w-full flex items-center justify-between px-3 py-2 bg-blue-900/20 hover:bg-blue-900/40 border border-blue-900/30 rounded text-xs text-gray-300 transition-colors group/copy"
                            >
                                <span className="font-mono">
                                    {account.address.slice(0, 6)}...{account.address.slice(-4)}
                                </span>
                                <div className="flex items-center gap-1.5">
                                    <span className="text-[10px] text-gray-500 group-hover/copy:text-gray-400 transition-colors">
                                        {hasCopied ? "Copied" : "Copy"}
                                    </span>
                                    {hasCopied ? (
                                        <Check size={12} className="text-green-400" />
                                    ) : (
                                        <Copy size={12} className="text-gray-400 group-hover/copy:text-white" />
                                    )}
                                </div>
                            </button>
                        </div>

                        {/* Success State */}
                        {txResult ? (
                            <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-6 text-center">
                                <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <CheckCircle2 className="text-green-500" size={24} />
                                </div>
                                <h3 className="text-white font-bold text-lg mb-1">Transaction Sent!</h3>
                                <p className="text-gray-400 text-xs mb-4 break-all px-2">
                                    {txResult.transactionHash}
                                </p>
                                <div className="flex gap-2">
                                    <a
                                        href={`https://${isTestnet ? "sepolia." : ""}basescan.org/tx/${txResult.transactionHash}`}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex-1 bg-green-600 hover:bg-green-500 text-white text-sm font-bold py-2 px-4 rounded-lg flex items-center justify-center gap-2 transition-colors"
                                    >
                                        View on Explorer <ExternalLink size={14} />
                                    </a>
                                    <button
                                        onClick={() => reset()}
                                        className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-white rounded-lg text-sm font-medium transition-colors"
                                    >
                                        Send Another
                                    </button>
                                </div>
                            </div>
                        ) : (
                            // Form
                            <>
                                <div className="space-y-4">
                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400 font-medium ml-1">Recipient Address</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder={account.address}
                                                value={toAddress}
                                                onChange={(e) => setToAddress(e.target.value)}
                                                className="w-full bg-gray-950 border border-gray-800 text-white text-sm rounded-lg p-3 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder:text-gray-700"
                                            />
                                            {!toAddress && (
                                                <span className="absolute right-3 top-3.5 text-[10px] text-gray-600 bg-gray-900 px-2 py-0.5 rounded border border-gray-800 pointer-events-none">
                                                    Defaults to Self
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="space-y-1">
                                        <label className="text-xs text-gray-400 font-medium ml-1">Amount</label>
                                        <div className="relative">
                                            <input
                                                type="number"
                                                value={amount}
                                                onChange={(e) => setAmount(e.target.value)}
                                                className="w-full bg-gray-950 border border-gray-800 text-white text-lg font-mono rounded-lg p-3 pr-16 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                                            />
                                            <div className="absolute right-3 top-3 text-gray-400 text-sm font-bold pointer-events-none border-l border-gray-800 pl-3">
                                                ETH
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {error && (
                                    <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-red-400 text-xs">
                                        <AlertCircle size={16} className="shrink-0 mt-0.5" />
                                        <span className="break-words">{error.message}</span>
                                    </div>
                                )}

                                <button
                                    onClick={handleSendTransaction}
                                    disabled={isPending || !amount}
                                    className={cn(
                                        "w-full py-4 rounded-xl font-bold text-white shadow-lg flex items-center justify-center gap-2 transition-all transform active:scale-[0.98]",
                                        isPending
                                            ? "bg-gray-800 cursor-not-allowed text-gray-500"
                                            : "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 hover:shadow-blue-500/25"
                                    )}
                                >
                                    {isPending ? (
                                        <>
                                            <div className="w-4 h-4 border-2 border-gray-500 border-t-white rounded-full animate-spin" />
                                            Check Wallet...
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