import React from "react";
import SubNav from "@/components/ui/subnav";
import Apply from "@/components/ui/apply";
import Navbar from "@/components/ui/narbar";
import Footer from "@/components/ui/footer";

export default function ApplyPage() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        overflowX: "hidden",
      }}
    >
      <Navbar />
      <SubNav />
      <main style={{ flex: 1, width: "100%" }}>
        <Apply />
      </main>
      <Footer />
    </div>
  );
}
