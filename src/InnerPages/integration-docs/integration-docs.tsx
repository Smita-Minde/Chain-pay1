"use client";

import { useState, useRef } from "react";
import {
  Code2,
  KeyRound,
  Wallet,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Webhook,
  Shield,
  ExternalLink,
  Globe,
  Settings,
  Lock,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";

const Github = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

const steps = [
  {
    title: "Create Account",
    icon: CreditCard,
    content: "Register a ChainPay merchant account and access the dashboard.",
  },
  {
    title: "Configure Wallets",
    icon: Wallet,
    content: "Set up wallet addresses where crypto payments will be received.",
  },
  {
    title: "Generate API Key",
    icon: KeyRound,
    content: "Create a secure API key and store it safely on your backend.",
  },
  {
    title: "Start Accepting Payments",
    icon: CheckCircle2,
    content: "Create payment requests and redirect customers to checkout.",
  },
];

export default function IntegrationGuidePage() {
  const [activeSection, setActiveSection] = useState("overview");
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scrollNav = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const menuItems = [
    { id: "overview", label: "Overview" },
    { id: "setup", label: "Setup" },
    { id: "apiKeys", label: "API Keys" },
    { id: "createPayment", label: "Create Payment" },
    { id: "webhook", label: "Webhook" },
    { id: "github", label: "GitHub" },
  ];

  const renderSectionContent = () => {
    switch (activeSection) {
      case "overview":
        return (
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-8">
              Checkout Payments is the easiest way to start accepting cryptocurrency payments on your website or application.
              With this method, ChainPay handles the entire payment interface for you, including multi-currency selection, real-time status updates, and secure hosted payment pages.
            </p>
            <p className="text-lg text-slate-600 leading-8">
              This means you do not have to build your own complex payment flow or deal with the intricacies of blockchain interactions. All you need to do is handle the final webhook payment notification.
            </p>

            <div className="bg-blue-50/50 border border-blue-100/60 rounded-2xl p-5 mt-6 text-sm text-blue-800 flex items-center gap-3">
              <span className="bg-blue-600 text-white font-bold px-2.5 py-1 rounded-lg text-xs">Estimated Integration</span>
              <span className="font-medium">5–10 minutes for a basic setup.</span>
            </div>

            <h3 className="text-2xl font-bold text-slate-900 mt-8 mb-4 pt-2">Step-by-step Integration</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {steps.map((step, idx) => {
                const Icon = step.icon;
                return (
                  <div key={idx} className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">
                    <div className="flex items-center gap-3 mb-3">
                      <span className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-600 font-bold text-sm">
                        {idx + 1}
                      </span>
                      <Icon className="h-5 w-5 text-slate-700" />
                      <h4 className="font-bold text-slate-800">{step.title}</h4>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed">{step.content}</p>
                  </div>
                );
              })}
            </div>
          </div>
        );

      case "setup":
        return (
          <div className="space-y-8">
            <div className="border-l-4 border-blue-600 pl-6 space-y-3">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Step 1
              </div>
              <h3 className="text-xl font-bold text-slate-900">Create a ChainPay Account</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                To get started, you will need a ChainPay merchant account. Visit the register page to sign up:
              </p>
              <div className="flex flex-wrap gap-4 pt-2 font-medium">
                <a href="https://sandbox.chainpay.biz/register" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800">
                  Sandbox Dashboard <ExternalLink size={14} />
                </a>
                <span className="text-slate-300">|</span>
                <a href="https://chainpay.biz/register" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800">
                  Production Dashboard <ExternalLink size={14} />
                </a>
              </div>
              <p className="text-slate-600 leading-relaxed text-sm">
                Once registered, you will have access to the ChainPay dashboard where you can configure wallet settings, generate API keys, and track transactions.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6 space-y-3">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Step 2
              </div>
              <h3 className="text-xl font-bold text-slate-900">Configure Addresses</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                In the dashboard, navigate to the <span className="font-semibold text-slate-800">‘Set Up Addresses’</span> section and configure the cryptocurrency wallet addresses where you want to receive your payments.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6 space-y-3">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Step 3
              </div>
              <h3 className="text-xl font-bold text-slate-900">Configure Payment Settings</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                Go to <span className="font-semibold text-slate-800">‘Payment Settings’</span> in your dashboard and configure:
              </p>
              <ul className="list-disc pl-5 text-slate-600 space-y-2 text-base">
                <li>The default FIAT currency you want to use for price conversions (USD, INR, etc.).</li>
                <li>Customize checkout pages with your brand name, logo, and colors to match your brand identity.</li>
              </ul>
            </div>
          </div>
        );

      case "apiKeys":
        return (
          <div className="space-y-6">
            <div className="border-l-4 border-blue-600 pl-6 space-y-3">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                Step 4
              </div>
              <h3 className="text-xl font-bold text-slate-900">Generate API Key</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                ChainPay uses API keys to authenticate all requests. To generate a key:
              </p>
              <ol className="list-decimal pl-5 text-slate-600 space-y-2 text-base">
                <li>Navigate to the <span className="font-semibold text-slate-800">‘API Keys’</span> section in your dashboard.</li>
                <li>Click <span className="font-semibold text-slate-800">‘Generate New API Key’</span>.</li>
                <li>Copy the generated key and store it securely.</li>
              </ol>
            </div>

            <div className="p-5 rounded-2xl bg-amber-50 border border-amber-200 text-amber-800 flex gap-4 mt-6">
              <Shield className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-semibold text-amber-900 block mb-1">Security Warning</strong>
                <p className="text-sm leading-relaxed">
                  Do not expose this key in client-side code or public repositories. Keep it in a secure location such as environment variables (e.g. <code className="bg-amber-100/80 px-1 py-0.5 rounded text-amber-900 font-mono text-xs">CHAINPAY_API_KEY</code>) on your server backend.
                </p>
                <p className="text-sm leading-relaxed mt-2">
                  If you suspect that your key has been compromised, rotate it immediately in the dashboard.
                </p>
              </div>
            </div>
          </div>
        );

      case "createPayment":
        return (
          <div className="space-y-8">
            <div className="border-l-4 border-blue-600 pl-6 space-y-4">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                API Step 1
              </div>
              <h3 className="text-xl font-bold text-slate-900">Create a Payment Request</h3>
              <p className="text-slate-600 leading-relaxed">
                To create a payment, send a POST request to the ChainPay Checkout API. This request will return a unique payment URL for the customer.
              </p>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Endpoint</span>
                <div className="flex items-center gap-3 bg-slate-900 text-white rounded-xl px-4 py-3 font-mono text-sm overflow-x-auto">
                  <span className="bg-green-500 text-slate-900 font-bold px-2.5 py-1 rounded-md text-xs">POST</span>
                  <span className="text-slate-300">https://sandbox-api.chainpay.biz/payments/request</span>
                </div>
              </div>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Request Example Body</span>
                <pre className="rounded-xl bg-slate-900 p-5 text-sm text-green-400 overflow-x-auto font-mono">
                  {`{
  "value": 10, // Amount in fiat to receive (Required)
  "description": "Deposit in wallet", // Optional description
  "redirectUrl": "https://example.com/success?order_id=123", // Required
  "notifyUrl": "https://api.example.com/webhook?order_id=123" // Optional but recommended
}`}
                </pre>
              </div>

              <p className="text-sm text-slate-500 leading-relaxed">
                The <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">value</code> field defines the amount you expect to receive in your default FIAT currency. You can pass any additional tracking identifiers such as <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">order_id</code> or <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">user_id</code> in parameters.
              </p>

              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Response Example JSON</span>
                <pre className="rounded-xl bg-slate-900 p-5 text-sm text-sky-400 overflow-x-auto font-mono">
                  {`{
  "token": "fG78jtx96ugjtu0eIbeLmFB9z0feJf9N",
  "successToken": "fG78jtx96ugjtu0eIbeLmFB9z0feJf9NfG78jtx96ugjtu0eIbeLmFB9z0feJf9N",
  "paymentUrl": "https://sandbox-pay.chainpay.biz/payment/fG78jtx96ugjtu0eIbeLmFB9z0feJf9N"
}`}
                </pre>
              </div>
            </div>

            <div className="border-l-4 border-blue-600 pl-6 space-y-3">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                API Step 2
              </div>
              <h3 className="text-xl font-bold text-slate-900">Redirect the Customer</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                Once you receive the <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">paymentUrl</code> from the API response, redirect your customer to it. The hosted checkout page will handle currency selection, wallet address generation, and transaction monitoring. You do not need to build any front-end interface.
              </p>
            </div>

            <div className="border-l-4 border-blue-600 pl-6 space-y-3">
              <div className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-100 text-blue-800">
                API Step 3
              </div>
              <h3 className="text-xl font-bold text-slate-900">Handle the Webhook</h3>
              <p className="text-slate-600 leading-relaxed text-base">
                When a payment is completed, ChainPay will send a POST request to your <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">notifyUrl</code>. Your server should:
              </p>
              <ul className="list-disc pl-5 text-slate-600 space-y-2 text-base">
                <li>Verify that the <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">successToken</code> matches the one you received in the payment creation step.</li>
                <li>Mark the order as paid in your database.</li>
                <li>Respond with <code className="bg-slate-100 px-1 py-0.5 rounded font-mono text-xs">"ok"</code> and HTTP status code 200 as quickly as possible.</li>
              </ul>
            </div>
          </div>
        );

      case "webhook":
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 bg-blue-50 border border-blue-100 rounded-2xl p-5 mb-6 text-blue-800">
              <Webhook className="h-6 w-6 text-blue-600" />
              <p className="font-semibold text-sm">Webhooks enable real-time order updates.</p>
            </div>
            <p className="text-lg text-slate-600 leading-8">
              Receive payment confirmation notifications via webhook and mark orders as paid instantly in your store or backend application.
            </p>
          </div>
        );

      case "github":
        return (
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-8">
              Access our GitHub repository to find fully working integration examples in Node.js, Python, PHP, and other languages.
            </p>
            <div className="pt-4">
              <a href="https://github.com/ChainpayBiz/chainpay-example-integration" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 bg-slate-900 hover:bg-slate-800 text-white px-6 py-3.5 rounded-xl font-medium shadow-md transition-colors">
                <Github size={20} />
                Open chainpay-example-integration
                <ExternalLink size={16} className="text-slate-400" />
              </a>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <main className="bg-[#F7F8FC] min-h-screen relative">
      {/* Background Glow */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-300/20 blur-[120px] rounded-full" />
        <div className="absolute right-0 top-40 w-[400px] h-[400px] bg-indigo-300/20 blur-[120px] rounded-full" />
      </div>

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-8 pb-10 lg:pt-10 lg:pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="flex flex-col items-start text-left">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium shadow-sm">
              Developer Documentation
            </span>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
              Checkout Payments
              <span className="block text-blue-600">Integration Guide</span>
            </h1>

            <p className="mt-6 text-lg sm:text-xl text-slate-600 leading-relaxed">
              Accept cryptocurrency payments in minutes using ChainPay hosted checkout pages. No blockchain complexity. No custom payment UI required.
            </p>

            <div className="flex flex-wrap gap-4 mt-8 lg:mt-10">
              <Link href="/login" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-2 font-medium shadow-lg hover:shadow-xl transition-all duration-200">
                Start Integration
                <ArrowRight size={18} />
              </Link>

              <Link href="/login" className="bg-white hover:bg-slate-50 px-8 py-4 rounded-xl border border-slate-200 font-medium transition-colors">
                View API Docs
              </Link>
            </div>
          </div>

          {/* Flow Visualization */}
          <div className="bg-white rounded-[32px] sm:rounded-[40px] p-6 shadow-xl border border-slate-100/50 w-full">
            <div className="space-y-3">
              {[
                "Merchant Website",
                "Create Payment Request",
                "Hosted Checkout",
                "Payment Success",
                "Webhook Notification",
              ].map((item, index) => (
                <div key={item}>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl py-3.5 px-5 font-semibold text-slate-800 text-sm flex items-center justify-between shadow-sm">
                    <span className="flex items-center gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600 font-bold text-xs">
                        {index + 1}
                      </span>
                      {item}
                    </span>
                  </div>

                  {index !== 4 && (
                    <div className="flex justify-center py-1 text-blue-500 font-bold text-lg animate-pulse">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 pt-4 lg:pt-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8 lg:gap-10">

          {/* SIDEBAR (Desktop only) */}
          <aside className="sticky top-24 h-fit hidden lg:block self-start">
            <div className="bg-white rounded-3xl p-6 shadow-lg border border-slate-100/50">
              <h3 className="font-bold text-slate-800 mb-5 text-lg">Documentation</h3>

              <div className="space-y-3">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl transition-all font-medium
                      ${activeSection === item.id
                        ? "bg-blue-600 text-white shadow-md shadow-blue-500/20"
                        : "hover:bg-blue-50 text-slate-700"
                      }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* Mobile/Tablet Sticky Navigation Bar */}
          <div className="lg:hidden sticky top-20 z-30 flex items-center gap-2 w-full mb-4">
            {/* Left Scroll Button */}
            <button
              onClick={() => scrollNav("left")}
              className="flex items-center justify-center h-10 w-10 shrink-0 rounded-xl border border-slate-100 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll left"
            >
              <ChevronLeft size={16} />
            </button>

            {/* Scrollable container */}
            <div
              ref={scrollContainerRef}
              className="flex-1 bg-white/95 backdrop-blur-md border border-slate-100 rounded-xl px-4 py-3.5 overflow-x-auto scrollbar-none shadow-sm"
            >
              <nav className="flex space-x-6 text-sm font-semibold text-slate-600 whitespace-nowrap">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className={`transition-colors hover:text-blue-600 ${activeSection === item.id ? "text-blue-600 font-bold" : ""}`}
                  >
                    {item.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Right Scroll Button */}
            <button
              onClick={() => scrollNav("right")}
              className="flex items-center justify-center h-10 w-10 shrink-0 rounded-xl border border-slate-100 bg-white text-slate-500 shadow-sm hover:bg-slate-50 hover:text-blue-600 transition-all active:scale-95 cursor-pointer"
              aria-label="Scroll right"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          {/* CONTENT */}
          <div className="space-y-8">
            <div className="bg-white rounded-[32px] sm:rounded-[36px] p-6 sm:p-10 shadow-lg border border-slate-100/50 min-h-[550px] flex flex-col">
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                {menuItems.find(item => item.id === activeSection)?.label}
              </h2>

              <div className="text-base sm:text-lg leading-8 sm:leading-9 text-slate-600">
                {renderSectionContent()}
              </div>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}
