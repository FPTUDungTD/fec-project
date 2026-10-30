"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import {
  Search,
  Layers,
  PenTool,
  BookOpen,
  Target,
  Mic,
  FileText,
  Download,
  FolderOpen,
} from "lucide-react";
import "./material.css";

export default function Material() {
  const [activeCategory, setActiveCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const { t } = useLanguage();

  const filteredMaterials = t.material.materials.filter((item) => {
    const matchesCategory =
      activeCategory === "all" || item.category === activeCategory;
    const matchesSearch =
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  return (
    <section className="material-page">
      <div className="material-header">
        <span className="material-badge">{t.material.badge}</span>
        <h1 className="material-title">
          {t.material.title} <span className="highlight-text">{t.material.titleHighlight}</span>
        </h1>
        <p className="material-subtitle">{t.material.subtitle}</p>

        {/* Ô tìm kiếm tài liệu */}
        <div className="material-search-box">
          <Search size={18} className="search-lucide-icon" strokeWidth={2.2} />
          <input
            type="text"
            placeholder={t.material.searchPlaceholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="material-search-input"
          />
        </div>

        {/* Bộ lọc danh mục */}
        <div className="material-categories">
          <button
            type="button"
            className={`cat-btn ${activeCategory === "all" ? "active" : ""}`}
            onClick={() => setActiveCategory("all")}
          >
            <Layers size={14} strokeWidth={2} />
            <span>{t.material.allCat} ({t.material.materials.length})</span>
          </button>
          <button
            type="button"
            className={`cat-btn ${activeCategory === "grammar" ? "active" : ""}`}
            onClick={() => setActiveCategory("grammar")}
          >
            <PenTool size={14} strokeWidth={2} />
            <span>{t.material.grammarCat.replace(/^.*?\s+/, "")}</span>
          </button>
          <button
            type="button"
            className={`cat-btn ${activeCategory === "vocab" ? "active" : ""}`}
            onClick={() => setActiveCategory("vocab")}
          >
            <BookOpen size={14} strokeWidth={2} />
            <span>{t.material.vocabCat.replace(/^.*?\s+/, "")}</span>
          </button>
          <button
            type="button"
            className={`cat-btn ${activeCategory === "ielts" ? "active" : ""}`}
            onClick={() => setActiveCategory("ielts")}
          >
            <Target size={14} strokeWidth={2} />
            <span>{t.material.ieltsCat.replace(/^.*?\s+/, "")}</span>
          </button>
          <button
            type="button"
            className={`cat-btn ${activeCategory === "speaking" ? "active" : ""}`}
            onClick={() => setActiveCategory("speaking")}
          >
            <Mic size={14} strokeWidth={2} />
            <span>{t.material.speakingCat.replace(/^.*?\s+/, "")}</span>
          </button>
        </div>
      </div>

      <div className="material-container">
        {filteredMaterials.length === 0 ? (
          <div className="material-empty">
            <FolderOpen size={48} className="empty-lucide-icon" strokeWidth={1.5} />
            <h3>{t.material.emptyTitle}</h3>
            <p>{t.material.emptyDesc}</p>
          </div>
        ) : (
          <div className="material-grid">
            {filteredMaterials.map((item) => (
              <article key={item.id} className="material-card">
                <div className="mat-top">
                  <span className={`format-badge format-${item.format.toLowerCase()}`}>
                    {item.format}
                  </span>
                  <span className="level-badge">{item.level}</span>
                </div>

                <h2 className="mat-card-title">{item.title}</h2>
                <p className="mat-card-desc">{item.description}</p>

                <div className="mat-tags">
                  {item.tags.map((tag, idx) => (
                    <span key={idx} className="tag-chip">
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="mat-meta">
                  <span className="mat-meta-item">
                    <FileText size={14} strokeWidth={2} />
                    <span>{item.size}</span>
                  </span>
                  <span className="mat-meta-item">
                    <Download size={14} strokeWidth={2} />
                    <span>{item.downloads.toLocaleString()} {t.material.downloadsText}</span>
                  </span>
                </div>

                <div className="mat-action">
                  <button
                    type="button"
                    className="btn-download"
                    onClick={() => alert(`Downloading: ${item.title}`)}
                  >
                    <span>{t.material.downloadNow}</span>
                    <Download size={15} strokeWidth={2.2} />
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
