"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";

export default function SignupPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Error states
    const [emailError, setEmailError] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [confirmPasswordError, setConfirmPasswordError] = useState("");
    const [submitAttempted, setSubmitAttempted] = useState(false);

    const router = useRouter();

    const handleEmailChange = (val: string) => {
        setEmail(val);
        if (submitAttempted) {
            if (!val.trim()) {
                setEmailError("Email is required");
            } else if (!val.toLowerCase().endsWith("@gmail.com") && !val.toLowerCase().endsWith("@gamil.com")) {
                setEmailError("Email must end with @gmail.com");
            } else {
                setEmailError("");
            }
        }
    };

    const handlePasswordChange = (val: string) => {
        setPassword(val);
        if (submitAttempted) {
            if (!val) {
                setPasswordError("Password is required");
            } else if (val.length < 8 || val.length > 12) {
                setPasswordError("Password must be between 8 and 12 characters");
            } else {
                setPasswordError("");
            }

            if (confirmPassword && val !== confirmPassword) {
                setConfirmPasswordError("Passwords do not match");
            } else if (confirmPassword) {
                setConfirmPasswordError("");
            }
        }
    };

    const handleConfirmPasswordChange = (val: string) => {
        setConfirmPassword(val);
        if (submitAttempted) {
            if (!val) {
                setConfirmPasswordError("Confirm password is required");
            } else if (password !== val) {
                setConfirmPasswordError("Passwords do not match");
            } else {
                setConfirmPasswordError("");
            }
        }
    };

    const handleCreateAccount = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitAttempted(true);

        let hasError = false;

        if (!email.trim()) {
            setEmailError("Email is required");
            hasError = true;
        } else if (!email.toLowerCase().endsWith("@gmail.com") && !email.toLowerCase().endsWith("@gamil.com")) {
            setEmailError("Email must end with @gmail.com");
            hasError = true;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required");
            hasError = true;
        } else if (password.length < 8 || password.length > 12) {
            setPasswordError("Password must be between 8 and 12 characters");
            hasError = true;
        } else {
            setPasswordError("");
        }

        if (!confirmPassword) {
            setConfirmPasswordError("Confirm password is required");
            hasError = true;
        } else if (password !== confirmPassword) {
            setConfirmPasswordError("Passwords do not match");
            hasError = true;
        } else {
            setConfirmPasswordError("");
        }

        if (hasError) return;

        // Save registered user info to localStorage
        localStorage.setItem("registered_user", JSON.stringify({ email, password }));

        toast.success("Account created successfully!", {
            description: "Welcome to ChainPay. Please log in.",
        });
        router.push("/login");
    };

    return (
        <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-[#f8fbff] via-[#eef4ff] to-[#dbeafe] flex items-center justify-center py-12 px-4">

            {/* Background Blur */}
            <div className="absolute top-0 left-0 h-[500px] w-[500px] rounded-full bg-blue-400/20 blur-[120px]" />
            <div className="absolute bottom-0 right-0 h-[500px] w-[500px] rounded-full bg-indigo-400/20 blur-[120px]" />

            <div className="relative z-10 mx-auto flex w-full max-w-md items-center justify-center">

                {/* RIGHT SECTION */}
                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full flex justify-center"
                >
                    <div className="w-full max-w-md rounded-[32px] border border-white/40 bg-white/80 backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(59,130,246,0.15)]">

                        <div className="mb-8 text-center">
                            <h2 className="text-4xl font-bold text-slate-900">
                                Create Account
                            </h2>

                            <p className="mt-2 text-slate-500">
                                Start accepting crypto payments today
                            </p>
                        </div>

                        <form onSubmit={handleCreateAccount} className="space-y-4">
                            {/* Email */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Email Address
                                </label>

                                <div className="relative">
                                    <Mail
                                        size={18}
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200
                                            ${emailError ? "text-rose-500" : "text-slate-400"}`}
                                    />

                                    <input
                                        type="email"
                                        placeholder="name@example.com"
                                        value={email}
                                        onChange={(e) => handleEmailChange(e.target.value)}
                                        className={`w-full rounded-xl border py-3 pl-11 pr-4 outline-none transition duration-200
                                            ${emailError
                                                ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            }`}
                                    />
                                </div>
                                {emailError && (
                                    <p className="mt-1.5 text-xs text-rose-500 font-medium">
                                        {emailError}
                                    </p>
                                )}
                            </div>

                            {/* Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Password
                                </label>

                                <div className="relative">
                                    <Lock
                                        size={18}
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200
                                            ${passwordError ? "text-rose-500" : "text-slate-400"}`}
                                    />

                                    <input
                                        type={showPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => handlePasswordChange(e.target.value)}
                                        className={`w-full rounded-xl border py-3 pl-11 pr-11 outline-none transition duration-200
                                            ${passwordError
                                                ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
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
                                {passwordError && (
                                    <p className="mt-1.5 text-xs text-rose-500 font-medium">
                                        {passwordError}
                                    </p>
                                )}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-slate-700">
                                    Confirm Password
                                </label>

                                <div className="relative">
                                    <Lock
                                        size={18}
                                        className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors duration-200
                                            ${confirmPasswordError ? "text-rose-500" : "text-slate-400"}`}
                                    />

                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="••••••••"
                                        value={confirmPassword}
                                        onChange={(e) => handleConfirmPasswordChange(e.target.value)}
                                        className={`w-full rounded-xl border py-3 pl-11 pr-11 outline-none transition duration-200
                                            ${confirmPasswordError
                                                ? "border-rose-300 focus:border-rose-500 focus:ring-2 focus:ring-rose-100"
                                                : "border-slate-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                                            }`}
                                    />

                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none bg-transparent border-none"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                {confirmPasswordError && (
                                    <p className="mt-1.5 text-xs text-rose-500 font-medium">
                                        {confirmPasswordError}
                                    </p>
                                )}
                            </div>

                            {/* Terms */}
                            <label className="flex items-start gap-3 text-sm text-slate-600 select-none pt-2">
                                <input type="checkbox" className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500" required />
                                <span className="leading-tight">I agree to the Terms & Conditions and Privacy Policy.</span>
                            </label>

                            {/* Submit */}
                            <button
                                type="submit"
                                className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 py-3 font-semibold text-white transition hover:bg-blue-700 cursor-pointer shadow-lg shadow-blue-500/10"
                            >
                                Create Account
                                <ArrowRight size={18} />
                            </button>
                        </form>

                        {/* Divider */}
                        <div className="my-6 flex items-center">
                            <div className="h-px flex-1 bg-slate-200" />
                            <span className="px-4 text-sm text-slate-400">OR</span>
                            <div className="h-px flex-1 bg-slate-200" />
                        </div>

                        <p className="mt-6 text-center text-sm text-slate-500">
                            Already have an account?{" "}
                            <Link href="/login" className="font-semibold text-blue-600 hover:underline">
                                Sign In
                            </Link>
                        </p>

                    </div>
                </motion.div>
            </div>
        </div>
    );
}