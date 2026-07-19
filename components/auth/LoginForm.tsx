"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { LoginInput } from "@/types/User";
import { useAuth } from "@/components/auth/AuthProvider";

export default function LoginForm() {
    // Hooks
    const router = useRouter();
    const { refreshUser } = useAuth();

    // Form State
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    // UI State
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    // Login Submission
    async function handleSubmit(e?: React.FormEvent) {
        if (e) e.preventDefault();

        if (loading) return;

        setError(null);

        // Client Validation
        if (!username.trim()) {
            setError("Username is required");
            return;
        }

        if (!password.trim()) {
            setError("Password is required");
            return;
        }

        setLoading(true);

        try {
            const payload: LoginInput = {
                username,
                password,
            };

            const response = await fetch("/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            // Server Validation
            if (!response.ok) {
                setError(data.error || "Login failed");
                return;
            }

            // Authentication Success
            await refreshUser();

            router.push("/dashboard");
        } catch {
            // Network failures (offline, server unavailable, etc.)
            setError("Network error. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-md"
      aria-describedby={error ? "login-error" : undefined}
    >
      {/* ERROR MESSAGE */}

      {error && (
        <div
          id="login-error"
          role="alert"
          aria-live="polite"
          className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600"
        >
          {error}
        </div>
      )}

      {/* USERNAME FIELD */}

      <div className="space-y-1">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="username"
          aria-invalid={!!error}
        />
      </div>

      {/* PASSWORD FIELD */}

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="current-password"
          aria-invalid={!!error}
        />
      </div>

      {/* SUBMIT BUTTON */}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}