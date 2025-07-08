"use client";

import { Button } from "primereact/button";

export default function Header({ onToggleSidebar }) {
  return (
    <header
      style={{
        backgroundColor: "#007ad9",
        color: "white",
        padding: "1rem",
        display: "flex",
        alignItems: "center",
        gap: "1rem",
        justifyContent:'space-between'
      }}
    >
      <Button
        icon="pi pi-bars"
        className="p-button-rounded p-button-text p-button-plain"
        onClick={onToggleSidebar}
        aria-label="Toggle Sidebar"
      />
      <h1 className="text-center">This is the Website Header</h1>
      <div></div>
    </header>
  );
}
