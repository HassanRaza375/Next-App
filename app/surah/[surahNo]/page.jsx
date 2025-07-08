"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function SurahPage() {
  const params = useParams();
  const surahNo = params.surahNo;
  const [surahData, setSurahData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSurah() {
      setLoading(true);
      try {
        const res = await fetch(`https://quranapi.pages.dev/api/${surahNo}.json`);
        const data = await res.json();
        setSurahData(data);
      } catch (error) {
        console.error("Failed to fetch surah data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSurah();
  }, [surahNo]);

  if (loading) return <p>Loading...</p>;
  if (!surahData) return <p>Surah data not found.</p>;

  return (
    <div style={{ padding: "20px", textAlign:"right" }}>
      <h1>{surahData.surahName} ({surahData.surahNameArabicLong})</h1>
      <h3>Translation: {surahData.surahNameTranslation}</h3>
      <h4>Total Ayah: {surahData.totalAyah}</h4>

      <section>
        <h2>Arabic (Variant 1)</h2>
        {surahData.arabic1.map((ayah, i) => (
          <p key={i} style={{ fontSize: "1.5rem", fontFamily: "Scheherazade, serif" }}>{ayah}</p>
        ))}
      </section>

      <section>
        <h2>Arabic (Variant 2)</h2>
        {surahData.arabic2.map((ayah, i) => (
          <p key={i} style={{ fontSize: "1.2rem", fontFamily: "Scheherazade, serif" }}>{ayah}</p>
        ))}
      </section>

      <section>
        <h2>Urdu Translation</h2>
        {surahData.urdu.map((ayah, i) => (
          <p key={i} style={{ fontSize: "1rem", fontFamily: "Noto Nastaliq Urdu, serif" }}>{ayah}</p>
        ))}
      </section>

      <section>
        <h2>Audio Recitations</h2>
        {[1, 2].map((reciterKey) => {
          const reciter = surahData.audio[reciterKey];
          if (!reciter) return null;
          return (
            <div key={reciterKey} style={{ marginBottom: "1rem" }}>
              <strong>{reciter.reciter}</strong>
              <br />
              <audio controls src={reciter.url} style={{ width: "100%", maxWidth: "400px" }} />
            </div>
          );
        })}
      </section>
    </div>
  );
}
