"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";

interface User {
    _id: string;
    displayName: string;
    avatar: string;
    email: string;
    accountType: string;
}

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    isAuthenticated: boolean;
    refetch: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
    refetch: async () => {},
});

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:5500/api/v1";

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUser = useCallback(async () => {
        try {
            const res = await fetch(`${API_URL}/auth/me`, {
                credentials: "include",
            });


            if (res.ok) {
                const json = await res.json();
                setUser(json.data ?? null);
            } else {
                setUser(null);
            }
        } catch (err) {
            setUser(null);
        } finally {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    return (
        <AuthContext.Provider
            value={{
                user,
                isLoading,
                isAuthenticated: !!user,
                refetch: fetchUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
