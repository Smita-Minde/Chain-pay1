"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import Link from "next/link";
import Image from "next/image";

export default function LoginPage() {
 
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


        </div>
    );
}