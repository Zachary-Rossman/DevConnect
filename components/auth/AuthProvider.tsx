"use client";

import {
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";

// Authenticated User Type
type User = {
    id: string;
    username: string;
    email: string;
};

// Auth Context Type: Loads only during initial authentication, refreshes after login, logout, or another authentication event, and re-fetches the authenticatied user form the backend
type AuthContextType = {
    user: User | null;
    loading: boolean;
    refreshing: boolean;
    refreshUser: () => Promise<void>;
};

// Auth Context: Initializes with undefined so useAuth() can throw helpful error outside the provider
const AuthContext = createContext<AuthContextType | undefined>(
    undefined
);

// Auth Provider: Wraps application and manages auth state
export function AuthProvider({
    children,
}: {
    children: React.ReactNode;
}) {
    // Current authenticated user: Initializes with Null (no user logged in)
    const [user, setUser] = useState<User | null>(null);

    // Loading: Used for initial authentication check on first load of application
    const [loading, setLoading] = useState(true);

    // Refreshing: Use when auth is refreshed, such as after a login or logout event
    const [refreshing, setRefreshing] = useState(false);

    // Refresh Authenticated User: Shows user information if authenticated, shows an error if not authenticated
    async function refreshUser() {
        try {
            setRefreshing(true);

            const response = await fetch("/api/me");

            if (!response.ok) {
                setUser(null);
                return;
            }

            const data = (await response.json()) as User;

            setUser(data);
        } catch {
            // Any unexpected error is treated as an unauthenticated state
            setUser(null);
        } finally {
            setLoading(false);
            setRefreshing(false);
        }
    }

    // Initial Auth Check: Runs once when provider first mounts
    useEffect(() => {
        refreshUser();
    }, []);

    // Provide Auth State: Makes authentication data available to every component wrapped by this provider
    return (
        <AuthContext.Provider
            value={{
                user,
                loading,
                refreshing,
                refreshUser,
            }}
            >
                {children}
            </AuthContext.Provider>
    );
}

// Custom Auth Hook: Provides easy access to authentication context
export function useAuth() {
    const context = useContext(AuthContext);

    if (!context) {
        throw new Error(
            "useAuth must be used inside AuthProvider"
        );
    }

    return context;
}