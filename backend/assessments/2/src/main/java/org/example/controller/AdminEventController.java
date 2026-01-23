package org.example.controller;



import org.example.dto.EventCreateRequest;
import org.example.dto.EventDto;
import org.example.dto.EventUpdateRequest;
import org.example.service.EventService;
import jakarta.validation.Valid;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.http.*;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/admin/events")

public class AdminEventController {

    private final EventService eventService;

    public AdminEventController(EventService eventService) {
        this.eventService = eventService;
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<EventDto> createEvent(@Valid @RequestBody EventCreateRequest req) {
        EventDto dto = eventService.createEvent(req);
        return ResponseEntity.status(HttpStatus.CREATED).body(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping("/{id}")
    public ResponseEntity<EventDto> updateTickets(@PathVariable("id") Long id,
                                                  @Valid @RequestBody EventUpdateRequest req) {
        EventDto dto = eventService.updateTicketCount(id, req.getTicketCount());
        return ResponseEntity.ok(dto);
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> softDelete(@PathVariable("id") Long id) {
        eventService.softDeleteEvent(id);
        return ResponseEntity.noContent().build();
    }


    private static final Logger log = LoggerFactory.getLogger(AdminEventController.class);

}

