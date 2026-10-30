"use client";

import { useLanguage } from "@/context/LanguageContext";
import "./highlight.css";

export default function Highlights() {
  const { t } = useLanguage();

  return (
    <section className="stats-section">
      <div className="stats-container">
        <div className="stats-header">
          <span className="stats-badge">{t.highlights.badge}</span>
          <h2 className="stats-title">
            {t.highlights.title}{" "}
            <span className="text-red">{t.highlights.titleHighlight}</span>
          </h2>
          <p className="stats-subtitle">{t.highlights.subtitle}</p>
        </div>

        <div className="stats-grid">
          {t.highlights.stats.map((item, index) => (
            <div key={index} className="stat-card">
              <div className="stat-number">{item.number}</div>
              <h3 className="stat-label">{item.label}</h3>
              <p className="stat-desc">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
