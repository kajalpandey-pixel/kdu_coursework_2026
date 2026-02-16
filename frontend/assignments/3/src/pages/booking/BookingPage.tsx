import {
  useGetConfigQuery,
  useCreateBookingMutation,
  type CleaningTypeOption,
  type ExtraOption,
  type FrequencyOption,
  type TimeSlotOption,
} from "../../features/api/cleanlyApi";
import { useAppDispatch, useAppSelector } from "../../hooks/useAppHooks";
import { setField, toggleExtra } from "../../features/booking/bookingSlice";
import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import Header from "../../components/header/Header";
import BookingSummary from "../../components/BookingSummary/BookingSummary";
import styles from "./BookingPage.module.scss";

export default function BookingPage() {
  const { data, isLoading } = useGetConfigQuery();
  const [createBooking, { isLoading: bookingLoading }] =
    useCreateBookingMutation();
  const booking = useAppSelector((state) => state.booking);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  const config = data?.data;
  const minDate = new Date().toISOString().split("T")[0];

  const totalPrice = useMemo(() => {
    if (!config) return 0;

    const cleaning = config.cleaningTypes.find(
      (item: CleaningTypeOption) => item.id === booking.cleaningType
    );

    const base = cleaning?.basePrice || 0;

    const extrasTotal = booking.extras.reduce((acc, id) => {
      const extra = config.extras.find((item: ExtraOption) => item.id === id);
      return acc + (extra?.price || 0);
    }, 0);

    return base + extrasTotal;
  }, [booking.cleaningType, booking.extras, config]);

  const isFormValid =
    booking.cleaningType &&
    booking.frequency &&
    booking.bedrooms > 0 &&
    booking.bathrooms > 0 &&
    booking.hours > 0 &&
    booking.date &&
    booking.timeSlot &&
    booking.cardNumber &&
    booking.expiry &&
    booking.cvv &&
    booking.cardName &&
    booking.name &&
    booking.email &&
    booking.phone &&
    booking.address &&
    booking.termsAccepted;

  const handleSubmit = async () => {
    if (!isFormValid) return;
    setFormError("");

    try {
      const response = await createBooking({
        customer: {
          name: booking.name,
          email: booking.email,
          phone: booking.phone,
          address: booking.address,
        },
        cleaningDetails: booking,
        pricing: {
          finalPrice: totalPrice,
        },
      }).unwrap();

      navigate("/confirmation", { state: response });
    } catch {
      setFormError("Could not place booking right now. Please try again.");
    }
  };

  if (isLoading) {
    return <h2 className={styles.statusMessage}>Loading options...</h2>;
  }

  if (!config) {
    return (
      <h2 className={styles.statusMessage}>Could not load booking options.</h2>
    );
  }

  return (
    <div>
      <Header />

      <div className={styles.container}>
        <div className={styles.hero}>
          <p className={styles.eyebrow}>Home cleaning made easy</p>
          <h1>Set up your visit in a few quick steps</h1>
          <p>
            Pick your service, choose a day, and share your details. We take care
            of the rest.
          </p>
        </div>

        <div className={styles.mainContent}>
          <div className={styles.formSection}>
            <h2 className={styles.sectionTitle}>Cleaning details</h2>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>What kind of cleaning do you need?</label>
              <div className={styles.buttonGroup}>
                {config.cleaningTypes.map((cleaningType: CleaningTypeOption) => (
                  <button
                    key={cleaningType.id}
                    type="button"
                    className={
                      booking.cleaningType === cleaningType.id ? styles.active : ""
                    }
                    onClick={() =>
                      dispatch(
                        setField({ field: "cleaningType", value: cleaningType.id })
                      )
                    }
                  >
                    {cleaningType.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>How often should we come?</label>
              <div className={styles.buttonGroup}>
                {config.frequencies.map((frequency: FrequencyOption) => (
                  <button
                    key={frequency.id}
                    type="button"
                    className={booking.frequency === frequency.id ? styles.active : ""}
                    onClick={() =>
                      dispatch(setField({ field: "frequency", value: frequency.id }))
                    }
                  >
                    {frequency.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Home size</label>
              <div className={styles.roomsGrid}>
                <div className={styles.roomCounter}>
                  <div className={styles.icon}>Bed</div>
                  <span className={styles.roomLabel}>Bedrooms</span>
                  <div className={styles.counterControls}>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          setField({
                            field: "bedrooms",
                            value: Math.max(0, booking.bedrooms - 1),
                          })
                        )
                      }
                    >
                      -
                    </button>
                    <span className={styles.count}>{booking.bedrooms}</span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          setField({
                            field: "bedrooms",
                            value: booking.bedrooms + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>

                <div className={styles.roomCounter}>
                  <div className={styles.icon}>Bath</div>
                  <span className={styles.roomLabel}>Bathrooms</span>
                  <div className={styles.counterControls}>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          setField({
                            field: "bathrooms",
                            value: Math.max(0, booking.bathrooms - 1),
                          })
                        )
                      }
                    >
                      -
                    </button>
                    <span className={styles.count}>{booking.bathrooms}</span>
                    <button
                      type="button"
                      onClick={() =>
                        dispatch(
                          setField({
                            field: "bathrooms",
                            value: booking.bathrooms + 1,
                          })
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Add extra help</label>
              <div className={styles.extrasGrid}>
                {config.extras.map((extra: ExtraOption) => (
                  <button
                    key={extra.id}
                    type="button"
                    className={booking.extras.includes(extra.id) ? styles.active : ""}
                    onClick={() => dispatch(toggleExtra(extra.id))}
                  >
                    <span className={styles.icon}>+</span>
                    {extra.name}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Notes for the cleaner (optional)</label>
              <textarea
                className={styles.textarea}
                placeholder="Gate code, parking details, pets, or anything else we should know"
                value={booking.specialRequirements}
                onChange={(e) =>
                  dispatch(
                    setField({ field: "specialRequirements", value: e.target.value })
                  )
                }
              />
            </div>

            <h2 className={styles.sectionTitle}>Date and time</h2>

            <div className={styles.dateTimeSection}>
              <div className={styles.inputGroup}>
                <label>How many hours?</label>
                <input
                  type="number"
                  min="1"
                  value={booking.hours}
                  onChange={(e) =>
                    dispatch(
                      setField({
                        field: "hours",
                        value: Math.max(1, Number(e.target.value) || 1),
                      })
                    )
                  }
                />
              </div>

              <div className={styles.inputGroup}>
                <label>Pick a date</label>
                <input
                  type="date"
                  min={minDate}
                  value={booking.date}
                  onChange={(e) =>
                    dispatch(setField({ field: "date", value: e.target.value }))
                  }
                />
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label}>Pick a start time</label>
              <div className={styles.timeSlots}>
                {config.timeSlots.map((timeSlot: TimeSlotOption) => (
                  <button
                    key={timeSlot.id}
                    type="button"
                    disabled={!timeSlot.available}
                    className={booking.timeSlot === timeSlot.id ? styles.active : ""}
                    onClick={() =>
                      dispatch(setField({ field: "timeSlot", value: timeSlot.id }))
                    }
                  >
                    {timeSlot.label}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.paymentSection}>
              <h2 className={styles.sectionTitle}>Payment details</h2>
              <p className={styles.secureLabel}>
                Your card info is sent over a secure connection.
              </p>

              <div className={styles.fieldGroup}>
                <label className={styles.label}>Card details</label>
                <div className={styles.cardInputs}>
                  <input
                    placeholder="Card number"
                    value={booking.cardNumber}
                    onChange={(e) =>
                      dispatch(setField({ field: "cardNumber", value: e.target.value }))
                    }
                  />
                  <div className={styles.cardRow}>
                    <input
                      placeholder="MM/YY"
                      value={booking.expiry}
                      onChange={(e) =>
                        dispatch(setField({ field: "expiry", value: e.target.value }))
                      }
                    />
                    <input
                      placeholder="CVV"
                      value={booking.cvv}
                      onChange={(e) =>
                        dispatch(setField({ field: "cvv", value: e.target.value }))
                      }
                    />
                    <input
                      placeholder="Name on card"
                      value={booking.cardName}
                      onChange={(e) =>
                        dispatch(setField({ field: "cardName", value: e.target.value }))
                      }
                    />
                  </div>
                </div>
              </div>
            </div>

            <h2 className={styles.sectionTitle}>Your contact details</h2>

            <div className={styles.fieldGroup}>
              <div className={styles.personalInputs}>
                <input
                  placeholder="Email address"
                  type="email"
                  value={booking.email}
                  onChange={(e) =>
                    dispatch(setField({ field: "email", value: e.target.value }))
                  }
                />
                <input
                  placeholder="Phone number"
                  type="tel"
                  value={booking.phone}
                  onChange={(e) =>
                    dispatch(setField({ field: "phone", value: e.target.value }))
                  }
                />
                <input
                  placeholder="Full name"
                  value={booking.name}
                  onChange={(e) =>
                    dispatch(setField({ field: "name", value: e.target.value }))
                  }
                />
                <div className={styles.addressRow}>
                  <input
                    placeholder="Full address"
                    value={booking.address}
                    onChange={(e) =>
                      dispatch(setField({ field: "address", value: e.target.value }))
                    }
                  />
                  <input
                    placeholder="ZIP code"
                    value={booking.zipCode}
                    onChange={(e) =>
                      dispatch(setField({ field: "zipCode", value: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>

            <div className={styles.termsSection}>
              <label>
                <input
                  type="checkbox"
                  checked={booking.termsAccepted}
                  onChange={(e) =>
                    dispatch(
                      setField({
                        field: "termsAccepted",
                        value: e.target.checked,
                      })
                    )
                  }
                />
                <span>
                  I agree to the{" "}
                  <a href="/terms" target="_blank" rel="noreferrer">
                    terms and conditions
                  </a>
                </span>
              </label>
            </div>

            {formError && <p className={styles.errorMessage}>{formError}</p>}

            <div className={styles.totalPrice}>
              Estimated total <span className={styles.amount}>${totalPrice}</span>
            </div>

            <button
              className={styles.submitButton}
              disabled={!isFormValid || bookingLoading}
              onClick={handleSubmit}
            >
              {bookingLoading ? "Placing booking..." : "Book now"}
            </button>
          </div>

          <BookingSummary />
        </div>
      </div>
    </div>
  );
}
