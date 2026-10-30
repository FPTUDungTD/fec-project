import React from "react";
import SubNav from "@/components/ui/subnav";
import About from "@/components/ui/about";
import Navbar from "@/components/ui/narbar";
import Footer from "@/components/ui/footer";

export default function AboutPage() {
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
        <About />
      </main>
      <Footer />
    </div>
  );
}
