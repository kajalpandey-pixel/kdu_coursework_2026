package com.example.demo.model;


import jakarta.persistence.*;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "user")
@Data
@Getter
@Setter

public class User {


    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
      private Long userId ;

      @Column(unique = true, nullable = false)
      private String userName ;

      // this is for JWT
      @Column(nullable = false)
      private String password ;

      @Enumerated(EnumType.STRING)
      private Role role  ;

}
