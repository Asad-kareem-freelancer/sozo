'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from "@/components/ui/container";
import { Button } from '@/components/ui/button';
import { LogOut } from 'lucide-react';

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

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
    router.push('/');
  };

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center overflow-hidden">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="h-screen bg-gray-50 flex flex-col overflow-hidden">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <Container variant="default">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600">Manage and review form submissions</p>
            </div>
            <Button
              size="sm"
              variant="outline"
              onClick={handleLogout}
            >
              <LogOut size={16} />
              <span className="hidden sm:inline">Logout</span>
            </Button>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-hidden">
        <Container variant="default" className="h-full">
          <div className="h-full py-6 overflow-y-auto">
            {children}
          </div>
        </Container>
      </main>
    </div>
  );
}
