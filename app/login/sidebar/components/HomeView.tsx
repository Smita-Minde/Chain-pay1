"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { LayoutDashboard, Coins, ArrowUpRight, Activity, ShieldCheck, Mail } from "lucide-react";
import moment from "moment";
import { getReq } from "@utils/apiHandlers";
import {
    ResponsiveContainer,
    AreaChart,
    Area,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";
const todayData = [
    { time: "05:30", total: 0 },
    { time: "07:30", total: 220 },
    { time: "08:30", total: 560 },
    { time: "09:30", total: 430 },
    { time: "10:30", total: 350 },
    { time: "11:30", total: 650 },
    { time: "12:30", total: 850 },
    { time: "13:30", total: 980 },
    { time: "14:30", total: 820 },
    { time: "15:30", total: 680 },
    { time: "16:30", total: 620 },
    { time: "17:30", total: 580 },
    { time: "18:30", total: 600 },
    { time: "19:30", total: 450 },
    { time: "20:30", total: 430 },
    { time: "21:30", total: 560 },
    { time: "22:30", total: 600 },
    { time: "23:30", total: 520 },
    { time: "01:30", total: 340 },
    { time: "02:30", total: 330 },
    { time: "03:30", total: 350 },
    { time: "04:30", total: 260 },
];

const overviewData = [
    { date: "01/Jun", total: 1000 },
    { date: "02/Jun", total: 2000 },
    { date: "03/Jun", total: 1000 },
    { date: "04/Jun", total: 2500 },
    { date: "05/Jun", total: 1200 },
    { date: "06/Jun", total: 1800 },
    { date: "07/Jun", total: 2800 },
    { date: "08/Jun", total: 1000 },
    { date: "09/Jun", total: 3000 },
    { date: "10/Jun", total: 1100 },
    { date: "11/Jun", total: 2100 },
    { date: "12/Jun", total: 2000 },
    { date: "13/Jun", total: 2900 },
    { date: "14/Jun", total: 1500 },
    { date: "15/Jun", total: 2400 },
    { date: "16/Jun", total: 1000 },
    { date: "17/Jun", total: 2700 },
];


interface HomeViewProps {
    setActiveView: (view: 'home' | 'transaction' | 'payout' | 'settings') => void;
}

export default function HomeView({ setActiveView }: HomeViewProps) {


    return (
        <div className="space-y-8">

            {/* TODAY CARD */}
            <div className="grid grid-cols-1 lg:grid-cols-[3fr_1fr] gap-6">

                {/* TODAY */}
                <div className="bg-white rounded-3xl p-6 shadow-md">
                    <h2 className="text-4xl font-bold mb-4">
                        Today Overview
                    </h2>

                    <div className="flex justify-between mb-8">
                        <div>
                            <p className="text-slate-500">Volume</p>
                            <h3 className="text-5xl font-bold">$ 0</h3>
                        </div>

                        <div className="text-right">
                            <p className="text-slate-500">Yesterday</p>
                            <h3 className="text-4xl font-bold text-slate-400">
                                $ 0
                            </h3>
                        </div>
                    </div>

                    <div className="h-[400px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={todayData}>
                                <CartesianGrid
                                    strokeDasharray="4 4"
                                    stroke="#e5e7eb"
                                />

                                <XAxis dataKey="time" />
                                <YAxis />
                                <Tooltip />

                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    dot={{ r: 5 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* INFORMATION */}
                <div className="bg-white rounded-3xl p-2 shadow-md">
                    <h2 className="text-3xl font-bold mb-8">
                        Information
                    </h2>

                    <div className="space-y-10">
                        <div>
                            <p className="text-slate-500">Current Fee : <span className="bg-red-500 text-white px-2 py-2 rounded-lg">
                                1%
                            </span>
                            </p>

                        </div>
                    </div>
                </div>

            </div>

            {/* DATE FILTER */}
            <div className="flex justify-end gap-5">

                <div className="flex items-center gap-3">
                    <span className="text-slate-500">From</span>

                    <input
                        type="date"
                        defaultValue="2026-06-01"
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3"
                    />
                </div>

                <div className="flex items-center gap-3">
                    <span className="text-slate-500">To</span>

                    <input
                        type="date"
                        defaultValue="2026-06-17"
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3"
                    />
                </div>

            </div>

            {/* DASHBOARD OVERVIEW */}
            <div className="bg-white rounded-[30px] p-8 shadow-md border border-slate-100">

                <div className="flex justify-between mb-8">

                    <div>
                        <h2 className="text-4xl font-bold text-slate-900">
                            Dashboard Overview
                        </h2>

                        <p className="text-slate-500 mt-4">
                            Totals (USD)
                        </p>

                        <h3 className="text-4xl font-bold text-slate-900">
                            $ 0
                        </h3>
                    </div>

                </div>

                <div className="h-[420px]">

                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={overviewData}>

                            <CartesianGrid
                                strokeDasharray="4 4"
                                stroke="#e5e7eb"
                            />

                            <XAxis
                                dataKey="date"
                                tick={{ fill: "#64748b" }}
                            />

                            <YAxis
                                tick={{ fill: "#64748b" }}
                            />

                            <Tooltip />

                            <Line
                                type="monotone"
                                dataKey="total"
                                stroke="#2563eb"
                                strokeWidth={3}
                                dot={{
                                    fill: "#2563eb",
                                    r: 5,
                                }}
                            />

                        </LineChart>
                    </ResponsiveContainer>

                </div>

            </div>

        </div>
    );
}

