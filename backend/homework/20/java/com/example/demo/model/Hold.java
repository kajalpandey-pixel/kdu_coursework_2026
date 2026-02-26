package com.example.demo.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;

@Entity
@Table(name = "hold")
@Data
@Setter
@Getter

public class Hold {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long holdId ;

   // hold will have manyto one  relationship with the user
    // and it will have many to one   relationship with the flight
    // because single flight can have multiple holds

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name= "userId")
    private User user  ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flightNumber" )
    private Flight flight ;

    private Integer seatCount ;
    @Enumerated(EnumType.STRING)
    @Column(name = "holdStatus")
    private HoldStatus holdStatus ;


    @Column(nullable = false)
    private Instant expiresAt  ;



}
