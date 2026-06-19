"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import { useAuth } from "@hooks";
import OtpInputModal from "@components/Modals/OtpInputModal";

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

    // OTP states
    const [openOtpVerification, setOpenOtpVerification] = useState(false);
    const [otp, setOtp] = useState<string[]>(new Array(6).fill(''));
    const [otpTimerData, setOtpTimerData] = useState<any>({});
    const [timeLeft, setTimeLeft] = useState<number>(0);
    const [canResend, setCanResend] = useState<boolean>(false);

    const { register, authOtp } = useAuth();
    const router = useRouter();

    const handleEmailChange = (val: string) => {
        setEmail(val);
        if (submitAttempted) {
            if (!val.trim()) {
                setEmailError("Email is required");
            } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
                setEmailError("Invalid email format");
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
            } else if (val.length < 8) {
                setPasswordError("Password must be at least 8 characters");
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

    const handleRequestforOtp = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitAttempted(true);

        let hasError = false;

        if (!email.trim()) {
            setEmailError("Email is required");
            hasError = true;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            setEmailError("Invalid email format");
            hasError = true;
        } else {
            setEmailError("");
        }

        if (!password) {
            setPasswordError("Password is required");
            hasError = true;
        } else if (password.length < 8) {
            setPasswordError("Password must be at least 8 characters");
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

        try {
            toast.loading("Sending code...", { id: "register-otp" });
            const payload = {
                email,
                type: 'register',
            };
            const response = await authOtp(payload);
            toast.dismiss("register-otp");
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
                toast.success("Verification code sent to your email!");
            }
        } catch (error) {
            toast.dismiss("register-otp");
            console.error("Error in registration OTP request:", error);
            toast.error("Failed to request verification code.");
        }
    };

    const handleRegisterSubmit = async () => {
        try {
            toast.loading("Creating account...", { id: "register-action" });
            const payload = {
                email,
                password,
                confirmPassword,
                emailVerificationCode: otp.join(''),
            };
            const [response, error] = await register(payload, '/login/home');
            toast.dismiss("register-action");
            if (error) {
                toast.error(typeof error === 'string' ? error : (error.message || "Failed to create account"));
            } else if (response) {
                toast.success("Account created successfully!");
                router.push("/login/home");
            }
        } catch (error) {
            toast.dismiss("register-action");
            console.error("Error during register:", error);
            toast.error("An error occurred during registration.");
        }
    };

    // OTP Countdown Timer
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

                        <form onSubmit={handleRequestforOtp} className="space-y-4">
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
                            <label className="flex items-start gap-3 text-sm text-slate-600 select-none pt-2 cursor-pointer">
                                <input type="checkbox" className="mt-1 rounded border-slate-300 text-blue-600 focus:ring-blue-500 cursor-pointer" required />
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

            {openOtpVerification && (
                <OtpInputModal
                    setOpenOtpVerification={setOpenOtpVerification}
                    otp={otp}
                    setOtp={setOtp}
                    email={email}
                    timeLeft={timeLeft}
                    canResend={canResend}
                    handleRequestforOtp={handleRequestforOtp}
                    formSubmit={handleRegisterSubmit}
                    setTimeLeft={setTimeLeft}
                />
            )}
        </div>
    );
}