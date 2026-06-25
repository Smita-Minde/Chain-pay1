"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SidebarRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/login/home");
    }, [router]);

    return null;
}
