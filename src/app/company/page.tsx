import React from 'react';
import type { Metadata } from 'next';
import CompanyContent from '@/components/company/CompanyContent';

// --- SEO METADATA (Server Side) ---
export const metadata: Metadata = {
  title: "About Us - Elite Technical Consultancy",
  description: "Mirabytes is a senior-only engineering consultancy. We bridge business strategy with technical execution, specializing in Cloud, AI, and Web Architecture.",
  openGraph: {
    title: "About Mirabytes | Elite Technical Consultancy",
    description: "We bridge business strategy with technical execution. Senior-only engineering teams for high-stakes projects.",
    url: "https://www.mirabytes.io/company",
    siteName: "Mirabytes Consulting",
    images: [
      {
        url: "/images/mirabytes-og-image.png", // Ensure this exists in public/images
        width: 1200,
        height: 630,
        alt: "Mirabytes Consulting Team",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function CompanyPage() {
  // Structured Data (JSON-LD) for Organization & Person
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "mainEntity": {
      "@type": "Organization",
      "name": "Mirabytes Consulting",
      "url": "https://www.mirabytes.io",
      "logo": "https://www.mirabytes.io/images/mirabytes-logo-schema.png",
      "foundingDate": "2023",
      "description": "A specialized consultancy focused on complex, high-performance web architecture and AI integration.",
      "employee": {
        "@type": "Person",
        "name": "Ikenna Umeh", // You can replace with specific name if desired
        "jobTitle": "Lead Technical Consultant",
        "description": "Senior Engineer with 7+ years of production experience building scalable systems."
      },
      "contactPoint": {
        "@type": "ContactPoint",
        "telephone": "+44-1473-956537",
        "contactType": "Sales",
        "email": "info@mirabytes.io"
      }
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CompanyContent />
    </>
  );
}