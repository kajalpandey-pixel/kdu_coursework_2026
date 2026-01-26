//package com.example.demo;
//
//import com.example.demo.entity.Device;
//import com.example.demo.entity.DeviceInventory;
//import com.example.demo.entity.House;
//import com.example.demo.entity.Room;
//import com.example.demo.entity.User;
//import com.example.demo.repository.DeviceInventoryRepository;
//import com.example.demo.repository.DeviceRepository;
//import com.example.demo.repository.HouseRepository;
//import com.example.demo.repository.RoomRepository;
//import com.example.demo.repository.UserRepository;
//import com.example.demo.service.DeviceService;
//import org.junit.jupiter.api.Test;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.context.SpringBootTest;
//
//import static org.junit.jupiter.api.Assertions.*;
//
//@SpringBootTest
//class DeviceServiceTest {
//
//    @Autowired DeviceService deviceService;
//    @Autowired UserRepository userRepo;
//    @Autowired HouseRepository houseRepo;
//    @Autowired RoomRepository roomRepo;
//    @Autowired DeviceRepository deviceRepo;
//    @Autowired DeviceInventoryRepository invRepo;
//
//    @Test
//    void moveDevice_roomToRoom_sameHouse() {
//        // create user
//        User u = new User();
//        u.setId(100L);
//        u.setName("U");
//        u.setMailID("u@test.com");
//        userRepo.save(u);
//
//        // create house
//        House h = new House();
//        h.setId(200L);
//        h.setName("H");
//        h.setAddress("A");
//        h.setAdmin(u);
//        h.getUsers().add(u);
//        houseRepo.save(h);
//
//        // create rooms
//        Room r1 = new Room();
//        r1.setName("R1");
//        r1.setHouse(h);
//        roomRepo.save(r1);
//
//        Room r2 = new Room();
//        r2.setName("R2");
//        r2.setHouse(h);
//        roomRepo.save(r2);
//
//        // inventory
//        DeviceInventory inv = new DeviceInventory();
//        inv.setKickstonId("ZZ9999");
//        inv.setDeviceUsername("x");
//        inv.setDevicePassword("y");
//        invRepo.save(inv);
//
//        // device in r1
//        Device d = new Device();
//        d.setDeviceName("Device-ZZ9999");
//        d.setHouse(h);
//        d.setInventory(inv);
//        d.setRoom(r1);
//        deviceRepo.save(d);
//
//        String res = deviceService.moveDevice(d.getId(), r2.getId());
//        assertEquals("Device moved", res);
//
//        Device updated = deviceRepo.findById(d.getId()).orElseThrow();
//        assertEquals(r2.getId(), updated.getRoom().getId());
//    }
//
//
//}
