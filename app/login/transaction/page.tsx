"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Receipt,
    Send,
    Settings,
    LogOut,
    Search,
    Calendar,
    Coins,
    Wallet,
    ArrowRight,
    Trash2,
    Key,
    CheckCircle,
    Clock,
    AlertCircle,
    Copy,
    Check,
    Lock,
    Upload
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@hooks";
import AddressModal from "@components/Modals/AddressModal";
import ApiKeyModal from "@components/Modals/ApiKeyModal";
import DeleteAccount from "@components/Modals/DeleteAccount";

export default function DashboardPage() {
    const [activeView, setActiveView] = useState<'home' | 'transaction' | 'payout' | 'settings'>('transaction');
    const [email, setEmail] = useState("merchant@gmail.com");
    const router = useRouter();

    const searchVal = typeof window !== "undefined" ? window.location.search : "";
    const pathVal = typeof window !== "undefined" ? window.location.pathname : "";

    useEffect(() => {
        const params = new URLSearchParams(searchVal);
        const viewParam = params.get("view");
        if (viewParam === "payout") {
            setActiveView("payout");
        } else if (viewParam === "settings") {
            setActiveView("settings");
        } else {
            setActiveView("transaction");
        }
    }, [searchVal, pathVal]);

    const handleNav = (view: 'home' | 'transaction' | 'payout' | 'settings') => {
        if (view === 'transaction') {
            router.push('/login/transaction');
        } else if (view === 'home') {
            router.push('/login/home');
        } else if (view === 'settings') {
            router.push('/login/AccountSetting');
        } else if (view === 'payout') {
            router.push('/login/payout');
        }
    };

    const { logout, changePassword } = useAuth();

    // Modals states
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [singleNetwork, setSingleNetwork] = useState<any>(null);
    const [openApiKeyModal, setOpenApiKeyModal] = useState(false);
    const [generatedApiKey, setGeneratedApiKey] = useState("");
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Payment settings states
    const [businessName, setBusinessName] = useState("");
    const [selectedCurrency, setSelectedCurrency] = useState("");
    const [selectedCryptos, setSelectedCryptos] = useState<number[]>([]);
    const [openCryptoDropdown, setOpenCryptoDropdown] = useState(false);
    const [logoFile, setLogoFile] = useState<File | null>(null);
    const [logoPreview, setLogoPreview] = useState<string | null>(null);
    const [logoFilename, setLogoFilename] = useState<string | null>(null);
    const [fiatCurrencies, setFiatCurrencies] = useState<any[]>([]);
    const [cryptoOptions, setCryptoOptions] = useState<any[]>([]);

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

    const handleLogoChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            if (file.size > 2 * 1024 * 1024) {
                toast.error("Image size must not exceed 2 MB.");
                return;
            }
            setLogoFile(file);
            setLogoPreview(URL.createObjectURL(file));

            const token = getAuthToken();
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";
            const formData = new FormData();
            formData.append("file", file);

            try {
                toast.loading("Uploading logo...", { id: "logo-upload" });
                const res = await fetch(`${BASE_URL}/upload`, {
                    method: "POST",
                    headers: {
                        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                    },
                    body: formData,
                });
                toast.dismiss("logo-upload");
                if (res.ok) {
                    const responseData = await res.json();
                    const uploadedFilename = responseData?.data?.meta?.filename || responseData?.meta?.filename || responseData?.filename;
                    if (uploadedFilename) {
                        setLogoFilename(uploadedFilename);
                        toast.success("Logo uploaded successfully!");
                    } else {
                        toast.error("Failed to parse uploaded logo filename.");
                    }
                } else {
                    const errText = await res.text();
                    toast.error(`Upload failed: ${errText || res.statusText}`);
                }
            } catch (err: any) {
                toast.dismiss("logo-upload");
                console.error("Error uploading logo:", err);
                toast.error(`Error uploading logo: ${err.message}`);
            }
        }
    };

    const handleSavePaymentSettings = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!logoFilename && !logoPreview) {
            toast.error("Please upload a business logo.");
            return;
        }
        if (!businessName.trim()) {
            toast.error("Please enter a business name.");
            return;
        }
        if (!selectedCurrency) {
            toast.error("Please select a currency.");
            return;
        }
        if (selectedCryptos.length === 0) {
            toast.error("Please select at least one cryptocurrency.");
            return;
        }

        const token = getAuthToken();
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";

        const payload = {
            name: businessName,
            logo: logoFilename || logoPreview,
            fiatCurrencyId: Number(selectedCurrency),
            paymentOptionIds: selectedCryptos,
        };

        try {
            toast.loading("Saving payment settings...", { id: "save-settings" });
            const res = await fetch(`${BASE_URL}/merchants/me/business`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(payload),
            });
            toast.dismiss("save-settings");
            if (res.ok) {
                toast.success("Payment settings updated successfully!");
            } else {
                const errData = await res.json().catch(() => ({}));
                toast.error(errData?.error?.message || errData?.message || "Failed to update payment settings");
            }
        } catch (error: any) {
            toast.dismiss("save-settings");
            console.error("Error saving payment settings:", error);
            toast.error("An error occurred during save.");
        }
    };

    // Load user email from local storage if available
    useEffect(() => {
        const storedUser = localStorage.getItem("registered_user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                if (parsed.email) setEmail(parsed.email);
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

    // ----------------------------------------------------------------
    // TRANSACTIONS VIEW STATES & LOGIC
    // ----------------------------------------------------------------
    const [status, setStatus] = useState("all");
    const [fromDate, setFromDate] = useState("");
    const [toDate, setToDate] = useState("");
    const [search, setSearch] = useState("");
    const [transactions, setTransactions] = useState<any[]>([]);

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
        if (!fromDate || !toDate || activeView !== 'transaction') return;

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

        let url = `${process.env.NEXT_PUBLIC_API_URL}/payments?skip=0&take=8&fromDate=${fromDate}&toDate=${toDate}`;

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
    }, [fromDate, toDate, status, activeView]);

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

    // ----------------------------------------------------------------
    // PAYOUT VIEW STATES & LOGIC
    // ----------------------------------------------------------------
    const [networks, setNetworks] = useState<any[]>([]);
    const [openNetwork, setOpenNetwork] = useState<string | null>(null);
    const [selectedCoin, setSelectedCoin] = useState<any>(null);
    const [payoutAmount, setPayoutAmount] = useState("");
    const [payoutWallet, setPayoutWallet] = useState("");

    useEffect(() => {
        if (activeView === 'payout' || activeView === 'settings') {
            fetch("https://sandbox-api.chainpay.biz/networks")
                .then((res) => res.json())
                .then((data) => {
                    setNetworks(data);
                })
                .catch((err) => console.error(err));
        }
    }, [activeView]);

    const handleCreatePayout = async () => {
        if (!selectedCoin) {
            toast.error("Please select a coin");
            return;
        }
        if (!payoutWallet) {
            toast.error("Please enter a wallet address");
            return;
        }
        if (!payoutAmount) {
            toast.error("Please enter an amount");
            return;
        }

        const payload = {
            symbol: selectedCoin.symbol,
            wallet: payoutWallet,
            amount: payoutAmount,
        };

        try {
            toast.loading("Creating payout...", { id: "payout-action" });
            const response = await fetch(
                `https://sandbox-api.chainpay.biz/payouts/select/${selectedCoin.symbol}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(payload),
                }
            );
            toast.dismiss("payout-action");
            if (response.ok) {
                toast.success("Payout created successfully!");
                setPayoutAmount("");
                setPayoutWallet("");
                setSelectedCoin(null);
            } else {
                const errData = await response.json().catch(() => ({}));
                toast.error(errData.message || "Failed to create payout");
            }
        } catch (error) {
            toast.dismiss("payout-action");
            console.error("Payout Error:", error);
            toast.error("An error occurred during payout creation.");
        }
    };

    // ----------------------------------------------------------------
    // SETTINGS VIEW STATES & LOGIC
    // ----------------------------------------------------------------
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [copiedKey, setCopiedKey] = useState(false);

    const handleGenerateApiKey = async () => {
        const token = getAuthToken();
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";

        try {
            toast.loading("Fetching API Key...", { id: "api-key" });
            const res = await fetch(`${BASE_URL}/merchants/me/api-key`, {
                method: "GET",
                headers: {
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
            });
            toast.dismiss("api-key");

            if (res.ok) {
                const responseData = await res.json();
                const key = responseData?.data?.apiKey || responseData?.apiKey || responseData?.data || responseData;
                if (key && typeof key === "string") {
                    setGeneratedApiKey(key);
                    setOpenApiKeyModal(true);
                    return;
                }
            }

            // If GET doesn't return a key, generate a new one
            await handleRegenerateApiKey();
        } catch (error) {
            toast.dismiss("api-key");
            console.error("Error loading API Key, trying to generate:", error);
            await handleRegenerateApiKey();
        }
    };

    const handleRegenerateApiKey = async () => {
        const token = getAuthToken();
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";

        try {
            toast.loading("Generating API Key...", { id: "api-key" });
            const res = await fetch(`${BASE_URL}/merchants/me/api-key`, {
                method: "POST",
                headers: {
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
            });
            toast.dismiss("api-key");

            if (res.ok) {
                const responseData = await res.json();
                const key = responseData?.data?.apiKey || responseData?.apiKey || responseData?.data || responseData;
                if (key && typeof key === "string") {
                    setGeneratedApiKey(key);
                    setOpenApiKeyModal(true);
                    toast.success("API Key generated successfully!");
                } else {
                    toast.error("Failed to parse generated API key.");
                }
            } else {
                const errText = await res.text();
                toast.error(`Failed to generate API Key: ${errText || res.statusText}`);
            }
        } catch (error: any) {
            toast.dismiss("api-key");
            console.error("Error generating API Key:", error);
            toast.error(`Error generating API Key: ${error.message || error}`);
        }
    };

    const handleChangePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!oldPassword || !newPassword) {
            toast.error("All fields are required");
            return;
        }
        if (newPassword.length < 8 || newPassword.length > 12) {
            toast.error("New password must be between 8 and 12 characters");
            return;
        }

        try {
            toast.loading("Updating password...", { id: "change-pwd" });
            const response = await changePassword({ oldPassword, newPassword });
            toast.dismiss("change-pwd");
            if (response?.success) {
                setOldPassword("");
                setNewPassword("");
            }
        } catch (error) {
            toast.dismiss("change-pwd");
            console.error(error);
            toast.error("Failed to change password");
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
        } catch (e) {
            console.error(e);
            localStorage.removeItem('token');
            localStorage.removeItem('loginSuccessRoyalGame');
            router.push("/login");
        }
    };

    return (
        <div className="relative w-full min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] overflow-x-hidden md:overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col md:flex-row">
            {/* Hide the footer on the dashboard page */}
            <style dangerouslySetInnerHTML={{ __html: 'footer { display: none !important; }' }} />

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] animate-pulse pointer-events-none" />

            {/* Floating 3D Balls */}
            <div className="absolute top-16 left-8 md:left-24 w-32 h-32 z-0 pointer-events-none opacity-40 blur-[1px]">
                <Image src="/3Dlogoballs/Mstc3d.png" alt="MST 3D" width={128} height={128} className="object-contain" />
            </div>
            <div className="absolute bottom-16 left-12 w-32 h-32 z-0 pointer-events-none opacity-40 blur-[1px]">
                <Image src="/3Dlogoballs/tron3d.png" alt="Tron 3D" width={128} height={128} className="object-contain" />
            </div>
            <div className="absolute top-28 right-8 w-32 h-32 z-0 pointer-events-none opacity-40 blur-[1px]">
                <Image src="/3Dlogoballs/bnb3d.png" alt="BNB 3D" width={128} height={128} className="object-contain" />
            </div>

            {/* Left Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/40 bg-white/30 backdrop-blur-xl shadow-lg p-6 flex flex-col justify-between shrink-0 md:h-full z-20 md:rounded-r-[32px]">
                <div>
                    {/* Navigation Menu */}
                    <nav className="space-y-1">
                        <button
                            onClick={() => handleNav('home')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${activeView === 'home'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/30 hover:text-blue-600'
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            Home
                        </button>
                        <button
                            onClick={() => handleNav('transaction')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${activeView === 'transaction'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/30 hover:text-blue-600'
                                }`}
                        >
                            <Receipt size={18} />
                            Transaction
                        </button>
                        <button
                            onClick={() => handleNav('payout')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${activeView === 'payout'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/30 hover:text-blue-600'
                                }`}
                        >
                            <Send size={18} />
                            Payout
                        </button>
                        <button
                            onClick={() => handleNav('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer ${activeView === 'settings'
                                ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/30 hover:text-blue-600'
                                }`}
                        >
                            <Settings size={18} />
                            Account Setting
                        </button>
                    </nav>
                </div>

                {/* Bottom User Profile & Logout */}
                <div className="mt-6 pt-4 border-t border-white/20 flex flex-col gap-3">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-600 hover:bg-rose-50/50 transition-all duration-200 cursor-pointer"
                    >
                        <LogOut size={18} />
                        Log Out
                    </button>
                </div>
            </div>

            {/* Right Content Panel */}
            <div className="flex-1 p-6 md:p-10 relative z-10 md:h-full overflow-y-auto">
                <AnimatePresence mode="wait">


                    {/* ---------------------------------------------------- */}
                    {/* TRANSACTION VIEW */}
                    {/* ---------------------------------------------------- */}
                    {activeView === 'transaction' && (
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
                                        className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm"
                                    >
                                        <option value="all">All Statuses</option>
                                        <option value="paid">Paid</option>
                                        <option value="partial">Partial</option>
                                        <option value="expired">Expired</option>
                                    </select>

                                    <input
                                        type="date"
                                        value={fromDate}
                                        onChange={(e) => setFromDate(e.target.value)}
                                        className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm"
                                    />

                                    <input
                                        type="date"
                                        value={toDate}
                                        onChange={(e) => setToDate(e.target.value)}
                                        className="h-12 rounded-xl border border-slate-200 bg-white px-3 text-sm"
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
                                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm"
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
                                                <th className="p-4">Expire At</th>
                                                <th className="p-4">Settled At</th>
                                                <th className="p-4">Status</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-slate-100">
                                            {filteredTransactions.length > 0 ? (
                                                filteredTransactions.map((tx) => (
                                                    <tr key={tx.id} className="hover:bg-blue-50/50 transition">
                                                        <td className="p-4 font-mono font-medium text-slate-700">{tx.id}</td>
                                                        <td className="p-4 font-bold text-slate-900">{tx.amount}</td>
                                                        <td className="p-4 font-semibold text-slate-600">{tx.token}</td>
                                                        <td className="p-4">
                                                            <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${tx.status === "Paid"
                                                                ? "bg-green-100 text-green-600"
                                                                : tx.status === "Partial"
                                                                    ? "bg-amber-100 text-amber-600"
                                                                    : "bg-red-100 text-red-600"
                                                                }`}>
                                                                {tx.status}
                                                            </span>
                                                        </td>
                                                        <td className="p-4 text-slate-500">{tx.createdAt}</td>
                                                    </tr>
                                                ))
                                            ) : (
                                                <tr>
                                                    <td colSpan={5} className="p-8 text-center text-slate-400">
                                                        No transactions found for this period.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            {/* MODALS INTEGRATION */}
            {openAddressModal && singleNetwork && (
                <AddressModal
                    setOpen={setOpenAddressModal}
                    singleNetwork={singleNetwork}
                    setSingleNetwork={setSingleNetwork}
                    refreshFunction={() => { }}
                />
            )}

            {openApiKeyModal && (
                <ApiKeyModal
                    handleClose={() => setOpenApiKeyModal(false)}
                    apiKey={generatedApiKey}
                    onRegenerate={handleRegenerateApiKey}
                />
            )}

            {openDeleteModal && (
                <DeleteAccount
                    setAccountShow={setOpenDeleteModal}
                />
            )}
        </div>
    );
}