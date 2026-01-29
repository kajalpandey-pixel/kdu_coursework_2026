package com.example.demo.controller;

import com.example.demo.dto.CreateRoomRequest;
import com.example.demo.entity.Room;
import com.example.demo.service.RoomService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/houses/{houseId}/rooms")
public class RoomController {

    private final RoomService roomService;

    public RoomController(RoomService roomService) { this.roomService = roomService; }

    @PostMapping
    public Room create(@PathVariable Long houseId, @RequestBody CreateRoomRequest req) {
        return roomService.createRoom(houseId, req.getAdminId(), req.getName());
    }

    @GetMapping
    public List<Room> list(@PathVariable Long houseId) {
        return roomService.listRooms(houseId);
    }
}

