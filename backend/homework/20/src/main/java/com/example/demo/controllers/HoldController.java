package com.example.demo.controllers;


import com.example.demo.dto.HoldRequest;
import com.example.demo.dto.HoldResponse;
import com.example.demo.repositories.FlightRepository;
import com.example.demo.services.FlightService;
import com.example.demo.services.HoldService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.net.Authenticator;

@RestController
@RequestMapping("/holds")


// this is only for user
public class HoldController {


     private final HoldService holdService ;
     @Autowired
    HoldController(HoldService holdService){
         this.holdService = holdService ;

     }





     @PostMapping
     public HoldResponse createHold(@RequestBody HoldRequest request) {
         Long holdId = holdService.createHold(request);

         return new  HoldResponse(holdId , request.getSeatCount());
     }

     @PutMapping("/{holdId}")
    public HoldResponse updateHold(@PathVariable Long holdId , @RequestBody HoldRequest request){
           return holdService.updateHoldAtHoldId(holdId , request) ;
     }

     @DeleteMapping("/{holdId}")
    public void  deleteHold(@PathVariable Long holdId){
            holdService.deleteHold(holdId) ;
     }



}
