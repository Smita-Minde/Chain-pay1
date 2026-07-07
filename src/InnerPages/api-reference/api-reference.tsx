"use client";

import { useRef, useState, useEffect } from "react";
import { StubPage } from "@/components/hero/Stubpage/StubPage";


// app/api-reference/page.tsx

import {
  Shield,
  CreditCard,
  Webhook,
  Database,
  Key,
  ArrowRight,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const menuItems = [
  { id: "overview", label: "Overview" },
  { id: "environments", label: "Environments" },
  { id: "getting-started", label: "Getting Started" },
  { id: "auth", label: "Authentication" },
  { id: "payment", label: "Create Payment" },
  { id: "options", label: "Payment Options" },
  { id: "payment-specific-details", label: "Payment Specific Details" },
  { id: "status", label: "Payment Status" },
  { id: "logs", label: "Payment Logs" },
  { id: "webhooks", label: "Webhooks" },
  { id: "redirect-on-success", label: "Redirect on Success" },
  { id: "error-handling", label: "Error Handling" },
  { id: "testing", label: "Testing" },
  { id: "other-api-references", label: "Other Api References" },
  { id: "summery", label: "Summery" },
];

export default function ApiReferencePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [activeSection, setActiveSection] = useState("overview");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 220;
      let active = "overview";

      for (const item of menuItems) {
        const el = document.getElementById(item.id);
        if (el) {
          const top = el.getBoundingClientRect().top + window.scrollY;
          if (scrollPosition >= top) {
            active = item.id;
          }
        }
      }
      setActiveSection(active);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollNav = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 150;
      scrollContainerRef.current.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="min-h-screen bg-[#f8faff] relative">
      {/* Glow Background */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-32 left-1/4 h-[500px] w-[500px] rounded-full bg-blue-300/20 blur-[120px]" />
        <div className="absolute top-[600px] right-20 h-[400px] w-[400px] rounded-full bg-purple-300/20 blur-[120px]" />
      </div>

      {/* Hero */}
      {/* <section className="relative z-10 max-w-7xl mx-auto px-6 pt-16 pb-6 lg:pb-16"> */}
      {/* <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center"> */}
      {/* Left Column: Content */}
      {/* <div className="lg:col-span-7 flex flex-col items-start text-left">
            <div className="inline-flex items-center rounded-full border border-blue-200 bg-white px-5 py-2 text-sm font-medium text-blue-600 shadow-sm">
              ChainPay API Reference
            </div>

            <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-slate-900 tracking-tight">
              Build Crypto Payments
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                With Simple APIs
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg sm:text-xl text-slate-600 leading-relaxed">
              Create payment requests, monitor transactions,
              receive webhooks and integrate crypto payments
              in minutes.
            </p>

            <div className="mt-8">
              <Link
                href="/login"
                className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-6 py-3 text-white font-medium shadow-lg hover:bg-blue-700 hover:shadow-xl transition-all duration-200"
              >
                Get API Key
              </Link>
            </div>
          </div> */}

      {/* Right Column: Image */}
      {/* <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
            <div className="relative w-full max-w-[480px] rounded-3xl overflow-hidden shadow-xl border border-slate-100 bg-white p-2">
              <Image
                src="/api-image.jpg"
                alt="api-image"
                width={500}
                height={300}
                className="w-full h-auto rounded-2xl object-cover"
                priority
              />
            </div>
          </div> */}
      {/* </div> */}
      {/* </section> */}

      {/* Main Docs */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pt-4 lg:pt-12 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

          {/* Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 xl:col-span-2">
            <div className="sticky top-24 rounded-3xl bg-white p-4 shadow-sm border border-slate-100/50 max-h-[calc(100vh-120px)] overflow-y-auto scrollbar-none">
              <nav className="space-y-1.5 text-sm">
                {menuItems.map((item) => (
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`block px-3 py-2 rounded-xl text-sm transition-all duration-200 border-l-2 font-medium ${activeSection === item.id
                      ? "border-blue-600 text-blue-600 font-semibold bg-blue-50/50 shadow-sm"
                      : "border-transparent text-slate-600 hover:text-blue-600 hover:border-slate-200 hover:bg-slate-50/30"
                      }`}
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Mobile/Tablet Sticky Navigation Bar */}
          <div className="col-span-1 lg:col-span-12 lg:hidden sticky top-20 z-30 flex items-center gap-2 w-full mb-4">
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
                  <a
                    key={item.id}
                    href={`#${item.id}`}
                    className={`transition-colors duration-200 font-medium pb-0.5 border-b-2 ${activeSection === item.id
                      ? "text-blue-600 font-semibold border-blue-600"
                      : "text-slate-600 hover:text-blue-600 border-transparent"
                      }`}
                  >
                    {item.label}
                  </a>
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

          {/* Content */}
          <div className="col-span-1 lg:col-span-9 xl:col-span-7 min-w-0 space-y-12">

            <section
              id="overview"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Overview
              </h2>

              <p className="mt-4 text-slate-600 leading-8 text-base sm:text-lg">
                The ChainPay allows merchants to seamlessly accept cryptocurrency payments across multiple blockchains. Merchants can create payment requests (intents), display supported crypto options, and receive real-time webhook notifications upon payment confirmation.<br /><br />

                This document provides all required endpoints and integration steps for using ChainPay in your system.
              </p>
            </section>


            <section
              id="environments"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Environments
              </h2>

              <ul className="list-disc pl-5 text-slate-600 space-y-2 text-base">
                <li>Sandbox Dashboard: <a href="https://sandbox.chainpay.biz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://sandbox.chainpay.biz</a></li>
                <li>Sandbox API Base URL:<span className="text-black">https://sandbox-api.chainpay.biz</span></li>
                <li>Production Dashboard: <a href="https://chainpay.biz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://chainpay.biz</a></li>
                <li>Production API Base URL: <span className="text-black">https://api.chainpay.biz</span></li>
              </ul>
            </section>

            <section
              id="getting-started"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Getting Started
              </h2>

              <p className="mt-4 text-slate-600 leading-8 text-base sm:text-lg">
                Follow the steps below to integrate ChainPay into your application:<br />

                1. Log in to <a href="https://sandbox.chainpay.biz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">https://sandbox.chainpay.biz </a>, <br />for production use, <a href="https://chainpay.biz" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> https://chainpay.biz </a><br />
                2. Navigate to <span className="font-semibold text-slate-800">Api Keys</span> in your dashboard.<br />
                3. Generate a new <span className="font-semibold text-slate-800">API_KEY</span>.  <br />
                4. Configure supported <span className="font-semibold text-slate-800">blockchains</span>  and <span className="font-semibold text-slate-800">cryptocurrencies</span> from your merchant settings.

              </p>
            </section>

            <section
              id="auth"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <Key className="h-6 w-6 text-blue-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Authentication
                </h2>
              </div>

              <p className="mt-4 text-slate-600 text-base sm:text-lg">
                Every request requires the
                x-api-key header.
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-green-400 overflow-x-auto font-mono">
                {`curl -X GET "https://sandbox-api.chainpay.biz/payments/{token}/logs" \
  -H x-api-key: YOUR_API_KEY"`}
              </pre>
            </section>

            <section
              id="payment"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <CreditCard className="h-6 w-6 text-blue-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Create Payment Request (intent)
                </h2>
              </div>

              <div className="mt-6 inline-flex rounded-full bg-green-100 px-4 py-2 text-green-700 text-sm font-semibold">
                POST https://sandbox-api.chainpay.biz/payments/request
              </div>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Headers
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                {`x-api-key: YOUR_API_KEY
Content-Type: application/json`}
              </pre>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Example Payload
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                {`{ "value": 10,
  "description": "Payment description",
  "redirectUrl": "https://example.com/success?orderId=123",
  "notifyUrl": "https://api.example.com/orders/123"
}`}
              </pre>

              <div className="mt-8 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-800 font-semibold">
                      <th className="px-6 py-4 font-bold text-slate-700">Field</th>
                      <th className="px-6 py-4 font-bold text-slate-700">Type</th>
                      <th className="px-6 py-4 font-bold text-slate-700">Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80">
                    <tr className="hover:bg-blue-100/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">value</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-md">
                          Number
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed">
                        Amount in fiat (e.g. USD).
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-100/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">description</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold text-sky-700 bg-sky-50 border border-sky-100 rounded-md">
                          String
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed">
                        Description of the payment.
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-100/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">redirectUrl</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold text-sky-700 bg-sky-50 border border-sky-100 rounded-md">
                          String
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed">
                        URL to redirect the user upon successful payment.
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-100/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">notifyUrl</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold text-sky-700 bg-sky-50 border border-sky-100 rounded-md">
                          String
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed">
                        Webhook endpoint to receive payment updates.
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Example response
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                {`{  "token": "rVZAZtNMIBxuhcU9jkw1ahffOzelndea",
  "successToken": "6qBUKIbmvNNr8ofEWK9ik89sSvPN2tyiAmV6f4hvB9eQP8Ue9l5HrEBmo6aK7Pja",
  "paymentUrl": "https://sandbox-pay.chainpay.biz/payment/rVZAZtNMIBxuhcU9jkw1ahffOzelndea"
}`}
              </pre>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Note: Keep the <span className="font-semibold text-green-600">successToken</span> secure — it will be required to authenticate webhook requests.
              </p>

            </section>

            <section
              id="options"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Retrieve Available Payment Options
              </h2>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Endpoint
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                {` GET https://sandbox-api.chainpay.biz/payments/{payment_token}`}
              </pre>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Example response
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                {`{
  "business": {
    "name": "Test Merchant",
    "logo": "https://sandbox-api.chainpay.biz/storage/merchant/business/logo/de37d304176a484812142ec46dc322c2.jpeg"
  },
  "isPaid": false,
  "isExpired": false,
  "isPartial": false,
  "description": "Test",
  "expireAt": "2025-10-10T10:09:50.849Z",
  "createdAt": "2025-10-10T09:09:50.850Z",
  "fiatValue": "10",
  "fiatCurrency": {
    "name": "US Dollar",
    "symbol": "USD",
    "sign": "$"
  },
  "options": [
    {
      "name": "BNB",
      "displayName": "BNB (BEP20)",
      "logo": "https://sandbox-api.chainpay.biz/static/img/logos/bnb.png",
      "symbol": "BEP20_BNB",
      "value": "0.007898901521076995",
      "fiatValue": "10.00000000000000001"
    },
    {
      "name": "USDT",
      "displayName": "USDT (BEP20)",
      "logo": "https://sandbox-api.chainpay.biz/static/img/logos/bnb_usdt.png",
      "symbol": "BEP20_USDT",
      "value": "9.995416473620838367",
      "fiatValue": "10"
    }
  ]
}`}
              </pre>
            </section>

            <section
              id="payment-specific-details"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Retrieve Details of specific Payment Options
              </h2>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Endpoint
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                {` GET https://sandbox-api.chainpay.biz/payments/{payment_token}/options/{payment_option_symbol}`}
              </pre>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Example response
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                {`{
{
  "addressIn": "0x8C15Ab63F9c45a19ba72513864aEB0f14F14b9c1",
  "value": "0.007898901521076995",
  "fiatValue": "10.00000000000000001",
  "minTxnValue": "0.001",
  "qrCode": "data:image/png;base64,iVBORw...",
  "qrCodeWithValue": "data:image/png;base64,iVBORw..."
}
}`}
              </pre>

              <p className="mt-6 text-black-600 text-base sm:text-lg font-semibold">
                This response includes the <span className="font-semibold text-green-600">Wallet address,amount to pay,</span> and  <span className="font-semibold text-green-600">QR Code</span> for convenient user payments.
              </p>

            </section>


            <section
              id="status"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Check Payment Status
              </h2>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Endpoint
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                {` GET https://sandbox-api.chainpay.biz/payments/{payment_token}/status`}
              </pre>

              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Example response
              </p>

              <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                {`{
{
  "isPaid": false,
  "isExpired": false,
  "isPartial": false,
  "options": {
    "bep20_bnb": {
      "valuePaid": "0.0",
      "valueOutstanding": "0.007898901521076995",
      "fiatValuePaid": "0",
      "fiatValueOutstanding": "10.00000000000000001"
    },
    "bep20_usdt": {
      "valuePaid": "0.0",
      "valueOutstanding": "9.995416473620838367",
      "fiatValuePaid": "0",
      "fiatValueOutstanding": "10"
    }
  }
}
}`}
              </pre>

              <p className="mt-6 text-black-600 text-base sm:text-lg font-semibold">
                Use this endpoint to poll payment status if webhook confirmation is delayed.
              </p>

              {/* <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-green-50 border border-green-100 rounded-2xl p-5 font-semibold text-green-800">
                  Paid
                </div>

                <div className="bg-yellow-50 border border-yellow-100 rounded-2xl p-5 font-semibold text-yellow-800">
                  Partial
                </div>

                <div className="bg-red-50 border border-red-100 rounded-2xl p-5 font-semibold text-red-800">
                  Expired
                </div>
              </div> */}
            </section>

            <section
              id="logs"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-2xl hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-purple-500/10 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <Database className="h-6 w-6 text-blue-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Retrieve Payment Logs
                </h2>
              </div>

              <div className="mt-8 border-l-4 border-blue-200 pl-6 space-y-8">
                <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                  Endpoint
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">
                  <h4 className="font-bold text-slate-800">
                    {/* <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono"> */}
                    {`GET https://sandbox-api.chainpay.biz/payments/{payment_token}/logs`}
                    {/* </pre> */}
                  </h4>
                </div>
                <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                  Headers
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">
                  <h4 className="font-bold text-slate-800">
                    {`x-api-key: YOUR_API_KEY`}
                  </h4>
                </div>

                <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                  Example response
                </p>
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200">
                  <h4 className="font-bold text-slate-800">
                    <pre className="mt-6 rounded-xl bg-slate-900 p-5 text-sm text-white overflow-x-auto font-mono">
                      {`{
{
  "isPaid": false,
  "isExpired": false,
  "isPartial": false,
  "options": {
    "bep20_bnb": {
      "valuePaid": "0.0",
      "valueOutstanding": "0.007898901521076995",
      "fiatValuePaid": "0",
      "fiatValueOutstanding": "10.00000000000000001"
    },
    "bep20_usdt": {
      "valuePaid": "0.0",
      "valueOutstanding": "9.995416473620838367",
      "fiatValuePaid": "0",
      "fiatValueOutstanding": "10"
    }
  }
}
}`}
                    </pre>
                  </h4>
                </div>
              </div>

              <p className="mt-6 text-black-600 text-base sm:text-lg font-semibold">
                This provides complete insight into received payments and webhook delivery history.
              </p>
            </section>

            <section
              id="webhooks"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-6">
                <Webhook className="h-6 w-6 text-blue-600" />
                <h2 className="text-3xl sm:text-4xl font-bold text-slate-900">
                  Webhooks
                </h2>
              </div>

              <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200 font-semibold text-slate-800">
                  When a payment is confirmed, ChainPay automatically triggers aPOST request to your <span className="font-semibold text-green-600">notifyUrl</span> with the payment details. Your server should:
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200 font-semibold text-slate-800">
                  -Verify the <span className="font-semibold text-green-600">successToken</span> matches the one you received in the payment creation step.
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200 font-semibold text-slate-800">
                  -Mark the order as paid in your database.
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 hover:shadow-md transition-all duration-200 font-semibold text-slate-800">
                  - Respond with "*ok" and HTTP status code 200 as quickly as possible.
                </div>
              </div>

              <p className="mt-6 text-black-600 text-base sm:text-lg font-semibold">
                For any long-running post-payment processes, queue them as background jobs to avoid delaying your webhook response.
              </p>
            </section>

            <section
              id="redirect-on-success"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Redirect on Success
              </h2>
              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Once a payment is marked as paid, the customer will be redirected to your configured redirectUrl, typically a success or order confirmation page.
              </p>
            </section>

            <section
              id="error-handling"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Error Handling
              </h2>
              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Common issues:
              </p>

              <ul className="list-disc pl-5 text-slate-600 space-y-2 text-base">
                <li>Funds stuck in address: Usually due to sending the wrong coin or using the wrong network. </li>
                <li>Transaction not confirmed: Caused by network congestion or low gas fees.</li>
                <li>API authentication errors: Caused by missing or invalid API keys.</li>
                <li>Webhook issues: Callback URL not accessible, server not responding, or SSL problems.</li>
              </ul>

              <p className="mt-6 text-black-600 text-base sm:text-lg font-semibold">
                For webhook reliability, whitelist ChainPay IPs on your firewall if configured:
              </p>

              <ul className="list-disc pl-5 text-slate-600 space-y-2 text-base">
                <li>Sandbox: 103.119.171.59</li>
                <li>Production: 45.198.14.124</li>

              </ul>

            </section>


            <section
              id="testing"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Testing
              </h2>
              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Before going live, test your integration in the ChainPay sandbox environment:
              </p>

              <ul className="list-disc pl-5 text-slate-600 space-y-2 text-base">
                <li>Ensure payment creation works as expected.</li>
                <li>Verify redirect to the hosted checkout page.</li>
                <li>Confirm that webhooks are received and processed.</li>
                <li>Ensure orders are updated correctly in your system.</li>
                <li>Notify customers after successful payment.</li>
              </ul>

              <p className="mt-6 text-black-600 text-base sm:text-lg font-semibold">
                For local webhook testing, use ngrok to expose your local server to the internet:
              </p>

              <p className="mt-6 text-black-600 text-base sm:text-lg font-semibold">
                ngrok http YOUR_LOCAL_PORT
              </p>

              Example test webhook URL:<a href=" https://abc12345.ngrok.io/webhook" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline"> https://abc12345.ngrok.io/webhook</a>


            </section>

            <section
              id="other-api-references"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Other Api References
              </h2>
              <p className="mt-6 text-black-900 text-base sm:text-lg font-semibold">
                Additional API endpoints you may find useful:
              </p>

              <ul className="list-disc pl-5 text-slate-600 space-y-2 text-base">
                <li>GET https://sandbox-api.chainpay.biz/networks – Fetch all supported blockchains with network info.</li>
                <li>GET https://sandbox-api.chainpay.biz/payments/options – Fetch all supported coins & tokens.</li>
                <li>GET https://sandbox-api.chainpay.biz/fiat-currencies – Fetch all supported fiat currencies.</li>

              </ul>

            </section>



            <section
              id="summery"
              className="scroll-mt-32 rounded-[32px] sm:rounded-[36px] bg-white p-6 sm:p-10 border border-slate-100/50 shadow-lg hover:bg-purple-50/70 hover:border-purple-300/80 hover:shadow-xl hover:shadow-purple-500/5 transition-all duration-300"
            >
              <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-6">
                Summery
              </h2>
              <div className="mt-8 overflow-x-auto border border-slate-100 rounded-2xl shadow-sm">
                <table className="w-full border-collapse text-left text-sm">
                  <thead>
                    <tr className="bg-slate-50/80 border-b border-slate-100 text-slate-800 font-semibold">
                      <th className="px-6 py-4 font-bold text-slate-700">Action</th>
                      <th className="px-6 py-4 font-bold text-slate-700">Method</th>
                      <th className="px-6 py-4 font-bold text-slate-700">Endpoint</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100/80">
                    <tr className="hover:bg-blue-100/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">Create payment request</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold text-amber-700 bg-amber-50 border border-amber-100 rounded-md">
                          POST
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed">
                        /payments/request
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-100/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">List payment options</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold text-sky-700 bg-sky-50 border border-sky-100 rounded-md">
                          GET
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed">
                        {/* /payments/{payment_token} */}
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-100/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">Get option details</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold text-sky-700 bg-sky-50 border border-sky-100 rounded-md">
                          GET
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed">
                        {/* /payments/{payment_token}/options/{symbol} */}
                      </td>
                    </tr>
                    <tr className="hover:bg-blue-100/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">Check payment status</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold text-sky-700 bg-sky-50 border border-sky-100 rounded-md">
                          GET
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed">
                        {/* /payments/{payment_token}/status */}
                      </td>
                    </tr>

                    <tr className="hover:bg-blue-100/70 transition-colors">
                      <td className="px-6 py-4 font-mono text-blue-600 font-semibold">Retrieve payment logs</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2.5 py-1 text-xs font-mono font-semibold text-sky-700 bg-sky-50 border border-sky-100 rounded-md">
                          GET
                        </span>
                      </td>
                      <td className="px-6 py-4 text-slate-600 leading-relaxed">
                        {/* /payments/{payment_token}/logs */}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>


            </section>
          </div>

          {/* Right API Example Panel */}
          <aside className="col-span-3 hidden xl:block">
            <div className="sticky top-24 rounded-[32px] bg-white p-6 shadow-lg border border-slate-100/50">
              <div className="mb-4 flex items-center justify-between">
                <span className="rounded-full bg-green-100 px-3 py-1 text-green-700 text-sm font-semibold">
                  Live Example
                </span>
              </div>

              <pre className="rounded-xl bg-slate-900 p-5 text-sm text-green-400 overflow-x-auto font-mono">
                {`{
  "token":"rVZAZ...",
  "successToken":"6qBUK...",
  "paymentUrl":
  "https://sandbox-pay.chainpay.biz/payment/..."
}`}
              </pre>

              <div className="mt-6 space-y-3">
                <div className="rounded-xl bg-blue-50 border border-blue-100 p-4 font-semibold text-blue-800 text-sm">
                  Sandbox Ready
                </div>

                <div className="rounded-xl bg-purple-50 border border-purple-100 p-4 font-semibold text-purple-800 text-sm">
                  Webhooks Enabled
                </div>

                <div className="rounded-xl bg-green-50 border border-green-100 p-4 font-semibold text-green-800 text-sm">
                  Multi-chain Support
                </div>
              </div>
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}




