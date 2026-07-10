"use client";

import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export function Hero() {
  const c1Ref = useRef<HTMLDivElement>(null);
  const c2Ref = useRef<HTMLDivElement>(null);
  const c3Ref = useRef<HTMLDivElement>(null);
  const mSaasRef = useRef<HTMLDivElement>(null);
  const mEcomRef = useRef<HTMLDivElement>(null);
  const mGlobalRef = useRef<HTMLDivElement>(null);

  const p1Ref = useRef<SVGImageElement>(null);
  const p2Ref = useRef<SVGImageElement>(null);
  const p3Ref = useRef<SVGImageElement>(null);
  const p1bRef = useRef<SVGImageElement>(null);
  const p2bRef = useRef<SVGImageElement>(null);
  const p3bRef = useRef<SVGImageElement>(null);

  const tx1Ref = useRef<HTMLDivElement>(null);
  const tx2Ref = useRef<HTMLDivElement>(null);
  const tx3Ref = useRef<HTMLDivElement>(null);
  const stageContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let timeouts: NodeJS.Timeout[] = [];
    let animationFrames: number[] = [];
    let loopTimeout: NodeJS.Timeout | null = null;
    let isActive = true;

    function updateScale() {
      const el = stageContainerRef.current;
      if (!el) return;
      const width = window.innerWidth;
      let scale = 1;
      if (width < 1024) {
        scale = Math.min(0.7, (width - 32) / 1035);
      } else if (width < 1280) {
        scale = Math.min(0.65, (width * 0.5 - 48) / 1035);
      } else if (width < 1536) {
        scale = 0.55;
      } else {
        scale = 0.65;
      }
      el.style.setProperty("--scale", String(scale));
    }
    updateScale();
    window.addEventListener("resize", updateScale);

    function lerp(a: number, b: number, t: number) {
      return a + (b - a) * t;
    }

    function animateParticle(
      dot: SVGImageElement | null,
      x1: number,
      y1: number,
      x2: number,
      y2: number,
      duration: number,
      delay: number,
      onDone?: (() => void) | null
    ) {
      if (!dot) return;
      const activeDot = dot;
      const tId = setTimeout(() => {
        if (!isActive) return;
        activeDot.style.opacity = "1";
        let start: number | null = null;
        function frame(ts: number) {
          if (!isActive) return;
          if (!start) start = ts;
          const t = Math.min((ts - start) / duration, 1);
          const eased = t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
          const posX = lerp(x1, x2, eased);
          const posY = lerp(y1, y2, eased);
          const size = 50;
          activeDot.setAttribute("x", String(posX - size / 2));
          activeDot.setAttribute("y", String(posY - size / 2));
          if (t < 1) {
            const frameId = requestAnimationFrame(frame);
            animationFrames.push(frameId);
          } else {
            activeDot.style.opacity = "0";
            if (onDone) onDone();
          }
        }
        const initialFrameId = requestAnimationFrame(frame);
        animationFrames.push(initialFrameId);
      }, delay);
      timeouts.push(tId);
    }

    function highlightCard(
      el: HTMLDivElement | null,
      type: string,
      duration: number
    ) {
      if (!el) return;
      el.classList.add(type);
      const tId = setTimeout(() => {
        if (el) el.classList.remove(type);
      }, duration);
      timeouts.push(tId);
    }

    // Coordinates in SVG viewBox (1000x620)
    const C1 = { x: 220, y: 110 };
    const C2 = { x: 193, y: 280 };
    const C3 = { x: 220, y: 440 };
    const CTR = { x: 500, y: 310 };
    const M_SAAS = { x: 760, y: 95 };
    const M_ECOM = { x: 815, y: 255 };
    const M_GLOBAL = { x: 780, y: 415 };

    function showTx(el: HTMLDivElement | null, delay: number) {
      if (!el) return;
      const tId = setTimeout(() => {
        if (!isActive) return;
        el.classList.add("show");
        const hideId = setTimeout(() => {
          if (el) el.classList.remove("show");
        }, 3000);
        timeouts.push(hideId);
      }, delay);
      timeouts.push(tId);
    }

    function runSequence() {
      if (!isActive) return;
      const SPEED = 900; // ms per leg

      // === PHASE 1: C1 -> center (pays SaaS) ===
      highlightCard(c1Ref.current, "active-send", SPEED + 400);
      animateParticle(
        p1Ref.current,
        C1.x,
        C1.y,
        CTR.x,
        CTR.y,
        SPEED,
        0,
        () => {
          highlightCard(mSaasRef.current, "active-receive", SPEED + 400);
          animateParticle(
            p1bRef.current,
            CTR.x,
            CTR.y,
            M_SAAS.x,
            M_SAAS.y,
            SPEED,
            0,
            null
          );
          showTx(tx1Ref.current, 0);
        }
      );

      // === C2 -> center -> Ecommerce (delayed 1.8s) ===
      const D2 = 1800;
      highlightCard(c2Ref.current, "active-send", SPEED + 400);
      animateParticle(
        p2Ref.current,
        C2.x,
        C2.y,
        CTR.x,
        CTR.y,
        SPEED,
        D2,
        () => {
          highlightCard(mEcomRef.current, "active-receive", SPEED + 400);
          animateParticle(
            p2bRef.current,
            CTR.x,
            CTR.y,
            M_ECOM.x,
            M_ECOM.y,
            SPEED,
            0,
            null
          );
          showTx(tx2Ref.current, 0);
        }
      );

      // === C3 -> center -> Global (delayed 3.4s) ===
      const D3 = 3400;
      highlightCard(c3Ref.current, "active-send", SPEED + 400);
      animateParticle(
        p3Ref.current,
        C3.x,
        C3.y,
        CTR.x,
        CTR.y,
        SPEED,
        D3,
        () => {
          highlightCard(mGlobalRef.current, "active-receive", SPEED + 400);
          animateParticle(
            p3bRef.current,
            CTR.x,
            CTR.y,
            M_GLOBAL.x,
            M_GLOBAL.y,
            SPEED,
            0,
            null
          );
          showTx(tx3Ref.current, 0);
        }
      );

      loopTimeout = setTimeout(runSequence, 8000);
    }

    const initTimeout = setTimeout(runSequence, 1200);
    timeouts.push(initTimeout);

    return () => {
      isActive = false;
      timeouts.forEach(clearTimeout);
      animationFrames.forEach(cancelAnimationFrame);
      if (loopTimeout) clearTimeout(loopTimeout);
      window.removeEventListener("resize", updateScale);
    };
  }, []);

  return (
    <section className="chainpay-hero-container relative mx-auto max-w-7xl px-4 sm:px-6 py-12 md:py-16 lg:py-20 w-full overflow-hidden">
      {/* SCOPED CSS STYLES */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .chainpay-hero-container {
          --navy: #0A1628;
          --navy-mid: #132040;
          --blue-deep: #1B3A6B;
          --blue: #1E4FA0;
          --blue-brand: #1A3FC4;
          --blue-bright: #2B5FF5;
          --blue-glow: #3D74FF;
          --accent: #4C85FF;
          --accent-light: #7AAEFF;
          --white: #FFFFFF;
          --white-90: rgba(255,255,255,0.90);
          --white-70: rgba(255,255,255,0.70);
          --white-40: rgba(255,255,255,0.40);
          --white-15: rgba(255,255,255,0.15);
          --white-08: rgba(255,255,255,0.08);
          --card-bg: rgba(255,255,255,0.96);
          --card-border: rgba(255,255,255,0.25);
          --dot-color: #2B5FF5;
          --dot-active: #4C85FF;
          --bg-gradient-start: #EEF2FF;
          --bg-gradient-end: #D8E4FF;
          --ring-color: #C3D4FF;

          font-family: 'Inter', sans-serif;
        }

        /* ─── DIAGRAM STAGE ─── */
        .chainpay-hero-container .stage-container {
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
          flex-shrink: 0;
          width: 100%;
          max-width: 100%;
          height: calc(620px * var(--scale, 0.52));
          margin: 0 auto;
        }
        @media (min-width: 1024px) {
          .chainpay-hero-container .stage-container {
            width: calc(1035px * var(--scale, 0.52));
            margin-left: -50px;
            margin-right: 0;
          }
        }

        .chainpay-hero-container .stage {
          position: relative;
          width: 900px;
          height: 620px;
          flex-shrink: 0;
          transform: scale(var(--scale, 0.52));
          transform-origin: center center;
        }

        /* concentric rings */
        .chainpay-hero-container .rings {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 560px; height: 560px;
          pointer-events: none;
        }
        .chainpay-hero-container .diag-ring {
          position: absolute;
          border-radius: 50%;
          border: 1px solid var(--ring-color);
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
        }
        .chainpay-hero-container .diag-ring:nth-child(1) { width: 160px; height: 160px; }
        .chainpay-hero-container .diag-ring:nth-child(2) { width: 260px; height: 260px; }
        .chainpay-hero-container .diag-ring:nth-child(3) { width: 360px; height: 360px; }
        .chainpay-hero-container .diag-ring:nth-child(4) { width: 460px; height: 460px; }

        /* ─── CENTER LOGO ─── */
        .chainpay-hero-container .center-logo {
          position: absolute;
          top: 50%; left: 50%;
          transform: translate(-50%, -50%);
          width: 100px; height: 100px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 0 0 10px rgba(26,63,196,0.06), 0 8px 32px rgba(26,63,196,0.15);
          display: flex; align-items: center; justify-content: center;
          z-index: 30;
          overflow: hidden;
        }
        .chainpay-hero-container .center-logo video,
        .chainpay-hero-container .center-logo img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        /* ─── CARDS ─── */
        .chainpay-hero-container .card {
          position: absolute;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 16px 20px;
          min-width: 245px;
          z-index: 20;
          box-shadow: 0 4px 20px rgba(10,22,40,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .chainpay-hero-container .card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(10,22,40,0.14); }

        .chainpay-hero-container .card-header {
          display: flex; align-items: center; gap: 10px; margin-bottom: 7px;
        }
        .chainpay-hero-container .card-icon {
          width: 46px; height: 46px; border-radius: 8px;
          background: var(--navy); display: flex; align-items: center; justify-content: center;
          flex-shrink: 0;
        }
        .chainpay-hero-container .card-icon svg { width: 22px; height: 22px; fill: white; }
        .chainpay-hero-container .card-title { font-size: 15px; font-weight: 700; color: var(--navy); }

        .chainpay-hero-container .card-detail { display: flex; align-items: center; gap: 8px; }
        .chainpay-hero-container .detail-dot {
          width: 6px; height: 6px; border-radius: 50%; background: var(--blue-bright);
          flex-shrink: 0;
        }
        .chainpay-hero-container .detail-label { font-size: 12px; color: rgba(10,22,40,0.5); margin-bottom: 2px; }
        .chainpay-hero-container .detail-value {
          display: inline-flex; align-items: center; gap: 8px;
          background: rgba(10,22,40,0.05); border-radius: 6px;
          padding: 5px 12px; font-size: 12.5px; font-weight: 600; color: var(--navy);
        }
        .chainpay-hero-container .check {
          width: 18px; height: 18px; border-radius: 50%;
          background: rgba(34, 197, 94, 0.12);
          display: flex; align-items: center; justify-content: center;
        }
        .chainpay-hero-container .check svg { width: 10px; fill: none; stroke: #22c55e; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }

        /* CUSTOMER CARDS */
        .chainpay-hero-container .customer-card {
          position: absolute;
          background: var(--card-bg);
          border: 1px solid var(--card-border);
          border-radius: 12px;
          padding: 16px 20px;
          min-width: 245px;
          z-index: 20;
          box-shadow: 0 4px 20px rgba(10,22,40,0.08);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .chainpay-hero-container .customer-card:hover { transform: translateY(-3px); box-shadow: 0 8px 32px rgba(10,22,40,0.14); }
        .chainpay-hero-container .customer-header { display: flex; align-items: center; gap: 10px; margin-bottom: 7px; }
        .chainpay-hero-container .customer-avatar {
          width: 46px; height: 46px; border-radius: 50%;
          display: flex; align-items: center; justify-content: center;
          font-size: 14px; font-weight: 700; color: white; flex-shrink: 0;
        }
        .chainpay-hero-container .avatar-1 { background: linear-gradient(135deg, #667eea, #764ba2); }
        .chainpay-hero-container .avatar-2 { background: linear-gradient(135deg, #f093fb, #f5576c); }
        .chainpay-hero-container .avatar-3 { background: linear-gradient(135deg, #4facfe, #00f2fe); }
        .chainpay-hero-container .customer-name { font-size: 15px; font-weight: 700; color: var(--navy); }
        .chainpay-hero-container .customer-sub { font-size: 12px; color: rgba(10,22,40,0.45); }
        .chainpay-hero-container .customer-badge {
          display: inline-flex; align-items: center; gap: 5px;
          font-size: 12px; font-weight: 500; color: var(--blue-brand);
          background: rgba(26,63,196,0.08); border-radius: 6px;
          padding: 4px 10px; margin-top: 5px;
        }

        /* ─── POSITIONS ─── */
        .chainpay-hero-container .pos-ecommerce  { top: 40px;  right: -10px; }
        .chainpay-hero-container .pos-saas       { top: 210px; right: -70px; }
        .chainpay-hero-container .pos-global     { top: 390px; right: -40px; }

        /* Customers — left side */
        .chainpay-hero-container .pos-c1 { top: 70px;  left: -40px; }
        .chainpay-hero-container .pos-c2 { top: 240px; left: -65px; }
        .chainpay-hero-container .pos-c3 { top: 400px; left: -40px; }

        /* ─── SVG CANVAS for animated particles ─── */
        .chainpay-hero-container .anim-canvas {
          position: absolute;
          top: 0; left: 0;
          width: 100%; height: 100%;
          pointer-events: none;
          z-index: 15;
          overflow: visible;
        }

        /* ─── PARTICLE DOT ─── */
        .chainpay-hero-container .particle {
          opacity: 0;
        }

        /* ─── STATUS BAR ─── */
        .chainpay-hero-container .status-bar {
          display: flex; align-items: center; justify-content: center; gap: 32px;
          margin-top: 48px; padding: 14px 32px;
          background: rgba(255,255,255,0.8);
          border: 1px solid rgba(255,255,255,0.6);
          border-radius: 100px;
          backdrop-filter: blur(8px);
          z-index: 10; position: relative;
          width: max-content;
          max-width: 100%;
          margin-left: auto;
          margin-right: auto;
        }
        @media (max-width: 768px) {
          .chainpay-hero-container .status-bar {
            flex-wrap: wrap;
            gap: 16px 24px;
            border-radius: 24px;
            padding: 16px 24px;
            justify-content: center;
          }
          .chainpay-hero-container .divider-v {
            display: none;
          }
        }
        @media (max-width: 640px) {
          .chainpay-hero-container .status-bar {
            display: grid;
            grid-template-cols: repeat(2, 1fr);
            gap: 16px;
            border-radius: 16px;
            width: 100%;
            max-width: 480px;
          }
        }
        @media (max-width: 400px) {
          .chainpay-hero-container .status-bar {
            grid-template-cols: 1fr;
            max-width: 290px;
          }
        }
        .chainpay-hero-container .stat-item { display: flex; align-items: center; gap: 9px; }
        .chainpay-hero-container .stat-icon {
          width: 32px; height: 32px; border-radius: 9px;
          display: flex; align-items: center; justify-content: center;
          font-size: 15px;
        }
        .chainpay-hero-container .stat-icon.blue { background: rgba(26,63,196,0.1); }
        .chainpay-hero-container .stat-icon.green { background: rgba(34,197,94,0.1); }
        .chainpay-hero-container .stat-icon.amber { background: rgba(245,158,11,0.1); }
        .chainpay-hero-container .stat-label { font-size: 12px; color: rgba(10,22,40,0.5); }
        .chainpay-hero-container .stat-val { font-size: 15px; font-weight: 700; color: var(--navy); }
        .chainpay-hero-container .divider-v { width: 1px; height: 28px; background: rgba(10,22,40,0.1); }

        /* ─── ACTIVE HIGHLIGHT ─── */
        .chainpay-hero-container .card.active-send, .chainpay-hero-container .customer-card.active-send {
          border-color: var(--blue-brand);
          box-shadow: 0 0 0 3px rgba(26,63,196,0.15), 0 8px 32px rgba(26,63,196,0.12);
        }
        .chainpay-hero-container .card.active-receive {
          border-color: #22c55e;
          box-shadow: 0 0 0 3px rgba(34,197,94,0.15), 0 8px 32px rgba(34,197,94,0.1);
        }

        /* ─── TX LOG ─── */
        .chainpay-hero-container .tx-log {
          position: absolute;
          bottom: 10px; left: 50%;
          transform: translateX(-50%);
          z-index: 50;
          display: flex; gap: 8px; flex-direction: column;
          pointer-events: none;
          width: 340px;
          align-items: center;
        }
        .chainpay-hero-container .tx-pill {
          background: rgba(10,22,40,0.88);
          color: white;
          font-size: 11.5px; font-weight: 500;
          padding: 7px 16px; border-radius: 100px;
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.12);
          opacity: 0;
          transform: translateY(10px);
          transition: opacity 0.4s ease, transform 0.4s ease;
          white-space: nowrap;
          text-align: center;
        }
        .chainpay-hero-container .tx-pill .tx-green { color: #4ade80; }
        .chainpay-hero-container .tx-pill .tx-blue  { color: #7AAEFF; }
        .chainpay-hero-container .tx-pill.show { opacity: 1; transform: translateY(0); }

        /* ─── CONNECTION DOTS on rings ─── */
        .chainpay-hero-container .conn-dot {
          position: absolute;
          width: 8px; height: 8px;
          border-radius: 50%;
          background: var(--dot-color);
          transform: translate(-50%, -50%);
          z-index: 18;
          transition: background 0.3s;
        }
        .chainpay-hero-container .conn-dot.lit { background: var(--dot-active); box-shadow: 0 0 0 3px rgba(76,133,255,0.2); }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-6px); }
        }
        .chainpay-hero-container .card { animation: float 4s ease-in-out infinite; }
        .chainpay-hero-container .card:nth-child(2) { animation-delay: 0.8s; }
        .chainpay-hero-container .card:nth-child(3) { animation-delay: 1.6s; }
        .chainpay-hero-container .customer-card:nth-child(1) { animation: float 4.5s ease-in-out infinite; animation-delay: 0.4s; }
        .chainpay-hero-container .customer-card:nth-child(2) { animation: float 4.5s ease-in-out infinite; animation-delay: 1.2s; }
        .chainpay-hero-container .customer-card:nth-child(3) { animation: float 4.5s ease-in-out infinite; animation-delay: 2s; }

        /* Scaling calculations handled fluidly */
      ` }} />

      <div className="grid items-center gap-12 lg:grid-cols-2 w-full">
        {/* Left Copy Column */}
        <div className="flex flex-col items-center lg:items-start text-center lg:text-left min-w-0 w-full z-10">
          <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary animate-fade-in">
            <Sparkles className="h-3.5 w-3.5" />
            Developer First • Business Ready
          </div>

          <h1 className="mt-6 text-3xl min-[360px]:text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold leading-[1.1] sm:leading-[1.05] tracking-tight text-slate-900">
            Build. Integrate. Accept <span className="text-primary">Crypto.</span>
          </h1>

          <p className="mt-4 sm:mt-6 max-w-xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Powerful APIs and tools to help developers integrate crypto payments in minutes.
          </p>

          <div className="mt-6 sm:mt-8 flex flex-wrap justify-center lg:justify-start gap-3 w-full">
            <a href="/api-reference">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-sm sm:text-base px-5 sm:px-8">
                View API Docs
              </Button>
            </a>
            {/* <Button size="lg" variant="outline" className="text-sm sm:text-base px-5 sm:px-8">
              Try Sandbox
            </Button> */}
          </div>
        </div>

        {/* Right Stage Column */}
        <div className="relative w-full min-w-0 flex items-center justify-center">
          <div className="stage-container" ref={stageContainerRef}>
            <div className="stage" id="stage">
              {/* RINGS */}
              <div className="rings">
                <div className="diag-ring"></div>
                <div className="diag-ring"></div>
                <div className="diag-ring"></div>
                <div className="diag-ring"></div>
              </div>

              {/* CENTER LOGO */}
              <div className="center-logo">
                {/* <svg
                  viewBox="0 0 60 60"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 30C14 21.2 21.2 14 30 14C34.6 14 38.8 16 41.6 19.2"
                    stroke="#1A3FC4"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <path
                    d="M46 30C46 38.8 38.8 46 30 46C25.4 46 21.2 44 18.4 40.8"
                    stroke="#1A3FC4"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <circle cx="30" cy="30" r="6" fill="#1A3FC4" />
                </svg> */}

                <img src="/video/Chainpay_alpha-copy.gif" alt="ChainPay Logo Animation" />
              </div>

              {/* ===== CUSTOMER CARDS (LEFT) ===== */}
              <div className="customer-card pos-c1" id="c1" ref={c1Ref}>
                <div className="customer-header">
                  <div className="customer-avatar avatar-1">AJ</div>
                  <div>
                    <div className="customer-name">Alex Johnson</div>
                    <div className="customer-sub">Customer 1</div>
                  </div>
                </div>
                <div className="customer-badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <circle cx="5" cy="5" r="4" />
                  </svg>
                  Paying via BTC
                </div>
              </div>

              <div className="customer-card pos-c2" id="c2" ref={c2Ref}>
                <div className="customer-header">
                  <div className="customer-avatar avatar-2">SR</div>
                  <div>
                    <div className="customer-name">Sara Reyes</div>
                    <div className="customer-sub">Customer 2</div>
                  </div>
                </div>
                <div className="customer-badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <circle cx="5" cy="5" r="4" />
                  </svg>
                  Paying via ETH
                </div>
              </div>

              <div className="customer-card pos-c3" id="c3" ref={c3Ref}>
                <div className="customer-header">
                  <div className="customer-avatar avatar-3">MK</div>
                  <div>
                    <div className="customer-name">Mia Kim</div>
                    <div className="customer-sub">Customer 3</div>
                  </div>
                </div>
                <div className="customer-badge">
                  <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
                    <circle cx="5" cy="5" r="4" />
                  </svg>
                  Paying via BTC
                </div>
              </div>

              {/* ===== MARKET CARDS (RIGHT) ===== */}
              {/* SaaS Platform */}
              <div className="card pos-ecommerce" id="m-saas" ref={mSaasRef}>
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M3 3h18v4H3zm0 7h18v4H3zm0 7h18v4H3z" />
                    </svg>
                  </div>
                  <div className="card-title">SaaS Platform</div>
                </div>
                <div className="card-detail">
                  <div className="detail-dot"></div>
                  <div>
                    <div className="detail-label">Payment request</div>
                    <div className="detail-value">
                      1.28 ETH $2,450
                      <div className="check">
                        <svg viewBox="0 0 12 12">
                          <polyline points="2,6 5,9 10,3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* E-commerce Store */}
              <div className="card pos-saas" id="m-ecom" ref={mEcomRef}>
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 2L3 6v14h18V6l-3-4H6zm0 0v4h12V2M3 6h18M9 12a3 3 0 006 0" />
                    </svg>
                  </div>
                  <div className="card-title">E-commerce Store</div>
                </div>
                <div className="card-detail">
                  <div className="detail-dot"></div>
                  <div>
                    <div className="detail-label">Payment request</div>
                    <div className="detail-value">
                      0.042 BTC $3,000/mo
                      <div className="check">
                        <svg viewBox="0 0 12 12">
                          <polyline points="2,6 5,9 10,3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Global Merchant */}
              <div className="card pos-global" id="m-global" ref={mGlobalRef}>
                <div className="card-header">
                  <div className="card-icon">
                    <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="9" />
                      <path d="M12 3a15 15 0 010 18M3 12h18M3.6 7.5a15 15 0 0116.8 0M3.6 16.5a15 15 0 0116.8 0" />
                    </svg>
                  </div>
                  <div className="card-title">Global Merchant</div>
                </div>
                <div className="card-detail">
                  <div className="detail-dot"></div>
                  <div>
                    <div className="detail-label">Cross Border Payment</div>
                    <div className="detail-value">
                      0.31 BTC $18,200
                      <div className="check">
                        <svg viewBox="0 0 12 12">
                          <polyline points="2,6 5,9 10,3" />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SVG particle canvas */}
              <svg
                className="anim-canvas"
                id="animSVG"
                viewBox="0 0 1000 620"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="3" result="coloredBlur" />
                    <feMerge>
                      <feMergeNode in="coloredBlur" />
                      <feMergeNode in="SourceGraphic" />
                    </feMerge>
                  </filter>
                </defs>

                {/* Faint connector lines (customer → center → market) */}
                <line
                  id="line-c1-center"
                  x1="220"
                  y1="110"
                  x2="500"
                  y2="310"
                  stroke="var(--ring-color)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <line
                  id="line-c2-center"
                  x1="193"
                  y1="280"
                  x2="500"
                  y2="310"
                  stroke="var(--ring-color)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <line
                  id="line-c3-center"
                  x1="220"
                  y1="440"
                  x2="500"
                  y2="310"
                  stroke="var(--ring-color)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />

                <line
                  id="line-center-saas"
                  x1="500"
                  y1="310"
                  x2="760"
                  y2="95"
                  stroke="var(--ring-color)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <line
                  id="line-center-ecom"
                  x1="500"
                  y1="310"
                  x2="815"
                  y2="255"
                  stroke="var(--ring-color)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />
                <line
                  id="line-center-global"
                  x1="500"
                  y1="310"
                  x2="780"
                  y2="415"
                  stroke="var(--ring-color)"
                  strokeWidth="1.5"
                  strokeDasharray="6 4"
                />

                {/* Particle images (Phase 1) */}
                <image
                  ref={p1Ref}
                  id="p1"
                  className="particle"
                  href="/3Dlogoballs/Mstc3d.png"
                  width="60"
                  height="60"
                  x="0"
                  y="0"
                />
                <image
                  ref={p2Ref}
                  id="p2"
                  className="particle"
                  href="/3Dlogoballs/bnb3d.png"
                  width="50"
                  height="50"
                  x="0"
                  y="0"
                />
                <image
                  ref={p3Ref}
                  id="p3"
                  className="particle"
                  href="/3Dlogoballs/tron3d.png"
                  width="60"
                  height="60"
                  x="0"
                  y="0"
                />
                {/* Particle images (Phase 2) */}
                <image
                  ref={p1bRef}
                  id="p1b"
                  className="particle"
                  href="/3Dlogoballs/Mstc3d.png"
                  width="60"
                  height="60"
                  x="0"
                  y="0"
                />
                <image
                  ref={p2bRef}
                  id="p2b"
                  className="particle"
                  href="/3Dlogoballs/bnb3d.png"
                  width="50"
                  height="50"
                  x="0"
                  y="0"
                />
                <image
                  ref={p3bRef}
                  id="p3b"
                  className="particle"
                  href="/3Dlogoballs/tron3d.png"
                  width="60"
                  height="60"
                  x="0"
                  y="0"
                />
              </svg>

              {/* TX status log */}
              <div className="tx-log">
                <div className="tx-pill" id="tx1" ref={tx1Ref}>
                  ⚡ <span className="tx-blue">Alex</span> → ChainPay →{" "}
                  <span className="tx-green">SaaS Platform</span> · 1.28 ETH
                </div>
                <div className="tx-pill" id="tx2" ref={tx2Ref}>
                  ⚡ <span className="tx-blue">Sara</span> → ChainPay →{" "}
                  <span className="tx-green">E-commerce</span> · 0.042 BTC
                </div>
                <div className="tx-pill" id="tx3" ref={tx3Ref}>
                  ⚡ <span className="tx-blue">Mia</span> → ChainPay →{" "}
                  <span className="tx-green">Global Merchant</span> · 0.31 BTC
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* STATS BAR */}
      <div className="status-bar">
        <div className="stat-item">
          <div className="stat-icon blue">🔗</div>
          <div>
            <div className="stat-label">Network</div>
            <div className="stat-val">Multi-chain</div>
          </div>
        </div>
        <div className="divider-v"></div>
        <div className="stat-item">
          <div className="stat-icon green">✅</div>
          <div>
            <div className="stat-label">Settlement</div>
            <div className="stat-val">&lt; 3 seconds</div>
          </div>
        </div>
        <div className="divider-v"></div>
        <div className="stat-item">
          <div className="stat-icon amber">⚡</div>
          <div>
            <div className="stat-label">Fee</div>
            <div className="stat-val">0.4% flat</div>
          </div>
        </div>
        <div className="divider-v"></div>
        <div className="stat-item">
          <div className="stat-icon blue">🌐</div>
          <div>
            <div className="stat-label">Currencies</div>
            <div className="stat-val">BTC · ETH · USDC</div>
          </div>
        </div>
      </div>
    </section>
  );
}
