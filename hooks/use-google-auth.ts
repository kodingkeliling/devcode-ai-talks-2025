import { useState } from 'react';
import { useAuthStore } from '@/stores/use-auth-store';

export const useGoogleAuth = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { accessToken, userName, logout, isAuthenticated } = useAuthStore();

    const login = async () => {
        setIsLoading(true);
        try {
            // Create an endpoint to get the auth URL to avoid secrets on client
            const res = await fetch('/api/auth/google/url');
            const data = await res.json();
            if (data.url) {
                window.location.href = data.url;
            }
        } catch (error) {
            console.error('Failed to get auth URL', error);
            setIsLoading(false);
        }
    };

    return { login, logout, isLoading, accessToken, userName, isAuthenticated };
};
