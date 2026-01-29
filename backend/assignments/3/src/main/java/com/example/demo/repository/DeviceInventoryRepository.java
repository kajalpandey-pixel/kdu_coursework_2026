package com.example.demo.repository;


import com.example.demo.entity.DeviceInventory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DeviceInventoryRepository
        extends JpaRepository<DeviceInventory, String> {

    Optional<DeviceInventory> findByKickstonId(String kickstonId);
}
