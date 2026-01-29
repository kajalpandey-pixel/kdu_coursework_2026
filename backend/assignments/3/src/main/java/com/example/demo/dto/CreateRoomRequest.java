package com.example.demo.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter

public class CreateRoomRequest {
    private Long adminId;
    private String name;
}
