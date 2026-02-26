package com.example.demo.controllers;


import com.example.demo.dto.LoginRequest;
import com.example.demo.dto.LoginResponse;
import com.example.demo.model.User;
import com.example.demo.repositories.UserRepository;
import com.example.demo.security.JwtService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
    public class AuthController {

        private final UserRepository userRepository;
        private final PasswordEncoder passwordEncoder;
        private final JwtService jwtService;

        public AuthController(UserRepository userRepository,
                              PasswordEncoder passwordEncoder,
                              JwtService jwtService) {
            this.userRepository = userRepository;
            this.passwordEncoder = passwordEncoder;
            this.jwtService = jwtService;
        }

        @PostMapping("/login")
        public LoginResponse login(@RequestBody LoginRequest req) {

            User user = userRepository.findByUserName(req.getUserName())
                    .orElseThrow(() -> new RuntimeException("Invalid credentials"));

            if (!passwordEncoder.matches(req.getPassword(), user.getPassword())) {
                throw new RuntimeException("Invalid credentials");
            }

            long expiresAt = System.currentTimeMillis() + 1000L * 60 * 60; // almost 1 hour
            String token = jwtService.generateToken(user.getUserName(), user.getRole().name(), expiresAt);

            return new LoginResponse(token, user.getUserName(), user.getRole().name(), expiresAt);
        }
    }

