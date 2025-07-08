"use client";

import { Dropdown } from "primereact/dropdown";

export default function SidebarFilter({ surahs, selected, onSelect }) {
  const options = [{ label: "All Surahs", value: null }].concat(
    surahs.map((s) => ({
      label: `${s.surahNo}. ${s.surahName}`,
      value: s,
    }))
  );

  return (
    <div style={{ width: "250px", padding: "20px", borderRight: "1px solid #eee" }}>
      <h3>Filter Surah</h3>
      <Dropdown
        options={options}
        value={selected}
        onChange={(e) => onSelect(e.value)}
        placeholder="Choose Surah"
        style={{ width: "100%" }}
        showClear
      />
      
    </div>
  );
}