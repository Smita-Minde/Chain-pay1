"use client";

import DashboardLayout from "../sidebar/components/DashboardLayout";
import GeneratedAddress from "../sidebar/components/GeneratedAddress";

export default function GeneratedAddressPage() {
    return (
        <DashboardLayout activeView="GeneratedAddress">
            <GeneratedAddress />
        </DashboardLayout>
    );
}