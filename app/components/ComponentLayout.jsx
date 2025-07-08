"use client";

import { useState } from "react";
import Header from "./Header";
import MainSidebar from "./MainSidebar";
export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <MainSidebar isOpen={isOpen} setIsOpen={setIsOpen} />
      <Header onToggleSidebar={() => setIsOpen(!isOpen)} />
      <div style={{ display: "flex", minHeight: "100vh" }}>
        <main style={{ flex: 1, padding: "20px" }}>{children}</main>
      </div>

      <footer
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "1rem",
          textAlign: "center",
        }}
      >
        &copy; {new Date().getFullYear()} My Website
      </footer>
    </>
  );
}
