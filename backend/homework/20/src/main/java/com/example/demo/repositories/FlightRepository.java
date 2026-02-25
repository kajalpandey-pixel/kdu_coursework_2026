package com.example.demo.repositories;

import com.example.demo.model.Flight;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface  FlightRepository  extends JpaRepository<Flight , Long> {
       // now , as many users can try to put hold on the same flight for same seats
    // here is why we put the lock on this , so that at one time only one user can make changes

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("SELECT f FROM Flight f WHERE f.flightNumber = :id")
    Optional<Flight> findByIdForUpdate(@Param("id") Long id) ;


}
