package org.example.dto;

public class AuthResponse {
    private String token;
    private long expiresInMs;

    public AuthResponse() {}

    public AuthResponse(String token, long expiresInMs) {
        this.token = token;
        this.expiresInMs = expiresInMs;
    }

    public String getToken() {
        return token;
    }

    public long getExpiresInMs() {
        return expiresInMs;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public void setExpiresInMs(long expiresInMs) {
        this.expiresInMs = expiresInMs;
    }
}
