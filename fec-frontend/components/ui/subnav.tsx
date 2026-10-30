"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLanguage } from "@/context/LanguageContext";
import "./subnav.css";

export default function SubNav() {
  const pathname = usePathname();
  const { t } = useLanguage();

  const navItems = [
    { name: t.subnav.home, href: "/" },
    { name: t.subnav.event, href: "/event" },
    { name: t.subnav.activity, href: "/activity" },
    { name: t.subnav.material, href: "/material" },
    { name: t.subnav.about, href: "/about" },
  ];

  return (
    <nav className="Sub-nav" aria-label="Sub navigation">
      <div className="Sub-nav-container">
        {navItems.map((item) => {
          const isActive =
            item.href === "/"
              ? pathname === "/" || pathname === "/home"
              : pathname.startsWith(item.href);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`Sub-nav-item ${isActive ? "active" : ""}`}
            >
              {item.name}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
