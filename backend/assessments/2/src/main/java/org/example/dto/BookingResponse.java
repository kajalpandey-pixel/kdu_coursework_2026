package org.example.dto;

public class BookingResponse {
    private Long bookingId;
    private String transactionId;
    private String transactionDate;

    public BookingResponse() {}

    public BookingResponse(Long bookingId, String transactionId, String transactionDate) {
        this.bookingId = bookingId;
        this.transactionId = transactionId;
        this.transactionDate = transactionDate;
    }

    public Long getBookingId() {
        return bookingId;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public String getTransactionDate() {
        return transactionDate;
    }

    public void setBookingId(Long bookingId) {
        this.bookingId = bookingId;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public void setTransactionDate(String transactionDate) {
        this.transactionDate = transactionDate;
    }
}
