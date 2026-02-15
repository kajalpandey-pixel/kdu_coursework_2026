import type { TimeSlot } from "../app/features/config/configTypes";

type Props = {
  date: string;
  timeSlotId: string;
  timeSlots: TimeSlot[];
  onChangeDate: (d: string) => void;
  onChangeTimeSlot: (id: string) => void;
};

export default function SchedulePicker({
  date,
  timeSlotId,
  timeSlots,
  onChangeDate,
  onChangeTimeSlot,
}: Props) {
  return (
    <div style={{ marginTop: 12 }}>
      <div>
        <label>Date</label>
        <br />
        <input type="date" value={date} onChange={(e) => onChangeDate(e.target.value)} />
      </div>

      <div style={{ marginTop: 12 }}>
        <label>Start time</label>
        <br />
        <select value={timeSlotId} onChange={(e) => onChangeTimeSlot(e.target.value)}>
          <option value="">Select</option>
          {timeSlots.map((t) => (
            <option key={t.id} value={t.id} disabled={!t.available}>
              {t.label} {!t.available ? "(Unavailable)" : ""}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
