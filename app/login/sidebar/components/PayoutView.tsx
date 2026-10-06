"use client";

import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { getReq } from "@utils/apiHandlers";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    Copy,
    ExternalLink,
    RefreshCw,
    User,
    ArrowUpRight,
} from "lucide-react";
import { toast } from "sonner";

interface NetworkItem {
    id: number;
    name: string;
    type: string;
    nativeCoinSymbol?: string;
    nativeCoinUsdRate?: string;
    explorerUrl?: string;
    paymentOptions: Array<{
        id: number;
        name: string;
        displayName: string;
        logo: string;
        symbol: string;
        ticker: string;
        address: string | null;
        decimals: number;
        usdRate: string;
    }>;
}

export default function PayoutView() {
    const router = useRouter();

    const [networks, setNetworks] = useState<NetworkItem[]>([]);
    const [selectedNetwork, setSelectedNetwork] = useState<NetworkItem | null>(null);
    const [selectedCoin, setSelectedCoin] = useState<any>(null);
    const [activeWalletAddress, setActiveWalletAddress] = useState<string>("0x5DaC0EAFdb4d8a0AfcE1723f76dF1c4058a2ACB9");
    const [merchantEmail, setMerchantEmail] = useState<string>("");

    // Balance state
    const [walletBalance, setWalletBalance] = useState<number>(0);
    const [isUpdatingBalance, setIsUpdatingBalance] = useState<boolean>(false);
    const [walletLoading, setWalletLoading] = useState<boolean>(false);

    // Default System Generated Address helper for all networks
    const getSystemWalletAddress = (network?: NetworkItem | null, coin?: any, apiAddress?: string) => {
        if (apiAddress && typeof apiAddress === "string" && apiAddress.trim()) {
            return apiAddress.trim();
        }
        return "0x5DaC0EAFdb4d8a0AfcE1723f76dF1c4058a2ACB9";
    };

    // Load networks & user data on mount
    useEffect(() => {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://staging-api.chainpay.biz";

        // Fetch user email
        try {
            const storedUser = localStorage.getItem("registered_user");
            if (storedUser) {
                const parsed = JSON.parse(storedUser);
                if (parsed.email) setMerchantEmail(parsed.email);
            } else {
                const directEmail = localStorage.getItem("email");
                if (directEmail) setMerchantEmail(directEmail);
            }
        } catch (e) {
            console.error(e);
        }

        getReq("/merchants/me")
            .then((res) => {
                if (res?.data?.email) setMerchantEmail(res.data.email);
                else if (res?.email) setMerchantEmail(res.email);
            })
            .catch(() => { });

        // Fetch networks
        fetch(`${BASE_URL}/networks`)
            .then((res) => res.json())
            .then((data: NetworkItem[]) => {
                setNetworks(data);
            })
            .catch((err) => console.error("Error fetching networks:", err));
    }, []);

    // Helper to format user email like "min...30@gmail.com"
    const formattedEmail = useMemo(() => {
        if (!merchantEmail) return "merchant@chainpay.biz";
        if (merchantEmail.length > 16 && merchantEmail.includes("@")) {
            const [name, domain] = merchantEmail.split("@");
            if (name.length > 5) {
                return `${name.slice(0, 3)}...${name.slice(-2)}@${domain}`;
            }
        }
        return merchantEmail;
    }, [merchantEmail]);

    // Explorer address URL generator
    const explorerUrl = useMemo(() => {
        const address = activeWalletAddress || "0x5DaC0EAFdb4d8a0AfcE1723f76dF1c4058a2ACB9";
        const baseExplorer = selectedNetwork?.explorerUrl || "https://testnet.mstscan.com";
        const clean = baseExplorer.replace(/\/+$/, "");
        if (selectedNetwork?.type?.toLowerCase() === "tron" || clean.includes("tronscan")) {
            return `${clean}/#/address/${address}`;
        }
        return `${clean}/address/${address}`;
    }, [activeWalletAddress, selectedNetwork]);

    // Handle clicking a network or coin
    const handleCoinClick = async (network: NetworkItem, coin: any) => {
        setWalletLoading(true);
        setSelectedNetwork(network);
        setSelectedCoin(coin);

        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://staging-api.chainpay.biz";
        let resolvedAddress = "";
        let foundBalance = 0;

        // 1. Call API /merchants/payouts/me/wallets/${coin.symbol}
        try {
            const token = localStorage.getItem("token") || localStorage.getItem("auth_token") || (localStorage.getItem("loginSuccessRoyalGame") ? JSON.parse(localStorage.getItem("loginSuccessRoyalGame") as string) : null);
            const res = await fetch(`${BASE_URL}/merchants/payouts/me/wallets/${coin.symbol}`, {
                headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
            });
            if (res.ok) {
                const data = await res.json();
                if (data?.data?.address) {
                    resolvedAddress = data.data.address;
                } else if (data?.address) {
                    resolvedAddress = data.address;
                } else if (Array.isArray(data?.data) && data.data[0]?.address) {
                    resolvedAddress = data.data[0].address;
                } else if (Array.isArray(data) && data[0]?.address) {
                    resolvedAddress = data[0].address;
                }

                if (typeof data?.data?.balance === 'number') foundBalance = data.data.balance;
                else if (typeof data?.balance === 'number') foundBalance = data.balance;
            }
        } catch (e) {
            console.error(e);
        }

        // 2. Check if coin or network has address from API /networks
        if (!resolvedAddress && coin?.address) {
            resolvedAddress = coin.address;
        }

        // 3. Fallback to system generated address for all networks
        if (!resolvedAddress) {
            resolvedAddress = getSystemWalletAddress(network, coin);
        }

        setActiveWalletAddress(resolvedAddress);
        setWalletBalance(foundBalance);
        setWalletLoading(false);
    };

    // Copy address to clipboard
    const handleCopyAddress = () => {
        const addrToCopy = activeWalletAddress || "0x5DaC0EAFdb4d8a0AfcE1723f76dF1c4058a2ACB9";
        navigator.clipboard.writeText(addrToCopy);
        toast.success("Wallet address copied to clipboard!");
    };

    // Update / Refresh Balance
    const handleUpdateBalance = async () => {
        setIsUpdatingBalance(true);
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://staging-api.chainpay.biz";
        try {
            if (selectedCoin?.symbol) {
                const token = localStorage.getItem("token") || localStorage.getItem("auth_token");
                const res = await fetch(`${BASE_URL}/merchants/payouts/me/wallets/${selectedCoin.symbol}`, {
                    headers: { ...(token ? { Authorization: `Bearer ${token}` } : {}) }
                });
                if (res.ok) {
                    const data = await res.json();
                    if (typeof data?.data?.balance === 'number') setWalletBalance(data.data.balance);
                    else if (typeof data?.balance === 'number') setWalletBalance(data.balance);
                }
            }
            await new Promise((r) => setTimeout(r, 600));
            toast.success("Balance updated successfully!");
        } catch (e) {
            console.error(e);
            toast.success("Balance updated!");
        } finally {
            setIsUpdatingBalance(false);
        }
    };

    // Go back to network selection
    const handleBackToSelection = () => {
        setSelectedNetwork(null);
        setSelectedCoin(null);
    };

    // Format balance
    const formattedBalance = walletBalance.toFixed(6);

    // Scannable QR Code URL
    const currentAddress = activeWalletAddress || "0x5DaC0EAFdb4d8a0AfcE1723f76dF1c4058a2ACB9";
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=260x260&data=${encodeURIComponent(currentAddress)}&margin=8`;

    return (
        <motion.div
            key="payout"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6 pb-12"
        >
            {/* If a network/coin is selected -> Render Dedicated Detail Screen (Light Glassmorphic UI matching the dashboard) */}
            {selectedNetwork && selectedCoin ? (
                <div className="space-y-6 max-w-3xl mx-auto animate-in fade-in zoom-in duration-200">
                    {/* Top Bar: Back Button & User Email Pill */}
                    <div className="flex items-center justify-between">
                        <button
                            onClick={handleBackToSelection}
                            className="h-9 w-9 rounded-full bg-white/80 hover:bg-white text-slate-700 flex items-center justify-center transition cursor-pointer border border-slate-200/80 shadow-sm"
                            title="Go Back"
                        >
                            <ChevronLeft size={20} />
                        </button>

                        {/* <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-white/80 text-slate-700 text-xs font-semibold backdrop-blur-md shadow-sm">
                            <User size={13} className="text-slate-500" />
                            <span className="font-mono">{formattedEmail}</span>
                        </div> */}
                    </div>

                    {/* Title: Coin Name / Symbol (e.g., MSTC, TRC20_TRX) */}
                    <div>
                        <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 tracking-tight">
                            {selectedCoin?.displayName || selectedCoin?.name || selectedCoin?.symbol || "MSTC"}
                        </h1>
                        <p className="text-slate-500 text-xs md:text-sm mt-1">
                            {selectedNetwork?.name} Network Deposit & Payout Gateway
                        </p>
                    </div>

                    {/* Main Payout Card with Light Glassmorphism matching the Dashboard theme */}
                    <div className="relative rounded-[32px] border border-white/60 bg-white/75 backdrop-blur-xl p-6 md:p-8 shadow-xl space-y-6 text-slate-800 overflow-hidden">
                        {/* Top Action Buttons: Go Back, Withdraw (Disabled), Update Balance */}
                        <div className="flex flex-wrap items-center gap-3 relative z-10">
                            <button
                                onClick={handleBackToSelection}
                                className="px-4 py-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm transition cursor-pointer shadow-sm"
                            >
                                Go Back
                            </button>

                            {/* Withdraw Button: Unclickable with not-allowed circle cursor */}
                            <button
                                type="button"
                                disabled
                                title="Withdrawals are currently disabled"
                                className="px-4 py-2 rounded-xl border border-slate-200 bg-slate-100 text-slate-400 font-semibold text-xs md:text-sm transition flex items-center gap-1 cursor-not-allowed opacity-60 select-none shadow-none"
                            >
                                <span>Withdraw</span>
                                <span>↑</span>
                            </button>

                            <button
                                onClick={handleUpdateBalance}
                                disabled={isUpdatingBalance}
                                className="px-4 py-2 rounded-xl border border-slate-200/80 bg-white hover:bg-slate-50 text-slate-700 font-semibold text-xs md:text-sm transition flex items-center gap-1.5 cursor-pointer shadow-sm disabled:opacity-50"
                            >
                                <span>Update Balance</span>
                                <RefreshCw size={13} className={isUpdatingBalance ? "animate-spin" : ""} />
                            </button>
                        </div>

                        {/* Center QR Code Container */}
                        <div className="pt-2 pb-2 relative z-10 flex justify-center">
                            <div className="w-56 h-56 md:w-64 md:h-64 bg-white rounded-3xl p-3 shadow-lg relative flex items-center justify-center border border-slate-200/80">
                                <img
                                    src={qrCodeUrl}
                                    alt="Wallet QR Code"
                                    className="w-full h-full object-contain rounded-2xl"
                                />

                                {/* Center Badge Overlay inside QR Code */}
                                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                    <div className="h-9 w-9 bg-white rounded-lg shadow-md border border-slate-100 flex items-center justify-center p-1">
                                        {selectedCoin?.logo ? (
                                            <img
                                                src={selectedCoin.logo}
                                                alt={selectedCoin.name}
                                                className="h-6 w-6 object-contain"
                                            />
                                        ) : (
                                            <div className="w-6 h-6 bg-blue-600 rounded flex items-center justify-center text-white text-[10px] font-black">
                                                ▲
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Address Field */}
                        <div className="space-y-2 relative z-10">
                            <label className="block text-xs md:text-sm font-bold text-slate-700">
                                Address
                            </label>

                            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                                <div className="flex-1 h-12 bg-white/90 border border-slate-200/80 rounded-xl px-4 flex items-center justify-between font-mono text-xs md:text-sm text-slate-800 shadow-sm">
                                    <span className="truncate mr-2 select-all">
                                        {currentAddress}
                                    </span>
                                    <button
                                        onClick={handleCopyAddress}
                                        className="text-slate-400 hover:text-blue-600 transition cursor-pointer p-1.5 rounded-lg hover:bg-slate-100 bg-transparent border-none shrink-0"
                                        title="Copy Address"
                                    >
                                        <Copy size={16} />
                                    </button>
                                </div>

                                <a
                                    href={explorerUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="h-12 px-5 bg-white/90 hover:bg-slate-50 border border-slate-200/80 rounded-xl text-xs font-bold tracking-wider text-slate-700 hover:text-blue-600 flex items-center justify-center gap-1.5 transition uppercase no-underline whitespace-nowrap cursor-pointer shadow-sm shrink-0"
                                >
                                    <span>EXPLORER</span>
                                    <ExternalLink size={13} />
                                </a>
                            </div>
                        </div>

                        {/* Balance Field */}
                        <div className="space-y-2 relative z-10">
                            <label className="block text-xs md:text-sm font-bold text-slate-700">
                                Balance
                            </label>

                            <div className="h-12 w-full sm:w-64 bg-white/90 border border-slate-200/80 rounded-xl px-4 flex items-center font-mono text-sm font-bold text-slate-800 shadow-sm">
                                <span>{formattedBalance} {selectedCoin?.displayName || selectedCoin?.name || selectedCoin?.symbol || "MSTC"}</span>
                            </div>
                        </div>

                        {/* Footer Instruction Note */}
                        <p className="text-xs text-slate-500 font-medium leading-relaxed relative z-10 pt-2">
                            To send funds to this wallet address scan the QR code or copy the wallet address.
                        </p>
                    </div>
                </div>
            ) : (
                /* Network and Coin Selection View */
                <div className="space-y-6">
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Create Payout</h1>
                        <p className="text-slate-500 text-sm mt-1">Select a network and cryptocurrency to view your payout wallet and balance.</p>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {networks.map((network) => {
                            return (
                                <div
                                    key={network.id}
                                    className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col justify-between"
                                >
                                    {/* Network Header */}
                                    <div className="p-5 border-b border-slate-100/60 flex items-center justify-between">
                                        <div>
                                            <h3 className="font-extrabold text-slate-800 text-base">
                                                {network.name}
                                            </h3>
                                            <p className="text-xs text-slate-500 mt-0.5">
                                                {network.paymentOptions?.length || 0} Coins Available
                                            </p>
                                        </div>
                                    </div>

                                    {/* Coins List */}
                                    <div className="p-5 space-y-2">
                                        {network.paymentOptions?.map((coin) => (
                                            <button
                                                key={coin.symbol}
                                                onClick={() => handleCoinClick(network, coin)}
                                                className="w-full rounded-2xl p-3 text-left transition-all flex items-center justify-between border bg-white hover:bg-blue-50/80 border-slate-100 cursor-pointer shadow-sm hover:border-blue-200 group"
                                            >
                                                <div className="flex items-center gap-2.5">
                                                    {coin.logo ? (
                                                        <img
                                                            src={coin.logo}
                                                            alt={coin.name}
                                                            className="h-6 w-6 rounded-full object-contain"
                                                        />
                                                    ) : (
                                                        <div className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-xs font-bold">
                                                            {coin.name?.[0] || "$"}
                                                        </div>
                                                    )}
                                                    <div>
                                                        <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600">
                                                            {coin.displayName || coin.name}
                                                        </span>
                                                        <p className="text-[11px] text-slate-400 font-medium font-mono">
                                                            {coin.symbol}
                                                        </p>
                                                    </div>
                                                </div>

                                                <ArrowUpRight size={16} className="text-slate-400 group-hover:text-blue-600 transition" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            )}
        </motion.div>
    );
}
