export default async function JuzPage({ params }) {
  const { juzzNo } = params;

  const res = await fetch(`https://api.alquran.cloud/v1/juz/${juzzNo}/asad`);
  const json = await res.json();
  const juzData = json?.data;

  if (!juzData || !juzData.ayahs || juzData.ayahs.length === 0) {
    return <p>No ayahs found for Juz {juzzNo}</p>;
  }

  const { number, ayahs } = juzData;

  return (
    <div className="p-5 text-right">
      <h1>Juz {number}</h1>
      <ul className="list-none p-0">
        {ayahs.map((a) => (
          <li key={a.number} className="my-2.5" style={{borderBottom:"1px solid black"}}>
            <span className="text-gray-500">
              [{a.numberInSurah}. {a.surah.englishName}]
            </span>
            <p className="my-1">{a.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
