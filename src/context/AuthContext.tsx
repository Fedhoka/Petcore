"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { useRouter } from "next/navigation";
import { AuthUser, UserRole, mockUsers, getDefaultRoute } from "@/lib/auth";

interface AuthContextType {
    user: AuthUser | null;
    login: (email: string, password: string) => Promise<boolean>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

const COOKIE_NAME = "petcore_auth";

function getCookie(name: string): string | null {
    if (typeof document === "undefined") return null;
    const match = document.cookie.match(new RegExp("(^| )" + name + "=([^;]+)"));
    return match ? decodeURIComponent(match[2]) : null;
}

function setCookie(name: string, value: string, days: number) {
    const maxAge = days * 24 * 60 * 60;
    document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function deleteCookie(name: string) {
    document.cookie = `${name}=; path=/; max-age=0`;
}

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const raw = getCookie(COOKIE_NAME);
        if (raw) {
            try {
                setUser(JSON.parse(raw));
            } catch {
                deleteCookie(COOKIE_NAME);
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<boolean> => {
        const found = mockUsers.find(
            (u) => u.email === email && u.password === password
        );
        if (!found) return false;

        const authUser: AuthUser = {
            id: found.id,
            name: found.name,
            email: found.email,
            role: found.role as UserRole,
            avatar: found.avatar,
        };

        setCookie(COOKIE_NAME, JSON.stringify(authUser), 7);
        setUser(authUser);
        return true;
    };

    const logout = () => {
        deleteCookie(COOKIE_NAME);
        setUser(null);
        router.push("/login");
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used within AuthProvider");
    return ctx;
}
