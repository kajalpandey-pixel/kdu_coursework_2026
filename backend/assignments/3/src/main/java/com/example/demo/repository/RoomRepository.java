package com.example.demo.repository;


import com.example.demo.entity.Room;
import lombok.Getter;
import lombok.Setter;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;



@Repository
public interface RoomRepository extends JpaRepository<Room, Long> {

    List<Room> findByHouseId(Long houseId);
}

