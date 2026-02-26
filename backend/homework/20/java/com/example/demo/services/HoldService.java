package com.example.demo.services;


import com.example.demo.dto.HoldRequest;
import com.example.demo.dto.HoldResponse;
import com.example.demo.model.*;
import com.example.demo.repositories.FlightRepository;
import com.example.demo.repositories.HoldRepository;
import com.example.demo.repositories.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.Instant;
import java.time.LocalDateTime;

@Service
public class HoldService {

      private final FlightRepository flightRepository ;
      private final UserRepository userRepository  ;
      private final HoldRepository holdRepository  ;

      public HoldService(FlightRepository flightRepository , UserRepository userRepository , HoldRepository holdRepository){
            this.holdRepository = holdRepository ;
            this.flightRepository = flightRepository ;
            this.userRepository = userRepository  ;
      }


      @Transactional
      public Long createHold(HoldRequest request){
           // Object.isNull(actual value)
           if(request.getSeatCount() == null || request.getSeatCount() <= 0){
                 throw new RuntimeException("seatCount must be > 0") ;
           }

           User user = userRepository.findById(request.getUserId()).orElseThrow(() -> new RuntimeException("User not found"))  ;
           Flight flight = flightRepository.findById(request.getFlightNumber()).orElseThrow(()-> new RuntimeException("flightId not found")) ;


          Integer remainingSeats = flight.getTotalSeats();
          if (remainingSeats == null) remainingSeats = 0;

          if (request.getSeatCount() > remainingSeats) {
              throw new RuntimeException("Not enough seats available");
          }

          if (flight.getStatus() == FlightStatus.CANCELLED) {
              throw new RuntimeException("Cannot create hold: flight is cancelled");
          }
          // Update inventory immediately
          flight.setTotalSeats(remainingSeats - request.getSeatCount());
          flightRepository.save(flight);

          // Create hold record
          Hold hold = new Hold();
          hold.setUser(user);
          hold.setFlight(flight);
          hold.setSeatCount(request.getSeatCount());
          hold.setHoldStatus(HoldStatus.HOLD);
          hold.setExpiresAt(Instant.now().plus(Duration.ofMinutes(10)));
          Hold saved = holdRepository.save(hold);

          return saved.getHoldId();
          }


          public HoldResponse updateHoldAtHoldId(Long holdId , HoldRequest request){
                 Hold  preHold = holdRepository.findById(holdId).orElseThrow(() -> new RuntimeException("no such Hold present"))  ;
                 preHold.setSeatCount(request.getSeatCount());
                 return mapToResponse(preHold) ;
          }

          // ---- here we can save data to response

          private HoldResponse  mapToResponse(Hold hold){
             HoldResponse response = new HoldResponse() ;
              response.setHoldId(hold.getHoldId());
              response.setSeatCount(hold.getSeatCount());

              return response ;
          }

         public void deleteHold(Long holdId){
               Hold hold = holdRepository.findById(holdId).orElseThrow(()-> new RuntimeException("hold with this id is not present"))  ;
               Flight flight = flightRepository.findById(hold.getFlight().getFlightNumber()).orElseThrow(()-> new RuntimeException("this id is not present")) ;
                flight.setTotalSeats(flight.getTotalSeats() + hold.getSeatCount()) ;
                holdRepository.delete(hold) ;

         }

      }

      // later we can also add some limit like till when user can hold the flight








