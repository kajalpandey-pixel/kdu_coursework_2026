package com.example.demo.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.util.Set;

import java.util.HashSet;

@Setter
@Getter
@Entity
@Table(name = "User")
public class User extends BaseEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String mailID;

    @ManyToMany(mappedBy = "users")
    private Set<House> houses = new HashSet<>();

    @OneToMany(mappedBy = "admin")
    private Set<House> adminHouses = new HashSet<>();
}
