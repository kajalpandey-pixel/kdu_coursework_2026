package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@Entity
@Table(name = "device_inventory")
public class DeviceInventory  extends BaseEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
   @Column(length = 6, unique = true, nullable = false)
    private String kickstonId;

    private String deviceUsername;

    private String devicePassword;

    private LocalDateTime manufactureDateTime;

    private String manufactureFactoryPlace;

    @OneToOne(mappedBy = "inventory")
    private Device device;

}
