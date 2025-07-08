"use client";

import { InputText } from "primereact/inputtext";

export default function RangeSlider({ range, onChange, max }) {
  return (
    <div style={{ display: "flex", gap: "8px" }}>
      <label>
        From:
        <InputText
          type="number"
          value={range.from}
          min={1}
          max={range.to}
          onChange={(e) => onChange({ ...range, from: Number(e.target.value) })}
          style={{ width: "60px", marginLeft: "4px" }}
        />
      </label>
      <label>
        To:
        <InputText
          type="number"
          value={range.to}
          min={range.from}
          max={max}
          onChange={(e) => onChange({ ...range, to: Number(e.target.value) })}
          style={{ width: "60px", marginLeft: "4px" }}
        />
      </label>
    </div>
  );
}