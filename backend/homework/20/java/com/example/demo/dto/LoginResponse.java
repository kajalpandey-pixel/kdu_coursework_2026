package com.example.demo.dto;


import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
// it means all fields  are required
public class LoginResponse {

    // this is for JWT
    private String token;
    private String userName;
    private String role;
    private long expiresAt;
}
