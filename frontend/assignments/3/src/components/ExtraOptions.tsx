import type { Extra } from "../app/features/config/configTypes";

type Props = {
  extras: Extra[];
  selected: string[];
  onToggle: (id: string) => void;
};

export default function ExtrasOptions({ extras, selected, onToggle }: Props) {
  return (
    <div style={{ marginTop: 12 }}>
      <label>Extra options</label>

      <div style={{ marginTop: 8 }}>
        {extras.map((ex) => {
          const checked = selected.includes(ex.id);
          return (
            <label key={ex.id} style={{ display: "block", marginTop: 6 }}>
              <input type="checkbox" checked={checked} onChange={() => onToggle(ex.id)} />
              {"  "}
              {ex.label} (Rs{ex.price})
            </label>
          );
        })}
      </div>
    </div>
  );
}
