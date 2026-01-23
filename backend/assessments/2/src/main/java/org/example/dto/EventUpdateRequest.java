package org.example.dto;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class EventUpdateRequest {

    @NotNull
    @Min(0)
    private Integer ticketCount;

    public EventUpdateRequest() {}

    public EventUpdateRequest(Integer ticketCount) {
        this.ticketCount = ticketCount;
    }

    public Integer getTicketCount() {
        return ticketCount;
    }

    public void setTicketCount(Integer ticketCount) {
        this.ticketCount = ticketCount;
    }
}
