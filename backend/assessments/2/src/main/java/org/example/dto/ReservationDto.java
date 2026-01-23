package org.example.dto;



public class ReservationDto {
    private Long id;
    private Long eventId;
    private String eventName;
    private Integer quantity;
    private String status;

    public ReservationDto() {}

    public ReservationDto(Long id, Long eventId, String eventName, Integer quantity, String status) {
        this.id = id;
        this.eventId = eventId;
        this.eventName = eventName;
        this.quantity = quantity;
        this.status = status;
    }

    public Long getId() {
        return id;
    }

    public Long getEventId() {
        return eventId;
    }

    public String getEventName() {
        return eventName;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public String getStatus() {
        return status;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public void setEventName(String eventName) {
        this.eventName = eventName;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}

