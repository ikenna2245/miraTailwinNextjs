import React from 'react';
import type { Metadata } from 'next';
import MethodologyContent from '@/components/methodology/MethodologyContent';

// --- SEO METADATA ---
export const metadata: Metadata = {
  title: "Our Methodology - The Digital Circuit Process",
  description: "Discover the Mirabytes 5-step engineering process: From strategic discovery and architectural design to agile development and rigorous deployment.",
  openGraph: {
    title: "Mirabytes Methodology | Predictable Engineering",
    description: "Chaos is the enemy of scale. We bring order through a battle-tested digital circuit for building high-performance software.",
    url: "https://www.mirabytes.io/methodology",
    siteName: "Mirabytes Consulting",
    images: [
      {
        url: "/images/mirabytes-og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirabytes Engineering Process",
      },
    ],
  },
};

export default function MethodologyPage() {
  // Structured Data (JSON-LD) for a Process/HowTo List
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Mirabytes Development Methodology",
    "description": "Our 5-step process for delivering scalable software solutions.",
    "mainEntity": {
      "@type": "ItemList",
      "name": "The Digital Circuit",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Discovery & Strategy" },
        { "@type": "ListItem", "position": 2, "name": "Architecture & Design" },
        { "@type": "ListItem", "position": 3, "name": "Agile Development" },
        { "@type": "ListItem", "position": 4, "name": "Rigorous Testing & Deployment" },
        { "@type": "ListItem", "position": 5, "name": "Support & Evolution" }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <MethodologyContent />
    </>
  );
}