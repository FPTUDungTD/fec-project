"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/context/LanguageContext";
import "./apply.css";

export default function Apply() {
  const [submitted, setSubmitted] = useState(false);
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    major: "se",
    department: "academic",
    introduction: "",
    englishLevel: "intermediate",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="apply-page">
      <div className="apply-header">
        <span className="apply-badge">{t.apply.badge}</span>
        <h1 className="apply-title">
          {t.apply.title} <span className="highlight-text">{t.apply.titleHighlight}</span>
        </h1>
        <p className="apply-subtitle">{t.apply.subtitle}</p>
      </div>

      <div className="apply-container">
        {/* Lộ trình tuyển dụng */}
        <div className="timeline-card">
          <h2 className="timeline-title">{t.apply.timelineTitle}</h2>
          <div className="timeline-steps">
            <div className="step-item">
              <div className="step-circle active">1</div>
              <div className="step-info">
                <h4>{t.apply.round1Title}</h4>
                <p>{t.apply.round1Desc}</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-circle">2</div>
              <div className="step-info">
                <h4>{t.apply.round2Title}</h4>
                <p>{t.apply.round2Desc}</p>
              </div>
            </div>
            <div className="step-item">
              <div className="step-circle">3</div>
              <div className="step-info">
                <h4>{t.apply.round3Title}</h4>
                <p>{t.apply.round3Desc}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form ứng tuyển hoặc thông báo hoàn tất */}
        <div className="form-card">
          {submitted ? (
            <div className="success-box">
              <div className="success-icon">🎉</div>
              <h2>{t.apply.successTitle}</h2>
              <p>
                {t.apply.successDescP1} <strong>{formData.fullName}</strong>{" "}
                {t.apply.successDescP2} <strong>{formData.email}</strong>{" "}
                {t.apply.successDescP3}
              </p>
              <div className="success-actions">
                <Link href="/" className="btn-return-home">
                  {t.apply.returnHomeBtn}
                </Link>
                <button
                  type="button"
                  className="btn-new-app"
                  onClick={() => setSubmitted(false)}
                >
                  {t.apply.newAppBtn}
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="apply-form">
              <h2 className="form-heading">{t.apply.formHeading}</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="fullName">{t.apply.fullNameLabel}</label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    required
                    placeholder={t.apply.fullNamePlaceholder}
                    value={formData.fullName}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="studentId">{t.apply.studentIdLabel}</label>
                  <input
                    type="text"
                    id="studentId"
                    name="studentId"
                    required
                    placeholder={t.apply.studentIdPlaceholder}
                    value={formData.studentId}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">{t.apply.emailLabel}</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder={t.apply.emailPlaceholder}
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">{t.apply.phoneLabel}</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    required
                    placeholder={t.apply.phonePlaceholder}
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="major">{t.apply.majorLabel}</label>
                  <select
                    id="major"
                    name="major"
                    value={formData.major}
                    onChange={handleChange}
                  >
                    <option value="se">{t.apply.majorOptions.se}</option>
                    <option value="ai">{t.apply.majorOptions.ai}</option>
                    <option value="ia">{t.apply.majorOptions.ia}</option>
                    <option value="ib">{t.apply.majorOptions.ib}</option>
                    <option value="mc">{t.apply.majorOptions.mc}</option>
                    <option value="gd">{t.apply.majorOptions.gd}</option>
                    <option value="other">{t.apply.majorOptions.other}</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="department">{t.apply.deptLabel}</label>
                  <select
                    id="department"
                    name="department"
                    value={formData.department}
                    onChange={handleChange}
                  >
                    <option value="academic">{t.apply.deptOptions.academic}</option>
                    <option value="event">{t.apply.deptOptions.event}</option>
                    <option value="pr">{t.apply.deptOptions.pr}</option>
                    <option value="hr">{t.apply.deptOptions.hr}</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="englishLevel">{t.apply.levelLabel}</label>
                <select
                  id="englishLevel"
                  name="englishLevel"
                  value={formData.englishLevel}
                  onChange={handleChange}
                >
                  <option value="beginner">{t.apply.levelOptions.beginner}</option>
                  <option value="intermediate">{t.apply.levelOptions.intermediate}</option>
                  <option value="advanced">{t.apply.levelOptions.advanced}</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="introduction">{t.apply.introLabel}</label>
                <textarea
                  id="introduction"
                  name="introduction"
                  rows={4}
                  required
                  placeholder={t.apply.introPlaceholder}
                  value={formData.introduction}
                  onChange={handleChange}
                />
              </div>

              <button type="submit" className="btn-submit-apply">
                {t.apply.submitBtn}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
