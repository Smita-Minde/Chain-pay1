"use client";

import { useRouter } from "next/navigation";
import DashboardLayout from "../sidebar/components/DashboardLayout";
import HomeView from "../sidebar/components/HomeView";

export default function HomePage() {
    const router = useRouter();

    const handleNav = (view: 'home' | 'transaction' | 'payout' | 'settings' | 'Paymentinspector' | 'generatedaddress') => {
        if (view === 'home') {
            router.push('/login/home');
        } else if (view === 'transaction') {
            router.push('/login/transaction');
        } else if (view === 'payout') {
            router.push('/login/payout');
        } else if (view === 'settings') {
            router.push('/login/AccountSetting');
        }
        else if (view === 'Paymentinspector') {
            router.push('/login/Paymentinspector');
        }
        else if (view === 'generatedaddress') {
            router.push(`/login/GeneratedAddress`);
        }
    };

    return (
        <DashboardLayout activeView="home">
            <HomeView setActiveView={handleNav} />
        </DashboardLayout>
    );
}