package com.example.demo.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Entity
@Table(name = "devices")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Device extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String deviceName;  // Optional display name

    // Device must belong to a house
    @ManyToOne
    @JoinColumn(name = "house_id", nullable = false)
    private House house;

    // Device may or may not be in a room
    @ManyToOne
    @JoinColumn(name = "room_id")
    private Room room;

    // Link to inventory: this is how we validate credentials
    @OneToOne
    @JoinColumn(name = "kickston_id", referencedColumnName = "kickstonId", nullable = false, unique = true)
    private DeviceInventory inventory;

    // Audit columns


}
