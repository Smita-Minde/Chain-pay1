"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Wallet } from "lucide-react";
import { toast } from "sonner";

export default function PayoutView() {
    const [openNetwork, setOpenNetwork] = useState<string | null>(null);
    const [selectedCoin, setSelectedCoin] = useState<any>(null);
    const [networks, setNetworks] = useState<any[]>([]);
    const [walletData, setWalletData] = useState<any>(null);
    const [showWalletModal, setShowWalletModal] = useState(false);
    const [walletLoading, setWalletLoading] = useState(false);

    useEffect(() => {
        fetch("https://sandbox-api.chainpay.biz/networks")
            .then((res) => res.json())
            .then((data) => {
                setNetworks(data);
            })
            .catch((err) => console.error(err));
    }, []);

    const handleCoinClick = async (coin: any) => {
        try {
            setWalletLoading(true);
            const token = localStorage.getItem("token");

            const response = await fetch(
                `https://sandbox-api.chainpay.biz/merchants/payouts/me/wallets/${coin.symbol}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            const data = await response.json();
            setSelectedCoin(coin);

            if (
                !response.ok ||
                !data ||
                !data.data ||
                data.data.length === 0
            ) {
                setWalletData(null);
                setShowWalletModal(true);
                return;
            }

            setWalletData(data.data);
            setShowWalletModal(true);
        } catch (error) {
            console.error(error);
            toast.error("Failed to load wallet details");
        } finally {
            setWalletLoading(false);
        }
    };

    return (
        <motion.div
            key="payout"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
        >
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Create Payout</h1>
                <p className="text-slate-500 text-sm mt-1">Select network and send crypto payouts</p>
            </div>

            {/* Payout Networks Accordion */}
            <div className="grid gap-6 md:grid-cols-3">
                {networks.map((network: any) => (
                    <div
                        key={network.id}
                        className="rounded-3xl border border-white/40 bg-white/60 backdrop-blur-xl shadow-xl overflow-hidden flex flex-col"
                    >
                        <button
                            onClick={() => setOpenNetwork(openNetwork === network.id ? null : network.id)}
                            className="flex w-full items-center justify-between p-5 text-left border-none bg-transparent cursor-pointer"
                        >
                            <div>
                                <h3 className="font-extrabold text-slate-800">{network.name}</h3>
                                <p className="text-xs text-slate-500 mt-0.5">{network.paymentOptions.length} Coins Available</p>
                            </div>
                            <span className="text-slate-500 text-xs">{openNetwork === network.id ? "▲" : "▼"}</span>
                        </button>

                        {openNetwork === network.id && (
                            <div className="px-5 pb-5 space-y-2">
                                {network.paymentOptions.map((coin: any) => (
                                    <button
                                        key={coin.symbol}
                                        onClick={() => handleCoinClick(coin)}
                                        className={`w-full rounded-2xl p-3 text-left transition-all flex items-center justify-between border cursor-pointer ${selectedCoin?.symbol === coin.symbol
                                            ? "bg-blue-600 text-white border-blue-600"
                                            : "bg-white hover:bg-blue-50 border-slate-100"
                                            }`}
                                    >
                                        <div className="flex items-center gap-2">
                                            {coin.logo && <img src={coin.logo} alt={coin.name} className="h-6 w-6" />}
                                            <span className="text-sm font-semibold">{coin.displayName}</span>
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                ))}
            </div>

            {/* Wallet Info Modal */}
            {showWalletModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
                    <div
                        className="
                            relative overflow-hidden
                            w-full max-w-md
                            rounded-[32px]
                            border border-white/30
                            bg-white/20
                            backdrop-blur-2xl
                            shadow-[0_8px_32px_rgba(31,38,135,0.15)]
                            p-6
                        "
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent pointer-events-none" />
                        <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl pointer-events-none" />
                        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl pointer-events-none" />

                        <div className="relative z-10">
                            <div className="flex items-center justify-between mb-6">
                                <h3 className="text-xl font-bold text-slate-900">
                                    {selectedCoin?.displayName}
                                </h3>

                                <button
                                    onClick={() => setShowWalletModal(false)}
                                    className="
                                        h-8 w-8
                                        rounded-full
                                        bg-white/30
                                        backdrop-blur-md
                                        border border-white/20
                                        flex items-center justify-center
                                        hover:bg-white/40
                                        transition-all
                                        cursor-pointer
                                    "
                                >
                                    ✕
                                </button>
                            </div>

                            {!walletData ? (
                                <div className="text-center py-8">
                                    <div
                                        className="
                                            mx-auto mb-4
                                            h-16 w-16
                                            rounded-2xl
                                            bg-white/30
                                            backdrop-blur-md
                                            border border-white/20
                                            flex items-center justify-center
                                        "
                                    >
                                        <Wallet
                                            size={30}
                                            className="text-slate-700"
                                        />
                                    </div>

                                    <h4 className="text-lg font-bold text-slate-900">
                                        No Wallet Data Found
                                    </h4>

                                    <p className="mt-2 text-sm text-slate-600">
                                        Please add a wallet address before creating payouts.
                                    </p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    <div
                                        className="
                                            rounded-2xl
                                            border border-white/30
                                            bg-white/20
                                            backdrop-blur-md
                                            p-4
                                        "
                                    >
                                        <p className="text-xs text-slate-500 mb-1">
                                            Wallet Address
                                        </p>

                                        <p className="text-sm font-medium break-all text-slate-800 font-mono">
                                            {walletData.address}
                                        </p>
                                    </div>

                                    <button
                                        onClick={() => {
                                            toast.info("Payout creation configuration form is currently disabled. Please contact support.");
                                        }}
                                        className="
                                            w-full h-12
                                            rounded-2xl
                                            bg-blue-600
                                            hover:bg-blue-700
                                            text-white
                                            font-semibold
                                            transition-all
                                            shadow-lg
                                            shadow-blue-500/20
                                            cursor-pointer
                                            border-none
                                        "
                                    >
                                        Create Payout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </motion.div>
    );
}
