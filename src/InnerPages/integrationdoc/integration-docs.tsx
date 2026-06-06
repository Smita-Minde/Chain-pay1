"use client";

import { useState } from "react";
import {
  Code2,
  KeyRound,
  Wallet,
  CreditCard,
  ArrowRight,
  CheckCircle2,
  Webhook,
} from "lucide-react";

const Github = (props: React.SVGProps<SVGSVGElement> & { size?: number }) => (
  <svg viewBox="0 0 24 24" width={props.size || 24} height={props.size || 24} stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
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
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="bg-[#F7F8FC] min-h-screen">
      {/* Background Glow */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-300/20 blur-[120px] rounded-full pointer-events-none" />
      <div className="fixed right-0 top-40 w-[400px] h-[400px] bg-indigo-300/20 blur-[120px] rounded-full pointer-events-none" />

      {/* HERO */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm">
              Developer Documentation
            </span>

            <h1 className="mt-8 text-6xl font-bold leading-tight text-slate-900">
              Checkout Payments
              <span className="block text-blue-600">Integration Guide</span>
            </h1>

            <p className="mt-6 text-xl text-slate-600">
              Accept cryptocurrency payments in minutes using ChainPay hosted checkout pages. No blockchain complexity. No custom payment UI required.
            </p>

            <div className="flex gap-4 mt-10">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center gap-2">
                Start Integration
                <ArrowRight size={18} />
              </button>

              <button className="bg-white px-8 py-4 rounded-xl border border-slate-200">
                View API Docs
              </button>
            </div>
          </div>

          {/* Flow Visualization */}
          <div className="bg-white rounded-[40px] p-10 shadow-xl">
            <div className="space-y-5">
              {[
                "Merchant Website",
                "Create Payment Request",
                "Hosted Checkout",
                "Payment Success",
                "Webhook Notification",
              ].map((item, index) => (
                <div key={item}>
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-5 font-medium">
                    {item}
                  </div>

                  {index !== 4 && (
                    <div className="flex justify-center py-2 text-blue-600 text-xl">↓</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        <div className="grid lg:grid-cols-[280px_1fr] gap-10">
          {/* SIDEBAR */}
          <aside className="sticky top-24 h-fit">
            <div className="bg-white rounded-3xl p-6 shadow-lg">
              <h3 className="font-bold mb-5">Documentation</h3>

              <div className="space-y-3">
                {["Overview", "Setup", "API Keys", "Create Payment", "Webhook", "GitHub"].map((item) => (
                  <button
                    key={item}
                    className="w-full text-left px-4 py-3 rounded-xl hover:bg-blue-50 transition"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </aside>

          {/* CONTENT */}
          <div className="space-y-16">
            {/* QUICK START */}
            <section>
              <h2 className="text-4xl font-bold mb-10">Quick Setup</h2>

              <div className="grid md:grid-cols-2 gap-6">
                {steps.map((step, index) => {
                  const Icon = step.icon;

                  return (
                    <button
                      key={step.title}
                      onClick={() => setActiveStep(index)}
                      className={`text-left p-6 rounded-3xl transition-all ${
                        activeStep === index
                          ? "bg-blue-600 text-white shadow-xl"
                          : "bg-white shadow-lg"
                      }`}
                    >
                      <Icon size={28} />

                      <h3 className="mt-4 text-xl font-semibold">{step.title}</h3>

                      <p className="mt-3 opacity-80">{step.content}</p>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* API REQUEST */}
            <section>
              <div className="flex items-center gap-3 mb-6">
                <Code2 className="text-blue-600" />
                <h2 className="text-4xl font-bold">Create Payment Request</h2>
              </div>

              <div className="bg-[#0F172A] text-white rounded-[32px] p-8 overflow-auto">
                <pre>
                  {`POST https://sandbox-api.chainpay.biz/payments/request

{
  "value": 10,
  "description": "Deposit in wallet",
  "redirectUrl": "https://example.com/success",
  "notifyUrl": "https://api.example.com/webhook"
}`}
                </pre>
              </div>
            </section>

            {/* RESPONSE */}
            <section>
              <h2 className="text-4xl font-bold mb-6">API Response</h2>

              <div className="bg-[#0F172A] text-green-400 rounded-[32px] p-8">
                <pre>
                  {`{
  "token": "fG78jtx96ugjtu0",
  "successToken": "fG78jtx96ug...",
  "paymentUrl": "https://sandbox-pay.chainpay.biz/payment/..."
}`}
                </pre>
              </div>
            </section>

            {/* WEBHOOK */}
            <section>
              <div className="flex items-center gap-3 mb-8">
                <Webhook className="text-blue-600" />
                <h2 className="text-4xl font-bold">Webhook Flow</h2>
              </div>

              <div className="grid md:grid-cols-4 gap-4">
                {["Payment Completed", "ChainPay", "Webhook", "Mark Order Paid"].map((item) => (
                  <div key={item} className="bg-white rounded-3xl p-6 shadow-lg text-center">
                    {item}
                  </div>
                ))}
              </div>
            </section>

            {/* GITHUB CTA */}
            <section>
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[40px] p-12 text-white">
                <Github size={48} />

                <h2 className="text-4xl font-bold mt-6">Example Integration</h2>

                <p className="mt-4 text-lg text-blue-100">
                  Explore our GitHub repository for a complete working integration example.
                </p>

                <button className="mt-8 bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold">
                  View GitHub Repository
                </button>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}
