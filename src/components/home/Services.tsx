"use client";
import { motion, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
  Bot, Cloud, Code2, Terminal, Zap, 
  BarChart3, ArrowRight, LayoutGrid 
} from 'lucide-react';
import Link from 'next/link';
import { MouseEvent } from 'react';

// Enhanced Bento Card with Spotlight Effect
const BentoCard = ({ title, subtitle, icon: Icon, colSpan = "col-span-1", variant = "default", children, href = "/services" }: any) => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <Link href={href} className={`${colSpan} block h-full group/card`}>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        onMouseMove={handleMouseMove}
        className={`
          relative overflow-hidden rounded-3xl border border-white/5 p-8 h-full flex flex-col justify-between
          bg-slate-900/40 backdrop-blur-sm transition-all duration-300
          hover:border-white/10 hover:shadow-2xl hover:shadow-blue-900/10
        `}
      >
        {/* Spotlight Gradient Layer */}
        <motion.div
          className="pointer-events-none absolute -inset-px opacity-0 transition duration-300 group-hover/card:opacity-100"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                650px circle at ${mouseX}px ${mouseY}px,
                rgba(59, 130, 246, 0.10),
                transparent 80%
              )
            `,
          }}
        />
        
        {/* Static Background Gradients */}
        <div className={`absolute inset-0 transition-opacity duration-500 opacity-0 group-hover/card:opacity-100
            ${variant === 'highlight' ? 'bg-gradient-to-br from-purple-500/10 via-transparent to-transparent' : ''}
            ${variant === 'gradient' ? 'bg-gradient-to-br from-blue-500/10 via-transparent to-transparent' : ''}
        `} />

        <div className="relative z-10">
          <div className={`
            w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-all duration-300
            border border-white/5
            ${variant === 'highlight' ? 'bg-purple-500/10 text-purple-400 group-hover/card:scale-110 group-hover/card:border-purple-500/30' : ''}
            ${variant === 'gradient' ? 'bg-blue-500/10 text-blue-400 group-hover/card:scale-110 group-hover/card:border-blue-500/30' : ''}
            ${variant === 'default' ? 'bg-slate-800/50 text-slate-400 group-hover/card:scale-110 group-hover/card:text-white group-hover/card:bg-slate-800' : ''}
          `}>
            <Icon size={28} />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-3 group-hover/card:text-blue-200 transition-colors">
            {title}
          </h3>
          <p className="text-slate-400 leading-relaxed text-sm group-hover/card:text-slate-300 transition-colors">
            {subtitle}
          </p>
        </div>

        <div className="relative z-10 mt-6 flex items-center text-sm font-bold text-blue-400 opacity-0 -translate-x-4 transition-all duration-300 group-hover/card:opacity-100 group-hover/card:translate-x-0">
          Explore Solution <ArrowRight size={14} className="ml-2" />
        </div>

        {children && <div className="mt-6 relative z-10">{children}</div>}
      </motion.div>
    </Link>
  );
};

export const Services = () => {
  return (
    <section id="services" className="relative py-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-8">
        <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-bold uppercase tracking-wider mb-6"
            >
              <LayoutGrid size={12} /> Our Expertise
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-6 leading-tight">
              Comprehensive <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Consulting Solutions.</span>
            </h2>
            <p className="text-slate-400 text-lg md:text-xl leading-relaxed max-w-2xl">
              We bridge the gap between complex technology and real-world business value. 
              From <span className="text-white">AI-driven insights</span> to <span className="text-white">scalable cloud infrastructure</span>, we engineer the future of your business.
            </p>
        </div>
        
        {/* Stylish Circular Link */}
        <Link 
          href="/services" 
          className="hidden md:flex group items-center justify-center w-16 h-16 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 hover:border-blue-500/50 transition-all relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500/20 scale-0 group-hover:scale-100 transition-transform duration-300 rounded-full" />
          <ArrowRight size={24} className="text-white relative z-10 group-hover:text-blue-400 -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 auto-rows-[340px]">
        
        {/* 1. AI & ML - Highlighted */}
        <BentoCard 
            title="AI & Machine Learning" 
            subtitle="Integrating Agentic AI into your business to automate complex workflows and decision making." 
            icon={Bot} 
            colSpan="md:col-span-2"
            variant="highlight"
        >
            <div className="flex gap-2 mt-auto pt-4 border-t border-white/5 flex-wrap">
                <span className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full font-mono border border-purple-500/20">Agentic AI</span>
                <span className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full font-mono border border-purple-500/20">LLMs</span>
                <span className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full font-mono border border-purple-500/20">Generative AI</span>
                <span className="text-xs bg-purple-500/10 text-purple-300 px-3 py-1 rounded-full font-mono border border-purple-500/20">Computer Vision</span>
            </div>
        </BentoCard>

        {/* 2. Web Development */}
        <BentoCard 
            title="Web Development" 
            subtitle="High-performance React & Next.js applications tailored to your brand identity." 
            icon={Code2} 
            colSpan="md:col-span-1"
        />

        {/* 3. Data Science */}
        <BentoCard 
            title="Data Science" 
            subtitle="Transform raw data into actionable insights and strategic value using Python & R." 
            icon={BarChart3} 
            colSpan="md:col-span-1"
        />

        {/* 4. Cloud Architecture */}
        <BentoCard 
            title="Cloud Architecture" 
            subtitle="Scalable, serverless infrastructure designed for AWS, GCP, and Azure environments." 
            icon={Cloud} 
            colSpan="md:col-span-1"
        />

        {/* 5. Technical Optimization - Gradient Variant */}
        <BentoCard 
            title="Technical Optimization" 
            subtitle="Deep-dive audits and refactoring to ensure peak performance, security, and scalability." 
            icon={Zap} 
            colSpan="md:col-span-2"
            variant="gradient"
        >
             <div className="flex gap-4 mt-auto pt-4 border-t border-white/5 items-center">
                <div className="flex flex-col gap-1 w-full">
                    <div className="flex justify-between text-xs text-blue-200 uppercase tracking-wider font-bold mb-1">
                        <span>Performance Score</span>
                        <span>100/100</span>
                    </div>
                    <div className="h-1.5 w-full bg-slate-700 rounded-full overflow-hidden">
                        <motion.div 
                            initial={{ width: 0 }}
                            whileInView={{ width: "100%" }}
                            transition={{ duration: 1.5, delay: 0.2 }}
                            className="h-full bg-gradient-to-r from-blue-500 to-emerald-400" 
                        />
                    </div>
                </div>
            </div>
        </BentoCard>

        {/* 6. DevOps */}
        <BentoCard 
            title="DevOps & CI/CD" 
            subtitle="Automated pipelines for reliable, zero-downtime deployments and infrastructure as code." 
            icon={Terminal} 
            colSpan="md:col-span-1"
        />

      </div>
    </section>
  );
};