"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Menu, ArrowRight, Home, User, ChevronDown, UserCog, Mail, LayoutGrid } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { useEffect } from "react";

const links = [
    { to: "/industries", label: "Industries" },
    { to: "/cryptocurrencies", label: "Cryptocurrencies" },
    { to: "/developer-docs", label: "Developer Docs" },
    { to: "/about", label: "About" },
] as const;

const dropdownIndustries = [
    { name: "E-Commerce & Retail", path: "/industries/E-commerce-Retail" },
    { name: "Travel & Hospitality", path: "/industries/travel-hospitality" },
    { name: "Gaming & Entertainment", path: "/industries/gaming-entertainment" },
    { name: "Freelancers & Digital Services", path: "/industries/freelancer-digital-services" },
    { name: "Startups & Enterprises", path: "/industries/startups-enterprises" },
];

export function Navbar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [email, setEmail] = useState("");
    const [dropdownOpen, setDropdownOpen] = useState(false);

    const pathname = usePathname();

    const [open, setOpen] = useState(false);
    const [docsDropdownOpen, setDocsDropdownOpen] = useState(false);
    const [industriesDropdownOpen, setIndustriesDropdownOpen] = useState(false);
    const [mobileDocsOpen, setMobileDocsOpen] = useState(false);
    const [mobileIndustriesOpen, setMobileIndustriesOpen] = useState(false);

    useEffect(() => {
        const checkAuth = () => {
            let token = localStorage.getItem("token");
            if (!token) {
                const raw = localStorage.getItem("loginSuccessRoyalGame");
                if (raw) {
                    try {
                        token = JSON.parse(raw);
                    } catch {
                        token = raw;
                    }
                }
            }
            setIsLoggedIn(!!token);

            let userEmail = "";
            const storedUser = localStorage.getItem("registered_user");
            if (storedUser) {
                try {
                    const parsed = JSON.parse(storedUser);
                    if (parsed.email) userEmail = parsed.email;
                } catch (e) {
                    console.error(e);
                }
            }

            if (!userEmail && token) {
                try {
                    const parts = token.split('.');
                    if (parts.length === 3) {
                        const payload = JSON.parse(atob(parts[1]));
                        userEmail = payload.email || payload.username || payload.sub || "";
                    }
                } catch (e) {
                    console.error("Failed to decode token", e);
                }
            }

            setEmail(userEmail || "merchant@gmail.com");
        };

        checkAuth();
        setDocsDropdownOpen(false);
        setIndustriesDropdownOpen(false);

        window.addEventListener("storage", checkAuth);
        return () => {
            window.removeEventListener("storage", checkAuth);
        };
    }, [pathname]);

    useEffect(() => {
        if (!dropdownOpen) return;
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".email-dropdown-container")) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [dropdownOpen]);

    const formatEmail = (emailStr: string) => {
        if (!emailStr) return "";
        const [username, domain] = emailStr.split("@");
        if (!domain) return emailStr;
        if (username.length <= 6) return emailStr;
        return `${username.slice(0, 3)}...${username.slice(-2)}@${domain}`;
    };

    useEffect(() => {
        if (!docsDropdownOpen) return;
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".docs-dropdown-container")) {
                setDocsDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [docsDropdownOpen]);

    useEffect(() => {
        if (!industriesDropdownOpen) return;
        const handleOutsideClick = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            if (!target.closest(".industries-dropdown-container")) {
                setIndustriesDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutsideClick);
        return () => document.removeEventListener("mousedown", handleOutsideClick);
    }, [industriesDropdownOpen]);

    return (
        <header className="sticky top-0 z-50 w-full">
            {/* Gradient accent line */}
            <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-70" />

            <div className="border-b border-border/40 bg-background/70 backdrop-blur-xl supports-[backdrop-filter]:bg-background/60">
                <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
                    <Link href="/" className="group flex items-center gap-2.5 shrink-0">
                        <Image
                            src="/Chainpay_logo-blue.png"
                            alt="ChainPay"
                            width={180}
                            height={50}
                            priority
                            className="w-32 sm:w-40 md:w-auto h-auto"
                        />
                    </Link>

                    <ul className="hidden items-center gap-1 lg:flex">
                        {links.map((l) => {
                            const isActive = pathname === l.to;
                            if (l.to === "/industries") {
                                const isActiveDropdown = pathname === "/industries" || pathname.startsWith("/industries/");
                                return (
                                    <li key={l.to} className="relative industries-dropdown-container">
                                        <button
                                            onClick={() => setIndustriesDropdownOpen(!industriesDropdownOpen)}
                                            className={cn(
                                                "group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground cursor-pointer select-none",
                                                isActiveDropdown
                                                    ? "text-primary font-semibold"
                                                    : "text-foreground/75"
                                            )}
                                        >
                                            <span className="absolute inset-0 -z-10 rounded-full bg-primary/0 transition-colors group-hover:bg-primary/10" />
                                            {l.label}
                                            <ChevronDown size={14} className={cn("opacity-70 transition-transform duration-200", industriesDropdownOpen && "rotate-180")} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className={cn(
                                            "absolute left-1/2 -translate-x-1/2 mt-1 w-64 rounded-2xl bg-white border border-slate-100 p-3 shadow-xl transition-all duration-200 z-50 text-left",
                                            industriesDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                                        )}>
                                            <div className="space-y-1">
                                                {dropdownIndustries.map((ind) => (
                                                    <Link
                                                        key={ind.name}
                                                        href={ind.path}
                                                        onClick={() => setIndustriesDropdownOpen(false)}
                                                        className={cn(
                                                            "block px-3 py-2 rounded-xl text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-slate-900 transition-colors",
                                                            pathname === ind.path ? "text-primary bg-slate-50/50" : ""
                                                        )}
                                                    >
                                                        {ind.name}
                                                    </Link>
                                                ))}
                                            </div>
                                        </div>
                                    </li>
                                );
                            }
                            if (l.to === "/developer-docs") {
                                const isActiveDropdown = pathname === "/integration-docs" || pathname === "/api-reference";
                                return (
                                    <li key={l.to} className="relative docs-dropdown-container">
                                        <button
                                            onClick={() => setDocsDropdownOpen(!docsDropdownOpen)}
                                            className={cn(
                                                "group relative inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-medium transition-colors hover:text-foreground cursor-pointer select-none",
                                                isActiveDropdown
                                                    ? "text-primary font-semibold"
                                                    : "text-foreground/75"
                                            )}
                                        >
                                            <span className="absolute inset-0 -z-10 rounded-full bg-primary/0 transition-colors group-hover:bg-primary/10" />
                                            {l.label}
                                            <ChevronDown size={14} className={cn("opacity-70 transition-transform duration-200", docsDropdownOpen && "rotate-180")} />
                                        </button>

                                        {/* Dropdown Menu */}
                                        <div className={cn(
                                            "absolute left-1/2 -translate-x-1/2 mt-1 w-56 rounded-2xl bg-white border border-slate-100 p-3 shadow-xl transition-all duration-200 z-50 text-left",
                                            docsDropdownOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-1"
                                        )}>
                                            <div className="space-y-1">
                                                <Link
                                                    href="/integration-docs"
                                                    onClick={() => setDocsDropdownOpen(false)}
                                                    className="block px-3 py-2 rounded-xl text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                                >
                                                    Integration Docs
                                                </Link>
                                                <Link
                                                    href="/api-reference"
                                                    onClick={() => setDocsDropdownOpen(false)}
                                                    className="block px-3 py-2 rounded-xl text-left text-sm font-semibold text-slate-800 hover:bg-slate-50 hover:text-slate-900 transition-colors"
                                                >
                                                    API Reference
                                                </Link>
                                            </div>
                                        </div>
                                    </li>
                                );
                            }
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

                    {/* <div className="flex items-center gap-2">
                        <Button
                            variant="ghost"
                            className="hidden sm:inline-flex text-sm font-semibold hover:bg-primary/5 hover:text-primary"
                            asChild
                        >
                            <Link href="/login">Log in</Link>
                        </Button>
                        <div className="relative hidden sm:block">
                            <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary via-fuchsia-500 to-primary opacity-70 blur-sm animate-gradient bg-[length:200%_auto]" />
                            <Button className="relative bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30" asChild>
                                <Link href="/signup">
                                    Get Started
                                    <ArrowRight className="ml-1.5 h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                                </Link>
                            </Button>
                        </div>
                        <button
                            onClick={() => setOpen((v) => !v)}
                            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border/60 bg-card text-foreground lg:hidden"
                            aria-label="Toggle menu"
                        >
                            <Menu className="h-5 w-5" />
                        </button>
                    </div> */}

                    <div className="flex items-center gap-2">

                        {isLoggedIn ? (
                            pathname === "/" ? (
                                <Button
                                    className="bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30 px-3 sm:px-4"
                                    asChild
                                >
                                    <Link href="/login/home">
                                        <Home className="sm:mr-2 h-4 w-4" />
                                        <span className="hidden sm:inline">Home</span>
                                    </Link>
                                </Button>
                            ) : (
                                <div className="relative email-dropdown-container">
                                    <button
                                        onClick={() => setDropdownOpen(!dropdownOpen)}
                                        className="flex items-center gap-1.5 sm:gap-2.5 p-1 sm:px-4 sm:py-2 rounded-full border border-slate-200 bg-white/60 backdrop-blur-md text-slate-700 font-semibold text-sm transition hover:bg-white/90 shadow-sm cursor-pointer select-none"
                                    >
                                        <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 border border-slate-200">
                                            <User size={16} className="text-slate-500 fill-slate-500" />
                                        </div>
                                        <span className="font-semibold text-slate-700 tracking-wide max-w-[200px] truncate hidden sm:inline">
                                            {email || "merchant@gmail.com"}
                                        </span>
                                        <ChevronDown size={16} className={cn("text-slate-500 transition-transform duration-200 hidden sm:inline", dropdownOpen && "rotate-180")} />
                                    </button>

                                    {dropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-64 bg-white rounded-3xl shadow-xl border border-slate-100 py-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                                            <Link
                                                href="/login/changeEmail"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-3.5 px-5 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 transition-colors first:rounded-t-3xl"
                                            >
                                                <UserCog size={18} className="text-slate-600" />
                                                Profile Setting
                                            </Link>
                                            <Link
                                                href="/login/AccountSetting"
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-3.5 px-5 py-3 text-[15px] font-medium text-slate-700 hover:bg-slate-50 transition-colors last:rounded-b-3xl"
                                            >
                                                <Mail size={18} className="text-slate-600" />
                                                Account Setting
                                            </Link>
                                        </div>
                                    )}
                                </div>
                            )
                        ) : (
                            <>
                                <Button
                                    variant="ghost"
                                    className="hidden sm:inline-flex text-sm font-semibold hover:bg-primary/5 hover:text-primary"
                                    asChild
                                >
                                    <Link href="/login">Log in</Link>
                                </Button>

                                <div className="relative hidden sm:block">
                                    <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-primary via-fuchsia-500 to-primary opacity-70 blur-sm animate-gradient bg-[length:200%_auto]" />
                                    <Button
                                        className="relative bg-primary hover:bg-primary/90 shadow-lg shadow-primary/30"
                                        asChild
                                    >
                                        <Link href="/signup">
                                            Get Started
                                            <ArrowRight className="ml-1.5 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>
                            </>
                        )}

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
                                if (l.to === "/industries") {
                                    const isActiveDropdown = pathname === "/industries" || pathname.startsWith("/industries/");
                                    return (
                                        <li key={l.to} className="flex flex-col">
                                            <button
                                                onClick={() => setMobileIndustriesOpen(!mobileIndustriesOpen)}
                                                className={cn(
                                                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary text-left cursor-pointer",
                                                    isActiveDropdown
                                                        ? "bg-primary/10 text-primary font-semibold"
                                                        : "text-foreground/80"
                                                )}
                                            >
                                                {l.label}
                                                <ChevronDown size={14} className={cn("transition-transform duration-200", mobileIndustriesOpen && "rotate-180")} />
                                            </button>
                                            {mobileIndustriesOpen && (
                                                <ul className="pl-4 mt-1 space-y-1">
                                                    {dropdownIndustries.map((ind) => (
                                                        <li key={ind.name}>
                                                            <Link
                                                                href={ind.path}
                                                                onClick={() => setOpen(false)}
                                                                className={cn(
                                                                    "block rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-primary/5 hover:text-primary",
                                                                    pathname === ind.path ? "text-primary font-semibold" : "text-foreground/70"
                                                                )}
                                                            >
                                                                {ind.name}
                                                            </Link>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </li>
                                    );
                                }
                                if (l.to === "/developer-docs") {
                                    const isActiveDropdown = pathname === "/integration-docs" || pathname === "/api-reference";
                                    return (
                                        <li key={l.to} className="flex flex-col">
                                            <button
                                                onClick={() => setMobileDocsOpen(!mobileDocsOpen)}
                                                className={cn(
                                                    "flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary text-left cursor-pointer",
                                                    isActiveDropdown
                                                        ? "bg-primary/10 text-primary font-semibold"
                                                        : "text-foreground/80"
                                                )}
                                            >
                                                {l.label}
                                                <ChevronDown size={14} className={cn("transition-transform duration-200", mobileDocsOpen && "rotate-180")} />
                                            </button>
                                            {mobileDocsOpen && (
                                                <ul className="pl-4 mt-1 space-y-1">
                                                    <li>
                                                        <Link
                                                            href="/integration-docs"
                                                            onClick={() => setOpen(false)}
                                                            className={cn(
                                                                "block rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-primary/5 hover:text-primary",
                                                                pathname === "/integration-docs" ? "text-primary font-semibold" : "text-foreground/70"
                                                            )}
                                                        >
                                                            Integration Docs
                                                        </Link>
                                                    </li>
                                                    <li>
                                                        <Link
                                                            href="/api-reference"
                                                            onClick={() => setOpen(false)}
                                                            className={cn(
                                                                "block rounded-lg px-3 py-2 text-xs font-medium transition-colors hover:bg-primary/5 hover:text-primary",
                                                                pathname === "/api-reference" ? "text-primary font-semibold" : "text-foreground/70"
                                                            )}
                                                        >
                                                            API Reference
                                                        </Link>
                                                    </li>
                                                </ul>
                                            )}
                                        </li>
                                    );
                                }
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
                            {isLoggedIn ? (
                                <>
                                    <li>
                                        <Link
                                            href="/login/home"
                                            onClick={() => setOpen(false)}
                                            className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary text-foreground/80"
                                        >
                                            Home
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/login/changeEmail"
                                            onClick={() => setOpen(false)}
                                            className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary text-foreground/80"
                                        >
                                            Profile Setting
                                        </Link>
                                    </li>
                                    <li>
                                        <Link
                                            href="/login/AccountSetting"
                                            onClick={() => setOpen(false)}
                                            className="block rounded-lg px-3 py-2.5 text-sm font-medium transition-colors hover:bg-primary/10 hover:text-primary text-foreground/80"
                                        >
                                            Account Setting
                                        </Link>
                                    </li>
                                </>
                            ) : (
                                <li className="mt-2 flex gap-2">
                                    <Button variant="outline" className="flex-1" asChild>
                                        <Link href="/login" onClick={() => setOpen(false)}>Log in</Link>
                                    </Button>
                                    <Button className="flex-1 bg-primary" asChild>
                                        <Link href="/signup" onClick={() => setOpen(false)}>Get Started</Link>
                                    </Button>
                                </li>
                            )}
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}
