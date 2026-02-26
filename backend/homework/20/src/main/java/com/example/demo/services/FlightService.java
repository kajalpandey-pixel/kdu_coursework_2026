package com.example.demo.services;


import com.example.demo.model.*;
import com.example.demo.repositories.BookingRepository;
import com.example.demo.repositories.FlightRepository;

import com.example.demo.repositories.HoldRepository;
import jakarta.transaction.Transactional;
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


    public List<Flight> getAllFlightInfo() {
        return flightRepository.findAll(); // Calls the repository method
    }

    public Flight addFlightInfo(Flight flight){
        return flightRepository.save(flight) ;
    }

    public Flight updateFlightDetails(Long id , Flight flight){
          Flight prevFlight = flightRepository.findById(id).orElseThrow(() -> new RuntimeException("id not found"))  ;
          prevFlight.setSource(flight.getSource());
        prevFlight.setDestination(flight.getDestination());
         prevFlight.setDepartureTime(flight.getDepartureTime());
        prevFlight.setTotalSeats(flight.getTotalSeats());
        prevFlight.setTicketPrice(flight.getTicketPrice());
        prevFlight.setBooked(flight.isBooked());

        return flightRepository.save(prevFlight);
    }




     @Transactional
     public void cancelFlight(Long flightId){
        Flight flight  = flightRepository.findById(flightId).orElseThrow(() -> new RuntimeException("no such flightId present"))  ;

        if(flight.getStatus() == FlightStatus.CANCELLED){
            throw new RuntimeException("Flight already Cancel")  ;
        }

        flight.setStatus(FlightStatus.CANCELLED);

        // now if this is cancelled , all holds must be cancelled
          List<Hold> hold = holdRepository.findByFlightFlightNumberAndHoldStatus(flightId , HoldStatus.HOLD);


          // as this is a soft delete , so we are preserving the information
          int restoreSeats = hold.stream().mapToInt(Hold::getSeatCount).sum()  ;
          for(Hold h : hold){
               h.setHoldStatus(HoldStatus.CANCELLED);
          }
          holdRepository.saveAll(hold)  ;


          //similarly for booking we will do ,
         List<Booking> bookings = bookingRepository.findByFlightFlightNumberAndBookingStatus(flightId , BookingStatus.BOOKED)  ;

         int bookedRestore =  bookings.stream().mapToInt(b ->  b.getHold().getSeatCount()).sum()  ;
          flight.setTotalSeats(flight.getTotalSeats() + bookedRestore);

          for(Booking b : bookings){
                b.setBookingStatus(BookingStatus.CANCELLED);
          }
          bookingRepository.saveAll(bookings) ;
          flightRepository.save(flight) ;

     }

}
