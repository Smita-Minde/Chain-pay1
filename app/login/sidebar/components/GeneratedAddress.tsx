"use client";

import { useEffect, useState } from "react";
import moment from "moment";
import { getReq } from "@utils/apiHandlers";

interface PaymentOption {
    id: number;
    name: string;
    displayName: string;
    logo: string | null;
    symbol: string;
    ticker: string;
    address: string | null;
    decimals: number;
    usdRate: string;
}

interface Network {
    id: number;
    name: string;
    type: string;
    nativeCoinSymbol: string;
    nativeCoinUsdRate: string;
    nativeCoinDecimals: number;
    syncedTillBlock: string;
    syncedTillTimestamp: string;
    explorerUrl: string | null;
    paymentOptions: PaymentOption[];
}

export default function GeneratedAddress() {
    const [fromDate, setFromDate] = useState(
        moment().startOf("month").format("YYYY-MM-DD")
    );

    const [toDate, setToDate] = useState(
        moment().format("YYYY-MM-DD")
    );

    const [wallets, setWallets] = useState<any[]>([]);
    const [networks, setNetworks] = useState<Network[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const loadGeneratedAddresses = async () => {
            try {
                setLoading(true);

                const fromDateTime = `${fromDate} 00:00:00`;
                const toDateTime = `${toDate} 23:59:59`;

                const walletUrl =
                    `/me/payments/wallets?skip=0&take=8` +
                    `&fromDate=${encodeURIComponent(fromDateTime)}` +
                    `&toDate=${encodeURIComponent(toDateTime)}`;

                const [networkResult, walletResult] =
                    await Promise.allSettled([
                        getReq("/networks"),
                        getReq(walletUrl),
                    ]);

                // -----------------------------
                // NETWORK API
                // -----------------------------
                if (networkResult.status === "fulfilled") {
                    console.log(
                        "Network API:",
                        networkResult.value
                    );

                    const networkResponse = networkResult.value;

                    const networkData =
                        networkResponse?.data !== undefined
                            ? networkResponse.data
                            : networkResponse;

                    if (Array.isArray(networkData)) {
                        setNetworks(networkData);
                    } else {
                        setNetworks([]);
                    }
                } else {
                    console.error(
                        "Network API failed:",
                        networkResult.reason
                    );

                    setNetworks([]);
                }

                // -----------------------------
                // WALLET API
                // -----------------------------
                if (walletResult.status === "fulfilled") {
                    console.log(
                        "Generated Address API:",
                        walletResult.value
                    );

                    const walletResponse = walletResult.value;

                    const walletData =
                        walletResponse?.data !== undefined
                            ? walletResponse.data
                            : walletResponse;

                    if (Array.isArray(walletData)) {
                        setWallets(walletData);
                    } else if (Array.isArray(walletData?.data)) {
                        setWallets(walletData.data);
                    } else if (Array.isArray(walletData?.items)) {
                        setWallets(walletData.items);
                    } else if (Array.isArray(walletData?.records)) {
                        setWallets(walletData.records);
                    } else {
                        setWallets([]);
                    }
                } else {
                    console.error(
                        "Generated Address API failed:",
                        walletResult.reason
                    );

                    setWallets([]);
                }
            } catch (error) {
                console.error(
                    "Generated Address APIs failed:",
                    error
                );

                setWallets([]);
                setNetworks([]);
            } finally {
                setLoading(false);
            }
        };

        loadGeneratedAddresses();
    }, [fromDate, toDate]);

    return (
        <div className="space-y-6 md:space-y-8">

            {/* PAGE TITLE */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Generated Address
                </h1>
            </div>

            {/* DATE FILTER */}
            <div className="flex flex-col sm:flex-row sm:justify-end gap-4 w-full">

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-slate-500 text-sm shrink-0">
                        From
                    </span>

                    <input
                        type="date"
                        value={fromDate}
                        onChange={(e) => setFromDate(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm w-full sm:w-auto outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <span className="text-slate-500 text-sm shrink-0">
                        To
                    </span>

                    <input
                        type="date"
                        value={toDate}
                        onChange={(e) => setToDate(e.target.value)}
                        className="bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm w-full sm:w-auto outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />
                </div>

            </div>

            {/* GENERATED ADDRESS TABLE */}
            <div className="overflow-hidden rounded-3xl border border-white/40 bg-white/60 shadow-xl backdrop-blur-md">

                <div className="overflow-x-auto">

                    <table className="w-full text-sm text-left min-w-[1200px]">

                        <thead className="bg-blue-600 text-white font-bold text-xs uppercase">
                            <tr className="border-b border-slate-100">

                                <th className="px-6 py-5 text-left font-bold text-white">
                                    Payment Option
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-white">
                                    Address
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-white">
                                    Value Required
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-white">
                                    Value Paid
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-white">
                                    Value Outstanding
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-white">
                                    Min Txn Value
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-white">
                                    Token Value
                                </th>

                                <th className="px-6 py-5 text-left font-semibold text-white">
                                    Generated At
                                </th>

                                <th className="px-6 py-5 text-center font-semibold text-white">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody>

                            {loading ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="px-6 py-16 text-center text-slate-400"
                                    >
                                        Loading generated addresses...
                                    </td>
                                </tr>
                            ) : wallets.length === 0 ? (
                                <tr>
                                    <td
                                        colSpan={9}
                                        className="px-6 py-16 text-center text-slate-400"
                                    >
                                        No generated address records available.
                                    </td>
                                </tr>
                            ) : (
                                wallets.map(
                                    (wallet: any, index: number) => (
                                        <tr
                                            key={wallet?.id || index}
                                            className="border-b border-slate-100 hover:bg-blue-50/40 transition"
                                        >

                                            <td className="px-6 py-5 text-slate-700">
                                                {wallet?.paymentOption ||
                                                    wallet?.paymentMethod ||
                                                    "-"}
                                            </td>

                                            <td className="px-6 py-5 text-slate-700">
                                                {wallet?.address || "-"}
                                            </td>

                                            <td className="px-6 py-5 text-slate-700">
                                                {wallet?.valueRequired ?? "-"}
                                            </td>

                                            <td className="px-6 py-5 text-slate-700">
                                                {wallet?.valuePaid ?? "-"}
                                            </td>

                                            <td className="px-6 py-5 text-slate-700">
                                                {wallet?.valueOutstanding ?? "-"}
                                            </td>

                                            <td className="px-6 py-5 text-slate-700">
                                                {wallet?.minTxnValue ?? "-"}
                                            </td>

                                            <td className="px-6 py-5 text-slate-700">
                                                {wallet?.tokenValue ?? "-"}
                                            </td>

                                            <td className="px-6 py-5 text-slate-500">
                                                {wallet?.generatedAt
                                                    ? moment(
                                                        wallet.generatedAt
                                                    ).format(
                                                        "DD/MM/YYYY HH:mm"
                                                    )
                                                    : "-"}
                                            </td>

                                            <td className="px-6 py-5 text-center">
                                                -
                                            </td>

                                        </tr>
                                    )
                                )
                            )}

                        </tbody>

                    </table>

                </div>

            </div>
        </div>
    );
}