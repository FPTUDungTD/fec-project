"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import "./activity.css";

export default function Activity() {
  const [filter, setFilter] = useState<string>("all");
  const { t } = useLanguage();

  const filteredActivities =
    filter === "all"
      ? t.activity.activities
      : t.activity.activities.filter((act) => act.category === filter);

  return (
    <section className="activity-page">
      {/* Banner đầu trang Activity */}
      <div className="activity-header">
        <span className="activity-badge">{t.activity.badge}</span>
        <h1 className="activity-title">
          {t.activity.title} <span className="highlight-text">{t.activity.titleHighlight}</span>
        </h1>
        <p className="activity-subtitle">{t.activity.subtitle}</p>

        {/* Nút lọc danh mục */}
        <div className="activity-filters">
          <button
            type="button"
            className={`filter-btn ${filter === "all" ? "active" : ""}`}
            onClick={() => setFilter("all")}
          >
            {t.activity.filterAll}
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "regular" ? "active" : ""}`}
            onClick={() => setFilter("regular")}
          >
            {t.activity.filterRegular}
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "academic" ? "active" : ""}`}
            onClick={() => setFilter("academic")}
          >
            {t.activity.filterAcademic}
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "social" ? "active" : ""}`}
            onClick={() => setFilter("social")}
          >
            {t.activity.filterSocial}
          </button>
          <button
            type="button"
            className={`filter-btn ${filter === "contest" ? "active" : ""}`}
            onClick={() => setFilter("contest")}
          >
            {t.activity.filterContest}
          </button>
        </div>
      </div>

      {/* Grid danh sách các hoạt động */}
      <div className="activity-container">
        <div className="activity-grid">
          {filteredActivities.map((item) => (
            <article key={item.id} className="activity-card">
              <div className="card-top">
                <span className="card-icon">{item.icon}</span>
                <span className={`card-badge badge-${item.category}`}>
                  {item.category === "regular" && t.activity.badgeRegular}
                  {item.category === "academic" && t.activity.badgeAcademic}
                  {item.category === "social" && t.activity.badgeSocial}
                  {item.category === "contest" && t.activity.badgeContest}
                </span>
              </div>

              <h2 className="card-title">{item.title}</h2>
              <p className="card-tagline">{item.tagline}</p>
              <p className="card-desc">{item.description}</p>

              <div className="card-meta">
                <div className="meta-row">
                  <span className="meta-icon">⏰</span>
                  <span className="meta-text">{item.schedule}</span>
                </div>
                <div className="meta-row">
                  <span className="meta-icon">📍</span>
                  <span className="meta-text">{item.location}</span>
                </div>
              </div>

              <div className="card-highlights">
                <p className="highlights-title">{t.activity.highlightsTitle}</p>
                <ul>
                  {item.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              </div>

              <div className="card-action">
                <Link href="/apply" className="activity-join-btn">
                  {t.activity.joinBtn} <span>→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
