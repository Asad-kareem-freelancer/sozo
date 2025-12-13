'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Container from "@/components/ui/container";
import { Button } from '@/components/ui/button';
import { LogOut, Settings } from 'lucide-react';
import SettingsModal from '@/components/modals/SettingsModal';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [showSettings, setShowSettings] = useState(false);

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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-gray-600">Loading...</div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Admin Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm flex-shrink-0">
        <Container variant="default">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <div className="space-y-1">
              <h1 className="text-xl sm:text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-xs sm:text-sm text-gray-600">Manage and review form submissions</p>
            </div>
            <div className="flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowSettings(true)}
              >
                <Settings size={16} />
                <span className="hidden sm:inline">Settings</span>
              </Button>
              <Button
                size="sm"
                variant="outline"
                onClick={handleLogout}
              >
                <LogOut size={16} />
                <span className="hidden sm:inline">Logout</span>
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Container variant="default">
          <div className="py-6">
            {children}
          </div>
        </Container>
      </main>

      {/* Settings Modal */}
      <SettingsModal open={showSettings} onOpenChange={setShowSettings} />
    </div>
  );
}
