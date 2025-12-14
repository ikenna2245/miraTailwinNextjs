import React from 'react';
import type { Metadata } from 'next';
import ServicesContent from '@/components/services/ServicesContent';

export const metadata: Metadata = {
  title: "Services - Web Development, AI & Cloud Engineering",
  description: "Explore Mirabytes' technical services: High-Performance Next.js Web Development, Agentic AI Systems, Cloud Architecture (AWS/GCP), and Data Science.",
  openGraph: {
    title: "Mirabytes Services | Elite Engineering Stack",
    description: "Full-spectrum technical consulting. From Next.js web apps to Autonomous AI Agents.",
    url: "https://www.mirabytes.io/services",
    siteName: "Mirabytes Consulting",
    images: [
      {
        url: "/images/mirabytes-og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirabytes Technical Services",
      },
    ],
  },
};

export default function ServicesPage() {
  // Service Schema (JSON-LD)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": "Software Engineering",
    "provider": {
      "@type": "Organization",
      "name": "Mirabytes Consulting"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Technical Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Web Development (Next.js/React)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Agentic AI Integration" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Cloud DevOps (AWS/GCP)" } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": "Data Science & Predictive Modeling" } }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ServicesContent />
    </>
  );
}