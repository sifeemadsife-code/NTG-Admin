package com.example.demo.Security;

import java.util.Base64;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AuthenticationManager authenticationManager;
    private final UserDetailsService userDetailsService;
    private final UserRepository userRepository;

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiry}")
    private Long jwtExpiryMs;

    public UserDetails authenticate(String email, String password) {
        System.out.println("=== AUTH SERVICE ===");
        System.out.println("Email: [" + email + "]");
        List<User> all = userRepository.findAll();
        System.out.println("Total users via findAll: " + all.size());
        for (User u : all) {
            System.out.println("User: [" + u.getEmail() + "]");
        }
        Optional<User> found = userRepository.findByEmail(email);
        System.out.println("Found by email: " + found.isPresent());

        UserDetails user = userDetailsService.loadUserByUsername(email);
        System.out.println("UserDetails: " + user.getUsername());
        return user;
    }

    // ✅ وحدة فقط — تستخدم Base64
    private SecretKey getSigningKey(){
        byte[] keyBytes = Base64.getDecoder().decode(secretKey);
        return Keys.hmacShaKeyFor(keyBytes);
    }

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        return Jwts.builder()
                .claims(claims)
                .subject(userDetails.getUsername())
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + jwtExpiryMs))
                .signWith(getSigningKey())
                .compact();
    }

    private String getSubject(String token){
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public UserDetails validateToken(String token) {
        System.out.println("Received Token: " + token);

        String email = getSubject(token);
        System.out.println("Email From Token: " + email);

        UserDetails user = userDetailsService.loadUserByUsername(email);
        System.out.println("User Loaded: " + user.getUsername());

        return user;
    }

    public User getUser() {
        String email = SecurityContextHolder.getContext().getAuthentication().getName();
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new UsernameNotFoundException("User not found"));
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
}