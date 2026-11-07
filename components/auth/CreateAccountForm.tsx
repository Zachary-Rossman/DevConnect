"use client";

import { useAuth } from "./AuthProvider";
import { useState } from "react";
import { useRouter } from "next/navigation";
import type { CreateUserInput } from "@/types/User";

export default function CreateAccountForm() {
    const router = useRouter();
    const { refreshUser } = useAuth();

    // Form State
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [birthday, setBirthday] = useState("");
    const [city, setCity] = useState("");
    const [country, setCountry] = useState("");
    const [techStack, setTechStack] = useState<string[]>([""]);

    // UI State
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    // Add To TechStack
    function addTechnology() {
      setTechStack((current) => {
        // Prevent Adding Anohter Input If Input Is Empty
        if (!current[current.length -1].trim()) {
          return current;
        }

        return [...current, ""];
      });
    }

    // Remove Skill From TechStack
    function removeTechnology(indexToRemove: number) {
      setTechStack((current) => {
        // Always Keep At Least One Input Visible
        if (current.length <=1) {
          return current;
        }

        return current.filter(
          (_, index) => index !== indexToRemove
        );
      });
    }

    // Update TechStack
    function updateTechnology(index: number, value: string) {
      setTechStack((current) =>
        current.map((skill, i) =>
          i === index ? value: skill
    )
  );
}

    // Workflow
    async function handleSubmit(e?: React.FormEvent) {
        if (e) e.preventDefault();

        if (loading) return;

        setError(null);
        setSuccess(null);

        // Client-Side Validation
        if (!email.trim()) 
            return setError("Email is required");

        if (!username.trim()) 
            return setError("Username is required");

        if (!password.trim()) 
            return setError("Password is required");

        if (!firstName.trim()) 
            return setError("First Name is required");

        if (!lastName.trim()) 
            return setError("Last Name is required");

        if (!birthday.trim()) 
            return setError("Birthday is required");

        if (!city.trim()) 
            return setError("City is required");

        if (!country.trim()) 
            return setError("Country is required");

        setLoading(true);

        try {
            // Clean Tech Stack Array
            const cleanedTechSTack = techStack.map((skill) => skill.trim()).filter((skill) => skill.length > 0);

            // Build request payload using the shared type
            const newUser: CreateUserInput = {
                email,
                username,
                password,
                firstName,
                lastName,
                birthday,
                city,
                country,
                techStack: cleanedTechSTack,
            };

            const response = await fetch("/api/users", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(newUser),
            });

            const data = await response.json();

            // Display API validation errors
            if (!response.ok) {
                setError(data.error || "Something went wrong");
                return;
            }

            // Show success feedback before redirecting
            setSuccess("Account created successfully!");

            // Update AuthProvider
            await refreshUser();

            // Small delay so users can read the success message
            setTimeout(() => {
                router.push(`/profile/${encodeURIComponent(data.user.username)}`);
            }, 1200);
        } catch {
            // Hnadles network failures such as no internet connection or an unreachable server
            setError("Network error. Please try again.");
        } finally {
            // Always restores the form state
            setLoading(false);
        }
    }

    return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 max-w-md"
      aria-describedby={error || success ? "form-feedback" : undefined}
    >
      {/* FEEDBACK MESSAGES */}

      {(error || success) && (
        <div
          id="form-feedback"
          role={error ? "alert" : "status"}
          aria-live="polite"
          className="space-y-2"
        >
          {error && (
            <p className="rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
              {error}
            </p>
          )}

          {success && (
            <p className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
              {success}
            </p>
          )}
        </div>
      )}

      {/* EMAIL */}

      <div className="space-y-1">
        <label htmlFor="email" className="text-sm font-medium">
          Email
        </label>

        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="email"
        />
      </div>

      {/* USERNAME */}

      <div className="space-y-1">
        <label htmlFor="username" className="text-sm font-medium">
          Username
        </label>

        <input
          id="username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="username"
        />
      </div>

      {/* PASSWORD */}

      <div className="space-y-1">
        <label htmlFor="password" className="text-sm font-medium">
          Password
        </label>

        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="new-password"
        />
      </div>

      {/* FIRST NAME */}

      <div className="space-y-1">
        <label htmlFor="firstName" className="text-sm font-medium">
          First Name
        </label>

        <input
          id="firstName"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="given-name"
        />
      </div>

      {/* LAST NAME */}

      <div className="space-y-1">
        <label htmlFor="lastName" className="text-sm font-medium">
          Last Name
        </label>

        <input
          id="lastName"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="family-name"
        />
      </div>

      {/* BIRTHDAY */}

      <div className="space-y-1">
        <label htmlFor="birthday" className="text-sm font-medium">
          Birthday
        </label>

        <input
          id="birthday"
          type="date"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="bday"
        />
      </div>

      {/* CITY */}

      <div className="space-y-1">
        <label htmlFor="city" className="text-sm font-medium">
          City
        </label>

        <input
          id="city"
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="family-name"
        />
      </div>

      {/* COUNTRY */}

      <div className="space-y-1">
        <label htmlFor="country" className="text-sm font-medium">
          Country
        </label>

        <input
          id="country"
          type="text"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          className="w-full rounded-md border px-3 py-2"
          disabled={loading}
          autoComplete="family-name"
        />
      </div>

      {/* Tech Stack */}
      
      <div className="space-y-3">
        <label className="text-sm font-medium">
          Tech Stack
        </label>

        {techStack.map((skill, index) => (
          <div key={index} className="flex gap-2">
            <input
             key={index}
             type="text"
             value={skill}
             onChange={(e) =>
              updateTechnology(index, e.target.value)
             }
             placeholder="Enter A Technology"
             className="w-full rounded-md border px-3 py-2"
             disabled={loading}
            />

            <button
               type="button"
               onClick={() => removeTechnology(index)}
               disabled={loading || techStack.length === 1 || !skill.trim()}
               className="rounded-md border px-4 py-2"
            >
              Remove
            </button>
          </div>
        ))}

        <button
           type="button"
           onClick={addTechnology}
           disabled={
            loading ||
            !techStack[techStack.length - 1].trim()
          }
           className="rounded-md border px-4 py-2"
        >
          + Add Technology
        </button>
      </div>

      {/* SUBMIT BUTTON */}

      <button
        type="submit"
        disabled={loading}
        aria-busy={loading}
        className="w-full rounded-md bg-black px-4 py-2 text-white disabled:opacity-50"
      >
        {loading ? "Creating account..." : "Create Account"}
      </button>
    </form>
  );
}