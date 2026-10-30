"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import "./feature.css";

export default function Features() {
  const { t } = useLanguage();

  const featuresData = [
    {
      icon: "📅",
      title: t.features.eventTitle,
      desc: t.features.eventDesc,
      link: "/event",
      actionText: t.features.eventAction,
    },
    {
      icon: "📚",
      title: t.features.materialTitle,
      desc: t.features.materialDesc,
      link: "/material",
      actionText: t.features.materialAction,
    },
    {
      icon: "🗣️",
      title: t.features.activityTitle,
      desc: t.features.activityDesc,
      link: "/activity",
      actionText: t.features.activityAction,
    },
  ];

  return (
    <section className="features-section">
      <div className="features-header">
        <h2 className="features-title">{t.features.title}</h2>
      </div>

      <div className="features-grid">
        {featuresData.map((item, index) => (
          <div key={index} className="feature-card">
            <div className="feature-icon-wrapper">
              <span className="feature-icon">{item.icon}</span>
            </div>
            <h3 className="feature-item-title">{item.title}</h3>
            <p className="feature-item-desc">{item.desc}</p>
            <Link href={item.link} className="feature-action-btn">
              {item.actionText} <span>→</span>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
