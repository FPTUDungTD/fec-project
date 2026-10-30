"use client";

import React, { useState } from "react";
import { useLanguage } from "@/context/LanguageContext";
import "./RoleManagement.css";

// 1. Types cho Quản lý Thành viên
interface MemberItem {
  id: number;
  fullName: string;
  studentId: string;
  email: string;
  phone: string;
  department: "academic" | "event" | "pr" | "hr" | "board";
  clubRole: string;
  status: "active" | "pending" | "inactive";
  joinDate: string;
}

// 2. Types cho Quản lý Sự kiện
interface EventAdminItem {
  id: string;
  title: string;
  category: "Workshop" | "Talkshow" | "Festival" | "Competition";
  date: string;
  time: string;
  location: string;
  speaker: string;
  registeredCount: number;
  maxSeats: number;
  status: "open" | "closed" | "completed";
}

// 3. Types cho Quản lý Hoạt động
interface ActivityAdminItem {
  id: string;
  name: string;
  icon: string;
  schedule: string;
  location: string;
  leadDept: string;
  facilitator: string;
  currentTopic: string;
  attendanceAvg: string;
}

const initialMembers: MemberItem[] = [
  {
    id: 1,
    fullName: "Nguyễn Văn Hoàng",
    studentId: "HE180001",
    email: "hoangnv@fpt.edu.vn",
    phone: "0912 345 678",
    department: "board",
    clubRole: "Chủ Nhiệm CLB (President)",
    status: "active",
    joinDate: "09/2023",
  },
  {
    id: 2,
    fullName: "Trần Phương Lan",
    studentId: "HE180234",
    email: "lanpt@fpt.edu.vn",
    phone: "0987 654 321",
    department: "board",
    clubRole: "Phó Chủ Nhiệm (Vice President)",
    status: "active",
    joinDate: "09/2023",
  },
  {
    id: 3,
    fullName: "Lê Minh Đức",
    studentId: "HE181567",
    email: "duclm@fpt.edu.vn",
    phone: "0904 112 233",
    department: "academic",
    clubRole: "Trưởng Ban Chuyên Môn",
    status: "active",
    joinDate: "03/2024",
  },
  {
    id: 4,
    fullName: "Phạm Thùy Linh",
    studentId: "HE182901",
    email: "linhpt@fpt.edu.vn",
    phone: "0936 889 900",
    department: "event",
    clubRole: "Trưởng Ban Sự Kiện",
    status: "active",
    joinDate: "03/2024",
  },
  {
    id: 5,
    fullName: "Đặng Mai Anh",
    studentId: "HE183789",
    email: "anhdm@fpt.edu.vn",
    phone: "0977 445 566",
    department: "pr",
    clubRole: "Trưởng Ban Truyền Thông",
    status: "active",
    joinDate: "03/2024",
  },
  {
    id: 6,
    fullName: "Vũ Thu Hà",
    studentId: "HE184109",
    email: "havt@fpt.edu.vn",
    phone: "0961 223 344",
    department: "hr",
    clubRole: "Thành Viên Ban Nhân Sự",
    status: "active",
    joinDate: "09/2024",
  },
  {
    id: 7,
    fullName: "Hoàng Hải Đăng",
    studentId: "HE189102",
    email: "danghh@fpt.edu.vn",
    phone: "0915 778 899",
    department: "academic",
    clubRole: "Ứng Viên Mới (Vòng 1)",
    status: "pending",
    joinDate: "28/10/2026",
  },
  {
    id: 8,
    fullName: "Bùi Tiến Nam",
    studentId: "HE185521",
    email: "nambt@fpt.edu.vn",
    phone: "0944 556 677",
    department: "event",
    clubRole: "Thành Viên Ban Sự Kiện",
    status: "inactive",
    joinDate: "09/2024",
  },
];

const initialEvents: EventAdminItem[] = [
  {
    id: "evt-1",
    title: "Mastering IELTS Speaking: Từ E Ngại Đến Lưu Loát",
    category: "Workshop",
    date: "15/11/2026",
    time: "14:00 - 17:00",
    location: "Hội trường Beta, FPTU Hòa Lạc",
    speaker: "Thầy Alex Nguyễn (IELTS 8.5)",
    registeredCount: 120,
    maxSeats: 150,
    status: "open",
  },
  {
    id: "evt-2",
    title: "FEC Campus English Amazing Race 2026",
    category: "Festival",
    date: "28/11/2026",
    time: "08:00 - 12:00",
    location: "Khuôn viên ngoài trời FPTU",
    speaker: "Ban Tổ Chức FEC",
    registeredCount: 32,
    maxSeats: 40,
    status: "open",
  },
  {
    id: "evt-3",
    title: "Tiếng Anh Cho Dân IT: Phỏng Vấn Kỹ Thuật",
    category: "Talkshow",
    date: "05/12/2026",
    time: "19:00 - 21:00",
    location: "Zoom & Fanpage Livestream",
    speaker: "Senior Tech Lead FPT Software",
    registeredCount: 185,
    maxSeats: 200,
    status: "open",
  },
  {
    id: "evt-4",
    title: "Halloween English Mystery: Thoát Khỏi Hầm Ngục",
    category: "Festival",
    date: "31/10/2026",
    time: "18:00 - 21:30",
    location: "Tầng 5 Gamma, FPTU Hòa Lạc",
    speaker: "FEC Event Team",
    registeredCount: 250,
    maxSeats: 250,
    status: "completed",
  },
];

const initialActivities: ActivityAdminItem[] = [
  {
    id: "act-1",
    name: "Weekly English Speaking Club (ESC)",
    icon: "🗣️",
    schedule: "Thứ 4 & Thứ 7 hàng tuần (18:30 - 20:30)",
    location: "Phòng Beta 204 & Outdoor Plaza",
    leadDept: "Ban Chuyên Môn",
    facilitator: "Lê Minh Đức & Facilitator Team",
    currentTopic: "Artificial Intelligence in University: Tool or Threat?",
    attendanceAvg: "~65 SV / buổi",
  },
  {
    id: "act-2",
    name: "FEC Debate & Tư Duy Phản Biện",
    icon: "⚖️",
    schedule: "Thứ 6 cách tuần (19:00 - 21:00)",
    location: "Phòng Seminar - Thư viện FPTU",
    leadDept: "Ban Chuyên Môn",
    facilitator: "Trần Phương Lan",
    currentTopic: "Should Traditional Exams Be Replaced with Real-World Projects?",
    attendanceAvg: "~35 SV / buổi",
  },
  {
    id: "act-3",
    name: "English Board Games & Đêm Nhạc Acoustic",
    icon: "🎲",
    schedule: "Chủ Nhật cuối mỗi tháng (19:00 - 21:30)",
    location: "FPTU Campfire / Không gian Cà phê",
    leadDept: "Ban Sự Kiện",
    facilitator: "Phạm Thùy Linh",
    currentTopic: "Board Game Party (Codenames & Taboo) & Acoustic Jamming",
    attendanceAvg: "~55 SV / buổi",
  },
  {
    id: "act-4",
    name: "Campus English Tour & Giao Lưu Quốc Tế",
    icon: "🌏",
    schedule: "Theo đợt sinh viên quốc tế đến FPTU",
    location: "Campus FPTU Hòa Lạc",
    leadDept: "Ban Nhân Sự & Đối Ngoại",
    facilitator: "Vũ Thu Hà",
    currentTopic: "Welcoming 25 Japanese Exchange Students to FPTU Campus",
    attendanceAvg: "20 Tour Guides",
  },
];

export default function RoleManagement() {
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<"members" | "events" | "activities">("members");

  // State Module 1: Thành Viên
  const [members, setMembers] = useState<MemberItem[]>(initialMembers);
  const [memberSearch, setMemberSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  // State Module 2: Sự Kiện
  const [events, setEvents] = useState<EventAdminItem[]>(initialEvents);
  const [eventSearch, setEventSearch] = useState("");

  // State Module 3: Hoạt Động
  const [activities, setActivities] = useState<ActivityAdminItem[]>(initialActivities);

  // Toast
  const [toastMessage, setToastMessage] = useState("");

  // Modals
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<MemberItem | null>(null);
  const [memberFormData, setMemberFormData] = useState({
    fullName: "",
    studentId: "",
    email: "",
    phone: "",
    department: "academic" as MemberItem["department"],
    clubRole: "Thành viên chính thức",
    status: "active" as MemberItem["status"],
  });

  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<EventAdminItem | null>(null);
  const [eventFormData, setEventFormData] = useState({
    title: "",
    category: "Workshop" as EventAdminItem["category"],
    date: "",
    time: "",
    location: "",
    speaker: "",
    maxSeats: 100,
  });

  const [isActivityModalOpen, setIsActivityModalOpen] = useState(false);
  const [editingActivity, setEditingActivity] = useState<ActivityAdminItem | null>(null);
  const [activityTopic, setActivityTopic] = useState("");
  const [activitySchedule, setActivitySchedule] = useState("");
  const [activityLocation, setActivityLocation] = useState("");

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3500);
  };

  // ================= LOGIC MODULE 1: THÀNH VIÊN =================
  const filteredMembers = members.filter((m) => {
    const matchSearch =
      m.fullName.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.studentId.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase());
    const matchDept = deptFilter === "all" || m.department === deptFilter;
    const matchStatus = statusFilter === "all" || m.status === statusFilter;
    return matchSearch && matchDept && matchStatus;
  });

  const handleOpenAddMember = () => {
    setEditingMember(null);
    setMemberFormData({
      fullName: "",
      studentId: "",
      email: "",
      phone: "",
      department: "academic",
      clubRole: "Thành viên chính thức",
      status: "active",
    });
    setIsMemberModalOpen(true);
  };

  const handleOpenEditMember = (m: MemberItem) => {
    setEditingMember(m);
    setMemberFormData({
      fullName: m.fullName,
      studentId: m.studentId,
      email: m.email,
      phone: m.phone,
      department: m.department,
      clubRole: m.clubRole,
      status: m.status,
    });
    setIsMemberModalOpen(true);
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingMember) {
      setMembers(
        members.map((m) =>
          m.id === editingMember.id ? { ...m, ...memberFormData } : m
        )
      );
      showToast(`Đã cập nhật hồ sơ thành viên: ${memberFormData.fullName}!`);
    } else {
      const newM: MemberItem = {
        id: members.length + 1,
        ...memberFormData,
        joinDate: "10/2026",
      };
      setMembers([newM, ...members]);
      showToast(`Đã thêm thành viên mới: ${memberFormData.fullName}!`);
    }
    setIsMemberModalOpen(false);
  };

  const handleApproveApplication = (id: number) => {
    setMembers(
      members.map((m) =>
        m.id === id
          ? { ...m, status: "active", clubRole: "Thành viên chính thức" }
          : m
      )
    );
    showToast("Đã phê duyệt đơn và kích hoạt thành viên thành công!");
  };

  const handleRejectApplication = (id: number) => {
    setMembers(members.filter((m) => m.id !== id));
    showToast("Đã từ chối đơn ứng tuyển.");
  };

  const handleToggleMemberStatus = (id: number) => {
    setMembers(
      members.map((m) =>
        m.id === id
          ? { ...m, status: m.status === "active" ? "inactive" : "active" }
          : m
      )
    );
    showToast("Đã cập nhật trạng thái hoạt động của thành viên!");
  };

  // ================= LOGIC MODULE 2: SỰ KIỆN =================
  const filteredEvents = events.filter((evt) =>
    evt.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
    evt.location.toLowerCase().includes(eventSearch.toLowerCase()) ||
    evt.speaker.toLowerCase().includes(eventSearch.toLowerCase())
  );

  const handleOpenAddEvent = () => {
    setEditingEvent(null);
    setEventFormData({
      title: "",
      category: "Workshop",
      date: "",
      time: "",
      location: "",
      speaker: "",
      maxSeats: 100,
    });
    setIsEventModalOpen(true);
  };

  const handleOpenEditEvent = (evt: EventAdminItem) => {
    setEditingEvent(evt);
    setEventFormData({
      title: evt.title,
      category: evt.category,
      date: evt.date,
      time: evt.time,
      location: evt.location,
      speaker: evt.speaker,
      maxSeats: evt.maxSeats,
    });
    setIsEventModalOpen(true);
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEvent) {
      setEvents(
        events.map((evt) =>
          evt.id === editingEvent.id ? { ...evt, ...eventFormData } : evt
        )
      );
      showToast(`Đã cập nhật sự kiện: ${eventFormData.title}!`);
    } else {
      const newEvt: EventAdminItem = {
        id: `evt-${events.length + 1}`,
        ...eventFormData,
        registeredCount: 0,
        status: "open",
      };
      setEvents([newEvt, ...events]);
      showToast(`Đã tạo sự kiện mới: ${eventFormData.title}!`);
    }
    setIsEventModalOpen(false);
  };

  const handleToggleEventReg = (id: string) => {
    setEvents(
      events.map((evt) =>
        evt.id === id
          ? {
              ...evt,
              status: evt.status === "open" ? "closed" : "open",
            }
          : evt
      )
    );
    showToast("Đã cập nhật trạng thái mở/đóng cổng đăng ký sự kiện!");
  };

  const handleDeleteEvent = (id: string) => {
    if (confirm("Bạn có chắc chắn muốn xóa sự kiện này?")) {
      setEvents(events.filter((e) => e.id !== id));
      showToast("Đã xóa sự kiện thành công!");
    }
  };

  // ================= LOGIC MODULE 3: HOẠT ĐỘNG =================
  const handleOpenEditActivity = (act: ActivityAdminItem) => {
    setEditingActivity(act);
    setActivityTopic(act.currentTopic);
    setActivitySchedule(act.schedule);
    setActivityLocation(act.location);
    setIsActivityModalOpen(true);
  };

  const handleSaveActivity = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingActivity) return;
    setActivities(
      activities.map((a) =>
        a.id === editingActivity.id
          ? {
              ...a,
              currentTopic: activityTopic,
              schedule: activitySchedule,
              location: activityLocation,
            }
          : a
      )
    );
    setIsActivityModalOpen(false);
    showToast(`Đã cập nhật thông tin buổi sinh hoạt: ${editingActivity.name}!`);
  };

  // Thống kê nhanh 4 thẻ
  const totalMembersCount = members.filter((m) => m.status === "active").length;
  const pendingAppsCount = members.filter((m) => m.status === "pending").length;
  const totalEventsCount = events.length;
  const totalActivitiesCount = activities.length;

  return (
    <div className="admin-page-body">
      {/* Toast thông báo sang trọng */}
      {toastMessage && (
        <div className="admin-toast">
          <span className="toast-glow-dot" />
          <span className="toast-text">{toastMessage}</span>
        </div>
      )}

      <div className="admin-container">
        {/* Banner Breadcrumb & Tiêu đề CLB */}
        <div className="admin-header-banner">
          <div className="banner-meta">
            <span className="breadcrumb-path">FEC Administration</span>
            <span className="breadcrumb-slash">/</span>
            <span className="breadcrumb-current">Club Operations Console</span>
          </div>

          <div className="banner-main-row">
            <div>
              <div className="title-with-badge">
                <h1 className="admin-main-title">{t.admin.portalTitle}</h1>
                <span className="security-level-pill">
                  <span className="shield-icon">⭐</span> Executive Board
                </span>
              </div>
              <p className="admin-main-desc">{t.admin.portalSubtitle}</p>
            </div>
          </div>
        </div>

        {/* 4 Thẻ thống kê 3 nghiệp vụ nòng cốt của CLB */}
        <div className="admin-stats-grid">
          <div className="luxury-stat-card card-accent-blue" onClick={() => setActiveTab("members")}>
            <div className="stat-card-glass">
              <div className="stat-card-header">
                <span className="stat-label-text">{t.admin.stats.totalMembers}</span>
                <span className="stat-icon-wrapper blue-icon">👥</span>
              </div>
              <div className="stat-value-row">
                <span className="stat-number-text">{totalMembersCount}</span>
                <span className="trend-badge trend-up">Chính Thức</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill fill-blue" style={{ width: "90%" }} />
              </div>
            </div>
          </div>

          <div className="luxury-stat-card card-accent-amber" onClick={() => setActiveTab("members")}>
            <div className="stat-card-glass">
              <div className="stat-card-header">
                <span className="stat-label-text">{t.admin.stats.pendingApplications}</span>
                <span className="stat-icon-wrapper amber-icon">📝</span>
              </div>
              <div className="stat-value-row">
                <span className="stat-number-text">{pendingAppsCount}</span>
                <span className="trend-badge trend-warn">Cần Phê Duyệt</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill fill-amber" style={{ width: `${pendingAppsCount * 25}%` }} />
              </div>
            </div>
          </div>

          <div className="luxury-stat-card card-accent-red" onClick={() => setActiveTab("events")}>
            <div className="stat-card-glass">
              <div className="stat-card-header">
                <span className="stat-label-text">{t.admin.stats.totalEvents}</span>
                <span className="stat-icon-wrapper red-icon">📅</span>
              </div>
              <div className="stat-value-row">
                <span className="stat-number-text">{totalEventsCount}</span>
                <span className="trend-badge trend-secure">Đang Triển Khai</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill fill-red" style={{ width: "75%" }} />
              </div>
            </div>
          </div>

          <div className="luxury-stat-card card-accent-green" onClick={() => setActiveTab("activities")}>
            <div className="stat-card-glass">
              <div className="stat-card-header">
                <span className="stat-label-text">{t.admin.stats.totalActivities}</span>
                <span className="stat-icon-wrapper green-icon">🗣️</span>
              </div>
              <div className="stat-value-row">
                <span className="stat-number-text">{totalActivitiesCount}</span>
                <span className="trend-badge trend-active">ESC & Debate</span>
              </div>
              <div className="stat-progress-bar">
                <div className="progress-fill fill-green" style={{ width: "100%" }} />
              </div>
            </div>
          </div>
        </div>

        {/* Segmented Controller đúng 3 tab quản lý của Admin CLB */}
        <div className="segmented-tabs-wrapper">
          <div className="segmented-tabs-track">
            <button
              type="button"
              className={`segmented-tab ${activeTab === "members" ? "active" : ""}`}
              onClick={() => setActiveTab("members")}
            >
              <span className="tab-icon">👥</span>
              <span>{t.admin.tabs.members.replace("👥 ", "")}</span>
              <span className="tab-counter-badge">{members.length}</span>
            </button>
            <button
              type="button"
              className={`segmented-tab ${activeTab === "events" ? "active" : ""}`}
              onClick={() => setActiveTab("events")}
            >
              <span className="tab-icon">📅</span>
              <span>{t.admin.tabs.events.replace("📅 ", "")}</span>
              <span className="tab-counter-badge">{events.length}</span>
            </button>
            <button
              type="button"
              className={`segmented-tab ${activeTab === "activities" ? "active" : ""}`}
              onClick={() => setActiveTab("activities")}
            >
              <span className="tab-icon">🗣️</span>
              <span>{t.admin.tabs.activities.replace("🗣️ ", "")}</span>
              <span className="tab-counter-badge">{activities.length}</span>
            </button>
          </div>
        </div>

        {/* ================= TAB 1: QUẢN LÝ THÀNH VIÊN ================= */}
        {activeTab === "members" && (
          <div className="admin-tab-content">
            <div className="luxury-toolbar">
              <div className="search-box-elevated">
                <span className="search-lens-icon">🔍</span>
                <input
                  type="text"
                  placeholder={t.admin.membersTab.searchPlaceholder}
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="search-input-elevated"
                />
                {memberSearch && (
                  <button
                    type="button"
                    className="clear-search-btn"
                    onClick={() => setMemberSearch("")}
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="filter-controls-elevated">
                <select
                  value={deptFilter}
                  onChange={(e) => setDeptFilter(e.target.value)}
                  className="filter-select-elevated"
                >
                  <option value="all">{t.admin.membersTab.allDepts}</option>
                  <option value="board">Ban Chủ Nhiệm (Board)</option>
                  <option value="academic">Ban Chuyên Môn (Academic)</option>
                  <option value="event">Ban Sự Kiện (Events)</option>
                  <option value="pr">Ban Truyền Thông (PR & Media)</option>
                  <option value="hr">Ban Nhân Sự (HR & ER)</option>
                </select>

                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select-elevated"
                >
                  <option value="all">{t.admin.membersTab.allStatuses}</option>
                  <option value="active">{t.admin.membersTab.activeStatus}</option>
                  <option value="pending">{t.admin.membersTab.pendingStatus}</option>
                  <option value="inactive">{t.admin.membersTab.inactiveStatus}</option>
                </select>

                <button
                  type="button"
                  className="btn-create-role-luxury"
                  onClick={handleOpenAddMember}
                >
                  {t.admin.membersTab.addMemberBtn}
                </button>
              </div>
            </div>

            <div className="luxury-table-card">
              <div className="table-responsive">
                <table className="luxury-table">
                  <thead>
                    <tr>
                      <th>{t.admin.membersTab.colMember}</th>
                      <th>{t.admin.membersTab.colDept}</th>
                      <th>{t.admin.membersTab.colRole}</th>
                      <th>{t.admin.membersTab.colContact}</th>
                      <th>{t.admin.membersTab.colStatus}</th>
                      <th className="text-right">{t.admin.membersTab.colActions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredMembers.map((m) => (
                      <tr key={m.id} className={m.status === "pending" ? "row-pending" : ""}>
                        <td>
                          <div className="user-profile-cell">
                            <div className="avatar-ring role-ring-president">
                              <span>{m.fullName.charAt(0)}</span>
                            </div>
                            <div className="user-titles">
                              <span className="user-name-primary">{m.fullName}</span>
                              <span className="fptu-id-chip">{m.studentId}</span>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span className={`luxury-role-badge badge-${m.department}`}>
                            <span className="role-dot" />
                            <span>
                              {m.department === "board" && "Ban Chủ Nhiệm"}
                              {m.department === "academic" && "Chuyên Môn"}
                              {m.department === "event" && "Sự Kiện"}
                              {m.department === "pr" && "Truyền Thông"}
                              {m.department === "hr" && "Nhân Sự"}
                            </span>
                          </span>
                        </td>
                        <td className="font-semibold text-gray-800">{m.clubRole}</td>
                        <td>
                          <div className="email-id-cell">
                            <span className="email-link">{m.email}</span>
                            <span className="text-muted-time">📞 {m.phone}</span>
                          </div>
                        </td>
                        <td>
                          <span
                            className={`status-pill-luxury ${
                              m.status === "active"
                                ? "state-online"
                                : m.status === "pending"
                                ? "state-offline"
                                : "state-offline"
                            }`}
                          >
                            <span className="status-indicator" />
                            <span>
                              {m.status === "active" && t.admin.membersTab.activeStatus}
                              {m.status === "pending" && t.admin.membersTab.pendingStatus}
                              {m.status === "inactive" && t.admin.membersTab.inactiveStatus}
                            </span>
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="action-pill-group">
                            {m.status === "pending" ? (
                              <>
                                <button
                                  type="button"
                                  className="action-btn-luxury btn-toggle-unlock"
                                  onClick={() => handleApproveApplication(m.id)}
                                >
                                  ✔ {t.admin.membersTab.approveBtn}
                                </button>
                                <button
                                  type="button"
                                  className="action-btn-luxury btn-trash"
                                  onClick={() => handleRejectApplication(m.id)}
                                >
                                  ✕ {t.admin.membersTab.rejectBtn}
                                </button>
                              </>
                            ) : (
                              <>
                                <button
                                  type="button"
                                  className="action-btn-luxury btn-modify-role"
                                  onClick={() => handleOpenEditMember(m)}
                                >
                                  ✏️ {t.admin.membersTab.editBtn}
                                </button>
                                <button
                                  type="button"
                                  className={`action-btn-luxury ${
                                    m.status === "active" ? "btn-toggle-lock" : "btn-toggle-unlock"
                                  }`}
                                  onClick={() => handleToggleMemberStatus(m.id)}
                                >
                                  {m.status === "active"
                                    ? t.admin.membersTab.lockBtn
                                    : t.admin.membersTab.unlockBtn}
                                </button>
                              </>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 2: QUẢN LÝ SỰ KIỆN ================= */}
        {activeTab === "events" && (
          <div className="admin-tab-content">
            <div className="luxury-toolbar">
              <div className="search-box-elevated">
                <span className="search-lens-icon">🔍</span>
                <input
                  type="text"
                  placeholder={t.admin.eventsTab.searchPlaceholder}
                  value={eventSearch}
                  onChange={(e) => setEventSearch(e.target.value)}
                  className="search-input-elevated"
                />
              </div>

              <div className="filter-controls-elevated">
                <button
                  type="button"
                  className="btn-create-role-luxury"
                  onClick={handleOpenAddEvent}
                >
                  {t.admin.eventsTab.createEventBtn}
                </button>
              </div>
            </div>

            <div className="luxury-table-card">
              <div className="table-responsive">
                <table className="luxury-table">
                  <thead>
                    <tr>
                      <th style={{ width: "30%" }}>{t.admin.eventsTab.colEvent}</th>
                      <th>{t.admin.eventsTab.colCategory}</th>
                      <th>{t.admin.eventsTab.colDate}</th>
                      <th>{t.admin.eventsTab.colRegistrations}</th>
                      <th>{t.admin.eventsTab.colStatus}</th>
                      <th className="text-right">{t.admin.eventsTab.colActions}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredEvents.map((evt) => (
                      <tr key={evt.id}>
                        <td>
                          <div className="perm-meta">
                            <span className="perm-name">{evt.title}</span>
                            <span className="perm-desc">🎤 Diễn giả: {evt.speaker}</span>
                          </div>
                        </td>
                        <td>
                          <span className={`luxury-role-badge badge-event_lead`}>
                            {evt.category}
                          </span>
                        </td>
                        <td>
                          <div className="email-id-cell">
                            <span className="font-semibold text-gray-900">🗓️ {evt.date} ({evt.time})</span>
                            <span className="text-muted-time">📍 {evt.location}</span>
                          </div>
                        </td>
                        <td>
                          <div className="stat-value-row" style={{ marginBottom: "4px" }}>
                            <span className="font-bold text-gray-800">
                              {evt.registeredCount} / {evt.maxSeats}
                            </span>
                            <span className="trend-badge trend-up">
                              {Math.round((evt.registeredCount / evt.maxSeats) * 100)}%
                            </span>
                          </div>
                          <div className="stat-progress-bar">
                            <div
                              className="progress-fill fill-red"
                              style={{ width: `${(evt.registeredCount / evt.maxSeats) * 100}%` }}
                            />
                          </div>
                        </td>
                        <td>
                          <span
                            className={`status-pill-luxury ${
                              evt.status === "open"
                                ? "state-online"
                                : evt.status === "completed"
                                ? "badge-member"
                                : "state-offline"
                            }`}
                          >
                            <span className="status-indicator" />
                            <span>
                              {evt.status === "open" && "Đang Mở Đăng Ký"}
                              {evt.status === "closed" && "Đã Đóng Cổng"}
                              {evt.status === "completed" && "Đã Diễn Ra"}
                            </span>
                          </span>
                        </td>
                        <td className="text-right">
                          <div className="action-pill-group">
                            <button
                              type="button"
                              className="action-btn-luxury btn-modify-role"
                              onClick={() => handleOpenEditEvent(evt)}
                              title="Chỉnh sửa thông tin sự kiện"
                            >
                              ✏️ {t.admin.eventsTab.editBtn}
                            </button>
                            <button
                              type="button"
                              className="action-btn-luxury btn-toggle-unlock"
                              onClick={() =>
                                showToast(`Mã QR Check-in điểm danh cho sự kiện: ${evt.title}`)
                              }
                              title="Quét mã QR điểm danh"
                            >
                              📱 QR
                            </button>
                            <button
                              type="button"
                              className="action-btn-luxury btn-toggle-lock"
                              onClick={() => handleToggleEventReg(evt.id)}
                            >
                              {evt.status === "open"
                                ? t.admin.eventsTab.closeBtn
                                : t.admin.eventsTab.openBtn}
                            </button>
                            <button
                              type="button"
                              className="action-btn-luxury btn-trash"
                              onClick={() => handleDeleteEvent(evt.id)}
                            >
                              ✕
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ================= TAB 3: QUẢN LÝ HOẠT ĐỘNG ================= */}
        {activeTab === "activities" && (
          <div className="admin-tab-content">
            <div className="matrix-control-panel">
              <div className="matrix-intro">
                <h2>{t.admin.tabs.activities}</h2>
                <p>Điều phối lịch sinh hoạt thường niên (Weekly ESC, Debate, Board Game, Tour quốc tế) và cập nhật chủ đề tuần này.</p>
              </div>
            </div>

            <div className="luxury-roles-grid">
              {activities.map((act) => (
                <div key={act.id} className="luxury-role-card">
                  <div className="role-card-banner">
                    <span className="activity-icon-bubble">{act.icon}</span>
                    <span className="member-count-bubble">👥 {act.attendanceAvg}</span>
                  </div>

                  <h3 className="role-title-text">{act.name}</h3>

                  <div className="activity-info-box">
                    <p className="activity-info-line">
                      <strong>⏰ Lịch định kỳ:</strong> {act.schedule}
                    </p>
                    <p className="activity-info-line">
                      <strong>📍 Địa điểm:</strong> {act.location}
                    </p>
                    <p className="activity-info-line">
                      <strong>👤 Phụ trách:</strong> {act.facilitator} ({act.leadDept})
                    </p>
                  </div>

                  <div className="current-topic-card">
                    <span className="topic-badge">🌟 CHỦ ĐỀ TUẦN NÀY (Topic of the Week)</span>
                    <p className="topic-text">&ldquo;{act.currentTopic}&rdquo;</p>
                  </div>

                  <div className="role-capsules-list" style={{ marginTop: "1rem" }}>
                    <button
                      type="button"
                      className="btn-update-topic"
                      onClick={() => handleOpenEditActivity(act)}
                    >
                      <span>⚡ Cập Nhật Chủ Đề & Lịch Tuần Này</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* ================= MODAL THÀNH VIÊN ================= */}
      {isMemberModalOpen && (
        <div className="luxury-modal-overlay" onClick={() => setIsMemberModalOpen(false)}>
          <div className="luxury-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="luxury-modal-header">
              <div className="modal-title-with-icon">
                <span className="modal-header-icon">👥</span>
                <h3>{editingMember ? t.admin.modalMember.titleEdit : t.admin.modalMember.titleAdd}</h3>
              </div>
              <button
                type="button"
                className="modal-dismiss-btn"
                onClick={() => setIsMemberModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMember} className="luxury-modal-form">
              <div className="luxury-form-group">
                <label>{t.admin.modalMember.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder="Nguyễn Văn A"
                  value={memberFormData.fullName}
                  onChange={(e) =>
                    setMemberFormData({ ...memberFormData, fullName: e.target.value })
                  }
                  className="luxury-text-input"
                />
              </div>

              <div className="form-row-2col">
                <div className="luxury-form-group">
                  <label>{t.admin.modalMember.studentIdLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="HE180000"
                    value={memberFormData.studentId}
                    onChange={(e) =>
                      setMemberFormData({ ...memberFormData, studentId: e.target.value })
                    }
                    className="luxury-text-input"
                  />
                </div>
                <div className="luxury-form-group">
                  <label>{t.admin.modalMember.phoneLabel}</label>
                  <input
                    type="tel"
                    required
                    placeholder="0912 345 678"
                    value={memberFormData.phone}
                    onChange={(e) =>
                      setMemberFormData({ ...memberFormData, phone: e.target.value })
                    }
                    className="luxury-text-input"
                  />
                </div>
              </div>

              <div className="luxury-form-group">
                <label>{t.admin.modalMember.emailLabel}</label>
                <input
                  type="email"
                  required
                  placeholder="example@fpt.edu.vn"
                  value={memberFormData.email}
                  onChange={(e) =>
                    setMemberFormData({ ...memberFormData, email: e.target.value })
                  }
                  className="luxury-text-input"
                />
              </div>

              <div className="form-row-2col">
                <div className="luxury-form-group">
                  <label>{t.admin.modalMember.deptLabel}</label>
                  <select
                    value={memberFormData.department}
                    onChange={(e) =>
                      setMemberFormData({
                        ...memberFormData,
                        department: e.target.value as MemberItem["department"],
                      })
                    }
                    className="luxury-select-input"
                  >
                    <option value="board">Ban Chủ Nhiệm (Board)</option>
                    <option value="academic">Ban Chuyên Môn (Academic)</option>
                    <option value="event">Ban Sự Kiện (Events)</option>
                    <option value="pr">Ban Truyền Thông (PR & Media)</option>
                    <option value="hr">Ban Nhân Sự (HR & ER)</option>
                  </select>
                </div>

                <div className="luxury-form-group">
                  <label>{t.admin.modalMember.roleLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="Ví dụ: Trưởng ban, Thành viên..."
                    value={memberFormData.clubRole}
                    onChange={(e) =>
                      setMemberFormData({ ...memberFormData, clubRole: e.target.value })
                    }
                    className="luxury-text-input"
                  />
                </div>
              </div>

              <div className="luxury-modal-footer">
                <button
                  type="button"
                  className="btn-cancel-luxury"
                  onClick={() => setIsMemberModalOpen(false)}
                >
                  {t.admin.modalMember.cancelBtn}
                </button>
                <button type="submit" className="btn-confirm-luxury">
                  {t.admin.modalMember.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL SỰ KIỆN ================= */}
      {isEventModalOpen && (
        <div className="luxury-modal-overlay" onClick={() => setIsEventModalOpen(false)}>
          <div className="luxury-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="luxury-modal-header">
              <div className="modal-title-with-icon">
                <span className="modal-header-icon">📅</span>
                <h3>{editingEvent ? t.admin.modalEvent.titleEdit : t.admin.modalEvent.titleAdd}</h3>
              </div>
              <button
                type="button"
                className="modal-dismiss-btn"
                onClick={() => setIsEventModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvent} className="luxury-modal-form">
              <div className="luxury-form-group">
                <label>{t.admin.modalEvent.nameLabel}</label>
                <input
                  type="text"
                  required
                  placeholder="Ví dụ: Workshop IELTS Speaking Band 7.5+"
                  value={eventFormData.title}
                  onChange={(e) =>
                    setEventFormData({ ...eventFormData, title: e.target.value })
                  }
                  className="luxury-text-input"
                />
              </div>

              <div className="form-row-2col">
                <div className="luxury-form-group">
                  <label>{t.admin.modalEvent.categoryLabel}</label>
                  <select
                    value={eventFormData.category}
                    onChange={(e) =>
                      setEventFormData({
                        ...eventFormData,
                        category: e.target.value as EventAdminItem["category"],
                      })
                    }
                    className="luxury-select-input"
                  >
                    <option value="Workshop">Workshop Học Thuật</option>
                    <option value="Talkshow">Talkshow Diễn Giả</option>
                    <option value="Festival">Ngày Hội / Festival</option>
                    <option value="Competition">Cuộc Thi / Giải Đấu</option>
                  </select>
                </div>
                <div className="luxury-form-group">
                  <label>{t.admin.modalEvent.maxSeatsLabel}</label>
                  <input
                    type="number"
                    required
                    min={10}
                    value={eventFormData.maxSeats}
                    onChange={(e) =>
                      setEventFormData({ ...eventFormData, maxSeats: Number(e.target.value) })
                    }
                    className="luxury-text-input"
                  />
                </div>
              </div>

              <div className="form-row-2col">
                <div className="luxury-form-group">
                  <label>{t.admin.modalEvent.dateLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="DD/MM/YYYY (ví dụ: 15/11/2026)"
                    value={eventFormData.date}
                    onChange={(e) =>
                      setEventFormData({ ...eventFormData, date: e.target.value })
                    }
                    className="luxury-text-input"
                  />
                </div>
                <div className="luxury-form-group">
                  <label>{t.admin.modalEvent.timeLabel}</label>
                  <input
                    type="text"
                    required
                    placeholder="14:00 - 17:00"
                    value={eventFormData.time}
                    onChange={(e) =>
                      setEventFormData({ ...eventFormData, time: e.target.value })
                    }
                    className="luxury-text-input"
                  />
                </div>
              </div>

              <div className="luxury-form-group">
                <label>{t.admin.modalEvent.locationLabel}</label>
                <input
                  type="text"
                  required
                  placeholder="Hội trường Beta / Zoom Webinar"
                  value={eventFormData.location}
                  onChange={(e) =>
                    setEventFormData({ ...eventFormData, location: e.target.value })
                  }
                  className="luxury-text-input"
                />
              </div>

              <div className="luxury-form-group">
                <label>{t.admin.modalEvent.speakerLabel}</label>
                <input
                  type="text"
                  placeholder="Tên diễn giả khách mời"
                  value={eventFormData.speaker}
                  onChange={(e) =>
                    setEventFormData({ ...eventFormData, speaker: e.target.value })
                  }
                  className="luxury-text-input"
                />
              </div>

              <div className="luxury-modal-footer">
                <button
                  type="button"
                  className="btn-cancel-luxury"
                  onClick={() => setIsEventModalOpen(false)}
                >
                  {t.admin.modalEvent.cancelBtn}
                </button>
                <button type="submit" className="btn-confirm-luxury">
                  {t.admin.modalEvent.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ================= MODAL HOẠT ĐỘNG CLB ================= */}
      {isActivityModalOpen && editingActivity && (
        <div className="luxury-modal-overlay" onClick={() => setIsActivityModalOpen(false)}>
          <div className="luxury-modal-container" onClick={(e) => e.stopPropagation()}>
            <div className="luxury-modal-header">
              <div className="modal-title-with-icon">
                <span className="modal-header-icon">{editingActivity.icon}</span>
                <h3>Cập Nhật Chủ Đề Sinh Hoạt: {editingActivity.name}</h3>
              </div>
              <button
                type="button"
                className="modal-dismiss-btn"
                onClick={() => setIsActivityModalOpen(false)}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveActivity} className="luxury-modal-form">
              <div className="luxury-form-group">
                <label>{t.admin.modalActivity.topicLabel}</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Nhập chủ đề thảo luận tiếng Anh cho buổi sinh hoạt tuần này..."
                  value={activityTopic}
                  onChange={(e) => setActivityTopic(e.target.value)}
                  className="luxury-textarea-input"
                />
              </div>

              <div className="form-row-2col">
                <div className="luxury-form-group">
                  <label>{t.admin.modalActivity.scheduleLabel}</label>
                  <input
                    type="text"
                    required
                    value={activitySchedule}
                    onChange={(e) => setActivitySchedule(e.target.value)}
                    className="luxury-text-input"
                  />
                </div>
                <div className="luxury-form-group">
                  <label>{t.admin.modalActivity.locationLabel}</label>
                  <input
                    type="text"
                    required
                    value={activityLocation}
                    onChange={(e) => setActivityLocation(e.target.value)}
                    className="luxury-text-input"
                  />
                </div>
              </div>

              <div className="luxury-modal-footer">
                <button
                  type="button"
                  className="btn-cancel-luxury"
                  onClick={() => setIsActivityModalOpen(false)}
                >
                  {t.admin.modalActivity.cancelBtn}
                </button>
                <button type="submit" className="btn-confirm-luxury">
                  {t.admin.modalActivity.saveBtn}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
