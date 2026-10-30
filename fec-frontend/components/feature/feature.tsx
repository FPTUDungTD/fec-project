"use client";

import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Calendar, BookOpen, MessageSquareQuote, ArrowRight } from "lucide-react";
import "./feature.css";

export default function Features() {
  const { t } = useLanguage();

  const featuresData = [
    {
      icon: <Calendar size={26} className="feature-lucide-icon" strokeWidth={2.2} />,
      title: t.features.eventTitle,
      desc: t.features.eventDesc,
      link: "/event",
      actionText: t.features.eventAction,
    },
    {
      icon: <BookOpen size={26} className="feature-lucide-icon" strokeWidth={2.2} />,
      title: t.features.materialTitle,
      desc: t.features.materialDesc,
      link: "/material",
      actionText: t.features.materialAction,
    },
    {
      icon: <MessageSquareQuote size={26} className="feature-lucide-icon" strokeWidth={2.2} />,
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
              {item.icon}
            </div>
            <h3 className="feature-item-title">{item.title}</h3>
            <p className="feature-item-desc">{item.desc}</p>
            <Link href={item.link} className="feature-action-btn">
              <span>{item.actionText}</span>
              <ArrowRight size={16} strokeWidth={2.2} />
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}
