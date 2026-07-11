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
    Send,
    FileText,
    Briefcase,
    BookOpen,
    ArrowUpRight,
    Users,
    ChevronDown,
    Building2,
    Terminal,
    Eye,
    ShoppingBag
} from "lucide-react";

export default function StartupsEnterprises() {
    // --- STATE FOR INTERACTIVE MOCKUP SHOWCASE ---
    const [activeFeatureIndex, setActiveFeatureIndex] = useState(0);

    // --- STATE FOR DYNAMIC HERO STATS ---
    const [liveTxCount, setLiveTxCount] = useState(14258);
    const [liveSuccessRate, setLiveSuccessRate] = useState(99.98);

    // --- STATE FOR HOW IT WORKS STEPS ---
    const [activeStep, setActiveStep] = useState(0);
    const [stepAutoplay, setStepAutoplay] = useState(true);

    // --- INCREMENT LIVE STATS ---
    useEffect(() => {
        const interval = setInterval(() => {
            setLiveTxCount((prev) => prev + Math.floor(Math.random() * 3) + 1);
            if (Math.random() > 0.85) {
                setLiveSuccessRate((prev) => {
                    const diff = (Math.random() - 0.5) * 0.02;
                    const next = parseFloat((prev + diff).toFixed(2));
                    return next > 100 ? 100 : next < 99.9 ? 99.92 : next;
                });
            }
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    // --- TIMELINE AUTOPLAY ---
    useEffect(() => {
        if (!stepAutoplay) return;
        const interval = setInterval(() => {
            setActiveStep((prev) => (prev + 1) % 5);
        }, 4000);
        return () => clearInterval(interval);
    }, [stepAutoplay]);

    // --- DATA COLLECTIONS ---
    const supportedBusinesses = [
        {
            title: "Technology Startups",
            desc: "Launch global products without payment limitations or regional barriers.",
            icon: Laptop
        },
        {
            title: "SaaS Platforms",
            desc: "Accept subscriptions, upgrades, and enterprise contracts through cryptocurrency payments.",
            icon: Layers
        },
        {
            title: "Digital Marketplaces",
            desc: "Enable secure transactions between buyers and sellers worldwide.",
            icon: ShoppingBag
        },
        {
            title: "Enterprise Organizations",
            desc: "Integrate blockchain payments into existing operational workflows.",
            icon: Building2
        },
        {
            title: "Financial Platforms",
            desc: "Expand digital payment capabilities while maintaining compliance and security.",
            icon: Briefcase
        },
        {
            title: "Digital Product Companies",
            desc: "Sell software, services, and memberships to a global audience.",
            icon: Sparkles
        }
    ];

    const businessBenefits = [
        {
            title: "Rapid Time-To-Market",
            desc: "Launch cryptocurrency payments within days instead of months.",
            stats: "Immediate setup",
            icon: Zap
        },
        {
            title: "Global Expansion",
            desc: "Accept payments from customers across multiple countries and regions.",
            stats: "Borderless checkout",
            icon: Globe
        },
        {
            title: "Lower Operating Costs",
            desc: "Reduce payment processing expenses and eliminate unnecessary intermediaries.",
            stats: "1% flat fee",
            icon: Percent
        },
        {
            title: "Complete Ownership",
            desc: "Maintain direct control over business funds through a non-custodial model.",
            stats: "True Custody",
            icon: Lock
        },
        {
            title: "Reliable Infrastructure",
            desc: "Operate with highly available systems designed for enterprise requirements.",
            stats: "99.99% Uptime SLA",
            icon: Shield
        }
    ];

    const enterpriseCapabilities = [
        {
            title: "Dedicated account management",
            desc: "Access specialized customer support lines and infrastructure engineers 24/7."
        },
        {
            title: "Volume-based pricing models",
            desc: "Optimize transaction overheads with customized processing rates tailored to your scale."
        },
        {
            title: "White-label payment experiences",
            desc: "Integrate custom client checkout widgets that reflect your brand assets."
        },
        {
            title: "Multi-team access controls",
            desc: "Delegate account scopes and permissions to finance teams or developers securely."
        },
        {
            title: "Advanced analytics and reporting",
            desc: "Consolidate invoicing metrics, coin breakdowns, and tax statements into clean logs."
        },
        {
            title: "Custom integrations & support",
            desc: "Work directly with our implementation team to map payments onto customized ERP modules."
        },
        {
            title: "SLA-backed enterprise services",
            desc: "Enjoy peace of mind with legal service level agreements ensuring high system availability."
        }
    ];

    const developerCapabilities = [
        {
            title: "Comprehensive API documentation",
            desc: "Browse our clean, clear implementation manuals and reference guides."
        },
        {
            title: "Sandbox environments",
            desc: "Test billing links, currency selections, and confirmation alerts without spending real assets."
        },
        {
            title: "GitHub integration examples",
            desc: "Clone pre-built check-out templates and SDK libraries in popular frameworks."
        },
        {
            title: "Webhook systems",
            desc: "Receive callback events to register client deposits on-chain instantly."
        },
        {
            title: "Custom payment workflows",
            desc: "Build customized milestone checkpoints or team payout distribution algorithms."
        },
        {
            title: "Secure API authentications",
            desc: "Authorize server requests using industry-standard cryptographic access keys."
        }
    ];

    const scaleFeatures = [
        {
            title: "Hosted checkout experiences",
            desc: "Direct players or clients to highly secure, responsive, and pre-built payment portals.",
            preview: {
                title: "Hosted Invoice Portal",
                details: [
                    { label: "Billed To", value: "Acme Corp" },
                    { label: "Total Due", value: "$12,450.00 USDC" },
                    { label: "Network State", value: "Awaiting Deposit..." }
                ]
            }
        },
        {
            title: "REST APIs and webhooks",
            desc: "Automate system actions upon confirmed cryptographic wallet payouts.",
            preview: {
                title: "Live Webhook Listener",
                details: [
                    { label: "Callback Route", value: "/api/chainpay/v1" },
                    { label: "Status Alert", value: "Listening for POST events" },
                    { label: "Last Verified Event", value: "invoice.cleared (2s ago)" }
                ]
            }
        },
        {
            title: "Custom metadata support",
            desc: "Append internal account tags, order numbers, and client IDs directly onto transaction records.",
            preview: {
                title: "Metadata Mapping Console",
                details: [
                    { label: "client_id", value: "cl_acme_8940" },
                    { label: "contract_ref", value: "cnt_q4_2026" },
                    { label: "auto_unlock_tier", value: "enterprise_pro" }
                ]
            }
        },
        {
            title: "White-label deployments",
            desc: "Configure fonts, colors, and layout nodes to match the exact aesthetic of your service.",
            preview: {
                title: "Brand Style Configurator",
                details: [
                    { label: "Primary Theme Color", value: "#2563EB (Blue)" },
                    { label: "Checkout Font family", value: "Inter Sans" },
                    { label: "Client Redirect URL", value: "acme.com/success" }
                ]
            }
        },
        {
            title: "Multi-team access",
            desc: "Establish group scopes, roles, and action permissions for accounting and dev groups.",
            preview: {
                title: "Access Permissions Grid",
                details: [
                    { label: "Dev Admin role", value: "Read/Write API keys" },
                    { label: "Finance Auditor", value: "Read-only invoices" },
                    { label: "Operations Manager", value: "Adjust payout routes" }
                ]
            }
        },
        {
            title: "Enterprise reporting tools",
            desc: "Consolidate invoicing logs, payment conversions, and tax sheets into standard CSV folders.",
            preview: {
                title: "Report Logs Exporter",
                details: [
                    { label: "Settle Period", value: "Q2 2026 Archive" },
                    { label: "Total Volume", value: "$482,910.00 USD" },
                    { label: "Export File Format", value: "CSV Spreadsheets" }
                ]
            }
        }
    ];

    const targetChips = [
        "Technology startups",
        "SaaS businesses",
        "Enterprise organizations",
        "Marketplaces",
        "Financial technology companies",
        "Subscription platforms",
        "Digital product ecosystems"
    ];

    const timelineSteps = [
        {
            step: "Step 1",
            title: "Configure your settings",
            desc: "Setup invoice preferences, routing addresses, and currencies inside the merchant portal."
        },
        {
            step: "Step 2",
            title: "Establish integration workflows",
            desc: "Deploy API integrations and check validation logs in the sandbox mode."
        },
        {
            step: "Step 3",
            title: "Deploy payment experiences",
            desc: "Go live using secure hosted portals or direct inline checkout buttons."
        },
        {
            step: "Step 4",
            title: "Receive instant notifications",
            desc: "System listeners catch on-chain actions, verifying payments instantly."
        },
        {
            step: "Step 5",
            title: "Scale operational growth",
            desc: "Optimize payout paths using enterprise analytics and daily volume reports."
        }
    ];

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
                <div className="absolute bottom-0 right-[8%] w-[40rem] h-[40rem] bg-blue-50/70 rounded-full filter blur-[130px] opacity-85" />
            </div>

            {/* ================= 1. HERO SECTION (Asymmetric Centered Immersive Hero Layout) ================= */}
            <section className="relative pt-10 pb-16 md:pt-12 md:pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center">
                <div className="max-w-4xl mx-auto space-y-8">

                    {/* Badge */}
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mx-auto">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>Enterprise Payments Platform</span>
                    </div>

                    {/* Headings */}
                    <div className="space-y-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="text-4xl sm:text-5xl lg:text-7xl font-extrabold tracking-tight text-[#0F172A] leading-[1.1]"
                        >
                            Scale Globally with{" "}
                            <span className="inline-block whitespace-nowrap bg-blue-500 bg-clip-text text-transparent text-3xl sm:text-4xl lg:text-7xl align-baseline">
                                Enterprise-Grade
                            </span>{" "}
                            Crypto Payments
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.15 }}
                            className="text-base sm:text-xl font-semibold text-[#64748B] tracking-wide max-w-2xl mx-auto"
                        >
                            Flexible Infrastructure for Startups, High-Growth Companies, and Global Enterprises
                        </motion.p>

                        <motion.p
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-sm sm:text-base md:text-lg text-[#64748B] leading-relaxed max-w-2xl mx-auto"
                        >
                            Whether you're launching a new product or operating at enterprise scale, ChainPay provides secure, developer-first payment infrastructure designed to support growth, automation, and international expansion.
                        </motion.p>
                    </div>

                    {/* CTAs */}
                    <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.25 }}
                        className="flex flex-col sm:flex-row gap-4 justify-center pt-2"
                    >
                        {/* <a
                            href="#cta"
                            className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#3B82F6] text-white font-semibold rounded-2xl shadow-[0_4px_20px_rgba(37,99,235,0.2)] hover:shadow-[0_4px_25px_rgba(37,99,235,0.35)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
                        >
                            <span>Contact Sales</span>
                            <ArrowRight className="w-5 h-5 ml-2 transition-transform duration-200 group-hover:translate-x-1" />
                        </a> */}
                        <a
                            href="/api-reference"
                            className="inline-flex items-center justify-center px-8 py-4 bg-white border border-[#E2E8F0] hover:bg-slate-50 text-[#0F172A] font-semibold rounded-2xl shadow-sm hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 bg-gradient-to-r from-[#2563EB] to-[#3B82F6]"
                        >
                            Explore API Documentation
                        </a>
                    </motion.div>
                </div>

                {/* Centered Immersive Infrastructure Visualizer Widget (Below Hero Heading) */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="mt-16 w-full max-w-5xl mx-auto bg-white border border-[#E2E8F0] shadow-2xl rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden"
                >
                    <div className="absolute top-0 inset-x-0 h-1.5 bg-gradient-to-r from-blue-600 to-indigo-500" />

                    {/* Live Metric Banner Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-left relative z-10 border-b border-slate-100 pb-6">
                        <div>
                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Operational Node Clusters</p>
                            <h4 className="text-2xl font-black text-[#0F172A] mt-1 flex items-center gap-2">
                                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                                <span>24 Active Nodes</span>
                            </h4>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">Live Transactions Tracked</p>
                            <h4 className="text-2xl font-black text-blue-600 mt-1">
                                {liveTxCount.toLocaleString()} Payments
                            </h4>
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-[#64748B] uppercase tracking-wider">On-Chain Success Rate</p>
                            <h4 className="text-2xl font-black text-emerald-600 mt-1">
                                {liveSuccessRate}% verified
                            </h4>
                        </div>
                    </div>

                    {/* visual block connections layout */}
                    <div className="relative min-h-[160px] flex flex-col md:flex-row justify-between items-center gap-6 pt-2">

                        {/* Box 1 */}
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left w-full md:w-64 space-y-2">
                            <h5 className="font-extrabold text-xs text-[#0F172A] flex items-center gap-1.5">
                                <Building2 className="w-4 h-4 text-blue-600" />
                                <span>Enterprise Platform Gateway</span>
                            </h5>
                            <p className="text-[11px] text-[#64748B]">Automates checkout routing and logs order information.</p>
                        </div>

                        {/* Arrow Line 1 */}
                        <div className="hidden md:block flex-1 border-t-2 border-dashed border-blue-400 h-0 w-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600" />
                        </div>

                        {/* Box 2 */}
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left w-full md:w-64 space-y-2 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-8 h-8 bg-blue-100/30 rounded-bl-full flex items-center justify-center">
                                <Activity className="w-3 h-3 text-blue-600" />
                            </div>
                            <h5 className="font-extrabold text-xs text-[#0F172A]">ChainPay Settlement Hub</h5>
                            <p className="text-[11px] text-[#64748B]">Matches chain values, screens nodes, validates confirmations.</p>
                        </div>

                        {/* Arrow Line 2 */}
                        <div className="hidden md:block flex-1 border-t-2 border-dashed border-blue-400 h-0 w-full relative">
                            <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-blue-600" />
                        </div>

                        {/* Box 3 */}
                        <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl text-left w-full md:w-64 space-y-2">
                            <h5 className="font-extrabold text-xs text-[#0F172A] flex items-center gap-1.5">
                                <Wallet className="w-4 h-4 text-emerald-500" />
                                <span>Configured Wallet Assets</span>
                            </h5>
                            <p className="text-[11px] text-[#64748B]">Settle sums directly to private non-custodial structures.</p>
                        </div>

                    </div>
                </motion.div>
            </section>

            {/* ================= 2. WHY STARTUPS & ENTERPRISES CHOOSE CHAINPAY (Premium Bento Grid Layout) ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100">
                <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Why Startups & Enterprises Choose ChainPay
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        Modern businesses require payment systems that are scalable, reliable, and flexible. ChainPay delivers enterprise capabilities without the complexity of traditional financial infrastructure.
                    </p>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">

                    {/* Bento Cell 1: Global payment acceptance (Col-span-2) */}
                    <div className="md:col-span-2 p-8 bg-white border border-[#E2E8F0] hover:border-blue-400/20 hover:shadow-lg rounded-[2rem] transition-all duration-300 flex flex-col justify-between min-h-[300px] text-left">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                                <Globe className="w-5 h-5" />
                            </div>
                            <h4 className="font-extrabold text-lg text-[#0F172A]">Global Payment Acceptance</h4>
                            <p className="text-sm text-[#64748B] leading-relaxed max-w-md">
                                Accept client payments globally from shoppers located across multiple countries and currency networks without cross-border billing blockades.
                            </p>
                        </div>

                        {/* visual representation inside card */}
                        <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-xs font-semibold">
                            <span className="text-[#64748B]">Active payout routes:</span>
                            <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded border border-blue-100">190+ Countries enabled</span>
                        </div>
                    </div>

                    {/* Bento Cell 2: Enterprise security (Col-span-1) */}
                    <div className="md:col-span-1 p-8 bg-white border border-[#E2E8F0] hover:border-blue-400/20 hover:shadow-lg rounded-[2rem] transition-all duration-300 flex flex-col justify-between min-h-[300px] text-left">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                                <Shield className="w-5 h-5" />
                            </div>
                            <h4 className="font-extrabold text-lg text-[#0F172A]">Enterprise-Grade Security</h4>
                            <p className="text-sm text-[#64748B] leading-relaxed">
                                Experience cryptographic validation, secure API endpoints, and direct blockchain finality.
                            </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-emerald-600 flex items-center gap-1">
                            <Check className="w-4 h-4" /> SECURE LEDGER PROTOCOLS
                        </div>
                    </div>

                    {/* Bento Cell 3: Non-custodial ownership (Col-span-1) */}
                    <div className="md:col-span-1 p-8 bg-white border border-[#E2E8F0] hover:border-blue-400/20 hover:shadow-lg rounded-[2rem] transition-all duration-300 flex flex-col justify-between min-h-[300px] text-left">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                                <Wallet className="w-5 h-5" />
                            </div>
                            <h4 className="font-extrabold text-lg text-[#0F172A]">Non-Custodial Ownership</h4>
                            <p className="text-sm text-[#64748B] leading-relaxed">
                                Maintain absolute authority. Settlement payouts route directly into your target address.
                            </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-slate-100 text-xs font-bold text-blue-600 flex items-center gap-1">
                            <Check className="w-4 h-4" /> NO PLATFORM LOCK-OUTS
                        </div>
                    </div>

                    {/* Bento Cell 4: Flexible API-driven architecture (Col-span-2) */}
                    <div className="md:col-span-2 p-8 bg-white border border-[#E2E8F0] hover:border-blue-400/20 hover:shadow-lg rounded-[2rem] transition-all duration-300 flex flex-col justify-between min-h-[300px] text-left">
                        <div className="space-y-3">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                                <Zap className="w-5 h-5" />
                            </div>
                            <h4 className="font-extrabold text-lg text-[#0F172A]">Flexible API-Driven Architecture</h4>
                            <p className="text-sm text-[#64748B] leading-relaxed max-w-md">
                                Rapidly integrate crypto payments into existing platforms, SaaS billing cycles, or custom checkouts using flexible tools and webhooks.
                            </p>
                        </div>
                        <div className="mt-6 p-4 bg-slate-50 border border-slate-100 rounded-2xl flex items-center justify-between text-xs font-semibold">
                            <span className="text-[#64748B]">Integration speed:</span>
                            <span className="text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-100">Ready in days</span>
                        </div>
                    </div>

                    {/* Bento Cell 5: Infrastructure designed for scale (Col-span-3) */}
                    <div className="md:col-span-3 p-8 bg-white border border-[#E2E8F0] hover:border-blue-400/20 hover:shadow-lg rounded-[2rem] transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center min-h-[200px] text-left gap-6">
                        <div className="space-y-3 max-w-xl">
                            <div className="w-10 h-10 rounded-xl bg-blue-600/10 text-blue-600 flex items-center justify-center">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <h4 className="font-extrabold text-lg text-[#0F172A]">Infrastructure Designed for Scale</h4>
                            <p className="text-sm text-[#64748B] leading-relaxed">
                                Built to support flash sales, spikes in platform volume, and high transaction counts without service slowdowns or node drops.
                            </p>
                        </div>
                        <div className="shrink-0 p-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-2xl text-xs font-bold text-blue-600 space-y-1 min-w-[200px]">
                            <p className="text-[#64748B] uppercase tracking-wider text-[9px]">Uptime SLA Guarantee</p>
                            <p className="text-xl font-black text-[#0F172A]">99.99% Guaranteed</p>
                        </div>
                    </div>

                </div>
            </section>

            {/* ================= 3. SUPPORTED BUSINESSES (Diagonal Hover Grid) ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 mt-20">
                <div className="space-y-4 text-center max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Supported Businesses
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        Scale digital game checkouts, stream memberships, and guild payout distribution modules inside seconds.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-10">
                    {supportedBusinesses.map((item, idx) => {
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

            {/* ================= 4. BUILT FOR SCALE (Interactive Accordion Mockup Showcase) ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 mt-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                    {/* Left Column: Interactive Accordion Features List */}
                    <div className="space-y-6 text-left">
                        <div className="space-y-4">
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                                Infrastructure That Grows With Your Business
                            </h2>
                            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                                ChainPay provides the tools and flexibility required for organizations at every stage of growth.
                            </p>
                        </div>

                        <div className="space-y-3 pt-4">
                            {scaleFeatures.map((feat, idx) => (
                                <button
                                    key={feat.title}
                                    onClick={() => setActiveFeatureIndex(idx)}
                                    className={`w-full p-5 rounded-2xl border text-left transition-all duration-200 flex items-start gap-4 ${activeFeatureIndex === idx
                                        ? "border-blue-600 bg-blue-50/20 ring-1 ring-blue-500/15"
                                        : "border-slate-200 hover:border-blue-300 hover:bg-slate-50/30"
                                        }`}
                                >
                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center font-bold text-xs shrink-0 ${activeFeatureIndex === idx ? "bg-blue-600 text-white" : "bg-slate-100 text-[#64748B]"
                                        }`}>
                                        {idx + 1}
                                    </div>
                                    <div className="space-y-1">
                                        <h4 className="font-extrabold text-sm text-[#0F172A]">{feat.title}</h4>
                                        {activeFeatureIndex === idx && (
                                            <p className="text-xs text-[#64748B] leading-relaxed">{feat.desc}</p>
                                        )}
                                    </div>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Right Column: Dynamic Mockup Preview Screen */}
                    <div className="relative flex justify-center lg:justify-end w-full">
                        <div className="absolute -inset-4 bg-gradient-to-tr from-blue-400/10 to-indigo-100/10 rounded-full opacity-35 blur-3xl" />

                        <div className="w-full max-w-sm bg-white border border-[#E2E8F0] shadow-xl rounded-[2.5rem] p-6 space-y-6 text-left relative overflow-hidden min-h-[300px] flex flex-col justify-between">
                            <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-blue-600 to-indigo-500" />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeFeatureIndex}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="space-y-4 flex-1 flex flex-col justify-between"
                                >
                                    <div className="space-y-1">
                                        <p className="text-[10px] font-bold text-blue-600 uppercase tracking-wider">Enterprise dashboard preview</p>
                                        <h4 className="font-extrabold text-base text-[#0F172A]">{scaleFeatures[activeFeatureIndex].preview.title}</h4>
                                    </div>

                                    <div className="p-4 bg-slate-50 border border-slate-100 rounded-2xl space-y-3">
                                        {scaleFeatures[activeFeatureIndex].preview.details.map((detail, idx) => (
                                            <div key={idx} className="flex justify-between items-center text-xs">
                                                <span className="text-[#64748B]">{detail.label}:</span>
                                                <span className="font-bold text-[#0F172A]">{detail.value}</span>
                                            </div>
                                        ))}
                                    </div>

                                    <div className="flex justify-between items-center text-[10px] text-slate-400 font-bold uppercase tracking-wider pt-4 border-t border-slate-100">
                                        <span className="flex items-center gap-1">
                                            <Shield className="w-3.5 h-3.5 text-emerald-500" /> Auto-Verifying
                                        </span>
                                        <span>Scale Manager</span>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>

                </div>
            </section>

            {/* ================= 5. HOW IT WORKS (Interactive Steps Kanban Pipeline) ================= */}
            {/* <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center">
                <div className="space-y-4 max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Integration Lifecyle Pipeline
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        Follow the seamless operational process from configurations to enterprise scale reporting.
                    </p>

                    <div className="flex justify-center items-center gap-2 pt-2">
                        <span className="text-xs font-mono text-[#64748B] mr-2">PIPELINE AUTOPLAY:</span>
                        <button
                            onClick={() => setStepAutoplay(!stepAutoplay)}
                            className={`px-3 py-1.5 rounded-lg border text-xs font-extrabold flex items-center gap-1.5 transition-all ${stepAutoplay
                                ? "bg-blue-600 text-white border-blue-600"
                                : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50"
                                }`}
                        >
                            {stepAutoplay ? (
                                <>
                                    <span className="w-2 h-2 rounded-full bg-white animate-ping" />
                                    <span>Active</span>
                                </>
                            ) : (
                                <span>Paused</span>
                            )}
                        </button>
                    </div>
                </div>

                <div className="relative max-w-6xl mx-auto mt-12">

                    <div className="absolute left-[8%] right-[8%] top-[24px] h-0.5 bg-[#E2E8F0] hidden lg:block -translate-y-1/2 z-0" />

                    <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 relative z-10">
                        {timelineSteps.map((stepObj, idx) => (
                            <div
                                key={idx}
                                onClick={() => {
                                    setActiveStep(idx);
                                    setStepAutoplay(false);
                                }}
                                className="cursor-pointer space-y-4"
                            >
                                <div className="mx-auto w-12 h-12 rounded-full border-4 flex items-center justify-center font-extrabold text-sm transition-all duration-300 relative z-10 bg-white"
                                    style={{
                                        borderColor: activeStep === idx ? "#2563EB" : "#E2E8F0",
                                        color: activeStep === idx ? "#2563EB" : "#64748B"
                                    }}
                                >
                                    {idx + 1}
                                </div>

                                <div className={`p-6 rounded-[2rem] border text-left bg-white transition-all hover:shadow-md ${activeStep === idx
                                    ? "border-blue-600 shadow-lg ring-1 ring-blue-500/10"
                                    : "border-slate-100 opacity-80"
                                    }`}>
                                    <span className="text-[10px] font-black text-blue-600 uppercase tracking-wider">{stepObj.step}</span>
                                    <h4 className="font-extrabold text-sm text-[#0F172A] mt-2 leading-tight">{stepObj.title}</h4>
                                    <p className="text-xs text-[#64748B] mt-1 leading-relaxed">{stepObj.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section> */}

            {/* ================= 6. BUSINESS BENEFITS ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center mt-20">
                <div className="space-y-4 max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        A Solid Payments Framework for Startups
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        Scale digital store operations borderlessly with a standard 1% transaction fee, zero chargebacks, and complete custody over settlements.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
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
                                        <p className="text-sm text-[#64748B] leading-relaxed">{benefit.desc}</p>
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

            {/* ================= 7. ENTERPRISE CAPABILITIES ================= */}
            <section className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center mt-20">
                <div className="space-y-4 max-w-2xl mx-auto mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Enterprise Features Designed for Modern Organizations
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        Advanced functionality built for businesses managing larger volumes, multiple teams, and complex operational requirements.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left mt-10">
                    {enterpriseCapabilities.map((cap, idx) => (
                        <motion.div
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            initial={{ opacity: 0, y: 15 }}
                            transition={{ duration: 0.4, delay: idx * 0.05 }}
                            key={cap.title}
                            className="p-6 bg-white border border-slate-100 hover:border-blue-400/20 hover:shadow-sm rounded-[2rem] space-y-2 transition-all"
                        >
                            <h4 className="font-extrabold text-sm text-[#0F172A] flex items-center gap-2">
                                <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                                <span>{cap.title}</span>
                            </h4>
                            <p className="text-xs text-[#64748B] leading-relaxed pl-6">{cap.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* ================= 8. DEVELOPER ADVANTAGES (Visual Architecture Topology Flow Map) ================= */}
            {/* <section id="developer-section" className="py-28 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100"> */}
            {/* <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"> */}

            {/* Left Column: Visual Architecture Topology Flow Map */}
            {/* <div className="w-full"> */}
            {/* <motion.div
                            initial={{ opacity: 0, scale: 0.97 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true, margin: "-100px" }}
                            className="w-full max-w-xl mx-auto bg-white border border-[#E2E8F0] shadow-xl rounded-[2.5rem] p-6 space-y-6 text-left relative overflow-hidden"
                        > */}
            {/* <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                                <h4 className="font-extrabold text-sm text-[#0F172A]">Integration Architecture Diagram</h4>
                                <span className="px-2 py-0.5 text-[9px] font-bold text-blue-600 bg-blue-50 rounded border border-blue-100">
                                    Direct Routing
                                </span>
                            </div> */}

            {/* Node connectivity path */}
            {/* <div className="space-y-4 relative">
                                <div className="absolute left-[19px] top-6 bottom-6 w-0.5 bg-slate-200" />

                                {[
                                    { label: "Client Payment Event", value: "Shopper initiates crypto wallet payout signature", color: "bg-blue-600 text-white" },
                                    { label: "Secure Gateway Router", value: "API keys direct transaction metadata logs borderlessly", color: "bg-indigo-600 text-white" },
                                    { label: "Automatic Webhook Dispatcher", value: "System registers confirmations, triggering invoice cleared callback", color: "bg-teal-500 text-white" },
                                    { label: "Non-Custodial Deposit", value: "Settled tokens route to business-specified addresses", color: "bg-emerald-500 text-white" }
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
            {/* <div className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-8 w-full">
                        <div className="space-y-4 w-full">
                            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-xs font-bold mx-auto lg:mx-0">
                                <Building2 className="w-3.5 h-3.5" />
                                <span>Platform Infrastructure</span>
                            </div>
                            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                                Developer Tools Built for Scale
                            </h2>
                            <p className="text-base sm:text-lg text-[#64748B] leading-relaxed max-w-xl mx-auto lg:mx-0">
                                Empower engineering teams with flexible APIs, testing environments, and production-ready examples.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full text-left">
                            {developerCapabilities.map((cap) => (
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

            {/* </div> */}
            {/* </section> */}

            {/* ================= 9. PERFECT FOR ================= */}
            {/* <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-100 text-center">
                <div className="space-y-4 max-w-2xl mx-auto mb-10">
                    <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-[#0F172A]">
                        Tailored for Every Enterprise Scale
                    </h2>
                    <p className="text-base sm:text-lg text-[#64748B] leading-relaxed">
                        A dynamic Web3 financial gateway built for startups, digital marketplaces, and high-growth services.
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

            {/* ================= 10. CUSTOMER TESTIMONIAL ================= */}
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
                        "ChainPay allowed us to launch globally without rebuilding our payment infrastructure. The APIs were straightforward, the support team was exceptional, and scaling was effortless."
                    </p>

                    <div className="mt-8 flex justify-center items-center gap-4">
                        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-black shadow-sm">
                            AC
                        </div>
                        <div className="text-left">
                            <h4 className="font-extrabold text-base text-[#0F172A]">Amanda Cheng</h4>
                            <p className="text-xs text-[#64748B] font-semibold">VP of Operations, SaaS Labs</p>
                        </div>
                    </div>
                </motion.div>
            </section>

            {/* ================= 11. FINAL CTA ================= */}
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
                            Build the Future of Payments with ChainPay
                        </h2>
                        <p className="text-sm sm:text-base md:text-lg text-blue-100 leading-relaxed">
                            From early-stage startups to enterprise organizations, ChainPay provides the infrastructure needed to accept cryptocurrency payments confidently and at scale.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                            {/* <a
                                href="#cta"
                                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 hover:bg-slate-50 font-extrabold rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Contact Sales
                            </a> */}
                            <a
                                href="/api-reference"
                                className="inline-flex items-center justify-center px-8 py-4 bg-blue hover:bg-blue-700 text-blue font-extrabold rounded-2xl border border-blue-400/40 transition-all hover:scale-[1.02] active:scale-[0.98]"
                            >
                                Start Building Today
                            </a>
                        </div>
                    </div>
                </motion.div>
            </section>

        </div >
    );
}
