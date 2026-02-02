package org.example.repository;

import org.example.entity.Event;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.*;
import org.springframework.data.repository.query.Param;

import jakarta.persistence.LockModeType;
import java.util.Optional;

public interface EventRepository extends org.springframework.data.jpa.repository.JpaRepository<Event, Long> {

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select e from Event e where e.id = :id")
    Optional<Event> findByIdForUpdate(@Param("id") Long id);

    Optional<Event> findByIdAndSoftDeletedFalse(Long id);

    Page<Event> findAllBySoftDeletedFalse(Pageable pageable);

    Page<Event> findAllBySoftDeletedFalseAndAvailableTicketsGreaterThan(Pageable pageable, Integer minAvailable);
}
