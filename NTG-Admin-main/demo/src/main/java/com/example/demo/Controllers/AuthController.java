package com.example.demo.Controllers;

import com.example.demo.DTOs.AuthenticationResponse;
import com.example.demo.Security.AuthenticationService;
import com.example.demo.Security.CustomUserDetails;
import com.example.demo.DTOs.LoginRequestDTO;
import com.example.demo.entities.User;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.context.HttpSessionSecurityContextRepository;
import org.springframework.security.web.context.SecurityContextRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {
    @Value("${jwt.expiry}")
    private Long expiresAt;

    private final AuthenticationService authService;
    private final AuthenticationManager authenticationManager;
    private final SecurityContextRepository securityContextRepository = new HttpSessionSecurityContextRepository();

    @PostMapping("/login")
    public ResponseEntity<AuthenticationResponse> login(@RequestBody LoginRequestDTO request) {
        UserDetails userDetails = authService.authenticate(request.email(), request.password());

        String token = authService.generateToken(userDetails);
        String role = userDetails.getAuthorities()
                .stream()
                .findFirst()
                .map(GrantedAuthority::getAuthority)
                .orElse(null);

        User user = ((CustomUserDetails) userDetails).getUser();

        return ResponseEntity.ok(
                AuthenticationResponse.builder()
                        .token(token)
                        .role(role)
                        .expiresAt(expiresAt)
                        .userId(user.getId())
                        .firstName(user.getFirstName())
                        .lastName(user.getLastName())
                        .email(user.getEmail())
                        .build());
    }
}