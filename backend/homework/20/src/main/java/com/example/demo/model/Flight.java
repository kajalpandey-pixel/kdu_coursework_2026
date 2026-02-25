package com.example.demo.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.DateTimeException;
import java.util.Date;

@Entity
@Table(name = "flight")
@Data
@Getter
@Setter
public class Flight {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private  Long flightNumber ;
    private String Source ;
    private String Destination ;
    private Date DepartureTime ;
    // this is available seats here
    private Integer TotalSeats ;


    private Integer AllSeatCount = TotalSeats ;


    private boolean isBooked ;
    private Integer ticketPrice ;

    @Enumerated(EnumType.STRING)
    private FlightStatus status = FlightStatus.ACTIVE;


}
