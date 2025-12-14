"use client";
import React from 'react';
import { MirabytesLogo } from '../ui/Logo';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import Link from 'next/link';

export const Footer = () => {
  return (
    <footer className="relative border-t border-white/5 bg-slate-950 pt-20 pb-10 overflow-hidden">
        
        {/* Ambient Background Glow & Top Line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-3xl h-px bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-50" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
            
            {/* Brand Column (Mobile first: Takes full width, good spacing) */}
            <div className="md:col-span-5 space-y-6">
                <Link href="/" className="flex items-center gap-3 group w-fit">
                    <div className="relative transition-transform group-hover:scale-110 duration-300">
                        <MirabytesLogo className="w-8 h-8" />
                        <div className="absolute inset-0 bg-blue-500/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <span className="text-2xl font-bold tracking-tight text-white transition-colors">
                      Mirabytes<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">.io</span>
                    </span>
                </Link>
                <p className="text-slate-400 text-lg leading-relaxed max-w-sm">
                    Architecting the digital future. We replace legacy chaos with precision engineering and scalable cloud infrastructure.
                </p>
                <div className="flex gap-4 pt-2">
                    {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                        <a key={i} href="#" className="w-10 h-10 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-blue-600 hover:border-blue-500 transition-all duration-300 group shadow-lg hover:shadow-blue-500/20">
                            <Icon size={18} className="group-hover:scale-110 transition-transform" />
                        </a>
                    ))}
                </div>
            </div>
            
            {/* Links Columns (Stacked nicely on mobile) */}
            <div className="md:col-span-2 md:col-start-7 mt-8 md:mt-0">
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-blue-500 rounded-full" /> Company
                </h4>
                <ul className="space-y-3 text-slate-400">
                    {['Company', 'Methodology', 'Careers', 'Contact'].map(item => (
                        <li key={item}>
                            <Link href={`/${item.toLowerCase()}`} className="hover:text-white transition-colors flex items-center gap-2 group w-fit">
                                <span className="w-0 h-px bg-blue-500 transition-all group-hover:w-3" />
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

             <div className="md:col-span-2 mt-8 md:mt-0">
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-purple-500 rounded-full" /> Services
                </h4>
                <ul className="space-y-3 text-slate-400">
                    {['Web Dev', 'Cloud Arch', 'UI/UX Design', 'Consulting'].map(item => (
                        <li key={item}>
                            <Link href="/services" className="hover:text-white transition-colors flex items-center gap-2 group w-fit">
                                <span className="w-0 h-px bg-purple-500 transition-all group-hover:w-3" />
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>

             <div className="md:col-span-2 mt-8 md:mt-0">
                <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider flex items-center gap-2">
                    <div className="w-1 h-4 bg-slate-500 rounded-full" /> Legal
                </h4>
                <ul className="space-y-3 text-slate-400">
                    {['Privacy', 'Terms', 'Security'].map(item => (
                        <li key={item}>
                            <Link 
                                // Convert the item name to lowercase for the href attribute
                                href={`/${item.toLowerCase()}`} 
                                className="hover:text-white transition-colors flex items-center gap-2 group w-fit"
                            >
                                <span className="w-0 h-px bg-slate-500 transition-all group-hover:w-3" />
                                {item}
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>

        {/* Bottom Bar (Copyright and Status) */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/5 text-slate-500 text-sm relative">
            <p className="order-2 md:order-1 mt-4 md:mt-0">© 2025 Mirabytes Inc. All rights reserved.</p>
            
            <div className="order-1 md:order-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>All Systems Operational</span>
                </div>
            </div>
        </div>
      </div>
    </footer>
  );
};