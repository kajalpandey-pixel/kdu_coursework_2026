package org.example.dto;


public class ReservationResponse {
    private Long reservationId;
    private String status;

    public ReservationResponse() {}

    public ReservationResponse(Long reservationId, String status) {
        this.reservationId = reservationId;
        this.status = status;
    }

    public Long getReservationId() {
        return reservationId;
    }

    public String getStatus() {
        return status;
    }

    public void setReservationId(Long reservationId) {
        this.reservationId = reservationId;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
