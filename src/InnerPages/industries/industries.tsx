"use client";

import Link from "next/link";

const items = [
  {
    title: "🛒 E-Commerce & Retail",
    video: "/video/industry-video/E-commerce&Retail.mp4",
    desc: "Offer customers a smooth checkout with crypto. ChainPay supports instant payments, minimal fees, and easy plugin or API setup to keep your sales momentum strong.",
    link: "/industries/E-commerce-Retail",
  },
  {
    title: "✈️ Travel & Hospitality",
    video: "/video/industry-video/Travel&Hospitality.mp4",
    desc: "Meet the needs of global travelers. ChainPay enables hotels, airlines and travel services to accept borderless payments without settlement delays.",
    link: "/industries/travel-hospitality",
  },
  {
    title: "🎮 Gaming & Entertainment",
    video: "/video/industry-video/Gaming&Entertainment.mp4",
    desc: "Speed matters in gaming. ChainPay delivers lightning-fast secure in-game and platform payments, enhancing user engagement.",
    link: "/industries/gaming-entertainment",
  },
  {
    title: "💻 Freelancers & Digital Services",
    video: "/video/industry-video/Freelancers&ContentCreators.mp4",
    desc: "Say goodbye to slow cross-border transfers. Freelancers can receive crypto payments instantly with lower costs.",
    link: "/industries/freelancer-digital-services",
  },
  {
    title: "🏢 Startups & Enterprises",
    video: "/video/industry-video/Startup&Enterprises.mp4",
    desc: "Scale securely with ChainPay's API-driven payment gateway featuring branded checkout, backend tools and global settlement.",
    link: "/industries/startups-enterprises",
  },
];

export default function Industries() {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-12 md:py-24">
      <h1 className="text-center text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight mb-6">
        Industries We Empower
      </h1>
      <p className="text-center text-slate-500 max-w-2xl mx-auto text-sm sm:text-base md:text-lg leading-relaxed mb-12 sm:mb-16">
        Accept crypto payments with ChainPay across every business category.
      </p>

      <div className="space-y-8 md:space-y-12">
        {items.map((i) => (
          <div
            key={i.title}
            className="sticky top-20 md:top-28 grid grid-cols-1 md:grid-cols-2 bg-white border border-slate-200/50 rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="p-6 sm:p-8 md:p-10 lg:p-12 xl:p-16 flex flex-col justify-between">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                  {i.title}
                </h2>
                <p className="text-slate-500 text-sm sm:text-base leading-relaxed sm:leading-8 mb-6">
                  {i.desc}
                </p>
                <div className="mb-6">
                  <Link
                    href={i.link}
                    className="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 bg-white text-blue-600 border border-blue-600/10 hover:bg-slate-50 font-extrabold rounded-2xl shadow-lg transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    Explore Solution →
                  </Link>
                </div>
              </div>

              <ul className="space-y-3 mt-6 border-t border-slate-100 pt-6">
                <li className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Instant Payments
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Global Reach
                </li>
                <li className="flex items-center gap-2.5 text-xs sm:text-sm font-bold text-slate-700">
                  <span className="w-5 h-5 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center shrink-0">
                    <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </span>
                  Low Fees
                </li>
              </ul>
            </div>

            <div className="relative w-full h-[220px] sm:h-[300px] md:h-auto min-h-[220px] sm:min-h-[300px] md:min-h-[420px] border-t md:border-t-0 md:border-l border-slate-100 bg-gradient-to-b from-[#eceef1] to-[#9aa1b3] overflow-hidden">
              <video
                src={i.video}
                autoPlay
                loop
                muted
                playsInline
                className="absolute inset-0 w-full h-full object-contain"
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}


