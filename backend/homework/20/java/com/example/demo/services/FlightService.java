package com.example.demo.services;


import com.example.demo.model.*;
import com.example.demo.repositories.BookingRepository;
import com.example.demo.repositories.FlightRepository;

import com.example.demo.repositories.HoldRepository;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.orm.ObjectOptimisticLockingFailureException;
import org.springframework.stereotype.Service;

import java.awt.print.Book;

import java.util.List;

@Service
public class FlightService {


    private final FlightRepository flightRepository  ;
    private final HoldRepository holdRepository ;
    private final BookingRepository bookingRepository ;


    public FlightService(BookingRepository bookingRepository , HoldRepository holdRepository ,FlightRepository flightRepository){
        this.flightRepository = flightRepository ;
        this.holdRepository = holdRepository  ;
        this.bookingRepository = bookingRepository ;
    }


    public List<Flight> getAllFlightInfo(Pageable pageable) {
        return flightRepository.findAll(pageable).getContent(); // Calls the repository method
    }

    public Flight addFlightInfo(Flight flight){
        return flightRepository.save(flight) ;
    }

    public void updateFlightDetails(Long id , Flight flight){
        try {
            Flight prevFlight = flightRepository.findById(id).orElseThrow(() -> new RuntimeException("id not found"));
            prevFlight.setSource(flight.getSource());
            prevFlight.setDestination(flight.getDestination());
            prevFlight.setDepartureTime(flight.getDepartureTime());
            prevFlight.setTotalSeats(flight.getTotalSeats());
            prevFlight.setAllSeatCount(flight.getTotalSeats());
            prevFlight.setTicketPrice(flight.getTicketPrice());
            prevFlight.setStatus(flight.getStatus());
            // we can also save here , this content to flightRepo but in optimistic locking
            // it is not required


        } catch (ObjectOptimisticLockingFailureException e) {
            throw new RuntimeException("Flight was updated by another transaction. Please retry.");
        }



        // while using optimistic locking , we do not need to explicitly mention save .
//        return flightRepository.save(prevFlight);
    }




     @Transactional
     public void cancelFlight(Long flightId){
        Flight flight  = flightRepository.findById(flightId).orElseThrow(() -> new RuntimeException("no such flightId present"))  ;

        if(flight.getStatus() == FlightStatus.CANCELLED){
            throw new RuntimeException("Flight is already Cancelled")  ;
        }

        flight.setStatus(FlightStatus.CANCELLED);

        // now if this is cancelled , all holds must be cancelled
          List<Hold> hold = holdRepository.findByFlightFlightNumberAndHoldStatus(flightId , HoldStatus.HOLD);


          // as this is a soft delete , so we are preserving the information
          int restoreSeats = hold.stream().mapToInt(Hold::getSeatCount).sum()  ;
          for(Hold holds : hold){
               holds.setHoldStatus(HoldStatus.CANCELLED);
          }
          holdRepository.saveAll(hold)  ;


          //similarly for booking we will do ,
         List<Booking> bookings = bookingRepository.findByFlightFlightNumberAndBookingStatus(flightId , BookingStatus.BOOKED)  ;

         int bookedRestore =  bookings.stream().mapToInt(b ->  b.getHold().getSeatCount()).sum()  ;
          flight.setTotalSeats(flight.getTotalSeats() + bookedRestore);

          for(Booking booking : bookings){
                booking.setBookingStatus(BookingStatus.CANCELLED);
          }
          bookingRepository.saveAll(bookings) ;
          flightRepository.save(flight) ;

     }

}
