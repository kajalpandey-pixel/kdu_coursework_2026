package com.example.demo.repository;


import com.example.demo.entity.Device;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface DeviceRepository extends JpaRepository<Device, Long> {


        boolean existsByInventory_KickstonId(String kickstonId);


    List<Device> findByHouseId(Long houseId);

    List<Device> findByRoomId(Long roomId);
}
