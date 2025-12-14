"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Zap, Lock, Cpu, GitBranch, Layers } from 'lucide-react';

const features = [
  {
    title: "Elite Engineering Only",
    description: "We don't hire juniors. Every consultant on your project is a Senior Engineer with 7+ years of production experience.",
    icon: Cpu,
    color: "text-blue-400",
    bg: "bg-blue-500/20",
  },
  {
    title: "Velocity by Design",
    description: "We deploy on Day 1. Our CI/CD pipelines and reusable architecture modules cut development time by 40%.",
    icon: Zap,
    color: "text-orange-400",
    bg: "bg-orange-500/20",
  },
  {
    title: "Radical Transparency",
    description: "No black boxes. You get full access to our code repositories, project boards, and Slack channels from kickoff.",
    icon: ShieldCheck,
    color: "text-emerald-400",
    bg: "bg-emerald-500/20",
  }
];

export const WhyUs = () => {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-full bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-900/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="px-6 max-w-7xl mx-auto relative z-10">
        
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-slate-300 text-xs font-mono mb-6 backdrop-blur-md"
          >
            <Layers size={12} /> THE MIRABYTES STANDARD
          </motion.div>
          <h2 className="text-4xl md:text-6xl font-extrabold text-white mb-6 tracking-tight">
            The Mirabytes <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Difference.</span>
          </h2>
          <p className="text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
            Most agencies sell hours. We sell outcomes. Here is why industry leaders trust us with their critical infrastructure.
          </p>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`
                group relative p-1 rounded-3xl bg-gradient-to-b from-white/5 to-white/0
                hover:from-blue-500/50 hover:to-blue-600/50 transition-all duration-500
              `}
            >
              <div className="relative h-full bg-slate-950 rounded-[22px] p-8 overflow-hidden">
                {/* Internal Glow */}
                <div className={`absolute -right-20 -top-20 w-64 h-64 rounded-full ${feature.bg} blur-3xl opacity-0 group-hover:opacity-50 transition-opacity duration-500`} />
                
                <div className="relative z-10">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 bg-slate-900 border border-white/10 ${feature.color} shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon size={28} />
                  </div>
                  
                  <h3 className="text-2xl font-bold text-white mb-4 group-hover:text-blue-100 transition-colors">
                    {feature.title}
                  </h3>
                  
                  <p className="text-slate-400 leading-relaxed group-hover:text-slate-300 transition-colors">
                    {feature.description}
                  </p>
                </div>

                {/* Decorative Elements */}
                <div className="absolute bottom-6 right-6 opacity-0 group-hover:opacity-10 transition-opacity duration-500 transform translate-y-4 group-hover:translate-y-0">
                   {index === 0 && <Cpu size={80} />}
                   {index === 1 && <GitBranch size={80} />}
                   {index === 2 && <Lock size={80} />}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Trust Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
            <div className="inline-flex flex-col md:flex-row items-center gap-8 px-10 py-5 rounded-2xl border border-white/5 bg-slate-900/50 backdrop-blur-xl shadow-2xl">
                <div className="text-center">
                    <div className="text-3xl font-black text-white">100%</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">In-House Team</div>
                </div>
                <div className="hidden md:block w-px h-10 bg-white/10" />
                <div className="text-center">
                    <div className="text-3xl font-black text-white">Global</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">24/7 Support</div>
                </div>
                <div className="hidden md:block w-px h-10 bg-white/10" />
                <div className="text-center">
                    <div className="text-3xl font-black text-white">Top 1%</div>
                    <div className="text-[10px] uppercase tracking-wider text-slate-500 font-bold mt-1">Talent Pool</div>
                </div>
            </div>
        </motion.div>

      </div>
    </section>
  );
};