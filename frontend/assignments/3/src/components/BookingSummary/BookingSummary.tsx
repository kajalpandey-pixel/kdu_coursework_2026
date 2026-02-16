import styles from "./BookingSummary.module.scss";
import { useAppSelector } from "../../hooks/useAppHooks";
import {
  useGetConfigQuery,
  type CleaningTypeOption,
  type ExtraOption,
  type FrequencyOption,
  type TimeSlotOption,
} from "../../features/api/cleanlyApi";

export default function BookingSummary() {
  const booking = useAppSelector((state) => state.booking);
  const { data } = useGetConfigQuery();
  const config = data?.data;

  const cleaningName =
    config?.cleaningTypes.find(
      (item: CleaningTypeOption) => item.id === booking.cleaningType
    )?.name || "Not selected";

  const frequencyName =
    config?.frequencies.find((item: FrequencyOption) => item.id === booking.frequency)
      ?.name || "Not selected";

  const timeLabel =
    config?.timeSlots.find((item: TimeSlotOption) => item.id === booking.timeSlot)
      ?.label || "Not selected";

  const extras = booking.extras
    .map(
      (extraId) =>
        config?.extras.find((item: ExtraOption) => item.id === extraId)?.name || extraId
    )
    .join(", ");

  return (
    <aside className={styles.summary}>
      <h3>Your booking</h3>

      <div className={styles.row}>
        <span>Service</span>
        <span>{cleaningName}</span>
      </div>

      <div className={styles.row}>
        <span>Frequency</span>
        <span>{frequencyName}</span>
      </div>

      <div className={styles.row}>
        <span>Home</span>
        <span>
          {booking.bedrooms} bed, {booking.bathrooms} bath
        </span>
      </div>

      <div className={styles.row}>
        <span>Hours</span>
        <span>{booking.hours}</span>
      </div>

      <div className={styles.row}>
        <span>Date</span>
        <span>{booking.date || "Not selected"}</span>
      </div>

      <div className={styles.row}>
        <span>Start time</span>
        <span>{timeLabel}</span>
      </div>

      <div className={styles.row}>
        <span>Extras</span>
        <span>{extras || "None"}</span>
      </div>
    </aside>
  );
}
