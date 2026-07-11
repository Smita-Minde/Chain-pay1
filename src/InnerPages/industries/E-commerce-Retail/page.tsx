"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ArrowRight,
    Check,
    CheckCircle2,
    Wallet,
    CreditCard,
    TrendingUp,
    Globe,
    Percent,
    Shield,
    Coins,
    Lock,
    Zap,
    RefreshCw,
    Terminal,
    Code2,
    Laptop,
    Server,
    ShoppingBag,
    Cpu,
    Sparkles,
    Layers,
    Activity,
    Star,
    ChevronRight,
    QrCode,
    Copy
} from "lucide-react";

// Interfaces to ensure strict type compliance
interface UseCase {
    title: string;
    description: string;
    icon: React.ElementType;
}

interface Benefit {
    title: string;
    desc: string;
    icon: React.ElementType;
}

interface Step {
    step: string;
    title: string;
    desc: string;
    detail: string;
}

interface BusinessBenefit {
    title: string;
    desc: string;
    stats: string;
    icon: React.ElementType;
}

interface DevCapability {
    title: string;
    desc: string;
    badge: string;
}

interface Platform {
    name: string;
    icon: React.ElementType;
    color: string;
}

interface Transaction {
    id: string;
    amount: string;
    crypto: string;
    usd: string;
    address: string;
    time: string;
    status: "Completed" | "Pending";
}

export default function EcommerceRetail() {
    // --- STATE FOR HERO CHECKOUT ILLUSTRATION ---
    const [checkoutStep, setCheckoutStep] = useState<number>(0);
    const [selectedCrypto, setSelectedCrypto] = useState<string>("USDC");
    const [isCopied, setIsCopied] = useState<boolean>(false);
    const [checkoutAutoplay, setCheckoutAutoplay] = useState<boolean>(true);

    // --- STATE FOR MERCHANT DASHBOARD LEDGER ---
    const [transactions, setTransactions] = useState<Transaction[]>([
        { id: "TX-9482", amount: "79.00", crypto: "USDC", usd: "79.00", address: "0x8e...5a", time: "Just now", status: "Completed" },
        { id: "TX-9481", amount: "0.024", crypto: "ETH", usd: "82.56", address: "0x3f...bc", time: "2 min ago", status: "Completed" },
        { id: "TX-9480", amount: "120.00", crypto: "USDT", usd: "120.00", address: "0x7a...d2", time: "5 min ago", status: "Completed" },
        { id: "TX-9479", amount: "0.0015", crypto: "BTC", usd: "96.45", address: "bc1q...39", time: "12 min ago", status: "Completed" }
    ]);

    // --- STATE FOR TIMELINE STEPS ---
    const [activeTimelineStep, setActiveTimelineStep] = useState<number>(0);
    const [timelineAutoplay, setTimelineAutoplay] = useState<boolean>(true);

    // --- STATE FOR DEVELOPER CODE CONSOLE TAB ---
    const [activeCodeTab, setActiveCodeTab] = useState<"api" | "webhook">("api");
    const [webhookLogs, setWebhookLogs] = useState<string[]>([
        "Listening for events...",
        "Waiting for webhook triggers..."
    ]);
    const [isTriggeringWebhook, setIsTriggeringWebhook] = useState<boolean>(false);

    // --- AUTO-ADVANCE HERO CHECKOUT ILLUSTRATION ---
    useEffect(() => {
        if (!checkoutAutoplay) return;
        const interval = setInterval(() => {
            setCheckoutStep((prev) => (prev + 1) % 5);
        }, 4500);
        return () => clearInterval(interval);
    }, [checkoutAutoplay]);

    // --- TRANSACTION STREAM SIMULATION ---
    useEffect(() => {
        const cryptos = ["USDC", "ETH", "USDT", "BTC"];
        const cryptoRates: Record<string, number> = { USDC: 1, ETH: 3450, USDT: 1, BTC: 64000 };

        const interval = setInterval(() => {
            const amountUSD = (Math.random() * 150 + 20).toFixed(2);
            const chosenCrypto = cryptos[Math.floor(Math.random() * cryptos.length)];
            const cryptoAmount = (parseFloat(amountUSD) / cryptoRates[chosenCrypto]).toFixed(
                chosenCrypto === "BTC" ? 5 : chosenCrypto === "ETH" ? 4 : 2
            );
            const randomHex = Math.random().toString(16).substring(2, 6);
            const address = `0x${randomHex}...${Math.random().toString(16).substring(2, 4)}`;

            const newTx: Transaction = {
                id: `TX-${Math.floor(Math.random() * 5000 + 5000)}`,
                amount: cryptoAmount,
                crypto: chosenCrypto,
                usd: amountUSD,
                address,
                time: "Just now",
                status: "Completed"
            };

            setTransactions((prev) => {
                const updated = prev.map((tx) => ({
                    ...tx,
                    time: tx.time === "Just now" ? "1 min ago" : tx.time.includes("min") ? `${parseInt(tx.time) + 1} min ago` : tx.time
                }));
                return [newTx, ...updated.slice(0, 3)];
            });
        }, 5500);

        return () => clearInterval(interval);
    }, []);

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

    const triggerWebhookSimulate = () => {
        if (isTriggeringWebhook) return;
        setIsTriggeringWebhook(true);
        setWebhookLogs((prev) => ["Sending request POST /v1/webhooks...", ...prev]);

        setTimeout(() => {
            setWebhookLogs((prev) => [
                "Received event 'payment.succeeded' (ID: evt_92A0x)",
                "Headers verified.",
                "Response status: 200 OK",
                ...prev.slice(0, 5)
            ]);
            setIsTriggeringWebhook(false);
        }, 1500);
    };

    // --- DATA SOURCES ---
    const benefits: Benefit[] = [
        {
            title: "Global Commerce Access",
            desc: "Accept payments from customers worldwide.",
            icon: Globe
        },
        {
            title: "Slash Settlement Costs",
            desc: "Reduce payment processing costs.",
            icon: Percent
        },
        {
            title: "Absolute Chargeback Immunity",
            desc: "Eliminate chargebacks and fraudulent disputes.",
            icon: Shield
        },
        {
            title: "Self-Controlled Custody",
            desc: "Receive funds directly into merchant-controlled wallets",
            icon: Wallet
        },
        {
            title: "Unified Web3 Interface",
            desc: "Support multiple cryptocurrencies through a single integration.",
            icon: Coins
        }
    ];

    const useCases: UseCase[] = [
        {
            title: "Online Fashion Stores",
            description: "Accept international payments without currency conversion challenges.",
            icon: ShoppingBag
        },
        {
            title: "Electronics & Gadgets",
            description: "Enable secure high-value purchases with instant confirmations.",
            icon: Laptop
        },
        {
            title: "Digital Marketplaces",
            description: "Sell software, templates, subscriptions, and downloadable products globally.",
            icon: Layers
        },
        {
            title: "Luxury & Premium Brands",
            description: "Provide alternative payment options for modern crypto-native customers.",
            icon: Sparkles
        },
        {
            title: "Cross-Border Commerce",
            description: "Expand into new markets without traditional banking limitations.",
            icon: Globe
        }
    ];

    // const timelineSteps: Step[] = [
    //     {
    //         step: "Step 01",
    //         title: "Customer Chooses Crypto",
    //         desc: "At checkout, the user selects 'Pay with Crypto' and selects their preferred digital asset.",
    //         detail: "ChainPay converts checkout amounts dynamically into real-time crypto prices."
    //     },
    //     {
    //         step: "Step 02",
    //         title: "ChainPay Spawns Wallet",
    //         desc: "A unique, single-use smart deposit address is instant-generated for the order.",
    //         detail: "Dedicated wallets ensure precise order-to-transaction matching automatically."
    //     },
    //     {
    //         step: "Step 03",
    //         title: "Customer Submits Payment",
    //         desc: "The buyer scans the QR code or connects their browser wallet to send the asset.",
    //         detail: "Supports Metamask, Phantom, WalletConnect, Coinbase Wallet, and more."
    //     },
    //     {
    //         step: "Step 04",
    //         title: "Verification On-Chain",
    //         desc: "ChainPay instantly registers the transaction and tracks blockchain confirmations.",
    //         detail: "Merchants and buyers receive live transaction progress indicators."
    //     },
    //     {
    //         step: "Step 05",
    //         title: "Settle and Fulfill",
    //         desc: "Funds route to the merchant wallet while webhook alerts trigger order fulfillment.",
    //         detail: "Order database is updated immediately, automating shipping and invoices."
    //     }
    // ];

    const businessBenefits: BusinessBenefit[] = [
        {
            title: "Lowest Fees",
            desc: "Retain up to 3% more margin on every invoice. Say goodbye to card scheme fees and compliance surcharges.",
            stats: "1% flat fee",
            icon: Percent
        },
        {
            title: "Global Reach",
            desc: "Eliminate regional payment lockouts and sell globally to any individual with an internet connection.",
            stats: "190+ Countries",
            icon: Globe
        },
        {
            title: "Instant Settlement",
            desc: "Accelerate operational cash flow. Funds reach your target wallet in seconds, avoiding payout delays.",
            stats: "Seconds to clear",
            icon: Zap
        },
        {
            title: "Zero Chargebacks",
            desc: "Neutralize friendly fraud. Eliminate the costly cycles of disputes, evidence uploads, and high chargeback fines.",
            stats: "100% finality",
            icon: Shield
        },
        {
            title: "Non-Custodial Security",
            desc: "Ensure enterprise grade risk management. Funds are settled directly to you without third-party holding periods.",
            stats: "True Custody",
            icon: Lock
        }
    ];

    const devCapabilities: DevCapability[] = [
        {
            title: "Clean REST API",
            desc: "Initialize hosted checkout pages or build customized headless payment flows in seconds.",
            badge: "RESTful"
        },
        {
            title: "Advanced Webhooks",
            desc: "Receive cryptographically signed payloads notifying backend servers of payment milestones.",
            badge: "JSON / Webhooks"
        },
        {
            title: "Metadata Customization",
            desc: "Append custom keys, product data, and buyer IDs directly to transaction payloads.",
            badge: "Extensible"
        },
        {
            title: "Checkout Branding",
            desc: "Inject logos, custom color patterns, and fonts to match merchant interfaces.",
            badge: "Tailored UI"
        },
        {
            title: "Sandbox Testing",
            desc: "Simulate testnet transactions, confirmations, and webhook failures without real capital.",
            badge: "Dev Environment"
        },
        {
            title: "Multi-Store Controls",
            desc: "Manage multiple online storefronts, API keys, and configurations from a single portal.",
            badge: "Multi-tenant"
        }
    ];

    const platforms: Platform[] = [
        { name: "Shopify", icon: ShoppingBag, color: "from-green-500/10 to-emerald-500/20 text-green-600 border-green-200" },
        { name: "WooCommerce", icon: Layers, color: "from-purple-500/10 to-indigo-500/20 text-purple-600 border-purple-200" },
        { name: "Custom Stores", icon: Code2, color: "from-blue-500/10 to-indigo-500/20 text-blue-600 border-blue-200" },
        { name: "Marketplaces", icon: Globe, color: "from-amber-500/10 to-orange-500/20 text-amber-600 border-amber-200" },
        { name: "Subscriptions", icon: RefreshCw, color: "from-pink-500/10 to-rose-500/20 text-pink-600 border-pink-200" },
        { name: "Digital Products", icon: Cpu, color: "from-teal-500/10 to-cyan-500/20 text-teal-600 border-teal-200" }
    ];

    // Helper variables for Hero Checkout display
    const checkoutCoinValues: Record<string, { value: string; symbol: string; rate: number; label: string }> = {
        USDC: { value: "89.00", symbol: "USDC", rate: 1, label: "USD Coin" },
        USDT: { value: "89.00", symbol: "USDT", rate: 1, label: "Tether" },
        ETH: { value: "0.0258", symbol: "ETH", rate: 3450, label: "Ethereum" },
        BTC: { value: "0.00139", symbol: "BTC", rate: 64000, label: "Bitcoin" }
    };

    const currentCoinData = checkoutCoinValues[selectedCrypto];

    return (
        <div className="relative min-h-screen font-sans bg-[#F8FAFC] text-[#0F172A] overflow-x-hidden">

            {/* ================= BACKGROUND SYSTEM ================= */}
            <div className="absolute inset-0 -z-20 overflow-hidden pointer-events-none">
                {/* Soft Grid Pattern */}
                <div
                    className="absolute inset-0 opacity-[0.18]"
                    style={{
                        backgroundImage: `radial-gradient(#CBD5E1 1.2px, transparent 1.2px)`,
                        backgroundSize: '32px 32px'
                    }}
                />

                {/* Glowing Blurred Blobs */}
                <div className="absolute top-0 left-[5%] w-[40rem] h-[40rem] bg-blue-100/60 rounded-full filter blur-[130px] opacity-75 animate-pulse" style={{ animationDuration: '10s' }} />
                <div className="absolute top-[20%] right-[5%] w-[45rem] h-[45rem] bg-blue-50/50 rounded-full filter blur-[150px] opacity-80" />
                <div className="absolute bottom-[15%] left-[5%] w-[50rem] h-[50rem] bg-blue-100/40 rounded-full filter blur-[160px] opacity-70" />
                <div className="absolute bottom-0 right-[10%] w-[38rem] h-[38rem] bg-[#EFF6FF]/70 rounded-full filter blur-[120px] opacity-90 animate-pulse" style={{ animationDuration: '15s' }} />

                {/* Floating gradient circles */}
                <motion.div
                    animate={{
                        y: [0, -40, 0],
                        x: [0, 20, 0],
                        scale: [1, 1.05, 1]
                    }}
                    transition={{
                        duration: 14,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute top-[15%] right-[20%] w-[25rem] h-[25rem] bg-blue-200/10 rounded-full filter blur-[90px]"
                />
                <motion.div
                    animate={{
                        y: [0, 30, 0],
                        x: [0, -25, 0],
                        scale: [1, 1.06, 1]
                    }}
                    transition={{
                        duration: 18,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                    className="absolute bottom-[30%] left-[10%] w-[28rem] h-[28rem] bg-blue-100/20 rounded-full filter blur-[100px]"
                />
            </div>

            {/* ================= 1. HERO SECTION ================= */}
            <section className="relative pt-10 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">

                    {/* Left Text Column */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 lg:pt-6">

                        {/* Typographic Group (Grouped for hierarchy & spacing) */}
                        <div className="space-y-4 w-full">
                            <motion.h1
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1] sm:leading-none"
                            >
                                Accept Crypto Payments for Your{" "}
                                <span className="bg-blue-500 bg-clip-text text-transparent">
                                    Online Store
                                </span>
                            </motion.h1>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.15 }}
                                className="text-base sm:text-lg font-bold text-[#2563EB] tracking-wide uppercase"
                            >
                                Fast, Borderless, and Frictionless E-Commerce Payments
                            </motion.p>

                            <motion.p
                                initial={{ opacity: 0, y: 15 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                className="text-sm sm:text-base md:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0"
                            >
                                Enable customers worldwide to pay using cryptocurrency while reducing transaction costs and eliminating traditional payment barriers. ChainPay helps online stores deliver modern checkout experiences with instant settlements and seamless integrations.
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
                            {/* <a
                                href="#contact"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] font-semibold rounded-2xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                            >
                                Talk to Our Team
                            </a> */}
                        </motion.div>
                    </div>

                    {/* Right Column: High-Fidelity Checkout Illustration */}
                    <div className="relative flex justify-center lg:justify-end w-full">

                        {/* Background glowing circle */}
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/20 to-indigo-300/10 rounded-full opacity-30 blur-4xl" />

                        {/* Glassmorphic Checkout Card */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-full max-w-[380px] bg-white border border-[#E2E8F0] shadow-2xl rounded-3xl overflow-hidden relative z-10 hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.06)] hover:border-blue-400/10 transition-all duration-300"
                            onMouseEnter={() => setCheckoutAutoplay(false)}
                            onMouseLeave={() => setCheckoutAutoplay(true)}
                        >
                            {/* Card Topbar (Mac window mock) */}
                            <div className="flex items-center justify-between px-6 py-4 border-b border-[#E2E8F0] bg-slate-50/50">
                                {/* <div className="flex items-center gap-1.5">
                                    <span className="w-3.5 h-3.5 rounded-full bg-red-400/80" />
                                    <span className="w-3.5 h-3.5 rounded-full bg-amber-400/80" />
                                    <span className="w-3.5 h-3.5 rounded-full bg-emerald-400/80" />
                                </div> */}
                                <div className="text-xs text-[#64748B] font-mono select-none">checkout.chainpay.com/pay</div>
                                <div className="w-8" />
                            </div>

                            {/* Card Body */}
                            <div className="p-4 sm:p-5 space-y-4">

                                {/* Product Summary Card */}
                                <div className="flex items-center justify-between p-3 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] shadow-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-blue-600 to-[#3B82F6] flex items-center justify-center text-white shadow-sm shrink-0">
                                            <ShoppingBag className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <h4 className="font-extrabold text-xs text-[#0F172A]">AeroMax Running Shoes</h4>
                                            <p className="text-[10px] text-[#64748B] font-semibold">Qty: 1 • Color: Space White</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs font-black text-[#0F172A]">$89.00 USD</span>
                                    </div>
                                </div>

                                {/* Interactive Content Container */}
                                <div className="h-[320px] flex flex-col justify-center overflow-y-auto pr-1">
                                    <AnimatePresence mode="wait">

                                        {/* STEP 0: Coin Selection */}
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
                                                    <h5 className="font-extrabold text-sm text-[#0F172A]">Generating Dynamic Address</h5>
                                                    <p className="text-xs text-[#64748B]">Setting up dynamic receiver wallet routes...</p>
                                                </div>
                                                <button
                                                    onClick={() => setCheckoutStep(2)}
                                                    className="px-4 py-2 border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 text-xs rounded-xl font-bold transition-all"
                                                >
                                                    Skip Loading
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 2: Scan QR */}
                                        {checkoutStep === 2 && (
                                            <motion.div
                                                key="step-qr"
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="space-y-3"
                                            >
                                                <div className="flex justify-between items-center bg-blue-50/60 px-4 py-2 rounded-2xl border border-blue-100/50">
                                                    <span className="text-[11px] font-semibold text-blue-600">Deposit Amount:</span>
                                                    <span className="text-xs font-black text-blue-700">
                                                        {currentCoinData.value} {currentCoinData.symbol}
                                                    </span>
                                                </div>

                                                <div className="flex flex-col sm:flex-row gap-4 items-center p-1 bg-slate-50/30 rounded-2xl border border-slate-100">

                                                    {/* QR Code Container */}
                                                    <div className="relative w-20 h-20 shrink-0 border border-slate-200 rounded-xl bg-white flex items-center justify-center p-1.5 shadow-sm">
                                                        <QrCode className="w-full h-full text-slate-900" />
                                                        {/* Scanning Laser */}
                                                        <motion.div
                                                            animate={{ top: ["8%", "92%", "8%"] }}
                                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                                            className="absolute left-[8%] right-[8%] h-0.5 bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.8)]"
                                                        />
                                                    </div>

                                                    {/* Payment Address Instructions */}
                                                    <div className="space-y-2 text-left w-full">
                                                        <div>
                                                            <p className="text-[9px] font-bold text-[#64748B] uppercase tracking-wider">Store Deposit Address</p>
                                                            <div className="mt-1 flex items-center justify-between p-2 bg-white border border-slate-200 rounded-xl text-[11px] font-mono shadow-inner">
                                                                <span className="text-[#0F172A] truncate pr-2">0x71C94...F3B2</span>
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
                                                            <span>Guaranteed rate: refreshes in 45s</span>
                                                        </div>
                                                    </div>

                                                </div>

                                                <button
                                                    onClick={() => setCheckoutStep(3)}
                                                    className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-extrabold text-xs transition-colors"
                                                >
                                                    I Have Transferred Assets
                                                </button>
                                            </motion.div>
                                        )}

                                        {/* STEP 3: Confirmations Progress */}
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
                                                    <p className="text-xs text-blue-600 font-bold animate-pulse">Waiting for network validation...</p>
                                                </div>
                                                <div className="w-full bg-slate-100 rounded-full h-2 max-w-xs mx-auto overflow-hidden border">
                                                    <motion.div
                                                        initial={{ width: "10%" }}
                                                        animate={{ width: "80%" }}
                                                        transition={{ duration: 4, ease: "easeOut" }}
                                                        className="bg-gradient-to-r from-blue-600 to-blue-400 h-full rounded-full"
                                                    />
                                                </div>
                                                <button
                                                    onClick={() => setCheckoutStep(4)}
                                                    className="px-4 py-2 border border-slate-200 text-[#64748B] hover:text-[#0F172A] hover:bg-slate-50 text-xs rounded-xl font-bold transition-all"
                                                >
                                                    Confirm Instantly
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
                                                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto text-emerald-600 shadow-md">
                                                    <Check className="w-8 h-8 stroke-[3]" />
                                                </div>
                                                <div>
                                                    <h5 className="font-black text-base text-[#0F172A]">Payment Succeeded!</h5>
                                                    <p className="text-[11px] text-emerald-600 font-semibold">Ledger dispatch verified</p>
                                                </div>

                                                <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-2xl max-w-xs mx-auto text-[11px] space-y-1.5 text-left relative overflow-hidden">
                                                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-400" />
                                                    <div className="flex justify-between">
                                                        <span className="text-[#64748B]">Merchant:</span>
                                                        <span className="font-extrabold text-[#0F172A]">Luna Clothing</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[#64748B]">Settlement Amount:</span>
                                                        <span className="font-black text-[#0F172A]">{currentCoinData.value} {currentCoinData.symbol}</span>
                                                    </div>
                                                    <div className="flex justify-between">
                                                        <span className="text-[#64748B]">Tx Hash:</span>
                                                        <span className="font-mono text-[9px] text-blue-600 truncate max-w-[120px]">0x3b89f899e46a1...82c</span>
                                                    </div>
                                                </div>

                                                <button
                                                    onClick={() => {
                                                        setCheckoutStep(0);
                                                        setSelectedCrypto("USDC");
                                                    }}
                                                    className="px-6 py-2 bg-[#EFF6FF] hover:bg-blue-100 text-blue-600 font-extrabold text-[11px] rounded-xl transition-all"
                                                >
                                                    Start New Demo
                                                </button>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>

                                {/* Custom Redesigned Developer Sandbox Timeline Indicator */}
                                <div className="border-t border-slate-100 pt-3 space-y-2">
                                    <div className="flex justify-between items-center text-[10px] font-bold text-[#64748B] uppercase tracking-wider">
                                        <span>Dev Sandbox States</span>
                                        <span className="text-[10px] font-mono text-blue-600 bg-blue-50 px-1.5 py-0.5 rounded border border-blue-100">
                                            Step {checkoutStep + 1} of 5
                                        </span>
                                    </div>

                                    <div className="flex justify-between items-center gap-1">
                                        {[
                                            { label: "Asset", stepVal: 0 },
                                            { label: "Generate", stepVal: 1 },
                                            { label: "Pay", stepVal: 2 },
                                            { label: "Verify", stepVal: 3 },
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
                                                {/* Step Circle/Bar */}
                                                <div className="w-full h-1.5 rounded-full transition-all relative overflow-hidden">
                                                    <div className={`absolute inset-0 transition-all duration-300 ${checkoutStep >= stepObj.stepVal
                                                        ? "bg-blue-600"
                                                        : "bg-slate-200"
                                                        }`} />
                                                    {checkoutStep === stepObj.stepVal && (
                                                        <div className="absolute inset-0 bg-blue-400 animate-pulse" />
                                                    )}
                                                </div>
                                                {/* Label */}
                                                <span className={`text-[9px] font-extrabold tracking-tight transition-colors duration-200 ${checkoutStep === stepObj.stepVal
                                                    ? "text-blue-600"
                                                    : "text-[#64748B] group-hover:text-[#0F172A]"
                                                    }`}>
                                                    {stepObj.label}
                                                </span>
                                            </button>
                                        ))}
                                    </div>
                                </div>

                            </div>
                        </motion.div>

                        {/* Floating Crypto Badges with Sinusoidal Hover Float */}
                        <motion.div
                            animate={{ y: [0, -15, 0], rotate: [0, -5, 5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                            className="absolute top-1/2 right-2 md:-right-8 z-20 bg-white border border-[#E2E8F0] shadow-lg rounded-2xl px-4 py-2 flex items-center gap-2 select-none"
                        >
                            <div className="w-6 h-6 rounded-full bg-indigo-600 text-white flex items-center justify-center text-[10px] font-extrabold">Ξ</div>
                            <span className="text-xs font-extrabold text-[#0F172A]">ETH</span>
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ================= 2. WHY E-COMMERCE CHOOSE CHAINPAY ================= */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Benefits Content */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div className="space-y-4 w-full">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                                Why E-Commerce Businesses Choose ChainPay
                            </h2>
                            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Modern online businesses require payment solutions that are fast, secure, and globally accessible. ChainPay enables merchants to serve international customers without relying on expensive intermediaries.
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

                    {/* Right Column: E-Commerce & Retail Crypto Payments Illustration */}
                    <div className="relative flex justify-center lg:justify-end w-full">

                        <div className="absolute -inset-4 bg-gradient-to-br from-blue-300/10 to-indigo-150/10 rounded-full opacity-30 blur-3xl" />

                        {/* Card Container (Preserving identical dimensions, borders, and rounded corners) */}
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full max-w-lg bg-white border border-[#E2E8F0] shadow-xl rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-blue-400/20 transition-all duration-300 flex items-center justify-center aspect-[4/5] min-h-[500px]"
                        >
                            <img
                                src="/images/ecommerce_crypto_payment.png"
                                alt="E-Commerce Crypto Payment illustration"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </div>

                </div>
            </section>

            {/* ================= 3. COMMON USE CASES ================= */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
                <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A] mt-10">
                        Optimized for Every E-Commerce Vertical
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed mt-5">
                        Discover how diverse online retail stores leverage ChainPay to secure payments and streamline settlements.
                    </p>
                </div>

                {/* Responsive Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {useCases.map((uc, index) => {
                        const IconComponent = uc.icon;
                        return (
                            <motion.div
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={uc.title}
                                className="bg-white border border-[#E2E8F0] rounded-3xl p-8 hover:border-blue-400/30 hover:-translate-y-2 hover:shadow-[0_20px_45px_rgba(0,0,0,0.03)] transition-all duration-300 text-left flex flex-col justify-between"
                            >
                                <div className="space-y-6">
                                    {/* Icon with light blue rounded block */}
                                    <div className="w-12 h-12 rounded-2xl bg-[#EFF6FF] border border-blue-100 text-blue-600 flex items-center justify-center">
                                        <IconComponent className="w-6 h-6" />
                                    </div>
                                    <div className="space-y-2">
                                        <h3 className="text-xl font-extrabold text-[#0F172A]">{uc.title}</h3>
                                        <p className="text-sm text-[#64748B] leading-relaxed">{uc.description}</p>
                                    </div>
                                </div>

                                <div className="pt-6 mt-6 border-t border-slate-100 flex items-center text-xs font-extrabold text-blue-600 hover:text-blue-700 cursor-pointer">
                                    <span>Explore Case Study</span>
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* ================= 4. CHECKOUT EXPERIENCE ================= */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Side: Mock Mobile Checkout App */}
                    <div className="relative flex justify-center lg:justify-start w-full">

                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-300 to-indigo-100 rounded-full opacity-10 blur-3xl" />

                        {/* E-Commerce Checkout Experience Illustration Card */}
                        <motion.div
                            initial={{ opacity: 1, y: 0 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6 }}
                            className="w-full max-w-lg bg-white border border-[#E2E8F0] shadow-xl rounded-[2rem] overflow-hidden hover:shadow-[0_20px_50px_rgba(0,0,0,0.06)] hover:border-blue-400/20 transition-all duration-300 flex items-center justify-center aspect-square relative"
                            style={{ aspectRatio: "1" }}
                        >
                            {/* Phone Speaker & Camera Notch (Commented out for card style) */}
                            {/* <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-900 rounded-b-2xl z-30 flex justify-center items-center">
                                <span className="w-12 h-1 bg-slate-800 rounded-full mb-1" />
                            </div> */}

                            {/* E-Commerce Checkout GIF */}
                            <img
                                src="/images/ecommerce.gif"
                                alt="E-Commerce Checkout Experience"
                                className="w-full h-full object-cover absolute inset-0"
                            />

                            {/* Screen Container */}
                            {/* <div className="flex-1 bg-[#F8FAFC] pt-8 px-4 pb-4 flex flex-col justify-between overflow-y-auto scrollbar-none"> */}

                            {/* Store Header */}
                            {/* <div className="flex items-center justify-between pb-3 border-b border-slate-200/60">
                                    <div className="flex items-center gap-1.5">
                                        <span className="w-6 h-6 rounded-lg bg-blue-600 flex items-center justify-center text-white font-extrabold text-[10px]">L</span>
                                        <span className="text-xs font-black tracking-tight text-[#0F172A]">LUNA CLOTHING</span>
                                    </div>
                                    <span className="text-[10px] font-bold text-[#64748B]">Cart ($120)</span>
                                </div> */}

                            {/* Checkout Page */}
                            {/* <div className="space-y-4 py-4 flex-1">
                                    <h4 className="text-sm font-extrabold text-left text-[#0F172A]">Payment Method</h4> */}

                            {/* Select Payment Box */}
                            {/* <div className="space-y-2">
                                        <div className="p-3 border border-slate-200 rounded-xl bg-white flex items-center justify-between cursor-pointer opacity-60">
                                            <div className="flex items-center gap-2">
                                                <CreditCard className="w-4 h-4 text-[#64748B]" />
                                                <span className="text-xs font-semibold text-[#0F172A]">Credit Card</span>
                                            </div>
                                            <span className="w-4.5 h-4.5 rounded-full border border-slate-300" />
                                        </div>

                                        <div className="p-3 border-2 border-blue-600 rounded-xl bg-blue-50/20 flex items-center justify-between cursor-pointer">
                                            <div className="flex items-center gap-2">
                                                <Coins className="w-4 h-4 text-blue-600" />
                                                <span className="text-xs font-bold text-[#0F172A]">Cryptocurrency</span>
                                            </div>
                                            <span className="w-4.5 h-4.5 rounded-full border-4 border-blue-600 bg-white" />
                                        </div>
                                    </div> */}

                            {/* ChainPay Embedded Widget Mock */}
                            {/* <div className="p-4 bg-white border border-[#E2E8F0] rounded-2xl shadow-sm space-y-3">
                                        <div className="flex justify-between items-center text-[10px] text-[#64748B]">
                                            <span>SECURE CRYPTO PAY</span>
                                            <span className="font-extrabold text-blue-600">ChainPay</span>
                                        </div>

                                        <div className="p-2 bg-slate-50 border border-slate-100 rounded-lg flex items-center justify-between">
                                            <div className="flex items-center gap-1.5 min-w-0">
                                                <div className="w-5 h-5 rounded bg-blue-600/10 text-blue-600 flex items-center justify-center font-bold text-[9px] shrink-0">$</div>
                                                <span className="text-[11px] font-bold text-[#0F172A] truncate">USDC (USD Coin)</span>
                                            </div>
                                            <span className="text-[11px] font-mono text-[#0F172A] font-extrabold shrink-0">120.00</span>
                                        </div>

                                        <button className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1">
                                            <Wallet className="w-3.5 h-3.5" />
                                            <span>Pay with Wallet</span>
                                        </button>
                                    </div> */}
                            {/* </div> */}

                            {/* Bottom navigation info */}
                            {/* <div className="text-center text-[10px] text-[#64748B] pt-2 border-t border-slate-200/60">
                                    🔒 Encrypted E-Commerce Payment
                                </div> */}

                            {/* </div> */}

                            {/* iOS Home Indicator Bar */}
                            {/* <div className="h-6 w-full bg-slate-900 flex justify-center items-end pb-1">
                                <span className="w-20 h-1 bg-slate-700 rounded-full" />
                            </div> */}
                        </motion.div>


                    </div>

                    {/* Right Side: Capabilities List */}
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8">
                        <div className="space-y-4 w-full">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                                A Checkout Experience Designed for Conversion
                            </h2>
                            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                ChainPay provides hosted payment pages and embedded checkout widgets that minimize friction, improve buyer confidence, and maximize conversions.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                            {[
                                { title: "Branded Checkout Pages", desc: "Inject logos and customized store colors to make checkouts feel native." },
                                { title: "Multiple Cryptocurrencies", desc: "Accept USDC, USDT, BTC, ETH, and other assets instantly." },
                                { title: "Real-Time Payment Updates", desc: "Keep buyers informed with immediate transaction feedback." },
                                { title: "QR Code Wallet Support", desc: "Allow mobile wallet payments with static/dynamic codes." },
                                { title: "Automatic Confirmations", desc: "Skip manual tracking. ChainPay handles blockchain verification." },
                                { title: "Custom Success Pages", desc: "Redirect users back to custom confirmation screens seamlessly." }
                            ].map((item, idx) => (
                                <div key={idx} className="p-5 bg-white border border-[#E2E8F0] rounded-2xl space-y-2 hover:border-blue-400/20 hover:shadow-sm transition-all">
                                    <div className="flex items-center gap-2 text-blue-600">
                                        <CheckCircle2 className="w-5 h-5 fill-blue-50 shrink-0" />
                                        <span className="font-extrabold text-sm text-[#0F172A]">{item.title}</span>
                                    </div>
                                    <p className="text-xs text-[#64748B] leading-relaxed pl-7">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </section>

            {/* ================= 5. HOW IT WORKS TIMELINE ================= */}
            {/* <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100"> */}
            {/* <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        How It Works
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B]">
                        From wallet selection to backend dispatch, ChainPay coordinates a secure, lightning-fast payment journey.
                    </p>
                </div> */}

            {/* Timeline Interaction Selector */}
            {/* <div className="flex justify-center items-center gap-2 mb-12">
                    <span className="text-xs font-mono text-[#64748B] mr-2">TIMELINE PLAY:</span>
                    <button
                        onClick={() => setTimelineAutoplay(!timelineAutoplay)}
                        className={`px-3 py-1.5 rounded-lg border text-xs font-extrabold flex items-center gap-1.5 transition-all ${timelineAutoplay
                            ? "bg-blue-600 text-white border-blue-600"
                            : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                            }`}
                    >
                        {timelineAutoplay ? (
                            <>
                                <span className="w-2 h-2 bg-white rounded-full animate-ping" /> Autoplay Active
                            </>
                        ) : (
                            "Play Slideshow"
                        )}
                    </button>
                </div> */}

            {/* Re-Engineered Unified Timeline Container to Ensure Circle & Card Alignment */}
            {/* <div className="relative max-w-5xl mx-auto mt-12">
                <div className="absolute left-6 top-6 bottom-6 w-1 bg-slate-200 lg:hidden -translate-x-1/2 z-0" />
                <div className="absolute left-[10%] right-[10%] top-6 h-1 bg-[#E2E8F0] hidden lg:block -translate-y-1/2 z-0" />
                <motion.div
                    animate={{ width: `${(activeTimelineStep / 4) * 80}%` }}
                    transition={{ duration: 0.5 }}
                    className="absolute left-[10%] top-6 h-1 bg-gradient-to-r from-blue-600 to-blue-400 hidden lg:block -translate-y-1/2 z-0"
                />
            </div> */}

            {/* Timeline items list */}
            {/* <div className="flex flex-col lg:flex-row lg:grid lg:grid-cols-5 gap-8 lg:gap-6 relative z-10"> */}
            {/* {timelineSteps.map((step, idx) => (
                            <div key={idx} className="flex flex-row lg:flex-col items-start lg:items-center gap-6 lg:gap-0"> */}

            {/* Timeline Badge (Circle) */}
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

            {/* Step Description Card */}
            {/* <motion.div
                                    onClick={() => {
                                        setActiveTimelineStep(idx);
                                        setTimelineAutoplay(false);
                                    }}
                                    animate={{
                                        scale: activeTimelineStep === idx ? 1.02 : 0.98,
                                        borderColor: activeTimelineStep === idx ? "#3B82F6" : "#E2E8F0"
                                    }}
                                    transition={{ duration: 0.3 }}
                                    className={`flex-1 w-full bg-white border rounded-[2rem] p-6 text-left cursor-pointer transition-all hover:shadow-md relative overflow-hidden flex flex-col justify-between ${activeTimelineStep === idx ? "shadow-lg shadow-blue-500/5 ring-1 ring-blue-500/30" : ""
                                        }`}
                                > */}
            {/* <div className="flex justify-between items-center mb-4">
                                        <span className={`text-[10px] font-black tracking-wider uppercase px-2 py-0.5 rounded ${activeTimelineStep === idx ? "bg-blue-50 text-blue-600" : "bg-slate-100 text-[#64748B]"
                                            }`}>
                                            {step.step}
                                        </span>
                                        {activeTimelineStep > idx && (
                                            <CheckCircle2 className="w-4.5 h-4.5 text-emerald-500 fill-emerald-50" />
                                        )}
                                    </div> */}

            {/* <div className="space-y-2">
                                        <h4 className="font-extrabold text-base text-[#0F172A]">{step.title}</h4>
                                        <p className="text-xs text-[#64748B] leading-relaxed">{step.desc}</p>
                                    </div> */}

            {/* Sub details shown under step */}
            {/* <div className="mt-5 pt-3 border-t border-slate-100">
                                        <p className="text-[10px] text-blue-600 font-semibold italic">{step.detail}</p>
                                    </div>
                                </motion.div> */}

            {/* </div> */}
            {/* // ))} */}
            {/* </div> */}
            {/* </div> */}
            {/* </section> */}

            {/* ================= 6. BUSINESS BENEFITS ================= */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
                <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Core Business Advantages
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B]">
                        ChainPay optimizes retail operations, reducing cost overheads while improving the global check-out experience.
                    </p>
                </div>

                {/* Grid of 5 Cards - Optimized for responsive breaks */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mt-10">
                    {businessBenefits.map((benefit, index) => {
                        const Icon = benefit.icon;
                        return (
                            <motion.div
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true, margin: "-80px" }}
                                initial={{ opacity: 0, y: 20 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                key={benefit.title}
                                className="bg-white border border-[#E2E8F0] rounded-3xl p-6 hover:border-blue-400/30 hover:-translate-y-1.5 hover:shadow-lg transition-all duration-300 text-left flex flex-col justify-between h-full"
                            >
                                <div className="space-y-5">
                                    <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] border border-blue-100 text-blue-600 flex items-center justify-center">
                                        <Icon className="w-5 h-5" />
                                    </div>
                                    <div className="space-y-1.5">
                                        <h4 className="font-extrabold text-sm text-[#0F172A]">{benefit.title}</h4>
                                        <p className="text-[11px] text-[#64748B] leading-relaxed">{benefit.desc}</p>
                                    </div>
                                </div>

                                <div className="pt-4 mt-4 border-t border-slate-100">
                                    <span className="text-xs font-black text-blue-600 font-mono">{benefit.stats}</span>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </section>




            {/* ================= 8. PERFECT FOR ================= */}
            {/* <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100"> */}
            {/* <div className="space-y-4 text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-3xl font-extrabold tracking-tight text-[#0F172A]">
                        Compatible Store Frontends
                    </h2>
                    <p className="text-base text-[#64748B]">
                        ChainPay links directly with global retail platforms, web store plugins, and custom-built static code bases.
                    </p>
                </div> */}

            {/* Interactive Platform Chips */}
            {/* <div className="flex flex-wrap justify-center gap-4 max-w-4xl mx-auto">
                    {platforms.map((platform, idx) => {
                        const Icon = platform.icon;
                        return (
                            <motion.div
                                whileHover={{ scale: 1.05, y: -2 }}
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                key={platform.name}
                                className={`px-5 py-3 border rounded-full flex items-center gap-2.5 cursor-pointer bg-gradient-to-r shadow-sm transition-all ${platform.color}`}
                            >
                                <Icon className="w-4 h-4 shrink-0" />
                                <span className="font-extrabold text-sm">{platform.name}</span>
                            </motion.div>
                        );
                    })}
                </div> */}
            {/* </section> */}

            {/* ================= 9. CUSTOMER TESTIMONIAL ================= */}
            <section className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto border-t border-slate-100">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="bg-white border border-[#E2E8F0] shadow-xl rounded-[2.5rem] p-8 md:p-12 relative text-center space-y-6 hover:shadow-[0_20px_50px_rgba(0,0,0,0.04)] transition-all duration-300"
                >
                    {/* Quote bubble absolute label */}
                    <div className="w-14 h-14 bg-[#EFF6FF] text-blue-600 rounded-full flex items-center justify-center mx-auto text-3xl font-serif">
                        “
                    </div>

                    <div className="flex justify-center gap-1">
                        {[1, 2, 3, 4, 5].map((s) => (
                            <Star key={s} className="w-5 h-5 fill-amber-400 text-amber-400" />
                        ))}
                    </div>

                    <blockquote className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0F172A] leading-relaxed italic">
                        "ChainPay helped us expand internationally without worrying about banking limitations or excessive payment fees. Integration took less than a day, and our customers love the simplicity."
                    </blockquote>

                    {/* User Bio */}
                    <div className="flex items-center justify-center gap-3 pt-4">
                        <div className="w-11 h-11 bg-gradient-to-tr from-blue-600 to-indigo-400 rounded-full flex items-center justify-center text-black font-extrabold text-sm shadow-md">
                            JD
                        </div>
                        <div className="text-left">
                            <h5 className="font-extrabold text-sm text-[#0F172A]">Julian Drake</h5>
                            <p className="text-xs text-[#64748B]">Founder, Horizon Apparel</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ================= 10. FINAL CTA ================= */}
            <section id="cta" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, scale: 0.98 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative bg-gradient-to-br from-blue-600 to-indigo-700 text-white rounded-[2.5rem] p-8 md:p-16 text-center text-white shadow-2xl overflow-hidden"
                >
                    {/* Inner Glowing gradients */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full filter blur-[80px]" />
                    <div className="absolute bottom-0 left-0 w-80 h-80 bg-blue-400/20 rounded-full filter blur-[70px]" />

                    <div className="relative z-10 space-y-8 max-w-2xl mx-auto">
                        <h2 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tight leading-tight">
                            Modernize Your E-Commerce Payments
                        </h2>
                        <p className="text-base sm:text-lg text-blue-50 leading-relaxed">
                            Join online businesses worldwide that are using ChainPay to deliver faster, simpler, and more accessible payment experiences.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4 w-full sm:w-auto">
                            <a
                                href="/api-reference"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 font-bold rounded-2xl shadow-lg hover:shadow-xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
                            >
                                Start Accepting Crypto
                            </a>
                            <a
                                href="/integration-docs"
                                className="w-full sm:w-auto inline-flex items-center justify-center px-8 py-4 bg-blue-700/40 hover:bg-blue-700/60 border border-blue-400/30 text-white font-bold rounded-2xl hover:scale-[1.03] active:scale-[0.97] transition-all duration-200"
                            >
                                View Integration Docs
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

        </div >
    );

}
