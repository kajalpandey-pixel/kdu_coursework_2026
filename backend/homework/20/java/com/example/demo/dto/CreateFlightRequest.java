package com.example.demo.dto;


import jakarta.persistence.Column;
import jakarta.persistence.Version;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Data
@Getter
@Setter
public class CreateFlightRequest {

    private Integer flightNumber ;
    private String source ;
    private String destination ;

    // this is available seats here
    private Integer totalSeats ;


    private Integer allSeatCount ;



    private Integer ticketPrice ;


}
