package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UpdateHouseAddressRequest {
    private Long adminId;
    private String address;
}
