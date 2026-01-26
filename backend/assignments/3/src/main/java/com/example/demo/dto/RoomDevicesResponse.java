package com.example.demo.dto;


import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter

public class RoomDevicesResponse {
    private Long roomId;
    private String roomName;
    private List<String> devices;
}
