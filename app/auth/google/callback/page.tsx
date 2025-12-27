'use client';

import { Suspense, useEffect, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuthStore } from '@/stores/use-auth-store';
import { Loader2 } from 'lucide-react';

function AuthCallbackContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const setAuth = useAuthStore((state) => state.setAuth);
    const initialized = useRef(false);

    useEffect(() => {
        const handleAuth = async () => {
            const code = searchParams.get('code');
            if (code && !initialized.current) {
                initialized.current = true;
                try {
                    const res = await fetch(`/api/auth/google/callback?code=${code}`);
                    const data = await res.json();

                    if (data.accessToken && data.userName) {
                        setAuth(data.accessToken, data.userName);
                        router.push('/');
                    } else {
                        console.error('Auth failed:', data.error);
                        router.push('/?error=auth_failed');
                    }
                } catch (error) {
                    console.error('Auth error:', error);
                    router.push('/?error=auth_error');
                }
            }
        };

        handleAuth();
    }, [searchParams, setAuth, router]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen gap-4 text-center p-4">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
            <div className="space-y-2">
                <h2 className="text-xl font-bold">Menyambungkan ke Google Drive...</h2>
                <p className="text-muted-foreground">Mohon tunggu sebentar selagi kami menyiapkan scrapbook-mu.</p>
            </div>
        </div>
    );
}

export default function AuthCallbackPage() {
    return (
        <Suspense fallback={
            <div className="flex flex-col items-center justify-center min-h-screen gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-primary" />
            </div>
        }>
            <AuthCallbackContent />
        </Suspense>
    );
}
