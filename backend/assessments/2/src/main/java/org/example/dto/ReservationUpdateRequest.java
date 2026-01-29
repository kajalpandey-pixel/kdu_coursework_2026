package org.example.dto;



import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public class ReservationUpdateRequest {

    @NotNull
    @Min(1)
    private Integer quantity;

    public ReservationUpdateRequest() {}

    public ReservationUpdateRequest(Integer quantity) {
        this.quantity = quantity;
    }

    public Integer getQuantity() {
        return quantity;
    }

    public void setQuantity(Integer quantity) {
        this.quantity = quantity;
    }
}

