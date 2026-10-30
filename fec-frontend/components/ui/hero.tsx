"use client";

import Link from "next/link";
import SubNav from "./subnav";
import { useLanguage } from "@/context/LanguageContext";
import { ArrowRight, Compass } from "lucide-react";
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
            <span>{t.hero.joinNow}</span>
            <ArrowRight size={18} strokeWidth={2.2} />
          </Link>
          <Link href="/about" className="btn-secondary">
            <Compass size={18} strokeWidth={2.2} />
            <span>{t.hero.discoverMore}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
