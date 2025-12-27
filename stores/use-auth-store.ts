import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
    accessToken: string | null;
    userName: string | null;
    setAuth: (accessToken: string, userName: string) => void;
    logout: () => void;
    isAuthenticated: boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set) => ({
            accessToken: null,
            userName: null,
            isAuthenticated: false,
            setAuth: (accessToken, userName) => set({ accessToken, userName, isAuthenticated: true }),
            logout: () => set({ accessToken: null, userName: null, isAuthenticated: false }),
        }),
        {
            name: 'google-drive-auth',
        }
    )
);
