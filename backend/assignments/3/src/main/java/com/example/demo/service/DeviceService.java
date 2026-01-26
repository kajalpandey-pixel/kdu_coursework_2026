package com.example.demo.service;

import com.example.demo.entity.Device;
import com.example.demo.entity.DeviceInventory;
import com.example.demo.entity.House;
import com.example.demo.entity.Room;
import com.example.demo.repository.DeviceInventoryRepository;
import com.example.demo.repository.DeviceRepository;
import com.example.demo.repository.HouseRepository;
import com.example.demo.repository.RoomRepository;
import org.springframework.stereotype.Service;

@Service
public class DeviceService {

    private final DeviceRepository deviceRepo;
    private final HouseRepository houseRepo;
    private final RoomRepository roomRepo ;
    private final DeviceInventoryRepository deviceInventoryRepository;

    public DeviceService(DeviceRepository deviceRepo,
                         HouseRepository houseRepo,
                         DeviceInventoryRepository deviceInventoryRepository , RoomRepository roomRepo) {
        this.deviceRepo = deviceRepo;
        this.houseRepo = houseRepo;
        this.roomRepo = roomRepo ;
        this.deviceInventoryRepository = deviceInventoryRepository;
    }

    public void registerDevice(String kickstonId, String username, String password, Long houseId) {


        DeviceInventory inventory = deviceInventoryRepository
                .findByKickstonId(kickstonId)
                .orElseThrow(() -> new RuntimeException("Device not found with this id"));


        if (!inventory.getDeviceUsername().equals(username) || !inventory.getDevicePassword().equals(password)) {
            throw new RuntimeException("Invalid device credentials");
        }

        // Check if device is already registered
        if (inventory.getDevice() != null) {
            throw new RuntimeException("Device is already registered");
        }


        House house = houseRepo.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found with this ID"));


        Device device = new Device();
        device.setDeviceName("Device-" + kickstonId); // You can set a name
        device.setHouse(house);
        device.setInventory(inventory); // link inventory


        deviceRepo.save(device);


        inventory.setDevice(device);
        deviceInventoryRepository.save(inventory);
    }

        public void moveDevice(Long deviceId, Long targetRoomId) {
            Device device = deviceRepo.findById(deviceId)
                    .orElseThrow(() -> new RuntimeException("Device not found"));

            Room targetRoom = roomRepo.findById(targetRoomId)
                    .orElseThrow(() -> new RuntimeException("Target room not found"));

            // must be same house
            if (!device.getHouse().getId().equals(targetRoom.getHouse().getId())) {
                throw new RuntimeException("Device and target room must be in same house");
            }

            device.setRoom(targetRoom);
            deviceRepo.save(device);
        }


}
