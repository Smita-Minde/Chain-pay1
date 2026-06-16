"use client";
import { InteractiveBackground } from "@/components/hero/InteractiveBackground/InteractiveBackground";
import { Hero } from "@/components/hero/Hero/Hero";
import { Stats } from "@/components/hero/Stats/Stats";
import { Features } from "@/components/hero/Features/Features";

import { WhyChainPay } from "@/components/hero/WhyChainpay/WhyChainPay";
import { AdvancedFeatures } from "@/components/hero/Advancefeatures/AdvancedFeatures";
import { Testimonials } from "@/components/hero/testimonial/Testimonials";
import { CTA } from "@/components/hero/CTA/CTA";

// ({
//     head: () => ({
//         meta: [
//             { title: "ChainPay — Fast, Affordable & Developer-First Crypto Payment Gateway" },
//             { name: "description", content: "ChainPay is a next-generation crypto payment gateway built for simplicity, speed, and support. Ultra-low fees and seamless integration." },
//         ],
//     }),
//     component: Index,
// });

export default function Index() {
    return (
        <div className="relative min-h-screen overflow-hidden">
            <InteractiveBackground />
            <main>
                <Hero />
                <Stats />
                <Features />
                <WhyChainPay />
                <AdvancedFeatures />
                <Testimonials />
                <CTA />
            </main>
        </div>
    );
}
