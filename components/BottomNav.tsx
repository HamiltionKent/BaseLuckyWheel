"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  { href: "/", label: "Spin" },
  { href: "/points", label: "Points" },
  { href: "/about", label: "About" }
] as const;

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="bottom-nav" aria-label="Bottom navigation">
      {LINKS.map((link) => (
        <Link
          className={`nav-item ${pathname === link.href ? "is-active" : ""}`}
          href={link.href}
          key={link.href}
        >
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
