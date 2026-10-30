import Navbar from "@/components/ui/narbar";
import Footer from "@/components/ui/footer";
import Hero from "@/components/ui/hero";
import Features from "@/components/feature/feature";
import Highlights from "@/components/ui/highlight";

export default function Home() {
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
      <main style={{ flex: 1, width: "100%" }}>
        <Hero />
        <Features />
        <Highlights />
      </main>
      <Footer />
    </div>
  );
}
