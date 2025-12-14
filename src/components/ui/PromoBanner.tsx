"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowRight, Sparkles, BookOpen, Bot, Layers, BarChart3 } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { LeadCaptureModal } from './LeadCaptureModal';

// --- AD DEFINITIONS ---
// Different offers for different contexts
const AD_REGISTRY = {
  global: [
    {
      id: 'vibe-coding',
      title: 'The Rise of "Vibe Coding"',
      text: 'How non-technical founders are building unicorns with AI. Read the report.',
      cta: 'Get the Report',
      subject: 'Download: Vibe Coding Trend Report',
      icon: <Sparkles size={20} className="text-white" />,
      gradient: 'from-pink-600 to-rose-600'
    },
    {
      id: 'ai-readiness',
      title: 'Is Your Data AI-Ready?',
      text: 'Take the 5-minute assessment to see if you can deploy LLMs securely.',
      cta: 'Start Assessment',
      subject: 'Tool: AI Readiness Scorecard',
      icon: <Bot size={20} className="text-white" />,
      gradient: 'from-blue-600 to-indigo-600'
    }
  ],
  services: [
    {
      id: 'agentic-blueprint',
      title: 'Agentic AI Blueprint',
      text: 'Technical architecture for autonomous multi-agent systems.',
      cta: 'Download PDF',
      subject: 'Download: Agentic AI Blueprint',
      icon: <Bot size={20} className="text-white" />,
      gradient: 'from-emerald-600 to-teal-600'
    },
    {
      id: 'cloud-checklist',
      title: '2025 Cloud Checklist',
      text: 'Ensure your AWS/GCP infrastructure is cost-optimized and secure.',
      cta: 'Get Checklist',
      subject: 'Download: Cloud Architecture Checklist',
      icon: <Layers size={20} className="text-white" />,
      gradient: 'from-blue-600 to-cyan-600'
    }
  ],
  work: [
    {
      id: 'fintech-roi',
      title: 'Fintech ROI Study',
      text: 'How we reduced server costs by 40% while doubling transaction throughput.',
      cta: 'Read Case Study',
      subject: 'Request: Fintech ROI Case Study',
      icon: <BarChart3 size={20} className="text-white" />,
      gradient: 'from-violet-600 to-purple-600'
    },
    {
      id: 'scaling-secrets',
      title: 'Scaling from MVP to IPO',
      text: 'The technical playbook for growth-stage startups.',
      cta: 'Get Playbook',
      subject: 'Download: Startup Scaling Playbook',
      icon: <BookOpen size={20} className="text-white" />,
      gradient: 'from-orange-600 to-amber-600'
    }
  ]
};

export const PromoBanner = () => {
  // Store an array of active ads
  const [activeAds, setActiveAds] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  
  // Which ad content to show in the modal
  const [modalContent, setModalContent] = useState({ title: "", subtitle: "", subject: "" });
  
  const pathname = usePathname();

  // --- 1. HANDLE PAGE NAVIGATION ---
  useEffect(() => {
    // Reset ads on navigation so they are context-relevant
    setActiveAds([]);

    // Determine context
    let contextAds = AD_REGISTRY.global;
    if (pathname === '/services') contextAds = AD_REGISTRY.services;
    if (pathname === '/work') contextAds = AD_REGISTRY.work;

    // --- 2. SCHEDULE ADS ---
    const t1 = setTimeout(() => {
        addAd(contextAds[0]);
    }, 4000); // 1st Ad after 4s

    const t2 = setTimeout(() => {
        addAd(contextAds[1]);
    }, 12000); // 2nd Ad after 12s

    return () => {
        clearTimeout(t1);
        clearTimeout(t2);
    };
  }, [pathname]);

  // --- 3. HELPER: ADD AD (With Stack Limit) ---
  const addAd = (newAd: any) => {
    setActiveAds(prev => {
        // If already showing 2, remove the oldest (first index) and add new one
        if (prev.length >= 2) {
            const [_, ...rest] = prev;
            return [...rest, newAd];
        }
        // Check if already exists to avoid dupes
        if (prev.find(a => a.id === newAd.id)) return prev;
        
        return [...prev, newAd];
    });
  };

  // --- 4. HELPER: REMOVE AD ---
  const removeAd = (id: string) => {
    setActiveAds(prev => prev.filter(ad => ad.id !== id));
  };

  // --- 5. HELPER: OPEN MODAL ---
  const handleAdClick = (ad: any) => {
    setModalContent({
        title: ad.title,
        subtitle: ad.text,
        subject: ad.subject
    });
    setShowModal(true);
  };

  return (
    <>
      <LeadCaptureModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)} 
        adContent={modalContent}
      />

      {/* CONTAINER: Fixed Bottom-Left
          - Flex Col: Stacks items vertically
          - Justify End: Pushes items to the bottom (so stack grows up)
          - Gap: Spacing between ads
      */}
      <div className="fixed bottom-6 left-6 z-40 flex flex-col gap-3 max-w-sm w-full pointer-events-none">
        <AnimatePresence mode="popLayout"> 
          {activeAds.map((ad) => (
            <motion.div
              key={ad.id}
              layout // Enables smooth reordering animations
              initial={{ opacity: 0, x: -50, scale: 0.9 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="pointer-events-auto" // Re-enable clicks for the card itself
            >
              <div className="relative bg-slate-900/90 backdrop-blur-md border border-white/10 p-1 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden group hover:border-blue-400/50 transition-colors">
                
                {/* Dynamic Gradient Background based on Ad Type */}
                <div className={`absolute inset-0 bg-gradient-to-r ${ad.gradient} opacity-10 group-hover:opacity-20 transition-opacity`} />
                
                <div className="relative bg-slate-950/80 rounded-xl p-4">
                  <button 
                    onClick={(e) => { e.stopPropagation(); removeAd(ad.id); }}
                    className="absolute top-2 right-2 text-slate-500 hover:text-white transition-colors bg-white/5 hover:bg-white/10 rounded-full p-1 z-10"
                  >
                    <X size={14} />
                  </button>

                  <div className="flex items-start gap-4">
                    {/* Icon Circle */}
                    <div className="relative">
                      <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${ad.gradient} flex items-center justify-center shrink-0 shadow-lg`}>
                          {ad.icon}
                      </div>
                      {/* Notification Dot */}
                      <div className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-red-500 border-2 border-slate-950 rounded-full animate-pulse" />
                    </div>
                    
                    <div className="pr-6">
                      <h4 className="text-white font-bold text-sm mb-0.5">{ad.title}</h4>
                      <p className="text-slate-400 text-[11px] mb-2 leading-snug line-clamp-2">
                        {ad.text}
                      </p>
                      <button 
                        onClick={() => handleAdClick(ad)}
                        className="text-[10px] font-bold text-blue-300 hover:text-white flex items-center gap-1 group/btn bg-blue-500/10 hover:bg-blue-500/30 px-2.5 py-1 rounded-md transition-all border border-blue-500/20"
                      >
                        {ad.cta} 
                        <ArrowRight size={10} className="group-hover/btn:translate-x-1 transition-transform" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </>
  );
};