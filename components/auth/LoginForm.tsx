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

            router.push("/");
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
      className="mx-auto w-full max-w-md space-y-6 text-[#172653]"
      aria-describedby={error ? "login-error" : undefined}
    >
      {/* ERROR MESSAGE */}

      {error && (
        <div
          id="login-error"
          role="alert"
          aria-live="polite"
          className="rounded-xl border border-rose-300 bg-rose-50 px-4 py-3 text-sm font-medium leading-6 text-rose-800"
        >
          {error}
        </div>
      )}

      {/* USERNAME FIELD */}

      <div className="space-y-2">
        <label htmlFor="username" className="text-sm font-bold text-[#243b73]">
          Username
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Enter your username"
          className="min-h-12 w-full rounded-xl border border-[#c8d5ef] bg-white px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
          disabled={loading}
          autoComplete="username"
          aria-invalid={!!error}
        />
      </div>

      {/* PASSWORD FIELD */}

      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-bold text-[#243b73]">
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="min-h-12 w-full rounded-xl border border-[#c8d5ef] bg-white px-4 py-3 text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70"
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
        className="min-h-12 w-full rounded-xl bg-[linear-gradient(110deg,#243f8f_0%,#59429c_55%,#923774_100%)] px-5 py-3 font-bold text-white shadow-[0_10px_26px_rgba(66,55,145,0.20)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50"
      >
        {loading ? "Logging in..." : "Login"}
      </button>
    </form>
  );
}