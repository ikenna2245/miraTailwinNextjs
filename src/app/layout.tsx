import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { AssistantBot } from "@/components/ui/AssistantBot";
import { PromoBanner } from "@/components/ui/PromoBanner";
import { CookieManager } from "@/components/ui/CookieManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  themeColor: "#020617",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://www.mirabytes.io"),
  
  title: {
    default: "Mirabytes - Expert Web, AI & Data Science Consulting",
    template: "%s | Mirabytes Consulting",
  },
  alternates: {
    canonical: './',
  },
  description:
    "Mirabytes delivers cutting-edge consulting services in web development, artificial intelligence (AI), and data science to transform your business and drive innovation.",
  keywords: [
    "Web Development",
    "AI Consulting",
    "Data Science",
    "React",
    "Next.js",
    "Cloud Architecture",
    "Software Engineering",
    "Machine Learning",
    "Agentic AI",
    "Enterprise SEO"
  ],
  authors: [{ name: "Mirabytes Consulting" }],
  creator: "Mirabytes Consulting",
  publisher: "Mirabytes Consulting",
  openGraph: {
    title: "Mirabytes - Expert Web, AI & Data Science Consulting",
    description:
      "Partner with Mirabytes for innovative solutions in web development, AI, and data science to elevate your business.",
    url: "https://www.mirabytes.io/",
    siteName: "Mirabytes Consulting",
    images: [
      {
        url: "/images/mirabytes-og-image.png",
        width: 1200,
        height: 630,
        alt: "Mirabytes Consulting Services",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mirabytes - Expert Web, AI & Data Science Consulting",
    description:
      "Partner with Mirabytes for innovative solutions in web development, AI, and data science.",
    images: ["/images/mirabytes-twitter-card.png"],
    site: "@mirabytesIO",
  },
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Structured Data for Google (SEO Boost)
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Mirabytes Consulting",
    url: "https://www.mirabytes.io/",
    logo: "https://www.mirabytes.io/images/mirabytes-logo-schema.png",
    description: "Expert consulting in Web Development, AI, and Data Science.",
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+44-1473-956537",
      contactType: "Customer Service",
      areaServed: "Global",
      availableLanguage: "English"
    },
    sameAs: [
      "https://www.linkedin.com/company/mirabytesIO",
      "https://x.com/mirabytesIO",
    ],
  };

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      {/* suppressHydrationWarning is added to prevent mismatches caused by browser extensions */}
      <body
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-slate-950 text-slate-200`}
      >
        
        <Navbar />
        {children}
        <Footer />

        <PromoBanner />
        <AssistantBot />
        <CookieManager />
      </body>
    </html>
  );
}