import type { CleaningType, Frequency } from "../app/features/config/configTypes";

type Props = {
  cleaningTypes: CleaningType[];
  frequencies: Frequency[];
  cleaningTypeId: string;
  frequencyId: string;
  onChangeCleaningType: (id: string) => void;
  onChangeFrequency: (id: string) => void;
};

export default function CleaningPreferences({
  cleaningTypes,
  frequencies,
  cleaningTypeId,
  frequencyId,
  onChangeCleaningType,
  onChangeFrequency,
}: Props) {
  return (
    <div style={{ marginTop: 12 }}>
      <div>
        <label>Type of cleaning</label>
        <br />
        <select value={cleaningTypeId} onChange={(e) => onChangeCleaningType(e.target.value)}>
          <option value="">Select</option>
          {cleaningTypes.map((t) => (
            <option key={t.id} value={t.id}>
              {t.label} (₹{t.basePrice})
            </option>
          ))}
        </select>
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Cleaning frequency</label>
        <br />
        <select value={frequencyId} onChange={(e) => onChangeFrequency(e.target.value)}>
          <option value="">Select</option>
          {frequencies.map((f) => (
            <option key={f.id} value={f.id}>
              {f.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
