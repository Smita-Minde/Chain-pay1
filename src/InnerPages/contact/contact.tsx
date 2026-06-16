"use client";
import { StubPage } from "@/components/hero/Stubpage/StubPage";
import {
  MessageSquare,
  Code2,
  Handshake,
  Send,
} from "lucide-react";
import { useState } from "react";

export default function ContactPage() {

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://sandbox-api.chainpay.biz/contact-us",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      const data = await response.json();

      console.log("API Response:", data);

      if (response.ok) {
        alert("Message sent successfully");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <main className="relative overflow-hidden bg-[#f8faff]">
      {/* Background Glow */}
      <div className="absolute top-32 left-1/4 h-[600px] w-[600px] rounded-full bg-blue-400/15 blur-[140px]" />
      <div className="absolute top-24 right-0 h-[600px] w-[600px] rounded-full bg-purple-400/15 blur-[140px]" />

      {/* Hero Section */}
      <section className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 pt-12 sm:pt-16 lg:pt-12 pb-16 lg:pb-24">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 items-center lg:min-h-[640px]">
          {/* Left Column */}
          <div className="relative top-0 lg:-top-16 w-full min-w-0">
            {/* <span className="inline-flex items-center rounded-full border border-blue-200 bg-white px-5 py-2 text-blue-600 font-medium">
              Contact ChainPay
            </span> */}

            <h1 className="text-3xl min-[360px]:text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-[1.1] text-slate-900 tracking-tight">
              Let&apos;s Build The Future
              <br className="hidden sm:inline" />
              {" "}Of Crypto Payments{" "}
              <span className="inline-block lg:block bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 bg-clip-text text-transparent">
                Together
              </span>
            </h1>

            <p className="mt-6 max-w-lg text-base sm:text-lg text-slate-600 leading-relaxed">
              Have questions about integrations, partnerships, payments, or support? Our team is here to help you get started.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button className="w-full sm:w-auto rounded-xl bg-blue-600 px-8 py-4 text-white shadow-lg transition hover:scale-105 cursor-pointer">
                Contact Support
              </button>

              {/* <button className="rounded-xl border border-slate-300 px-8 py-4 text-slate-700 hover:bg-white">
                Developer Docs
              </button> */}
            </div>
          </div>

          {/* Right Contact Card */}
          <div className="relative w-full min-w-0">
            <div className="absolute inset-0 rounded-[40px] bg-gradient-to-r from-blue-200/30 to-purple-200/30 blur-3xl" />

            <div className="group relative top-0 lg:-top-16 rounded-3xl sm:rounded-[36px] border border-slate-100 bg-white p-5 sm:p-7 xl:p-8 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_80px_rgba(59,130,246,0.15)]">
              <div className="mb-6 flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="font-medium text-slate-700">
                  Contact Request
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4">
                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Full Name
                  </label>
                  <input
                    value={formData.fullname}
                    onChange={(e) => setFormData({ ...formData, fullname: e.target.value })}
                    type="text"
                    placeholder="Enter name"
                    className="w-full rounded-2xl border border-slate-200 px-5 py-3 sm:py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    E-mail
                  </label>
                  <input
                    type="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 px-5 py-3 sm:py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <div>
                  <label className="mb-1.5 block text-sm font-medium text-slate-700">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Write your message..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full rounded-2xl border border-slate-200 px-5 py-3 sm:py-3.5 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-100"
                  />
                </div>

                <button
                  type="submit"
                  className="flex w-full items-center justify-center gap-2 rounded-2xl bg-blue-600 py-3 sm:py-3.5 font-medium text-white shadow-lg transition hover:bg-blue-700 cursor-pointer"
                >
                  <Send size={18} />
                  Leave us a Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Support Cards */}
      {/* <section className="relative z-10 max-w-7xl mx-auto px-6 py-10">
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-[30px] bg-white p-8 shadow-sm">
              <MessageSquare className="h-10 w-10 text-blue-600" />

              <h3 className="mt-5 text-2xl font-semibold">
                General Support
              </h3>

              <p className="mt-3 text-slate-600">
                Questions about ChainPay and payment
                processing.
              </p>
            </div>

            <div className="rounded-[30px] bg-white p-8 shadow-sm">
              <Code2 className="h-10 w-10 text-purple-600" />

              <h3 className="mt-5 text-2xl font-semibold">
                Developer Support
              </h3>

              <p className="mt-3 text-slate-600">
                API integration and technical assistance.
              </p>
            </div>

            <div className="rounded-[30px] bg-white p-8 shadow-sm">
              <Handshake className="h-10 w-10 text-green-600" />

              <h3 className="mt-5 text-2xl font-semibold">
                Partnerships
              </h3>

              <p className="mt-3 text-slate-600">
                Business and enterprise collaboration
                inquiries.
              </p>
            </div>
          </div>
        </section> */}

      {/* Why Contact Us */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="group rounded-[36px] bg-white p-10 shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 border border-transparent hover:border-blue-100">
            <h2 className="text-4xl font-bold text-slate-900 transition-colors duration-300 group-hover:text-blue-600">
              Why Contact ChainPay?
            </h2>

            <p className="mt-5 text-lg text-slate-600">
              We help businesses integrate crypto payments quickly,
              securely, and globally.
            </p>
          </div>

          <div className="space-y-5">
            <div className="group rounded-[24px] bg-white p-6 shadow-sm border border-transparent transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-blue-50 hover:to-blue-100 hover:border-blue-200 hover:shadow-[0_20px_50px_rgba(59,130,246,0.18)]">
              <h3 className="font-semibold text-xl transition-all duration-300 group-hover:text-blue-600 group-hover:scale-105">
                ⚡ Fast Response
              </h3>

              <p className="mt-2 text-slate-600">
                Average reply within 24 hours.
              </p>
            </div>

            <div className="group rounded-[24px] bg-white p-6 shadow-sm border border-transparent transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-green-100 hover:border-green-200 hover:shadow-[0_20px_50px_rgba(34,197,94,0.18)]">
              <h3 className="font-semibold text-xl transition-all duration-300 group-hover:text-green-600 group-hover:scale-105">
                🔒 Secure Communication
              </h3>

              <p className="mt-2 text-slate-600">
                Enterprise-grade support and privacy.
              </p>
            </div>

            <div className="group rounded-[24px] bg-white p-6 shadow-sm border border-transparent transition-all duration-500 hover:-translate-y-2 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-100 hover:border-purple-200 hover:shadow-[0_20px_50px_rgba(168,85,247,0.18)]">
              <h3 className="font-semibold text-xl transition-all duration-300 group-hover:text-purple-600 group-hover:scale-105">
                🌍 Global Team
              </h3>

              <p className="mt-2 text-slate-600">
                Supporting merchants worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 pb-24">
        <div className="absolute inset-0 -z-10 rounded-[48px] bg-gradient-to-r from-blue-50 via-slate-50 to-purple-50" />
        <div className="overflow-hidden rounded-[40px] bg-gradient-to-r from-blue-600 to-purple-600 p-12 text-center text-white">
          <h2 className="text-4xl md:text-5xl font-bold">
            Ready to Accept Crypto Payments?
          </h2>

          <p className="mt-5 text-lg text-blue-100">
            Generate your API key and start integrating
            ChainPay today.
          </p>

          <div className="mt-8 flex justify-center gap-4">
            <button className="rounded-xl bg-white px-8 py-4 text-blue-600 font-medium">
              Get Started
            </button>

            <button className="rounded-xl border border-white/30 px-8 py-4">
              View Documentation
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}








