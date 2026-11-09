"use client";

import type { FormEvent } from "react";
import type { Profile, UpdateProfileInput } from "@/types/Profile";
import { useRouter } from "next/navigation";
import { useState } from "react";

type EditProfileFormProps = {
    profile: Profile;
};

export default function EditProfileForm({
    profile, 
}: EditProfileFormProps) {
    const router = useRouter();

    // UI State
    const [firstName, setFirstName] = useState(profile.firstName);
    const [lastName, setLastName] = useState(profile.lastName);
    const [bio, setBio] = useState(profile.bio);
    const [city, setCity] = useState(profile.city ?? "");
    const [country, setCountry] = useState(profile.country);
    const [techStack, setTechStack] = useState<string[]>(
        profile.techStack.length > 0 ? [...profile.techStack] : [""]
    );

    // UI State
    const [success, setSuccess] = useState<string | null>(null);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState("");

    // Define Class For Inputs To Use In JSX
    const inputClasses =  "w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:opacity-60";

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

async function handleUpdate(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (saving) return;

    setError("");
    setSuccess(null);

    // Validation Layer
    if (!firstName.trim()) {
        setError("First Name Is Required");
        return;
    }

    if (!lastName.trim()) {
        setError("Last Name Is Required");
        return;
    }

    if (!country.trim()) {
        setError("Country Is Required");
        return;
    }

    setSaving(true);

    try {
        // Clean Tech Stack Array
        const cleanedTechSTack = techStack.map((skill) => skill.trim()).filter((skill) => skill.length > 0);
            
        // Build request payload using the shared type
        const updateProfile: UpdateProfileInput = {
            firstName,
            lastName,
            bio,
            city,
            country,
            techStack: cleanedTechSTack,
        };
        
        const response = await fetch(
            `/api/profiles/${encodeURIComponent(profile.username)}`,
            {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updateProfile),
            }
        );
        
        const data = await response.json();
        
        // Display API validation errors
        if (!response.ok) {
            setError(data.error || "Something went wrong");
            return;
        }
        
        // Show success feedback before redirecting
        setSuccess("Profile updated successfully!");
        
        // Small delay so users can read the success message
        setTimeout(() => {
            router.push(`/profile/${encodeURIComponent(profile.username)}`);
        }, 1200);
    } catch {
        // Hnadles network failures such as no internet connection or an unreachable server
        setError("Network error. Please try again.");
    } finally {
        // Always restores the form state
        setSaving(false);
    }
}

return (
    <form
        onSubmit={handleUpdate}
        className="mt-8 space-y-6 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm sm:p-8"
    >
        <div>
            <h2 className="text-xl font-bold text-gray-900">
                Profile Information
            </h2>
            <p className="mt-1 text-sm text-gray-500">
                Update the information displayed on your public profile.
            </p>
        </div>

        {/* Form Feedback */}
        {error && (
            <p
                id="form-error"
                role="alert"
                className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
            >
                {error}
            </p>
        )}

        {success && (
            <p
                role="status"
                className="rounded-lg border border-green-200 bg-green-50 p-4 text-sm text-green-700"
            >
                {success}
            </p>
        )}

        {/* Username: Read Only */}
        <div className="space-y-2">
            <label
                htmlFor="username"
                className="block text-sm font-medium text-gray-700"
            >
                Username
            </label>
            <input
                id="username"
                type="text"
                value={profile.username}
                readOnly
                className="w-full cursor-not-allowed rounded-lg border border-gray-200 bg-gray-100 px-4 py-2.5 text-sm text-gray-500"
            />
            <p className="text-xs text-gray-500">
                Username changes will be available in Account settings.
            </p>
        </div>

        {/* First And Last Name */}
        <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
                <label
                    htmlFor="first-name"
                    className="block text-sm font-medium text-gray-700"
                >
                    First Name
                </label>
                <input
                    id="first-name"
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    disabled={saving}
                    className={inputClasses}
                    autoComplete="given-name"
                    required
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                >
                    Last Name
                </label>
                <input
                    id="last-name"
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    disabled={saving}
                    className={inputClasses}
                    autoComplete="family-name"
                    required
                />
            </div>
        </div>

        {/* Location */}
        <div className="grid gap-5 sm:grid-cols-2">
            <div className="space-y-2">
                <label
                    htmlFor="city"
                    className="block text-sm font-medium text-gray-700"
                >
                    City
                </label>
                <input
                    id="city"
                    type="text"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    disabled={saving}
                    className={inputClasses}
                    autoComplete="address-level2"
                />
            </div>

            <div className="space-y-2">
                <label
                    htmlFor="country"
                    className="block text-sm font-medium text-gray-700"
                >
                    Country
                </label>
                <input
                    id="country"
                    type="text"
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    disabled={saving}
                    className={inputClasses}
                    autoComplete="country-name"
                    required
                />
            </div>
        </div>

        {/* Tech Stack */}
        <fieldset className="space-y-3">
            <legend className="text-sm font-medium text-gray-700">
                Tech Stack
            </legend>

            {techStack.map((skill, index) => (
                <div key={index} className="flex items-center gap-2">
                    <label
                        htmlFor={`technology-${index}`}
                        className="sr-only"
                    >
                        Technology {index + 1}
                    </label>

                    <input
                        id={`technology-${index}`}
                        type="text"
                        value={skill}
                        onChange={(e) =>
                            updateTechnology(index, e.target.value)
                        }
                        placeholder="Enter a technology"
                        disabled={saving}
                        className={inputClasses}
                    />

                    <button
                        type="button"
                        onClick={() => removeTechnology(index)}
                        disabled={
                            saving ||
                            techStack.length === 1 ||
                            !skill.trim()
                        }
                        className="shrink-0 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-600 transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Remove
                    </button>
                </div>
            ))}

            <button
                type="button"
                onClick={addTechnology}
                disabled={
                    saving ||
                    !techStack[techStack.length - 1].trim()
                }
                className="rounded-lg border border-blue-200 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-50 disabled:cursor-not-allowed disabled:opacity-40"
            >
                + Add Technology
            </button>
        </fieldset>

        {/* Bio */}
        <div className="space-y-2">
            <label
                htmlFor="bio"
                className="block text-sm font-medium text-gray-700"
            >
                Bio
            </label>

            <textarea
                id="bio"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                disabled={saving}
                rows={5}
                placeholder="Tell other developers about yourself..."
                className={`${inputClasses} resize-y`}
            />
        </div>

        {/* Submit */}
        <div className="flex justify-end border-t border-gray-200 pt-6">
            <button
                type="submit"
                disabled={saving}
                aria-busy={saving}
                className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
            >
                {saving ? "Updating Profile..." : "Update Profile"}
            </button>
        </div>
    </form>
    );
}