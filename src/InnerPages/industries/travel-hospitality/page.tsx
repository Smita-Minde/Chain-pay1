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
    Play,
    ArrowUpRight,
    Plane,
    Compass,
    Hotel,
    FileText,
    Calendar,
    MapPin,
    User
} from "lucide-react";

export default function TravelHospitality() {
    // --- STATE FOR HERO CHECKOUT WIDGET ---
    const [checkoutStep, setCheckoutStep] = useState(0);
    const [selectedCrypto, setSelectedCrypto] = useState("USDC");
    const [isCopied, setIsCopied] = useState(false);
    const [checkoutAutoplay, setCheckoutAutoplay] = useState(true);

    // --- STATE FOR TIMELINE ACCORDION STEPS ---
    const [activeTimelineStep, setActiveTimelineStep] = useState(0);
    const [timelineAutoplay, setTimelineAutoplay] = useState(true);

    // --- STATE FOR SECTION 3 TAB SHOWCASE ---
    const [activeTabVertical, setActiveTabVertical] = useState("hotels");

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
            title: "Accept payments from travelers worldwide",
            desc: "Unify booking channels borderlessly. Accept reservation deposits from travelers across 190+ countries.",
            icon: Globe
        },
        {
            title: "Eliminate currency conversion complications",
            desc: "Bypass high cross-border exchange rates. Route billing amounts directly on-chain using stablecoins.",
            icon: Percent
        },
        {
            title: "Reduce international transaction costs",
            desc: "Swap credit card scheme fees for a flat 1% merchant processing fee, saving up to 4% per transaction.",
            icon: Shield
        },
        {
            title: "Receive settlements without banking delays",
            desc: "Bypass clearing schedules. Settle booking packages instantly directly to your non-custodial structures.",
            icon: Wallet
        },
        {
            title: "Improve customer convenience and trust",
            desc: "Provide travelers flexibility to pay using major digital assets and stablecoins (USDC, USDT, ETH, BTC).",
            icon: Sparkles
        }
    ];

    const verticalShowcase: Record<string, { title: string; label: string; desc: string; value: string; symbol: string; details: string; }> = {
        hotels: {
            title: "Hotels & Resorts Checkout",
            label: "Grand Resort & Spa",
            desc: "Room 402 Superior Suite Reservation Booking",
            value: "1,450.00",
            symbol: "USDC",
            details: "Includes 7-nights deposit, spa packages, and automated checking access."
        },
        airlines: {
            title: "Airline Reservation Portal",
            label: "Starway Flight CP-202",
            desc: "Executive Class Flight Ticket booking",
            value: "0.238",
            symbol: "ETH",
            details: "Includes global cabin priority status, lounge entry, and dynamic seating keys."
        },
        agencies: {
            title: "Travel Agency Package",
            label: "Global Safaris Tour",
            desc: "Alpine Ski Guided Package Tour booking",
            value: "2,100.00",
            symbol: "USDT",
            details: "Includes all-inclusive equipment rentals, mountain guides, and hotel splits."
        },
        rentals: {
            title: "Vacation Rental Platform",
            label: "Oceanfront Luxury Villa",
            desc: "Direct Villa Booking Reservation Deposit",
            value: "3,500.00",
            symbol: "USDC",
            details: "Bypass standard platform holds and secure booking finality instantly."
        },
        operators: {
            title: "Guided Tour Operator",
            label: "Alpine Mountain Tour",
            desc: "Skiglide Adventure Pass registrations",
            value: "0.0102",
            symbol: "BTC",
            details: "Unlock tour schedules dynamically upon on-chain verification signals."
        }
    };

    const timelineSteps = [
        {
            step: "Step 01",
            title: "Traveler selects booking package",
            desc: "Guests pick vacation rooms, cabin flights, or tour tickets inside your check-out frame.",
            detail: "Integrates directly with hosted travel checkout pages or native reservation plugins."
        },
        {
            step: "Step 02",
            title: "ChainPay generates crypto payment options",
            desc: "ChainPay converts booking values into real-time digital equivalents automatically.",
            detail: "Features dynamically locked conversion rates to guarantee deposit finality."
        },
        {
            step: "Step 03",
            title: "Traveler pays using preferred wallet",
            desc: "Users complete payments by scanning the QR code or triggering a browser wallet.",
            detail: "Supports instant wallet connections across major chain networks."
        },
        {
            step: "Step 04",
            title: "Payment verified instantly",
            desc: "ChainPay scans the block nodes and confirms transaction validity in seconds.",
            detail: "Automated billing logs register confirmations, updating merchant systems."
        },
        {
            step: "Step 05",
            title: "Booking automatically confirmed",
            desc: "Merchant servers release reservation tickets and booking keys directly to client profiles.",
            detail: "Travelers receive flight credentials instantly, bypassing billing delays."
        }
    ];

    const businessBenefits = [
        {
            title: "Global Accessibility",
            desc: "Accept deposits from international travelers borderlessly across 190+ countries.",
            stats: "Serve customers worldwide",
            icon: Globe
        },
        {
            title: "Lower Processing Costs",
            desc: "Minimize transaction costs with a simple, transparent flat rate of 1% on deposits.",
            stats: "1% flat fee",
            icon: Percent
        },
        {
            title: "Faster Settlements",
            desc: "Enjoy immediate payout settlements to bypass legacy bank clearing times.",
            stats: "Immediate unlock",
            icon: Zap
        },
        {
            title: "Improved Customer Experience",
            desc: "Delight digital users by offering payment options that fit Web3 lifestyles.",
            stats: "Flexible checkout options",
            icon: Sparkles
        },
        {
            title: "Secure Transactions",
            desc: "Shield reservations from card disputes. Blockchain confirmations guarantee finality.",
            stats: "100% finality",
            icon: Shield
        }
    ];

    const devCapabilities = [
        {
            title: "REST API support",
            desc: "Integrate cryptocurrency endpoints directly into booking engines and customer databases.",
            badge: "RESTful"
        },
        {
            title: "Real-time webhook notifications",
            desc: "Receive callback events to trigger ticket generations upon ledger payment verifications.",
            badge: "Signed Events"
        },
        {
            title: "Custom booking references",
            desc: "Map traveler numbers, ticket IDs, and flight numbers directly onto transaction logs.",
            badge: "Metadata Keys"
        },
        {
            title: "Branded payment experiences",
            desc: "Customize colors, logos, and check-out fields to match travel agency templates.",
            badge: "Custom UI"
        },
        {
            title: "Sandbox testing environment",
            desc: "Test billing links, booking states, and validation codes without spending real assets.",
            badge: "Mock Testing"
        },
        {
            title: "Enterprise integration support",
            desc: "Access dedicated support channels to help map payouts to centralized ERP engines.",
            badge: "Direct Support"
        }
    ];

    const targetChips = [
        "Hotels & Resorts",
        "Airlines",
        "Online Travel Agencies",
        "Tour Operators",
        "Vacation Rental Platforms",
        "Event & Ticketing Businesses"
    ];

    const checkoutCoinValues: Record<string, { value: string; symbol: string; label: string }> = {
        USDC: { value: "1,450.00", symbol: "USDC", label: "USD Coin" },
        USDT: { value: "1,450.00", symbol: "USDT", label: "Tether" },
        ETH: { value: "0.420", symbol: "ETH", label: "Ethereum" },
        BTC: { value: "0.0226", symbol: "BTC", label: "Bitcoin" }
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

            {/* ================= 1. HERO SECTION (Asymmetric 3-Column Traveler's Dashboard Deck Layout) ================= */}
            <section className="relative pt-32 pb-24 md:pt-40 md:pb-36 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">

                    {/* Left Content Column */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div className="space-y-4 w-full">
                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1] sm:leading-none"
                            >
                                Borderless Payments for{" "}
                                <span className="bg-blue-500 bg-clip-text text-transparent">
                                    Global Travelers
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="text-base sm:text-lg font-bold text-[#2563EB] tracking-wide uppercase"
                            >
                                Accept Cryptocurrency Payments Anywhere in the World
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-sm sm:text-base md:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0"
                            >
                                Enable travelers to pay instantly using cryptocurrency without worrying about currency conversions, international banking restrictions, or expensive processing fees. ChainPay helps hospitality businesses deliver modern payment experiences for a global audience.
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

                    {/* Right Column: 3-Column Traveler's Dashboard Deck Layout */}
                    <div className="relative flex justify-center lg:justify-end w-full">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-indigo-350/10 rounded-full opacity-35 blur-3xl" />

                        {/* Asymmetric overlapping card deck layout */}
                        <div className="relative w-full max-w-lg min-h-[460px] flex items-center justify-center">

                            {/* Card 1: Traveler Profile Passport (Left Overlap) */}
                            {/* <motion.div
                                whileHover={{ x: -10, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="absolute left-0 top-8 z-20 w-44 bg-white border border-[#E2E8F0] shadow-xl rounded-3xl p-4 space-y-4 text-left hidden sm:block"
                            >
                                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                                    <span className="text-[9px] font-black text-blue-600 tracking-wider uppercase">PASSPORT CARD</span>
                                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold text-xs">
                                        JD
                                    </div>
                                    <div>
                                        <h5 className="text-[11px] font-extrabold text-[#0F172A] leading-tight">John Doe</h5>
                                        <p className="text-[9px] text-[#64748B]">Executive status</p>
                                    </div>
                                </div>
                                <div className="space-y-1 text-[9px] text-[#64748B] font-semibold">
                                    <p className="flex justify-between"><span>Country:</span> <span className="text-[#0F172A]">United States</span></p>
                                    <p className="flex justify-between"><span>VIP tier:</span> <span className="text-blue-600">Star Platinum</span></p>
                                </div>
                            </motion.div> */}

                            {/* Card 2: Main Checkout Widget (Center Focus) */}
                            <motion.div
                                initial={{ opacity: 0, scale: 0.97 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6 }}
                                className="w-full max-w-sm bg-white border border-[#E2E8F0] shadow-2xl rounded-3xl overflow-hidden relative z-35 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.06)] hover:border-blue-400/15 transition-all duration-300"
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
                                    <div className="text-xs text-[#64748B] font-mono select-none">checkout.chainpay.com/hotel_booking</div>
                                    <div className="w-8" />
                                </div>

                                {/* Card Body */}
                                <div className="p-6 space-y-6 text-left">

                                    {/* Product Summary Card */}
                                    <div className="flex items-center justify-between p-4 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] shadow-sm">
                                        <div className="flex items-center gap-3">
                                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-600 to-[#3B82F6] flex items-center justify-center text-white shadow-sm shrink-0">
                                                <Hotel className="w-6 h-6" />
                                            </div>
                                            <div className="text-left">
                                                <h4 className="font-extrabold text-sm text-[#0F172A]">Grand Resort Room 402</h4>
                                                <p className="text-[11px] text-[#64748B] font-semibold">Includes 7-nights deposit</p>
                                            </div>
                                        </div>
                                        <div className="text-right">
                                            <span className="text-sm font-black text-[#0F172A]">$1,450.00</span>
                                        </div>
                                    </div>

                                    {/* Dynamic Content based on checkoutStep */}
                                    <div className="h-[430px] flex flex-col justify-center overflow-y-auto pr-1">
                                        <AnimatePresence mode="wait">

                                            {/* STEP 0: Selected Currency Panel */}
                                            {checkoutStep === 0 && (
                                                <motion.div
                                                    key="step-select"
                                                    initial={{ opacity: 0, y: 10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className="space-y-4"
                                                >
                                                    <div className="text-xs font-bold text-[#64748B] tracking-wider uppercase text-left mb-1">Select Payment Asset</div>

                                                    <div className="grid grid-cols-2 gap-3">
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
                                                                className={`p-3.5 rounded-xl border flex items-center justify-between transition-all duration-200 text-left ${selectedCrypto === item.coin
                                                                    ? "border-blue-600 bg-blue-50/30 ring-2 ring-blue-500/10 shadow-[0_0_15px_rgba(37,99,235,0.08)]"
                                                                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/30"
                                                                    }`}
                                                            >
                                                                <div className="flex items-center gap-2.5">
                                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0 ${item.coin === "USDC" ? "bg-blue-600 text-white" :
                                                                        item.coin === "USDT" ? "bg-teal-500 text-white" :
                                                                            item.coin === "ETH" ? "bg-indigo-600 text-white" :
                                                                                "bg-amber-500 text-white"
                                                                        }`}>
                                                                        {item.coin[0]}
                                                                    </div>
                                                                    <div>
                                                                        <p className="font-extrabold text-xs text-[#0F172A] leading-none">{item.coin}</p>
                                                                        <p className="text-[10px] text-[#64748B] mt-0.5">{item.name}</p>
                                                                    </div>
                                                                </div>
                                                                {selectedCrypto === item.coin && (
                                                                    <CheckCircle2 className="w-5 h-5 text-blue-600 fill-blue-50" />
                                                                )}
                                                            </button>
                                                        ))}
                                                    </div>

                                                    <button
                                                        onClick={() => setCheckoutStep(1)}
                                                        className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white rounded-xl font-extrabold text-sm shadow-[0_4px_15px_rgba(37,99,235,0.15)] transition-all mt-2"
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
                                                    <div className="relative w-20 h-20 mx-auto flex items-center justify-center">
                                                        <motion.div
                                                            animate={{ rotate: 360 }}
                                                            transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }}
                                                            className="w-full h-full border-4 border-slate-100 border-t-blue-600 rounded-full"
                                                        />
                                                        <Wallet className="w-7 h-7 text-blue-600 absolute" />
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
                                                    className="space-y-4"
                                                >
                                                    <div className="flex justify-between items-center bg-blue-50/60 px-4 py-3 rounded-2xl border border-blue-100/50">
                                                        <span className="text-xs font-semibold text-blue-600">Send:</span>
                                                        <span className="text-sm font-black text-blue-700">
                                                            {currentCoinData.value} {currentCoinData.symbol}
                                                        </span>
                                                    </div>

                                                    <div className="flex flex-col sm:flex-row gap-5 items-center p-1 bg-slate-50/30 rounded-2xl border border-slate-100">

                                                        {/* QR Code Graphic */}
                                                        <div className="relative w-28 h-28 shrink-0 border border-slate-200 rounded-xl bg-white flex items-center justify-center p-2 shadow-sm">
                                                            <QrCode className="w-full h-full text-slate-900" />
                                                            <motion.div
                                                                animate={{ top: ["8%", "92%", "8%"] }}
                                                                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                                className="absolute left-[8%] right-[8%] h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                                            />
                                                        </div>

                                                        {/* Address details */}
                                                        <div className="space-y-3 text-left w-full">
                                                            <div>
                                                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Receiver Address</p>
                                                                <div className="mt-1.5 flex items-center justify-between p-2.5 bg-white border border-slate-200 rounded-xl text-xs font-mono shadow-inner">
                                                                    <span className="text-[#0F172A] truncate pr-2">0x9c4F...F28a</span>
                                                                    <button
                                                                        onClick={handleCopyAddress}
                                                                        className="text-blue-600 hover:text-blue-700 font-bold flex items-center gap-0.5 shrink-0"
                                                                    >
                                                                        {isCopied ? "Copied" : <Copy className="w-4 h-4" />}
                                                                    </button>
                                                                </div>
                                                            </div>
                                                            <div className="flex items-center gap-1.5 text-[11px] text-amber-600 font-bold">
                                                                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                                                                <span>Rates guarantee locked: 45s</span>
                                                            </div>
                                                        </div>

                                                    </div>

                                                    <button
                                                        onClick={() => setCheckoutStep(3)}
                                                        className="w-full py-3.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-sm transition-colors"
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
                                                    <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                                                        <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-ping" />
                                                        <div className="absolute inset-2 bg-blue-400/30 rounded-full animate-pulse" />
                                                        <Activity className="w-6 h-6 text-blue-600 absolute" />
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
                                                    className="text-center space-y-4 py-2"
                                                >
                                                    <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md animate-bounce">
                                                        <Check className="w-9 h-9 stroke-[3]" />
                                                    </div>
                                                    <div>
                                                        <h5 className="font-black text-lg text-[#0F172A]">Booking Confirmed!</h5>
                                                        <p className="text-xs text-emerald-600 font-semibold">1/1 confirmation cleared</p>
                                                    </div>

                                                    <div className="p-4 bg-slate-50 border border-slate-200/80 rounded-2xl max-w-xs mx-auto text-xs space-y-2 text-left relative overflow-hidden">
                                                        <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                                                        <div className="flex justify-between">
                                                            <span className="text-[#64748B]">Merchant:</span>
                                                            <span className="font-extrabold text-[#0F172A]">Grand Resort Portal</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-[#64748B]">Settle Value:</span>
                                                            <span className="font-black text-[#0F172A]">{currentCoinData.value} {currentCoinData.symbol}</span>
                                                        </div>
                                                        <div className="flex justify-between">
                                                            <span className="text-[#64748B]">Booking Ref:</span>
                                                            <span className="font-mono text-[10px] text-blue-600 truncate max-w-[130px]">ch_8492_hotel</span>
                                                        </div>
                                                    </div>

                                                    <button
                                                        onClick={() => {
                                                            setCheckoutStep(0);
                                                            setSelectedCrypto("USDC");
                                                        }}
                                                        className="px-6 py-2.5 bg-[#EFF6FF] hover:bg-blue-100 text-blue-600 font-extrabold text-xs rounded-xl transition-all"
                                                    >
                                                        Confirm Next Reservation
                                                    </button>
                                                </motion.div>
                                            )}
                                        </AnimatePresence>
                                    </div>

                                    {/* Flow Progress Indicator */}
                                    <div className="border-t border-slate-100 pt-5 flex justify-between items-center gap-1">
                                        {[
                                            { label: "Asset", stepVal: 0 },
                                            { label: "Route", stepVal: 1 },
                                            { label: "Send", stepVal: 2 },
                                            { label: "Verify", stepVal: 3 },
                                            { label: "Done", stepVal: 4 }
                                        ].map((stepObj) => (
                                            <button
                                                key={stepObj.stepVal}
                                                onClick={() => {
                                                    setCheckoutStep(stepObj.stepVal);
                                                    setCheckoutAutoplay(false);
                                                }}
                                                className="flex-1 group flex flex-col items-center gap-1.5 focus:outline-none"
                                            >
                                                <div className="w-full h-1 rounded-full transition-all relative overflow-hidden">
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

                            {/* Card 3: Boarding Pass ticket (Right Overlap) */}
                            {/* <motion.div
                                whileHover={{ x: 10, scale: 1.02 }}
                                transition={{ duration: 0.3 }}
                                className="absolute right-0 bottom-8 z-20 w-44 bg-white border border-[#E2E8F0] shadow-xl rounded-3xl p-4 space-y-4 text-left hidden sm:block"
                            >
                                <div className="flex justify-between items-center pb-2 border-b border-slate-100">
                                    <span className="text-[9px] font-black text-blue-600 tracking-wider uppercase">BOARDING PASS</span>
                                    <Plane className="w-3.5 h-3.5 text-blue-600" />
                                </div>
                                <div className="space-y-1">
                                    <h5 className="text-[11px] font-black text-[#0F172A] leading-tight">Flight CP-892</h5>
                                    <p className="text-[9px] text-[#64748B]">Class: Executive Lounge</p>
                                </div>
                                <div className="p-2 bg-slate-50 border border-slate-100 rounded-xl text-[9px] text-[#64748B] font-semibold space-y-0.5">
                                    <p className="flex justify-between"><span>Status:</span> <span className="text-emerald-600 font-extrabold">CONFIRMED</span></p>
                                    <p className="flex justify-between"><span>Gate code:</span> <span className="text-[#0F172A] font-mono">G-12</span></p>
                                </div>
                            </motion.div> */}

                        </div>
                    </div>

                </div>
            </section>

            {/* ================= 2. WHY TRAVEL BUSINESSES CHOOSE CHAINPAY (Layered Card Split-Parallax Map Stack) ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Benefits text */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div className="space-y-4 w-full">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                                Why Travel Businesses Choose ChainPay
                            </h2>
                            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                The travel industry serves customers from every corner of the world. ChainPay removes traditional payment barriers and enables seamless international transactions.
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

                    {/* Right Column: Global Travel Connections Pulsing Vector Map Stack */}
                    <div className="relative flex justify-center lg:justify-end w-full">
                        <div className="absolute -inset-4 bg-gradient-to-br from-blue-300 to-indigo-100 rounded-full opacity-10 blur-3xl" />

                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full max-w-lg bg-white border border-[#E2E8F0] shadow-xl rounded-3xl p-6 space-y-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-blue-400/20 transition-all duration-300 text-left relative overflow-hidden"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
                                <div>
                                    <h4 className="font-extrabold text-sm text-[#0F172A]">Borderless Reservation Map</h4>
                                    <p className="text-xs text-[#64748B]">Route: Instant Global Settlement Ledger</p>
                                </div>
                                <span className="px-2.5 py-1 text-[10px] font-bold text-blue-600 bg-[#EFF6FF] rounded-full border border-blue-100">
                                    LIVE STATUS
                                </span>
                            </div>

                            {/* visual travel map block connections */}
                            <div className="relative h-44 bg-[#F8FAFC] rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center">
                                <Globe className="w-16 h-16 text-blue-300/40 animate-pulse" />

                                {/* Travel Pin 1 */}
                                <div className="absolute top-[25%] left-[20%] flex flex-col items-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping absolute" />
                                    <MapPin className="w-4 h-4 text-blue-600 relative" />
                                    <span className="text-[9px] font-bold text-slate-800 bg-white border px-1 rounded shadow mt-0.5">NY Office</span>
                                </div>

                                {/* Travel Pin 2 */}
                                <div className="absolute bottom-[30%] right-[25%] flex flex-col items-center">
                                    <div className="w-2.5 h-2.5 rounded-full bg-blue-600 animate-ping absolute" />
                                    <MapPin className="w-4 h-4 text-blue-600 relative" />
                                    <span className="text-[9px] font-bold text-slate-800 bg-white border px-1 rounded shadow mt-0.5">Paris Hub</span>
                                </div>

                                {/* Connecting line */}
                                <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                                    <path d="M25,35 Q50,15 75,65" fill="none" stroke="#3B82F6" strokeWidth="1.5" strokeDasharray="4" />
                                </svg>
                            </div>

                            {/* Wallet Balances logs */}
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Settled Value (24h)</p>
                                    <p className="text-xl font-black text-[#0F172A] mt-1">$14,250.00</p>
                                    <p className="text-[10px] font-semibold text-emerald-600 mt-0.5">Updated: Just now</p>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Pending clearances</p>
                                    <p className="text-xl font-black text-blue-600 mt-1">$0.00</p>
                                    <p className="text-[10px] font-semibold text-[#64748B] mt-0.5">100% finality reached</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ================= 3. SUPPORTED BUSINESSES (Immersive Tabbed Segment Showcase) ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 mt-20">
                <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Supported Businesses
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed mt-5">
                        Scale digital game checkouts, stream memberships, and guild payout distribution modules inside seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-center mt-10">

                    {/* Left Column: Vertical tab selector */}
                    <div className="space-y-3 lg:col-span-1 text-left">
                        {[
                            { key: "hotels", title: "Hotels & Resorts", desc: "Offer guests alternative checkouts with direct booking confirmation." },
                            { key: "airlines", title: "Airlines", desc: "Accept borderless payments for cabin tickets, expansions, and flights." },
                            { key: "agencies", title: "Travel Agencies", desc: "Scale globally without relying on legacy regional wires." },
                            { key: "rentals", title: "Vacation Rentals", desc: "Enable direct payouts with lower processing overheads." },
                            { key: "operators", title: "Tour Operators", desc: "Simplify trip bookings for guests located in multiple networks." }
                        ].map((tab) => (
                            <button
                                key={tab.key}
                                onClick={() => setActiveTabVertical(tab.key)}
                                className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 ${activeTabVertical === tab.key
                                    ? "border-blue-600 bg-blue-50/20 ring-1 ring-blue-500/15"
                                    : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/30"
                                    }`}
                            >
                                <div className="space-y-1">
                                    <h4 className="font-extrabold text-sm text-[#0F172A]">{tab.title}</h4>
                                    <p className="text-xs text-[#64748B] leading-relaxed">{tab.desc}</p>
                                </div>
                            </button>
                        ))}
                    </div>

                    {/* Right Column: Central Ticket Details Preview Card (Col-span-2) */}
                    <div className="lg:col-span-2 relative flex justify-center lg:justify-end w-full">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/10 to-indigo-100/10 rounded-full opacity-35 blur-3xl" />

                        <div className="w-full max-w-2xl bg-white border border-[#E2E8F0] shadow-xl rounded-[2.5rem] p-6 sm:p-8 space-y-6 text-left relative overflow-hidden min-h-[340px] flex flex-col justify-between">
                            <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeTabVertical}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-6 flex-1 flex flex-col justify-between"
                                >
                                    <div className="flex justify-between items-center pb-3 border-b border-slate-100">
                                        <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">
                                            {verticalShowcase[activeTabVertical].title}
                                        </span>
                                        <span className="px-2.5 py-0.5 text-[9px] font-bold text-emerald-600 bg-emerald-50 rounded border border-emerald-100">
                                            Auto-Confirm ready
                                        </span>
                                    </div>

                                    <div className="space-y-3">
                                        <h4 className="text-xl font-black text-[#0F172A]">
                                            {verticalShowcase[activeTabVertical].label}
                                        </h4>
                                        <p className="text-sm text-[#64748B] leading-relaxed">
                                            {verticalShowcase[activeTabVertical].desc}
                                        </p>
                                    </div>

                                    <div className="p-5 bg-slate-50 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                                        <div className="space-y-1">
                                            <p className="text-[#64748B]">Total billing sum due:</p>
                                            <p className="text-lg font-black text-[#0F172A]">
                                                {verticalShowcase[activeTabVertical].value} {verticalShowcase[activeTabVertical].symbol}
                                            </p>
                                        </div>
                                        <div className="text-left sm:text-right max-w-xs text-[11px] text-[#64748B] leading-relaxed border-t sm:border-t-0 sm:border-l border-slate-200 pt-3 sm:pt-0 sm:pl-4">
                                            {verticalShowcase[activeTabVertical].details}
                                        </div>
                                    </div>

                                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-4 border-t border-slate-100">
                                        <span className="flex items-center gap-1">
                                            <Shield className="w-3.5 h-3.5 text-emerald-500" /> Secure checkout
                                        </span>
                                        <span>Hosted Engine</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

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
                                <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Airlines Flight reservation</p>
                                <h4 className="font-extrabold text-base text-[#0F172A]">Hosted Booking Checkout</h4>
                            </div>

                            <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-[#64748B]">Billed To:</span>
                                    <span className="font-bold text-[#0F172A]">Traveler Account #84920</span>
                                </div>
                                <div className="flex justify-between items-center text-xs">
                                    <span className="text-[#64748B]">Total USD:</span>
                                    <span className="font-black text-[#0F172A] text-blue-600">$820.00 USD</span>
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
                                    <p className="text-[10px] text-[#64748B]">Ticket code unlocked successfully on-chain.</p>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Right Column: Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div className="space-y-4 w-full">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] mt-10">
                                Frictionless Payments for Every Journey
                            </h2>
                            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Provide guests with secure and convenient payment options that match the expectations of today's digital travelers.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                            {[
                                { title: "Hosted payment experiences", desc: "Share secure web checkout routes instantly without writing any custom code." },
                                { title: "Multi-currency crypto support", desc: "Allows players to settle invoices using USDC, USDT, ETH, or BTC." },
                                { title: "Instant booking confirmations", desc: "Track billing validations dynamically inside your user dashboard." },
                                { title: "Mobile-friendly checkout pages", desc: "Fully responsive layouts render perfectly across all phones and tablets." },
                                { title: "Real-time payment updates", desc: "Displays verification progress in real-time on client overlays." },
                                { title: "Custom branding capabilities", desc: "Inject brand styling assets to align bill flows with agency portfolios." }
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

            {/* ================= 5. HOW IT WORKS (Staggered Alternating Step Pipeline Layout) ================= */}
            {/* <section id="timeline-section" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center mt-20"> */}
            {/* <div className="space-y-4 max-w-2xl mx-auto mb-20">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Staggered Reservation Flow
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        Follow the seamless operational process from package selection through auto-unlock.
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

            {/* Staggered Alternating Step Cards layout */}
            {/* <div className="relative max-w-4xl mx-auto mt-12 space-y-12"> */}

            {/* Vertical connecting line */}
            {/* <div className="absolute left-[50%] top-6 bottom-6 w-0.5 bg-[#E2E8F0] hidden sm:block -translate-x-1/2 z-0" /> */}

            {/* {timelineSteps.map((step, idx) => {
                        const isEven = idx % 2 === 0;
                        return (
                            <div key={idx} className={`flex flex-col sm:flex-row items-center justify-between relative z-10 gap-6 sm:gap-0 ${isEven ? "sm:flex-row-reverse" : ""
                                }`}> */}

            {/* Side Card Details */}
            {/* <div className="w-full sm:w-[45%] text-left">
                                    <div className={`p-6 rounded-[2rem] border bg-white transition-all hover:shadow-md ${activeTimelineStep === idx
                                        ? "border-blue-600 shadow-lg ring-1 ring-blue-500/10"
                                        : "border-slate-100 opacity-80"
                                        }`}>
                                        <div className="flex justify-between items-center mb-3">
                                            <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">{step.step}</span>
                                            {activeTimelineStep > idx && (
                                                <span className="text-[10px] text-emerald-600 font-extrabold">Cleared</span>
                                            )}
                                        </div>
                                        <h4 className="font-extrabold text-sm text-[#0F172A] mt-2 leading-tight">{step.title}</h4>
                                        <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{step.desc}</p>
                                    </div>
                                </div> */}

            {/* Central Indicator Circle */}
            {/* <div className="absolute left-[50%] -translate-x-1/2 z-20 hidden sm:block">
                                    <button
                                        onClick={() => {
                                            setActiveTimelineStep(idx);
                                            setTimelineAutoplay(false);
                                        }}
                                        className={`w-10 h-10 rounded-full border-4 flex items-center justify-center font-extrabold text-xs transition-all duration-300 ${activeTimelineStep === idx
                                            ? "bg-blue-600 text-white border-blue-200 scale-110 shadow-lg"
                                            : "bg-white text-[#64748B] border-slate-200 hover:border-blue-400"
                                            }`}
                                    >
                                        {idx + 1}
                                    </button>
                                </div> */}

            {/* Placeholder block to force split columns */}
            {/* <div className="w-full sm:w-[45%] hidden sm:block" />

                            </div> */}
            {/* );
                    })}
                </div>
            </section> */}

            {/* ================= 6. BUSINESS BENEFITS ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center mt-20">
                <div className="space-y-4 max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        A Solid Payments Framework for Travel
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

            {/* ================= 7. DEVELOPER ADVANTAGES (Visual Reservation Integration Flow Diagram) ================= */}
            {/* <section id="developer-section" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100"> */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"> */}

            {/* Left Column: Visual Reservation Integration Flow Diagram */}
            {/* <div className="w-full"> */}
            {/* <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full max-w-xl mx-auto bg-white border border-[#E2E8F0] shadow-xl rounded-[2.5rem] p-6 space-y-6 text-left relative overflow-hidden"
                        >
                            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <h4 className="font-extrabold text-sm text-[#0F172A]">Travel Reservation pipeline</h4>
                                <span className="px-2 py-0.5 text-[9px] font-bold text-blue-600 bg-blue-50 rounded border border-blue-100">
                                    Auto-Triggers
                                </span>
                            </div> */}

            {/* Node connectivity path */}
            {/* <div className="space-y-4 relative">
                                <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-200" />

                                {[
                                    { label: "Travel Booking Engine API", value: "Shopper selects flight/hotel packaging links", color: "bg-blue-600 text-white" },
                                    { label: "ChainPay Payments Gateway", value: "API keys dispatch transaction billing codes instantly", color: "bg-indigo-600 text-white" },
                                    { label: "Instant Webhooks Event Dispatcher", value: "Ledger validation pings verification codes automatically", color: "bg-teal-500 text-white" },
                                    { label: "Release Booking Status", value: "System triggers ticket unlock code and receipts automatically", color: "bg-emerald-500 text-white" }
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
                            </div> */}
            {/* </motion.div> */}
            {/* </div> */}


            {/* Right Column: Content */}
            {/* <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full mt-20">
                        <div className="space-y-4 w-full">

                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                                Simple Integration for Travel Platforms
                            </h2>
                            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Integrate cryptocurrency payments into booking engines, reservation systems, and travel applications with minimal effort.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                            {devCapabilities.map((cap) => (
                                <div key={cap.title} className="p-5 bg-white border border-[#E2E8F0] rounded-2xl space-y-2 hover:border-blue-400/20 hover:shadow-sm transition-all">
                                    <h4 className="font-extrabold text-sm text-[#0F172A] flex items-center gap-1.5">
                                        <Check className="w-4 h-4 text-blue-600 shrink-0" />
                                        <span>{cap.title}</span>
                                    </h4>
                                    <p className="text-xs text-[#64748B] leading-relaxed">{cap.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div> */}

            {/* </div>
            </section> */}

            {/* ================= 8. PERFECT FOR ================= */}
            {/* <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center">
                <div className="space-y-4 max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Tailored for Every Travel Scale
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        A dynamic Web3 financial gateway built for vacation platforms, airlines, and hotel networks.
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
                        "International guests can now complete reservations without worrying about payment restrictions or exchange rates. ChainPay helped us create a truly global booking experience."
                    </p>

                    <div className="mt-8 flex justify-center items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black shadow-sm">
                            MH
                        </div>
                        <div className="text-left">
                            <h4 className="font-extrabold text-base text-[#0F172A]">Marcos Haddon</h4>
                            <p className="text-xs text-[#64748B] font-semibold">VP of Finance, Starway Airways</p>
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
                            Power the Future of Travel Payments
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed">
                            Deliver borderless, secure, and seamless payment experiences for travelers around the world.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            <a
                                href="/api-reference"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 hover:bg-slate-50 font-extrabold rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Start Accepting Crypto
                            </a>
                            {/* <a
                                href="#cta"
                                className="inline-flex items-center justify-center px-8 py-4 bg-blue-700/50 hover:bg-blue-700 text-white font-extrabold rounded-2xl border border-blue-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Talk to Our Team
                            </a> */}
                        </div>
                    </div>
                </motion.div>
            </section>

        </div>
    );
}
