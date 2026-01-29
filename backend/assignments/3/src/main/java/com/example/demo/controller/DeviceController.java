package com.example.demo.controller;

import com.example.demo.dto.DeviceRegistrationRequest;
import com.example.demo.dto.MoveDeviceRequest;
import com.example.demo.service.DeviceService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/devices")
public class DeviceController {

    private final DeviceService deviceService;

    public DeviceController(DeviceService deviceService) {
        this.deviceService = deviceService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody DeviceRegistrationRequest request) {
        System.out.println("Request Received: " + request);
        try {
            deviceService.registerDevice(
                    request.getKickstonId(),
                    request.getDeviceUsername(),
                    request.getDevicePassword(),
                    request.getHouseId()
            );

            return ResponseEntity.ok("Device registered successfully");

        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body("Device registration failed: " + e.getMessage());
        }
    }

    @PutMapping("/{deviceId}/move")
    public ResponseEntity<String> move(@PathVariable Long deviceId, @RequestBody MoveDeviceRequest req) {
        deviceService.moveDevice(deviceId, req.getTargetRoomId());
        return ResponseEntity.ok("Device moved");
    }


}
