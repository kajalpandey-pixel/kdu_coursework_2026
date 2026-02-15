type Props = {
  bedrooms: number;
  bathrooms: number;
  hours: number;
  onChangeBedrooms: (n: number) => void;
  onChangeBathrooms: (n: number) => void;
  onChangeHours: (n: number) => void;
};

export default function RoomAndHours({
  bedrooms,
  bathrooms,
  hours,
  onChangeBedrooms,
  onChangeBathrooms,
  onChangeHours,
}: Props) {
  return (
    <div style={{ marginTop: 12 }}>
      <div>
        <label>Bedrooms</label>
        <br />
        <input type="number" min={1} value={bedrooms} onChange={(e) => onChangeBedrooms(Number(e.target.value))} />
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Bathrooms</label>
        <br />
        <input type="number" min={1} value={bathrooms} onChange={(e) => onChangeBathrooms(Number(e.target.value))} />
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Hours</label>
        <br />
        <input type="number" min={1} value={hours} onChange={(e) => onChangeHours(Number(e.target.value))} />
      </div>
    </div>
  );
}
