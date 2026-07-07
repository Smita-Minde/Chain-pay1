"use client";

const items = [
  {
    title: "🛒 E-Commerce & Retail",
    video: "/video/industry-video/E-commerce&Retail.mp4",
    desc: "Offer customers a smooth checkout with crypto. ChainPay supports instant payments, minimal fees, and easy plugin or API setup to keep your sales momentum strong.",
  },
  {
    title: "✈️ Travel & Hospitality",
    video: "/video/industry-video/Travel&Hospitality.mp4",
    desc: "Meet the needs of global travelers. ChainPay enables hotels, airlines and travel services to accept borderless payments without settlement delays.",
  },
  {
    title: "🎮 Gaming & Entertainment",
    video: "/video/industry-video/Gaming&Entertainment.mp4",
    desc: "Speed matters in gaming. ChainPay delivers lightning-fast secure in-game and platform payments, enhancing user engagement.",
  },
  {
    title: "💻 Freelancers & Digital Services",
    video: "/video/industry-video/Freelancers&ContentCreators.mp4",
    desc: "Say goodbye to slow cross-border transfers. Freelancers can receive crypto payments instantly with lower costs.",
  },
  {
    title: "🏢 Startups & Enterprises",
    video: "/video/industry-video/Startup&Enterprises.mp4",
    desc: "Scale securely with ChainPay's API-driven payment gateway featuring branded checkout, backend tools and global settlement.",
  },
];

export default function Industries() {
  return (
    <section className="max-w-7xl mx-auto px-5 py-20">
      <h1 className="text-center text-5xl font-bold mb-10">Industries We Empower</h1>
      <p className="text-center text-gray-500 max-w-3xl mx-auto mb-10">
        Accept crypto payments with ChainPay across every business category.
      </p>
      <section className="max-w-7xl mx-auto px-5 py-20 space-y-4">
        {items.map((i) => (
          <div
            key={i.title}
            className="sticky top-28 grid md:grid-cols-2 bg-white border rounded-2xl overflow-hidden shadow-lg"
          >
            <div className="p-12">
              <h2 className="text-3xl font-bold mb-5">{i.title}</h2>
              <p className="text-gray-500 leading-8">{i.desc}</p>
              <div className="my-6 font-bold text-amber-500 cursor-pointer">Explore Solution →</div>
              <ul className="space-y-3">
                <li>✔ Instant Payments</li>
                <li>✔ Global Reach</li>
                <li>✔ Low Fees</li>
              </ul>
            </div>
            <div className="relative min-h-[420px] border-t md:border-t-0 md:border-l bg-gray-50">
              <video
                src={i.video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover absolute inset-0"
              />
            </div>
          </div>
        ))}
      </section>
    </section>
  );
}