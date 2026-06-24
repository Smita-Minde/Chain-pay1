"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Coins, ArrowUpRight, Activity, ShieldCheck, Mail } from "lucide-react";

interface HomeViewProps {
    setActiveView: (view: 'home' | 'transaction' | 'payout' | 'settings') => void;
}

export default function HomeView({ setActiveView }: HomeViewProps) {
    // const [merchantEmail, setMerchantEmail] = useState("merchant@gmail.com");
    // const [businessName, setBusinessName] = useState("Your Business");

    // useEffect(() => {
    //     const storedUser = localStorage.getItem("registered_user");
    //     if (storedUser) {
    //         try {
    //             const parsed = JSON.parse(storedUser);
    //             if (parsed.email) setMerchantEmail(parsed.email);
    //         } catch (e) {
    //             console.error(e);
    //         }
    //     }

    //     // Try load business settings if updated
    //     const loadBusinessName = async () => {
    //         const token = localStorage.getItem("token") || localStorage.getItem("loginSuccessRoyalGame");
    //         if (token) {
    //             try {
    //                 let cleanedToken = token;
    //                 if (token.startsWith('"') && token.endsWith('"')) {
    //                     cleanedToken = JSON.parse(token);
    //                 }
    //                 const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";
    //                 const res = await fetch(`${BASE_URL}/merchants/me/business`, {
    //                     headers: {
    //                         Authorization: `Bearer ${cleanedToken}`,
    //                     },
    //                 });
    //                 if (res.ok) {
    //                     const responseData = await res.json();
    //                     const data = responseData?.data || responseData;
    //                     if (data && data.name) {
    //                         setBusinessName(data.name);
    //                     }
    //                 }
    //             } catch (err) {
    //                 console.error(err);
    //             }
    //         }
    //     };
    //     loadBusinessName();
    // }, []);

    // const containerVariants = {
    //     hidden: { opacity: 0 },
    //     show: {
    //         opacity: 1,
    //         transition: {
    //             staggerChildren: 0.1
    //         }
    //     }
    // };

    // const itemVariants = {
    //     hidden: { opacity: 0, y: 15 },
    //     show: { opacity: 1, y: 0 }
    // };

    // return (
    //     <motion.div
    //         variants={containerVariants}
    //         initial="hidden"
    //         animate="show"
    //         className="space-y-6"
    //     >
    //         {/* Top Row: Welcome Banner */}
    //         <motion.div
    //             variants={itemVariants}
    //             className="relative overflow-hidden rounded-[32px] border border-white/40 bg-gradient-to-r from-blue-600 to-indigo-600 p-8 text-white shadow-xl"
    //         >
    //             <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-[80px] pointer-events-none" />
    //             <div className="relative z-10 space-y-2">
    //                 <span className="bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
    //                     Merchant Portal
    //                 </span>
    //                 <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
    //                     Welcome back, {businessName}!
    //                 </h1>
    //                 <p className="text-blue-100 text-sm max-w-xl">
    //                     Monitor your crypto payment inflows, execute multi-chain payouts, and manage your API integration settings all from one unified dashboard.
    //                 </p>
    //                 <div className="flex flex-wrap gap-4 pt-4">
    //                     <div className="flex items-center gap-2 bg-white/15 px-3.5 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md">
    //                         <Mail size={14} className="text-blue-200" />
    //                         {merchantEmail}
    //                     </div>
    //                     <div className="flex items-center gap-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3.5 py-1.5 rounded-xl text-xs font-medium backdrop-blur-md">
    //                         <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
    //                         Gateway Operational
    //                     </div>
    //                 </div>
    //             </div>
    //         </motion.div>

    //         {/* Middle Row: Quick Stats */}
    //         <motion.div
    //             variants={itemVariants}
    //             className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
    //         >
    //             {/* Stat 1 */}
    //             <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md flex items-center justify-between">
    //                 <div className="space-y-1">
    //                     <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Payments Gateway</p>
    //                     <h3 className="text-2xl font-bold text-slate-900">Non-Custodial</h3>
    //                     <p className="text-xs text-slate-500">Inbound funds sent directly to you</p>
    //                 </div>
    //                 <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center text-blue-600">
    //                     <ShieldCheck size={24} />
    //                 </div>
    //             </div>

    //             {/* Stat 2 */}
    //             <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md flex items-center justify-between">
    //                 <div className="space-y-1">
    //                     <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">Settlement Fee</p>
    //                     <h3 className="text-2xl font-bold text-slate-900">Flat 1.0%</h3>
    //                     <p className="text-xs text-slate-500">Pay-as-you-go pricing</p>
    //                 </div>
    //                 <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center text-indigo-600">
    //                     <Coins size={24} />
    //                 </div>
    //             </div>

    //             {/* Stat 3 */}
    //             <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md flex items-center justify-between sm:col-span-2 lg:col-span-1">
    //                 <div className="space-y-1">
    //                     <p className="text-slate-500 text-xs font-semibold uppercase tracking-wider">API Integration</p>
    //                     <h3 className="text-2xl font-bold text-slate-900">Sandbox API</h3>
    //                     <p className="text-xs text-slate-500">Active and fully testable</p>
    //                 </div>
    //                 <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
    //                     <Activity size={24} />
    //                 </div>
    //             </div>
    //         </motion.div>

    //         {/* Bottom Row: Quick Actions */}
    //         <motion.div
    //             variants={itemVariants}
    //             className="grid gap-6 md:grid-cols-2"
    //         >
    //             {/* Card Action 1 */}
    //             <div className="rounded-[32px] border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md hover:border-blue-400/40 transition-all duration-300 group flex flex-col justify-between space-y-4">
    //                 <div className="space-y-2">
    //                     <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-600 flex items-center justify-center">
    //                         <LayoutDashboard size={20} />
    //                     </div>
    //                     <h3 className="text-lg font-bold text-slate-800">Track Crypto Payments</h3>
    //                     <p className="text-sm text-slate-500 leading-relaxed">
    //                         Search, filter, and audit inbound customer invoice payments on Tron, BNB Chain, and other configured EVM networks.
    //                     </p>
    //                 </div>
    //                 <button
    //                     onClick={() => setActiveView('transaction')}
    //                     className="w-fit flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-blue-600 transition-colors cursor-pointer group-hover:shadow-lg group-hover:shadow-blue-500/15"
    //                 >
    //                     View Transactions <ArrowUpRight size={14} />
    //                 </button>
    //             </div>

    //             {/* Card Action 2 */}
    //             <div className="rounded-[32px] border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md hover:border-indigo-400/40 transition-all duration-300 group flex flex-col justify-between space-y-4">
    //                 <div className="space-y-2">
    //                     <div className="w-10 h-10 rounded-xl bg-indigo-500/10 text-indigo-600 flex items-center justify-center">
    //                         <Coins size={20} />
    //                     </div>
    //                     <h3 className="text-lg font-bold text-slate-800">Payout Inbound Balances</h3>
    //                     <p className="text-sm text-slate-500 leading-relaxed">
    //                         Perform manual payouts to dynamic wallet addresses, configure destination addresses, and select payout currencies.
    //                     </p>
    //                 </div>
    //                 <button
    //                     onClick={() => setActiveView('payout')}
    //                     className="w-fit flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-900 text-white font-semibold text-xs hover:bg-indigo-600 transition-colors cursor-pointer group-hover:shadow-lg group-hover:shadow-indigo-500/15"
    //                 >
    //                     Execute Payouts <ArrowUpRight size={14} />
    //                 </button>
    //             </div>
    //         </motion.div>
    //     </motion.div>
    // );

    return (
        <div className="space-y-8">

            {/* Today Section */}
            <div className="grid lg:grid-cols-4 gap-6">

                {/* Today Chart */}
                <div className="lg:col-span-3 bg-white rounded-[32px] p-8 shadow-lg border border-slate-100">

                    <div className="flex justify-between mb-8">
                        <div>
                            <h2 className="text-3xl font-bold text-slate-900">
                                Today
                            </h2>

                            <p className="text-slate-500 mt-4">
                                Volume (USD)
                            </p>

                            <h3 className="text-4xl font-bold text-slate-900">
                                $ 0
                            </h3>
                        </div>

                        <div className="text-right">
                            <p className="text-slate-500">
                                Yesterday (USD)
                            </p>

                            <h3 className="text-4xl font-bold text-slate-400">
                                $ 0
                            </h3>
                        </div>
                    </div>

                    {/* TimeWise Chart */}
                    <div className="h-[380px] rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                        <p className="text-slate-400">
                            Time Wise Chart
                        </p>
                    </div>
                </div>

                {/* Information Card */}
                <div className="bg-white rounded-[32px] p-8 shadow-lg border border-slate-100">

                    <h2 className="text-3xl font-bold text-slate-900 mb-8">
                        Information
                    </h2>

                    <div className="space-y-10">

                        <div>
                            <p className="text-slate-500 mb-2">
                                Current Fee
                            </p>

                            <span className="bg-red-500 text-white px-3 py-1 rounded-lg font-semibold">
                                1%
                            </span>
                        </div>

                        <div>
                            <p className="text-slate-500 mb-2">
                                Settlement Time
                            </p>

                            <h3 className="text-blue-600 text-xl font-semibold">
                                Instant
                            </h3>
                        </div>

                        <div>
                            <p className="text-slate-500 mb-2">
                                Support
                            </p>

                            <h3 className="text-green-600 text-xl font-semibold">
                                24/7
                            </h3>
                        </div>

                    </div>
                </div>
            </div>

            {/* Date Filter */}
            <div className="flex justify-end gap-4">

                <div className="flex items-center gap-2">
                    <label className="text-slate-500">
                        From
                    </label>

                    <input
                        type="date"
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm"
                    />
                </div>

                <div className="flex items-center gap-2">
                    <label className="text-slate-500">
                        To
                    </label>

                    <input
                        type="date"
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3 shadow-sm"
                    />
                </div>

            </div>

            {/* Dashboard Overview */}
            <div className="bg-white rounded-[32px] p-8 shadow-lg border border-slate-100">

                <div className="flex justify-between mb-8">

                    <div>
                        <h2 className="text-3xl font-bold text-slate-900">
                            Dashboard Overview
                        </h2>

                        <p className="text-slate-500 mt-4">
                            Totals (USD)
                        </p>

                        <h3 className="text-4xl font-bold text-slate-900">
                            $ 0
                        </h3>
                    </div>

                    <select className="border border-slate-200 rounded-xl px-4 py-3 bg-white">
                        <option>Last 17 Days</option>
                    </select>

                </div>

                {/* DayWise Chart */}
                <div className="h-[420px] rounded-3xl bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <p className="text-slate-400">
                        Dashboard Overview Chart
                    </p>
                </div>

            </div>

        </div>
    );
}

