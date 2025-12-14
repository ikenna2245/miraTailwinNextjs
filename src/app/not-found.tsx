"use client"; // This line is required for onClick handlers to work

import Link from 'next/link';
import { Home, RefreshCcw } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-center px-6 relative overflow-hidden">
      
      {/* Background Noise */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/5 blur-[120px] rounded-full pointer-events-none" />

      {/* Glitchy Text Effect */}
      <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-purple-600 mb-4 animate-pulse">
        404
      </h1>
      
      <div className="space-y-6 max-w-lg relative z-10">
        <h2 className="text-3xl font-bold text-white">Signal Lost.</h2>
        <p className="text-slate-400 text-lg">
            The digital coordinates you are looking for do not exist. 
            It might have been moved, deleted, or consumed by the void.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link 
                href="/" 
                className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
                <Home size={18} /> Return to Base
            </Link>
             <button 
                onClick={() => window.location.reload()}
                className="px-8 py-3 bg-slate-900 border border-slate-700 text-slate-300 hover:text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2"
            >
                <RefreshCcw size={18} /> Retry Connection
            </button>
        </div>
      </div>

      {/* Decorative Code */}
      <div className="absolute bottom-12 left-12 text-left font-mono text-xs text-blue-500/30 hidden md:block">
        <p>ERR_CONNECTION_REFUSED</p>
        <p> at /src/app/router.ts:404:12</p>
        <p> at navigate (core.js:12:45)</p>
      </div>
    </div>
  );
}