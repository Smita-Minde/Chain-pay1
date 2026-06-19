"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const router = useRouter();

    const isEmailValid = email.toLowerCase().endsWith("@gmail.com") || email.toLowerCase().endsWith("@gamil.com");
    const isPasswordValid = password.length >= 8 && password.length <= 12;

    const handleLoginSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!isEmailValid || !isPasswordValid) return;

        // Check stored user from localStorage
        const storedUser = localStorage.getItem("registered_user");
        if (storedUser) {
            const { email: savedEmail, password: savedPassword } = JSON.parse(storedUser);
            if (email.toLowerCase() !== savedEmail.toLowerCase()) {
                toast.error("User not found", {
                    description: "This email is not registered. Please sign up.",
                });
                return;
            }
            if (password !== savedPassword) {
                setPasswordError("✗ Password does not match the password entered during signup");
                toast.error("Incorrect password", {
                    description: "Please check your password and try again.",
                });
                return;
            }
        } else {
            toast.error("User not found", {
                description: "No registered user found. Please sign up first.",
            });
            return;
        }

        setPasswordError("");
        toast.success("Successfully logged in!", {
            description: `Welcome back, ${email}`,
        });
        router.push("/");
    };

    return (
        <div className="relative w-full min-h-[calc(100vh-80px)] py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-[120px] animate-pulse" />

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] animate-pulse" />

            {/* Floating Crypto Balls */}
            {/* Floating Crypto Balls */}
            {/* 1. MST 3D - Top Left (Large - Foreground) */}
            <div className="absolute top-16 left-8 md:left-24 w-44 h-52 flex flex-col items-center justify-between z-0 pointer-events-none">
                <motion.div
                    animate={{ y: [-18, 18, -18], rotate: [-6, 6, -6] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="w-44 h-44 drop-shadow-[0_20px_30px_rgba(0,0,0,0.15)]"
                >
                    <Image
                        src="/3Dlogoballs/Mstc3d.png"
                        alt="MST 3D"
                        width={176}
                        height={176}
                        priority
                        className="w-full h-full object-contain"
                    />
                </motion.div>
                <motion.div
                    animate={{ scale: [0.7, 1.25, 0.7], opacity: [0.15, 0.5, 0.15] }}
                    transition={{ repeat: Infinity, duration: 8, ease: "easeInOut" }}
                    className="w-28 h-2.5 bg-slate-900/20 blur-md rounded-full mt-2"
                />
            </div>

            {/* 2. Tron 3D - Bottom Left (Large - Midground) */}
            <div className="absolute bottom-16 left-12 md:left-28 w-40 h-48 flex flex-col items-center justify-between z-0 pointer-events-none">
                <motion.div
                    animate={{ y: [15, -15, 15], rotate: [5, -5, 5] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                    className="w-60 h-60 drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)]"
                >
                    <Image
                        src="/3Dlogoballs/tron3d.png"
                        alt="Tron 3D"
                        width={160}
                        height={160}
                        priority
                        className="w-full h-full object-contain"
                    />
                </motion.div>
                <motion.div
                    animate={{ scale: [1.2, 0.75, 1.2], opacity: [0.45, 0.15, 0.45] }}
                    transition={{ repeat: Infinity, duration: 10, ease: "easeInOut" }}
                    className="w-24 h-2 bg-slate-900/20 blur-md rounded-full mt-2"
                />
            </div>

            {/* 3. BNB 3D - Top Right (Large - Midground) */}
            <div className="absolute top-28 right-8 md:right-24 w-40 h-48 flex flex-col items-center justify-between z-0 pointer-events-none">
                <motion.div
                    animate={{ y: [-15, 15, -15], rotate: [-5, 5, -5] }}
                    transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                    className="w-60 h-60 drop-shadow-[0_15px_25px_rgba(0,0,0,0.12)]"
                >
                    <Image
                        src="/3Dlogoballs/bnb3d.png"
                        alt="BNB 3D"
                        width={144}
                        height={144}
                        priority
                        className="w-full h-full object-contain"
                    />
                </motion.div>
                <motion.div
                    animate={{ scale: [0.75, 1.2, 0.75], opacity: [0.15, 0.4, 0.15] }}
                    transition={{ repeat: Infinity, duration: 9, ease: "easeInOut" }}
                    className="w-22 h-2 bg-slate-900/20 blur-md rounded-full mt-2"
                />
            </div>

            {/* 4. MST 3D - Bottom Right (Medium - Background) */}
            <div className="absolute bottom-24 right-16 md:right-32 w-28 h-36 flex flex-col items-center justify-between z-0 pointer-events-none">
                <motion.div
                    animate={{ y: [12, -12, 12], rotate: [8, -8, 8] }}
                    transition={{ repeat: Infinity, duration: 7.5, delay: -2.5, ease: "easeInOut" }}
                    className="w-30 h-30 drop-shadow-[0_10px_20px_rgba(0,0,0,0.1)]"
                >
                    <Image
                        src="/3Dlogoballs/Mstc3d.png"
                        alt="MST 3D"
                        width={112}
                        height={112}
                        priority
                        className="w-full h-full object-contain"
                    />
                </motion.div>
                <motion.div
                    animate={{ scale: [1.15, 0.8, 1.15], opacity: [0.4, 0.15, 0.4] }}
                    transition={{ repeat: Infinity, duration: 7.5, delay: -2.5, ease: "easeInOut" }}
                    className="w-18 h-1.5 bg-slate-900/20 blur-md rounded-full mt-1.5"
                />
            </div>

            {/* 5. MST 3D - Top Center/Left (Small - Deep Background Blur) */}
            <div className="absolute top-12 left-1/3 w-16 h-22 flex flex-col items-center justify-between z-0 pointer-events-none blur-[1px]">
                <motion.div
                    animate={{ y: [-8, 8, -8], rotate: [-4, 4, -4] }}
                    transition={{ repeat: Infinity, duration: 12, delay: -4, ease: "easeInOut" }}
                    className="w-18 h-18 drop-shadow-[0_8px_15px_rgba(0,0,0,0.08)]"
                >
                    <Image
                        src="/3Dlogoballs/bnb3d.png"
                        alt="MST 3D"
                        width={64}
                        height={64}
                        priority
                        className="w-full h-full object-contain"
                    />
                </motion.div>
                <motion.div
                    animate={{ scale: [0.8, 1.2, 0.8], opacity: [0.1, 0.25, 0.1] }}
                    transition={{ repeat: Infinity, duration: 12, delay: -4, ease: "easeInOut" }}
                    className="w-10 h-1 bg-slate-900/15 blur-sm rounded-full mt-1"
                />
            </div>

            {/* 6. Tron 3D - Center Right (Small - Deep Background Blur) */}
            <div className="absolute top-1/2 right-[33%] w-20 h-26 flex flex-col items-center justify-between z-0 pointer-events-none blur-[0.5px]">
                <motion.div
                    animate={{ y: [10, -10, 10], rotate: [6, -6, 6] }}
                    transition={{ repeat: Infinity, duration: 11, delay: -1.5, ease: "easeInOut" }}
                    className="w-20 h-20 drop-shadow-[0_8px_15px_rgba(0,0,0,0.08)]"
                >
                    <Image
                        src="/3Dlogoballs/tron3d.png"
                        alt="Tron 3D"
                        width={80}
                        height={80}
                        priority
                        className="w-full h-full object-contain"
                    />
                </motion.div>
                <motion.div
                    animate={{ scale: [1.2, 0.8, 1.2], opacity: [0.3, 0.1, 0.3] }}
                    transition={{ repeat: Infinity, duration: 11, delay: -1.5, ease: "easeInOut" }}
                    className="w-12 h-1 bg-slate-900/15 blur-sm rounded-full mt-1"
                />
            </div>

            {/* 7. BNB 3D - Bottom Left (Small - Background) */}
            <div className="absolute bottom-1/3 left-1/4 w-24 h-30 flex flex-col items-center justify-between z-0 pointer-events-none">
                <motion.div
                    animate={{ y: [-12, 12, -12], rotate: [-8, 8, -8] }}
                    transition={{ repeat: Infinity, duration: 8.5, delay: -5, ease: "easeInOut" }}
                    className="w-24 h-24 drop-shadow-[0_8px_15px_rgba(0,0,0,0.08)]"
                >
                    <Image
                        src="/3Dlogoballs/bnb3d.png"
                        alt="BNB 3D"
                        width={96}
                        height={96}
                        priority
                        className="w-full h-full object-contain"
                    />
                </motion.div>
                <motion.div
                    animate={{ scale: [0.75, 1.2, 0.75], opacity: [0.15, 0.35, 0.15] }}
                    transition={{ repeat: Infinity, duration: 8.5, delay: -5, ease: "easeInOut" }}
                    className="w-16 h-1 bg-slate-900/20 blur-sm rounded-full mt-1"
                />
            </div>

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 w-full max-w-md rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(37,99,235,0.25)]"
            >
                {/* Logo */}

                <h2 className="text-center text-3xl font-bold text-slate-900 mb-2">
                    Welcome Back
                </h2>

                <p className="text-center text-slate-500 mb-8">
                    Sign in to your account
                </p>

                <form onSubmit={handleLoginSubmit}>
                    {/* Email */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Email Address
                        </label>

                        <div className="relative group">
                            <Mail
                                size={18}
                                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200
                                    ${email === ""
                                        ? "text-slate-400 group-focus-within:text-blue-500"
                                        : isEmailValid
                                            ? "text-green-500 group-focus-within:text-green-600"
                                            : "text-rose-400 group-focus-within:text-rose-500"
                                    }`}
                            />

                            <input
                                type="email"
                                placeholder="Enter email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={`w-full rounded-xl border bg-white/70 py-3 pl-11 pr-4 outline-none transition duration-200
                                    ${email === ""
                                        ? "border-blue-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        : isEmailValid
                                            ? "border-green-300 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 text-slate-800"
                                            : "border-rose-300 hover:border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-slate-800"
                                    }`}
                            />
                        </div>
                        <p className={`mt-2 text-xs transition-colors duration-200 ${email === ""
                            ? "text-slate-500"
                            : isEmailValid
                                ? "text-green-600"
                                : "text-rose-500 font-medium"
                            }`}>
                            {email === ""
                                ? "Suggestion: Use a Gmail address (e.g. user@gmail.com)"
                                : isEmailValid
                                    ? "✓ Valid Gmail address"
                                    : "✗ Email must end with @gmail.com"
                            }
                        </p>
                    </div>

                    {/* Password */}
                    <div className="mb-5">
                        <label className="block text-sm font-medium text-slate-700 mb-2">
                            Password
                        </label>

                        <div className="relative group">
                            <Lock
                                size={18}
                                className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200
                                    ${password === ""
                                        ? "text-slate-400 group-focus-within:text-blue-500"
                                        : isPasswordValid
                                            ? "text-green-500 group-focus-within:text-green-600"
                                            : "text-rose-400 group-focus-within:text-rose-500"
                                    }`}
                            />

                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setPasswordError("");
                                }}
                                className={`w-full rounded-xl border bg-white/70 py-3 pl-11 pr-11 outline-none transition duration-200
                                    ${password === ""
                                        ? "border-blue-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                        : isPasswordValid
                                            ? "border-green-300 hover:border-green-400 focus:border-green-500 focus:ring-2 focus:ring-green-100 text-slate-800"
                                            : "border-rose-300 hover:border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-100 text-slate-800"
                                    }`}
                            />

                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none bg-transparent border-none"
                            >
                                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                            </button>
                        </div>
                        <p className={`mt-2 text-xs transition-colors duration-200 ${passwordError
                            ? "text-rose-500 font-medium"
                            : password === ""
                                ? "text-slate-500"
                                : isPasswordValid
                                    ? "text-green-600"
                                    : "text-rose-500 font-medium"
                            }`}>
                            {passwordError || (
                                password === ""
                                    ? "Suggestion: Choose a password with 8 to 12 characters"
                                    : isPasswordValid
                                        ? `✓ Valid password length (${password.length} characters)`
                                        : password.length < 8
                                            ? `✗ Too short (currently ${password.length} characters, need at least 8)`
                                            : `✗ Too long (currently ${password.length} characters, need at most 12)`
                            )}
                        </p>
                    </div>

                    {/* Remember */}
                    <div className="mb-6">
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    required
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                />
                                Remember Me
                            </label>

                            <button type="button" className="text-blue-600 text-sm hover:underline">
                                Forgot Password?
                            </button>
                        </div>
                    </div>

                    {/* Login Button */}
                    <motion.button
                        type="submit"
                        whileHover={{ scale: (isEmailValid && isPasswordValid) ? 1.03 : 1 }}
                        whileTap={{ scale: (isEmailValid && isPasswordValid) ? 0.98 : 1 }}
                        disabled={!(isEmailValid && isPasswordValid)}
                        className={`w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-all ${(isEmailValid && isPasswordValid)
                            ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 cursor-pointer shadow-blue-500/25"
                            : "bg-slate-300 cursor-not-allowed shadow-none"
                            }`}
                    >
                        Sign In
                    </motion.button>
                </form>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="h-px flex-1 bg-slate-300" />
                    <span className="px-3 text-slate-500 text-sm">OR</span>
                    <div className="h-px flex-1 bg-slate-300" />
                </div>

                {/* Google Login */}
                {/* <button className="w-full rounded-xl border border-slate-200 bg-white py-3 font-medium hover:bg-slate-50 transition">
                    Continue with Google
                </button> */}

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                        Sign Up
                    </Link>
                </p>
            </motion.div>
        </div>
    );
}