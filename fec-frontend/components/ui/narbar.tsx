"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "./LanguageSwitcher";
import "./narbar.css";

export default function Narbar() {
  const [isApplyOpen, setIsApplyOpen] = useState<boolean>(false);
  const { t } = useLanguage();

  return (
    <header className="Header">
      <div className="Header-container">
        <Link href="/" className="Header-left">
          <div className="Header-logo-badge">FEC</div>
          <div className="Header-text">
            <h1>FEC</h1>
            <p>{t.navbar.logoSub}</p>
          </div>
        </Link>
        
        <div className="Header-right">
          {/* Bộ chuyển đổi ngôn ngữ Việt / Anh bằng lá cờ chuẩn */}
          <LanguageSwitcher theme="light" />

          {isApplyOpen ? (
            <Link href="/apply" className="Button-apply">
              {t.navbar.applyNow}
            </Link>
          ) : (
            <button
              type="button"
              disabled
              className="Button-apply-disabled"
              title={t.navbar.applyTooltip}
              onClick={() => setIsApplyOpen(!isApplyOpen)}
            >
              {t.navbar.applyClosed}
            </button>
          )}

          <Link href="/login" className="Button-login">
            {t.navbar.login}
          </Link>
          <Link href="/register" className="Button-signin">
            {t.navbar.signup}
          </Link>
        </div>
      </div>
    </header>
  );
}

export { Narbar as Navbar };
