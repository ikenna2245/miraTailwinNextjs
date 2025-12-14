"use client";
import React from 'react';
import { Globe, ShieldCheck, Zap, User, Lightbulb, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

// --- DATA ---
const leadConsultant = {
  quote: "I build, I develop, I create. If you can envision it, I can develop it into a tangible product.",
  message: "At Mirabytes, we don't just offer services; we forge partnerships. My passion lies in understanding your unique vision and translating it into robust, effective digital realities. My commitment is to deliver excellence and tangible value that propels your business forward.",
  authorTitle: "Lead Technical Consultant"
};
const mission = "To empower our clients with transformative digital and data-driven solutions, fostering innovation, efficiency, and sustainable growth through expert consulting and collaborative partnership.";
const vision = "To be the leading catalyst for technological advancement and data literacy in businesses globally, recognized for our integrity, expertise, and the profound impact we deliver.";

const commitments = [
  {
    icon: ShieldCheck,
    title: "Radical Transparency",
    desc: "No hidden fees. No 'black box' code. You own the IP, and you see the progress daily."
  },
  {
    icon: Zap,
    title: "Velocity & Precision",
    desc: "We deploy on Day 1. Our CI/CD pipelines ensure that value is delivered continuously, not just at the deadline."
  },
  {
    icon: Globe,
    title: "Global Perspective",
    desc: "Distributed teams across time zones ensure your infrastructure is monitored and improved around the clock."
  }
];

export default function CompanyContent() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* === SECTION 1: HERO & SENIORITY CLAIM === */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center mb-32">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6">
            About Mirabytes
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight">
            Not just a vendor. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-500">
              Your Technical Partner.
            </span>
          </h1>
          <div className="space-y-6 text-lg text-slate-400 leading-relaxed">
            <p>
              In a world of outsourced mediocrity, Mirabytes stands as a fortress of engineering excellence. 
              We are a specialized consultancy focused on complex, high-performance web architecture.
            </p>
            <p>
              We bridge the gap between "Business Strategy" and "Technical Execution". 
              Our consultants aren't just coders; they are CTO-level strategists who understand 
              that every line of code must drive revenue.
            </p>
          </div>
        </div>
        
        {/* Abstract Visual: The "Core" */}
        <div className="relative h-[500px] w-full bg-slate-900/50 rounded-3xl border border-white/10 overflow-hidden flex items-center justify-center backdrop-blur-sm group">
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 to-red-500/5 group-hover:opacity-100 transition-opacity" />
          
          <div className="absolute w-[300px] h-[300px] border border-white/5 rounded-full animate-[spin_10s_linear_infinite]" />
          <div className="absolute w-[400px] h-[400px] border border-white/5 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
          <div className="absolute w-[200px] h-[200px] border border-dashed border-orange-500/20 rounded-full animate-[spin_20s_linear_infinite]" />

          <div className="text-center p-8 relative z-10">
            <div className="text-6xl font-bold text-white mb-2 tracking-tighter">100%</div>
            <div className="text-sm font-bold text-orange-400 uppercase tracking-widest mb-4">Senior Talent</div>
            <p className="text-slate-500 text-sm max-w-[200px] mx-auto">
              We do not hire juniors. Every consultant has 7+ years of production experience.
            </p>
          </div>
        </div>
      </div>

      {/* === SECTION 2: LEADERSHIP & COMMITMENT MESSAGE === */}
      <div className="mb-32">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-slate-900/60 border border-white/10 p-8 md:p-12 rounded-3xl shadow-2xl shadow-blue-900/10 relative overflow-hidden"
        >
          <div className="absolute top-0 bottom-0 left-0 w-2 bg-purple-500" />
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <div className="flex-shrink-0 w-24 h-24 rounded-full bg-purple-600 flex items-center justify-center text-white border-4 border-slate-900 shadow-xl">
              <User size={48} />
            </div>
            
            <div className="flex-1">
              <h2 className="text-3xl font-bold text-white mb-3">
                A Message From Our Lead Consultant
              </h2>
              <blockquote className="text-xl italic text-slate-300 border-l-4 border-blue-400 pl-4 mb-4">
                "{leadConsultant.quote}"
              </blockquote>
              <p className="text-slate-400 leading-relaxed text-sm max-w-2xl">
                {leadConsultant.message}
              </p>
              <p className="mt-4 text-xs font-bold text-purple-400 uppercase tracking-widest">
                — {leadConsultant.authorTitle}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* === SECTION 3: MISSION, VISION & CORE COMMITMENTS === */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-32">
        
        <div className="space-y-10">
          <div className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Lightbulb size={24} className="text-yellow-400" /> Our Mission
            </h3>
            <p className="text-slate-400 leading-relaxed italic">{mission}</p>
          </div>
          <div className="bg-slate-900/50 border border-white/10 p-8 rounded-3xl">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
              <Globe size={24} className="text-cyan-400" /> Our Vision
            </h3>
            <p className="text-slate-400 leading-relaxed italic">{vision}</p>
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 border-b border-white/5 pb-2">
            Operational Commitments
          </h3>
          {commitments.map((value, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="p-4 bg-slate-900/50 border border-white/10 rounded-xl flex items-start gap-4 hover:border-blue-500/50 transition-colors"
            >
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-400 mt-0.5">
                <value.icon size={16} />
              </div>
              <div>
                <h4 className="text-lg font-bold text-white">{value.title}</h4>
                <p className="text-slate-400 text-sm leading-relaxed">{value.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* === SECTION 4: FINAL CTA === */}
      <div className="pt-20 border-t border-white/5 text-center relative">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-blue-500/50 via-blue-500 to-blue-500/50 rounded-full mb-10" />
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 mt-10">
            Ready to secure a senior team?
        </h2>
        <Link href="/contact">
          <button className="inline-flex items-center justify-center px-10 py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl transition-all shadow-lg shadow-blue-900/30 hover:scale-105 active:scale-95">
              Start Technical Strategy <ArrowRight size={18} className="ml-2" />
          </button>
        </Link>
      </div>
    </div>
  );
}