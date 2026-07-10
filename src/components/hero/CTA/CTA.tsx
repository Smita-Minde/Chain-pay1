"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

const cards = [
  {
    title: "Create Your Account and Get Your API Keys",
    desc: "Sign up, complete KYC in under 10 minutes, and get your crypto payment API keys instantly. No sales calls. No lengthy onboarding.",
  },
  {
    title: "Accept Crypto Payments from Any Customer, Any Coin",
    desc: "Your customers pay in Bitcoin, Ethereum, USDT, or 50+ supported assets. ChainPay confirms, converts, and auto-settles to your bank all within seconds.",
  },
  {
    title: "Track Transactions and Withdraw to Bank in One Click",
    desc: "Monitor every transaction in your real-time dashboard. Withdraw fiat at any time with next-business-day bank transfers.",
  },
  {
    title: "Integrate ChainPay's Payment API in a Few Lines of Code",
    desc: "Add ChainPay's crypto payment API SDK to your codebase. Create payment intents, generate addresses, and receive webhooks — go live in minutes, not days.",
  },
];

const codeBlocks: Record<string, string> = {
  cURL: `curl -X POST https://sandbox-api.chainpay.biz/payments/request \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "value": 10,
    "description": "Payment description",
    "redirectUrl": "https://example.com/success?orderId=123",
    "notifyUrl": "https://api.example.com/orders/123"
  }''`,
  Python: `from chainpay import ChainPay

chainpay = ChainPay("YOUR_API_KEY")

chainpay.payments.create(
    amount=250.00,
    currency="USDT",
    order_id="12345",
    callback_url="https://yourdomain.com/webhook",
)`,
  PHP: `$chainpay = new \\ChainPay\\ChainPayClient('YOUR_API_KEY');

$payment = $chainpay->payments->create([
  'amount' => 250.00,
  'currency' => 'USDT',
  'order_id' => '12345',
  'callback_url' => 'https://yourdomain.com/webhook'
]);`,
};

export function CTA() {
  const [activeTab, setActiveTab] = useState<keyof typeof codeBlocks>("cURL");

  const highlightCode = (code: string, lang: string) => {
    return code.split("\n").map((line, idx) => {
      let html = line;
      if (lang === "Python") {
        html = line
          .replace(/(".*?")/g, '<span class="text-emerald-600 font-medium">$1</span>')
          .replace(/\b(from|import)\b/g, '<span class="text-purple-600 font-semibold">$1</span>')
          .replace(/\b(250\.00)\b/g, '<span class="text-orange-500 font-semibold">$1</span>');
      } else if (lang === "Node.Js") {
        html = line
          .replace(/('.*?')/g, '<span class="text-emerald-600 font-medium">$1</span>')
          .replace(/\b(const|require|await|new)\b/g, '<span class="text-purple-600 font-semibold">$1</span>')
          .replace(/\b(250\.00)\b/g, '<span class="text-orange-500 font-semibold">$1</span>');
      } else if (lang === "cURL") {
        html = line
          .replace(/(".*?"|'.*?')/g, '<span class="text-emerald-600 font-medium">$1</span>')
          .replace(/\b(curl)\b/g, '<span class="text-purple-600 font-semibold">$1</span>')
          .replace(/\b(250\.00)\b/g, '<span class="text-orange-500 font-semibold">$1</span>');
      } else if (lang === "PHP") {
        html = line
          .replace(/('.*?')/g, '<span class="text-emerald-600 font-medium">$1</span>')
          .replace(/\b(new)\b/g, '<span class="text-purple-600 font-semibold">$1</span>')
          .replace(/\b(250\.00)\b/g, '<span class="text-orange-500 font-semibold">$1</span>');
      }
      return <div key={idx} dangerouslySetInnerHTML={{ __html: html || "&nbsp;" }} />;
    });
  };

  return (
    <section className="relative mx-auto max-w-7xl px-4 sm:px-6 py-20 md:py-28 overflow-hidden">
      <div className="grid lg:grid-cols-12 gap-12 lg:gap-16 items-center w-full">
        {/* Left Side */}
        <div className="lg:col-span-7 space-y-12 sm:space-y-16 w-full min-w-0">
          <h2 className="text-3xl min-[360px]:text-4xl md:text-5xl font-bold text-slate-900 tracking-tight leading-tight">
            Accept Crypto Payments in <br className="hidden sm:inline" />
            Minutes <span className="text-blue-600">No Complex Setup</span>
          </h2>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 w-full">
            {cards.map((c, i) => (
              <div
                key={i}
                className="group relative bg-white border border-slate-200/60 rounded-3xl p-4 min-[360px]:p-5 sm:p-6 shadow-sm transition-all duration-300 hover:bg-blue-50/70 hover:border-blue-200/60 hover:-translate-y-1 hover:shadow-xl flex flex-col justify-between cursor-pointer"
              >
                <div>
                  <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-blue-600 leading-snug transition-colors duration-200">
                    {c.title}
                  </h3>
                  <div className="w-full border-t border-slate-100 group-hover:border-blue-200/50 my-3 sm:my-4 transition-colors duration-200" />
                  <p className="text-slate-500 group-hover:text-slate-600 text-xs sm:text-sm leading-relaxed transition-colors duration-200">
                    {c.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-5 w-full min-w-0">
          <div className="bg-white border border-slate-200/60 rounded-3xl p-4 min-[360px]:p-6 sm:p-8 shadow-xl flex flex-col justify-between min-h-[350px]">
            <div>
              {/* Tab Selector */}
              <div className="flex items-center gap-2 sm:gap-4 pb-4 border-b border-slate-100 mb-6">
                {(Object.keys(codeBlocks) as Array<keyof typeof codeBlocks>).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-3 py-1.5 text-sm font-semibold rounded-full transition-all duration-200 cursor-pointer ${activeTab === tab
                      ? "bg-blue-50 text-blue-600"
                      : "text-slate-500 hover:text-slate-800"
                      }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Code Block */}
              <div className="font-mono text-[11px] sm:text-xs md:text-sm leading-relaxed text-slate-800 overflow-x-auto min-h-[190px] whitespace-pre p-2 scrollbar-none">
                {highlightCode(codeBlocks[activeTab], activeTab)}
              </div>
            </div>

            {/* Run in Sandbox Button */}
            <div className="mt-6 flex justify-start">
              <Button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl py-2 px-5 text-sm shadow-md shadow-blue-600/10 cursor-pointer transition-all duration-200 hover:scale-105">
                Run in Sandbox
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
