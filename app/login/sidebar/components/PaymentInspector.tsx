"use client";

import { useState } from "react";

export default function PaymentInspector() {
    const [token, setToken] = useState("");

    return (
        <div className="space-y-6 md:space-y-8">

            {/* PAGE HEADER */}
            <div>
                <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                    Payment Inspector
                </h1>

                <p className="text-slate-500 mt-2 text-sm md:text-base">
                    Input a payment token below to query its transaction logs,
                    payment values, and webhook notification retries.
                </p>
            </div>

            {/* SEARCH */}
            <div className="bg-white rounded-[30px] p-4 sm:p-6 md:p-8 shadow-md border border-slate-100">
                <div className="flex flex-col sm:flex-row gap-3">

                    <input
                        type="text"
                        value={token}
                        onChange={(e) => setToken(e.target.value)}
                        placeholder="Enter payment token"
                        className="flex-1 bg-white border border-slate-200 rounded-xl px-4 py-3 text-sm text-slate-700 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                    />

                    <button
                        type="button"
                        className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl text-sm font-semibold transition"
                    >
                        Search
                    </button>

                </div>
            </div>

            {/* QUERY LOGS */}
            <div>
                <h2 className="text-2xl md:text-3xl font-bold text-slate-900">
                    Query Logs
                </h2>
            </div>

            {/* EMPTY STATE */}
            <div className="bg-white rounded-[30px] p-8 md:p-12 shadow-md border border-slate-100 min-h-[280px] flex flex-col items-center justify-center text-center">

                <h3 className="text-lg md:text-xl font-semibold text-slate-700">
                    No payment logs loaded
                </h3>

                <p className="text-slate-400 text-sm mt-2 max-w-md">
                    Please enter a transaction payment token in the search
                    input above to retrieve API logs.
                </p>

            </div>

        </div>
    );
}