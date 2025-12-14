"use client";

import { useState, useEffect } from "react";
import { GoogleAnalytics } from "@next/third-parties/google";
import { CrispChat } from "@/components/ui/CrispChat";
import { X, Cookie, ShieldCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export const CookieManager = () => {
  const [consent, setConsent] = useState<"granted" | "denied" | null>(null);
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // 1. Check local storage on load
    const stored = localStorage.getItem("cookie_consent");
    if (stored === "granted" || stored === "denied") {
      setConsent(stored as "granted" | "denied");
    } else {
      // 2. If no choice yet, show banner after small delay
      const timer = setTimeout(() => setShowBanner(true), 1000);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookie_consent", "granted");
    setConsent("granted");
    setShowBanner(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookie_consent", "denied");
    setConsent("denied");
    setShowBanner(false);
  };

  return (
    <>
      {/* --- CONDITIONALLY LOAD SCRIPTS --- */}
      {/* Only load these if consent is GRANTED */}
      {consent === "granted" && (
        <>
          <GoogleAnalytics gaId="G-F74LFVPP2S" />
          <CrispChat />
        </>
      )}

      {/* --- THE BANNER UI --- */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-4 left-4 right-4 md:left-8 md:right-auto md:max-w-md z-[100]"
          >
            <div className="bg-slate-900/95 backdrop-blur-md border border-blue-500/20 p-6 rounded-2xl shadow-2xl shadow-black/50 relative overflow-hidden">
              {/* Glow Effect */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500" />

              <div className="flex items-start gap-4">
                <div className="p-3 bg-blue-500/10 rounded-xl text-blue-400">
                  <Cookie size={24} />
                </div>
                <div>
                  <h3 className="text-white font-bold text-lg mb-2">Privacy & Cookies</h3>
                  <p className="text-slate-400 text-sm leading-relaxed mb-4">
                    We use cookies to analyze traffic (Google Analytics) and provide live support (Crisp). 
                    We do not sell your data.
                  </p>
                  
                  <div className="flex gap-3">
                    <button 
                      onClick={handleReject}
                      className="px-4 py-2 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors border border-white/10"
                    >
                      Reject All
                    </button>
                    <button 
                      onClick={handleAccept}
                      className="px-6 py-2 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2"
                    >
                      <ShieldCheck size={16} /> Accept & Continue
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Re-open Button (Optional - for compliance) */}
      {!showBanner && (
        <button 
           onClick={() => setShowBanner(true)}
           className="fixed bottom-4 left-4 z-40 p-2 bg-slate-900/50 text-slate-500 hover:text-white rounded-full border border-white/5 text-xs opacity-50 hover:opacity-100 transition-all"
           title="Cookie Settings"
        >
           <Cookie size={16} />
        </button>
      )}
    </>
  );
};