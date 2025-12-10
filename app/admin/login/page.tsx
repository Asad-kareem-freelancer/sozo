'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import Container from "@/components/ui/container";
import { ShieldCheck, Eye, EyeOff } from 'lucide-react';
import { login } from '@/lib/api/auth';

export default function AdminLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({ email: '', password: '', general: '' });
  const [isLoading, setIsLoading] = useState(false);

  // Redirect if already authenticated
  useEffect(() => {
    const auth = localStorage.getItem('isAuthenticated');
    if (auth === 'true') {
      router.push('/admin');
    }
  }, [router]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({ email: '', password: '', general: '' });

    // Frontend validation
    let hasError = false;
    const newErrors = { email: '', password: '', general: '' };

    if (!email) {
      newErrors.email = 'Email is required';
      hasError = true;
    } else if (!validateEmail(email)) {
      newErrors.email = 'Please enter a valid email';
      hasError = true;
    }

    if (!password) {
      newErrors.password = 'Password is required';
      hasError = true;
    }

    if (hasError) {
      setErrors(newErrors);
      return;
    }

    // Call login API
    setIsLoading(true);
    try {
      const result = await login(email, password);

      if (result.success) {
        // Save to localStorage
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userEmail', email);

        // Redirect to admin dashboard
        router.push('/admin');
      } else {
        setErrors({ email: '', password: '', general: result.error || 'Invalid email or password' });
      }
    } catch (error) {
      setErrors({ email: '', password: '', general: 'An unexpected error occurred. Please try again.' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-[80vh] bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
      <Container variant="default">
        <div className="max-w-md w-full mx-auto">
          <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10 md:p-12">
            <div className="mb-10 text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-[#1A4D2E]/10 rounded-2xl mb-6">
                <ShieldCheck className="w-8 h-8 text-[#1A4D2E]" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Admin Login</h1>
              <p className="text-gray-600">Sign in to access the admin dashboard</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-7">
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  error={errors.email}
                  disabled={isLoading}
                  className="mt-1"
                />
              </div>

              <div>
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    error={errors.password}
                    disabled={isLoading}
                    className="mt-1 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                    disabled={isLoading}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {errors.general && (
                <div className="text-sm text-red-500 bg-red-50 p-4 rounded-xl border border-red-100">
                  {errors.general}
                </div>
              )}

              <Button
                type="submit"
                variant="secondary"
                className="w-full h-12 text-base"
                disabled={isLoading}
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </Button>

              <div className="text-center pt-2">
                <button
                  type="button"
                  onClick={() => router.push('/')}
                  className="text-sm text-gray-600 hover:text-gray-900 transition-colors underline-offset-4 hover:underline"
                >
                  Back to home
                </button>
              </div>
            </form>
          </div>
        </div>
      </Container>
    </div>
  );
}
