import { Check } from "lucide-react";

type FeatureBlockProps = {
  eyebrow: string;
  title: string;
  description: string;
  bullets?: string[];
  imageUrl: string;
  imageAlt: string;
  reverse?: boolean;
};

export function FeatureBlock({
  eyebrow,
  title,
  description,
  bullets,
  imageUrl,
  imageAlt,
  reverse,
}: FeatureBlockProps) {
  return (
    <div
      className={`grid items-center gap-12 ${
        reverse ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"
      }`}
    >

      



      <div className={reverse ? "lg:order-2" : ""}>
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
        <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h3>
        <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>

        {bullets && (
          <ul className="mt-6 space-y-4">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-base">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary">
                  <Check className="h-3.5 w-3.5" strokeWidth={3} />
                </span>
                <span className="text-foreground/90">{b}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className={`relative ${reverse ? "lg:order-1" : ""}`}>
        <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/40 blur-2xl" />
        <div className="relative overflow-hidden rounded-2xl border border-primary/30 shadow-xl">
          <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
    </div>
  );
}

export function AdvancedFeatures() {
  return (
    <section className="mx-auto max-w-7xl space-y-24 px-6 py-24">
      <FeatureBlock 
        eyebrow="Control, Customization & Confirmation — All in One"
        title="Advanced Payment Experience with ChainPay"
        description="With ChainPay, your checkout page is an extension of your brand. Deliver a seamless & trusted experience by fully customizing the look & feel of your payment page."
        bullets={[
          "Add your logo, brand colors, and messaging",
          "White-label option for a fully branded interface",
          "Consistent user journey from start to payment",
        ]}
        imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
        imageAlt="Customizable checkout dashboard"
      />

      <FeatureBlock
          

        reverse
        eyebrow="Re-Confirmation System for Payments"
        title="Smart Re-Confirmation for Reliable Crypto Payments"
        description="ChainPay's re-confirmation system verifies each payment before marking it complete — ensuring no missed or false transactions. Ideal for high-value or time-sensitive operations where reliability is critical."
        imageUrl="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80"
        imageAlt="Crypto coins payment confirmation"
      />

      <FeatureBlock
        eyebrow="Real-Time Payment Intelligence"
        title="Seamless Payment Confirmation with IPN & APIs"
        description="Get notified instantly when a payment is received or confirmed using ChainPay's robust Instant Payment Notification (IPN) system and developer-ready APIs."
        bullets={[
          "Real-time updates via web-hooks or polling",
          "Easy to integrate into any backend system",
          "Supports both one-time and subscription payments",
        ]}
        imageUrl="https://thumbs.dreamstime.com/b/robotic-hand-showcases-digital-screen-indicating-successful-payment-highlighting-seamless-integration-technology-458243165.jpg"
        imageAlt="Person using a laptop for payments"
      />

      <FeatureBlock
        reverse
        eyebrow="Data-Rich Transactions Made Easy"
        title="Attach Custom Data to Every Crypto Payment"
        description="Easily include custom data like order IDs, customer references, or internal metadata when creating payment requests. Perfect for mapping and tracking transactions in your system."
        imageUrl="https://api.cryptocloud.plus/media/articles/img_1711711808.686591.jpg"
        imageAlt="Bitcoin tracking on phone"
      />

      <FeatureBlock
        eyebrow="Merchant Dashboard"
        title="All-in-One Merchant Dashboard for Crypto Payment Management"
        description="ChainPay offers a powerful dashboard tailored for merchants — giving you full visibility, control, and customization over your crypto payment operations."
        bullets={[
          "Track Sales & Generate Reports",
          "Manage API Keys with Ease",
          "Personalize your checkout pages and payment experience",
        ]}
        imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80"
        imageAlt="Analytics dashboard for crypto payments"
      />
    </section>
  );
}
