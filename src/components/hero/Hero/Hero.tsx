"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles, Bitcoin, Wallet, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";
import bnb from "@/Public/bnb-icon2_2x.png";
import trc20 from "@/Public/trc20.png";
import tron from "@/Public/tron.png";
import usdc from "@/Public/USDC.png";
import Tether from "@/Public/Tether-usdt.png";
import mstc from "@/Public/mstc.png";

const snippets: Record<string, string> = {
  cURL: `curl -X POST https://sandbox-api.chainpay.biz/payments/request \
  -H "x-api-key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "value": 10,
    "description": "Payment description",
    "redirectUrl": "https://example.com/success?orderId=123",
    "notifyUrl": "https://api.example.com/orders/123"
  }'`,
  "Node.js": `import { ChainPay } from "chainpay";

const chainpay = new ChainPay("YOUR_API_KEY");

await chainpay.payments.create({
  amount: 250.0,
  currency: "USDT",
  order_id: "12345",
  callback_url: "https://yourdomain.com/webhook",
});`,
  Python: `from chainpay import ChainPay

chainpay = ChainPay("YOUR_API_KEY")

chainpay.payments.create(
    amount=250.00,
    currency="USDT",
    order_id="12345",
    callback_url="https://yourdomain.com/webhook",
)`,
  PHP: `<?php
$chainpay = new ChainPay("YOUR_API_KEY");

$chainpay->payments->create([
  "amount" => 250.00,
  "currency" => "USDT",
  "order_id" => "12345",
  "callback_url" => "https://yourdomain.com/webhook",
]);`,
};

const tabs = Object.keys(snippets);

const supportedChains = [
  { name: "mstc", image: mstc, color: "from-emerald-400 to-emerald-600" },
  { name: "BNB", image: bnb, color: "from-yellow-400 to-yellow-600" },
  { name: "tron", image: tron, color: "from-purple-400 to-fuchsia-600" },
  { name: "tether", image: Tether, color: "from-red-400 to-red-600" },
  { name: "TRC20", image: trc20, color: "from-sky-400 to-sky-600" },
  { name: "USDC", image: usdc, color: "from-rose-500 to-rose-700" },
];

export function Hero() {
  const [tab, setTab] = useState(tabs[0]);

  return (
    <section className="relative mx-auto max-w-7xl px-6 pb-16 pt-16 lg:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-2">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary">
            <Sparkles className="h-3.5 w-3.5" />
            Developer First • Business Ready
          </div>

          <h1 className="mt-6 text-5xl font-bold leading-[1.05] tracking-tight text-foreground md:text-6xl lg:text-7xl">
            Build. Integrate. Accept <span className="text-primary">Crypto.</span>
          </h1>

          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            Powerful APIs and tools to help developers integrate crypto payments in minutes.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              View API Docs
            </Button>
            <Button size="lg" variant="outline">
              Try Sandbox
            </Button>
          </div>
        </div>

        <div className="relative rounded-2xl border border-border/60 bg-card/80 p-2 shadow-2xl shadow-primary/10 backdrop-blur">
          {/* Floating "Payment received" card */}
          <div className="absolute -right-5 -top-15 z-10 hidden md:flex items-center gap-3 rounded-xl border border-border/60 bg-card px-3 py-2 shadow-lg animate-float">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600 text-white">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <div className="leading-tight">
              <div className="text-[10px] uppercase tracking-wider text-muted-foreground">Payment received</div>
              <div className="text-sm font-bold">+250.00 USDT</div>
            </div>
            <span className="ml-1 h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>

          {/* Floating wallet badge */}
          <div className="absolute -right-4 top-16 z-10 hidden md:flex items-center gap-2 rounded-full border border-border/60 bg-card px-3 py-1.5 shadow-lg animate-float [animation-delay:-2s]">
            <Wallet className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs font-mono">0x9f3c…a21b</span>
          </div>

          {/* Spinning BTC ring badge */}
          <div className="absolute -bottom-5 -right-5 z-10 hidden md:flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br from-orange-400 to-orange-600 text-white shadow-xl ring-4 ring-background animate-float [animation-delay:-4s]">
            <Bitcoin className="h-7 w-7" />
          </div>

          <div className="flex items-center gap-1 border-b border-border/60 px-3 pb-2 pt-1">
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                  tab === t
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {t}
              </button>
            ))}
          </div>
          <pre className="overflow-x-auto p-5 text-[13px] leading-relaxed text-foreground/90">
            <code>{snippets[tab]}</code>
          </pre>
          <div className="px-5 pb-5">
            <Button className="bg-primary hover:bg-primary/90">Run in Sandbox</Button>
          </div>
        </div>
      </div>

      {/* Supported Blockchains — moved here under hero */}
      <div className="flex w-max animate-scroll gap-10 mt-14 overflow-hidden">
        {[...supportedChains, ...supportedChains, ...supportedChains, ...supportedChains].map((c, index) => (
          <div key={`${c.name}-${index}`} className="group flex min-w-[90px] flex-col items-center gap-2">
            <div className="relative">
              <div className={`absolute -inset-1 rounded-full bg-gradient-to-br ${c.color} opacity-0 blur-md transition-opacity group-hover:opacity-70`} />
              <div className={`relative flex h-14 w-14 items-center justify-center rounded-full bg-gradient-to-br ${c.color} text-xl font-bold text-white shadow-md ring-2 ring-white/40 transition-transform group-hover:scale-110`}>
                <img src={c.image.src} alt={c.name} className="h-8 w-8 object-contain" />
              </div>
            </div>
            <span className="text-xs text-muted-foreground">{c.name}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
