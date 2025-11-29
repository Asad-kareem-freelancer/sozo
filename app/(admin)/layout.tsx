'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from "@/components/ui/container";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check authentication
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      setIsAuthenticated(true);
    } else {
      router.push('/');
    }
    setIsLoading(false);
  }, [router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow-sm">
        <Container variant="default">
          <div className="flex items-center h-20">
            <div className="space-y-1">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-sm text-gray-600">Manage and review form submissions</p>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="py-8">
        <Container variant="default">
          {children}
        </Container>
      </main>
    </div>
  );
}
