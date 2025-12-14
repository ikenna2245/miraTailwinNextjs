"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Search, PenTool, Code2, Rocket, 
  LifeBuoy, CheckCircle2 
} from 'lucide-react';

// Exact content from your old ProcessSection.jsx mapped to the new design
const steps = [
  {
    title: "Discovery & Strategy",
    description: "We dive deep to understand your vision, challenges, and objectives, collaboratively defining a clear scope and strategic roadmap for success.",
    icon: Search,
    color: "text-blue-400",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    title: "Design & Prototyping",
    description: "Our experts craft intuitive user experiences (UX) and robust technical architectures, creating interactive prototypes to visualize the end solution.",
    icon: PenTool,
    color: "text-purple-400",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    title: "Agile Development",
    description: "Leveraging agile methodologies, our development teams build your solution iteratively, ensuring quality, scalability, and adherence to best practices.",
    icon: Code2,
    color: "text-emerald-400",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    title: "Rigorous Testing & Deployment",
    description: "Comprehensive testing across all stages guarantees a polished, reliable product. We manage the full deployment process for a seamless launch.",
    icon: Rocket,
    color: "text-orange-400",
    bg: "bg-orange-500/10",
    border: "border-orange-500/20"
  },
  {
    title: "Ongoing Support & Evolution",
    description: "Post-launch, Mirabytes provides dedicated support and collaborates with you to iterate, optimize, and evolve your solution as your business grows.",
    icon: LifeBuoy,
    color: "text-cyan-400",
    bg: "bg-cyan-500/10",
    border: "border-cyan-500/20"
  }
];

export const Process = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // The line grows from 0% to 100% height based on scroll
  const lineHeight = useTransform(scrollYProgress, [0, 0.9], ["0%", "100%"]);

  return (
    <section id="methodology" className="py-24 relative overflow-hidden">
      <div className="px-6 max-w-7xl mx-auto" ref={containerRef}>
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider mb-6"
          >
            <CheckCircle2 size={12} /> Tested & Trusted Process
          </motion.div>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-6">
            Chaos is the enemy. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">
              Process is the cure.
            </span>
          </h2>
          <p className="text-slate-400 text-lg">
            We bring order to complexity through a battle-tested methodology that prioritizes transparency, code quality, and business impact.
          </p>
        </div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Central Line (Background Track) */}
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-slate-800 -translate-x-1/2" />
          
          {/* Central Line (Active Glowing Progress) */}
          <motion.div 
            style={{ height: lineHeight }}
            className="absolute left-4 md:left-1/2 top-0 w-px bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 -translate-x-1/2 z-10 origin-top"
          />

          <div className="space-y-12 md:space-y-24">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-8 md:gap-16 ${index % 2 !== 0 ? 'md:flex-row-reverse' : ''}`}
              >
                
                {/* Timeline Node (The Dot) */}
                <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-slate-950 border-2 border-slate-700 z-20 shadow-[0_0_0_4px_rgba(15,23,42,1)] group-hover:border-blue-500 transition-colors">
                  <motion.div 
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ margin: "-20% 0px -20% 0px" }}
                    className={`w-full h-full rounded-full bg-gradient-to-r ${step.color.replace('text-', 'bg-')}`}
                  />
                </div>

                {/* Content Card */}
                <motion.div 
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="ml-12 md:ml-0 w-full md:w-[calc(50%-2rem)]"
                >
                  <div className={`p-8 rounded-3xl border backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl ${step.bg} ${step.border} bg-opacity-10 border-opacity-20`}>
                    <div className="flex items-center justify-between mb-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${step.bg} ${step.color}`}>
                            <step.icon size={24} />
                        </div>
                        <span className="text-4xl font-black text-white/5 select-none">0{index + 1}</span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {step.title}
                    </h3>
                    <p className="text-slate-400 leading-relaxed text-sm">
                      {step.description}
                    </p>
                  </div>
                </motion.div>

                {/* Empty Spacer for alternating layout (Desktop only) */}
                <div className="hidden md:block w-[calc(50%-2rem)]" />
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
};