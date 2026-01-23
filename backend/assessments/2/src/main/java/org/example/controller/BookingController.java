package org.example.controller;

import org.example.dto.BookingConfirmRequest;
import org.example.dto.BookingDto;
import org.example.dto.BookingResponse;
import org.example.service.BookingService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/confirm")
    public ResponseEntity<BookingResponse> confirm(@Valid @RequestBody BookingConfirmRequest req) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(bookingService.confirm(username, req.getReservationId()));
    }

    @PreAuthorize("hasRole('USER')")
    @PostMapping("/{id}/cancel")
    public ResponseEntity<Void> cancel(@PathVariable("id") Long id) {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        bookingService.cancel(username, id);
        return ResponseEntity.noContent().build();
    }

    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public ResponseEntity<List<BookingDto>> list() {
        String username = SecurityContextHolder.getContext().getAuthentication().getName();
        return ResponseEntity.ok(bookingService.list(username));
    }
}
