package org.example.entity;

import jakarta.persistence.*;
import java.time.Instant;

@Entity
@Table(name = "transactions")
public class TransactionRecord {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(optional = false, fetch = FetchType.LAZY)
    @JoinColumn(name = "booking_id", nullable = false)
    private Booking booking;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false, length = 30)
    private TransactionType type;

    @Column(nullable = false, unique = true, length = 100)
    private String transactionId;

    @Column(nullable = false)
    private Instant transactionDate;

    @Column(length = 500)
    private String metadata;

    public TransactionRecord() {}

    public Long getId() {
        return id;
    }

    public Booking getBooking() {
        return booking;
    }

    public TransactionType getType() {
        return type;
    }

    public String getTransactionId() {
        return transactionId;
    }

    public Instant getTransactionDate() {
        return transactionDate;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setBooking(Booking booking) {
        this.booking = booking;
    }

    public void setType(TransactionType type) {
        this.type = type;
    }

    public void setTransactionId(String transactionId) {
        this.transactionId = transactionId;
    }

    public void setTransactionDate(Instant transactionDate) {
        this.transactionDate = transactionDate;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }
}
