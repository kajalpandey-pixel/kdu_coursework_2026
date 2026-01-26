package com.example.demo.controller;


import com.example.demo.dto.AddUserRequest;
import com.example.demo.dto.CreateHouseRequest;
import com.example.demo.dto.RoomDevicesResponse;
import com.example.demo.service.HouseService;
import com.example.demo.service.RoomService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/houses")
public class HouseController {


    private final HouseService houseService ;
    private final RoomService roomService ;
    public HouseController(HouseService houseService , RoomService roomService){
        this.houseService = houseService  ;
        this.roomService = roomService ;
    }


    @PostMapping
    public ResponseEntity<String>createHouse(@RequestBody CreateHouseRequest request){
            houseService.createHouse(request.getUserId() , request.getAddress()) ;
            return ResponseEntity.ok("House is created ") ;
    }


    // now adding users to house ;;

    @PostMapping("/{houseId}/users")
    public ResponseEntity<String> addUser(@PathVariable Long houseId , @RequestBody AddUserRequest request){
        houseService.addUserToHouse(houseId , request.getAdminId() , request.getUserId())  ;

        return ResponseEntity.ok("User is added")  ;
    }


    @GetMapping("/houses/{houseId}/rooms-devices")
    public List<RoomDevicesResponse> roomsDevices(@PathVariable Long houseId) {
        return roomService.listRoomsWithDevices(houseId);
    }


    @PutMapping("/{houseId}/address")
    public String updateAddress(@PathVariable Long houseId,
                                @RequestBody com.example.demo.dto.UpdateHouseAddressRequest req) {
        return houseService.updateHouseAddress(houseId, req.getAdminId(), req.getAddress());
    }

    @PutMapping("/{houseId}/transfer")
    public String transfer(@PathVariable Long houseId,
                           @RequestBody com.example.demo.dto.TransferOwnershipRequest req) {
        return houseService.transferOwnership(houseId, req.getAdminId(), req.getNewAdminId());
    }

}
