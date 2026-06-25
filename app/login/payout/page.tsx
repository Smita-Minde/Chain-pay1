"use client";

import DashboardLayout from "../sidebar/components/DashboardLayout";
import PayoutView from "../sidebar/components/PayoutView";

export default function PayoutPage() {
    return (
        <DashboardLayout activeView="payout">
            <PayoutView />
        </DashboardLayout>
    );
}
