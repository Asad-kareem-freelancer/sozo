import { Metadata } from 'next';
import RebsPublication from './_components/RebsPublication';
import RrgPublication from './_components/RrgPublication';
import HsaPublication from './_components/HsaPublication';
import UnreadyToLeadPublication from './_components/UnreadyToLeadPublication';
import { notFound } from 'next/navigation';

type Props = {
    params: { id: string } | Promise<{ id: string }>;
  }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { id } =await params;

    switch (id) {
        case 'rrg-v1-2025':
            return {
                title: 'Rethinking Rural Governance (RRG) — Volume 1, Delaware County, New York | The SozoRock Foundation',
                description: 'Rethinking Rural Governance (RRG) Volume 1 shows how county leaders can move from compliance-driven reporting to systems intelligence in Delaware County, New York, using CHA/CHIP data, equity indicators, and governance tools that can be adapted by other rural regions.',
                keywords: 'Rethinking Rural Governance,RRG,Delaware County New York,rural governance,rural health equity,CHA,CHIP,public health planning,systems intelligence,SozoRock Foundation',
                authors: [{ name: 'Oluwabiyi Adeyemo' }],
                alternates: {
                    canonical: 'https://sozorockfoundation.org/publication/rrg-v1-2025',
                },
                openGraph: {
                    type: 'website',
                    title: 'Rethinking Rural Governance (RRG) — Volume 1, Delaware County, New York',
                    description: 'Rethinking Rural Governance (RRG) Volume 1 shows how county leaders can move from compliance-driven reporting to systems intelligence in Delaware County, New York.',
                    url: 'https://sozorockfoundation.org/publication/rrg-v1-2025',
                    siteName: 'The SozoRock Foundation',
                    images: [
                        {
                            url: 'https://sozorockfoundation.org/assets/images/rrg-v1-cover-1200x630.jpg',
                            width: 1200,
                            height: 630,
                            alt: 'Rethinking Rural Governance Volume 1 Cover',
                        },
                    ],
                },
                twitter: {
                    card: 'summary_large_image',
                    title: 'Rethinking Rural Governance (RRG) — Volume 1, Delaware County, New York',
                    description: 'How county leaders can move from compliance-driven reporting to systems intelligence using CHA/CHIP data and governance tools.',
                    images: ['https://sozorockfoundation.org/assets/images/rrg-v1-cover-1200x630.jpg'],
                },
            };

        case 'rebs-v1-2025':
            return {
                title: 'Rural Equity Blueprint Series (REBS) — Volume 1, Western New York | The SozoRock Foundation',
                description: 'The Rural Equity Blueprint Series (REBS) Volume 1 presents scalable, evidence-based frameworks that help rural counties strengthen health literacy, preventive pathways, digital readiness, chronic-disease support, and service coordination across Western New York.',
                keywords: 'Rural Equity Blueprint Series,REBS,Western New York,rural health equity,health literacy,digital navigation,public health strategy,CHA,CHIP,SozoRock Foundation',
                authors: [{ name: 'Oluwabiyi Adeyemo' }, { name: 'Jordan Hare' }],
                alternates: {
                    canonical: 'https://sozorockfoundation.org/publication/rebs-v1-2025',
                },
                openGraph: {
                    type: 'website',
                    title: 'Rural Equity Blueprint Series (REBS) — Volume 1, Western New York',
                    description: 'Scalable, evidence-based frameworks that help rural counties strengthen health literacy, preventive pathways, and service coordination.',
                    url: 'https://sozorockfoundation.org/publication/rebs-v1-2025',
                    siteName: 'The SozoRock Foundation',
                    images: [
                        {
                            url: 'https://sozorockfoundation.org/assets/images/rebs-v1-cover-1200x630.jpg',
                            width: 1200,
                            height: 630,
                            alt: 'Rural Equity Blueprint Series Volume 1 Cover',
                        },
                    ],
                },
                twitter: {
                    card: 'summary_large_image',
                    title: 'Rural Equity Blueprint Series (REBS) — Volume 1, Western New York',
                    description: 'Strengthening health literacy, preventive pathways, digital readiness, and chronic-disease support across Western New York.',
                    images: ['https://sozorockfoundation.org/assets/images/rebs-v1-cover-1200x630.jpg'],
                },
            };

        case 'hsa-v1-2026':
            return {
                title: 'Health Systems Assurance (HSA) Series | The SozoRock Foundation',
                description: 'The Health Systems Assurance (HSA) Series delivers practical, security-focused frameworks that help counties, health systems, and digital-health platforms strengthen cybersecurity readiness, compliance maturity, and operational assurance across the United States and Canada.',
                keywords: 'Health Systems Assurance, HSA Series, cybersecurity readiness, digital health compliance, health systems assurance, rural health systems, SozoRock Foundation, privacy frameworks, public health security, HITRUST, HIPAA, PHIPA, SOC 2 readiness',
                authors: [{ name: 'Oluwabiyi Adeyemo' }],
                alternates: {
                    canonical: 'https://sozorockfoundation.org/publication/hsa-v1-2026',
                },
                openGraph: {
                    type: 'website',
                    title: 'Health Systems Assurance (HSA) Series',
                    description: 'A publication series focused on cybersecurity, compliance assurance, and operational readiness for digital health platforms, county agencies, and rural healthcare systems.',
                    url: 'https://sozorockfoundation.org/publication/hsa-v1-2026',
                    siteName: 'The SozoRock Foundation',
                    images: [
                        {
                            url: 'https://sozorockfoundation.org/assets/images/hsa-series-cover-1200x630.jpg',
                            width: 1200,
                            height: 630,
                            alt: 'Health Systems Assurance Series Cover',
                        },
                    ],
                },
                twitter: {
                    card: 'summary_large_image',
                    title: 'Health Systems Assurance (HSA) Series',
                    description: 'Strengthening cybersecurity, compliance, and operational assurance across digital health systems and public health agencies.',
                    images: ['https://sozorockfoundation.org/assets/images/hsa-series-cover-1200x630.jpg'],
                },
            };

        case 'unready-to-lead-2025':
            // Return default metadata for UnReady to Lead (no custom meta tags provided)
            return {
                title: 'UnReady to Lead (2025) | The SozoRock Foundation',
                description: 'A leadership publication by The SozoRock Foundation.',
            };

        default:
            return {
                title: 'Publication Not Found | The SozoRock Foundation',
            };
    }
}

export default async function PublicationPage({ params }: { params: { id: string } | Promise<{ id: string }> }) {
    const { id } =await params;

    // Route to the appropriate publication component based on ID
    switch (id) {
        case 'unready-to-lead-2025':
            return <UnreadyToLeadPublication />;

        case 'rebs-v1-2025':
            return <RebsPublication />;

        case 'rrg-v1-2025':
            return <RrgPublication />;

        case 'hsa-v1-2026':
            return <HsaPublication />;

        default:
            // Return 404 for unknown publication IDs
            notFound();
    }
}