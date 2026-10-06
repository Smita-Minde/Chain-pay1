"use client";

import { useState, useEffect } from "react";
import { getReq } from "@utils/apiHandlers";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import moment from "moment";
import TransactionHashModal from "@components/Modals/TransactionHashModal";

export default function TransactionView() {
    const [status, setStatus] = useState("all");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [search, setSearch] = useState("");
    const [transactions, setTransactions] = useState<any[]>([]);

    // Transaction Hash Modal state
    const [showHashModal, setShowHashModal] = useState(false);
    const [selectedHashes, setSelectedHashes] = useState<string[]>([]);

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
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://staging-api.chainpay.biz";
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
                        const id = tx.id || tx.paymentToken || tx._id || "";

                        // Fiat Value formatting
                        const fiatSign = tx.fiatCurrency?.sign || "$";
                        const fiatSymbol = tx.fiatCurrency?.symbol || "";
                        const rawFiat = tx.fiatValue !== undefined ? tx.fiatValue : (tx.amount || tx.value || "0");
                        const fiatValue = `${fiatSign} ${rawFiat} ${fiatSymbol}`.trim();

                        // Description
                        const description = tx.description || "-";

                        // Token (Crypto coin name/symbol from paymentRecords or fallback)
                        const option = tx.paymentRecords?.[0]?.option;
                        const token = option?.displayName || option?.name || option?.symbol || (tx.token ? (tx.token.length > 12 ? tx.token.slice(0, 8) + "..." : tx.token) : "-");
                        const tokenLogo = option?.logo || null;

                        // Expire At & Settled At dates
                        const expireAt = tx.expireAt ? moment(tx.expireAt).format("DD MMM YYYY, HH:mm") : "-";
                        const settledAt = tx.settledAt ? moment(tx.settledAt).format("DD MMM YYYY, HH:mm") : "-";

                        // Status formatting
                        let currentStatus = tx.status || "";
                        if (!currentStatus) {
                            if (tx.isPaid) currentStatus = "Paid";
                            else if (tx.isPartial) currentStatus = "Partial";
                            else if (tx.isExpired) currentStatus = "Expired";
                            else currentStatus = "Pending";
                        }
                        if (currentStatus) {
                            currentStatus = currentStatus.charAt(0).toUpperCase() + currentStatus.slice(1).toLowerCase();
                        }

                        // Hashes for Action modal
                        const hashes: string[] = [];
                        if (Array.isArray(tx.paymentRecords)) {
                            tx.paymentRecords.forEach((rec: any) => {
                                if (rec.txHashIn) hashes.push(rec.txHashIn);
                                if (rec.txHashOut) hashes.push(rec.txHashOut);
                            });
                        }

                        return {
                            id,
                            fiatValue,
                            description,
                            token,
                            tokenLogo,
                            expireAt,
                            settledAt,
                            status: currentStatus,
                            hashes,
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

    // Fetch merchant details when page loads
    useEffect(() => {
        const fetchMerchant = async () => {
            try {
                const response = await getReq("/merchants/me");
                console.log("Merchant API Response:", response);
            } catch (error) {
                console.error("Merchant API Error:", error);
            }
        };

        fetchMerchant();
    }, []);

    const filteredTransactions = transactions.filter((tx) => {
        if (!tx) return false;
        const statusMatch =
            status === "all" ||
            tx?.status?.toLowerCase() === status.toLowerCase();
        const searchMatch =
            String(tx?.id || "").toLowerCase().includes(search.toLowerCase()) ||
            String(tx?.token || "").toLowerCase().includes(search.toLowerCase()) ||
            String(tx?.description || "").toLowerCase().includes(search.toLowerCase());
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
                        <option value="all">All Status</option>
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
                            placeholder="Search by ID/Token/Description..."
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-100 focus:border-blue-500 transition-all duration-200"
                        />
                    </div>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-xl backdrop-blur-md">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="bg-blue-600 text-white font-bold text-xs uppercase tracking-widerbg-blue-600 text-white font-bold text-xs uppercase">
                            <tr>
                                <th className="p-4">Payment Id</th>
                                <th className="p-4">Fiat Value</th>
                                <th className="p-4">Description</th>
                                <th className="p-4">Token</th>
                                <th className="p-4">Expire At</th>
                                <th className="p-4">Settled At</th>
                                <th className="p-4">Status</th>
                                <th className="p-4">Action</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredTransactions.length > 0 ? (
                                filteredTransactions.map((tx) => (
                                    <tr key={tx.id} className="hover:bg-blue-50/50 transition">
                                        {/* 1. Payment Id */}
                                        <td className="p-4 font-mono font-bold text-slate-700">{tx.id}</td>

                                        {/* 2. Fiat Value */}
                                        <td className="p-4 font-bold text-slate-900 whitespace-nowrap">{tx.fiatValue}</td>

                                        {/* 3. Description */}
                                        <td className="p-4 font-medium text-slate-600 max-w-[220px] truncate" title={tx.description}>
                                            {tx.description}
                                        </td>

                                        {/* 4. Token */}
                                        <td className="p-4 font-bold text-slate-700">
                                            <div className="flex items-center gap-2">
                                                {tx.tokenLogo && (
                                                    <img src={tx.tokenLogo} alt={tx.token} className="h-5 w-5 rounded-full object-contain" />
                                                )}
                                                <span>{tx.token}</span>
                                            </div>
                                        </td>

                                        {/* 5. Expire At */}
                                        <td className="p-4 text-slate-500 whitespace-nowrap text-xs">{tx.expireAt}</td>

                                        {/* 6. Settled At */}
                                        <td className="p-4 text-slate-500 whitespace-nowrap text-xs">{tx.settledAt}</td>

                                        {/* 7. Status */}
                                        <td className="p-4">
                                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tx.status === "Paid"
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

                                        {/* 8. Action */}
                                        <td className="p-4">
                                            {tx.hashes && tx.hashes.length > 0 ? (
                                                <button
                                                    onClick={() => {
                                                        setSelectedHashes(tx.hashes);
                                                        setShowHashModal(true);
                                                    }}
                                                    className="px-3 py-1.5 bg-blue-50 hover:bg-blue-100 text-blue-600 rounded-lg text-xs font-semibold transition border border-blue-200 cursor-pointer"
                                                >
                                                    View Hash
                                                </button>
                                            ) : (
                                                <span className="text-slate-400 text-xs">-</span>
                                            )}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan={8} className="p-8 text-center text-slate-400">
                                        No transactions found for this period.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Transaction Hash Modal */}
            {showHashModal && (
                <TransactionHashModal
                    setOpen={setShowHashModal}
                    txHashes={selectedHashes}
                />
            )}
        </motion.div>
    );
}
