import { useEffect, useMemo } from "react";
import { useAppSelector, useAppDispatch } from "../app/hook";
import { validateBooking } from "../app/utils/validateBooking";

import { useNavigate } from "react-router-dom";

import {
  setCleaningType,
  setFrequency,
  setBedrooms,
  setBathrooms,
  setHours,
  setDate,
  setTimeSlot,
  toggleExtra,
  // confirmBooking,
  // setTermsAccepted,
  

} from "../app/features/booking/bookingSlice";

import PersonalDetails from "./PersonalDetails";
import CreditCardDetails from "./CreditCardDetails";


import { submitBooking } from "../app/features/booking/bookingSlice";
import CleaningPreferences from "./CleaningPreferences";
import RoomAndHours from "./RoomAndHours";
import SchedulePicker from "./SchedulePicker";
import ExtrasOptions from "./ExtraOptions";
import BookingSummary from "./BookingSummary";
import BookingConfirmed from "./BookingConfirmed";

export default function BookYourCleaning() {
  const dispatch = useAppDispatch();
  

  
  const navigate = useNavigate();
  const config = useAppSelector((state) => state.config);
  const booking = useAppSelector((state) => state.booking);
    
  const errors = validateBooking(booking) ; 

  
  useEffect(()=>{
    if(booking.confirmed && booking.bookingId){
      navigate("/confirmation");
    }
  } , [booking.confirmed, booking.bookingId, navigate])
  const {
    cleaningTypes,
    frequencies,
    extras,
    timeSlots,
  } = config;

  const {
    cleaningTypeId,
    frequencyId,
    bedrooms,
    bathrooms,
    hours,
    date,
    timeSlotId,
    extras: selectedExtrasIds,
    confirmed,
  } = booking;

  const selectedCleaningType = useMemo(
    () => cleaningTypes.find((c) => c.id === cleaningTypeId),
    [cleaningTypes, cleaningTypeId]
  );

  const selectedFrequency = useMemo(
    () => frequencies.find((f) => f.id === frequencyId),
    [frequencies, frequencyId]
  );

  const selectedTimeSlot = useMemo(
    () => timeSlots.find((t) => t.id === timeSlotId),
    [timeSlots, timeSlotId]
  );

  const selectedExtras = useMemo(
    () => extras.filter((e) => selectedExtrasIds.includes(e.id)),
    [extras, selectedExtrasIds]
  );

  const totalPrice = useMemo(() => {
    const base = selectedCleaningType?.basePrice ?? 0;
    const extraSum = selectedExtras.reduce((sum, e) => sum + e.price, 0);
    return base + extraSum;
  }, [selectedCleaningType, selectedExtras]);

  const canConfirm =
    !!cleaningTypeId &&
    !!frequencyId &&
    !!date &&
    !!timeSlotId &&
    bedrooms > 0 &&
    bathrooms > 0 &&
    hours > 0;

  return (
    <div style={{ padding: 16 }}>
      <h2>Book Your Cleaning</h2>

      <CleaningPreferences
        cleaningTypes={cleaningTypes}
        frequencies={frequencies}
        cleaningTypeId={cleaningTypeId}
        frequencyId={frequencyId}
        onChangeCleaningType={(id) => dispatch(setCleaningType(id))}
        onChangeFrequency={(id) => dispatch(setFrequency(id))}
      />

      <RoomAndHours
        bedrooms={bedrooms}
        bathrooms={bathrooms}
        hours={hours}
        onChangeBedrooms={(n) => dispatch(setBedrooms(n))}
        onChangeBathrooms={(n) => dispatch(setBathrooms(n))}
        onChangeHours={(n) => dispatch(setHours(n))}
      />

      <SchedulePicker
        date={date}
        timeSlotId={timeSlotId}
        timeSlots={timeSlots}
        onChangeDate={(d) => dispatch(setDate(d))}
        onChangeTimeSlot={(id) => dispatch(setTimeSlot(id))}
      />

      <ExtrasOptions
        extras={extras}
        selected={selectedExtrasIds}
        onToggle={(id) => dispatch(toggleExtra(id))}
      />

      <BookingSummary
        selections={booking}
        cleaningTypeLabel={selectedCleaningType?.label ?? "-"}
        frequencyLabel={selectedFrequency?.label ?? "-"}
        timeLabel={selectedTimeSlot?.label ?? "-"}
        extrasLabels={selectedExtras.map((e) => e.label)}
        totalPrice={totalPrice}
      />   

      <PersonalDetails errors={errors} />
<CreditCardDetails errors={errors} />

      <div style={{ marginTop: 16 }}>
       

        <button
  onClick={() => dispatch(submitBooking())}
  disabled={!canConfirm || booking.submitting}
  style={{ padding: "10px 14px" }}
>
  {booking.submitting ? "Processing..." : "Complete Booking"}
</button>

      </div>

      {confirmed && <BookingConfirmed />}
    </div>
  );
}
