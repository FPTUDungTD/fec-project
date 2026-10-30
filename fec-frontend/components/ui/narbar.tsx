"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Menu, X, LogIn, UserPlus } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import "./narbar.css";

export default function Narbar() {
  const [isApplyOpen] = useState<boolean>(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const { t } = useLanguage();

  return (
    <header className="Header">
      <div className="Header-container">
        <Link href="/" className="Header-left" onClick={() => setMobileMenuOpen(false)}>
          <div className="Header-logo-badge">FEC</div>
          <div className="Header-text">
            <h1>FEC</h1>
            <p>{t.navbar.logoSub}</p>
          </div>
        </Link>

        {/* Desktop Actions */}
        <div className="Header-right desktop-only">
          <LanguageSwitcher theme="light" />

          {isApplyOpen ? (
            <Link href="/apply" className="Button-apply">
              {t.navbar.applyNow}
            </Link>
          ) : (
            <span
              className="Button-apply-disabled"
              title={t.navbar.applyTooltip}
            >
              {t.navbar.applyClosed}
            </span>
          )}

          <Link href="/login" className="Button-login">
            <LogIn size={15} strokeWidth={2.2} />
            <span>{t.navbar.login}</span>
          </Link>
          <Link href="/register" className="Button-signin">
            <UserPlus size={15} strokeWidth={2.2} />
            <span>{t.navbar.signup}</span>
          </Link>
        </div>

        {/* Mobile controls: Lang switcher + Hamburger toggle */}
        <div className="Header-mobile-controls">
          <LanguageSwitcher theme="light" showText={false} />
          <button
            type="button"
            className="mobile-hamburger-btn"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Đóng menu" : "Mở menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={22} strokeWidth={2.2} /> : <Menu size={22} strokeWidth={2.2} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-menu-drawer">
          <div className="mobile-menu-links">
            <Link href="/" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t.subnav.home}
            </Link>
            <Link href="/event" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t.subnav.event}
            </Link>
            <Link href="/activity" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t.subnav.activity}
            </Link>
            <Link href="/material" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t.subnav.material}
            </Link>
            <Link href="/about" className="mobile-nav-link" onClick={() => setMobileMenuOpen(false)}>
              {t.subnav.about}
            </Link>
          </div>

          <div className="mobile-menu-auth">
            <Link
              href="/login"
              className="mobile-auth-btn login-btn-subtle"
              onClick={() => setMobileMenuOpen(false)}
            >
              <LogIn size={16} strokeWidth={2.2} />
              <span>{t.navbar.login}</span>
            </Link>
            <Link
              href="/register"
              className="mobile-auth-btn signup-btn-primary"
              onClick={() => setMobileMenuOpen(false)}
            >
              <UserPlus size={16} strokeWidth={2.2} />
              <span>{t.navbar.signup}</span>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}

export { Narbar as Navbar };
