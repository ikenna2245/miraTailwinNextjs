import type { Metadata } from 'next';
import { Hero } from '@/components/home/Hero';
import { Services } from '@/components/home/Services';
import { Projects } from '@/components/home/Projects';
import { TechStack } from '@/components/home/TechStack';
import { Process } from '@/components/home/Process';
import { WhyUs } from '@/components/home/WhyUs';
import { CTA } from '@/components/home/CTA';

// ✅ PAGE-LEVEL SEO: Overrides default title for better ranking
export const metadata: Metadata = {
  title: "Mirabytes | Enterprise Cloud Architecture & AI Agents",
  description: "Mirabytes is a premier consultancy building high-performance web applications, Agentic AI systems, and scalable Cloud Infrastructure for growth-stage enterprises.",
};

export default function Home() {
  return (
    <div className="min-h-screen font-sans overflow-x-hidden">
      
      {/* Background Elements */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        {/* Top Blue Glow */}
        <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[80vw] h-[500px] bg-blue-600/10 blur-[100px] rounded-full" />
        {/* Bottom Purple Glow */}
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-purple-600/5 blur-[120px] rounded-full" />
        {/* Noise Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20" />
      </div>

      <main className="relative z-10">
        
        {/* 1. Hero Section */}
        <div className="px-6 max-w-7xl mx-auto">
            <Hero />
        </div>

        {/* 2. Tech Stack Marquee (Full Width) */}
        <div className="w-full mb-32">
            <TechStack />
        </div>
        
        {/* 3. Main Content Grid (Services & Projects) */}
        <div className="px-6 max-w-7xl mx-auto space-y-32 mb-32">
            <Services />
            <Projects />
            
            {/* 4. The Process / Methodology */}
            <Process />
            {/* The Differentiation (Why Us) */}
            <WhyUs />

            {/* Call to Action (CTA) */}
            <CTA />
        </div>

      </main>
    </div>
  );
}