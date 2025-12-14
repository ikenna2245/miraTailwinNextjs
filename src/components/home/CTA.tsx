"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Mail, Rocket } from 'lucide-react';
import Link from 'next/link';

export const CTA = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      
      {/* Background Warp Effect */}
      <div className="absolute inset-0 bg-blue-600/5 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 px-6 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          {/* The Mirabytes Standard Badge */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider mb-8">
            <Rocket size={12} className="text-blue-400" /> Start Your Journey
          </div>

          <h2 className="text-5xl md:text-7xl font-extrabold text-white mb-8 tracking-tight leading-tight">
            Ready to Engineer <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
              Your Future?
            </span>
          </h2>
          
          <p className="text-xl text-slate-400 mb-10 max-w-2xl mx-auto leading-relaxed">
            Stop wrestling with legacy code. Let's build a platform that grows with your ambition. 
            Schedule a technical strategy session today.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              href="/contact"
              className="px-8 py-4 bg-white text-slate-950 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center gap-2 group shadow-xl shadow-blue-900/10 hover:shadow-blue-900/20 hover:-translate-y-1"
            >
              Book Discovery Call <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link 
              href="mailto:hello@mirabytes.io"
              className="px-8 py-4 bg-slate-900 border border-white/10 text-white rounded-xl font-bold hover:bg-slate-800 transition-all flex items-center gap-2 hover:-translate-y-1"
            >
              <Mail size={18} /> Email Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};