"use client";

import DashboardLayout from "../sidebar/components/DashboardLayout";
import PaymentInspector from "../sidebar/components/PaymentInspector";

export default function PaymentInspectorPage() {
    return (
        <DashboardLayout activeView="Paymentinspector">
            <PaymentInspector />
        </DashboardLayout>
    );
}