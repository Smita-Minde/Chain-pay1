"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Upload, X } from "lucide-react";
import { toast } from "sonner";
import AddressModal from "@components/Modals/AddressModal";
import ApiKeyModal from "@components/Modals/ApiKeyModal";

export default function SettingsView() {
    // Modals states
    const [openAddressModal, setOpenAddressModal] = useState(false);
    const [singleNetwork, setSingleNetwork] = useState<any>(null);
    const [openApiKeyModal, setOpenApiKeyModal] = useState(false);
    const [generatedApiKey, setGeneratedApiKey] = useState("");
    const [networks, setNetworks] = useState<any[]>([]);

    useEffect(() => {
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";
        fetch(`${BASE_URL}/networks`)
            .then((res) => res.json())
            .then((data) => {
                setNetworks(data);
            })
            .catch((err) => console.error(err));
    }, []);

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

    useEffect(() => {
        const loadPaymentSettingsData = async () => {
            const token = getAuthToken();
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";

            // Load Fiat Currencies
            try {
                const res = await fetch(`${BASE_URL}/fiat-currencies`);
                if (res.ok) {
                    const data = await res.json();
                    setFiatCurrencies(data);
                }
            } catch (err) {
                console.error(err);
            }

            // Load Crypto Options
            try {
                const res = await fetch(`${BASE_URL}/payments/options`);
                if (res.ok) {
                    const data = await res.json();
                    setCryptoOptions(data);
                }
            } catch (err) {
                console.error(err);
            }

            // Load Existing Merchant Settings
            if (token) {
                try {
                    const res = await fetch(`${BASE_URL}/merchants/me/business`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    if (res.ok) {
                        const responseData = await res.json();
                        const data = responseData?.data || responseData;
                        if (data) {
                            if (data.name) setBusinessName(data.name);
                            if (data.logo) {
                                setLogoFilename(data.logo);
                                if (data.logo.startsWith("http")) {
                                    setLogoPreview(data.logo);
                                } else {
                                    setLogoPreview(`${BASE_URL}/static/img/logos/${data.logo}`);
                                }
                            }
                            if (data.fiatCurrency) {
                                setSelectedCurrency(data.fiatCurrency.id.toString());
                            } else if (data.fiatCurrencyId) {
                                setSelectedCurrency(data.fiatCurrencyId.toString());
                            }
                            if (data.paymentOptions && Array.isArray(data.paymentOptions)) {
                                setSelectedCryptos(data.paymentOptions.map((opt: any) => opt.id));
                            } else if (data.paymentOptionIds && Array.isArray(data.paymentOptionIds)) {
                                setSelectedCryptos(data.paymentOptionIds);
                            }
                        }
                    }
                } catch (err) {
                    console.error(err);
                }
            }
        };

        loadPaymentSettingsData();
    }, []);

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

            let toastId: any = null;
            try {
                toastId = toast.loading("Uploading logo...");
                const res = await fetch(`${BASE_URL}/upload`, {
                    method: "POST",
                    headers: {
                        ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                    },
                    body: formData,
                });
                if (toastId) toast.dismiss(toastId);
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
                if (toastId) toast.dismiss(toastId);
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

        let toastId: any = null;
        try {
            toastId = toast.loading("Saving payment settings...");
            const res = await fetch(`${BASE_URL}/merchants/me/business`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
                body: JSON.stringify(payload),
            });
            if (toastId) toast.dismiss(toastId);
            if (res.ok) {
                toast.success("Payment settings updated successfully!");
            } else {
                const errData = await res.json().catch(() => ({}));
                toast.error(errData?.error?.message || errData?.message || "Failed to update payment settings");
            }
        } catch (error: any) {
            if (toastId) toast.dismiss(toastId);
            console.error("Error saving payment settings:", error);
            toast.error("An error occurred during save.");
        }
    };

    const handleGenerateApiKey = async () => {
        const token = getAuthToken();
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";

        let toastId: any = null;
        try {
            toastId = toast.loading("Fetching API Key...");
            const res = await fetch(`${BASE_URL}/merchants/me/api-key`, {
                method: "GET",
                headers: {
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
            });
            if (toastId) toast.dismiss(toastId);

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
            if (toastId) toast.dismiss(toastId);
            console.error("Error loading API Key, trying to generate:", error);
            await handleRegenerateApiKey();
        }
    };

    const handleRegenerateApiKey = async () => {
        const token = getAuthToken();
        const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";

        let toastId: any = null;
        try {
            toastId = toast.loading("Generating API Key...");
            const res = await fetch(`${BASE_URL}/merchants/me/api-key`, {
                method: "POST",
                headers: {
                    ...(token ? { "Authorization": `Bearer ${token}` } : {}),
                },
            });
            if (toastId) toast.dismiss(toastId);

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
            if (toastId) toast.dismiss(toastId);
            console.error("Error generating API Key:", error);
            toast.error(`Error generating API Key: ${error.message || error}`);
        }
    };

    return (
        <motion.div
            key="settings"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="space-y-6"
        >
            <div>
                <h1 className="text-3xl font-extrabold text-slate-900">Account Settings</h1>
                <p className="text-slate-500 text-sm mt-1">Configure wallet addresses, change credentials, and manage developer keys.</p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Merchant Wallet Configuration */}
                <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">Set Your Wallet Addresses</h3>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                            🛈 Chain Pay is non-custodial, meaning we don’t hold your funds. We generate a payment address for each transaction, and when your customer pays, we instantly forward the funds to your configured wallet. Be sure to set up your wallet addresses before using.<br></br> <br></br>

                            ⚠️ Ensure you set up the correct blockchain address to receive funds and tokens for that specific blockchain (e.g., a BNB address will be used to receive both BNB and USDT over BEP20).<br></br> <br></br>

                            🔁 When changing your blockchain address, ensure you generate new payment addresses for your customers. If the addresses were created before the change, they will continue sending funds to the previously set address.
                        </p>
                        <div className="space-y-2 mb-4">
                            {networks.map((net) => (
                                <div key={net.id} className="flex justify-between items-center bg-white/85 p-3 rounded-2xl border border-slate-100">
                                    <span className="text-sm font-semibold text-slate-700">{net.name}</span>
                                    <button
                                        onClick={() => {
                                            setSingleNetwork(net);
                                            setOpenAddressModal(true);
                                        }}
                                        className="text-sm font-semibold text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
                                    >
                                        Configure
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Developer API Key */}
                <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md flex flex-col justify-between">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800 mb-2">API Security Keys</h3>
                        <p className="text-sm text-slate-500 mb-4 leading-relaxed">
                            Generate authentication keys to secure transactions triggered from your custom backend API integration.
                        </p>
                    </div>
                    <button
                        onClick={handleGenerateApiKey}
                        className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition cursor-pointer shadow-md shadow-blue-500/10 border-none"
                    >
                        View / Generate API Key
                    </button>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                {/* Payment Settings */}
                <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md">
                    <h3 className="text-lg font-bold text-slate-800 mb-2">Payment Settings</h3>
                    <p className="text-sm text-slate-500 mb-6 leading-relaxed">
                        Configure the payment settings for ChainPay.
                    </p>
                    <form onSubmit={handleSavePaymentSettings} className="space-y-4">
                        <div>
                            <label className="text-sm font-semibold text-slate-600 block mb-1">Business Logo*</label>
                            <div className="flex items-center gap-3">
                                <input
                                    type="file"
                                    accept="image/*"
                                    onChange={handleLogoChange}
                                    className="hidden"
                                    id="business-logo-upload"
                                />
                                <label
                                    htmlFor="business-logo-upload"
                                    className="px-4 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-bold transition duration-200 cursor-pointer shadow-md shadow-blue-500/10 inline-flex items-center gap-1.5"
                                >
                                    <Upload size={14} /> Upload
                                </label>
                                {logoPreview && (
                                    <div className="relative inline-block">
                                        <img
                                            src={logoPreview}
                                            alt="Preview"
                                            className="h-12 w-12 rounded-lg object-cover border border-slate-200"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => {
                                                setLogoFile(null);
                                                setLogoPreview(null);
                                                setLogoFilename(null);

                                                const input = document.getElementById(
                                                    "business-logo-upload"
                                                ) as HTMLInputElement;

                                                if (input) input.value = "";
                                            }}
                                            className="absolute -top-1 -right-1 z-10
                                                h-5 w-5 rounded-full
                                                bg-white border border-gray-200
                                                shadow-md flex items-center justify-center cursor-pointer"
                                        >
                                            <X size={10} className="text-red-500" />
                                        </button>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-slate-400 mt-1">Image size must not exceed 2 MB.</p>
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-slate-600 block mb-1">Business Name</label>
                            <input
                                type="text"
                                value={businessName}
                                onChange={(e) => setBusinessName(e.target.value)}
                                placeholder="Enter your business name"
                                className="h-11 w-full bg-white/80 border border-slate-200 rounded-xl px-4 text-sm text-slate-800 outline-none focus:border-blue-500 transition focus:ring-2 focus:ring-blue-100"
                            />
                        </div>

                        <div>
                            <label className="text-sm font-semibold text-slate-600 block mb-1">Currency for Exchange Rate</label>
                            <select
                                value={selectedCurrency}
                                onChange={(e) => setSelectedCurrency(e.target.value)}
                                className="h-11 w-full bg-white/80 border border-slate-200 rounded-xl px-3 text-sm text-slate-800 outline-none focus:border-blue-500 transition focus:ring-2 focus:ring-blue-100"
                            >
                                <option value="">Select a currency</option>
                                {fiatCurrencies.map((fiat) => (
                                    <option key={fiat.id} value={fiat.id.toString()}>
                                        {fiat.sign ? `[${fiat.sign}] ` : ""}{fiat.symbol} {fiat.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="relative">
                            <label className="text-sm font-semibold text-slate-600 block mb-1">Choose Cryptocurrencies</label>
                            <button
                                type="button"
                                onClick={() => setOpenCryptoDropdown(!openCryptoDropdown)}
                                className="h-11 w-full bg-white/80 border border-slate-200 rounded-xl px-4 text-sm text-slate-800 flex items-center justify-between outline-none focus:border-blue-500 transition text-left cursor-pointer"
                            >
                                <span className="truncate">
                                    {selectedCryptos.length > 0
                                        ? cryptoOptions
                                            .filter((opt) => selectedCryptos.includes(opt.id))
                                            .map((opt) => opt.name)
                                            .join(", ")
                                        : "Select cryptocurrencies..."}
                                </span>
                                <span className="text-slate-400 text-sm">▼</span>
                            </button>

                            {openCryptoDropdown && (
                                <div className="absolute z-30 mt-1 w-full bg-white border border-slate-200 rounded-xl shadow-xl p-2 space-y-1 max-h-[160px] overflow-y-auto">
                                    {cryptoOptions.map((crypto) => {
                                        const isSelected = selectedCryptos.includes(crypto.id);
                                        return (
                                            <button
                                                key={crypto.id}
                                                type="button"
                                                onClick={() => {
                                                    if (isSelected) {
                                                        setSelectedCryptos(selectedCryptos.filter(id => id !== crypto.id));
                                                    } else {
                                                        setSelectedCryptos([...selectedCryptos, crypto.id]);
                                                    }
                                                }}
                                                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-between border-none ${
                                                    isSelected
                                                        ? "bg-blue-50 text-blue-600 font-semibold"
                                                        : "hover:bg-slate-50 text-slate-700 bg-transparent"
                                                }`}
                                            >
                                                <div className="flex items-center gap-2">
                                                    {crypto.logo && (
                                                        <img src={crypto.logo} alt={crypto.name} className="h-4 w-4 rounded-full" />
                                                    )}
                                                    <span>{crypto.displayName || crypto.name}</span>
                                                </div>
                                                {isSelected && <span className="text-blue-600 font-bold">✓</span>}
                                            </button>
                                        );
                                    })}
                                </div>
                            )}
                        </div>

                        <button
                            type="submit"
                            className="w-full h-11 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition duration-200 cursor-pointer border-none shadow-md shadow-blue-500/10 text-sm uppercase tracking-wider mt-4"
                        >
                            Save Settings
                        </button>
                    </form>
                </div>
            </div>

            {/* Address Modal configuration */}
            {openAddressModal && singleNetwork && (
                <AddressModal
                    setOpen={setOpenAddressModal}
                    singleNetwork={singleNetwork}
                    setSingleNetwork={setSingleNetwork}
                    refreshFunction={() => { }}
                />
            )}

            {/* API Key popup */}
            {openApiKeyModal && (
                <ApiKeyModal
                    handleClose={() => setOpenApiKeyModal(false)}
                    apiKey={generatedApiKey}
                    onRegenerate={handleRegenerateApiKey}
                />
            )}
        </motion.div>
    );
}
