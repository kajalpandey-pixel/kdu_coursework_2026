package com.example.demo.dto;


import com.example.demo.model.BookingStatus;
import com.example.demo.model.HoldStatus;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
@AllArgsConstructor
public class BookingResponse {

    private Long BookingId ;

    private HoldStatus bookingStatus ;
    private Long  transactionId ;
    private LocalDateTime transactionDate ;


 }
