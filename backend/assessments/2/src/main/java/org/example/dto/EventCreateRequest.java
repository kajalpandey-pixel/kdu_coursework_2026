package org.example.dto;


import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;

public class EventCreateRequest {

    @NotBlank
    private String name;

    @NotNull
    @Min(0)
    private Integer ticketCount;

    public EventCreateRequest() {}

    public EventCreateRequest(String name, Integer ticketCount) {
        this.name = name;
        this.ticketCount = ticketCount;
    }

    public String getName() {
        return name;
    }

    public Integer getTicketCount() {
        return ticketCount;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTicketCount(Integer ticketCount) {
        this.ticketCount = ticketCount;
    }
}
