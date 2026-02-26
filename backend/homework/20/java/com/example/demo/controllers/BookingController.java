package com.example.demo.controllers;


import com.example.demo.dto.BookingRequest;
import com.example.demo.dto.BookingResponse;
import com.example.demo.services.BookingService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/bookings")

public class BookingController {

      private final BookingService bookingService ;

      BookingController(BookingService bookingService){
            this.bookingService = bookingService ;
      }



      @PostMapping("/confirm")
      public BookingResponse confirmBooking(@RequestBody BookingRequest request){
            if (request.getHoldId() == null) {
                  throw new RuntimeException("holdId is required");
            }
              return  bookingService.confirmBooking(request.getHoldId()) ;
      }


      @DeleteMapping("/{bookingId}")
      public void deleteBooking(@PathVariable Long bookingId){
            bookingService.cancelBooking(bookingId) ;

      }

}
