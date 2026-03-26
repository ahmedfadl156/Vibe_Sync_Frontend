"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { logout } from "@/services/room";

const NAV_LINKS = [
  { label: "Rooms", href: "/rooms" },
  { label: "Library", href: "/library" },
];

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function Navbar() {
  const { user, isAuthenticated, isLoading, refetch } = useAuth();
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const initial = user?.displayName?.[0]?.toUpperCase() ?? "";

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      await logout();
      await refetch();
      router.push("/");
    } catch {
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50">
      {/* Glassmorphism bar */}
      <div className="mx-4 mt-4 rounded-2xl border border-white/8 bg-[#0D0906]/70 backdrop-blur-xl shadow-[0_4px_40px_rgba(0,0,0,0.4)]">
        <nav className="flex items-center justify-between px-6 py-3">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="VibeSync home"
          >
            {/* Waveform icon */}
            <svg
              className="w-7 h-7"
              viewBox="0 0 28 28"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="10" width="3" height="8" rx="1.5" fill="#D97706" />
              <rect x="7" y="5" width="3" height="18" rx="1.5" fill="#D97706" opacity="0.85" />
              <rect x="12" y="8" width="3" height="12" rx="1.5" fill="#D97706" opacity="0.7" />
              <rect x="17" y="3" width="3" height="22" rx="1.5" fill="#D97706" opacity="0.9" />
              <rect x="22" y="9" width="3" height="10" rx="1.5" fill="#D97706" opacity="0.6" />
            </svg>
            <span className="text-lg font-bold tracking-tight">
              <span className="text-[#D97706]">Vibe</span>
              <span className="text-[#FEF3C7]">Sync</span>
            </span>
          </Link>

          {/* Desktop nav links */}
          <ul className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      relative px-4 py-2 rounded-xl text-sm font-medium tracking-wide transition-colors duration-200
                      ${active
                        ? "text-[#D97706] bg-[#D97706]/10"
                        : "text-[#A8956A] hover:text-[#FEF3C7] hover:bg-white/5"
                      }
                    `}
                  >
                    {label}
                    {active && (
                      <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-[#D97706]" />
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* Right side: auth */}
          <div className="hidden md:flex items-center gap-3">
            {isLoading ? (
              <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
            ) : isAuthenticated && user ? (
              /* Authenticated state */
              <div className="flex items-center gap-3">
                <span className="text-sm text-[#A8956A] font-medium">
                  {user.displayName}
                </span>
                <div
                  className="
                    w-9 h-9 rounded-full flex items-center justify-center
                    bg-linear-to-br from-[#D97706] to-[#C2410C]
                    text-[#1C0A00] text-sm font-bold
                    ring-2 ring-[#D97706]/30
                    shadow-[0_0_12px_rgba(217,119,6,0.35)]
                    cursor-default select-none
                  "
                  title={user.displayName}
                >
                  {initial}
                </div>
                {/* Logout button */}
                <button
                  onClick={handleLogout}
                  disabled={isLoggingOut}
                  title="Logout"
                  className="
                    flex items-center justify-center w-9 h-9 rounded-full
                    border border-white/10 bg-white/5
                    text-[#A8956A] hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/8
                    transition-all duration-200 active:scale-95
                    disabled:opacity-50 disabled:cursor-not-allowed
                  "
                >
                  {isLoggingOut ? (
                    <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                  )}
                </button>
              </div>
            ) : (
              /* Unauthenticated state */
              <a
                href={`${API_URL}/auth/login`}
                className="
                  flex items-center gap-2 px-5 py-2 rounded-full
                  bg-[#D97706] text-[#1C0A00]
                  text-sm font-bold tracking-wide
                  hover:bg-[#F59E0B] active:scale-95
                  transition-all duration-200
                  shadow-[0_4px_20px_rgba(217,119,6,0.3)]
                "
              >
                {/* Spotify-ish icon */}
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.224-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.612-1.156a.935.935 0 11-.543-1.79c3.532-1.073 9.404-.866 13.115 1.337a.936.936 0 01-1.028 1.556l.068.053z" />
                </svg>
                Login with Spotify
              </a>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] rounded-lg hover:bg-white/5 transition-colors"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
          >
            <span
              className={`block w-5 h-[2px] bg-[#FEF3C7] rounded-full transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`}
            />
            <span
              className={`block w-5 h-[2px] bg-[#FEF3C7] rounded-full transition-all duration-300 ${menuOpen ? "opacity-0 scale-x-0" : ""}`}
            />
            <span
              className={`block w-5 h-[2px] bg-[#FEF3C7] rounded-full transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`}
            />
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`
            md:hidden overflow-hidden transition-all duration-300 ease-in-out
            ${menuOpen ? "max-h-72 opacity-100" : "max-h-0 opacity-0"}
          `}
        >
          <div className="px-4 pb-4 pt-1 border-t border-white/8 flex flex-col gap-1">
            {NAV_LINKS.map(({ label, href }) => {
              const active = pathname === href;
              return (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    px-4 py-3 rounded-xl text-sm font-medium tracking-wide transition-colors
                    ${active
                      ? "text-[#D97706] bg-[#D97706]/10"
                      : "text-[#A8956A] hover:text-[#FEF3C7] hover:bg-white/5"
                    }
                  `}
                >
                  {label}
                </Link>
              );
            })}

            <div className="mt-2 pt-3 border-t border-white/8">
              {isLoading ? (
                <div className="flex items-center gap-3 px-4 py-2">
                  <div className="w-8 h-8 rounded-full bg-white/10 animate-pulse" />
                  <div className="h-4 w-24 rounded-md bg-white/10 animate-pulse" />
                </div>
              ) : isAuthenticated && user ? (
                <div className="flex items-center gap-3 px-4 py-2">
                  <div
                    className="
                      w-9 h-9 rounded-full flex items-center justify-center shrink-0
                      bg-linear-to-br from-[#D97706] to-[#C2410C]
                      text-[#1C0A00] text-sm font-bold
                      ring-2 ring-[#D97706]/30
                    "
                  >
                    {initial}
                </div>
                  <div className="flex flex-col flex-1">
                    <span className="text-sm text-[#FEF3C7] font-semibold leading-tight">
                      {user.displayName}
                    </span>
                    <span className="text-xs text-[#A8956A] leading-tight">
                      {String(user.email)}
                    </span>
                  </div>
                  {/* Mobile logout */}
                  <button
                    onClick={() => { setMenuOpen(false); handleLogout(); }}
                    disabled={isLoggingOut}
                    title="Logout"
                    className="
                      flex items-center justify-center w-9 h-9 rounded-full shrink-0
                      border border-white/10 bg-white/5
                      text-[#A8956A] hover:text-red-400 hover:border-red-400/30 hover:bg-red-500/8
                      transition-all duration-200 active:scale-95
                      disabled:opacity-50 disabled:cursor-not-allowed
                    "
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h6a2 2 0 012 2v1" />
                    </svg>
                  </button>
                </div>
              ) : (
                <a
                  href={`${API_URL}/auth/login`}
                  className="
                    mx-4 flex items-center justify-center gap-2 px-5 py-3 rounded-full
                    bg-[#D97706] text-[#1C0A00]
                    text-sm font-bold tracking-wide
                    hover:bg-[#F59E0B] active:scale-95
                    transition-all duration-200
                  "
                >
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm4.586 14.424a.622.622 0 01-.857.207c-2.348-1.435-5.304-1.76-8.785-.964a.623.623 0 01-.277-1.215c3.809-.87 7.076-.496 9.712 1.115a.623.623 0 01.207.857zm1.224-2.722a.78.78 0 01-1.072.257c-2.687-1.652-6.785-2.131-9.965-1.166a.78.78 0 01-.973-.519.781.781 0 01.52-.973c3.632-1.102 8.147-.568 11.233 1.329a.78.78 0 01.257 1.072zm.105-2.835c-3.223-1.914-8.54-2.09-11.612-1.156a.935.935 0 11-.543-1.79c3.532-1.073 9.404-.866 13.115 1.337a.936.936 0 01-1.028 1.556l.068.053z" />
                  </svg>
                  Login with Spotify
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
