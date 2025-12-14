import React, { Suspense } from 'react';
import type { Metadata } from 'next';
import WorkContent from '@/components/work/WorkContent';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Our Work | Case Studies & Portfolio",
  description: "Browse our archive of high-performance projects, including EdTech platforms, AI Legal Tech, and Business Intelligence dashboards.",
  openGraph: {
    title: "Mirabytes Portfolio | High-Impact Case Studies",
    description: "Real results from real projects. See how we architect scalable solutions for Fintech, EdTech, and AI-driven enterprises.",
    url: "https://www.mirabytes.io/work",
    siteName: "Mirabytes Consulting",
    images: [
      {
        url: "/images/mirabytes-og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirabytes Project Portfolio",
      },
    ],
  },
};

export default function WorkPage() {
  // Structured Data (JSON-LD) for CollectionPage
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "name": "Mirabytes Portfolio",
    "description": "Selected case studies of high-value technical challenges solved with precision engineering.",
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Optimus School Platform" },
        { "@type": "ListItem", "position": 2, "name": "FirmChambers Legal Tech" },
        { "@type": "ListItem", "position": 3, "name": "Customer Intelligence Dashboard" },
        { "@type": "ListItem", "position": 4, "name": "eProject Library" },
        { "@type": "ListItem", "position": 5, "name": "Makmav Recruitment" }
      ]
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Suspense is CRITICAL here because WorkContent uses useSearchParams().
         Without this wrapper, the build would fail or opt out of static generation.
      */}
      <Suspense fallback={
        <div className="flex items-center justify-center min-h-[50vh] text-slate-500">
           Loading Archives...
        </div>
      }>
        <WorkContent />
      </Suspense>
    </div>
  );
}