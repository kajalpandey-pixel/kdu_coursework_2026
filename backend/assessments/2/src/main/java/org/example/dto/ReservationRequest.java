package org.example.dto;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ReservationRequest {

    @NotNull
    private Long eventId;

    @NotNull
    @Min(1)
    private Integer quantity;

    public ReservationRequest() {}

    public ReservationRequest(Long eventId, Integer quantity) {
        this.eventId = eventId;
        this.quantity = quantity;
    }

    public Long getEventId() {
        return eventId;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setEventId(Long eventId) {
        this.eventId = eventId;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}
