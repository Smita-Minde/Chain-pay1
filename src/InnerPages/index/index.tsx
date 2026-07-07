"use client";
import { InteractiveBackground } from "@/components/hero/InteractiveBackground/InteractiveBackground";
import { Hero } from "@/components/hero/Hero/Hero";
import { CTA } from "@/components/hero/CTA/CTA";
import Industries from "@/InnerPages/industries/industries";
import { Features } from "@/components/hero/Features/Features";

import { WhyChainPay } from "@/components/hero/WhyChainpay/WhyChainPay";
// import AdvancedFeatures from "@/components/hero/Advancefeatures/AdvancedFeatures";
import { Testimonials } from "@/components/hero/testimonial/Testimonials";


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
        <div className="relative min-h-screen overflow-x-clip">
            <InteractiveBackground />
            <main>
                <Hero />
                <CTA />
                <Industries />
                <Features />
                <WhyChainPay />
                {/* <AdvancedFeatures /> */}
                <Testimonials />

            </main>
        </div>
    );
}
