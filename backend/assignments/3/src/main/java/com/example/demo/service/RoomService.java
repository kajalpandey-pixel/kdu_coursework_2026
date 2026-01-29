package com.example.demo.service;

import com.example.demo.dto.RoomDevicesResponse;
import com.example.demo.entity.Device;
import com.example.demo.entity.House;
import com.example.demo.entity.Room;
import com.example.demo.repository.HouseRepository;
import com.example.demo.repository.RoomRepository;
import com.example.demo.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Getter
@Setter
@Service
public class RoomService {
    private final HouseRepository houseRepo;
    private final UserRepository userRepo;
    private final RoomRepository roomRepo;

    public RoomService(HouseRepository houseRepo, UserRepository userRepo, RoomRepository roomRepo) {
        this.houseRepo = houseRepo;
        this.userRepo = userRepo;
        this.roomRepo = roomRepo;
    }

    public Room createRoom(Long houseId, Long adminId, String name) {
        House house = houseRepo.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found"));

        if (!house.getAdmin().getId().equals(adminId)) {
            throw new RuntimeException("Only admin can create rooms");
        }

        Room room = new Room();
        room.setName(name);
        room.setHouse(house);
        return roomRepo.save(room);
    }

    public List<Room> listRooms(Long houseId) {
        House house = houseRepo.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found"));
        return house.getRooms();
    }
    public List<RoomDevicesResponse> listRoomsWithDevices(Long houseId) {
        List<Room> rooms = roomRepo.findByHouseId(houseId);

        return rooms.stream().map(r -> {
            RoomDevicesResponse dto = new RoomDevicesResponse();
            dto.setRoomId(r.getId());
            dto.setRoomName(r.getName());
            dto.setDevices(r.getDevices().stream().map(Device::getDeviceName).toList());
            return dto;
        }).toList();
    }
}
