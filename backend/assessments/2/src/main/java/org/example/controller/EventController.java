package org.example.controller;



import org.example.dto.EventDto;
import org.example.service.EventService;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

@RestController
@RequestMapping("/api/events")

public class EventController {

    private final EventService eventService;

    public EventController(EventService eventService) {
        this.eventService = eventService;
    }
    private static final Logger log = LoggerFactory.getLogger(EventController.class);
    // Users can browse events; allow authenticated users (role USER) or any authenticated user
    @PreAuthorize("hasRole('USER')")
    @GetMapping
    public ResponseEntity<Page<EventDto>> listEvents(@RequestParam(defaultValue = "0") int page,
                                                     @RequestParam(defaultValue = "10") int size) {
        Page<EventDto> p = eventService.listAvailableEvents(page, size);
        return ResponseEntity.ok(p);
    }
}

