"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowUpRight, BarChart3, School, ShoppingCart, Scale, Code2, Database
} from 'lucide-react';
import Link from 'next/link';

// --- CONFIGURATION ---
// These point to files in your public/videos folder
const VIDEOS = {
  optimus: "/videos/optimus-teaser.mp4", 
  firmchambers: "https://cdn.pixabay.com/video/2019/04/20/22965-331822262_large.mp4", // Kept CDN for demo, replace if you have local file
  powerbi: "/videos/powerbi-teaser.mp4",
  eproject: "/videos/eproject-teaser.mp4"
};

const projects = [
  {
    id: 'optimus',
    title: 'Optimus School Platform',
    category: 'EdTech Ecosystem',
    description: 'A comprehensive role-based digital environment for students, teachers, and administrators. Features real-time result processing and parent-teacher communication modules.',
    stats: '50k+ Active Users',
    tech: ['React', 'Django', 'GCP', 'PostgreSQL'],
    video: VIDEOS.optimus,
    icon: School,
    color: 'from-blue-600 to-cyan-500'
  },
  {
    id: 'firmchambers',
    title: 'FirmChambers',
    category: 'Legal Tech AI',
    description: 'An all-in-one, secure, and intelligent platform designed to modernize law firm operations. From client intake to final invoice, utilizing AI for automated file generation.',
    stats: 'AI Powered',
    tech: ['React', 'Node.js', 'LLMs', 'AWS'],
    video: VIDEOS.firmchambers,
    icon: Scale,
    color: 'from-amber-600 to-orange-500'
  },
  {
    id: 'powerbi',
    title: 'Customer Intelligence',
    category: 'Business Intelligence',
    description: 'Interactive Power BI dashboard evaluating customer buying patterns. We built complex DAX models to unlock actionable insights for sales and marketing strategy.',
    stats: '15% ROI Increase',
    tech: ['Power BI', 'SQL', 'Azure', 'Python'],
    video: VIDEOS.powerbi,
    icon: BarChart3,
    color: 'from-emerald-600 to-teal-500'
  },
  {
    id: 'eproject',
    title: 'eProject Library',
    category: 'E-Commerce Platform',
    description: 'A secure digital marketplace for academic resources. Features include automated writer hiring, secure payments via Stripe, and a custom CMS for managing digital assets.',
    stats: '99.9% Uptime',
    tech: ['Next.js', 'Stripe', 'Node.js', 'Redis'],
    video: VIDEOS.eproject,
    icon: ShoppingCart,
    color: 'from-purple-600 to-pink-500'
  }
];

// --- Sub-Component for Individual Cards ---
// Handles individual video playback state
const ProjectCard = ({ project, isActive, setActive }: { project: any, isActive: boolean, setActive: (id: string) => void }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  // Play video ONLY when this card is active
  useEffect(() => {
    if (videoRef.current) {
      if (isActive) {
        const playPromise = videoRef.current.play();
        if (playPromise !== undefined) {
            playPromise.catch((error) => {
                console.log("Auto-play prevented");
            });
        }
      } else {
        videoRef.current.pause();
      }
    }
  }, [isActive]);

  return (
    <motion.div
      layout
      onHoverStart={() => setActive(project.id)}
      onClick={() => setActive(project.id)}
      className={`
        relative rounded-3xl overflow-hidden cursor-pointer border border-white/5 bg-slate-900
        ${isActive ? 'lg:flex-[3] flex-[3]' : 'lg:flex-[1] flex-[1]'}
        transition-all duration-500 ease-out
      `}
    >
      {/* Background Video Layer */}
      <div className="absolute inset-0 z-0">
          <div className={`absolute inset-0 bg-gradient-to-br ${project.color} opacity-20`} />
          <video 
              ref={videoRef}
              src={project.video}
              className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'opacity-40 grayscale-0' : 'opacity-20 grayscale'}`}
              muted 
              loop 
              playsInline
          />
          {/* Gradient Overlay for Text Readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent" />
      </div>

      {/* Content Layer */}
      <div className="absolute inset-0 z-10 p-8 flex flex-col justify-end">
          
          {/* Active State Content */}
          {isActive ? (
              <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
              >
                  <div className="flex items-center gap-3 mb-4">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center bg-gradient-to-br ${project.color} text-white shadow-lg`}>
                          <project.icon size={20} />
                      </div>
                      <span className="text-blue-200 font-mono text-xs font-bold tracking-wider uppercase bg-blue-900/30 px-3 py-1 rounded-full border border-blue-500/20 backdrop-blur-sm">
                          {project.category}
                      </span>
                  </div>
                  
                  <h3 className="text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                      {project.title}
                  </h3>
                  
                  <p className="text-slate-300 text-sm md:text-base mb-6 max-w-xl leading-relaxed">
                      {project.description}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                      <div className="flex gap-2">
                          {project.tech.map((t: string) => (
                              <span key={t} className="text-[10px] text-slate-400 border border-white/10 px-2 py-1 rounded bg-black/40 backdrop-blur-md">
                                  {t}
                              </span>
                          ))}
                      </div>
                      <div className="h-4 w-px bg-white/20 hidden sm:block" />
                      <span className="text-emerald-400 font-bold text-sm flex items-center gap-1">
                          <BarChart3 size={14} /> {project.stats}
                      </span>
                  </div>
              </motion.div>
          ) : (
              /* Collapsed State Content */
              <div className="lg:rotate-[-90deg] lg:origin-bottom-left lg:absolute lg:bottom-8 lg:left-8 whitespace-nowrap">
                  <h3 className="text-2xl font-bold text-white/50 tracking-tight group-hover:text-white transition-colors">
                      {project.title}
                  </h3>
              </div>
          )}
      </div>
    </motion.div>
  );
};

export const Projects = () => {
  const [activeId, setActiveId] = useState<string | null>(projects[0].id);

  return (
    <section id="work" className="py-20">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
        <div className="max-w-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Proven <span className="text-blue-500">Success Stories.</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Real-world challenges solved with precision engineering. Hover to explore the details.
            </p>
        </div>
        <Link 
          href="/work" 
          className="hidden md:flex group items-center gap-2 text-sm font-bold text-white border-b border-white/20 pb-1 hover:border-blue-400 hover:text-blue-400 transition-all"
        >
          View Full Portfolio <ArrowUpRight size={16} className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform" />
        </Link>
      </div>

      {/* Kinetic Accordion Showcase */}
      <div className="flex flex-col lg:flex-row gap-4 h-[700px] lg:h-[500px]">
        {projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            isActive={activeId === project.id} 
            setActive={setActiveId} 
          />
        ))}
      </div>
    </section>
  );
};