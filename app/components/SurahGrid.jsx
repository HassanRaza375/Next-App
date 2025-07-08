"use client";

import { useState, useEffect, useMemo } from "react";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import SidebarFilter from "./SidebarFilter";
import RangeSlider from "./RangeSlider";
import { useRouter } from "next/navigation";

export default function SurahGrid() {
  const [surahs, setSurahs] = useState([]);
  const [filterSurah, setFilterSurah] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");
  const [range, setRange] = useState({ from: 1, to: 30 }); // Range for filtering
  const [page, setPage] = useState(1);
  const router = useRouter();

  // Fetch Surah list on load
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch("https://quranapi.pages.dev/api/surah.json");
        const data = await res.json();
        const arr = Object.values(data).map((s, i) => ({
          ...s,
          surahNo: i + 1,
        }));
        setSurahs(arr);
      } catch (err) {
        console.error("Failed to fetch surahs:", err);
      }
    })();
  }, []);

  // Filtered + Sorted + Ranged data
  const filtered = useMemo(() => {
    let arr = [...surahs];

    if (filterSurah?.surahNo) {
      arr = arr.filter((s) => s.surahNo === filterSurah.surahNo);
    }

    arr = arr.filter((s) => s.surahNo >= range.from && s.surahNo <= range.to);

    arr.sort((a, b) =>
      sortOrder === "asc"
        ? a.surahName.localeCompare(b.surahName)
        : b.surahName.localeCompare(a.surahName)
    );

    return arr;
  }, [surahs, filterSurah, sortOrder, range]);

  // Pagination
  const perPage = 16;
  const totalPages = Math.ceil(filtered.length / perPage);
  const current = useMemo(() => {
    const start = (page - 1) * perPage;
    return filtered.slice(start, start + perPage);
  }, [filtered, page]);

  // Reset pagination when filter or range changes
  useEffect(() => {
    setPage(1);
  }, [filterSurah, range]);

  return (
    <div style={{ display: "flex" }}>
      {/* Sidebar Dropdown Filter */}
      <SidebarFilter
        surahs={surahs}
        selected={filterSurah}
        onSelect={setFilterSurah}
      />

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {/* Controls */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <RangeSlider range={range} onChange={setRange} max={surahs.length} />
          <div>
            Sort:
            <Dropdown
              value={sortOrder}
              options={[
                { label: "Ascending", value: "asc" },
                { label: "Descending", value: "desc" },
              ]}
              onChange={(e) => setSortOrder(e.value)}
              style={{ marginLeft: "8px" }}
            />
          </div>
        </div>

        {/* Grid Cards */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {current.map((s) => (
            <div
              key={s.surahNo}
              onClick={() => router.push(`/surah/${s.surahNo}`)}
              style={{
                border: "1px solid #ccc",
                borderRadius: "8px",
                padding: "16px",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <h2>{s.surahName}</h2>
              <h3>{s.surahNameArabic}</h3>
              <p>{s.surahNameTranslation}</p>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  fontSize: "0.9rem",
                  marginTop: "8px",
                }}
              >
                <span>{s.revelationPlace}</span>
                <span>{s.totalAyah} Ayahs</span>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div style={{ textAlign: "center", marginTop: "20px" }}>
          {Array.from({ length: totalPages }, (_, i) => (
            <Button
              key={i + 1}
              label={String(i + 1)}
              className={
                page === i + 1
                  ? "p-button-rounded p-button-secondary"
                  : "p-button-rounded p-button-text"
              }
              onClick={() => setPage(i + 1)}
              style={{ margin: "0 4px" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
