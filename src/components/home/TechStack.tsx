"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Code2, Database, Cpu, Globe, Server, 
  Terminal, Shield, Cloud, Smartphone,
  Bot, Brain, BarChart3, Network // Imported new icons
} from 'lucide-react';

const technologies = [
  { name: "Agentic AI", icon: Bot },
  { name: "LLMs", icon: Brain },
  { name: "Data Science", icon: Network },
  { name: "Power BI", icon: BarChart3 },
  { name: "React", icon: Code2 },
  { name: "Next.js", icon: Globe },
  { name: "Python", icon: Terminal },
  { name: "TensorFlow", icon: Cpu },
  { name: "AWS", icon: Cloud },
  { name: "PostgreSQL", icon: Database },
  { name: "Docker", icon: Server },
  { name: "TypeScript", icon: Code2 },
  { name: "Security", icon: Shield },
  { name: "Mobile", icon: Smartphone },
];

export const TechStack = () => {
  return (
    <section className="py-10 border-y border-white/5 bg-slate-900/30 overflow-hidden relative">
      
      {/* Fade Gradients on Edges */}
      <div className="absolute top-0 left-0 bottom-0 w-24 bg-gradient-to-r from-slate-950 to-transparent z-10" />
      <div className="absolute top-0 right-0 bottom-0 w-24 bg-gradient-to-l from-slate-950 to-transparent z-10" />

      <div className="flex">
        {/* Animated Track - Duplicated to create seamless loop */}
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ x: 0 }}
            animate={{ x: "-100%" }}
            transition={{ 
              duration: 40, // Slightly slower duration to accommodate more items
              repeat: Infinity, 
              ease: "linear" 
            }}
            className="flex gap-16 pr-16"
          >
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="flex items-center gap-2 text-slate-500 hover:text-blue-400 transition-colors group cursor-default"
              >
                <tech.icon size={24} className="group-hover:scale-110 transition-transform" />
                <span className="text-lg font-bold whitespace-nowrap">{tech.name}</span>
              </div>
            ))}
          </motion.div>
        ))}
      </div>
    </section>
  );
};