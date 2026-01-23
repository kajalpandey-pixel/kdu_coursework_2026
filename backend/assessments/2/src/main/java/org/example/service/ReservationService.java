package org.example.service;
import org.example.exception.InsufficientTicketsException;

import org.example.dto.*;
import org.example.entity.*;
import org.example.exception.BadRequestException;
import org.example.exception.NotFoundException;
import org.example.repository.EventRepository;
import org.example.repository.ReservationRepository;
import org.example.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReservationService {

    private static final Logger log = LoggerFactory.getLogger(ReservationService.class);

    private final ReservationRepository reservationRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public ReservationService(ReservationRepository reservationRepository,
                              EventRepository eventRepository,
                              UserRepository userRepository) {
        this.reservationRepository = reservationRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public ReservationResponse create(String username, ReservationRequest req) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Event event = eventRepository.findByIdForUpdate(req.getEventId())
                .orElseThrow(() -> new NotFoundException("Event not found"));

        if (Boolean.TRUE.equals(event.getSoftDeleted())) {
            throw new NotFoundException("Event not available");
        }

        int qty = req.getQuantity();
        if (qty <= 0) {
            throw new BadRequestException("quantity must be >= 1");
        }

        if (event.getAvailableTickets() < qty) {
            log.info("Insufficient tickets eventId={} requested={} available={}", event.getId(), qty, event.getAvailableTickets());
            throw new InsufficientTicketsException("Insufficient tickets");
        }

        event.setAvailableTickets(event.getAvailableTickets() - qty);
        eventRepository.save(event);

        Reservation r = new Reservation();
        r.setUser(user);
        r.setEvent(event);
        r.setQuantity(qty);
        r.setStatus(ReservationStatus.PENDING);

        r = reservationRepository.save(r);
        log.info("Reservation created id={} user={} eventId={} qty={}", r.getId(), username, event.getId(), qty);

        return new ReservationResponse(r.getId(), r.getStatus().name());
    }

    @Transactional
    public ReservationResponse update(String username, Long reservationId, ReservationUpdateRequest req) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Reservation r = reservationRepository.findByIdAndUser(reservationId, user)
                .orElseThrow(() -> new NotFoundException("Reservation not found"));

        if (r.getStatus() != ReservationStatus.PENDING) {
            throw new BadRequestException("Reservation cannot be modified");
        }

        int newQty = req.getQuantity();
        if (newQty <= 0) {
            throw new BadRequestException("quantity must be >= 1");
        }

        Event event = eventRepository.findByIdForUpdate(r.getEvent().getId())
                .orElseThrow(() -> new NotFoundException("Event not found"));

        if (Boolean.TRUE.equals(event.getSoftDeleted())) {
            throw new NotFoundException("Event not available");
        }

        int oldQty = r.getQuantity();
        int diff = newQty - oldQty;

        if (diff > 0) {
            if (event.getAvailableTickets() < diff) {
                log.info("Insufficient tickets for update eventId={} diff={} available={}", event.getId(), diff, event.getAvailableTickets());
                throw new InsufficientTicketsException("Insufficient tickets");
            }
            event.setAvailableTickets(event.getAvailableTickets() - diff);
        } else if (diff < 0) {
            event.setAvailableTickets(event.getAvailableTickets() + (-diff));
        }

        eventRepository.save(event);

        r.setQuantity(newQty);
        reservationRepository.save(r);

        return new ReservationResponse(r.getId(), r.getStatus().name());
    }

    @Transactional
    public void delete(String username, Long reservationId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Reservation r = reservationRepository.findByIdAndUser(reservationId, user)
                .orElseThrow(() -> new NotFoundException("Reservation not found"));

        if (r.getStatus() != ReservationStatus.PENDING) {
            throw new BadRequestException("Reservation cannot be deleted");
        }

        Event event = eventRepository.findByIdForUpdate(r.getEvent().getId())
                .orElseThrow(() -> new NotFoundException("Event not found"));

        int qty = r.getQuantity();
        event.setAvailableTickets(event.getAvailableTickets() + qty);
        eventRepository.save(event);

        r.setStatus(ReservationStatus.CANCELLED);
        reservationRepository.save(r);

        log.info("Reservation cancelled id={} user={} eventId={} qty={}", r.getId(), username, event.getId(), qty);
    }

    public List<ReservationDto> list(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return reservationRepository.findByUser(user).stream()
                .map(this::toDto)
                .toList();
    }

    private ReservationDto toDto(Reservation r) {
        return new ReservationDto(
                r.getId(),
                r.getEvent().getId(),
                r.getEvent().getName(),
                r.getQuantity(),
                r.getStatus().name()
        );
    }
}
