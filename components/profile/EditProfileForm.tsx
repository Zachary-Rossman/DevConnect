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
    const inputClasses = "min-h-12 min-w-0 w-full rounded-xl border border-[#c8d5ef] bg-white px-4 py-3 text-sm text-[#172653] shadow-sm outline-none transition-colors placeholder:text-[#7785a2] focus:border-[#a32972] focus:ring-2 focus:ring-[#f2b7df] disabled:cursor-not-allowed disabled:bg-[#f3f5fa] disabled:opacity-70";

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
            className="mt-8 space-y-8 rounded-3xl border border-[#dce2f7] bg-white p-6 text-[#172653] shadow-[0_12px_35px_rgba(35,50,104,0.07)] sm:p-8"
        >
            <div>
                <h2 className="border-b border-[#e8e8f5] pb-4 text-2xl font-black tracking-tight text-[#a32972]">
                    Profile Information
                </h2>
                <p className="mt-3 text-sm leading-7 text-[#536382]">
                    Update the information displayed on your public profile.
                </p>
            </div>

            {/* Form Feedback */}
            {error && (
                <p
                    id="form-error"
                    role="alert"
                    className="rounded-xl border border-rose-300 bg-rose-50 p-4 text-sm font-medium leading-6 text-rose-800"
                >
                    {error}
                </p>
            )}

            {success && (
                <p
                    role="status"
                    className="rounded-xl border border-emerald-300 bg-emerald-50 p-4 text-sm font-medium leading-6 text-emerald-800"
                >
                    {success}
                </p>
            )}

            {/* Username: Read Only */}
            <div className="space-y-2">
                <label
                    htmlFor="username"
                    className="block text-sm font-bold text-[#243b73]"
                >
                    Username
                </label>
                <input
                    id="username"
                    type="text"
                    value={profile.username}
                    readOnly
                    className="min-h-12 w-full cursor-not-allowed rounded-xl border border-[#dce2f7] bg-[#edf3ff] px-4 py-3 text-sm font-medium text-[#536382] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972]"
                />
                <p className="text-xs leading-6 text-[#66738f]">
                    Username changes will be available in Account settings.
                </p>
            </div>

            {/* First And Last Name */}
            <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                    <label
                        htmlFor="first-name"
                        className="block text-sm font-bold text-[#243b73]"
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
                        className="block text-sm font-bold text-[#243b73]"
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
                        className="block text-sm font-bold text-[#243b73]"
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
                        className="block text-sm font-bold text-[#243b73]"
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
            <fieldset className="space-y-4">
                <legend className="text-sm font-bold text-[#243b73]">
                    Tech Stack
                </legend>

                {techStack.map((skill, index) => (
                    <div key={index} className="flex min-w-0 items-center gap-2">
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
                            className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-xl border border-[#e3a6d2] bg-[#fff1fa] px-3 py-2 text-sm font-bold text-[#92336e] transition-colors hover:bg-[#f9d9ed] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-40 sm:px-4"
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
                    className="inline-flex min-h-12 items-center justify-center rounded-xl border border-[#a8bff1] bg-[#edf3ff] px-5 py-3 text-sm font-bold text-[#243f8f] transition-colors hover:bg-[#dce8ff] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-40"
                >
                    + Add Technology
                </button>
            </fieldset>

            {/* Bio */}
            <div className="space-y-2">
                <label
                    htmlFor="bio"
                    className="block text-sm font-bold text-[#243b73]"
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
            <div className="flex justify-end border-t border-[#e8e8f5] pt-6">
                <button
                    type="submit"
                    disabled={saving}
                    aria-busy={saving}
                    className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[linear-gradient(110deg,#243f8f_0%,#59429c_55%,#923774_100%)] px-6 py-3 text-sm font-bold text-white shadow-[0_10px_26px_rgba(66,55,145,0.20)] transition-all hover:brightness-110 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#a32972] disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
                >
                    {saving ? "Updating Profile..." : "Update Profile"}
                </button>
            </div>
        </form>
    );
}