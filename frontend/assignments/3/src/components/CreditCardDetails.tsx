import { useAppSelector, useAppDispatch } from "../app/hook";
import { setCardField } from "../app/features/booking/bookingSlice";
type Props = {
  errors: Record<string, string>;
};

export default function CreditCardDetails({ errors }: Props) {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.booking);

  const handleChange = (field: string, value: string) => {
    dispatch(setCardField({ field, value }));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Credit Card Details</h3>

      <div>
        <input
          type="text"
          placeholder="Card Number"
          value={booking.cardNumber || ""}
          onChange={(e) => handleChange("cardNumber", e.target.value)}
        />
        {errors.cardNumber && <p style={{ color: "red" }}>{errors.cardNumber}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Name on Card"
          value={booking.cardName || ""}
          onChange={(e) => handleChange("cardName", e.target.value)}
        />
        {errors.cardName && <p style={{ color: "red" }}>{errors.cardName}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Expiry Month"
          value={booking.expiryMonth || ""}
          onChange={(e) => handleChange("expiryMonth", e.target.value)}
        />
        {errors.expiryMonth && <p style={{ color: "red" }}>{errors.expiryMonth}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Expiry Year"
          value={booking.expiryYear || ""}
          onChange={(e) => handleChange("expiryYear", e.target.value)}
        />
        {errors.expiryYear && <p style={{ color: "red" }}>{errors.expiryYear}</p>}
      </div>

      <div>
        <input
          type="password"
          placeholder="CVV"
          value={booking.cvv || ""}
          onChange={(e) => handleChange("cvv", e.target.value)}
        />
        {errors.cvv && <p style={{ color: "red" }}>{errors.cvv}</p>}
      </div>
    </div>
  );
}
