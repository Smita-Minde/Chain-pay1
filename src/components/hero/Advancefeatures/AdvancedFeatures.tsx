// import { Check } from "lucide-react";

// type FeatureBlockProps = {
//   eyebrow: string;
//   title: string;
//   description: string;
//   bullets?: string[];
//   imageUrl: string;
//   imageAlt: string;
//   reverse?: boolean;
// };

// export function FeatureBlock({
//   eyebrow,
//   title,
//   description,
//   bullets,
//   imageUrl,
//   imageAlt,
//   reverse,
// }: FeatureBlockProps) {
//   return (
//     <div
//       className={`grid items-center gap-12 ${
//         reverse ? "lg:grid-cols-[1fr_1.1fr]" : "lg:grid-cols-[1.1fr_1fr]"
//       }`}
//     >





//       <div className={reverse ? "lg:order-2" : ""}>
//         <p className="text-sm font-semibold uppercase tracking-wide text-primary">{eyebrow}</p>
//         <h3 className="mt-3 text-3xl font-bold tracking-tight md:text-4xl">{title}</h3>
//         <p className="mt-5 text-base leading-relaxed text-muted-foreground">{description}</p>

//         {bullets && (
//           <ul className="mt-6 space-y-4">
//             {bullets.map((b) => (
//               <li key={b} className="flex items-start gap-3 text-base">
//                 <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 border-primary text-primary">
//                   <Check className="h-3.5 w-3.5" strokeWidth={3} />
//                 </span>
//                 <span className="text-foreground/90">{b}</span>
//               </li>
//             ))}
//           </ul>
//         )}
//       </div>

//       <div className={`relative ${reverse ? "lg:order-1" : ""}`}>
//         <div className="absolute -inset-3 rounded-3xl bg-gradient-to-br from-primary/30 to-accent/40 blur-2xl" />
//         <div className="relative overflow-hidden rounded-2xl border border-primary/30 shadow-xl">
//           <img src={imageUrl} alt={imageAlt} className="h-full w-full object-cover" loading="lazy" />
//         </div>
//       </div>
//     </div>
//   );
// }

// export function AdvancedFeatures() {
//   return (
//     <section className="mx-auto max-w-7xl space-y-24 px-6 py-24">
//       <FeatureBlock
//         eyebrow="Control, Customization & Confirmation — All in One"
//         title="Advanced Payment Experience with ChainPay"
//         description="With ChainPay, your checkout page is an extension of your brand. Deliver a seamless & trusted experience by fully customizing the look & feel of your payment page."
//         bullets={[
//           "Add your logo, brand colors, and messaging",
//           "White-label option for a fully branded interface",
//           "Consistent user journey from start to payment",
//         ]}
//         imageUrl="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80"
//         imageAlt="Customizable checkout dashboard"
//       />

//       <FeatureBlock


//         reverse
//         eyebrow="Re-Confirmation System for Payments"
//         title="Smart Re-Confirmation for Reliable Crypto Payments"
//         description="ChainPay's re-confirmation system verifies each payment before marking it complete — ensuring no missed or false transactions. Ideal for high-value or time-sensitive operations where reliability is critical."
//         imageUrl="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&q=80"
//         imageAlt="Crypto coins payment confirmation"
//       />

//       <FeatureBlock
//         eyebrow="Real-Time Payment Intelligence"
//         title="Seamless Payment Confirmation with IPN & APIs"
//         description="Get notified instantly when a payment is received or confirmed using ChainPay's robust Instant Payment Notification (IPN) system and developer-ready APIs."
//         bullets={[
//           "Real-time updates via web-hooks or polling",
//           "Easy to integrate into any backend system",
//           "Supports both one-time and subscription payments",
//         ]}
//         imageUrl="https://thumbs.dreamstime.com/b/robotic-hand-showcases-digital-screen-indicating-successful-payment-highlighting-seamless-integration-technology-458243165.jpg"
//         imageAlt="Person using a laptop for payments"
//       />

//       <FeatureBlock
//         reverse
//         eyebrow="Data-Rich Transactions Made Easy"
//         title="Attach Custom Data to Every Crypto Payment"
//         description="Easily include custom data like order IDs, customer references, or internal metadata when creating payment requests. Perfect for mapping and tracking transactions in your system."
//         imageUrl="https://api.cryptocloud.plus/media/articles/img_1711711808.686591.jpg"
//         imageAlt="Bitcoin tracking on phone"
//       />

//       <FeatureBlock
//         eyebrow="Merchant Dashboard"
//         title="All-in-One Merchant Dashboard for Crypto Payment Management"
//         description="ChainPay offers a powerful dashboard tailored for merchants — giving you full visibility, control, and customization over your crypto payment operations."
//         bullets={[
//           "Track Sales & Generate Reports",
//           "Manage API Keys with Ease",
//           "Personalize your checkout pages and payment experience",
//         ]}
//         imageUrl="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1200&q=80"
//         imageAlt="Analytics dashboard for crypto payments"
//       />
//     </section>
//   );
// }


// "use client";
// import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
// import { useRef } from 'react';
// import { ExternalLink, ArrowUpRight, Code2, Globe, Rocket } from 'lucide-react';

// const projects = [
//   {
//     title: 'MST Blockchain',
//     description:
//       'Worked as a Frontend Developer on MST Blockchain, contributing to the development of a modern Web3 platform focused on scalability, decentralized infrastructure, and seamless user experience.',
//     tech: ['React.js', 'Tailwind CSS', 'Framer Motion', 'Web3 UI'],
//     live: 'https://mstblockchain.com/',
//     github: 'https://github.com/LittleNikK/MST-WEB-10MAYPUSH.git',
//     color: 'from-blue-600 to-indigo-600',
//     glow: 'rgba(59, 130, 246, 0.2)',
//     icon: Globe
//   },
//   {
//     title: 'Mission Green Bharat',
//     description:
//       'Built and contributed to a modern Web3 platform focused on blockchain infrastructure, carbon-credit ecosystem integration, and decentralized digital solutions.',
//     tech: ['React.js', 'Tailwind CSS', 'Vite', 'Blockchain'],
//     live: 'https://missiongreenbharat.com/',
//     github: null,
//     color: 'from-emerald-600 to-teal-600',
//     glow: 'rgba(16, 185, 129, 0.2)',
//     icon: Rocket
//   },
//   {
//     title: 'Seamless QR Checkout',
//     description:
//       'A hackathon project focused on creating a seamless QR-based checkout system for efficient digital payments and fast retail experiences.',
//     tech: ['Node.js', 'React.js', 'APIs', 'QR Systems'],
//     live: null,
//     github: null,
//     color: 'from-amber-500 to-rose-500',
//     glow: 'rgba(245, 158, 11, 0.2)',
//     badge: '1st Runner Up — AMC Hackathon 2025',
//     icon: Code2
//   },
// ];

// function FeatureCard({ project, index, scrollYProgress }: { project: typeof projects[0]; index: number; scrollYProgress: any }) {
//   const targetScale = 1 - (projects.length - index) * 0.05;
//   const range = [index * 0.25, 1];

//   const scale = useTransform(scrollYProgress, range, [1, targetScale]);
//   const opacity = useTransform(scrollYProgress, range, [1, 0.3]);
//   const top = useTransform(scrollYProgress, [0, index * 0.25], ["0%", "0%"]);

//   return (
//     <div className="sticky top-[15vh] w-full flex items-center justify-center h-[70vh]">
//       <motion.div
//         style={{ scale, opacity }}
//         className="w-full max-w-5xl glass-card rounded-[3rem] border-white/40 bg-white/40 backdrop-blur-3xl shadow-2xl overflow-hidden flex flex-col md:flex-row h-full"
//       >
//         {/* Left Visual Side */}
//         <div className={`w-full md:w-2/5 bg-gradient-to-br ${project.color} relative p-12 flex flex-col justify-between overflow-hidden`}>
//           <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '30px 30px' }} />

//           <div className="relative z-10">
//             <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white mb-6">
//               <project.icon size={32} strokeWidth={1.5} />
//             </div>
//             {project.badge && (
//               <div className="px-4 py-1.5 rounded-full bg-white/90 text-surface-950 text-[10px] font-black uppercase tracking-widest shadow-lg inline-block">
//                 {project.badge}
//               </div>
//             )}
//           </div>

//           <div className="relative z-10">
//             <span className="text-white/60 font-mono text-xs uppercase tracking-[0.3em] block mb-2">Project 0{index + 1}</span>
//             <h3 className="text-3xl md:text-5xl font-display font-black text-white tracking-tight leading-none">
//               {project.title.split(' ')[0]} <br />
//               <span className="text-white/60">{project.title.split(' ').slice(1).join(' ')}</span>
//             </h3>
//           </div>

//           {/* Background large text */}
//           <div className="absolute -bottom-8 -left-8 text-[10rem] font-display font-black text-white/5 select-none pointer-events-none">
//             0{index + 1}
//           </div>
//         </div>

//         {/* Right Content Side */}
//         <div className="w-full md:w-3/5 p-8 md:p-14 flex flex-col justify-center">
//           <p className="text-lg md:text-xl text-surface-600 leading-relaxed mb-8">
//             {project.description}
//           </p>

//           <div className="flex flex-wrap gap-2 mb-10">
//             {project.tech.map((t) => (
//               <span key={t} className="px-4 py-2 rounded-xl bg-surface-50 border border-surface-100 text-[10px] font-bold text-surface-400 uppercase tracking-tight hover:border-primary-100 hover:text-primary-600 transition-colors">
//                 {t}
//               </span>
//             ))}
//           </div>

//           <div className="flex items-center gap-6">
//             {project.live && (
//               <a
//                 href={project.live}
//                 target="_blank"
//                 rel="noopener"
//                 className="flex items-center gap-3 text-base font-black text-surface-950 group/link"
//               >
//                 <div className="w-12 h-12 rounded-full border border-surface-200 flex items-center justify-center group-hover/link:border-primary-100 group-hover/link:bg-primary-50 transition-all duration-300">
//                   <ExternalLink size={20} className="group-hover/link:scale-110" />
//                 </div>
//                 Live Demo
//               </a>
//             )}
//             {project.github && (
//               <a
//                 href={project.github}
//                 target="_blank"
//                 rel="noopener"
//                 className="flex items-center gap-3 text-base font-black text-surface-950 group/link"
//               >
//                 {/* <div className="w-12 h-12 rounded-full border border-surface-200 flex items-center justify-center group-hover/link:border-primary-100 group-hover/link:bg-primary-50 transition-all duration-300">
//                   <Github size={20} className="group-hover/link:scale-110" />
//                 </div> */}
//                 Source
//               </a>
//             )}
//             {!project.live && !project.github && (
//               <div className="text-surface-300 italic font-medium flex items-center gap-2">
//                 <div className="w-2 h-2 rounded-full bg-surface-200" />
//                 Private repository
//               </div>
//             )}
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   );
// }

// export default function AdvancedFeatures() {
//   const containerRef = useRef(null);
//   const { scrollYProgress } = useScroll({
//     target: containerRef,
//     offset: ["start start", "end end"]
//   });

//   return (
//     <section id="projects" ref={containerRef} className="relative h-[400vh]">
//       {/* Dynamic Glow Background */}
//       <div className="sticky top-0 h-screen w-full overflow-hidden pointer-events-none">
//         <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary-500/10 blur-[120px] opacity-50" />
//       </div>

//       <div className="relative z-10 w-full flex flex-col items-center">
//         {/* Intro Header */}
//         <div className="h-[30vh] w-full flex flex-col items-center justify-center text-center px-4 pt-20">
//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="flex items-center gap-3 mb-4"
//           >
//             <div className="w-12 h-[1px] bg-primary-500" />
//             <span className="text-sm font-mono font-bold text-primary-600 uppercase tracking-[0.3em]">
//               Selected Works
//             </span>
//           </motion.div>
//           <motion.h2
//             initial={{ opacity: 0, y: 20 }}
//             whileInView={{ opacity: 1, y: 0 }}
//             className="text-6xl md:text-9xl font-display font-black text-surface-950 tracking-tighter"
//           >
//             Featured <br />
//             <span className="text-surface-300">Projects</span>
//           </motion.h2>
//           <motion.div
//             initial={{ opacity: 0 }}
//             whileInView={{ opacity: 1 }}
//             transition={{ delay: 0.5 }}
//             className="mt-12 flex flex-col items-center gap-4"
//           >
//             <span className="text-xs font-mono text-surface-400 uppercase tracking-widest">Scroll to explore</span>
//             <div className="w-px h-16 bg-gradient-to-b from-primary-500 to-transparent" />
//           </motion.div>
//         </div>

//         {/* Project Stack */}
//         <div className="w-full px-4 md:px-10">
//           {projects.map((project, i) => (
//             <FeatureCard
//               key={project.title}
//               project={project}
//               index={i}
//               scrollYProgress={scrollYProgress}
//             />
//           ))}
//         </div>

//         {/* Outro Spacer */}
//         <div className="h-[20vh] w-full" />
//       </div>
//     </section>
//   );
// }