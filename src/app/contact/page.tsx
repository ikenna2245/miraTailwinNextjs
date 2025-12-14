import React from 'react';
import type { Metadata } from 'next';
import ContactFormUI from '@/components/contact/ContactFormUI'; // Import the client component

export const metadata: Metadata = {
  title: "Contact Us - Book a Technical Strategy Session",
  description: "Schedule a free 30-minute technical consultation. Discuss your Web Development, AI, or Cloud Infrastructure needs with a Senior Engineer.",
  openGraph: {
    title: "Contact Mirabytes | Technical Strategy Session",
    description: "No sales fluff. Book a direct call with a Lead Architect to discuss your project.",
    url: "https://www.mirabytes.io/contact",
    siteName: "Mirabytes Consulting",
    images: [
      {
        url: "/images/mirabytes-og-image.png",
        width: 1200,
        height: 630,
        alt: "Book a Mirabytes Session",
      },
    ],
  },
};

export default function ContactPage() {
  // JSON-LD for a Contact Page
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Mirabytes Consulting",
    "description": "Book a technical strategy session with our lead consultants.",
    "url": "https://www.mirabytes.io/contact",
    "mainEntity": {
      "@type": "Organization",
      "name": "Mirabytes Consulting",
      "telephone": "+44-1473-956537",
      "email": "info@mirabytes.io",
      "address": {
        "@type": "PostalAddress",
        "streetAddress": "Office 12373, 182-184 High Street North",
        "addressLocality": "London",
        "postalCode": "E6 2JA",
        "addressCountry": "UK"
      }
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto">
      {/* Inject Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      {/* Render Client Form */}
      <ContactFormUI />
    </div>
  );
}