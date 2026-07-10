"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    Wallet,
    TrendingUp,
    Globe,
    Percent,
    Shield,
    Coins,
    Lock,
    Zap,
    RefreshCw,
    Laptop,
    Sparkles,
    Layers,
    Activity,
    Star,
    ChevronRight,
    QrCode,
    Copy,
    ShoppingBag,
    Gamepad2,
    Trophy,
    Tv,
    Play,
    ArrowUpRight
} from "lucide-react";

export default function GamingEntertainment() {
    // --- STATE FOR HERO CHECKOUT SIMULATOR ---
    const [checkoutStep, setCheckoutStep] = useState(0);
    const [selectedCrypto, setSelectedCrypto] = useState("USDC");
    const [isCopied, setIsCopied] = useState(false);
    const [checkoutAutoplay, setCheckoutAutoplay] = useState(true);

    // --- STATE FOR TIMELINE STEPS ---
    const [activeTimelineStep, setActiveTimelineStep] = useState(0);
    const [timelineAutoplay, setTimelineAutoplay] = useState(true);

    // --- AUTO-ADVANCE HERO CHECKOUT ILLUSTRATION ---
    useEffect(() => {
        if (!checkoutAutoplay) return;
        const interval = setInterval(() => {
            setCheckoutStep((prev) => (prev + 1) % 5);
        }, 4500);
        return () => clearInterval(interval);
    }, [checkoutAutoplay]);

    // --- AUTO-ADVANCE TIMELINE ---
    useEffect(() => {
        if (!timelineAutoplay) return;
        const interval = setInterval(() => {
            setActiveTimelineStep((prev) => (prev + 1) % 5);
        }, 4000);
        return () => clearInterval(interval);
    }, [timelineAutoplay]);

    const handleCopyAddress = () => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
    };

    // --- DATA COLLECTIONS ---
    const benefits = [
        {
            title: "Instant payment confirmations",
            desc: "Players gain immediate access to expansions, virtual keys, and in-game upgrades upon on-chain detection.",
            icon: Zap
        },
        {
            title: "Global accessibility without limits",
            desc: "Enable anyone globally to access gaming services and pay instantly, bypassing cross-border bank denials.",
            icon: Globe
        },
        {
            title: "Lower transaction costs",
            desc: "Retain up to 4% more of player deposit values. Exchange credit card fees for a flat 1% merchant processing fee.",
            icon: Percent
        },
        {
            title: "Secure blockchain-based transactions",
            desc: "All player transfers settle cryptographically with complete ledger validation and non-custodial ownership.",
            icon: Shield
        },
        {
            title: "Reduced fraud and chargeback risks",
            desc: "Say goodbye to friendly fraud. Once confirmed on the ledger, payouts are irreversible and finalized.",
            icon: Lock
        }
    ];

    const professionals = [
        {
            title: "Game Studios",
            desc: "Enable direct purchases for games, expansions, DLCs, and digital items with absolute payout finality.",
            icon: Gamepad2
        },
        {
            title: "Esports Platforms",
            desc: "Accept registrations, ticket purchases, and global event entry fees cleanly across borders.",
            icon: Trophy
        },
        {
            title: "Streaming & Creator Platforms",
            desc: "Support subscriptions, sponsor payouts, tipping loops, and member tiers with near-zero transfer friction.",
            icon: Tv
        },
        {
            title: "Digital Marketplaces",
            desc: "Facilitate player-to-player purchases of skins, collections, and rare virtual assets instantly.",
            icon: ShoppingBag
        },
        {
            title: "Entertainment Platforms",
            desc: "Offer seamless payment paths for movies, music streams, web series, and exclusive premium tickets.",
            icon: Play
        }
    ];

    const timelineSteps = [
        {
            step: "Step 01",
            title: "Players select products",
            desc: "Users pick digital assets, expansion packs, skins, or memberships in your checkout frame.",
            detail: "Supports in-game asset overlays, hosted cart checkouts, and mobile digital requests."
        },
        {
            step: "Step 02",
            title: "ChainPay generates crypto options",
            desc: "ChainPay converts dynamic invoice USD values into real-time coin equivalents instantly.",
            detail: "Features dynamically routed deposit lines for USDC, USDT, ETH, and BTC."
        },
        {
            step: "Step 03",
            title: "Users complete transactions",
            desc: "Players connect Web3 wallets or transfer the token asset manually using secure QR inputs.",
            detail: "Optimized payment pathways interface with all popular browser extension wallets."
        },
        {
            step: "Step 04",
            title: "Payments are verified automatically",
            desc: "ChainPay screens the ledger nodes, registers validation, and updates payment states.",
            detail: "Merchant systems receive automated, secure payout notifications within seconds."
        },
        {
            step: "Step 05",
            title: "Content delivered instantly",
            desc: "Billing APIs trigger server events to auto-unlock in-game assets or ticket accesses.",
            detail: "Players dive back into gaming immediately without waiting for billing clearance."
        }
    ];

    const businessBenefits = [
        {
            title: "Global Communities",
            desc: "Unify player payments borderlessly. Accept deposits from gaming audiences located in 190+ countries.",
            stats: "Borderless checkout",
            icon: Globe
        },
        {
            title: "Faster Transactions",
            desc: "Provide zero-lag payment routes. Settle orders and unlock digital products for users in seconds.",
            stats: "Immediate unlock",
            icon: Zap
        },
        {
            title: "Lower Processing Fees",
            desc: "Reduce checkout overheads. ChainPay charges a simple, transparent flat rate of 1% per transaction.",
            stats: "1% flat fee",
            icon: Percent
        },
        {
            title: "No Chargebacks",
            desc: "Insulate agency cash reserves. blockchain finality blocks credit card transaction reversals.",
            stats: "100% finality",
            icon: Shield
        },
        {
            title: "Scalable Infrastructure",
            desc: "Enterprise-grade engine scales smoothly to handle flash sales, game launches, and ticket volumes.",
            stats: "High-TPS ready",
            icon: Layers
        }
    ];

    const devCapabilities = [
        {
            title: "REST APIs",
            desc: "Seamless billing endpoints integrate direct into mobile, web, and console gaming platforms.",
            badge: "RESTful"
        },
        {
            title: "Webhook integrations",
            desc: "Receive instant callback events when player payouts get verified on-chain.",
            badge: "Signed Events"
        },
        {
            title: "Custom metadata support",
            desc: "Map in-game player IDs, purchase tags, and guild parameters onto transaction feeds.",
            badge: "JSON Mapping"
        },
        {
            title: "Sandbox testing environments",
            desc: "Simulate checkout streams and confirmation sequences without spending real assets.",
            badge: "Mock Testing"
        },
        {
            title: "Multi-platform compatibility",
            desc: "Optimize payments across desktops, game clients, mobile browsers, and web stores.",
            badge: "Universal"
        },
        {
            title: "White-label checkout experiences",
            desc: "Tailor colors, fonts, and assets to match the exact aesthetic of your game interface.",
            badge: "Custom UI"
        }
    ];

    const targetChips = [
        "Game Studios",
        "Esports Organizations",
        "Streaming Platforms",
        "Digital Marketplaces",
        "Subscription Services",
        "Entertainment Businesses"
    ];

    const checkoutCoinValues: Record<string, { value: string; symbol: string; label: string }> = {
        USDC: { value: "45.00", symbol: "USDC", label: "USD Coin" },
        USDT: { value: "45.00", symbol: "USDT", label: "Tether" },
        ETH: { value: "0.013", symbol: "ETH", label: "Ethereum" },
        BTC: { value: "0.0007", symbol: "BTC", label: "Bitcoin" }
    };

    const currentCoinData = checkoutCoinValues[selectedCrypto];

    return (
        <div className="relative min-h-screen font-sans bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">

            {/* ================= BACKGROUND SYSTEM ================= */}
            <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
                {/* Soft Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.16]"
                    style={{
                        backgroundImage: `radial-gradient(#CBD5E1 1.2px, transparent 1.2px)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Glowing Blurred Blobs */}
                <div className="absolute top-0 left-[8%] w-[42rem] h-[42rem] bg-blue-100/60 rounded-full filter blur-[140px] opacity-80 animate-pulse" style={{ animationDuration: '12s' }} />
                <div className="absolute top-[25%] right-[5%] w-[45rem] h-[45rem] bg-blue-50/50 rounded-full filter blur-[160px] opacity-75" />
                <div className="absolute bottom-[20%] left-[5%] w-[48rem] h-[48rem] bg-blue-100/40 rounded-full filter blur-[150px] opacity-70" />
                <div className="absolute bottom-0 right-[8%] w-[40rem] h-[40rem] bg-blue-50/70 rounded-full filter blur-[130px] opacity-85 animate-pulse" style={{ animationDuration: '14s' }} />

                {/* Floating gradient circles */}
                <motion.div
                    animate={{
                        y: [0, -35, 0],
                        x: [0, 25, 0],
                        scale: [1, 1.04, 1]
                    }}
                    transition={{
                        duration: 15,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[18%] right-[22%] w-[22rem] h-[22rem] bg-blue-200/10 rounded-full filter blur-[90px]"
                />
                <motion.div
                    animate={{
                        y: [0, 25, 0],
                        x: [0, -20, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 17,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-[28%] left-[12%] w-[26rem] h-[26rem] bg-blue-100/20 rounded-full filter blur-[95px]"
                />
            </div>

            {/* ================= 1. HERO SECTION ================= */}
            <section className="relative pt-10 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Left Content Column */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:pt-6">
                        <div className="space-y-4 w-full">
                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1] sm:leading-none"
                            >
                                Power Digital Economies{" "}
                                <span className="bg-blue-500 bg-clip-text text-transparent">
                                    with Crypto Payments
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="text-base sm:text-lg font-bold text-[#2563EB] tracking-wide uppercase"
                            >
                                Instant, Secure, and Borderless Payments for Gaming & Entertainment
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-sm sm:text-base md:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0"
                            >
                                Enable players and audiences worldwide to purchase digital assets, subscriptions, tickets, and in-game items using cryptocurrency. ChainPay provides the speed, reliability, and flexibility required for modern entertainment ecosystems.
                            </motion.p>
                        </div>

                        {/* CTAs */}
                        <motion.div
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.25 }}
                            className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center lg:justify-start pt-2"
                        >
                            <a
                                href="#cta"
                                className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-2xl shadow-[0_4px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                <span>Start Accepting Crypto</span>
                                <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                            </a>
                            <a
                                href="#timeline-section"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] font-semibold rounded-2xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                Learn How it Works
                            </a>
                        </motion.div>
                    </div>

                    {/* Right Column: Animated Gaming Payment Dashboard Illustration */}
                    <div className="relative flex justify-center lg:justify-end w-full">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-indigo-300/10 rounded-full opacity-35 blur-3xl" />

                        {/* Mock gaming billing window container */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-full max-w-[380px] bg-white border border-[#E2E8F0] shadow-2xl rounded-3xl overflow-hidden relative z-10 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.06)] hover:border-blue-400/15 transition-all duration-300"
                            onMouseEnter={() => setCheckoutAutoplay(false)}
                            onMouseLeave={() => setCheckoutAutoplay(true)}
                        >
                            {/* Card Topbar (Mac window mock) */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-slate-50/50">
                                <div className="flex items-center gap-1.5">
                                    <span className="w-3.5 h-3.5 rounded-full bg-red-400/80" />
                                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400/80" />
                                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400/80" />
                                </div>
                                <div className="text-xs text-[#64748B] font-mono select-none">checkout.chainpay.com/game_store</div>
                                <div className="w-8" />
                            </div>

                            {/* Card Body */}
                            <div className="p-4 sm:p-5 space-y-4">

                                {/* Product Summary Card */}
                                <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-[#3B82F6] flex items-center justify-center text-white shadow-sm shrink-0">
                                            <Gamepad2 className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-extrabold text-xs text-[#0F172A]">Epic Dragon Sword + 500 XP</h4>
                                            <p className="text-[10px] text-[#64748B] font-semibold">Store: Nexus Esports Market</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-black text-[#0F172A]">$45.00</span>
                                    </div>
                                </div>

                                {/* Interactive Content Container */}
                                <div className="h-[320px] flex flex-col justify-center overflow-y-auto pr-1">
                                    <AnimatePresence mode="wait">

                                        {/* STEP 0: Selected Currency Panel */}
                                        {checkoutStep === 0 && (
                                            <motion.div
                                                key="step-select"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-3"
                                            >
                                                <div className="text-[10px] font-bold text-[#64748B] tracking-wider uppercase text-left mb-0.5">Select Payment Asset</div>

                                                <div className="grid grid-cols-2 gap-2">
                                                    {[
                                                        { coin: "USDC", name: "USD Coin", color: "text-blue-600 bg-blue-50/50 border-blue-200" },
                                                        { coin: "USDT", name: "Tether", color: "text-teal-600 bg-teal-50/30 border-teal-200" },
                                                        { coin: "ETH", name: "Ethereum", color: "text-indigo-600 bg-indigo-50/50 border-indigo-200" },
                                                        { coin: "BTC", name: "Bitcoin", color: "text-amber-600 bg-amber-50/40 border-amber-200" }
                                                    ].map((item) => (
                                                        <button
                                                            key={item.coin}
                                                            onClick={() => {
                                                                setSelectedCrypto(item.coin);
                                                                setCheckoutStep(1);
                                                            }}
                                                            className={`p-2 sm:p-2.5 rounded-xl border flex items-center justify-between transition-all duration-200 text-left ${selectedCrypto === item.coin
                                                                ? "border-blue-600 bg-blue-50/30 ring-2 ring-blue-500/10 shadow-[0_0_15px_rgba(37,99,235,0.08)]"
                                                                : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/30"
                                                                }`}
                                                        >
                                                            <div className="flex items-center gap-2">
                                                                <div className={`w-7 h-7 rounded-lg flex items-center justify-center font-black text-[10px] shrink-0 ${item.coin === "USDC" ? "bg-blue-600 text-white" :
                                                                    item.coin === "USDT" ? "bg-teal-500 text-white" :
                                                                        item.coin === "ETH" ? "bg-indigo-600 text-white" :
                                                                            "bg-amber-500 text-white"
                                                                    }`}>
                                                                    {item.coin[0]}
                                                                </div>
                                                                <div>
                                                                    <p className="font-extrabold text-[11px] text-[#0F172A] leading-none">{item.coin}</p>
                                                                    <p className="text-[9px] text-[#64748B] mt-0.5">{item.name}</p>
                                                                </div>
                                                            </div>
                                                            {selectedCrypto === item.coin && (
                                                                <CheckCircle2 className="w-4.5 h-4.5 text-blue-600 fill-blue-50" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>

                                                <button
                                                    onClick={() => setCheckoutStep(1)}
                                                    className="w-full py-3 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-extrabold text-xs shadow-[0_4px_15px_rgba(37,99,235,0.15)] transition-all mt-1"
                                                >
                                                    Continue with {selectedCrypto}
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 1: Address Generation (Spinner) */}
                                        {checkoutStep === 1 && (
                                            <motion.div
                                                key="step-loading"
                                                initial={{ opacity: 0, scale: 0.97 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="text-center space-y-4 py-6"
                                            >
                                                <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                                                    <motion.div
                                                        animate={{ rotate: 360 }}
                                                        transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                                        className="w-full h-full border-4 border-slate-100 border-t-blue-600 rounded-full"
                                                    />
                                                    <Wallet className="w-6 h-6 text-blue-600 absolute" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h5 className="font-extrabold text-sm text-[#0F172A]">Generating Wallet Route</h5>
                                                    <p className="text-xs text-[#64748B]">Setting up secure billing address path...</p>
                                                </div>
                                                <button
                                                    onClick={() => setCheckoutStep(2)}
                                                    className="px-4 py-2 border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 text-xs rounded-xl font-bold transition-all"
                                                >
                                                    Skip Loading
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 2: Deposit Address & QR code */}
                                        {checkoutStep === 2 && (
                                            <motion.div
                                                key="step-qr"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-3"
                                            >
                                                <div className="flex justify-between items-center bg-blue-50/60 px-4 py-2 rounded-2xl border border-blue-100/50">
                                                    <span className="text-[11px] font-semibold text-blue-600">Send:</span>
                                                    <span className="text-xs font-black text-blue-700">
                                                        {currentCoinData.value} {currentCoinData.symbol}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4 items-center p-1 bg-slate-50/30 rounded-2xl border border-slate-100">

                                                    {/* QR Code Graphic */}
                                                    <div className="relative w-20 h-20 shrink-0 border border-slate-200 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm">
                                                        <QrCode className="w-full h-full text-slate-900" />
                                                        <motion.div
                                                            animate={{ top: ["8%", "92%", "8%"] }}
                                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                            className="absolute left-[8%] right-[8%] h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                                        />
                                                    </div>

                                                    {/* Address details */}
                                                    <div className="space-y-2 text-left w-full">
                                                        <div>
                                                            <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Receiver Address</p>
                                                            <div className="mt-1 flex items-center justify-between p-2 bg-white border border-slate-200 rounded-xl text-[11px] font-mono shadow-inner">
                                                                <span className="text-[#0F172A] truncate pr-2">0x9c4F...F28a</span>
                                                                <button
                                                                    onClick={handleCopyAddress}
                                                                    className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-0.5 shrink-0"
                                                                >
                                                                    {isCopied ? "Copied" : <Copy className="w-3.5 h-3.5" />}
                                                                </button>
                                                            </div>
                                                        </div>
                                                        <div className="flex items-center gap-1 text-[10px] text-amber-600 font-bold">
                                                            <RefreshCw className="w-3 h-3 animate-spin" />
                                                            <span>Rates guarantee locked: 45s</span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <button
                                                    onClick={() => setCheckoutStep(3)}
                                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-xs transition-colors"
                                                >
                                                    I Have Sent Payout
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 3: Verification progress */}
                                        {checkoutStep === 3 && (
                                            <motion.div
                                                key="step-detecting"
                                                initial={{ opacity: 0, scale: 0.95 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.9 }}
                                                className="text-center space-y-4 py-4"
                                            >
                                                <div className="relative w-14 h-14 mx-auto flex items-center justify-center">
                                                    <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping" />
                                                    <div className="absolute inset-2 bg-blue-400/30 rounded-full animate-pulse" />
                                                    <Activity className="w-5 h-5 text-blue-600 absolute" />
                                                </div>
                                                <div className="space-y-1">
                                                    <h5 className="font-extrabold text-sm text-[#0F172A]">Transaction Identified</h5>
                                                    <p className="text-xs text-blue-600 font-bold animate-pulse">Waiting for node confirmations...</p>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-2 max-w-xs mx-auto overflow-hidden border">
                                                    <motion.div
                                                        initial={{ width: "15%" }}
                                                        animate={{ width: "85%" }}
                                                        transition={{ duration: 4, ease: "easeOut" }}
                                                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => setCheckoutStep(4)}
                                                    className="px-4 py-2 border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 text-xs rounded-xl font-bold transition-all"
                                                >
                                                    Validate Instantly
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 4: Success confirmation */}
                                        {checkoutStep === 4 && (
                                            <motion.div
                                                key="step-success"
                                                initial={{ opacity: 0, scale: 0.9 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.95 }}
                                                className="text-center space-y-3 py-2"
                                            >
                                                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md animate-bounce">
                                                    <Check className="w-8 h-8 stroke-[3]" />
                                                </div>
                                                <div>
                                                    <h5 className="font-black text-base text-[#0F172A]">Payment Confirmed!</h5>
                                                    <p className="text-[11px] text-emerald-600 font-semibold">In-Game Asset Dispatched</p>
                                                </div>

                                                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl max-w-xs mx-auto text-[11px] space-y-1.5 text-left relative overflow-hidden">
                                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                                                    <div className="flex justify-between">
                                                        <span className="text-[#64748B]">Receiver:</span>
                                                        <span className="font-extrabold text-[#0F172A]">Nexus Marketplace</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[#64748B]">Settle Value:</span>
                                                        <span className="font-black text-[#0F172A]">{currentCoinData.value} {currentCoinData.symbol}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[#64748B]">Transaction Hash:</span>
                                                        <span className="font-mono text-[9px] text-blue-600 truncate max-w-[120px]">0x3b8d99...a3e1</span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        setCheckoutStep(0);
                                                        setSelectedCrypto("USDC");
                                                    }}
                                                    className="px-6 py-2 bg-[#EFF6FF] hover:bg-blue-100 text-blue-600 font-extrabold text-[11px] rounded-xl transition-all"
                                                >
                                                    Purchase Next Asset
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Flow Progress Indicator */}
                                <div className="border-t border-slate-100 pt-3 flex justify-between items-center gap-1">
                                    {[
                                        { label: "Items", stepVal: 0 },
                                        { label: "Asset", stepVal: 1 },
                                        { label: "Deposit", stepVal: 2 },
                                        { label: "Confirm", stepVal: 3 },
                                        { label: "Complete", stepVal: 4 }
                                    ].map((stepObj) => (
                                        <button
                                            key={stepObj.stepVal}
                                            onClick={() => {
                                                setCheckoutStep(stepObj.stepVal);
                                                setCheckoutAutoplay(false);
                                            }}
                                            className="flex-1 group flex flex-col items-center gap-1.5 focus:outline-none"
                                        >
                                            <div className="w-full h-1.5 rounded-full transition-all relative overflow-hidden">
                                                <div className={`absolute inset-0 transition-all duration-300 ${checkoutStep >= stepObj.stepVal
                                                    ? "bg-blue-600"
                                                    : "bg-slate-200"
                                                    }`} />
                                            </div>
                                            <span className={`text-[9px] font-extrabold tracking-tight transition-colors duration-200 ${checkoutStep === stepObj.stepVal
                                                ? "text-blue-600"
                                                : "text-[#64748B]"
                                                }`}>
                                                {stepObj.label}
                                            </span>
                                        </button>
                                    ))}
                                </div>

                            </div>
                        </motion.div>

                        {/* Floating Crypto Badge */}
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute top-1/2 -right-8 z-20 bg-white border border-[#E2E8F0] shadow-lg rounded-2xl px-4 py-2 flex items-center gap-2 select-none"
                        >
                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-extrabold">Ξ</div>
                            <span className="text-xs font-extrabold text-[#0F172A]">ETH</span>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ================= 2. WHY GAMING BUSINESSES CHOOSE CHAINPAY ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Benefits text */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div className="space-y-4 w-full">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                                Why Gaming Businesses Choose ChainPay
                            </h2>
                            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Gaming communities operate globally and demand fast, seamless, and always-available payment experiences. ChainPay removes traditional payment barriers and supports truly digital economies.
                            </p>
                        </div>

                        <div className="space-y-5 w-full">
                            {benefits.map((benefit, idx) => {
                                const Icon = benefit.icon;
                                return (
                                    <motion.div
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true, margin: "-100px" }}
                                        initial={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.5, delay: idx * 0.1 }}
                                        key={benefit.title}
                                        className="flex gap-4 p-5 rounded-3xl bg-white/40 border border-transparent hover:bg-white hover:border-[#E2E8F0] hover:shadow-[0_10px_30px_rgba(0,0,0,0.02)] transition-all duration-300 text-left"
                                    >
                                        <div className="w-12 h-12 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                                            <Icon className="w-6 h-6" />
                                        </div>
                                        <div className="space-y-1">
                                            <h4 className="font-extrabold text-base text-[#0F172A]">{benefit.title}</h4>
                                            <p className="text-sm text-[#64748B] leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Right Column: Animated Merchant Dashboard Illustration */}
                    <div className="relative flex justify-center lg:justify-end w-full">
                        <div className="absolute -inset-4 bg-gradient-to-br from-blue-300 to-indigo-100 rounded-full opacity-10 blur-3xl" />

                        {/* Container Card */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full max-w-lg bg-white border border-[#E2E8F0] shadow-xl rounded-3xl p-6 space-y-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-blue-400/20 transition-all duration-300 text-left"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <div>
                                    <h4 className="font-extrabold text-sm text-[#0F172A]">ChainPay Merchant Portal</h4>
                                    <p className="text-xs text-[#64748B]">Route: In-Game Purchase Settlements</p>
                                </div>
                                <span className="px-2.5 py-1 text-[10px] font-bold text-blue-600 bg-[#EFF6FF] rounded-full border border-blue-100">
                                    LIVE ACTIVITY
                                </span>
                            </div>

                            {/* Wallet Balances */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Store Volume (24h)</p>
                                    <p className="text-xl font-black text-[#0F172A] mt-1">$45,280.00</p>
                                    <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">Updated: Just now</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Cleared Payouts</p>
                                    <p className="text-xl font-black text-blue-600 mt-1">$43,150.00</p>
                                    <p className="text-[10px] font-semibold text-[#64748B] mt-0.5">Clearance: 100%</p>
                                </div>
                            </div>

                            {/* Analytics illustration */}
                            <div className="p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                                <div className="flex justify-between items-center mb-3">
                                    <span className="text-xs font-extrabold text-[#0F172A]">Volume Trend (Monthly)</span>
                                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100 flex items-center gap-0.5">
                                        <TrendingUp className="w-3 h-3" /> +24%
                                    </span>
                                </div>

                                <div className="relative h-24 w-full pt-2">
                                    <svg className="w-full h-full" viewBox="0 0 300 80" preserveAspectRatio="none">
                                        <defs>
                                            <linearGradient id="walletChart" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="0%" stopColor="#2563EB" stopOpacity="0.2" />
                                                <stop offset="100%" stopColor="#2563EB" stopOpacity="0.0" />
                                            </linearGradient>
                                        </defs>
                                        <path
                                            d="M0,70 Q40,40 80,60 T160,20 T240,45 T300,5 L300,80 L0,80 Z"
                                            fill="url(#walletChart)"
                                        />
                                        <motion.path
                                            initial={{ pathLength: 0 }}
                                            whileInView={{ pathLength: 1 }}
                                            viewport={{ once: true }}
                                            transition={{ duration: 1.5, ease: "easeOut" }}
                                            d="M0,70 Q40,40 80,60 T160,20 T240,45 T300,5"
                                            fill="transparent"
                                            stroke="#2563EB"
                                            strokeWidth="3"
                                            strokeLinecap="round"
                                        />
                                    </svg>
                                </div>
                            </div>

                            {/* Live activity logs */}
                            <div className="space-y-2 text-xs">
                                <span className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Settlement stream</span>
                                <div className="p-3.5 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                                        <span className="font-bold text-[#0F172A]">Settled $12,450.00 USDC</span>
                                    </div>
                                    <span className="text-[10px] text-[#64748B] font-mono">Just now</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ================= 3. SUPPORTED BUSINESSES ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 mt-20">
                <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Supports the Whole Gaming Ecosystem
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        Scale digital game checkouts, stream memberships, and guild payout distribution modules inside seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {professionals.map((item, idx) => {
                        const Icon = item.icon;
                        return (
                            <motion.div
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                key={item.title}
                                className="group p-8 bg-white border border-[#E2E8F0] hover:border-blue-400/20 hover:shadow-[0_15px_40px_-15px_rgba(0,0,0,0.05)] rounded-3xl transition-all duration-300 text-left space-y-4"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                                    <Icon className="w-6 h-6" />
                                </div>
                                <div className="space-y-2">
                                    <h4 className="font-extrabold text-lg text-[#0F172A]">{item.title}</h4>
                                    <p className="text-sm text-[#64748B] leading-relaxed">{item.desc}</p>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ================= 4. FRICTIONLESS PLAYER EXPERIENCES ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Checkout UI mockup */}
                    <div className="relative flex justify-center lg:justify-start w-full">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/10 to-indigo-100/10 rounded-full opacity-35 blur-3xl" />

                        {/* Interactive billing checkout page */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full max-w-sm bg-white border border-[#E2E8F0] shadow-xl rounded-[2.5rem] p-6 space-y-6 text-left relative overflow-hidden"
                        >
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500" />

                            <div className="space-y-1">
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Nexus Marketplace checkout</p>
                                <h4 className="font-extrabold text-base text-[#0F172A]">Hosted Cart Checkout</h4>
                            </div>

                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-[#64748B]">Billed To:</span>
                                    <span className="font-bold text-[#0F172A]">Player Account #84920</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-[#64748B]">Total USD:</span>
                                    <span className="font-black text-[#0F172A]">$45.00 USD</span>
                                </div>
                            </div>

                            {/* Option selections */}
                            <div className="space-y-3">
                                <div className="p-3 bg-[#EFF6FF] border border-blue-200 rounded-xl flex items-center justify-between text-xs cursor-pointer">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-[9px]">U</div>
                                        <span className="font-extrabold text-[#0F172A]">Pay with USDC Stablecoin</span>
                                    </div>
                                    <Check className="w-4 h-4 text-blue-600 stroke-[3]" />
                                </div>
                                <div className="p-3 bg-white border border-slate-200 rounded-xl flex items-center justify-between text-xs cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
                                    <div className="flex items-center gap-2">
                                        <div className="w-5 h-5 rounded-full bg-indigo-600 text-white flex items-center justify-center font-bold text-[9px]">E</div>
                                        <span className="font-extrabold text-[#0F172A]">Pay with Ethereum (ETH)</span>
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-400" />
                                </div>
                            </div>

                            {/* Confirmed view placeholder */}
                            <div className="p-3 bg-slate-50/50 rounded-2xl border border-slate-100 flex items-center gap-3 text-xs">
                                <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="font-bold text-[#0F172A]">Direct verification</p>
                                    <p className="text-[10px] text-[#64748B]">Payment verified successfully on-chain.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 mt-20">
                        <div className="space-y-4 w-full">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                                Built for Fast-Moving Digital Communities
                            </h2>
                            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Modern players expect instant transactions without delays or unnecessary friction. ChainPay delivers payment experiences that match the speed of digital entertainment.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                            {[
                                { title: "Multi-currency support", desc: "Allows players to settle invoices using USDC, USDT, ETH, or BTC." },
                                { title: "QR-based mobile payments", desc: "Enables seamless scanning and transfer routing for quick payouts." },
                                { title: "Instant transaction updates", desc: "Displays verification progress in real-time on client overlays." },
                                { title: "Branded payment experiences", desc: "Inject specific brand color assets to align styles with game skins." },
                                { title: "Real-time confirmations", desc: "Monitors ledger nodes dynamically, resolving settlements in minutes." },
                                { title: "Simple checkout flows", desc: "Fewer steps mean higher conversion ratios and fewer abandoned carts." }
                            ].map((feat) => (
                                <div key={feat.title} className="p-5 bg-white border border-[#E2E8F0] rounded-2xl hover:border-blue-400/20 hover:shadow-sm transition-all space-y-1">
                                    <h4 className="font-extrabold text-sm text-[#0F172A] flex items-center gap-1.5">
                                        <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                        <span>{feat.title}</span>
                                    </h4>
                                    <p className="text-xs text-[#64748B] leading-relaxed">{feat.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ================= 5. HOW IT WORKS ================= */}
            {/* <section id="timeline-section" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center mt-20"> */}
            {/* <div className="space-y-4 max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        The Simplified Player checkout Journey
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        ChainPay bridges the gap between digital store items and instant wallet payout confirmations.
                    </p>

                    <div className="flex justify-center items-center gap-2 pt-2">
                        <span className="text-xs font-mono text-[#64748B] mr-2">TIMELINE LOOP:</span>
                        <button
                            onClick={() => setTimelineAutoplay(!timelineAutoplay)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-extrabold flex items-center gap-1.5 transition-all ${timelineAutoplay
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            {timelineAutoplay ? (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                                    <span>Active</span>
                                </>
                            ) : (
                                <span>Paused</span>
                            )}
                        </button>
                    </div>
                </div> */}

            {/* Re-Engineered Timeline Container to Ensure Circle & Card Alignment */}
            <div className="relative max-w-5xl mx-auto mt-12">

                {/* Vertical line for mobile, hidden on desktop */}
                {/* <div className="absolute left-6 top-6 bottom-6 w-1 bg-slate-200 lg:hidden -translate-x-1/2 z-0" /> */}

                {/* Horizontal line for desktop, hidden on mobile */}
                {/* <div className="absolute left-[10%] right-[10%] top-6 h-1 bg-[#E2E8F0] hidden lg:block -translate-y-1/2 z-0" />
                    <motion.div
                        animate={{ scaleX: (activeTimelineStep) / 4 }}
                        transition={{ duration: 0.3 }}
                        className="absolute left-[10%] right-[10%] top-6 h-1 bg-blue-600 origin-left hidden lg:block -translate-y-1/2 z-0"
                    /> */}

                {/* Timeline items list */}
                {/* <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-5 gap-8 lg:gap-6 relative z-10"> */}
                {/* {timelineSteps.map((step, idx) => ( */}
                {/* // <div key={idx} className="flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-0"> */}

                {/* Badge Circle */}
                {/* <div className="relative shrink-0 z-10 lg:mb-8">
                                    <button
                                        onClick={() => {
                                            setActiveTimelineStep(idx);
                                            setTimelineAutoplay(false);
                                        }}
                                        className={`w-12 h-12 rounded-full border-4 flex items-center justify-center font-extrabold text-sm transition-all duration-300 ${activeTimelineStep === idx
                                            ? "bg-blue-600 text-white border-blue-200 scale-110 shadow-lg shadow-blue-500/20"
                                            : activeTimelineStep > idx
                                                ? "bg-emerald-500 text-white border-emerald-100"
                                                : "bg-white text-[#64748B] border-slate-200 hover:border-blue-400"
                                            }`}
                                    >
                                        {activeTimelineStep > idx ? <Check className="w-5 h-5 stroke-[3]" /> : idx + 1}
                                    </button>
                                </div> */}

                {/* Step Info Card */}
                {/* <motion.div
                                    animate={{
                                        scale: activeTimelineStep === idx ? 1.02 : 1,
                                        borderColor: activeTimelineStep === idx ? "#3B82F6" : "#E2E8F0"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex-1 w-full bg-white border rounded-[2rem] p-6 text-left cursor-pointer transition-all hover:shadow-md relative overflow-hidden flex flex-col justify-between ${activeTimelineStep === idx ? "shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/30" : ""
                                        }`}
                                >
                                    <div className="flex justify-between items-center mb-4">
                                        <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${activeTimelineStep === idx ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-[#64748B]"
                                            }`}>
                                            {step.step}
                                        </span>
                                        {activeTimelineStep > idx && (
                                            <span className="text-[10px] text-emerald-600 font-extrabold flex items-center gap-0.5">
                                                Verified
                                            </span>
                                        )}
                                    </div> */}
                {/* <div className="space-y-1.5 flex-1 min-h-[90px]">
                                        <h4 className="font-extrabold text-sm text-[#0F172A] leading-tight">
                                            {step.title}
                                        </h4>
                                        <p className="text-xs text-[#64748B] leading-relaxed">
                                            {step.desc}
                                        </p>
                                    </div> */}
                {/* <div className="mt-4 pt-3 border-t border-slate-50 text-[10px] text-slate-400 font-semibold leading-relaxed">
                                        {step.detail}
                                    </div> */}
                {/* </motion.div> */}

                {/* </div>
                        ))}
                    </div>
                </div>
            </section> */}

                {/* ================= 6. BUSINESS BENEFITS ================= */}
                <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center">
                    <div className="space-y-4 max-w-2xl mx-auto mb-16">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                            A Solid Payments Framework for Gaming
                        </h2>
                        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                            Scale digital store operations borderlessly with a standard 1% transaction fee, zero chargebacks, and complete custody over settlements.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mt-10">
                        {businessBenefits.map((benefit, idx) => {
                            const Icon = benefit.icon;
                            return (
                                <motion.div
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, margin: "-80px" }}
                                    initial={{ opacity: 0, y: 20 }}
                                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                                    key={benefit.title}
                                    className="p-6 bg-white border border-[#E2E8F0] hover:border-blue-400/20 hover:shadow-lg rounded-[2rem] transition-all duration-300 text-left flex flex-col justify-between min-h-[220px]"
                                >
                                    <div className="space-y-4">
                                        <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center shrink-0">
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <div className="space-y-1.5">
                                            <h4 className="font-extrabold text-sm text-[#0F172A]">{benefit.title}</h4>
                                            <p className="text-xs text-[#64748B] leading-relaxed">{benefit.desc}</p>
                                        </div>
                                    </div>
                                    <div className="mt-4 pt-3 border-t border-slate-100 flex justify-between items-center text-[10px] font-bold text-blue-600 tracking-wide uppercase">
                                        <span>STAT</span>
                                        <span>{benefit.stats}</span>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </section>

                {/* ================= 7. DEVELOPER ADVANTAGES (INFORMATIONAL INTEGRATIONS WORKFLOW) ================= */}
                {/* <section id="developer-section" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100"> */}
                {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"> */}

                {/* Left Column: Visual In-Game Payout Flow */}
                {/* <div className="w-full"> */}
                {/* <motion.div
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-100px" }}
                                className="w-full max-w-xl mx-auto bg-white border border-[#E2E8F0] rounded-[2.5rem] shadow-xl p-6 space-y-6 text-left"
                            > */}
                {/* <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                    <h4 className="font-extrabold text-sm text-[#0F172A]">Game Purchase Automations</h4>
                                    <span className="px-2 py-0.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 rounded border border-emerald-100 animate-pulse">
                                        Status: Active
                                    </span>
                                </div> */}

                {/* In-game item unlock sequence diagram */}
                {/* <div className="space-y-4 relative">
                                    <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-200" />

                                    {[
                                        { label: "Select item inside UI overlay", value: "Player clicks 'Pay with Crypto' inside client interface", color: "bg-blue-600 text-white" },
                                        { label: "ChainPay deposit verification", value: "Real-time ledger validation approves wallet signature", color: "bg-indigo-600 text-white" },
                                        { label: "Instant system broadcast", value: "Database updates game states and registers purchase values", color: "bg-teal-500 text-white" },
                                        { label: "Deliver gaming assets", value: "Client dispatches virtual items directly to player profile", color: "bg-emerald-500 text-white" }
                                    ].map((item, idx) => (
                                        <div key={idx} className="flex gap-4 items-start relative z-10">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 ${item.color}`}>
                                                0{idx + 1}
                                            </div>
                                            <div className="space-y-1">
                                                <p className="font-extrabold text-sm text-[#0F172A]">{item.label}</p>
                                                <p className="text-xs text-[#64748B]">{item.value}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div> */}
                {/* </div> */}

                {/* Right Column: Content */}
                {/* <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full mt-20">
                            <div className="space-y-4 w-full">

                                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                                    Developer Tools Built for Interactive Platforms
                                </h2>
                                <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                    Integrate cryptocurrency payments into games, platforms, and entertainment applications with flexible APIs and real-time notifications.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                                {devCapabilities.map((cap) => (
                                    <div key={cap.title} className="p-5 bg-white border border-[#E2E8F0] rounded-2xl space-y-2 hover:border-blue-400/20 hover:shadow-sm transition-all">
                                        <div className="flex justify-between items-center">
                                            <h4 className="font-extrabold text-sm text-[#0F172A]">{cap.title}</h4>
                                            <span className="text-[9px] font-bold text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100 shrink-0">
                                                {cap.badge}
                                            </span>
                                        </div>
                                        <p className="text-xs text-[#64748B] leading-relaxed">{cap.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div> */}

                {/* </div> */}
                {/* </section> */}

                {/* ================= 8. PERFECT FOR ================= */}
                {/* <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center">
                    <div className="space-y-4 max-w-2xl mx-auto mb-10">
                        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                            Tailored for Every Digital Vertical
                        </h2>
                        <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                            A dynamic Web3 financial gateway built for modern interactive experiences.
                        </p>
                    </div>

                    <div className="flex flex-wrap justify-center gap-3.5 max-w-3xl mx-auto">
                        {targetChips.map((chip, idx) => (
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                key={idx}
                                className="px-5 py-3 rounded-full bg-white border border-[#E2E8F0] hover:border-blue-500 hover:text-blue-600 font-extrabold text-sm shadow-sm transition-all cursor-default select-none"
                            >
                                {chip}
                            </motion.div>
                        ))}
                    </div>
                </section> */}

                {/* ================= 9. CUSTOMER TESTIMONIAL ================= */}
                <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto border-t border-slate-100 text-center">
                    <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        initial={{ opacity: 0, y: 30 }}
                        className="p-8 sm:p-12 bg-white border border-[#E2E8F0] shadow-xl rounded-[2.5rem] relative overflow-hidden"
                    >
                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500" />

                        {/* Stars */}
                        <div className="flex justify-center gap-1 mb-6 text-amber-400">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="w-5 h-5 fill-current" />
                            ))}
                        </div>

                        <p className="text-lg sm:text-xl md:text-2xl text-slate-700 font-medium italic leading-relaxed max-w-3xl mx-auto">
                            "ChainPay allowed us to offer instant global payments for digital purchases while significantly reducing operational costs and payment disputes."
                        </p>

                        <div className="mt-8 flex justify-center items-center gap-4">
                            <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black shadow-sm">
                                NP
                            </div>
                            <div className="text-left">
                                <h4 className="font-extrabold text-base text-[#0F172A]">Nathan Pyle</h4>
                                <p className="text-xs text-[#64748B] font-semibold">Director of Operations, Nexus Guilds</p>
                            </div>
                        </div>
                    </motion.div>
                </section>

                {/* ================= 10. FINAL CTA ================= */}
                <section id="cta" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                    <motion.div
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        initial={{ opacity: 0, y: 30 }}
                        className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2.5rem] p-8 sm:p-16 text-center overflow-hidden shadow-2xl"
                    >
                        {/* Ambient Glows */}
                        <div className="absolute -top-24 -left-24 w-80 h-80 bg-white/10 rounded-full filter blur-[80px]" />
                        <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-indigo-50/20 rounded-full filter blur-[80px]" />

                        <div className="relative max-w-2xl mx-auto space-y-6">
                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                                Build the Future of Digital Entertainment Payments
                            </h2>
                            <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed">
                                Empower players, creators, and audiences with secure, borderless, and instant cryptocurrency transactions.
                            </p>

                            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                                <a
                                    href="/api-reference"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 hover:bg-slate-50 font-extrabold rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    Start Accepting Crypto
                                </a>
                                <a
                                    href="/integration-docs"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-blue-700/50 hover:bg-blue-700 text-white font-extrabold rounded-2xl border border-blue-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                                >
                                    View Developer Docs
                                </a>
                            </div>
                        </div>
                    </motion.div>
                </section>

            </div>
        </div>
    );
}
