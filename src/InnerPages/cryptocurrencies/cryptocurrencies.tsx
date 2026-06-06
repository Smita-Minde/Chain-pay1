"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import {
  Coins,
  Network,
  ArrowRight,
  ShieldCheck,
} from "lucide-react";

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
  const [activeNetwork, setActiveNetwork] =
    useState<keyof typeof networks>("tron");

  const current = networks[activeNetwork];

  return (
    <div className="bg-[#F7F8FC] min-h-screen overflow-hidden">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-300/20 blur-[120px] rounded-full" />
      <div className="absolute right-0 top-40 w-[400px] h-[400px] bg-indigo-300/20 blur-[120px] rounded-full" />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 py-24 relative">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-sm border border-blue-100">
              <Network size={16} />
              Supported Networks
            </div>

            <h1 className="mt-8 text-6xl font-bold leading-tight text-slate-900">
              Accept Crypto
              <span className="block text-blue-600">
                Across Multiple Chains
              </span>
            </h1>

            <p className="mt-6 text-xl text-slate-600 max-w-xl">
              Seamlessly accept payments across TRON, BNB Smart Chain and MST
              Blockchain with secure and instant settlements.
            </p>

            <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 transition">
              Start Accepting Crypto
              <ArrowRight size={18} />
            </button>
          </div>

          <div className="flex justify-center">
            <div className="relative">


              <div className="relative w-[550px] h-[550px] flex items-center justify-center">

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
              </div>




              <div className="absolute -top-6 left-10 bg-white px-4 py-2 rounded-xl shadow-lg">
                <p className="font-semibold text-red-500">TRON</p>

              </div>

              <div className="absolute top-20 -right-8 bg-white px-4 py-2 rounded-xl shadow-lg">
                <p className="font-semibold text-yellow-500">BNB</p>
              </div>

              <div className="absolute bottom-6 left-0 bg-white px-4 py-2 rounded-xl shadow-lg">
                <p className="font-semibold text-indigo-500">MST</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* NETWORK TABS */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-white rounded-3xl p-3 shadow-lg inline-flex gap-3">
          {Object.entries(networks).map(([key, value]) => (
            <button
              key={key}
              onClick={() =>
                setActiveNetwork(key as keyof typeof networks)
              }
              className={`px-6 py-3 rounded-2xl transition-all font-medium ${activeNetwork === key
                ? "bg-blue-600 text-white"
                : "text-slate-600 hover:bg-slate-100"
                }`}
            >
              {value.name}
            </button>
          ))}
        </div>
      </section>

      {/* ASSETS */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <div className="flex items-center gap-3 mb-10">
          <Coins className="text-blue-600" />
          <h2 className="text-4xl font-bold text-slate-900">
            {current.name}
          </h2>
        </div>

        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-8">
          {current.assets.map((asset) => (
            <div
              key={asset.asset}
              className="group bg-white rounded-[32px] p-8 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              <div
                className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${current.color} flex items-center justify-center text-white text-2xl font-bold`}
              >
                ₿
              </div>

              <h3 className="mt-6 text-2xl font-bold text-slate-900">
                {asset.asset}
              </h3>

              <div className="mt-6 space-y-4">
                <div>
                  <p className="text-slate-400 text-sm">Ticker</p>
                  <p className="font-semibold">{asset.ticker}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Minimum Transaction
                  </p>
                  <p className="font-semibold">{asset.min}</p>
                </div>

                <div>
                  <p className="text-slate-400 text-sm">
                    Estimated Fee
                  </p>
                  <p className="font-semibold">{asset.fee}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* STATS */}
      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] p-12 text-white">
          <div className="grid md:grid-cols-4 gap-10 text-center">
            <div>
              <h3 className="text-5xl font-bold">3</h3>
              <p>Networks</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">7</h3>
              <p>Supported Assets</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">24/7</h3>
              <p>Availability</p>
            </div>

            <div>
              <h3 className="text-5xl font-bold">100%</h3>
              <p>Non-Custodial</p>
            </div>
          </div>
        </div>
      </section>

      {/* FEATURES */}
      <section className="max-w-7xl mx-auto px-6 py-20">
        <h2 className="text-center text-5xl font-bold mb-14">
          Why Choose ChainPay
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            "Secure Non-Custodial Payments",
            "Low Transaction Costs",
            "Developer Friendly APIs",
          ].map((item) => (
            <div
              key={item}
              className="bg-white rounded-3xl p-8 shadow-lg"
            >
              <ShieldCheck className="text-blue-600 mb-5" />
              <h3 className="text-xl font-semibold">{item}</h3>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 pb-24">
        <div className="bg-white rounded-[40px] p-16 shadow-xl text-center">
          <h2 className="text-5xl font-bold text-slate-900">
            Ready to Accept Crypto?
          </h2>

          <p className="mt-5 text-slate-600 text-lg">
            Integrate once and accept payments across multiple
            blockchain networks.
          </p>

          <button className="mt-10 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl">
            Get Started
          </button>
        </div>
      </section>
    </div>
  );
}




