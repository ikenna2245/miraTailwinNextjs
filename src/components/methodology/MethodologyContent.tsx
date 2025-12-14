"use client";

import { CheckCircle2, GitMerge, Search, Terminal, ArrowRight, Lightbulb, Handshake, Verified, Zap, Code2 } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// --- CORE METHODOLOGY STEPS ---
const steps = [
    {
        icon: Search,
        title: "01. Discovery & Strategy",
        desc: "We don't guess. We dive deep into your existing architecture, identifying bottlenecks, security risks, and technical debt before writing a single line of code. We deliver a concrete strategy roadmap."
    },
    {
        icon: GitMerge,
        title: "02. Architecture & Design",
        desc: "We draft system blueprints using Domain-Driven Design principles. We build scalable, cloud-native foundations that support your business logic today and optimize for tomorrow's growth."
    },
    {
        icon: Code2,
        title: "03. Agile Development",
        desc: "We run focused, two-week sprints with fully transparent deliverables. You see progress in real-time staging environments, ensuring continuous alignment and flexibility."
    },
    {
        icon: CheckCircle2,
        title: "04. Rigorous Testing & Deployment",
        desc: "Zero downtime deployments. We utilize automated CI/CD pipelines and rigorous end-to-end testing to ensure every release is production-ready and exceeds performance benchmarks."
    },
    {
        icon: Terminal,
        title: "05. Support & Evolution",
        desc: "Our partnership continues post-launch. We provide dedicated support, ongoing monitoring, and collaborative iteration to optimize and evolve your solution as your business scales."
    }
];

// --- CORE VALUES ---
const coreValues = [
    {
        icon: Lightbulb,
        title: "Innovation First",
        desc: "Continuously exploring and implementing novel approaches to solve complex challenges with creative, future-proof technology.",
        color: 'text-yellow-400',
        shadow: 'hover:shadow-yellow-900/20'
    },
    {
        icon: Handshake,
        title: "Client Partnership",
        desc: "Building transparent, collaborative relationships where mutual success and shared goals are the foundation of our work.",
        color: 'text-cyan-400',
        shadow: 'hover:shadow-cyan-900/20'
    },
    {
        icon: Verified,
        title: "Quality & Integrity",
        desc: "Upholding the highest standards in every solution we deliver, backed by unwavering honesty and ethical conduct.",
        color: 'text-green-400',
        shadow: 'hover:shadow-green-900/20'
    },
];

export default function MethodologyContent() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto overflow-hidden">
        
        {/* === SECTION 1: HEADER === */}
         <div className="mb-20 text-center max-w-4xl mx-auto">
            <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
            >
                The <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500">Methodology.</span>
            </motion.h1>
            <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="text-xl text-slate-400 leading-relaxed max-w-3xl mx-auto"
            >
                Chaos is the enemy of scalable software. We bring order through a battle-tested methodology 
                that prioritizes transparency, code quality, and measurable business impact.
            </motion.p>
        </div>

        {/* === SECTION 2: PROCESS TIMELINE === */}
        <div className="mb-32">
             <div className="text-center mb-16">
                <h2 className="text-3xl font-bold text-white mb-3">Our 5-Step Digital Circuit</h2>
                <p className="text-slate-500">From concept to continuous delivery—predictable results, zero chaos.</p>
             </div>
             
             <div className="grid grid-cols-1 md:grid-cols-2 gap-12 relative">
                {/* Connecting Line (Desktop) */}
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gradient-to-b from-blue-500/0 via-blue-500/30 to-blue-500/0 hidden md:block" />

                {steps.map((step, index) => {
                    const Icon = step.icon; 
                    return (
                        <motion.div 
                            key={index} 
                            initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            className={`flex ${index % 2 === 0 ? 'md:justify-end md:pr-16' : 'md:justify-start md:pl-16 md:flex-row-reverse'} items-center relative`}
                        >
                            {/* Connecting Dot */}
                            <div className={`hidden md:flex absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-4 h-4 bg-slate-950 border-2 border-blue-500 rounded-full z-10 shadow-[0_0_10px_rgba(59,130,246,0.5)]`} />

                            <div className="bg-slate-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-3xl max-w-lg relative group hover:border-blue-500/30 transition-all duration-500 w-full shadow-2xl hover:shadow-blue-900/10 overflow-hidden">
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                <div className="relative z-10">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-900/30 to-slate-800 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-inner border border-white/5">
                                        <Icon size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">{step.title}</h3>
                                    <p className="text-slate-400 leading-relaxed">{step.desc}</p>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
             </div>
        </div>

        {/* === SECTION 3: CORE VALUES === */}
        <div className="pt-16 mb-20 border-t border-white/5 relative">
            <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
                 <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-purple-500/10 blur-[100px] rounded-full" />
                 <div className="absolute inset-0 bg-[size:40px_40px] bg-[radial-gradient(#ffffff1a_1px,transparent_1px)]" />
            </div>

            <div className="text-center mb-16 relative z-10">
                <h2 className="text-4xl font-extrabold text-white mb-3">Our Core Engineering DNA</h2>
                <div className="h-1 w-24 bg-gradient-to-r from-purple-500 to-cyan-500 mx-auto mb-6 rounded-full" />
                <p className="text-slate-500 max-w-2xl mx-auto">These values define our team, our output, and your experience working with Mirabytes.</p>
             </div>

             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative z-10">
                {coreValues.map((value, i) => {
                    const Icon = value.icon;
                    return (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className={`bg-slate-900/50 border border-white/10 p-8 rounded-3xl hover:bg-slate-900 transition-colors group shadow-xl ${value.shadow} hover:-translate-y-2 duration-500`}
                        >
                            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-inner border border-white/5">
                                <Icon size={28} className={value.color} />
                            </div>
                            <h3 className="text-2xl font-bold text-white mb-3">{value.title}</h3>
                            <p className="text-slate-400 leading-relaxed text-sm">{value.desc}</p>
                        </motion.div>
                    );
                })}
             </div>
        </div>

        {/* === SECTION 4: FINAL CTA === */}
        <div className="pt-20 border-t border-white/5 text-center relative">
             <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-blue-500/50 via-blue-500 to-blue-500/50 rounded-full mb-10" />
             <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 mt-10">
                 Ready to begin with a defined process?
             </h2>
             <Link href="/contact">
                <button className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/30 hover:scale-105 active:scale-95">
                    Start Strategic Consultation <ArrowRight size={18} className="ml-2" />
                </button>
             </Link>
        </div>
    </div>
  );
}