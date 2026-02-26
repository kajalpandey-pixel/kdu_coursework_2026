package com.example.demo.model;


import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "booking")
@AllArgsConstructor
@NoArgsConstructor
@Setter
@Getter
public class Booking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long bookingId ;
    private Long transactionId ;
    // this is because one booking will have one transactionID  ;
    private LocalDateTime transactionDate ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "userId")
    private User user ;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "flightNumber")
    private Flight flight  ;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "holdId")
    private Hold hold ;

    @Enumerated(EnumType.STRING)
    @Column(name="bookingStatus")
    private HoldStatus status ;


    public void setBookingStatus(BookingStatus bookingStatus) {
    }
}
