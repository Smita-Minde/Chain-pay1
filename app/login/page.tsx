"use client";

import { motion } from "framer-motion";
import { Mail, Lock, Eye } from "lucide-react";

export default function LoginPage() {
    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-[120px] animate-pulse" />

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] animate-pulse" />

            {/* Floating Crypto Balls */}
            <motion.div
                animate={{ y: [-20, 20, -20] }}
                transition={{ repeat: Infinity, duration: 8 }}
                className="absolute top-24 left-20 w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-700 shadow-2xl"
            />

            <motion.div
                animate={{ y: [20, -20, 20] }}
                transition={{ repeat: Infinity, duration: 10 }}
                className="absolute bottom-32 left-10 w-40 h-40 rounded-full bg-gradient-to-br from-blue-500 to-indigo-700 shadow-2xl"
            />

            <motion.div
                animate={{ y: [-15, 15, -15] }}
                transition={{ repeat: Infinity, duration: 7 }}
                className="absolute top-1/3 right-10 w-36 h-36 rounded-full bg-gradient-to-br from-sky-400 to-blue-700 shadow-2xl"
            />

            {/* Login Card */}
            <motion.div
                initial={{ opacity: 0, y: 70 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="relative z-10 w-full max-w-md rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(37,99,235,0.25)]"
            >
                {/* Logo */}
                <div className="text-center mb-8">
                    <h1 className="text-4xl font-bold text-slate-900">
                        Chain<span className="text-blue-600">Pay</span>
                    </h1>

                    <p className="text-slate-600 mt-2">
                        Fast, Secure & Borderless
                    </p>
                </div>

                <h2 className="text-center text-3xl font-bold text-slate-900 mb-2">
                    Welcome Back
                </h2>

                <p className="text-center text-slate-500 mb-8">
                    Sign in to your account
                </p>

                {/* Email */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                    </label>

                    <div className="relative">
                        <Mail
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="email"
                            placeholder="Enter email"
                            className="w-full rounded-xl border border-slate-200 bg-white/70 py-3 pl-11 pr-4 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />
                    </div>
                </div>

                {/* Password */}
                <div className="mb-5">
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                        Password
                    </label>

                    <div className="relative">
                        <Lock
                            size={18}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                        />

                        <input
                            type="password"
                            placeholder="Enter password"
                            className="w-full rounded-xl border border-slate-200 bg-white/70 py-3 pl-11 pr-11 outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
                        />

                        <Eye
                            size={18}
                            className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 cursor-pointer"
                        />
                    </div>
                </div>

                {/* Remember */}
                <div className="flex items-center justify-between mb-6">
                    <label className="flex items-center gap-2 text-sm text-slate-600">
                        <input type="checkbox" />
                        Remember Me
                    </label>

                    <button className="text-blue-600 text-sm hover:underline">
                        Forgot Password?
                    </button>
                </div>

                {/* Login Button */}
                <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full rounded-xl bg-gradient-to-r from-blue-600 to-blue-500 py-3 font-semibold text-white shadow-lg"
                >
                    Sign In
                </motion.button>

                {/* Divider */}
                <div className="my-6 flex items-center">
                    <div className="h-px flex-1 bg-slate-300" />
                    <span className="px-3 text-slate-500 text-sm">OR</span>
                    <div className="h-px flex-1 bg-slate-300" />
                </div>

                {/* Google Login */}
                <button className="w-full rounded-xl border border-slate-200 bg-white py-3 font-medium hover:bg-slate-50 transition">
                    Continue with Google
                </button>

                <p className="mt-6 text-center text-sm text-slate-600">
                    Don't have an account?{" "}
                    <span className="font-semibold text-blue-600 cursor-pointer">
                        Sign Up
                    </span>
                </p>
            </motion.div>

            <div className="flex min-h-screen items-center justify-center">
                <h1 className="text-3xl font-bold">Login Page</h1>
            </div>
        </div>
    );
}

// export default function LoginPage() {
//     return (
//         <div className="flex min-h-screen items-center justify-center">
//             <h1 className="text-3xl font-bold">Login Page</h1>
//         </div>
//     );
// }