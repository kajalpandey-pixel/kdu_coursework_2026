package com.example.demo.services;


import com.example.demo.dto.BookingRequest;
import com.example.demo.dto.BookingResponse;
import com.example.demo.model.*;
import com.example.demo.repositories.BookingRepository;
import com.example.demo.repositories.FlightRepository;
import com.example.demo.repositories.HoldRepository;
import org.springframework.stereotype.Service;

import java.awt.print.Book;
import java.time.LocalDateTime;

import static com.example.demo.model.HoldStatus.BOOKED;

@Service
public class BookingService {

    private final BookingRepository bookingRepository ;
    private final HoldRepository holdRepository ;
    private final FlightRepository flightRepository;

    BookingService(BookingRepository bookingRepository , HoldRepository holdRepository, FlightRepository flightRepository){
        this.flightRepository = flightRepository ;
         this.bookingRepository = bookingRepository ;
         this.holdRepository= holdRepository ;
    }


    public BookingResponse confirmBooking(long holdId){
          Hold hold = holdRepository.findById(holdId).orElseThrow(() -> new RuntimeException("no such holdId present "))  ;


          if(hold.getHoldStatus() == BOOKED){
                throw new RuntimeException("already booked") ;
           }
          if(hold.getHoldStatus() == HoldStatus.CANCELLED){
             throw new RuntimeException("This is already cancelled ") ;
          }

        if (hold.getHoldStatus() != HoldStatus.HOLD) {
            throw new RuntimeException("Invalid status transition");
        }
        Flight flight = hold.getFlight();
        if (flight.getStatus() == FlightStatus.CANCELLED) {
            throw new RuntimeException("Cannot confirm booking: flight is cancelled");
        }
          hold.setHoldStatus(BOOKED);
          holdRepository.save(hold) ;
          // here i am enforcing status to be BOOKED
          Booking booking =  new Booking() ;
          booking.setHold(hold) ;

        booking.setUser(hold.getUser());
        booking.setFlight(hold.getFlight());

        booking.setTransactionId(System.currentTimeMillis()); // simple unique id for now
        booking.setTransactionDate(LocalDateTime.now());


        booking.setStatus(HoldStatus.BOOKED);
        Booking saved = bookingRepository.save(booking);
        return new BookingResponse(

                saved.getBookingId(),
                saved.getStatus(),
                saved.getTransactionId(),
                saved.getTransactionDate()
        );

    }

      public void cancelBooking(Long bookingId){
          Booking booking = bookingRepository.findById(bookingId).orElseThrow(()-> new RuntimeException("no such booking ID present "))  ;

          if(booking.getStatus() == HoldStatus.CANCELLED)
          {
              throw new RuntimeException("already cancelled") ;
          }

          if(booking.getStatus() != HoldStatus.BOOKED){
               throw new RuntimeException("invalid request as this booking is never booked")  ;

          }
          Flight flight = booking.getFlight();
          Hold hold = booking.getHold();

          int seatsToRestore = hold.getSeatCount();

          // making number of seats consistent ;
          flight.setTotalSeats(flight.getTotalSeats() + seatsToRestore);
          flightRepository.save(flight);

          booking.setStatus(HoldStatus.CANCELLED);
          bookingRepository.save(booking);
      }
}
