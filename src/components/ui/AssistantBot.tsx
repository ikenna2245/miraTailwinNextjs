"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Bot, X, ChevronRight, Zap, Sparkles, Send, 
  MessageSquare, HelpCircle, FileText, 
  Briefcase, Globe, ArrowRight, ShieldCheck, Cpu, User, StopCircle
} from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { Dialog } from './Dialog';
import { Crisp } from "crisp-sdk-web"; 

// --- TYPES ---
interface Message {
  id: number;
  text: string;
  sender: 'bot' | 'user' | 'human-agent'; 
}

interface ActionOption {
  id: string;
  label: string;
  subtitle?: string;
  action?: () => void;
  filter?: string; 
  path?: string;
  icon?: React.ReactNode;
  isAd?: boolean;
}

interface FAQ {
  question: string;
  answer: string;
}

// --- CONFIGURATION: ROTATING ADS ---
const ADS: ActionOption[] = [
  {
    id: 'ad-audit',
    label: "Claim Free Architecture Audit",
    subtitle: "2 slots remaining for this month.",
    path: '/contact?subject=audit',
    icon: <ShieldCheck size={16} className="text-orange-400 animate-pulse"/>,
    isAd: true
  },
  {
    id: 'ad-legacy',
    label: "Legacy Migration Assessment",
    subtitle: "Stop bleeding technical debt.",
    path: '/contact?subject=migration',
    icon: <Zap size={16} className="text-yellow-400 animate-pulse"/>,
    isAd: true
  },
  {
    id: 'ad-ai',
    label: "AI Readiness Scorecard",
    subtitle: "Is your data ready for LLMs?",
    path: '/contact?subject=ai-scorecard',
    icon: <Cpu size={16} className="text-pink-400 animate-pulse"/>,
    isAd: true
  }
];

// --- CONFIGURATION: PAGE CONTEXTS ---
const PAGE_CONTEXTS: Record<string, { title: string; actions: ActionOption[]; faqs: FAQ[] }> = {
  '/': {
    title: "Command Center",
    actions: [
      { id: 'home-work', label: "Browse Case Studies", subtitle: "See our Fintech & AI work", path: '/work', icon: <Briefcase size={16} className="text-blue-400"/> },
      { id: 'home-stack', label: "View Tech Stack", subtitle: "Next.js, Supabase, AI", path: '/services', icon: <Sparkles size={16} className="text-purple-400"/> },
      { id: 'home-call', label: "Book Strategy Call", subtitle: "30-min Free Consultation", path: '/contact', icon: <Zap size={16} className="text-yellow-400"/> },
    ],
    faqs: [
      { question: "What is your typical engagement model?", answer: "We offer two models: 1) Project-based for defined scopes (e.g., MVP build), and 2) Monthly Retainers for ongoing architectural support and DevOps scaling." },
      { question: "Do you work with startups?", answer: "Yes, we specialize in Series A+ startups looking to modernize their infrastructure for scale." }
    ]
  },
  '/work': {
    title: "Portfolio Explorer",
    actions: [
      { id: 'filter-fintech', label: "Filter: Fintech", subtitle: "Banking & Payment Apps", filter: 'Fintech', icon: <Globe size={16} className="text-emerald-400"/> },
      { id: 'filter-ai', label: "Filter: AI Systems", subtitle: "LLM Integrations", filter: 'AI', icon: <Bot size={16} className="text-pink-400"/> },
      { id: 'work-contact', label: "Start a Project", subtitle: "Let's build this", path: '/contact', icon: <ArrowRight size={16} className="text-white"/> },
    ],
    faqs: [
      { question: "How long do projects take?", answer: "A typical full-stack MVP takes 8-12 weeks. Specific modules (like an AI chatbot) can be shipped in 4 weeks." },
      { question: "Do you sign NDAs?", answer: "Absolutely. All our work is confidential by default. We can provide a standard NDA before our first call." }
    ]
  },
  '/services': {
    title: "Tech Stack & Services",
    actions: [
      { id: 'serv-method', label: "Read Methodology", subtitle: "Our Agile Process", path: '/methodology', icon: <FileText size={16} className="text-cyan-400"/> },
      { id: 'serv-pricing', label: "View Pricing Models", subtitle: "Engagement Options", path: '/contact', icon: <Zap size={16} className="text-yellow-400"/> },
    ],
    faqs: [
      { question: "Why Next.js?", answer: "It offers the best balance of SEO, performance, and developer experience. It is the industry standard for modern React applications." },
      { question: "Do you handle hosting?", answer: "Yes, we usually set up infrastructure on your own AWS/Vercel accounts so you retain full ownership and control." }
    ]
  },
  '/methodology': {
    title: "Process & Culture",
    actions: [
      { id: 'meth-team', label: "Meet the Team", subtitle: "Who we are", path: '/company', icon: <Briefcase size={16} className="text-indigo-400"/> },
      { id: 'meth-contact', label: "Start Discovery", subtitle: "Step 1 of our Process", path: '/contact', icon: <Zap size={16} className="text-yellow-400"/> },
    ],
    faqs: [
        { question: "How often do we meet?", answer: "We work in 2-week sprints. You get a demo and progress report every fortnight, plus real-time access to our Slack." },
        { question: "What if scope changes?", answer: "We are Agile. We can pivot priorities at the start of any sprint without penalty." }
    ]
  },
  '/contact': {
    title: "Contact Support",
    actions: [
      { id: 'cont-email', label: "Email Directly", subtitle: "info@mirabytes.io", action: () => window.location.href = "mailto:info@mirabytes.io", icon: <MessageSquare size={16} className="text-blue-400"/> },
    ],
    faqs: [
      { question: "How do I get an estimate?", answer: "Since we build custom architecture, costs vary by scope. Please book a short discovery call so we can understand your requirements." }
    ]
  }
};

const DEFAULT_CONTEXT = PAGE_CONTEXTS['/'];

export const AssistantBot = () => {
  // --- STATE ---
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'navigator' | 'chat' | 'faq'>('navigator');
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi. I'm MIRA. I can help navigate our portfolio or answer technical questions about our stack.", sender: 'bot' }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
  // LIVE CHAT STATE (Crisp Integration)
  const [isLiveChatActive, setIsLiveChatActive] = useState(false);
  
  // Ad & Dialog State
  const [currentAdIndex, setCurrentAdIndex] = useState(0);
  const [showAd, setShowAd] = useState(true);
  const [showDialog, setShowDialog] = useState(false);
  const [dialogContent, setDialogContent] = useState<any>(null);

  const scrollRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const router = useRouter();

  // --- HELPER: Parse Markdown-like Formatting ---
  const parseMessage = (text: string) => {
    // 1. Split by newlines to handle paragraphs
    const parts = text.split('\n');
    
    return parts.map((part, index) => {
      if (!part.trim()) return <br key={index} />; // Handle empty lines

      // 2. Bold (**text**) parsing
      const boldParts = part.split(/(\*\*.*?\*\*)/g);
      
      const content = boldParts.map((subPart, subIndex) => {
        if (subPart.startsWith('**') && subPart.endsWith('**')) {
          return <strong key={subIndex} className="text-white font-bold">{subPart.slice(2, -2)}</strong>;
        }
        // Basic italic parsing (*text*)
        const italicParts = subPart.split(/(\*.*?\*)/g);
        return italicParts.map((iPart, iIndex) => {
             if (iPart.startsWith('*') && iPart.endsWith('*')) {
                return <em key={`${subIndex}-${iIndex}`} className="italic text-slate-300">{iPart.slice(1, -1)}</em>;
             }
             return iPart;
        });
      });

      return <p key={index} className="mb-1">{content}</p>;
    });
  };

  // --- 1. CRISP LISTENER (THE BRIDGE) ---
  useEffect(() => {
    const handleCrispMessage = (message: any) => {
        // Only trigger if content exists and it's from operator (YOU)
        if (message && message.content && message.from === 'operator') {
            setMessages(prev => [
                ...prev, 
                { id: Date.now(), text: message.content, sender: 'human-agent' }
            ]);
            setIsLiveChatActive(true);
            setIsOpen(true);
        }
    };

    try {
        Crisp.message.onMessageReceived(handleCrispMessage);
    } catch (e) {
        // Crisp might not be loaded yet, non-critical
    }
  }, []);

  // --- 2. AD ROTATION ---
  useEffect(() => {
    const adInterval = setInterval(() => {
        setCurrentAdIndex((prev) => (prev + 1) % ADS.length);
    }, 8000);
    return () => clearInterval(adInterval);
  }, []);

  // --- 3. AUTO SCROLL ---
  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, mode, isTyping]);

  // --- 4. CONTEXT RESOLVER ---
  const currentContext = PAGE_CONTEXTS[pathname] || DEFAULT_CONTEXT;

  const handleActionClick = (action: ActionOption) => {
    if (action.filter) {
        setDialogContent({
            title: `Filter Portfolio: ${action.filter}`,
            description: `We have several ${action.filter} case studies available. Would you like to filter the portfolio to show only these projects?`,
            confirmLabel: `Show ${action.filter} Projects`,
            onConfirm: () => {
                router.push(`/work?filter=${action.filter?.toLowerCase()}`);
                setShowDialog(false);
                setIsOpen(false);
            }
        });
        setShowDialog(true);
        return;
    }
    if (action.path) {
        setIsOpen(false);
        router.push(action.path);
        return;
    }
    if (action.action) action.action();
  };

  // --- 5. CHAT LOGIC (HYBRID AI + HUMAN) ---
  const handleSendMessage = async (textOverride?: string) => {
    const text = textOverride || input;
    if (!text.trim()) return;

    // A. Update UI immediately
    setMessages(prev => [...prev, { id: Date.now(), text, sender: 'user' }]);
    setInput("");
    setIsTyping(true);

    // B. BRANCH: LIVE CHAT ACTIVE? (Send to Crisp)
    if (isLiveChatActive) {
        try {
            Crisp.message.send("text", text);
        } catch (e) {
            console.error("Crisp send error", e);
        }
        setIsTyping(false);
        return;
    }

    // C. BRANCH: AI MODE (Send to Gemma API)
    try {
        const conversationHistory = messages.map(m => ({
            role: m.sender === 'user' ? 'user' : 'model',
            parts: [{ text: m.text }]
        })).filter(m => m.role !== 'human-agent');

        const response = await fetch('/api/chat', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                message: text,
                history: conversationHistory 
            })
        });

        const data = await response.json();
        const botReply = data.reply;

        // CHECK FOR HANDOFF COMMAND FROM AI
        if (botReply.includes("ACTION_OPEN_CHAT")) {
            setIsLiveChatActive(true);
            setMessages(prev => [...prev, { 
                id: Date.now() + 1, 
                text: "I am connecting you to a senior consultant now. Please hold...", 
                sender: 'bot' 
            }]);
            
            Crisp.message.send("text", "[SYSTEM]: User requested live agent handoff via AI.");
        } else {
            setMessages(prev => [...prev, { id: Date.now() + 1, text: botReply, sender: 'bot' }]);
        }
    } catch (error) {
        setMessages(prev => [...prev, { id: Date.now() + 1, text: "I'm having trouble connecting to the neural network. Please email info@mirabytes.io", sender: 'bot' }]);
    } finally {
        setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <>
      {showDialog && dialogContent && (
        <Dialog 
          isOpen={showDialog}
          onClose={() => setShowDialog(false)}
          title={dialogContent.title}
          description={dialogContent.description}
          confirmLabel={dialogContent.confirmLabel}
          onConfirm={dialogContent.onConfirm}
        />
      )}

      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end pointer-events-none">
        
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ type: "spring", bounce: 0.3 }}
              className="mb-4 w-[90vw] md:w-96 bg-slate-950/95 backdrop-blur-xl border border-white/10 rounded-2xl shadow-2xl shadow-black/50 overflow-hidden pointer-events-auto flex flex-col max-h-[600px]"
            >
              {/* Header */}
              <div className={`border-b p-4 flex justify-between items-center transition-colors duration-500 ${isLiveChatActive ? 'bg-indigo-900/40 border-indigo-500/30' : 'bg-slate-900 border-white/5'}`}>
                  <div className="flex items-center gap-3">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-colors duration-500 ${isLiveChatActive ? 'bg-indigo-600' : 'bg-gradient-to-br from-blue-600 to-indigo-600'}`}>
                          {isLiveChatActive ? <User className="text-white" size={20}/> : <Bot className="text-white" size={20} />}
                      </div>
                      <div>
                          <h4 className="font-bold text-white text-sm leading-none">
                              {isLiveChatActive ? "Live Support" : "MIRA AI"}
                          </h4>
                          <div className="flex items-center gap-1.5 mt-1">
                              <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${isLiveChatActive ? 'bg-indigo-400' : 'bg-emerald-500'}`} />
                              <span className="text-[10px] text-slate-400 font-mono">
                                  {isLiveChatActive ? "HUMAN CONNECTED" : "SYSTEM ONLINE"}
                              </span>
                          </div>
                      </div>
                  </div>
                  
                  <div className="flex items-center gap-2">
                     {isLiveChatActive && (
                        <button 
                            onClick={() => {
                                // 1. Notify Consultant (You) that the chat is over
                                try {
                                    Crisp.message.send("text", "[SYSTEM]: User has ended the session.");
                                    
                                    // 2. IMPORTANT: Reset the Crisp Session
                                    // This clears the cookie/token. Next time they chat, it's a NEW conversation.
                                    Crisp.session.reset();
                                } catch (e) {
                                    console.warn("Could not reset Crisp session");
                                }

                                // 3. Reset Local UI to AI Mode
                                setIsLiveChatActive(false);
                                
                                // 4. Add a system message to the local UI
                                setMessages(prev => [...prev, { 
                                    id: Date.now(), 
                                    text: "Live chat ended. Session reset. MIRA AI is back online.", 
                                    sender: 'bot' 
                                }]);
                            }}
                            className="text-[10px] bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 px-2 py-1 rounded transition-colors font-bold uppercase tracking-wider"
                        >
                            End Chat
                        </button>
                    )}
                     <button onClick={() => setIsOpen(false)} className="p-2 text-slate-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                        <X size={18} />
                     </button>
                  </div>
              </div>

              {/* Tabs (Hidden if Live Chat is active) */}
              {!isLiveChatActive && (
                  <div className="grid grid-cols-3 p-1 bg-slate-900 border-b border-white/5">
                      {['navigator', 'faq', 'chat'].map((m) => (
                          <button key={m} onClick={() => setMode(m as any)} className={`py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-all ${mode === m ? 'bg-slate-800 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'}`}>
                              {m}
                          </button>
                      ))}
                  </div>
              )}

              {/* BODY: NAVIGATOR */}
              {mode === 'navigator' && !isLiveChatActive && (
                  <div className="p-4 space-y-4">
                       {/* Rotating Ad Banner */}
                       {showAd && (
                          <div className="relative">
                              <AnimatePresence mode="wait">
                                  <motion.button
                                      key={currentAdIndex}
                                      initial={{ opacity: 0, x: 20 }}
                                      animate={{ opacity: 1, x: 0 }}
                                      exit={{ opacity: 0, x: -20 }}
                                      transition={{ duration: 0.5 }}
                                      onClick={() => handleActionClick(ADS[currentAdIndex])}
                                      className="w-full text-left p-3 rounded-xl bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 hover:border-blue-400/50 transition-all group"
                                  >
                                      <div className="flex items-center gap-3 mb-1">
                                          {ADS[currentAdIndex].icon}
                                          <span className="text-xs font-bold text-blue-200 uppercase tracking-wide">Featured Opportunity</span>
                                      </div>
                                      <div className="font-bold text-white text-sm">{ADS[currentAdIndex].label}</div>
                                      <div className="text-xs text-slate-400">{ADS[currentAdIndex].subtitle}</div>
                                  </motion.button>
                              </AnimatePresence>
                          </div>
                      )}

                      <div className="space-y-2">
                          <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2 flex items-center gap-2">
                              <Sparkles size={12} className="text-blue-400"/> {currentContext.title}
                          </div>
                          {currentContext.actions.map((opt) => (
                              <button key={opt.id} onClick={() => handleActionClick(opt)} className="w-full text-left p-3 bg-slate-800/50 hover:bg-slate-800 border border-white/5 hover:border-blue-500/30 rounded-xl transition-all group flex items-start gap-3">
                                  <div className="mt-1 p-1.5 rounded-lg bg-slate-900 border border-white/5 text-slate-400 group-hover:text-blue-400 transition-colors">{opt.icon}</div>
                                  <div className="flex-1">
                                      <div className="text-sm font-semibold text-slate-200 group-hover:text-white">{opt.label}</div>
                                      <div className="text-xs text-slate-500 group-hover:text-slate-400">{opt.subtitle}</div>
                                  </div>
                                  <ChevronRight size={14} className="self-center text-slate-600 group-hover:text-blue-400 opacity-0 group-hover:opacity-100 -translate-x-2 group-hover:translate-x-0 transition-all" />
                              </button>
                          ))}
                      </div>
                  </div>
              )}

              {/* BODY: FAQ */}
              {mode === 'faq' && !isLiveChatActive && (
                  <div className="p-4 space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
                      {currentContext.faqs.map((faq, idx) => (
                          <div key={idx} className="group border border-white/5 rounded-xl overflow-hidden bg-slate-800/20 hover:bg-slate-800/40 transition-colors">
                              <button className="w-full text-left px-4 py-3 text-sm font-medium text-slate-200 flex justify-between items-center" onClick={(e) => { const el = e.currentTarget.nextElementSibling; el?.classList.toggle('hidden'); }}>
                                  {faq.question}
                                  <ChevronRight size={14} className="text-slate-500 transition-transform group-hover:rotate-90" />
                              </button>
                              <div className="hidden px-4 pb-4 pt-0 text-xs text-slate-400 leading-relaxed border-t border-white/5 bg-slate-950/30">
                                  <div className="pt-3">{parseMessage(faq.answer)}</div>
                              </div>
                          </div>
                      ))}
                      <div className="mt-4 text-center">
                          <button onClick={() => setMode('chat')} className="text-xs text-blue-400 hover:text-white underline">Need specifics? Chat with MIRA.</button>
                      </div>
                  </div>
              )}

              {/* BODY: CHAT */}
              {(mode === 'chat' || isLiveChatActive) && (
                  <div className="flex flex-col h-[400px]">
                      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar" ref={scrollRef}>
                          {messages.map((msg) => (
                              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                                  <div className={`max-w-[85%] p-3 text-sm leading-relaxed 
                                      ${msg.sender === 'user' ? 'bg-blue-600 text-white rounded-2xl rounded-tr-sm shadow-lg' 
                                      : msg.sender === 'human-agent' ? 'bg-indigo-700 text-white rounded-2xl rounded-tl-sm border border-indigo-500/30' 
                                      : 'bg-slate-800 text-slate-200 rounded-2xl rounded-tl-sm border border-white/5'
                                  }`}>
                                      {msg.sender === 'human-agent' && <div className="text-[10px] font-bold text-indigo-200 mb-1 uppercase">Consultant</div>}
                                      {/* USE THE PARSER HERE */}
                                      {parseMessage(msg.text)}
                                  </div>
                              </div>
                          ))}
                          {isTyping && (
                              <div className="flex justify-start">
                                  <div className="bg-slate-800 p-3 rounded-2xl rounded-tl-sm border border-white/5 flex gap-1.5 items-center h-10">
                                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0s' }}/>
                                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}/>
                                      <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}/>
                                  </div>
                              </div>
                          )}
                      </div>
                      <div className="p-3 bg-slate-900 border-t border-white/5">
                          <div className="flex gap-2">
                              <input 
                                type="text" 
                                value={input} 
                                onChange={(e) => setInput(e.target.value)} 
                                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()} 
                                placeholder={isLiveChatActive ? "Type to live agent..." : "Ask a question..."}
                                className="flex-1 bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:ring-1 focus:ring-blue-500 outline-none placeholder:text-slate-600" 
                              />
                              <button onClick={() => handleSendMessage()} disabled={!input.trim()} className="p-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-all disabled:opacity-50">
                                  <Send size={18} />
                              </button>
                          </div>
                      </div>
                  </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Trigger Button */}
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => { setIsOpen(!isOpen); setHasInteracted(true); }}
          className={`pointer-events-auto relative w-16 h-16 border rounded-full flex items-center justify-center shadow-2xl transition-all z-50 
              ${isLiveChatActive 
                  ? 'bg-indigo-600 border-indigo-400 text-white shadow-indigo-900/40' 
                  : 'bg-slate-900 border-white/10 text-blue-400 shadow-blue-900/30 group hover:border-blue-400 hover:text-white'
              }`}
        >
          {isLiveChatActive ? (
               <div className="absolute top-0 right-0">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-white border-2 border-indigo-600"></span>
                  </span>
               </div>
          ) : (
               <div className="absolute top-0 right-0">
                  <span className="relative flex h-3.5 w-3.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500 border-2 border-slate-900"></span>
                  </span>
               </div>
          )}
          
          {isLiveChatActive ? <User size={28} /> : <Bot size={28} />}
        </motion.button>
      </div>
    </>
  );
};