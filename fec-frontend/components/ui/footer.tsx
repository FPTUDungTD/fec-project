"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { MapPin, Mail } from "lucide-react";
import "./footer.css";

export default function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="Footer">
      <div className="Footer-container">
        {/* KHỐI 1: CỘT THÔNG TIN CHÍNH */}
        <div className="Footer-col">
          <div className="Footer-brand">
            <h3 className="Footer-logo">FEC</h3>
            <span className="Footer-tag">FPT University</span>
          </div>
          <p className="Footer-desc">FPTU English Club</p>
          <p className="Footer-slogan">&ldquo;{t.footer.slogan}&rdquo;</p>
        </div>

        {/* KHỐI 2: ĐIỀU HƯỚNG NHANH */}
        <div className="Footer-col">
          <h4 className="Footer-heading">{t.footer.quickLinks}</h4>
          <ul className="Footer-links">
            <li>
              <Link href="/">{t.footer.home}</Link>
            </li>
            <li>
              <Link href="/about">{t.footer.about}</Link>
            </li>
            <li>
              <Link href="/event">{t.footer.event}</Link>
            </li>
            <li>
              <Link href="/activity">{t.footer.activity}</Link>
            </li>
            <li>
              <Link href="/material">{t.footer.material}</Link>
            </li>
            <li>
              <Link href="/apply">{t.footer.apply}</Link>
            </li>
          </ul>
        </div>

        {/* KHỐI 3: THÔNG TIN LIÊN HỆ */}
        <div className="Footer-col">
          <h4 className="Footer-heading">{t.footer.contact}</h4>
          <p className="Footer-contact-item">
            <span className="contact-icon">
              <MapPin size={16} strokeWidth={2} />
            </span>
            <span>{t.footer.address}</span>
          </p>
          <p className="Footer-contact-item">
            <span className="contact-icon">
              <Mail size={16} strokeWidth={2} />
            </span>
            <span>englishclub.fu@gmail.com</span>
          </p>

          <div className="Footer-social-list">
            <a
              href="https://www.facebook.com/englishclub.fu"
              target="_blank"
              rel="noopener noreferrer"
              className="Footer-social-pill"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/englishclub.fu/"
              target="_blank"
              rel="noopener noreferrer"
              className="Footer-social-pill"
            >
              Instagram
            </a>
            <a
              href="https://www.tiktok.com/@englishclub.fu?lang=vi-VN"
              target="_blank"
              rel="noopener noreferrer"
              className="Footer-social-pill"
            >
              TikTok
            </a>
          </div>
        </div>
      </div>

      {/* DÒNG COPYRIGHT DƯỚI CÙNG */}
      <div className="Footer-bottom">
        <p>© {new Date().getFullYear()} {t.footer.rights}</p>
      </div>
    </footer>
  );
}
