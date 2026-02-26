package com.example.demo.dto;

import com.example.demo.model.FlightStatus;

import java.util.Date;

public class CreatedFlightResponse {
    private Long flightNumber;
    private String source;
    private String destination;
    private Date departureTime;
    private Integer totalSeats;
    private Integer allSeatCount;
    private Long updateVersion;
    private Integer ticketPrice;
    private FlightStatus status;
}
