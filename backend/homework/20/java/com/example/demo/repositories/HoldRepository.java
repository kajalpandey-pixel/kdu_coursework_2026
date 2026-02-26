package com.example.demo.repositories;


import com.example.demo.model.Hold;
import com.example.demo.model.HoldStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface  HoldRepository extends JpaRepository<Hold, Long> {
    List<Hold> findByFlightFlightNumberAndHoldStatus(Long flightId, HoldStatus holdStatus);
}
