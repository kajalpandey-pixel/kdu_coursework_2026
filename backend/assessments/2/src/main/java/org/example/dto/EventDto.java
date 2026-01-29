package org.example.dto;



public class EventDto {
    private Long id;
    private String name;
    private Integer totalTickets;
    private Integer availableTickets;
    private Boolean softDeleted;

    public EventDto() {}

    public EventDto(Long id, String name, Integer totalTickets, Integer availableTickets, Boolean softDeleted) {
        this.id = id;
        this.name = name;
        this.totalTickets = totalTickets;
        this.availableTickets = availableTickets;
        this.softDeleted = softDeleted;
    }

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public Integer getTotalTickets() {
        return totalTickets;
    }

    public Integer getAvailableTickets() {
        return availableTickets;
    }

    public Boolean getSoftDeleted() {
        return softDeleted;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setTotalTickets(Integer totalTickets) {
        this.totalTickets = totalTickets;
    }

    public void setAvailableTickets(Integer availableTickets) {
        this.availableTickets = availableTickets;
    }

    public void setSoftDeleted(Boolean softDeleted) {
        this.softDeleted = softDeleted;
    }
}

