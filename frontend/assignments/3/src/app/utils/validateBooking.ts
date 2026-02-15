import { type  BookingDetails } from "../features/booking/bookingSlice";

export const validateBooking = (booking: BookingDetails) => {
  const errors: Record<string, string> = {};

  // Basic selections
  if (!booking.cleaningTypeId) errors.cleaningTypeId = "Required";
  if (!booking.frequencyId) errors.frequencyId = "Required";
  if (!booking.date) errors.date = "Required";
  if (!booking.timeSlotId) errors.timeSlotId = "Required";

  // Personal Details
  if (!booking.fullName?.trim()) errors.fullName = "Full name required";
  if (!booking.email?.trim()) errors.email = "Email required";
  if (!booking.phone?.trim()) errors.phone = "Phone required";
  if (!booking.address?.trim()) errors.address = "Address required";

  // Card Details
  if (!booking.cardNumber?.trim()) errors.cardNumber = "Card number required";
  if (!booking.cardName?.trim()) errors.cardName = "Card name required";
  if (!booking.expiryMonth) errors.expiryMonth = "Required";
  if (!booking.expiryYear) errors.expiryYear = "Required";
  if (!booking.cvv?.trim()) errors.cvv = "CVV required";

  if (!booking.termsAccepted) errors.termsAccepted = "Accept terms";

  return errors;
};
