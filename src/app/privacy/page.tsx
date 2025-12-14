"use client";
import React from 'react';
import { Mail, Shield, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- Legal Content ---
const PrivacyContent = () => {
    const companyAddress = "Office 12373, 182-184 High Street North, East Ham, London, E6 2JA, UK";
    const privacyEmail = "info@mirabytes.io"; 

    const SectionHeader = ({ title, className = "" }: { title: string, className?: string }) => (
        <h2 className={`text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2 ${className}`}>
            {title}
        </h2>
    );

    const Paragraph = ({ children }: { children: React.ReactNode }) => (
        <p className="text-slate-400 leading-relaxed mb-4">{children}</p>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 flex items-center gap-4">
                <Shield size={36} className="text-purple-400" /> Privacy Policy
            </h1>
            <p className="text-sm text-slate-500 mb-6">Last Updated: December 13, 2025</p>

            <SectionHeader title="Introduction" className="mt-0" />
            <Paragraph>
                Mirabytes Inc. ("Mirabytes", "we", "us", or "our") is committed to protecting the privacy of visitors to our website and clients utilizing our consulting services. This Privacy Policy explains how we collect, use, and safeguard your personal data. Our registered office is at {companyAddress}.
            </Paragraph>
            <Paragraph>
                This policy should be read in conjunction with our <Link href="/terms" className="text-blue-400 hover:text-blue-300 underline">Terms of Service</Link>.
            </Paragraph>

            <SectionHeader title="1. Information We Collect" />
            <Paragraph>
                We collect information through three main channels:
            </Paragraph>
            <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400">
                <li><strong className="text-slate-200">Information You Provide to Us:</strong> Name, email address, phone number, company name, project information, and scheduling data (via contact/booking forms).</li>
                <li><strong className="text-slate-200">Automatically Collected Data:</strong> IP address, browser type, pages visited, time spent on pages, referral source, and clicks on the Assistant Bot (MIRA).</li>
                <li><strong className="text-slate-200">Client Project Data:</strong> Sensitive data related to client systems (code, configurations) governed by strict Non-Disclosure Agreements (NDAs).</li>
            </ul>

            <SectionHeader title="2. How We Use Your Information" />
            <Paragraph>
                We use the collected information for the following primary purposes:
            </Paragraph>
            <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400">
                <li>To Provide Services: Fulfill consulting requests, deliver project solutions, and manage client communications.</li>
                <li>To Schedule: Facilitate the booking and management of strategy sessions and meetings.</li>
                <li>To Improve Our Website: Analyze traffic patterns and user behavior to enhance user experience and website performance.</li>
            </ul>
            
            <SectionHeader title="3. Data Storage and Security" />
            <Paragraph>
                We employ robust security measures to protect your data, including:
            </Paragraph>
            <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400">
                <li><strong className="text-slate-200">Encryption:</strong> All data in transit is protected using SSL/TLS encryption. Sensitive data at rest is secured using AES-256 encryption.</li>
                <li><strong className="text-slate-200">Access Control:</strong> Access to sensitive client data is strictly limited to necessary senior personnel via Multi-Factor Authentication (MFA).</li>
                <li><strong className="text-slate-200">Cloud Infrastructure:</strong> We utilize secure, industry-leading cloud platforms (AWS, GCP, Azure) which maintain high compliance standards.</li>
            </ul>

            <SectionHeader title="4. Contact Information" />
            <Paragraph>
                If you have any questions or concerns about your data privacy or this policy, please contact us at:
                <br />
                Email: <Link href={`mailto:${privacyEmail}`} className="text-blue-400 hover:text-white underline">{privacyEmail}</Link>
                <br />
                Address: {companyAddress}
            </Paragraph>
        </div>
    );
};

export default function PrivacyPage() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto"
        >
            <PrivacyContent />
        </motion.div>
    );
}