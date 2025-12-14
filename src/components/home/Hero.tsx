"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Terminal, Database, Brain, Rocket } from 'lucide-react';
import Link from 'next/link';

const headlines = [
  {
    text: "Expert Web Development",
    sub: "Scalable, high-performance applications built with Next.js.",
    color: "from-blue-400 to-cyan-400",
    icon: Terminal
  },
  {
    text: "Actionable Data Science",
    sub: "Unlock insights and drive strategy with advanced analytics.",
    color: "from-emerald-400 to-teal-400",
    icon: Database
  },
  {
    text: "Intelligent AI Solutions",
    sub: "Automate and innovate with custom Machine Learning models.",
    color: "from-purple-400 to-pink-400",
    icon: Brain
  },
  {
    text: "Digital Transformation",
    sub: "Modernize your legacy tech stack for peak efficiency.",
    color: "from-orange-400 to-red-400",
    icon: Rocket
  }
];

export const Hero = () => {
  const [index, setIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  // Rotate headlines every 4 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % headlines.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  // Hide top banner after 8 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowBanner(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  const currentHeadline = headlines[index];
  const Icon = currentHeadline.icon;

  return (
    <section className="flex flex-col items-center text-center pt-32 pb-20 relative min-h-[80vh] justify-center">
      
      {/* Dynamic Background Glow */}
      <motion.div 
        animate={{ 
            background: `radial-gradient(circle at 50% 50%, ${index === 0 ? 'rgba(59, 130, 246, 0.15)' : index === 1 ? 'rgba(16, 185, 129, 0.15)' : index === 2 ? 'rgba(168, 85, 247, 0.15)' : 'rgba(249, 115, 22, 0.15)'} 0%, transparent 70%)` 
        }}
        className="absolute inset-0 z-0 blur-[100px] transition-colors duration-1000"
      />

      {/* Top Banner */}
      <AnimatePresence>
        {showBanner && (
            <motion.div 
                initial={{ opacity: 0, y: -20, height: 0 }}
                animate={{ opacity: 1, y: 0, height: 'auto' }}
                exit={{ opacity: 0, y: -20, height: 0 }}
                className="overflow-hidden relative z-10"
            >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-white/10 text-slate-300 text-xs font-semibold uppercase tracking-wider mb-8 backdrop-blur-md">
                    <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
                    </span>
                    Accepting New Projects
                </div>
            </motion.div>
        )}
      </AnimatePresence>

      {/* Rotating Icon */}
      <div className="mb-6 relative z-10 h-16 w-16 flex items-center justify-center">
        <AnimatePresence mode="wait">
            <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                exit={{ opacity: 0, scale: 0.5, rotate: 20 }}
                transition={{ duration: 0.5 }}
                className="bg-slate-900/50 p-4 rounded-2xl border border-white/10 backdrop-blur-md"
            >
                <Icon size={32} className="text-white" />
            </motion.div>
        </AnimatePresence>
      </div>

      {/* Rotating Headlines */}
      <div className="h-[180px] md:h-[220px] relative z-10 flex flex-col items-center justify-center w-full max-w-5xl">
        <AnimatePresence mode="wait">
            <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col items-center"
            >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tight mb-6">
                    <span className={`text-transparent bg-clip-text bg-gradient-to-r ${currentHeadline.color}`}>
                        {currentHeadline.text}
                    </span>
                </h1>
                <p className="text-lg md:text-xl text-slate-400 max-w-2xl leading-relaxed">
                    {currentHeadline.sub}
                </p>
            </motion.div>
        </AnimatePresence>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto relative z-10 mt-8"
      >
        <Link 
            href="/contact" 
            className="w-full sm:w-auto px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40 hover:-translate-y-1"
        >
          Start Your Project <ArrowRight size={18} />
        </Link>
        
        <Link 
            href="/services" 
            className="w-full sm:w-auto px-8 py-4 bg-slate-900/50 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 rounded-xl font-bold transition-all hover:-translate-y-1 backdrop-blur-sm flex items-center justify-center"
        >
          Explore Services
        </Link>
      </motion.div>
    </section>
  );
};