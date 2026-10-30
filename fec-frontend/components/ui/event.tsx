"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import { Users, Mic, Clock, MapPin, ArrowRight } from "lucide-react";
import "./event.css";

export default function Event() {
  const [activeTab, setActiveTab] = useState<"upcoming" | "past">("upcoming");
  const { t } = useLanguage();

  const filteredEvents = t.event.events.filter((e) => e.status === activeTab);
  const upcomingCount = t.event.events.filter((e) => e.status === "upcoming").length;
  const pastCount = t.event.events.filter((e) => e.status === "past").length;

  return (
    <section className="event-page">
      <div className="event-header">
        <span className="event-badge">{t.event.badge}</span>
        <h1 className="event-title">
          {t.event.title} <span className="highlight-text">{t.event.titleHighlight}</span>
        </h1>
        <p className="event-subtitle">{t.event.subtitle}</p>

        {/* Tab chuyển đổi Sự kiện sắp tới / Đã diễn ra */}
        <div className="event-tabs">
          <button
            type="button"
            className={`tab-btn ${activeTab === "upcoming" ? "active" : ""}`}
            onClick={() => setActiveTab("upcoming")}
          >
            {t.event.upcomingTab} ({upcomingCount})
          </button>
          <button
            type="button"
            className={`tab-btn ${activeTab === "past" ? "active" : ""}`}
            onClick={() => setActiveTab("past")}
          >
            {t.event.pastTab} ({pastCount})
          </button>
        </div>
      </div>

      <div className="event-container">
        <div className="event-grid">
          {filteredEvents.map((evt) => (
            <article key={evt.id} className="event-card">
              <div className="event-date-box">
                <span className="event-day">{evt.day}</span>
                <span className="event-month">{evt.month}</span>
                <span className="event-year">{evt.year}</span>
              </div>

              <div className="event-body">
                <div className="event-tags">
                  <span className={`event-category tag-${evt.category.toLowerCase()}`}>
                    {evt.category}
                  </span>
                  <span className="event-attendees">
                    <Users size={14} strokeWidth={2} />
                    <span>{evt.attendees}</span>
                  </span>
                </div>

                <h2 className="event-name">{evt.title}</h2>

                {evt.speaker && (
                  <p className="event-speaker">
                    <Mic size={15} strokeWidth={2.2} className="speaker-icon" />
                    <strong>{evt.speaker}</strong>
                  </p>
                )}

                <p className="event-desc">{evt.description}</p>

                <div className="event-info-row">
                  <div className="info-item">
                    <Clock size={15} strokeWidth={2} className="info-lucide-icon" />
                    <span>{evt.time}</span>
                  </div>
                  <div className="info-item">
                    <MapPin size={15} strokeWidth={2} className="info-lucide-icon" />
                    <span>{evt.location}</span>
                  </div>
                </div>

                <div className="event-footer">
                  {evt.status === "upcoming" ? (
                    <Link href="/apply" className="event-action-primary">
                      <span>{t.event.registerNow}</span>
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </Link>
                  ) : (
                    <span className="event-action-secondary">
                      {t.event.eventEnded}
                    </span>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
