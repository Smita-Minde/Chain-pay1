"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search } from "lucide-react";

export default function TransactionView() {
    const [status, setStatus] = useState("all");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [search, setSearch] = useState("");
    const [transactions, setTransactions] = useState<any[]>([]);

    const getAuthToken = () => {
        let token = localStorage.getItem("token");
        if (!token) {
            const raw = localStorage.getItem("loginSuccessRoyalGame");
            if (raw) {
                try {
                    token = JSON.parse(raw);
                } catch {
                    token = raw;
                }
            }
        }
        return token;
    };

    // Set current month dates first
    useEffect(() => {
        const now = new Date();
        const firstDay = new Date(now.getFullYear(), now.getMonth(), 1);
        const lastDay = new Date(now.getFullYear(), now.getMonth() + 1, 0);
        setFromDate(firstDay.toISOString().split("T")[0]);
        setToDate(lastDay.toISOString().split("T")[0]);
    }, []);

    // Fetch transactions after dates are available
    useEffect(() => {
        if (!fromDate || !toDate) return;

        const token = getAuthToken();
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";
        let url = `${BASE_URL}/payments?skip=0&take=8&fromDate=${fromDate}&toDate=${toDate}`;

        if (status !== "all") {
            url += `&status=${status}`;
        }

        console.log("API URL:", url);

        fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
            .then((res) => {
                if (!res.ok) {
                    throw new Error(`HTTP Error: ${res.status}`);
                }
                return res.json();
            })
            .then((data) => {
                console.log("API RESPONSE:", data);

                let rawList: any[] = [];
                if (Array.isArray(data)) {
                    rawList = data;
                } else if (data && Array.isArray(data.data)) {
                    rawList = data.data;
                } else if (data && Array.isArray(data.payments)) {
                    rawList = data.payments;
                } else if (data && Array.isArray(data.transactions)) {
                    rawList = data.transactions;
                }

                const mapped = rawList
                    .map((tx: any) => {
                        if (!tx) return null;
                        const id = tx.id || tx.paymentToken || tx.token || tx._id || "";

                        let amount = tx.amount || tx.fiatValue || tx.value || "";
                        if (tx.fiatCurrency?.symbol && !amount.toString().includes(tx.fiatCurrency.symbol)) {
                            amount = `${amount} ${tx.fiatCurrency.symbol}`;
                        }

                        const tokenSymbol = tx.token || tx.symbol || tx.coin || (tx.options && tx.options[0]?.name) || "";

                        let status = tx.status || "";
                        if (!status) {
                            if (tx.isPaid) status = "Paid";
                            else if (tx.isPartial) status = "Partial";
                            else if (tx.isExpired) status = "Expired";
                            else status = "Pending";
                        }
                        if (status) {
                            status = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
                        }

                        let date = tx.createdAt || tx.created_at || tx.date || "";
                        if (date) {
                            try {
                                date = date.includes("T") ? date.split("T")[0] : date;
                            } catch { }
                        }

                        return {
                            id,
                            amount,
                            token: tokenSymbol,
                            status,
                            createdAt: date
                        };
                    })
                    .filter(Boolean);

                setTransactions(mapped);
                console.log("Transaction Response:", mapped);
            })
            .catch((err) => {
                console.error("API Error:", err);
                setTransactions([]);
            });
    }, [fromDate, toDate, status]);

    const filteredTransactions = transactions.filter((tx) => {
        if (!tx) return false;
        const statusMatch =
            status === "all" ||
            tx?.status?.toLowerCase() === status.toLowerCase();
        const searchMatch =
            String(tx?.id || "").toLowerCase().includes(search.toLowerCase()) ||
            String(tx?.token || "").toLowerCase().includes(search.toLowerCase());
        return statusMatch && searchMatch;
    });

    return (
        <motion.div
            key="transaction"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
        >
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Transactions</h1>
                <p className="text-slate-500 text-sm mt-1">Track and audit crypto payments received by your system.</p>
            </div>

            {/* Filters */}
            <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md">
                <div className="grid gap-4 md:grid-cols-4">
                    <select
                        value={status}
                        onChange={(e) => setStatus(e.target.value)}
                        className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    >
                        <option value="all">All Statuses</option>
                        <option value="paid">Paid</option>
                        <option value="partial">Partial</option>
                        <option value="expired">Expired</option>
                        <option value="pending">Pending</option>
                    </select>

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    />

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                    />

                    <div className="relative">
                        <Search
                            size={16}
                            className="absolute left-3.5 top-3.5 text-slate-400"
                        />
                        <input
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search by ID/Token..."
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-xl backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-blue-600 text-white font-bold text-xs uppercase tracking-wider">
                            <tr>
                                <th className="p-4">Transaction ID</th>
                                <th className="p-4">Fiat Value</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Token</th>
                                <th className="p-4">Created At</th>
                                <th className="p-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-blue-50/50 transition">
                                        <td className="p-4 font-mono font-medium text-slate-700">{tx.id}</td>
                                        <td className="p-4 font-bold text-slate-900">{tx.amount}</td>
                                        <td className="p-4 font-semibold text-slate-600">Crypto Payment Received</td>
                                        <td className="p-4 font-bold text-slate-700">{tx.token}</td>
                                        <td className="p-4 text-slate-500">{tx.createdAt}</td>
                                        <td className="p-4">
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                                                tx.status === "Paid"
                                                    ? "bg-green-100 text-green-600"
                                                    : tx.status === "Partial"
                                                        ? "bg-amber-100 text-amber-600"
                                                        : tx.status === "Pending"
                                                            ? "bg-blue-100 text-blue-600"
                                                            : "bg-red-100 text-red-600"
                                            }`}>
                                                {tx.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={6} className="p-8 text-center text-slate-400">
                                        No transactions found for this period.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </motion.div>
    );
}
