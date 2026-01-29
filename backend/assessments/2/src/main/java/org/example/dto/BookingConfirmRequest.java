package org.example.dto;

import jakarta.validation.constraints.NotNull;

public class BookingConfirmRequest {

    @NotNull
    private Long reservationId;

    public BookingConfirmRequest() {}

    public BookingConfirmRequest(Long reservationId) {
        this.reservationId = reservationId;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }
}
