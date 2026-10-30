import React from "react";
import AdminHeader from "@/components/admin/AdminHeader";
import RoleManagement from "@/components/admin/RoleManagement";

export const metadata = {
  title: "FEC Admin - Phân Quyền & Vai Trò (Role & Permission Management)",
  description: "Trang quản trị phân quyền người dùng và vai trò bảo mật của hệ thống FEC.",
};

export default function AdminPage() {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <AdminHeader />
      <main style={{ flex: 1 }}>
        <RoleManagement />
      </main>
    </div>
  );
}
