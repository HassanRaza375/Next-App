"use client";

import { useState } from "react";
import Header from "./Header";

export default function SidebarLayout({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const sidebarWidth = 250;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      {/* Sidebar */}
      <div
        style={{
          width: isOpen ? `${sidebarWidth}px` : "0px",
          backgroundColor: "#222",
          color: "#fff",
          overflowX: "hidden",
          transition: "width 0.3s ease",
          padding: isOpen ? "20px" : "0px",
        }}
      >
        {isOpen && (
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li style={{ margin: "10px 0" }}><a href="/" style={{ color: "white" }}>Home</a></li>
            <li style={{ margin: "10px 0" }}><a href="/about" style={{ color: "white" }}>About</a></li>
            <li style={{ margin: "10px 0" }}><a href="/services" style={{ color: "white" }}>Services</a></li>
            <li style={{ margin: "10px 0" }}><a href="/contact" style={{ color: "white" }}>Contact</a></li>
          </ul>
        )}
      </div>

      {/* Page content (Header, Main, Footer) */}
      <div
        style={{
          flex: 1,
          transition: "margin-left 0.3s ease",
          backgroundColor: "#f4f4f4",
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* ✅ Use your own Header and pass toggle function */}
        <Header onToggleSidebar={() => setIsOpen(!isOpen)} />

        <main style={{ flex: 1, padding: "20px" }}>
          {children}
        </main>

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
      </div>
    </div>
  );
}
