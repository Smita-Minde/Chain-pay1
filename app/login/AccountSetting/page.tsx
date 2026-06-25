"use client";

import DashboardLayout from "../sidebar/components/DashboardLayout";
import SettingsView from "../sidebar/components/SettingsView";

export default function AccountSettingPage() {
    return (
        <DashboardLayout activeView="settings">
            <SettingsView />
        </DashboardLayout>
    );
}
