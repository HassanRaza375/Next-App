"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { TabMenu } from "primereact/tabmenu";
import { Dialog } from "primereact/dialog"

export default function HeroSection() {
  const [searchQuery, setSearchQuery] = useState("");
  const [surahs, setSurahs] = useState([]);
  const [filteredSurahs, setFilteredSurahs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(null);
  const [showDialog, setShowDialog] = useState(false);
  const [juzList, setJuzList] = useState([]);
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

  // Tab Models Popup Code Ye hai PrimeReact ka
   const items = [
    { label: "Juzz", icon: "pi pi-book" },
    { label: "Verses", icon: "pi pi-star" },
    { label: "Tafsir", icon: "pi pi-cog" },
  ];

  const onTabChange = (e) => {
    setActiveIndex(e.index);
    setShowDialog(true);
  };

  useEffect(() => {
    if (activeIndex === 0 && juzList.length === 0) {
      const fetchAllJuzz = async () => {
        setLoading(true);
        const data = [];

        try {
          for (let i = 1; i <= 30; i++) {
            console.log(`Fetching Juz ${i}`);
            const res = await fetch(`https://api.alquran.cloud/v1/juz/${i}/asad`);
            if (!res.ok) {
              console.error(`Error fetching Juz ${i}:`, res.status);
              continue;
            }

            const json = await res.json();
            const firstAyah = json.data?.ayahs?.[0]?.text || 'No text';
            data.push({ number: i, text: firstAyah });
          }

          setJuzList(data);
        } catch (error) {
          console.error('Failed to fetch juz list:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchAllJuzz();
    }
  }, [activeIndex, juzList.length]);

  const handleJuzzClick = (juzzNo) => {
    setShowDialog(false);
    router.push(`/juzz/${juzzNo}`);
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
        <h1 style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>
          Search Surah
        </h1>

        <div style={{ position: "relative", width: "250px" }}>
          <InputText
            placeholder="Enter Surah name..."
            value={searchQuery}
            onChange={(e) => handleInputChange(e.target.value)}
            style={{
              width: "100%",
              padding: "10px",
              borderRadius: "4px",
              zIndex: 2,
            }}
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
                  <strong>{surah.surahName}</strong> —{" "}
                  {surah.surahNameTranslation}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Tab Content React Prime */}
        <div style={{ marginTop: '20px', width: '300px' }}>
      <TabMenu model={items} activeIndex={activeIndex} onTabChange={onTabChange} />

      <Dialog
        header={items[activeIndex]?.label}
        visible={showDialog}
        style={{ width: '500px' }}
        onHide={() => setShowDialog(false)}
        modal
      >
        {activeIndex === 0 && (
          <div>
            {loading ? (
              <p>Loading Juz list...</p>
            ) : (
              <ul style={{ listStyle: 'none', padding: 0, maxHeight: '400px', overflowY: 'auto' }}>
                {juzList.map((juz) => (
                  <li
                    key={juz.number}
                    onClick={() => handleJuzzClick(juz.number)}
                    style={{
                      padding: '10px',
                      borderBottom: '1px solid #ddd',
                      cursor: 'pointer',
                    }}
                  >
                    <strong>Juz {juz.number}</strong>: {juz.text.slice(0, 100)}...
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}

        {activeIndex === 1 && <p>Verses content will go here...</p>}

        {activeIndex === 2 && <p>Tafsir content will go here...</p>}
      </Dialog>
    </div>

      </div>

      
      
    </div>
  );
}
