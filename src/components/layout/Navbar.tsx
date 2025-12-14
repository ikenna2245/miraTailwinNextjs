"use client";
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Zap, ChevronRight } from 'lucide-react';
import { MirabytesLogo } from '../ui/Logo';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const navLinks = [
    { name: 'Work', href: '/work' },
    { name: 'Services', href: '/services' },
    { name: 'Methodology', href: '/methodology' },
    { name: 'Company', href: '/company' }
  ];

  const isActive = (path: string) => pathname === path;

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled || mobileMenuOpen
            ? 'py-4 bg-slate-950/80 backdrop-blur-md border-b border-white/5 shadow-lg shadow-black/20' 
            : 'py-6 bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group cursor-pointer z-50">
            <div className="relative transition-transform group-hover:scale-110 duration-300">
               <MirabytesLogo className="w-8 h-8" />
               <div className="absolute inset-0 bg-blue-500/30 blur-lg rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold tracking-tight text-white transition-colors">
              Mirabytes<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">.io</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-400">
            {navLinks.map((item) => (
              <Link 
                key={item.name} 
                href={item.href} 
                className={`transition-colors relative group py-2 ${isActive(item.href) ? 'text-white' : 'hover:text-white'}`}
              >
                {item.name}
                <span className={`absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300 ${isActive(item.href) ? 'w-full' : 'w-0 group-hover:w-full'}`} />
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {/* CTA Button Linked to Contact */}
            <Link 
                href="/contact"
                className="hidden md:flex px-5 py-2.5 text-sm font-bold text-white bg-white/5 rounded-full hover:bg-white/10 transition-all border border-white/10 hover:border-blue-500/30 active:scale-95 items-center gap-2 group"
            >
              <Zap size={16} className="text-yellow-400 group-hover:scale-110 transition-transform" /> 
              Book Discovery
            </Link>
            
            {/* Mobile Menu Toggle */}
            <button 
              className="md:hidden text-slate-300 hover:text-white p-2 z-50 relative" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </motion.nav>

      {/* Optimized Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl md:hidden flex flex-col justify-center px-8"
          >
            {/* Background Decoration */}
            <div className="absolute top-[-10%] right-[-10%] w-64 h-64 bg-blue-600/20 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-[-10%] left-[-10%] w-64 h-64 bg-purple-600/20 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex flex-col gap-2 relative z-10">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4">Menu</span>
              
              {navLinks.map((item, index) => (
                <motion.div
                  key={item.name}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + index * 0.1 }}
                >
                  <Link 
                    href={item.href} 
                    className={`text-4xl font-bold tracking-tight flex items-center justify-between py-4 border-b border-white/5 group ${isActive(item.href) ? 'text-white' : 'text-slate-400'}`}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="group-hover:text-white transition-colors">{item.name}</span>
                    <ChevronRight className={`w-6 h-6 transition-all ${isActive(item.href) ? 'text-blue-500 opacity-100' : 'opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0'}`} />
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8"
              >
                <Link 
                  href="/contact" 
                  onClick={() => setMobileMenuOpen(false)}
                  className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl text-lg font-bold flex items-center justify-center gap-3 shadow-xl shadow-blue-900/20 active:scale-95 transition-transform"
                >
                  <Zap size={20} className="fill-white" /> Book a Strategy Call
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};