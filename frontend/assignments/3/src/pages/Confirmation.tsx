

import { useAppSelector } from "../app/hook";

export default function Confirmation() {
  const booking = useAppSelector((state) => state.booking);


if(booking.submitting){
     return <div>Processing your booking...</div>
}
if(!booking.bookingId){
    return <div>No booking ID available</div>
}

return (
     <div>
        <h2>Booking Confirmed</h2>
        <p>Your booking ID is: {booking.bookingId}</p>
     </div>
)

  
}

