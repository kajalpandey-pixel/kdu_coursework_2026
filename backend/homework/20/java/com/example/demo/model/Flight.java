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
    private String source ;
    private String destination ;
    private Date departureTime ;
    // this is available seats here
    private Integer totalSeats ;

    @Column
    private Integer allSeatCount ;

    @Version
    private Long updateVersion ;

    private Integer ticketPrice ;

    @Column
    @Enumerated(EnumType.STRING)
    private FlightStatus status = FlightStatus.ACTIVE;


}
