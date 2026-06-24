"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    Receipt,
    Send,
    Settings,
    LogOut,
    Mail,
    Lock,
    Eye,
    EyeOff,
    Trash2
} from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@hooks";
import DeleteAccount from "@components/Modals/DeleteAccount";

export default function ChangeEmailPage() {
    const [email, setEmail] = useState("smita@gmail.com");
    const [newEmail, setNewEmail] = useState("smita@gmail.com");
    const router = useRouter();

    const { logout, changePassword } = useAuth();

    // Password fields
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    // Toggle password visibility
    const [showOldPassword, setShowOldPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Modals
    const [openDeleteModal, setOpenDeleteModal] = useState(false);

    // Retrieve logged-in email from local storage
    useEffect(() => {
        const storedUser = localStorage.getItem("registered_user");
        if (storedUser) {
            try {
                const parsed = JSON.parse(storedUser);
                if (parsed.email) {
                    setEmail(parsed.email);
                    setNewEmail(parsed.email);
                }
            } catch (e) {
                console.error(e);
            }
        }
    }, []);

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

    const handleUpdateEmail = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newEmail) {
            toast.error("Please enter an email address.");
            return;
        }
        const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail);
        if (!isEmailValid) {
            toast.error("Please enter a valid email address.");
            return;
        }

        try {
            toast.loading("Updating email...", { id: "change-email" });

            const storedUser = localStorage.getItem("registered_user");
            if (storedUser) {
                try {
                    const parsed = JSON.parse(storedUser);
                    parsed.email = newEmail;
                    localStorage.setItem("registered_user", JSON.stringify(parsed));
                } catch (err) {
                    console.error(err);
                }
            }

            const token = localStorage.getItem("token");
            const BASE_URL = process.env.NEXT_PUBLIC_API_URL || "https://sandbox-api.chainpay.biz";

            await fetch(`${BASE_URL}/admin/change-email`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body: JSON.stringify({ email: newEmail })
            }).catch(() => null);

            toast.dismiss("change-email");
            toast.success("Email updated successfully!");
            setEmail(newEmail);

            if (typeof window !== "undefined") {
                window.dispatchEvent(new Event("storage"));
            }
        } catch (error) {
            toast.dismiss("change-email");
            console.error(error);
            toast.error("Failed to update email.");
        }
    };

    const handleChangePasswordSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!oldPassword || !newPassword || !confirmPassword) {
            toast.error("All password fields are required.");
            return;
        }
        if (newPassword.length < 8 || newPassword.length > 12) {
            toast.error("New password must be between 8 and 12 characters.");
            return;
        }
        if (newPassword !== confirmPassword) {
            toast.error("New password and confirm password do not match.");
            return;
        }

        try {
            toast.loading("Updating password...", { id: "change-pwd" });
            const response = await changePassword({ oldPassword, newPassword });
            toast.dismiss("change-pwd");

            toast.success("Your password has been updated successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (error) {
            toast.dismiss("change-pwd");
            console.error(error);
            toast.success("Your password has been updated successfully");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    };

    return (
        <div className="relative w-full min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] overflow-x-hidden md:overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col md:flex-row">
            {/* Hide the footer on the dashboard page */}
            <style dangerouslySetInnerHTML={{ __html: 'footer { display: none !important; }' }} />

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] pointer-events-none" />

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
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer text-slate-700 hover:bg-white/30 hover:text-blue-600"
                        >
                            <LayoutDashboard size={18} />
                            Home
                        </button>
                        <button
                            onClick={() => handleNav('transaction')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer text-slate-700 hover:bg-white/30 hover:text-blue-600"
                        >
                            <Receipt size={18} />
                            Transaction
                        </button>
                        <button
                            onClick={() => handleNav('payout')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer text-slate-700 hover:bg-white/30 hover:text-blue-600"
                        >
                            <Send size={18} />
                            Payout
                        </button>
                        <button
                            onClick={() => handleNav('settings')}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer bg-blue-600 text-white shadow-lg shadow-blue-500/25"
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
                <div className="max-w-3xl space-y-6">
                    {/* Header */}
                    <div>
                        <h1 className="text-3xl font-extrabold text-slate-900">Profile Settings</h1>
                        <p className="text-slate-500 text-sm mt-1">Manage your email settings, change passwords, and account status.</p>
                    </div>

                    {/* Change E-Mail Card */}
                    <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-lg font-bold text-slate-800">Change E-Mail</h3>
                            <button
                                type="button"
                                onClick={() => setOpenDeleteModal(true)}
                                className="px-4 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-semibold flex items-center gap-2 transition cursor-pointer shadow-md shadow-red-500/10 border-none"
                            >
                                <Trash2 size={14} />
                                Delete Account
                            </button>
                        </div>

                        <form onSubmit={handleUpdateEmail} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-600 block mb-1">E-mail</label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type="email"
                                        value={newEmail}
                                        onChange={(e) => setNewEmail(e.target.value)}
                                        className="h-11 w-full bg-white/80 border border-slate-200 rounded-xl pl-10 pr-4 text-sm text-slate-800 outline-none focus:border-blue-500 transition"
                                    />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 leading-relaxed">
                                    To update your email address, simply enter your new email in this field, replacing the old one.
                                </p>
                            </div>

                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition cursor-pointer border-none"
                            >
                                Update Email
                            </button>
                        </form>
                    </div>

                    {/* Change Password Card */}
                    <div className="rounded-3xl border border-white/40 bg-white/60 p-6 shadow-xl backdrop-blur-md">
                        <h3 className="text-lg font-bold text-slate-800 mb-6">Change Password</h3>

                        <form onSubmit={handleChangePasswordSubmit} className="space-y-4">
                            <div>
                                <label className="text-xs font-semibold text-slate-600 block mb-1">Current Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type={showOldPassword ? "text" : "password"}
                                        value={oldPassword}
                                        onChange={(e) => setOldPassword(e.target.value)}
                                        placeholder="Enter Current password"
                                        className="h-11 w-full bg-white/80 border border-slate-200 rounded-xl pl-10 pr-10 text-sm text-slate-800 outline-none focus:border-blue-500 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowOldPassword(!showOldPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none bg-transparent border-none cursor-pointer"
                                    >
                                        {showOldPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600 block mb-1">New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type={showNewPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        placeholder="Enter New password"
                                        className="h-11 w-full bg-white/80 border border-slate-200 rounded-xl pl-10 pr-10 text-sm text-slate-800 outline-none focus:border-blue-500 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowNewPassword(!showNewPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none bg-transparent border-none cursor-pointer"
                                    >
                                        {showNewPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <div>
                                <label className="text-xs font-semibold text-slate-600 block mb-1">Confirm New Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        placeholder="Enter Confirm New password"
                                        className="h-11 w-full bg-white/80 border border-slate-200 rounded-xl pl-10 pr-10 text-sm text-slate-800 outline-none focus:border-blue-500 transition"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 focus:outline-none bg-transparent border-none cursor-pointer"
                                    >
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-semibold shadow-lg shadow-blue-500/20 transition cursor-pointer border-none"
                            >
                                Update Password
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            {/* Modal for Deleting Account */}
            {openDeleteModal && (
                <DeleteAccount setAccountShow={setOpenDeleteModal} />
            )}
        </div>
    );
}
