"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight } from "lucide-react";
import { useState } from "react";
import chainpayLogo from "@/Public/Chainpay_logo(Blue).png";
import { cn } from "@/lib/utils";

const links = [
    { to: "/industries", label: "Industries" },
    { to: "/cryptocurrencies", label: "Cryptocurrencies" },
    { to: "/about", label: "About" },
    { to: "/solutions", label: "Solutions" },
    { to: "/resources", label: "Resources" },
    { to: "/pricing", label: "Pricing" },
] as const;

export function Navbar() {
    const [open, setOpen] = useState(false);
    const pathname = usePathname();

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Gradient accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

            <div className="border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="group flex items-center gap-2.5">
                        <img
                            src={chainpayLogo.src}
                            alt="ChainPay logo"
                            className="relative h-10 w-auto transition-transform group-hover:rotate-6"
                        />
                    </Link>

                    <ul className="hidden items-center gap-1 lg:flex">
                        {links.map((l) => {
                            const isActive = pathname === l.to;
                            return (
                                <li key={l.to}>
                                    <Link
                                        href={l.to}
                                        className={cn(
                                            "group relative inline-flex items-center rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground",
                                            isActive
                                                ? "text-primary font-semibold"
                                                : "text-foreground/75"
                                        )}
                                    >
                                        <span className="absolute inset-0 -z-10 rounded-full bg-primary/0 transition-colors group-hover:bg-primary/10" />
                                        {l.label}
                                    </Link>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            className="hidden sm:inline-flex text-sm font-semibold hover:bg-primary/5 hover:text-primary"
                        >
                            Log in
                        </Button>
                        <div className="relative hidden sm:block">
                            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary via-fuchsia-500 to-primary opacity-70 blur-sm animate-gradient bg-[length:200%_auto]" />
                            <Button className="relative bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30">
                                Get Started
                                <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                            </Button>
                        </div>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card text-foreground lg:hidden"
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </nav>

                {open && (
                    <div className="border-t border-border/60 bg-background/95 backdrop-blur lg:hidden">
                        <ul className="mx-auto flex max-w-7xl flex-col gap-1 px-6 py-4">
                            {links.map((l) => {
                                const isActive = pathname === l.to;
                                return (
                                    <li key={l.to}>
                                        <Link
                                            href={l.to}
                                            onClick={() => setOpen(false)}
                                            className={cn(
                                                "block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary",
                                                isActive
                                                    ? "bg-primary/10 text-primary font-semibold"
                                                    : "text-foreground/80"
                                            )}
                                        >
                                            {l.label}
                                        </Link>
                                    </li>
                                );
                            })}
                            <li className="mt-2 flex gap-2">
                                <Button variant="outline" className="flex-1">Log in</Button>
                                <Button className="flex-1 bg-primary">Get Started</Button>
                            </li>
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}
