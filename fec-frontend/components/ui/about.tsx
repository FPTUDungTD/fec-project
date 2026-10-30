"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/context/LanguageContext";
import {
  HeartHandshake,
  Smile,
  Lightbulb,
  BookOpen,
  Globe,
  Sparkles,
  Camera,
  Check,
  ArrowRight,
} from "lucide-react";
import "./about.css";

export default function About() {
  const { t } = useLanguage();

  const getCoreValueIcon = (idx: number) => {
    switch (idx) {
      case 0:
        return <HeartHandshake size={32} className="value-lucide-icon" strokeWidth={2} />;
      case 1:
        return <Smile size={32} className="value-lucide-icon" strokeWidth={2} />;
      case 2:
      default:
        return <Lightbulb size={32} className="value-lucide-icon" strokeWidth={2} />;
    }
  };

  const getDeptIcon = (id: string) => {
    switch (id) {
      case "academic":
        return <BookOpen size={16} strokeWidth={2.2} />;
      case "external":
        return <Globe size={16} strokeWidth={2.2} />;
      case "content":
        return <Sparkles size={16} strokeWidth={2.2} />;
      case "media":
        return <Camera size={16} strokeWidth={2.2} />;
      default:
        return <Sparkles size={16} strokeWidth={2.2} />;
    }
  };

  return (
    <section className="about-page">
      {/* Header Banner */}
      <div className="about-header">
        <span className="about-badge">{t.about.badge}</span>
        <h1 className="about-title">
          {t.about.title} <br />
          <span className="highlight-text">{t.about.titleHighlight}</span>
        </h1>
        <p className="about-subtitle">{t.about.subtitle}</p>
      </div>

      <div className="about-container">
        {/* Khối giới thiệu câu chuyện FEC */}
        <div className="about-story-card">
          <div className="story-content">
            <h2 className="section-title">{t.about.storyTitle}</h2>
            <p className="story-paragraph">{t.about.storyP1}</p>
            <p className="story-paragraph">{t.about.storyP2}</p>
          </div>
          <div className="story-stats">
            <div className="mini-stat">
              <span className="mini-num">10+</span>
              <span className="mini-label">{t.about.statYears}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-num">500+</span>
              <span className="mini-label">{t.about.statMembers}</span>
            </div>
            <div className="mini-stat">
              <span className="mini-num">100+</span>
              <span className="mini-label">{t.about.statEvents}</span>
            </div>
          </div>
        </div>

        {/* 3 Giá trị cốt lõi */}
        <div className="about-section-block">
          <div className="block-header">
            <h2 className="section-title">{t.about.coreValuesTitle}</h2>
            <p className="section-desc">{t.about.coreValuesDesc}</p>
          </div>

          <div className="values-grid">
            {t.about.values.map((val, idx) => (
              <div key={idx} className="value-card">
                <div className="value-icon-box">{getCoreValueIcon(idx)}</div>
                <h3 className="value-title">{val.title}</h3>
                <p className="value-desc">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* 4 Ban Chuyên Trách kèm hình ảnh thực tế */}
        <div className="about-section-block">
          <div className="block-header">
            <span className="block-badge">Our Structure</span>
            <h2 className="section-title">{t.about.departmentsTitle}</h2>
            <p className="section-desc">{t.about.departmentsDesc}</p>
          </div>

          <div className="departments-showcase-grid">
            {t.about.departments.map((dept) => (
              <article key={dept.id} className="dept-showcase-card">
                {/* Khung ảnh thực tế của ban */}
                <div className="dept-image-frame">
                  <Image
                    src={dept.image}
                    alt={dept.name}
                    width={600}
                    height={380}
                    className="dept-real-photo"
                    priority
                  />
                  <div className="dept-image-overlay" />
                  <div className="dept-floating-badge">
                    <span className="dept-badge-icon">{getDeptIcon(dept.id)}</span>
                    <span className="dept-badge-text">{dept.name}</span>
                  </div>
                </div>

                {/* Nội dung thông tin ban */}
                <div className="dept-content-body">
                  <h3 className="dept-headline">{dept.name}</h3>
                  <p className="dept-tagline-text">{dept.tagline}</p>
                  <p className="dept-desc-text">{dept.desc}</p>

                  <div className="dept-key-roles">
                    <h4 className="roles-heading">Nhiệm vụ & Điểm nhấn chính:</h4>
                    <ul className="roles-list">
                      {dept.highlights.map((item, i) => (
                        <li key={i}>
                          <span className="bullet-check">
                            <Check size={14} strokeWidth={2.5} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="dept-card-footer">
                    <Link href="/apply" className="dept-apply-link">
                      <span>Ứng tuyển vào {dept.name.split(" (")[0]}</span>
                      <ArrowRight size={15} strokeWidth={2.2} />
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>

        {/* CTA Kêu gọi gia nhập */}
        <div className="about-cta-card">
          <h2 className="cta-title">{t.about.ctaTitle}</h2>
          <p className="cta-desc">{t.about.ctaDesc}</p>
          <div className="cta-actions">
            <Link href="/apply" className="btn-cta-primary">
              {t.about.ctaApply}
            </Link>
            <Link href="/event" className="btn-cta-secondary">
              {t.about.ctaEvents}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
