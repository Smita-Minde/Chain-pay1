"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Receipt,
    Send,
    Settings,
    LogOut,
    Coins,
    Wallet,
    ArrowRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Image from "next/image";
import { useAuth } from "@hooks";

export default function PayoutPage() {
    const [activeView, setActiveView] = useState<'home' | 'transaction' | 'payout' | 'settings'>('payout');
    const [email, setEmail] = useState("merchant@gmail.com");
    const router = useRouter();

    const { logout } = useAuth();

    // Payout states
    const [openNetwork, setOpenNetwork] = useState<string | null>(null);
    const [selectedCoin, setSelectedCoin] = useState<any>(null);
    const [amount, setAmount] = useState("");
    const [wallet, setWallet] = useState("");
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

    // const handleCreatePayout = async () => {
    //     if (!selectedCoin) {
    //         toast.error("Please select a coin");
    //         return;
    //     }
    //     if (!wallet) {
    //         toast.error("Please enter a destination wallet address");
    //         return;
    //     }
    //     if (!amount) {
    //         toast.error("Please enter an amount");
    //         return;
    //     }

    //     const payload = {
    //         symbol: selectedCoin.symbol,
    //         wallet,
    //         amount,
    //     };

    //     try {
    //         toast.loading("Creating payout...", { id: "payout-action" });
    //         const response = await fetch(
    //             `https://sandbox-api.chainpay.biz/payouts/select/${selectedCoin.symbol}`,
    //             {
    //                 method: "POST",
    //                 headers: {
    //                     "Content-Type": "application/json",
    //                 },
    //                 body: JSON.stringify(payload),
    //             }
    //         );
    //         toast.dismiss("payout-action");
    //         const data = await response.json();
    //         if (response.ok) {
    //             toast.success("Payout created successfully!");
    //             setAmount("");
    //             setWallet("");
    //             setSelectedCoin(null);
    //         } else {
    //             toast.error(data.message || "Failed to create payout");
    //         }
    //     } catch (error: any) {
    //         toast.dismiss("payout-action");
    //         console.error("Payout Error:", error);
    //         toast.error(`Error: ${error.message || "An error occurred"}`);
    //     }
    // };

    const handleNav = (view: 'home' | 'transaction' | 'payout' | 'settings') => {
        if (view === 'transaction') {
            router.push('/login/transaction');
        } else if (view === 'home') {
            router.push('/login/home');
        } else if (view === 'settings') {
            router.push('/login/AccountSetting');
        } else if (view === 'payout') {
            router.push('/login/payout');
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.error(e);
            localStorage.removeItem('token');
            localStorage.removeItem('loginSuccessRoyalGame');
            router.push("/login");
        }
    };


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

    // Load user email from local storage if available
    useEffect(() => {
        const storedUser = localStorage.getItem("registered_user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                if (parsed.email) setEmail(parsed.email);
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    return (
        <div className="relative w-full min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] overflow-x-hidden md:overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col md:flex-row">
            {/* Hide the footer on the dashboard page */}
            <style dangerouslySetInnerHTML={{ __html: 'footer { display: none !important; }' }} />

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-[120px] pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] pointer-events-none animate-pulse" />

            {/* Floating 3D Balls */}
            <div className="absolute top-16 left-8 md:left-24 w-32 h-32 z-0 pointer-events-none opacity-40 blur-[1px]">
                <Image src="/3Dlogoballs/Mstc3d.png" alt="MST 3D" width={128} height={128} className="object-contain" />
            </div>
            <div className="absolute bottom-16 left-12 w-32 h-32 z-0 pointer-events-none opacity-40 blur-[1px]">
                <Image src="/3Dlogoballs/tron3d.png" alt="Tron 3D" width={128} height={128} className="object-contain" />
            </div>
            <div className="absolute top-28 right-8 w-32 h-32 z-0 pointer-events-none opacity-40 blur-[1px]">
                <Image src="/3Dlogoballs/bnb3d.png" alt="BNB 3D" width={128} height={128} className="object-contain" />
            </div>

            {/* Left Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/40 bg-white/30 backdrop-blur-xl shadow-lg p-6 flex flex-col justify-between shrink-0 md:h-full z-20 md:rounded-r-[32px]">
                <div>
                    {/* Navigation Menu */}
                    <nav className="space-y-1">
                        <button
                            onClick={() => handleNav('home')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${activeView === 'home'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/30 hover:text-blue-600'
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            Home
                        </button>
                        <button
                            onClick={() => handleNav('transaction')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${activeView === 'transaction'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/30 hover:text-blue-600'
                                }`}
                        >
                            <Receipt size={18} />
                            Transaction
                        </button>
                        <button
                            onClick={() => handleNav('payout')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${activeView === 'payout'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/30 hover:text-blue-600'
                                }`}
                        >
                            <Send size={18} />
                            Payout
                        </button>
                        <button
                            onClick={() => handleNav('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${activeView === 'settings'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/30 hover:text-blue-600'
                                }`}
                        >
                            <Settings size={18} />
                            Account Setting
                        </button>
                    </nav>
                </div>

                {/* Bottom User Profile & Logout */}
                <div className="mt-6 pt-4 border-t border-white/20 flex flex-col gap-3">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-600 hover:bg-rose-50/50 transition-all duration-200 cursor-pointer"
                    >
                        <LogOut size={18} />
                        Log Out
                    </button>
                </div>
            </div>

            {/* Right Content Panel */}
            <div className="flex-1 p-6 md:p-10 relative z-10 md:h-full overflow-y-auto">
                <AnimatePresence mode="wait">
                    {activeView === 'payout' && (
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

                            {/* Payout Networks */}
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
                                                            <img src={coin.logo} alt={coin.name} className="h-6 w-6" />
                                                            <span className="text-sm font-semibold">{coin.displayName}</span>
                                                        </div>
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>


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
                                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-white/5 to-transparent" />
                                        <div className="absolute -top-16 -right-16 h-40 w-40 rounded-full bg-blue-400/20 blur-3xl" />
                                        <div className="absolute -bottom-16 -left-16 h-40 w-40 rounded-full bg-indigo-500/20 blur-3xl" />

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

                                                        <p className="text-sm font-medium break-all text-slate-800">
                                                            {walletData.address}
                                                        </p>
                                                    </div>

                                                    <button
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

                            {/* Form */}
                            {/* <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md">
                                <h3 className="text-lg font-bold text-slate-800 mb-4">Payout Details</h3>
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-semibold text-slate-600 block mb-1">Selected Coin</label>
                                        <div className="h-12 bg-white/80 border border-slate-200 rounded-xl px-4 flex items-center gap-2 text-sm text-slate-800">
                                            <Coins size={16} className="text-slate-500" />
                                            {selectedCoin ? selectedCoin.displayName : "None Selected"}
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-slate-600 block mb-1">Wallet Address</label>
                                        <div className="relative">
                                            <Wallet size={16} className="absolute left-3.5 top-3.5 text-slate-400" />
                                            <input
                                                value={wallet}
                                                onChange={(e) => setWallet(e.target.value)}
                                                placeholder="Enter destination address"
                                                className="h-12 w-full bg-white/80 border border-slate-200 rounded-xl pl-10 pr-4 text-sm outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="text-xs font-semibold text-slate-600 block mb-1">Amount</label>
                                        <input
                                            value={amount}
                                            onChange={(e) => setAmount(e.target.value)}
                                            placeholder="0.00"
                                            className="h-12 w-full bg-white/80 border border-slate-200 rounded-xl px-4 text-sm outline-none focus:border-blue-500"
                                        />
                                    </div>

                                    <button
                                        onClick={handleCreatePayout}
                                        className="w-full h-12 flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold transition-all cursor-pointer shadow-lg shadow-blue-500/20 border-none uppercase tracking-wider text-sm"
                                    >
                                        Create Payout <ArrowRight size={16} />
                                    </button>
                                </div>
                            </div> */}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
