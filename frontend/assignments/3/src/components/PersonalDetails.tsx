import { useAppSelector, useAppDispatch } from "../app/hook" 
import { setPersonalDetails } from "../app/features/booking/bookingSlice"
type Props = {
  errors: Record<string, string>;
};

export default function PersonalDetails({ errors }: Props) {
  const dispatch = useAppDispatch();
  const booking = useAppSelector((state) => state.booking);

  const handleChange = (field: string, value: string) => {
    dispatch(setPersonalDetails({ field, value }));
  };

  return (
    <div style={{ marginTop: 20 }}>
      <h3>Personal Details</h3>

      <div>
        <input
          type="text"
          placeholder="Full Name"
          value={booking.fullName || ""}
          onChange={(e) => handleChange("fullName", e.target.value)}
        />
        {errors.fullName && <p style={{ color: "red" }}>{errors.fullName}</p>}
      </div>

      <div>
        <input
          type="email"
          placeholder="Email"
          value={booking.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
        />
        {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Phone"
          value={booking.phone || ""}
          onChange={(e) => handleChange("phone", e.target.value)}
        />
        {errors.phone && <p style={{ color: "red" }}>{errors.phone}</p>}
      </div>

      <div>
        <input
          type="text"
          placeholder="Address"
          value={booking.address || ""}
          onChange={(e) => handleChange("address", e.target.value)}
        />
        {errors.address && <p style={{ color: "red" }}>{errors.address}</p>}
      </div>
    </div>
  );
}
