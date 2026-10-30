"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import "./LanguageSwitcher.css";

// SVG Quốc kỳ Việt Nam chuẩn tỷ lệ
export function VietnamFlag({ className = "flag-icon" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 400"
      className={className}
      aria-label="Cờ Việt Nam"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="600" height="400" fill="#da251d" rx="30" />
      <polygon
        points="300,80 337.08,194.16 457.02,194.16 360.03,264.67 397.08,378.84 300,308.33 202.92,378.84 239.97,264.67 142.98,194.16 262.92,194.16"
        fill="#ffde00"
      />
    </svg>
  );
}

// SVG Quốc kỳ Vương quốc Anh (Union Jack) chuẩn tỷ lệ
export function UKFlag({ className = "flag-icon" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 60 30"
      className={className}
      aria-label="Cờ Vương quốc Anh"
      xmlns="http://www.w3.org/2000/svg"
    >
      <clipPath id="uk-clip">
        <rect width="60" height="30" rx="3" />
      </clipPath>
      <g clipPath="url(#uk-clip)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#ffffff" strokeWidth="6" />
        <path
          d="M0,0 L60,30 M60,0 L0,30"
          stroke="#c8102e"
          strokeWidth="4"
        />
        <path d="M30,0 v30 M0,15 h60" stroke="#ffffff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#c8102e" strokeWidth="6" />
      </g>
    </svg>
  );
}

interface LanguageSwitcherProps {
  theme?: "light" | "dark";
  showText?: boolean;
}

export default function LanguageSwitcher({
  theme = "light",
  showText = true,
}: LanguageSwitcherProps) {
  const { locale, setLocale } = useLanguage();

  return (
    <div
      className={`lang-switch-capsule theme-${theme}`}
      role="group"
      aria-label="Chọn ngôn ngữ / Language selector"
    >
      {/* Nút Tiếng Việt */}
      <button
        type="button"
        className={`lang-switch-btn ${locale === "vi" ? "active" : ""}`}
        onClick={() => setLocale("vi")}
        title="Tiếng Việt (Vietnamese)"
        aria-pressed={locale === "vi"}
      >
        <span className="flag-wrapper">
          <VietnamFlag className="flag-svg" />
        </span>
        {showText && <span className="lang-label">VI</span>}
      </button>

      <span className="lang-divider" aria-hidden="true" />

      {/* Nút Tiếng Anh */}
      <button
        type="button"
        className={`lang-switch-btn ${locale === "en" ? "active" : ""}`}
        onClick={() => setLocale("en")}
        title="English (Tiếng Anh)"
        aria-pressed={locale === "en"}
      >
        <span className="flag-wrapper">
          <UKFlag className="flag-svg" />
        </span>
        {showText && <span className="lang-label">EN</span>}
      </button>
    </div>
  );
}
