package org.example.service;

import org.example.dto.BookingDto;
import org.example.dto.BookingResponse;
import org.example.entity.*;
import org.example.exception.BadRequestException;
import org.example.exception.NotFoundException;
import org.example.repository.*;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.List;
import java.util.UUID;

@Service
public class BookingService {

    private static final Logger log = LoggerFactory.getLogger(BookingService.class);

    private final BookingRepository bookingRepository;
    private final ReservationRepository reservationRepository;
    private final TransactionRecordRepository transactionRecordRepository;
    private final EventRepository eventRepository;
    private final UserRepository userRepository;

    public BookingService(BookingRepository bookingRepository,
                          ReservationRepository reservationRepository,
                          TransactionRecordRepository transactionRecordRepository,
                          EventRepository eventRepository,
                          UserRepository userRepository) {
        this.bookingRepository = bookingRepository;
        this.reservationRepository = reservationRepository;
        this.transactionRecordRepository = transactionRecordRepository;
        this.eventRepository = eventRepository;
        this.userRepository = userRepository;
    }

    @Transactional
    public BookingResponse confirm(String username, Long reservationId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Reservation r = reservationRepository.findByIdAndUser(reservationId, user)
                .orElseThrow(() -> new NotFoundException("Reservation not found"));

        if (r.getStatus() != ReservationStatus.PENDING) {
            throw new BadRequestException("Reservation cannot be confirmed");
        }

        Event event = eventRepository.findById(r.getEvent().getId())
                .orElseThrow(() -> new NotFoundException("Event not found"));

        if (Boolean.TRUE.equals(event.getSoftDeleted())) {
            throw new NotFoundException("Event not available");
        }

        Booking booking = new Booking();
        booking.setReservation(r);
        booking.setUser(user);
        booking.setEvent(event);
        booking.setQuantity(r.getQuantity());
        booking.setStatus(BookingStatus.CONFIRMED);
        booking = bookingRepository.save(booking);

        r.setStatus(ReservationStatus.CONFIRMED);
        reservationRepository.save(r);

        String txnId = UUID.randomUUID().toString();
        Instant txnDate = Instant.now();

        TransactionRecord tr = new TransactionRecord();
        tr.setBooking(booking);
        tr.setType(TransactionType.BOOKING_CONFIRM);
        tr.setTransactionId(txnId);
        tr.setTransactionDate(txnDate);
        tr.setMetadata("confirmed");
        transactionRecordRepository.save(tr);

        log.info("Booking confirmed bookingId={} reservationId={} user={}", booking.getId(), r.getId(), username);

        return new BookingResponse(booking.getId(), txnId, txnDate.toString());
    }

    @Transactional
    public void cancel(String username, Long bookingId) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        Booking booking = bookingRepository.findByIdAndUser(bookingId, user)
                .orElseThrow(() -> new NotFoundException("Booking not found"));

        if (booking.getStatus() != BookingStatus.CONFIRMED) {
            throw new BadRequestException("Booking cannot be cancelled");
        }

        Event event = eventRepository.findByIdForUpdate(booking.getEvent().getId())
                .orElseThrow(() -> new NotFoundException("Event not found"));

        int qty = booking.getQuantity();
        event.setAvailableTickets(event.getAvailableTickets() + qty);
        eventRepository.save(event);

        booking.setStatus(BookingStatus.CANCELLED);
        bookingRepository.save(booking);

        String txnId = UUID.randomUUID().toString();
        Instant txnDate = Instant.now();

        TransactionRecord tr = new TransactionRecord();
        tr.setBooking(booking);
        tr.setType(TransactionType.BOOKING_CANCEL);
        tr.setTransactionId(txnId);
        tr.setTransactionDate(txnDate);
        tr.setMetadata("cancelled");
        transactionRecordRepository.save(tr);

        log.info("Booking cancelled bookingId={} user={} qty={}", bookingId, username, qty);
    }

    public List<BookingDto> list(String username) {
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new NotFoundException("User not found"));

        return bookingRepository.findByUser(user).stream()
                .map(this::toDto)
                .toList();
    }

    private BookingDto toDto(Booking b) {
        return new BookingDto(
                b.getId(),
                b.getEvent().getId(),
                b.getEvent().getName(),
                b.getQuantity(),
                b.getStatus().name()
        );
    }
}
