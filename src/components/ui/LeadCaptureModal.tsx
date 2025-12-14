"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Loader2, CheckCircle2 } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  adContent: { title: string; subtitle: string; subject: string };
}

export const LeadCaptureModal = ({ isOpen, onClose, adContent }: ModalProps) => {
  const [formData, setFormData] = useState({ name: '', email: '', company: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          subject: adContent.subject, // Pass the Ad Title as Subject
          message: "Lead captured via Promo Banner",
          // No date/time passed, API handles this as a "Lead"
        }),
      });

      if (res.ok) {
        setStatus('success');
        setTimeout(() => {
           onClose();
           setStatus('idle');
           setFormData({ name: '', email: '', company: '' });
        }, 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };

  const inputClass = "w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all";

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-950/80 backdrop-blur-sm"
          />
          
          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-[70] w-full max-w-md px-4"
          >
            <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">
              
              {/* Gradient Top Border */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-emerald-500" />
              
              <button onClick={onClose} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors">
                <X size={20} />
              </button>

              <div className="p-8">
                {status === 'success' ? (
                  <div className="text-center py-10">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-emerald-500/20 text-emerald-400 rounded-full flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 size={32} />
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-2">Request Received!</h3>
                    <p className="text-slate-400 text-sm">We've sent a confirmation to your email.</p>
                  </div>
                ) : (
                  <>
                    <div className="mb-6">
                      <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-bold uppercase tracking-wider mb-3">
                        <Sparkles size={12} /> Priority Access
                      </div>
                      <h2 className="text-2xl font-bold text-white mb-2">{adContent.title}</h2>
                      <p className="text-slate-400 text-sm">{adContent.subtitle}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div>
                        <input 
                          type="text" placeholder="Full Name" required 
                          className={inputClass}
                          value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})}
                        />
                      </div>
                      <div>
                        <input 
                          type="email" placeholder="Work Email" required 
                          className={inputClass}
                          value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})}
                        />
                      </div>
                      <div>
                        <input 
                          type="text" placeholder="Company Name (Optional)" 
                          className={inputClass}
                          value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})}
                        />
                      </div>

                      <button 
                        type="submit" 
                        disabled={status === 'loading'}
                        className="w-full mt-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg shadow-blue-900/20 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {status === 'loading' ? <Loader2 size={18} className="animate-spin" /> : <>Get Access <Send size={16} /></>}
                      </button>
                    </form>
                    <p className="text-center text-[10px] text-slate-600 mt-4">
                      Your details are secure. We respect your privacy.
                    </p>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};