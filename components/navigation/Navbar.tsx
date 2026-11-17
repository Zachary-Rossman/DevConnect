"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

type NavLink = {
    label: string;
    href: string;
};

export default function Navbar() {
    const pathname = usePathname();
    const { user, loading } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    // Close the mobile drawer after navigating to another page.
    useEffect(() => {
        setMenuOpen(false);
    }, [pathname]);

    // Keep the existing routes, only changing the visual presentation.
    const links: NavLink[] = user
        ? [
              { label: "Feed", href: "/feed" },
              { label: "About", href: "/about" },
              { label: "Messages", href: "/account/messages" },
              {
                  label: "My Profile",
                  href: `/profile/${encodeURIComponent(user.username)}`,
              },
              { label: "My Account", href: "/account" },
          ]
        : [{ label: "About", href: "/about" }];

    function linkStyles(href: string, mobile = false) {
        const active = pathname === href;

        return [
            "rounded-xl font-semibold transition-colors duration-200",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc3e5]",
            mobile ? "block px-4 py-3 text-sm" : "px-3 py-2 text-sm",
            active
                ? "bg-[#ffc3e5] text-[#13234f] shadow-[0_4px_20px_rgba(255,170,221,0.18)]"
                : "text-[#eef1ff] hover:bg-white/10 hover:text-[#ffd4eb]",
        ].join(" ");
    }

    return (
        <header className="sticky top-0 z-50 border-b border-[#dfb1ee]/30 bg-[linear-gradient(110deg,#09183f_0%,#1c357e_56%,#552d81_100%)] text-white shadow-[0_12px_36px_rgba(13,24,66,0.12)]">
            <nav aria-label="Main navigation" className="mx-auto max-w-7xl px-4 sm:px-6">
                <div className="flex min-h-[76px] items-center justify-between gap-4">
                    {/* Brand: Feed for members, homepage for guests. */}
                    <Link
                        href="/"
                        className="inline-flex shrink-0 items-center gap-2.5 rounded-xl py-2 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ffc3e5]"
                        aria-label="DevConnect"
                    >
                        <span aria-hidden="true" className="flex h-9 w-9 items-center justify-center rounded-xl bg-[linear-gradient(135deg,#7fc8ff_0%,#e4a9ff_48%,#ffaed8_100%)] text-lg font-black text-[#111c49] shadow-[0_0_22px_rgba(255,164,215,0.28)]">
                            D
                        </span>
                        <span className="text-xl font-black tracking-tight text-[#ffd0ec] sm:text-2xl">
                            Dev<span className="text-[#b5d7ff]">Connect</span>
                        </span>
                    </Link>

                    {/* Desktop navigation */}
                    <ul className="hidden items-center gap-1 xl:flex">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={linkStyles(link.href)}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    {/* Desktop account area */}
                    <div className="hidden shrink-0 items-center gap-3 xl:flex">
                        {loading ? (
                            <span role="status" className="text-sm text-[#ccd7f6]">
                                Checking session...
                            </span>
                        ) : user ? (
                            <>
                                <span className="max-w-36 truncate text-sm font-semibold text-[#ffd0ec]" title={user.username}>
                                    @{user.username}
                                </span>
                                <Link
                                    href="/logout"
                                    className="inline-flex min-h-10 items-center justify-center rounded-xl border border-[#e5b6df]/55 px-4 py-2 text-sm font-semibold text-[#ffe0ef] transition hover:border-[#ffc3e5] hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc3e5]"
                                >
                                    Log out
                                </Link>
                            </>
                        ) : (
                            <>
                                <Link
                                    href="/login"
                                    className="rounded-xl px-4 py-2 text-sm font-semibold text-[#e9efff] transition hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc3e5]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    className="inline-flex min-h-10 items-center justify-center rounded-xl bg-[#ffc3e5] px-5 py-2 text-sm font-bold text-[#13234f] shadow-[0_6px_22px_rgba(255,160,219,0.25)] transition hover:bg-[#ffdaef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Sign up
                                </Link>
                            </>
                        )}
                    </div>

                    {/* Compact navigation for phones, tablets, and smaller laptops. */}
                    <button
                        type="button"
                        aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                        aria-expanded={menuOpen}
                        aria-controls="devconnect-mobile-menu"
                        onClick={() => setMenuOpen((open) => !open)}
                        className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-[#b7c8ff]/35 bg-white/10 text-[#ffd1eb] transition hover:bg-white/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc3e5] xl:hidden"
                    >
                        {menuOpen ? (
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
                                <path d="M6 6l12 12M18 6L6 18" />
                            </svg>
                        ) : (
                            <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-6 w-6">
                                <path d="M4 7h16M4 12h16M4 17h16" />
                            </svg>
                        )}
                    </button>
                </div>

                {/* Mobile navigation. Always mounted for reliable aria-controls. */}
                <div id="devconnect-mobile-menu" className={`${menuOpen ? "block" : "hidden"} border-t border-white/15 pb-5 pt-3 xl:hidden`}>
                    <ul className="space-y-1">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    href={link.href}
                                    className={linkStyles(link.href, true)}
                                    aria-current={pathname === link.href ? "page" : undefined}
                                    onClick={() => setMenuOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>

                    <div className="mt-4 border-t border-white/15 pt-4">
                        {loading ? (
                            <p role="status" className="px-4 text-sm text-[#ccd7f6]">Checking session...</p>
                        ) : user ? (
                            <div className="flex flex-col gap-3 px-2">
                                <p className="px-2 text-sm font-semibold text-[#ffd0ec]">Signed in as @{user.username}</p>
                                <Link
                                    href="/logout"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-xl border border-[#e5b6df]/55 px-4 py-3 text-center text-sm font-semibold text-[#ffe0ef] transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc3e5]"
                                >
                                    Log out
                                </Link>
                            </div>
                        ) : (
                            <div className="grid grid-cols-2 gap-3 px-2">
                                <Link
                                    href="/login"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-xl border border-[#e5b6df]/55 px-3 py-3 text-center text-sm font-semibold text-white transition hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ffc3e5]"
                                >
                                    Log in
                                </Link>
                                <Link
                                    href="/register"
                                    onClick={() => setMenuOpen(false)}
                                    className="rounded-xl bg-[#ffc3e5] px-3 py-3 text-center text-sm font-bold text-[#13234f] transition hover:bg-[#ffdaef] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
                                >
                                    Sign up
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </nav>
            <div aria-hidden="true" className="h-[3px] bg-[linear-gradient(90deg,#83baff_0%,#ffaad8_48%,#a7a5ff_100%)]" />
        </header>
    );
}
