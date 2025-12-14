"use client";
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, CheckCircle2, ChevronRight } from 'lucide-react';

interface DialogProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  confirmLabel: string;
  onConfirm: () => void;
}

export const Dialog = ({ 
  isOpen, 
  onClose, 
  title, 
  description, 
  confirmLabel, 
  onConfirm 
}: DialogProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-950/80 backdrop-blur-md pointer-events-auto"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="bg-slate-900 border border-blue-500/30 p-8 rounded-2xl max-w-md w-full shadow-2xl relative overflow-hidden"
          >
            {/* Top Accent Line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />
            
            <div className="flex justify-between items-start mb-4">
              <h3 className="text-2xl font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="text-blue-400" /> 
                {title}
              </h3>
              <button 
                onClick={onClose}
                className="text-slate-500 hover:text-white transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            
            <p className="text-slate-300 mb-8 leading-relaxed text-lg">
              {description}
            </p>
            
            <div className="flex justify-end gap-4">
              <button 
                onClick={onClose} 
                className="px-4 py-2 text-slate-400 hover:text-white transition-colors font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={onConfirm} 
                className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-900/20 hover:scale-105 active:scale-95 flex items-center gap-2"
              >
                {confirmLabel} <ChevronRight size={16} />
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};