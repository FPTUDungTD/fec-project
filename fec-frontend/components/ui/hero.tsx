"use client";

import Link from "next/link";
import SubNav from "./subnav";
import { useLanguage } from "@/context/LanguageContext";
import "./hero.css";

export default function Hero() {
  const { t } = useLanguage();

  return (
    <section className="hero-section">
      <SubNav />
      
      <div className="hero-content">
        <span className="hero-badge">{t.hero.badge}</span>
        <h1 className="hero-title">
          {t.hero.titlePart1} <br />
          <span className="hero-highlight">
            {t.hero.titleHighlight}
          </span>
          <br />
          {t.hero.titlePart2}
        </h1>
        <p className="hero-desc">
          {t.hero.desc}
        </p>
        <div className="hero-actions">
          <Link href="/apply" className="btn-primary">
            {t.hero.joinNow}
          </Link>
          <Link href="/about" className="btn-secondary">
            {t.hero.discoverMore}
          </Link>
        </div>
      </div>
    </section>
  );
}
