package com.example.demo.service;

import com.example.demo.dto.RoomDevicesResponse;
import com.example.demo.entity.House;
import com.example.demo.entity.Room;
import com.example.demo.entity.User;
import com.example.demo.repository.HouseRepository;
import com.example.demo.repository.UserRepository;
import lombok.Getter;
import lombok.Setter;
import org.springframework.stereotype.Service;

import java.util.List;

@Getter
@Setter
@Service
public class HouseService {


        private final HouseRepository houseRepo;
        private final UserRepository userRepo;

        public HouseService(HouseRepository houseRepo, UserRepository userRepo) {
            this.houseRepo = houseRepo;
            this.userRepo = userRepo;
        }

        public void createHouse(Long userId , String address){

            User user =  userRepo.findById(userId).orElseThrow(()-> new RuntimeException("User with this ID not found")) ;

            House house = new House() ;
            house.setAddress(address);
            house.setAdmin(user);

            house.getUsers().add(user) ;
            houseRepo.save(house) ;

        }

        public void addUserToHouse(Long HouseId , Long AdminId , Long UserId){

            User admin = userRepo.findById(AdminId).orElseThrow(()-> new RuntimeException("Admin with this Id doesn't exist"))  ;
            House house = houseRepo.findById(HouseId).orElseThrow(()-> new RuntimeException("house with this ID is not present")) ;


            if(!house.getAdmin().getId().equals(admin.getId())) {
                  throw new RuntimeException("Only admins can add user to house") ;
            }

            User user = userRepo.findById(UserId).orElseThrow(() -> new RuntimeException("user not found")) ;

            house.getUsers().add(user) ;
            user.getHouses().add(house) ;

            houseRepo.save(house) ;

        }
    public String updateHouseAddress(Long houseId, Long adminId, String address) {
        House house = houseRepo.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found"));

        if (!house.getAdmin().getId().equals(adminId)) {
            throw new RuntimeException("Only admin can update address");
        }

        house.setAddress(address);
        houseRepo.save(house);
        return "House address updated";
    }

    public String transferOwnership(Long houseId, Long adminId, Long newAdminId) {
        House house = houseRepo.findById(houseId)
                .orElseThrow(() -> new RuntimeException("House not found"));

        if (!house.getAdmin().getId().equals(adminId)) {
            throw new RuntimeException("Only admin can transfer ownership");
        }

        User newAdmin = userRepo.findById(newAdminId)
                .orElseThrow(() -> new RuntimeException("New admin user not found"));

        // must already belong to the same house
        if (!house.getUsers().contains(newAdmin)) {
            throw new RuntimeException("New admin must belong to this house");
        }

        house.setAdmin(newAdmin);
        houseRepo.save(house);
        return "Ownership transferred";
    }





}
