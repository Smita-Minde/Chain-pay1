"use client";

import { useState, useEffect } from "react";
import {
    LayoutDashboard,
    Receipt,
    Send,
    Settings,
    LogOut,
    ArrowLeft,
    ArrowLeftRight
} from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAuth } from "@hooks";
import Link from "next/link";
import { Arrow } from "@radix-ui/react-context-menu";

interface DashboardLayoutProps {
    activeView: 'home' | 'transaction' | 'payout' | 'settings' | 'Paymentinspector';
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

    const handleNav = (view: 'home' | 'transaction' | 'payout' | 'settings' | 'paymentinspector') => {
        if (view === 'home') {
            router.push('/login/home');
        } else if (view === 'transaction') {
            router.push('/login/transaction');
        } else if (view === 'payout') {
            router.push('/login/payout');
        } else if (view === 'settings') {
            router.push('/login/AccountSetting');
        } else if (view === 'paymentinspector') {
            router.push('/login/Paymentinspector');
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

            {/* Left Sidebar on Desktop / Horizontal Compact Pill Navigation on Mobile */}
            <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-white/40 bg-white/50 backdrop-blur-xl shadow-sm md:shadow-lg p-2.5 sm:p-3 md:p-6 flex flex-row md:flex-col justify-between items-center md:items-stretch shrink-0 md:h-full z-20 md:rounded-r-[32px] overflow-x-auto md:overflow-x-visible [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
                <div className="w-full md:w-auto">
                    {/* Navigation Menu */}
                    <nav className="flex flex-row md:flex-col items-center md:items-stretch gap-1.5 md:space-y-1 md:gap-0 w-full">
                        <button
                            onClick={() => handleNav('home')}
                            className={`flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer border-none whitespace-nowrap shrink-0 ${activeView === 'home'
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/40 hover:text-blue-600 bg-transparent'
                                }`}
                        >
                            <LayoutDashboard size={16} className="md:w-[18px] md:h-[18px]" />
                            <span>Home</span>
                        </button>

                        <button
                            onClick={() => handleNav('transaction')}
                            className={`flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer border-none whitespace-nowrap shrink-0 ${activeView === 'transaction'
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/40 hover:text-blue-600 bg-transparent'
                                }`}
                        >
                            <Receipt size={16} className="md:w-[18px] md:h-[18px]" />
                            <span>Transaction</span>
                        </button>

                        <button
                            onClick={() => handleNav('payout')}
                            className={`flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer border-none whitespace-nowrap shrink-0 ${activeView === 'payout'
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/40 hover:text-blue-600 bg-transparent'
                                }`}
                        >
                            <Send size={16} className="md:w-[18px] md:h-[18px]" />
                            <span>Payout</span>
                        </button>

                        <button
                            onClick={() => handleNav('settings')}
                            className={`flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer border-none whitespace-nowrap shrink-0 ${activeView === 'settings'
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/40 hover:text-blue-600 bg-transparent'
                                }`}
                        >
                            < Settings size={16} className="md:w-[18px] md:h-[18px]" />
                            <span>Account Setting</span>
                        </button>

                        <button
                            onClick={() => handleNav('paymentinspector')}
                            className={`flex items-center gap-2 px-3.5 py-2 md:px-4 md:py-3 rounded-xl md:rounded-2xl text-xs md:text-sm font-semibold transition-all duration-200 cursor-pointer border-none whitespace-nowrap shrink-0 ${activeView === 'settings'
                                ? 'bg-blue-600 text-white shadow-md shadow-blue-500/25'
                                : 'text-slate-700 hover:bg-white/40 hover:text-blue-600 bg-transparent'
                                }`}
                        >
                            <ArrowLeftRight size={16} className="md:w-[18px] md:h-[18px]" />
                            <span>Payment Inspector</span>
                        </button>

                        {/* Mobile Logout Button (in horizontal bar) */}
                        <button
                            onClick={handleLogout}
                            className="md:hidden flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-rose-600 hover:bg-rose-50/50 transition-all duration-200 cursor-pointer border-none bg-transparent whitespace-nowrap shrink-0 ml-auto"
                        >
                            <LogOut size={15} />
                            <span>Log Out</span>
                        </button>
                    </nav>
                </div>

                {/* Desktop Bottom Logout */}
                <div className="hidden md:flex mt-6 pt-4 border-t border-white/20 flex-col gap-3">
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
            <div className="flex-1 p-4 sm:p-6 md:p-10 relative z-10 md:h-full overflow-y-auto">
                {/* Mobile Back Button (Clean Compact Chip) */}
                <div className="md:hidden mb-4">
                    <Link
                        href="/"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white/80 border border-slate-200 rounded-xl text-xs font-medium text-slate-700 hover:bg-slate-50 transition-all active:scale-[0.98] shadow-sm backdrop-blur-md"
                    >
                        <ArrowLeft className="w-3.5 h-3.5" />
                        Back to Home
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
