import { Link, useLocation } from "react-router-dom";
import styles from "./ConfirmationPage.module.scss";

type ConfirmationState = {
  bookingId?: string;
};

export default function ConfirmationPage() {
  const location = useLocation();
  const data = (location.state || {}) as ConfirmationState;

  return (
    <main className={styles.page}>
      <section className={styles.card}>
        <p className={styles.tag}>Booking status</p>
        <h1>Booking confirmed</h1>

        {data.bookingId ? (
          <p>
            Your booking ID is <strong>{data.bookingId}</strong>.
          </p>
        ) : (
          <p>
            We could not find a booking ID on this page. Please start a new
            booking.
          </p>
        )}

        <Link to="/" className={styles.linkButton}>
          Back to booking
        </Link>
      </section>
    </main>
  );
}
