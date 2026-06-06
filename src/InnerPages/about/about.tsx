import { ShieldCheck, Globe, Zap, Wallet, TrendingUp, Clock, Rocket } from "lucide-react";

export default function AboutPage() {
  return (
    <main className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-blue-50 to-white">

      {/* Background Glow - Enhanced */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-20 left-0 w-[600px] h-[600px] bg-blue-300/20 blur-[180px] rounded-full animate-pulse" />
        <div className="absolute top-96 right-0 w-[600px] h-[600px] bg-indigo-300/20 blur-[180px] rounded-full animate-pulse [animation-delay:1s]" />
        <div className="absolute bottom-0 left-1/3 w-[700px] h-[700px] bg-cyan-200/15 blur-[200px] rounded-full animate-pulse [animation-delay:2s]" />
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-pink-200/10 blur-3xl rounded-full" />
      </div>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 lg:py-1">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          <div className="relative z-10">
            <div className="inline-flex px-5 py-2.5 rounded-full border border-blue-200/60 bg-blue-50/80 backdrop-blur text-blue-600 font-semibold text-sm tracking-wide">
              ✨ About ChainPay
            </div>

            <h1 className="mt-3 text-6xl lg:text-7xl font-bold leading-[1.15] text-slate-900">
              Redefining the Future of{" "}
              <span className="relative">
                <span className="relative z-10 bg-gradient-to-r from-blue-600 via-indigo-550 to-purple-600 bg-clip-text text-transparent">Payments</span>
                <span className="absolute -inset-1 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 opacity-20 blur-xl -z-10" />
              </span>
            </h1>

            <p className="mt-13 text-xl text-slate-600 leading-relaxed max-w-xl">
              At ChainPay, we believe payments should be simple, secure, and borderless. As a next-generation crypto payment gateway, our mission is to empower businesses and individuals with fast, reliable, and cost-effective digital transactions.
            </p>

            

            <div className="mt-10 flex flex-wrap gap-4">
              <button className="px-8 py-3 rounded-full bg-blue-600 text-white font-semibold hover:bg-blue-700 shadow-lg shadow-blue-200 hover:shadow-xl transition-all">
                Get Started
              </button>
              <button className="px-8 py-3 rounded-full border border-slate-300 text-slate-900 font-semibold hover:bg-slate-50 transition-all">
                Learn More
              </button>
            </div>
          </div>

          {/* Hero Card - Enhanced */}
          <div className="relative z-10 group mt-5">

            <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 rounded-[40px] blur-2xl opacity-20 group-hover:opacity-30 transition-opacity duration-500" />

            <div className="relative bg-white/90 backdrop-blur-xl border border-white/60 rounded-[40px] p-8 lg:p-10 shadow-2xl overflow-hidden group-hover:shadow-3xl transition-all duration-500">
              
              <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-blue-200/10 via-purple-200/10 to-pink-200/10 rounded-full blur-3xl -z-10" />

              <div className="flex justify-between items-start mb-8">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-green-100 to-emerald-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold border border-green-200/50 shadow-sm">
                  <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                  Payment Received
                </span>

                <span className="text-xl font-bold text-slate-900">
                  +250 USDT
                </span>
              </div>

              <div className="grid grid-cols-2 gap-5 mb-8">

                <div className="group/card relative bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-[24px] p-6 border border-blue-200/30 hover:-translate-y-1 hover:shadow-lg transition-all cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 to-blue-500/0 group-hover/card:from-blue-400/5 group-hover/card:to-blue-500/10 rounded-[24px] transition-all" />
                  <Wallet className="relative w-10 h-10 text-blue-600 mb-3" />
                  <h4 className="relative font-semibold text-slate-900">Crypto Gateway</h4>
                </div>

                <div className="group/card relative bg-gradient-to-br from-green-50 to-emerald-100/50 rounded-[24px] p-6 border border-green-200/30 hover:-translate-y-1 hover:shadow-lg transition-all cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-400/0 to-green-500/0 group-hover/card:from-green-400/5 group-hover/card:to-green-500/10 rounded-[24px] transition-all" />
                  <ShieldCheck className="relative w-10 h-10 text-green-600 mb-3" />
                  <h4 className="relative font-semibold text-slate-900">Secure Payments</h4>
                </div>

                <div className="group/card relative bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-[24px] p-6 border border-purple-200/30 hover:-translate-y-1 hover:shadow-lg transition-all cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/0 to-purple-500/0 group-hover/card:from-purple-400/5 group-hover/card:to-purple-500/10 rounded-[24px] transition-all" />
                  <Globe className="relative w-10 h-10 text-purple-600 mb-3" />
                  <h4 className="relative font-semibold text-slate-900">Global Access</h4>
                </div>

                <div className="group/card relative bg-gradient-to-br from-orange-50 to-amber-100/50 rounded-[24px] p-6 border border-orange-200/30 hover:-translate-y-1 hover:shadow-lg transition-all cursor-default">
                  <div className="absolute inset-0 bg-gradient-to-br from-orange-400/0 to-orange-500/0 group-hover/card:from-orange-400/5 group-hover/card:to-orange-500/10 rounded-[24px] transition-all" />
                  <Zap className="relative w-10 h-10 text-orange-500 mb-3" />
                  <h4 className="relative font-semibold text-slate-900">Instant Settlement</h4>
                </div>
              </div>

            </div>

            <div className="mt-6 flex justify-end">
              <div className="max-w-xl rounded-[32px] border border-slate-200/80 bg-white/90 p-6 shadow-xl backdrop-blur-xl">
                <p className="text-lg leading-relaxed text-slate-600">
                  We are building a seamless bridge between traditional finance and cryptocurrencies, helping merchants, startups, and enterprises accept and process payments globally.
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Stats */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 pb-24 pt-24">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          {[
            ["120+", "Countries Supported"],
            ["10K+", "Daily Transactions"],
            ["99.99%", "Uptime"],
            ["24/7", "Support"],
          ].map(([value, label]) => (
            <div
              key={label}
              className="bg-white rounded-3xl p-8 text-center border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all"
            >
              <h3 className="text-5xl font-bold text-blue-600">
                {value}
              </h3>
              <p className="mt-3 text-slate-600">
                {label}
              </p>
            </div>
          ))}

        </div>
      </section>

      {/* Mission Vision */}
      <section className="max-w-7xl mx-auto px-6 lg:px-10 py-24 relative">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-10 -left-32 w-96 h-96 bg-blue-200/15 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -right-32 w-96 h-96 bg-pink-200/15 rounded-full blur-3xl animate-pulse [animation-delay:1s]" />
        </div>

        <div className="text-center mb-20">
          <p className="text-blue-600 font-semibold text-sm uppercase tracking-[0.28em]">
            Our Purpose
          </p>

          <h2 className="text-5xl lg:text-6xl font-bold text-slate-900 mt-4">
            Mission & Vision
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
            Guiding principles that drive every decision and innovation at ChainPay
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Vision Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-indigo-500 to-cyan-400 rounded-[32px] blur-xl opacity-30 group-hover:opacity-40 transition-all duration-700 -z-10" />
            
            <div className="relative overflow-hidden rounded-[32px] border border-blue-200/40 bg-gradient-to-br from-blue-50/80 via-slate-50/80 to-cyan-50/80 backdrop-blur-xl p-10 lg:p-12 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-blue-200/60">
              
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-400/0 via-indigo-400/0 to-cyan-400/0 group-hover:from-blue-400/10 group-hover:via-indigo-400/5 group-hover:to-cyan-400/10 transition-all duration-700" />
              
              {/* Modified Design Logo */}
              <div className="relative z-10 mb-10 group-hover:animate-pulse">
                <div className="inline-flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-indigo-400 rounded-[20px] blur-lg opacity-60" />
                    <div className="relative bg-gradient-to-br from-blue-500 to-indigo-600 rounded-[20px] p-4 group-hover:shadow-2xl transition-all duration-500">
                      <Rocket className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900">Our Vision</h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full" />
                </div>

                <p className="text-lg text-slate-700 leading-8 font-medium">
                  To make cryptocurrency payments accessible to everyone and enable businesses of all sizes to grow in the digital economy.
                </p>

                <div className="space-y-4 pt-6 border-t border-blue-200/30">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Inclusive & Accessible</p>
                      <p className="text-sm text-slate-600 mt-1">Breaking barriers in global payments</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-blue-500 text-white">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Future-Ready</p>
                      <p className="text-sm text-slate-600 mt-1">Built for tomorrow&apos;s economy</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mission Card */}
          <div className="group relative">
            <div className="absolute inset-0 bg-gradient-to-br from-pink-500 via-rose-500 to-red-400 rounded-[32px] blur-xl opacity-30 group-hover:opacity-40 transition-all duration-700 -z-10" />
            
            <div className="relative overflow-hidden rounded-[32px] border border-pink-200/40 bg-gradient-to-br from-pink-50/80 via-slate-50/80 to-rose-50/80 backdrop-blur-xl p-10 lg:p-12 shadow-xl transition-all duration-500 group-hover:shadow-2xl group-hover:border-pink-200/60">
              
              {/* Animated Background Gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400/0 via-rose-400/0 to-red-400/0 group-hover:from-pink-400/10 group-hover:via-rose-400/5 group-hover:to-red-400/10 transition-all duration-700" />
              
              {/* Modified Design Logo */}
              <div className="relative z-10 mb-10 group-hover:animate-pulse">
                <div className="inline-flex items-center justify-center">
                  <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-rose-400 rounded-[20px] blur-lg opacity-60" />
                    <div className="relative bg-gradient-to-br from-pink-500 to-rose-600 rounded-[20px] p-4 group-hover:shadow-2xl transition-all duration-500">
                      <ShieldCheck className="h-8 w-8 text-white group-hover:scale-110 transition-transform duration-500" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative z-10 space-y-6">
                <div className="space-y-3">
                  <h3 className="text-3xl lg:text-4xl font-bold text-slate-900">Our Mission</h3>
                  <div className="h-1 w-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full" />
                </div>

                <p className="text-lg text-slate-700 leading-8 font-medium">
                  To deliver a trusted payment experience through secure technology, transparent processes and continuous blockchain innovation.
                </p>

                <div className="space-y-4 pt-6 border-t border-pink-200/30">
                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-pink-500 text-white">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Secure & Reliable</p>
                      <p className="text-sm text-slate-600 mt-1">Enterprise-grade security standards</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <div className="flex items-center justify-center h-6 w-6 rounded-full bg-pink-500 text-white">
                        <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold text-slate-900">Action-Oriented</p>
                      <p className="text-sm text-slate-600 mt-1">Delivering real results for merchants</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-white/95 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
            <div className="pointer-events-none absolute -top-12 -right-10 h-44 w-44 rounded-full bg-blue-200/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-pink-200/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-blue-200/20 via-transparent to-pink-200/20" />

            <div className="relative px-8 py-16 md:px-12 md:py-20">
              <div className="text-center mb-12">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">Benefits</p>
                <h2 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">Why Choose ChainPay?</h2>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                {[
                  {
                    icon: ShieldCheck,
                    title: "Secure & Reliable",
                    text: "Advanced encryption and blockchain-backed transactions.",
                  },
                  {
                    icon: Zap,
                    title: "Fast Settlements",
                    text: "Instant processing with minimal fees.",
                  },
                  {
                    icon: Globe,
                    title: "Global Reach",
                    text: "Accept payments from anywhere in the world.",
                  },
                  {
                    icon: Wallet,
                    title: "User-Friendly",
                    text: "Easy integration and seamless user experience.",
                  },
                ].map((item) => (
                  <div key={item.title} className="group relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-50/80 p-8 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition duration-500 group-hover:opacity-20" />
                    <div className="relative z-10 flex items-center justify-between gap-4 mb-8">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-blue-600 shadow-sm transition duration-500 group-hover:bg-blue-50">
                        <item.icon className="h-7 w-7" />
                      </span>
                    </div>
                    <h3 className="relative z-10 text-2xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                    <p className="relative z-10 text-sm leading-7 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      

      {/* Journey */}
      <section className="py-24">
        <div className="max-w-6xl mx-auto px-6">
          <div className="relative overflow-hidden rounded-[40px] border border-slate-200/70 bg-white/95 shadow-[0_20px_80px_rgba(15,23,42,0.08)]">
            <div className="pointer-events-none absolute -top-12 -right-10 h-44 w-44 rounded-full bg-blue-200/15 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-12 -left-10 h-44 w-44 rounded-full bg-pink-200/15 blur-3xl" />
            <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-r from-blue-200/20 via-transparent to-pink-200/20" />

            <div className="relative px-8 py-16 md:px-12 md:py-20">
              <div className="text-center mb-12">
                <p className="text-sm font-semibold uppercase tracking-[0.28em] text-blue-600">Journey</p>
                <h2 className="mt-4 text-5xl font-bold tracking-tight text-slate-900">Our Journey</h2>
                <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-600">
                  Discover the milestones that shaped ChainPay and see how our vision turned into fast, secure crypto payment experiences.
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    icon: Rocket,
                    title: "Founded",
                    subtitle: "2021",
                    text: "Started with a vision to simplify crypto payments and empower global commerce.",
                  },
                  {
                    icon: TrendingUp,
                    title: "Platform Growth",
                    subtitle: "2023",
                    text: "Expanded payment solutions with cross-border support and merchant tools.",
                  },
                  {
                    icon: Clock,
                    title: "Future Vision",
                    subtitle: "Next",
                    text: "Building next-generation financial infrastructure with speed, security, and scale.",
                  },
                ].map((item) => (
                  <div key={item.title} className="group relative overflow-hidden rounded-[32px] border border-slate-200/80 bg-slate-50/80 p-8 shadow-sm transition duration-500 hover:-translate-y-2 hover:shadow-2xl">
                    <div className="absolute inset-0 rounded-[32px] bg-gradient-to-br from-blue-500/0 via-purple-500/0 to-pink-500/0 opacity-0 transition duration-500 group-hover:opacity-20" />
                    <div className="relative z-10 flex items-center justify-between gap-4 mb-8">
                      <span className="inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-white text-blue-600 shadow-sm transition duration-500 group-hover:bg-blue-50">
                        <item.icon className="h-7 w-7" />
                      </span>
                      <span className="rounded-full bg-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-slate-500 shadow-sm transition duration-500 group-hover:bg-white">
                        {item.subtitle}
                      </span>
                    </div>
                    <h3 className="relative z-10 text-2xl font-semibold text-slate-900 mb-3">{item.title}</h3>
                    <p className="relative z-10 text-sm leading-7 text-slate-600">{item.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24 px-6">
        <div className="max-w-6xl mx-auto">

          <div className="relative overflow-hidden rounded-[40px]">

            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-550 to-pink-400" />

            <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 blur-[120px]" />

            <div className="relative p-16 lg:p-24 text-center text-white">

              <h2 className="text-4xl lg:text-6xl font-bold">
                Ready To Scale Globally?
              </h2>

              <p className="mt-6 text-xl text-blue-100">
                Accept crypto payments in minutes with ChainPay.
              </p>

              <button className="mt-10 px-10 py-4 bg-white text-blue-600 rounded-xl font-semibold hover:scale-105 transition">
                Get Started
              </button>

            </div>
          </div>

        </div>
      </section>

    </main>
  );
}
