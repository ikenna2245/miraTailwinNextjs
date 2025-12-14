"use client";
import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence, useMotionTemplate, useMotionValue } from 'framer-motion';
import { 
    Bot, Cloud, Code2, Terminal, Zap, 
    BarChart3, ArrowRight, LayoutGrid, Cpu, 
    Search, ShieldCheck, Database, Settings, MessageSquare, ChevronRight, Briefcase
} from 'lucide-react';
import Link from 'next/link';
import { useAnalytics } from '@/hooks/useAnalytics';


const serviceFeatures = [
    {
        id: 1,
        category: 'Web Development',
        title: 'Full-Stack Applications',
        subheading: 'Building custom, scalable platforms using modern React, Next.js, and TypeScript, optimized for speed and SEO.',
        icon: Code2,
    },
    {
        id: 2,
        category: 'Web Development',
        title: 'High-Performance UI/UX',
        subheading: 'Engineering delightful user interfaces focused on Core Web Vitals, accessibility, and fluid interaction (using Tailwind/Framer Motion).',
        icon: LayoutGrid,
    },
    {
        id: 3,
        category: 'Web Development',
        title: 'API Design & Integration',
        subheading: 'Developing fast, reliable REST and GraphQL APIs to handle complex data transactions and power high-traffic applications.',
        icon: Database,
    },
    {
        id: 4,
        category: 'AI & Machine Learning',
        title: 'Agentic AI Systems',
        subheading: 'Implementing autonomous AI agents to automate complex multi-step business workflows, decision-making, and strategic analysis.',
        icon: Bot,
    },
    {
        id: 5,
        category: 'AI & Machine Learning',
        title: 'LLM & Generative AI',
        subheading: 'Custom fine-tuning and deployment of Large Language Models (LLMs) for content generation, research, and conversational interfaces.',
        icon: Cpu,
    },
    {
        id: 6,
        category: 'Data Science & Analytics',
        title: 'Predictive Modeling',
        subheading: 'Developing statistical models to forecast market trends, predict customer churn, and optimize pricing strategies for higher ROI.',
        icon: BarChart3,
    },
    {
        id: 7,
        category: 'Data Science & Analytics',
        title: 'Business Intelligence (BI)',
        subheading: 'Designing and building interactive dashboards (Power BI, Tableau) to transform raw data into clear, actionable business insights.',
        icon: Search,
    },
    {
        id: 8,
        category: 'Technical Optimization',
        title: 'Cloud Architecture & DevOps',
        subheading: 'Designing secure, serverless infrastructure on AWS/GCP and establishing robust, zero-downtime CI/CD pipelines.',
        icon: Cloud,
    },
    {
        id: 9,
        category: 'Technical Optimization',
        title: 'Security Audits & Compliance',
        subheading: 'Deep-dive security audits, compliance checks (GDPR/HIPAA), and system hardening against modern threats.',
        icon: ShieldCheck,
    },
    {
        id: 10,
        category: 'Technical Optimization',
        title: 'Performance & Scalability',
        subheading: 'Identifying and eliminating performance bottlenecks (latency, load times) to ensure your application scales horizontally under massive traffic.',
        icon: Zap,
    }
];

// --- COMPONENTS ---

// Service Card with Hover Effect
const ServiceCard = ({ feature, index }: { feature: typeof serviceFeatures[0], index: number }) => {
    const Icon = feature.icon;
    
    // Dynamic color class based on index/theme for visual variety
    const colorClass = index % 3 === 0 ? 'text-blue-400 border-blue-500/20' : 
                       index % 3 === 1 ? 'text-purple-400 border-purple-500/20' : 
                       'text-emerald-400 border-emerald-500/20';
                       
    const gradientClass = index % 3 === 0 ? 'from-blue-900/40 to-indigo-900/20' : 
                          index % 3 === 1 ? 'from-purple-900/40 to-fuchsia-900/20' : 
                          'from-emerald-900/40 to-teal-900/20';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true, margin: "-50px" }}
            whileHover={{ y: -6, scale: 1.01 }}
            className={`
                group relative overflow-hidden rounded-3xl border ${colorClass} p-8 h-full flex flex-col justify-start
                bg-gradient-to-br ${gradientClass} backdrop-blur-sm shadow-xl hover:border-white/10 transition-all duration-300
            `}
        >
            <div className="relative z-10">
                <div className={`
                    w-14 h-14 rounded-xl flex items-center justify-center mb-6 
                    bg-white/10 ${colorClass} transition-transform duration-300
                `}>
                    <Icon size={28} />
                </div>
                
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-200 transition-colors">
                    {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed text-sm group-hover:text-slate-300 transition-colors">
                    {feature.subheading}
                </p>
            </div>

            <Link 
                href="/contact"
                className="relative z-10 mt-8 flex items-center text-sm font-bold text-blue-400 opacity-80 group-hover:opacity-100 transition-all"
            >
                Start Consultation <ArrowRight size={14} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Link>
        </motion.div>
    );
};

// Category Button Component
const CategoryButton = ({ category, isActive, onClick, icon: Icon }: { category: string, isActive: boolean, onClick: () => void, icon: any }) => (
    <button
        onClick={onClick}
        className={`w-full text-left py-4 px-6 rounded-xl transition-all duration-300 border mb-2 group
            ${isActive 
                ? 'bg-blue-600/20 border-blue-500/50 text-white shadow-lg shadow-blue-900/20' 
                : 'bg-slate-900/40 border-white/5 hover:bg-slate-800/50 text-slate-400 hover:text-white'
            }`
        }
    >
        <div className="flex items-center justify-between">
            <span className="flex items-center gap-4 text-lg font-bold">
                <Icon size={20} className={isActive ? 'text-blue-400' : 'text-slate-500 group-hover:text-purple-400'} />
                {category}
            </span>
            <ChevronRight size={18} className={isActive ? 'text-white' : 'text-slate-500 group-hover:translate-x-1 transition-transform'} />
        </div>
    </button>
);

export default function ServicesContent() {
    const { trackEvent } = useAnalytics();
    const [activeTab, setActiveTab] = useState(0);
    
    // Get unique category names (tabs)
    const categories = useMemo(() => {
        return [...new Set(serviceFeatures.map(f => f.category))];
    }, []);

    // Get features filtered by the active tab
    const filteredFeatures = useMemo(() => {
        if (categories.length === 0) return [];
        return serviceFeatures.filter(f => f.category === categories[activeTab]);
    }, [activeTab, categories]);

    // Mock Icon Mapping for Category Buttons
    const categoryIcons: any = {
        'Web Development': Code2,
        'AI & Machine Learning': Bot,
        'Data Science & Analytics': BarChart3,
        'Technical Optimization': Zap,
    };

    return (
        <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
            
            {/* Header */}
            <div className="mb-20 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider mb-6">
                    <Settings size={12} /> Full Spectrum Consulting
                </div>
                <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
                    Technical <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-blue-400">Arsenal.</span>
                </h1>
                <p className="text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
                    We architect solutions using expertise in high-performance Web, cutting-edge AI, and scalable Cloud infrastructure.
                </p>
            </div>

            {/* --- MOBILE WRAPPING NAVIGATION --- */}
            <div className="md:hidden mb-8">
                <div className="flex flex-wrap gap-3 pb-2">
                    {categories.map((category, index) => {
                        const Icon = categoryIcons[category] || Settings;
                        const isActive = activeTab === index;
                        return (
                            <button
                                key={category}
                                onClick={() => setActiveTab(index)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-semibold transition-all duration-300
                                    ${isActive 
                                        ? 'bg-blue-600 border-blue-500 text-white shadow-md shadow-blue-900/40' 
                                        : 'bg-slate-800/60 border-white/10 text-slate-400 hover:text-white hover:border-blue-500/30'
                                    }`}
                            >
                                <Icon size={16} />
                                {category}
                            </button>
                        );
                    })}
                </div>
            </div>

            {/* Content Layout */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                
                {/* Left Column: Vertical Category Selector (DESKTOP ONLY) */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="hidden md:block md:col-span-4 lg:col-span-3 h-fit"
                >
                    <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 rounded-2xl p-4 shadow-xl">
                        <h3 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                           <Briefcase size={14} /> Focus Areas
                        </h3>
                        {categories.map((category, index) => (
                            <CategoryButton
                                key={category}
                                category={category}
                                isActive={activeTab === index}
                                onClick={() => {
                                    setActiveTab(index);
                                    trackEvent('view_service_category', 'Services Page', category);
                                }}
                                icon={categoryIcons[category] || Settings}
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Right Column: Service Cards Grid */}
                <div className="col-span-full md:col-span-8 lg:col-span-9">
                    <h2 className="text-3xl font-bold text-white mb-8 border-b border-white/5 pb-4">
                        {categories[activeTab]}
                    </h2>
                    
                    <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 min-h-[300px]">
                        <AnimatePresence mode="wait">
                            {filteredFeatures.map((feature, index) => (
                                <ServiceCard key={feature.id} feature={feature} index={index} />
                            ))}
                        </AnimatePresence>
                    </motion.div>
                </div>

            </div>
            
            {/* Final Service CTA */}
            <div className="text-center pt-20 mt-16 border-t border-white/5">
                <h2 className="text-3xl font-bold text-white mb-4">Ready to Scope Your Project?</h2>
                <p className="text-slate-400 mb-8 max-w-2xl mx-auto">
                    If you see a service that fits, let's turn theory into architecture. Book a free consultation.
                </p>
                <Link href="/contact">
                    <button className="px-8 py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2 mx-auto shadow-lg shadow-blue-900/30">
                        Start Technical Consultation <MessageSquare size={18} />
                    </button>
                </Link>
            </div>
        </div>
    );
}