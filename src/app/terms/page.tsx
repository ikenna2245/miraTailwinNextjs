"use client";
import React from 'react';
import { Gavel, CheckCircle } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

// --- Legal Content ---
const TermsContent = () => {
    const companyName = "Mirabytes Inc."; 
    const contactEmail = "info@mirabytes.io"; 
    const privacyPolicyLink = "/privacy"; 

    const SectionHeader = ({ title }: { title: string }) => (
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
            {title}
        </h2>
    );

    const Paragraph = ({ children }: { children: React.ReactNode }) => (
        <p className="text-slate-400 leading-relaxed mb-4">{children}</p>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-4">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 flex items-center gap-4">
                <Gavel size={36} className="text-blue-400" /> Terms of Service
            </h1>
            <p className="text-sm text-slate-500 mb-6">Last Updated: December 13, 2025</p>

            <SectionHeader title="1. Agreement to Terms" />
            <Paragraph>
                These Terms of Service ("Terms") govern your access to and use of the Mirabytes Inc. website and any services offered by us (collectively, the "Services"). By accessing or using our Services, you agree to be bound by these Terms and our <Link href={privacyPolicyLink} className="text-blue-400 hover:text-white underline">Privacy Policy</Link>.
            </Paragraph>

            <SectionHeader title="2. Consulting Engagements" />
            <Paragraph>
                All consulting, development, and architectural services are subject to a separate written Master Services Agreement (MSA) and Statement of Work (SOW). The MSA/SOW shall govern in the event of any conflict with these Terms.
            </Paragraph>

            <SectionHeader title="3. Intellectual Property (IP) and Ownership" />
            <h3 className="text-lg font-semibold text-slate-200 mt-4 mb-2">Client Ownership</h3>
            <Paragraph>
                All custom code, documentation, designs, and deliverables created specifically for and paid for by the client shall be the **sole and exclusive property of the Client**. Mirabytes retains no ownership rights over the final client deliverables.
            </Paragraph>
            <h3 className="text-lg font-semibold text-slate-200 mt-4 mb-2">Background IP</h3>
            <Paragraph>
                Mirabytes retains ownership of its proprietary development tools and reusable framework components ("Background IP"). We grant the Client a perpetual, royalty-free, non-exclusive license to use the Background IP solely as necessary to operate the final client deliverables.
            </Paragraph>

            <SectionHeader title="4. Warranties and Limitation of Liability" />
            <Paragraph>
                Mirabytes warrants that its services will be performed in a professional manner consistent with industry standards. If non-conforming work is identified and reported within 30 days of delivery, Mirabytes will re-perform the service at no additional cost.
            </Paragraph>
            <Paragraph>
                Mirabytes shall not be liable for any indirect, incidental, special, consequential, or punitive damages. Mirabytes’ total liability shall not exceed the total fees paid by the client for the specific project or service giving rise to the claim.
            </Paragraph>
            
            <SectionHeader title="5. Contact Information" />
            <Paragraph>
                If you have any questions about these Terms of Service, please contact us at:
                <br />
                Email: <Link href={`mailto:${contactEmail}`} className="text-blue-400 hover:text-white underline">{contactEmail}</Link>
            </Paragraph>
        </div>
    );
};

export default function TermsPage() {
    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto"
        >
            <TermsContent />
        </motion.div>
    );
}