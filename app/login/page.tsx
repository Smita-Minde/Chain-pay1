"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@hooks";
import OtpInputModal from "@components/Modals/OtpInputModal";

export default function LoginPage() {
    const [view, setView] = useState<'login' | 'forgot-password' | 'reset-password'>('login');
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);

    // OTP states for login flow
    const [openOtpVerification, setOpenOtpVerification] = useState(false);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [otpTimerData, setOtpTimerData] = useState<any>({});
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [canResend, setCanResend] = useState<boolean>(false);

    // Forgot password states
    const [forgotEmail, setForgotEmail] = useState("");
    const [resetCode, setResetCode] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setConfirmNewPassword] = useState("");
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const [resendTimer, setResendTimer] = useState<string | null>(null);
    const [verificationResponse, setVerificationResponse] = useState<any>(null);

    const { login, authOtp, sendForgotPassword, resetPassword: apiResetPassword } = useAuth();
    const router = useRouter();

    const isEmailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const isPasswordValid = password.length >= 8;

    const handleLoginSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email) {
            toast.error("Please enter your email address.");
            return;
        }
        if (!isEmailValid) {
            toast.error("Please enter a valid email address.");
            return;
        }
        if (!password) {
            toast.error("Please enter your password.");
            return;
        }
        if (!isPasswordValid) {
            toast.error("Password must be at least 8 characters long.");
            return;
        }

        let toastId: any = null;
        try {
            toastId = toast.loading("Sending OTP...");
            const payload = {
                email,
                password,
                type: 'auth'
            };
            const response = await authOtp(payload);
            if (toastId) toast.dismiss(toastId);
            if (response) {
                let timerData = response;
                if (response.email && typeof response.email === 'object') {
                    timerData = {
                        ...response.email,
                        email: email
                    };
                } else if (response.email) {
                    timerData = { email: response.email, ...response };
                }
                setOtpTimerData(timerData);
                setOpenOtpVerification(true);
                toast.success("OTP sent to your email!");
            }
        } catch (error) {
            if (toastId) toast.dismiss(toastId);
            console.error("Error requesting OTP:", error);
            toast.error("Failed to send OTP code. Please try again.");
        }
    };

    const handleOtpSubmit = async () => {
        let toastId: any = null;
        try {
            toastId = toast.loading("Logging in...");
            const payload = {
                email,
                password,
                verificationCode: otp.join(''),
            };
            const error = await login(payload, '/login/home');
            if (toastId) toast.dismiss(toastId);
            if (error) {
                toast.error(typeof error === 'string' ? error : (error.message || "Invalid OTP code"));
            } else {
                toast.success("Logged in successfully!");
                router.push("/login/home");
            }
        } catch (error) {
            if (toastId) toast.dismiss(toastId);
            console.error("Error logging in:", error);
            toast.error("An error occurred during login.");
        }
    };

    const handleSendVerificationCode = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!forgotEmail) {
            toast.error("Please enter your email address.");
            return;
        }
        let toastId: any = null;
        try {
            toastId = toast.loading("Sending code...");
            const [res, sendError] = await sendForgotPassword({ email: forgotEmail });
            if (toastId) toast.dismiss(toastId);
            if (sendError) {
                toast.error(typeof sendError === 'string' ? sendError : (sendError.message || "Failed to send reset code"));
            } else if (res) {
                setVerificationResponse(res);
                setView('reset-password');
                toast.success("Verification code sent successfully!");
            }
        } catch (error) {
            if (toastId) toast.dismiss(toastId);
            console.error("Error sending code:", error);
        }
    };

    const handleResetPassword = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!forgotEmail) {
            toast.error("Please enter your email address.");
            return;
        }
        if (!resetCode) {
            toast.error("Please enter the verification code.");
            return;
        }
        if (!newPassword) {
            toast.error("Please enter your new password.");
            return;
        }
        if (newPassword.length < 8) {
            toast.error("Password must be at least 8 characters.");
            return;
        }
        if (newPassword !== confirmNewPassword) {
            toast.error("Passwords do not match.");
            return;
        }
        let toastId: any = null;
        try {
            toastId = toast.loading("Resetting password...");
            const [response, error] = await apiResetPassword({
                email: forgotEmail,
                code: resetCode,
                newPassword,
                confirmPassword: confirmNewPassword,
            });
            if (toastId) toast.dismiss(toastId);
            if (error) {
                toast.error(typeof error === 'string' ? error : (error.message || "Failed to reset password"));
            } else if (response) {
                toast.success("Password reset successfully! Please login with your new password.");
                setView('login');
                // Clear fields
                setPassword("");
                setForgotEmail("");
                setResetCode("");
                setNewPassword("");
                setConfirmNewPassword("");
            }
        } catch (error) {
            if (toastId) toast.dismiss(toastId);
            console.error("Error resetting password:", error);
        }
    };

    // OTP Countdown Timer for Login
    useEffect(() => {
        if (otpTimerData && Object.keys(otpTimerData).length > 0) {
            const timerInterval = setInterval(() => {
                if (otpTimerData && otpTimerData.sentAt && otpTimerData.timeout) {
                    const currentTime = new Date().getTime();
                    const sentTime = new Date(otpTimerData.sentAt).getTime();
                    const elapsedTime = currentTime - sentTime;
                    const remainingTime = otpTimerData.timeout - elapsedTime;

                    if (remainingTime <= 0) {
                        setCanResend(true);
                        setTimeLeft(0);
                    } else {
                        setCanResend(false);
                        setTimeLeft(remainingTime);
                    }
                }
            }, 1000);
            return () => clearInterval(timerInterval);
        }
    }, [otpTimerData]);

    // Resend Timer for Forgot Password Flow
    useEffect(() => {
        let resendCodeInterval: any;
        if (view === 'reset-password' && verificationResponse) {
            resendCodeInterval = setInterval(() => {
                const timestamp = new Date(verificationResponse.sentAt).getTime() + verificationResponse.timeout;
                const currentTime = new Date().getTime();
                const totalSeconds = Math.max(0, Math.floor((timestamp - currentTime) / 1000));
                if (totalSeconds > 0) {
                    const minutes = Math.floor(totalSeconds / 60);
                    const seconds = totalSeconds % 60;
                    setResendTimer(
                        `${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds
                        }`,
                    );
                } else {
                    setResendTimer(null);
                }
            }, 1000);
        } else {
            setResendTimer(null);
        }
        return () => {
            if (resendCodeInterval) clearInterval(resendCodeInterval);
        };
    }, [view, verificationResponse]);

    return (
        <div className="relative w-full min-h-[calc(100vh-80px)] py-12 md:py-20 overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-100 flex items-center justify-center px-4">

            {/* Background Blobs */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-blue-400/30 rounded-full blur-[120px] animate-pulse" />

            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/30 rounded-full blur-[120px] animate-pulse" />

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
                        unoptimized
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
                        unoptimized
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

            {/* Card Content based on view state */}
            {view === 'login' && (
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 w-full max-w-md rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(37,99,235,0.25)]"
                >
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
                                    ? "Suggestion: Enter your registered email address"
                                    : isEmailValid
                                        ? "✓ Valid email format"
                                        : "✗ Please enter a valid email address"
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
                                        ? "Suggestion: Choose a password with at least 8 characters"
                                        : isPasswordValid
                                            ? `✓ Valid password length (${password.length} characters)`
                                            : `✗ Too short (currently ${password.length} characters, need at least 8)`
                                )}
                            </p>
                        </div>

                        {/* Remember */}
                        <div className="mb-6">
                            <div className="flex items-center justify-between">
                                <label className="flex items-center gap-2 text-sm text-slate-600 cursor-pointer select-none">
                                    <input
                                        type="checkbox"
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        className="h-4 w-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
                                    />
                                    Remember Me
                                </label>

                                <button
                                    type="button"
                                    onClick={() => setView('forgot-password')}
                                    className="text-blue-600 text-sm hover:underline bg-transparent border-none cursor-pointer"
                                >
                                    Forgot Password?
                                </button>
                            </div>
                        </div>

                        {/* Login Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: (isEmailValid && isPasswordValid) ? 1.03 : 1 }}
                            whileTap={{ scale: (isEmailValid && isPasswordValid) ? 0.98 : 1 }}
                            className={`w-full rounded-xl py-3 font-semibold text-white shadow-lg transition-all ${(isEmailValid && isPasswordValid)
                                ? "bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 cursor-pointer shadow-blue-500/25"
                                : "bg-slate-300 cursor-pointer shadow-none"
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

                    <p className="mt-6 text-center text-sm text-slate-600">
                        Don't have an account?{" "}
                        <Link href="/signup" className="font-semibold text-blue-600 hover:underline">
                            Sign Up
                        </Link>
                    </p>
                </motion.div>
            )}

            {view === 'forgot-password' && (
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 w-full max-w-md rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(37,99,235,0.25)]"
                >
                    <h2 className="text-center text-3xl font-bold text-slate-900 mb-2">
                        Forgot Password
                    </h2>

                    <p className="text-center text-slate-500 mb-8">
                        Enter your email to receive a password reset code
                    </p>

                    <form onSubmit={handleSendVerificationCode}>
                        {/* Email */}
                        <div className="mb-6">
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Email Address
                            </label>

                            <div className="relative group">
                                <Mail
                                    size={18}
                                    className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500"
                                />

                                <input
                                    type="email"
                                    placeholder="Enter email"
                                    value={forgotEmail}
                                    onChange={(e) => setForgotEmail(e.target.value)}
                                    className="w-full rounded-xl border border-blue-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white/70 py-3 pl-11 pr-4 outline-none text-slate-800 transition duration-200"
                                    required
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-xl py-3 font-semibold text-white shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 cursor-pointer shadow-blue-500/25"
                        >
                            Send Reset Code
                        </motion.button>
                    </form>

                    <button
                        onClick={() => setView('login')}
                        className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Back to Login
                    </button>
                </motion.div>
            )}

            {view === 'reset-password' && (
                <motion.div
                    initial={{ opacity: 0, y: 70 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    className="relative z-10 w-full max-w-md rounded-3xl border border-white/30 bg-white/10 backdrop-blur-xl p-8 shadow-[0_20px_80px_rgba(37,99,235,0.25)]"
                >
                    <h2 className="text-center text-3xl font-bold text-slate-900 mb-2">
                        Set New Password
                    </h2>

                    <p className="text-center text-slate-500 mb-6">
                        Enter the 6-digit code and your new password
                    </p>

                    <form onSubmit={handleResetPassword} className="space-y-4">
                        {/* Reset Code */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Verification Code (6 digits)
                            </label>
                            <input
                                type="text"
                                placeholder="Enter 6-digit code"
                                value={resetCode}
                                onChange={(e) => setResetCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                                className="w-full rounded-xl border border-blue-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white/70 py-3 px-4 outline-none text-slate-800 text-center font-mono text-lg tracking-widest transition duration-200"
                                required
                            />
                        </div>

                        {/* New Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                New Password
                            </label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" />
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    placeholder="Enter new password"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                    className="w-full rounded-xl border border-blue-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white/70 py-3 pl-11 pr-11 outline-none text-slate-800 transition duration-200"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none bg-transparent border-none"
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-700 mb-2">
                                Confirm New Password
                            </label>
                            <div className="relative group">
                                <Lock size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500" />
                                <input
                                    type={showConfirmNewPassword ? "text" : "password"}
                                    placeholder="Confirm new password"
                                    value={confirmNewPassword}
                                    onChange={(e) => setConfirmNewPassword(e.target.value)}
                                    className="w-full rounded-xl border border-blue-200 hover:border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 bg-white/70 py-3 pl-11 pr-11 outline-none text-slate-800 transition duration-200"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmNewPassword(!showConfirmNewPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none bg-transparent border-none"
                                >
                                    {showConfirmNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>

                        {/* Resend Code Info */}
                        <div className="text-center text-sm text-slate-600">
                            Didn't receive a code?{" "}
                            <button
                                disabled={!!resendTimer}
                                onClick={handleSendVerificationCode}
                                type="button"
                                className="font-semibold text-blue-600 hover:underline disabled:text-slate-400 disabled:no-underline bg-transparent border-none cursor-pointer"
                            >
                                {resendTimer ? `Resend in ${resendTimer}` : "Resend Code"}
                            </button>
                        </div>

                        {/* Submit Button */}
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.98 }}
                            className="w-full rounded-xl py-3 font-semibold text-white shadow-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 cursor-pointer shadow-blue-500/25"
                        >
                            Reset Password
                        </motion.button>
                    </form>

                    <button
                        onClick={() => setView('forgot-password')}
                        className="mt-6 w-full flex items-center justify-center gap-2 text-sm font-semibold text-blue-600 hover:underline bg-transparent border-none cursor-pointer"
                    >
                        <ArrowLeft size={16} /> Back
                    </button>
                </motion.div>
            )}

            {openOtpVerification && (
                <OtpInputModal
                    setOpenOtpVerification={setOpenOtpVerification}
                    otp={otp}
                    setOtp={setOtp}
                    email={email}
                    timeLeft={timeLeft}
                    canResend={canResend}
                    handleRequestforOtp={handleLoginSubmit}
                    formSubmit={handleOtpSubmit}
                    setTimeLeft={setTimeLeft}
                />
            )}
        </div>
    );
}

