"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { getReq } from "@utils/apiHandlers";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    Tooltip,
    CartesianGrid,
} from "recharts";

interface HomeViewProps {
    setActiveView: (view: 'home' | 'transaction' | 'payout' | 'settings') => void;
}

export default function HomeView({ setActiveView }: HomeViewProps) {
    // Dynamic states populated directly from APIs
    const [todayData, setTodayData] = useState<any[]>([]);
    const [overviewData, setOverviewData] = useState<any[]>([]);
    const [todayTotal, setTodayTotal] = useState<number>(0);
    const [yesterdayTotal, setYesterdayTotal] = useState<number>(0);
    const [overviewTotal, setOverviewTotal] = useState<number>(0);
    const [currency, setCurrency] = useState<string>("USD");

    // Merchant details (fee, currency, profile)
    const [merchant, setMerchant] = useState<any>(null);

    // Date range filter for overview report
    const [fromDate, setFromDate] = useState<string>(() => moment().startOf("month").format("YYYY-MM-DD"));
    const [toDate, setToDate] = useState<string>(() => moment().format("YYYY-MM-DD"));

    useEffect(() => {
        const loadHomeData = async () => {
            let overviewUrl = `/reports/overview?fromDate=${fromDate}`;
            if (toDate) {
                overviewUrl += `&toDate=${toDate}`;
            }

            const results = await Promise.allSettled([
                getReq("/merchants/me"),
                getReq(overviewUrl),
                getReq("/reports/day-overview"),
            ]);

            const [merchantResult, overviewResult, dayOverviewResult] = results;

            // 1. Merchant Profile & Settings
            if (merchantResult.status === "fulfilled") {
                // console.log("Merchant API:", merchantResult.value);
                const mData = merchantResult.value?.data || merchantResult.value;
                if (mData) {
                    setMerchant(mData);
                    const curr = mData?.business?.fiatCurrency?.symbol || mData?.fiatCurrency?.symbol || mData?.currency || "USD";
                    setCurrency(curr);
                }
            } else {
                // console.error("Merchant API failed:", merchantResult.reason);
            }

            // 2. Dashboard Overview (Date Range Volume & Chart)
            if (overviewResult.status === "fulfilled") {
                // console.log("Overview API:", overviewResult.value);
                const oData = overviewResult.value?.data !== undefined ? overviewResult.value.data : overviewResult.value;

                let total = 0;
                if (typeof oData?.total === "number" || typeof oData?.total === "string") {
                    total = Number(oData.total) || 0;
                } else if (typeof oData?.totalAmount === "number" || typeof oData?.totalAmount === "string") {
                    total = Number(oData.totalAmount) || 0;
                } else if (typeof oData?.totals === "number" || typeof oData?.totals === "string") {
                    total = Number(oData.totals) || 0;
                } else if (typeof oData?.volume === "number" || typeof oData?.volume === "string") {
                    total = Number(oData.volume) || 0;
                }

                let rawChart: any[] = [];
                if (Array.isArray(oData)) {
                    rawChart = oData;
                } else if (Array.isArray(oData?.chart)) {
                    rawChart = oData.chart;
                } else if (Array.isArray(oData?.overview)) {
                    rawChart = oData.overview;
                } else if (Array.isArray(oData?.data)) {
                    rawChart = oData.data;
                } else if (Array.isArray(oData?.reports)) {
                    rawChart = oData.reports;
                } else if (Array.isArray(oData?.items)) {
                    rawChart = oData.items;
                }

                const formattedChart = rawChart.map((item: any) => {
                    const rawDate = item.date || item.day || item.label || item.time || item.createdAt || "";
                    let formattedDate = rawDate;
                    if (rawDate && moment(rawDate).isValid() && String(rawDate).length > 5) {
                        formattedDate = moment(rawDate).format("DD/MMM");
                    }
                    const val = Number(item.total !== undefined ? item.total : (item.value !== undefined ? item.value : (item.amount !== undefined ? item.amount : 0))) || 0;
                    return {
                        date: formattedDate,
                        total: val,
                    };
                });

                if (!total && formattedChart.length > 0) {
                    total = formattedChart.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0);
                }

                setOverviewTotal(total);
                setOverviewData(formattedChart);
            } else {
                // console.error("Overview API failed:", overviewResult.reason);
                setOverviewTotal(0);
                setOverviewData([]);
            }

            // 3. Today & Yesterday Day-Overview
            if (dayOverviewResult.status === "fulfilled") {
                // console.log("Day Overview API:", dayOverviewResult.value);
                const dData = dayOverviewResult.value?.data !== undefined ? dayOverviewResult.value.data : dayOverviewResult.value;

                let tTotal = 0;
                if (dData?.todayTotal !== undefined) tTotal = Number(dData.todayTotal) || 0;
                else if (dData?.todayVolume !== undefined) tTotal = Number(dData.todayVolume) || 0;
                else if (dData?.volume !== undefined) tTotal = Number(dData.volume) || 0;
                else if (dData?.today !== undefined) tTotal = Number(dData.today) || 0;
                else if (dData?.total !== undefined) tTotal = Number(dData.total) || 0;

                let yTotal = 0;
                if (dData?.yesterdayTotal !== undefined) yTotal = Number(dData.yesterdayTotal) || 0;
                else if (dData?.yesterdayVolume !== undefined) yTotal = Number(dData.yesterdayVolume) || 0;
                else if (dData?.yesterday !== undefined) yTotal = Number(dData.yesterday) || 0;

                let rawTodayChart: any[] = [];
                if (Array.isArray(dData)) {
                    rawTodayChart = dData;
                } else if (Array.isArray(dData?.chart)) {
                    rawTodayChart = dData.chart;
                } else if (Array.isArray(dData?.data)) {
                    rawTodayChart = dData.data;
                } else if (Array.isArray(dData?.hours)) {
                    rawTodayChart = dData.hours;
                } else if (Array.isArray(dData?.times)) {
                    rawTodayChart = dData.times;
                } else if (Array.isArray(dData?.items)) {
                    rawTodayChart = dData.items;
                }

                const formattedTodayChart = rawTodayChart.map((item: any) => {
                    const rawTime = item.time || item.hour || item.label || item.date || "";
                    let formattedTime = rawTime;
                    if (rawTime && moment(rawTime).isValid() && String(rawTime).length > 5 && String(rawTime).includes("T")) {
                        formattedTime = moment(rawTime).format("HH:mm");
                    }
                    const val = Number(item.total !== undefined ? item.total : (item.value !== undefined ? item.value : (item.amount !== undefined ? item.amount : 0))) || 0;
                    return {
                        time: formattedTime,
                        total: val,
                    };
                });

                if (!tTotal && formattedTodayChart.length > 0) {
                    tTotal = formattedTodayChart.reduce((acc: number, curr: any) => acc + (curr.total || 0), 0);
                }

                setTodayTotal(tTotal);
                setYesterdayTotal(yTotal);
                setTodayData(formattedTodayChart);
            } else {
                // console.error("Day Overview API failed:", dayOverviewResult.reason);
                setTodayTotal(0);
                setYesterdayTotal(0);
                setTodayData([]);
            }
        };

        loadHomeData();
    }, [fromDate, toDate]);

    return (
        <div className="space-y-6 md:space-y-8">
            {/* TODAY OVERVIEW */}
            <div className="bg-white rounded-[30px] p-4 sm:p-6 md:p-8 shadow-md border border-slate-100 w-full">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 text-slate-900">
                    Today Overview
                </h2>

                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-8">
                    <div>
                        <p className="text-slate-500 text-sm">Volume</p>
                        <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
                            $ {todayTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h3>
                    </div>

                    <div className="flex flex-col sm:items-end gap-1.5">
                        <p className="text-slate-500 text-sm">Yesterday</p>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-400">
                            $ {yesterdayTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h3>
                        <div className="mt-1">
                            <p className="text-slate-500 text-sm flex items-center gap-2">
                                Current Fee:
                                <span className="bg-red-500 text-white px-2.5 py-1 rounded-lg text-xs font-semibold">
                                    {merchant?.business?.feePercent || merchant?.feePercent || "1"}%
                                </span>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="h-[250px] sm:h-[300px] md:h-[400px]">
                    {todayData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={todayData}>
                                <CartesianGrid
                                    strokeDasharray="4 4"
                                    stroke="#e5e7eb"
                                />
                                <XAxis dataKey="time" tick={{ fill: "#64748b", fontSize: 12 }} />
                                <YAxis tick={{ fill: "#64748b", fontSize: 12 }} />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    dot={{ fill: "#2563eb", r: 4 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                            No payment activity recorded for today.
                        </div>
                    )}
                </div>
            </div>

            {/* DATE FILTER */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 w-full">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-slate-500 text-sm w-10 sm:w-auto shrink-0">From</span>
                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm w-full sm:w-auto outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-slate-500 text-sm w-10 sm:w-auto shrink-0">To</span>
                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm w-full sm:w-auto outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>
            </div>

            {/* DASHBOARD OVERVIEW */}
            <div className="bg-white rounded-[30px] p-4 sm:p-6 md:p-8 shadow-md border border-slate-100">
                <div className="flex justify-between mb-8">
                    <div>
                        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                            Dashboard Overview
                        </h2>
                        <p className="text-slate-500 mt-3 text-sm">
                            Totals ({currency || "USD"})
                        </p>
                        <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                            $ {overviewTotal.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </h3>
                    </div>
                </div>

                <div className="h-[250px] sm:h-[300px] md:h-[420px]">
                    {overviewData.length > 0 ? (
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={overviewData}>
                                <CartesianGrid
                                    strokeDasharray="4 4"
                                    stroke="#e5e7eb"
                                />
                                <XAxis
                                    dataKey="date"
                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                />
                                <YAxis
                                    tick={{ fill: "#64748b", fontSize: 12 }}
                                />
                                <Tooltip />
                                <Line
                                    type="monotone"
                                    dataKey="total"
                                    stroke="#2563eb"
                                    strokeWidth={3}
                                    dot={{
                                        fill: "#2563eb",
                                        r: 4,
                                    }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    ) : (
                        <div className="h-full flex items-center justify-center text-slate-400 text-sm">
                            No transaction records found for the selected period.
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
