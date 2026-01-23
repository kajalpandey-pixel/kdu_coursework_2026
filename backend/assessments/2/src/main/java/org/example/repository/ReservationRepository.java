package org.example.repository;

import org.example.entity.Reservation;
import org.example.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ReservationRepository extends JpaRepository<Reservation, Long> {
    List<Reservation> findByUser(User user);
    Optional<Reservation> findByIdAndUser(Long id, User user);
}
