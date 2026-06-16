"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Coins,
  Network,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";
import Link from "next/link";

const networks = {
  tron: {
    name: "TRON",
    color: "from-red-500 to-pink-500",
    assets: [
      {
        asset: "TRX (TRC20)",
        ticker: "tron",
        min: "10 TRX",
        fee: "N/A",
      },
      {
        asset: "USDT (TRC20)",
        ticker: "tron/usdt",
        min: "10 USDT",
        fee: "N/A",
      },
    ],
  },

  bnb: {
    name: "BNB Smart Chain",
    color: "from-yellow-400 to-orange-500",
    assets: [
      {
        asset: "USDT (BEP20)",
        ticker: "bnb/usdt",
        min: "1 USDT",
        fee: "N/A",
      },
      {
        asset: "BNB (BEP20)",
        ticker: "bnb",
        min: "0.001 BNB",
        fee: "N/A",
      },
      {
        asset: "USDC (BEP20)",
        ticker: "bnb/usdc",
        min: "1 USDC",
        fee: "N/A",
      },
    ],
  },

  mst: {
    name: "MST Blockchain",
    color: "from-blue-500 to-indigo-600",
    assets: [
      {
        asset: "USDC (MEP20)",
        ticker: "mst/usdc",
        min: "1 USDC",
        fee: "N/A",
      },
      {
        asset: "MSTC",
        ticker: "mstc",
        min: "10 MSTC",
        fee: "N/A",
      },
    ],
  },
};



export default function SupportedNetworksPage() {

  async function api() {
    try {
      const response = await fetch("https://sandbox-api.chainpay.biz/payments/options", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  }
  api();

  const [activeNetwork, setActiveNetwork] =
    useState<keyof typeof networks>("tron");

  const current = networks[activeNetwork];

  return (
    <div className="bg-[#F7F8FC] min-h-screen overflow-x-hidden relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-blue-300/20 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute right-0 top-40 w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-indigo-300/20 blur-[80px] sm:blur-[120px] rounded-full pointer-events-none" />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20 lg:py-24 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div className="flex flex-col items-start text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 -mt-20 rounded-full text-sm border border-blue-100 animate-fade-in">
              <Network size={16} />
              Supported Networks
            </div>

            <h1 className="mt-6 text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
              Accept Crypto
              <span className="block text-blue-600 mt-1 lg:mt-2">
                Across Multiple Chains
              </span>
            </h1>

            <p className="mt-4 sm:mt-6 text-base min-[360px]:text-lg sm:text-xl text-slate-600 max-w-xl leading-relaxed">
              Seamlessly accept payments across TRON, BNB Smart Chain and MST
              Blockchain with secure and instant settlements.
            </p>

            <Link
              href="/login"
              className="mt-6 sm:mt-8 lg:mt-10 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-6 sm:px-8 py-3 sm:py-4 text-white font-medium transition duration-300 hover:bg-blue-700 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30"
            >
              Start Accepting Crypto
              <ArrowRight size={18} />
            </Link>
          </div>

          <div className="flex justify-center items-center w-full -pt-32">
            <div className="w-full flex justify-center items-center h-[270px] min-[360px]:h-[310px] min-[400px]:h-[365px] min-[500px]:h-[420px] sm:h-[480px] lg:h-[550px] overflow-visible my-4 lg:my-0 ">
              <div className="relative scale-[0.48] min-[360px]:scale-[0.55] min-[400px]:scale-[0.65] min-[500px]:scale-[0.75] sm:scale-[0.85] lg:scale-100 origin-center transition-all duration-300 flex items-center justify-center w-[550px] h-[550px] shrink-0">

                {/* Background Glow */}
                <motion.div
                  animate={{
                    scale: [1, 1.15, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="absolute w-[400px] h-[400px] rounded-full bg-blue-400/20 blur-[80px]"
                />

                {/* Rotating Ring */}
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{
                    duration: 25,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-[420px] h-[420px] rounded-full border border-blue-200"
                />

                {/* Dashed Ring */}
                <motion.div
                  animate={{ rotate: -360 }}
                  transition={{
                    duration: 35,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute w-[500px] h-[500px] rounded-full border-2 border-dashed border-blue-100"
                />

                {/* Connection Lines */}
                <div className="absolute w-[2px] h-[150px] bg-gradient-to-b from-blue-400 to-transparent top-20" />
                <div className="absolute w-[150px] h-[2px] bg-gradient-to-r from-blue-400 to-transparent right-20" />
                <div className="absolute w-[150px] h-[2px] bg-gradient-to-l from-blue-400 to-transparent left-20" />
                <div className="absolute w-[2px] h-[150px] bg-gradient-to-t from-blue-400 to-transparent bottom-20" />

                {/* CENTER HUB */}
                <motion.div
                  animate={{
                    scale: [1, 1.08, 1],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="relative z-20"
                >

                  <motion.div
                    className="absolute top-[120px] left-1/2 w-4 h-4 rounded-full bg-blue-500"
                    animate={{
                      y: [0, 120, 240, 320],
                      opacity: [0, 1, 1, 0],
                    }}
                    transition={{
                      duration: 3,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  />

                  <motion.div
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.6, 0.3],
                    }}
                    transition={{
                      duration: 6,
                      repeat: Infinity,
                    }}
                    className="absolute w-[500px] h-[500px] rounded-full bg-blue-400/20 blur-[120px]"
                  />

                  <div className="w-40 h-40 rounded-[40px] bg-white border border-blue-100 shadow-[0_20px_60px_rgba(59,130,246,0.2)] flex flex-col items-center justify-center">
                    <Network className="w-16 h-16 text-blue-600" />
                    <span className="mt-2 font-bold text-blue-600">
                      ChainPay
                    </span>
                  </div>
                </motion.div>

                {/* TRON */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="absolute top-6 bg-white rounded-3xl px-6 py-4 shadow-xl border border-red-100"
                >
                  <div className="text-red-500 font-bold">TRON</div>
                  <div className="text-xs text-slate-500">TRX / USDT</div>
                </motion.div>

                {/* BNB */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    x: [0, 10, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="absolute right-4 bg-white rounded-3xl px-6 py-4 shadow-xl border border-yellow-100"
                >
                  <div className="text-yellow-500 font-bold">
                    BNB Chain
                  </div>
                  <div className="text-xs text-slate-500">
                    BNB / USDT / USDC
                  </div>
                </motion.div>

                {/* USDC */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    x: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="absolute left-4 bg-white rounded-3xl px-6 py-4 shadow-xl border border-blue-100"
                >
                  <div className="text-blue-500 font-bold">USDC</div>
                  <div className="text-xs text-slate-500">
                    Multi-Chain
                  </div>
                </motion.div>

                {/* MST */}
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  animate={{
                    y: [0, 10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="absolute bottom-6 bg-white rounded-3xl px-6 py-4 shadow-xl border border-indigo-100"
                >
                  <div className="text-indigo-600 font-bold">MSTC</div>
                  <div className="text-xs text-slate-500">
                    MST Blockchain
                  </div>
                </motion.div>

                {/* Floating Crypto Particles */}
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.4, 1, 0.4],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                  }}
                  className="absolute top-24 left-20 w-3 h-3 bg-blue-500 rounded-full"
                />

                <motion.div
                  animate={{
                    y: [0, 20, 0],
                    opacity: [0.3, 1, 0.3],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                  }}
                  className="absolute bottom-24 right-20 w-4 h-4 bg-indigo-500 rounded-full"
                />

                <motion.div
                  animate={{
                    y: [0, -15, 0],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                  }}
                  className="absolute top-32 right-24 w-2 h-2 bg-yellow-500 rounded-full"
                />

                {/* Stationary Badges (Relocated inside scaling container) */}
                <div className="absolute -top-6 left-10 bg-white px-4 py-2 rounded-xl shadow-lg border border-red-500/10">
                  <p className="font-semibold text-red-500 text-sm">TRON</p>
                </div>

                <div className="absolute top-20 -right-6 bg-white px-4 py-2 rounded-xl shadow-lg border border-yellow-500/10">
                  <p className="font-semibold text-yellow-500 text-sm">BNB</p>
                </div>

                <div className="absolute top-[360px] left-12 bg-white px-4 py-2 rounded-xl shadow-lg border border-indigo-500/10">
                  <p className="font-semibold text-indigo-500 text-sm">MST</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK TABS */}
      <section className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 -mb-6 md:-mb-10">
        <div className="w-full py-1.5 flex justify-start">
          <div className="w-full sm:w-auto bg-white rounded-2xl sm:rounded-3xl p-1.5 sm:p-3 shadow-lg grid grid-cols-3 sm:flex gap-1.5 sm:gap-3">
            {Object.entries(networks).map(([key, value]) => (
              <button
                key={key}
                onClick={() =>
                  setActiveNetwork(key as keyof typeof networks)
                }
                className={`py-2.5 sm:py-3 px-1 sm:px-6 rounded-xl sm:rounded-2xl transition-all font-medium text-xs min-[360px]:text-sm sm:text-base cursor-pointer text-center flex items-center justify-center whitespace-normal sm:whitespace-nowrap w-full sm:w-auto leading-tight ${activeNetwork === key
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/10"
                  : "text-slate-600 hover:bg-slate-100"
                  }`}
              >
                {value.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ASSETS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <div className="flex items-center gap-3 mb-8 sm:mb-10">
          <Coins className="text-blue-600 w-8 h-8 sm:w-10 sm:h-10" />
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
            {current.name}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {current.assets.map((asset) => (
            <div
              key={asset.asset}
              className="group bg-white rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 border border-slate-100"
            >
              <div
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center text-white text-xl sm:text-2xl font-bold`}
              >
                ₿
              </div>

              <h3 className="mt-6 text-xl sm:text-2xl font-bold text-slate-900">
                {asset.asset}
              </h3>

              <div className="mt-6 space-y-4">
                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <p className="text-slate-500 text-sm">Ticker</p>
                  <p className="font-semibold text-slate-800">{asset.ticker}</p>
                </div>

                <div className="flex justify-between items-center py-2 border-b border-slate-100">
                  <p className="text-slate-500 text-sm">
                    Minimum Transaction
                  </p>
                  <p className="font-semibold text-slate-800">{asset.min}</p>
                </div>

                <div className="flex justify-between items-center py-2">
                  <p className="text-slate-500 text-sm">
                    Estimated Fee
                  </p>
                  <p className="font-semibold text-slate-800">{asset.fee}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl sm:rounded-[40px] p-6 sm:p-10 md:p-12 text-white shadow-xl shadow-indigo-600/10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 md:gap-10 text-center">
            <div className="flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">3</h3>
              <p className="text-sm sm:text-base mt-2 opacity-90">Networks</p>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">7</h3>
              <p className="text-sm sm:text-base mt-2 opacity-90">Supported Assets</p>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">24/7</h3>
              <p className="text-sm sm:text-base mt-2 opacity-90">Availability</p>
            </div>

            <div className="flex flex-col justify-center">
              <h3 className="text-3xl sm:text-4xl md:text-5xl font-bold">100%</h3>
              <p className="text-sm sm:text-base mt-2 opacity-90">Non-Custodial</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-20">
        <h2 className="text-center text-3xl sm:text-4xl md:text-5xl font-bold mb-10 sm:mb-14 text-slate-900">
          Why Choose ChainPay
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {[
            "Secure Non-Custodial Payments",
            "Low Transaction Costs",
            "Developer Friendly APIs",
          ].map((item) => (
            <div
              key={item}
              className="bg-white rounded-2xl sm:rounded-3xl p-6 sm:p-8 shadow-lg hover:shadow-xl transition-all duration-300 border border-slate-100"
            >
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center mb-5 sm:mb-6">
                <ShieldCheck className="text-blue-600 w-6 h-6" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-slate-900">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16 md:pb-24">
        <div className="bg-white rounded-3xl sm:rounded-[40px] p-8 sm:p-12 md:p-16 shadow-xl border border-slate-100 text-center relative overflow-hidden">
          <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-blue-50 rounded-full blur-3xl opacity-60 pointer-events-none" />
          <div className="absolute -left-10 -top-10 w-40 h-40 bg-indigo-50 rounded-full blur-3xl opacity-60 pointer-events-none" />

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900 relative z-10">
            Ready to Accept Crypto?
          </h2>

          <p className="mt-4 sm:mt-5 text-slate-600 text-base sm:text-lg max-w-xl mx-auto relative z-10">
            Integrate once and accept payments across multiple
            blockchain networks.
          </p>

          <button className="mt-8 sm:mt-10 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 sm:px-8 py-3.5 sm:py-4 rounded-xl transition duration-300 relative z-10 shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 cursor-pointer">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}




