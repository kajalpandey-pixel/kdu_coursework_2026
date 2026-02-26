package com.example.demo.dto;


import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Getter
@Setter
public class HoldRequest {

    private Long userId ;
    private Long flightNumber ;
    private Integer seatCount ;


}
