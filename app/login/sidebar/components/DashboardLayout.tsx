"use client";

import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Receipt,
    Send,
    Settings,
    LogOut,
    ArrowLeft
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@hooks";
import Link from "next/link";

interface DashboardLayoutProps {
    activeView: 'home' | 'transaction' | 'payout' | 'settings';
    children: React.ReactNode;
}

export default function DashboardLayout({ activeView, children }: DashboardLayoutProps) {
    const [isCheckingAuth, setIsCheckingAuth] = useState(true);
    const router = useRouter();
    const { logout } = useAuth();

    useEffect(() => {
        const token = localStorage.getItem("auth_token") || localStorage.getItem("token") || localStorage.getItem("loginSuccessRoyalGame");
        if (!token) {
            router.replace("/login");
        } else {
            setIsCheckingAuth(false);
        }
    }, [router]);

    const handleNav = (view: 'home' | 'transaction' | 'payout' | 'settings') => {
        if (view === 'home') {
            router.push('/login/home');
        } else if (view === 'transaction') {
            router.push('/login/transaction');
        } else if (view === 'payout') {
            router.push('/login/payout');
        } else if (view === 'settings') {
            router.push('/login/AccountSetting');
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

    if (isCheckingAuth) {
        return null;
    }

    return (
        <div className="relative w-full min-h-[calc(100vh-80px)] md:h-[calc(100vh-80px)] overflow-x-hidden md:overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col md:flex-row">
            {/* Hide the footer on the dashboard page */}
            <style dangerouslySetInnerHTML={{ __html: 'footer { display: none !important; }' }} />

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-[120px] animate-pulse pointer-events-none" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] animate-pulse pointer-events-none" />

            {/* Floating 3D Balls */}
            <div className="absolute top-16 left-8 md:left-24 w-32 h-32 z-0 pointer-events-none opacity-40 blur-[1px]">
                <Image src="/3Dlogoballs/Mstc3d.png" alt="MST 3D" width={128} height={128} className="object-contain animate-float-slow" />
            </div>
            <div className="absolute bottom-16 left-12 w-32 h-32 z-0 pointer-events-none opacity-40 blur-[1px]">
                <Image src="/3Dlogoballs/tron3d.png" alt="Tron 3D" width={128} height={128} className="object-contain animate-float-medium" />
            </div>
            <div className="absolute top-28 right-8 w-32 h-32 z-0 pointer-events-none opacity-40 blur-[1px]">
                <Image src="/3Dlogoballs/bnb3d.png" alt="BNB 3D" width={128} height={128} className="object-contain animate-float-fast" />
            </div>

            {/* Left Sidebar */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/40 bg-white/30 backdrop-blur-xl shadow-lg p-6 flex flex-col justify-between shrink-0 md:h-full z-20 md:rounded-r-[32px]">
                <div>
                    {/* Navigation Menu */}
                    <nav className="space-y-1">
                        <button
                            onClick={() => handleNav('home')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer border-none ${activeView === 'home'
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'text-slate-700 hover:bg-white/30 hover:text-blue-600 bg-transparent'
                                }`}
                        >
                            <LayoutDashboard size={18} />
                            Home
                        </button>
                        <button
                            onClick={() => handleNav('transaction')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer border-none ${activeView === 'transaction'
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'text-slate-700 hover:bg-white/30 hover:text-blue-600 bg-transparent'
                                }`}
                        >
                            <Receipt size={18} />
                            Transaction
                        </button>
                        <button
                            onClick={() => handleNav('payout')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer border-none ${activeView === 'payout'
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'text-slate-700 hover:bg-white/30 hover:text-blue-600 bg-transparent'
                                }`}
                        >
                            <Send size={18} />
                            Payout
                        </button>
                        <button
                            onClick={() => handleNav('settings')}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all duration-200 cursor-pointer border-none ${activeView === 'settings'
                                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25'
                                    : 'text-slate-700 hover:bg-white/30 hover:text-blue-600 bg-transparent'
                                }`}
                        >
                            <Settings size={18} />
                            Account Setting
                        </button>
                    </nav>
                </div>

                {/* Bottom Logout */}
                <div className="mt-6 pt-4 border-t border-white/20 flex flex-col gap-3">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-rose-600 hover:bg-rose-50/50 transition-all duration-200 cursor-pointer border-none bg-transparent"
                    >
                        <LogOut size={18} />
                        Log Out
                    </button>
                </div>
            </div>

            {/* Right Content Panel */}
            <div className="flex-1 p-6 md:p-10 relative z-10 md:h-full overflow-y-auto">
                {/* Mobile Back Button */}
                <div className="md:hidden mb-6">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
