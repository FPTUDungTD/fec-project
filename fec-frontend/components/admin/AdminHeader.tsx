"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import "./AdminHeader.css";

export default function AdminHeader() {
  const { t } = useLanguage();

  return (
    <header className="admin-header">
      <div className="admin-header-container">
        {/* Logo & Tên hệ thống */}
        <div className="admin-brand">
          <Link href="/admin" className="admin-logo-link">
            <div className="admin-logo-container">
              <span className="admin-logo-badge">FEC</span>
              <div className="admin-logo-glow" aria-hidden="true" />
            </div>
            <div className="admin-brand-text">
              <div className="brand-title-row">
                <span className="admin-brand-title">FEC Console</span>
                <span className="admin-edition-tag">PRO</span>
              </div>
              <div className="admin-status-wrapper">
                <span className="pulse-dot" />
                <span className="admin-brand-status">Security Shield Active</span>
              </div>
            </div>
          </Link>
        </div>

        {/* Khối công cụ bên phải */}
        <div className="admin-header-actions">
          {/* Bộ chọn ngôn ngữ cờ chuẩn */}
          <LanguageSwitcher theme="dark" />

          {/* User Profile Pill sang trọng */}
          <div className="admin-profile-pill">
            <div className="admin-avatar-wrapper">
              <div className="admin-avatar">AD</div>
              <span className="admin-avatar-status" />
            </div>
            <div className="admin-user-info">
              <span className="admin-user-name">Nguyễn Văn Hoàng</span>
              <span className="admin-user-role">Super Admin & Lead</span>
            </div>
          </div>

          {/* Nút thoát về Website */}
          <Link href="/" className="btn-back-website" title={t.admin.backToHome}>
            <span className="back-icon">←</span>
            <span>{t.admin.backToHome.replace("← ", "")}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
