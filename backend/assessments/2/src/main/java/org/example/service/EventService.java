package org.example.service;

import org.example.dto.EventCreateRequest;
import org.example.dto.EventDto;
import org.example.entity.Event;
import org.example.repository.EventRepository;
import jakarta.transaction.Transactional;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

@Service
public class EventService {

    private static final Logger log = LoggerFactory.getLogger(EventService.class);

    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }

    @Transactional
    public EventDto createEvent(EventCreateRequest req) {
        Event e = new Event();
        e.setName(req.getName());
        e.setTotalTickets(req.getTicketCount());
        e.setAvailableTickets(req.getTicketCount());
        e.setSoftDeleted(false);

        e = eventRepository.save(e);
        log.info("Created event id={} name={} totalTickets={}", e.getId(), e.getName(), e.getTotalTickets());
        return toDto(e);
    }

    @Transactional
    public EventDto updateTicketCount(Long eventId, Integer newTotal) {
        Event e = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        if (newTotal == null || newTotal < 0) {
            throw new IllegalArgumentException("ticketCount must be >= 0");
        }

        int delta = newTotal - e.getTotalTickets();
        int newAvailable = e.getAvailableTickets() + delta;

        if (newAvailable < 0) {
            throw new IllegalStateException("Updating totalTickets would make availableTickets negative");
        }

        e.setTotalTickets(newTotal);
        e.setAvailableTickets(newAvailable);

        e = eventRepository.save(e);
        log.info("Updated event id={} totalTickets={} availableTickets={}", e.getId(), e.getTotalTickets(), e.getAvailableTickets());
        return toDto(e);
    }

    @Transactional
    public void softDeleteEvent(Long eventId) {
        Event e = eventRepository.findById(eventId)
                .orElseThrow(() -> new IllegalArgumentException("Event not found"));

        if (Boolean.TRUE.equals(e.getSoftDeleted())) {
            return;
        }
        e.setSoftDeleted(true);
        eventRepository.save(e);
        log.info("Soft deleted event id={}", eventId);
    }

    public Page<EventDto> listAvailableEvents(int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(0, page), Math.max(1, size), Sort.by("id").ascending());
        Page<Event> p = eventRepository.findAllBySoftDeletedFalseAndAvailableTicketsGreaterThan(pageable, 0);
        return p.map(this::toDto);
    }

    private EventDto toDto(Event e) {
        return new EventDto(e.getId(), e.getName(), e.getTotalTickets(), e.getAvailableTickets(), e.getSoftDeleted());
    }
}
