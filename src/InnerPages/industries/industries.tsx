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
      "Offer customers a smooth checkout with crypto. Chainpay supports instant payments, minimal fees, and easy plugin or API setup to keep your sales momentum strong.",
  },
  {
    title: "Travel & Hospitality",
    icon: Plane,
    emoji: "✈️",
    description:
      "Meet the needs of global travelers. Chainpay enables hotels, airlines, and travel services to accept borderless payments without settlement delays—boosting customer satisfaction and operational efficiency.",
  },
  {
    title: "Gaming & Entertainment",
    icon: Gamepad2,
    emoji: "🎮",
    description:
      "Speed matters in gaming. Chainpay delivers lightning-fast, secure in-game and platform payments, enhancing user engagement and reducing revenue friction.",
  },
  {
    title: "Freelancers & Digital Services",
    icon: Laptop,
    emoji: "💻",
    description:
      "Say goodbye to slow cross-border transfers. Freelancers and digital service providers can get paid instantly with crypto—Chainpay streamlines operations and cuts out lengthy banking complications.",
  },
  {
    title: "Startups & Enterprises",
    icon: Building2,
    emoji: "🏢",
    description:
      "Scale securely with Chainpay’s flexible infrastructure. Whether you’re a startup or an enterprise, our API-driven gateway supports your growth with branded checkouts, robust backend tools, and global settlement capabilities.",
  },
];





export default function IndustrySection() {
  const [active, setActive] = useState(0);

  return (
    <section className="relative py-16 sm:py-24 md:py-5 bg-[#F7F8FC] overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-20 left-20 w-96 h-96 bg-blue-300/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-300/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 md:mb-20">
          {/* <span className="inline-block px-4 py-2 rounded-full border border-blue-200 text-blue-600 text-sm">
            Industries
          </span> */}

          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-slate-900 tracking-tight">
            Industries We
            <span className="text-blue-600"> Serve</span>
          </h2>

          <p className="mt-4 sm:mt-6 text-lg sm:text-xl text-slate-600 max-w-3xl mx-auto">
            Powerful crypto payment infrastructure tailored for every business.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left Side */}
          <div className="space-y-3 sm:space-y-4">
            {industries.map((industry, index) => {
              const Icon = industry.icon;

              return (
                <button
                  key={industry.title}
                  onClick={() => setActive(index)}
                  className={`w-full p-4 sm:p-6 rounded-2xl sm:rounded-3xl text-left transition-all duration-300 border ${active === index
                    ? "bg-white border-blue-500 shadow-xl scale-[1.01] sm:scale-[1.02]"
                    : "bg-white/60 border-transparent hover:bg-white"
                    }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-blue-600" />

                      <span className="font-semibold text-base sm:text-lg">
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
            <div className="bg-white rounded-3xl sm:rounded-[40px] shadow-2xl p-6 sm:p-10 md:p-12 min-h-[400px] sm:min-h-[450px] lg:min-h-[500px] flex flex-col justify-center border border-slate-100/50">
              <div className="flex justify-center mb-6 sm:mb-10">
                <div className="w-28 h-28 sm:w-36 sm:h-36 md:w-40 md:h-40 rounded-full bg-gradient-to-br from-blue-100 to-blue-300 flex items-center justify-center text-5xl sm:text-6xl md:text-7xl shadow-xl">
                  {industries[active].emoji}
                </div>
              </div>

              <div className="text-center">
                <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-900">
                  {industries[active].title}
                </h3>

                <p className="mt-4 sm:mt-6 text-base sm:text-lg text-slate-600 leading-relaxed max-w-xl mx-auto">
                  {industries[active].description}
                </p>

                <div className="mt-6 sm:mt-10 flex flex-wrap justify-center gap-2 sm:gap-4">
                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium">
                    Instant Payments
                  </div>

                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium">
                    Global Reach
                  </div>

                  <div className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-full bg-blue-50 text-blue-600 text-xs sm:text-sm font-medium">
                    Low Fees
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Decoration */}
            <div className="absolute -top-6 -right-6 w-24 h-24 bg-blue-500 rounded-3xl rotate-12 opacity-20 pointer-events-none" />
            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-indigo-500 rounded-full opacity-20 pointer-events-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
