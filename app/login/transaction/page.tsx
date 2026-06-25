"use client";

import DashboardLayout from "../sidebar/components/DashboardLayout";
import TransactionView from "../sidebar/components/TransactionView";

export default function TransactionPage() {
    return (
        <DashboardLayout activeView="transaction">
            <TransactionView />
        </DashboardLayout>
    );
}