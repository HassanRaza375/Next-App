"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [loading, setLoading] = useState(false);
   const router = useRouter();

  useEffect(() => {
    const fetchSurahs = async () => {
      setLoading(true);
      try {
        const res = await fetch("https://quranapi.pages.dev/api/surah.json");
        let data = await res.json();
        data = data.map((s, i) => ({ ...s, surahNo: i + 1 }));
        setSurahs(data);
      } catch (err) {
        console.error("Error fetching surahs:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchSurahs();
  }, []);

   // Auto-filter as user types
   const handleInputChange = (value) => {
    setSearchQuery(value);
    if (!value.trim()) {
      setFilteredSurahs([]);
      return;
    }
    const q = value.toLowerCase();
    setFilteredSurahs(
      surahs.filter((s) => s.surahName.toLowerCase().includes(q))
    );
  };

 const handleSelect = (surah) => {
    router.push(`/surah/${surah.surahNo}`);
    setSearchQuery("");
    setFilteredSurahs([]);
  };



 return (
    <div style={{ position: "relative" }}>
      <div
        style={{
          height: "400px",
          backgroundImage: "url('/quran.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          padding: "0 20px",
          color: "white",
        }}
      >
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>Search Surah</h1>
        <div style={{ position: "relative", width: "250px" }}>
          <InputText
            placeholder="Enter Surah name..."
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            style={{ width: "100%", padding: "10px", borderRadius: "4px", zIndex: 2 }}
          />
          {searchQuery && filteredSurahs.length > 0 && (
            <ul
              style={{
                position: "absolute",
                top: "42px",
                width: "100%",
                maxHeight: "200px",
                overflowY: "auto",
                backgroundColor: "#fff",
                border: "1px solid #ccc",
                borderRadius: "4px",
                margin: 0,
                padding: 0,
                zIndex: 10,
              }}
            >
              {filteredSurahs.map((surah) => (
                <li
                  key={surah.surahNo}
                  onClick={() => handleSelect(surah)}
                  style={{
                    padding: "10px",
                    cursor: "pointer",
                    borderBottom: "1px solid #eee",
                    background: "black",
                    color: "white",
                    textAlign: "left",
                  }}
                >
                  <strong>{surah.surahName}</strong> — {surah.surahNameTranslation}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
