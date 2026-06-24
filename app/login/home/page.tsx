"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function HomeRedirectPage() {
    const router = useRouter();

    useEffect(() => {
        router.replace("/login/sidebar?view=home");
    }, [router]);

    return null;
}