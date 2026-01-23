package org.example.security;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.Set;
import java.util.stream.Collectors;

@Component
public class JwtUtil {

    // Hardcoded secret for assessment (change in real deployments)
    private static final String SECRET = "ChangeThisVerySecretKeyForAssessmentPurposesOnly12345";
    private static final long EXPIRATION_MS = 60 * 60 * 1000L; // 1 hour

    private final Key key;

    public JwtUtil() {
        key = Keys.hmacShaKeyFor(SECRET.getBytes());
    }

    public String generateToken(String username, Set<String> roles) {
        long now = System.currentTimeMillis();
        return Jwts.builder()
                .setSubject(username)
                .claim("roles", roles.stream().collect(Collectors.toList()))
                .setIssuedAt(new Date(now))
                .setExpiration(new Date(now + EXPIRATION_MS))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public Jws<Claims> validateToken(String token) throws JwtException {
        return Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(token);
    }
}
