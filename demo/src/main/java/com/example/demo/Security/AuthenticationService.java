package com.example.demo.Security;

import java.util.Base64;
import com.example.demo.entities.User;
import com.example.demo.repositories.UserRepository;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.dao.IncorrectResultSizeDataAccessException;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.*;
@Slf4j
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
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(email, password)
            );
        } catch (BadCredentialsException e) {
            log.warn("Login failed for '{}': wrong password", email);
            throw new BadCredentialsException("Invalid email or password");
        } catch (DisabledException e) {
            log.warn("Login failed for '{}': account is disabled (isdeleted=true)", email);
            throw new BadCredentialsException("This account has been disabled");
        } catch (UsernameNotFoundException e) {
            log.warn("Login failed for '{}': no such user", email);
            throw new BadCredentialsException("Invalid email or password");
        } catch (IncorrectResultSizeDataAccessException e) {
            log.error("Login failed for '{}': DUPLICATE EMAIL in USERS table! {} rows found",
                    email, e.getActualSize());
            throw new BadCredentialsException("Account configuration error - contact support");
        } catch (Exception e) {
            log.error("Login failed for '{}': unexpected error", email, e); // بيطبع الـ stack trace كامل
            throw new BadCredentialsException("Invalid email or password");
        }

        return userDetailsService.loadUserByUsername(email);
    }

    private SecretKey getSigningKey() {
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

    private String getSubject(String token) {
        return Jwts.parser()
                .verifyWith(getSigningKey())
                .build()
                .parseSignedClaims(token)
                .getPayload()
                .getSubject();
    }

    public UserDetails validateToken(String token) {
        String email = getSubject(token);
        return userDetailsService.loadUserByUsername(email);
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