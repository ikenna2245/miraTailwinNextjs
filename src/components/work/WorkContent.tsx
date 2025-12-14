"use client";
import React, { useState, useRef, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Folder, X, Maximize2, Code2, 
  Database, Layout, BarChart3, Briefcase, 
  Search, ChevronLeft, ChevronRight, ChevronDown, CheckCircle2, MessageSquare
} from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useAnalytics } from '@/hooks/useAnalytics';
// --- PROJECT DATA ---
const projects = [
  {
    id: 'optimus',
    title: 'Optimus School Platform',
    category: 'EdTech Ecosystem',
    excerpt: 'A unified digital environment for schools. Streamlining academic processes and communication.',
    video: '/videos/optimus-teaser.mp4',
    poster: '/images/portfolio/optimus-poster.png',
    tech: ['React', 'Django', 'GCP', 'PostgreSQL', 'Material-UI'],
    challenges: 'Integrating diverse functionalities (results, schedules, payments) into a cohesive user experience while ensuring data security for thousands of students.',
    solution: 'Developed a modular microservices architecture. Implemented robust authentication (JWT) and role-based access control on top of a scalable GCP infrastructure.',
    results: '50k+ Active Users, 30% reduction in admin workload.',
    gallery: ['/images/portfolio/optimus-dashboard.png', '/images/portfolio/student-portal.png']
  },
  {
    id: 'firmchambers',
    title: 'FirmChambers', 
    category: 'Legal Tech AI',
    excerpt: 'Intelligent cloud-based solution to modernize legal operations for law firms.',
    video: 'https://cdn.pixabay.com/video/2019/04/20/22965-331822262_large.mp4',
    poster: '/images/portfolio/makmav-poster.png',
    tech: ['React', 'Node.js', 'LLMs', 'AWS', 'PostgreSQL'],
    challenges: 'Designing a highly secure, compliant (GDPR), and scalable platform that leverages AI without compromising sensitive client data.',
    solution: 'Built a cloud-native architecture with end-to-end encryption. Integrated LLMs for document generation with strict data isolation policies.',
    results: 'Automated 40% of routine document drafting for pilot firms.',
    gallery: ['https://placehold.co/800x600/1e293b/94a3b8?text=Feature+Mockup+1', 'https://placehold.co/800x600/1e293b/94a3b8?text=Feature+Mockup+2']
  },
  {
    id: 'powerbi',
    title: 'Customer Intelligence',
    category: 'Business Intelligence',
    excerpt: 'Interactive dashboard evaluating customer buying patterns and campaign ROI.',
    video: '/videos/powerbi-teaser.mp4',
    poster: '/images/portfolio/powerbi-poster.png',
    tech: ['Power BI', 'DAX', 'SQL', 'Azure Data Services'],
    challenges: 'Consolidating data from multiple fragmented sources and creating intuitive visualizations for non-technical stakeholders.',
    solution: 'Utilized advanced DAX calculations and Azure Data Services to create a unified data model. Designed a user-centric dashboard with drill-down capabilities.',
    results: 'Identified a $2M market segment opportunity through pattern analysis.',
    gallery: ['/images/portfolio/product-performance.png', '/images/portfolio/roi-campaign.png']
  },
  {
    id: 'eproject',
    title: 'eProject Library',
    category: 'E-Commerce Platform',
    excerpt: 'Secure digital marketplace for academic resources and writer hiring.',
    video: '/videos/eproject-teaser.mp4',
    poster: '/images/portfolio/eproject-poster.png',
    tech: ['Next.js', 'Stripe', 'Node.js', 'Redis', 'MySQL'],
    challenges: 'Managing a large inventory of digital products and ensuring secure, instant delivery upon payment.',
    solution: 'Custom e-commerce engine with Stripe Connect integration. implemented automated writer matching algorithms.',
    results: '99.9% Uptime with over 10k transactions processed.',
    gallery: ['/images/portfolio/eproject-home.png', '/images/portfolio/product-page.png']
  },
  {
    id: 'makmav',
    title: 'Makmav Recruitment',
    category: 'Healthcare Web',
    excerpt: 'Connecting healthcare facilities with skilled professionals via a trusted digital hub.',
    video: null,
    poster: '/images/portfolio/makmav-poster.png',
    tech: ['WordPress', 'PHP', 'SEO', 'Appointment API'],
    challenges: 'Creating a trustworthy online presence that caters to diverse audiences (providers, job seekers, patients).',
    solution: 'Custom theme development with an integrated job board and appointment booking system. Heavy focus on SEO and accessibility.',
    results: 'Increased client inquiries by 200% in first quarter.',
    gallery: ['/images/portfolio/makmav-homepage.png', '/images/portfolio/makmav-service-page.png']
  }
];

// --- SUB-COMPONENTS ---
const FolderCard = ({ project, onClick }: { project: any, onClick: () => void }) => {
  return (
    <motion.div layoutId={`card-${project.id}`} onClick={onClick} whileHover={{ y: -8 }} className="group relative cursor-pointer">
      <div className="absolute -top-3 left-0 w-1/3 h-4 bg-slate-800 rounded-t-lg border-t border-l border-r border-white/10 group-hover:bg-blue-900/30 transition-colors" />
      <div className="relative rounded-br-2xl rounded-bl-2xl rounded-tr-2xl bg-slate-900 border border-white/10 overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-blue-900/20 group-hover:border-blue-500/30">
        <div className="h-48 relative overflow-hidden">
          {project.video ? (
            <video src={project.video} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" muted loop playsInline onMouseOver={e => e.currentTarget.play()} onMouseOut={e => { e.currentTarget.pause(); e.currentTarget.currentTime = 0; }} />
          ) : (
            <img src={project.poster} alt={project.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
          <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md border border-white/10 p-2 rounded-lg text-white opacity-0 group-hover:opacity-100 transition-opacity">
            <Maximize2 size={16} />
          </div>
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Folder size={14} className="text-blue-400" />
            <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{project.category}</span>
          </div>
          <h3 className="text-xl font-bold text-white mb-2 group-hover:text-blue-200 transition-colors">{project.title}</h3>
          <p className="text-slate-400 text-sm line-clamp-2">{project.excerpt}</p>
        </div>
        <div className="px-6 pb-6 pt-2 flex flex-wrap gap-2">
          {project.tech.slice(0, 3).map((t: string) => (
            <span key={t} className="text-[10px] bg-white/5 border border-white/5 text-slate-400 px-2 py-1 rounded">{t}</span>
          ))}
          {project.tech.length > 3 && <span className="text-[10px] bg-white/5 border border-white/5 text-slate-400 px-2 py-1 rounded">+{project.tech.length - 3}</span>}
        </div>
      </div>
    </motion.div>
  );
};

const TechMultiSelect = ({ options, selectedValues, onToggle, label }: { options: string[], selectedValues: string[], onToggle: (value: string) => void, label: string }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) setIsOpen(false);
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ref]);

    const displayLabel = selectedValues.length === 0 ? "All Tech Stacks" : selectedValues.length === 1 ? selectedValues[0] : `${selectedValues.length} Selected`;

    return (
        <div className="relative w-full md:w-1/4" ref={ref}>
            <button onClick={() => setIsOpen(!isOpen)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-sm text-slate-300 focus:border-emerald-500 transition-colors flex justify-between items-center">
                {displayLabel}
                <ChevronDown size={16} className={`text-slate-500 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
            </button>
            <AnimatePresence>
                {isOpen && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 5 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.2 }} className="absolute bottom-full left-0 w-full mb-2 bg-slate-900 border border-white/10 rounded-xl shadow-2xl max-h-64 overflow-y-auto z-10">
                        {options.map(option => (
                            <div key={option} onClick={() => onToggle(option)} className="flex items-center justify-between px-4 py-2 text-sm text-slate-300 hover:bg-white/5 cursor-pointer transition-colors">
                                <span>{option}</span>
                                {selectedValues.includes(option) && <CheckCircle2 size={16} className="text-emerald-500" />}
                            </div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default function WorkContent() {
  const [selectedProject, setSelectedProject] = useState<any>(null);
  const searchParams = useSearchParams();
  const { trackEvent } = useAnalytics();

  // Filtering State
  const ITEMS_PER_PAGE = 6;
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTech, setSelectedTech] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);

  // --- AUTOMATED FILTERING FROM ASSISTANT BOT ---
  useEffect(() => {
    const filterParam = searchParams.get('filter');
    if (filterParam) {
        setSearchTerm(filterParam); // Pre-fill search with the filter param
        setSelectedCategory('All'); 
        setSelectedTech([]);
    }
  }, [searchParams]);

  // Derived Data
  const allCategories = useMemo(() => ['All', ...new Set(projects.map(p => p.category))], []);
  const allTechStacks = useMemo(() => {
    const stacks = new Set<string>();
    projects.forEach(p => p.tech.forEach(t => stacks.add(t)));
    return Array.from(stacks).sort();
  }, []);

  const handleTechToggle = (tech: string) => {
      setSelectedTech(prev => prev.includes(tech) ? prev.filter(t => t !== tech) : [...prev, tech]);
  };

  const filteredProjects = useMemo(() => {
    setCurrentPage(1);
    return projects.filter(project => {
      const lowerSearch = searchTerm.toLowerCase();
      // Broad search: checks Title, Excerpt, Tech, AND Category
      const matchesSearch = project.title.toLowerCase().includes(lowerSearch) ||
                            project.excerpt.toLowerCase().includes(lowerSearch) ||
                            project.tech.some(t => t.toLowerCase().includes(lowerSearch)) ||
                            project.category.toLowerCase().includes(lowerSearch);

      const matchesCategory = selectedCategory === 'All' || project.category === selectedCategory;
      const matchesTech = selectedTech.length === 0 || selectedTech.every(t => project.tech.includes(t));

      return matchesSearch && matchesCategory && matchesTech;
    });
  }, [searchTerm, selectedCategory, selectedTech]);

  const totalPages = Math.ceil(filteredProjects.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const visibleProjects = filteredProjects.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <>
      {/* Header */}
      <div className="mb-20">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-300 text-xs font-bold uppercase tracking-wider mb-6">
          <Briefcase size={12} /> The Archives
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
          Selected <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">Work.</span>
        </h1>
        <p className="text-xl text-slate-400 max-w-2xl leading-relaxed">
          A collection of high-value technical challenges solved with precision engineering. 
          Open a dossier to explore the architecture and impact for your business.
        </p>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl mb-12 flex flex-col md:flex-row gap-4 justify-between items-center shadow-lg">
        <div className="w-full md:w-1/3 relative">
          <input type="text" placeholder="Search title, tech, or keywords..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="w-full px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-sm text-white placeholder-slate-500 focus:border-blue-500 transition-colors pl-10" />
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
        </div>
        <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="w-full md:w-1/4 px-4 py-3 bg-slate-800/50 border border-white/10 rounded-xl text-sm text-slate-300 focus:border-purple-500 transition-colors appearance-none cursor-pointer pr-10" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 1rem center' }}>
          {allCategories.map(cat => <option key={cat} value={cat} className="bg-slate-900">{cat}</option>)}
        </select>
        <TechMultiSelect options={allTechStacks} selectedValues={selectedTech} onToggle={handleTechToggle} label="Tech Stack" />
        <span className="text-sm text-slate-500 hidden lg:block">{filteredProjects.length} Dossiers</span>
      </div>

      {/* Grid */}
      <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12">
        {visibleProjects.length > 0 ? (
          visibleProjects.map((project) => (
            <FolderCard key={project.id} project={project} onClick={() => {
                                                                            setSelectedProject(project);
                                                                            trackEvent('view_case_study', 'Portfolio', project.title);
                                                                        }} />
          ))
        ) : (
          <div className="lg:col-span-3 text-center py-16">
            <p className="text-xl text-slate-500">No matching dossiers found. Try simplifying your filter criteria.</p>
          </div>
        )}
      </motion.div>

      {/* Pagination */}
      {totalPages > 0 && (
        <div className="flex justify-center items-center gap-4 mt-16">
          <button onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))} disabled={currentPage === 1} className="p-3 bg-slate-900 border border-white/10 rounded-full text-slate-400 hover:text-white disabled:opacity-30 transition-all"><ChevronLeft size={20} /></button>
          <span className="text-sm text-white font-medium">Page {currentPage} of {totalPages}</span>
          <button onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))} disabled={currentPage === totalPages} className="p-3 bg-slate-900 border border-white/10 rounded-full text-slate-400 hover:text-white disabled:opacity-30 transition-all"><ChevronRight size={20} /></button>
        </div>
      )}

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-xl overflow-y-auto" onClick={() => setSelectedProject(null)}>
            <div className="min-h-screen flex items-start justify-center p-4 md:p-8 pt-20 pb-20">
              <motion.div layoutId={`card-${selectedProject.id}`} className="w-full max-w-5xl bg-slate-900 border border-white/10 rounded-3xl overflow-hidden shadow-2xl relative" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => setSelectedProject(null)} className="absolute top-6 right-6 z-20 p-2 bg-black/50 hover:bg-black/80 rounded-full text-white transition-colors"><X size={20} /></button>
                <div className="grid grid-cols-1 lg:grid-cols-2">
                  <div className="relative h-[300px] lg:h-auto bg-black">
                    {selectedProject.video ? (
                        <video src={selectedProject.video} className="w-full h-full object-cover" autoPlay loop muted playsInline />
                    ) : (
                        <img src={selectedProject.poster} className="w-full h-full object-cover" alt={selectedProject.title} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent opacity-90 lg:opacity-60" />
                    <div className="absolute bottom-8 left-8 right-8">
                        <div className="text-xs font-mono text-blue-400 mb-2 flex items-center gap-2"><Database size={12} /> CASE STUDY: {selectedProject.id.toUpperCase()}</div>
                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedProject.title}</h2>
                        <div className="flex flex-wrap gap-2">{selectedProject.tech.map((t: string) => <span key={t} className="text-xs bg-white/10 border border-white/10 text-white px-2 py-1 rounded backdrop-blur-md">{t}</span>)}</div>
                    </div>
                  </div>
                  <div className="p-8 md:p-12 space-y-8 overflow-y-auto max-h-[80vh]">
                    {selectedProject.results && (
                        <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center gap-4">
                            <div className="p-2 bg-emerald-500/20 rounded-lg text-emerald-400"><BarChart3 size={24} /></div>
                            <div><div className="text-xs text-emerald-300 uppercase font-bold tracking-wider">Business Impact</div><div className="text-white font-bold">{selectedProject.results}</div></div>
                        </div>
                    )}
                    <div><h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Layout size={18} className="text-blue-400" /> The Challenge</h3><p className="text-slate-400 leading-relaxed text-sm p-4 rounded-lg border border-white/5 bg-slate-900/50">{selectedProject.challenges}</p></div>
                    <div><h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2"><Code2 size={18} className="text-purple-400" /> Our Solution</h3><p className="text-slate-400 leading-relaxed text-sm p-4 rounded-lg border border-white/5 bg-slate-900/50">{selectedProject.solution}</p></div>
                    {selectedProject.gallery && (
                        <div><h3 className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-4">Gallery</h3><div className="grid grid-cols-2 gap-4">{selectedProject.gallery.map((img: string, i: number) => <img key={i} src={img} alt={`Gallery ${i}`} className="rounded-lg border border-white/10 opacity-70 hover:opacity-100 transition-opacity cursor-pointer object-cover h-32 w-full" />)}</div></div>
                    )}
                    <div className="pt-8 border-t border-white/5"><Link href="/contact"><button className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/30">Discuss This Project <MessageSquare size={18} /></button></Link></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}