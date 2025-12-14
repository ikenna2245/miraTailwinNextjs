"use client";
import React from 'react';
import { ShieldCheck, Lock } from 'lucide-react';
import Link from 'next/link';
import { motion } from 'framer-motion';

export default function SecurityContent() {
    const contactEmail = "info@mirabytes.io"; 

    const SectionHeader = ({ title }: { title: string }) => (
        <h2 className="text-2xl font-bold text-white mt-10 mb-4 border-b border-white/10 pb-2">
            {title}
        </h2>
    );

    const Paragraph = ({ children }: { children: React.ReactNode }) => (
        <p className="text-slate-400 leading-relaxed mb-4">{children}</p>
    );

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="min-h-screen pt-32 pb-20 px-6 max-w-7xl mx-auto"
        >
            <div className="max-w-4xl mx-auto space-y-4">
                <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-2 flex items-center gap-4">
                    <ShieldCheck size={36} className="text-emerald-400" /> Security Statement
                </h1>
                <p className="text-sm text-slate-500 mb-6">Mirabytes Commitment to Security and Data Integrity</p>

                <SectionHeader title="1. Zero Trust Model" />
                <Paragraph>
                    We operate under a strict Zero Trust policy: **Never trust, always verify.** This foundational principle applies to all access points, internal systems, and client environments.
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400">
                    <li><strong>Access:</strong> All internal access to client systems requires Multi-Factor Authentication (MFA) and granular, time-bound permissions (Just-In-Time access).</li>
                    <li><strong>Network:</strong> Client environments are segmented and isolated. We do not use shared development environments for sensitive projects.</li>
                </ul>

                <SectionHeader title="2. Data Handling and Confidentiality" />
                <h3 className="text-lg font-semibold text-slate-200 mt-4 mb-2">Client Data Segregation & Encryption</h3>
                <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400">
                    <li>All client source code, credentials, and non-production data are stored in segregated, encrypted repositories and credential vaults (e.g., AWS Secrets Manager, HashiCorp Vault).</li>
                    <li><strong>Encryption in Transit:</strong> All website communication and API endpoints are secured using TLS 1.2+ encryption.</li>
                    <li><strong>Encryption at Rest:</strong> Sensitive client data stored in cloud databases or file systems is secured using AES-256 encryption at rest.</li>
                </ul>
                
                <SectionHeader title="3. Development Lifecycle Security (DevSecOps)" />
                <Paragraph>
                    We integrate security into every stage of the development process (DevSecOps) to prevent vulnerabilities from reaching production, ensuring security is continuous, not just a final check.
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400">
                    <li><strong>Secure Coding:</strong> Developers adhere to OWASP guidelines and undergo regular secure coding training.</li>
                    <li><strong>Continuous Scanning (SAST/DAST):</strong> Automated Static Analysis (SAST) and Dynamic Analysis (DAST) are mandatory within our CI/CD pipelines to detect and remediate vulnerabilities immediately.</li>
                    <li><strong>Third-Party Audits:</strong> We recommend and often facilitate third-party penetration testing and compliance audits (e.g., SOC 2, HIPAA, GDPR) for client applications.</li>
                </ul>

                <SectionHeader title="4. Operational Security" />
                <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400">
                    <li><strong>Vulnerability Management:</strong> Our infrastructure is continuously scanned for known vulnerabilities and patched immediately.</li>
                    <li><strong>Disaster Recovery:</strong> We utilize infrastructure-as-code (IaC) and maintain detailed recovery plans to ensure business continuity.</li>
                </ul>

                <SectionHeader title="5. Incident Management & Reporting" />
                <Paragraph>
                    While we strive for zero incidents, Mirabytes maintains a formal incident response plan:
                </Paragraph>
                <ul className="list-disc list-inside space-y-2 pl-4 text-slate-400">
                    <li><strong>Detection:</strong> We utilize centralized logging and real-time monitoring tools to detect anomalous activity immediately.</li>
                    <li><strong>Response:</strong> Our security team follows defined protocols for incident containment, eradication, and recovery, prioritizing client data integrity and system uptime.</li>
                    <li><strong>Reporting:</strong> Clients are notified immediately and transparently upon discovery of any security breach impacting their assets, in compliance with relevant data protection regulations.</li>
                </ul>

                <div className="mt-10 p-6 rounded-xl border border-white/10 bg-slate-900/50 flex items-center gap-4">
                    <Lock size={24} className="text-emerald-400 flex-shrink-0" />
                    <Paragraph>
                        <span className="italic text-sm mb-0 block">
                            For detailed technical security inquiries or to review our internal protocols, please contact our Lead Consultant directly via email at <Link href={`mailto:${contactEmail}`} className="text-emerald-400 hover:text-white underline">{contactEmail}</Link>.
                        </span>
                    </Paragraph>
                </div>
            </div>
        </motion.div>
    );
};