package com.example.demo.controllers;


import com.example.demo.model.Flight;
import com.example.demo.repositories.FlightRepository;
import com.example.demo.services.FlightService;
import org.springframework.beans.factory.annotation.Autowired;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/flights")
public class FlightController {


    private final FlightService flightService ;



    FlightController(FlightService flightService){
        this.flightService = flightService  ;
    }


     // now writing for admin only

//    @PreAuthorize("hasRole(ADMIN)")
    @PostMapping
    public Flight AddFlightInfo(@RequestBody Flight flight){
          return flightService.addFlightInfo(flight) ;
    }

//    @PreAuthorize("hasRole(ADMIN)")
    @PutMapping("/{id}")
    public Flight updateFlightDetails(@PathVariable Long id , @RequestBody Flight flight) {
         return flightService.updateFlightDetails(id, flight) ;
    }


     @GetMapping
     public List<Flight> getListofFlights(){
             return flightService.getAllFlightInfo() ;
     }


     // soft delete

     @DeleteMapping("/{id}")
     public void cancelFlight(@PathVariable Long id){
          flightService.cancelFlight(id) ;
     }



}
