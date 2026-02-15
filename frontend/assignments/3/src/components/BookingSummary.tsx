



import type { BookingState } from "../app/features/booking/bookingSlice";

type Props = {
  selections: BookingState;
  cleaningTypeLabel: string;
  frequencyLabel: string;
  timeLabel: string;
  extrasLabels: string[];
  totalPrice: number;
};

export default function BookingSummary({
  selections,
  cleaningTypeLabel,
  frequencyLabel,
  timeLabel,
  extrasLabels,
  totalPrice,
}: Props) {
  return (
    <div style={{ marginTop: 16, padding: 12, border: "1px solid #ddd" }}>
      <h3>Summary</h3>
      <div>Cleaning: {cleaningTypeLabel}</div>
      <div>Frequency: {frequencyLabel}</div>
      <div>
        Rooms: {selections.bedrooms} bed, {selections.bathrooms} bath
      </div>
      <div>Hours: {selections.hours}</div>
      <div>Date: {selections.date || "-"}</div>
      <div>Start time: {timeLabel}</div>
      <div>Extras: {extrasLabels.length ? extrasLabels.join(", ") : "-"}</div>

      <div style={{ marginTop: 8, fontWeight: 700 }}>Total: ₹{totalPrice}</div>
    </div>
  );
}
