import React from 'react';
import type { Metadata } from 'next';
import SecurityContent from '@/components/security/SecurityContent';

export const metadata: Metadata = {
  title: "Security Statement - Zero Trust & Data Protection",
  description: "Mirabytes operates on a strict Zero Trust model. Learn about our encryption standards, DevSecOps pipelines, and incident response protocols.",
  openGraph: {
    title: "Mirabytes Security | Zero Trust Architecture",
    description: "We don't compromise on security. AES-256 Encryption, MFA, and automated vulnerability scanning are standard.",
    url: "https://www.mirabytes.io/security",
    siteName: "Mirabytes Consulting",
    images: [
      {
        url: "/images/mirabytes-og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirabytes Security Standards",
      },
    ],
  },
};

export default function SecurityPage() {
  // JSON-LD for a WebPage (specifically a Policy page)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Security Statement",
    "description": "Details on Mirabytes' security protocols, including Zero Trust architecture and data encryption.",
    "publisher": {
      "@type": "Organization",
      "name": "Mirabytes Consulting",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.mirabytes.io/images/mirabytes-logo-schema.png"
      }
    },
    "mainEntity": {
      "@type": "ItemList",
      "itemListElement": [
        { "@type": "ListItem", "position": 1, "name": "Zero Trust Model" },
        { "@type": "ListItem", "position": 2, "name": "Data Handling & Encryption" },
        { "@type": "ListItem", "position": 3, "name": "DevSecOps Lifecycle" },
        { "@type": "ListItem", "position": 4, "name": "Incident Response" }
      ]
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SecurityContent />
    </>
  );
}