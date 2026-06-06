"use client";

import { useState } from "react";
import {
  ShoppingBag,
  Plane,
  Gamepad2,
  Laptop,
  Building2,
  ArrowRight,
} from "lucide-react";

const industries = [
  {
    title: "E-Commerce & Retail",
    icon: ShoppingBag,
    emoji: "🛒",
    description:
      "Offer customers a smooth checkout with crypto payments, instant settlements and low transaction fees.",
  },
  {
    title: "Travel & Hospitality",
    icon: Plane,
    emoji: "✈️",
    description:
      "Accept borderless payments from travelers around the world without banking delays.",
  },
  {
    title: "Gaming & Entertainment",
    icon: Gamepad2,
    emoji: "🎮",
    description:
      "Enable instant in-game purchases and frictionless crypto payments.",
  },
  {
    title: "Freelancers & Digital Services",
    icon: Laptop,
    emoji: "💻",
    description:
      "Receive global payments instantly without expensive international transfers.",
  },
  {
    title: "Startups & Enterprises",
    icon: Building2,
    emoji: "🏢",
    description:
      "Scale globally with powerful APIs, branded checkouts and enterprise-grade infrastructure.",
  },
];

export default function IndustrySection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-32 bg-[#F7F8FC] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300/20 blur-[120px] rounded-full" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-300/20 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <span className="inline-block px-4 py-2 rounded-full border border-blue-200 text-blue-600 text-sm">
            Industries
          </span>

          <h2 className="mt-6 text-6xl font-bold text-slate-900">
            Industries We
            <span className="text-blue-600"> Serve</span>
          </h2>

          <p className="mt-6 text-xl text-slate-600 max-w-3xl mx-auto">
            Powerful crypto payment infrastructure tailored for every business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left Side */}
          <div className="space-y-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;

              return (
                <button
                  key={industry.title}
                  onClick={() => setActive(index)}
                  className={`w-full p-6 rounded-3xl text-left transition-all duration-300 border ${
                    active === index
                      ? "bg-white border-blue-500 shadow-xl scale-[1.02]"
                      : "bg-white/60 border-transparent hover:bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Icon className="w-7 h-7 text-blue-600" />

                      <span className="font-semibold text-lg">
                        {industry.title}
                      </span>
                    </div>

                    <ArrowRight className="w-5 h-5 text-blue-500" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side */}
          <div className="relative">
            <div className="bg-white rounded-[40px] shadow-2xl p-12 min-h-[500px] flex flex-col justify-center">
              <div className="flex justify-center mb-10">
                <div className="w-40 h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center text-7xl shadow-xl">
                  {industries[active].emoji}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-4xl font-bold text-slate-900">
                  {industries[active].title}
                </h3>

                <p className="mt-6 text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
                  {industries[active].description}
                </p>

                <div className="mt-10 flex justify-center gap-4">
                  <div className="px-4 py-2 rounded-full bg-blue-50 text-blue-600">
                    Instant Payments
                  </div>

                  <div className="px-4 py-2 rounded-full bg-blue-50 text-blue-600">
                    Global Reach
                  </div>

                  <div className="px-4 py-2 rounded-full bg-blue-50 text-blue-600">
                    Low Fees
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-3xl rotate-12 opacity-20" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-indigo-500 rounded-full opacity-20" />
          </div>
        </div>
      </div>
    </section>
  );
}
