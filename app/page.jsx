"use client";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import SurahGrid from "./components/SurahGrid";

export default function HomePage() {
    
  return (
    <>
      <main style={{ padding: "20px" }}>
        <HeroSection />
        {/* <h2>Welcome to the Home Page</h2>
        <p>This is the main content.</p> */}
        <SurahGrid />
      </main>
       <Footer />
    </>
  );
}