'use client';

import { useParams } from 'next/navigation';
import RebsPublication from './_components/RebsPublication';
import RrgPublication from './_components/RrgPublication';
import HsaPublication from './_components/HsaPublication';
import { notFound } from 'next/navigation';

export default function PublicationPage() {
    const params = useParams();
    const id = params?.id as string;

    // Route to the appropriate publication component based on ID
    switch (id) {
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